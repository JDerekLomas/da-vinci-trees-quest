import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import {
  Pebble,
  CanvasCoordinates,
  CameraOffset,
  DragStart,
  ViewState,
  Point,
  Triple,
  Colors,
  PythagoreanTheoremProofsState,
  PythagoreanTheoremProofsProps,
} from './interface';
import parse from 'html-react-parser';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import '../../../shared/slider.css';
import { useTranslations } from '../../../hooks/useTranslations';
import InfoPopover from './info-popover';

const PythagoreanTheoremProofs: React.FC<PythagoreanTheoremProofsProps> = ({ interaction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const pebblesRef = useRef<Pebble[]>([]);
  const { payload } = useEventListener('pythagorean-theorem-proofs');
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.pythagorean_theorem_proofs &&
    typeof interactiveResponses?.pythagorean_theorem_proofs === 'object'
      ? (interactiveResponses?.pythagorean_theorem_proofs as unknown as PythagoreanTheoremProofsState)
      : undefined;

  const [currentProof, setCurrentProof] = useState<number>(savedState?.currentProof ?? 1);
  const infoButtonRef = useRef<HTMLDivElement>(null);
  const { translations } = interaction;
  const { t } = useTranslations();

  // Proof 1 states (Pebble Proof)
  const [proof1A, setProof1A] = useState<number>(3);
  const [proof1B, setProof1B] = useState<number>(4);
  const [proof1C, setProof1C] = useState<number>(5);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasAnimatedProof, setHasAnimatedProof] = useState<boolean>(false);
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  // Proof 2 states (Water Proof)
  const [proof2A, setProof2A] = useState<number>(3);
  const [proof2B, setProof2B] = useState<number>(4);
  const [proof2C, setProof2C] = useState<number>(5);
  const [pouredA, setPouredA] = useState<boolean>(false);
  const [pouredB, setPouredB] = useState<boolean>(false);
  const [pourOrder, setPourOrder] = useState<'a-first' | 'b-first' | null>(null);
  const [emptySquareState, setEmptySquareState] = useState<{ a: boolean; b: boolean; c: boolean }>({
    a: false,
    b: false,
    c: true,
  });

  // Proof 3 states (Dissection Proof)
  const [proof3A, setProof3A] = useState<number>(100);
  const [proof3B, setProof3B] = useState<number>(150);
  const [currentState, setCurrentState] = useState<number>(1);

  // Current values based on active proof
  const currentA = currentProof === 1 ? proof1A : currentProof === 2 ? proof2A : proof3A;
  const currentB = currentProof === 1 ? proof1B : currentProof === 2 ? proof2B : proof3B;
  const currentC = currentProof === 1 ? proof1C : proof2C;

  // Helper function to calculate hypotenuse with proper formatting
  const calculateHypotenuse = (a: number, b: number): string => {
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return c.toFixed(2);
  };

  // Camera state for pan and zoom (Proof 1)
  const cameraOffsetRef = useRef<CameraOffset>({ x: 0, y: 0 });
  const cameraZoomRef = useRef<number>(1);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<DragStart>({ x: 0, y: 0 });

  // Zoom levels for different triples
  const getZoomLevel = (a: number, b: number): number => {
    if (a === 3 && b === 4) return 1.2; // 3-4-5 triple
    if (a === 6 && b === 8) return 0.8; // 6-8-10 triple - needs more zoom out
    if (a === 5 && b === 12) return 0.6; // 5-12-13 triple - needs even more zoom out
    return 1; // default
  };

  // SVG pan/zoom state (Proof 2)
  const viewStateRef = useRef<ViewState>({
    viewBox: { x: 0, y: 0, width: 800, height: 800 },
    isPanning: false,
    startPoint: { x: 0, y: 0 },
  });

  // Constants
  const PEBBLE_RADIUS = 3.5;
  const PEBBLE_A_COLOR = 'rgba(220, 38, 38, 0.9)';
  const PEBBLE_B_COLOR = 'rgba(37, 99, 235, 0.9)';
  const COLORS: Colors = { a: '#dc2626', b: '#2563eb', c: '#16a34a' };

  // Proof 1 functions (Pebble Proof)
  const getCanvasCoordinates = useCallback((a: number, b: number): CanvasCoordinates => {
    const canvas = canvasRef.current;
    if (!canvas) return { originX: 0, originY: 0, angle: 0, scale: 20 };

    const scale = 20;
    const originX = canvas.width / 2 - (b * scale) / 2;
    const originY = canvas.height / 2 + (a * scale) / 2;
    const angle = Math.atan2(a, b);
    return { originX, originY, angle, scale };
  }, []);

  const handleInfoClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10,
    });
    setIsInfoPopoverOpen(true);
  };

  const applyTransforms = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(cameraZoomRef.current, cameraZoomRef.current);
    ctx.translate(-canvas.width / 2 + cameraOffsetRef.current.x, -canvas.height / 2 + cameraOffsetRef.current.y);
  }, []);

  const drawPebble = useCallback((pebble: Pebble) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(pebble.x, pebble.y, PEBBLE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = pebble.color;
    ctx.fill();
  }, []);

  const drawBackground = useCallback(
    (a: number, b: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const c = Math.sqrt(a * a + b * b);
      const { originX, originY, angle, scale } = getCanvasCoordinates(a, b);

      // Draw squares
      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(originX - a * scale, originY - a * scale, a * scale, a * scale);
      ctx.strokeStyle = '#3b82f6';
      ctx.strokeRect(originX, originY, b * scale, b * scale);

      // Draw rotated c square
      ctx.save();
      ctx.translate(originX, originY - a * scale);
      ctx.rotate(angle);
      ctx.strokeStyle = '#16a34a';
      ctx.strokeRect(0, -c * scale, c * scale, c * scale);
      ctx.restore();

      // Draw text labels
      ctx.font = `bold ${proof1A === 3 ? 16 : proof1A === 5 ? 32 : 24}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Text for square A (red)
      ctx.fillStyle = '#ef4444';
      ctx.fillText(
        `a² = ${a * a}`,
        originX - (proof1A === 3 ? 60 : proof1A === 5 ? 120 : 115) - (a * scale) / 2,
        originY - (a * scale) / 2,
      );

      // Text for square B (blue)
      ctx.fillStyle = '#3b82f6';
      ctx.fillText(
        `b² = ${b * b}`,
        originX + (proof1A === 3 ? 74 : currentA === 5 ? 200 : 130) + (b * scale) / 2,
        originY + (b * scale) / 2,
      );

      // Text for square C (green) - counter-rotated to stay upright
      ctx.save();
      ctx.translate(originX, originY - a * scale);
      ctx.rotate(angle);
      ctx.fillStyle = '#16a34a';
      ctx.fillText(
        `c² = ${c * c}`,
        proof1A === 3 ? 50 : proof1A === 5 ? 120 : 100,
        (-c * scale) / 2 + (proof1A === 3 ? -65 : proof1A === 5 ? -150 : -115),
      );
      ctx.restore();

      // Draw triangle
      ctx.lineWidth = 5 / cameraZoomRef.current;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, originY - a * scale);
      ctx.strokeStyle = '#ef4444';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + b * scale, originY);
      ctx.strokeStyle = '#3b82f6';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(originX, originY - a * scale);
      ctx.lineTo(originX + b * scale, originY);
      ctx.strokeStyle = '#16a34a';
      ctx.stroke();

      ctx.lineWidth = 1;
    },
    [getCanvasCoordinates, proof1A, proof1B, proof1C],
  );

  const generatePebblesWithTargets = useCallback(
    (a: number, b: number, c: number) => {
      const { originX, originY, angle, scale } = getCanvasCoordinates(a, b);
      const pebbles: Pebble[] = [];

      // Generate A square pebbles
      for (let i = 0; i < a; i++) {
        for (let j = 0; j < a; j++) {
          const x = originX - a * scale + (i + 0.5) * scale;
          const y = originY - a * scale + (j + 0.5) * scale;
          pebbles.push({ x, y, tx: x, ty: y, color: PEBBLE_A_COLOR });
        }
      }

      // Generate B square pebbles
      for (let i = 0; i < b; i++) {
        for (let j = 0; j < b; j++) {
          const x = originX + (i + 0.5) * scale;
          const y = originY + (j + 0.5) * scale;
          pebbles.push({ x, y, tx: x, ty: y, color: PEBBLE_B_COLOR });
        }
      }

      // Set target positions in C square
      const c_int = Math.round(c);
      for (let i = 0; i < pebbles.length; i++) {
        const row = Math.floor(i / c_int);
        const col = i % c_int;
        const localX = (col + 0.5) * scale;
        const localY = -(row + 0.5) * scale;
        pebbles[i].tx = originX + localX * Math.cos(angle) - localY * Math.sin(angle);
        pebbles[i].ty = originY - a * scale + localX * Math.sin(angle) + localY * Math.cos(angle);
      }

      pebblesRef.current = pebbles;
    },
    [getCanvasCoordinates],
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    applyTransforms();
    drawBackground(currentA, currentB);

    let allInPlace = true;
    pebblesRef.current.forEach((p) => {
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      if (Math.sqrt(dx * dx + dy * dy) > 1) {
        allInPlace = false;
        p.x += dx * 0.08;
        p.y += dy * 0.08;
      } else {
        p.x = p.tx;
        p.y = p.ty;
      }
      drawPebble(p);
    });

    ctx.restore();

    if (!allInPlace) {
      animationFrameIdRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
    }
  }, [currentA, currentB, applyTransforms, drawBackground, drawPebble, getCanvasCoordinates]);

  const runAnimation = useCallback(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    setIsAnimating(true);
    setHasAnimatedProof(true);
    generatePebblesWithTargets(currentA, currentB, currentC);
    animate();
  }, [currentA, currentB, currentC, generatePebblesWithTargets, animate]);

  const drawStaticState = useCallback(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      setIsAnimating(false);
    }

    setHasAnimatedProof(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    applyTransforms();
    drawBackground(currentA, currentB);

    const { originX, originY, scale } = getCanvasCoordinates(currentA, currentB);

    // Draw A square pebbles
    for (let i = 0; i < currentA; i++) {
      for (let j = 0; j < currentA; j++) {
        const x = originX - currentA * scale + (i + 0.5) * scale;
        const y = originY - currentA * scale + (j + 0.5) * scale;
        drawPebble({ x, y, tx: x, ty: y, color: PEBBLE_A_COLOR });
      }
    }

    // Draw B square pebbles
    for (let i = 0; i < currentB; i++) {
      for (let j = 0; j < currentB; j++) {
        const x = originX + (i + 0.5) * scale;
        const y = originY + (j + 0.5) * scale;
        drawPebble({ x, y, tx: x, ty: y, color: PEBBLE_B_COLOR });
      }
    }

    ctx.restore();
  }, [currentA, currentB, applyTransforms, drawBackground, drawPebble, getCanvasCoordinates]);

  const handleTripleSelect = (a: number, b: number) => {
    const c = Math.round(Math.sqrt(a * a + b * b));

    if (currentProof === 1) {
      setProof1A(a);
      setProof1B(b);
      setProof1C(c);
    } else {
      setProof2A(a);
      setProof2B(b);
      setProof2C(c);
    }

    setHasAnimatedProof(false);

    // Update zoom level for the selected triple
    cameraZoomRef.current = getZoomLevel(a, b);
    // Reset camera offset to center the view
    cameraOffsetRef.current = { x: 0, y: 0 };
  };

  // Proof 1 mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    dragStartRef.current.x = (e.clientX - rect.left) / cameraZoomRef.current - cameraOffsetRef.current.x;
    dragStartRef.current.y = (e.clientY - rect.top) / cameraZoomRef.current - cameraOffsetRef.current.y;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDraggingRef.current) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        cameraOffsetRef.current.x = (e.clientX - rect.left) / cameraZoomRef.current - dragStartRef.current.x;
        cameraOffsetRef.current.y = (e.clientY - rect.top) / cameraZoomRef.current - dragStartRef.current.y;
        drawStaticState();
      }
    },
    [drawStaticState],
  );

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    // Prevent default scroll behavior without using preventDefault
    e.stopPropagation();
    // Zoom functionality removed - only prevent default scroll behavior
  }, []);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    // Set canvas to match container dimensions
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Set initial zoom level based on current triple
    cameraZoomRef.current = getZoomLevel(currentA, currentB);
    cameraOffsetRef.current = { x: 0, y: 0 };

    drawStaticState();
  }, [drawStaticState, currentA, currentB]);

  // Proof 2 functions (Water Proof)
  const updateSVGViewBox = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const vb = viewStateRef.current.viewBox;
    svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`);
  };

  const getSVGEventPoint = (evt: MouseEvent | TouchEvent): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    if ('touches' in evt) {
      point.x = evt.touches[0].clientX;
      point.y = evt.touches[0].clientY;
    } else {
      point.x = evt.clientX;
      point.y = evt.clientY;
    }
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    return point.matrixTransform(ctm.inverse());
  };

  const handleSVGPointerDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    viewStateRef.current.isPanning = true;
    viewStateRef.current.startPoint = getSVGEventPoint(evt.nativeEvent);
  };

  const handleSVGPointerMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    if (!viewStateRef.current.isPanning) return;
    const endPoint = getSVGEventPoint(evt.nativeEvent);
    const dx = endPoint.x - viewStateRef.current.startPoint.x;
    const dy = endPoint.y - viewStateRef.current.startPoint.y;

    viewStateRef.current.viewBox.x -= dx;
    viewStateRef.current.viewBox.y -= dy;
    updateSVGViewBox();
  };

  const handleSVGPointerUp = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    viewStateRef.current.isPanning = false;
  };

  const handleSVGWheel = (evt: React.WheelEvent<HTMLDivElement>) => {
    // Prevent default scroll behavior without using preventDefault
    evt.stopPropagation();
    // Zoom functionality removed - only prevent default scroll behavior
  };

  const createSquare = (id: string, size: number, color: string, area: string) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', size.toString());
    rect.setAttribute('height', size.toString());
    rect.setAttribute('stroke', color);
    rect.setAttribute('stroke-width', '2');
    rect.setAttribute('fill', 'transparent');
    rect.setAttribute('opacity', '0.8');
    group.appendChild(rect);

    if (id === 'c') {
      const waterFromA = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      waterFromA.id = 'water-c-from-a';
      waterFromA.setAttribute('width', size.toString());
      waterFromA.setAttribute('fill', COLORS.a);
      waterFromA.style.transition =
        'height 3s cubic-bezier(0.65, 0, 0.35, 1), y 3s cubic-bezier(0.65, 0, 0.35, 1)';
      group.appendChild(waterFromA);

      const waterFromB = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      waterFromB.id = 'water-c-from-b';
      waterFromB.setAttribute('width', size.toString());
      waterFromB.setAttribute('fill', COLORS.b);
      waterFromB.style.transition =
        'height 3s cubic-bezier(0.65, 0, 0.35, 1), y 3s cubic-bezier(0.65, 0, 0.35, 1)';
      group.appendChild(waterFromB);
    } else {
      const water = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      water.id = `water-${id}`;
      water.setAttribute('width', size.toString());
      water.setAttribute('fill', color);
      water.style.transition = 'height 3s cubic-bezier(0.65, 0, 0.35, 1), y 3s cubic-bezier(0.65, 0, 0.35, 1)';
      group.appendChild(water);
    }

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.id = `text-${id}-label`;
    label.setAttribute('x', (size / 2).toString());
    label.setAttribute('y', (size / 2).toString());
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.setAttribute('font-weight', '700');
    label.setAttribute('font-size', 'clamp(1.1rem, 4.5vw, 1.7rem)');

    // Set text color based on emptySquareState
    const isSquareEmpty = emptySquareState[id as keyof typeof emptySquareState];
    label.setAttribute('fill', isSquareEmpty ? color : '#ffffff');

    const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan1.textContent = `${id}² = `;

    const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan2.setAttribute('font-weight', '700');
    tspan2.textContent = area;

    label.appendChild(tspan1);
    label.appendChild(tspan2);

    group.appendChild(label);
    return group;
  };

  const drawProof2 = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = '';

    const { a, b } = { a: currentA, b: currentB };
    const c = Math.sqrt(a * a + b * b);

    // Add drop shadow filter
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = 'drop-shadow';
    filter.setAttribute('x', '-20%');
    filter.setAttribute('y', '-20%');
    filter.setAttribute('width', '140%');
    filter.setAttribute('height', '140%');
    const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
    feDropShadow.setAttribute('dx', '1');
    feDropShadow.setAttribute('dy', '1');
    feDropShadow.setAttribute('stdDeviation', '2');
    feDropShadow.setAttribute('flood-color', '#000000');
    feDropShadow.setAttribute('flood-opacity', '0.5');
    filter.appendChild(feDropShadow);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Scaling and positioning
    const maxDimension = c + (a * b) / c;
    const scale = (800 * 0.5) / maxDimension;
    const scaledA = a * scale;
    const scaledB = b * scale;
    const scaledC = c * scale;

    const centerX = 400;
    const centerY = 400;

    const apparatusGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    apparatusGroup.id = 'apparatus';

    // Define Triangle vertices
    const p1 = { x: centerX - scaledC / 2, y: centerY };
    const p2 = { x: centerX + scaledC / 2, y: centerY };
    const altitude = (scaledA * scaledB) / scaledC;
    const xOffset = Math.sqrt(scaledB * scaledB - altitude * altitude);
    const p3 = { x: p1.x + xOffset, y: p1.y - altitude };

    // Draw Squares
    const cAreaStr = (c * c) % 1 === 0 ? (c * c).toString() : `${(c * c).toPrecision(3)}...`;

    const squareC = createSquare('c', scaledC, COLORS.c, cAreaStr);
    squareC.setAttribute('transform', `translate(${p1.x}, ${p1.y})`);
    apparatusGroup.appendChild(squareC);

    const angleA = Math.atan2(p3.y - p2.y, p3.x - p2.x) * (180 / Math.PI);
    const squareA = createSquare('a', scaledA, COLORS.a, (a * a).toString());
    squareA.setAttribute('transform', `translate(${p2.x}, ${p2.y}) rotate(${angleA})`);

    // Rotate the text in square A to mirror square B's text orientation
    const textLabelA = squareA.querySelector('#text-a-label') as SVGTextElement;
    if (textLabelA) {
      // Mirror the rotation to make text readable (opposite direction from square B)
      const textX = scaledA / 2;
      const textY = scaledA / 2;
      textLabelA.setAttribute('transform', `rotate(${-angleA}, ${textX}, ${textY})`);
    }

    apparatusGroup.appendChild(squareA);

    const angleB = Math.atan2(p3.y - p1.y, p3.x - p1.x) * (180 / Math.PI);
    const squareB = createSquare('b', scaledB, COLORS.b, (b * b).toString());
    squareB.setAttribute('transform', `translate(${p1.x}, ${p1.y}) rotate(${angleB}) translate(0, -${scaledB})`);

    // Counter-rotate the text inside square B to keep it upright (same as square A)
    const textLabelB = squareB.querySelector('#text-b-label') as SVGTextElement;
    if (textLabelB) {
      const textX = scaledB / 2;
      const textY = scaledB / 2;
      textLabelB.setAttribute('transform', `rotate(${-angleB}, ${textX}, ${textY})`);
    }

    apparatusGroup.appendChild(squareB);

    // Draw Triangle lines
    const lineA = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineA.setAttribute('x1', p2.x.toString());
    lineA.setAttribute('y1', p2.y.toString());
    lineA.setAttribute('x2', p3.x.toString());
    lineA.setAttribute('y2', p3.y.toString());
    lineA.setAttribute('stroke', COLORS.a);
    lineA.setAttribute('stroke-width', '4');
    apparatusGroup.appendChild(lineA);

    const lineB = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineB.setAttribute('x1', p1.x.toString());
    lineB.setAttribute('y1', p1.y.toString());
    lineB.setAttribute('x2', p3.x.toString());
    lineB.setAttribute('y2', p3.y.toString());
    lineB.setAttribute('stroke', COLORS.b);
    lineB.setAttribute('stroke-width', '4');
    apparatusGroup.appendChild(lineB);

    const lineC = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineC.setAttribute('x1', p1.x.toString());
    lineC.setAttribute('y1', p1.y.toString());
    lineC.setAttribute('x2', p2.x.toString());
    lineC.setAttribute('y2', p2.y.toString());
    lineC.setAttribute('stroke', COLORS.c);
    lineC.setAttribute('stroke-width', '4');
    apparatusGroup.appendChild(lineC);

    svg.appendChild(apparatusGroup);
    resetWater();
  }, [currentA, currentB]);

  const resetWater = () => {
    setPouredA(false);
    setPouredB(false);
    setPourOrder(null);
    // Reset emptySquareState to initial state
    setEmptySquareState({ a: false, b: false, c: true });

    ['a', 'b'].forEach((id) => {
      const water = document.getElementById(`water-${id}`) as unknown as SVGElement;
      if (water) {
        const size = (water as unknown as { width: { baseVal: { value: number } } }).width.baseVal.value;
        water.setAttribute('height', size.toString());
        water.setAttribute('y', '0');
      }
      // Reset text colors to white (filled state)
      const textLabel = document.getElementById(`text-${id}-label`) as unknown as SVGTextElement;
      if (textLabel) {
        textLabel.setAttribute('fill', '#ffffff');
      }
    });

    ['water-c-from-a', 'water-c-from-b'].forEach((id) => {
      const water = document.getElementById(id) as unknown as SVGElement;
      if (water) {
        const size = (water as unknown as { width: { baseVal: { value: number } } }).width.baseVal.value;
        water.setAttribute('height', '0');
        water.setAttribute('y', size.toString());
      }
    });

    // Reset C text color to green (empty state)
    const textLabelC = document.getElementById('text-c-label') as unknown as SVGTextElement;
    if (textLabelC) {
      textLabelC.setAttribute('fill', COLORS.c);
    }
  };

  const pour = (source: 'a' | 'b') => {
    if (source === 'a' && !pouredA) {
      setPouredA(true);
      // Set pour order if this is the first pour
      if (!pouredB) {
        setPourOrder('a-first');
      }
      const waterA = document.getElementById('water-a') as unknown as SVGElement;
      if (waterA) {
        // A works correctly with just height = 0
        waterA.setAttribute('height', '0');
      }
      // Update emptySquareState and text color
      setEmptySquareState((prev) => ({ ...prev, a: true, c: false }));
      const textLabelA = document.getElementById('text-a-label') as unknown as SVGTextElement;
      if (textLabelA) {
        textLabelA.setAttribute('fill', COLORS.a);
      }
      const textLabelC = document.getElementById('text-c-label') as unknown as SVGTextElement;
      if (textLabelC) {
        textLabelC.setAttribute('fill', '#ffffff');
      }
    }
    if (source === 'b' && !pouredB) {
      setPouredB(true);
      // Set pour order if this is the first pour
      if (!pouredA) {
        setPourOrder('b-first');
      }
      const waterB = document.getElementById('water-b') as unknown as SVGElement;
      if (waterB) {
        // B needs both height = 0 and y adjustment for correct animation
        const squareSize = (waterB as unknown as { width: { baseVal: { value: number } } }).width.baseVal.value;
        waterB.setAttribute('height', '0');
        waterB.setAttribute('y', squareSize.toString());
      }
      // Update emptySquareState and text color
      setEmptySquareState((prev) => ({ ...prev, b: true, c: false }));
      const textLabelB = document.getElementById('text-b-label') as unknown as SVGTextElement;
      if (textLabelB) {
        textLabelB.setAttribute('fill', COLORS.b);
      }
      const textLabelC = document.getElementById('text-c-label') as unknown as SVGTextElement;
      if (textLabelC) {
        textLabelC.setAttribute('fill', '#ffffff');
      }
    }
  };

  // Proof 3 helper functions (Dissection Proof)
  const lineIntersection = (
    [x1, y1]: [number, number],
    [x2, y2]: [number, number],
    [x3, y3]: [number, number],
    [x4, y4]: [number, number],
  ): [number, number] | null => {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 1e-10) return null;
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  };

  const polygonToPath = (pts: [number, number][]): string => {
    if (!pts || !pts.length) return '';
    const [h, ...rest] = pts;
    return `M${h[0]},${h[1]} ${rest.map(([x, y]) => `L${x},${y}`).join(' ')} Z`;
  };

  const getState1Geometry = () => {
    const a = currentProof === 3 ? proof3A : currentA;
    const b = currentProof === 3 ? proof3B : currentB;
    const S = a + b;
    const TL: [number, number][] = [
      [0, 0],
      [b, 0],
      [0, a],
    ];
    const TR: [number, number][] = [
      [S, 0],
      [S - a, 0],
      [S, b],
    ];
    const BR: [number, number][] = [
      [S, S],
      [S, S - a],
      [S - b, S],
    ];
    const BL: [number, number][] = [
      [0, S],
      [a, S],
      [0, S - b],
    ];

    const V0 = lineIntersection([b, 0], [0, a], [S - a, 0], [S, b]);
    const V1 = lineIntersection([S - a, 0], [S, b], [S, S - a], [S - b, S]);
    const V2 = lineIntersection([S, S - a], [S - b, S], [a, S], [0, S - b]);
    const V3 = lineIntersection([a, S], [0, S - b], [b, 0], [0, a]);

    if (!V0 || !V1 || !V2 || !V3) return { triangles: [], diamond: [] };

    return {
      triangles: [TL, TR, BR, BL],
      diamond: [V0, V1, V2, V3],
    };
  };

  const getState2Geometry = () => {
    const a = currentProof === 3 ? proof3A : currentA;
    const b = currentProof === 3 ? proof3B : currentB;
    const S = a + b;
    const squareA: [number, number][] = [
      [0, b],
      [a, b],
      [a, S],
      [0, S],
    ];
    const squareB: [number, number][] = [
      [a, 0],
      [S, 0],
      [S, b],
      [a, b],
    ];

    const tri1: [number, number][] = [
      [0, 0],
      [a, 0],
      [0, b],
    ];
    const tri2: [number, number][] = [
      [a, 0],
      [a, b],
      [0, b],
    ];
    const tri3: [number, number][] = [
      [a, b],
      [S, b],
      [a, S],
    ];
    const tri4: [number, number][] = [
      [S, b],
      [S, S],
      [a, S],
    ];

    return {
      triangles: [tri1, tri2, tri3, tri4],
      squares: { a: squareA, b: squareB },
    };
  };

  const handleSliderChange = (type: 'a' | 'b', value: string) => {
    const newValue = parseInt(value);
    const otherValue = type === 'a' ? currentB : currentA;
    const newC = Math.round(Math.sqrt(newValue * newValue + otherValue * otherValue));

    if (currentProof === 1) {
      if (type === 'a') {
        setProof1A(newValue);
      } else {
        setProof1B(newValue);
      }
      setProof1C(newC);
    } else if (currentProof === 2) {
      if (type === 'a') {
        setProof2A(newValue);
      } else {
        setProof2B(newValue);
      }
      setProof2C(newC);
    } else if (currentProof === 3) {
      if (type === 'a') {
        setProof3A(newValue);
      } else {
        setProof3B(newValue);
      }
    }
  };

  const resetProof2 = () => {
    drawProof2();
    viewStateRef.current.viewBox = { x: 0, y: 0, width: 800, height: 800 };
    updateSVGViewBox();
  };

  useEffect(() => {
    if (currentProof === 1) {
      initializeCanvas();
      const handleResize = () => initializeCanvas();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
      };
    } else if (currentProof === 2) {
      drawProof2();
      updateSVGViewBox();
    }
  }, [currentProof, currentA, currentB, currentC, initializeCanvas, drawProof2]);

  useEffect(() => {
    if (currentProof === 1) {
      drawStaticState();
    } else if (currentProof === 2) {
      drawProof2();
    }
  }, [currentA, currentB, currentC, currentProof, drawStaticState, drawProof2]);

  // Handle water positioning in Proof 2 when pour states change
  useEffect(() => {
    if (currentProof === 2 && (pouredA || pouredB)) {
      const { a, b } = { a: currentA, b: currentB };
      const c = Math.sqrt(a * a + b * b);
      const cSq = c * c;

      const waterCfromA = document.getElementById('water-c-from-a') as unknown as SVGElement;
      const waterCfromB = document.getElementById('water-c-from-b') as unknown as SVGElement;
      if (!waterCfromA || !waterCfromB) return;
      const scaledC = (waterCfromA as unknown as { width: { baseVal: { value: number } } }).width.baseVal.value;

      const heightA = pouredA ? ((a * a) / cSq) * scaledC : 0;
      const heightB = pouredB ? ((b * b) / cSq) * scaledC : 0;

      // Position water based on pour order
      if (pourOrder === 'a-first') {
        // A was poured first: A at bottom, B on top
        waterCfromA.setAttribute('height', heightA.toString());
        waterCfromA.setAttribute('y', (scaledC - heightA).toString());
        waterCfromB.setAttribute('height', heightB.toString());
        waterCfromB.setAttribute('y', (scaledC - heightA - heightB).toString());
      } else if (pourOrder === 'b-first') {
        // B was poured first: B at bottom, A on top
        waterCfromB.setAttribute('height', heightB.toString());
        waterCfromB.setAttribute('y', (scaledC - heightB).toString());
        waterCfromA.setAttribute('height', heightA.toString());
        waterCfromA.setAttribute('y', (scaledC - heightB - heightA).toString());
      }
    }
  }, [pouredA, pouredB, pourOrder, currentProof, currentA, currentB]);

  const triples: Triple[] = [
    {
      a: 3,
      b: 4,
      label: t(translations.tripleThreeFourFive),
      ariaLabel: t(translations.tripleThreeFourFiveAriaLabel),
    },
    {
      a: 6,
      b: 8,
      label: t(translations.tripleSixEightTen),
      ariaLabel: t(translations.tripleSixEightTenAriaLabel),
    },
    {
      a: 5,
      b: 12,
      label: t(translations.tripleFiveTwelveThirteen),
      ariaLabel: t(translations.tripleFiveTwelveThirteenAriaLabel),
    },
  ];

  const getProofTitle = () => {
    switch (currentProof) {
      case 1:
        return t(translations.proof1Title);
      case 2:
        return t(translations.proof2Title);
      case 3:
        return t(translations.proof3Title);
      default:
        return t(translations.proof1Title);
    }
  };

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'proof' in payload && typeof payload.proof === 'number') {
      setCurrentProof(payload.proof);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: PythagoreanTheoremProofsState = { currentProof };
    setInteractiveResponses(
      (prev) =>
        ({
          ...prev,
          pythagorean_theorem_proofs: currentState,
        }) as unknown as typeof prev,
    );
  }, [currentProof, setInteractiveResponses]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const sliderA = document.getElementById(`slider-a`) as HTMLInputElement;
    const sliderB = document.getElementById(`slider-b`) as HTMLInputElement;
    if (sliderA) {
      updateSliderBackground(sliderA);
    }
    if (sliderB) {
      updateSliderBackground(sliderB);
    }
  }, [currentA, currentB, currentProof, updateSliderBackground]);

  // Get content and heading based on current proof
  const getInfoContent = () => {
    switch (currentProof) {
      case 1:
        return t(translations.proof1InfoBody);
      case 2:
        return t(translations.proof2InfoBody);
      case 3:
        return t(translations.proof3InfoBody);
      default:
        return '';
    }
  };

  const getInfoHeading = () => {
    switch (currentProof) {
      case 1:
        return t(translations.proof1InfoHeading);
      case 2:
        return t(translations.proof2InfoHeading);
      case 3:
        return t(translations.proof3InfoHeading);
      default:
        return "Proof Guide";
    }
  };

  return (
    <div className="w-full text-lg flex flex-col gap-y-6">
      <div className="flex items-center justify-start">
        <h1 className="text-xl text-slate-800">{parse(getProofTitle())}</h1>
        <div 
          ref={infoButtonRef}
          className="relative flex cursor-pointer ml-2" 
          aria-label={`Show information about ${currentProof === 1 ? 'the pebble proof' : currentProof === 2 ? 'the water proof' : 'the dissection proof'}`}
          tabIndex={0}
          role='button'
          onClick={handleInfoClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleInfoClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          aria-expanded={isInfoPopoverOpen}
          aria-haspopup="dialog"
        >
          <span 
            className="w-5 h-5 p-3 rounded-full transition-colors flex items-center justify-center text-white text-m"
            style={{ backgroundColor: '#006BE0', textDecorationLine: 'none' }}
          >
            i
          </span>
        </div>
      </div>

      {currentProof === 1 && (
        <>
          {/* Perfect Triples */}
          <div className="">
            <p className="text-left font-medium text-lg mb-2">{t(translations.selectPerfectTriple)}</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {triples.map(({ a, b, label, ariaLabel }) => {
                const isSelected = currentA === a && currentB === b;
                return (
                  <button
                    key={label}
                    className={`py-3 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                      isSelected
                        ? 'bg-[#006BE2] text-white cursor-default'
                        : 'bg-white border border-[#006BE2] hover:bg-gray-100 text-blue-600'
                    }`}
                    onClick={() => handleTripleSelect(a, b)}
                    aria-label={`${ariaLabel} ${isSelected ? t(translations.selected) : ''}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-between items-center">
            {/* Current Triple Display */}
            <p className="sr-only">
              {t(translations.screenReaderValues)
                .replace('{a}', currentA.toString())
                .replace('{b}', currentB.toString())
                .replace('{c}', currentC.toString())
                .replace('{aSquared}', (currentA * currentA).toString())
                .replace('{bSquared}', (currentB * currentB).toString())
                .replace('{cSquared}', (currentC * currentC).toString())}
            </p>
            <div className="text-center sm:mx-auto lg:mx-0">
              <div
                className="flex justify-center items-center font-besley space-x-4 md:space-x-6"
                aria-hidden="true"
              >
                <div className="font-bold text-2xl text-red-600">
                  <em>a</em> = {currentA}
                </div>
                <div className="font-bold text-2xl text-blue-600">
                  <em>b</em> = {currentB}
                </div>
                <div className="font-bold text-2xl text-green-600">
                  <em>c</em> = {currentC}
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-col items-center mx-auto mt-4 lg:mt-0 lg:mx-0 lg:flex-row gap-3">
              <button
                onClick={() => {
                  if (!isAnimating) {
                    runAnimation();
                  }
                }}
                disabled={isAnimating || hasAnimatedProof}
                className="px-6 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#006BE0]"
              >
                {t(translations.animateProof)}
              </button>
              <button
                onClick={() => {
                  drawStaticState();
                }}
                className="px-6 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white"
              >
                {t(translations.reset)}
              </button>
            </div>
          </div>
          
          {/* Canvas for visualization */}
          <div className="w-full bg-gray-50 mb-8 rounded-lg flex items-center justify-center p-4 h-[360px] overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onWheel={handleWheel}
              role="img"
              aria-label={
                !isAnimating
                  ? hasAnimatedProof
                    ? ''
                    : t(translations.proof1CanvasInitialAriaLabel)
                        .replace('{aSquared}', (currentA * currentA).toString())
                        .replace('{bSquared}', (currentB * currentB).toString())
                  : t(translations.proof1CanvasAnimatingAriaLabel)
                      .replace('{aSquared}', (currentA * currentA).toString())
                      .replace('{bSquared}', (currentB * currentB).toString())
                      .replace('{cSquared}', (currentC * currentC).toString())
              }
            />
          </div>
        </>
      )}

      {currentProof === 2 && (
        <div className="flex flex-col gap-6">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-start">
            <div className="flex flex-1 gap-4 flex-col lg:flex-row">
              <div className="w-full slider-first">
                <label className="block font-bold font-besley text-red-600">
                  <em>a</em> = {currentA}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    id="slider-a"
                    min="1"
                    max="20"
                    value={currentA}
                    onChange={(e) => handleSliderChange('a', e.target.value)}
                    className="global-slider w-full"
                    aria-valuetext={`a is ${currentA}`}
                  />
                </div>
              </div>
              <div className="w-full slider-second">
                <label className="block font-bold font-besley text-blue-600">
                  <em>b</em> = {currentB}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    id="slider-b"
                    min="1"
                    max="20"
                    value={currentB}
                    onChange={(e) => handleSliderChange('b', e.target.value)}
                    className="global-slider w-full"
                    aria-valuetext={`b is ${currentB}`}
                  />
                </div>
              </div>
            </div>
            <div className="font-bold font-besley text-green-600" aria-atomic="true">
              <em>c</em> = {calculateHypotenuse(currentA, currentB)}
            </div>
          </div>
          <p className="sr-only">
            {t(translations.screenReaderSquaredValues)
              .replace('{aSquared}', (currentA * currentA).toString())
              .replace('{bSquared}', (currentB * currentB).toString())
              .replace(
                '{cSquared}',
                (
                  Math.sqrt(currentA * currentA + currentB * currentB) *
                  Math.sqrt(currentA * currentA + currentB * currentB)
                ).toString(),
              )}
          </p>
          {/* Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <button
              onClick={() => pour('a')}
              disabled={pouredA}
              className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#006BE0]"
            >
              {t(translations.pourA)}
            </button>
            <button
              onClick={() => pour('b')}
              disabled={pouredB}
              className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#006BE0]"
            >
              {t(translations.pourB)}
            </button>
            <button
              onClick={resetProof2}
              className="px-4 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              {t(translations.reset)}
            </button>
          </div>
          {/* Visualization */}
          <div
            className="w-full cursor-grab active:cursor-grabbing overflow-hidden bg-gray-50 mb-8 rounded-lg h-[400px]"
            style={{ aspectRatio: '1 / 1', touchAction: 'none' }}
            onMouseDown={handleSVGPointerDown}
            onMouseMove={handleSVGPointerMove}
            onMouseUp={handleSVGPointerUp}
            onMouseLeave={handleSVGPointerUp}
            onWheel={handleSVGWheel}
            aria-label={
              emptySquareState.c
                ? t(translations.proof2CanvasInitialAriaLabel)
                    .replace('{aSquared}', (currentA * currentA).toString())
                    .replace('{bSquared}', (currentB * currentB).toString())
                : !emptySquareState.a && emptySquareState.b
                  ? t(translations.proof2CanvasPouringBAriaLabel).replace(
                      '{bSquared}',
                      (currentB * currentB).toString(),
                    )
                  : emptySquareState.a && !emptySquareState.b
                    ? t(translations.proof2CanvasPouringAAriaLabel).replace(
                        '{aSquared}',
                        (currentA * currentA).toString(),
                      )
                    : t(translations.proof2CanvasCompletedAriaLabel).replace(
                        '{cSquared}',
                        (
                          Math.sqrt(currentA * currentA + currentB * currentB) *
                          Math.sqrt(currentA * currentA + currentB * currentB)
                        ).toString(),
                      )
            }
            role="img"
          >
            <svg ref={svgRef} aria-hidden="true" width="100%" height="100%"></svg>
          </div>
        </div>
      )}

      {currentProof === 3 && (
        <div className="flex flex-col gap-6">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-start">
            <div className="flex flex-1 gap-4 flex-col lg:flex-row">
              <div className="w-full slider-first">
                <label className="block font-bold font-besley text-red-600">
                  <em>a</em> = {currentA}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    id="slider-a"
                    min="50"
                    max="200"
                    value={currentA}
                    onChange={(e) => handleSliderChange('a', e.target.value)}
                    className="global-slider w-full"
                    aria-valuetext={`a is ${currentA}`}
                  />
                </div>
              </div>
              <div className="w-full slider-second">
                <label className="block font-bold font-besley text-blue-600">
                  <em>b</em> = {currentB}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    id="slider-b"
                    min="50"
                    max="200"
                    value={currentB}
                    onChange={(e) => handleSliderChange('b', e.target.value)}
                    className="global-slider w-full"
                    aria-valuetext={`b is ${currentB}`}
                  />
                </div>
              </div>
            </div>
            <div className="font-bold font-besley text-green-600" aria-atomic="true">
              <em>c</em> = {calculateHypotenuse(currentA, currentB)}
            </div>
          </div>
          <p className="sr-only">
            {t(translations.screenReaderSquaredValues)
              .replace('{aSquared}', (currentA * currentA).toString())
              .replace('{bSquared}', (currentB * currentB).toString())
              .replace(
                '{cSquared}',
                (
                  Math.sqrt(currentA * currentA + currentB * currentB) *
                  Math.sqrt(currentA * currentA + currentB * currentB)
                ).toString(),
              )}
          </p>
          {/* Buttons */}
          <div className="flex flex-col items-center mx-auto mt-4 lg:mt-0 lg:mx-0 lg:flex-row gap-3">
            <button
              onClick={() => setCurrentState(currentState === 1 ? 2 : 1)}
              className="px-12 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t(translations.rearrange)}
            </button>
          </div>
          {/* Visualization */}
          <div className="w-full bg-gray-50 mb-8 rounded-lg flex items-center justify-center p-4">
            <svg
              width={Math.min(400, proof3A + proof3B + 40)}
              height={Math.min(400, proof3A + proof3B + 40)}
              viewBox={`-20 -20 ${proof3A + proof3B + 40} ${proof3A + proof3B + 40}`}
              style={{ border: '2px solid #E5E5E5', borderRadius: '8px', backgroundColor: '#ffffff' }}
              role="img"
              aria-label={currentState === 1 ? t(translations.firstPosition) : t(translations.secondPosition)}
            >
              {/* Diamond state */}
              <g style={{ opacity: currentState === 1 ? 1 : 0, transition: 'opacity 0.7s ease-in-out' }}>
                {/* Triangle 1 (Top-left) - Red */}
                <path
                  d={polygonToPath(getState1Geometry().triangles[0])}
                  fill="rgba(220, 38, 38, 0.3)"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                {/* Triangle 2 (Top-right) - Blue */}
                <path
                  d={polygonToPath(getState1Geometry().triangles[1])}
                  fill="rgba(37, 99, 235, 0.3)"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                {/* Triangle 3 (Bottom-right) - Red */}
                <path
                  d={polygonToPath(getState1Geometry().triangles[2])}
                  fill="rgba(220, 38, 38, 0.3)"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                {/* Triangle 4 (Bottom-left) - Blue */}
                <path
                  d={polygonToPath(getState1Geometry().triangles[3])}
                  fill="rgba(37, 99, 235, 0.3)"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                
                {/* Central diamond (c²) */}
                <path
                  d={polygonToPath(getState1Geometry().diamond)}
                  fill="#16a34a"
                  stroke="#16a34a"
                  strokeWidth="1.5"
                />
                <text
                  x={(proof3A + proof3B) / 2}
                  y={(proof3A + proof3B) / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '18px', fontWeight: 'bold', fill: '#FFFFFF' }}
                >
                  {t(translations.area)} = c²
                </text>

                {/* Side labels positioned on triangle sides */}
                {/* Top-left triangle labels */}
                <text
                  x={proof3B / 4}
                  y={5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  b
                </text>
                <text
                  x={5}
                  y={proof3A / 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  a
                </text>
                <text
                  x={proof3B / 3}
                  y={proof3A / 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  c
                </text>
                
                {/* Top-right triangle labels */}
                <text
                  x={proof3A + proof3B * 3 / 4}
                  y={5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  a
                </text>
                <text
                  x={proof3A + proof3B - 5}
                  y={proof3B / 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  b
                </text>
                <text
                  x={proof3A + proof3B * 2 / 3}
                  y={proof3B / 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  c
                </text>
                
                {/* Bottom-right triangle labels */}
                <text
                  x={proof3A + proof3B * 3 / 4}
                  y={proof3A + proof3B - 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  b
                </text>
                <text
                  x={proof3A + proof3B - 5}
                  y={proof3A + proof3B * 3 / 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  a
                </text>
                <text
                  x={proof3A + proof3B * 2 / 3}
                  y={proof3A + proof3B * 2 / 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  c
                </text>
                
                {/* Bottom-left triangle labels */}
                <text
                  x={proof3B / 4}
                  y={proof3A + proof3B - 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  a
                </text>
                <text
                  x={5}
                  y={proof3A + proof3B * 3 / 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  b
                </text>
                <text
                  x={proof3B / 3}
                  y={proof3A + proof3B * 2 / 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  c
                </text>
              </g>

              {/* Rearranged state */}
              <g style={{ opacity: currentState === 2 ? 1 : 0, transition: 'opacity 0.7s ease-in-out' }}>
                {/* Triangle 1 (Top-left) - Red */}
                <path
                  d={polygonToPath(getState2Geometry().triangles[0])}
                  fill="rgba(220, 38, 38, 0.3)"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                {/* Triangle 2 (Top-right) - Blue */}
                <path
                  d={polygonToPath(getState2Geometry().triangles[1])}
                  fill="rgba(37, 99, 235, 0.3)"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                {/* Triangle 3 (Bottom-left) - Red */}
                <path
                  d={polygonToPath(getState2Geometry().triangles[2])}
                  fill="rgba(220, 38, 38, 0.3)"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                {/* Triangle 4 (Bottom-right) - Blue */}
                <path
                  d={polygonToPath(getState2Geometry().triangles[3])}
                  fill="rgba(37, 99, 235, 0.3)"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                
                {/* a² square (bottom-left) - solid red */}
                <path
                  d={polygonToPath(getState2Geometry().squares.a)}
                  fill="#dc2626"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                <text
                  x={proof3A / 2}
                  y={proof3B + proof3A / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '18px', fontWeight: 'bold', fill: '#ffffff' }}
                >
                  {t(translations.area)} = a²
                </text>
                
                {/* b² square (top-right) - solid blue */}
                <path
                  d={polygonToPath(getState2Geometry().squares.b)}
                  fill="#2563eb"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                <text
                  x={proof3A + proof3B / 2}
                  y={proof3B / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '18px', fontWeight: 'bold', fill: '#ffffff' }}
                >
                  {t(translations.area)} = b²
                </text>

                {/* Side labels for rearranged triangles */}
                {/* Top-left triangle labels */}
                <text
                  x={proof3A / 4}
                  y={5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  a
                </text>
                <text
                  x={5}
                  y={proof3B / 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  b
                </text>
                <text
                  x={proof3A / 3}
                  y={proof3B / 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#dc2626' }}
                >
                  c
                </text>

                {/* Bottom-right triangle labels */}
                <text
                  x={proof3A + proof3B * 3 / 4}
                  y={proof3B + proof3A - 5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  b
                </text>
                <text
                  x={proof3A + proof3B - 5}
                  y={proof3B + proof3A * 3 / 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  a
                </text>
                <text
                  x={proof3A + proof3B * 2 / 3}
                  y={proof3B + proof3A * 2 / 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#2563eb' }}
                >
                  c
                </text>
              </g>
            </svg>
          </div>
        </div>
      )}
      {/* InfoPopover component - now works for all proof types */}
      <InfoPopover
        isOpen={isInfoPopoverOpen}
        onClose={() => setIsInfoPopoverOpen(false)}
        content={getInfoContent()}
        heading={getInfoHeading()}
        position={popoverPosition}
        triggerRef={infoButtonRef}
      />
    </div>
  );
};

export default PythagoreanTheoremProofs;
