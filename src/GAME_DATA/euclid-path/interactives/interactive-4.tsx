/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useCallback, useMemo, useContext } from 'react';
import interactiveText from '../configs/interactive-4';
import { useTranslations } from '../../../hooks/useTranslations';
import { GameContext } from '../../../contexts/GameContext';
import { useEventListener } from '../../../hooks/useEventListener';

// Add interfaces for component props
interface SummarySlideProps {
  onClose: () => void;
}

// Add interfaces for line and point types
interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

interface ProofStep {
  id: string;
  title: string;
  statement: string;
  explanation: string;
  validPairs: string[];
}

interface CompletedStep extends ProofStep {
  equation: {
    left: string | null;
    right: string | null;
  };
}

interface Equations {
  [key: string]: {
    left: string | null;
    right: string | null;
  };
}

interface AlternateInteriorAnglesProofProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

interface InteractiveState {
  step: number;
  firstLine: Line | null;
  secondLine: Line | null;
  transversal: Line | null;
  point: Point | null;
  proofStep: number;
  completedSteps: CompletedStep[];
  equations: Equations;
  showSummary: boolean;
  isReviewing: boolean;
  focusedElement: string | null;
  isDragging: string | null;
  draggedOver: 'left' | 'right' | null;
  sequenceEquationBox: number;
}

