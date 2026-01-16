import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FractalsCreationSimulatorConfig } from './interface';
import parse from 'html-react-parser';
import { useTranslations } from '../../../hooks/useTranslations';
import { SliderInput } from './SliderInput';
import { useEventListener } from '../../../hooks/useEventListener';

interface ComplexNumber {
  real: number;
  imag: number;
}

interface SVGPoint {
  x: number;
  y: number;
}

interface PlottedPoint {
  id: number;
  startingPoint: ComplexNumber;
  iterationHistory: ComplexNumber[];
  hasEscaped: boolean;
  color: string;
  currentIteration: number;
}

interface RGB {
  0: number;
  1: number;
  2: number;
}

interface FractalsCreationSimulatorProps {
  interaction: FractalsCreationSimulatorConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const IconPlay = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
};

const FractalsCreationSimulator: React.FC<FractalsCreationSimulatorProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations(),
    [parameters, setParameters] = useState<{ [key: string]: number }>({}),
    [announcement, setAnnouncement] = useState<string>(''),
    { payload } = useEventListener('fractals-creation-simulator');

  // Animation state
  const [isAnimating, setIsAnimating] = useState<boolean>(false),
    [plottedPoints, setPlottedPoints] = useState<PlottedPoint[]>([]);

  const pointColors: string[] = [
    '#4f46e5',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#06b6d4',
    '#f97316',
    '#84cc16',
    '#ec4899',
    '#6366f1',
  ];

  const animationRef = useRef<NodeJS.Timeout>();
  const juliaCanvasRef = useRef<HTMLCanvasElement>(null);
  const maxIterations: number = 50;
  const escapeRadius: number = 2;

  // SVG coordinate system constants
  const svgWidth: number = 600;
  const svgHeight: number = 600;
  const scale: number = 100;
  const centerX: number = svgWidth / 2;
  const centerY: number = svgHeight / 2;

  // Convert complex number to SVG coordinates
  const complexToSVG = (real: number, imag: number): SVGPoint => ({
    x: centerX + real * scale,
    y: centerY - imag * scale,
  });

  // Complex number arithmetic operations
  const complexSquare = (z: ComplexNumber): ComplexNumber => ({
    real: z.real * z.real - z.imag * z.imag,
    imag: 2 * z.real * z.imag,
  });

  const complexAdd = (z1: ComplexNumber, z2: ComplexNumber): ComplexNumber => ({
    real: z1.real + z2.real,
    imag: z1.imag + z2.imag,
  });

  const complexMagnitude = (z: ComplexNumber): number => Math.sqrt(z.real * z.real + z.imag * z.imag);

  // Convert HSL to RGB for fractal coloring
  const hslToRgb = (h: number, s: number, l: number): RGB => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    if (s === 0) {
      const gray: number = Math.round(l * 255);
      return [gray, gray, gray];
    }

    const q: number = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p: number = 2 * l - q;

    const r: number = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g: number = Math.round(hue2rgb(p, q, h) * 255);
    const b: number = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

    return [r, g, b];
  };

  // Render Julia set fractal on canvas
  const drawJuliaSet = useCallback(
    (canvas: HTMLCanvasElement, c_real: number, c_imag: number) => {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (!ctx) return;

      const width: number = canvas.width;
      const height: number = canvas.height;
      const imageData: ImageData = ctx.createImageData(width, height);
      const data: Uint8ClampedArray = imageData.data;
      const zoom: number = 1.2;
      const canvasScale: number = width / 6;
      const centerCanvasX: number = width / 2;
      const centerCanvasY: number = height / 2;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          // Map pixel to complex plane (-3 to 3 range)
          const real: number = ((x - width / 2) * (6 / width)) / zoom;
          const imag: number = ((y - height / 2) * (6 / height)) / zoom;

          // Julia set iteration: z = z² + c
          let z_real: number = real;
          let z_imag: number = imag;
          let iteration: number = 0;

          for (let i = 0; i < maxIterations; i++) {
            const z_real_new: number = z_real * z_real - z_imag * z_imag + c_real;
            const z_imag_new: number = 2 * z_real * z_imag + c_imag;

            z_real = z_real_new;
            z_imag = z_imag_new;

            if (z_real * z_real + z_imag * z_imag > 4) {
              iteration = i;
              break;
            }
          }

          const pixelIndex: number = (y * width + x) * 4;

          if (iteration === 0) {
            // Points in the set - black
            data[pixelIndex] = 0;
            data[pixelIndex + 1] = 0;
            data[pixelIndex + 2] = 0;
          } else {
            // Points outside the set - colored based on escape speed
            const normalizedIteration: number = iteration / maxIterations;
            const hue: number = normalizedIteration * 360;
            const saturation: number = 80;
            const lightness: number = 30 + normalizedIteration * 50;

            const rgb: RGB = hslToRgb(hue, saturation, lightness);
            data[pixelIndex] = rgb[0];
            data[pixelIndex + 1] = rgb[1];
            data[pixelIndex + 2] = rgb[2];
          }
          data[pixelIndex + 3] = 255; // Alpha
        }
      }

      // Put the fractal image data first
      ctx.putImageData(imageData, 0, 0);

      // Now draw the coordinate axes and labels on top
      ctx.save();

      // Draw grid lines
      const range: number = 3;

      // Vertical lines (real axis)
      for (let i = -range; i <= range; i++) {
        const x: number = centerCanvasX + i * canvasScale;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = i === 0 ? 'rgba(156, 163, 175, 0.9)' : 'rgba(156, 163, 175, 0.8)'; // Semi-transparent for grid lines
        ctx.lineWidth = i === 0 ? 2 : 1;
        ctx.stroke();
      }

      // Horizontal lines (imaginary axis)
      for (let i = -range; i <= range; i++) {
        const y: number = centerCanvasY - i * canvasScale; // Note: canvas Y is inverted

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = i === 0 ? 'rgba(156, 163, 175, 0.9)' : 'rgba(156, 163, 175, 0.8)';
        ctx.lineWidth = i === 0 ? 2 : 1;
        ctx.stroke();
      }

      // Draw axis labels
      ctx.fillStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.font = '14px Avenir Next, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Real axis labels
      for (let i = -range; i <= range; i++) {
        if (i !== 0) {
          const x: number = centerCanvasX + i * canvasScale;
          const y: number = centerCanvasY + 15;
          ctx.fillText(i.toString(), i < 0 ? x + 8 : x - 8, y);
        }
      }

      // Imaginary axis labels
      for (let i = -range; i <= range; i++) {
        if (i !== 0) {
          const x: number = centerCanvasX - 15;
          const y: number = centerCanvasY - i * canvasScale;
          ctx.fillText(`${i}i`, x, i < 0 ? y - 8 : y + 8);
        }
      }

      // Draw origin label
      ctx.strokeText('0', centerCanvasX + 10, centerCanvasY - 10);
      ctx.fillText('0', centerCanvasX + 10, centerCanvasY - 10);

      // Draw axis titles
      ctx.font = 'bold 12px';

      // Real axis title
      ctx.textAlign = 'right';
      ctx.strokeText(t('scenes.common.real_axis'), width - 6, centerCanvasY - 10);
      ctx.fillText(t('scenes.common.real_axis'), width - 6, centerCanvasY - 10);

      // Imaginary axis title
      ctx.textAlign = 'left';
      ctx.strokeText(t('scenes.common.imaginary_axis'), centerCanvasX + 8, 10);
      ctx.fillText(t('scenes.common.imaginary_axis'), centerCanvasX + 8, 10);

      ctx.restore();
    },
    [t, maxIterations],
  );

  // Update Julia set when parameters change
  useEffect(() => {
    const canvas = juliaCanvasRef.current;
    if (canvas) {
      drawJuliaSet(canvas, parameters['realPart'], parameters['imaginaryPart']);
    }
  }, [parameters, drawJuliaSet]);

  // Add new points
  const plotPoints = (): void => {
    if (plottedPoints.length === 5) return;

    const newPoints: PlottedPoint[] = [];
    for (let i = 0; i < 5; i++) {
      // Generate random points within the escape circle (radius 2) but closer to origin
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 1.5;
      const real = radius * Math.cos(angle);
      const imag = radius * Math.sin(angle);

      const newPoint = {
        id: Date.now() + i,
        startingPoint: { real, imag },
        iterationHistory: [{ real, imag }],
        hasEscaped: false,
        color: pointColors[(plottedPoints.length + i) % pointColors.length],
        currentIteration: 0,
      };

      newPoints.push(newPoint);
    }

    setPlottedPoints((prev) => [...prev, ...newPoints]);
    setAnnouncement(t(interaction.pointPlotted));
  };

  const clearAllPoints = (): void => {
    setPlottedPoints([]);
    setAnnouncement(t(interaction.pointsRemoved));
  };

  // Reset animation state
  const reset = (): void => {
    setIsAnimating(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Start fresh animation sequence
  const startAnimation = (): void => {
    reset();
    if (plottedPoints.length === 0) return;

    setIsAnimating(true);

    // Reset all points to starting positions
    setPlottedPoints((prev) =>
      prev.map((point) => ({
        ...point,
        iterationHistory: [point.startingPoint],
        currentIteration: 0,
        hasEscaped: false,
      })),
    );

    animateAllPoints(0);
  };

  // Execute one iteration step for all points
  const animateAllPoints = (iteration: number): void => {
    if (iteration >= maxIterations) {
      setIsAnimating(false);
      return;
    }

    animationRef.current = setTimeout(() => {
      setPlottedPoints((prev) => {
        const updatedPoints: PlottedPoint[] = prev.map((point) => {
          if (point.hasEscaped) return point;

          const currentZ: ComplexNumber = point.iterationHistory[point.iterationHistory.length - 1];

          if (complexMagnitude(currentZ) > escapeRadius) {
            return { ...point, hasEscaped: true };
          }

          const c: ComplexNumber = { real: parameters['realPart'], imag: parameters['imaginaryPart'] };
          const zSquared: ComplexNumber = complexSquare(currentZ);
          const newZ: ComplexNumber = complexAdd(zSquared, c);

          return {
            ...point,
            iterationHistory: [...point.iterationHistory, newZ],
            currentIteration: iteration + 1,
          };
        });

        // Stop if all points have escaped
        const allEscaped: boolean = updatedPoints.every((point) => point.hasEscaped);
        if (allEscaped) {
          setIsAnimating(false);
          return updatedPoints;
        }

        return updatedPoints;
      });

      animateAllPoints(iteration + 1);
    }, 500);
  };

  // Generate coordinate grid lines
  const generateGridLines = (): JSX.Element[] => {
    const lines: JSX.Element[] = [];
    const range: number = 3;

    // Vertical lines (real axis)
    for (let i = -range; i <= range; i++) {
      const x: number = centerX + i * scale;
      lines.push(
        <line
          key={`v-${i}`}
          x1={x}
          y1={0}
          x2={x}
          y2={svgHeight}
          stroke={i === 0 ? '#000' : '#9ca3af'}
          strokeWidth={i === 0 ? 3 : 1.5}
        />,
      );
    }

    // Horizontal lines (imaginary axis)
    for (let i = -range; i <= range; i++) {
      const y: number = centerY - i * scale;
      lines.push(
        <line
          key={`h-${i}`}
          x1={0}
          y1={y}
          x2={svgWidth}
          y2={y}
          stroke={i === 0 ? '#000' : '#9ca3af'}
          strokeWidth={i === 0 ? 3 : 1.5}
        />,
      );
    }

    return lines;
  };

  // Generate axis number labels
  const generateAxisLabels = (): JSX.Element[] => {
    const labels: JSX.Element[] = [];
    const range: number = 3;

    // Real axis labels
    for (let i = -range; i <= range; i++) {
      if (i !== 0) {
        const x: number = centerX + i * scale;
        labels.push(
          <text
            key={`real-${i}`}
            x={i < 0 ? x + 8 : x - 8}
            y={centerY + 30}
            textAnchor="middle"
            fontSize="26"
            fill="#000"
          >
            {i}
          </text>,
        );
      }
    }

    // Imaginary axis labels
    for (let i = -range; i <= range; i++) {
      if (i !== 0) {
        const y: number = centerY - i * scale;
        labels.push(
          <text
            key={`imag-${i}`}
            x={centerX - 20}
            y={i > 0 ? y + 24 : y - 8}
            textAnchor="middle"
            fontSize="26"
            fill="#000"
          >
            {i}i
          </text>,
        );
      }
    }

    return labels;
  };

  // Format complex number for display
  const formatComplex = (z: ComplexNumber): string => {
    const real: string = z.real.toFixed(2);
    const imag: string = z.imag.toFixed(2);
    const sign: string = z.imag >= 0 ? '+' : '';
    return `${real} ${sign} ${imag}i`;
  };

  useEffect(() => {
    const initialParams: { [key: string]: number } = {};
    interaction.constant.forEach((param) => {
      initialParams[param.id] = param.defaultValue;
    });
    setParameters(initialParams);
  }, [interaction]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (plottedPoints.length >= 5) {
        onInteraction({
          'disable-event-4': true,
        });
      }
    }
  }, [plottedPoints]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (isAnimating) {
        onInteraction({
          'disable-event-5': true,
        });
      }
    }
  }, [isAnimating]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 3) {
        onInteraction({
          'disable-event-6': true,
        });
      }
    }
  }, [parameters]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div>{parse(t(interaction.instruction))}</div>
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-x-[2px]">
          <p>
            {t('scenes.common.constant')} (<span className="font-besley font-bold italic text-[#677600]">c</span>):
          </p>
          {parameters['realPart'] !== undefined && parameters['imaginaryPart'] !== undefined && (
            <p className="text-center text-lg" aria-live="off">
              <span className="font-besley font-bold text-[#DB0072]">{parameters['realPart']}</span>{' '}
              {parameters['imaginaryPart'] < 0 ? '-' : '+'}{' '}
              <span className="font-besley font-bold text-[#0061FC]">{Math.abs(parameters['imaginaryPart'])}</span>
              <span className="font-besley font-bold italic text-[#008217]">i</span>
            </p>
          )}
        </div>
        <div className="mt-2 grid gap-x-6 gap-y-4 lg:grid-cols-2">
          {interaction.constant.map((param) => (
            <SliderInput
              key={param.id}
              id={param.id}
              label={param.label}
              value={parameters[param.id] || param.defaultValue}
              min={param.min}
              max={param.max}
              step={param.step}
              onChange={(value: number) => {
                setParameters((prev) => ({
                  ...prev,
                  [param.id]: value,
                }));
              }}
              groupLabel={param.groupLabel}
            />
          ))}
        </div>
        <hr className="my-4"></hr>
        <div className="flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={plotPoints}
            className="px-2 py-1 rounded transition-colors text-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-blue-600 lg:px-4 lg:py-2"
            disabled={isAnimating || plottedPoints.length === 5}
          >
            {t(interaction.buttons.plotPoint)}
          </button>
          <button
            onClick={clearAllPoints}
            disabled={plottedPoints.length === 0 || isAnimating}
            className="px-2 py-1 rounded transition-colors text-center text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-500 lg:px-4 lg:py-2"
          >
            {t(interaction.buttons.clearAllPoints)}
          </button>
          <button
            onClick={startAnimation}
            disabled={isAnimating || plottedPoints.length === 0}
            className="px-2 py-1 rounded flex items-center gap-x-[6px] transition-colors text-center text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-pink-500 lg:px-4 lg:py-2"
          >
            <IconPlay />
            <span>{t(interaction.buttons.startIterations)}</span>
          </button>
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Iteration Visualization Panel */}
          <div className="sr-only" aria-live="polite">
            {announcement}
          </div>
          <div className="sr-only" aria-live="polite">
            {isAnimating ? t(interaction.animationStarted) : t(interaction.animationStopped)}
          </div>
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">{t(interaction.visualizations.left.title)}</h2>
            <p>{parse(t(interaction.visualizations.left.description))}</p>
            <div className="bg-white">
              <div className="w-full aspect-square">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="border border-gray-400 rounded-lg w-full h-full"
                  tabIndex={0}
                  aria-label={t(interaction.visualizations.left.ariaLabel)}
                >
                  {/* Coordinate grid */}
                  {generateGridLines()}

                  {/* Axis labels */}
                  {generateAxisLabels()}

                  {/* Escape boundary circle */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={escapeRadius * scale}
                    fill="none"
                    stroke="#e7000b"
                    strokeWidth="4"
                    strokeDasharray="8,8"
                    opacity="0.6"
                  />

                  {/* Axis titles */}
                  <text
                    x={svgWidth - 10}
                    y={centerY - 10}
                    textAnchor="end"
                    fontSize="28"
                    fill="#000"
                    fontWeight={500}
                  >
                    {t('scenes.common.real_axis')}
                  </text>
                  <text x={centerX + 10} y={20} textAnchor="start" fontSize="28" fill="#000" fontWeight={500}>
                    {t('scenes.common.imaginary_axis')}
                  </text>

                  {/* Origin label */}
                  <text x={centerX + 10} y={centerY - 10} fontSize="26" fill="#000">
                    0
                  </text>

                  {/* Render plotted points and their iteration paths */}
                  {plottedPoints.map((point: PlottedPoint) => (
                    <g key={point.id}>
                      {/* Draw path between iterations */}
                      {point.iterationHistory.length > 1 && (
                        <polyline
                          points={point.iterationHistory
                            .map((z: ComplexNumber) => {
                              const svgPoint: SVGPoint = complexToSVG(z.real, z.imag);
                              return `${svgPoint.x},${svgPoint.y}`;
                            })
                            .join(' ')}
                          fill="none"
                          stroke={point.color}
                          strokeWidth="2"
                          opacity="0.7"
                        />
                      )}

                      {/* Draw iteration points */}
                      {point.iterationHistory.map((z: ComplexNumber, index: number) => {
                        const svgPoint: SVGPoint = complexToSVG(z.real, z.imag);
                        const isLast: boolean = index === point.iterationHistory.length - 1;
                        return (
                          <circle
                            key={index}
                            cx={svgPoint.x}
                            cy={svgPoint.y}
                            r={isLast ? 8 : 4}
                            fill={point.color}
                            stroke="white"
                            strokeWidth="2"
                            opacity={isLast ? 1 : 0.7}
                          />
                        );
                      })}

                      {/* Starting point label */}
                      {point.iterationHistory.length > 0 && (
                        <text
                          x={complexToSVG(point.startingPoint.real, point.startingPoint.imag).x + 15}
                          y={complexToSVG(point.startingPoint.real, point.startingPoint.imag).y - 10}
                          fontSize="20"
                          fill={point.color}
                          fontWeight="bold"
                        >
                          {formatComplex(point.startingPoint)}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Julia Set Panel */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">{t(interaction.visualizations.right.title)}</h2>
            <p>{parse(t(interaction.visualizations.right.description))}</p>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="w-full aspect-square">
                <canvas
                  ref={juliaCanvasRef}
                  width={300}
                  height={300}
                  className="border border-gray-300 w-full h-full object-contain"
                  tabIndex={0}
                  aria-label={t(interaction.visualizations.right.ariaLabel)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractalsCreationSimulator;
