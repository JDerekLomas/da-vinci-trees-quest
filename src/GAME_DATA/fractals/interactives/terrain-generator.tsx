import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TerrainGeneratorConfig } from './interface';
import parse from 'html-react-parser';
import { useTranslations } from '../../../hooks/useTranslations';
import { SliderInput } from './SliderInput';
import useScreenSize from '../../../hooks/useScreenSize';
import { useEventListener } from '../../../hooks/useEventListener';

interface TerrainGeneratorProps {
  interaction: TerrainGeneratorConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const TerrainGenerator: React.FC<TerrainGeneratorProps> = ({ interaction, onInteraction }) => {
  const [parameters, setParameters] = useState<{ [key: string]: number }>(() => {
      const initialParams: { [key: string]: number } = {};
      interaction.parameters.forEach((param) => {
        initialParams[param.id] = param.defaultValue;
      });
      return initialParams;
    }),
    { t } = useTranslations(),
    [colorTheme, setColorTheme] = useState('earth'),
    canvasRef = useRef<HTMLCanvasElement | null>(null),
    { isZoomed200 } = useScreenSize(),
    { payload } = useEventListener('terrain-generator'),
    [selectedPreset, setSelectedPreset] = useState(-1),
    [announcement, setAnnouncement] = useState('');

  // Terrain generation parameters
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 450;
  const GRID_SIZE = 200;
  const MAX_ITERATIONS = 60;
  const SCALE = 2.5;

  // Enhanced noise function for realistic terrain
  const noise = (x: number, y: number, scale = 1) => {
    const X = Math.floor(x * scale) & 255;
    const Y = Math.floor(y * scale) & 255;
    return (Math.sin(X * 12.9898 + Y * 78.233) * 43758.5453) % 1;
  };

  // Multi-octave noise for natural terrain features
  const fbm = useCallback((x: number, y: number, octaves = 4) => {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;

    for (let i = 0; i < octaves; i++) {
      value += noise(x * frequency, y * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value;
  }, []);

  // Enhanced fractal calculation for terrain generation
  const calculateTerrainHeight = useCallback(
    (x: number, y: number, c_real: number, c_imag: number) => {
      // Normalize coordinates
      const nx = ((x - GRID_SIZE / 2) * SCALE) / GRID_SIZE;
      const ny = ((y - GRID_SIZE / 2) * SCALE) / GRID_SIZE;

      // Julia set calculation
      let z_real = nx;
      let z_imag = ny;
      let iteration = 0;
      let magnitude = 0;

      while (iteration < MAX_ITERATIONS && magnitude <= 4) {
        const temp = z_real * z_real - z_imag * z_imag + c_real;
        z_imag = 2 * z_real * z_imag + c_imag;
        z_real = temp;
        magnitude = z_real * z_real + z_imag * z_imag;
        iteration++;
      }

      // Create base elevation from fractal
      let baseHeight;
      if (iteration === MAX_ITERATIONS) {
        baseHeight = 0; // Interior points become valleys/water
      } else {
        // Create dramatic elevation based on escape speed
        const smoothed = iteration + 1 - Math.log(Math.log(Math.sqrt(magnitude))) / Math.log(2);
        baseHeight = Math.pow(smoothed / MAX_ITERATIONS, 0.7) * 15;
      }

      // Add multi-scale noise for realistic detail
      const noise1 = fbm(nx * 3, ny * 3, 3) * 2;
      const noise2 = fbm(nx * 8, ny * 8, 2) * 0.8;
      const noise3 = fbm(nx * 20, ny * 20, 1) * 0.3;

      // Combine for natural terrain
      let finalHeight = baseHeight + noise1 + noise2 + noise3;

      // Create water bodies in low areas
      if (finalHeight < 2.5) {
        finalHeight = Math.max(0, finalHeight - 1);
      }

      // Enhance mountain peaks
      if (finalHeight > 8) {
        finalHeight = 8 + Math.pow((finalHeight - 8) / 7, 1.3) * 7;
      }

      return Math.max(0, Math.min(15, finalHeight));
    },
    [fbm],
  );

  // Generate realistic height map
  const generateHeightMap = useCallback(
    (c_real: number, c_imag: number) => {
      const heightMap = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        const row = [];
        for (let x = 0; x < GRID_SIZE; x++) {
          row.push(calculateTerrainHeight(x, y, c_real, c_imag));
        }
        heightMap.push(row);
      }

      // Post-process for more realistic features
      return smoothHeightMap(heightMap);
    },
    [calculateTerrainHeight],
  );

  // Smooth height map for more natural terrain
  const smoothHeightMap = (heightMap: number[][]) => {
    const smoothed = heightMap.map((row) => [...row]);

    for (let y = 1; y < GRID_SIZE - 1; y++) {
      for (let x = 1; x < GRID_SIZE - 1; x++) {
        // Light smoothing to remove harsh edges
        const avg =
          (heightMap[y - 1][x - 1] +
            heightMap[y - 1][x] +
            heightMap[y - 1][x + 1] +
            heightMap[y][x - 1] +
            heightMap[y][x] * 4 +
            heightMap[y][x + 1] +
            heightMap[y + 1][x - 1] +
            heightMap[y + 1][x] +
            heightMap[y + 1][x + 1]) /
          12;

        smoothed[y][x] = heightMap[y][x] * 0.7 + avg * 0.3;
      }
    }

    return smoothed;
  };

  // Enhanced terrain coloring with multiple themes
  const getTerrainColor = useCallback(
    (height: number, slope = 0, shading = 1.0) => {
      const shade = (r: number, g: number, b: number, factor: number) => {
        return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
      };

      let r, g, b;

      // Color themes
      if (colorTheme === 'earth') {
        // Realistic Earth colors
        if (height <= 0.5) {
          r = 20;
          g = 60;
          b = 120; // Deep water
        } else if (height <= 1.5) {
          const factor = (height - 0.5) / 1.0;
          r = 20 + factor * 40;
          g = 100 + factor * 60;
          b = 180 + factor * 40; // Lakes
        } else if (height <= 3) {
          const factor = (height - 1.5) / 1.5;
          r = 60 + factor * 40;
          g = 120 + factor * 60;
          b = 100 - factor * 30; // Shore
        } else if (height <= 6) {
          const factor = (height - 3) / 3;
          r = 40 + factor * 20;
          g = 100 + factor * 40;
          b = 30 + factor * 10; // Forest lowlands
        } else if (height <= 9) {
          const factor = (height - 6) / 3;
          r = 60 + factor * 40;
          g = 120 + factor * 20;
          b = 40; // Mountain forest
        } else if (height <= 12) {
          const factor = (height - 9) / 3;
          r = 120 + factor * 40;
          g = 100 + factor * 30;
          b = 70 + factor * 20; // Rocky slopes
        } else {
          const factor = Math.min(1, (height - 12) / 3);
          r = 180 + factor * 60;
          g = 170 + factor * 50;
          b = 150 + factor * 40; // Snow peaks
        }
      } else if (colorTheme === 'alien') {
        // Desert World - realistic sandy colors
        if (height <= 0.5) {
          r = 30;
          g = 80;
          b = 120; // Desert oasis water
        } else if (height <= 1.5) {
          const factor = (height - 0.5) / 1.0;
          r = 60 + factor * 80;
          g = 100 + factor * 80;
          b = 120 - factor * 40; // Water edges
        } else if (height <= 3) {
          const factor = (height - 1.5) / 1.5;
          r = 160 + factor * 40;
          g = 140 + factor * 40;
          b = 80 + factor * 20; // Wet sand
        } else if (height <= 6) {
          const factor = (height - 3) / 3;
          r = 200 + factor * 20;
          g = 170 + factor * 20;
          b = 100 + factor * 20; // Sandy desert
        } else if (height <= 9) {
          const factor = (height - 6) / 3;
          r = 210 + factor * 20;
          g = 160 + factor * 10;
          b = 90 + factor * 10; // Desert dunes
        } else if (height <= 12) {
          const factor = (height - 9) / 3;
          r = 180 + factor * 40;
          g = 120 + factor * 40;
          b = 70 + factor * 20; // Rocky desert
        } else {
          const factor = Math.min(1, (height - 12) / 3);
          r = 160 + factor * 60;
          g = 110 + factor * 50;
          b = 60 + factor * 30; // Desert peaks
        }
      } else if (colorTheme === 'frozen') {
        // Ice World - realistic ice and snow colors
        if (height <= 0.5) {
          r = 5;
          g = 25;
          b = 45; // Deep glacial water
        } else if (height <= 1.5) {
          const factor = (height - 0.5) / 1.0;
          r = 20 + factor * 60;
          g = 60 + factor * 100;
          b = 100 + factor * 120; // Glacial ice
        } else if (height <= 3) {
          const factor = (height - 1.5) / 1.5;
          r = 180 + factor * 60;
          g = 200 + factor * 40;
          b = 220 + factor * 30; // Ice sheets
        } else if (height <= 6) {
          const factor = (height - 3) / 3;
          r = 240 + factor * 10;
          g = 245 + factor * 10;
          b = 250 + factor * 5; // Snow fields
        } else if (height <= 9) {
          const factor = (height - 6) / 3;
          r = 250 + factor * 5;
          g = 250 + factor * 5;
          b = 255; // Pure snow
        } else if (height <= 12) {
          const factor = (height - 9) / 3;
          r = 240 + factor * 15;
          g = 245 + factor * 10;
          b = 250 + factor * 5; // Snow peaks
        } else {
          r = 255;
          g = 255;
          b = 255; // Pure white peaks
        }
      }

      // Add slope-based darkening for ridges and shadows
      const slopeFactor = 1 - Math.min(0.4, slope * 0.3);

      return shade(r || 0, g || 0, b || 0, shading * slopeFactor);
    },
    [colorTheme],
  );

  // Calculate slope for realistic shading
  const calculateSlope = (heightMap: number[][], x: number, y: number) => {
    if (x === 0 || y === 0 || x === GRID_SIZE - 1 || y === GRID_SIZE - 1) return 0;

    const dzdx = (heightMap[y][x + 1] - heightMap[y][x - 1]) / 2;
    const dzdy = (heightMap[y + 1][x] - heightMap[y - 1][x]) / 2;

    return Math.sqrt(dzdx * dzdx + dzdy * dzdy);
  };

  // Enhanced 3D rendering with proper perspective
  const renderTerrain = useCallback(
    (heightMap: number[][]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (!ctx) return;

      // Perspective projection parameters for aerial view
      const scale = 2.8;
      const offsetX = CANVAS_WIDTH / 2;
      const offsetY = 20;
      const heightScale = 4;

      // Create array of points for proper depth sorting
      const points = [];
      for (let y = 0; y < GRID_SIZE - 1; y++) {
        for (let x = 0; x < GRID_SIZE - 1; x++) {
          points.push({
            x,
            y,
            avgHeight: (heightMap[y][x] + heightMap[y][x + 1] + heightMap[y + 1][x] + heightMap[y + 1][x + 1]) / 4,
          });
        }
      }

      // Sort by depth (back to front)
      points.sort((a, b) => b.x + b.y - (a.x + a.y));

      // Render each quad
      points.forEach((point) => {
        const { x, y } = point;

        // Get heights of quad corners
        const h1 = heightMap[y][x];
        const h2 = heightMap[y][x + 1];
        const h3 = heightMap[y + 1][x];
        const h4 = heightMap[y + 1][x + 1];

        // Calculate slope for shading
        const slope = calculateSlope(heightMap, x, y);

        // Project to screen coordinates (isometric-like view)
        const x1 = (x - y) * scale + offsetX;
        const y1 = (x + y) * scale * 0.5 + offsetY - h1 * heightScale;
        const x2 = (x + 1 - y) * scale + offsetX;
        const y2 = (x + 1 + y) * scale * 0.5 + offsetY - h2 * heightScale;
        const x3 = (x - (y + 1)) * scale + offsetX;
        const y3 = (x + y + 1) * scale * 0.5 + offsetY - h3 * heightScale;
        const x4 = (x + 1 - (y + 1)) * scale + offsetX;
        const y4 = (x + 1 + y + 1) * scale * 0.5 + offsetY - h4 * heightScale;

        // Calculate lighting based on height and position
        const avgHeight = (h1 + h2 + h3 + h4) / 4;
        const lightFactor = 0.8 + 0.3 * Math.sin((x + y) * 0.1) * Math.cos((x - y) * 0.15);

        // Draw quad
        ctx.fillStyle = getTerrainColor(avgHeight, slope, lightFactor);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x4, y4);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();

        // Add subtle edges for definition
        if (slope > 1.5) {
          ctx.strokeStyle = 'rgba(0,0,0,0.1)';
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      });
    },
    [getTerrainColor],
  );

  // Generate terrain when parameters change
  const generateTerrain = useCallback(async () => {
    const param1 = parameters['realPart'] || 0;
    const param2 = parameters['imaginaryPart'] || 0;
    const heightMap = generateHeightMap(param1, param2);
    renderTerrain(heightMap);
  }, [parameters, generateHeightMap, renderTerrain]);

  // Generate terrain on parameter changes
  useEffect(() => {
    generateTerrain();
  }, [parameters, colorTheme, generateTerrain]);

  const prevParameters = useRef(parameters);

  useEffect(() => {
    if (JSON.stringify(prevParameters.current) !== JSON.stringify(parameters)) {
      onInteraction({
        'disable-event-7': true,
      });
    }
    prevParameters.current = parameters;
  }, [parameters]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 2 && selectedPreset === 2) {
        onInteraction({
          'disable-event-8': true,
        });
      }
    }
  }, [selectedPreset]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 3) {
        onInteraction({
          'disable-event-9': colorTheme === 'alien',
        });
      }
    }
  }, [colorTheme]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <div className="flex justify-center">
        <div
          className={`relative border-2 border-gray-300 rounded-lg ${isZoomed200 ? 'overflow-auto' : 'overflow-auto xl:overflow-hidden'}`}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="bg-gradient-to-b from-sky-200 to-sky-100"
            tabIndex={0}
            aria-label={t(interaction.landscapeCanvas.ariaLabel)}
          />
        </div>
      </div>
      <div>{parse(t(interaction.instruction))}</div>
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-y-4">
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
        <div className="grid gap-x-6 gap-y-4 lg:grid-cols-2">
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
                setParameters((prev) => {
                  return {
                    ...prev,
                    [param.id]: value,
                  };
                });
                setSelectedPreset(-1);
                setAnnouncement(`${t(interaction.landscapeChanged)} ${t(param.label)}: ${value}`);
              }}
            />
          ))}
        </div>
        <hr></hr>
        <div className="flex flex-col gap-2">
          <h4>{t(interaction.presetsLabel)}</h4>
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {interaction.presets.map((preset, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-md text-center text-sm font-semibold ${preset.bgColor} transition-all duration-200 ${index === selectedPreset ? 'cursor-default ring-2 ring-blue-600' : 'cursor-pointer hover:shadow-md'}`}
                onClick={() => {
                  setParameters({
                    realPart: preset.values.realPart,
                    imaginaryPart: preset.values.imaginaryPart,
                  });
                  setSelectedPreset(index);
                  setAnnouncement(t(interaction.presetSelected).replace('{preset}', t(preset.name)));
                }}
                aria-label={`${t(interaction.presetsAriaLabel)} ${t(preset.name)}`}
              >
                {t(preset.name)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4>{t(interaction.colorThemesLabel)}</h4>
          <div className="grid gap-3 lg:grid-cols-3">
            {interaction.colorThemes.map((theme, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-md font-medium text-center ${theme.color} transition-all duration-200 ${theme.id === colorTheme ? 'cursor-default ring-2 ring-blue-600' : 'cursor-pointer hover:shadow-md'}`}
                onClick={() => {
                  setColorTheme(theme.id);
                  setAnnouncement(t(interaction.themeSelected).replace('{theme}', t(theme.name)));
                }}
                aria-label={`${t(interaction.themeSelectorAriaLabel)} ${t(theme.name)} ${t(theme.description)}`}
              >
                <p className="font-semibold">{t(theme.name)}</p>
                <p className="text-sm">{t(theme.description)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerrainGenerator;
