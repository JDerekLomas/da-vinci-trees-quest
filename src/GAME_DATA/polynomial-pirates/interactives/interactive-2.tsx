import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTranslations } from '../../../hooks/useTranslations';
import interactive2Config from '../configs/interactive-2';
import parse from 'html-react-parser';
import './interactive-2.css';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface DataPoint {
  x: number;
  y: number;
}

interface RegressionResult {
  equation: number[];
  r2: number;
}

interface State {
  scale: number;
  dataPoints: DataPoint[];
  fittedCurve: DataPoint[] | null;
  regressionResult: RegressionResult | null;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  panX: number;
  panY: number;
  isPanning: boolean;
  lastMouseX: number;
  lastMouseY: number;
}

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Payload {
  target: string;
  step: number;
  action?: string;
}

const regression = {
  polynomial: (data: [number, number][], options: { order: number; precision?: number }) => {
    const { order, precision = 15 } = options;
    const n = data.length;

    if (n <= order) {
      return { equation: [], r2: 0 };
    }

    const x = data.map((d) => d[0]);
    const y = data.map((d) => d[1]);

    // Create matrix A and vector b for least squares
    const A: number[][] = [];
    const b: number[] = [];

    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j <= order; j++) {
        row.push(Math.pow(x[i], j)); // Ascending powers: x^0, x^1, x^2, ...
      }
      A.push(row);
      b.push(y[i]);
    }

    // Solve using normal equations: (A^T * A) * coeffs = A^T * b
    const AT = A[0].map((_, colIndex) => A.map((row) => row[colIndex]));
    const ATA = AT.map((row) =>
      A[0].map((_, colIndex) => row.reduce((sum, val, rowIndex) => sum + val * AT[colIndex][rowIndex], 0)),
    );
    const ATb = AT.map((row) => row.reduce((sum, val, index) => sum + val * b[index], 0));

    // Gaussian elimination with partial pivoting
    const n_eq = ATA.length;
    const augmented = ATA.map((row, i) => [...row, ATb[i]]);

    for (let i = 0; i < n_eq; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n_eq; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

      // Forward elimination
      for (let k = i + 1; k < n_eq; k++) {
        if (Math.abs(augmented[i][i]) < 1e-14) continue;
        const factor = augmented[k][i] / augmented[i][i];
        for (let j = i; j < n_eq + 1; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }

    // Back substitution
    const coeffs = new Array(n_eq);
    for (let i = n_eq - 1; i >= 0; i--) {
      coeffs[i] = augmented[i][n_eq];
      for (let j = i + 1; j < n_eq; j++) {
        coeffs[i] -= augmented[i][j] * coeffs[j];
      }
      if (Math.abs(augmented[i][i]) > 1e-14) {
        coeffs[i] /= augmented[i][i];
      }
    }

    // Apply precision rounding
    const roundedCoeffs = coeffs.map((c) => {
      if (Math.abs(c) < Math.pow(10, -precision)) return 0;
      return parseFloat(c.toPrecision(precision));
    });

    // Calculate R²
    const yMean = y.reduce((sum, val) => sum + val, 0) / n;
    let ssRes = 0;
    let ssTot = 0;

    for (let i = 0; i < n; i++) {
      let yPred = 0;
      for (let j = 0; j <= order; j++) {
        yPred += roundedCoeffs[j] * Math.pow(x[i], j); // Ascending powers
      }
      ssRes += Math.pow(y[i] - yPred, 2);
      ssTot += Math.pow(y[i] - yMean, 2);
    }

    const r2 = Math.max(0, Math.min(1, 1 - ssRes / ssTot));

    return { equation: roundedCoeffs, r2 };
  },
};

interface Interactive2Props {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export default function TrenchFloorMapping({ onInteraction }: Interactive2Props) {
  const { t } = useTranslations();

  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('interactive-2') as { payload: Payload };

  const {
    calibrationLabel,
    zoomInLabel,
    zoomOutLabel,
    resetLabel,
    controlesHeading,
    degreeSliderLabel,
    fitButtonLabel,
    tEquals,
    tMinus,
    tPlus,
    tNegative,
    tToThePowerOf,
    seabedScanTitle,
    sliceDataButton,
    dataSlicedButton,
  } = interactive2Config.translations;

