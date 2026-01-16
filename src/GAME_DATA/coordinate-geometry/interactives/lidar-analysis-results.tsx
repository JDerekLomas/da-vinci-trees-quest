import { useEffect, useRef, useState } from 'react';
import translations from '../configs/lidar-analysis-results';
import { useTranslations } from '../../../hooks/useTranslations';

interface CityStructure {
  type: 'pyramid' | 'rectangle';
  name: string;
  position: { x: number; z: number };
  size?: number;
  height?: number;
  width?: number;
  pointCount: number;
}
const LiDARAnalysisResults = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const { t } = useTranslations();

  const handleResize = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const maxSize = Math.min(containerWidth, containerHeight, 500);

    setCanvasSize({
      width: maxSize,
      height: maxSize,
    });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const JUNGLE_SIZE = 200;
    const CITY_CENTER = { x: 20, z: -30 };
    const CITY_RADIUS = 50;
    const CITY_WIDTH = CITY_RADIUS * 1.8;
    const CITY_HEIGHT = CITY_RADIUS * 1.6;

    const pathwayData = {
      start: { x: -20, z: -30 },
      end: { x: 60, z: -30 },
      width: 8,
    };

    const cityStructures: CityStructure[] = [
      {
        type: 'pyramid',
        name: 'Triangle Garden',
        position: { x: CITY_CENTER.x, z: CITY_CENTER.z },
        size: 15,
        height: 20,
        pointCount: 500,
      },
      {
        type: 'rectangle',
        name: 'Rectangle Plaza',
        position: { x: CITY_CENTER.x + 15, z: CITY_CENTER.z + 5 },
        width: 20,
        height: 15,
        pointCount: 300,
      },
      {
        type: 'rectangle',
        name: 'Reservoir',
        position: { x: CITY_CENTER.x - 20, z: CITY_CENTER.z + 5 },
        width: 16,
        height: 16,
        pointCount: 200,
      },
      {
        type: 'rectangle',
        name: 'Court',
        position: { x: CITY_CENTER.x + 5, z: CITY_CENTER.z - 15 },
        width: 16,
        height: 12,
        pointCount: 200,
      },
    ];

    const drawAnalysisView = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(30, 60, 100, 0.2)';
      ctx.lineWidth = 0.5;
      const cellSize = 50;
      for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Border
      ctx.strokeStyle = 'rgba(100, 150, 200, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, height);
      // Title and cardinal directions
      ctx.fillStyle = '#ffffff';
      const fontSize = Math.max(16, Math.floor(width / 30));
      ctx.font = `${fontSize}px monospace`;
      ctx.fillText(t(translations.TITLE), 10, 20);

      ctx.fillStyle = '#ff3b30';
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.fillText(t(translations.NORTH), width / 2, 40);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(t(translations.EAST), width - 40, height / 2);
      ctx.fillText(t(translations.SOUTH), width / 2, height - 10);
      ctx.fillText(t(translations.WEST), 10, height / 2);

      // Coordinate transformation functions
      const worldToCanvasX = (worldX: number) => width / 2 + worldX * (width / JUNGLE_SIZE / 1.5);
      const worldToCanvasZ = (worldZ: number) => height / 2 + worldZ * (height / JUNGLE_SIZE / 1.5);

      // Canopy hits (green, sparse)
      ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
      for (let i = 0; i < 3000; i++) {
        const x = (Math.random() - 0.5) * JUNGLE_SIZE;
        const z = (Math.random() - 0.5) * JUNGLE_SIZE;

        const distToCity = Math.sqrt(Math.pow(x - CITY_CENTER.x, 2) + Math.pow(z - CITY_CENTER.z, 2));
        const nearPathway = Math.abs(z) < pathwayData.width / 2 && Math.abs(x) < Math.abs(pathwayData.end.x);

        if (distToCity > CITY_RADIUS * 0.8 && !nearPathway) {
          const canvasX = worldToCanvasX(x);
          const canvasZ = worldToCanvasZ(z);

          if (canvasX >= 0 && canvasX < width && canvasZ >= 0 && canvasZ < height) {
            ctx.fillRect(canvasX, canvasZ, 1, 1);
          }
        }
      }

      // Ground hits (blue, more dense)
      ctx.fillStyle = 'rgba(0, 120, 255, 0.6)';
      for (let i = 0; i < 6000; i++) {
        const x = (Math.random() - 0.5) * JUNGLE_SIZE;
        const z = (Math.random() - 0.5) * JUNGLE_SIZE;

        const distToCity = Math.sqrt(Math.pow(x - CITY_CENTER.x, 2) + Math.pow(z - CITY_CENTER.z, 2));

        const nearPathway = Math.abs(z) < pathwayData.width / 2 && Math.abs(x) < Math.abs(pathwayData.end.x);

        if ((distToCity > CITY_RADIUS * 0.5 || Math.random() < 0.3) && (!nearPathway || Math.random() < 0.3)) {
          const canvasX = worldToCanvasX(x);
          const canvasZ = worldToCanvasZ(z);

          if (canvasX >= 0 && canvasX < width && canvasZ >= 0 && canvasZ < height) {
            ctx.fillRect(canvasX, canvasZ, 1.5, 1.5);
          }
        }
      }
      // The pathway (blue points, dense)
      ctx.fillStyle = 'rgba(40, 180, 255, 0.9)';
      const { start, end, width: pathWidth } = pathwayData;
      const pathStartX = worldToCanvasX(start.x);
      const pathStartZ = worldToCanvasZ(start.z);
      const pathEndX = worldToCanvasX(end.x);
      const pathEndZ = worldToCanvasZ(end.z);

      const pathLength = Math.sqrt(Math.pow(pathEndX - pathStartX, 2) + Math.pow(pathEndZ - pathStartZ, 2));

      const numPathPoints = pathLength / 1.3;
      const canvasPathWidth = worldToCanvasX(pathWidth) - worldToCanvasX(0);

      for (let i = 0; i <= numPathPoints; i++) {
        const t = i / numPathPoints;
        const x = pathStartX + (pathEndX - pathStartX) * t;
        const z = pathStartZ + (pathEndZ - pathStartZ) * t;

        // Width to the pathway
        for (let w = -canvasPathWidth / 2; w <= canvasPathWidth / 2; w += 1) {
          // Noise to make it look like actual data points
          const jitterX = (Math.random() - 0.5) * 2;
          const jitterZ = (Math.random() - 0.5) * 2;

          ctx.fillRect(x + jitterX, z + w + jitterZ, 1.5, 1.5);

          if (Math.random() < 0.1) {
            ctx.fillRect(x + jitterX, z + w + jitterZ, 2, 2);
          }
        }
      }

      ctx.save();

      ctx.globalCompositeOperation = 'source-over';

      ctx.font = `bold ${fontSize}px monospace`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

      ctx.fillText('A', pathStartX, pathStartZ + canvasPathWidth / 2 + 20);
      ctx.fillText('B', pathEndX - 10, pathEndZ + canvasPathWidth / 2 + 20);

      ctx.restore();

      // City structures (orange points)
      ctx.fillStyle = 'rgba(255, 150, 0, 0.8)';

      // Main pyramid at city center
      const pyramidStructure = cityStructures[0];
      const pyramidX = worldToCanvasX(pyramidStructure.position.x);
      const pyramidZ = worldToCanvasZ(pyramidStructure.position.z);
      const pyramidSize = worldToCanvasX(pyramidStructure.size || 0) - worldToCanvasX(0);

      // Pyramid as a dense triangle of points
      for (let i = 0; i < 800; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distanceFactor = Math.pow(Math.random(), 0.7);
        const distance = distanceFactor * pyramidSize;
        const x = pyramidX + Math.cos(angle) * distance;
        const z = pyramidZ + Math.sin(angle) * distance;

        const heightFactor = 1 - distance / pyramidSize;
        const pointSize = 2 + heightFactor * 2;

        ctx.fillRect(x - pointSize / 2, z - pointSize / 2, pointSize, pointSize);
      }

      // Rectangular structures
      for (let i = 1; i < cityStructures.length; i++) {
        const structure = cityStructures[i];
        const structX = worldToCanvasX(structure.position.x);
        const structZ = worldToCanvasZ(structure.position.z);
        const structWidth = worldToCanvasX(structure.width || 0) - worldToCanvasX(0);
        const structHeight = worldToCanvasZ(structure.height || 0) - worldToCanvasZ(0);

        // Rectangular point cluster with well-defined edges
        for (let j = 0; j < 300; j++) {
          let x: number, z: number;

          if (Math.random() < 0.4) {
            // Points along the edges (40% of points)
            if (Math.random() < 0.5) {
              // Points along width edges
              x = structX - structWidth / 2 + Math.random() * structWidth;
              z =
                Math.random() < 0.5
                  ? structZ - structHeight / 2 + Math.random() * 2
                  : structZ + structHeight / 2 - Math.random() * 2;
            } else {
              // Points along height edges
              z = structZ - structHeight / 2 + Math.random() * structHeight;
              x =
                Math.random() < 0.5
                  ? structX - structWidth / 2 + Math.random() * 2
                  : structX + structWidth / 2 - Math.random() * 2;
            }
          } else {
            // Points within the rectangle (60% of points)
            x = structX - structWidth / 2 + Math.random() * structWidth;
            z = structZ - structHeight / 2 + Math.random() * structHeight;
          }

          // Vary point size for some depth impression
          const pointSize = 1.5 + Math.random();

          ctx.fillRect(x - pointSize / 2, z - pointSize / 2, pointSize, pointSize);
        }
      }

      // Rectangular city wall/perimeter
      const cityX = worldToCanvasX(CITY_CENTER.x);
      const cityZ = worldToCanvasZ(CITY_CENTER.z);
      const cityWidthCanvas = worldToCanvasX(CITY_WIDTH) - worldToCanvasX(0);
      const cityHeightCanvas = worldToCanvasZ(CITY_HEIGHT) - worldToCanvasZ(0);

      // Perimeter walls
      const wallPointsPerSide = 120;

      // Top wall (North)
      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const x = cityX - cityWidthCanvas / 2 + cityWidthCanvas * t;
        const z = cityZ - cityHeightCanvas / 2;
        const jitter = (Math.random() - 0.5) * 3;

        ctx.fillRect(x, z + jitter, 2, 2);
      }

      // Bottom wall (South)
      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const x = cityX - cityWidthCanvas / 2 + cityWidthCanvas * t;
        const z = cityZ + cityHeightCanvas / 2;
        const jitter = (Math.random() - 0.5) * 3;

        ctx.fillRect(x, z + jitter, 2, 2);
      }

      // Left wall (West)
      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const z = cityZ - cityHeightCanvas / 2 + cityHeightCanvas * t;
        const x = cityX - cityWidthCanvas / 2;
        const jitter = (Math.random() - 0.5) * 3;

        ctx.fillRect(x + jitter, z, 2, 2);
      }

      // Right wall (East)
      for (let i = 0; i < wallPointsPerSide; i++) {
        const t = i / wallPointsPerSide;
        const z = cityZ - cityHeightCanvas / 2 + cityHeightCanvas * t;
        const x = cityX + cityWidthCanvas / 2;
        const jitter = (Math.random() - 0.5) * 3;

        ctx.fillRect(x + jitter, z, 2, 2);
      }

      // Small structures throughout city area
      for (let i = 0; i < 15; i++) {
        // Keep structures within the rectangular city boundary
        const x = cityX - cityWidthCanvas / 2 + 10 + Math.random() * (cityWidthCanvas - 20);
        const z = cityZ - cityHeightCanvas / 2 + 10 + Math.random() * (cityHeightCanvas - 20);

        // Small rectangular buildings
        const buildingWidth = 5 + Math.random() * 8;
        const buildingHeight = 5 + Math.random() * 8;

        for (let j = 0; j < 30; j++) {
          const bx = x - buildingWidth / 2 + Math.random() * buildingWidth;
          const bz = z - buildingHeight / 2 + Math.random() * buildingHeight;
          const pointSize = 1 + Math.random();

          ctx.fillRect(bx, bz, pointSize, pointSize);
        }
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = `${fontSize}px monospace`;
      ctx.fillText(t(translations.SCAN_COMPLETE), 10, height - 10);
    };

    drawAnalysisView();
  }, [canvasRef, canvasSize]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-900" ref={containerRef}>
      <div className="relative">
        <span className="sr-only">{t(translations.graphDescription)}</span>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="bg-black bg-opacity-95 border border-gray-700 rounded-lg shadow-lg"
        />
        <div className="absolute top-0 left-0 w-full flex justify-between p-2"></div>
      </div>
    </div>
  );
};

export default LiDARAnalysisResults;
