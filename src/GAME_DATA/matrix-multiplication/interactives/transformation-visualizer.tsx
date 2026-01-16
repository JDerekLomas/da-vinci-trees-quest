import React, { useState, useEffect, useRef } from 'react';
import { InteractionState } from './interface';

interface TransformationVisualizerProps {
  interaction: {
    initialShape?: 'square' | 'triangle';
    showGrid?: boolean;
    allowRotation?: boolean;
    allowScaling?: boolean;
  };
  onInteraction: (state: InteractionState) => void;
}

const TransformationVisualizer: React.FC<TransformationVisualizerProps> = ({ interaction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const showGrid = interaction.showGrid ?? true;
  const allowRotation = interaction.allowRotation ?? true;
  const allowScaling = interaction.allowScaling ?? true;

  // Rotation matrix values
  const cos = Math.cos(rotation * Math.PI / 180);
  const sin = Math.sin(rotation * Math.PI / 180);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
    }

    // Define original square vertices (centered at origin)
    const size = 60 * scale;
    const originalVertices = [
      [-size, -size],
      [size, -size],
      [size, size],
      [-size, size],
    ];

    // Apply transformation matrix
    const transformedVertices = originalVertices.map(([x, y]) => [
      x * cos - y * sin,
      x * sin + y * cos,
    ]);

    // Draw original shape (faded)
    ctx.strokeStyle = '#cbd5e1';
    ctx.fillStyle = 'rgba(203, 213, 225, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX + originalVertices[0][0], centerY + originalVertices[0][1]);
    for (let i = 1; i < originalVertices.length; i++) {
      ctx.lineTo(centerX + originalVertices[i][0], centerY + originalVertices[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw transformed shape
    ctx.strokeStyle = '#3b82f6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(centerX + transformedVertices[0][0], centerY + transformedVertices[0][1]);
    for (let i = 1; i < transformedVertices.length; i++) {
      ctx.lineTo(centerX + transformedVertices[i][0], centerY + transformedVertices[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw vertices
    transformedVertices.forEach(([x, y], i) => {
      ctx.beginPath();
      ctx.arc(centerX + x, centerY + y, 6, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? '#ef4444' : '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

  }, [rotation, scale, showGrid, cos, sin]);

  const handleAnimate = () => {
    setIsAnimating(true);
    let angle = 0;
    const interval = setInterval(() => {
      angle += 5;
      setRotation(angle);
      if (angle >= 360) {
        clearInterval(interval);
        setRotation(0);
        setIsAnimating(false);
      }
    }, 30);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Canvas */}
        <div className="flex-1">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="w-full max-w-[300px] mx-auto border border-gray-200 rounded-lg"
          />
        </div>

        {/* Controls and Matrix Display */}
        <div className="flex-1 space-y-4">
          {/* Transformation Matrix Display */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-semibold text-gray-600 mb-2">Transformation Matrix</div>
            <div className="flex items-center justify-center font-mono text-lg">
              <span className="text-2xl mr-1">[</span>
              <div className="flex flex-col">
                <div className="flex">
                  <span className="w-16 text-center text-blue-600">{cos.toFixed(2)}</span>
                  <span className="w-16 text-center text-red-600">{(-sin).toFixed(2)}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-center text-red-600">{sin.toFixed(2)}</span>
                  <span className="w-16 text-center text-blue-600">{cos.toFixed(2)}</span>
                </div>
              </div>
              <span className="text-2xl ml-1">]</span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {allowRotation && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotation: {rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isAnimating}
                />
              </div>
            )}

            {allowScaling && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scale: {scale.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            <button
              onClick={handleAnimate}
              disabled={isAnimating}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {isAnimating ? 'Animating...' : 'Animate Full Rotation'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-sm text-gray-500">
        The <span className="text-gray-400">dashed square</span> is the original shape.
        The <span className="text-blue-500">blue square</span> shows the transformation result.
      </div>
    </div>
  );
};

export default TransformationVisualizer;
