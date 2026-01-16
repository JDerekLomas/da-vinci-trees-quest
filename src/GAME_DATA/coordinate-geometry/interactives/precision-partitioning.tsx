import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/precision-partitioning';
import parse from 'html-react-parser';

interface Point {
  x: number;
  y: number;
}

function format<T extends Record<string, string | number>>(template: string, values: T): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key].toString() : match,
  );
}

const PartitioningInteractive = () => {
  const { t } = useTranslations();

  const {
    show,
    hide,
    point,
    reset,
    result,
    structure,
    formulaLabel,
    placementRatio,
    pointCoordinates,
    resultDescription,
    formulaDescription,
    placementRatioDescription,
    canvasDescription,
  } = interaction.translations;

  const [ratio1, setRatio1] = useState(1);
  const [ratio2, setRatio2] = useState(1);
  const [showStructure, setShowStructure] = useState(true);
  const [partitionRatio, setPartitionRatio] = useState(0.5);
  const [endPoint, setEndPoint] = useState({ x: 450, y: 200 });
  const [startPoint, setStartPoint] = useState({ x: 150, y: 200 });
  const [partitionPoint, setPartitionPoint] = useState<Point | null>(null);
  const [isDragging, setIsDragging] = useState<'start' | 'end' | null>(null);
  const [coordInputs, setCoordInputs] = useState({
    x1: Math.round((150 - 300) * 2),
    y1: Math.round((200 - 175) * -2),
    x2: Math.round((450 - 300) * 2),
    y2: Math.round((200 - 175) * -2),
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasWidth = 600;
  const canvasHeight = 350;

  // Update canvas points from input field coordinates
  useEffect(() => {
    const originX = canvasWidth / 2;
    const originY = canvasHeight / 2;
    const x1 = originX + coordInputs.x1 / 2;
    const y1 = originY - coordInputs.y1 / 2;
    const x2 = originX + coordInputs.x2 / 2;
    const y2 = originY - coordInputs.y2 / 2;

    setStartPoint({ x: x1, y: y1 });
    setEndPoint({ x: x2, y: y2 });
  }, [coordInputs]);

  // Calculate partition point
  useEffect(() => {
    if (startPoint && endPoint) {
      const m = ratio1 / (ratio1 + ratio2);
      setPartitionRatio(m);
      const px = startPoint.x + m * (endPoint.x - startPoint.x);
      const py = startPoint.y + m * (endPoint.y - startPoint.y);
      setPartitionPoint({ x: px, y: py });
    }
  }, [startPoint, endPoint, ratio1, ratio2]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0A1620';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawTerrainBackground(ctx);
    drawCoordinateGrid(ctx);

    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();

    const totalDistance = calculateDistance(startPoint, endPoint);
    const distanceAP = calculateDistance(startPoint, partitionPoint);
    const distancePB = calculateDistance(partitionPoint, endPoint);

    if (startPoint && endPoint) {
      const midX = (startPoint.x + endPoint.x) / 2 - 20;
      const midY = (startPoint.y + endPoint.y) / 2 + 35;

      // add doted white line between A to B with this distance text
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y + 30);
      ctx.lineTo(endPoint.x, endPoint.y + 30);
      ctx.stroke();
      ctx.setLineDash([]);
      // add small vertical line to the start point
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y + 25);
      ctx.lineTo(startPoint.x, startPoint.y + 35);
      ctx.stroke();
      // add small vertical line to the end point
      ctx.beginPath();
      ctx.moveTo(endPoint.x, endPoint.y + 25);
      ctx.lineTo(endPoint.x, endPoint.y + 35);
      ctx.stroke();

      // Add background to the distance text
      const distanceText = `${totalDistance} ft`;
      ctx.font = '12px Besley';
      const textMetrics = ctx.measureText(distanceText);
      const textWidth = textMetrics.width;
      const padding = 4;

      // Draw background rectangle
      ctx.fillStyle = '#0A1620';
      ctx.roundRect(midX - padding, midY - 12, textWidth + padding * 2, 16, 4);
      ctx.fill();

      // Draw text on top of background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText(distanceText, midX, midY);

      if (partitionPoint) {
        const distanceAPText = `${distanceAP} ft`;
        const distancePBText = `${distancePB} ft`;
        const textMetricsAP = ctx.measureText(distanceAPText);
        const textWidthAP = textMetricsAP.width;
        const textMetricsPB = ctx.measureText(distancePBText);
        const textWidthPB = textMetricsPB.width;
        const paddingAP = 4;
        const paddingPB = 4;

        const midAP_X = (startPoint.x + partitionPoint.x) / 2 - textWidthAP / 2 - paddingAP;
        const midAP_Y = (startPoint.y + partitionPoint.y) / 2 + 18;
        const midPB_X = (partitionPoint.x + endPoint.x) / 2 - textWidthPB / 2 - paddingPB;
        const midPB_Y = (partitionPoint.y + endPoint.y) / 2 + 18;

        // add doted white line between A to P and P to B with this distance text
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y + 15);
        ctx.lineTo(partitionPoint.x, partitionPoint.y + 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(partitionPoint.x, partitionPoint.y + 15);
        ctx.lineTo(endPoint.x, endPoint.y + 15);
        ctx.stroke();
        ctx.setLineDash([]);

        // add small vertical line to the start point
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y + 10);
        ctx.lineTo(startPoint.x, startPoint.y + 20);
        ctx.stroke();
        // add small vertical line to the end point
        ctx.beginPath();
        ctx.moveTo(endPoint.x, endPoint.y + 10);
        ctx.lineTo(endPoint.x, endPoint.y + 20);
        ctx.stroke();

        // add small vertical line to the partition point
        ctx.beginPath();
        ctx.moveTo(partitionPoint.x, partitionPoint.y + 10);
        ctx.lineTo(partitionPoint.x, partitionPoint.y + 20);
        ctx.stroke();

        // Add background to the distance text

        // Draw background rectangle
        ctx.fillStyle = '#0A1620';
        ctx.roundRect(midAP_X - paddingAP, midAP_Y - 12, textWidthAP + paddingAP * 2, 16, 4);
        ctx.fill();
        ctx.fillStyle = '#0A1620';
        ctx.roundRect(midPB_X - paddingPB, midPB_Y - 12, textWidthPB + paddingPB * 2, 16, 4);
        ctx.fill();
        // Draw text on top of background

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(`${distanceAP} ft`, midAP_X, midAP_Y);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(`${distancePB} ft`, midPB_X, midPB_Y);
      }
    }

    drawEndpoint(ctx, startPoint, 'A');
    drawEndpoint(ctx, endPoint, 'B');

    if (partitionPoint && showStructure) {
      drawMayaStructure(ctx, partitionPoint);
    }

    if (partitionPoint) {
      ctx.fillStyle = '#ff9900';
      ctx.beginPath();
      ctx.arc(partitionPoint.x, partitionPoint.y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Besley';
      ctx.fillText(
        `P - (${Math.round((partitionPoint.x - canvasWidth / 2) * 2)}, ${Math.round((canvasHeight / 2 - partitionPoint.y) * 2)})`,
        partitionPoint.x - 40,
        partitionPoint.y - 20,
      );
    }
  }, [startPoint, endPoint, partitionPoint, showStructure]);

  const drawTerrainBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * canvasHeight;
      const variance = 15;
      ctx.strokeStyle = '#3a7d44';
      ctx.beginPath();
      let lastY = y;
      ctx.moveTo(0, lastY);
      for (let x = 10; x < canvasWidth; x += 10) {
        lastY = lastY + (Math.random() * variance - variance / 2);
        ctx.lineTo(x, lastY);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
  };

  const drawMayaStructure = (ctx: CanvasRenderingContext2D, point: Point) => {
    const width = 30;
    const height = 40;

    const x = point.x - width / 2;
    const y = point.y - height / 2;

    // Draw temple base (platform)
    ctx.fillStyle = 'rgba(180, 140, 100, 0.7)';
    ctx.strokeStyle = 'rgba(110, 90, 60, 0.9)';
    ctx.lineWidth = 1;

    // Main platform
    ctx.beginPath();
    ctx.rect(x, y + height / 2, width, height / 2);
    ctx.fill();
    ctx.stroke();

    // Temple structure
    ctx.fillStyle = 'rgba(140, 110, 80, 0.8)';
    ctx.beginPath();

    // Pyramid shape
    ctx.moveTo(x + width * 0.2, y + height / 2);
    ctx.lineTo(x + width * 0.8, y + height / 2);
    ctx.lineTo(x + width * 0.65, y + height / 4);
    ctx.lineTo(x + width * 0.35, y + height / 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Temple top
    ctx.fillStyle = 'rgba(120, 90, 60, 0.8)';
    ctx.beginPath();
    ctx.rect(x + width * 0.35, y + height / 4 - 5, width * 0.3, 8);
    ctx.fill();
    ctx.stroke();
  };

  const drawCoordinateGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    // Origin at center
    const originX = canvasWidth / 2;
    const originY = canvasHeight / 2;
    // Draw X and Y axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(canvasWidth, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, canvasHeight);
    ctx.stroke();
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    // Vertical lines
    for (let x = 50; x < canvasWidth; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
      // Label with distance in feet
      if (x !== originX) {
        const distX = ((x - originX) * 2).toFixed(0);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px Besley';
        ctx.fillText(`${distX} ft`, x, originY + 15);
      }
    }
    // Horizontal lines
    for (let y = 50; y < canvasHeight; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
      // Label with distance in feet
      if (y !== originY) {
        const distY = ((originY - y) * 2).toFixed(0); // 2 feet per pixel
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px Besley';
        ctx.fillText(`${distY} ft`, originX + 5, y + 4);
      }
    }
    // Origin label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px Besley';
    ctx.fillText(`(0,0)`, originX + 5, originY + 15);
  };

  const drawEndpoint = (ctx: CanvasRenderingContext2D, point: Point, label: string) => {
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
    ctx.fill();
    // Label point with relative coordinates
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Besley';
    // Position labels to stay within visible area and avoid overlap
    const textX = point.x - 5;
    let textY;
    // Adjust label position based on point location
    if (point.y < 30) {
      textY = point.y + 25;
    } else {
      textY = point.y - 15;
    }
    // Use different formats for A and B
    if (label === 'A') {
      ctx.fillText(`A`, textX, textY);
    } else {
      ctx.fillText(`B`, textX, textY);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect()!;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const startX = (startPoint.x / canvasWidth) * rect.width;
    const startY = (startPoint.y / canvasHeight) * rect.height;
    // Check if clicking on start point
    const distToStart = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
    if (distToStart < 10) {
      setIsDragging('start');
      return;
    }
    const endX = (endPoint.x / canvasWidth) * rect.width;
    const endY = (endPoint.y / canvasHeight) * rect.height;
    // Check if clicking on end point
    const distToEnd = Math.sqrt(Math.pow(x - endX, 2) + Math.pow(y - endY, 2));
    if (distToEnd < 10) {
      setIsDragging('end');
      return;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect()!;
    // x and y shoulde be inside the canvas
    const x = Math.max(0, Math.min(((e.clientX - rect.left) / rect.width) * canvasWidth, canvasWidth));
    const y = Math.max(0, Math.min(((e.clientY - rect.top) / rect.height) * canvasHeight, canvasHeight));
    // Convert to relative coordinates (feet)
    const originX = canvasWidth / 2;
    const originY = canvasHeight / 2;
    const relX = Math.round((x - originX) * 2);
    const relY = Math.round((originY - y) * 2);
    if (isDragging === 'start') {
      setStartPoint({ x, y });
      setCoordInputs((prev) => ({ ...prev, x1: relX, y1: relY }));
    } else if (isDragging === 'end') {
      setEndPoint({ x, y });
      setCoordInputs((prev) => ({ ...prev, x2: relX, y2: relY }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseDown(mouseEvent as unknown as React.MouseEvent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseMove(mouseEvent as unknown as React.MouseEvent);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const calculateDistance = (point1: Point | null, point2: Point | null) => {
    if (!point1 || !point2) return 0;
    // Convert canvas pixel distance to archaeological feet (scale factor)
    const scaleFactor = 2;
    const dx = (point2.x - point1.x) * scaleFactor;
    const dy = (point2.y - point1.y) * scaleFactor;
    return Math.sqrt(dx * dx + dy * dy).toFixed(1);
  };

  const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Math.max(-500, Math.min(500, parseInt(value) || 0));
    setCoordInputs((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const resetPoints = () => {
    // Default coordinates using the relative coordinate system
    const defaultCoords = {
      x1: -300,
      y1: -50,
      x2: 300,
      y2: -50,
    };

    setCoordInputs(defaultCoords);
    setRatio1(1);
    setRatio2(1);
  };

  const toggleStructure = () => {
    setShowStructure(!showStructure);
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-4">
      <span className="sr-only">{t(canvasDescription)}</span>
      <div className="flex justify-between gap-2">
        <div className="w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="w-full">
            <div className=" font-medium mb-2">
              {t(point)} <span className="text-[#0061fc] font-[Besley]">A</span> - (
              <span className="text-[#8e24aa] font-[Besley] italic">x₁</span>,{' '}
              <span className="text-[#633300] font-[Besley] italic">y₁</span>)
            </div>
            <div className="flex space-x-3">
              <div>
                <label htmlFor="coordX1">
                  <span className="text-[#8e24aa] font-[Besley] italic">x₁</span>:
                </label>
                <input
                  id="coordX1"
                  type="number"
                  name="x1"
                  min={-500}
                  max={500}
                  value={coordInputs.x1}
                  onChange={handleCoordChange}
                  className="w-full border border-[#333333] px-2 py-1 rounded"
                />
              </div>
              <div>
                <label htmlFor="coordY1">
                  <span className="text-[#633300] font-[Besley] italic">y₁</span>:
                </label>
                <input
                  id="coordY1"
                  type="number"
                  name="y1"
                  min={-500}
                  max={500}
                  value={coordInputs.y1}
                  onChange={handleCoordChange}
                  className="w-full border border-[#333333] px-2 py-1 rounded"
                />
              </div>
            </div>
          </div>
          <div>
            <div className=" font-medium mb-2">
              {t(point)} <span className="text-[#008217] font-[Besley]">B</span> - (
              <span className="text-[#8e24aa] font-[Besley] italic">x₂</span>,{' '}
              <span className="text-[#633300] font-[Besley] italic">y₂</span>)
            </div>
            <div className="flex gap-2">
              <div>
                <label htmlFor="coordX2">
                  <span className="text-[#8e24aa] font-[Besley] italic">x₂</span>:
                </label>
                <input
                  id="coordX2"
                  type="number"
                  name="x2"
                  min={-500}
                  max={500}
                  value={coordInputs.x2}
                  onChange={handleCoordChange}
                  className="w-full border border-[#333333] px-2 py-1 rounded"
                />
              </div>
              <div>
                <label htmlFor="coordY2">
                  <span className="text-[#633300] font-[Besley] italic">y₂</span>:
                </label>
                <input
                  id="coordY2"
                  type="number"
                  name="y2"
                  min={-500}
                  max={500}
                  value={coordInputs.y2}
                  onChange={handleCoordChange}
                  className="w-full border border-[#333333] px-2 py-1 rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <button
            onClick={toggleStructure}
            className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
          >
            {showStructure ? t(hide) : t(show)} {t(structure)}
          </button>
          <button
            onClick={resetPoints}
            className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
          >
            {t(reset)}
          </button>
        </div>
      </div>

      <div>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full rounded cursor-grab"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="block font-semibold">{t(placementRatio)}:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                value={ratio1}
                onChange={(e) => setRatio1(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className="w-16 border border-[#333333] px-2 py-1 rounded"
                aria-label="a: "
              />
              <span>:</span>
              <input
                type="number"
                min="1"
                max="10"
                value={ratio2}
                onChange={(e) => setRatio2(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className="w-16 border border-[#333333] px-2 py-1 rounded"
                aria-label="b: "
              />
            </div>
            <p>{parse(format(t(placementRatioDescription), { ratio1, ratio2 }))}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-semibold">{t(pointCoordinates)}:</div>
            <div className="grid grid-cols-1 gap-2">
              <div className="font-[Besley]">
                {startPoint && (
                  <>
                    <span className="text-[#0061fc]">A</span> - (<span className="text-[#8e24aa] italic">x₁</span>,{' '}
                    <span className="text-[#633300] italic">y₁</span>) = (
                    {Math.round((startPoint.x - canvasWidth / 2) * 2)},{' '}
                    {Math.round((canvasHeight / 2 - startPoint.y) * 2)})
                  </>
                )}
              </div>
              <div className="font-[Besley]">
                {endPoint && (
                  <>
                    <span className="text-[#008217]">B</span> - (<span className="text-[#8e24aa] italic">x₂</span>,{' '}
                    <span className="text-[#633300] italic">y₂</span>) = (
                    {Math.round((endPoint.x - canvasWidth / 2) * 2)},{' '}
                    {Math.round((canvasHeight / 2 - endPoint.y) * 2)})
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">{t(formulaLabel)}:</div>
          <div className="flex flex-col gap-2">
            <div>{parse(format(t(formulaDescription), { ratio1, ratio2 }))}</div>
            <div className="text-center font-[Besley] flex items-center justify-center gap-2">
              <span className="text-[#DB0072] italic">P</span>
              <span>:</span>
              <span>(</span>
              <div className="flex flex-col items-center">
                <div className="border-b border-black pb-1">
                  <span className="text-[#00749D]">{ratio1}</span>
                  <span className="text-[#8e24aa] italic">x₂</span> +{' '}
                  <span className="text-[#677600]">{ratio2}</span>
                  <span className="text-[#8e24aa] italic">x₁</span>
                </div>
                <div className="pt-1">
                  <span className="text-[#00749D]">{ratio1}</span> +{' '}
                  <span className="text-[#677600]">{ratio2}</span>
                </div>
              </div>
              <span>,</span>
              <div className="flex flex-col items-center">
                <div className="border-b border-black pb-1">
                  <span className="text-[#00749D]">{ratio1}</span>
                  <span className="text-[#633300] italic">y₂</span> +{' '}
                  <span className="text-[#677600]">{ratio2}</span>
                  <span className="text-[#633300] italic">y₁</span>
                </div>
                <div className="pt-1">
                  <span className="text-[#00749D]">{ratio1}</span> +{' '}
                  <span className="text-[#677600]">{ratio2}</span>
                </div>
              </div>
              <span>)</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <div>
                  {t(result)} <span className="text-[#8e24aa] italic font-[Besley]">x</span>:{' '}
                  {partitionPoint ? Math.round((partitionPoint.x - canvasWidth / 2) * 2) : '—'}
                </div>
              </div>
              <div>
                <div>
                  {t(result)} <span className="text-[#633300] italic font-[Besley]">y</span>:{' '}
                  {partitionPoint ? Math.round((canvasHeight / 2 - partitionPoint.y) * 2) : '—'}
                </div>
              </div>
            </div>
          </div>

          <div>
            {parse(
              format(t(resultDescription), {
                partitionRatio: partitionRatio.toFixed(2),
                partitionRatioPercent: (partitionRatio * 100).toFixed(0),
                partitionX: partitionPoint ? Math.round((partitionPoint.x - canvasWidth / 2) * 2) : 0,
                partitionY: partitionPoint ? Math.round((canvasHeight / 2 - partitionPoint.y) * 2) : 0,
              }),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartitioningInteractive;
