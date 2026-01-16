/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import correspondingAnglesConfig from '../configs/corresponding-angles';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import { CorrespondingAnglesProofState, Line, SummarySlideProps } from './interface';
import PostulareInfoPopover from './postulate-info-popover';

const { steps, tools, proof, summary } = correspondingAnglesConfig;

const SummarySlide: React.FC<SummarySlideProps> = ({ onClose }) => {
  const { t } = useTranslations();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg p-8 max-w-2xl mx-4 shadow-xl border border-blue-500/20">
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{t(summary.title)}</h2>
            <button
              aria-label={t('popover.close')}
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full text-gray-600 hover:text-black"
            >
              ×
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg width="400" height="300" viewBox="0 0 400 300" className="rounded-lg p-4">
                {/* Parallel lines */}
                <line x1="50" y1="80" x2="350" y2="80" stroke="black" strokeWidth="2" />
                <line x1="50" y1="220" x2="350" y2="220" stroke="black" strokeWidth="2" />

                {/* Parallel lines labels */}
                <text x="360" y="85" fill="black" className="text-base font-[besley] italic">
                  l₁
                </text>
                <text x="360" y="225" fill="black" className="text-base font-[besley] italic">
                  l₂
                </text>

                {/* Transversal */}
                <line x1="120" y1="40" x2="280" y2="260" stroke="black" strokeWidth="2" />

                {/* First intersection point */}
                <g transform="translate(160,80)">
                  {/* Angle labels */}
                  <text x="-5" y="-30" fill="#E0002B" className="font-[besley] italic text-lg">
                    a
                  </text>
                  <text x="-5" y="40" fill="#633300" className="font-[besley] italic text-lg">
                    c
                  </text>
                </g>

                {/* Second intersection point */}
                <g transform="translate(240,220)">
                  {/* Angle labels */}
                  <text x="-5" y="-30" fill="#0061FC" className="font-[besley] italic text-lg">
                    b
                  </text>
                  <text x="-5" y="40" fill="#677600" className="font-[besley] italic text-lg">
                    y
                  </text>
                </g>
              </svg>

              {/* Legend */}
              <div className="absolute top-4 right-4">
                <div className="space-y-2 text-base">
                  <div className="flex items-center gap-2">
                    <span className="font-[besley] italic" style={{ color: '#E0002B' }}>
                      ∠a
                    </span>
                    <span className="text-black">=</span>
                    <span className="font-[besley] italic" style={{ color: '#0061FC' }}>
                      ∠b
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-[besley] italic" style={{ color: '#633300' }}>
                      ∠c
                    </span>
                    <span className="text-black">=</span>
                    <span className="font-[besley] italic" style={{ color: '#677600' }}>
                      ∠y
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button onClick={onClose} className="px-6 py-2 bg-[#006BE0] text-white rounded-lg">
              {t(summary.gotIt)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CorrespondingAnglesProofProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const CorrespondingAnglesProof: React.FC<CorrespondingAnglesProofProps> = ({ onInteraction }) => {
  const { t } = useTranslations();

  const [popoverState, setPopoverState] = useState<{
    isOpen: boolean;
    content: string;
    position: { x: number; y: number };
    triggerRef: React.RefObject<HTMLButtonElement>;
  } | null>(null);

  const postulateButtonRef = useRef<HTMLButtonElement>(null);
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    throw new Error();
  }
  const { interactiveResponses, setInteractiveResponses } = gameContext;
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const isValidEquation = useCallback(
    (equation: { left: string; right: string }, equationType: string): boolean => {
      if (!equation.left || !equation.right) return false;

      const validPairs =
        equationType === 'first'
          ? [
              ['a', 'c'],
              ['c', 'a'],
            ]
          : [
              ['b', 'c'],
              ['c', 'b'],
            ];

      return validPairs.some(([left, right]) => equation.left === left && equation.right === right);
    },
    [],
  );

  const getAngleColor = useCallback((angleLabel: string) => {
    switch (angleLabel) {
      case 'a':
        return '#E0002B'; // Red
      case 'b':
        return '#0061FC'; // Blue
      case 'c':
        return '#633300'; // Brown
      default:
        return 'black';
    }
  }, []);

  const proofSteps = [
    {
      id: 'firstEquation',
      title: t(proof.firstEquation),
      statement: (
        <span>
          <span style={{ color: getAngleColor('a') }} className="font-[besley] italic">
            ∠a
          </span>{' '}
          +{' '}
          <span style={{ color: getAngleColor('c') }} className="font-[besley] italic">
            ∠c
          </span>{' '}
          = 180°
        </span>
      ),
      explanation: t(proof.firstEquationExplanation),
      validPairs: ['a', 'c'],
    },
    {
      id: 'secondEquation',
      title: t(proof.secondEquation),
      statement: (
        <span>
          <span style={{ color: getAngleColor('c') }} className="font-[besley] italic">
            ∠c
          </span>{' '}
          +{' '}
          <span style={{ color: getAngleColor('b') }} className="font-[besley] italic">
            ∠b
          </span>{' '}
          = 180°
        </span>
      ),
      explanation: t(proof.secondEquationExplanation),
      validPairs: ['c', 'b'],
    },
  ];

  // Retrieve stored lines and equations from interactiveResponses
  const storedLines = interactiveResponses['corresponding-angles']?.lines
    ? (JSON.parse(interactiveResponses['corresponding-angles'].lines as string) as {
        line1: { x: number; y: number }[];
        line2: { x: number; y: number }[];
        transversal: { x: number; y: number }[];
      })
    : { line1: [], line2: [], transversal: [] };

  const storedFirstEquation = interactiveResponses['corresponding-angles']?.firstEquation
    ? (JSON.parse(interactiveResponses['corresponding-angles'].firstEquation as string) as {
        left: string | null;
        right: string | null;
      })
    : { left: null, right: null };

  const storedSecondEquation = interactiveResponses['corresponding-angles']?.secondEquation
    ? (JSON.parse(interactiveResponses['corresponding-angles'].secondEquation as string) as {
        left: string | null;
        right: string | null;
      })
    : { left: null, right: null };

  const [state, setState] = useState<CorrespondingAnglesProofState>({
    step: 0,
    firstLine: storedLines.line1.length > 0 ? { start: storedLines.line1[0], end: storedLines.line1[1] } : null,
    point: null,
    secondLine: storedLines.line2.length > 0 ? { start: storedLines.line2[0], end: storedLines.line2[1] } : null,
    transversal:
      storedLines.transversal.length > 0
        ? { start: storedLines.transversal[0], end: storedLines.transversal[1] }
        : null,
    firstEquation: storedFirstEquation,
    secondEquation: storedSecondEquation,
    isDragging: null,
    draggedOver: null,
    activeAngle: null,
    proofStep: 0,
    completedSteps: getInitialCompletedSteps(storedFirstEquation, storedSecondEquation),
    isReviewing: false,
    showSummary: false,
  });

  const [step0Completed, setStep0Completed] = useState(false);
  const [step1Completed, setStep1Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);
  const [step4Completed, setStep4Completed] = useState(false);

  useEffect(() => {
    if (step0Completed) {
      onInteraction({ 'step-1-completed': true });
    }
    if (step1Completed) {
      onInteraction({ 'step-2-completed': true });
    }
    if (step3Completed) {
      onInteraction({ 'step-3-completed': true });
    }
    if (step4Completed) {
      onInteraction({ 'step-4-completed': true });
    }
  }, [step0Completed, step1Completed, step3Completed, step4Completed, onInteraction]);

  const { payload } = useEventListener('corresponding-angles');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setState((prev) => ({ ...prev, step: payload.step as number }));
    }
  }, [payload, state.step]);

  useEffect(() => {
    const linesToSave = {
      line1: state.firstLine ? [state.firstLine.start, state.firstLine.end] : [],
      line2: state.secondLine ? [state.secondLine.start, state.secondLine.end] : [],
      transversal: state.transversal ? [state.transversal.start, state.transversal.end] : [],
    };

    setInteractiveResponses((prev) => ({
      ...prev,
      'corresponding-angles': {
        ...prev['corresponding-angles'],
        lines: JSON.stringify(linesToSave),
        firstEquation: JSON.stringify(state.firstEquation),
        secondEquation: JSON.stringify(state.secondEquation),
      },
    }));
  }, [
    state.firstLine,
    state.secondLine,
    state.transversal,
    state.firstEquation,
    state.secondEquation,
    setInteractiveResponses,
  ]);

  useEffect(() => {
    if (state.activeAngle) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, activeAngle: null }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.activeAngle]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stepsConfig = [
    {
      title: t(steps.step0.title),
      instruction: t(steps.step0.instruction),
    },
    {
      title: t(steps.step1.title),
      instruction: t(steps.step1.instruction),
    },
    {
      title: t(steps.step2.title),
      instruction: t(steps.step2.instruction),
    },
    {
      title: t(steps.step3.title),
      instruction: t(steps.step3.instruction),
    },
    {
      title: t(steps.step4.title),
      instruction: t(steps.step4.instruction),
    },
  ];

  const getIntersection = useCallback(
    (
      line1: { start: { x: any; y: any }; end: { x: any; y: any } },
      line2: { start: { x: any; y: any }; end: { x: any; y: any } },
    ) => {
      const x1 = line1.start.x;
      const y1 = line1.start.y;
      const x2 = line1.end.x;
      const y2 = line1.end.y;
      const x3 = line2.start.x;
      const y3 = line2.start.y;
      const x4 = line2.end.x;
      const y4 = line2.end.y;

      const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (Math.abs(denominator) < 0.001) return null;

      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

      // Check if intersection point lies on both line segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null;

      return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
      };
    },
    [],
  );

  const drawArrowhead = useCallback(
    (
      ctx: {
        beginPath: () => void;
        moveTo: (arg0: any, arg1: any) => void;
        lineTo: (arg0: number, arg1: number) => void;
        strokeStyle: any;
        stroke: () => void;
      },
      point: { x: number; y: number },
      angle: number,
      color: any,
    ) => {
      const size = 10;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x - size * Math.cos(angle - Math.PI / 6), point.y - size * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x - size * Math.cos(angle + Math.PI / 6), point.y - size * Math.sin(angle + Math.PI / 6));
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    [],
  );

  const drawLine = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      start: { x: number; y: number },
      end: { x: number; y: number },
      color = 'black',
    ) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      drawArrowhead(ctx, start, angle + Math.PI, color);
      drawArrowhead(ctx, end, angle, color);
    },
    [drawArrowhead],
  );

  const drawPoint = useCallback((ctx: CanvasRenderingContext2D, x: any, y: any) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '';
    ctx.fill();
  }, []);

  const drawText = useCallback(
    (
      ctx: {
        save: () => void;
        translate: (arg0: any, arg1: any) => void;
        rotate: (arg0: number) => void;
        beginPath: () => void;
        arc: (arg0: number, arg1: number, arg2: number, arg3: number, arg4: number) => void;
        fillStyle: string;
        fill: () => void;
        font: string;
        textAlign: string;
        textBaseline: string;
        fillText: (arg0: any, arg1: number, arg2: number) => void;
        restore: () => void;
      },
      text: string,
      x: any,
      y: any,
      angle = 0,
      isActive = false,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      if (isActive) {
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.fill();
      }

      ctx.font = isActive ? 'bold 18px besley' : '16px besley';
      ctx.fillStyle = getAngleColor(text.replace('∠', ''));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    },
    [getAngleColor],
  );

  const drawLabels = useCallback(
    (
      ctx: any,
      firstLine: { end: { x: number; y: any } },
      secondLine: { end: { x: number; y: any } },
      transversal: { end: { y: number; x: number }; start: { y: number; x: number } },
    ) => {
      if (firstLine) {
        drawText(ctx, 'l₁', firstLine.end.x + 20, firstLine.end.y);
      }
      if (secondLine) {
        drawText(ctx, 'l₂', secondLine.end.x + 20, secondLine.end.y);
      }
      if (transversal) {
        const angle = Math.atan2(transversal.end.y - transversal.start.y, transversal.end.x - transversal.start.x);
        drawText(ctx, 't₁', transversal.end.x + 20, transversal.end.y - 20, angle);
      }

      if (firstLine && secondLine && transversal) {
        const isValidLine = (line: any): line is { start: { x: any; y: any }; end: { x: any; y: any } } =>
          line && typeof line.start === 'object' && typeof line.end === 'object';

        const int1 = isValidLine(firstLine) ? getIntersection(firstLine, transversal) : null;
        const int2 =
          secondLine && 'start' in secondLine && 'end' in secondLine
            ? getIntersection(secondLine as { start: { x: any; y: any }; end: { x: any; y: any } }, transversal)
            : null;

        if (int1) {
          drawText(ctx, '∠a', int1.x + 20, int1.y - 20, 0, state.activeAngle === 'a');
          // Changed position: Move delta to the right side of the transversal
          drawText(ctx, '∠c', int1.x + 50, int1.y + 20, 0, state.activeAngle === 'c');
        }

        if (int2) {
          drawText(ctx, '∠b', int2.x + 20, int2.y - 20, 0, state.activeAngle === 'b');
        }
      }
    },
    [drawText, getIntersection, state.activeAngle],
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, angle: string) => {
    e.dataTransfer.effectAllowed = 'move';
    setState((prev) => ({ ...prev, isDragging: angle }));
    setState((prev) => ({ ...prev, activeAngle: angle }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, position: string) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, draggedOver: position as 'left' | 'right' | null }));
  };

  const handleDragLeave = () => {
    setState((prev) => ({ ...prev, draggedOver: null }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: string) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, draggedOver: null }));
    setState((prev) => ({ ...prev, activeAngle: null }));

    if (state.isDragging) {
      processDrop(state.isDragging, position as 'left' | 'right');
    }
    setState((prev) => ({ ...prev, isDragging: null }));
  };

  const calculateParallelLine = useCallback(
    (
      point: { x: number; y: number },
      firstLine: { end: { x: number; y: number }; start: { x: number; y: number } },
    ) => {
      const dx = firstLine.end.x - firstLine.start.x;
      const dy = firstLine.end.y - firstLine.start.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      const halfLength = length / 2;
      const unitX = dx / length;
      const unitY = dy / length;

      return {
        start: {
          x: point.x - unitX * halfLength,
          y: point.y - unitY * halfLength,
        },
        end: {
          x: point.x + unitX * halfLength,
          y: point.y + unitY * halfLength,
        },
      };
    },
    [],
  );

  const drawAngleArc = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      center: { x: any; y: any },
      startAngle: number,
      endAngle: number,
      radius = 30,
      color = 'black',
      angleLabel: string,
    ) => {
      ctx.beginPath();

      const angleDiff = (endAngle - startAngle + Math.PI * 2) % (Math.PI * 2);
      if (angleDiff > Math.PI) {
        [startAngle, endAngle] = [endAngle, startAngle];
      }

      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.arc(center.x, /*  */ center.y, radius, startAngle, endAngle);
      ctx.lineTo(center.x, center.y);

      const isSupplementaryAngle =
        state.proofStep === 0 &&
        (angleLabel === 'a' || angleLabel === 'c') &&
        state.firstEquation.left &&
        state.firstEquation.right &&
        state.firstEquation.left !== null &&
        state.firstEquation.right !== null &&
        isValidEquation(state.firstEquation as { left: string; right: string }, 'first');

      const isSameSideInterior =
        state.proofStep === 1 &&
        (angleLabel === 'b' || angleLabel === 'c') &&
        state.secondEquation.left &&
        state.secondEquation.right &&
        ((state.secondEquation.left === 'b' && state.secondEquation.right === 'c') ||
          (state.secondEquation.left === 'c' && state.secondEquation.right === 'b'));

      if (isSupplementaryAngle || isSameSideInterior) {
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
      } else {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
      }

      ctx.stroke();
    },
    [state.firstEquation, state.secondEquation, state.proofStep, isValidEquation],
  );

  const drawAngles = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      int1: { x: any; y: any },
      int2: { x: any; y: any },
      transversalAngle: number,
      line1Angle: number,
      line2Angle: number,
    ) => {
      const isBottomToTop = state.transversal && state.transversal.start.y > state.transversal.end.y;

      const adjustedTransversalAngle = isBottomToTop ? transversalAngle + Math.PI : transversalAngle;

      if (int1) {
        drawAngleArc(ctx, int1, adjustedTransversalAngle, line1Angle, 30, getAngleColor('c'), 'a');

        drawAngleArc(ctx, int1, line1Angle, adjustedTransversalAngle + Math.PI, 25, getAngleColor('a'), 'c');
      }

      if (int2) {
        drawAngleArc(ctx, int2, line2Angle, adjustedTransversalAngle + Math.PI, 30, getAngleColor('b'), 'b');
      }
    },
    [drawAngleArc, getAngleColor, state.transversal],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (state.firstLine) {
      drawLine(ctx, state.firstLine.start, state.firstLine.end);
    }

    if (state.point && state.secondLine) {
      drawPoint(ctx, state.point.x, state.point.y);
      drawLine(ctx, state.secondLine.start, state.secondLine.end);
    }

    if (state.transversal) {
      drawLine(ctx, state.transversal.start, state.transversal.end, '#FF4444');

      const int1 = state.firstLine ? getIntersection(state.firstLine, state.transversal) : null;
      const int2 = state.secondLine ? getIntersection(state.secondLine, state.transversal) : null;

      if (int1 && int2) {
        const transversalAngle = Math.atan2(
          state.transversal.end.y - state.transversal.start.y,
          state.transversal.end.x - state.transversal.start.x,
        );
        const line1Angle = Math.atan2(
          state.firstLine ? state.firstLine.end.y - state.firstLine.start.y : 0,
          state.firstLine ? state.firstLine.end.x - state.firstLine.start.x : 0,
        );
        const line2Angle = Math.atan2(
          state.secondLine ? state.secondLine.end.y - state.secondLine.start.y : 0,
          state.secondLine ? state.secondLine.end.x - state.secondLine.start.x : 0,
        );

        // Don't draw arcs in step-2 (step === 2)
        if (ctx && state.step !== 2 && state.step !== 1) {
          drawAngles(ctx, int1, int2, transversalAngle, line1Angle, line2Angle);
        }
      }
    }

    if (state.firstLine && state.secondLine && state.transversal) {
      drawLabels(ctx, state.firstLine, state.secondLine, state.transversal);
    }
  }, [
    state.firstLine,
    state.point,
    state.secondLine,
    state.transversal,
    state.step,
    drawLine,
    drawPoint,
    drawLabels,
    drawAngleArc,
    getIntersection,
    drawAngles,
  ]);

  const [focusedDropZone, setFocusedDropZone] = useState<'left' | 'right' | null>(null);
  const [lastOverwrittenSpot, setLastOverwrittenSpot] = useState<'left' | 'right' | null>(null);

  const [touchDragState, setTouchDragState] = useState<{
    isDragging: boolean;
    draggedAngle: string | null;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  }>({
    isDragging: false,
    draggedAngle: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  const dropZoneRefs = {
    left: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null),
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, angle: string) => {
    const touch = e.touches[0];
    setTouchDragState({
      isDragging: true,
      draggedAngle: angle,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
    });
    setState((prev) => ({ ...prev, activeAngle: angle }));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchDragState.isDragging) return;

    // We can't use preventDefault in a passive touch event listener
    // Instead, handle this with CSS or by adding a non-passive listener at the component level

    const touch = e.touches[0];
    setTouchDragState((prev) => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));

    // Check if touch is over a drop zone
    const { left, right } = dropZoneRefs;
    if (left.current && right.current) {
      const leftRect = left.current.getBoundingClientRect();
      const rightRect = right.current.getBoundingClientRect();

      const isOverLeft =
        touch.clientX >= leftRect.left &&
        touch.clientX <= leftRect.right &&
        touch.clientY >= leftRect.top &&
        touch.clientY <= leftRect.bottom;

      const isOverRight =
        touch.clientX >= rightRect.left &&
        touch.clientX <= rightRect.right &&
        touch.clientY >= rightRect.top &&
        touch.clientY <= rightRect.bottom;

      if (isOverLeft) {
        setState((prev) => ({ ...prev, draggedOver: 'left' }));
      } else if (isOverRight) {
        setState((prev) => ({ ...prev, draggedOver: 'right' }));
      } else {
        setState((prev) => ({ ...prev, draggedOver: null }));
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchDragState.isDragging) return;

    const { left, right } = dropZoneRefs;
    if (left.current && right.current) {
      const leftRect = left.current.getBoundingClientRect();
      const rightRect = right.current.getBoundingClientRect();

      const touch = e.changedTouches[0];

      const isOverLeft =
        touch.clientX >= leftRect.left &&
        touch.clientX <= leftRect.right &&
        touch.clientY >= leftRect.top &&
        touch.clientY <= leftRect.bottom;

      const isOverRight =
        touch.clientX >= rightRect.left &&
        touch.clientX <= rightRect.right &&
        touch.clientY >= rightRect.top &&
        touch.clientY <= rightRect.bottom;

      if (isOverLeft && touchDragState.draggedAngle) {
        processDrop(touchDragState.draggedAngle, 'left');
      } else if (isOverRight && touchDragState.draggedAngle) {
        processDrop(touchDragState.draggedAngle, 'right');
      }
    }

    setTouchDragState({
      isDragging: false,
      draggedAngle: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });

    setState((prev) => ({
      ...prev,
      draggedOver: null,
      activeAngle: null,
      isDragging: null,
    }));
  };

  // Common function to process drops for both mouse and touch events
  const processDrop = (angle: string, position: 'left' | 'right') => {
    if (state.step === 3) {
      // Step 4: First equation
      const newEquation = {
        ...state.firstEquation,
        [position]: angle,
      };
      setState((prev) => ({ ...prev, firstEquation: newEquation }));

      if (newEquation.left && newEquation.right) {
        const isValid = isValidEquation(newEquation as { left: string; right: string }, 'first');
        if (isValid) {
          setState((prev) => {
            const existingStepIndex = prev.completedSteps.findIndex((step) => step.id === 'firstEquation');

            const updatedStep = {
              ...proofSteps[0],
              equation: newEquation,
            };

            const updatedCompletedSteps =
              existingStepIndex >= 0
                ? [
                    ...prev.completedSteps.slice(0, existingStepIndex),
                    updatedStep,
                    ...prev.completedSteps.slice(existingStepIndex + 1),
                  ]
                : [...prev.completedSteps, updatedStep];

            return {
              ...prev,
              completedSteps: updatedCompletedSteps,
              isReviewing: true,
            };
          });
          setStep3Completed(true);
        }
      }
    } else if (state.step === 4) {
      // Step 5: Second equation
      const newEquation = {
        ...state.secondEquation,
        [position]: angle,
      };
      setState((prev) => ({ ...prev, secondEquation: newEquation }));

      if (newEquation.left && newEquation.right) {
        const isValid = isValidEquation(newEquation as { left: string; right: string }, 'second');
        if (isValid) {
          setState((prev) => {
            const existingStepIndex = prev.completedSteps.findIndex((step) => step.id === 'secondEquation');

            const updatedStep = {
              ...proofSteps[1],
              equation: newEquation,
            };

            const updatedCompletedSteps =
              existingStepIndex >= 0
                ? [
                    ...prev.completedSteps.slice(0, existingStepIndex),
                    updatedStep,
                    ...prev.completedSteps.slice(existingStepIndex + 1),
                  ]
                : [...prev.completedSteps, updatedStep];

            return {
              ...prev,
              completedSteps: updatedCompletedSteps,
              isReviewing: true,
            };
          });
          setStep4Completed(true);
        }
      }
    }
  };

  const calculateParallelPoint = useCallback(
    (firstLine: { start: { x: number; y: number }; end: { x: number; y: number } }) => {
      const midX = (firstLine.start.x + firstLine.end.x) / 2;
      const midY = (firstLine.start.y + firstLine.end.y) / 2;

      const dx = firstLine.end.x - firstLine.start.x;
      const dy = firstLine.end.y - firstLine.start.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      const normalX = -dy / length;
      const normalY = dx / length;

      const optimalDistance = 100;
      return {
        x: midX + normalX * optimalDistance,
        y: midY + normalY * optimalDistance,
      };
    },
    [],
  );

  useEffect(() => {
    if (state.firstLine && !state.secondLine) {
      const parallelPoint = calculateParallelPoint({
        start: state.firstLine.start,
        end: state.firstLine.end,
      });
      const parallel = calculateParallelLine(parallelPoint, state.firstLine);

      setState((prev) => ({
        ...prev,
        secondLine: parallel,
      }));

      const linesToSave = {
        line1: state.firstLine ? [state.firstLine.start, state.firstLine.end] : [],
        line2: parallel ? [parallel.start, parallel.end] : [],
        transversal: state.transversal ? [state.transversal.start, state.transversal.end] : [],
      };

      setInteractiveResponses((prev) => ({
        ...prev,
        'corresponding-angles': {
          ...prev['corresponding-angles'],
          lines: JSON.stringify(linesToSave),
        },
      }));
    }
  }, [
    state.firstLine,
    state.secondLine,
    calculateParallelPoint,
    calculateParallelLine,
    setInteractiveResponses,
    state.transversal,
  ]);

  useEffect(() => {
    const storedLines = interactiveResponses['corresponding-angles']?.lines
      ? (JSON.parse(interactiveResponses['corresponding-angles'].lines as string) as {
          line1: { x: number; y: number }[];
          line2: { x: number; y: number }[];
          transversal: { x: number; y: number }[];
        })
      : { line1: [], line2: [], transversal: [] };

    const storedFirstEquation = interactiveResponses['corresponding-angles']?.firstEquation
      ? (JSON.parse(interactiveResponses['corresponding-angles'].firstEquation as string) as {
          left: string | null;
          right: string | null;
        })
      : { left: null, right: null };

    const storedSecondEquation = interactiveResponses['corresponding-angles']?.secondEquation
      ? (JSON.parse(interactiveResponses['corresponding-angles'].secondEquation as string) as {
          left: string | null;
          right: string | null;
        })
      : { left: null, right: null };

    setState((prev) => ({
      ...prev,
      firstLine: storedLines.line1.length > 0 ? { start: storedLines.line1[0], end: storedLines.line1[1] } : null,
      point: storedLines.line2.length > 0 ? storedLines.line2[0] : null,
      secondLine: storedLines.line2.length > 0 ? { start: storedLines.line2[0], end: storedLines.line2[1] } : null,
      transversal:
        storedLines.transversal.length > 0
          ? { start: storedLines.transversal[0], end: storedLines.transversal[1] }
          : null,
      firstEquation: storedFirstEquation,
      secondEquation: storedSecondEquation,
    }));
  }, []);

  const handleDrawLines = () => {
    if (!state.firstLine) {
      const firstLine = { start: { x: 100, y: 90 }, end: { x: 500, y: 90 } };
      setState((prev) => ({ ...prev, firstLine }));

      const parallelPoint = calculateParallelPoint(firstLine);
      const secondLine = calculateParallelLine(parallelPoint, firstLine);
      setState((prev) => ({ ...prev, point: parallelPoint, secondLine, step: 1 }));
      setAnnouncement(t('scenes.S7.S7_D0_F53_C9.drawLinesAriaLabel'));
      setStep0Completed(true);
    }
  };

  const handleDrawTransversal = () => {
    if (!state.transversal && state.firstLine && state.secondLine) {
      const calculateExplicitTraversal = (firstLine: Line, secondLine: Line) => {
        if (!firstLine || !secondLine) return null;

        const lineDirectionX = firstLine.end.x - firstLine.start.x;
        const lineDirectionY = firstLine.end.y - firstLine.start.y;
        const lineLength = Math.sqrt(lineDirectionX * lineDirectionX + lineDirectionY * lineDirectionY);

        const normalizedDirX = lineDirectionX / lineLength;
        const normalizedDirY = lineDirectionY / lineLength;

        const perpX = normalizedDirX * 0.7071 - normalizedDirY * 0.7071;
        const perpY = normalizedDirX * 0.7071 + normalizedDirY * 0.7071;

        const minX = Math.min(firstLine.start.x, firstLine.end.x, secondLine.start.x, secondLine.end.x);
        const maxX = Math.max(firstLine.start.x, firstLine.end.x, secondLine.start.x, secondLine.end.x);
        const minY = Math.min(firstLine.start.y, firstLine.end.y, secondLine.start.y, secondLine.end.y);
        const maxY = Math.max(firstLine.start.y, firstLine.end.y, secondLine.start.y, secondLine.end.y);

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        const parallelDistance = Math.sqrt(
          Math.pow(firstLine.start.x - secondLine.start.x, 2) +
            Math.pow(firstLine.start.y - secondLine.start.y, 2),
        );

        const transversalLength = parallelDistance * 1.7;
        const transversalStart = {
          x: centerX - (perpX * transversalLength) / 2,
          y: centerY - (perpY * transversalLength) / 2,
        };

        const transversalEnd = {
          x: centerX + (perpX * transversalLength) / 2,
          y: centerY + (perpY * transversalLength) / 2,
        };

        const extensionLength = 80;

        const extensionDirectionX = transversalEnd.x - transversalStart.x;
        const extensionDirectionY = transversalEnd.y - transversalStart.y;
        const extensionMagnitude = Math.sqrt(
          extensionDirectionX * extensionDirectionX + extensionDirectionY * extensionDirectionY,
        );
        const extensionUnitX = extensionDirectionX / extensionMagnitude;
        const extensionUnitY = extensionDirectionY / extensionMagnitude;

        const additionalExtension = 50;
        const newTransversalStart = {
          x: transversalStart.x - extensionUnitX * (extensionLength + additionalExtension),
          y: transversalStart.y - extensionUnitY * (extensionLength + additionalExtension),
        };
        const newTransversalEnd = {
          x: transversalEnd.x + extensionUnitX * (extensionLength + additionalExtension),
          y: transversalEnd.y + extensionUnitY * (extensionLength + additionalExtension),
        };

        const canvasWidth = 600;
        const canvasHeight = 300;
        const margin = 40;

        const slope =
          (newTransversalEnd.y - newTransversalStart.y) / (newTransversalEnd.x - newTransversalStart.x);
        const yIntercept = newTransversalStart.y - slope * newTransversalStart.x;

        const intersections = [];
        const leftY = slope * margin + yIntercept;

        if (leftY >= margin && leftY <= canvasHeight - margin) {
          intersections.push({ x: margin, y: leftY });
        }

        const rightY = slope * (canvasWidth - margin) + yIntercept;
        if (rightY >= margin && rightY <= canvasHeight - margin) {
          intersections.push({ x: canvasWidth - margin, y: rightY });
        }

        const topX = (margin - yIntercept) / slope;
        if (topX >= margin && topX <= canvasWidth - margin) {
          intersections.push({ x: topX, y: margin });
        }

        const bottomX = (canvasHeight - margin - yIntercept) / slope;
        if (bottomX >= margin && bottomX <= canvasWidth - margin) {
          intersections.push({ x: bottomX, y: canvasHeight - margin });
        }

        if (intersections.length >= 2) {
          return {
            start: intersections[0],
            end: intersections[1],
          };
        }

        return { start: newTransversalStart, end: newTransversalEnd };
      };

      const transversal = calculateExplicitTraversal(state.firstLine, state.secondLine);

      if (transversal) {
        setState((prev) => ({
          ...prev,
          transversal,
          step: 2, // Automatically advance to step 2
        }));
        setAnnouncement(t('scenes.S7.S7_D0_F53_C9.drawTransversalAriaLabel'));
        setStep1Completed(true);
      }
    }
  };

  const renderProof = () => {
    const stepsToShow = [];

    if (
      state.firstEquation.left &&
      state.firstEquation.right &&
      isValidEquation(state.firstEquation as { left: string; right: string }, 'first')
    ) {
      stepsToShow.push({
        ...proofSteps[0],
        equation: state.firstEquation,
      });
    }

    if (
      state.secondEquation.left &&
      state.secondEquation.right &&
      isValidEquation(state.secondEquation as { left: string; right: string }, 'second')
    ) {
      stepsToShow.push({
        ...proofSteps[1],
        equation: state.secondEquation,
      });
    }

    return (
      <div className="space-y-4">
        {stepsToShow.map((step, index) => (
          <div key={index}>
            <p className="mt-2">
              {index + 1}
              {'. '}
              {step.statement} {step.explanation}
            </p>
          </div>
        ))}

        {/* summary button when all steps are complete */}
        {stepsToShow.length === proofSteps.length && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-black text-lg font-medium">{t(correspondingAnglesConfig.thereforeText)}</p>
            <p className="mt-2">{t(correspondingAnglesConfig.commonNotion3)}</p>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setState((prev) => ({ ...prev, showSummary: true }))}
                className="px-6 py-2 bg-[#006BE0] text-white rounded-lg flex items-center gap-2"
              >
                {t(correspondingAnglesConfig.proof.viewSummary)}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTouchDragGhost = () => {
    if (!touchDragState.isDragging || !touchDragState.draggedAngle) return null;

    const offsetX = touchDragState.currentX - touchDragState.startX;
    const offsetY = touchDragState.currentY - touchDragState.startY;

    return (
      <div
        className="absolute pointer-events-none z-50 w-12 h-12 flex items-center justify-center rounded text-lg font-bold font-[besley] italic"
        style={{
          color: getAngleColor(touchDragState.draggedAngle),
          border: '2px solid #757575',
          background: 'white',
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          left: touchDragState.startX - 24, // Half the width
          top: touchDragState.startY - 24, // Half the height
          opacity: 0.8,
        }}
      >
        ∠{touchDragState.draggedAngle}
      </div>
    );
  };

  const renderEquationBuilder = () => {
    const equation = state.step === 3 ? state.firstEquation : state.secondEquation;

    const handleKeyDown = (e: React.KeyboardEvent, angle: 'a' | 'b' | 'c') => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();

        let newEquation;
        if (!equation.left) {
          newEquation = { ...equation, left: angle };
          setLastOverwrittenSpot('left');
        } else if (!equation.right) {
          newEquation = { ...equation, right: angle };
          setLastOverwrittenSpot('right');
        } else {
          const spotToOverwrite = lastOverwrittenSpot === 'left' ? 'right' : 'left';
          newEquation = { ...equation, [spotToOverwrite]: angle };
          setLastOverwrittenSpot(spotToOverwrite);
        }

        if (state.step === 3) {
          setState((prev) => ({
            ...prev,
            firstEquation: newEquation,
          }));
        } else if (state.step === 4) {
          setState((prev) => ({
            ...prev,
            secondEquation: newEquation,
          }));
        }

        // Check if the equation is valid and trigger step completion
        if (newEquation.left && newEquation.right) {
          const isValid = isValidEquation(
            newEquation as { left: string; right: string },
            state.step === 3 ? 'first' : 'second',
          );
          if (isValid) {
            setState((prev) => {
              const stepId = state.step === 3 ? 'firstEquation' : 'secondEquation';
              const existingStepIndex = prev.completedSteps.findIndex((step) => step.id === stepId);

              const updatedStep = {
                ...(state.step === 3 ? proofSteps[0] : proofSteps[1]),
                equation: newEquation,
              };

              const updatedCompletedSteps =
                existingStepIndex >= 0
                  ? [
                      ...prev.completedSteps.slice(0, existingStepIndex),
                      updatedStep,
                      ...prev.completedSteps.slice(existingStepIndex + 1),
                    ]
                  : [...prev.completedSteps, updatedStep];

              return {
                ...prev,
                completedSteps: updatedCompletedSteps,
                isReviewing: true,
              };
            });

            if (state.step === 3) {
              setStep3Completed(true);
            } else if (state.step === 4) {
              setStep4Completed(true);
            }
          }
        }
      }
    };

    const getDropZoneStyle = (position: string) => {
      const isCurrentlyOver = state.draggedOver === position;
      const isFocused = focusedDropZone === position;
      return `w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-black font-bold transition-colors duration-200
              ${isCurrentlyOver ? 'border-blue-400 bg-blue-500/20' : isFocused ? 'border-blue-600 bg-blue-100' : 'border-gray-500'}`;
    };

    return (
      <div>
        {renderTouchDragGhost()}
        <div className="flex max-[880px]:gap-2 gap-4 mb-2 min-[768px]:gap-4">
          {['a', 'b', 'c'].map((angle) => (
            <div
              role="button"
              key={angle}
              className="w-12 h-12 flex items-center justify-center rounded cursor-move text-lg font-bold font-[besley] italic"
              style={{ color: getAngleColor(angle), border: '2px solid #757575' }}
              draggable
              onDragStart={(e) => handleDragStart(e, angle)}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, angle as 'a' | 'b' | 'c')}
              onTouchStart={(e) => handleTouchStart(e, angle)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              ∠{angle}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 max-[960px]:gap-1 max-[1024px]:gap-2 min-[768px]:gap-4">
          <div
            ref={dropZoneRefs.left}
            className={getDropZoneStyle('left')}
            onDragOver={(e) => handleDragOver(e, 'left')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'left')}
            onFocus={() => setFocusedDropZone('left')}
            onBlur={() => setFocusedDropZone(null)}
          >
            {equation.left && (
              <span className="font-[besley] italic" style={{ color: getAngleColor(equation.left) }}>
                ∠{equation.left}
              </span>
            )}
          </div>
          <span className="text-black text-2xl max-[960px]:text-base min-[768px]:text-2xl">+</span>
          <div
            ref={dropZoneRefs.right}
            className={getDropZoneStyle('right')}
            onDragOver={(e) => handleDragOver(e, 'right')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'right')}
            onFocus={() => setFocusedDropZone('right')}
            onBlur={() => setFocusedDropZone(null)}
          >
            {equation.right && (
              <span className="font-[besley] italic font-bold" style={{ color: getAngleColor(equation.right) }}>
                ∠{equation.right}
              </span>
            )}
          </div>
          <span className="text-black text-2xl max-[960px]:text-base min-[768px]:text-2xl">=</span>
          <span className="text-black text-2xl max-[960px]:text-xl min-[768px]:text-2xl">180°</span>
        </div>
      </div>
    );
  };

  const renderEquationFeedback = (
    equation: { left: string | null; right: string | null },
    equationType: string,
  ) => {
    if (equation.left && equation.right) {
      if (
        equation.left !== null &&
        equation.right !== null &&
        !isValidEquation(equation as { left: string; right: string }, equationType)
      ) {
        return (
          <p className="text-[#EB0000]">
            {equationType === 'first'
              ? t(correspondingAnglesConfig.errors.notSupplementary)
              : t(correspondingAnglesConfig.errors.notSameSideInterior)}
          </p>
        );
      }
    }
    return null;
  };

  function getInitialCompletedSteps(
    firstEquation: { left: string | null; right: string | null },
    secondEquation: { left: string | null; right: string | null },
  ) {
    const steps = [];

    if (
      firstEquation.left &&
      firstEquation.right &&
      isValidEquation(firstEquation as { left: string; right: string }, 'first')
    ) {
      steps.push({
        ...proofSteps[0],
        equation: firstEquation,
      });
    }

    if (
      secondEquation.left &&
      secondEquation.right &&
      isValidEquation(secondEquation as { left: string; right: string }, 'second')
    ) {
      steps.push({
        ...proofSteps[1],
        equation: secondEquation,
      });
    }

    return steps;
  }

  const handleInfoClick = (
    content: string,
    event: React.MouseEvent<HTMLButtonElement>,
    buttonRef: React.RefObject<HTMLButtonElement>,
  ) => {
    if (popoverState?.triggerRef === buttonRef) {
      setPopoverState(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverState({
      isOpen: true,
      content,
      position: {
        x: rect.right + 10,
        y: rect.top,
      },
      triggerRef: buttonRef,
    });
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-6 bg-white rounded-lg mt-[-35px]">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl">{stepsConfig[state.step].title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
            <path d="m8 6 2-2" />
            <path d="m18 16 2-2" />
            <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" />
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>

          <div className="text-xl font-bold">{t(tools.title)}</div>
        </div>

        <div className="space-y-2">
          <div>
            <span className="font-semibold">{t(tools.commonNotion3.label)}:</span>
            <span> {t(tools.commonNotion3.description)}</span>
          </div>

          <div>
            <span className="font-semibold">{t(tools.parallelPostulate.label)}:</span>
            <span> {t(tools.parallelPostulate.description)}</span>
            <button
              type="button"
              ref={postulateButtonRef}
              aria-label={t('scenes.S12.S12_D0_F60_C9.accessibility.show_info')}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full ml-2 transform translate-y-0.5"
              onClick={(e) => {
                handleInfoClick(t(tools.parallelPostulate.popoverDescription), e, postulateButtonRef);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 hover:text-gray-700"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
          </div>

          <div>
            <span className="font-semibold">{t(tools.supplementaryAngles.label)}:</span>
            <span> {t(tools.supplementaryAngles.description)}</span>
          </div>
        </div>
      </div>

      <div
        className={`mt-4 relative w-full ${state.step === 3 || state.step === 4 ? 'flex gap-6' : ''} min-h-[400px]`}
      >
        <div
          className={`relative ${state.step === 3 || state.step === 4 ? 'w-1/2' : 'w-full'} rounded-lg overflow-hidden p-4 border-2 border-dashed border-[#757575]`}
        >
          <canvas
            tabIndex={0}
            ref={canvasRef}
            width={600}
            height={300}
            className="w-full h-full rounded-lg"
            style={{
              maxHeight: '400px',
              objectFit: 'contain',
              transform: state.step === 3 || state.step === 4 ? 'scale(1.2)' : 'scale(1)',
              touchAction: state.step <= 1 ? 'none' : 'auto', // Disable browser touch actions during drawing steps
            }}
          />
        </div>
        {(state.step === 0 || state.step === 1) && (
          <div className="flex justify-center mt-4 space-x-4">
            {state.step === 0 && (
              <button
                onClick={handleDrawLines}
                disabled={!!state.firstLine && !!state.secondLine}
                className={`px-6 py-2 ${
                  !!state.firstLine && !!state.secondLine
                    ? 'bg-[#757575] cursor-not-allowed'
                    : 'bg-[#006BE0] hover:bg-[#0056b3]'
                } text-white rounded-lg transition-colors`}
              >
                {t(correspondingAnglesConfig.drawLines)}
              </button>
            )}

            {state.step === 1 && (
              <button
                onClick={handleDrawTransversal}
                disabled={!!state.transversal}
                className={`px-6 py-2 ${
                  state.transversal ? 'bg-[#757575] cursor-not-allowed' : 'bg-[#006BE0] hover:bg-[#0056b3]'
                } text-white rounded-lg transition-colors`}
              >
                {t(correspondingAnglesConfig.drawTransversal)}
              </button>
            )}
          </div>
        )}

        {/* Right Side (Equation Builder and Proof Steps) */}
        {(state.step === 3 || state.step === 4) && (
          <div className="w-1/2 flex flex-col gap-6 border-2 border-solid border-[#757575] rounded-lg ">
            {/* Equation Builder */}
            <div className="bg-white/50 rounded-lg p-6 min-[1024px]:p-6 min-[960px]:p-4 min-[820px]:p-3 min-[768px]:p-1">
              <div className="flex-none space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium text-black">
                    {state.step === 3 ? proofSteps[0].title : proofSteps[1].title}
                  </div>
                </div>
                {state.step === 3 && (
                  <>
                    <div className="sr-only">{t('scenes.common.focusModeAnnouncement')}</div>
                    {renderEquationBuilder()}
                    {renderEquationFeedback(state.firstEquation, 'first')}
                  </>
                )}
                {state.step === 4 && (
                  <>
                    <div className="sr-only">{t('scenes.common.focusModeAnnouncement')}</div>
                    {renderEquationBuilder()}
                    {renderEquationFeedback(state.secondEquation, 'second')}
                  </>
                )}
              </div>
            </div>

            {/* Proof Steps */}
            <div className="bg-white/50 rounded-lg mt-[-45px] p-6">{renderProof()}</div>
          </div>
        )}
      </div>

      {state.showSummary && <SummarySlide onClose={() => setState((prev) => ({ ...prev, showSummary: false }))} />}
      {popoverState && (
        <PostulareInfoPopover
          isOpen={popoverState.isOpen}
          onClose={() => setPopoverState(null)}
          content={popoverState.content}
          position={popoverState.position}
          triggerRef={popoverState.triggerRef}
          postulateType={'postulate5'}
          heading={t(tools.parallelPostulate.popoverTitle)}
        />
      )}
    </div>
  );
};

export default CorrespondingAnglesProof;
