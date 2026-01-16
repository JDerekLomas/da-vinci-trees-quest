import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/maya-measures';

interface Point {
  x: number;
  y: number;
}

function format<T extends Record<string, string | number>>(template: string, values: T): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key].toString() : match,
  );
}

const MayaStructureAnalysisTool = () => {
  const { t } = useTranslations();

  const {
    hideGuide,
    showGuide,
    dataLegend,
    scaleLegend,
    addPoint,
    reset,
    selectedPoints,
    deletePoint,
    status,
    statusDescription1,
    statusDescription2,
    measurementLabel,
    perimeter,
    area,
    ratio,
    rightAngles,
    yes,
    no,
    insights,
    insightsDescription1,
    insightsDescription2,
    objetiveLabel,
    objetiveDescription,
    successLabel,
    successDescription,
    nextStep,
    nextStepDescription,
    canvasDescription,
  } = interaction.translations;

  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [guideMode, setGuideMode] = useState(false);
  const [hoveredCoords, setHoveredCoords] = useState<{
    x: number;
    y: number;
    archX: number;
    archY: number;
  } | null>(null);
  const [measurements, setMeasurements] = useState({
    perimeter: 0,
    perimeterFt: 0,
    area: 0,
    areaFt: 0,
    ratio: 0,
    angles: Array<number>(),
    hasRightAngles: false,
    sides: Array<{ length: string; pointIndexes: number[]; direction: string }>(), // Store side lengths and directions
  });
  const [animationPoint, setAnimationPoint] = useState<{
    x: number;
    y: number;
    time: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const xInputRef = useRef<HTMLInputElement>(null);
  const yInputRef = useRef<HTMLInputElement>(null);

  // Canvas dimensions
  const canvasWidth = 600;
  const canvasHeight = 400;
  const archX = 16;
  const archY = 0;
  const canvasX = archX / 0.5 + canvasWidth / 2;
  const canvasY = canvasHeight / 2 - archY / 0.5;
  const templeCenter = { x: canvasX, y: canvasY };
  const templeWidth = 200;
  const templeHeight = 100;
  const templeCorners = [
    { x: templeCenter.x - templeWidth / 2, y: templeCenter.y - templeHeight / 2 },
    { x: templeCenter.x + templeWidth / 2, y: templeCenter.y - templeHeight / 2 },
    { x: templeCenter.x + templeWidth / 2, y: templeCenter.y + templeHeight / 2 },
    { x: templeCenter.x - templeWidth / 2, y: templeCenter.y + templeHeight / 2 },
  ];

  // Generate LIDAR data when component mounts
  useEffect(() => {
    generateBackgroundPoints();
  }, []);

  // Calculate measurements when points change
  useEffect(() => {
    if (points.length > 2) {
      calculateMeasurements();
    } else {
      setMeasurements({
        perimeter: 0,
        perimeterFt: 0,
        area: 0,
        areaFt: 0,
        ratio: 0,
        angles: [],
        hasRightAngles: false,
        sides: [],
      });
      setShowSuccess(false);
    }
  }, [points]);

  // Handle point animation
  useEffect(() => {
    if (animationPoint) {
      const timeout = setTimeout(() => {
        setAnimationPoint(null);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [animationPoint]);

  // Calculate point-to-point distances
  const [pointDistances, setPointDistances] = useState<Array<{ from: number; to: number; distance: string }>>([]);

  // Update point distances whenever points change
  useEffect(() => {
    const distances = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        distances.push({
          from: i,
          to: j,
          distance: calculateDistance(points[i], points[j]).toFixed(1),
        });
      }
    }
    setPointDistances(distances);
  }, [points]);

  // Draw on canvas when relevant state changes
  useEffect(() => {
    drawCanvas();
  }, [
    backgroundImage,
    points,
    hoveredPoint,
    hoveredCoords,
    animationPoint,
    guideMode,
    measurements,
    pointDistances,
  ]);

  const generateBackgroundPoints = () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#1a2e44';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // Ground layer - clearer, more vibrant points
    ctx.fillStyle = 'rgba(120, 200, 255, 0.6)';
    // Draw a temple-like structure (rectangle with 2:1 ratio)
    const centerX = templeCenter.x;
    const centerY = templeCenter.y;
    const width = 200;
    const height = 100;
    // Create points for the temple structure
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      // Main platform area
      const inMainPlatform =
        x > centerX - width / 2 && x < centerX + width / 2 && y > centerY - height / 2 && y < centerY + height / 2;
      // Add more density at corners for better visibility
      const nearCorner =
        (Math.abs(x - (centerX - width / 2)) < 15 && Math.abs(y - (centerY - height / 2)) < 15) || // Top-left
        (Math.abs(x - (centerX + width / 2)) < 15 && Math.abs(y - (centerY - height / 2)) < 15) || // Top-right
        (Math.abs(x - (centerX + width / 2)) < 15 && Math.abs(y - (centerY + height / 2)) < 15) || // Bottom-right
        (Math.abs(x - (centerX - width / 2)) < 15 && Math.abs(y - (centerY + height / 2)) < 15); // Bottom-left
      // Set brightness based on feature - more vibrant cyan color scheme
      if (nearCorner) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.9)'; // Brighter cyan for corners
        ctx.fillRect(x, y, 2, 2);
      } else if (inMainPlatform) {
        ctx.fillStyle = 'rgba(0, 210, 255, 0.8)'; // Bright cyan-blue for platform
        ctx.fillRect(x, y, 1.5, 1.5);
      } else {
        ctx.fillStyle = 'rgba(100, 180, 255, 0.3)'; // Subtler blue for surroundings
        ctx.fillRect(x, y, 1, 1);
      }
    }
    setBackgroundImage(canvas.toDataURL());
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !backgroundImage) return;
    const ctx = canvas.getContext('2d')!;

    // Draw background image
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      // Draw coordinate axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
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
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      // Draw vertical grid lines with reduced scale (every 100 feet instead of 82)
      for (let x = 0; x <= canvasWidth; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
        // Update coordinate labels with reduced scale
        if (x !== canvasWidth / 2) {
          const coordX = x - canvasWidth / 2;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.font = '10px Arial';
          ctx.fillText(`${coordX} ft`, x, canvasHeight / 2 + 15);
        }
      }
      // Draw horizontal grid lines with reduced scale
      for (let y = 0; y <= canvasHeight; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
        // Update coordinate labels with reduced scale
        if (y !== canvasHeight / 2) {
          const coordY = canvasHeight / 2 - y;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.font = '10px Arial';
          ctx.fillText(`${coordY} ft`, canvasWidth / 2 + 10, y);
        }
      }
      // Draw origin label (0,0)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '10px Arial';
      ctx.fillText('(0,0)', canvasWidth / 2 + 10, canvasHeight / 2 + 15);
      // Draw guide mode indicators if enabled
      if (guideMode) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(templeCenter.x - templeWidth / 2, templeCenter.y - templeHeight / 2, templeWidth, templeHeight);
        ctx.stroke();
        // Draw corner indicators
        templeCorners.forEach((corner) => {
          ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
          ctx.beginPath();
          ctx.arc(corner.x, corner.y, 8, 0, Math.PI * 2);
          ctx.fill();
        });
      } // Draw lines between points to form a polygon
      if (points.length > 1) {
        // Sort points in clockwise order around their center for consistent drawing
        const sortedPoints = sortPointsClockwise(points);

        // Draw the outer edges with solid lines
        ctx.strokeStyle = '#4cc2ff'; // Match blue color from Path Partition tool
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sortedPoints[0].x, sortedPoints[0].y);

        // Connect all points in clockwise order
        for (let i = 1; i < sortedPoints.length; i++) {
          ctx.lineTo(sortedPoints[i].x, sortedPoints[i].y);
        }

        // Always close the shape by connecting back to the first point
        if (sortedPoints.length > 2) {
          ctx.lineTo(sortedPoints[0].x, sortedPoints[0].y);

          // Fill with semi-transparent color
          ctx.fillStyle = showSuccess ? 'rgba(16, 185, 129, 0.3)' : 'rgba(76, 194, 255, 0.2)'; // Green if successful, cyan otherwise
          ctx.fill();
        }
        ctx.stroke(); // Draw diagonal connections with dotted lines (for polygons with 4+ points)
        if (sortedPoints.length > 3) {
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 1;

          // For a quadrilateral (4 points), just draw the diagonals
          if (sortedPoints.length === 4) {
            // Draw diagonal from point 0 to point 2
            ctx.beginPath();
            ctx.moveTo(sortedPoints[0].x, sortedPoints[0].y);
            ctx.lineTo(sortedPoints[2].x, sortedPoints[2].y);
            ctx.stroke();

            // Draw diagonal from point 1 to point 3
            ctx.beginPath();
            ctx.moveTo(sortedPoints[1].x, sortedPoints[1].y);
            ctx.lineTo(sortedPoints[3].x, sortedPoints[3].y);
            ctx.stroke();
          } else {
            // For polygons with more than 4 points, connect all non-adjacent points
            for (let i = 0; i < sortedPoints.length - 2; i++) {
              // Connect to all non-adjacent points with higher indices (to avoid drawing each diagonal twice)
              for (let j = i + 2; j < sortedPoints.length - (i === 0 ? 1 : 0); j++) {
                ctx.beginPath();
                ctx.moveTo(sortedPoints[i].x, sortedPoints[i].y);
                ctx.lineTo(sortedPoints[j].x, sortedPoints[j].y);
                ctx.stroke();
              }
            }
          }

          // Reset line dash
          ctx.setLineDash([]);
        }
      }
      // Draw all point-to-point distances, even when fewer than 3 points
      if (points.length >= 2) {
        ctx.font = '11px Arial';
        // Draw direct distances between all points
        pointDistances.forEach((dist) => {
          const p1 = points[dist.from];
          const p2 = points[dist.to];
          // Calculate midpoint of the line
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          // Calculate perpendicular offset for label placement
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          if (length > 0) {
            // Normalize and rotate 90 degrees for perpendicular offset
            const offsetX = (-dy / length) * 15;
            const offsetY = (dx / length) * 15;
            // Draw measurement text with background
            const distLabel = `${dist.distance} ft`;
            // Draw connector line (dotted if not part of the polygon outline)
            const isPolygonEdge =
              points.length > 2 &&
              (dist.to === dist.from + 1 || (dist.from === 0 && dist.to === points.length - 1));
            if (!isPolygonEdge) {
              // Draw dotted line for non-edge connections
              ctx.setLineDash([3, 3]);
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.setLineDash([]);
            }
            // Draw text background
            ctx.fillStyle = 'rgba(26, 46, 68, 0.9)';
            const textWidth = ctx.measureText(distLabel).width;
            ctx.fillRect(midX + offsetX - 3, midY + offsetY - 12, textWidth + 6, 18);
            // Draw text
            ctx.fillStyle = '#ffffff';
            ctx.fillText(distLabel, midX + offsetX, midY + offsetY);
          }
        });
      } // Draw angle indicators for vertices
      if (points.length > 2 && measurements.angles.length === points.length) {
        // Use the same clockwise sorting as in the calculateMeasurements function
        const sortedPoints = sortPointsClockwise([...points]);

        for (let i = 0; i < sortedPoints.length; i++) {
          const angle = measurements.angles[i];
          const prevIndex = i === 0 ? sortedPoints.length - 1 : i - 1;
          const nextIndex = i === sortedPoints.length - 1 ? 0 : i + 1;
          const prevPoint = sortedPoints[prevIndex];
          const currentPoint = sortedPoints[i];
          const nextPoint = sortedPoints[nextIndex];
          // Draw angle arc
          const isRightAngle = angle - 90 === 0;
          // Calculate vectors
          const v1 = {
            x: prevPoint.x - currentPoint.x,
            y: prevPoint.y - currentPoint.y,
          };
          const v2 = {
            x: nextPoint.x - currentPoint.x,
            y: nextPoint.y - currentPoint.y,
          };
          // Normalize vectors for drawing the angle arc
          const v1Length = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
          const v2Length = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
          const v1Norm = {
            x: (v1.x / v1Length) * 20,
            y: (v1.y / v1Length) * 20,
          };
          const v2Norm = {
            x: (v2.x / v2Length) * 20,
            y: (v2.y / v2Length) * 20,
          };
          // Draw angle arc
          ctx.beginPath();
          // Draw right angle symbol if close to 90 degrees
          if (isRightAngle) {
            // Calculate midpoints of the angle vectors
            const mid1 = {
              x: currentPoint.x + v1Norm.x * 0.7,
              y: currentPoint.y + v1Norm.y * 0.7,
            };
            const mid2 = {
              x: currentPoint.x + v2Norm.x * 0.7,
              y: currentPoint.y + v2Norm.y * 0.7,
            };
            // Draw right angle symbol (small square)
            ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)'; // Yellow for right angles
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.lineTo(mid1.x, mid1.y);
            ctx.lineTo(mid1.x + mid2.x - currentPoint.x, mid1.y + mid2.y - currentPoint.y);
            ctx.lineTo(mid2.x, mid2.y);
            ctx.stroke();
          } else {
            // Get angle between vectors
            const startAngle = Math.atan2(v1.y, v1.x);
            const endAngle = Math.atan2(v2.y, v2.x);
            ctx.strokeStyle = 'rgba(255, 165, 0, 0.6)'; // Orange for non-right angles
            ctx.lineWidth = 1.5;
            ctx.beginPath();

            // We need to ensure we draw the interior angle (which is less than 180 degrees)
            // Determine if we need to draw clockwise or counterclockwise
            const crossProduct = v1.x * v2.y - v1.y * v2.x;
            const drawClockwise = crossProduct < 0;

            ctx.arc(currentPoint.x, currentPoint.y, 15, startAngle, endAngle, drawClockwise);
            ctx.stroke();
          }
          // Draw angle text
          ctx.fillStyle = 'rgba(255, 255, 255, 1)';
          ctx.font = '10px Arial';
          // Position the text away from the vertex
          const textVector = {
            x: (v1Norm.x + v2Norm.x) / 1.5,
            y: (v1Norm.y + v2Norm.y) / 1.5,
          };
          const textPos = {
            x: currentPoint.x + textVector.x * 1.5 - 10,
            y: currentPoint.y + textVector.y * 1.5 + 4,
          };
          ctx.fillText(`${angle.toFixed(1)}°`, textPos.x, textPos.y);
        }
      }
      // Draw hover coordinates
      if (hoveredCoords) {
        const ftX = hoveredCoords.archX;
        const ftY = hoveredCoords.archY;
        // Draw background box for coordinates
        ctx.fillStyle = 'rgba(26, 46, 68, 0.9)'; // Darker blue background
        ctx.fillRect(hoveredCoords.x + 10, hoveredCoords.y - 25, 100, 20);
        // Only display feet coordinates
        ctx.fillStyle = '#ffffff'; // White text
        ctx.font = '11px Arial';
        ctx.fillText(`(${ftX} ft, ${ftY} ft)`, hoveredCoords.x + 15, hoveredCoords.y - 10);
      }
      // Draw point placement animation
      if (animationPoint) {
        const progress = Math.min(1, (Date.now() - animationPoint.time) / 800);
        const radius = 20 * (1 - progress);
        const alpha = 1 - progress;
        ctx.strokeStyle = `rgba(76, 194, 255, ${alpha})`; // Cyan color
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(animationPoint.x, animationPoint.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Draw points
      points.forEach((point, i) => {
        // Draw delete button for each point
        ctx.fillStyle = 'rgba(220, 38, 38, 0.8)';
        ctx.beginPath();
        ctx.arc(point.x - 12, point.y - 12, 6, 0, Math.PI * 2);
        ctx.fill();
        // Draw X in delete button
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x - 15, point.y - 15);
        ctx.lineTo(point.x - 9, point.y - 9);
        ctx.moveTo(point.x - 9, point.y - 15);
        ctx.lineTo(point.x - 15, point.y - 9);
        ctx.stroke();
        // Draw the actual point
        ctx.fillStyle = showSuccess ? '#10b981' : '#4cc2ff';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fill();
        // Label points with indices
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText(`P${i + 1}`, point.x + 8, point.y + 4);
      });
    };
  };

  const transformPoints = (
    x: number,
    y: number,
    width1: number,
    height1: number,
    width2: number,
    height2: number,
  ) => {
    const tX = (x / width1) * width2;
    const tY = (y / height1) * height2;
    return { tX, tY };
  };

  // Add a new point when canvas is clicked
  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { tX, tY } = transformPoints(
      e.clientX - rect.left,
      e.clientY - rect.top,
      rect.width,
      rect.height,
      canvasWidth,
      canvasHeight,
    );

    // Round coordinates to match the same precision used in hover coordinates
    const x = Math.round(tX);
    const y = Math.round(tY);

    // Check if clicking on a delete button
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const dx = point.x - 12 - x;
      const dy = point.y - 12 - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 6) {
        // Delete this point
        const newPoints = [...points];
        newPoints.splice(i, 1);
        setPoints(newPoints);
        return;
      }
    }
    // Restrict to maximum 4 points
    if (points.length >= 4) {
      return;
    }
    // Add a new point
    setPoints([...points, { x, y }]);
    // Trigger animation
    setAnimationPoint({
      x,
      y,
      time: Date.now(),
    });
  };

  // Handle canvas mouse move with special handling for coordinate display
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // This ensures we see every integer value as we move the mouse
    const { tX, tY } = transformPoints(x, y, rect.width, rect.height, canvasWidth, canvasHeight);

    const roundedX = Math.round(tX);
    const roundedY = Math.round(tY);

    const exactX = Math.floor(roundedX - canvasWidth / 2);
    const exactY = Math.floor(canvasHeight / 2 - roundedY);
    // Update hover coordinates with the exact values
    setHoveredCoords({
      x: roundedX,
      y: roundedY,
      archX: exactX,
      archY: exactY,
    });
    // Check if hovering over any point
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const dx = point.x - x;
      const dy = point.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 10) {
        setHoveredPoint(i);
        return;
      }
    }
    setHoveredPoint(null);
  };

  // Handle canvas mouse leave
  const handleCanvasMouseLeave = () => {
    setHoveredCoords(null);
    setHoveredPoint(null);
  };

  // Handle input point submit
  const handleAddPoint = () => {
    if (xInputRef.current === null || yInputRef.current === null) return;
    // Restrict to maximum 4 points
    if (points.length >= 4) {
      return;
    }
    const inputPoint = {
      x: parseFloat(xInputRef.current.value ?? 0),
      y: parseFloat(yInputRef.current.value ?? 0),
    };
    if (isNaN(inputPoint.x) || isNaN(inputPoint.y)) {
      return;
    }

    const clamp = (n: number, minVal: number, maxValue: number) => {
      return Math.max(minVal, Math.min(n, maxValue));
    };

    if (inputPoint.x > 300 || inputPoint.x < -300 || inputPoint.y > 200 || inputPoint.y < -200) {
      xInputRef.current.value = clamp(inputPoint.x, -300, 300).toString();
      yInputRef.current.value = clamp(inputPoint.y, -200, 200).toString();
      return;
    }

    const x = inputPoint.x + canvasWidth / 2;
    const y = canvasHeight / 2 - inputPoint.y;
    const newPoint = { x, y };
    // Check if the point is already in the list
    const isDuplicate = points.some((point) => point.x === newPoint.x && point.y === newPoint.y);
    if (isDuplicate) {
      return;
    }
    setPoints((prev) => [...prev, newPoint]);
    setAnimationPoint({
      x: newPoint.x,
      y: newPoint.y,
      time: Date.now(),
    });
    // Clear input fields
    xInputRef.current.value = '';
    yInputRef.current.value = '';
  };

  // Calculate distance between two points in archaeological units
  const calculateDistance = (p1: Point, p2: Point) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Sort points in clockwise order around their center
  const sortPointsClockwise = (pts: Point[]) => {
    if (pts.length < 3) return pts;

    // Find the center point
    const center = pts.reduce(
      (acc, point) => ({
        x: acc.x + point.x / pts.length,
        y: acc.y + point.y / pts.length,
      }),
      { x: 0, y: 0 },
    );

    // Sort points clockwise
    return [...pts].sort((a, b) => {
      const angleA = Math.atan2(a.y - center.y, a.x - center.x);
      const angleB = Math.atan2(b.y - center.y, b.x - center.x);
      return angleA - angleB;
    });
  };

  // Calculate all measurements for the polygon
  const calculateMeasurements = () => {
    // Need at least 3 points for measurements
    if (points.length < 3) {
      setMeasurements({
        perimeter: 0,
        perimeterFt: 0,
        area: 0,
        areaFt: 0,
        ratio: 0,
        angles: [],
        hasRightAngles: false,
        sides: [],
      });
      return;
    }

    // Sort points in clockwise order around their center
    const sortedPoints = sortPointsClockwise(points);

    // Calculate perimeter and sides for the actual polygon using sorted points
    let perimeter = 0;
    const sides = [];
    for (let i = 0; i < sortedPoints.length; i++) {
      const p1 = sortedPoints[i];
      const p2 = sortedPoints[(i + 1) % sortedPoints.length];
      const distance = calculateDistance(p1, p2);
      // Store each side with direction information
      sides.push({
        length: distance.toFixed(1),
        pointIndexes: [i, (i + 1) % sortedPoints.length],
        direction: '', // Will be determined later for rectangles
      });

      perimeter += distance;
    } // Calculate area using the Shoelace formula for the actual polygon using sorted points
    let area = 0;
    for (let i = 0; i < sortedPoints.length; i++) {
      const j = (i + 1) % sortedPoints.length;
      area += sortedPoints[i].x * sortedPoints[j].y;
      area -= sortedPoints[j].x * sortedPoints[i].y;
    }
    area = Math.abs(area) / 2;
    // Calculate angles at each vertex
    const angles = [];
    let hasRightAngles = true; // Start assuming all angles are right angles
    for (let i = 0; i < sortedPoints.length; i++) {
      // Get the previous, current, and next points
      const prev = sortedPoints[(i - 1 + sortedPoints.length) % sortedPoints.length];
      const curr = sortedPoints[i];
      const next = sortedPoints[(i + 1) % sortedPoints.length];
      // Calculate vectors
      const v1 = { x: prev.x - curr.x, y: prev.y - curr.y };
      const v2 = { x: next.x - curr.x, y: next.y - curr.y }; // Calculate angle in radians using atan2 for better accuracy
      const angle1 = Math.atan2(v1.y, v1.x);
      const angle2 = Math.atan2(v2.y, v2.x);

      // Calculate the interior angle between vectors
      let angleDiff = angle2 - angle1;

      // Normalize angle to be between -PI and PI
      while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      // Get the absolute angle (interior angle is always the smaller one)
      let angle = Math.abs(angleDiff * (180 / Math.PI));

      // Interior angle is what we need (the smaller angle between vectors)
      if (angle > 180) {
        angle = 360 - angle;
      }
      angles.push(angle);
      // If any angle is not a right angle, set hasRightAngles to false
      if (Math.abs(angle - 90) !== 0) {
        hasRightAngles = false;
      }
    } // Calculate ratio of length to width (only for 4-sided figures)
    let ratio = 0;
    if (sides.length === 4) {
      // Calculate the sides of the bounding rectangle
      const boundingSides = [];
      for (let i = 0; i < sortedPoints.length; i++) {
        const p1 = sortedPoints[i];
        const p2 = sortedPoints[(i + 1) % sortedPoints.length];
        const distance = calculateDistance(p1, p2);
        boundingSides.push(distance);
      }
      // Sort sides to identify lengths and widths
      const sortedSides = [...boundingSides].sort((a, b) => b - a);
      ratio = sortedSides[0] / sortedSides[2];
      // Update sides with labels for width and length
      for (let i = 0; i < sides.length; i++) {
        const sideLength = parseFloat(sides[i].length);
        // Determine if this side is closer to the length or width of the bounding rectangle
        if (Math.abs(sideLength - sortedSides[0]) < Math.abs(sideLength - sortedSides[2])) {
          sides[i].direction = 'length';
        } else {
          sides[i].direction = 'width';
        }
      }
    }

    setMeasurements({
      perimeter: perimeter,
      perimeterFt: perimeter,
      area: area,
      areaFt: area,
      ratio,
      angles,
      hasRightAngles,
      sides,
    });
  };
  useEffect(() => {
    // Check if the measurements have changed and trigger success check
    const checkSuccess = () => {
      if (points.length !== 4) {
        setShowSuccess(false);
        return;
      }
      const ratio = measurements.ratio;
      if (!(ratio > 1.9 && ratio < 2.1 && measurements.hasRightAngles)) return;
      const expectedArea = templeWidth * templeHeight;
      const areaError = Math.abs(measurements.area - expectedArea) / expectedArea;
      setShowSuccess(areaError < 0.15);
    };
    if (measurements) {
      checkSuccess();
    }
  }, [measurements]);

  // Reset the analysis
  const resetAnalysis = () => {
    setPoints([]);
    setShowSuccess(false);
    if (xInputRef.current) xInputRef.current.value = '';
    if (yInputRef.current) yInputRef.current.value = '';
  };

  // Convert canvas coordinates to "archaeological" coordinates in feet
  const canvasToArchCoords = (point: Point) => {
    // Use Math.floor to match the same calculation used in handleCanvasMouseMove
    // This ensures that hover coordinates and selected point coordinates match exactly
    const x = Math.floor(point.x - canvasWidth / 2);
    const y = Math.floor(canvasHeight / 2 - point.y); // Y is inverted in canvas
    return { x, y };
  };

  // Toggle guide mode
  const toggleGuideMode = () => {
    setGuideMode(!guideMode);
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-4">
      <span className="sr-only">{t(canvasDescription)}</span>
      <div className="w-full flex flex-col gap-4">
        {/* Canvas for drawing the points and measurements */}
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
              className="border border-gray-700 rounded cursor-crosshair w-full h-full"
            />
            <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-70 text-xs p-1 rounded">
              <span className="text-white">{t(dataLegend)}</span>
            </div>

            <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-xs p-1 rounded">
              <span className="text-white">{t(scaleLegend)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 xl:w-56">
            <div className="flex flex-col gap-2">
              <button
                onClick={toggleGuideMode}
                className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
              >
                {guideMode ? t(hideGuide) : t(showGuide)}
              </button>
              <div className="flex flex-row xl:flex-col gap-2">
                <div className="flex w-full gap-2">
                  <label htmlFor="coordX">
                    <span className="font-[Besley] text-[#8e24aa] italic">x</span>:{' '}
                  </label>
                  <input
                    ref={xInputRef}
                    name="x"
                    min={-300}
                    max={300}
                    type="number"
                    id="coordX"
                    className="w-full border border-[#333333] px-2 py-1 rounded"
                  />
                </div>
                <div className="flex w-full gap-2">
                  <label htmlFor="coordY">
                    <span className="font-[Besley] text-[#633300] italic">y</span>:{' '}
                  </label>
                  <input
                    ref={yInputRef}
                    name="y"
                    min={-200}
                    max={200}
                    type="number"
                    id="coordY"
                    className="w-full border border-[#333333] px-2 py-1 rounded"
                  />
                </div>
              </div>
              <div className="flex flex-row xl:flex-col gap-2">
                <button
                  className="w-full px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
                  onClick={handleAddPoint}
                >
                  {t(addPoint)}
                </button>
                <button
                  onClick={resetAnalysis}
                  className="w-full px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
                >
                  {t(reset)}
                </button>
              </div>
            </div>
            {/* Display selected points and their coordinates */}
            <div className="h-36">
              {points.length > 0 && (
                <>
                  <div className="font-semibold">{t(selectedPoints)}:</div>
                  <div className="flex flex-col gap-2 w-full max-h-28 overflow-y-auto pr-2">
                    {points.map((point, i) => {
                      const archCoords = canvasToArchCoords(point);
                      return (
                        <div
                          key={i}
                          className="p-1 rounded border border-[#333333] flex justify-between items-center"
                        >
                          <span>
                            P{i + 1}: ({archCoords.x} ft, {archCoords.y} ft)
                          </span>
                          <button
                            aria-label={t(deletePoint)}
                            onClick={() => {
                              const newPoints = [...points];
                              newPoints.splice(i, 1);
                              setPoints(newPoints);
                            }}
                            className="text-rose-400 hover:text-rose-200"
                          >
                            <IconTrash2 />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status and measurements panel */}
        <div className="grid grid-cols-2 gap-2">
          {/* Status section */}
          <div className={points.length >= 2 ? '' : 'col-span-2'}>
            <div className="font-semibold">{t(status)}:</div>
            <div>
              {points.length < 3
                ? format(t(statusDescription1), { numPoints: 3 - points.length })
                : format(t(statusDescription2), { numPoints: points.length })}
            </div>
          </div>

          {/* Measurements section */}
          {points.length > 2 && (
            <div className="row-span-2">
              <div className="font-semibold">{t(measurementLabel)}:</div>
              <div>
                {/* Only show these measurements if we have at least 3 points */}
                {points.length > 2 && (
                  <>
                    <div className="flex justify-between">
                      <span>{t(perimeter)}:</span>
                      <span>{Number(measurements.perimeterFt.toFixed(0))} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t(area)}:</span>
                      <span>{Number(measurements.areaFt.toFixed(0))} ft²</span>
                    </div>
                    {measurements.ratio !== 0 && (
                      <div className="flex justify-between">
                        <span>{t(ratio)} (L:W):</span>
                        <span>{Number(measurements.ratio.toFixed(2))}:1</span>
                      </div>
                    )}
                    {/* Display right angles information */}
                    {points.length === 4 && (
                      <div className="flex justify-between">
                        <span>{t(rightAngles)}:</span>
                        <span>{measurements.hasRightAngles ? t(yes) : t(no)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {/* Insights section */}
          {measurements.ratio !== 0 && measurements.ratio > 1.9 && measurements.ratio < 2.1 && (
            <div>
              <div className="font-semibold">{t(insights)}:</div>
              <p>{t(insightsDescription1)}</p>
              {measurements.hasRightAngles && <p className="">{t(insightsDescription2)}</p>}
            </div>
          )}
        </div>
        {/* Expedition objective */}
        {points.length === 0 && (
          <div>
            <div className="font-semibold">{t(objetiveLabel)}:</div>
            <p>{t(objetiveDescription)}</p>
          </div>
        )}
      </div>

      {/* Success message */}
      {showSuccess && (
        <div>
          <div className="font-semibold text-[#008217]">{t(successLabel)}</div>
          <p>{t(successDescription)}</p>
          <div className="font-semibold pt-4">{t(nextStep)}:</div>
          <p>{t(nextStepDescription)}</p>
        </div>
      )}
    </div>
  );
};

export default MayaStructureAnalysisTool;

const IconTrash2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    <line x1="10" x2="10" y1="11" y2="17"></line>
    <line x1="14" x2="14" y1="11" y2="17"></line>
  </svg>
);
