/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useCallback, FC, DragEvent, Key, ReactElement } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import triangleAngleSumConfig from '../configs/triangle-angle-sum';
import {
  Equation,
  Equations,
  ParallelLine,
  Point,
  ProofStep,
  Step,
  SummarySlideProps,
  TrianglePoints,
} from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

const SummarySlide: FC<SummarySlideProps> = ({ onClose }) => {
  const { t } = useTranslations();

  // Define triangle vertices
  const A = { x: 150, y: 50 }; // Top vertex
  const B = { x: 250, y: 200 }; // Bottom right
  const C = { x: 50, y: 200 }; // Bottom left

  // Calculate angles for arcs
  const calculateArc = (vertex: Point, point1: Point, point2: Point, radius = 15) => {
    // Get angles from vertex to each point
    const angle1 = Math.atan2(point1.y - vertex.y, point1.x - vertex.x);
    const angle2 = Math.atan2(point2.y - vertex.y, point2.x - vertex.x);

    // Calculate points on the arc
    const startX = vertex.x + radius * Math.cos(angle1);
    const startY = vertex.y + radius * Math.sin(angle1);
    const endX = vertex.x + radius * Math.cos(angle2);
    const endY = vertex.y + radius * Math.sin(angle2);

    // Determine which arc to use (smaller one)
    let largeArcFlag = 0;
    let sweepFlag = 0;

    // Calculate the angle difference to determine the sweep direction
    let angleDiff = angle2 - angle1;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;
    if (angleDiff > Math.PI) {
      sweepFlag = 1;
      largeArcFlag = 0;
    }

    return {
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
      largeArcFlag,
      sweepFlag,
    };
  };

  // Calculate arcs for each angle
  const alphaArc = calculateArc(A, B, C);
  const betaArc = calculateArc(B, C, A);
  const deltaArc = calculateArc(C, A, B);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-5 w-[90%] max-w-xl mx-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <div className="flex justify-end w-full">
            <button
              onClick={onClose}
              aria-label={t('popover.close')}
              className="p-1 hover:bg-gray-200 rounded-full text-black hover:text-black text-xl"
            >
              ×
            </button>
          </div>
          <div className="w-full max-w-[300px] mx-auto aspect-square relative my-3">
            <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* White background */}
              <rect x="0" y="0" width="300" height="300" fill="white" />

              {/* Triangle */}
              <path
                d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`}
                stroke="black"
                strokeWidth="2"
                fill="none"
              />

              {/* Angle arc for Alpha (at vertex A) */}
              <path
                d={`M ${A.x} ${A.y} L ${alphaArc.start.x} ${alphaArc.start.y} A ${15} ${15} 0 ${alphaArc.largeArcFlag} ${alphaArc.sweepFlag} ${alphaArc.end.x} ${alphaArc.end.y} Z`}
                stroke="#E0002B"
                fill="white"
                fillOpacity="0.2"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Angle arc for Beta (at vertex B) */}
              <path
                d={`M ${B.x} ${B.y} L ${betaArc.start.x} ${betaArc.start.y} A ${15} ${15} 0 ${betaArc.largeArcFlag} ${betaArc.sweepFlag} ${betaArc.end.x} ${betaArc.end.y} Z`}
                stroke="#633300"
                fill="white"
                fillOpacity="0.2"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Angle arc for Delta (at vertex C) */}
              <path
                d={`M ${C.x} ${C.y} L ${deltaArc.start.x} ${deltaArc.start.y} A ${15} ${15} 0 ${deltaArc.largeArcFlag} ${deltaArc.sweepFlag} ${deltaArc.end.x} ${deltaArc.end.y} Z`}
                stroke="#0061FC"
                fill="white"
                fillOpacity="0.2"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Angle labels */}
              <text
                x="150"
                y="35"
                fill="#E0002B"
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
                fontFamily="besley"
              >
                ∠<tspan font-style="italic">a</tspan>
              </text>
              <text
                x="270"
                y="195"
                fill="#633300"
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
                fontFamily="besley"
              >
                ∠<tspan font-style="italic">c</tspan>
              </text>
              <text
                x="30"
                y="195"
                fill="#0061FC"
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
                fontFamily="besley"
              >
                ∠<tspan font-style="italic">b</tspan>
              </text>
            </svg>
          </div>
          <div className="text-center space-y-2 my-3">
            <p className="text-black text-base">{t(triangleAngleSumConfig.summary.description)}</p>
            <p className="text-base sm:text-lg font-medium tracking-wide" style={{ fontFamily: 'besley' }}>
              <b>
                <span className="text-[#E0002B]">
                  ∠<i>a</i>
                </span>
              </b>
              <span className="text-black mx-1">+</span>
              <b>
                <span className="text-[#0061FC]">
                  ∠<i>b</i>
                </span>
              </b>
              <span className="text-black mx-1">+</span>
              <b>
                <span className="text-[#633300]">
                  ∠<i>c</i>
                </span>
              </b>
              <span className="text-black mx-1">=</span>
              <b>
                <span className="text-black">180°</span>
              </b>
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors my-3"
          >
            {t(triangleAngleSumConfig.buttons.gotIt)}
          </button>
        </div>
      </div>
    </div>
  );
};

interface TriangleAngleSumProofProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const TriangleAngleSumProof: FC<TriangleAngleSumProofProps> = ({ onInteraction }) => {
  const { t } = useTranslations();
  const gameContext = useGameContext();
  if (!gameContext) {
    throw new Error();
  }
  const { interactiveResponses, setInteractiveResponses } = gameContext;
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const [equations, setEquations] = useState<Equations>(
    isFirstIndex
      ? {
          altInterior1: { left: null, right: null },
          altInterior2: { left: null, right: null },
          straightLine: { left: null, center: null, right: null },
          completion: { left: 'a', center: 'x', right: 'y' },
        }
      : {
          altInterior1: { left: 'b', right: 'x' },
          altInterior2: { left: 'c', right: 'y' },
          straightLine: { left: 'x', center: 'a', right: 'y' },
          completion: { left: 'a', center: 'x', right: 'y' },
        },
  );

  const calculateParallelLine = useCallback((pointA: Point, pointB: Point, pointC: Point): ParallelLine => {
    const slope = (pointC.y - pointB.y) / (pointC.x - pointB.x);
    const x = pointA.y - slope * pointA.x;

    // First line through point A
    const x1 = pointA.x - 200;
    const y1 = slope * x1 + x;
    const x2 = pointA.x + 200;
    const y2 = slope * x2 + x;

    // Second line overlapping BC
    // Extend BC in both directions by a small amount
    const bcLength = Math.sqrt(Math.pow(pointC.x - pointB.x, 2) + Math.pow(pointC.y - pointB.y, 2));
    const extension = 50; // Length to extend beyond B and C
    const ratio = extension / bcLength;

    // Calculate extended points
    const second_x1 = pointB.x - (pointC.x - pointB.x) * ratio; // Extend before B
    const second_y1 = pointB.y - (pointC.y - pointB.y) * ratio;
    const second_x2 = pointC.x + (pointC.x - pointB.x) * ratio; // Extend after C
    const second_y2 = pointC.y + (pointC.y - pointB.y) * ratio;

    return {
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      secondStart: { x: second_x1, y: second_y1 },
      secondEnd: { x: second_x2, y: second_y2 },
    };
  }, []);

  const [triangle, setTriangle] = useState<TrianglePoints>(
    isFirstIndex
      ? { A: null, B: null, C: null }
      : {
          A: { x: 300, y: 100 },
          B: { x: 150, y: 300 },
          C: { x: 450, y: 300 },
        },
  );

  const [parallel, setParallel] = useState<ParallelLine | null>(
    isFirstIndex
      ? null
      : calculateParallelLine(
          triangle.A || { x: 300, y: 100 },
          triangle.B || { x: 150, y: 300 },
          triangle.C || { x: 450, y: 300 },
        ),
  );

  useEffect(() => {
    const triangleToSave = triangle;
    const parallelToSave = parallel;
    const equationsToSave = equations;

    setInteractiveResponses((prev) => ({
      ...prev,
      'triangle-angle-sum': {
        ...prev['triangle-angle-sum'],
        triangle: JSON.stringify(triangleToSave),
        parallel: JSON.stringify(parallelToSave),
        equations: JSON.stringify(equationsToSave),
      },
    }));
  }, [triangle, parallel, equations, setInteractiveResponses]);

  useEffect(() => {
    const storedTriangle = interactiveResponses['triangle-angle-sum']?.triangle
      ? (JSON.parse(interactiveResponses['triangle-angle-sum'].triangle as string) as TrianglePoints)
      : { A: null, B: null, C: null };

    const storedParallel = interactiveResponses['triangle-angle-sum']?.parallel
      ? (JSON.parse(interactiveResponses['triangle-angle-sum'].parallel as string) as ParallelLine)
      : null;

    const storedEquations = interactiveResponses['triangle-angle-sum']?.equations
      ? (JSON.parse(interactiveResponses['triangle-angle-sum'].equations as string) as Equations)
      : {
          altInterior1: { left: null, right: null },
          altInterior2: { left: null, right: null },
          straightLine: { left: null, center: null, right: null },
          completion: { left: 'a', center: 'x', right: 'y' },
        };

    setTriangle(storedTriangle);
    setParallel(storedParallel);
    setEquations(storedEquations);
  }, []);

  const prefilledProofSteps: ProofStep[] = [
    {
      id: 'altInterior1',
      title: 'scenes.S11.S11_D0_F108_C9.proof.altInterior1.title',
      statement: '∠b = ∠x',
      explanation: 'scenes.S11.S11_D0_F108_C9.proof.altInterior1.explanation',
      validPairs: [
        ['y', 'c'],
        ['x', 'b'],
      ],
    },
    {
      id: 'altInterior2',
      title: 'scenes.S11.S11_D0_F108_C9.proof.altInterior2.title',
      statement: '∠c = ∠y',
      explanation: 'scenes.S11.S11_D0_F108_C9.proof.altInterior2.explanation',
      validPairs: [
        ['y', 'c'],
        ['x', 'b'],
      ],
    },
    {
      id: 'straightLine',
      title: 'scenes.S11.S11_D0_F108_C9.proof.straightLine.title',
      statement: '∠x + ∠a + ∠y = 180°',
      explanation: 'scenes.S11.S11_D0_F108_C9.proof.straightLine.explanation',
      validAngles: ['x', 'a', 'y'],
      validPairs: undefined,
    },
  ];

  // State Management - initialize based on targetIndex
  const [step, setStep] = useState<number>(isFirstIndex ? 0 : 2);
  const [currentPoint, setCurrentPoint] = useState<'A' | 'B' | 'C'>('A');
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [showProof, setShowProof] = useState<boolean>(!isFirstIndex);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [isReviewing, setIsReviewing] = useState<boolean>(dialogIndex !== 1);
  const [proofStep, setProofStep] = useState<number>(isFirstIndex ? 0 : 2);
  const [completedSteps, setCompletedSteps] = useState<ProofStep[]>(isFirstIndex ? [] : prefilledProofSteps);
  const [currentStepCompleted, setCurrentStepCompleted] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');

  const { payload } = useEventListener('triangle-angle-sum');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      moveToNewStep((payload.step as number) || (payload.step as { proofStep: number }));
    }
  }, [payload]);

  useEffect(() => {
    if (triangle.A != null) {
      onInteraction({
        'add-point-a-completed': true,
      });
    }
    if (triangle.B != null) {
      onInteraction({
        'add-point-b-completed': true,
      });
    }
    if (triangle.C != null) {
      onInteraction({
        'add-point-c-completed': true,
      });
    }
    if (completedSteps.length === 1) {
      onInteraction({
        'step-2-completed': true,
      });
    }
    if (completedSteps.length === 2) {
      onInteraction({
        'proof-step-1-completed': true,
      });
    }
    if (completedSteps.length === 3) {
      onInteraction({
        'proof-step-2-completed': true,
      });
    }
  }, [currentPoint, triangle, proofStep, completedSteps]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Steps & proofSteps from config
  const steps: Step[] = triangleAngleSumConfig.steps;
  const proofSteps: ProofStep[] = triangleAngleSumConfig.proof.proofSteps;

  // Utility Functions
  const getAngleColor = useCallback((angleLabel: string): string => {
    switch (angleLabel) {
      case 'a':
        return '#E0002B';
      case 'b':
        return '#0061FC';
      case 'c':
        return '#633300';
      case 'y':
        return '#008217';
      case 'x':
        return '#DB0072';
      default:
        return '#FFFFFF';
    }
  }, []);

  const getErrorMessage = useCallback(
    (
      stepId: ProofStep['id'],
      leftAngle: string | null,
      rightAngle: string | null,
      centerAngle?: string | null,
    ): string | null => {
      if (stepId === 'straightLine') {
        if (!leftAngle || !rightAngle || !centerAngle) return null;
        const angles = [leftAngle, centerAngle, rightAngle];
        const requiredAngles = ['y', 'a', 'x'];
        const hasAllRequired = requiredAngles.every((angle) => angles.includes(angle));
        if (!hasAllRequired) {
          return t(triangleAngleSumConfig.proof.errorStatement);
        }
      } else {
        if (!leftAngle || !rightAngle) return null;
        const stepObj = proofSteps.find((s) => s.id === stepId);
        if (!stepObj?.validPairs) return null;
        const isValidPair = stepObj.validPairs.some((pair: string[]) => {
          return (
            (pair[0] === leftAngle && pair[1] === rightAngle) || (pair[0] === rightAngle && pair[1] === leftAngle)
          );
        });
        if (stepId === 'altInterior2') {
          const firstPair = equations.altInterior1;
          if (firstPair.left && firstPair.right) {
            const isPairDifferent = !(
              (leftAngle === firstPair.left && rightAngle === firstPair.right) ||
              (leftAngle === firstPair.right && rightAngle === firstPair.left)
            );
            if (!isPairDifferent) {
              return t('scenes.common.invalid_pair');
            }
          }
        }
        if (!isValidPair) {
          return t('scenes.common.invalid_pair');
        }
      }
      return null;
    },
    [equations.altInterior1, proofSteps, t],
  );

  // Drawing Functions
  const drawPoint = useCallback((ctx: CanvasRenderingContext2D, point: Point) => {
    // Draw the point
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#F87171';
    ctx.fill();

    // // Draw the label with offset
    // if (label) {
    //   ctx.font = '16px sans-serif';
    //   ctx.fillStyle = '#000';
    //   ctx.textAlign = 'center';
    //   ctx.textBaseline = 'middle';
    //   // Offset the label 15 pixels above the point
    //   ctx.fillText(label, point.x, point.y - 15);
    // }
  }, []);

  const drawLine = useCallback(
    (ctx: CanvasRenderingContext2D, start: Point, end: Point, color: string = '#000000') => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    },
    [],
  );

  const drawAngleArc = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      vertex: Point,
      p1: Point,
      p2: Point,
      radius: number = 30,
      color: string = '#000000',
      angleLabel?: string,
    ) => {
      if (!angleLabel) return;

      // Calculate angles from vertex to each point
      const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
      const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);

      // Calculate angle difference to determine arc direction
      let angleDiff = angle2 - angle1;
      // Normalize angle difference to be between -PI and PI
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;

      // Draw just the arc segment without the lines to center
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, radius, angle1, angle2, angleDiff < 0);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // position the label text
      const midAngle = angle1 + angleDiff / 2;
      const labelRadius = radius + 25;
      const textX = vertex.x + labelRadius * Math.cos(midAngle);
      const textY = vertex.y + labelRadius * Math.sin(midAngle);
      return { x: textX, y: textY };
    },
    [completedSteps, proofSteps, proofStep, equations, getErrorMessage, isReviewing],
  );

  const drawPointLabel = useCallback(
    (ctx: CanvasRenderingContext2D, point: Point, label: string) => {
      const OFFSET = 20; // Base offset distance from point

      // Helper to calculate angle between two points
      const getAngle = (p1: Point, p2: Point) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

      if (!triangle.A || !triangle.B || !triangle.C) return;

      let labelX = point.x;
      let labelY = point.y;

      if (label === 'A') {
        // For point A, calculate angles to both connected points
        const angleAB = getAngle(triangle.A, triangle.B);
        const angleAC = getAngle(triangle.A, triangle.C);
        // Bisect the angle to find safe direction
        const bisectorA = (angleAB + angleAC) / 2;
        // Place label in opposite direction of bisector (above the lines)
        labelX = point.x - OFFSET * Math.cos(bisectorA);
        labelY = point.y - OFFSET * Math.sin(bisectorA);
      } else if (label === 'B') {
        // For point B, calculate angle perpendicular to AB
        const angleAB_B = getAngle(triangle.B, triangle.A);
        // Place label to the left of AB line
        labelX = point.x + OFFSET * Math.cos(angleAB_B - Math.PI / 2);
        labelY = point.y + OFFSET * Math.sin(angleAB_B - Math.PI / 2);
      } else if (label === 'C') {
        // For point C, calculate angle perpendicular to AC
        const angleAC_C = getAngle(triangle.C, triangle.A);
        // Place label to the right of AC line
        labelX = point.x + OFFSET * Math.cos(angleAC_C + Math.PI / 2);
        labelY = point.y + OFFSET * Math.sin(angleAC_C + Math.PI / 2);
      }

      ctx.font = 'bold 16px avenir-next';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, labelX, labelY);
    },
    [triangle],
  );

  // New function to draw line labels
  const drawLineLabel = useCallback(
    (ctx: CanvasRenderingContext2D, nearPoint: Point, lineAngle: number, label: string, offsetDist: number = 25) => {
      // Calculate offset position for label
      // Perpendicular to the line
      const perpAngle = lineAngle + Math.PI / 2;
      const labelX = nearPoint.x + offsetDist * Math.cos(perpAngle);
      const labelY = nearPoint.y + offsetDist * Math.sin(perpAngle);

      // Draw the label text
      ctx.font = 'italic bold 16px besley';
      ctx.fillStyle = label === 'l₁' ? '#8E24AA' : label === 'l₂' ? '#00749D' : 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, labelX, labelY);
    },
    [],
  );

  const drawAngles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!triangle.A || !triangle.B || !triangle.C) return;

      let angleXPos, angleYPos;

      if (parallel && step >= 1) {
        angleXPos = drawAngleArc(ctx, triangle.A, parallel.end, triangle.C, 35, getAngleColor('y'), 'y');
        angleYPos = drawAngleArc(ctx, triangle.A, parallel.start, triangle.B, 35, getAngleColor('x'), 'x');
      }

      // Original triangle angles
      const angleAPos = drawAngleArc(ctx, triangle.A, triangle.B, triangle.C, 35, getAngleColor('a'), 'a');
      const angleBPos = drawAngleArc(ctx, triangle.B, triangle.C, triangle.A, 30, getAngleColor('b'), 'b');
      const angleCPos = drawAngleArc(ctx, triangle.C, triangle.A, triangle.B, 30, getAngleColor('c'), 'c');

      // Additional angles if parallel line is drawn
      if (parallel && step >= 1) {
        // place angle labels
        ctx.font = 'italic bold 18px besley';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (angleAPos) {
          ctx.fillStyle = getAngleColor('a'); // Set color for ∠a
          ctx.fillText('∠a', angleAPos.x, angleAPos.y);
        }
        if (angleBPos) {
          ctx.fillStyle = getAngleColor('b'); // Set color for ∠b
          ctx.fillText('∠b', angleBPos.x, angleBPos.y);
        }
        if (angleCPos) {
          ctx.fillStyle = getAngleColor('c'); // Set color for ∠c
          ctx.fillText('∠c', angleCPos.x, angleCPos.y);
        }
        if (angleXPos) {
          ctx.fillStyle = getAngleColor('y'); // Set color for ∠y
          ctx.fillText('∠y', angleXPos.x, angleXPos.y);
        }
        if (angleYPos) {
          ctx.fillStyle = getAngleColor('x'); // Set color for ∠x
          ctx.fillText('∠x', angleYPos.x, angleYPos.y);
        }
      }
    },
    [triangle, parallel, step, getAngleColor, drawAngleArc],
  );

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

  const validateTriangle = useCallback((points: TrianglePoints): boolean => {
    if (!points.A || !points.B || !points.C) return false;

    // measure sides
    const side1 = Math.hypot(points.B.x - points.A.x, points.B.y - points.A.y);
    const side2 = Math.hypot(points.C.x - points.B.x, points.C.y - points.B.y);
    const side3 = Math.hypot(points.A.x - points.C.x, points.A.y - points.C.y);

    // check minimal length
    if (side1 < 30 || side2 < 30 || side3 < 30) return false;

    // check area (not collinear)
    const area = Math.abs(
      (points.A.x * (points.B.y - points.C.y) +
        points.B.x * (points.C.y - points.A.y) +
        points.C.x * (points.A.y - points.B.y)) /
        2,
    );
    return area > 100;
  }, []);

  // Accessible point placement function
  const handleAccessiblePointPlacement = useCallback(
    (pointKey: 'A' | 'B' | 'C') => {
      if (step !== 0) return;

      // Predefined positions for accessible triangle creation
      const accessiblePositions = {
        A: { x: 300, y: 100 },
        B: { x: 150, y: 300 },
        C: { x: 450, y: 300 },
      };

      setTriangle((prev) => ({
        ...prev,
        [pointKey]: accessiblePositions[pointKey],
      }));

      if (pointKey === 'A') {
        setCurrentPoint('B');
      } else if (pointKey === 'B') {
        setCurrentPoint('C');
      } else if (pointKey === 'C') {
        // All points are placed, validate and proceed
        if (!(triangle.A && triangle.B)) return;
        setAnnouncement(t('scenes.S11.S11_D0_F108_C9.trianglePlaced'));
        setStep(1);
      }
    },
    [step, triangle, announcement, setCurrentPoint, setTriangle, validateTriangle, setStep, setAnnouncement],
  );

  // State to track touch interactions
  const [touchDragAngle, setTouchDragAngle] = useState<string | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [touchElement, setTouchElement] = useState<HTMLElement | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, angle: string) => {
    e.dataTransfer.setData('text/plain', angle);
    e.dataTransfer.effectAllowed = 'move';

    setIsDragging(angle);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, position: 'left' | 'center' | 'right') => {
    e.preventDefault();

    // Use either the dragged angle from mouse or touch
    const draggedAngle = isDragging || touchDragAngle;

    if (draggedAngle && proofStep < proofSteps.length) {
      const currentStepId = proofSteps[proofStep].id;
      const newEquation: Equation = {
        ...equations[currentStepId as keyof Equations],
        [position]: draggedAngle,
      };

      setEquations((prev) => ({
        ...prev,
        [currentStepId]: newEquation,
      }));

      if (currentStepId === 'straightLine') {
        const allFilled = newEquation.left && newEquation.center && newEquation.right;
        if (allFilled) {
          const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right, newEquation.center);
          if (!errorMsg) {
            const completedStep: ProofStep = {
              ...proofSteps[proofStep],
              statement: `∠${newEquation.left} + ∠${newEquation.center} + ∠${newEquation.right} = 180°`,
            };
            setCompletedSteps((prev) => [...prev, completedStep]);
            setIsReviewing(true);
            setShowProof(true);
            setCurrentStepCompleted(true);
          }
        }
      } else {
        if (newEquation.left && newEquation.right) {
          const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right);
          if (!errorMsg) {
            const completedStep: ProofStep = {
              ...proofSteps[proofStep],
              statement: `∠${newEquation.left} = ∠${newEquation.right}`,
            };
            setCompletedSteps((prev) => [...prev, completedStep]);
            setIsReviewing(true);
            setShowProof(true);
            setCurrentStepCompleted(true);
          }
        }
      }
    }
    setIsDragging(null);
    setTouchDragAngle(null);
    setTouchPosition(null);
    setTouchElement(null);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, angle: string) => {
    const touch = e.touches[0];
    setTouchDragAngle(angle);
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
    setTouchElement(e.currentTarget);

    // Create a clone of the element for visual feedback
    const clone = e.currentTarget.cloneNode(true) as HTMLElement;
    clone.id = 'dragging-clone';
    clone.style.position = 'fixed';
    clone.style.left = `${touch.clientX - e.currentTarget.offsetWidth / 2}px`;
    clone.style.top = `${touch.clientY - e.currentTarget.offsetHeight / 2}px`;
    clone.style.zIndex = '9999';
    clone.style.opacity = '0.8';
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchDragAngle) {
      const touch = e.touches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });

      // Move the clone
      const clone = document.getElementById('dragging-clone');
      if (clone) {
        clone.style.left = `${touch.clientX - (touchElement?.offsetWidth || 0) / 2}px`;
        clone.style.top = `${touch.clientY - (touchElement?.offsetHeight || 0) / 2}px`;
      }

      // Check if we're over a drop zone
      const dropZones = document.querySelectorAll('.drop-zone');

      dropZones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          zone.classList.add('drop-zone-active');
        } else {
          zone.classList.remove('drop-zone-active');
        }
      });
    }
  };

  const handleTouchEnd = () => {
    // Remove the clone
    const clone = document.getElementById('dragging-clone');
    if (clone) {
      document.body.removeChild(clone);
    }

    // Find which drop zone we're over (if any)
    if (touchPosition && touchDragAngle) {
      const dropZones = document.querySelectorAll('.drop-zone');
      let dropPosition: 'left' | 'center' | 'right' | null = null;

      dropZones.forEach((zone) => {
        zone.classList.remove('drop-zone-active');
        const rect = zone.getBoundingClientRect();
        if (
          touchPosition.x >= rect.left &&
          touchPosition.x <= rect.right &&
          touchPosition.y >= rect.top &&
          touchPosition.y <= rect.bottom
        ) {
          if (zone.getAttribute('data-position') === 'left') dropPosition = 'left';
          else if (zone.getAttribute('data-position') === 'center') dropPosition = 'center';
          else if (zone.getAttribute('data-position') === 'right') dropPosition = 'right';
        }
      });

      if (dropPosition) {
        // Simulate drop with the currently touched angle
        const currentStepId = proofSteps[proofStep].id;
        const newEquation: Equation = {
          ...equations[currentStepId as keyof Equations],
          [dropPosition]: touchDragAngle,
        };

        setEquations((prev) => ({
          ...prev,
          [currentStepId]: newEquation,
        }));

        if (currentStepId === 'straightLine') {
          const allFilled = newEquation.left && newEquation.center && newEquation.right;
          if (allFilled) {
            const errorMsg = getErrorMessage(
              currentStepId,
              newEquation.left,
              newEquation.right,
              newEquation.center,
            );
            if (!errorMsg) {
              const completedStep: ProofStep = {
                ...proofSteps[proofStep],
                statement: `∠${newEquation.left} + ∠${newEquation.center} + ∠${newEquation.right} = 180°`,
              };
              setCompletedSteps((prev) => [...prev, completedStep]);
              setIsReviewing(true);
              setShowProof(true);
              setCurrentStepCompleted(true);
            }
          }
        } else {
          if (newEquation.left && newEquation.right) {
            const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right);
            if (!errorMsg) {
              const completedStep: ProofStep = {
                ...proofSteps[proofStep],
                statement: `∠${newEquation.left} = ∠${newEquation.right}`,
              };
              setCompletedSteps((prev) => [...prev, completedStep]);
              setIsReviewing(true);
              setShowProof(true);
              setCurrentStepCompleted(true);
            }
          }
        }
      }
    }

    setTouchDragAngle(null);
    setTouchPosition(null);
    setTouchElement(null);
  };

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw triangle lines
    Object.entries(triangle).forEach(([, point], index) => {
      if (point) {
        const nextKey = ['A', 'B', 'C'][(index + 1) % 3];
        const nextPoint = triangle[nextKey as keyof TrianglePoints];
        if (nextPoint) {
          drawLine(ctx, point, nextPoint);
        }
      }
    });

    // parallel line if step >= 1
    if (step >= 1 && triangle.A && triangle.B && triangle.C) {
      if (!parallel) {
        const newParallel = calculateParallelLine(triangle.A, triangle.B, triangle.C);
        setParallel(newParallel);
      } else {
        // First Line
        const angle1 = Math.atan2(parallel.end.y - parallel.start.y, parallel.end.x - parallel.start.x);
        drawLine(ctx, parallel.start, parallel.end, '#000');
        drawArrowhead(ctx, parallel.start, angle1 + Math.PI, '#000');
        drawArrowhead(ctx, parallel.end, angle1, '#000');
        
        // Add label l₁ to first parallel line
        drawLineLabel(ctx, parallel.end, angle1, 'l₁', 25);

        // Second Line
        const angle2 = Math.atan2(
          parallel.secondEnd!.y - parallel.secondStart!.y,
          parallel.secondEnd!.x - parallel.secondStart!.x,
        );
        drawLine(ctx, parallel.secondStart!, parallel.secondEnd!, '#000');
        drawArrowhead(ctx, parallel.secondStart!, angle2 + Math.PI, '#000');
        drawArrowhead(ctx, parallel.secondEnd!, angle2, '#000');
        
        // Add label l₂ to second parallel line
        drawLineLabel(ctx, parallel.secondEnd!, angle2, 'l₂', 25);

        //Draw point labels
        drawPointLabel(
          ctx,
          {
            x: triangle.A.x,
            y: triangle.A.y,
          },
          'A',
        );
        drawPointLabel(
          ctx,
          {
            x: triangle.B.x,
            y: triangle.B.y,
          },
          'B',
        );
        drawPointLabel(
          ctx,
          {
            x: triangle.C.x,
            y: triangle.C.y,
          },
          'C',
        );
      }
    }

    // draw points
    Object.values(triangle).forEach((point) => {
      if (point) {
        // Pass with label to draw the point
        drawPoint(ctx, point);
      }
    });

    // draw angles
    drawAngles(ctx);
  }, [
    triangle,
    parallel,
    step,
    drawLine,
    drawPoint,
    drawAngleArc,
    getAngleColor,
    drawAngles,
    calculateParallelLine,
    drawLineLabel,
  ]);

  const [lastUpdatedPosition, setLastUpdatedPosition] = useState<'left' | 'center' | 'right'>('left');

  const handleAngleClick = (angle: string) => {
    if (proofStep >= proofSteps.length) return;

    const currentStepId = proofSteps[proofStep].id;
    const currentEquation = equations[currentStepId as keyof Equations];

    const isUsed = Object.values(currentEquation).some((val) => val === angle);
    const isUsedInPreviousStep =
      proofStep === 1 && Object.values(equations.altInterior1).some((val) => val === angle);

    if (isUsed || isUsedInPreviousStep) return;

    let position: 'left' | 'center' | 'right';

    if (currentStepId === 'straightLine') {
      if (!currentEquation.left) {
        position = 'left';
      } else if (!currentEquation.center) {
        position = 'center';
      } else if (!currentEquation.right) {
        position = 'right';
      } else {
        if (lastUpdatedPosition === 'left') position = 'center';
        else if (lastUpdatedPosition === 'center') position = 'right';
        else position = 'left';
      }
    } else {
      if (!currentEquation.left) {
        position = 'left';
      } else if (!currentEquation.right) {
        position = 'right';
      } else {
        position =
          currentEquation.left && currentEquation.right
            ? lastUpdatedPosition === 'left'
              ? 'right'
              : 'left'
            : 'left';
      }
    }

    setLastUpdatedPosition(position);

    const newEquation = {
      ...currentEquation,
      [position]: angle,
    };

    setEquations((prev) => ({
      ...prev,
      [currentStepId]: newEquation,
    }));

    if (currentStepId === 'straightLine') {
      const allFilled = newEquation.left && newEquation.center && newEquation.right;
      if (allFilled) {
        const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right, newEquation.center);
        if (!errorMsg) {
          const completedStep: ProofStep = {
            ...proofSteps[proofStep],
            statement: `∠${newEquation.left} + ∠${newEquation.center} + ∠${newEquation.right} = 180°`,
          };
          setCompletedSteps((prev) => [...prev, completedStep]);
          setIsReviewing(true);
          setShowProof(true);
          setCurrentStepCompleted(true);
        }
      }
    } else {
      if (newEquation.left && newEquation.right) {
        const errorMsg = getErrorMessage(currentStepId, newEquation.left, newEquation.right);
        if (!errorMsg) {
          const completedStep: ProofStep = {
            ...proofSteps[proofStep],
            statement: `∠${newEquation.left} = ∠${newEquation.right}`,
          };
          setCompletedSteps((prev) => [...prev, completedStep]);
          setIsReviewing(true);
          setShowProof(true);
          setCurrentStepCompleted(true);
        }
      }
    }
  };

  // Render equation builder
  const renderEquationBuilder = () => {
    if (proofStep >= proofSteps.length) return null;

    const currentStepData = proofSteps[proofStep];
    const currentEquation = equations[currentStepData.id as keyof Equations];
    const isStraightLineStep = currentStepData.id === 'straightLine';
    const errorMessage = getErrorMessage(
      currentStepData.id,
      currentEquation?.left,
      currentEquation?.right,
      currentEquation?.center,
    );

    return (
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          {['a', 'b', 'c', 'y', 'x'].map((angle) => {
            const isUsed = currentEquation && Object.values(currentEquation).some((val) => val === angle);

            // Fix the logic for determining if an angle is used in previous step
            const isUsedInPreviousStep =
              proofStep === 1 &&
              equations.altInterior1.left &&
              equations.altInterior1.right &&
              (equations.altInterior1.left === angle || equations.altInterior1.right === angle);

            // Only disable if actually used or current step is completed
            const isDisabled =
              isUsed ||
              isUsedInPreviousStep ||
              currentStepCompleted ||
              completedSteps.length === proofSteps.length;

            return (
              <div
                key={angle}
                className={`w-12 h-12 flex mt-3 items-center border justify-center rounded ${
                  isDisabled ? 'opacity-40 cursor-not-allowed' : 'opacity-80 hover:opacity-100 cursor-move'
                } ${touchDragAngle === angle ? 'border-blue-500 border-2' : ''}`}
                style={{
                  textShadow: '0 0 2px rgba(255,255,255,0.5)',
                  fontWeight: 'bold',
                  color: getAngleColor(angle),
                  borderColor: touchDragAngle === angle ? '#3B82F6' : '#757575',
                  border: touchDragAngle === angle ? '2px solid #3B82F6' : '2px solid #757575',
                  fontFamily: 'besley',
                }}
                onKeyDown={(e) => {
                  if (isDisabled) return null;
                  if (e.key === ' ') {
                    e.preventDefault();
                    handleAngleClick(angle);
                  }
                }}
                draggable={!isDisabled}
                onDragStart={(e) => {
                  if (!isDisabled) {
                    handleDragStart(e, angle);
                  }
                }}
                onTouchStart={(e) => {
                  if (!isDisabled) {
                    handleTouchStart(e, angle);
                  }
                }}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="button"
                aria-label={`${t('scenes.common.angle')} ${angle}`}
                tabIndex={isDisabled ? -1 : 0}
              >
                <b>∠</b>
                <i>{angle}</i>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* left drop zone */}
          <div
            className={`w-12 h-12 p-4 border rounded flex items-center justify-center transition-colors drop-zone ${
              touchDragAngle ? 'border-blue-300 bg-blue-50' : ''
            }`}
            data-position="left"
            style={
              currentEquation?.left
                ? {
                    color: getAngleColor(currentEquation.left),
                    fontWeight: 'bold',
                    borderColor: '#757575',
                    border: '2px dashed #757575',
                    fontFamily: 'besley',
                  }
                : {
                    borderColor: '#757575',
                    border: '2px dashed #757575',
                    fontFamily: 'besley',
                  }
            }
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, 'left')}
          >
            <b>
              {currentEquation?.left && `∠`}
              <i>{currentEquation?.left}</i>
            </b>
          </div>

          {isStraightLineStep ? (
            <>
              <span className="text-black text-2xl">+</span>
              {/* center drop zone */}
              <div
                className={`w-12 h-12 p-4 border rounded flex items-center justify-center transition-colors drop-zone ${
                  touchDragAngle ? 'border-blue-300 bg-blue-50' : ''
                }`}
                data-position="center"
                style={
                  currentEquation?.center
                    ? {
                        color: getAngleColor(currentEquation.center),
                        borderColor: '#757575',
                        border: '2px dashed #757575',
                        fontFamily: 'besley',
                      }
                    : {
                        borderColor: '#757575',
                        border: '2px dashed #757575',
                        fontFamily: 'besley',
                      }
                }
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, 'center')}
              >
                <b>
                  {currentEquation?.center && `∠`}
                  <i>{currentEquation?.center}</i>
                </b>
              </div>
              <span className="text-black text-2xl">+</span>
            </>
          ) : (
            <span className="text-black text-2xl">=</span>
          )}

          {/* right drop zone */}
          <div
            className={`w-12 h-12 p-4 border rounded flex items-center justify-center transition-colors drop-zone ${
              touchDragAngle ? 'border-blue-300 bg-blue-50' : ''
            }`}
            data-position="right"
            style={
              currentEquation?.right
                ? {
                    color: getAngleColor(currentEquation.right),
                    borderColor: '#757575',
                    border: '2px dashed #757575',
                    fontFamily: 'besley',
                  }
                : {
                    borderColor: '#757575',
                    border: '2px dashed #757575',
                    fontFamily: 'besley',
                  }
            }
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, 'right')}
          >
            <b>
              {currentEquation?.right && `∠`}
              <i>{currentEquation?.right}</i>
            </b>
          </div>

          {isStraightLineStep && (
            <>
              <span className="text-black text-2xl">=</span>
              <span className="text-black text-2xl">180°</span>
            </>
          )}
        </div>

        {errorMessage && (
          <div className="flex items-center justify-between mt-2">
            <p className="text-[#EB0000] text-base">{errorMessage}</p>
          </div>
        )}
        {!errorMessage && currentEquation?.left && currentEquation?.right && (
          <p className="text-base mt-2">{t(currentStepData.explanation)}</p>
        )}
      </div>
    );
  };

  // Helper function to colorize angles in statement text
  const colorizeAngles = (statement: string | JSX.Element) => {
    // Regex to match angle symbol (∠) followed by y single character
    const anglePattern = /∠([abcyx])/g;

    // Split the statement into parts that include angles and non-angles
    const parts = typeof statement === 'string' ? statement.split(anglePattern) : [statement];

    return parts.map(
      (part: string | number | boolean | ReactElement<any> | null | undefined, index: Key | null | undefined) => {
        // Every odd index in our split array is an angle character
        if (typeof index === 'number' && index % 2 === 1) {
          return (
            <span
              key={index}
              style={{ color: typeof part === 'string' ? getAngleColor(part) : '#FFFFFF', fontFamily: 'besley' }}
            >
              ∠<i>{part}</i>
            </span>
          );
        }
        // Return other parts (like +, =, 180°) as plain text
        return <span key={index}>{part}</span>;
      },
    );
  };

  // Render the proof steps
  const renderProof = () => {
    if (!showProof) return null;

    const allSteps = [...completedSteps];

    const storedEquations = interactiveResponses['triangle-angle-sum']?.equations
      ? (JSON.parse(interactiveResponses['triangle-angle-sum'].equations as string) as Equations)
      : null;

    if (storedEquations) {
      if (
        storedEquations.altInterior1.left &&
        storedEquations.altInterior1.right &&
        !allSteps.some((step) => step.id === 'altInterior1')
      ) {
        allSteps.push({
          ...proofSteps[0],
          statement: `∠${storedEquations.altInterior1.left} = ∠${storedEquations.altInterior1.right}`,
          equation: storedEquations.altInterior1,
        });
      }

      if (
        storedEquations.altInterior2.left &&
        storedEquations.altInterior2.right &&
        !allSteps.some((step) => step.id === 'altInterior2')
      ) {
        allSteps.push({
          ...proofSteps[1],
          statement: `∠${storedEquations.altInterior2.left} = ∠${storedEquations.altInterior2.right}`,
          equation: storedEquations.altInterior2,
        });
      }

      if (
        storedEquations.straightLine.left &&
        storedEquations.straightLine.center &&
        storedEquations.straightLine.right &&
        !allSteps.some((step) => step.id === 'straightLine')
      ) {
        allSteps.push({
          ...proofSteps[2],
          statement: `∠${storedEquations.straightLine.left} + ∠${storedEquations.straightLine.center} + ∠${storedEquations.straightLine.right} = 180°`,
          equation: storedEquations.straightLine,
        });
      }
    }

    return (
      <div className="bg-white rounded-lg mt-6 space-y-4">
        <div className="text-xl font-bold mb-4">{t(triangleAngleSumConfig.proof.proofStepsHeader)}</div>
        <div className="space-y-4">
          {allSteps.map((step, index) => {
            return (
              <div key={index} className="transform transition-all duration-500 ease-out animate-fade-in">
                <p className="font-semibold">{t(step.title)}</p>
                <p className="ml-4">
                  <b>{colorizeAngles(step.statement)}</b>
                </p>
                <p className="ml-4 text-base">{t(step.explanation)}</p>
              </div>
            );
          })}

          {allSteps.length === proofSteps.length && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="transform transition-all duration-500 ease-out animate-fade-in">
                <p className="font-semibold mb-2">{t(triangleAngleSumConfig.proof.finalStatement)}</p>
                <div className="ml-4 space-y-2">
                  <p>
                    <b>
                      <span style={{ color: getAngleColor('a'), fontFamily: 'besley', fontWeight: 'bolder' }}>
                        ∠<i>a</i>
                      </span>{' '}
                      +
                      <span style={{ color: getAngleColor('b'), fontFamily: 'besley', fontWeight: 'bolder' }}>
                        ∠<i>b</i>
                      </span>{' '}
                      +
                      <span style={{ color: getAngleColor('c'), fontFamily: 'besley', fontWeight: 'bolder' }}>
                        ∠<i>c</i>
                      </span>{' '}
                      = 180°
                    </b>
                  </p>
                  <p>{t(triangleAngleSumConfig.proof.summaryText)}</p>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowSummary(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t(triangleAngleSumConfig.proof.viewSummary)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Move to any step or proof step with appropriate state setup
  const moveToNewStep = useCallback(
    (targetStep: number | { proofStep: number }) => {
      // Default triangle for quick setup
      const defaultTriangle = {
        A: { x: 300, y: 100 },
        B: { x: 150, y: 300 },
        C: { x: 450, y: 300 },
      };

      // Case 1: Moving to a main step (0-2)
      if (typeof targetStep === 'number') {
        setStep(targetStep);
        if (targetStep === 2) {
          setProofStep(0);
        } else {
          setShowProof(false);
        }
        return;
      }
      // Case 2: Moving to a specific proof step
      if (typeof targetStep === 'object' && 'proofStep' in targetStep) {
        const targetProofStep = targetStep.proofStep;

        // First ensure we're at step 2 with valid triangle and parallel line
        if (!triangle.A || !triangle.B || !triangle.C) {
          setTriangle(defaultTriangle);
        }
        if (!parallel) {
          const newTriangle = triangle.A ? triangle : defaultTriangle;
          const newParallel = calculateParallelLine(newTriangle.A!, newTriangle.B!, newTriangle.C!);
          setParallel(newParallel);
          setTriangle(newTriangle);
        }

        // Generate completed steps for all proof steps before the target
        const newCompletedSteps: ProofStep[] = [];
        for (let i = 0; i < Math.min(targetProofStep, proofSteps.length) - 1; i++) {
          // Create sample completed steps with default values
          const step = proofSteps[i];
          let statement = '';

          if (step.id === 'altInterior1') {
            statement = '∠b = ∠x';
          } else if (step.id === 'altInterior2') {
            statement = '∠c = ∠y';
          } else if (step.id === 'straightLine') {
            statement = '∠x + ∠a + ∠y = 180°';
          }

          newCompletedSteps.push({
            ...step,
            statement,
          });
        }

        const newEquations: any = {
          altInterior1: { left: null, right: null },
          altInterior2: { left: null, right: null },
          straightLine: { left: null, center: null, right: null },
          completion: { left: 'a', center: 'x', right: 'y' },
        };

        if (targetProofStep > 0 && completedSteps.length < 1) {
          newEquations.altInterior1 = { left: 'b', right: 'x' };
        }
        if (targetProofStep > 1 && completedSteps.length < 2) {
          newEquations.altInterior2 = { left: 'c', right: 'y' };
        }
        if (targetProofStep > 2 && completedSteps.length < 3) {
          newEquations.straightLine = { left: 'x', center: 'a', right: 'y' };
        }

        setStep(2);
        setCurrentStepCompleted(targetProofStep <= proofStep);
        setProofStep(Math.min(targetProofStep, proofSteps.length - 1));
        setShowProof(targetProofStep > 0);
        setIsReviewing(targetProofStep > 0);
      }
    },
    [triangle, parallel, calculateParallelLine, proofSteps],
  );

  // Main return
  return (
    <div className="flex flex-col w-full max-w-4xl mt-[-20px]">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{t(steps[step].title)}</h2>
          </div>
        </div>
        <div className="rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xl font-bold">{t(triangleAngleSumConfig.keyPrinciples.header)}</div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-bold text-normal text-gray-800">
                {t(triangleAngleSumConfig.keyPrinciples.parallelLinesTitle)}
              </span>
              <span className="text-gray-700">
                {': ' + t(triangleAngleSumConfig.keyPrinciples.parallelLinesDesc)}
              </span>
            </div>
            <div>
              <span className="font-bold text-normal text-gray-800">
                {t(triangleAngleSumConfig.keyPrinciples.straightAnglesTitle)}
              </span>
              <span className="text-gray-700">
                {': ' + t(triangleAngleSumConfig.keyPrinciples.straightAnglesDesc)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`relative w-full ${step === 2 ? 'flex gap-6' : ''} min-h-[400px]`}>
        <div
          className={`relative ${step === 2 ? 'w-1/2' : 'w-full'} border-dashed border-[#757575] overflow-hidden`}
        >
          <canvas
            tabIndex={0}
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full h-full rounded-lg border-dashed border-black"
            style={{
              maxHeight: '400px',
              objectFit: 'contain',
              border: '2px dashed #757575',
              borderColor: '#757575',
            }}
          />
        </div>

        {/* Show side panel with drag & drop if step===2 */}
        {step === 2 && (
          <div className="w-1/2 rounded-lg mt-4 p-6 flex flex-col overflow-y-auto border border-[#757575]">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium text-black">{t(proofSteps[proofStep].title)}</div>
            </div>
            <div className="sr-only">{t('scenes.common.focusModeAnnouncement')}</div>
            {renderEquationBuilder()}
            {renderProof()}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4 mb-2">
        {/* Accessible point placement button - only showing in step 0 */}
        {step === 0 && (
          <button
            onClick={() => handleAccessiblePointPlacement(currentPoint)}
            className="px-4 py-2 bg-[#006BE0] text-white rounded transition-colors flex items-center gap-2"
            aria-label={`${t('scenes.common.angle')} ${currentPoint}`}
          >
            {t('scenes.common.click_to_place_point')} {currentPoint}
          </button>
        )}
      </div>
      {showSummary && <SummarySlide onClose={() => setShowSummary(false)} />}
    </div>
  );
};

export default TriangleAngleSumProof;