  // 3D Scene refs
  const scene3DRef = useRef<THREE.Scene | null>(null);
  const camera3DRef = useRef<THREE.PerspectiveCamera | null>(null);
  const renderer3DRef = useRef<THREE.WebGLRenderer | null>(null);
  const controls3DRef = useRef<OrbitControls | null>(null);
  const container3DRef = useRef<HTMLDivElement>(null);
  const canvas3DRef = useRef<HTMLCanvasElement>(null);
  const pointCloud3DRef = useRef<THREE.Points | null>(null);
  const slicedPointCloud3DRef = useRef<THREE.Points | null>(null);
  const animationFrame3DRef = useRef<number>();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const [currentView, setCurrentView] = useState<'3d' | '2d'>(dialogIndex === 1 ? '3d' : '2d');
  const [isDataSliced, setIsDataSliced] = useState(false);
  const [slicedData, setSlicedData] = useState<DataPoint[] | null>(null);
  const [degree, setDegree] = useState(3);
  const [equation, setEquation] = useState({ html: '', ariaLabel: '' });

  const [state, setState] = useState<State>({
    scale: 50,
    dataPoints: [],
    fittedCurve: null,
    regressionResult: null,
    zoom: 1.0,
    minZoom: 0.1,
    maxZoom: 10.0,
    panX: 0,
    panY: 0,
    isPanning: false,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  // Generate 3D seafloor point cloud
  const seafloorData = useMemo(() => {
    const points: number[] = [];
    const colors: number[] = [];
    const width = 800;
    const depth = 800;
    const segmentsX = 150;
    const segmentsZ = 150;
    const noiseLevel = 3;
    const shipPositionX = 0;
    const shipPositionZ = 0;
    const shipWidthX = 40;
    const shipWidthZ = 20;
    const shipHeight = 55;
    const color = new THREE.Color(0x00ff00);

    for (let i = 0; i <= segmentsX; i++) {
      for (let j = 0; j <= segmentsZ; j++) {
        const x = (i / segmentsX - 0.5) * width;
        const z = (j / segmentsZ - 0.5) * depth;
        let y = Math.sin(x * 0.01) * 10 + Math.cos(z * 0.015) * 8;

        const dx = x - shipPositionX;
        const dz = z - shipPositionZ;
        const influence = Math.exp(
          -((dx * dx) / (2 * shipWidthX * shipWidthX) + (dz * dz) / (2 * shipWidthZ * shipWidthZ)),
        );
        y += shipHeight * influence;
        y += (Math.random() - 0.5) * noiseLevel;

        points.push(x, y, z);
        colors.push(color.r, color.g, color.b);
      }
    }

    return { positions: new Float32Array(points), colors: new Float32Array(colors) };
  }, []);

  // Initialize 3D scene
  const init3DScene = useCallback(() => {
    if (!container3DRef.current || !canvas3DRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene3DRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      container3DRef.current.offsetWidth / container3DRef.current.offsetHeight,
      0.1,
      2000,
    );
    camera.position.set(150, 150, 150);
    camera3DRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas3DRef.current,
      antialias: true,
    });
    renderer.setSize(container3DRef.current.offsetWidth, container3DRef.current.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000);
    renderer3DRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controls.target.set(0, -50, 0);
    controls3DRef.current = controls;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(seafloorData.positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(seafloorData.colors, 3));

    const material = new THREE.PointsMaterial({ size: 1.5, vertexColors: true });
    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);
    pointCloud3DRef.current = pointCloud;

    // Add sliced points if they exist
    if (isDataSliced && slicedData && slicedData.length > 0) {
      const slicedPointsFor3D: number[] = [];
      slicedData.forEach((point) => {
        slicedPointsFor3D.push(point.x, -point.y, 0); // Convert back to 3D coordinates
      });

      if (slicedPointsFor3D.length > 0) {
        const sliceGeometry = new THREE.BufferGeometry();
        sliceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(slicedPointsFor3D, 3));
        const sliceMaterial = new THREE.PointsMaterial({
          color: 0xf6ad55,
          size: 4.0,
          sizeAttenuation: true,
        });
        const sliceCloud = new THREE.Points(sliceGeometry, sliceMaterial);
        scene.add(sliceCloud);
        slicedPointCloud3DRef.current = sliceCloud;
      }
    }

    // Start animation loop
    const animate = () => {
      if (!controls3DRef.current || !renderer3DRef.current || !scene3DRef.current || !camera3DRef.current) return;

      animationFrame3DRef.current = requestAnimationFrame(animate);
      controls3DRef.current.update();
      renderer3DRef.current.render(scene3DRef.current, camera3DRef.current);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container3DRef.current || !camera3DRef.current || !renderer3DRef.current) return;

