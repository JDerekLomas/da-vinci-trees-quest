/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from 'react';
import circleCenterConstructionConfig from '../configs/circle-center-construction';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface CircleCenterConstructionProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const CircleCenterConstruction: React.FC<CircleCenterConstructionProps> = ({ onInteraction }) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;

  const canvasRef = useRef<any | null>(null);
  const canvasWidth = circleCenterConstructionConfig.canvasWidth;
  const canvasHeight = circleCenterConstructionConfig.canvasHeight;

  // Circle properties - center is "unknown" but we need it for calculations
  const actualCenter = circleCenterConstructionConfig.actualCenter;
  const circleRadius = circleCenterConstructionConfig.circleRadius;

  const { t } = useTranslations();
  const { payload } = useEventListener('circle-center-construction');

  // Generate default chord positions
  function generateDefaultChord(chordNumber: number) {
    if (chordNumber === 1) {
      const startAngle = -Math.PI / 3; // -60 degrees
      const endAngle = Math.PI / 4; // 45 degrees
      return [
        {
          x: actualCenter.x + circleRadius * Math.cos(startAngle),
          y: actualCenter.y + circleRadius * Math.sin(startAngle),
        },
        {
          x: actualCenter.x + circleRadius * Math.cos(endAngle),
          y: actualCenter.y + circleRadius * Math.sin(endAngle),
        },
      ];
    } else {
      const startAngle = Math.PI / 6; // 30 degrees
      const endAngle = (5 * Math.PI) / 6; // 150 degrees
      return [
        {
          x: actualCenter.x + circleRadius * Math.cos(startAngle),
          y: actualCenter.y + circleRadius * Math.sin(startAngle),
        },
        {
          x: actualCenter.x + circleRadius * Math.cos(endAngle),
          y: actualCenter.y + circleRadius * Math.sin(endAngle),
        },
      ];
    }
  }

  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : circleCenterConstructionConfig.totalSteps);
  const [firstChord, setFirstChord] = useState<any | null>(isFirstIndex ? null : generateDefaultChord(1));
  const [secondChord, setSecondChord] = useState<any | null>(isFirstIndex ? null : generateDefaultChord(2));
  const [showPBConstruction, setShowPBConstruction] = useState(false);
  const [showPBConstruction2, setShowPBConstruction2] = useState(false);

  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const [showKeyboardInstructions, setShowKeyboardInstructions] = useState(false);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    // Report completion states
    if (firstChord) {
      onInteraction({
        'step-2-completed': true,
      });
    }
    if (secondChord) {
      onInteraction({
        'step-4-completed': true,
      });
    }
  }, [firstChord, secondChord, onInteraction]);

  // Calculate perpendicular bisector
  const calculatePerpendicularBisector = useCallback((point1: any, point2: any) => {
    const midpoint = {
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2,
    };

    // Direction vector of the chord
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;

    // Perpendicular direction (rotate 90 degrees)
    const perpDx = -dy;
    const perpDy = dx;

    // Normalize and extend well beyond the circle
    const length = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
    if (length === 0) return null;

    const normalizedDx = perpDx / length;
    const normalizedDy = perpDy / length;

    const extension = 150; // Extend well beyond circle

    // Calculate rotation angle for the right angle indicator
    const angle = Math.atan2(dy, dx);

    return {
      midpoint,
      angle, // Add angle for proper orientation of right angle indicator
      start: {
        x: midpoint.x - normalizedDx * extension,
        y: midpoint.y - normalizedDy * extension,
      },
      end: {
        x: midpoint.x + normalizedDx * extension,
        y: midpoint.y + normalizedDy * extension,
      },
    };
  }, []);

  // Find intersection of two lines
  const findLineIntersection = useCallback((line1: any, line2: any) => {
    if (!line1 || !line2) return null;

    const x1 = line1.start.x,
      y1 = line1.start.y;
    const x2 = line1.end.x,
      y2 = line1.end.y;
    const x3 = line2.start.x,
      y3 = line2.start.y;
    const x4 = line2.end.x,
      y4 = line2.end.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 1e-10) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;

    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1),
    };
  }, []);

  const handleCanvasClick = useCallback(() => {
    // Remove manual chord placement - chords are now automatically placed
    return;
  }, []);

  const handleElementFocus = (element: string) => {
    setFocusedElement(element);
    setShowKeyboardInstructions(true);
  };

  const handleElementBlur = () => {
    setFocusedElement(null);
    setTimeout(() => setShowKeyboardInstructions(false), 3000);
  };

  // Function to automatically create chords for accessibility
  const generateChordForAccessibility = (chordNumber: number) => {
    if (chordNumber === 1) {
      setFirstChord(generateDefaultChord(1));
    } else if (chordNumber === 2) {
      setSecondChord(generateDefaultChord(2));
    }
  };

  const moveToNewStep = (step: number) => {
    // Reset state based on the target step
    if (step === 1) {
      setFirstChord(null);
      setSecondChord(null);
      setShowPBConstruction(false);
      setShowPBConstruction2(false);
    } else if (step === 2) {
      setFirstChord(generateDefaultChord(1));
      setSecondChord(null);
      setShowPBConstruction(false);
      setShowPBConstruction2(false);
    } else if (step >= 3 && step < 4) {
      setFirstChord(generateDefaultChord(1));
      setSecondChord(null);
      setShowPBConstruction(false);
      setShowPBConstruction2(false);
    } else if (step >= 4) {
      setFirstChord(generateDefaultChord(1));
      setSecondChord(generateDefaultChord(2));
      setShowPBConstruction(false);
      setShowPBConstruction2(false);
    }

    setCurrentStep(step);

    // Reset interaction states
    setFocusedElement(null);
    setShowKeyboardInstructions(false);
  };

  const togglePBConstruction = () => {
    setShowPBConstruction(!showPBConstruction);
  };

  const togglePBConstruction2 = () => {
    setShowPBConstruction2(!showPBConstruction2);
  };

  // Calculate perpendicular bisectors
  const firstBisector = firstChord ? calculatePerpendicularBisector(firstChord[0], firstChord[1]) : null;
  const secondBisector = secondChord ? calculatePerpendicularBisector(secondChord[0], secondChord[1]) : null;

  // Calculate construction circles for first chord
  const firstChordConstructionCircles = firstChord
    ? (() => {
        const dx = firstChord[1].x - firstChord[0].x;
        const dy = firstChord[1].y - firstChord[0].y;
        const chordLength = Math.sqrt(dx * dx + dy * dy);
        const constructionRadius = chordLength * 0.6; // 60% of chord length

        // Calculate intersection points of the two construction circles
        const d = chordLength; // distance between circle centers
        const r = constructionRadius; // radius of both circles

        let intersectionPoints: Array<{ x: number; y: number }> = [];
        if (d <= 2 * r && d > 0) {
          // circles intersect
          const a = d / 2;
          const h = Math.sqrt(r * r - a * a);

          // Midpoint between the two circle centers
          const mx = (firstChord[0].x + firstChord[1].x) / 2;
          const my = (firstChord[0].y + firstChord[1].y) / 2;

          // Unit vector perpendicular to the line connecting centers
          const ux = -dy / d;
          const uy = dx / d;

          // The two intersection points
          intersectionPoints = [
            { x: mx + h * ux, y: my + h * uy },
            { x: mx - h * ux, y: my - h * uy },
          ];
        }

        return {
          radius: constructionRadius,
          circle1: { x: firstChord[0].x, y: firstChord[0].y },
          circle2: { x: firstChord[1].x, y: firstChord[1].y },
          intersectionPoints: intersectionPoints,
        };
      })()
    : null;

  // Calculate construction circles for second chord
  const secondChordConstructionCircles = secondChord
    ? (() => {
        const dx = secondChord[1].x - secondChord[0].x;
        const dy = secondChord[1].y - secondChord[0].y;
        const chordLength = Math.sqrt(dx * dx + dy * dy);
        const constructionRadius = chordLength * 0.6; // 60% of chord length

        // Calculate intersection points of the two construction circles
        const d = chordLength; // distance between circle centers
        const r = constructionRadius; // radius of both circles

        let intersectionPoints: Array<{ x: number; y: number }> = [];
        if (d <= 2 * r && d > 0) {
          // circles intersect
          const a = d / 2;
          const h = Math.sqrt(r * r - a * a);

          // Midpoint between the two circle centers
          const mx = (secondChord[0].x + secondChord[1].x) / 2;
          const my = (secondChord[0].y + secondChord[1].y) / 2;

          // Unit vector perpendicular to the line connecting centers
          const ux = -dy / d;
          const uy = dx / d;

          // The two intersection points
          intersectionPoints = [
            { x: mx + h * ux, y: my + h * uy },
            { x: mx - h * ux, y: my - h * uy },
          ];
        }

        return {
          radius: constructionRadius,
          circle1: { x: secondChord[0].x, y: secondChord[0].y },
          circle2: { x: secondChord[1].x, y: secondChord[1].y },
          intersectionPoints: intersectionPoints,
        };
      })()
    : null;

  // Find center (intersection of bisectors)
  const foundCenter = firstBisector && secondBisector ? findLineIntersection(firstBisector, secondBisector) : null;

  return (
    <div className="w-full mx-auto">
      <div className="w-full p-4">
        <div className="relative">
          {/* Keyboard instructions */}
          {showKeyboardInstructions && (
            <div className="absolute mb-4 p-3 bg-blue-100 border border-blue-300 rounded text-blue-800">
              <p>{t(circleCenterConstructionConfig.ariaLabels.navigation_instruction)}</p>
            </div>
          )}

          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neutral-900/30" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neutral-900/30" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neutral-900/30" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neutral-900/30" />

          <svg
            ref={canvasRef}
            aria-label={t(circleCenterConstructionConfig.ariaLabels.construction_canvas)}
            role="region"
            className="w-full rounded-lg"
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            onClick={handleCanvasClick}
            style={{ height: `${canvasHeight}px`, cursor: 'default' }}
          >
            {/* Grid pattern */}
            <pattern id="grid-center" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-center)" />

            {/* The circle - always visible */}
            <circle
              tabIndex={0}
              role="img"
              aria-label={t(circleCenterConstructionConfig.ariaLabels.circle)}
              onFocus={() => handleElementFocus('circle')}
              onBlur={handleElementBlur}
              cx={actualCenter.x}
              cy={actualCenter.y}
              r={circleRadius}
              fill="none"
              stroke="#171717"
              strokeWidth={focusedElement === 'circle' ? '4' : '3'}
              opacity={currentStep === 6 ? '0.5' : '1'}
            />

            {/* First chord */}
            {firstChord && currentStep >= 2 && (
              <g opacity={currentStep === 6 ? '0.5' : '1'}>
                <line
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.first_chord)}
                  x1={firstChord[0].x}
                  y1={firstChord[0].y}
                  x2={firstChord[1].x}
                  y2={firstChord[1].y}
                  stroke="#0061FC"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle
                  tabIndex={0}
                  role="img"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.first_chord_point_1)}
                  onFocus={() => handleElementFocus('chord1-point1')}
                  onBlur={handleElementBlur}
                  cx={firstChord[0].x}
                  cy={firstChord[0].y}
                  r={focusedElement === 'chord1-point1' ? '7' : '5'}
                  fill="#0061FC"
                />
                <circle
                  tabIndex={0}
                  role="img"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.first_chord_point_2)}
                  onFocus={() => handleElementFocus('chord1-point2')}
                  onBlur={handleElementBlur}
                  cx={firstChord[1].x}
                  cy={firstChord[1].y}
                  r={focusedElement === 'chord1-point2' ? '7' : '5'}
                  fill="#0061FC"
                />
              </g>
            )}

            {/* Construction circles for first chord perpendicular bisector */}
            {firstChordConstructionCircles && showPBConstruction && currentStep === 3 && (
              <g opacity="0.6" aria-label={t(circleCenterConstructionConfig.ariaLabels.construction_circles)}>
                <circle
                  cx={firstChordConstructionCircles.circle1.x}
                  cy={firstChordConstructionCircles.circle1.y}
                  r={firstChordConstructionCircles.radius}
                  fill="#0061FC"
                  fillOpacity="0.15"
                  stroke="#0061FC"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                <circle
                  cx={firstChordConstructionCircles.circle2.x}
                  cy={firstChordConstructionCircles.circle2.y}
                  r={firstChordConstructionCircles.radius}
                  fill="#0061FC"
                  fillOpacity="0.15"
                  stroke="#0061FC"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                {/* Intersection points */}
                {firstChordConstructionCircles.intersectionPoints.map((point, index) => (
                  <circle
                    key={index}
                    tabIndex={0}
                    role="img"
                    aria-label={t(circleCenterConstructionConfig.ariaLabels.intersection_points)}
                    onFocus={() => handleElementFocus(`intersection1-${index}`)}
                    onBlur={handleElementBlur}
                    cx={point.x}
                    cy={point.y}
                    r={focusedElement === `intersection1-${index}` ? '8' : '6'}
                    fill="#0061FC"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
              </g>
            )}

            {/* First perpendicular bisector */}
            {firstBisector && currentStep >= 3 && (
              <g opacity={currentStep === 6 ? '0.5' : '1'}>
                {/* Main bisector line */}
                <line
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.first_perpendicular_bisector)}
                  x1={firstBisector.start.x}
                  y1={firstBisector.start.y}
                  x2={firstBisector.end.x}
                  y2={firstBisector.end.y}
                  stroke="#991B1B"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                />
                {/* Midpoint marker */}
                <circle
                  tabIndex={0}
                  role="img"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.first_midpoint)}
                  onFocus={() => handleElementFocus('midpoint1')}
                  onBlur={handleElementBlur}
                  cx={firstBisector.midpoint.x}
                  cy={firstBisector.midpoint.y}
                  r={focusedElement === 'midpoint1' ? '6' : '4'}
                  fill="#991B1B"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* Right angle indicator */}
                <g
                  transform={`translate(${firstBisector.midpoint.x}, ${firstBisector.midpoint.y}) rotate(${(firstBisector.angle * 180) / Math.PI + 45})`}
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.right_angle_indicator)}
                >
                  <path d="M -6,0 L -6,-6 L 0,-6" fill="none" stroke="#991B1B" strokeWidth="1.5" />
                </g>
              </g>
            )}

            {/* Second chord */}
            {secondChord && currentStep >= 4 && (
              <g opacity={currentStep === 6 ? '0.5' : '1'}>
                <line
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.second_chord)}
                  x1={secondChord[0].x}
                  y1={secondChord[0].y}
                  x2={secondChord[1].x}
                  y2={secondChord[1].y}
                  stroke="#008217"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle
                  tabIndex={0}
                  role="img"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.second_chord_point_1)}
                  onFocus={() => handleElementFocus('chord2-point1')}
                  onBlur={handleElementBlur}
                  cx={secondChord[0].x}
                  cy={secondChord[0].y}
                  r={focusedElement === 'chord2-point1' ? '7' : '5'}
                  fill="#008217"
                />
                <circle
                  tabIndex={0}
                  role="img"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.second_chord_point_2)}
                  onFocus={() => handleElementFocus('chord2-point2')}
                  onBlur={handleElementBlur}
                  cx={secondChord[1].x}
                  cy={secondChord[1].y}
                  r={focusedElement === 'chord2-point2' ? '7' : '5'}
                  fill="#008217"
                />
              </g>
            )}

            {/* Construction circles for second chord perpendicular bisector */}
            {secondChordConstructionCircles && showPBConstruction2 && currentStep === 5 && (
              <g opacity="0.6" aria-label={t(circleCenterConstructionConfig.ariaLabels.construction_circles)}>
                <circle
                  cx={secondChordConstructionCircles.circle1.x}
                  cy={secondChordConstructionCircles.circle1.y}
                  r={secondChordConstructionCircles.radius}
                  fill="#008217"
                  fillOpacity="0.15"
                  stroke="#008217"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                <circle
                  cx={secondChordConstructionCircles.circle2.x}
                  cy={secondChordConstructionCircles.circle2.y}
                  r={secondChordConstructionCircles.radius}
                  fill="#008217"
                  fillOpacity="0.15"
                  stroke="#008217"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                {/* Intersection points */}
                {secondChordConstructionCircles.intersectionPoints.map((point, index) => (
                  <circle
                    key={index}
                    tabIndex={0}
                    role="img"
                    aria-label={t(circleCenterConstructionConfig.ariaLabels.intersection_points)}
                    onFocus={() => handleElementFocus(`intersection2-${index}`)}
                    onBlur={handleElementBlur}
                    cx={point.x}
                    cy={point.y}
                    r={focusedElement === `intersection2-${index}` ? '8' : '6'}
                    fill="#008217"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
              </g>
            )}

            {/* Second perpendicular bisector */}
            {secondBisector && currentStep >= 5 && (
              <g opacity={currentStep === 6 ? '0.5' : '1'}>
                {/* Main bisector line */}
                <line
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.second_perpendicular_bisector)}
                  x1={secondBisector.start.x}
                  y1={secondBisector.start.y}
                  x2={secondBisector.end.x}
                  y2={secondBisector.end.y}
                  stroke="#991B1B"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                />
                {/* Midpoint marker */}
                <circle
                  tabIndex={0}
                  role="img"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.second_midpoint)}
                  onFocus={() => handleElementFocus('midpoint2')}
                  onBlur={handleElementBlur}
                  cx={secondBisector.midpoint.x}
                  cy={secondBisector.midpoint.y}
                  r={focusedElement === 'midpoint2' ? '6' : '4'}
                  fill="#991B1B"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* Right angle indicator */}
                <g
                  transform={`translate(${secondBisector.midpoint.x}, ${secondBisector.midpoint.y}) rotate(${(secondBisector.angle * 180) / Math.PI + 45})`}
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.right_angle_indicator)}
                >
                  <path d="M -6,0 L -6,-6 L 0,-6" fill="none" stroke="#991B1B" strokeWidth="1.5" />
                </g>
              </g>
            )}

            {/* Found center */}
            {foundCenter && currentStep >= 6 && (
              <g>
                {/* Highlight circle around center */}
                <circle
                  cx={foundCenter.x}
                  cy={foundCenter.y}
                  r="15"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
                {/* Center point */}
                <circle
                  tabIndex={0}
                  role="img"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.center_point)}
                  onFocus={() => handleElementFocus('center')}
                  onBlur={handleElementBlur}
                  cx={foundCenter.x}
                  cy={foundCenter.y}
                  r={focusedElement === 'center' ? '12' : '8'}
                  fill="#DC2626"
                  stroke="#ffffff"
                  strokeWidth="3"
                />
                {/* Label */}
                <text
                  x={foundCenter.x + 20}
                  y={foundCenter.y - 5}
                  fill="#DC2626"
                  className="font-bold text-sm"
                  fontSize="14"
                  aria-hidden="true"
                >
                  Center!
                </text>

                {/* Accuracy indicator - show original center */}
                <circle
                  cx={actualCenter.x}
                  cy={actualCenter.y}
                  r="3"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.4"
                  aria-label={t(circleCenterConstructionConfig.ariaLabels.accuracy_indicator)}
                />
              </g>
            )}
          </svg>
        </div>

        {/* Accessibility buttons for automatic chord creation */}
        {((currentStep === 2 && !firstChord) || (currentStep === 4 && !secondChord)) && (
          <div className="mt-8 mb-4 flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (currentStep === 2) generateChordForAccessibility(1);
                if (currentStep === 4) generateChordForAccessibility(2);
              }}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              {currentStep === 2
                ? t(circleCenterConstructionConfig.ariaLabels.auto_create_first_chord)
                : t(circleCenterConstructionConfig.ariaLabels.auto_create_second_chord)}
            </button>
          </div>
        )}

        {/* Perpendicular Bisector Construction Toggle - Only visible in step 3 */}
        {currentStep === 3 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={togglePBConstruction}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              aria-label={t(circleCenterConstructionConfig.ariaLabels.toggle_pb_construction)}
            >
              {showPBConstruction
                ? t(circleCenterConstructionConfig.ariaLabels.hide_pb_construction)
                : t(circleCenterConstructionConfig.ariaLabels.show_pb_construction)}{' '}
              Perpendicular Bisector Construction
            </button>
          </div>
        )}

        {/* Perpendicular Bisector Construction Toggle - Only visible in step 5 */}
        {currentStep === 5 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={togglePBConstruction2}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              aria-label={t(circleCenterConstructionConfig.ariaLabels.toggle_pb_construction)}
            >
              {showPBConstruction2
                ? t(circleCenterConstructionConfig.ariaLabels.hide_pb_construction)
                : t(circleCenterConstructionConfig.ariaLabels.show_pb_construction)}{' '}
              Perpendicular Bisector Construction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircleCenterConstruction;
