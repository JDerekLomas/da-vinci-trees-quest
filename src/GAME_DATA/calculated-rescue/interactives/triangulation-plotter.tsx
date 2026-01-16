import React, { useState, useRef, useEffect } from 'react';
import { TriangulationPlotterConfig } from '../configs/triangulation-plotter';
import { useTranslations } from '../../../hooks/useTranslations';
import './triangulation-plotter.css';
import { format } from '../utils';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  bearing: number;
  color: string;
  placed: boolean;
  bearingDrawn: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface TriangulationPlotterProps {
  interaction: TriangulationPlotterConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const TriangulationPlotter: React.FC<TriangulationPlotterProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { dialogIndex, currentSceneIndex, interactiveResponses } = useGameContext();

  const { payload } = useEventListener('triangulation-plotter') as { payload: { step: number } };

  const { totalSteps, gridSize, margins, defaultStations, translations } = interaction;
  const {
    tStepLabel,
    tStage,
    tStation,
    tPosition,
    tTargetBearing,
    tYourBearing,
    tStatus,
    tStage1,
    tStage2,
    tStage3,
    tAccessibility,
  } = translations;

  // State for user interaction
  const [currentStep, setCurrentStep] = useState<number>(dialogIndex === 1 ? 1 : totalSteps);
  const [stations, setStations] = useState<Station[]>(defaultStations);
  const [currentStation, setCurrentStation] = useState<number>(1);
  const [currentAction, setCurrentAction] = useState<'bearing' | 'cockedHat' | 'area'>('bearing');
  const [userBearings, setUserBearings] = useState<(number | null)[]>([null, null, null, null]);
  const [isDrawingBearing, setIsDrawingBearing] = useState<boolean>(false);
  const [drawingAngle, setDrawingAngle] = useState<number>(0);
  const [focusedStation, setFocusedStation] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState<string>('');

  const svgRef = useRef<SVGSVGElement | null>(null);
  const announcementRef = useRef<HTMLDivElement | null>(null);

  // Update current step based on payload
  useEffect(() => {
    if (payload && payload?.step && payload.step !== currentStep) {
      setCurrentStep(payload.step);
    }
  }, [payload]);

  useEffect(() => {
    if (currentStep === 1) {
      setCurrentStation(1);
      setCurrentAction('bearing');
    } else if (currentStep === 2) {
      setCurrentStation(2);
      setCurrentAction('bearing');
    } else if (currentStep === 3) {
      setCurrentStation(3);
      setCurrentAction('bearing');
    }
  }, [currentStep]);

  // Send interaction data for verification
  useEffect(() => {
    const interactionData: Record<string, boolean> = {};

    if (currentStep >= 1 && currentStep <= 3) {
      // For bearing steps, check if the bearing is correct
      const stationIndex = currentStep;
      const station = stations[stationIndex - 1];
      const bearing = userBearings[stationIndex];
      const isCorrect = bearing === station.bearing;
      const dataKey = `step-${currentStep}-completed`;

      if (isCorrect) {
        interactionData[dataKey] = true;
      }
    }

    onInteraction(interactionData);
  }, [currentStep, onInteraction, stations, userBearings]);

  // Set user bearings and drawn stations based on response
  useEffect(() => {
    const sceneKey = `${currentSceneIndex}_0`;
    const response = interactiveResponses[sceneKey];
    for (let i = 1; i <= 3; i++) {
      const dataKey = `step-${i}-completed`;
      if (response && response[dataKey]) {
        setUserBearings((prev) => {
          const newBearings = [...prev];
          newBearings[i] = stations[i - 1].bearing;
          return newBearings;
        });
        setStations((prev) => {
          const newStations = [...prev];
          newStations[i - 1].bearingDrawn = true;
          return newStations;
        });
      }
    }
  }, []);

  // Announce changes for screen readers
  useEffect(() => {
    if (announcement && announcementRef.current) {
      announcementRef.current.focus();
    }
  }, [announcement]);

  // Check if all stations are complete
  const allStationsComplete = stations.every(
    (station, index) => station.bearingDrawn && userBearings[index + 1] !== null,
  );

  // Announce completion when all stations are done
  useEffect(() => {
    if (allStationsComplete) {
      setAnnouncement(t(tAccessibility.allStationsCompleteAnnouncement));
    }
  }, [allStationsComplete, t]);

  // Constants for the grid
  const totalWidth = gridSize + margins.left + margins.right;
  const totalHeight = gridSize + margins.top + margins.bottom;
  const gridLines = 10;
  const gridStep = gridSize / gridLines;

  // Convert grid coordinates to SVG coordinates
  const toSvgX = (x: number): number => margins.left + x * gridStep;
  const toSvgY = (y: number): number => totalHeight - margins.bottom - y * gridStep;

  // Convert SVG coordinates to grid coordinates
  const toGridX = (x: number): number => (x - margins.left) / gridStep;
  const toGridY = (y: number): number => (totalHeight - y - margins.bottom) / gridStep;

  // Calculate bearing line path
  const getBearingLinePath = (station: Station, bearing: number | null): string => {
    const bearingRad = ((90 - (bearing || station.bearing)) * Math.PI) / 180;

    // Calculate intersections with grid boundaries
    const x0 = station.x;
    const y0 = station.y;

    // Find intersections with grid boundaries
    let points: Point[] = [];

    // Check intersection with top boundary (y = gridLines)
    const topY = gridLines;
    const topX = x0 + (topY - y0) / Math.tan(bearingRad);
    if (topX >= 0 && topX <= gridLines) {
      points.push({ x: topX, y: topY });
    }

    // Check intersection with bottom boundary (y = 0)
    const bottomY = 0;
    const bottomX = x0 + (bottomY - y0) / Math.tan(bearingRad);
    if (bottomX >= 0 && bottomX <= gridLines) {
      points.push({ x: bottomX, y: bottomY });
    }

    // Check intersection with left boundary (x = 0)
    const leftX = 0;
    const leftY = y0 + (leftX - x0) * Math.tan(bearingRad);
    if (leftY >= 0 && leftY <= gridLines) {
      points.push({ x: leftX, y: leftY });
    }

    // Check intersection with right boundary (x = gridLines)
    const rightX = gridLines;
    const rightY = y0 + (rightX - x0) * Math.tan(bearingRad);
    if (rightY >= 0 && rightY <= gridLines) {
      points.push({ x: rightX, y: rightY });
    }

    // Sort points by distance from station to ensure consistent line direction
    points.sort((a, b) => {
      const distA = Math.hypot(a.x - x0, a.y - y0);
      const distB = Math.hypot(b.x - x0, b.y - y0);
      return distA - distB;
    });

    // Take the two points furthest apart if we have more than 2 intersections
    if (points.length > 2) {
      points = [points[0], points[points.length - 1]];
    }

    // If we don't have exactly 2 points, return empty path
    if (points.length !== 2) return '';

    return `M ${toSvgX(points[0].x)} ${toSvgY(points[0].y)} L ${toSvgX(points[1].x)} ${toSvgY(points[1].y)}`;
  };

  // Get status message for a station
  const getStationStatus = (index: number): string => {
    if (!userBearings[index]) {
      return t(tStage1.notSet);
    }

    const diff = Math.abs(stations[index - 1].bearing - (userBearings[index] || 0));
    if (diff === 0) {
      return t(tStage1.correct);
    } else {
      return t(tStage1.wrong);
    }
  };

  // Get station button label for accessibility
  const getStationButtonLabel = (station: Station): string => {
    const status = station.bearingDrawn
      ? t(tAccessibility.stationCompleteLabel)
      : t(tAccessibility.stationIncompleteLabel);

    return format(t(tAccessibility.stationButtonLabel), {
      name: station.name,
      x: station.x.toFixed(1),
      y: station.y.toFixed(1),
      bearing: station.bearing,
      status: status,
    });
  };

  // Handle mouse move for bearing drawing
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDrawingBearing) return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Get coordinates based on event type
    let clientX: number, clientY: number;
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // transform to svg coordinates
    const svgX = (x / rect.width) * totalWidth;
    const svgY = (y / rect.height) * totalHeight;

    // Convert to grid coordinates
    const gridX = toGridX(svgX);
    const gridY = toGridY(svgY);
    // Calculate angle from station to mouse position
    const station = stations[currentStation - 1];
    const dx = gridX - station.x;
    const dy = gridY - station.y;

    // Convert to bearing (clockwise from north)
    let angle = (90 - (Math.atan2(dy, dx) * 180) / Math.PI) % 360;
    if (angle < 0) angle += 360;

    setDrawingAngle(Math.round(angle));
  };

  // Handle mouse up for bearing drawing
  const handleMouseUp = (): void => {
    if (!isDrawingBearing) return;
    handleBearingConfirm();
  };

  // Handle station selection (for both keyboard and mouse)
  const handleStationSelect = (index: number): void => {
    if (currentAction === 'bearing' && index === currentStation && !stations[index - 1].bearingDrawn) {
      setIsDrawingBearing(true);
      setDrawingAngle(stations[index - 1].bearing);
      setAnnouncement(format(t(tAccessibility.stationSelectedAnnouncement), { name: stations[index - 1].name }));
    }
  };

  // Handle station click (mouse/touch)
  const handleStationClick = (index: number): void => {
    if (currentAction === 'bearing' && index === currentStation && !stations[index - 1].bearingDrawn) {
      setIsDrawingBearing(true);
      setDrawingAngle(stations[index - 1].bearing);
    }
  };

  // Handle touch events
  const handleTouchStart = (index: number): void => {
    if (currentAction === 'bearing' && index === currentStation && !stations[index - 1].bearingDrawn) {
      setIsDrawingBearing(true);
      setDrawingAngle(stations[index - 1].bearing);
    }
  };

  const handleTouchEnd = (): void => {
    handleMouseUp();
  };

  // Handle bearing confirmation
  const handleBearingConfirm = (): void => {
    if (!isDrawingBearing) return;

    const actualBearing = stations[currentStation - 1].bearing;
    const drawnBearing = drawingAngle;

    // Update the user bearings regardless of accuracy
    const updatedBearings = [...userBearings];
    updatedBearings[currentStation] = drawnBearing;
    setUserBearings(updatedBearings);

    // Only mark station as complete if bearing is exact
    if (drawnBearing === actualBearing) {
      const updatedStations = [...stations];
      updatedStations[currentStation - 1] = {
        ...updatedStations[currentStation - 1],
        bearingDrawn: true,
      };
      setStations(updatedStations);
      setAnnouncement(
        format(t(tAccessibility.bearingConfirmedAnnouncement), {
          angle: drawnBearing,
          name: stations[currentStation - 1].name,
        }),
      );
    } else {
      setAnnouncement(
        format(t(tAccessibility.bearingConfirmedAnnouncement), {
          angle: drawnBearing,
          name: stations[currentStation - 1].name,
        }),
      );
    }

    setIsDrawingBearing(false);
  };

  // Handle bearing cancellation
  const handleBearingCancel = (): void => {
    if (!isDrawingBearing) return;
    setIsDrawingBearing(false);
    setAnnouncement(format(t(tAccessibility.cancelBearingLabel), { name: stations[currentStation - 1].name }));
  };

  // Handle angle adjustment
  const handleAngleAdjustment = (direction: 'up' | 'down'): void => {
    if (!isDrawingBearing) return;

    const newAngle = direction === 'up' ? (drawingAngle + 1) % 360 : (drawingAngle - 1 + 360) % 360;

    setDrawingAngle(newAngle);
    setAnnouncement(format(t(tAccessibility.currentAngleAnnouncement), { angle: newAngle }));
  };

  // Handle keyboard events for the entire interactive
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    // Only handle keyboard events during bearing stages
    if (currentAction !== 'bearing') return;

    switch (e.key) {
      case 'Tab':
        // Let Tab work normally for navigation
        return;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isDrawingBearing) {
          handleBearingConfirm();
        } else if (
          focusedStation &&
          focusedStation === currentStation &&
          !stations[currentStation - 1].bearingDrawn
        ) {
          handleStationSelect(focusedStation);
        }
        break;

      case 'Escape':
        e.preventDefault();
        if (isDrawingBearing) {
          handleBearingCancel();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isDrawingBearing) {
          handleAngleAdjustment('up');
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (isDrawingBearing) {
          handleAngleAdjustment('down');
        }
        break;

      case 'ArrowLeft':
      case 'ArrowRight':
        // Prevent horizontal arrow keys from scrolling
        if (isDrawingBearing) {
          e.preventDefault();
        }
        break;
    }
  };

  // Handle station focus
  const handleStationFocus = (index: number): void => {
    setFocusedStation(index);
  };

  // Handle station blur
  const handleStationBlur = (): void => {
    setFocusedStation(null);
  };

  // Get action description for current step
  const getActionDescription = (): string => {
    if (currentStep >= 1 && currentStep <= 3) {
      return format(t(tStage1.label), {
        label: ['A', 'B', 'C'][currentStep - 1],
        bearing: stations[currentStep - 1].bearing,
      });
    } else if (currentStep === 4) {
      return t(tStage2.label);
    } else {
      return t(tStage3.label);
    }
  };

  return (
    <div
      className="flex flex-col items-center pb-8 gap-4"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="application"
      aria-label={t(tAccessibility.chartDescription)}
    >
      {/* Screen reader announcements */}
      <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Step Counter and Instructions */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">
            {format(t(tStepLabel), {
              step: currentStep,
              totalSteps: totalSteps,
              description: getActionDescription(),
            })}
          </div>
          <div className="px-3 py-1 rounded-full border border-gray-300 font-medium min-w-24 text-center">
            {t(tStage)} {currentAction === 'bearing' ? 1 : currentAction === 'cockedHat' ? 2 : 3}
          </div>
        </div>

        {/* Added clear instruction tooltip for bearing stage */}
        {currentAction === 'bearing' && (
          <div className="mt-2">
            <span>
              {format(t(tStage1.subLabel), {
                bearing: stations[currentStation - 1]?.bearing,
              })}
            </span>
          </div>
        )}
      </div>

      {/* Only render SVG/map when not in area calculation step */}
      {currentAction !== 'area' && (
        <div>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${totalWidth} ${totalHeight}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-[20rem] lg:h-[28rem]"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
            onMouseLeave={handleMouseUp}
            role="img"
            aria-label={t(tAccessibility.chartDescription)}
          >
            {/* Grid lines */}
            {Array.from({ length: gridLines + 1 }).map((_, i) => (
              <React.Fragment key={`grid-${i}`}>
                {/* Horizontal line */}
                <line
                  x1={margins.left}
                  y1={margins.top + i * gridStep}
                  x2={margins.left + gridSize}
                  y2={margins.top + i * gridStep}
                  stroke="#ddd"
                  strokeWidth="1"
                />
                {/* Vertical line */}
                <line
                  x1={margins.left + i * gridStep}
                  y1={margins.top}
                  x2={margins.left + i * gridStep}
                  y2={margins.top + gridSize}
                  stroke="#ddd"
                  strokeWidth="1"
                />

                {/* Grid labels with better positioning */}
                <text
                  x={margins.left - 20}
                  y={margins.top + i * gridStep + 5}
                  textAnchor="end"
                  fontSize="18"
                  fontWeight={i === 0 || i === gridLines ? 'bold' : 'normal'}
                  fill="#666"
                >
                  {gridLines - i}
                </text>
                <text
                  x={margins.left + i * gridStep}
                  y={margins.top + gridSize + 30}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight={i === 0 || i === gridLines ? 'bold' : 'normal'}
                  fill="#666"
                >
                  {i}
                </text>
              </React.Fragment>
            ))}

            {/* Axis labels */}
            <text
              x={margins.left + gridSize / 2}
              y={margins.top + gridSize + 60}
              textAnchor="middle"
              fontSize="18"
              fill="#333"
            >
              {t(tStage1.xAxisLabel)}
            </text>
            <text
              x={margins.left - 55}
              y={margins.top + gridSize / 2}
              textAnchor="middle"
              fontSize="18"
              fill="#333"
              transform={`rotate(-90 ${margins.left - 55} ${margins.top + gridSize / 2})`}
            >
              {t(tStage1.yAxisLabel)}
            </text>

            {/* Origin highlight with clearer labeling */}
            <circle
              cx={margins.left}
              cy={margins.top + gridSize}
              r="5"
              fill="#888"
              stroke="#fff"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <text
              x={margins.left + 12}
              y={margins.top + gridSize - 10}
              fontSize="18"
              fill="#666"
              fontWeight="bold"
              stroke="#fff"
              strokeWidth="0.5"
            >
              {t(tStage1.origin)}
            </text>

            {/* Sea texture */}
            <rect
              x={margins.left}
              y={margins.top}
              width={gridSize}
              height={gridSize}
              fill="url(#sea-pattern)"
              opacity="0.1"
            />

            {/* RDF Stations */}
            <g role="group" aria-label="RDF Stations">
              {stations.map(
                (station, index) =>
                  station.placed && (
                    <React.Fragment key={station.id}>
                      {/* Clickable station group */}
                      <g
                        onClick={() => handleStationClick(index + 1)}
                        onTouchStart={() => handleTouchStart(index + 1)}
                        onFocus={() => handleStationFocus(index + 1)}
                        onBlur={handleStationBlur}
                        tabIndex={
                          currentAction === 'bearing' && index + 1 === currentStation && !station.bearingDrawn
                            ? 0
                            : -1
                        }
                        role="button"
                        aria-label={getStationButtonLabel(station)}
                        aria-pressed={isDrawingBearing && index + 1 === currentStation}
                        aria-disabled={currentAction === 'bearing' && station.bearingDrawn}
                        style={{
                          cursor:
                            currentAction === 'bearing' && index + 1 === currentStation && !station.bearingDrawn
                              ? 'pointer'
                              : 'default',
                          outline: 'none',
                        }}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {/* Station marker with larger visibility */}
                        <circle
                          cx={toSvgX(station.x)}
                          cy={toSvgY(station.y)}
                          r="10"
                          fill={station.color}
                          stroke="#fff"
                          strokeWidth="2"
                        />

                        {/* Focus ring - shows when station has keyboard focus */}
                        {focusedStation === index + 1 && (
                          <circle
                            cx={toSvgX(station.x)}
                            cy={toSvgY(station.y)}
                            r="15"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="3"
                            opacity="0.8"
                          />
                        )}

                        {/* Pulsing animation when this is the current station and not yet set */}
                        {currentStation === index + 1 && currentAction === 'bearing' && !station.bearingDrawn && (
                          <>
                            <circle
                              cx={toSvgX(station.x)}
                              cy={toSvgY(station.y)}
                              r="15"
                              fill="none"
                              stroke={station.color}
                              strokeWidth="2"
                              opacity="0.6"
                              style={{ animation: 'pulse 1.5s infinite' }}
                            />
                          </>
                        )}

                        {/* Station label with improved visibility */}
                        <text
                          x={toSvgX(station.x) - 2}
                          y={toSvgY(station.y) - 20}
                          textAnchor="middle"
                          fontSize="18"
                          fontWeight="bold"
                          fill={station.color}
                          stroke="#FFFFFF"
                          strokeWidth="1"
                          paintOrder="stroke"
                        >
                          {t(tStation)} {station.name}{' '}
                          {station.bearingDrawn && userBearings[index + 1] !== null
                            ? `(${userBearings[index + 1]}°)`
                            : ''}
                        </text>
                      </g>

                      {/* Bearing lines - only show if they've been drawn */}
                      {station.bearingDrawn && userBearings[index + 1] !== null && (
                        <path
                          d={getBearingLinePath(station, userBearings[index + 1])}
                          stroke={station.color}
                          strokeWidth="2"
                          opacity="0.6"
                          aria-label={t(tAccessibility.bearingLineDescription)}
                        />
                      )}
                    </React.Fragment>
                  ),
              )}
            </g>

            {/* Drawing angle indicator */}
            {isDrawingBearing && (
              <>
                <path
                  d={getBearingLinePath(stations[currentStation - 1], drawingAngle)}
                  stroke={stations[currentStation - 1].color}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  aria-label={t(tAccessibility.bearingLineDescription)}
                />

                {/* Protractor */}
                <circle
                  cx={toSvgX(stations[currentStation - 1].x)}
                  cy={toSvgY(stations[currentStation - 1].y)}
                  r="40"
                  fill="none"
                  stroke="#999"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />

                {/* North indicator */}
                <line
                  x1={toSvgX(stations[currentStation - 1].x)}
                  y1={toSvgY(stations[currentStation - 1].y)}
                  x2={toSvgX(stations[currentStation - 1].x)}
                  y2={toSvgY(stations[currentStation - 1].y + 1.5)}
                  stroke="#999"
                  strokeWidth="1"
                />

                <text
                  x={toSvgX(stations[currentStation - 1].x - 0.1)}
                  y={toSvgY(stations[currentStation - 1].y + 1.6)}
                  fontSize="18"
                  fill="#999"
                >
                  N
                </text>

                {/* Current angle display */}
                <text
                  x={toSvgX(stations[currentStation - 1].x)}
                  y={toSvgY(stations[currentStation - 1].y) - 30}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill={stations[currentStation - 1].color}
                  stroke="#fff"
                  strokeWidth="0.5"
                  aria-label={format(t(tAccessibility.angleDisplayDescription), { angle: drawingAngle })}
                >
                  {drawingAngle}°
                </text>
              </>
            )}

            {/* Patterns */}
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
      )}

      {/* Station Information */}
      <div className="w-full">
        {/* Only show station table during bearing stages */}
        {currentAction === 'bearing' && (
          <div
            className="w-full table-auto border border-gray-300 rounded-lg overflow-auto"
            tabIndex={0}
            role="table"
            aria-label={t(tAccessibility.tableDescription)}
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left font-medium" scope="col">
                    {t(tStation)}
                  </th>
                  <th className="p-2 text-left font-medium" scope="col">
                    {t(tPosition)}
                  </th>
                  <th className="p-2 text-center font-medium" scope="col">
                    {t(tTargetBearing)}
                  </th>
                  <th className="p-2 text-center font-medium" scope="col">
                    {t(tYourBearing)}
                  </th>
                  <th className="p-2 text-left font-medium" scope="col">
                    {t(tStatus)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station, index) => (
                  <tr
                    key={station.id}
                    className={`border-t ${currentStation === index + 1 && currentAction === 'bearing' ? 'bg-blue-50' : ''}`}
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: station.color }}></div>
                        <span>
                          {t(tStation)} {station.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-2">
                      ({station.x.toFixed(1)}, {station.y.toFixed(1)})
                    </td>
                    <td className="p-2 text-center">{station.bearing}°</td>
                    <td className="p-2 text-center">
                      {userBearings[index + 1] !== null ? `${userBearings[index + 1]}°` : '-'}
                    </td>
                    <td className="p-2">
                      {userBearings[index + 1] !== null ? (
                        <span
                          className={`${getStationStatus(index + 1) === t(tStage1.correct) ? 'text-[#008217]' : 'text-[#E0002B]'}`}
                        >
                          {getStationStatus(index + 1)}
                        </span>
                      ) : (
                        <span className="text-[#677600]">{t(tStage1.notSet)}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriangulationPlotter;
