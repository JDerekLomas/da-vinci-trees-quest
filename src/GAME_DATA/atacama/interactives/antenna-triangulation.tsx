import React, { useState, useRef, useEffect } from 'react';
import { SignalTriangulationInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { BUTTON_STYLES } from '../../../constants/constants';
import { EventBus } from '../../../services/EventBus';
import { EventCallback } from '../../../types/interfaces';

interface Point {
  x: number;
  y: number;
}

interface Antenna extends Point {
  id: string;
}

// Virtual canvas dimensions and constants.
const VIRTUAL_WIDTH = 800;
const VIRTUAL_HEIGHT = 400;
const BASE_Y = 350;
const GRID_SCALE = 50;
const KEYBOARD_STEP = 5;
const MARGIN = 20; // left/right padding boundary.
const markerPadding = 10; // extra padding so the horizontal base line doesn't overlap antenna markers.

// Sensible default positions for antennas. (Source will be computed from preset angles.)
const initialAntennas: Antenna[] = [
  { id: 'A1', x: 200, y: BASE_Y },
  { id: 'A2', x: 500, y: BASE_Y },
];

// We'll compute the initial source from preset angles (default 45° each) instead of hardcoding.
const initialSource: Point = { x: 350, y: 200 };

const stripHTML = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

const SignalTriangulation: React.FC<{ interaction: SignalTriangulationInteraction }> = ({ interaction }) => {
  const { t } = useTranslations();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Existing state for points.
  const [antennas] = useState<Antenna[]>(initialAntennas);
  const [source, setSource] = useState<Point>(initialSource);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedAntenna, setSelectedAntenna] = useState<'source' | null>(null);
  const [scale, setScale] = useState(1);
  const [displayHeight, setDisplayHeight] = useState(VIRTUAL_HEIGHT);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [lastAnnouncement, setLastAnnouncement] = useState('');
  const [showDescriptionState, setShowDescriptionState] = useState<boolean>(interaction.showDescription);

  // Preset angles for each antenna.
  const [angle1, setAngle1] = useState<number>(45); // Antenna 1 preset
  const [angle2, setAngle2] = useState<number>(45); // Antenna 2 preset

  const {
    classes: { common: ButtonCommonClasses, secondary: ButtonSecondaryClasses },
  } = BUTTON_STYLES;

  const resetDisabled = source.x === initialSource.x && source.y === initialSource.y;

  useEffect(() => {
    const handleConfigUpdate: EventCallback = (data) => {
      if (data && typeof data === 'object' && 'configName' in data) {
        const configName = data.configName as string;

        if (configName === 'pre-antenna-triangulation') {
          setShowDescriptionState(false);
        } else if (configName === 'antenna-triangulation') {
          setShowDescriptionState(true);
        }
      }
    };

    EventBus.on('updateAntennaConfig', handleConfigUpdate);

    return () => {
      EventBus.off('updateAntennaConfig', handleConfigUpdate);
    };
  }, []);

  // Destructure translation keys.
  const {
    dragInstructions,
    resetButton,
    measurementsTitle,
    antenna1Label,
    antenna2Label,
    sourceLabel,
    distance,
    interactiveInstructions,
    sourceButtonInstructions,
    sourceMovedAnnouncement,
    horizontalDistanceLabel,
    verticalDistanceLabel,
    antenna1AngleSetter,
    antenna2AngleSetter,
    sinLeft,
    sinRight,
    forThisTriangle,
  } = interaction.translations;

  const dragInstructionsText = t(dragInstructions);
  const resetButtonText = t(resetButton);
  const measurementsTitleText = t(measurementsTitle);
  const antenna1LabelText = t(antenna1Label);
  const antenna2LabelText = t(antenna2Label);
  const sourceLabelText = t(sourceLabel);
  const distanceText = t(distance);
  const interactiveInstructionsText = t(interactiveInstructions);
  const sourceButtonInstructionsText = t(sourceButtonInstructions);
  const sourceMovedAnnouncementText = t(sourceMovedAnnouncement);
  const horizontalDistanceLabelText = t(horizontalDistanceLabel);
  const verticalDistanceLabelText = t(verticalDistanceLabel);
  const antenna1AngleSetterText = t(antenna1AngleSetter);
  const antenna2AngleSetterText = t(antenna2AngleSetter);
  const sinLeftText = t(sinLeft);
  const sinRightText = t(sinRight);
  const forThisTriangleText = t(forThisTriangle);

  // Update scale on window resize.
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = containerWidth / VIRTUAL_WIDTH;
        setScale(newScale);
        setDisplayHeight(VIRTUAL_HEIGHT * newScale);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // On mount, update the source based on preset angles.
  useEffect(() => {
    updateSourceFromPreset(angle1, 0);
  }, []); // only on mount

  // ARIA announcement.
  const announce = (message: string) => {
    if (message !== lastAnnouncement) {
      const announcementEl = document.getElementById('signal-triangulation-live');
      if (announcementEl) {
        announcementEl.textContent = message;
        setLastAnnouncement(message);
      }
    }
  };

  const handleFirstFocus = () => {
    if (isFirstInteraction) {
      announce(interactiveInstructionsText);
      setIsFirstInteraction(false);
    }
  };

  // Utility: calculate the distance between two points.
  const calculateDistance = (p1: Point, p2: Point): number => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.ceil(100 * Math.sqrt(dx * dx + dy * dy) / GRID_SCALE);
  };

  // Utility: calculate the angle between vectors.
  const calculateAngle = (center: Point, p1: Point, p2: Point): number => {
    const v1x = p1.x - center.x;
    const v1y = p1.y - center.y;
    const v2x = p2.x - center.x;
    const v2y = p2.y - center.y;
    const dotProduct = v1x * v2x + v1y * v2y;
    const mag1 = Math.sqrt(v1x * v1x + v1y * v1y);
    const mag2 = Math.sqrt(v2x * v2x + v2y * v2y);
    const denominator = mag1 * mag2 || 0.0001;
    const cosTheta = Math.max(-1, Math.min(1, dotProduct / denominator));
    const theta = (Math.acos(cosTheta) * 180) / Math.PI;
    return isNaN(theta) ? 0 : theta;
  };

  const getMousePos = (canvas: HTMLCanvasElement, evt: React.MouseEvent): Point => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  };

  // Measurements computed from current points.
  const baseDistance = calculateDistance(antennas[0], antennas[1]);
  const angleA = calculateAngle(antennas[0], antennas[1], source);
  const angleB = calculateAngle(antennas[1], antennas[0], source);
  const angleC = 180 - angleA - angleB;
  const distanceA = calculateDistance(antennas[0], source);
  const distanceB = calculateDistance(antennas[1], source);

  // Handle only source movement now
  const handleSourceMove = (newPos: Point) => {
    // Ensure the source is not too high so the label doesn't go off-screen.
    const newY = Math.max(30, Math.min(newPos.y, VIRTUAL_HEIGHT * 0.4));
    const newX = Math.max(MARGIN, Math.min(newPos.x, VIRTUAL_WIDTH - MARGIN));
    setSource({ x: newX, y: newY });
    const announcement =
      sourceMovedAnnouncementText +
      ' ' +
      (newX / GRID_SCALE).toFixed(2) +
      ' ' +
      horizontalDistanceLabelText +
      ', ' +
      ((BASE_Y - newY) / GRID_SCALE).toFixed(2) +
      ' ' +
      verticalDistanceLabelText;
    announce(announcement);
  };

  // Mouse and touch event handlers.
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const pos = getMousePos(canvasRef.current, e);
    const dx = pos.x - source.x;
    const dy = pos.y - source.y;
    if (Math.hypot(dx, dy) < 15) {
      setIsDragging(true);
      setSelectedAntenna('source');
    }
    // Removed antenna selection code
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || selectedAntenna !== 'source' || !canvasRef.current) return;
    const pos = getMousePos(canvasRef.current, e);
    handleSourceMove(pos);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedAntenna(null);
  };

  // Removed e.preventDefault() calls and let CSS (touchAction: 'none') handle the behavior.
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseDown(mouseEvent as unknown as React.MouseEvent<HTMLCanvasElement>);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseMove(mouseEvent as unknown as React.MouseEvent<HTMLCanvasElement>);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleSourceKeyDown = (e: React.KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft') {
      setSource((prev) => ({ ...prev, x: Math.max(MARGIN, prev.x - KEYBOARD_STEP) }));
    } else if (e.key === 'ArrowRight') {
      setSource((prev) => ({ ...prev, x: Math.min(VIRTUAL_WIDTH - MARGIN, prev.x + KEYBOARD_STEP) }));
    } else if (e.key === 'ArrowUp') {
      setSource((prev) => ({ ...prev, y: Math.max(30, prev.y - KEYBOARD_STEP) }));
    } else if (e.key === 'ArrowDown') {
      setSource((prev) => ({ ...prev, y: Math.min(VIRTUAL_HEIGHT * 0.4, prev.y + KEYBOARD_STEP) }));
    }
  };

  // Update source based on preset angles.
  const updateSourceFromPreset = (newAngle: number, antennaIndex: number) => {
    let newAngle1 = angle1;
    let newAngle2 = angle2;
    if (antennaIndex === 0) {
      newAngle1 = newAngle;
      setAngle1(newAngle);
    } else {
      newAngle2 = newAngle;
      setAngle2(newAngle);
    }
    const r1 = (newAngle1 * Math.PI) / 180;
    const r2 = (newAngle2 * Math.PI) / 180;
    // Solve for t1 from:
    // A1.x + t1*cos(r1) = A2.x - (sin(r1)/sin(r2))*t1*cos(r2)
    const t1 = (antennas[1].x - antennas[0].x) / (Math.cos(r1) + (Math.sin(r1) * Math.cos(r2)) / Math.sin(r2));
    const newSrc = {
      x: antennas[0].x + t1 * Math.cos(r1),
      y: BASE_Y - t1 * Math.sin(r1),
    };
    setSource(newSrc);
  };

  // Helper function to draw an arc representing an angle at a vertex.
  const drawAngleArc = (
    ctx: CanvasRenderingContext2D,
    center: Point,
    p1: Point,
    p2: Point,
    radius: number,
    label: string,
  ) => {
    const angle1 = Math.atan2(p1.y - center.y, p1.x - center.x);
    const angle2 = Math.atan2(p2.y - center.y, p2.x - center.x);
    let diff = angle2 - angle1;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    const anticlockwise = diff < 0;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, angle1, angle1 + diff, anticlockwise);
    ctx.strokeStyle = '#FFD700';
    ctx.stroke();
    const midAngle = angle1 + diff / 2;
    const offsetForLabel = 20; // extra spacing inward from the arc
    const labelX = center.x + (radius + 2 * offsetForLabel) * Math.cos(midAngle);
    const labelY = center.y + (radius + offsetForLabel) * Math.sin(midAngle);
    ctx.fillStyle = '#FFD700';
    ctx.font = '16px avenir-next';
    ctx.textAlign = 'center';
    ctx.fillText(label, labelX, labelY);
  };

  // Canvas drawing.
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background.
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);    

    // Draw horizontal base line between antennas with marker padding.
    const leftX = antennas[0].x + markerPadding;
    const rightX = antennas[1].x - markerPadding;
    ctx.beginPath();
    ctx.moveTo(leftX, antennas[0].y);
    ctx.lineTo(rightX, antennas[1].y);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
    const midX = (leftX + rightX) / 2;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px avenir-next';
    ctx.textAlign = 'center';
    // Label for the base (side c)
    ctx.fillText(`c: ${baseDistance.toFixed(2)} ${distanceText}`, midX, BASE_Y + 25);

    // Draw lines from antennas to source and add rotated distance labels.
    antennas.forEach((antenna, index) => {
      ctx.beginPath();
      ctx.moveTo(antenna.x, antenna.y);
      ctx.lineTo(source.x, source.y);
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.stroke();

      const distanceVal = calculateDistance(antenna, source);
      const midXLine = (antenna.x + source.x) / 2;
      const midYLine = (antenna.y + source.y) / 2;
      let angleLine = Math.atan2(source.y - antenna.y, source.x - antenna.x);
      const angleDeg = (angleLine * 180) / Math.PI;
      if (angleDeg > 90 || angleDeg < -90) {
        angleLine += Math.PI;
      }
      const offset = 10;
      ctx.save();
      ctx.translate(midXLine, midYLine);
      ctx.rotate(angleLine);
      // For the line from A1 to source, label as side b; from A2 to source, label as side a.
      const sideLabel = index === 0 ? 'b' : 'a';
      ctx.fillStyle = '#FFD700';
      ctx.font = '16px avenir-next';
      ctx.textAlign = 'center';
      ctx.fillText(`${sideLabel}: ${distanceVal.toFixed(2)} ${distanceText}`, 0, -offset);
      ctx.restore();
    });

    // Draw the angle arcs for each vertex of the triangle.
    const arcRadius = 30;
    // For antenna A1
    drawAngleArc(ctx, antennas[0], antennas[1], source, arcRadius, `A: ${angleA.toFixed(2)}°`);
    // For antenna A2
    drawAngleArc(ctx, antennas[1], antennas[0], source, arcRadius, `B: ${angleB.toFixed(2)}°`);
    // For the source vertex (label only as "C")
    drawAngleArc(ctx, source, antennas[0], antennas[1], arcRadius, 'C');

    // Draw antenna markers and labels.
    antennas.forEach((antenna) => {
      const label = antenna.id === 'A!' ? t(antenna1Label) : t(antenna2Label)
      ctx.beginPath();
      ctx.moveTo(antenna.x - 10, antenna.y);
      ctx.lineTo(antenna.x + 10, antenna.y);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(antenna.x, antenna.y);
      ctx.lineTo(antenna.x, antenna.y - 20);
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px avenir-next';
      ctx.textAlign = 'center';
      ctx.fillText(stripHTML(label), antenna.x, antenna.y + 20);
    });

    // Draw the signal source.
    ctx.beginPath();
    ctx.arc(source.x, source.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#FFD700';
    ctx.font = '16px avenir-next';
    ctx.textAlign = 'center';
    // Ensure the source label remains on-screen by adjusting its vertical placement.
    let sourceLabelY = source.y - 15;
    if (sourceLabelY < 15) {
      sourceLabelY = source.y + 15;
    }
    ctx.fillText(stripHTML(sourceLabelText), source.x, sourceLabelY);
  }, [antennas, source, selectedAntenna, angleA, angleB, baseDistance, sourceLabelText, distanceText, t]);

  return (
    // Outer container with onWheel handler for mouse scrolling.
    <div
      className="w-full max-w-4xl bg-gray-900 rounded-lg"
      style={{ overflowY: 'auto' }}
      role="region"
      aria-label={t(interaction.ariaLabel)}
    >
      <style>{`
        .overlay-button {
          pointer-events: none;
        }
        .overlay-button:focus {
          pointer-events: auto;
          outline: 2px dashed #FFD700;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

      <div id="signal-triangulation-live" className="sr-only" role="status" aria-live="polite"></div>

      <div className="p-4 space-y-4">
        {/* Canvas container */}
        <div
          ref={containerRef}
          style={{ position: 'relative', width: '100%', height: displayHeight }}
          onFocus={handleFirstFocus}
        >
          <canvas
            ref={canvasRef}
            width={VIRTUAL_WIDTH}
            height={VIRTUAL_HEIGHT}
            style={{ width: '100%', height: '100%', touchAction: 'none' }}
            className="rounded-lg cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <button
            type="button"
            tabIndex={0}
            aria-label={sourceLabelText + '. ' + sourceButtonInstructionsText}
            onKeyDown={handleSourceKeyDown}
            onFocus={handleFirstFocus}
            className="overlay-button"
            style={{
              position: 'absolute',
              left: source.x * scale - 15,
              top: source.y * scale - 15,
              width: 30,
              height: 30,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span className="sr-only">{stripHTML(sourceLabelText)}</span>
          </button>
          {antennas.map((antenna, index) => (
            <div
              key={antenna.id}
              aria-label={stripHTML(index === 0 ? antenna1LabelText : antenna2LabelText)}
              style={{
                position: 'absolute',
                left: antenna.x * scale - 15,
                top: antenna.y * scale - 15,
                width: 30,
                height: 30,
              }}
            >
              <span className="sr-only">{stripHTML(index === 0 ? antenna1LabelText : antenna2LabelText)}</span>
            </div>
          ))}
        </div>

        {/* New Preset Controls */}
        <div className="flex flex-col md:flex-col lg:flex-row justify-around items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold text-white">{antenna1AngleSetterText}</h4>
            <div className="flex gap-2 mt-2">
              {[30, 45, 60].map((preset) => (
                <button
                  key={`a1-${preset}`}
                  onClick={() => updateSourceFromPreset(preset, 0)}
                  className={`px-4 py-2 rounded-lg text-base font-bold transition-all bg-white ${
                    preset.toFixed(2) === angleA.toFixed(2) ? 'text-[#0055B2]' : 'text-black'
                  }`}
                >
                  {preset}°
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold text-white">{antenna2AngleSetterText}</h4>
            <div className="flex gap-2 mt-2">
              {[30, 45, 60].map((preset) => (
                <button
                  key={`a2-${preset}`}
                  onClick={() => updateSourceFromPreset(preset, 1)}
                  className={`px-4 py-2 rounded-lg text-base font-bold transition-all bg-white ${
                    preset.toFixed(2) === angleB.toFixed(2) ? 'text-[#0055B2]' : 'text-black'
                  }`}
                >
                  {preset}°
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drag instructions and reset button */}
        <div className="text-gray-300 flex justify-between items-center">
          <p>{dragInstructionsText}</p>
          <button
            onClick={() => {
              setSource(initialSource);
              setAngle1(45);
              setAngle2(45);
            }}
            aria-label={resetButtonText}
            disabled={resetDisabled}
            className={`${ButtonCommonClasses} ${resetDisabled ? ButtonSecondaryClasses.disabled : ButtonSecondaryClasses.enabled}`}
          >
            {resetButtonText}
          </button>
        </div>

        {/* Measurements section */}
        {showDescriptionState && (
          <div
            className="p-4 bg-white rounded-lg overflow-hidden"
            role="region"
            aria-label={measurementsTitleText}
          >
            <div className="text-lg font-bold mb-3">{forThisTriangleText}</div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-y-2 gap-x-1">
              {/* First fraction */}
              <div className="flex items-center">
                <div className="flex flex-col items-center mx-1 min-w-[70px]">
                  <div className="text-center">
                    <span className="text-[#677600]">{distanceB.toFixed(2)}</span>
                  </div>
                  <div className="text-center border-t border-gray-500 pt-0.5">
                    <span className="text-[#8E24AA]" style={{ fontFamily: 'Besley' }}>
                      {sinLeftText}
                    </span>
                    <span className="text-[#008217]">{angleA.toFixed(2)}°</span>
                    {sinRightText}
                  </div>
                </div>
                <span className="mx-1">=</span>
              </div>

              {/* Second fraction */}
              <div className="flex items-center">
                <div className="flex flex-col items-center mx-1 min-w-[70px]">
                  <div className="text-center">
                    <span className="text-[#00749D]">{distanceA.toFixed(2)}</span>
                  </div>
                  <div className="text-center border-t border-gray-500 pt-0.5">
                    <span className="text-[#8E24AA]" style={{ fontFamily: 'Besley' }}>
                      {sinLeftText}
                    </span>
                    <span className="text-[#0061FC]">{angleB.toFixed(2)}°</span>
                    {sinRightText}
                  </div>
                </div>
                <span className="mx-1">=</span>
              </div>

              {/* Third fraction */}
              <div className="flex items-center">
                <div className="flex flex-col items-center mx-1 min-w-[70px]">
                  <div className="text-center">
                    <span className="text-[#E0002B]">{baseDistance.toFixed(2)}</span>
                  </div>
                  <div className="text-center border-t border-gray-500 pt-0.5">
                    <span className="text-[#8E24AA]" style={{ fontFamily: 'Besley' }}>
                      {sinLeftText}
                    </span>
                    <span className="text-[#DB0072]">{angleC.toFixed(2)}°</span>
                    {sinRightText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalTriangulation;
