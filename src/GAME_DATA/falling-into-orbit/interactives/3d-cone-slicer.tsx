import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import parse from 'html-react-parser';
import { ConicDrawParams, ConicType, ThreeDConeSlicerProps } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { GameContext } from '../../../contexts/GameContext';

const ThreeDConeSlicer: React.FC<ThreeDConeSlicerProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.['3d-cone-slicer'] && typeof interactiveResponses?.['3d-cone-slicer'] === 'object'
      ? (interactiveResponses?.['3d-cone-slicer'] as any)
      : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const coneMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const conicCanvasRef = useRef<HTMLCanvasElement>(null);

  const [angle, setAngle] = useState(savedState?.angle ?? 45);
  const [position, setPosition] = useState(savedState?.position ?? 2);
  const [conicName, setConicName] = useState('');
  const [conicEquation, setConicEquation] = useState('');
  const [activeSliceExample, setActiveSliceExample] = useState(savedState?.activeSliceExample ?? 'ellipse');
  const [hasValidInteraction, setHasValidInteraction] = useState(true);

  // Track if user has manually adjusted the angle slider (not through preset buttons)
  const [angleSliderManuallyAdjusted, setAngleSliderManuallyAdjusted] = useState(
    savedState?.angleSliderManuallyAdjusted ?? false,
  );

  // Function to get translated conic name
  const getConicName = (conicType: ConicType) => {
    switch (conicType) {
      case 'Circle':
        return t(translations.circle);
      case 'Ellipse':
        return t(translations.ellipse);
      case 'Parabola':
        return t(translations.parabola);
      case 'Hyperbola':
        return t(translations.hyperbola);
      default:
        return '';
    }
  };

  // Cone parameters
  const coneRadius = 3;
  const coneHeight = 6;
  const coneAngleWithAxisRad = Math.atan(coneRadius / coneHeight);
  const coneAngleWithBaseDeg = 90 - (coneAngleWithAxisRad * 180) / Math.PI;

  // Custom Shaders for Intersection Highlighting
  const vertexShader = `
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    uniform vec3 uPlanePosition;
    uniform vec3 uPlaneNormal;
    uniform vec3 uConeColor;
    uniform vec3 uHighlightColor;
    uniform float uOpacity;
    uniform vec3 uLightDirection;

    void main() {
      float distance = dot(vWorldPosition - uPlanePosition, uPlaneNormal);
      float thickness = 0.05;

      if (abs(distance) < thickness) {
        gl_FragColor = vec4(uHighlightColor, 1.0);
      } else {
        float lightIntensity = max(0.0, dot(normalize(vNormal), uLightDirection)) * 0.6 + 0.4;
        vec3 finalColor = uConeColor * lightIntensity;
        gl_FragColor = vec4(finalColor, uOpacity);
      }
    }
  `;

  // Helper function to create a graph paper texture
  const createGraphPaperTexture = () => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    if (!context) return new THREE.Texture();

    context.fillStyle = '#fecdd3';
    context.fillRect(0, 0, size, size);

    context.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    context.lineWidth = 2;

    for (let i = 0; i <= size; i += size / 8) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, size);
      context.stroke();
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(size, i);
      context.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    return texture;
  };

  // Function to determine active slice example based on current angle and position
  const updateActiveSliceExample = () => {
    let activeType: 'circle' | 'ellipse' | 'parabola' | 'hyperbola';

    if (angle === 0) {
      activeType = 'circle';
    } else if (angle < coneAngleWithBaseDeg - 0.1) {
      activeType = 'ellipse';
    } else if (Math.abs(angle - coneAngleWithBaseDeg) < 0.1) {
      activeType = 'parabola';
    } else {
      activeType = 'hyperbola';
    }

    setActiveSliceExample(activeType);
  };

  const updateConicEquation = (conicType: ConicType) => {
    // Check for 90-degree plane angle case
    if (Math.abs(angle - 90) < 0.1) {
      if (position < -3 || position > 3) {
        setConicEquation(t(translations.noInteractionStatus));
        setHasValidInteraction(false);
        setActiveSliceExample(''); // Clear active button selection
        return;
      }
    }

    const angleRad = THREE.MathUtils.degToRad(angle);
    const d = position;
    const k = coneRadius / coneHeight;
    const ny = -Math.cos(angleRad);
    const nz = Math.sin(angleRad);
    const C_v2 = ny * ny - k * k * nz * nz;
    const C_v = -2 * d * ny * nz * (1 + k * k);
    const C_1 = d * d * (nz * nz - k * k * ny * ny);

    let equation = t(translations.noIntersectionStatus);
    let drawParams = null;

    if (conicType === 'Parabola') {
      if (Math.abs(C_v) > 1e-6) {
        const p = -C_v;
        const v_offset = C_1 / C_v;
        // Display format: y = -0.67x² - 1.12
        const a = 1 / p;
        const b = v_offset;
        equation = `<span className='italic text-[#008217]'>y</span> = ${a.toFixed(2)}<span className='italic text-[#0061FC]'>x²</span> + ${b.toFixed(2)}`;
        drawParams = { p: p, v_offset: v_offset };
      }
    } else {
      if (Math.abs(C_v2) < 1e-6) return;
      const K = (C_v * C_v) / (4 * C_v2) - C_1;

      if (K < 1e-6 && K > -1e-6) {
        equation = t(translations.singlePointStatus);
      } else if (conicType === 'Circle') {
        if (K > 0 && C_v2 > 0) {
          const a2 = K;
          const radius = Math.sqrt(a2);
          equation = `<span className='italic text-[#0061FC]'>x²</span> + <span className='italic text-[#008217]'>y²</span> = ${radius.toFixed(2)}²`;
          drawParams = { a: Math.sqrt(a2), b: Math.sqrt(a2) };
        }
      } else if (conicType === 'Ellipse') {
        if (K > 0 && C_v2 > 0) {
          const a2 = K;
          const b2 = K / C_v2;
          const a = Math.sqrt(a2);
          const b = Math.sqrt(b2);
          equation = `<span className='italic text-[#0061FC]'>x²</span>/${a.toFixed(2)}² + <span className='italic text-[#008217]'>y²</span>/${b.toFixed(2)}² = 1`;
          drawParams = { a: a, b: b };
        }
      } else if (conicType === 'Hyperbola') {
        const a2 = K;
        const b2 = K / C_v2;
        if (a2 > 0) {
          const a = Math.sqrt(a2);
          const b = Math.sqrt(Math.abs(b2));
          equation = `<span className='italic text-[#0061FC]'>x²</span>/${a.toFixed(2)}² - <span className='italic text-[#008217]'>y²</span>/${b.toFixed(2)}² = 1`;
          drawParams = { a: a, b: b, vertical: false };
        } else {
          const a = Math.sqrt(Math.abs(a2));
          const b = Math.sqrt(Math.abs(b2));
          equation = `<span className='italic text-[#008217]'>y²</span>/${a.toFixed(2)}² - <span className='italic text-[#0061FC]'>x²</span>/${b.toFixed(2)}² = 1`;
          drawParams = { a: a, b: b, vertical: true };
        }
      }
    }
    setConicEquation(equation);

    // Check if there's a valid interaction
    if (equation === t(translations.noIntersectionStatus) || equation === t(translations.singlePointStatus)) {
      setHasValidInteraction(false);
      setActiveSliceExample(''); // Clear active button selection
    } else {
      setHasValidInteraction(true);
      updateActiveSliceExample(); // Update active button for valid interactions
    }

    drawConicSection(conicType, drawParams);
  };

  const drawConicSection = (conicType: ConicType, params: ConicDrawParams | null) => {
    const canvas = conicCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw graph paper grid
    const gridSize = 20;
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw main axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    if (!params) return;

    // Dynamic scaling
    let scale = 20;
    if (params?.a) {
      const max_radius = Math.max(params.a, params.b || 0);
      if (max_radius > 0) scale = Math.min(centerX / max_radius, centerY / max_radius) * 0.8;
    } else if (params?.p) {
      if (params.p !== 0) scale = 250 / Math.abs(params.p);
    }
    scale = Math.max(5, Math.min(50, scale));

    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;

    switch (conicType) {
      case 'Circle':
      case 'Ellipse': {
        const a = (params.a || 0) * scale;
        const b = (params.b || 0) * scale;
        if (a > 0 && b > 0) {
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, a, b, 0, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;
      }
      case 'Parabola': {
        const p = (params.p || 0) * scale;
        const v_offset = (params.v_offset || 0) * scale;
        if (Math.abs(p) === 0) break;
        ctx.beginPath();
        let firstPoint = true;
        for (let i = -centerX; i <= centerX; i++) {
          const x = i;
          // For equation x² = p(y + v_offset), solve for y: y = (x²/p) - v_offset
          const y = (x * x) / p - v_offset;
          if (firstPoint) {
            ctx.moveTo(centerX + x, centerY - y);
            firstPoint = false;
          } else {
            ctx.lineTo(centerX + x, centerY - y);
          }
        }
        ctx.stroke();
        break;
      }
      case 'Hyperbola': {
        const a = (params.a || 0) * scale;
        const b = (params.b || 0) * scale;
        if (a <= 0 || b <= 0) break;

        if (params.vertical) {
          ctx.beginPath();
          for (let x_px = -width / 2; x_px <= width / 2; x_px++) {
            const y_px = a * Math.sqrt(1 + (x_px * x_px) / (b * b));
            if (x_px === -width / 2) ctx.moveTo(centerX + x_px, centerY - y_px);
            else ctx.lineTo(centerX + x_px, centerY - y_px);
          }
          ctx.stroke();
          ctx.beginPath();
          for (let x_px = -width / 2; x_px <= width / 2; x_px++) {
            const y_px = a * Math.sqrt(1 + (x_px * x_px) / (b * b));
            if (x_px === -width / 2) ctx.moveTo(centerX + x_px, centerY + y_px);
            else ctx.lineTo(centerX + x_px, centerY + y_px);
          }
          ctx.stroke();
        } else {
          ctx.beginPath();
          for (let y_px = -height / 2; y_px <= height / 2; y_px++) {
            const x_px = a * Math.sqrt(1 + (y_px * y_px) / (b * b));
            if (y_px === -height / 2) ctx.moveTo(centerX + x_px, centerY + y_px);
            else ctx.lineTo(centerX + x_px, centerY + y_px);
          }
          ctx.stroke();
          ctx.beginPath();
          for (let y_px = -height / 2; y_px <= height / 2; y_px++) {
            const x_px = a * Math.sqrt(1 + (y_px * y_px) / (b * b));
            if (y_px === -height / 2) ctx.moveTo(centerX - x_px, centerY + y_px);
            else ctx.lineTo(centerX - x_px, centerY + y_px);
          }
          ctx.stroke();
        }
        break;
      }
    }
  };

  const updatePlane = () => {
    if (!planeRef.current || !coneMaterialRef.current) return;

    planeRef.current.rotation.x = THREE.MathUtils.degToRad(90 - angle);

    const normal = new THREE.Vector3(0, 0, 1);
    normal.applyAxisAngle(new THREE.Vector3(1, 0, 0), planeRef.current.rotation.x);
    planeRef.current.position.copy(normal).multiplyScalar(position);

    coneMaterialRef.current.uniforms.uPlanePosition.value.copy(planeRef.current.position);
    coneMaterialRef.current.uniforms.uPlaneNormal.value.copy(normal);

    let conicType: ConicType;
    if (angle === 0) {
      conicType = 'Circle';
    } else if (angle < coneAngleWithBaseDeg - 0.1) {
      conicType = 'Ellipse';
    } else if (Math.abs(angle - coneAngleWithBaseDeg) < 0.1) {
      conicType = 'Parabola';
    } else {
      conicType = 'Hyperbola';
    }
    setConicName(getConicName(conicType));
    updateConicEquation(conicType);
  };

  const setSliceExample = (type: 'circle' | 'ellipse' | 'parabola' | 'hyperbola') => {
    setActiveSliceExample(type);

    switch (type) {
      case 'circle':
        setAngle(0);
        setPosition(2.5);
        break;
      case 'ellipse':
        setAngle(45);
        setPosition(2);
        break;
      case 'parabola':
        setAngle(parseFloat(coneAngleWithBaseDeg.toFixed(1)));
        setPosition(1.5);
        break;
      case 'hyperbola':
        setAngle(90);
        setPosition(1);
        break;
    }
  };

  // Handler for manual angle slider changes
  const handleAngleChange = (newAngle: number) => {
    setAngle(newAngle);
    setAngleSliderManuallyAdjusted(true);
  };

  // Handler for position slider changes with restriction to prevent position 0
  const handlePositionChange = (newPosition: number) => {
    // Prevent setting position to exactly 0
    if (Math.abs(newPosition) < 0.05) {
      // If the value is very close to 0, set it to a small positive or negative value
      setPosition(newPosition >= 0 ? 0.1 : -0.1);
    } else {
      setPosition(newPosition);
    }
  };

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    // Set static camera position for consistent zoom level
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0); // Look at the center of the scene
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom functionality
    controls.target.set(0, 0, 0); // Set target to center of scene
    controls.update(); // Update controls with new target
    controlsRef.current = controls;

    // Cone geometry and material
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 128);
    const coneMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uPlanePosition: { value: new THREE.Vector3() },
        uPlaneNormal: { value: new THREE.Vector3(0, 1, 0) },
        uConeColor: { value: new THREE.Color(0x1d4ed8) },
        uHighlightColor: { value: new THREE.Color(0xffff00) },
        uOpacity: { value: 0.5 },
        uLightDirection: { value: new THREE.Vector3(5, 10, 7.5).normalize() },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    coneMaterialRef.current = coneMaterial;

    // Create cones
    const upperCone = new THREE.Mesh(coneGeometry, coneMaterial);
    upperCone.position.y = -coneHeight / 2;
    scene.add(upperCone);

    const lowerCone = new THREE.Mesh(coneGeometry, coneMaterial);
    lowerCone.rotation.x = Math.PI;
    lowerCone.position.y = coneHeight / 2;
    scene.add(lowerCone);

    // Slicing plane
    const planeGeometry = new THREE.PlaneGeometry(15, 15);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: createGraphPaperTexture(),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    planeRef.current = plane;

    // Initial setup
    setSliceExample('ellipse');

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    updatePlane();
  }, [angle, position]);

  // Save state to interactiveResponses
  useEffect(() => {
    if (setInteractiveResponses) {
      setInteractiveResponses((prev) => ({
        ...prev,
        '3d-cone-slicer': {
          angle,
          position,
          activeSliceExample,
          angleSliderManuallyAdjusted,
        },
      }));
    }
  }, [angle, position, activeSliceExample, angleSliderManuallyAdjusted, setInteractiveResponses]);

  useEffect(() => {
    // Update slider backgrounds when values change
    const timeoutId = setTimeout(() => {
      const angleSlider = document.getElementById('slider-angle') as HTMLInputElement;
      const positionSlider = document.getElementById('slider-position') as HTMLInputElement;

      if (angleSlider) {
        updateSliderBackground(angleSlider);
      }
      if (positionSlider) {
        updateSliderBackground(positionSlider);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [angle, position, updateSliderBackground]);

  return (
    <div className="flex flex-col gap-6 text-lg">
      {/* Controls */}
      <div className="grid grid-cols-1 gap-y-2 gap-x-4 lg:grid-cols-2">
        <div className="slider">
          <label className="block">
            <span className="font-bold">{t(translations.planeAngleLabel)}</span>
            <span> {angle.toFixed(1)}°</span>
          </label>
          <div className="relative">
            <input
              type="range"
              id="slider-angle"
              min="0"
              max="90"
              value={angle}
              step="0.5"
              onChange={(e) => handleAngleChange(parseFloat(e.target.value))}
              className="global-slider w-full"
            />
          </div>
        </div>
        <div className="slider">
          <label className="block">
            <span className="font-bold">{t(translations.planePositionLabel)}</span>
            <span> {position.toFixed(1)}</span>
          </label>
          <div className="relative">
            <input
              type="range"
              id="slider-position"
              min="-4"
              max="4"
              value={position}
              step="0.1"
              onChange={(e) => handlePositionChange(parseFloat(e.target.value))}
              className="global-slider w-full"
            />
          </div>
        </div>
      </div>

      {/* Slice Presets */}
      <div>
        <h3 className="text-lg font-semibold text-gray-600 -mt-3">{t(translations.exampleSlicesLabel)}</h3>
        <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => setSliceExample('circle')}
            className={
              activeSliceExample === 'circle'
                ? 'px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'px-4 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }
          >
            {t(translations.circle)}
          </button>
          <button
            onClick={() => setSliceExample('ellipse')}
            className={
              activeSliceExample === 'ellipse'
                ? 'px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'px-4 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }
          >
            {t(translations.ellipse)}
          </button>
          <button
            onClick={() => setSliceExample('parabola')}
            className={
              activeSliceExample === 'parabola'
                ? 'px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'px-4 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }
          >
            {t(translations.parabola)}
          </button>
          <button
            onClick={() => setSliceExample('hyperbola')}
            className={
              activeSliceExample === 'hyperbola'
                ? 'px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'px-4 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }
          >
            {t(translations.hyperbola)}
          </button>
        </div>
      </div>

      {/* 3D View */}
      <div ref={containerRef} className="w-full h-[400px] rounded-lg overflow-hidden bg-gray-200">
        {/* Three.js canvas will be inserted here */}
      </div>

      {/* Slice Details */}
      {hasValidInteraction && (
        <div className="mb-6 border-2 border-[#006BE0] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t(translations.sliceDetailsLabel)}</h3>
          <p className="text-gray-800 mb-2">
            {t(translations.sliceShapeLabel)} <span className="text-blue-600">{conicName}</span>
          </p>
          <div>
            <p className="text-gray-800">{t(translations.conicEquationLabel)}</p>
            <p className="font-besley font-bold text-gray-800">{parse(conicEquation)}</p>
          </div>
          <div className="mt-4">
            <canvas
              ref={conicCanvasRef}
              width="200"
              height="200"
              className="mx-auto bg-white border rounded-lg shadow-inner"
            />
          </div>
        </div>
      )}
      {!hasValidInteraction && (
        <div className="mb-6 text-lg -mt-2 text-red-600">{t(translations.noIntersectionMessage)}</div>
      )}
    </div>
  );
};

export default ThreeDConeSlicer;
