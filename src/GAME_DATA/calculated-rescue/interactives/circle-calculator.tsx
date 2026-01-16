import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CircleCalculatorConfig } from '../configs/circle-calculator';
import { useTranslations } from '../../../hooks/useTranslations';
import { useGameContext } from '../../../hooks/useGameContext';
import { useEventListener } from '../../../hooks/useEventListener';

interface DisplayFlags {
  showRadiusButton?: boolean;
}

interface Payload {
  step: number;
  target: string;
  disabled?: string;
  displayFlags?: DisplayFlags;
}

interface Point {
  x: number;
  y: number;
}

interface VisualState {
  grid: boolean;
  triangle: boolean;
  vertices: boolean;
  sideLengths: boolean;
  perpendicularBisectors: boolean;
  angleBisectors: boolean;
  circumcenter: boolean;
  incenter: boolean;
  circumscribedCircle: boolean;
  inscribedCircle: boolean;
}

const CircleCalculator: React.FC<{ interaction: CircleCalculatorConfig }> = ({ interaction }) => {
  const { t } = useTranslations();
  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('circle-calculator') as { payload: Payload };

  const { totalSteps, gridConfig, defaultTriangle, stages, translations } = interaction;
  const { tAriaLabel, tAxes, tCommon, tStage, tStage1, tStage2, tStage3, tAccessibility } = translations;

  // Accessibility states
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');

  const [currentStep, setCurrentStep] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [showCircumRadius, setShowCircumRadius] = useState(false);
  const [showInscribedRadius, setShowInscribedRadius] = useState(false);

  const [visual, setVisual] = useState<VisualState>({
    grid: true,
    triangle: true,
    vertices: true,
    sideLengths: true,
    perpendicularBisectors: false,
    angleBisectors: false,
    circumcenter: false,
    incenter: false,
    circumscribedCircle: false,
    inscribedCircle: false,
  });

  // Refs for accessibility
  const svgRef = useRef<SVGSVGElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const circumRadiusButtonRef = useRef<HTMLButtonElement>(null);
  const inscribedRadiusButtonRef = useRef<HTMLButtonElement>(null);

  // Helper functions for accessibility
  const tInterpolate = (key: string, variables: Record<string, string | number> = {}) => {
    let translatedString = t(key);
    Object.entries(variables).forEach(([variable, value]) => {
      const placeholder = `{{${variable}}}`;
      translatedString = translatedString.replace(new RegExp(placeholder, 'g'), String(value));
    });
    return translatedString;
  };

  const announceToScreenReader = useCallback((message: string, isStatus: boolean = false) => {
    if (isStatus) {
      setStatusAnnouncement(message);
      setTimeout(() => setStatusAnnouncement(''), 100);
    } else {
      setLiveAnnouncement(message);
      setTimeout(() => setLiveAnnouncement(''), 100);
    }
  }, []);

  const getDisplayFlag = (payload: Payload | null, flagName: keyof DisplayFlags): boolean => {
    if (!payload) {
      return true;
    }
    const flag = payload.displayFlags?.[flagName];
    if (flag === false) {
      return false;
    }
    return true;
  };

  // Update current step based on payload
  useEffect(() => {
    if (payload && payload?.step && payload.step !== currentStep) {
      setCurrentStep(payload.step);
    }
  }, [payload, currentStep, stages, totalSteps, announceToScreenReader, tInterpolate, t]);

  const getStageAndSlide = (step: number) => {
    const zeroIndexedStep = step - 1;
    let remainingSteps = zeroIndexedStep;

    for (let i = 0; i < stages.length; i++) {
      if (remainingSteps < stages[i].slides.length) {
        return { stage: i, slide: remainingSteps };
      }
      remainingSteps -= stages[i].slides.length;
    }
    return { stage: stages.length - 1, slide: stages[stages.length - 1].slides.length - 1 };
  };

  const { stage, slide } = getStageAndSlide(currentStep);

  const totalWidth = gridConfig.size + gridConfig.margins.left + gridConfig.margins.right;
  const totalHeight = gridConfig.size + gridConfig.margins.top + gridConfig.margins.bottom;

  // Clean coordinate system: 3 to 10 on both axes (8 integer values)
  const coordinateRange = 7; // 10 - 3
  const gridDivisions = 7; // 7 divisions to create 8 integer points (3,4,5,6,7,8,9,10)
  const gridStep = gridConfig.size / coordinateRange; // pixels per coordinate unit
  const gridPixelStep = gridConfig.size / gridDivisions; // pixels per grid division

  // Coordinate mapping for 3 to 10 coordinate system
  const toSvgX = (x: number): number => gridConfig.margins.left + (x - 3) * gridStep;
  const toSvgY = (y: number): number => totalHeight - gridConfig.margins.bottom - (y - 3) * gridStep;

  const midpoint = (p1: Point, p2: Point): Point => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  });

  const slope = (p1: Point, p2: Point): number => {
    if (p2.x - p1.x === 0) return Infinity;
    return (p2.y - p1.y) / (p2.x - p1.x);
  };

  const perpendicularSlope = (s: number): number => {
    if (s === 0) return Infinity;
    if (s === Infinity) return 0;
    return -1 / s;
  };

  const distance = (p1: Point, p2: Point): number =>
    Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

  // Function to find the foot of perpendicular from a point to a line segment
  const getFootOfPerpendicular = (point: Point, lineStart: Point, lineEnd: Point): Point => {
    const A = lineEnd.x - lineStart.x;
    const B = lineEnd.y - lineStart.y;
    const C = point.x - lineStart.x;
    const D = point.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = A * A + B * B;

    let param = -1;
    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    // Clamp parameter to [0, 1] to stay within the line segment
    param = Math.max(0, Math.min(1, param));

    return {
      x: lineStart.x + param * A,
      y: lineStart.y + param * B,
    };
  };

  // Update content based on currentStep
  useEffect(() => {
    const { stage, slide } = getStageAndSlide(currentStep);

    const visualState = {
      perpendicularBisectors: false,
      angleBisectors: false,
      circumcenter: false,
      incenter: false,
      circumscribedCircle: false,
      inscribedCircle: false,
    };

    const previousVisual = { ...visual };

    if (stage === 0) {
      visualState.perpendicularBisectors = true;
      if (slide >= 1) visualState.circumcenter = true;
      if (slide === 2) visualState.circumscribedCircle = true;
    } else if (stage === 1) {
      visualState.angleBisectors = true;
      if (slide >= 1) visualState.incenter = true;
      if (slide === 2) visualState.inscribedCircle = true;
    } else if (stage === 2) {
      visualState.circumscribedCircle = true;
      visualState.inscribedCircle = true;
    }

    setVisual((prev) => ({ ...prev, ...visualState }));

    // Announce visual changes
    const announcements = [];

    if (visualState.perpendicularBisectors && !previousVisual.perpendicularBisectors) {
      announcements.push(t(tAccessibility.perpendicularBisectorsShown));
    }
    if (visualState.circumcenter && !previousVisual.circumcenter) {
      announcements.push(t(tAccessibility.circumcenterShown));
    }
    if (visualState.circumscribedCircle && !previousVisual.circumscribedCircle) {
      announcements.push(t(tAccessibility.circumscribedCircleShown));
    }
    if (visualState.angleBisectors && !previousVisual.angleBisectors) {
      announcements.push(t(tAccessibility.angleBisectorsShown));
    }
    if (visualState.incenter && !previousVisual.incenter) {
      announcements.push(t(tAccessibility.incenterShown));
    }
    if (visualState.inscribedCircle && !previousVisual.inscribedCircle) {
      announcements.push(t(tAccessibility.inscribedCircleShown));
    }

    if (announcements.length > 0) {
      announceToScreenReader(announcements.join('. '), true);
    }
  }, [currentStep, t, tAccessibility, announceToScreenReader]);

  // Circle calculations for updated Cocked Hat Triangle
  const triangle = defaultTriangle;
  const semiPerimeter = (triangle.sides[0] + triangle.sides[1] + triangle.sides[2]) / 2;
  const correctCircumRadius = (triangle.sides[0] * triangle.sides[1] * triangle.sides[2]) / (4 * triangle.area);
  const correctInscribedRadius = triangle.area / semiPerimeter;
  const circumcenter = calculateCircumcenter(triangle.vertices);
  const incenter = calculateIncenter(triangle.vertices);

  // Calculate circle areas
  const circumscribedArea = visual.circumscribedCircle
    ? Math.PI * Math.pow(Number(correctCircumRadius.toFixed(2)), 2)
    : 0;
  const inscribedArea = visual.inscribedCircle ? Math.PI * Math.pow(correctInscribedRadius, 2) : 0;
  const areaRatio =
    inscribedArea > 0
      ? (
          Number((Math.PI * Math.pow(Number(correctCircumRadius.toFixed(2)), 2)).toFixed(1)) /
          Number((Math.PI * Math.pow(Number(correctInscribedRadius.toFixed(2)), 2)).toFixed(1))
        ).toFixed(1)
      : 0;

  function calculateCircumcenter(vertices: Point[]): Point {
    const [A, B, C] = vertices;

    // Midpoints of the sides
    const midAB = midpoint(A, B);
    const midBC = midpoint(B, C);

    // Slopes of the sides
    const slopeAB = slope(A, B);
    const slopeBC = slope(B, C);

    // Slopes of the perpendicular bisectors
    const perpSlopeAB = perpendicularSlope(slopeAB);
    const perpSlopeBC = perpendicularSlope(slopeBC);

    // If both slopes are infinite, return midpoint of the third side
    if (perpSlopeAB === Infinity && perpSlopeBC === Infinity) {
      return midpoint(A, C);
    }

    // If first perpendicular slope is infinite
    if (perpSlopeAB === Infinity) {
      const y = perpSlopeBC * (midAB.x - midBC.x) + midBC.y;
      return { x: midAB.x, y };
    }

    // If second perpendicular slope is infinite
    if (perpSlopeBC === Infinity) {
      const y = perpSlopeAB * (midBC.x - midAB.x) + midAB.y;
      return { x: midBC.x, y };
    }

    // Calculate intersection of the two perpendicular bisectors
    const x = (midBC.y - midAB.y + perpSlopeAB * midAB.x - perpSlopeBC * midBC.x) / (perpSlopeAB - perpSlopeBC);
    const y = perpSlopeAB * (x - midAB.x) + midAB.y;

    return { x, y };
  }

  function calculateIncenter(vertices: Point[]): Point {
    const [A, B, C] = vertices;

    // Calculate side lengths
    const a = distance(B, C);
    const b = distance(A, C);
    const c = distance(A, B);

    // Calculate coordinates of the incenter
    const x = (a * A.x + b * B.x + c * C.x) / (a + b + c);
    const y = (a * A.y + b * B.y + c * C.y) / (a + b + c);

    return { x, y };
  }

  const getPerpendicularBisectorPoints = (
    p1: Point,
    p2: Point,
  ): { x1: number; y1: number; x2: number; y2: number } => {
    const mid = midpoint(p1, p2);
    const s = slope(p1, p2);
    const perpS = perpendicularSlope(s);

    // Calculate direction vector for the perpendicular line
    let dx = 1;
    let dy = perpS;
    if (perpS === Infinity) {
      dx = 0;
      dy = 1;
    } else if (perpS === 0) {
      dx = 1;
      dy = 0;
    }

    // Normalize the direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    dx = dx / length;
    dy = dy / length;

    // Find intersections with grid boundaries (3 to 10)
    let t1 = Infinity;
    let t2 = -Infinity;

    // Check horizontal boundaries (y = 3 and y = 10)
    if (dy !== 0) {
      const t_top = (10 - mid.y) / dy;
      const t_bottom = (3 - mid.y) / dy;
      t1 = Math.min(t1, Math.max(t_top, t_bottom));
      t2 = Math.max(t2, Math.min(t_top, t_bottom));
    }

    // Check vertical boundaries (x = 3 and x = 10)
    if (dx !== 0) {
      const t_right = (10 - mid.x) / dx;
      const t_left = (3 - mid.x) / dx;
      t1 = Math.min(t1, Math.max(t_right, t_left));
      t2 = Math.max(t2, Math.min(t_right, t_left));
    }

    return {
      x1: mid.x + dx * t2,
      y1: mid.y + dy * t2,
      x2: mid.x + dx * t1,
      y2: mid.y + dy * t1,
    };
  };

  const getAngleBisectorPoints = (vertex: Point, prev: Point, next: Point): { x: number; y: number } => {
    // Vectors from vertex to adjacent vertices
    const v1 = { x: prev.x - vertex.x, y: prev.y - vertex.y };
    const v2 = { x: next.x - vertex.x, y: next.y - vertex.y };

    // Normalize vectors
    const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    const nv1 = { x: v1.x / len1, y: v1.y / len1 };
    const nv2 = { x: v2.x / len2, y: v2.y / len2 };

    // Sum to get bisector direction
    const bisector = { x: nv1.x + nv2.x, y: nv1.y + nv2.y };
    const lenB = Math.sqrt(bisector.x * bisector.x + bisector.y * bisector.y);

    // Normalize bisector direction
    const dx = bisector.x / lenB;
    const dy = bisector.y / lenB;

    // Find intersection with grid boundaries (3 to 10)
    let t = Infinity;

    // Check horizontal boundaries
    if (dy !== 0) {
      const t_top = (10 - vertex.y) / dy;
      const t_bottom = (3 - vertex.y) / dy;
      if (t_top > 0) t = Math.min(t, t_top);
      if (t_bottom > 0) t = Math.min(t, t_bottom);
    }

    // Check vertical boundaries
    if (dx !== 0) {
      const t_right = (10 - vertex.x) / dx;
      const t_left = (3 - vertex.x) / dx;
      if (t_right > 0) t = Math.min(t, t_right);
      if (t_left > 0) t = Math.min(t, t_left);
    }

    return {
      x: vertex.x + dx * t,
      y: vertex.y + dy * t,
    };
  };

  // Accessibility handlers
  const handleCircumRadiusToggle = () => {
    const newState = !showCircumRadius;
    setShowCircumRadius(newState);

    const radiusValue = correctCircumRadius.toFixed(2);
    const message = newState
      ? tInterpolate(tAccessibility.radiusShown, {
          type: t(tCommon.circumscribedCircle),
          radius: radiusValue,
          unit: t(tCommon.nauticalMiles),
        })
      : tInterpolate(tAccessibility.radiusHidden, {
          type: t(tCommon.circumscribedCircle),
        });

    announceToScreenReader(message, true);
  };

  const handleInscribedRadiusToggle = () => {
    const newState = !showInscribedRadius;
    setShowInscribedRadius(newState);

    const radiusValue = correctInscribedRadius.toFixed(2);
    const message = newState
      ? tInterpolate(tAccessibility.radiusShown, {
          type: t(tCommon.inscribedCircle),
          radius: radiusValue,
          unit: t(tCommon.nauticalMiles),
        })
      : tInterpolate(tAccessibility.radiusHidden, {
          type: t(tCommon.inscribedCircle),
        });

    announceToScreenReader(message, true);
  };

  // Keyboard event handlers
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        if (showCircumRadius || showInscribedRadius) {
          setShowCircumRadius(false);
          setShowInscribedRadius(false);
          announceToScreenReader(t(tAccessibility.radiusMeasurementsHidden));
        }
        break;
    }
  };

  // Helper functions for formatting
  const formatNm = (value: number): string => {
    return value.toFixed(2);
  };

  const formatNm2 = (value: number): string => {
    return value.toFixed(1);
  };

  // CircleStatsCard component
  interface CircleStatsCardProps {
    title: string;
    radiusNm: number;
    areaNm2: number;
    accent: 'circum' | 'in';
  }

  const CircleStatsCard: React.FC<CircleStatsCardProps> = ({ title, radiusNm, areaNm2, accent }) => {
    // CSS variables for theming support
    const accentColor = accent === 'circum' ? 'var(--circum-accent, #e74c3c)' : 'var(--inscribed-accent, #2ecc71)';
    const accentClass = accent === 'circum' ? 'border-red-500' : 'border-green-500';

    return (
      <div
        className={`bg-white rounded-lg shadow-sm border-2 ${accentClass} p-4 min-w-[160px] transition-all duration-200 hover:shadow-md`}
        style={{ borderColor: accentColor }}
        role="region"
        aria-labelledby={`${accent}-stats-title`}
        title={`${title} - ${t(tCommon.radius)}: ${formatNm(radiusNm)} ${t(tCommon.nauticalMiles)}, ${t(tStage3.comparison.properties.area)}: ${formatNm2(areaNm2)} ${t(tCommon.squareNauticalMiles)}`}
      >
        <h5
          id={`${accent}-stats-title`}
          className="text-lg font-semibold mb-3 text-center"
          style={{ color: accentColor }}
        >
          {title}
        </h5>
        <div className="space-y-2 text-base">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">{t(tCommon.radius)}:</span>
            <span className="text-gray-900">
              {formatNm(radiusNm)} {t(tCommon.nauticalMiles)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">{t(tStage3.comparison.properties.area)}:</span>
            <span className="text-gray-900">
              {formatNm2(areaNm2)} {t(tCommon.squareNauticalMiles)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col gap-4 w-full"
      onKeyDown={handleKeyDown}
      style={
        {
          '--circum-accent': '#e74c3c',
          '--inscribed-accent': '#2ecc71',
        } as React.CSSProperties
      }
    >
      {/* Live regions for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {statusAnnouncement}
      </div>

      {/* Screen reader instructions */}
      <div className="sr-only">
        <h2>{t(tAccessibility.instructions.title)}</h2>
        <p>{t(tAccessibility.instructions.overview)}</p>
        <ul>
          <li>{t(tAccessibility.instructions.tabNavigation)}</li>
          <li>{t(tAccessibility.instructions.buttonInteraction)}</li>
          <li>{t(tAccessibility.instructions.escapeKey)}</li>
        </ul>
      </div>

      {/* Progress and Stage Indicator */}
      <header>
        <div className="font-semibold text-lg" aria-live="polite">
          <span
            aria-label={tInterpolate(tAccessibility.currentStage, {
              stageNumber: stage + 1,
              stageName: t(stages[stage].name),
              currentStep,
              totalSteps,
            })}
          >
            {t(tStage)} {stage + 1}: {t(stages[stage].name)}
          </span>
        </div>
      </header>

      {/* Main content area */}
      <main ref={mainContentRef} role="main">
        {/* Visualization Panel */}
        <section aria-labelledby="visualization-heading" className="mb-6">
          <h2 id="visualization-heading" className="sr-only">
            {t(tAccessibility.visualizationSection)}
          </h2>

          <div
            tabIndex={0}
            role="img"
            aria-label={tInterpolate(tAccessibility.chartDescription, {
              stageNumber: stage + 1,
              stageName: t(stages[stage].name),
            })}
            aria-describedby="chart-details"
            className="focus:outline-2 focus:outline-blue-500 focus:outline-offset-2"
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${totalWidth} ${totalHeight}`}
              preserveAspectRatio="xMidYMid meet"
              className="h-[20rem] lg:h-[28rem] w-full"
              role="img"
              aria-labelledby="svg-title svg-desc"
            >
              <title id="svg-title">
                {tInterpolate(tAccessibility.svgTitle, {
                  stageNumber: stage + 1,
                  stageName: t(stages[stage].name),
                })}
              </title>
              <desc id="svg-desc">{t(tAriaLabel)}</desc>

              <g className="grid-layer" role="presentation">
                {Array.from({ length: gridDivisions + 1 }).map((_, i) => (
                  <React.Fragment key={`grid-${i}`}>
                    <line
                      x1={gridConfig.margins.left}
                      y1={gridConfig.margins.top + i * gridPixelStep}
                      x2={gridConfig.margins.left + gridConfig.size}
                      y2={gridConfig.margins.top + i * gridPixelStep}
                      stroke="#ddd"
                      strokeWidth="1"
                      aria-hidden="true"
                    />
                    <line
                      x1={gridConfig.margins.left + i * gridPixelStep}
                      y1={gridConfig.margins.top}
                      x2={gridConfig.margins.left + i * gridPixelStep}
                      y2={gridConfig.margins.top + gridConfig.size}
                      stroke="#ddd"
                      strokeWidth="1"
                      aria-hidden="true"
                    />
                  </React.Fragment>
                ))}
              </g>

              <rect
                x={gridConfig.margins.left}
                y={gridConfig.margins.top}
                width={gridConfig.size}
                height={gridConfig.size}
                fill="url(#sea-pattern)"
                opacity="0.1"
                aria-hidden="true"
              />

              <g className="geometric-elements" role="group" aria-label={t(tAccessibility.geometricElements)}>
                <polygon
                  points={triangle.vertices.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                  fill="rgba(255, 220, 100, 0.3)"
                  stroke="rgba(200, 160, 30, 0.8)"
                  strokeWidth="2"
                  role="img"
                  aria-label={tInterpolate(tAccessibility.triangleDescription, {
                    sideA: triangle.sides[0],
                    sideB: triangle.sides[1],
                    sideC: triangle.sides[2],
                    unit: t(tCommon.nauticalMiles),
                  })}
                />

                {visual.perpendicularBisectors &&
                  triangle.vertices.map((vertex, i) => {
                    const nextVertex = triangle.vertices[(i + 1) % 3];
                    const mid = midpoint(vertex, nextVertex);
                    const points = getPerpendicularBisectorPoints(vertex, nextVertex);

                    return (
                      <g
                        key={`bisector-${i}`}
                        role="group"
                        aria-label={tInterpolate(tAccessibility.perpendicularBisector, {
                          sideNumber: i + 1,
                        })}
                      >
                        <line
                          x1={toSvgX(points.x1)}
                          y1={toSvgY(points.y1)}
                          x2={toSvgX(points.x2)}
                          y2={toSvgY(points.y2)}
                          stroke="#3498db"
                          strokeWidth="1.5"
                          strokeDasharray="5,3"
                          aria-hidden="true"
                        />
                        <circle
                          cx={toSvgX(mid.x)}
                          cy={toSvgY(mid.y)}
                          r="4"
                          fill="#3498db"
                          stroke="#fff"
                          strokeWidth="1"
                          role="img"
                          aria-label={t(tAccessibility.midpoint)}
                        />
                      </g>
                    );
                  })}

                {visual.angleBisectors &&
                  triangle.vertices.map((vertex, i) => {
                    const prev = triangle.vertices[(i + 2) % 3];
                    const next = triangle.vertices[(i + 1) % 3];
                    const end = getAngleBisectorPoints(vertex, prev, next);

                    return (
                      <g
                        key={`angle-bisector-${i}`}
                        role="group"
                        aria-label={tInterpolate(tAccessibility.angleBisector, {
                          vertexLetter: String.fromCharCode(80 + i),
                        })}
                      >
                        <line
                          x1={toSvgX(vertex.x)}
                          y1={toSvgY(vertex.y)}
                          x2={toSvgX(end.x)}
                          y2={toSvgY(end.y)}
                          stroke="#9b59b6"
                          strokeWidth="1.5"
                          strokeDasharray="5,3"
                          aria-hidden="true"
                        />
                      </g>
                    );
                  })}

                {visual.circumcenter && (
                  <circle
                    cx={toSvgX(circumcenter.x)}
                    cy={toSvgY(circumcenter.y)}
                    r="6"
                    fill="#e74c3c"
                    stroke="#fff"
                    strokeWidth="1.5"
                    role="img"
                    aria-label={tInterpolate(tAccessibility.circumcenterPoint, {
                      x: circumcenter.x.toFixed(2),
                      y: circumcenter.y.toFixed(2),
                    })}
                  />
                )}

                {visual.incenter && (
                  <circle
                    cx={toSvgX(incenter.x)}
                    cy={toSvgY(incenter.y)}
                    r="6"
                    fill="#2ecc71"
                    stroke="#fff"
                    strokeWidth="1.5"
                    role="img"
                    aria-label={tInterpolate(tAccessibility.incenterPoint, {
                      x: incenter.x.toFixed(2),
                      y: incenter.y.toFixed(2),
                    })}
                  />
                )}

                {visual.circumscribedCircle && (
                  <circle
                    cx={toSvgX(circumcenter.x)}
                    cy={toSvgY(circumcenter.y)}
                    r={correctCircumRadius * gridStep}
                    fill="rgba(231, 76, 60, 0.2)"
                    stroke="#e74c3c"
                    strokeWidth="2"
                    role="img"
                    aria-label={tInterpolate(tAccessibility.circumscribedCircleDescription, {
                      radius: correctCircumRadius.toFixed(2),
                      unit: t(tCommon.nauticalMiles),
                      area: circumscribedArea.toFixed(1),
                    })}
                  />
                )}

                {visual.inscribedCircle && (
                  <circle
                    cx={toSvgX(incenter.x)}
                    cy={toSvgY(incenter.y)}
                    r={correctInscribedRadius * gridStep}
                    fill="rgba(46, 204, 113, 0.3)"
                    stroke="#2ecc71"
                    strokeWidth="2"
                    role="img"
                    aria-label={tInterpolate(tAccessibility.inscribedCircleDescription, {
                      radius: correctInscribedRadius.toFixed(2),
                      unit: t(tCommon.nauticalMiles),
                      area: inscribedArea.toFixed(1),
                    })}
                  />
                )}

                {/* Radius measurement lines */}
                {getDisplayFlag(payload, 'showRadiusButton') &&
                  currentStep === 3 &&
                  showCircumRadius &&
                  visual.circumcenter && (
                    <g role="group" aria-label={t(tAccessibility.radiusMeasurement)}>
                      <line
                        x1={toSvgX(circumcenter.x)}
                        y1={toSvgY(circumcenter.y)}
                        x2={toSvgX(triangle.vertices[2].x)}
                        y2={toSvgY(triangle.vertices[2].y)}
                        stroke="#3498db"
                        strokeWidth="2"
                        aria-hidden="true"
                      />
                      <text
                        x={(toSvgX(circumcenter.x) + toSvgX(triangle.vertices[2].x)) / 2 + 10}
                        y={(toSvgY(circumcenter.y) + toSvgY(triangle.vertices[2].y)) / 2 + 20}
                        textAnchor="middle"
                        fontSize="18"
                        fill="#3498db"
                        fontWeight="bold"
                        role="img"
                        aria-label={tInterpolate(tAccessibility.radiusLabel, {
                          radius: correctCircumRadius.toFixed(2),
                          unit: t(tCommon.nauticalMiles),
                        })}
                      >
                        {correctCircumRadius.toFixed(2)} {t(tCommon.nauticalMiles)}
                      </text>
                    </g>
                  )}

                {getDisplayFlag(payload, 'showRadiusButton') &&
                  currentStep === 6 &&
                  showInscribedRadius &&
                  visual.incenter &&
                  (() => {
                    // Find the foot of perpendicular from incenter to side QR for better visibility
                    const sideStart = triangle.vertices[1]; // Point Q
                    const sideEnd = triangle.vertices[2]; // Point R
                    const footPoint = getFootOfPerpendicular(incenter, sideStart, sideEnd);

                    return (
                      <g role="group" aria-label={t(tAccessibility.radiusMeasurement)}>
                        <line
                          x1={toSvgX(incenter.x)}
                          y1={toSvgY(incenter.y)}
                          x2={toSvgX(footPoint.x)}
                          y2={toSvgY(footPoint.y)}
                          stroke="#3498db"
                          strokeWidth="4"
                          aria-hidden="true"
                        />
                        <circle
                          cx={toSvgX(footPoint.x)}
                          cy={toSvgY(footPoint.y)}
                          r="3"
                          fill="#3498db"
                          stroke="#fff"
                          strokeWidth="1"
                          role="img"
                          aria-label={t(tAccessibility.tangentPoint)}
                        />
                        <text
                          x={(toSvgX(incenter.x) + toSvgX(footPoint.x)) / 2 + 30}
                          y={(toSvgY(incenter.y) + toSvgY(footPoint.y)) / 2}
                          textAnchor="middle"
                          fontSize="18"
                          fill="#3498db"
                          fontWeight="bold"
                          role="img"
                          aria-label={tInterpolate(tAccessibility.radiusLabel, {
                            radius: correctInscribedRadius.toFixed(2),
                            unit: t(tCommon.nauticalMiles),
                          })}
                        >
                          {correctInscribedRadius.toFixed(2)} {t(tCommon.nauticalMiles)}
                        </text>
                      </g>
                    );
                  })()}

                {triangle.vertices.map((vertex, i) => (
                  <circle
                    key={`vertex-${i}`}
                    cx={toSvgX(vertex.x)}
                    cy={toSvgY(vertex.y)}
                    r="6"
                    fill="#6c5ce7"
                    stroke="#fff"
                    strokeWidth="1.5"
                    role="img"
                    aria-label={tInterpolate(tAccessibility.vertex, {
                      letter: String.fromCharCode(80 + i),
                      x: vertex.x.toFixed(2),
                      y: vertex.y.toFixed(2),
                    })}
                  />
                ))}
              </g>

              <g className="text-layer" role="group" aria-label={t(tAccessibility.coordinateLabels)}>
                {Array.from({ length: gridDivisions + 1 }).map((_, i) => {
                  const yValue = 10 - i; // Y values from 10 (top) to 3 (bottom)
                  const xValue = 3 + i; // X values from 3 (left) to 10 (right)

                  return (
                    <React.Fragment key={`grid-label-${i}`}>
                      <text
                        x={gridConfig.margins.left - 10}
                        y={gridConfig.margins.top + i * gridPixelStep + 5}
                        textAnchor="end"
                        fontSize="18"
                        fill="#666"
                        aria-label={tInterpolate(tAccessibility.yAxisLabel, { value: yValue })}
                      >
                        {yValue}
                      </text>
                      <text
                        x={gridConfig.margins.left + i * gridPixelStep}
                        y={gridConfig.margins.top + gridConfig.size + 20}
                        textAnchor="middle"
                        fontSize="18"
                        fill="#666"
                        aria-label={tInterpolate(tAccessibility.xAxisLabel, { value: xValue })}
                      >
                        {xValue}
                      </text>
                    </React.Fragment>
                  );
                })}

                <text
                  x={gridConfig.margins.left + gridConfig.size / 2}
                  y={gridConfig.margins.top + gridConfig.size + 40}
                  textAnchor="middle"
                  fontSize="18"
                  fill="#333"
                  role="img"
                  aria-label={t(tAxes.xAxisLabel)}
                >
                  {t(tAxes.xAxisLabel)}
                </text>
                <text
                  x={gridConfig.margins.left - 35}
                  y={gridConfig.margins.top + gridConfig.size / 2}
                  textAnchor="middle"
                  fontSize="18"
                  fill="#333"
                  transform={`rotate(-90 ${gridConfig.margins.left - 35} ${gridConfig.margins.top + gridConfig.size / 2})`}
                  role="img"
                  aria-label={t(tAxes.yAxisLabel)}
                >
                  {t(tAxes.yAxisLabel)}
                </text>

                {triangle.vertices.map((vertex, i) => (
                  <text
                    key={`vertex-label-${i}`}
                    x={toSvgX(vertex.x) + 10 - (i === 0 ? 30 : 0)}
                    y={toSvgY(vertex.y) - 5 + (i === 0 ? 20 : 0)}
                    fontSize="18"
                    fill="#6c5ce7"
                    aria-hidden="true"
                  >
                    {String.fromCharCode(80 + i)}
                  </text>
                ))}

                {triangle.vertices.map((vertex, i) => {
                  const nextVertex = triangle.vertices[(i + 1) % 3];
                  const midpoint = {
                    x: (vertex.x + nextVertex.x) / 2,
                    y: (vertex.y + nextVertex.y) / 2,
                  };

                  // Calculate angle using SVG coordinates, not logical coordinates
                  const svgX1 = toSvgX(vertex.x);
                  const svgY1 = toSvgY(vertex.y);
                  const svgX2 = toSvgX(nextVertex.x);
                  const svgY2 = toSvgY(nextVertex.y);

                  const deltaX = svgX2 - svgX1;
                  const deltaY = svgY2 - svgY1;
                  let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                  // Keep text readable (flip if upside down)
                  if (angle > 90 || angle < -90) {
                    angle += 180;
                  }

                  const textX = toSvgX(midpoint.x);
                  const textY = toSvgY(midpoint.y) - 10;

                  return (
                    <text
                      key={`side-label-${i}`}
                      x={textX}
                      y={textY}
                      fontSize="18"
                      fill="#E0002B"
                      textAnchor="middle"
                      transform={`rotate(${angle} ${textX} ${textY})`}
                      role="img"
                      aria-label={tInterpolate(tAccessibility.sideLength, {
                        length: triangle.sides[i],
                        unit: t(tCommon.nauticalMiles),
                      })}
                    >
                      {triangle.sides[i]} {t(tCommon.nauticalMiles)}
                    </text>
                  );
                })}

                {visual.circumcenter && (
                  <text
                    x={toSvgX(circumcenter.x) + 10}
                    y={toSvgY(circumcenter.y) + 7}
                    fontSize="18"
                    fill="#e74c3c"
                    aria-hidden="true"
                  >
                    {t(tCommon.circumcenter)}
                  </text>
                )}

                {visual.incenter && (
                  <text
                    x={toSvgX(incenter.x) - 15}
                    y={toSvgY(incenter.y) + 17}
                    fontSize="18"
                    fill="#2ecc71"
                    aria-hidden="true"
                  >
                    {t(tCommon.incenter)}
                  </text>
                )}
              </g>

              <defs>
                <pattern
                  id="sea-pattern"
                  patternUnits="userSpaceOnUse"
                  width="20"
                  height="20"
                  patternTransform="rotate(45)"
                >
                  <rect width="20" height="20" fill="none" />
                  <path d="M0,10 Q5,5 10,10 T20,10" stroke="#0066cc" strokeWidth="1" fill="none" />
                </pattern>
              </defs>
            </svg>
          </div>

          <div id="chart-details" className="sr-only">
            <p>
              {tInterpolate(tAccessibility.detailedChartDescription, {
                triangleVertices: triangle.vertices
                  .map((v, i) => `${String.fromCharCode(80 + i)} (${v.x}, ${v.y})`)
                  .join(', '),
                sideLengths: triangle.sides.join(', '),
                unit: t(tCommon.nauticalMiles),
              })}
            </p>

            {visual.circumscribedCircle && (
              <p>
                {tInterpolate(tAccessibility.circumscribedCirclePresent, {
                  radius: correctCircumRadius.toFixed(2),
                  unit: t(tCommon.nauticalMiles),
                })}
              </p>
            )}

            {visual.inscribedCircle && (
              <p>
                {tInterpolate(tAccessibility.inscribedCirclePresent, {
                  radius: correctInscribedRadius.toFixed(2),
                  unit: t(tCommon.nauticalMiles),
                })}
              </p>
            )}
          </div>
        </section>

        {/* Interactive Radius Measurement Buttons */}
        {currentStep === 3 && getDisplayFlag(payload, 'showRadiusButton') && (
          <section aria-labelledby="circumradius-section">
            <h3 id="circumradius-section" className="sr-only">
              {t(tAccessibility.radiusMeasurementSection)}
            </h3>
            <div className="flex justify-center mb-4">
              <button
                ref={circumRadiusButtonRef}
                onClick={handleCircumRadiusToggle}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label={
                  showCircumRadius
                    ? t(tAccessibility.hideCircumRadiusButton)
                    : t(tAccessibility.showCircumRadiusButton)
                }
                aria-describedby="circumradius-help"
                aria-pressed={showCircumRadius}
              >
                {showCircumRadius ? t(tCommon.hideRadius) : t(tCommon.measureRadius)}
              </button>
            </div>
            <div id="circumradius-help" className="sr-only">
              {t(tAccessibility.radiusButtonHelp)}
            </div>
          </section>
        )}

        {currentStep === 6 && getDisplayFlag(payload, 'showRadiusButton') && (
          <section aria-labelledby="inscribedradius-section">
            <h3 id="inscribedradius-section" className="sr-only">
              {t(tAccessibility.radiusMeasurementSection)}
            </h3>
            <div className="flex justify-center mb-4">
              <button
                ref={inscribedRadiusButtonRef}
                onClick={handleInscribedRadiusToggle}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label={
                  showInscribedRadius
                    ? t(tAccessibility.hideInscribedRadiusButton)
                    : t(tAccessibility.showInscribedRadiusButton)
                }
                aria-describedby="inscribedradius-help"
                aria-pressed={showInscribedRadius}
              >
                {showInscribedRadius ? t(tCommon.hideRadius) : t(tCommon.measureRadius)}
              </button>
            </div>
            <div id="inscribedradius-help" className="sr-only">
              {t(tAccessibility.radiusButtonHelp)}
            </div>
          </section>
        )}

        {/* Content Sections */}
        <section aria-labelledby="content-heading">
          <h2 id="content-heading" className="sr-only">
            {t(tAccessibility.instructionalContent)}
          </h2>

          <div className="w-full">
            {stage === 0 && (
              <div role="region" aria-labelledby="stage1-heading">
                <h3 id="stage1-heading" className="sr-only">
                  {t(tStage1.title)}
                </h3>

                {currentStep !== 3 && (
                  <>
                    <div className="font-semibold text-lg text-center">{t(tStage1.title)}</div>
                    <p className="text-center mb-4">{t(tStage1.description)}</p>
                  </>
                )}

                {slide === 0 && (
                  <article className="border rounded-lg overflow-hidden transition-all duration-300 shadow-md border-blue-400 mb-4">
                    <header className="bg-gradient-to-r from-blue-50 to-blue-100 p-3">
                      <h4 className="font-semibold text-blue-800">{t(tStage1.perpendicularBisectors.title)}</h4>
                    </header>

                    <div className="p-3">
                      <div className="flex items-start">
                        <div className="mr-3 bg-blue-50 p-2 rounded-lg" aria-hidden="true">
                          <svg width="100" height="80" viewBox="0 0 100 80">
                            <line x1="10" y1="40" x2="90" y2="40" stroke="#666" strokeWidth="2" />
                            <line
                              x1="50"
                              y1="10"
                              x2="50"
                              y2="70"
                              stroke="#3498db"
                              strokeWidth="2"
                              strokeDasharray="5,3"
                            />
                            <circle cx="50" cy="40" r="4" fill="#3498db" />
                            <circle cx="10" cy="40" r="4" fill="#666" />
                            <circle cx="90" cy="40" r="4" fill="#666" />
                            <text x="30" y="30" fontSize="18" fill="#666">
                              {t(tCommon.rightAngle)}
                            </text>
                          </svg>
                        </div>

                        <div>
                          <p className="mb-3">{t(tStage1.perpendicularBisectors.description)}</p>
                          <ul className="list-disc space-y-1 mb-3 ml-8" role="list">
                            {tStage1.perpendicularBisectors.points.map((point, index) => (
                              <li key={index} role="listitem">
                                {t(point)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

                {slide === 1 && (
                  <article className="border rounded-lg overflow-hidden transition-all duration-300 shadow-md border-red-400 mb-4">
                    <header className="bg-gradient-to-r from-red-50 to-red-100 p-3">
                      <h4 className="font-semibold text-red-800">{t(tStage1.circumcenter.title)}</h4>
                    </header>

                    <div className="p-3">
                      <div className="flex items-start">
                        <div className="mr-3 bg-red-50 p-2 rounded-lg" aria-hidden="true">
                          <svg viewBox="277.623 153.063 70 73" width="70" height="73">
                            <polygon
                              points="282.623 206.063 342.623 206.063 312.623 156.063"
                              fill="rgba(255,220,100,0.3)"
                              stroke="rgba(200,160,30,0.8)"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="313.327"
                              y1="188.444"
                              x2="327.623"
                              y2="181.063"
                              stroke="#3498db"
                              strokeWidth="1.5"
                              strokeDasharray="4,2"
                            />
                            <line
                              x1="313.565"
                              y1="206.584"
                              x2="313.332"
                              y2="189.386"
                              stroke="#3498db"
                              strokeWidth="1.5"
                              strokeDasharray="4,2"
                              transform="matrix(-1, 0, 0, -1, 0.31403522, -0.78499777)"
                              style={{
                                transformOrigin: '313.449px 197.985px',
                              }}
                            />
                            <line
                              x1="313.722"
                              y1="188.683"
                              x2="297.623"
                              y2="181.063"
                              stroke="#3498db"
                              strokeWidth="1.5"
                              strokeDasharray="4,2"
                            />
                            <circle
                              cx="312.623"
                              cy="191.063"
                              r="35"
                              fill="none"
                              stroke="#e74c3c"
                              strokeWidth="1.5"
                              strokeDasharray="3,2"
                            />
                            <circle cx="313.565" cy="188.287" r="3" fill="#e74c3c" />
                            <circle cx="282.623" cy="206.063" r="3" fill="#6c5ce7" />
                            <circle cx="342.623" cy="206.063" r="3" fill="#6c5ce7" />
                            <circle cx="312.623" cy="156.063" r="3" fill="#6c5ce7" />
                          </svg>
                        </div>

                        <div>
                          <p className="mb-3">{t(tStage1.circumcenter.description)}</p>
                          <ul className="list-disc space-y-1 mb-3 ml-8" role="list">
                            {tStage1.circumcenter.points.map((point, index) => (
                              <li key={index} role="listitem">
                                {t(point)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </div>
            )}

            {stage === 1 && (
              <div role="region" aria-labelledby="stage2-heading">
                <h3 id="stage2-heading" className="sr-only">
                  {t(tStage2.title)}
                </h3>

                {currentStep !== 6 && (
                  <>
                    <div className="font-semibold text-lg text-center">{t(tStage2.title)}</div>
                    <p className="text-center mb-4">{t(tStage2.description)}</p>
                  </>
                )}

                {slide === 0 && (
                  <article className="border rounded-lg overflow-hidden transition-all duration-300 shadow-md border-blue-400 mb-4">
                    <header className="bg-gradient-to-r from-blue-50 to-blue-100 p-3">
                      <h4 className="font-semibold text-blue-800">{t(tStage2.angleBisectors.title)}</h4>
                    </header>

                    <div className="p-3">
                      <div className="flex items-start mb-3">
                        <div className="mr-3 bg-blue-50 p-2 rounded-lg" aria-hidden="true">
                          <svg width="100" height="80" viewBox="0 0 100 80">
                            <line x1="50" y1="10" x2="10" y2="60" stroke="#666" strokeWidth="2" />
                            <line x1="50" y1="10" x2="90" y2="60" stroke="#666" strokeWidth="2" />
                            <line
                              x1="50"
                              y1="10"
                              x2="50"
                              y2="70"
                              stroke="#9b59b6"
                              strokeWidth="2"
                              strokeDasharray="5,3"
                            />
                            <circle cx="50" cy="10" r="4" fill="#6c5ce7" />
                          </svg>
                        </div>
                        <div>
                          <p className="mb-2">{t(tStage2.angleBisectors.description)}</p>
                          <ul className="list-disc space-y-1 mb-3 ml-8" role="list">
                            {tStage2.angleBisectors.points.map((point, index) => (
                              <li key={index} role="listitem">
                                {t(point)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

                {slide === 1 && (
                  <article className="border rounded-lg overflow-hidden transition-all duration-300 shadow-md border-purple-400 mb-4">
                    <header className="bg-gradient-to-r from-purple-50 to-purple-100 p-3">
                      <h4 className="font-semibold text-purple-800">{t(tStage2.incenter.title)}</h4>
                    </header>

                    <div className="p-3">
                      <div className="flex items-start mb-3">
                        <div className="mr-3 bg-purple-50 p-2 rounded-lg" aria-hidden="true">
                          <svg width="100" height="80" viewBox="0 0 100 80">
                            <polygon
                              points="20,60 80,60 50,10"
                              fill="rgba(255,220,100,0.3)"
                              stroke="rgba(200,160,30,0.8)"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="50"
                              y1="10"
                              x2="50"
                              y2="40"
                              stroke="#9b59b6"
                              strokeWidth="1.5"
                              strokeDasharray="4,2"
                            />
                            <line
                              x1="20"
                              y1="60"
                              x2="50"
                              y2="40"
                              stroke="#9b59b6"
                              strokeWidth="1.5"
                              strokeDasharray="4,2"
                            />
                            <line
                              x1="80"
                              y1="60"
                              x2="50"
                              y2="40"
                              stroke="#9b59b6"
                              strokeWidth="1.5"
                              strokeDasharray="4,2"
                            />
                            <circle cx="50" cy="40" r="3" fill="#2ecc71" />
                            <circle cx="20" cy="60" r="3" fill="#6c5ce7" />
                            <circle cx="80" cy="60" r="3" fill="#6c5ce7" />
                            <circle cx="50" cy="10" r="3" fill="#6c5ce7" />
                          </svg>
                        </div>
                        <div>
                          <p className="mb-2">{t(tStage2.incenter.description)}</p>
                          <ul className="list-disc space-y-1 mb-3 ml-8" role="list">
                            {tStage2.incenter.points.map((point, index) => (
                              <li key={index} role="listitem">
                                {t(point)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </div>
            )}

            {stage === 2 && (
              <div role="region" aria-labelledby="stage3-heading">
                <h3 id="stage3-heading" className="sr-only">
                  {t(tStage3.title)}
                </h3>

                <div className="font-semibold text-lg text-center">{t(tStage3.title)}</div>
                <p className="text-center mb-4">{t(tStage3.description)}</p>

                {/* New layout: Left card, Center pie chart, Right card */}
                <div
                  className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-6"
                  role="group"
                  aria-labelledby="circle-comparison"
                >
                  <h4 id="circle-comparison" className="sr-only">
                    {t(tAccessibility.circleComparison)}
                  </h4>

                  {/* Left: Circumscribed Circle card */}
                  <CircleStatsCard
                    title={t(tStage3.comparison.circumscribed)}
                    radiusNm={correctCircumRadius}
                    areaNm2={circumscribedArea}
                    accent="circum"
                  />

                  {/* Center: Fixed Pie chart showing area ratio */}
                  <figure className="text-center">
                    <svg width="200" height="200" role="img" aria-labelledby="pie-chart-title pie-chart-desc">
                      <title id="pie-chart-title">{t(tStage3.analysis.ratioLabel)}</title>
                      <desc id="pie-chart-desc">
                        {tInterpolate(tStage3.analysis.explanation, { ratio: areaRatio })}
                      </desc>

                      {/* Calculate proper pie chart segments */}
                      {(() => {
                        const ratio = Number(areaRatio);
                        const total = 1 + ratio; // inscribed (1) + circumscribed (ratio)

                        // Inscribed portion of the pie
                        const inscribedPortion = 1 / total;
                        const circumscribedPortion = ratio / total;

                        // Convert to angles (2π radians = full circle)
                        const inscribedAngle = inscribedPortion * 2 * Math.PI;
                        const circumscribedAngle = circumscribedPortion * 2 * Math.PI;

                        // Start from top (12 o'clock position) and go clockwise
                        const startAngle = -Math.PI / 2; // Start at top

                        // Calculate end points for the inscribed segment
                        const inscribedEndAngle = startAngle + inscribedAngle;
                        const inscribedEndX = 100 + 80 * Math.cos(inscribedEndAngle);
                        const inscribedEndY = 100 + 80 * Math.sin(inscribedEndAngle);

                        // For large arc flag: if arc is more than 180 degrees, use 1, otherwise 0
                        const inscribedLargeArc = inscribedAngle > Math.PI ? 1 : 0;
                        const circumscribedLargeArc = circumscribedAngle > Math.PI ? 1 : 0;

                        return (
                          <>
                            {/* Green segment (inscribed area) */}
                            <path
                              d={`M 100 100 L 100 20 A 80 80 0 ${inscribedLargeArc} 1 ${inscribedEndX} ${inscribedEndY} Z`}
                              fill="#2ecc71"
                              stroke="#fff"
                              strokeWidth="2"
                            />

                            {/* Red segment (circumscribed area minus inscribed) */}
                            <path
                              d={`M 100 100 L ${inscribedEndX} ${inscribedEndY} A 80 80 0 ${circumscribedLargeArc} 1 100 20 Z`}
                              fill="#e74c3c"
                              stroke="#fff"
                              strokeWidth="2"
                            />
                          </>
                        );
                      })()}
                    </svg>
                    <figcaption className="mt-2 text-sm text-gray-600 sr-only">
                      {tInterpolate(tStage3.analysis.explanation, { ratio: areaRatio })}
                    </figcaption>
                  </figure>

                  {/* Right: Inscribed Circle card */}
                  <CircleStatsCard
                    title={t(tStage3.comparison.inscribed)}
                    radiusNm={correctInscribedRadius}
                    areaNm2={inscribedArea}
                    accent="in"
                  />
                </div>

                {/* Comparison text */}
                <div className="text-center mb-4">
                  <p className="text-lg font-semibold mb-2">
                    {tInterpolate(tStage3.analysis.areaRatio, { ratio: areaRatio })}
                  </p>
                  <p className="text-gray-600">
                    {tInterpolate(tStage3.analysis.explanation, { ratio: areaRatio })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CircleCalculator;
