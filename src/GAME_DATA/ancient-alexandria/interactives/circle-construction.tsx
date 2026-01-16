/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import circleConstructionConfig from '../configs/circle-construction';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import useScreenSize from '../../../hooks/useScreenSize';
import { useGameContext } from '../../../hooks/useGameContext';

interface CircleConstructionProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const CircleConstruction: React.FC<CircleConstructionProps> = ({ onInteraction }) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : circleConstructionConfig.totalSteps);
  const [compassPlaced, setCompassPlaced] = useState(isFirstIndex ? false : true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isTraceComplete, setIsTraceComplete] = useState(isFirstIndex ? false : true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [showDraggedElement, setShowDraggedElement] = useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null); // Reference to the board element
  const { payload } = useEventListener('circle-construction');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    if (compassPlaced) {
      onInteraction({
        'step-2-completed': compassPlaced,
      });
    }
    if (isTraceComplete) {
      onInteraction({
        'step-3-completed': isTraceComplete,
      });
    }
  }, [compassPlaced, isTraceComplete]);

  const { t } = useTranslations();

  useEffect(() => {
    if (isAnimating) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / circleConstructionConfig.duration, 1);
        setAnimationProgress(progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setIsTraceComplete(true);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isAnimating]);

  const moveToNewStep = (newStep: number) => {
    setIsTraceComplete(newStep > 3);
    setCompassPlaced(newStep > 2);
    setCurrentStep(newStep);

    // Reset compass when returning to step 3
    if (newStep === 3) {
      setCompassPlaced(true);
      setIsTraceComplete(false);
      setIsAnimating(false);
      setAnimationProgress(0);
    }
  };

  const handleDragStart = (e: any) => {
    if (currentStep === 2 && !compassPlaced) {
      e.dataTransfer.setData('text/plain', 'compass');
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    if (currentStep === 2 && !compassPlaced) {
      if (isWithinBoardBounds(e.clientX, e.clientY)) {
        setCompassPlaced(true);
      }
    }
  };

  const isWithinBoardBounds = (x: number, y: number) => {
    if (!boardRef.current) return false;

    const boardRect = boardRef.current.getBoundingClientRect();
    return x >= boardRect.left && x <= boardRect.right && y >= boardRect.top && y <= boardRect.bottom;
  };

  const handleTouchStart = (e: any) => {
    e.preventDefault();
    if (currentStep === 2 && !compassPlaced) {
      setIsDragging(true);
      setShowDraggedElement(true);
      const touch = e.touches[0];
      setDragPosition({
        x: touch.clientX,
        y: touch.clientY,
      });
    }
  };

  const handleTouchMove = (e: any) => {
    if (isDragging) {
      const touch = e.touches[0];
      setDragPosition({
        x: touch.clientX,
        y: touch.clientY,
      });
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setShowDraggedElement(false);

      // Check if the compass was dropped within the board boundaries
      if (isWithinBoardBounds(dragPosition.x, dragPosition.y)) {
        setCompassPlaced(true);
      }
    }
  };

  const moveToTarget = () => {
    setIsDragging(false);
    setShowDraggedElement(false);
    setCompassPlaced(true);
  };

  const handleTrace = () => {
    setIsAnimating(true);
  };

  const CompassAnimation = ({ progress }: { progress: any }) => {
    if (!progress) return null;

    // Clockwise rotation (negative angle)
    const angle = -progress * Math.PI * 2;

    // Keep same dimensions as static compass
    const pivotX = circleConstructionConfig.maxInteractiveWidth / 2 + 40;
    const pivotY = whiteBoardHeight / 2 - 60;

    // Calculate compass end points with rotation
    const rotatedPivotX =
      circleConstructionConfig.maxInteractiveWidth / 2 +
      (pivotX - circleConstructionConfig.maxInteractiveWidth / 2) * Math.cos(angle) -
      (pivotY - whiteBoardHeight / 2) * Math.sin(angle);
    const rotatedPivotY =
      whiteBoardHeight / 2 +
      (pivotX - circleConstructionConfig.maxInteractiveWidth / 2) * Math.sin(angle) +
      (pivotY - whiteBoardHeight / 2) * Math.cos(angle);
    const rotatedPencilX =
      circleConstructionConfig.maxInteractiveWidth / 2 + circleConstructionConfig.radius * Math.cos(angle);
    const rotatedPencilY = whiteBoardHeight / 2 + circleConstructionConfig.radius * Math.sin(angle);

    return (
      <>
        {/* Traced portion of circle */}
        <path
          d={`M ${circleConstructionConfig.maxInteractiveWidth / 2 + circleConstructionConfig.radius} ${whiteBoardHeight / 2} A ${circleConstructionConfig.radius} ${circleConstructionConfig.radius} 0 ${-angle > Math.PI ? 1 : 0} 0 ${rotatedPencilX} ${rotatedPencilY}`}
          stroke="#0061FC"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Moving compass */}
        <g>
          {/* Pivot point */}
          <circle cx={rotatedPivotX} cy={rotatedPivotY} r="5" fill="#991B1B" />

          {/* Left leg */}
          <line
            x1={rotatedPivotX}
            y1={rotatedPivotY}
            x2={circleConstructionConfig.maxInteractiveWidth / 2}
            y2={whiteBoardHeight / 2}
            stroke="#991B1B"
            strokeWidth="2.5"
          />

          {/* Right leg */}
          <line
            x1={rotatedPivotX}
            y1={rotatedPivotY}
            x2={rotatedPencilX}
            y2={rotatedPencilY}
            stroke="#991B1B"
            strokeWidth="2.5"
          />

          {/* Pencil */}
          <g transform={`translate(${rotatedPencilX}, ${rotatedPencilY})`}>
            <rect x="-2" y="-8" width="4" height="12" fill="#991B1B" />
            <polygon points="-2,4 2,4 0,8" fill="#991B1B" />
          </g>
        </g>
      </>
    );
  };

  const isInstructionAreaExpanded = !compassPlaced && currentStep === 2;
  const { isZoomed200 } = useScreenSize();

  const whiteBoardHeight =
    window.innerHeight -
    circleConstructionConfig.heightBuffer -
    (isInstructionAreaExpanded || (currentStep === 3 && !isTraceComplete)
      ? circleConstructionConfig.instructionAreaHeight
      : 0) +
    (isZoomed200 ? 300 : 0);

  return (
    <div className="w-full mx-auto">
      <div>
        <div className={`relative`} ref={boardRef} style={{ height: `${whiteBoardHeight}px` }}>
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neutral-900/30" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neutral-900/30" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neutral-900/30" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neutral-900/30" />

          <div className={`w-full relative`} onDragOver={handleDragOver} onDragEnd={handleDrop}>
            <svg
              className={`w-full rounded-lg`}
              viewBox={`0 0 ${circleConstructionConfig.maxInteractiveWidth} ${whiteBoardHeight}`}
              style={{ height: `${whiteBoardHeight}` }}
            >
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
              </pattern>
              <rect fill="url(#grid)" width="100%" height={whiteBoardHeight} />

              {/* Center Point with Label */}
              <g>
                <circle
                  cx={circleConstructionConfig.maxInteractiveWidth / 2}
                  cy={whiteBoardHeight / 2}
                  r="4"
                  fill="#171717"
                  style={{ zIndex: '100' }}
                />
                <text
                  role="img"
                  x={circleConstructionConfig.maxInteractiveWidth / 2 + 15}
                  y={whiteBoardHeight / 2 + 5}
                  fill="#0061FC"
                  className="text-sm font-serif"
                  style={{ zIndex: '100' }}
                  aria-label={t(circleConstructionConfig.ariaLabels.point_a)}
                >
                  A
                </text>
              </g>

              {/* Static Compass when placed */}
              {compassPlaced && !isAnimating && (currentStep === 2 || (currentStep === 3 && !isTraceComplete)) && (
                <g aria-label={t(circleConstructionConfig.ariaLabels.compass_placed)}>
                  {/* Pivot point */}
                  <circle
                    cx={circleConstructionConfig.maxInteractiveWidth / 2 + 40}
                    cy={whiteBoardHeight / 2 - 60}
                    r="5"
                    fill="#991B1B"
                  />

                  {/* Left leg */}
                  <line
                    x1={circleConstructionConfig.maxInteractiveWidth / 2 + 40}
                    y1={whiteBoardHeight / 2 - 60}
                    x2={circleConstructionConfig.maxInteractiveWidth / 2}
                    y2={whiteBoardHeight / 2}
                    stroke="#991B1B"
                    strokeWidth="2.5"
                  />

                  {/* Right leg */}
                  <line
                    x1={circleConstructionConfig.maxInteractiveWidth / 2 + 40}
                    y1={whiteBoardHeight / 2 - 60}
                    x2={circleConstructionConfig.maxInteractiveWidth / 2 + 80}
                    y2={whiteBoardHeight / 2}
                    stroke="#991B1B"
                    strokeWidth="2.5"
                  />

                  {/* Pencil */}
                  <g
                    transform={`translate(${circleConstructionConfig.maxInteractiveWidth / 2 + 80}, ${whiteBoardHeight / 2})`}
                  >
                    <rect x="-2" y="-8" width="4" height="12" fill="#991B1B" />
                    <polygon points="-2,4 2,4 0,8" fill="#991B1B" />
                  </g>
                </g>
              )}

              {/* Circle that stays after completion */}
              {isTraceComplete && (
                <circle
                  role="img"
                  aria-label={t(circleConstructionConfig.ariaLabels.trace_complete)}
                  cx={circleConstructionConfig.maxInteractiveWidth / 2}
                  cy={whiteBoardHeight / 2}
                  r={circleConstructionConfig.radius}
                  stroke="#0061FC"
                  strokeWidth="2.5"
                  fill="none"
                />
              )}

              {/* Animated compass and traced path */}
              {currentStep === 3 && isAnimating && <CompassAnimation progress={animationProgress} />}
            </svg>
          </div>
        </div>

        <div className="mt-6 text-neutral-800 text-center">
          {isInstructionAreaExpanded && (
            <div className="mb-4 flex gap-12 justify-center">
              <div
                draggable
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDragStart={handleDragStart}
                onDragEnd={handleDrop}
                className="bg-amber-100 p-2 rounded-lg inline-block hover:bg-amber-200 transition-colors"
              >
                <svg width="80" height="80" viewBox="0 0 120 120" className="cursor-move">
                  <line x1="60" y1="20" x2="40" y2="100" stroke="#991B1B" strokeWidth="2.5" />
                  <line x1="60" y1="20" x2="80" y2="100" stroke="#991B1B" strokeWidth="2.5" />
                  <circle cx="60" cy="20" r="5" fill="#991B1B" />
                  <circle cx="40" cy="100" r="2" fill="#991B1B" />
                  <g transform="translate(80, 100)">
                    <rect x="-2" y="-8" width="4" height="12" fill="#991B1B" />
                    <polygon points="-2,4 2,4 0,8" fill="#991B1B" />
                  </g>
                </svg>
              </div>
              <div className="mt-10" aria-hidden>
                {t('scenes.common.or')}
              </div>
              <button
                onClick={moveToTarget}
                className="mt-6 px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
                style={{ width: '150px', height: '50px' }}
                aria-label={t(circleConstructionConfig.ariaLabels.move_compass_to_target)}
              >
                {t('dialog.button.place_compass')}
              </button>

              {/* Draggable clone */}
              {showDraggedElement && (
                <div
                  className="bg-amber-100 p-2 rounded-lg inline-block hover:bg-amber-200 transition-colors"
                  style={{
                    position: 'absolute',
                    left: `${dragPosition.x}px`,
                    top: `${dragPosition.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    touchAction: 'none',
                    opacity: 0.8, // Makes it clear this is a dragged copy
                  }}
                >
                  <svg width="80" height="80" viewBox="0 0 120 120" className="cursor-move">
                    <line x1="60" y1="20" x2="40" y2="100" stroke="#991B1B" strokeWidth="2.5" />
                    <line x1="60" y1="20" x2="80" y2="100" stroke="#991B1B" strokeWidth="2.5" />
                    <circle cx="60" cy="20" r="5" fill="#991B1B" />
                    <circle cx="40" cy="100" r="2" fill="#991B1B" />
                    <g transform="translate(80, 100)">
                      <rect x="-2" y="-8" width="4" height="12" fill="#991B1B" />
                      <polygon points="-2,4 2,4 0,8" fill="#991B1B" />
                    </g>
                  </svg>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 justify-center">
            {currentStep === 3 && !isTraceComplete && (
              <button
                onClick={handleTrace}
                disabled={isAnimating}
                className="px-4 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
              >
                {t('dialog.button.trace_the_circle')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleConstruction;
