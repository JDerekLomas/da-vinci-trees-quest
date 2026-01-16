import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/distance-formula';
import { GameContext } from '../../../contexts/GameContext';

interface Point {
  x: number;
  y: number;
}

const DistanceFormulaInteractive = () => {
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.['distance-formula'] && typeof interactiveResponses?.['distance-formula'] === 'object'
      ? (interactiveResponses?.['distance-formula'] as any)
      : undefined;

  const {
    pointA,
    pointB,
    showRightTriangle,
    hideRightTriangle,
    reset,
    canvasDescription,
    distanceCalculation,
    selectedPoints,
    pythagoreanTheoremEquation,
    distanceFormula,
    differencesEquation,
    distance,
  } = interaction.translations;

  const [points, setPoints] = useState<Point[]>(savedState?.points ?? []);
  const [showTriangle, setShowTriangle] = useState<boolean>(savedState?.showTriangle ?? true);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(
    savedState?.calculatedDistance ?? null,
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas dimensions
  const canvasWidth = 600;
  const canvasHeight = 400;

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // Clear canvas and set background
    ctx.fillStyle = '#1f2937'; // gray-800 background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw coordinate axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.stroke();

    // Draw coordinate grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = 0; x <= canvasWidth; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();

      // Draw coordinate labels
      if (x !== canvasWidth / 2) {
        const coordX = x - canvasWidth / 2;
        ctx.fillStyle = 'rgba(255, 255, 255)';
        ctx.font = '11px Besley';
        ctx.textAlign = 'center';
        ctx.fillText(`${coordX}`, x, canvasHeight / 2 + 15);
      }
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= canvasHeight; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();

      // Draw coordinate labels
      if (y !== canvasHeight / 2) {
        const coordY = canvasHeight / 2 - y;
        ctx.fillStyle = 'rgba(255, 255, 255)';
        ctx.font = '11px Besley';
        ctx.textAlign = 'center';
        ctx.fillText(`${coordY}`, canvasWidth / 2 + 10, y + 3);
      }
    }

    // Draw origin label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('(0,0)', canvasWidth / 2 + 10, canvasHeight / 2 + 15);

    // Convert coordinates to canvas coordinates
    const canvasToScreen = (point: Point) => ({
      x: point.x + canvasWidth / 2,
      y: canvasHeight / 2 - point.y,
    });

    // Draw points immediately when placed (even if only 1 point)
    if (points.length > 0) {
      points.forEach((point, index) => {
        const screenPoint = canvasToScreen(point);

        // Draw point with accessible colors
        ctx.fillStyle = index === 0 ? '#E0002B' : '#238B21'; // Red and Green with good contrast
        ctx.beginPath();
        ctx.arc(screenPoint.x, screenPoint.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw point label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Besley';
        ctx.textAlign = 'center';
        ctx.fillText(index === 0 ? 'A' : 'B', screenPoint.x, screenPoint.y + 4);

        // Draw coordinates
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '11px Besley';
        ctx.textAlign = 'left';
        ctx.fillText(`(${point.x}, ${point.y})`, screenPoint.x + 12, screenPoint.y - 8);
      });
    }

    // Draw connecting line, triangle, and distance only when we have 2 points
    if (points.length >= 2) {
      const pointA = canvasToScreen(points[0]);
      const pointB = canvasToScreen(points[1]);

      // Draw connecting line with accessible color
      ctx.strokeStyle = '#06B6D4'; // Cyan with good contrast
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.stroke();

      // Draw right triangle if enabled
      if (showTriangle) {
        const trianglePoint = { x: pointB.x, y: pointA.y };

        // Draw horizontal line with accessible color
        ctx.strokeStyle = '#3B82F6'; // Blue with good contrast
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(trianglePoint.x, trianglePoint.y);
        ctx.stroke();

        // Draw vertical line with accessible color
        ctx.strokeStyle = '#8B5CF6'; // Purple with good contrast
        ctx.beginPath();
        ctx.moveTo(trianglePoint.x, trianglePoint.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.stroke();

        // Reset line dash
        ctx.setLineDash([]);

        // Draw right angle indicator at the correct position (trianglePoint)
        ctx.strokeStyle = '#FFD700'; // Gold color with good contrast
        ctx.lineWidth = 3;
        const angleSize = 12;

        // Calculate the direction to draw the right angle marker correctly
        const dx = pointA.x - trianglePoint.x;
        const dy = pointB.y - trianglePoint.y;

        ctx.beginPath();
        // Draw the right angle marker in the correct quadrant
        if (dx >= 0 && dy >= 0) {
          // Bottom-right quadrant
          ctx.moveTo(trianglePoint.x + angleSize, trianglePoint.y);
          ctx.lineTo(trianglePoint.x + angleSize, trianglePoint.y + angleSize);
          ctx.lineTo(trianglePoint.x, trianglePoint.y + angleSize);
        } else if (dx < 0 && dy >= 0) {
          // Bottom-left quadrant
          ctx.moveTo(trianglePoint.x - angleSize, trianglePoint.y);
          ctx.lineTo(trianglePoint.x - angleSize, trianglePoint.y + angleSize);
          ctx.lineTo(trianglePoint.x, trianglePoint.y + angleSize);
        } else if (dx >= 0 && dy < 0) {
          // Top-right quadrant
          ctx.moveTo(trianglePoint.x + angleSize, trianglePoint.y);
          ctx.lineTo(trianglePoint.x + angleSize, trianglePoint.y - angleSize);
          ctx.lineTo(trianglePoint.x, trianglePoint.y - angleSize);
        } else {
          // Top-left quadrant
          ctx.moveTo(trianglePoint.x - angleSize, trianglePoint.y);
          ctx.lineTo(trianglePoint.x - angleSize, trianglePoint.y - angleSize);
          ctx.lineTo(trianglePoint.x, trianglePoint.y - angleSize);
        }
        ctx.stroke();

        // Label the sides with accessible colors
        ctx.fillStyle = '#FF6B6B'; // Red with good contrast
        ctx.font = 'bold 12px Besley';
        ctx.textAlign = 'center';

        // Horizontal distance label
        const horizontalMidX = (pointA.x + trianglePoint.x) / 2;
        const horizontalMidY = pointA.y - 10;
        const deltaX = Math.abs(points[1].x - points[0].x);
        ctx.fillText(`Δx = ${deltaX}`, horizontalMidX, horizontalMidY);

        // Vertical distance label
        const verticalMidX = trianglePoint.x + 10;
        const verticalMidY = (trianglePoint.y + pointB.y) / 2;
        const deltaY = Math.abs(points[1].y - points[0].y);
        ctx.fillText(`Δy = ${deltaY}`, verticalMidX, verticalMidY);
      }

      // Draw distance calculation if available
      if (calculatedDistance !== null) {
        const midX = (pointA.x + pointB.x) / 2;
        const midY = (pointA.y + pointB.y) / 2;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(midX - 50, midY - 15, 100, 25);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Besley';
        ctx.textAlign = 'center';
        ctx.fillText(`${t(distance)}: ${calculatedDistance.toFixed(2)}`, midX, midY);
      }
    }
  }, [points, showTriangle, calculatedDistance, distance, t]);

  // Draw on canvas when relevant state changes
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (points.length >= 2) return; // Only allow 2 points

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse coordinates to canvas coordinates
    const canvasX = (mouseX / rect.width) * canvasWidth;
    const canvasY = (mouseY / rect.height) * canvasHeight;

    // Convert canvas coordinates to coordinate system and round to whole numbers
    const coordX = Math.round(canvasX - canvasWidth / 2);
    const coordY = Math.round(canvasHeight / 2 - canvasY);

    const newPoint = { x: coordX, y: coordY };

    // Check if point already exists (with some tolerance)
    const exists = points.some((p) => Math.abs(p.x - coordX) < 10 && Math.abs(p.y - coordY) < 10);
    if (exists) return;

    const newPoints = [...points, newPoint];
    setPoints(newPoints);

    // Auto-calculate distance when we have 2 points
    if (newPoints.length === 2) {
      const [pointA, pointB] = newPoints;
      const dx = pointB.x - pointA.x;
      const dy = pointB.y - pointA.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setCalculatedDistance(distance);
    }
  };

  // Save state to interactiveResponses
  useEffect(() => {
    if (setInteractiveResponses) {
      const bothPointsPlaced = points.length >= 2;
      setInteractiveResponses((prev) => ({
        ...prev,
        'distance-formula': {
          points: JSON.stringify(points), // Serialize points to string for external state
          showTriangle,
          calculatedDistance,
          bothPointsPlaced,
        },
      }));
    }
  }, [points, showTriangle, calculatedDistance, setInteractiveResponses]);

  const resetInteractive = () => {
    setPoints([]);
    setShowTriangle(true);
    setCalculatedDistance(null);
    // State will be automatically updated via useEffect
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-4">
      <span className="sr-only">{t(canvasDescription)}</span>

      {/* Canvas for drawing the points and measurements */}
      <div className="flex flex-col xl:flex-row justify-between gap-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
            className="border border-gray-700 rounded cursor-crosshair w-full h-full"
          />
        </div>

        {/* Control Panel */}
        <div className="flex flex-col gap-2 xl:w-56">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowTriangle(!showTriangle)}
              disabled={points.length !== 2}
              className="w-full px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showTriangle ? t(hideRightTriangle) : t(showRightTriangle)}
            </button>

            <button
              onClick={resetInteractive}
              className="w-full px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
            >
              {t(reset)}
            </button>
          </div>

          {/* Display selected points and their coordinates */}
          <div className="h-36">
            {points.length > 0 && (
              <>
                <div className="font-semibold text-white">{t(selectedPoints)}</div>
                <div className="flex flex-col gap-2 w-full max-h-28 overflow-y-auto pr-2">
                  {points.map((point, i) => (
                    <div key={i} className="p-1 rounded border border-[#333333] flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${i === 0 ? 'bg-[#E0002B]' : 'bg-[#238B21]'}`} />
                        <span>
                          {i === 0 ? t(pointA) : t(pointB)}: ({point.x}, {point.y})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Distance Calculation Display - Row layout */}
      {calculatedDistance !== null && points.length === 2 && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="font-semibold mb-3 text-white">{t(distanceCalculation)}</div>

          <div className="grid gap-4 text-sm">
            {/* Delta Calculations */}
            <div dangerouslySetInnerHTML={{ __html: t(differencesEquation) }} />
            {/* Pythagorean Theorem */}
            <div dangerouslySetInnerHTML={{ __html: t(pythagoreanTheoremEquation) }} />
            <div dangerouslySetInnerHTML={{ __html: t(distanceFormula) }} />
            <div className="font-bold text-lg text-white">d = {calculatedDistance.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistanceFormulaInteractive;
