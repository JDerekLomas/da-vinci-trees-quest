import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DomeBuilderProps, DomeBuilderState } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

import DomeModel from '../assets/images/dome_model.webp';

const DomeBuilder: React.FC<DomeBuilderProps> = ({ interaction, onInteraction }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const domeRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.dome_builder && typeof interactiveResponses?.dome_builder === 'object'
      ? (interactiveResponses?.dome_builder as unknown as DomeBuilderState)
      : undefined;

  const [skewFactor, setSkewFactor] = useState(0.5);
  const [heightSegments, setHeightSegments] = useState(12);
  const [widthSegments, setWidthSegments] = useState(24);
  const [panelOffset, setPanelOffset] = useState(0.05);
  const [isInitialized, setIsInitialized] = useState(false);
  const { t } = useTranslations();
  const { translations } = interaction;
  const [currentStep, setCurrentStep] = useState(savedState?.currentStep ?? 1);
  const { payload } = useEventListener('dome-builder');
  const [skewSliderAdjusted, setSkewSliderAdjusted] = useState(false);
  const [levelsSliderAdjusted, setLevelsSliderAdjusted] = useState(false);
  const [columnsSliderAdjusted, setColumnsSliderAdjusted] = useState(false);
  const [spacingSliderAdjusted, setSpacingSliderAdjusted] = useState(false);

  const radius = 2.5;

  const createDome = (wSegments: number, hSegments: number, offset: number, skew: number) => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array((wSegments + 1) * (hSegments + 1) * 3);

    // --- 1. Generate Base Vertices for Hemisphere ---
    for (let j = 0; j <= hSegments; j++) {
      const v = j / hSegments;
      for (let i = 0; i <= wSegments; i++) {
        const u = i / wSegments;
        const index = (j * (wSegments + 1) + i) * 3;

        const phi = (v * Math.PI) / 2;
        const theta = u * Math.PI * 2;
        const x = -radius * Math.cos(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(theta);

        positions[index] = x;
        positions[index + 1] = y;
        positions[index + 2] = z;
      }
    }

    // --- 1.5. Generate indices to define faces for the geometry ---
    const indices = [];
    for (let j = 0; j < hSegments; j++) {
      for (let i = 0; i < wSegments; i++) {
        const a = j * (wSegments + 1) + i;
        const b = a + 1;
        const c = (j + 1) * (wSegments + 1) + i;
        const d = c + 1;

        // Triangle winding order for hemisphere
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }
    geom.setIndex(indices);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // --- 2. Apply Skew Transformation ---
    const posAttribute = geom.attributes.position;
    const vertex = new THREE.Vector3();
    const yAxis = new THREE.Vector3(0, 1, 0);
    for (let j = 0; j <= hSegments; j++) {
      const skewAngle = (j / hSegments) * skew;
      for (let i = 0; i <= wSegments; i++) {
        const index = j * (wSegments + 1) + i;
        vertex.fromBufferAttribute(posAttribute, index).applyAxisAngle(yAxis, skewAngle);
        posAttribute.setXYZ(index, vertex.x, vertex.y, vertex.z);
      }
    }
    posAttribute.needsUpdate = true;

    // --- 3. Compute normals for the geometry ---
    geom.computeVertexNormals(); // This now calculates correct outward-facing normals
    const finalNormals = geom.attributes.normal;

    // --- 3. Create Solid Mesh and Wireframe ---
    const solidMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      side: THREE.DoubleSide,
      metalness: 0.1,
      roughness: 0.4,
    });
    const solidMesh = new THREE.Mesh(geom, solidMaterial);

    const lineIndices = [];
    for (let j = 0; j < hSegments; j++) {
      for (let i = 0; i < wSegments; i++) {
        const a = j * (wSegments + 1) + i,
          b = a + 1,
          c = (j + 1) * (wSegments + 1) + i;
        lineIndices.push(a, b, a, c);
      }
    }
    for (let j = 0; j < hSegments; j++) {
      lineIndices.push(j * (wSegments + 1) + wSegments, (j + 1) * (wSegments + 1) + wSegments);
    }
    for (let i = 0; i < wSegments; i++) {
      lineIndices.push(hSegments * (wSegments + 1) + i, hSegments * (wSegments + 1) + i + 1);
    }

    const wireframeGeom = new THREE.BufferGeometry();
    wireframeGeom.setAttribute('position', geom.getAttribute('position'));
    wireframeGeom.setIndex(lineIndices);
    const wireframe = new THREE.LineSegments(
      wireframeGeom,
      new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }),
    );

    const newDome = new THREE.Group();
    newDome.add(solidMesh);
    newDome.add(wireframe);

    // --- 4. Add Flat Panels ---
    const solarPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      side: THREE.DoubleSide,
      metalness: 0.7,
      roughness: 0.2,
    });
    const p1 = new THREE.Vector3(),
      p2 = new THREE.Vector3(),
      p3 = new THREE.Vector3(),
      p4 = new THREE.Vector3();
    const n1 = new THREE.Vector3(),
      n2 = new THREE.Vector3(),
      n3 = new THREE.Vector3(),
      n4 = new THREE.Vector3();

    for (let j = 0; j < hSegments; j++) {
      for (let i = 0; i < wSegments; i++) {
        const a = j * (wSegments + 1) + i,
          b = a + 1,
          c = (j + 1) * (wSegments + 1) + i,
          d = c + 1;
        p1.fromBufferAttribute(posAttribute, a);
        p2.fromBufferAttribute(posAttribute, b);
        p3.fromBufferAttribute(posAttribute, c);
        p4.fromBufferAttribute(posAttribute, d);
        n1.fromBufferAttribute(finalNormals, a);
        n2.fromBufferAttribute(finalNormals, b);
        n3.fromBufferAttribute(finalNormals, c);
        n4.fromBufferAttribute(finalNormals, d);

        const centroid = new THREE.Vector3().add(p1).add(p2).add(p3).add(p4).multiplyScalar(0.25);
        const avgNormal = new THREE.Vector3().add(n1).add(n2).add(n3).add(n4).normalize();
        const bestFitPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(avgNormal, centroid);

        const p1_proj = new THREE.Vector3();
        bestFitPlane.projectPoint(p1, p1_proj);
        const p2_proj = new THREE.Vector3();
        bestFitPlane.projectPoint(p2, p2_proj);
        const p3_proj = new THREE.Vector3();
        bestFitPlane.projectPoint(p3, p3_proj);
        const p4_proj = new THREE.Vector3();
        bestFitPlane.projectPoint(p4, p4_proj);

        const offsetVector = avgNormal.clone().multiplyScalar(offset);
        const p1_lifted = p1_proj.add(offsetVector),
          p2_lifted = p2_proj.add(offsetVector);
        const p3_lifted = p3_proj.add(offsetVector),
          p4_lifted = p4_proj.add(offsetVector);

        const panelGeom = new THREE.BufferGeometry();
        const panelVertices = new Float32Array([
          p1_lifted.x,
          p1_lifted.y,
          p1_lifted.z,
          p2_lifted.x,
          p2_lifted.y,
          p2_lifted.z,
          p4_lifted.x,
          p4_lifted.y,
          p4_lifted.z,
          p1_lifted.x,
          p1_lifted.y,
          p1_lifted.z,
          p4_lifted.x,
          p4_lifted.y,
          p4_lifted.z,
          p3_lifted.x,
          p3_lifted.y,
          p3_lifted.z,
        ]);
        panelGeom.setAttribute('position', new THREE.BufferAttribute(panelVertices, 3));
        panelGeom.computeVertexNormals();
        newDome.add(new THREE.Mesh(panelGeom, solarPanelMaterial));
      }
    }
    return newDome;
  };

  const init = () => {
    if (!mountRef.current) return;

    // Clear any existing content in the mount element
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 2.5, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const dome = createDome(widthSegments, heightSegments, panelOffset, skewFactor);
    scene.add(dome);
    domeRef.current = dome;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controlsRef.current = controls;

    setIsInitialized(true);
  };

  const onParamsChange = () => {
    if (!sceneRef.current || !domeRef.current) return;

    sceneRef.current.remove(domeRef.current);
    domeRef.current.traverse((child) => {
      if ('geometry' in child && child.geometry) {
        (child.geometry as THREE.BufferGeometry).dispose();
      }
      if ('material' in child && child.material) {
        (child.material as THREE.Material).dispose();
      }
    });

    const newDome = createDome(widthSegments, heightSegments, panelOffset, skewFactor);
    sceneRef.current.add(newDome);
    domeRef.current = newDome;

    // Adjust camera position for hemisphere
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 2.5, 4);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  const onWindowResize = () => {
    if (!cameraRef.current || !rendererRef.current || !mountRef.current) return;

    cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
  };

  const animate = () => {
    if (domeRef.current) {
      domeRef.current.rotation.y += 0.001;
    }
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    animationIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    init();
    animate();

    const handleResize = () => onWindowResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      // Clean up Three.js resources properly
      if (domeRef.current) {
        domeRef.current.traverse((child) => {
          if ('geometry' in child && child.geometry) {
            (child.geometry as THREE.BufferGeometry).dispose();
          }
          if ('material' in child && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              (child.material as THREE.Material).dispose();
            }
          }
        });
        domeRef.current = null;
      }

      if (controlsRef.current) {
        controlsRef.current.dispose();
        controlsRef.current = null;
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }

      if (cameraRef.current) {
        cameraRef.current = null;
      }

      if (mountRef.current && rendererRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch {
          // Element might already be removed
        }
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      setIsInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      onParamsChange();
    }
  }, [skewFactor, heightSegments, widthSegments, panelOffset, isInitialized]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    // Use a small timeout to ensure DOM elements are available after remount
    const timeoutId = setTimeout(() => {
      const skewFactorSlider = document.getElementById(`slider-skewFactor`) as HTMLInputElement;
      const levelsSlider = document.getElementById(`slider-levels`) as HTMLInputElement;
      const columnsSlider = document.getElementById(`slider-columns`) as HTMLInputElement;
      const spacingSlider = document.getElementById(`slider-spacing`) as HTMLInputElement;

      if (skewFactorSlider) {
        updateSliderBackground(skewFactorSlider);
      }
      if (levelsSlider) {
        updateSliderBackground(levelsSlider);
      }
      if (columnsSlider) {
        updateSliderBackground(columnsSlider);
      }
      if (spacingSlider) {
        updateSliderBackground(spacingSlider);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [skewFactor, heightSegments, widthSegments, panelOffset, updateSliderBackground]);

  // Apply slider backgrounds when returning to step 1
  useEffect(() => {
    if (currentStep === 1) {
      const timeoutId = setTimeout(() => {
        const skewFactorSlider = document.getElementById(`slider-skewFactor`) as HTMLInputElement;
        const levelsSlider = document.getElementById(`slider-levels`) as HTMLInputElement;
        const columnsSlider = document.getElementById(`slider-columns`) as HTMLInputElement;
        const spacingSlider = document.getElementById(`slider-spacing`) as HTMLInputElement;

        if (skewFactorSlider) {
          updateSliderBackground(skewFactorSlider);
        }
        if (levelsSlider) {
          updateSliderBackground(levelsSlider);
        }
        if (columnsSlider) {
          updateSliderBackground(columnsSlider);
        }
        if (spacingSlider) {
          updateSliderBackground(spacingSlider);
        }
      }, 100); // Slightly longer delay to ensure DOM is ready

      return () => clearTimeout(timeoutId);
    }
  }, [currentStep, updateSliderBackground]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && typeof payload.step === 'number') {
      setCurrentStep(payload.step);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: DomeBuilderState = { currentStep };
    setInteractiveResponses((prev) => ({
      ...prev,
      dome_builder: currentState as any,
    }));
  }, [setInteractiveResponses, currentStep]);

  // Track skew slider adjustment
  useEffect(() => {
    if (onInteraction && skewSliderAdjusted) {
      onInteraction({
        'skew-slider-adjusted': true,
      });
    }
  }, [skewSliderAdjusted, onInteraction]);

  // Track levels slider adjustment
  useEffect(() => {
    if (onInteraction && levelsSliderAdjusted) {
      onInteraction({
        'levels-slider-adjusted': true,
      });
    }
  }, [levelsSliderAdjusted, onInteraction]);

  // Track columns slider adjustment
  useEffect(() => {
    if (onInteraction && columnsSliderAdjusted) {
      onInteraction({
        'columns-slider-adjusted': true,
      });
    }
  }, [columnsSliderAdjusted, onInteraction]);

  // Track spacing slider adjustment
  useEffect(() => {
    if (onInteraction && spacingSliderAdjusted) {
      onInteraction({
        'spacing-slider-adjusted': true,
      });
    }
  }, [spacingSliderAdjusted, onInteraction]);

  // Handle step changes - reinitialize Three.js scene when returning to step 1
  useEffect(() => {
    if (currentStep === 1 && !isInitialized) {
      // Reinitialize the Three.js scene when returning to step 1
      init();
      animate();
    } else if (currentStep === 2 && isInitialized) {
      // Clean up Three.js scene when switching to step 2
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (domeRef.current) {
        domeRef.current.traverse((child) => {
          if ('geometry' in child && child.geometry) {
            (child.geometry as THREE.BufferGeometry).dispose();
          }
          if ('material' in child && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              (child.material as THREE.Material).dispose();
            }
          }
        });
        domeRef.current = null;
      }

      if (controlsRef.current) {
        controlsRef.current.dispose();
        controlsRef.current = null;
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }

      if (cameraRef.current) {
        cameraRef.current = null;
      }

      if (mountRef.current && rendererRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch {
          // Element might already be removed
        }
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      setIsInitialized(false);
    }
  }, [currentStep, isInitialized]);

  return (
    <div className="flex flex-col gap-6 text-lg">
      {currentStep === 1 && (
        <>
          <div className="grid grid-cols-1 gap-y-2 gap-x-4 lg:grid-cols-2">
            <div className="slider">
              <label className="block">
                <span className="font-bold">{t(translations.skew)}:</span>
                <span> {skewFactor.toFixed(2)}</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="slider-skewFactor"
                  min="0"
                  max="2.5"
                  step="0.01"
                  value={skewFactor}
                  onChange={(e) => {
                    setSkewFactor(parseFloat(e.target.value));
                    setSkewSliderAdjusted(true);
                  }}
                  className="global-slider w-full"
                  aria-valuetext={`${t(translations.skew)}: ${skewFactor.toFixed(2)}`}
                />
              </div>
            </div>

            <div className="slider">
              <label className="block">
                <span className="font-bold">{t(translations.levels)}:</span>
                <span> {heightSegments}</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="slider-levels"
                  min="2"
                  max="30"
                  step="1"
                  value={heightSegments}
                  onChange={(e) => {
                    setHeightSegments(parseInt(e.target.value));
                    setLevelsSliderAdjusted(true);
                  }}
                  className="global-slider w-full"
                  aria-valuetext={`${t(translations.levels)}: ${heightSegments}`}
                />
              </div>
            </div>

            <div className="slider">
              <label className="block">
                <span className="font-bold">{t(translations.columns)}:</span>
                <span> {widthSegments}</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="slider-columns"
                  min="3"
                  max="50"
                  step="1"
                  value={widthSegments}
                  onChange={(e) => {
                    setWidthSegments(parseInt(e.target.value));
                    setColumnsSliderAdjusted(true);
                  }}
                  className="global-slider w-full"
                  aria-valuetext={`${t(translations.columns)}: ${widthSegments}`}
                />
              </div>
            </div>

            <div className="slider">
              <label className="block">
                <span className="font-bold">{t(translations.spacing)}:</span>
                <span> {panelOffset.toFixed(2)}</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  id="slider-spacing"
                  min="0"
                  max="0.5"
                  step="0.005"
                  value={panelOffset}
                  onChange={(e) => {
                    setPanelOffset(parseFloat(e.target.value));
                    setSpacingSliderAdjusted(true);
                  }}
                  className="global-slider w-full"
                  aria-valuetext={`${t(translations.spacing)}: ${panelOffset.toFixed(2)}`}
                />
              </div>
            </div>
          </div>

          <div
            key={`dome-builder-${currentStep}`}
            ref={mountRef}
            className="w-full mb-8 h-[380px] bg-black rounded-lg overflow-hidden"
            role="img"
            aria-label={t(translations.hemisphereAriaLabel)}
          />
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className="rounded-lg w-full 2xl:w-4/5 2xl:mx-auto overflow-hidden">
            <img src={DomeModel} className="w-full" alt={t(translations.domeModelAlt)}></img>
          </div>
        </>
      )}
    </div>
  );
};

export default DomeBuilder;
