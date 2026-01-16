import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../../../shared/slider.css';
import { GameContext } from '../../../contexts/GameContext';
import { DomeShapeSimulatorProps, DomeShapeSimulatorState } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';

// Helper function for interpolation
const tInterpolate = (key: string, variables: Record<string, string | number> = {}) => {
  let translatedString = key;
  Object.entries(variables).forEach(([variable, value]) => {
    const placeholder = `{{${variable}}}`;
    translatedString = translatedString.replace(new RegExp(placeholder, 'g'), String(value));
  });
  return translatedString;
};

const DomeShapeSimulator: React.FC<DomeShapeSimulatorProps> = ({ interaction }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const controlsRef = useRef<OrbitControls>();
  const domeRef = useRef<THREE.Group>();
  const animationIdRef = useRef<number>();

  const gameContext = useContext(GameContext);
  const { setInteractiveResponses } = gameContext || {};
  const [skewFactor, setSkewFactor] = useState(0.5);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');
  const currentPanelType = 'parallelogram_p100';
  const { translations } = interaction;
  const { t } = useTranslations();

  // Screen reader announcement helper
  const announceToScreenReader = useCallback((message: string, isStatus: boolean = false) => {
    if (isStatus) {
      setStatusAnnouncement(message);
      setTimeout(() => setStatusAnnouncement(''), 100);
    } else {
      setLiveAnnouncement(message);
      setTimeout(() => setLiveAnnouncement(''), 100);
    }
  }, []);

  const radius = 2.5;
  const widthSegments = 24;
  const heightSegments = 12;

  const createDome = (skewFactor: number) => {
    const sphereGeom = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2,
    );
    const positions = sphereGeom.attributes.position;
    const vertex = new THREE.Vector3();
    const yAxis = new THREE.Vector3(0, 1, 0);

    for (let j = 0; j <= heightSegments; j++) {
      const skewAngle = (j / heightSegments) * skewFactor;
      for (let i = 0; i <= widthSegments; i++) {
        const index = j * (widthSegments + 1) + i;
        vertex.fromBufferAttribute(positions, index);
        vertex.applyAxisAngle(yAxis, skewAngle);
        positions.setXYZ(index, vertex.x, vertex.y, vertex.z);
      }
    }
    positions.needsUpdate = true;
    sphereGeom.computeVertexNormals();

    const newDome = new THREE.Group();
    const wireframeGeom = new THREE.BufferGeometry();
    wireframeGeom.setAttribute('position', sphereGeom.getAttribute('position'));
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2,
    });
    const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMaterial);
    newDome.add(wireframe);

    const solarPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      side: THREE.DoubleSide,
      metalness: 0.7,
      roughness: 0.2,
    });
    const frameMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const panelOffset = 0.05;

    const p1 = new THREE.Vector3();
    const p2_orig = new THREE.Vector3();
    const p3 = new THREE.Vector3();
    const p4 = new THREE.Vector3();

    const createPlanarPanel = (j: number, i: number) => {
      const a = j * (widthSegments + 1) + i;
      const b = a + 1;
      const c = (j + 1) * (widthSegments + 1) + i;
      const d = c + 1;

      p1.fromBufferAttribute(positions, a);
      p2_orig.fromBufferAttribute(positions, b);
      p3.fromBufferAttribute(positions, c);
      p4.fromBufferAttribute(positions, d);

      // Create parallelogram panel
      const bottomEdgeVector = new THREE.Vector3().subVectors(p4, p3);
      const p2_new = new THREE.Vector3().addVectors(p1, bottomEdgeVector);

      const center = new THREE.Vector3().add(p1).add(p2_new).add(p3).add(p4).multiplyScalar(0.25);
      const normal = center.clone().normalize();
      const offsetVector = normal.multiplyScalar(panelOffset);

      const p1_lifted = p1.clone().add(offsetVector);
      const p2_lifted = p2_new.clone().add(offsetVector);
      const p3_lifted = p3.clone().add(offsetVector);
      const p4_lifted = p4.clone().add(offsetVector);

      const panelGeom = new THREE.BufferGeometry();
      const panelVertices = new Float32Array([
        p1_lifted.x,
        p1_lifted.y,
        p1_lifted.z,
        p3_lifted.x,
        p3_lifted.y,
        p3_lifted.z,
        p4_lifted.x,
        p4_lifted.y,
        p4_lifted.z,
        p1_lifted.x,
        p1_lifted.y,
        p1_lifted.z,
        p4_lifted.x,
        p4_lifted.y,
        p4_lifted.z,
        p2_lifted.x,
        p2_lifted.y,
        p2_lifted.z,
      ]);
      panelGeom.setAttribute('position', new THREE.BufferAttribute(panelVertices, 3));
      panelGeom.computeVertexNormals();
      newDome.add(new THREE.Mesh(panelGeom, solarPanelMaterial));

      // Only draw the constructed edges (top and right) to avoid double lines with wireframe
      const topEdgeGeom = new THREE.BufferGeometry().setFromPoints([p1_lifted, p2_lifted]);
      newDome.add(new THREE.Line(topEdgeGeom, frameMaterial));
      const rightEdgeGeom = new THREE.BufferGeometry().setFromPoints([p4_lifted, p2_lifted]);
      newDome.add(new THREE.Line(rightEdgeGeom, frameMaterial));
    };

    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < widthSegments; i++) {
        createPlanarPanel(j, i);
      }
    }
    return newDome;
  };

  // COMMENTED OUT: Floating panel beside the dome (reference panel with grid and markers)
  // const createFloatingPanel = useCallback((panelType: string) => {
  //   if (floatingPanelGroupRef.current) {
  //     sceneRef.current?.remove(floatingPanelGroupRef.current);
  //     floatingPanelGroupRef.current.traverse((child) => {
  //       if (child instanceof THREE.Mesh && child.geometry) child.geometry.dispose();
  //       if (child instanceof THREE.Mesh && child.material) {
  //         if (Array.isArray(child.material)) {
  //           child.material.forEach((m) => m.dispose());
  //         } else {
  //           child.material.dispose();
  //         }
  //       }
  //     });
  //   }

  //   floatingPanelGroupRef.current = new THREE.Group();

  //   const panelConfig = panelConfigs[panelType];
  //   if (!panelConfig) return;

  //   const refPanelGeom = new THREE.BufferGeometry();
  //   refPanelGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(panelConfig.vertices), 3));
  //   refPanelGeom.computeVertexNormals();

  //   const referencePanel = new THREE.Mesh(
  //     refPanelGeom,
  //     new THREE.MeshStandardMaterial({
  //       color: 0x0a0a1a,
  //       side: THREE.DoubleSide,
  //       metalness: 0.9,
  //       roughness: 0.3,
  //     }),
  //   );

  //   const frame = new THREE.LineSegments(
  //     new THREE.EdgesGeometry(refPanelGeom),
  //     new THREE.LineBasicMaterial({ color: 0xefefff, linewidth: 3 }),
  //   );
  //   referencePanel.add(frame);

  //   const gridLines: number[] = [];
  //   const numLines = 20;
  //   for (let i = 1; i <= numLines; i++) {
  //     const x = panelConfig.minX + (i * (panelConfig.maxX - panelConfig.minX)) / (numLines + 1);
  //     const y_bottom = panelType.startsWith('parallelogram')
  //       ? Math.max(panelConfig.bottomY, panelConfig.yBottomEq(x))
  //       : panelConfig.yBottomEq(x);
  //     const y_top = Math.min(panelConfig.topY, panelConfig.yTopEq(x));

  //     if (y_top > y_bottom) {
  //       gridLines.push(x, y_bottom, 0.01, x, y_top, 0.01);
  //     }
  //   }
  //   const gridGeom = new THREE.BufferGeometry();
  //   gridGeom.setAttribute('position', new THREE.Float32BufferAttribute(gridLines, 3));
  //   referencePanel.add(
  //     new THREE.LineSegments(
  //       gridGeom,
  //       new THREE.LineBasicMaterial({
  //         color: 0xaaaaaa,
  //         transparent: true,
  //         opacity: 0.6,
  //       }),
  //     ),
  //   );
  //   floatingPanelGroupRef.current.add(referencePanel);

  //   const markerGeom = new THREE.SphereGeometry(0.04, 12, 12);
  //   const markerMat = new THREE.MeshStandardMaterial({
  //     color: 0x00aaff,
  //     emissive: 0x00aaff,
  //     emissiveIntensity: 0.5,
  //   });
  //   const uniqueVerts: THREE.Vector3[] = [];
  //   const posAttr = refPanelGeom.attributes.position;
  //   for (let i = 0; i < posAttr.count; i++) {
  //     const vert = new THREE.Vector3().fromBufferAttribute(posAttr, i);
  //     if (!uniqueVerts.some((v) => v.equals(vert))) {
  //       uniqueVerts.push(vert);
  //     }
  //   }
  //   uniqueVerts.forEach((cornerPos) => {
  //     const marker = new THREE.Mesh(markerGeom, markerMat);
  //     marker.position.copy(cornerPos);
  //     floatingPanelGroupRef.current!.add(marker);
  //   });

  //   floatingPanelGroupRef.current.position.set(3.5, 1.5, 0);
  //   sceneRef.current?.add(floatingPanelGroupRef.current);
  // }, []);

  const rebuildDome = useCallback(() => {
    if (domeRef.current) {
      sceneRef.current?.remove(domeRef.current);
      domeRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry) child.geometry.dispose();
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }
    domeRef.current = createDome(skewFactor);
    if (domeRef.current && sceneRef.current) {
      sceneRef.current.add(domeRef.current);
    }
  }, [skewFactor]);

  const handleSkewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSkewFactor = parseFloat(event.target.value);
    setSkewFactor(newSkewFactor);

    // Announce change to screen readers
    const announcement = tInterpolate(t(translations.skewFactorChanged), { value: newSkewFactor.toFixed(2) });
    announceToScreenReader(announcement, true);
  };

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountElement.clientWidth / mountElement.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 2.5, 4.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    mountElement.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; // Disable mouse wheel zoom
    controlsRef.current = controls;

    // Handle window resize
    const handleResize = () => {
      if (!mountElement || !camera || !renderer) return;
      camera.aspect = mountElement.clientWidth / mountElement.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (domeRef.current) domeRef.current.rotation.y += 0.001;
      // COMMENTED OUT: Floating panel camera lookAt behavior
      // if (floatingPanelGroupRef.current && camera) {
      //   floatingPanelGroupRef.current.lookAt(camera.position);
      // }
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      rebuildDome();
    }
  }, [rebuildDome]);

  // COMMENTED OUT: Effect to create floating panel beside dome
  // useEffect(() => {
  //   if (sceneRef.current) {
  //     createFloatingPanel(currentPanelType);
  //   }
  // }, [createFloatingPanel, currentPanelType]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const skewFactorSlider = document.getElementById(t(translations.sliderId)) as HTMLInputElement;
    if (skewFactorSlider) {
      updateSliderBackground(skewFactorSlider);
    }
  }, [skewFactor, updateSliderBackground, translations.sliderId, t]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: DomeShapeSimulatorState = { currentPanelType };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      dome_shape_simulator: currentState,
    }));
  }, [setInteractiveResponses]);

  const getVisualizationAriaLabel = () => {
    const panelCount = widthSegments * heightSegments;
    return tInterpolate(t(translations.domeStructureDescription), {
      panelCount: panelCount.toString(),
    });
  };

  const getPanelCountDescription = () => {
    const panelCount = widthSegments * heightSegments;
    return tInterpolate(t(translations.panelCountDescription), {
      panelCount: panelCount.toString(),
      rows: heightSegments.toString(),
      columns: widthSegments.toString(),
    });
  };

  return (
    <div
      className="flex flex-col gap-6 text-lg max-w-screen-md mx-auto"
      role="application"
      aria-label={t(translations.visualizationTitle)}
    >
      {/* Screen reader live regions */}
      <div aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" className="sr-only">
        {statusAnnouncement}
      </div>

      {/* Screen reader instructions */}
      <div className="sr-only">
        <p>{t(translations.interactiveInstructions)}</p>
        <p>{t(translations.sliderInstructions)}</p>
        <p>{t(translations.visualizationInstructions)}</p>
        <p>{getPanelCountDescription()}</p>
        <p>{t(translations.domeRotating)}</p>
      </div>

      {/* Main screen reader instruction */}
      <p className="sr-only">{t(translations.screenReaderInstruction)}</p>

      {/* Controls */}
      <fieldset className="w-full slider" aria-labelledby="controls-legend">
        <legend id="controls-legend" className="sr-only">
          {t(translations.controlsLabel)}
        </legend>
        <label htmlFor={t(translations.sliderId)} className="block">
          <span className="font-bold">{t(translations.skewFactor)}:</span>
          <span aria-live="polite" aria-atomic="true">
            {' '}
            {skewFactor.toFixed(2)}
          </span>
        </label>
        <div className="relative">
          <input
            type="range"
            id={t(translations.sliderId)}
            min="0"
            max="1.5"
            step="0.01"
            value={skewFactor}
            onChange={handleSkewChange}
            className="global-slider w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-valuetext={tInterpolate(t(translations.skewValueLabel), { value: skewFactor.toFixed(2) })}
            aria-describedby="slider-description"
            tabIndex={0}
          />
          <div id="slider-description" className="sr-only">
            {t(translations.sliderInstructions)}
          </div>
        </div>
      </fieldset>

      {/* Three.js container */}
      <div
        ref={mountRef}
        className="w-full h-[320px] mb-8 xl:h-[400px] bg-black rounded-lg overflow-hidden focus:ring-2 focus:ring-blue-500 focus:outline-none"
        role="img"
        aria-label={getVisualizationAriaLabel()}
        tabIndex={0}
        aria-describedby="visualization-description"
      />
      <div id="visualization-description" className="sr-only">
        {t(translations.visualizationInstructions)}
      </div>
    </div>
  );
};

export default DomeShapeSimulator;
