import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { FractalsExplorerConfig } from './interface';
import { SliderInput } from './SliderInput';
import { useEventListener } from '../../../hooks/useEventListener';

interface FractalsExplorerProps {
  interaction: FractalsExplorerConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const FractalsExplorer: React.FC<FractalsExplorerProps> = ({ interaction, onInteraction }) => {
  const [parameters, setParameters] = useState<{ [key: string]: number }>({}),
    canvasRef = useRef<HTMLCanvasElement>(null),
    [announcement, setAnnouncement] = useState<string>(''),
    isInitialized = useRef(false),
    { t } = useTranslations(),
    { payload } = useEventListener('fractals-explorer'),
    [zoom, setZoom] = useState(interaction.zoom.defaultValue),
    [panX, setPanX] = useState(0),
    [panY, setPanY] = useState(0),
    [isDragging, setIsDragging] = useState(false),
    [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 }),
    [selectedPreset, setSelectedPreset] = useState(-1);

  const drawJuliaSet = useCallback(
    (canvas: HTMLCanvasElement, c_real: number, c_imag: number, zoomLevel: number, offsetX = 0, offsetY = 0) => {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx?.createImageData(width, height);
      const data = imageData?.data;

      const maxIterations = 50;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          // Map pixel coordinates to complex plane
          const real = ((x - width / 2) * (4 / width)) / zoomLevel + offsetX;
          const imag = ((y - height / 2) * (4 / height)) / zoomLevel + offsetY;

          // Julia set iteration: z = z² + c
          let z_real = real;
          let z_imag = imag;
          let iteration = 0;

          for (let i = 0; i < maxIterations; i++) {
            const z_real_new = z_real * z_real - z_imag * z_imag + c_real;
            const z_imag_new = 2 * z_real * z_imag + c_imag;

            z_real = z_real_new;
            z_imag = z_imag_new;

            if (z_real * z_real + z_imag * z_imag > 4) {
              iteration = i;
              break;
            }
          }

          const pixelIndex = (y * width + x) * 4;

          if (data) {
            if (iteration === 0) {
              // Points in the set - black
              data[pixelIndex] = 0; // Red
              data[pixelIndex + 1] = 0; // Green
              data[pixelIndex + 2] = 0; // Blue
            } else {
              // Points outside the set - colorful rainbow
              const normalizedIteration = iteration / maxIterations;
              const hue = normalizedIteration * 360;
              const saturation = 100;
              const lightness = 50 + normalizedIteration * 30;

              const rgb = hslToRgb(hue, saturation, lightness);
              data[pixelIndex] = rgb[0]; // Red
              data[pixelIndex + 1] = rgb[1]; // Green
              data[pixelIndex + 2] = rgb[2]; // Blue
            }
            data[pixelIndex + 3] = 255; // Alpha
          }
        }
      }

      if (ctx && imageData) {
        ctx?.putImageData(imageData, 0, 0);
      }
    },
    [],
  );

  const hslToRgb = (h: number, s: number, l: number) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    if (s === 0) {
      const gray = Math.round(l * 255);
      return [gray, gray, gray];
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

    return [r, g, b];
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setLastMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = currentX - lastMousePos.x;
    const deltaY = currentY - lastMousePos.y;

    // Convert pixel movement to complex plane movement
    const moveFactorX = 4 / canvasRef.current.width / zoom;
    const moveFactorY = 4 / canvasRef.current.height / zoom;

    setPanX((prevPanX) => prevPanX - deltaX * moveFactorX);
    setPanY((prevPanY) => prevPanY - deltaY * moveFactorY);

    setLastMousePos({ x: currentX, y: currentY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      drawJuliaSet(canvas, parameters['realPart'], parameters['imaginaryPart'], zoom, panX, panY);
    }
  }, [parameters, zoom, panX, panY, drawJuliaSet]);

  useEffect(() => {
    const initialParams: { [key: string]: number } = {};
    interaction.parameters.forEach((param) => {
      initialParams[param.id] = param.defaultValue;
    });
    setParameters(initialParams);
    isInitialized.current = true;
  }, [interaction]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 1) {
        onInteraction({
          'disable-event-1': true,
        });
      }
    }
  }, [parameters]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 3) {
        onInteraction({
          'disable-event-10': true,
        });
      }
    }
  }, [zoom]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <div className="rounded-lg w-[45%] mx-auto">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="border-2 border-gray-200 rounded-lg w-full max-w-[600px] aspect-square mx-auto block cursor-grab active:cursor-grabbing"
          style={{ imageRendering: 'pixelated' }}
          tabIndex={0}
          aria-label={t(interaction.canvasAriaLabel)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div className="flex flex-col gap-y-4 bg-white rounded-lg shadow-lg p-6">
        <p>{t(interaction.presetInstruction)}</p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {interaction.presets.map((preset, index) => (
            <button
              key={index}
              className={`p-3 rounded-md font-semibold text-sm ${preset.bgColor} transition-all duration-200 ${index === selectedPreset ? 'cursor-default ring-2 ring-blue-600' : 'cursor-pointer hover:shadow-md'}`}
              onClick={() => {
                setParameters({
                  realPart: preset.values.realPart,
                  imaginaryPart: preset.values.imaginaryPart,
                });
                setSelectedPreset(index);
                setAnnouncement(
                  t(interaction.patternChangeAnnouncement.presetSelected).replace('{preset}', t(preset.name)),
                );
                setPanX(0);
                setPanY(0);
              }}
              aria-label={`${t(interaction.presetsAriaLabel)} ${t(preset.name)}`}
            >
              {t(preset.name)}
            </button>
          ))}
        </div>
        <div className="grid gap-x-6 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
          {interaction.parameters.map((param) => (
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
                setAnnouncement(
                  `${t(interaction.patternChangeAnnouncement.parameterChanged)} ${t(param.label)}: ${value}`,
                );
                setSelectedPreset(-1);
              }}
            />
          ))}
          <SliderInput
            id={interaction.zoom.id}
            label={interaction.zoom.label}
            value={zoom}
            min={interaction.zoom.min}
            max={interaction.zoom.max}
            step={interaction.zoom.step}
            onChange={setZoom}
            valuePrefix="x"
          />
        </div>
      </div>
    </div>
  );
};

export default FractalsExplorer;
