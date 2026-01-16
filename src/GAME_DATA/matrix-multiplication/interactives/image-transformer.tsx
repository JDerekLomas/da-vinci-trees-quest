import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InteractionState, ImageTransformerInteraction } from './interface';

interface Transform {
  type: string;
  label: string;
  matrix: number[][];
  color: string;
}

interface ImageTransformerProps {
  interaction: ImageTransformerInteraction;
  onInteraction: (state: InteractionState) => void;
}

const ImageTransformer: React.FC<ImageTransformerProps> = ({ interaction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [transformChain, setTransformChain] = useState<Transform[]>([]);
  const [showMath, setShowMath] = useState(true);

  // Preset transforms
  const presets: { [key: string]: Transform } = {
    rotate45: {
      type: 'rotate',
      label: 'Rotate 45°',
      matrix: [[Math.cos(Math.PI/4), -Math.sin(Math.PI/4)], [Math.sin(Math.PI/4), Math.cos(Math.PI/4)]],
      color: 'blue'
    },
    rotate90: {
      type: 'rotate',
      label: 'Rotate 90°',
      matrix: [[0, -1], [1, 0]],
      color: 'blue'
    },
    scale2x: {
      type: 'scale',
      label: 'Scale 2×',
      matrix: [[2, 0], [0, 2]],
      color: 'green'
    },
    scaleHalf: {
      type: 'scale',
      label: 'Scale 0.5×',
      matrix: [[0.5, 0], [0, 0.5]],
      color: 'green'
    },
    stretchX: {
      type: 'scale',
      label: 'Stretch X',
      matrix: [[1.5, 0], [0, 1]],
      color: 'green'
    },
    stretchY: {
      type: 'scale',
      label: 'Stretch Y',
      matrix: [[1, 0], [0, 1.5]],
      color: 'green'
    },
    shearRight: {
      type: 'shear',
      label: 'Shear →',
      matrix: [[1, 0.5], [0, 1]],
      color: 'purple'
    },
    shearUp: {
      type: 'shear',
      label: 'Shear ↑',
      matrix: [[1, 0], [0.5, 1]],
      color: 'purple'
    },
    flipX: {
      type: 'flip',
      label: 'Flip X',
      matrix: [[-1, 0], [0, 1]],
      color: 'orange'
    },
    flipY: {
      type: 'flip',
      label: 'Flip Y',
      matrix: [[1, 0], [0, -1]],
      color: 'orange'
    },
  };

  // Multiply two 2x2 matrices
  const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
    return [
      [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
      [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
    ];
  };

  // Get combined matrix from chain
  const getCombinedMatrix = useCallback((): number[][] => {
    if (transformChain.length === 0) return [[1, 0], [0, 1]];
    return transformChain.reduce((acc, t) => multiplyMatrices(t.matrix, acc), [[1, 0], [0, 1]] as number[][]);
  }, [transformChain]);

  const finalMatrix = getCombinedMatrix();

  // Draw sprite
  const drawSprite = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;

    const pixelSize = size / 8;
    const colors = { body: '#4F46E5', accent: '#818CF8', eyes: '#FFFFFF', pupils: '#1E1B4B' };

    ctx.fillStyle = colors.body;
    ctx.fillRect(x - size/2 + pixelSize, y - size/2 + pixelSize * 2, size - pixelSize * 2, size - pixelSize * 3);
    ctx.fillRect(x - size/2 + pixelSize * 2, y - size/2, size - pixelSize * 4, pixelSize * 2);

    ctx.fillStyle = colors.accent;
    ctx.fillRect(x - pixelSize/2, y - size/2 - pixelSize, pixelSize, pixelSize);

    ctx.fillStyle = colors.eyes;
    ctx.fillRect(x - size/2 + pixelSize * 2, y - size/2 + pixelSize * 3, pixelSize * 1.5, pixelSize * 1.5);
    ctx.fillRect(x + size/2 - pixelSize * 3.5, y - size/2 + pixelSize * 3, pixelSize * 1.5, pixelSize * 1.5);

    ctx.fillStyle = colors.pupils;
    ctx.fillRect(x - size/2 + pixelSize * 2.5, y - size/2 + pixelSize * 3.5, pixelSize * 0.5, pixelSize * 0.5);
    ctx.fillRect(x + size/2 - pixelSize * 3, y - size/2 + pixelSize * 3.5, pixelSize * 0.5, pixelSize * 0.5);

    ctx.fillStyle = colors.accent;
    ctx.fillRect(x - size/4, y - size/2 + pixelSize * 5, size/2, pixelSize);

    ctx.fillStyle = colors.body;
    ctx.fillRect(x - size/2 - pixelSize, y - size/2 + pixelSize * 4, pixelSize, pixelSize * 2);
    ctx.fillRect(x + size/2, y - size/2 + pixelSize * 4, pixelSize, pixelSize * 2);
    ctx.fillRect(x - size/2 + pixelSize * 2, y + size/2 - pixelSize, pixelSize * 1.5, pixelSize * 2);
    ctx.fillRect(x + size/2 - pixelSize * 3.5, y + size/2 - pixelSize, pixelSize * 1.5, pixelSize * 2);

    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= width; i += 30) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY); ctx.lineTo(width, centerY);
    ctx.stroke();

    const spriteSize = 60;

    // Original (faded)
    drawSprite(ctx, centerX, centerY, spriteSize, 0.2);

    // Transformed
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.transform(finalMatrix[0][0], finalMatrix[1][0], finalMatrix[0][1], finalMatrix[1][1], 0, 0);
    ctx.translate(-centerX, -centerY);
    drawSprite(ctx, centerX, centerY, spriteSize, 1);
    ctx.restore();
  }, [finalMatrix, drawSprite]);

  const addTransform = (key: string) => {
    setTransformChain([...transformChain, { ...presets[key] }]);
  };

  const removeTransform = (index: number) => {
    setTransformChain(transformChain.filter((_, i) => i !== index));
  };

  const clearChain = () => setTransformChain([]);

  const undoLast = () => {
    if (transformChain.length > 0) {
      setTransformChain(transformChain.slice(0, -1));
    }
  };

  const formatMatrix = (m: number[][]) =>
    `[${m[0][0].toFixed(2)}, ${m[0][1].toFixed(2)}]\n[${m[1][0].toFixed(2)}, ${m[1][1].toFixed(2)}]`;

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string; btn: string } } = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', btn: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', btn: 'bg-green-100 text-green-700 hover:bg-green-200' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', btn: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', btn: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow-sm text-sm">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Canvas */}
        <div className="flex-shrink-0">
          <canvas
            ref={canvasRef}
            width={210}
            height={210}
            className="w-full max-w-[210px] mx-auto border border-gray-200 rounded-lg"
            aria-label={interaction.ariaLabel}
          />
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-2 min-w-0">
          {/* Transform Buttons */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500">Rotation</div>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => addTransform('rotate45')} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Rotate 45°</button>
              <button onClick={() => addTransform('rotate90')} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Rotate 90°</button>
            </div>

            <div className="text-xs font-semibold text-gray-500 mt-2">Scale</div>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => addTransform('scale2x')} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">Scale 2×</button>
              <button onClick={() => addTransform('scaleHalf')} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">Scale 0.5×</button>
              <button onClick={() => addTransform('stretchX')} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">Stretch X</button>
              <button onClick={() => addTransform('stretchY')} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">Stretch Y</button>
            </div>

            <div className="text-xs font-semibold text-gray-500 mt-2">Shear</div>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => addTransform('shearRight')} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200">Shear →</button>
              <button onClick={() => addTransform('shearUp')} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200">Shear ↑</button>
            </div>

            <div className="text-xs font-semibold text-gray-500 mt-2">Flip</div>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => addTransform('flipX')} className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200">Flip X</button>
              <button onClick={() => addTransform('flipY')} className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200">Flip Y</button>
            </div>
          </div>

          {/* Undo / Clear */}
          <div className="flex gap-2 pt-1">
            <button onClick={undoLast} disabled={transformChain.length === 0}
              className="flex-1 py-1 px-2 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
              Undo
            </button>
            <button onClick={clearChain} disabled={transformChain.length === 0}
              className="flex-1 py-1 px-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50">
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Transform Chain Display */}
      {transformChain.length > 0 && (
        <div className="mt-3 p-2 bg-indigo-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-indigo-700">Transform Chain ({transformChain.length})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {transformChain.map((t, i) => (
              <span key={i} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${getColorClasses(t.color).bg} ${getColorClasses(t.color).border}`}>
                <span className={getColorClasses(t.color).text}>{t.label}</span>
                <button onClick={() => removeTransform(i)} className="text-gray-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Math Display */}
      {transformChain.length > 0 && (
        <div className="mt-2">
          <button onClick={() => setShowMath(!showMath)} className="text-xs text-indigo-600 hover:text-indigo-800 mb-1">
            {showMath ? '▼ Hide Math' : '▶ Show Math'}
          </button>

          {showMath && (
            <div className="p-2 bg-gray-50 rounded-lg overflow-x-auto">
              <div className="flex items-center gap-1 flex-wrap font-mono text-xs">
                {transformChain.map((t, i) => (
                  <React.Fragment key={i}>
                    <div className={`p-1 rounded border ${getColorClasses(t.color).bg} ${getColorClasses(t.color).border}`}>
                      <div className="text-center text-[10px] text-gray-500 mb-0.5">{t.label}</div>
                      <div className="whitespace-pre text-[11px]">{formatMatrix(t.matrix)}</div>
                    </div>
                    {i < transformChain.length - 1 && <span className="text-gray-400 px-0.5">×</span>}
                  </React.Fragment>
                ))}
                <span className="text-gray-400 px-0.5">=</span>
                <div className="p-1 rounded border bg-indigo-100 border-indigo-300">
                  <div className="text-center text-[10px] text-gray-500 mb-0.5">Result</div>
                  <div className="whitespace-pre text-[11px] font-semibold text-indigo-700">{formatMatrix(finalMatrix)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Final Matrix (always visible) */}
      <div className="mt-2 p-2 bg-gray-100 rounded-lg">
        <div className="text-xs text-gray-600 text-center">
          <span className="font-semibold">Final Matrix:</span>{' '}
          <span className="font-mono">
            [{finalMatrix[0][0].toFixed(2)}, {finalMatrix[0][1].toFixed(2)}] [{finalMatrix[1][0].toFixed(2)}, {finalMatrix[1][1].toFixed(2)}]
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageTransformer;