      camera3DRef.current.aspect = container3DRef.current.offsetWidth / container3DRef.current.offsetHeight;
      camera3DRef.current.updateProjectionMatrix();
      renderer3DRef.current.setSize(container3DRef.current.offsetWidth, container3DRef.current.offsetHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [seafloorData, isDataSliced, slicedData]);

  // Slice 3D data
  const sliceData = useCallback(() => {
    if (isDataSliced) return;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(seafloorData.positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(seafloorData.colors, 3));

    const material = new THREE.PointsMaterial({ size: 1.5, vertexColors: true });
    const pointCloud = new THREE.Points(geometry, material);

    const positionAttribute = pointCloud.geometry.attributes.position;
    const slicePlaneZ = 0;
    const sliceWidth = 5.0;
    const slicedPointsFor2D: DataPoint[] = [];
    const slicedPointsFor3D: number[] = [];

    for (let i = 0; i < positionAttribute.count; i++) {
      const z = positionAttribute.getZ(i);
      if (Math.abs(z - slicePlaneZ) < sliceWidth) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        slicedPointsFor2D.push({ x, y: -y });
        slicedPointsFor3D.push(x, y, z);
      }
    }

    // Add sliced points to 3D scene
    if (slicedPointsFor3D.length > 0 && scene3DRef.current) {
      const sliceGeometry = new THREE.BufferGeometry();
      sliceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(slicedPointsFor3D, 3));
      const sliceMaterial = new THREE.PointsMaterial({
        color: 0xf6ad55,
        size: 4.0,
        sizeAttenuation: true,
      });
      const sliceCloud = new THREE.Points(sliceGeometry, sliceMaterial);
      scene3DRef.current.add(sliceCloud);
      slicedPointCloud3DRef.current = sliceCloud;
    }

