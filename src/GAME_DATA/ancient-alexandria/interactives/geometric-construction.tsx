/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import geometricConstructionConfig from '../configs/geometric-construction';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface GeometricConstructionPropsConstructionProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const GeometricConstruction: React.FC<GeometricConstructionPropsConstructionProps> = ({ onInteraction }) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : geometricConstructionConfig.totalSteps);
  const [toolsEnabled, setToolsEnabled] = useState(isFirstIndex ? { compass: true } : { compass: false });

  const canvasRef = useRef<any | null>(null);
  const canvasWidth = 400;
  const canvasHeight = 300;
  const [isDraggingCircle, setIsDraggingCircle] = useState<string | null>(null);
  const [firstCircle, setFirstCircle] = useState<any | null>(
    isFirstIndex
      ? null
      : {
          center: { x: canvasWidth * 0.3, y: canvasHeight * 0.5 },
          radius: geometricConstructionConfig.circleRadius,
        },
  );
  const [secondCircle, setSecondCircle] = useState<any | null>(
    isFirstIndex
      ? null
      : {
          center: { x: canvasWidth * 0.7, y: canvasHeight * 0.5 },
          radius: geometricConstructionConfig.circleRadius,
        },
  );
  const [isPlacing, setIsPlacing] = useState(false);

  // Add touch-related state
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const [touchDragCircle, setTouchDragCircle] = useState<string | null>(null);

  const [focusedCircle, setFocusedCircle] = useState<string | null>(null);
  const [showKeyboardInstructions, setShowKeyboardInstructions] = useState(false);

  const [focusedCenterPoint, setFocusedCenterPoint] = useState<string | null>(null);

  const { t } = useTranslations();
  const { payload } = useEventListener('geometric-construction');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    if (firstCircle) {
      onInteraction({
        'step-1-completed': true,
      });
    }
    if (secondCircle) {
      onInteraction({
        'step-2-completed': true,
      });
    }
  }, [firstCircle, secondCircle]);

  // Function to automatically place circles for accessibility
  const generateCircleForAccessibility = (circleNumber: number) => {
    const canvasWidth = 400;
    const canvasHeight = 300;

    if (circleNumber === 1) {
      setFirstCircle({
        center: { x: canvasWidth * 0.3, y: canvasHeight * 0.5 },
        radius: geometricConstructionConfig.circleRadius,
      });
    } else if (circleNumber === 2) {
      setSecondCircle({
        center: { x: canvasWidth * 0.7, y: canvasHeight * 0.5 },
        radius: geometricConstructionConfig.circleRadius,
      });
    }
  };

  // Keyboard control for circles
  const handleKeyDown = (e: React.KeyboardEvent, circle: string) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

    const moveStep = e.shiftKey ? 10 : 3; // Larger steps with shift key

    if (circle === geometricConstructionConfig.firstCircle) {
      setFirstCircle((prev: any) => ({
        ...prev,
        center: {
          x: prev.center.x + (e.key === 'ArrowRight' ? moveStep : e.key === 'ArrowLeft' ? -moveStep : 0),
          y: prev.center.y + (e.key === 'ArrowDown' ? moveStep : e.key === 'ArrowUp' ? -moveStep : 0),
        },
      }));
    } else if (circle === geometricConstructionConfig.secondCircle) {
      setSecondCircle((prev: any) => ({
        ...prev,
        center: {
          x: prev.center.x + (e.key === 'ArrowRight' ? moveStep : e.key === 'ArrowLeft' ? -moveStep : 0),
          y: prev.center.y + (e.key === 'ArrowDown' ? moveStep : e.key === 'ArrowUp' ? -moveStep : 0),
        },
      }));
    }
  };

  const handleCircleFocus = (circle: string) => {
    setFocusedCircle(circle);
    setShowKeyboardInstructions(true);
  };

  const handleCircleBlur = () => {
    setFocusedCircle(null);
    // Keep instructions visible for a bit in case user is moving between elements
    setTimeout(() => setShowKeyboardInstructions(false), 3000);
  };

  const handleCenterPointFocus = (point: string) => {
    setFocusedCenterPoint(point);
    setShowKeyboardInstructions(true);
  };

  const handleCenterPointBlur = () => {
    setFocusedCenterPoint(null);
    // Keep instructions visible for a bit in case user is moving between elements
    setTimeout(() => setShowKeyboardInstructions(false), 3000);
  };

  // Function to convert screen coordinates to SVG coordinates with bounds checking
  const clientToSVGCoordinates = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    // Calculate raw coordinates
    let x = ((clientX - rect.left) / rect.width) * canvasWidth;
    let y = ((clientY - rect.top) / rect.height) * canvasHeight;

    // Apply bounds checking to keep coordinates within canvas
    x = Math.max(-30, Math.min(x, canvasWidth + 35));
    y = Math.max(20, Math.min(y, canvasHeight - 15));

    return { x, y };
  };

  const handleTouchStart = (circle: string) => {
    setIsTouchDragging(true);
    setTouchDragCircle(circle);
  };

  const handleTouchMove = (e: any) => {
    if (!isTouchDragging || !touchDragCircle) return;

    const touch = e.touches[0];
    const { x, y } = clientToSVGCoordinates(touch.clientX, touch.clientY);

    if (touchDragCircle === geometricConstructionConfig.firstCircle) {
      setFirstCircle((prev: any) => ({
        ...prev,
        center: { x, y },
      }));
    } else if (touchDragCircle === geometricConstructionConfig.secondCircle) {
      setSecondCircle((prev: any) => ({
        ...prev,
        center: { x, y },
      }));
    }
  };

  const handleTouchEnd = () => {
    setIsTouchDragging(false);
    setTouchDragCircle(null);
  };

  const handleMouseDown = (e: any) => {
    if (!isPlacing && currentStep <= 2 && toolsEnabled.compass) {
      const { x, y } = clientToSVGCoordinates(e.clientX, e.clientY);

      // Check if clicking on existing circles
      if (firstCircle) {
        const distToFirst = Math.hypot(x - firstCircle.center.x, y - firstCircle.center.y);
        if (distToFirst <= geometricConstructionConfig.circleRadius) {
          setIsDraggingCircle(geometricConstructionConfig.firstCircle);
          return;
        }
      }

      if (secondCircle) {
        const distToSecond = Math.hypot(x - secondCircle.center.x, y - secondCircle.center.y);
        if (distToSecond <= geometricConstructionConfig.circleRadius) {
          setIsDraggingCircle(geometricConstructionConfig.secondCircle);
          return;
        }
      }

      // Place new circle if not clicking on existing ones
      setIsPlacing(true);
      if (!firstCircle) {
        setFirstCircle({
          center: { x, y },
          radius: geometricConstructionConfig.circleRadius,
        });
      } else if (!secondCircle && currentStep === 2) {
        setSecondCircle({
          center: { x, y },
          radius: geometricConstructionConfig.circleRadius,
        });
      }
      setIsPlacing(false);
    }
  };

  const startCircleDrag = (circle: any, e: any) => {
    e.stopPropagation();
    setIsDraggingCircle(circle);
  };

  const handleMouseMove = (e: any) => {
    if (!isDraggingCircle) return;

    const { x, y } = clientToSVGCoordinates(e.clientX, e.clientY);

    if (isDraggingCircle === geometricConstructionConfig.firstCircle) {
      setFirstCircle((prev: any) => ({
        ...prev,
        center: { x, y },
      }));
    } else if (isDraggingCircle === geometricConstructionConfig.secondCircle) {
      setSecondCircle((prev: any) => ({
        ...prev,
        center: { x, y },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCircle(null);
  };

  // Calculate intersection points
  const calculateIntersectionPoints = () => {
    if (!firstCircle || !secondCircle) return null;

    const dx = secondCircle.center.x - firstCircle.center.x;
    const dy = secondCircle.center.y - firstCircle.center.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d > 2 * geometricConstructionConfig.circleRadius || d < 1) return null;

    const a =
      (geometricConstructionConfig.circleRadius * geometricConstructionConfig.circleRadius -
        geometricConstructionConfig.circleRadius * geometricConstructionConfig.circleRadius +
        d * d) /
      (2 * d);
    const h = Math.sqrt(
      geometricConstructionConfig.circleRadius * geometricConstructionConfig.circleRadius - a * a,
    );

    const x2 = firstCircle.center.x + (dx * a) / d;
    const y2 = firstCircle.center.y + (dy * a) / d;

    return {
      upper: {
        x: x2 - (h * dy) / d,
        y: y2 + (h * dx) / d,
      },
      lower: {
        x: x2 + (h * dy) / d,
        y: y2 - (h * dx) / d,
      },
    };
  };

  const intersectionPoints = calculateIntersectionPoints();
  const centerPoint = intersectionPoints
    ? {
        x: (firstCircle.center.x + secondCircle.center.x) / 2,
        y: (firstCircle.center.y + secondCircle.center.y) / 2,
      }
    : null;

  useEffect(() => {
    if (currentStep === 3) {
      setToolsEnabled({
        compass: false,
      });
    }
  }, [currentStep]);

  const moveToNewStep = (step: number) => {
    // Reset state based on the target step
    if (step === 1) {
      // For step 1, we reset everything
      setFirstCircle(null);
      setSecondCircle(null);
      setToolsEnabled({ compass: true });
    } else if (step === 2) {
      // For step 2, first circle should be visible
      generateCircleForAccessibility(1);
      setSecondCircle(null);
      setToolsEnabled({ compass: true });
    } else if (step >= 3) {
      // For step 3 and beyond, both circles should be visible
      generateCircleForAccessibility(1);
      generateCircleForAccessibility(2);

      // Compass is disabled from step 3 onwards
      setToolsEnabled({ compass: false });
    }

    // Set the step directly to the requested value
    setCurrentStep(step);

    // Reset interaction states
    setIsPlacing(false);
    setIsDraggingCircle(null);
    setIsTouchDragging(false);
    setTouchDragCircle(null);
    setFocusedCircle(null);
    setFocusedCenterPoint(null);
    setShowKeyboardInstructions(false);
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full p-4">
        <div className="relative">
          {/* Keyboard instructions */}
          {showKeyboardInstructions && (
            <div className="absolute mb-4 p-3 bg-blue-100 border border-blue-300 rounded text-blue-800">
              <p>{t(geometricConstructionConfig.ariaLabels.circle_navigation_instruction)}</p>
            </div>
          )}

          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neutral-900/30" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neutral-900/30" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neutral-900/30" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neutral-900/30" />

          <svg
            ref={canvasRef}
            aria-label={t(geometricConstructionConfig.ariaLabels.construction_canvas)}
            role="region"
            className="w-full h-96 rounded-lg"
            viewBox="0 0 400 300"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor:
                isDraggingCircle || isTouchDragging
                  ? 'grabbing'
                  : currentStep <= 2 && toolsEnabled.compass
                    ? 'crosshair'
                    : 'default',
            }}
          >
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
            </pattern>
            <rect width="400" height="300" fill="url(#grid)" />

            {firstCircle && secondCircle && (
              <>
                <line
                  aria-label={t(geometricConstructionConfig.ariaLabels.line_ab)}
                  x1={firstCircle.center.x}
                  y1={firstCircle.center.y}
                  x2={secondCircle.center.x}
                  y2={secondCircle.center.y}
                  stroke="#991b1b"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity={currentStep >= 5 && currentStep <= 6 ? '1' : '0.2'}
                />

                {/* Equal distance segments for step 4 */}
                {currentStep >= 3 && intersectionPoints && (
                  <g>
                    {/* AC segment */}
                    <line
                      aria-label={t(geometricConstructionConfig.ariaLabels.line_ca)}
                      x1={firstCircle.center.x}
                      y1={firstCircle.center.y}
                      x2={intersectionPoints.upper.x}
                      y2={intersectionPoints.upper.y}
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />
                    {/* AD segment */}
                    <line
                      aria-label={t(geometricConstructionConfig.ariaLabels.line_ad)}
                      x1={firstCircle.center.x}
                      y1={firstCircle.center.y}
                      x2={intersectionPoints.lower.x}
                      y2={intersectionPoints.lower.y}
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />
                    {/* BC segment */}
                    <line
                      aria-label={t(geometricConstructionConfig.ariaLabels.line_bc)}
                      x1={secondCircle.center.x}
                      y1={secondCircle.center.y}
                      x2={intersectionPoints.upper.x}
                      y2={intersectionPoints.upper.y}
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />
                    {/* BD segment */}
                    <line
                      aria-label={t(geometricConstructionConfig.ariaLabels.line_db)}
                      x1={secondCircle.center.x}
                      y1={secondCircle.center.y}
                      x2={intersectionPoints.lower.x}
                      y2={intersectionPoints.lower.y}
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />
                  </g>
                )}
              </>
            )}

            {firstCircle && (
              <g>
                {/* Circle outline */}
                <g
                  className="cursor-grab active:cursor-grabbing"
                  onMouseDown={(e) => startCircleDrag(geometricConstructionConfig.firstCircle, e)}
                  onTouchStart={() => handleTouchStart(geometricConstructionConfig.firstCircle)}
                  tabIndex={0}
                  role="button"
                  aria-label={t(geometricConstructionConfig.ariaLabels.first_circle_label)}
                  onKeyDown={(e) => handleKeyDown(e, geometricConstructionConfig.firstCircle)}
                  onFocus={() => handleCircleFocus(geometricConstructionConfig.firstCircle)}
                  onBlur={handleCircleBlur}
                >
                  <circle
                    cx={firstCircle.center.x}
                    cy={firstCircle.center.y}
                    r={firstCircle.radius}
                    stroke="#0061FC"
                    strokeWidth={focusedCircle === geometricConstructionConfig.firstCircle ? '3' : '2'}
                    fill="transparent"
                  />
                  {focusedCircle === geometricConstructionConfig.firstCircle && (
                    <circle
                      cx={firstCircle.center.x}
                      cy={firstCircle.center.y}
                      r={firstCircle.radius + 5}
                      stroke="#2563eb"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  )}
                </g>

                {/* Center point A */}
                <g
                  tabIndex={0}
                  role="button"
                  aria-label={t(geometricConstructionConfig.ariaLabels.first_circle_center_a)}
                  onKeyDown={(e) => handleKeyDown(e, geometricConstructionConfig.firstCircle)}
                  onFocus={() => handleCenterPointFocus('A')}
                  onBlur={handleCenterPointBlur}
                >
                  <circle
                    cx={firstCircle.center.x}
                    cy={firstCircle.center.y}
                    r={focusedCenterPoint === 'A' ? '8' : '6'}
                    fill={focusedCenterPoint === 'A' ? '#000000' : '#171717'}
                  />
                  <text aria-hidden x={firstCircle.center.x - 20} y={firstCircle.center.y + 5} fill="#0061FC">
                    A
                  </text>
                  {focusedCenterPoint === 'A' && (
                    <circle
                      cx={firstCircle.center.x}
                      cy={firstCircle.center.y}
                      r="12"
                      stroke="#2563eb"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="3,3"
                    />
                  )}
                </g>
              </g>
            )}

            {secondCircle && (
              <g>
                {/* Circle outline */}
                <g
                  className="cursor-grab active:cursor-grabbing"
                  onMouseDown={(e) => startCircleDrag(geometricConstructionConfig.secondCircle, e)}
                  onTouchStart={() => handleTouchStart(geometricConstructionConfig.secondCircle)}
                  tabIndex={0}
                  role="button"
                  aria-label={t(geometricConstructionConfig.ariaLabels.second_circle_label)}
                  onKeyDown={(e) => handleKeyDown(e, geometricConstructionConfig.secondCircle)}
                  onFocus={() => handleCircleFocus(geometricConstructionConfig.secondCircle)}
                  onBlur={handleCircleBlur}
                >
                  <circle
                    cx={secondCircle.center.x}
                    cy={secondCircle.center.y}
                    r={secondCircle.radius}
                    stroke="#008217"
                    strokeWidth={focusedCircle === geometricConstructionConfig.secondCircle ? '3' : '2'}
                    fill="transparent"
                  />
                  {focusedCircle === geometricConstructionConfig.secondCircle && (
                    <circle
                      cx={secondCircle.center.x}
                      cy={secondCircle.center.y}
                      r={secondCircle.radius + 5}
                      stroke="#2563eb"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  )}
                </g>

                {/* Center point B */}
                <g
                  tabIndex={0}
                  role="button"
                  aria-label={t(geometricConstructionConfig.ariaLabels.second_circle_center_b)}
                  onKeyDown={(e) => handleKeyDown(e, geometricConstructionConfig.secondCircle)}
                  onFocus={() => handleCenterPointFocus('B')}
                  onBlur={handleCenterPointBlur}
                >
                  <circle
                    cx={secondCircle.center.x}
                    cy={secondCircle.center.y}
                    r={focusedCenterPoint === 'B' ? '8' : '6'}
                    fill={focusedCenterPoint === 'B' ? '#000000' : '#171717'}
                  />
                  <text aria-hidden x={secondCircle.center.x + 15} y={secondCircle.center.y + 5} fill="#008217">
                    B
                  </text>
                  {focusedCenterPoint === 'B' && (
                    <circle
                      cx={secondCircle.center.x}
                      cy={secondCircle.center.y}
                      r="12"
                      stroke="#2563eb"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="3,3"
                    />
                  )}
                </g>
              </g>
            )}

            {intersectionPoints && (
              <>
                {/* Triangles for steps 6-7 */}
                {currentStep >= 5 && currentStep <= 6 && (
                  <g>
                    <path
                      d={`M ${firstCircle.center.x} ${firstCircle.center.y} L ${intersectionPoints.upper.x} ${intersectionPoints.upper.y} L ${intersectionPoints.lower.x} ${intersectionPoints.lower.y} Z`}
                      fill={currentStep === 6 ? '#0ea5e9' : '#E96D00'}
                      fillOpacity="0.3"
                    />
                    <path
                      d={`M ${secondCircle.center.x} ${secondCircle.center.y} L ${intersectionPoints.upper.x} ${intersectionPoints.upper.y} L ${intersectionPoints.lower.x} ${intersectionPoints.lower.y} Z`}
                      fill={currentStep === 6 ? '#0ea5e9' : '#008217'}
                      fillOpacity="0.3"
                    />
                  </g>
                )}

                {/* Triangles for steps 8-9 */}
                {currentStep >= 7 && currentStep <= 8 && centerPoint && (
                  <g>
                    <path
                      d={`M ${firstCircle.center.x} ${firstCircle.center.y} L ${centerPoint.x} ${centerPoint.y} L ${intersectionPoints.upper.x} ${intersectionPoints.upper.y} Z`}
                      fill={currentStep === 8 ? '#0ea5e9' : '#E96D00'}
                      fillOpacity="0.3"
                    />
                    <path
                      d={`M ${secondCircle.center.x} ${secondCircle.center.y} L ${centerPoint.x} ${centerPoint.y} L ${intersectionPoints.upper.x} ${intersectionPoints.upper.y} Z`}
                      fill={currentStep === 8 ? '#0ea5e9' : '#008217'}
                      fillOpacity="0.3"
                    />
                  </g>
                )}

                {/* Intersection points */}
                <g>
                  <circle cx={intersectionPoints.upper.x} cy={intersectionPoints.upper.y} r="5" fill="#991b1b" />
                  <text
                    role="img"
                    x={intersectionPoints.upper.x}
                    y={intersectionPoints.upper.y + 25}
                    fill="#8E24AA"
                    textAnchor="middle"
                    aria-label={t(geometricConstructionConfig.ariaLabels.point_c)}
                  >
                    C
                  </text>
                </g>
                <g>
                  <circle cx={intersectionPoints.lower.x} cy={intersectionPoints.lower.y} r="5" fill="#991b1b" />
                  <text
                    role="img"
                    x={intersectionPoints.lower.x}
                    y={intersectionPoints.lower.y - 15}
                    fill="#633300"
                    textAnchor="middle"
                    aria-label={t(geometricConstructionConfig.ariaLabels.point_d)}
                  >
                    D
                  </text>
                </g>

                {/* Point M */}
                {currentStep >= 4 && centerPoint && (
                  <g>
                    <circle cx={centerPoint.x} cy={centerPoint.y} r="5" fill="#991b1b" />
                    <text
                      role="img"
                      x={centerPoint.x + 3}
                      y={centerPoint.y - 4}
                      fill="#DB0072"
                      textAnchor="start"
                      aria-label={t(geometricConstructionConfig.ariaLabels.midpoint_m)}
                    >
                      M
                    </text>
                  </g>
                )}

                {/* CD Line */}
                {currentStep >= 4 && (
                  <line
                    aria-label={t(geometricConstructionConfig.ariaLabels.line_cd)}
                    x1={intersectionPoints.upper.x}
                    y1={intersectionPoints.upper.y}
                    x2={intersectionPoints.lower.x}
                    y2={intersectionPoints.lower.y}
                    stroke="#991b1b"
                    strokeWidth="2"
                    opacity={currentStep === 4 ? '1' : '0.7'}
                  />
                )}
              </>
            )}
          </svg>
        </div>
        {/* Accessibility buttons for blind users */}
        {((currentStep === 1 && !firstCircle) || (currentStep === 2 && !secondCircle)) && (
          <div className="mt-8 mb-4 flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                generateCircleForAccessibility(currentStep);
              }}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              {currentStep === 1
                ? t(geometricConstructionConfig.ariaLabels.first_circle_automatic_placement)
                : t(geometricConstructionConfig.ariaLabels.second_circle_automatic_placement)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeometricConstruction;