// SummarySlide Component
const SummarySlide: React.FC<SummarySlideProps> = ({ onClose }) => {
  const { t } = useTranslations();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg p-8 max-w-3xl mx-4 shadow-xl border border-blue-500/20 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-start mb-6 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">{t(interactiveText.summary.title)}</h2>
          <button
            onClick={onClose}
            aria-label={t('popover.close')}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar">
          <div className="">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    {t(interactiveText.summary.parallelSection.title)}
                  </div>
                  <p className="text-gray-700">{t(interactiveText.summary.parallelSection.description)}</p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                    <li>
                      <span
                        style={{
                          color: '#633300',
                          fontFamily: 'Besley',
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                          fontSize: '1.2rem',
                        }}
                      >
                        ∠c
                      </span>{' '}
                      =
                      <span
                        style={{
                          color: '#677600',
                          fontFamily: 'Besley',
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                          fontSize: '1.2rem',
                        }}
                      >
                        ∠d
                      </span>
                      <span className="text-gray-600">
                        {' '}
                        ({t(interactiveText.summary.parallelSection.points[0])})
                      </span>
                    </li>
                    <li>
                      <span
                        style={{
                          color: '#DB0072',
                          fontFamily: 'Besley',
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                          fontSize: '1.2rem',
                        }}
                      >
                        ∠x
                      </span>{' '}
                      =
                      <span
                        style={{
                          color: '#677600',
                          fontFamily: 'Besley',
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                          fontSize: '1.2rem',
                        }}
                      >
                        ∠d
                      </span>
                      <span className="text-gray-600">
                        {' '}
                        ({t(interactiveText.summary.parallelSection.points[1])})
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    {/* Parallel lines */}
                    <line x1="20" y1="30" x2="100" y2="30" stroke="black" strokeWidth="2" />
                    <line x1="20" y1="90" x2="100" y2="90" stroke="black" strokeWidth="2" />
                    {/* Transversal */}
                    <line x1="40" y1="20" x2="84" y2="110" stroke="black" strokeWidth="2" />
                    {/* Angle labels */}
                    <text x="55" y="45" fill="#633300" className="text-base font-bold italic font-besley">
                      ∠c
                    </text>
                    <text x="83" y="103" fill="#677600" className="text-base font-bold italic font-besley">
                      ∠d
                    </text>
                    <text x="46" y="85" fill="#DB0072" className="text-base font-bold italic font-besley">
                      ∠x
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {t(interactiveText.summary.conclusion.title)}
              </div>
              <p className="text-gray-700">{t(interactiveText.summary.conclusion.statement)}</p>
              <p className="text-gray-700 mt-2 ml-4">
                <span
                  style={{
                    color: '#633300',
                    fontFamily: 'Besley',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                  }}
                >
                  ∠c
                </span>{' '}
                =
                <span
                  style={{
                    color: '#677600',
                    fontFamily: 'Besley',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                  }}
                >
                  ∠d
                </span>{' '}
                =
                <span
                  style={{
                    color: '#DB0072',
                    fontFamily: 'Besley',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                  }}
                >
                  ∠x
                </span>
              </p>
              <p className="text-gray-600 mt-2">{t(interactiveText.summary.conclusion.explanation)}</p>
            </div>

            <div>
              <div className="text-lg font-semibold text-gray-800 mb-2 mt-2">
                {t(interactiveText.summary.generalVisualization.title)}
              </div>
              <div className="flex justify-center">
                <svg width="200" height="120" viewBox="0 0 200 120">
                  {/* Parallel lines */}
                  <line x1="20" y1="30" x2="180" y2="30" stroke="#374151" strokeWidth="2" />
                  <line x1="20" y1="90" x2="180" y2="90" stroke="#374151" strokeWidth="2" />
                  {/* Transversal */}
                  <line x1="60" y1="10" x2="140" y2="110" stroke="#374151" strokeWidth="2" />
                  {/* Alternate interior angles highlight */}
                  <path d="M 65 31 A 15 15 0 0 0 86 43" stroke="#0061FC" strokeWidth="2" fill="none" />
                  <path d="M 117 80 A 15 15 0 0 1 137 89" stroke="#0061FC" strokeWidth="2" fill="none" />
                  {/* Labels */}
                  <text x="65" y="55" fill="#0061FC" className="text-xs font-bold italic">
                    b
                  </text>
                  <text x="130" y="74" fill="#0061FC" className="text-xs font-bold italic">
                    b
                  </text>
                  <text x="185" y="35" fill="#374151" className="text-xs font-bold italic">
                    l₁
                  </text>
                  <text x="185" y="95" fill="#374151" className="text-xs font-bold italic">
                    l₂
                  </text>
                </svg>
              </div>
              <p className="text-center text-gray-700 mt-4">
                {/* Insert html as description */}
                <div
                  dangerouslySetInnerHTML={{ __html: t(interactiveText.summary.generalVisualization.description) }}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t(interactiveText.buttons.gotIt)}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AlternateInteriorAnglesProof: React.FC<AlternateInteriorAnglesProofProps> = ({ onInteraction }) => {
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const { payload } = useEventListener('interactive-4');

  // Initialize state from interactiveResponses or default values
  const savedState =
    interactiveResponses?.interactive_4 && typeof interactiveResponses?.interactive_4 === 'object'
      ? (interactiveResponses?.interactive_4 as unknown as InteractiveState)
      : undefined;

  const [step, setStep] = useState<number>(savedState?.step ?? 0);
  const [firstLine, setFirstLine] = useState<Line | null>(savedState?.firstLine ?? null);
  const [secondLine, setSecondLine] = useState<Line | null>(savedState?.secondLine ?? null);
  const [transversal, setTransversal] = useState<Line | null>(savedState?.transversal ?? null);
  const [point, setPoint] = useState<Point | null>(savedState?.point ?? null);
  const [isDragging, setIsDragging] = useState<string | null>(savedState?.isDragging ?? null);
  const [draggedOver, setDraggedOver] = useState<'left' | 'right' | null>(savedState?.draggedOver ?? null);
  const [activeAngle, setActiveAngle] = useState<string | null>(null);
  const [proofStep, setProofStep] = useState<number>(savedState?.proofStep ?? 0);
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>(savedState?.completedSteps ?? []);
  const [showSummary, setShowSummary] = useState<boolean>(savedState?.showSummary ?? false);
  const [isReviewing, setIsReviewing] = useState<boolean>(savedState?.isReviewing ?? false);
  const [sequenceEquationBox, setSequenceEquationBox] = useState<number>(savedState?.sequenceEquationBox ?? 1);
  const [equations, setEquations] = useState<Equations>(
    savedState?.equations ?? {
      corresponding: { left: null, right: null },
      supplementary1: { left: null, right: null },
      supplementary2: { left: null, right: null },
      vertical: { left: null, right: null },
    },
  );
  const [focusedElement] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  // Touch drag and drop state
  const [touchDragAngle, setTouchDragAngle] = useState<string | null>(null);

  // Constants
  const steps = [
    {
      title: t(interactiveText.steps.step1.title),
      instruction: t(interactiveText.steps.step1.instruction),
    },
    {
      title: t(interactiveText.steps.step2.title),
      instruction: t(interactiveText.steps.step2.instruction),
    },
    {
      title: t(interactiveText.steps.step3.title),
      instruction: t(interactiveText.steps.step3.instruction),
    },
  ];

  const proofSteps = useMemo(
    () => [
      {
        id: t(interactiveText.proofSteps.corresponding.id),
        title: t(interactiveText.proofSteps.corresponding.title),
        statement: t(interactiveText.proofSteps.corresponding.statement),
        explanation: t(interactiveText.proofSteps.corresponding.explanation),
        validPairs: interactiveText.proofSteps.corresponding.validPairs,
      },
      {
        id: t(interactiveText.proofSteps.verticalOpposite.id),
        title: t(interactiveText.proofSteps.verticalOpposite.title),
        statement: t(interactiveText.proofSteps.verticalOpposite.statement),
        explanation: t(interactiveText.proofSteps.verticalOpposite.explanation),
        validPairs: interactiveText.proofSteps.verticalOpposite.validPairs,
      },
    ],
    [t],
  );

  // Save state to context whenever relevant state changes
  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: InteractiveState = {
      step,
      firstLine,
      secondLine,
      transversal,
      point,
      proofStep,
      completedSteps,
      equations,
      showSummary,
      isReviewing,
      focusedElement,
      isDragging,
      draggedOver,
      sequenceEquationBox,
    };

    setInteractiveResponses((prev: any) => ({
      ...prev,
      interactive_4: currentState,
    }));
  }, [
    step,
    firstLine,
    secondLine,
    transversal,
    point,
    proofStep,
    completedSteps,
    equations,
    showSummary,
    isReviewing,
    focusedElement,
    isDragging,
    draggedOver,
    sequenceEquationBox,
    setInteractiveResponses,
  ]);

  const getErrorMessage = useCallback(
    (stepId: string, leftAngle: string | null, rightAngle: string | null) => {
      if (!leftAngle || !rightAngle) return null;

      switch (stepId) {
        case 'corresponding':
          if (!(leftAngle === 'c' && rightAngle === 'd') && !(leftAngle === 'd' && rightAngle === 'c')) {
            return t(interactiveText.errors.corresponding);
          }
          break;
        case 'vertical-opposite':
          if (!(leftAngle === 'x' && rightAngle === 'd') && !(leftAngle === 'd' && rightAngle === 'x')) {
            return t(interactiveText.errors.verticalOpposite);
          }
          break;
        default:
          return null;
      }
      return null;
    },
    [t],
  );

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 2) {
        setStep(2);
        setIsReviewing(false);
        setProofStep(0);
      } else if (payload.step === 3) {
        setStep(2);
        setIsReviewing(false);
        setProofStep(1);
      } else {
        setStep(payload.step as number);
      }
    }
  }, [
    payload,
    step,
    completedSteps,
    proofSteps,
    proofStep,
    equations,
    setCompletedSteps,
    setIsReviewing,
    getErrorMessage,
  ]);

  const interactiveColors = {
    canvas_background: '#fff',
    line_color: '#000',
    a_color: '#E0002B',
    d_color: '#677600',
    c_color: '#633300',
    b_color: '#0061FC',
    x_color: '#DB0072',
    t_color: '#FF4444',
  };

  const anglePronunciation: Record<string, string> = {
    c: 'c',
    d: 'd',
    x: 'x',
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Utility Functions for Drawing
  const getAngleColor = useCallback((angleLabel: string) => {
    switch (angleLabel) {
      case 'c':
        return '#633300';
      case 'd':
        return '#677600';
      case 'x':
        return '#DB0072';
      default:
        return '#FFFFFF'; // white
    }
  }, []);

  const resetEquation = (stepId: string) => {
    setEquations((prev) => ({
      ...prev,
      [stepId]: { left: null, right: null },
    }));
  };

  const drawArrowhead = useCallback(
    (ctx: CanvasRenderingContext2D, point: Point, angle: number, color: string) => {
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
    (ctx: CanvasRenderingContext2D, start: Point, end: Point, color: string = interactiveColors.line_color) => {
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
    [drawArrowhead, interactiveColors.line_color],
  );

  const calculateParallelPoint = useCallback((firstLine: Line) => {
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
  }, []);

  const calculateParallelLine = useCallback((point: Point, firstLine: Line) => {
    const slope = (firstLine.end.y - firstLine.start.y) / (firstLine.end.x - firstLine.start.x);
    const length = Math.sqrt(
      Math.pow(firstLine.end.x - firstLine.start.x, 2) + Math.pow(firstLine.end.y - firstLine.start.y, 2),
    );
    const halfLength = length / 2;
    const dx = 1 / Math.sqrt(1 + slope * slope);
    const dy = slope / Math.sqrt(1 + slope * slope);

    return {
      start: { x: point.x - dx * halfLength, y: point.y - dy * halfLength },
      end: { x: point.x + dx * halfLength, y: point.y + dy * halfLength },
    };
  }, []);

  const getIntersection = useCallback((line1: Line, line2: Line) => {
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

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null;

    return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1),
    };
  }, []);

  const drawLineExplicit = useCallback(() => {
    if (step === 0 && !firstLine) {
      // Create perfect horizontal parallel lines
      const firstLineCoords = { start: { x: 100, y: 100 }, end: { x: 500, y: 100 } };
      setFirstLine(firstLineCoords);

      const parallelPoint = calculateParallelPoint(firstLineCoords);
      const parallel = calculateParallelLine(parallelPoint, firstLineCoords);

      setPoint(parallelPoint);
      setSecondLine(parallel);
      setStep(1); // Automatically advance to step 1

      onInteraction({
        'step-0-completed': true,
      });
      setAnnouncement(t('scenes.S7.S7_D0_F53_C9.drawLinesAriaLabel'));

    } else if (step === 1 && firstLine && secondLine && !transversal) {
      if (!firstLine || !secondLine) return;

      // Calculate the direction vector of the parallel lines
      const lineDirectionX = firstLine.end.x - firstLine.start.x;
      const lineDirectionY = firstLine.end.y - firstLine.start.y;
      const lineLength = Math.sqrt(lineDirectionX * lineDirectionX + lineDirectionY * lineDirectionY);

      // Normalize the direction vector
      const normalizedDirX = lineDirectionX / lineLength;
      const normalizedDirY = lineDirectionY / lineLength;

      // Calculate perpendicular vector (rotated 45 degrees)
      const perpX = normalizedDirX * 0.7071 - normalizedDirY * 0.7071;
      const perpY = normalizedDirX * 0.7071 + normalizedDirY * 0.7071;

      // Find the bounding box of the parallel lines
      const minX = Math.min(firstLine.start.x, firstLine.end.x, secondLine.start.x, secondLine.end.x);
      const maxX = Math.max(firstLine.start.x, firstLine.end.x, secondLine.start.x, secondLine.end.x);
      const minY = Math.min(firstLine.start.y, firstLine.end.y, secondLine.start.y, secondLine.end.y);
      const maxY = Math.max(firstLine.start.y, firstLine.end.y, secondLine.start.y, secondLine.end.y);

      // Calculate the center of the bounding box
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      // Calculate the distance between the parallel lines
      const parallelDistance = Math.sqrt(
        Math.pow(firstLine.start.x - secondLine.start.x, 2) + Math.pow(firstLine.start.y - secondLine.start.y, 2),
      );

      // Calculate appropriate transversal length
      const transversalLength = parallelDistance * 1.5;

      // Create transversal that passes through the center at 45 degrees
      const transversalStart = {
        x: centerX - (perpX * transversalLength) / 2,
        y: centerY - (perpY * transversalLength) / 2,
      };

      const transversalEnd = {
        x: centerX + (perpX * transversalLength) / 2,
        y: centerY + (perpY * transversalLength) / 2,
      };

      // Extend the transversal line from both ends
      const extensionLength = 100;
      const extensionDirectionX = transversalEnd.x - transversalStart.x;
      const extensionDirectionY = transversalEnd.y - transversalStart.y;
      const extensionMagnitude = Math.sqrt(
        extensionDirectionX * extensionDirectionX + extensionDirectionY * extensionDirectionY,
      );
      const extensionUnitX = extensionDirectionX / extensionMagnitude;
      const extensionUnitY = extensionDirectionY / extensionMagnitude;

      // Calculate the new end points
      const newTransversalStart = {
        x: transversalStart.x - extensionUnitX * extensionLength,
        y: transversalStart.y - extensionUnitY * extensionLength,
      };
      const newTransversalEnd = {
        x: transversalEnd.x + extensionUnitX * extensionLength,
        y: transversalEnd.y + extensionUnitY * extensionLength,
      };

      setTransversal({
        start: newTransversalStart,
        end: newTransversalEnd,
      });

      setStep(2); // Automatically advance to step 2

      onInteraction({
        'step-1-completed': true,
      });
      setAnnouncement(t('scenes.S7.S7_D0_F53_C9.drawTransversalAriaLabel'));
    }
  }, [step, firstLine, secondLine, transversal, calculateParallelPoint, calculateParallelLine, onInteraction, t, setStep]);

  const drawText = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      angle: number = 0,
      isActive: boolean = false,
      color: string = interactiveColors.line_color,
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

      ctx.font = isActive ? 'bold 18px sans-serif' : '16px sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold italic 16px besley';
      // Italic
      ctx.fillText(text, 0, 0);
      ctx.restore();
    },
    [interactiveColors.line_color],
  );

  const drawAngleArc = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      center: Point,
      startAngle: number,
      endAngle: number,
      radius = 30,
      color: string,
      angleLabel: string,
    ) => {
      ctx.beginPath();
      const angleDiff = (endAngle - startAngle + Math.PI * 2) % (Math.PI * 2);
      if (angleDiff > Math.PI) {
        [startAngle, endAngle] = [endAngle, startAngle];
      }

      // Draw the path for the angle arc
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.arc(center.x, center.y, radius, startAngle, endAngle);
      ctx.lineTo(center.x, center.y);

      // Show final angles when proof is complete (using existing states)
      const isProofComplete = completedSteps.length === proofSteps.length && !isReviewing;

      if (isReviewing && completedSteps.length < proofSteps.length) onInteraction({ 'step-2-completed': true });

      if (isReviewing && completedSteps.length === proofSteps.length) onInteraction({ 'step-3-completed': true });

      if (isProofComplete && (angleLabel === 'c' || angleLabel === 'x')) {
        // Fill with semi-transparent color for final angles
        // ctx.fillStyle = `${color}80`; // 50% opacity
        // ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (isReviewing) {
        // Current step highlighting logic
        const currentStepId = proofSteps[proofStep]?.id;
        const currentEquation = equations[currentStepId];
        const isPartOfCorrection =
          currentEquation &&
          (currentEquation.left === angleLabel || currentEquation.right === angleLabel) &&
          !getErrorMessage(currentStepId, currentEquation.left, currentEquation.right);

        if (isPartOfCorrection) {
          ctx.fillStyle = `${color}80`;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      } else {
        // Normal rendering - just the outline
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    [isReviewing, equations, proofSteps, proofStep, getErrorMessage, completedSteps, onInteraction],
  );

  const drawAngles = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      int1: Point | null,
      int2: Point | null,
      transversalAngle: number,
      line1Angle: number,
      line2Angle: number,
    ) => {
      const isBottomToTop = transversal && transversal.start.y > transversal.end.y;

      if (int1) {
        drawAngleArc(
          ctx,
          int1,
          isBottomToTop ? transversalAngle - Math.PI : line1Angle,
          isBottomToTop ? line1Angle : transversalAngle,
          30,
          getAngleColor('c'),
          'c',
        );
      }

      if (int2) {
        if (isBottomToTop) {
          drawAngleArc(ctx, int2, line2Angle, transversalAngle + Math.PI, 30, getAngleColor('d'), 'd');

          drawAngleArc(ctx, int2, transversalAngle, line2Angle + Math.PI, 25, getAngleColor('x'), 'x');
        } else {
          drawAngleArc(ctx, int2, line2Angle, transversalAngle, 30, getAngleColor('d'), 'd');

          drawAngleArc(ctx, int2, transversalAngle + Math.PI, line2Angle + Math.PI, 25, getAngleColor('x'), 'x');
        }
      }
    },
    [drawAngleArc, getAngleColor, transversal],
  );

  const drawLabels = useCallback(
    (ctx: CanvasRenderingContext2D, firstLine: Line | null, secondLine: Line | null, transversal: Line | null) => {
      if (!firstLine || !secondLine || !transversal) return;

      const int1 = getIntersection(firstLine, transversal);
      const int2 = getIntersection(secondLine, transversal);

      if (int1) {
        drawText(ctx, '∠c', int1.x + 40, int1.y + 18, 0, activeAngle === 'c', interactiveColors.c_color);
      }

      if (int2) {
        drawText(ctx, '∠d', int2.x + 40, int2.y + 18, 0, activeAngle === 'd', interactiveColors.d_color);
        drawText(ctx, '∠x', int2.x - 40, int2.y - 15, 0, activeAngle === 'x', interactiveColors.x_color);

        // Draw line labels
        drawText(ctx, 'l₁', firstLine.end.x + 20, firstLine.end.y);
        drawText(ctx, 'l₂', secondLine.end.x + 20, secondLine.end.y);

        // Draw transversal label at the end of the transversal
        drawText(
          ctx,
          't',
          transversal.start.x + 50,
          transversal.start.y + 20,
          0,
          activeAngle === 't',
          interactiveColors.t_color,
        );
      }
    },
    [drawText, getIntersection, activeAngle, interactiveColors],
  );

  const handleDragStart = (e: React.DragEvent, angle: string) => {
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(angle);
    setActiveAngle(angle);
  };

  const handleDragOver = (e: React.DragEvent, position: 'left' | 'right') => {
    e.preventDefault();
    setDraggedOver(position);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e: React.DragEvent, position: 'left' | 'right') => {
    e.preventDefault();
    setDraggedOver(null);
    setActiveAngle(null);

    if (isDragging && proofStep < proofSteps.length) {
      const currentStepId = proofSteps[proofStep].id;
      const newEquation = {
        ...equations[currentStepId],
        [position]: isDragging,
      };

      setEquations((prev) => ({
        ...prev,
        [currentStepId]: newEquation,
      }));

      // Only check if both angles are selected
      if (newEquation.left && newEquation.right) {
        const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right);
        if (!errorMsg) {
          // Check if a step with the same ID already exists
          const existingStepIndex = completedSteps.findIndex((step) => step.id === proofSteps[proofStep].id);

          if (existingStepIndex !== -1) {
            // Update the existing step
            setCompletedSteps((prev) => {
              const updated = [...prev];
              updated[existingStepIndex] = {
                ...proofSteps[proofStep],
                equation: newEquation,
              };
              return updated;
            });
          } else {
            // Add as a new step
            setCompletedSteps((prev) => [
              ...prev,
              {
                ...proofSteps[proofStep],
                equation: newEquation,
              },
            ]);
          }

          // Instead of immediately moving to next step, enter review mode
          setIsReviewing(true);
        }
      }
    }
    setIsDragging(null);
  };

  // Touch handlers for drag and drop
  const handleTouchStartDrag = (angle: string) => {
    if (isReviewing) return;

    setTouchDragAngle(angle);
    setActiveAngle(angle);
  };

  const handleTouchMoveDrag = (e: React.TouchEvent) => {
    if (!touchDragAngle) return;

    const touch = e.touches[0];

    // Find drop targets and check if we're over one
    const leftTarget = document.querySelector('[data-drop-target="left"]');
    const rightTarget = document.querySelector('[data-drop-target="right"]');

    if (leftTarget && rightTarget) {
      const leftRect = leftTarget.getBoundingClientRect();
      const rightRect = rightTarget.getBoundingClientRect();

      // Check if touch is over a drop target
      if (
        touch.clientX >= leftRect.left &&
        touch.clientX <= leftRect.right &&
        touch.clientY >= leftRect.top &&
        touch.clientY <= leftRect.bottom
      ) {
        setDraggedOver('left');
      } else if (
        touch.clientX >= rightRect.left &&
        touch.clientX <= rightRect.right &&
        touch.clientY >= rightRect.top &&
        touch.clientY <= rightRect.bottom
      ) {
        setDraggedOver('right');
      } else {
        setDraggedOver(null);
      }
    }
  };

  const handleTouchEndDrag = () => {
    if (touchDragAngle && draggedOver && proofStep < proofSteps.length) {
      // Perform the same logic as handleDrop
      const currentStepId = proofSteps[proofStep].id;
      const newEquation = {
        ...equations[currentStepId],
        [draggedOver]: touchDragAngle,
      };

      setEquations((prev) => ({
        ...prev,
        [currentStepId]: newEquation,
      }));

      // Only check if both angles are selected
      if (newEquation.left && newEquation.right) {
        const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right);
        if (!errorMsg) {
          // Check if a step with the same ID already exists
          const existingStepIndex = completedSteps.findIndex((step) => step.id === proofSteps[proofStep].id);

          if (existingStepIndex !== -1) {
            // Update the existing step
            setCompletedSteps((prev) => {
              const updated = [...prev];
              updated[existingStepIndex] = {
                ...proofSteps[proofStep],
                equation: newEquation,
              };
              return updated;
            });
          } else {
            // Add as a new step
            setCompletedSteps((prev) => [
              ...prev,
              {
                ...proofSteps[proofStep],
                equation: newEquation,
              },
            ]);
          }

          // Instead of immediately moving to next step, enter review mode
          setIsReviewing(true);
        }
      }
    }

    // Reset touch drag state
    setTouchDragAngle(null);
    setActiveAngle(null);
    setDraggedOver(null);
  };

  // Create a function that will expicitly call the handleDrop function without dragging
  const handleDropExplicitly = (angle: string) => {
    setDraggedOver(null);
    setActiveAngle(null);
    const position = sequenceEquationBox % 2 === 0 ? 'right' : 'left';

    if (proofStep < proofSteps.length) {
      const currentStepId = proofSteps[proofStep].id;
      const newEquation = {
        ...equations[currentStepId],
        [position]: angle,
      };

      setEquations((prev) => ({
        ...prev,
        [currentStepId]: newEquation,
      }));

      setSequenceEquationBox((prev) => prev + 1);

      // Only check if both angles are selected
      if (newEquation.left && newEquation.right) {
        const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right);
        if (!errorMsg) {
          // Check if a step with the same ID already exists
          const existingStepIndex = completedSteps.findIndex((step) => step.id === proofSteps[proofStep].id);

          if (existingStepIndex !== -1) {
            // Update the existing step
            setCompletedSteps((prev) => {
              const updated = [...prev];
              updated[existingStepIndex] = {
                ...proofSteps[proofStep],
                equation: newEquation,
              };
              return updated;
            });
          } else {
            // Add as a new step
            setCompletedSteps((prev) => [
              ...prev,
              {
                ...proofSteps[proofStep],
                equation: newEquation,
              },
            ]);
          }

          // Instead of immediately moving to next step, enter review mode
          setIsReviewing(true);
        }
      }
    }
    setIsDragging(null);
  };

  // Canvas rendering effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    // Clear canvas
    if (ctx) {
      ctx.fillStyle = interactiveColors.canvas_background;
      ctx.fillRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
    }

    // Draw lines
    if (firstLine) {
      if (ctx) {
        drawLine(ctx, firstLine.start, firstLine.end);
      }
    }

    if (secondLine) {
      if (ctx) {
        drawLine(ctx, secondLine.start, secondLine.end);
      }
    }

    if (transversal) {
      if (ctx) {
        drawLine(ctx, transversal.start, transversal.end, '#FF4444');
      }

      if (firstLine && secondLine) {
        const int1 = getIntersection(firstLine, transversal);
        const int2 = getIntersection(secondLine, transversal);

        if (int1 && int2) {
          const transversalAngle = Math.atan2(
            transversal.end.y - transversal.start.y,
            transversal.end.x - transversal.start.x,
          );
          const line1Angle = Math.atan2(firstLine.end.y - firstLine.start.y, firstLine.end.x - firstLine.start.x);
          const line2Angle = Math.atan2(
            secondLine.end.y - secondLine.start.y,
            secondLine.end.x - secondLine.start.x,
          );

          if (ctx) {
            drawAngles(ctx, int1, int2, transversalAngle, line1Angle, line2Angle);
          }
        }
      }
    }

    if (ctx) {
      drawLabels(ctx, firstLine, secondLine, transversal);
    }
  }, [
    firstLine,
    secondLine,
    point,
    transversal,
    drawLine,
    drawAngles,
    drawLabels,
    getIntersection,
    onInteraction,
    interactiveColors,
    step,
  ]);

  const renderEquationBuilder = () => {
    if (proofStep >= proofSteps.length) return null;

    const currentStepData = proofSteps[proofStep];
    const isSupplementaryStep = currentStepData.id.startsWith('supplementary');
    const currentEquation = equations[currentStepData.id];
    const errorMessage = getErrorMessage(currentStepData.id, currentEquation?.left, currentEquation?.right);

    return (
      <div className="space-y-4">
        {/* Variable Mapping */}
        <div className="flex gap-4 mb-4">{['c', 'd', 'x'].map(renderAngleElement)}</div>

        <div className="flex items-center gap-4">
          {/* Left Side */}
          <div
            className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-lg
                ${draggedOver === 'left'
                ? 'border-blue-400 bg-blue-500/20'
                : errorMessage
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-[#757575]'
              }`}
            style={
              currentEquation?.left
                ? {
                  backgroundColor: '#fff',
                  opacity: 1,
                  color: getAngleColor(currentEquation.left),
                  textShadow: '0 0 2px rgba(255,255,255,0.5)',
                  fontWeight: 'bold',
                  fontFamily: 'Besley',
                }
                : {}
            }
            data-drop-target="left"
            onDragOver={(e) => handleDragOver(e, 'left')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'left')}
            aria-label={`${currentEquation?.left ? `Angle ${anglePronunciation[currentEquation.left]}` : ''}`}
            tabIndex={0}
          >
            {currentEquation?.left && (
              <span>
                <span>∠</span>
                <span className="italic">{currentEquation.left}</span>
              </span>
            )}
          </div>
          <span className="text-2xl" tabIndex={0} aria-label={`${isSupplementaryStep ? '+' : '='}`}>
            {isSupplementaryStep ? '+' : '='}
          </span>
          {/* Right Side */}
          <div
            className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center text-lg
                ${draggedOver === 'right'
                ? 'border-blue-400 bg-blue-500/20'
                : errorMessage
                  ? 'border-[#E0002B] bg-red-500/10'
                  : 'border-[#757575]'
              }`}
            style={
              currentEquation?.right
                ? {
                  backgroundColor: '#fff',
                  opacity: 1,
                  color: getAngleColor(currentEquation.right),
                  textShadow: '0 0 2px rgba(255,255,255,0.5)',
                  fontWeight: 'bold',
                  fontFamily: 'Besley',
                }
                : {}
            }
            data-drop-target="right"
            onDragOver={(e) => handleDragOver(e, 'right')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'right')}
            aria-label={`${currentEquation?.right ? `Angle ${anglePronunciation[currentEquation.right]}` : ''}`}
            tabIndex={0}
          >
            {currentEquation?.right && (
              <span>
                <span>∠</span>
                <span className="italic">{currentEquation.right}</span>
              </span>
            )}
          </div>
          {isSupplementaryStep && (
            <>
              <span className="text-white text-2xl">=</span>
              <span className="text-white text-2xl">180°</span>
            </>
          )}
        </div>
        {errorMessage && <p className="text-[#E0002B] text-base mt-2">{errorMessage}</p>}
        {!errorMessage && currentEquation?.left && currentEquation?.right && (
          <p className="text-base mt-2">{currentStepData.explanation}</p>
        )}
      </div>
    );
  };

  const renderProof = () => {
    if (completedSteps.length === 0) return null;
    return (
      <div className="mt-4 rounded-lg space-y-4">
        <div className="text-lg font-semibold">{t(interactiveText.proofSteps.title)}</div>
        <div className="space-y-2">
          {completedSteps.map((step, index) => {
            if (completedSteps.length === proofSteps.length && proofStep === 0 && index === 1) return null;
            return (
              <div key={index} className="">
                <span>{index + 1}. </span>
                <span dangerouslySetInnerHTML={{ __html: step.statement }} /> <span>({step.explanation})</span>
              </div>
            );
          })}
        </div>

        {/* Final conclusion and View Summary button */}
        {completedSteps.length === proofSteps.length && proofStep === 1 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-800 text-lg font-medium">{t(interactiveText.proofConclusion.title)}</p>
            <p className="text-gray-800 mt-2">
              <span style={{ color: '#DB0072', fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}>
                ∠x
              </span>{' '}
              =
              <span style={{ color: '#677600', fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}>
                ∠d
              </span>{' '}
              =
              <span style={{ color: '#633300', fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}>
                ∠c
              </span>
            </p>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowSummary(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {t(interactiveText.buttons.viewSummary)}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAngleElement = (angle: string) => (
    <div
      key={angle}
      className="w-12 h-12 flex items-center justify-center rounded cursor-move text-lg font-bold"
      style={{
        border: `2px solid #757575`,
        backgroundColor: '#fff',
        opacity: 1,
        color: getAngleColor(angle),
        textShadow: '0 0 2px rgba(255,255,255,0.5)',
        fontFamily: 'Besley',
        fontWeight: 'bold',
      }}
      draggable={!isReviewing}
      onDragStart={(e) => handleDragStart(e, angle)}
      onTouchStart={() => handleTouchStartDrag(angle)}
      onTouchMove={handleTouchMoveDrag}
      onTouchEnd={handleTouchEndDrag}
      tabIndex={0}
      onKeyDown={(e) => {
        // If Space is pressed, add the angle to the current step
        if (e.key === ' ') {
          handleDropExplicitly(angle);
        }
      }}
    >
      <span>∠</span>
      <span className="italic">{angle}</span>
    </div>
  );

  return (
    <div className="flex flex-col w-full max-w-4xl mt-[-20px]">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{steps[step].title}</h2>
            <p className="mt-2">{steps[step].instruction}</p>
          </div>
        </div>

        <div className="rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xl font-bold">{t(interactiveText.geometricPrinciples.title)}</div>
          </div>
          <div className="space-y-2">
            {interactiveText.geometricPrinciples.principles.map((principle, index) => (
              <div key={index}>
                <span className="font-bold text-normal text-gray-800">{t(principle.title)}</span>
                <span className="text-gray-700 text-">{' ' + t(principle.description)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative w-full ${step === 2 ? 'flex gap-6' : ''} min-h-[400px]`}>
        <div
          className={`relative ${step === 2 ? 'w-1/2' : 'w-full'} rounded-lg overflow-hidden p-4 border-2 border-[#757575] border-dashed`}
        >
          <div className="relative">
            <canvas
              tabIndex={0}
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full h-full rounded-lg"
              style={{
                maxHeight: '400px',
                objectFit: 'contain',
                transform: step === 2 || step === 3 ? 'scale(1.2)' : 'scale(1)',
                transformOrigin: 'top left',
              }}
            />
          </div>
        </div>

        {/* Proof Section */}
        {step === 2 && (
          <div className="w-1/2 rounded-lg p-6 flex flex-col border-[#757575] border-2">
            <div className="flex-none space-y-6">
              <div className="flex items-center justify-between">
                <div className="">{proofSteps[proofStep]?.title}</div>
                {proofStep < proofSteps.length && equations[proofSteps[proofStep].id]?.left && (
                  <button
                    onClick={() => resetEquation(proofSteps[proofStep].id)}
                    className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full flex items-center gap-2 transition-colors"
                  >
                    {/* <RotateCcw className="w-4 h-4" /> */}
                  </button>
                )}
              </div>
              <div className="sr-only">{t('scenes.common.focusModeAnnouncement')}</div>
              {renderEquationBuilder()}
              {renderProof()}
            </div>
          </div>
        )}

        {/* HTML button below the canvas and centered */}
        <div className="mt-3 flex justify-center items-center">
          {step === 0 && (
            <button
              className="bg-[#006be0] hover:bg-blue-700 text-base text-white py-2 px-4 rounded disabled:cursor-not-allowed disabled:text-[#f0f0f0] disabled:bg-[#757575] transition-colors"
              tabIndex={0}
              disabled={!!firstLine}
              onClick={drawLineExplicit}
            >
              {t(interactiveText.buttons.drawLine)}
            </button>
          )}

          {step === 1 && (
            <button
              className="bg-[#006be0] hover:bg-blue-700 text-base text-white py-2 px-4 rounded disabled:cursor-not-allowed disabled:text-[#f0f0f0] disabled:bg-[#757575] transition-colors"
              tabIndex={0}
              disabled={!!transversal}
              onClick={drawLineExplicit}
            >
              {t(interactiveText.buttons.drawTransversal)}
            </button>
          )}
        </div>

      </div>

      {showSummary && <SummarySlide onClose={() => setShowSummary(false)} />}
    </div>
  );
};

export default AlternateInteriorAnglesProof;
