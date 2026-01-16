import React, { useRef, useState, useCallback, useEffect } from 'react';
import { PanelInspectorProps } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';

const PanelInspectorParallelogram: React.FC<PanelInspectorProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;

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

  // Installation Inspector state
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showDiagonals, setShowDiagonals] = useState(false);
  const [measurements, setMeasurements] = useState<
    Array<{
      type: 'length' | 'angle' | 'slope';
      value: string;
      x: number;
      y: number;
      id: number;
    }>
  >([]);

  // Accessibility state
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');

  // Track angle visibility
  const [allAnglesVisible, setAllAnglesVisible] = useState(false);

  // Track side lengths visibility
  const [allSidesVisible, setAllSidesVisible] = useState(false);

  // Track protractor usage
  const [protractorUsed, setProtractorUsed] = useState(false);

  // Track at least one side length visible
  const [atLeastOneSideVisible, setAtLeastOneSideVisible] = useState(false);
  const [atLeastOneAngleVisible, setAtLeastOneAngleVisible] = useState(false);
  const [oppositeSidesSlopeMeasured, setOppositeSidesSlopeMeasured] = useState(false);

  // Store calculated slopes for card display
  const [calculatedSlopes, setCalculatedSlopes] = useState<{
    AB: number | null;
    BC: number | null;
    CD: number | null;
    DA: number | null;
  }>({
    AB: null,
    BC: null,
    CD: null,
    DA: null,
  });

  // Track currently displayed calculation
  const [currentCalculation, setCurrentCalculation] = useState<{
    sideName: string;
    coordinates: string;
    calculation: {
      step1: string;
      fraction: { numerator: string; denominator: string };
      result: string;
    };
    result: number;
  } | null>(null);

  // Parallelogram model (first quadrant coordinates in inches)
  const model = {
    name: t(translations.modelParallelogramName),
    description: t(translations.modelParallelogramDescription),
    vertices: [
      [5, 4], // bottom-left
      [25, 5], // bottom-right
      [29, 17], // top-right (1 unit higher than expected)
      [8, 15], // top-left
    ],
    properties: [
      t(translations.oppositeSidesEqual),
      t(translations.oppositeAnglesEqual),
      t(translations.diagonalsBisect),
    ],
  };

  // Vertex labels configuration
  const vertexLabels: Array<{
    label: string;
    coordinates: [number, number];
    labelOffset: [number, number];
  }> = [
    {
      label: 'A',
      coordinates: [5, 4],
      labelOffset: [0, 20], // Offset from vertex position for label placement
    },
    {
      label: 'B',
      coordinates: [25, 5],
      labelOffset: [0, 20],
    },
    {
      label: 'C',
      coordinates: [29, 17],
      labelOffset: [-20, -10],
    },
    {
      label: 'D',
      coordinates: [8, 15],
      labelOffset: [0, -10],
    },
  ];

  // Canvas dimensions with padding
  const gridWidth = 400; // Grid width in pixels
  const gridHeight = 300; // Grid height in pixels
  const padding = 20; // Padding around grid
  const canvasWidth = gridWidth + padding * 2;
  const canvasHeight = gridHeight + padding * 2;

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

  // Check if all 4 angles are visible
  useEffect(() => {
    const angleMeasurements = measurements.filter((m) => m.type === 'angle');
    const hasAllAngles = angleMeasurements.length >= 4;

    if (hasAllAngles !== allAnglesVisible) {
      setAllAnglesVisible(hasAllAngles);
      onInteraction({
        'all-angles-visible': hasAllAngles,
      });
    }
  }, [measurements, allAnglesVisible, onInteraction]);

  // Check if all 4 side lengths are visible
  useEffect(() => {
    const sideMeasurements = measurements.filter((m) => m.type === 'length');
    const hasAllSides = sideMeasurements.length >= 4;

    if (hasAllSides !== allSidesVisible) {
      setAllSidesVisible(hasAllSides);
      onInteraction({
        'all-sides-visible': hasAllSides,
      });
    }
  }, [measurements, allSidesVisible, onInteraction]);

  // Track protractor usage
  useEffect(() => {
    if (protractorUsed) {
      onInteraction({
        'protractor-used': true,
      });
    }
  }, [protractorUsed, onInteraction]);

  // Check if at least one side length is visible
  useEffect(() => {
    const sideMeasurements = measurements.filter((m) => m.type === 'length');
    const hasAtLeastOneSide = sideMeasurements.length >= 1;

    if (hasAtLeastOneSide !== atLeastOneSideVisible) {
      setAtLeastOneSideVisible(hasAtLeastOneSide);
      onInteraction({
        'at-least-one-side-visible': hasAtLeastOneSide,
      });
    }
  }, [measurements, atLeastOneSideVisible, onInteraction]);

  // Track diagonal visibility
  useEffect(() => {
    onInteraction({
      'diagonals-visible': showDiagonals,
    });
  }, [showDiagonals, onInteraction]);

  // Check if opposite sides slopes are measured
  useEffect(() => {
    const hasABSlope = calculatedSlopes.AB !== null;
    const hasBCSlope = calculatedSlopes.BC !== null;
    const hasCDSlope = calculatedSlopes.CD !== null;
    const hasDASlope = calculatedSlopes.DA !== null;

    // Check if either pair of opposite sides is measured
    const abCdPair = hasABSlope && hasCDSlope;
    const bcDaPair = hasBCSlope && hasDASlope;
    const oppositeSidesMeasured = abCdPair || bcDaPair;

    if (oppositeSidesMeasured !== oppositeSidesSlopeMeasured) {
      setOppositeSidesSlopeMeasured(oppositeSidesMeasured);
      onInteraction({
        'opposite-sides-slope-measured': oppositeSidesMeasured,
      });
    }
  }, [calculatedSlopes, oppositeSidesSlopeMeasured, onInteraction]);

  // Check if at least one angle is visible
  useEffect(() => {
    const angleMeasurements = measurements.filter((m) => m.type === 'angle');
    const hasAtLeastOneAngle = angleMeasurements.length >= 1;

    if (hasAtLeastOneAngle !== atLeastOneAngleVisible) {
      setAtLeastOneAngleVisible(hasAtLeastOneAngle);
      onInteraction({
        'at-least-one-angle-visible': hasAtLeastOneAngle,
      });
    }
  }, [measurements, atLeastOneAngleVisible, onInteraction]);

  // Tool selection handler
  const handleToolSelect = useCallback(
    (tool: string) => {
      if (tool === t(translations.toolClearName)) {
        setMeasurements([]);
        setActiveTool(null);
        setShowDiagonals(false);
        setAtLeastOneSideVisible(false);
        setAtLeastOneAngleVisible(false);
        setOppositeSidesSlopeMeasured(false);
        setCalculatedSlopes({ AB: null, BC: null, CD: null, DA: null });
        setCurrentCalculation(null);
        announceToScreenReader(t(translations.measurementCleared));
        return;
      }

      if (tool === t(translations.toolDiagonalsName)) {
        const newShowDiagonals = !showDiagonals;
        setShowDiagonals(newShowDiagonals);
        announceToScreenReader(
          newShowDiagonals ? t(translations.diagonalsShown) : t(translations.diagonalsHidden),
        );
        return;
      }

      if (tool === t(translations.toolProtractorName)) {
        setProtractorUsed(true);
      }

      const isSelecting = activeTool !== tool;
      setActiveTool(isSelecting ? tool : null);
      announceToScreenReader(
        isSelecting
          ? tInterpolate(translations.toolSelected, { tool: t(translations[tool as keyof typeof translations]) })
          : tInterpolate(translations.toolDeselected, {
              tool: t(translations[tool as keyof typeof translations]),
            }),
      );
    },
    [activeTool, showDiagonals, t, translations, announceToScreenReader, tInterpolate],
  );

  // Keyboard navigation handler (simplified without arrow keys)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, tool: string) => {
      switch (e.key) {
        case t(translations.keyEnter):
        case t(translations.keySpace):
          e.preventDefault();
          handleToolSelect(tool);
          break;
      }
    },
    [handleToolSelect, t, translations],
  );

  // Helper functions
  const getCanvasVertices = useCallback((): [number, number][] => {
    return model.vertices.map(([x, y]) => {
      // Convert coordinate system to canvas coordinates
      // X: map from 0-30 coordinate range to grid area
      // Y: map from 0-22 coordinate range to grid area (inverted for bottom-left origin)
      const canvasX = padding + (x * gridWidth) / 30;
      const canvasY = padding + gridHeight - (y * gridHeight) / 22;
      return [canvasX, canvasY] as [number, number];
    });
  }, [model.vertices, padding, gridWidth, gridHeight]);

  const getVertexLabelPosition = useCallback(
    (coordinates: [number, number], offset: [number, number]): [number, number] => {
      const [x, y] = coordinates;
      const [offsetX, offsetY] = offset;

      // Convert to canvas coordinates
      const canvasX = padding + (x * gridWidth) / 30;
      const canvasY = padding + gridHeight - (y * gridHeight) / 22;

      // Add offset
      return [canvasX + offsetX, canvasY + offsetY] as [number, number];
    },
    [padding, gridWidth, gridHeight],
  );

  const calculateDistance = useCallback(
    (
      p1: [number, number],
      p2: [number, number],
      sideIndex?: number,
      diagonalIndex?: number,
      diagonalHalf?: number,
    ) => {
      // Return specific side length values based on side position
      // Sides are ordered: [top, right, bottom, left] (clockwise from top)
      if (sideIndex !== undefined) {
        switch (sideIndex) {
          case 0: // Top side
            return 301;
          case 1: // Right side
            return 199.9;
          case 2: // Bottom side
            return 300;
          case 3: // Left side
            return 199.9;
          default:
            return 200;
        }
      }

      // Return specific diagonal segment values
      if (diagonalIndex !== undefined && diagonalHalf !== undefined) {
        switch (diagonalIndex) {
          case 0: // First diagonal
            return diagonalHalf === 1 ? 206.4 : 206.8;
          case 1: // Second diagonal
            return diagonalHalf === 1 ? 149 : 149.6;
          default:
            return 200;
        }
      }

      // Fallback to calculated distance if no specific values provided
      const dx = p1[0] - p2[0];
      const dy = p1[1] - p2[1];
      return Math.sqrt(dx * dx + dy * dy);
    },
    [],
  );

  const calculateAngle = useCallback(
    (p1: [number, number], vertex: [number, number], p2: [number, number], vertexIndex?: number) => {
      // Return specific angle values based on vertex position
      // Vertices are ordered: [top-left, top-right, bottom-right, bottom-left]
      if (vertexIndex !== undefined) {
        switch (vertexIndex) {
          case 0: // Top-left
            return 68;
          case 1: // Top-right
            return 111;
          case 2: // Bottom-right
            return 72;
          case 3: // Bottom-left
            return 109;
          default:
            return 90;
        }
      }

      // Fallback to calculated angle if vertexIndex not provided
      const v1 = [p1[0] - vertex[0], p1[1] - vertex[1]];
      const v2 = [p2[0] - vertex[0], p2[1] - vertex[1]];

      const dot = v1[0] * v2[0] + v1[1] * v2[1];
      const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
      const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);

      const cos = dot / (mag1 * mag2);
      return Math.acos(Math.max(-1, Math.min(1, cos))) * (180 / Math.PI);
    },
    [],
  );

  const distancePointToLineSegment = useCallback(
    (point: [number, number], lineStart: [number, number], lineEnd: [number, number]) => {
      const [px, py] = point;
      const [x1, y1] = lineStart;
      const [x2, y2] = lineEnd;

      const dx = x2 - x1;
      const dy = y2 - y1;

      if (dx === 0 && dy === 0) {
        return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
      }

      const lengthSquared = dx * dx + dy * dy;
      let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;

      t = Math.max(0, Math.min(1, t));

      const closestX = x1 + t * dx;
      const closestY = y1 + t * dy;

      return Math.sqrt((px - closestX) * (px - closestX) + (py - closestY) * (py - closestY));
    },
    [],
  );

  const getDiagonals = useCallback(() => {
    const vertices = getCanvasVertices();
    return [
      { p1: vertices[0], p2: vertices[2] },
      { p1: vertices[1], p2: vertices[3] },
    ];
  }, [getCanvasVertices]);

  // Calculate the intersection point of the two diagonals
  const getIntersectionPoint = useCallback(() => {
    const diagonals = getDiagonals();
    const [d1, d2] = diagonals;

    // Line 1: from d1.p1 to d1.p2
    // Line 2: from d2.p1 to d2.p2
    // Using line intersection formula

    const x1 = d1.p1[0],
      y1 = d1.p1[1];
    const x2 = d1.p2[0],
      y2 = d1.p2[1];
    const x3 = d2.p1[0],
      y3 = d2.p1[1];
    const x4 = d2.p2[0],
      y4 = d2.p2[1];

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (Math.abs(denominator) < 0.0001) {
      // Lines are parallel, return midpoint of first diagonal
      return [(x1 + x2) / 2, (y1 + y2) / 2] as [number, number];
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;

    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)] as [number, number];
  }, [getDiagonals]);

  // Get diagonal segments (split at intersection point)
  const getDiagonalSegments = useCallback(() => {
    const diagonals = getDiagonals();
    const intersection = getIntersectionPoint();

    return [
      // First diagonal, first half
      { p1: diagonals[0].p1, p2: intersection, diagonalIndex: 0, half: 1 },
      // First diagonal, second half
      { p1: intersection, p2: diagonals[0].p2, diagonalIndex: 0, half: 2 },
      // Second diagonal, first half
      { p1: diagonals[1].p1, p2: intersection, diagonalIndex: 1, half: 1 },
      // Second diagonal, second half
      { p1: intersection, p2: diagonals[1].p2, diagonalIndex: 1, half: 2 },
    ];
  }, [getDiagonals, getIntersectionPoint]);

  // Event handlers
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!activeTool || !svgRef.current) return;

      // Use SVG's built-in coordinate transformation
      const svgPoint = svgRef.current.createSVGPoint();
      svgPoint.x = e.clientX;
      svgPoint.y = e.clientY;

      // Transform to SVG coordinate system using the current transform matrix
      const ctm = svgRef.current.getScreenCTM();
      if (!ctm) return;

      const svgClickX = svgPoint.matrixTransform(ctm.inverse()).x;
      const svgClickY = svgPoint.matrixTransform(ctm.inverse()).y;

      const vertices = getCanvasVertices();

      if (activeTool === 'ruler') {
        let closestElement: { type: string; length: string; x: number; y: number } | null = null;
        let minDistance = Infinity;
        const threshold = 25;

        // Check diagonal segments if visible (sides are removed for slope implementation)
        if (showDiagonals) {
          const diagonalSegments = getDiagonalSegments();
          diagonalSegments.forEach((segment) => {
            const distance = distancePointToLineSegment([svgClickX, svgClickY], segment.p1, segment.p2);

            if (distance < threshold && distance < minDistance) {
              minDistance = distance;
              const length = calculateDistance(
                segment.p1,
                segment.p2,
                undefined,
                segment.diagonalIndex,
                segment.half,
              );
              const midX = (segment.p1[0] + segment.p2[0]) / 2;
              const midY = (segment.p1[1] + segment.p2[1]) / 2;

              closestElement = {
                type: 'diagonal-segment',
                length: length.toFixed(1) + ' in',
                x: midX,
                y: midY,
              };
            }
          });
        }

        if (closestElement !== null) {
          const element = closestElement as { type: string; length: string; x: number; y: number };
          const newMeasurement = {
            type: t(translations.measurementTypeLength) as 'length' | 'angle',
            value: element.length,
            x: element.x,
            y: element.y,
            id: Date.now(),
          };
          setMeasurements((prev) => [...prev, newMeasurement]);
          announceToScreenReader(tInterpolate(translations.measurementAdded, { value: newMeasurement.value }));
        }
      } else if (activeTool === 'protractor') {
        let closestVertex: { vertex: [number, number]; index: number } | null = null;
        let minDistance = Infinity;
        const threshold = 30;

        vertices.forEach((vertex, index) => {
          const distance = calculateDistance([svgClickX, svgClickY], vertex);
          if (distance < threshold && distance < minDistance) {
            minDistance = distance;
            closestVertex = { vertex, index };
          }
        });

        if (closestVertex) {
          const { vertex, index } = closestVertex;
          const prevVertex = vertices[(index - 1 + vertices.length) % vertices.length];
          const nextVertex = vertices[(index + 1) % vertices.length];

          const angle = calculateAngle(prevVertex, vertex, nextVertex, index);

          const newMeasurement = {
            type: t(translations.measurementTypeAngle) as 'length' | 'angle',
            value: angle.toFixed(0) + t(translations.degreesSymbol),
            x: vertex[0],
            y: vertex[1],
            id: Date.now(),
          };
          setMeasurements((prev) => [...prev, newMeasurement]);
          announceToScreenReader(tInterpolate(translations.measurementAdded, { value: newMeasurement.value }));
        }
      } else if (activeTool === 'slope') {
        let closestSide: { sideIndex: number; slope: number; x: number; y: number } | null = null;
        let minDistance = Infinity;
        const threshold = 25;

        // Check polygon sides for slope calculation
        for (let i = 0; i < vertices.length; i++) {
          const p1 = vertices[i];
          const p2 = vertices[(i + 1) % vertices.length];

          const distance = distancePointToLineSegment([svgClickX, svgClickY], p1, p2);

          if (distance < threshold && distance < minDistance) {
            minDistance = distance;

            // Use original mathematical coordinates for slope calculation
            const originalP1 = model.vertices[i];
            const originalP2 = model.vertices[(i + 1) % model.vertices.length];

            // Calculate slope using the formula: (y2-y1)/(x2-x1)
            const slope = (originalP2[1] - originalP1[1]) / (originalP2[0] - originalP1[0]);
            const roundedSlope = Math.round(slope * 100) / 100; // Round to 2 decimal places

            const midX = (p1[0] + p2[0]) / 2;
            const midY = (p1[1] + p2[1]) / 2;

            closestSide = {
              sideIndex: i,
              slope: roundedSlope,
              x: midX,
              y: midY,
            };
          }
        }

        if (closestSide) {
          const newMeasurement = {
            type: 'slope' as 'length' | 'angle',
            value: closestSide.slope.toString(),
            x: closestSide.x,
            y: closestSide.y,
            id: Date.now(),
          };
          setMeasurements((prev) => [...prev, newMeasurement]);

          // Store slope in calculatedSlopes state for card display
          const sideNames = ['AB', 'BC', 'CD', 'DA'];
          const sideName = sideNames[closestSide.sideIndex] as 'AB' | 'BC' | 'CD' | 'DA';
          setCalculatedSlopes((prev) => ({
            ...prev,
            [sideName]: closestSide.slope,
          }));

          // Set current calculation for display
          const sideLabels = ['AB (bottom)', 'BC (right)', 'CD (top)', 'DA (left)'];
          const coordinateLabels = [
            'From A(5, 4) to B(25, 5)',
            'From B(25, 5) to C(29, 17)',
            'From C(29, 17) to D(8, 15)',
            'From D(8, 15) to A(5, 4)',
          ];
          const calculationSteps = [
            {
              step1: '(5 - 4) / (25 - 5)',
              fraction: { numerator: '1', denominator: '20' },
              result: '0.05',
            },
            {
              step1: '(17 - 5) / (29 - 25)',
              fraction: { numerator: '12', denominator: '4' },
              result: '3.00',
            },
            {
              step1: '(15 - 17) / (8 - 29)',
              fraction: { numerator: '2', denominator: '21' },
              result: '0.10',
            },
            {
              step1: '(4 - 15) / (5 - 8)',
              fraction: { numerator: '11', denominator: '3' },
              result: '3.67',
            },
          ];

          setCurrentCalculation({
            sideName: sideLabels[closestSide.sideIndex],
            coordinates: coordinateLabels[closestSide.sideIndex],
            calculation: calculationSteps[closestSide.sideIndex],
            result: closestSide.slope,
          });

          announceToScreenReader(`Slope calculated: ${closestSide.slope}`);
        }
      }
    },
    [
      activeTool,
      getCanvasVertices,
      distancePointToLineSegment,
      calculateDistance,
      showDiagonals,
      getDiagonalSegments,
      calculateAngle,
      t,
      translations,
      announceToScreenReader,
      tInterpolate,
    ],
  );

  return (
    <div className="flex flex-col gap-6" role="application" aria-label={t(translations.interactiveTitle)}>
      {/* Screen reader live regions - hidden from visual users */}
      <div aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" className="sr-only">
        {statusAnnouncement}
      </div>

      {/* Enhanced screen reader instructions */}
      <div className="sr-only">
        <p>{t(translations.screenReaderInstructions)}</p>
        <p>{t(translations.toolInstructions)}</p>
        <p>{t(translations.measurementInstructions)}</p>
        <p>{tInterpolate(translations.measurementCount, { count: measurements.length.toString() })}</p>
        <p>
          {tInterpolate(translations.diagonalStatus, {
            status: showDiagonals ? t(translations.diagonalsShown) : t(translations.diagonalsHidden),
          })}
        </p>
      </div>

      <div className="sr-only">
        {tInterpolate(translations.modelInfo, { name: model.name, description: model.description })}
      </div>

      {/* Tools Row */}
      <div
        className="grid grid-cols-1 gap-3 text-lg xl:grid-cols-5"
        role="toolbar"
        aria-label={t(translations.toolbarLabel)}
      >
        <button
          id={t(translations.toolRulerId)}
          onClick={() => handleToolSelect(t(translations.toolRulerName))}
          onKeyDown={(e) => handleKeyDown(e, t(translations.toolRulerName))}
          className={`px-4 py-3 rounded transition-colors text-center ${
            activeTool === t(translations.toolRulerName)
              ? 'text-white bg-[#006BE0] hover:bg-blue-600'
              : 'text-blue-600 border border-[#006BE0] hover:bg-gray-100'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-pressed={activeTool === t(translations.toolRulerName)}
          aria-describedby={t(translations.toolDescriptionId)}
        >
          {t(translations.ruler)}
        </button>
        <button
          id={t(translations.toolProtractorId)}
          onClick={() => handleToolSelect(t(translations.toolProtractorName))}
          onKeyDown={(e) => handleKeyDown(e, t(translations.toolProtractorName))}
          className={`px-4 py-3 rounded transition-colors text-center ${
            activeTool === t(translations.toolProtractorName)
              ? 'text-white bg-[#006BE0] hover:bg-blue-600'
              : 'text-blue-600 border border-[#006BE0] hover:bg-gray-100'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-pressed={activeTool === t(translations.toolProtractorName)}
          aria-describedby={t(translations.toolDescriptionId)}
        >
          {t(translations.protractor)}
        </button>
        <button
          id="slope-tool"
          onClick={() => handleToolSelect('slope')}
          onKeyDown={(e) => handleKeyDown(e, 'slope')}
          className={`px-4 py-3 rounded transition-colors text-center ${
            activeTool === 'slope'
              ? 'text-white bg-[#006BE0] hover:bg-blue-600'
              : 'text-blue-600 border border-[#006BE0] hover:bg-gray-100'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-pressed={activeTool === 'slope'}
          aria-describedby={t(translations.toolDescriptionId)}
        >
          Slope
        </button>
        <button
          id={t(translations.toolDiagonalsId)}
          onClick={() => handleToolSelect(t(translations.toolDiagonalsName))}
          onKeyDown={(e) => handleKeyDown(e, t(translations.toolDiagonalsName))}
          className={`px-4 py-3 rounded transition-colors text-center ${
            showDiagonals
              ? 'text-white bg-[#006BE0] hover:bg-blue-600'
              : 'text-blue-600 border border-[#006BE0] hover:bg-gray-100'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-pressed={showDiagonals}
          aria-describedby={t(translations.toolDescriptionId)}
        >
          {t(translations.diagonals)}
        </button>
        <button
          id={t(translations.toolClearId)}
          onClick={() => handleToolSelect(t(translations.toolClearName))}
          onKeyDown={(e) => handleKeyDown(e, t(translations.toolClearName))}
          className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#006BE0]"
          aria-describedby={t(translations.toolDescriptionId)}
        >
          {t(translations.clear)}
        </button>
      </div>

      {/* Hidden tool description for screen readers */}
      <div id={t(translations.toolDescriptionId)} className="sr-only">
        {t(translations.canvasInstructions)}
      </div>

      {/* Canvas Row */}
      <div className="flex flex-col gap-4">
        <div className="w-full text-center">
          <div className="mb-3">
            <div className="text-lg font-bold text-gray-800">{model.name}</div>
            <div className="text-sm text-gray-600">{model.description}</div>
          </div>
          <div className="flex justify-center w-full">
            <div className="border border-gray-300 bg-gray-50">
              <svg
                ref={svgRef}
                height={canvasHeight}
                viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
                onClick={handleCanvasClick}
                onKeyDown={(e) => {
                  if (e.key === t(translations.keyEnter) || e.key === t(translations.keySpace)) {
                    e.preventDefault();
                    // Canvas click simulation for keyboard users
                    const rect = svgRef.current?.getBoundingClientRect();
                    if (rect) {
                      const clickEvent = new MouseEvent(t(translations.eventClick), {
                        clientX: rect.left + rect.width / 2,
                        clientY: rect.top + rect.height / 2,
                      });
                      svgRef.current?.dispatchEvent(clickEvent);
                    }
                  }
                }}
                className="cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{
                  background: '#ffffff',
                }}
                role="application"
                aria-label={t(translations.canvasAriaLabel)}
                aria-describedby="canvas-description"
                tabIndex={0}
              >
                {/* Coordinate Grid Background */}
                {/* Fine grid lines - every unit */}
                {Array.from({ length: 31 }, (_, i) => (
                  <line
                    key={`fine-x-${i}`}
                    x1={padding + (i * gridWidth) / 30}
                    y1={padding}
                    x2={padding + (i * gridWidth) / 30}
                    y2={padding + gridHeight}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 23 }, (_, i) => (
                  <line
                    key={`fine-y-${i}`}
                    x1={padding}
                    y1={padding + gridHeight - (i * gridHeight) / 22}
                    x2={padding + gridWidth}
                    y2={padding + gridHeight - (i * gridHeight) / 22}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}

                {/* Major grid lines - every 5 units */}
                {Array.from({ length: 7 }, (_, i) => {
                  const value = i * 5;
                  return (
                    <line
                      key={`major-x-${value}`}
                      x1={padding + (value * gridWidth) / 30}
                      y1={padding}
                      x2={padding + (value * gridWidth) / 30}
                      y2={padding + gridHeight}
                      stroke="#d1d5db"
                      strokeWidth="1.5"
                    />
                  );
                })}
                {Array.from({ length: 5 }, (_, i) => {
                  const value = i * 5;
                  return (
                    <line
                      key={`major-y-${value}`}
                      x1={padding}
                      y1={padding + gridHeight - (value * gridHeight) / 22}
                      x2={padding + gridWidth}
                      y2={padding + gridHeight - (value * gridHeight) / 22}
                      stroke="#d1d5db"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Coordinate Axes - Origin at bottom-left of grid */}
                <line
                  x1={padding}
                  y1={padding + gridHeight}
                  x2={padding + gridWidth}
                  y2={padding + gridHeight}
                  stroke="#374151"
                  strokeWidth="2"
                />
                <line
                  x1={padding}
                  y1={padding}
                  x2={padding}
                  y2={padding + gridHeight}
                  stroke="#374151"
                  strokeWidth="2"
                />

                {/* Grid Labels - every 5 units */}
                {Array.from({ length: 7 }, (_, i) => {
                  const value = i * 5;
                  return (
                    <g key={`x-label-${value}`}>
                      <line
                        x1={padding + (value * gridWidth) / 30}
                        y1={padding + gridHeight - 10}
                        x2={padding + (value * gridWidth) / 30}
                        y2={padding + gridHeight}
                        stroke="#374151"
                        strokeWidth="2"
                      />
                      <text
                        x={padding + (value * gridWidth) / 30}
                        y={padding + gridHeight - 15}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#374151"
                      >
                        {value}
                      </text>
                    </g>
                  );
                })}
                {Array.from({ length: 5 }, (_, i) => {
                  const value = i * 5;
                  return (
                    <g key={`y-label-${value}`}>
                      <line
                        x1={padding}
                        y1={padding + gridHeight - (value * gridHeight) / 22}
                        x2={padding + 10}
                        y2={padding + gridHeight - (value * gridHeight) / 22}
                        stroke="#374151"
                        strokeWidth="2"
                      />
                      <text
                        x={padding + 25}
                        y={padding + gridHeight - (value * gridHeight) / 22 + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#374151"
                      >
                        {value}
                      </text>
                    </g>
                  );
                })}
                {/* Panel shape */}
                <polygon
                  points={getCanvasVertices()
                    .map(([x, y]) => `${x},${y}`)
                    .join(' ')}
                  fill="rgba(8, 14, 43, 0.8)"
                  stroke="#007BFF"
                  strokeWidth="3"
                />

                {/* Vertices */}
                {getCanvasVertices().map(([x, y], index) => (
                  <circle key={index} cx={x} cy={y} r="4" fill="#0056b3" />
                ))}

                {/* Vertex Labels */}
                {vertexLabels.map((vertex, index) => {
                  const [labelX, labelY] = getVertexLabelPosition(vertex.coordinates, vertex.labelOffset);
                  return (
                    <g key={`label-${index}`}>
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#0056b3"
                      >
                        {vertex.label} ({vertex.coordinates[0]},{vertex.coordinates[1]})
                      </text>
                    </g>
                  );
                })}

                {/* Diagonals */}
                {showDiagonals &&
                  getDiagonals().map((diagonal, index) => (
                    <line
                      key={index}
                      x1={diagonal.p1[0]}
                      y1={diagonal.p1[1]}
                      x2={diagonal.p2[0]}
                      y2={diagonal.p2[1]}
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="8,4"
                    />
                  ))}

                {/* Measurements */}
                {measurements.map((measurement) => {
                  const labelWidth = measurement.value.length * 8 + 16;
                  const isSlope = measurement.type === 'slope';
                  return (
                    <g key={measurement.id}>
                      <rect
                        x={measurement.x - labelWidth / 2}
                        y={measurement.y - 12}
                        width={labelWidth}
                        height="24"
                        fill={isSlope ? '#e8f4fd' : 'white'}
                        stroke={isSlope ? '#006BE0' : '#666'}
                        strokeWidth="1"
                        rx="3"
                      />
                      <text
                        x={measurement.x}
                        y={measurement.y + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill={isSlope ? '#006BE0' : '#0056b3'}
                      >
                        {measurement.value}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Canvas description for screen readers */}
          <div id="canvas-description" className="sr-only">
            {t(translations.canvasDescription)}
          </div>
        </div>
      </div>

      {/* Slope Calculations Card - Only show when slope tool is active */}
      {activeTool === 'slope' && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Slope Calculation:{' '}
            <span className="text-2xl font-bold" style={{ fontFamily: 'Besley, serif' }}>
              <span style={{ color: '#E0002B', fontStyle: 'italic' }}>m</span> ={' '}
              <div className="inline-block text-center">
                <div style={{ color: '#3B82F6', fontStyle: 'italic' }}>
                  <span style={{ color: '#3B82F6', fontStyle: 'italic' }}>y</span>
                  <sub style={{ color: '#3B82F6' }}>₂</sub> -{' '}
                  <span style={{ color: '#3B82F6', fontStyle: 'italic' }}>y</span>
                  <sub style={{ color: '#3B82F6' }}>₁</sub>
                </div>
                <div className="w-full h-0.5 bg-gray-800 my-1"></div>
                <div style={{ color: '#10B981', fontStyle: 'italic' }}>
                  <span style={{ color: '#10B981', fontStyle: 'italic' }}>x</span>
                  <sub style={{ color: '#10B981' }}>₂</sub> -{' '}
                  <span style={{ color: '#10B981', fontStyle: 'italic' }}>x</span>
                  <sub style={{ color: '#10B981' }}>₁</sub>
                </div>
              </div>
            </span>
          </h3>

          {currentCalculation ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-800 mb-2">{currentCalculation.sideName}</div>
              <div className="text-xs text-gray-600 mb-2">{currentCalculation.coordinates}</div>
              <div className="text-sm">
                <span className="text-gray-700">Slope = </span>
                <span className="text-gray-600">{currentCalculation.calculation.step1} = </span>
                <div className="inline-block text-center mx-2">
                  <div className="font-bold" style={{ fontFamily: 'Besley, serif', color: '#3B82F6' }}>
                    {currentCalculation.calculation.fraction.numerator}
                  </div>
                  <div className="w-full h-0.5 bg-gray-800 my-1"></div>
                  <div className="font-bold" style={{ fontFamily: 'Besley, serif', color: '#10B981' }}>
                    {currentCalculation.calculation.fraction.denominator}
                  </div>
                </div>
                <span className="text-gray-600"> = </span>
                <span className="font-bold text-blue-600" style={{ fontFamily: 'Besley, serif' }}>
                  {currentCalculation.calculation.result}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic">Click on any side to see its calculation</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PanelInspectorParallelogram;
