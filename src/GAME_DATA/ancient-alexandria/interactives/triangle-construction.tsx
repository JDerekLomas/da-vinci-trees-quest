import React, { useState, useCallback, useEffect } from 'react';
import triangleConstructionConfig from '../configs/triangle-construction';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface Circle {
  x: number;
  y: number;
  r: number;
}

const EquilateralTriangle = () => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const { t } = useTranslations();

  const [circle1, setCircle1] = useState<Circle>({ x: 150, y: 150, r: 100 });
  const [circle2, setCircle2] = useState<Circle>({ x: 250, y: 150, r: 100 });
  const [draggingElement, setDraggingElement] = useState('');
  const [currentStep, setCurrentStep] = useState(isFirstIndex ? 1 : triangleConstructionConfig.totalSteps);

  const { ariaLabels, controllsNote } = triangleConstructionConfig;
  const { payload } = useEventListener('triangle-construction');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && payload.step !== currentStep) {
      moveToNewStep(payload.step as number);
    }
  }, [payload]);

  const findIntersections = useCallback((c1: Circle, c2: Circle) => {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    // Quick check for no intersections
    if (d > c1.r + c2.r || d < Math.abs(c1.r - c2.r) || d === 0) {
      return null;
    }

    const a = (c1.r * c1.r - c2.r * c2.r + d * d) / (2 * d);
    const h = Math.sqrt(c1.r * c1.r - a * a);

    const x2 = c1.x + (dx * a) / d;
    const y2 = c1.y + (dy * a) / d;

    const rx = -dy * (h / d);
    const ry = dx * (h / d);

    return [
      { x: x2 + rx, y: y2 + ry },
      { x: x2 - rx, y: y2 - ry },
    ];
  }, []);

  const handlePointerDown = useCallback((element: string) => {
    setDraggingElement(element);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!draggingElement) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Convert from screen coordinates to SVG viewBox coordinates
      const x = ((clientX - rect.left) / rect.width) * 400;
      const y = ((clientY - rect.top) / rect.height) * 300;

      // Calculate radius based on the distance between points
      const otherCircle = draggingElement === 'center1' ? circle2 : circle1;
      const radius = Math.sqrt(Math.pow(x - otherCircle.x, 2) + Math.pow(y - otherCircle.y, 2));

      const setCurrentCircle = draggingElement === 'center1' ? setCircle1 : setCircle2;
      const setOtherCircle = draggingElement === 'center1' ? setCircle2 : setCircle1;

      setCurrentCircle((prev) => ({ ...prev, x, y, r: radius }));
      setOtherCircle((prev) => ({ ...prev, r: radius }));
    },
    [draggingElement, circle1, circle2],
  );

  const handlePointerUp = useCallback(() => {
    setDraggingElement('');
  }, []);

  const handleKeyDown = useCallback(
    (element: string, e: React.KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

      const step = 1;
      const isCenter1 = element === 'center1';
      const currentCircle = isCenter1 ? circle1 : circle2;
      const setCurrentCircle = isCenter1 ? setCircle1 : setCircle2;
      const setOtherCircle = isCenter1 ? setCircle2 : setCircle1;

      let { x, y } = currentCircle;

      if (e.key === 'ArrowUp') y = Math.max(0, y - step);
      else if (e.key === 'ArrowDown') y = Math.min(300, y + step);
      else if (e.key === 'ArrowLeft') x = Math.max(0, x - step);
      else if (e.key === 'ArrowRight') x = Math.min(400, x + step);

      const otherCircle = isCenter1 ? circle2 : circle1;
      const newRadius = Math.sqrt(Math.pow(x - otherCircle.x, 2) + Math.pow(y - otherCircle.y, 2));

      setCurrentCircle((prev) => ({ ...prev, x, y, r: newRadius }));
      setOtherCircle((prev) => ({ ...prev, r: newRadius }));
    },
    [circle1, circle2, setCircle1, setCircle2],
  );

  const intersections = findIntersections(circle1, circle2);

  const moveToNewStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="w-full">
      <p className="mb-6 text-center">{t(controllsNote)}</p>

      <div className="relative">
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neutral-900/30" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neutral-900/30" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neutral-900/30" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neutral-900/30" />

        <svg
          className="w-full h-96"
          viewBox="0 0 400 300"
          role="application"
          aria-label={t(ariaLabels.constructionCanvas)}
          tabIndex={0}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onTouchCancel={handlePointerUp}
        >
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
          </pattern>
          <rect width="400" height="300" fill="url(#grid)" />

          {/* Center line */}
          <line
            x1={circle1.x}
            y1={circle1.y}
            x2={circle2.x}
            y2={circle2.y}
            stroke="#991b1b"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={currentStep >= 2 ? '1' : '0.1'}
          />

          {/* Circles */}
          <circle
            cx={circle1.x}
            cy={circle1.y}
            r={circle1.r}
            fill="none"
            stroke="#0061FC"
            strokeWidth="3"
            opacity={currentStep === 1 ? '1' : '0.1'}
          />
          <circle
            cx={circle2.x}
            cy={circle2.y}
            r={circle2.r}
            fill="none"
            stroke="#008217"
            strokeWidth="3"
            opacity={currentStep === 1 ? '1' : '0.1'}
          />

          {intersections && (
            <>
              {/* Triangle lines */}
              {currentStep >= 2 && (
                <>
                  <line
                    x1={circle1.x}
                    y1={circle1.y}
                    x2={intersections[0].x}
                    y2={intersections[0].y}
                    stroke="#dc2626"
                    strokeWidth="2"
                    opacity={currentStep >= 2 ? '1' : '0.1'}
                  />
                  <line
                    x1={circle2.x}
                    y1={circle2.y}
                    x2={intersections[0].x}
                    y2={intersections[0].y}
                    stroke="#dc2626"
                    strokeWidth="2"
                    opacity={currentStep >= 2 ? '1' : '0.1'}
                  />
                </>
              )}

              {/* Triangle fill for step 3 */}
              {currentStep === 3 && (
                <path
                  d={`M ${circle1.x} ${circle1.y} 
                        L ${circle2.x} ${circle2.y} 
                        L ${intersections[0].x} ${intersections[0].y} Z`}
                  fill="#dc2626"
                  fillOpacity="0.2"
                />
              )}
            </>
          )}

          {/* Centers with labels */}
          <g
            className="cursor-move outline-offset-2"
            role="button"
            aria-label={t(ariaLabels.firstCircleCenter)}
            tabIndex={0}
            onMouseDown={() => handlePointerDown('center1')}
            onTouchStart={() => handlePointerDown('center1')}
            onKeyDown={(e) => handleKeyDown('center1', e)}
          >
            <circle cx={circle1.x} cy={circle1.y} r="6" fill="#171717" />
            <text aria-hidden x={circle1.x - 25} y={circle1.y + 5} fill="#0061FC">
              A
            </text>
          </g>
          <g
            className="cursor-move outline-offset-2"
            role="button"
            tabIndex={0}
            aria-label={t(ariaLabels.secondCircleCenter)}
            onMouseDown={() => handlePointerDown('center2')}
            onTouchStart={() => handlePointerDown('center2')}
            onKeyDown={(e) => handleKeyDown('center2', e)}
          >
            <circle cx={circle2.x} cy={circle2.y} r="6" fill="#171717" />
            <text aria-hidden x={circle2.x + 15} y={circle2.y + 5} fill="#008217">
              B
            </text>
          </g>

          {/* Intersection point with label */}
          {intersections && (
            <g aria-label={t(ariaLabels.intersectionPoint)} className="outline-offset-2" role="img" tabIndex={0}>
              <circle cx={intersections[0].x} cy={intersections[0].y} r="5" fill="#991b1b" />
              <text
                aria-hidden
                x={intersections[0].x}
                y={intersections[0].y - 15}
                fill="#8E24AA"
                textAnchor="middle"
              >
                C
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default EquilateralTriangle;