    slicedPointsFor2D.sort((a, b) => a.x - b.x);
    setSlicedData(slicedPointsFor2D);
    setState((prev) => ({
      ...prev,
      dataPoints: slicedPointsFor2D,
    }));
    setIsDataSliced(true);
  }, [isDataSliced, seafloorData]);

  // Switch to 2D view
  const switchTo2DView = useCallback(() => {
    if (!slicedData) return;

    if (animationFrame3DRef.current) {
      cancelAnimationFrame(animationFrame3DRef.current);
      animationFrame3DRef.current = undefined;
    }

    setState((prev) => ({
      ...prev,
      dataPoints: slicedData,
    }));

    setCurrentView('2d');
  }, [slicedData]);

  // Switch to 3D view
  const switchTo3DView = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }

    setCurrentView('3d');

    if (scene3DRef.current && camera3DRef.current && renderer3DRef.current && controls3DRef.current) {
      if (isDataSliced && slicedData && !slicedPointCloud3DRef.current) {
        const slicedPointsFor3D: number[] = [];
        slicedData.forEach((point) => {
          slicedPointsFor3D.push(point.x, -point.y, 0);
        });

        if (slicedPointsFor3D.length > 0) {
          const sliceGeometry = new THREE.BufferGeometry();
          sliceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(slicedPointsFor3D, 3));
          const sliceMaterial = new THREE.PointsMaterial({
            color: 0xf6ad55,
            size: 4.0,
            sizeAttenuation: true,
          });
          const sliceCloud = new THREE.Points(sliceGeometry, sliceMaterial);
          scene3DRef.current.add(sliceCloud);
          slicedPointCloud3DRef.current = sliceCloud;
        }
      }

      const animate = () => {
        if (!controls3DRef.current || !renderer3DRef.current || !scene3DRef.current || !camera3DRef.current)
          return;

        animationFrame3DRef.current = requestAnimationFrame(animate);
        controls3DRef.current.update();
        renderer3DRef.current.render(scene3DRef.current, camera3DRef.current);
      };
      animate();
    }
  }, [isDataSliced, slicedData]);

  const predictFromCoeffs = useCallback((normalizedX: number, coeffs: number[]): number => {
    let y = 0;
    for (let i = 0; i < coeffs.length; i++) {
      y += coeffs[i] * Math.pow(normalizedX, i);
    }
    return y;
  }, []);

  const formatEquation = useCallback((coefficients: number[]): { html: string; ariaLabel: string } => {
    if (!coefficients || coefficients.length === 0) {
      return {
        html: '<span style="font-family: Besley" aria-hidden="true"><span style="font-style: italic;">y</span> = 0</span>',
        ariaLabel: 'y ' + t(tEquals) + ' 0',
      };
    }

    let latexString =
      '<span style="font-family: Besley" aria-hidden="true"><span style="font-style: italic;">y</span> = ';
    let ariaLabel = 'y ' + t(tEquals) + ' ';
    let firstTerm = true;

    for (let i = coefficients.length - 1; i >= 0; i--) {
      const coeff = coefficients[i];
      const power = i;

      if (Math.abs(coeff) < 1e-9) continue;

      const absCoeff = Math.abs(coeff);
      let sign = coeff < 0 ? '−' : '+';
      let ariaSign = coeff < 0 ? t(tMinus) : t(tPlus);

      if (firstTerm) {
        sign = coeff < 0 ? '−' : '';
        ariaSign = coeff < 0 ? t(tNegative) : '';
      } else {
        latexString += ` ${sign} `;
        ariaLabel += ` ${ariaSign} `;
      }

      const coeffStr = absCoeff.toFixed(2);
      const ariaCoeffStr = absCoeff.toFixed(2);

      if (Math.abs(absCoeff - 1) > 1e-9 || power === 0) {
        latexString += coeffStr;
        ariaLabel += ariaCoeffStr;
      }

      if (power > 0) {
        latexString += '<span style="font-style: italic; color: #00FFFF"> x</span>';
        ariaLabel += ' x';
        if (power > 1) {
          latexString += `<sup style="color: #B9FBC0;">${power}</sup>`;
          ariaLabel += ` ${t(tToThePowerOf)} ${power}`;
        }
      }
      firstTerm = false;
    }
    latexString += '</span>';

    return {
      html: latexString,
      ariaLabel: ariaLabel,
    };
  }, []);

  const fitModel = useCallback(() => {
    if (state.dataPoints.length < 2) return;

    const dataForRegression: [number, number][] = state.dataPoints.map((p) => [p.x, p.y]);

    const xValues = dataForRegression.map((p) => p[0]);
    const xExtent = [Math.min(...xValues), Math.max(...xValues)];
    const xRange = xExtent[1] - xExtent[0];

    if (xRange === 0) return;

    const normalizedData: [number, number][] = dataForRegression.map((d) => [(d[0] - xExtent[0]) / xRange, d[1]]);

    const regressionResult = regression.polynomial(normalizedData, { order: degree, precision: 15 });
    const coeffs = regressionResult.equation;

    const curvePoints: DataPoint[] = [];
    const extension = xRange * 1.5;
    const extendedMin = xExtent[0] - extension;
    const extendedMax = xExtent[1] + extension;
    const extendedRange = extendedMax - extendedMin;

    const numPoints = 500;
    for (let i = 0; i <= numPoints; i++) {
      const x = extendedMin + (i / numPoints) * extendedRange;
      const normalizedX = (x - xExtent[0]) / xRange;
      const predictedY = predictFromCoeffs(normalizedX, coeffs);
      curvePoints.push({ x, y: predictedY });
    }

    setState((prev) => ({
      ...prev,
      fittedCurve: curvePoints,
      regressionResult,
    }));

    const latexEq = formatEquation(coeffs);
    setEquation(latexEq);

    // Fit model step 2 dialog disabled
    if (payload && payload.action === 'fit-model-button-clicked') {
      onInteraction({ 'interactive2-step-2': true });
    }
  }, [state.dataPoints, degree, formatEquation, payload, predictFromCoeffs, onInteraction]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#060918';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(state.panX, state.panY);
    ctx.scale(state.zoom, state.zoom);

    const view = {
      xMin: -state.panX / state.zoom,
      xMax: (w - state.panX) / state.zoom,
      yMin: -state.panY / state.zoom,
      yMax: (h - state.panY) / state.zoom,
    };

    const getGridSpacing = (range: number) => {
      if (range <= 0) return 1;
      const roughSpacing = range / 5;
      const magnitude = Math.pow(10, Math.floor(Math.log10(roughSpacing)));
      const residual = roughSpacing / magnitude;
      if (residual > 5) return 10 * magnitude;
      if (residual > 2) return 5 * magnitude;
      if (residual > 1) return 2 * magnitude;
      return magnitude;
    };

    const xGridSpacing = getGridSpacing(view.xMax - view.xMin);
    const yGridSpacing = getGridSpacing(view.yMax - view.yMin);

    ctx.lineWidth = 1 / state.zoom;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';

    for (let x = Math.floor(view.xMin / xGridSpacing) * xGridSpacing; x < view.xMax; x += xGridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, view.yMin);
      ctx.lineTo(x, view.yMax);
      ctx.stroke();
    }
    for (let y = Math.floor(view.yMin / yGridSpacing) * yGridSpacing; y < view.yMax; y += yGridSpacing) {
      ctx.beginPath();
      ctx.moveTo(view.xMin, y);
      ctx.lineTo(view.xMax, y);
      ctx.stroke();
    }

    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.rect(padding, padding, w - padding * 2, h - padding * 2);
    ctx.clip();
    ctx.translate(state.panX, state.panY);
    ctx.scale(state.zoom, state.zoom);

    ctx.fillStyle = 'rgba(246, 173, 85, 0.9)';
    state.dataPoints.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3 / state.zoom, 0, Math.PI * 2);
      ctx.fill();
    });

    if (state.fittedCurve && state.fittedCurve.length > 1) {
      ctx.strokeStyle = '#ff6b6b';
      ctx.lineWidth = 2 / state.zoom;
      ctx.beginPath();
      ctx.moveTo(state.fittedCurve[0].x, state.fittedCurve[0].y);
      for (let i = 1; i < state.fittedCurve.length; i++) {
        ctx.lineTo(state.fittedCurve[i].x, state.fittedCurve[i].y);
      }
      ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '12px "Roboto Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let x = Math.floor(view.xMin / xGridSpacing) * xGridSpacing; x < view.xMax; x += xGridSpacing) {
      const screenX = x * state.zoom + state.panX;
      if (screenX > padding && screenX < w - padding) {
        ctx.fillText(x.toFixed(0), screenX, h - padding + 10);
      }
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = Math.floor(view.yMin / yGridSpacing) * yGridSpacing; y < view.yMax; y += yGridSpacing) {
      const screenY = y * state.zoom + state.panY;
      if (screenY > padding && screenY < h - padding) {
        ctx.fillText(y.toFixed(0), padding - 10, screenY);
      }
    }
  }, [state]);

  const resetView = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setState((prev) => {
      let newPanX = 0;
      let newPanY = 0;

      if (prev.dataPoints.length > 0) {
        const xValues = prev.dataPoints.map((p) => p.x);
        const yValues = prev.dataPoints.map((p) => p.y);
        const avgX = xValues.reduce((a, b) => a + b, 0) / xValues.length;
        const avgY = yValues.reduce((a, b) => a + b, 0) / yValues.length;
        newPanX = -avgX + canvas.width / 2;
        newPanY = -avgY + canvas.height / 2;
      }

      return {
        ...prev,
        zoom: 1.0,
        panX: newPanX,
        panY: newPanY,
      };
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    setState((prev) => ({
      ...prev,
      isPanning: true,
      lastMouseX: clientX,
      lastMouseY: clientY,
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setState((prev) => ({ ...prev, isPanning: false }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isPanning: false }));
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!state.isPanning) return;
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      const dx = clientX - state.lastMouseX;
      const dy = clientY - state.lastMouseY;
      setState((prev) => ({
        ...prev,
        panX: prev.panX + dx,
        panY: prev.panY + dy,
        lastMouseX: clientX,
        lastMouseY: clientY,
      }));
    },
    [state.isPanning, state.lastMouseX, state.lastMouseY],
  );

  const handleZoomIn = useCallback(() => {
    setState((prev) => {
      const newZoom = Math.min(prev.maxZoom, prev.zoom + 0.1);
      return { ...prev, zoom: newZoom };
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setState((prev) => {
      const newZoom = Math.max(prev.minZoom, prev.zoom - 0.1);
      return { ...prev, zoom: newZoom };
    });
  }, []);

  // handle slide change
  useEffect(() => {
    if (payload && payload.step) {
      if (payload.step === 1) {
        switchTo3DView();
      } else {
        init3DScene();
        sliceData();
        switchTo2DView();
      }
    }

    if (isDataSliced) {
      onInteraction({ 'interactive2-step-1': true });
    }
  }, [init3DScene, payload, sliceData, switchTo2DView, switchTo3DView, isDataSliced, onInteraction]);

  useEffect(() => {
    if (currentView === '3d') {
      init3DScene();
    }

    return () => {
      if (animationFrame3DRef.current) {
        cancelAnimationFrame(animationFrame3DRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [init3DScene, currentView]);

  useEffect(() => {
    if (currentView === '2d') {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      if (!slicedData) {
        sliceData();
      }

      resetView();
    }

    const handleResize = () => {
      if (currentView === '2d') {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentView, resetView]);

  useEffect(() => {
    if (currentView === '2d' && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (currentView === '2d') {
      animationFrameRef.current = requestAnimationFrame(draw);
    }
  }, [draw, currentView]);

  if (currentView === '3d') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] max-h-screen p-4 bg-gray-900 text-gray-300 rounded-lg">
        <div ref={container3DRef} className="relative w-full h-full min-h-96 flex-grow">
          <div id="seabed-scan-title" className="absolute top-4 left-4 text-white text-xl md:text-2xl font-bold">
            {t(seabedScanTitle)}
          </div>
          <canvas aria-labelledby="seabed-scan-title" ref={canvas3DRef} className="w-full h-full" />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-max flex flex-col lg:flex-row items-center gap-4 p-2 rounded-lg bg-black/30 backdrop-blur-sm">
            <button
              onClick={sliceData}
              disabled={isDataSliced}
              className={`btn-control p-3 text-lg rounded-md font-bold ${isDataSliced ? 'opacity-50' : ''}`}
            >
              {isDataSliced ? t(dataSlicedButton) : t(sliceDataButton)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-gray-300 rounded-lg mb-4">
      <div className="w-full flex flex-col 2xl:flex-row gap-4">
        <div ref={containerRef} className="w-full 2xl:w-2/3 min-h-96 sonar-screen rounded-lg">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleMouseMove}
          />
          <div className="absolute bottom-0 right-0 flex gap-2 p-2 cursor-auto">
            <div className="bg-[#4a5568] text-md rounded-md font-bold flex items-center gap-2">
              <button
                className="h-full px-4 rounded-l-md btn-control"
                onClick={handleZoomOut}
                aria-live="off"
                aria-label={t(zoomOutLabel)}
              >
                <span aria-hidden="true">-</span>
              </button>
              <span className="text-md font-bold w-10 text-center">{(state.zoom * 10).toFixed(0)}%</span>
              <button
                className="h-full px-4 rounded-r-md btn-control"
                onClick={handleZoomIn}
                aria-live="off"
                aria-label={t(zoomInLabel)}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
            <button
              className="btn-control p-2 text-md rounded-md font-bold"
              onClick={resetView}
              aria-label={t(resetLabel)}
            >
              <ResetIcon />
            </button>
          </div>
        </div>

        <div className="w-full 2xl:w-1/3 p-4 rounded-lg control-panel flex flex-col">
          <h3 className="text-lg text-amber-400 border-b-2 border-gray-600 pb-2 font-bold">
            {t(controlesHeading)}
          </h3>

          <div className="space-y-4 mt-4">
            <div aria-live="off" className="text-base font-semibold">
              <label htmlFor={`degree-slider`}>{t(degreeSliderLabel)}</label>:{' '}
              <span className="font-bold text-amber-300">{degree}</span>
            </div>
            <Slider
              id="degree-slider"
              label={t(degreeSliderLabel)}
              value={degree}
              min={1}
              max={25}
              step={1}
              unit=""
              onChange={(e) => setDegree(parseInt(e.target.value))}
            />
            <button onClick={fitModel} className="w-full btn-control p-3 text-lg rounded-md mt-4 font-bold">
              {t(fitButtonLabel)}
            </button>
          </div>
        </div>

        <div className="w-full mb-4 p-4 rounded-lg control-panel">
          <div className="flex flex-col gap-2">
            {!equation.html ? (
              t(calibrationLabel)
            ) : (
              <span aria-label={equation.ariaLabel} role="math">
                {parse(equation.html)}
              </span>
            )}
            {state.regressionResult && (
              <span className="text-lg text-amber-400 font-bold font-besley">
                R² = {state.regressionResult.r2.toFixed(5)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Slider = ({ id, label, value, min, max, step, unit, onChange }: SliderProps) => {
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateSliderBackground = (input: HTMLInputElement) => {
      const min = Number(input.min);
      const max = Number(input.max);
      const value = Number(input.value);
      const percent = ((value - min) / (max - min)) * 100;
      input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
    };
    if (sliderRef.current) {
      updateSliderBackground(sliderRef.current);
    }
  }, [value]);

  return (
    <div key={id} className="w-full text-lg font-medium flex flex-col gap-2">
      <input
        id={id}
        type="range"
        ref={sliderRef}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="global-slider w-full"
        aria-valuetext={`${label} : ${value} ${unit}`}
      />
    </div>
  );
};

const ResetIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
};
