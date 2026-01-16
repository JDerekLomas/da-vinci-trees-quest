import React, { useState, useRef, useEffect, useCallback, useMemo, useContext } from 'react';
import { AngleSumExplorerProps, AngleSumExplorerState } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

const AngleSumExplorer: React.FC<AngleSumExplorerProps> = ({ interaction, onInteraction }) => {
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.angle_sum_explorer && typeof interactiveResponses?.angle_sum_explorer === 'object'
      ? (interactiveResponses?.angle_sum_explorer as unknown as AngleSumExplorerState)
      : undefined;
  const { t } = useTranslations();
  const { translations } = interaction;
  const { payload } = useEventListener('angle-sum-explorer');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousShapeRef = useRef<number>(3);
  const [currentSides, setCurrentSides] = useState(savedState?.currentSides ?? 3);
  const [polygon, setPolygon] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [showTilingTest, setShowTilingTest] = useState(false);
  const [tilingPolygons, setTilingPolygons] = useState<any[]>([]);

  // Accessibility state
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');

  const vertexRadius = 8;
  const colors = ['#e53e3e', '#3182ce', '#38a169', '#d69e2e', '#805ad5', '#d53f8c'];

  // Helper function for interpolation
  const tInterpolate = useCallback(
    (key: string, variables: Record<string, string | number> = {}) => {
      let translatedString = t(key);
      Object.entries(variables).forEach(([variable, value]) => {
        const placeholder = `{{${variable}}}`;
        translatedString = translatedString.replace(new RegExp(placeholder, 'g'), String(value));
      });
      return translatedString;
    },
    [t],
  );

  // Accessibility helper functions
  const announceToScreenReader = useCallback((message: string, isStatus: boolean = false) => {
    if (isStatus) {
      setStatusAnnouncement(message);
      setTimeout(() => setStatusAnnouncement(''), 100);
    } else {
      setLiveAnnouncement(message);
      setTimeout(() => setLiveAnnouncement(''), 100);
    }
  }, []);

  const handleCanvasFocus = useCallback(() => {
    announceToScreenReader(t(translations.canvasInstructions));
  }, [translations, announceToScreenReader]);

  const handleCanvasBlur = useCallback(() => {
    // No action needed for fixed vertices
  }, []);

  // Polygon class
  class Polygon {
    sides: number;
    radius: number;
    centerX: number;
    centerY: number;
    vertices: { x: number; y: number }[];
    angles: number[];

    constructor(sides: number, radius: number, centerX: number, centerY: number) {
      this.sides = sides;
      this.radius = radius;
      this.centerX = centerX;
      this.centerY = centerY;
      this.vertices = [];
      this.angles = [];
      this.generateVertices();
      this.calculateAngles();
    }

    generateVertices() {
      this.vertices = [];
      if (this.sides === 4) {
        // Create a square with 90-degree angles
        const halfSize = this.radius * 0.8; // Make it slightly smaller for better visibility
        this.vertices = [
          { x: this.centerX - halfSize, y: this.centerY - halfSize }, // Top-left (A)
          { x: this.centerX + halfSize, y: this.centerY - halfSize }, // Top-right (B)
          { x: this.centerX + halfSize, y: this.centerY + halfSize }, // Bottom-right (C)
          { x: this.centerX - halfSize, y: this.centerY + halfSize }, // Bottom-left (D)
        ];
      } else {
        // Regular polygon for other shapes
        for (let i = 0; i < this.sides; i++) {
          const angle = (i / this.sides) * 2 * Math.PI - Math.PI / 2;
          this.vertices.push({
            x: this.centerX + this.radius * Math.cos(angle),
            y: this.centerY + this.radius * Math.sin(angle),
          });
        }
      }
    }

    calculateAngles() {
      this.angles = [];

      // For squares, we know all angles are 90 degrees
      if (this.sides === 4) {
        this.angles = [90, 90, 90, 90];
        return;
      }

      // For other shapes, calculate angles normally
      for (let i = 0; i < this.sides; i++) {
        const p1 = this.vertices[(i - 1 + this.sides) % this.sides];
        const p2 = this.vertices[i];
        const p3 = this.vertices[(i + 1) % this.sides];

        const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
        const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

        const dot = v1.x * v2.x + v1.y * v2.y;
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

        if (mag1 === 0 || mag2 === 0) {
          this.angles[i] = 0;
        } else {
          const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
          this.angles[i] = (Math.acos(cosAngle) * 180) / Math.PI;
        }
      }
    }

    draw(context: CanvasRenderingContext2D, options: any = {}) {
      const {
        fill = `rgba(59, 130, 246, 0.1)`,
        stroke = `#3b82f6`,
        lineWidth = 2,
        showVertices = true,
        showAngles = true,
      } = options;

      context.beginPath();
      context.moveTo(this.vertices[0].x, this.vertices[0].y);
      this.vertices.forEach((v) => context.lineTo(v.x, v.y));
      context.closePath();

      context.fillStyle = fill;
      context.fill();
      context.strokeStyle = stroke;
      context.lineWidth = lineWidth;
      context.stroke();

      if (showVertices) {
        this.vertices.forEach((v, i) => {
          context.beginPath();
          context.arc(v.x, v.y, vertexRadius, 0, 2 * Math.PI);
          context.fillStyle = 'white';
          context.fill();
          context.strokeStyle = stroke;
          context.lineWidth = 2;
          context.stroke();

          // Draw vertex labels using translations
          context.fillStyle = '#1f2937';
          context.font = 'bold 12px sans-serif';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          const vertex = String.fromCharCode(65 + i); // A, B, C, D, etc.
          const label = tInterpolate(translations.vertexLabel, { vertex });
          context.fillText(label, v.x, v.y - vertexRadius - 12);
        });
      }

      if (showAngles) this.drawAngleLabels(context);
    }

    drawAngleLabels(context: CanvasRenderingContext2D) {
      context.fillStyle = '#374151';
      context.font = '11px monospace';
      this.angles.forEach((angle, i) => {
        const p1 = this.vertices[(i - 1 + this.sides) % this.sides];
        const p2 = this.vertices[i];
        const p3 = this.vertices[(i + 1) % this.sides];

        const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
        const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

        const angle1 = Math.atan2(v1.y, v1.x);
        const angle2 = Math.atan2(v2.y, v2.x);

        context.beginPath();
        context.arc(p2.x, p2.y, 15, angle1, angle2);
        context.strokeStyle = `rgba(0, 0, 0, 0.2)`;
        context.lineWidth = 1;
        context.stroke();

        let angleDiff = angle2 - angle1;
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        const finalLabelAngle = angle1 + angleDiff / 2;

        const textX = p2.x + 25 * Math.cos(finalLabelAngle);
        const textY = p2.y + 25 * Math.sin(finalLabelAngle);
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Use translated degree symbol
        const degreeSymbol = t(translations.degreeSymbol);
        context.fillText(angle.toFixed(0) + degreeSymbol, textX, textY);
      });
    }
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const radius = Math.min(canvas.width, canvas.height) * 0.25;
    const newPolygon = new Polygon(currentSides, radius, canvas.width / 2, canvas.height / 2);
    setPolygon(newPolygon);
  }, [currentSides]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showTilingTest && tilingPolygons.length > 0) {
      // Draw tiling test visualization
      tilingPolygons.forEach((tilingPoly, i) => {
        const colorIndex = i % colors.length;
        const strokeColor = colors[colorIndex];

        // Convert hex to rgba
        const r = parseInt(strokeColor.slice(1, 3), 16);
        const g = parseInt(strokeColor.slice(3, 5), 16);
        const b = parseInt(strokeColor.slice(5, 7), 16);
        const fillColor = `rgba(${r}, ${g}, ${b}, 0.7)`;

        tilingPoly.draw(ctx, {
          fill: fillColor,
          stroke: strokeColor,
          showVertices: false,
          showAngles: false,
        });
      });

      // Highlight vertex A at center
      if (tilingPolygons[0]) {
        const vertexA = tilingPolygons[0].vertices[0];
        ctx.beginPath();
        ctx.arc(vertexA.x, vertexA.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#1f2937';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label vertex A using translations
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const vertexALabel = tInterpolate(translations.vertexLabel, { vertex: 'A' });
        ctx.fillText(vertexALabel, vertexA.x, vertexA.y);
      }
    } else if (polygon) {
      polygon.draw(ctx);
    }
  }, [polygon, showTilingTest, tilingPolygons, translations, tInterpolate]);

  const runTilingTest = () => {
    if (!polygon) return;

    // Announce test start
    announceToScreenReader(tInterpolate(translations.tilingTestStartNotification, { sides: currentSides }), true);

    const rawAngleAtVertexA = polygon.angles[0];
    const angleAtVertexA = Math.round(rawAngleAtVertexA);

    const exactFit = 360.0 / angleAtVertexA;
    const isWholeFit = Math.abs(exactFit - Math.round(exactFit)) < 0.001;

    let numberOfCopies;
    if (isWholeFit) {
      numberOfCopies = Math.round(exactFit);
    } else {
      numberOfCopies = Math.floor(exactFit);
    }

    const totalAngle = numberOfCopies * angleAtVertexA;
    const gapRemaining = 360.0 - totalAngle;

    // Create the tiling polygons
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const originalVertexA = polygon.vertices[0];

    const tilingCopies = [];
    for (let copyIndex = 0; copyIndex < numberOfCopies; copyIndex++) {
      const copy = new Polygon(polygon.sides, polygon.radius, polygon.centerX, polygon.centerY);
      copy.vertices = polygon.vertices.map((v: any) => ({ x: v.x, y: v.y }));
      copy.angles = [...polygon.angles];

      const rotationRadians = (copyIndex * angleAtVertexA * Math.PI) / 180.0;

      copy.vertices = copy.vertices.map((vertex) => {
        const dx = vertex.x - originalVertexA.x;
        const dy = vertex.y - originalVertexA.y;

        const rotatedX = dx * Math.cos(rotationRadians) - dy * Math.sin(rotationRadians);
        const rotatedY = dx * Math.sin(rotationRadians) + dy * Math.cos(rotationRadians);

        return {
          x: centerX + rotatedX,
          y: centerY + rotatedY,
        };
      });

      tilingCopies.push(copy);
    }

    setTilingPolygons(tilingCopies);
    setShowTilingTest(true);

    const isPerfectTiling = Math.abs(gapRemaining) < 0.1;
    setResult({
      success: isPerfectTiling,
      sum: totalAngle,
      gap: gapRemaining,
      copies: numberOfCopies,
    });

    // Announce results
    const resultMessage = isPerfectTiling ? t(translations.perfectTiling) : t(translations.cannotTile);
    announceToScreenReader(
      tInterpolate(translations.tilingTestCompleteNotification, { result: resultMessage }),
      true,
    );

    // Report interaction
    onInteraction({
      'tiling-test-completed': true,
      'shape-sides': currentSides,
      'tiling-success': isPerfectTiling,
      'copies-placed': numberOfCopies,
      'total-angle': totalAngle,
      'gap-remaining': gapRemaining,
    });
  };

  const shapeNames = useMemo(
    () => [t(translations.triangle), t(translations.square), t(translations.pentagon), t(translations.hexagon)],
    [t, translations.triangle, translations.square, translations.pentagon, translations.hexagon],
  );

  const handleShapeChange = useCallback(
    (sides: number) => {
      setCurrentSides(sides);
      setResult(null);
      setShowTilingTest(false);
      setTilingPolygons([]);

      // Safety check to ensure shapeNames is properly initialized
      if (shapeNames && shapeNames[sides - 3]) {
        const shapeName = shapeNames[sides - 3];
        announceToScreenReader(tInterpolate(translations.shapeChangeAnnouncement, { shape: shapeName }), true);
      }

      onInteraction({
        'shape-changed': true,
        'new-sides': sides,
      });
    },
    [shapeNames, translations.shapeChangeAnnouncement, tInterpolate, announceToScreenReader, onInteraction],
  );

  // Handle payload changes
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'shape' in payload && typeof payload.shape === 'number') {
      const newShape = payload.shape;
      if (previousShapeRef.current !== newShape) {
        previousShapeRef.current = newShape;
        handleShapeChange(newShape);
      }
    }
  }, [payload]);

  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if (
        'checkTriangleTiling' in payload &&
        payload.checkTriangleTiling === true &&
        currentSides === 3 &&
        showTilingTest
      ) {
        onInteraction({
          'triangle-tiling-checked': true,
        });
      }

      if (
        'checkSquareTiling' in payload &&
        payload.checkSquareTiling === true &&
        currentSides === 4 &&
        showTilingTest
      ) {
        onInteraction({
          'square-tiling-checked': true,
        });
      }

      if (
        'checkPentagonTiling' in payload &&
        payload.checkPentagonTiling === true &&
        currentSides === 5 &&
        showTilingTest
      ) {
        onInteraction({
          'pentagon-tiling-checked': true,
        });
      }

      if (
        'checkHexagonTiling' in payload &&
        payload.checkHexagonTiling === true &&
        currentSides === 6 &&
        showTilingTest
      ) {
        onInteraction({
          'hexagon-tiling-checked': true,
        });
      }
    }
  }, [payload, currentSides, showTilingTest]);

  // Enhanced angle calculation announcements
  useEffect(() => {
    if (polygon && polygon.angles.length > 0) {
      const interiorSum = polygon.angles.reduce((acc: number, val: number) => acc + Math.round(val), 0);
      const exteriorSum = polygon.angles.reduce((acc: number, val: number) => acc + Math.round(180 - val), 0);

      announceToScreenReader(
        tInterpolate(translations.angleCalculationNotification, {
          interiorSum: interiorSum.toFixed(1),
          exteriorSum: exteriorSum.toFixed(1),
        }),
        false,
      );
    }
  }, [polygon, tInterpolate, translations, announceToScreenReader]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: AngleSumExplorerState = { currentSides };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      angle_sum_explorer: currentState,
    }));
  }, [setInteractiveResponses, currentSides]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Canvas focus handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('focus', handleCanvasFocus);
    canvas.addEventListener('blur', handleCanvasBlur);

    return () => {
      canvas.removeEventListener('focus', handleCanvasFocus);
      canvas.removeEventListener('blur', handleCanvasBlur);
    };
  }, [handleCanvasFocus, handleCanvasBlur]);

  useEffect(() => {
    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();
  }, [draw]);

  useEffect(() => {
    setResult(null);
    setShowTilingTest(false);
    setTilingPolygons([]);
    resizeCanvas();
  }, [currentSides, resizeCanvas]);

  const degreeSymbol = t(translations.degreeSymbol);
  const angleSymbol = t(translations.angleSymbol);
  const successIcon = t(translations.successIcon);
  const failIcon = t(translations.failIcon);

  const interiorSum = polygon ? polygon.angles.reduce((acc: number, val: number) => acc + Math.round(val), 0) : 0;
  const exteriorSum = polygon
    ? polygon.angles.reduce((acc: number, val: number) => acc + Math.round(180 - val), 0)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Enhanced live regions for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only" role="alert">
        {statusAnnouncement}
      </div>

      {/* Hidden screen reader content */}
      <div className="sr-only">
        <h1>{t(translations.mainHeading)}</h1>
        <p>{t(translations.interactiveDescription)}</p>
        <p>{t(translations.visualDescription)}</p>
        <p>{t(translations.mathematicalDescription)}</p>
        <p>{t(translations.keyboardNavigationHelp)}</p>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          {/* Current Shape Display */}
          <section aria-labelledby="shape-display-heading">
            <h2 id="shape-display-heading" className="sr-only">
              {t(translations.shapeSelectorLabel)}
            </h2>
            <div className="text-xl" role="region" aria-label={t(translations.shapeSelectorLabel)}>
              {(() => {
                const shapeName =
                  shapeNames && shapeNames[currentSides - 3]
                    ? shapeNames[currentSides - 3]
                    : tInterpolate(translations.fallbackShapeName, { sides: currentSides });
                return (
                  <>
                    <span className="font-bold text-blue-600">
                      {t(translations.shape)} {currentSides - 2}:
                    </span>{' '}
                    <span className="text-black">{shapeName}</span>
                  </>
                );
              })()}
            </div>
            <div className="sr-only">{t(translations.shapeSelectorInstructions)}</div>
          </section>

          {/* Angle Properties - Hide when result is shown */}
          {!result && (
            <section aria-labelledby="angle-display-heading">
              <h3 id="angle-display-heading" className="sr-only">
                {t(translations.angleDisplayLabel)}
              </h3>
              <div className="sr-only">{t(translations.angleDisplayInstructions)}</div>
              <div
                className="bg-gray-50 p-3 rounded-md text-xs"
                role="region"
                aria-label={t(translations.angleDisplayLabel)}
              >
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center">
                    <h4 className="font-medium text-gray-600 mb-2">{t(translations.interior)}</h4>
                    <div className="space-y-1" role="list" aria-label={t(translations.interior)}>
                      {polygon &&
                        polygon.angles.map((angle: number, i: number) => (
                          <div key={i} className="font-mono" role="listitem">
                            {tInterpolate(translations.angleLabel, {
                              angleSymbol,
                              vertex: String.fromCharCode(65 + i),
                              angle: angle.toFixed(1),
                              degreeSymbol,
                            })}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-gray-600 mb-2">{t(translations.exterior)}</h4>
                    <div className="space-y-1" role="list" aria-label={t(translations.exterior)}>
                      {polygon &&
                        polygon.angles.map((angle: number, i: number) => (
                          <div key={i} className="font-mono" role="listitem">
                            {tInterpolate(translations.angleLabel, {
                              angleSymbol,
                              vertex: String.fromCharCode(65 + i),
                              angle: (180 - angle).toFixed(1),
                              degreeSymbol,
                            })}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-2 grid grid-cols-2 gap-4 text-center">
                  <div className="font-semibold">
                    {t(translations.sum)}: {interiorSum.toFixed(1)}
                    {degreeSymbol}
                  </div>
                  <div className="font-semibold">
                    {t(translations.sum)}: {exteriorSum.toFixed(1)}
                    {degreeSymbol}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Test Tiling Button */}
          {!showTilingTest && (
            <>
              <button
                onClick={runTilingTest}
                className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby="tiling-instructions"
                aria-label={t(translations.testTiling)}
              >
                {t(translations.testTiling)}
              </button>
              <div id="tiling-instructions" className="sr-only">
                {t(translations.tilingButtonInstructions)}
              </div>
            </>
          )}

          {/* Results */}
          {result && (
            <section id="results-section" aria-labelledby="tiling-results-heading">
              <h3 id="tiling-results-heading" className="sr-only">
                {t(translations.tilingResultsLabel)}
              </h3>
              <div className="sr-only">{t(translations.resultsInstructions)}</div>
              <div
                className={`p-3 rounded-md text-xs ${
                  result.success
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
                role="status"
                aria-live="polite"
                aria-label={t(translations.tilingResultsLabel)}
              >
                <div className="font-medium mb-1">
                  {result.success
                    ? `${successIcon} ${t(translations.perfectTiling)}`
                    : `${failIcon} ${t(translations.cannotTile)}`}
                </div>
                <div className="space-y-1">
                  <div>
                    {t(translations.copiesPlaced)}: <span className="font-mono">{result.copies}</span>
                  </div>
                  <div>
                    {t(translations.totalAngle)}:{' '}
                    <span className="font-mono">
                      {result.sum.toFixed(1)}
                      {degreeSymbol}
                    </span>
                  </div>
                  {result.gap > 0 && (
                    <div>
                      {t(translations.gapRemaining)}:{' '}
                      <span className="font-mono">
                        {result.gap.toFixed(1)}
                        {degreeSymbol}
                      </span>
                    </div>
                  )}
                  {result.success && <div className="text-green-600">{t(translations.perfectFit)}</div>}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Canvas */}
      <section id="canvas-section" aria-labelledby="canvas-heading">
        <h3 id="canvas-heading" className="sr-only">
          {t(translations.interactiveCanvas)}
        </h3>
        <div className="w-full h-[280px] rounded-lg overflow-hidden bg-gray-200 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            role="application"
            aria-label={t(translations.canvasAriaLabel)}
            tabIndex={0}
            aria-describedby="canvas-instructions"
          />
        </div>
        <div id="canvas-instructions" className="sr-only">
          {t(translations.canvasInstructions)}
        </div>
      </section>
    </div>
  );
};

export default AngleSumExplorer;
