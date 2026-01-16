import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';

interface CameraObscuraExplorerProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const CameraObscuraExplorer: React.FC<CameraObscuraExplorerProps> = ({ onInteraction }) => {
  const [objectDistance, setObjectDistance] = useState(15); // 15 feet
  const [screenDistance, setScreenDistance] = useState(5); // 5 feet

  const { t } = useTranslations();

  const objectHeight = 394; // Florence Cathedral height in feet
  const feetToMeter = 0.3048; // For visual diagram conversion
  const objectVisualScale = 50; // Same scale factor as screen distance for visual consistency
  const screenVisualScale = 50; // Scale factor for screen distance

  const imageHeight = (objectHeight * screenDistance) / objectDistance;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const CANVAS_WIDTH = 700;
  const CANVAS_HEIGHT = 260;
  const ROOM_WIDTH = 280; // 40% of canvas width
  const WALL_THICKNESS = 10;
  const ROOM_START_X = 420; // 60% of canvas width
  const PINHOLE_Y = CANVAS_HEIGHT / 2;

  const prevScreenDistance = useRef(screenDistance);

  useEffect(() => {
    if (prevScreenDistance.current !== screenDistance) {
      onInteraction({
        'screen-distance-slider-interaction': true,
      });
    }
    prevScreenDistance.current = screenDistance;
  }, [screenDistance]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const outsideSkyGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    outsideSkyGradient.addColorStop(0, '#87CEEB');
    outsideSkyGradient.addColorStop(0.5, '#ADD8E6');
    outsideSkyGradient.addColorStop(1, '#B0E0E6');

    ctx.fillStyle = outsideSkyGradient;
    ctx.fillRect(0, 0, ROOM_START_X, CANVAS_HEIGHT);

    const groundY = PINHOLE_Y + (objectHeight * feetToMeter) / 2;
    ctx.fillStyle = '#8B6F3D';
    ctx.fillRect(0, groundY, ROOM_START_X, CANVAS_HEIGHT - groundY);

    // Calculate object position (convert feet to meters for visual scaling)
    const objectX = ROOM_START_X - objectDistance * feetToMeter * objectVisualScale;
    const objectTop = PINHOLE_Y - (objectHeight * feetToMeter) / 2;
    const objectBottom = PINHOLE_Y + (objectHeight * feetToMeter) / 2;
    const objectWidth = 50;

    // Draw object boundary markers
    ctx.strokeStyle = '#E62300';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(objectX - 40, objectTop);
    ctx.lineTo(objectX + 10, objectTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(objectX - 40, objectBottom);
    ctx.lineTo(objectX + 10, objectBottom);
    ctx.stroke();

    // Draw cathedral building
    ctx.fillStyle = '#e8dcb9';
    const cathedralBaseTop = objectBottom - (objectBottom - objectTop) * 0.8;
    ctx.fillRect(objectX - objectWidth / 2, cathedralBaseTop, objectWidth, objectBottom - cathedralBaseTop);

    // Cathedral details
    ctx.fillStyle = '#d9c9a3';
    ctx.fillRect(objectX - objectWidth / 2, cathedralBaseTop, objectWidth, 10);
    ctx.fillRect(objectX - objectWidth / 2, cathedralBaseTop + 20, objectWidth, 6);
    ctx.fillRect(objectX - objectWidth / 2, cathedralBaseTop + 40, objectWidth, 6);

    // Main entrance
    ctx.fillStyle = '#47362b';
    ctx.fillRect(objectX - 8, objectBottom - 30, 16, 30);

    // Cathedral steps
    ctx.fillStyle = '#c9b99a';
    ctx.fillRect(objectX - 20, objectBottom - 5, 40, 5);
    ctx.fillRect(objectX - 15, objectBottom - 10, 30, 5);

    // Dome structure
    const domeRadius = objectWidth / 2;
    const domeBaseY = cathedralBaseTop;

    // Dome
    ctx.fillStyle = '#c14b0b';
    ctx.beginPath();
    ctx.arc(objectX, domeBaseY, domeRadius, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();

    // Dome ribs
    ctx.strokeStyle = '#8a3204';
    ctx.lineWidth = 2;

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 8;
      ctx.beginPath();
      ctx.moveTo(objectX, domeBaseY);
      ctx.lineTo(objectX + Math.cos(angle) * domeRadius, domeBaseY - Math.sin(angle) * domeRadius);
      ctx.stroke();
    }

    // Dome lantern
    ctx.fillStyle = '#e8dcb9';
    ctx.fillRect(objectX - 4, domeBaseY - domeRadius - 10, 8, 10);
    ctx.beginPath();
    ctx.arc(objectX, domeBaseY - domeRadius - 12, 5, 0, Math.PI * 2);
    ctx.fill();

    // Windows
    ctx.fillStyle = '#87CEFA';

    // Round window
    ctx.beginPath();
    ctx.arc(objectX, cathedralBaseTop + 20, 8, 0, Math.PI * 2);
    ctx.fill();

    // Side windows
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(objectX - objectWidth / 2 + 10, cathedralBaseTop + 30 + i * 15, 5, 10);
      ctx.fillRect(objectX + objectWidth / 2 - 15, cathedralBaseTop + 30 + i * 15, 5, 10);
    }

    // Draw room interior
    const roomGradient = ctx.createRadialGradient(
      ROOM_START_X + ROOM_WIDTH / 2,
      PINHOLE_Y,
      10,
      ROOM_START_X + ROOM_WIDTH / 2,
      PINHOLE_Y,
      ROOM_WIDTH / 2,
    );
    roomGradient.addColorStop(0, '#2d3748');
    roomGradient.addColorStop(1, '#1a202c');
    ctx.fillStyle = roomGradient;
    ctx.fillRect(ROOM_START_X + WALL_THICKNESS, 0, ROOM_WIDTH, CANVAS_HEIGHT);

    // Draw wall with pinhole
    const wallGradient = ctx.createLinearGradient(ROOM_START_X - 5, 0, ROOM_START_X + WALL_THICKNESS + 5, 0);
    wallGradient.addColorStop(0, '#4a5568');
    wallGradient.addColorStop(0.5, '#718096');
    wallGradient.addColorStop(1, '#4a5568');
    ctx.fillStyle = wallGradient;
    ctx.fillRect(ROOM_START_X, 0, WALL_THICKNESS, CANVAS_HEIGHT);

    // Draw pinhole
    const apertureSize = 5;
    const pinholeRadius = Math.max(1, apertureSize / 2);
    const glowSize = pinholeRadius * 3;

    // Pinhole glow
    const pinholeGlow = ctx.createRadialGradient(
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      0,
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      glowSize,
    );
    pinholeGlow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    pinholeGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    pinholeGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = pinholeGlow;
    ctx.beginPath();
    ctx.arc(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y, glowSize, 0, Math.PI * 2);
    ctx.fill();

    // Pinhole
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y, pinholeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Calculate screen position (convert feet to meters for visual scaling)
    const screenX = ROOM_START_X + WALL_THICKNESS + screenDistance * feetToMeter * screenVisualScale;

    // Draw screen
    const frameWidth = 10;
    ctx.fillStyle = '#3182CE';
    ctx.fillRect(screenX - frameWidth, 0, frameWidth * 2, CANVAS_HEIGHT);

    ctx.fillStyle = '#F7FAFC';
    ctx.fillRect(screenX - frameWidth / 2, 0, frameWidth, CANVAS_HEIGHT);

    // Add texture to screen
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    for (let i = 0; i < 200; i++) {
      const dotX = screenX - frameWidth / 2 + Math.random() * frameWidth;
      const dotY = Math.random() * CANVAS_HEIGHT;
      const dotSize = Math.random() * 1.5;

      ctx.beginPath();
      ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Calculate image position (convert feet to meters for visual scaling)
    const imageTop = PINHOLE_Y + (imageHeight * feetToMeter) / 2;
    const imageBottom = PINHOLE_Y - (imageHeight * feetToMeter) / 2;

    // Draw image boundaries
    ctx.strokeStyle = '#00FFFF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(screenX - 30, imageBottom);
    ctx.lineTo(screenX + 30, imageBottom);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(screenX - 30, imageTop);
    ctx.lineTo(screenX + 30, imageTop);
    ctx.stroke();

    // Calculate image parameters (convert feet to meters for visual scaling)
    const actualImageHeight = Math.abs(imageHeight * feetToMeter);
    const scaleFactor = actualImageHeight / (objectHeight * feetToMeter);
    const imageWidth = 55 * (Math.abs(imageHeight * feetToMeter) / (objectHeight * feetToMeter));

    // Ground calculations for image
    const groundHeightInverted = CANVAS_HEIGHT - groundY;
    const groundHeightScaled = groundHeightInverted * (actualImageHeight / CANVAS_HEIGHT);

    // Draw inverted sky in projection
    const invertedSkyGradient = ctx.createLinearGradient(0, imageBottom, 0, imageTop - groundHeightScaled);
    invertedSkyGradient.addColorStop(0, 'rgba(135, 206, 235, 0.7)');
    invertedSkyGradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.7)');
    invertedSkyGradient.addColorStop(1, 'rgba(176, 224, 230, 0.7)');

    ctx.fillStyle = invertedSkyGradient;
    ctx.fillRect(screenX - imageWidth / 2, imageBottom, imageWidth, actualImageHeight - groundHeightScaled);

    // Inverted ground
    ctx.fillStyle = 'rgba(139, 111, 61, 0.7)';
    ctx.fillRect(screenX - imageWidth / 2, imageTop - groundHeightScaled, imageWidth, groundHeightScaled);

    // Draw inverted cathedral
    ctx.fillStyle = 'rgba(232, 220, 185, 0.8)';
    const invertedBasePosY = imageBottom + (objectBottom - cathedralBaseTop) * scaleFactor;
    const invertedBaseHeight = (objectBottom - cathedralBaseTop) * scaleFactor;
    ctx.fillRect(screenX - imageWidth / 2, invertedBasePosY - invertedBaseHeight, imageWidth, invertedBaseHeight);

    // Cathedral front details (inverted)
    ctx.fillStyle = 'rgba(217, 201, 163, 0.8)';
    ctx.fillRect(screenX - imageWidth / 2, invertedBasePosY - 10 * scaleFactor, imageWidth, 10 * scaleFactor);
    ctx.fillRect(screenX - imageWidth / 2, invertedBasePosY - 26 * scaleFactor, imageWidth, 6 * scaleFactor);
    ctx.fillRect(screenX - imageWidth / 2, invertedBasePosY - 46 * scaleFactor, imageWidth, 6 * scaleFactor);

    // Main entrance (inverted)
    ctx.fillStyle = 'rgba(71, 54, 43, 0.8)';
    const invertedEntranceY = imageBottom + 30 * scaleFactor;
    ctx.fillRect(
      screenX - 8 * scaleFactor,
      invertedEntranceY - 30 * scaleFactor,
      16 * scaleFactor,
      30 * scaleFactor,
    );

    // Cathedral steps (inverted)
    ctx.fillStyle = 'rgba(201, 185, 154, 0.8)';
    ctx.fillRect(screenX - 20 * scaleFactor, invertedBasePosY, 40 * scaleFactor, 5 * scaleFactor);
    ctx.fillRect(
      screenX - 15 * scaleFactor,
      invertedBasePosY - 5 * scaleFactor,
      30 * scaleFactor,
      5 * scaleFactor,
    );

    // Dome structure (inverted)
    const invertedDomeRadius = domeRadius * scaleFactor;
    const invertedDomeBaseY = imageBottom + (objectBottom - domeBaseY) * scaleFactor;

    // Dome ribs (inverted)
    ctx.strokeStyle = 'rgba(138, 50, 4, 0.8)';
    ctx.lineWidth = 2 * scaleFactor;

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 8;
      ctx.beginPath();
      ctx.moveTo(screenX, invertedDomeBaseY);
      ctx.lineTo(
        screenX + Math.cos(angle) * invertedDomeRadius,
        invertedDomeBaseY + Math.sin(angle) * invertedDomeRadius,
      );
      ctx.stroke();
    }

    // Dome lantern (inverted)
    ctx.fillStyle = 'rgba(232, 220, 185, 0.8)';
    ctx.fillRect(
      screenX - 4 * scaleFactor,
      invertedDomeBaseY + invertedDomeRadius,
      8 * scaleFactor,
      10 * scaleFactor,
    );
    ctx.beginPath();
    ctx.arc(screenX, invertedDomeBaseY + invertedDomeRadius + 12 * scaleFactor, 5 * scaleFactor, 0, Math.PI * 2);
    ctx.fill();

    // Windows (inverted)
    ctx.fillStyle = 'rgba(135, 206, 250, 0.8)';

    // Round window (inverted)
    ctx.beginPath();
    ctx.arc(screenX, invertedDomeBaseY - 20 * scaleFactor, 8 * scaleFactor, 0, Math.PI * 2);
    ctx.fill();

    // Side windows (inverted)
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(
        screenX - imageWidth / 2 + 10 * scaleFactor,
        invertedDomeBaseY - (30 + i * 15) * scaleFactor,
        5 * scaleFactor,
        10 * scaleFactor,
      );
      ctx.fillRect(
        screenX + imageWidth / 2 - 15 * scaleFactor,
        invertedDomeBaseY - (30 + i * 15) * scaleFactor,
        5 * scaleFactor,
        10 * scaleFactor,
      );
    }

    // Draw light rays
    const rayGradient = ctx.createLinearGradient(objectX, PINHOLE_Y, screenX, PINHOLE_Y);
    rayGradient.addColorStop(0, 'rgba(255, 255, 0, 0.1)');
    rayGradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.3)');
    rayGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)');
    rayGradient.addColorStop(0.6, 'rgba(255, 255, 0, 0.3)');
    rayGradient.addColorStop(1, 'rgba(255, 255, 0, 0.1)');

    ctx.strokeStyle = rayGradient;
    ctx.lineWidth = 1;

    // Draw rays from top, middle and bottom of object
    ctx.beginPath();
    ctx.moveTo(objectX, objectTop);
    ctx.lineTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(screenX, imageBottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(objectX, objectBottom);
    ctx.lineTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(screenX, imageTop);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(objectX, PINHOLE_Y);
    ctx.lineTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(screenX, PINHOLE_Y);
    ctx.stroke();

    // Additional rays for detail
    ctx.beginPath();
    ctx.moveTo(objectX, objectTop + (objectHeight * feetToMeter) / 4);
    ctx.lineTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(screenX, PINHOLE_Y - (imageHeight * feetToMeter) / 4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(objectX, objectBottom - (objectHeight * feetToMeter) / 4);
    ctx.lineTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(screenX, PINHOLE_Y + (imageHeight * feetToMeter) / 4);
    ctx.stroke();

    // Add light particles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';

    const drawParticlesAlongLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      count: number,
    ) => {
      for (let i = 0; i < count; i++) {
        // First half (object to pinhole)
        const t1 = Math.random();
        const particleX1 = x1 + (x2 - x1) * t1;
        const particleY1 = y1 + (y2 - y1) * t1;
        const particleSize1 = Math.random() * 1.5;

        ctx.beginPath();
        ctx.arc(particleX1, particleY1, particleSize1, 0, Math.PI * 2);
        ctx.fill();

        // Second half (pinhole to screen)
        const t2 = Math.random();
        const particleX2 = x2 + (x3 - x2) * t2;
        const particleY2 = y2 + (y3 - y2) * t2;
        const particleSize2 = Math.random() * 1.5;

        ctx.beginPath();
        ctx.arc(particleX2, particleY2, particleSize2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Draw particles
    drawParticlesAlongLine(
      objectX,
      objectTop,
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      screenX,
      imageBottom,
      15,
    );
    drawParticlesAlongLine(
      objectX,
      objectBottom,
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      screenX,
      imageTop,
      15,
    );
    drawParticlesAlongLine(
      objectX,
      PINHOLE_Y,
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      screenX,
      PINHOLE_Y,
      15,
    );

    // Draw similar triangles
    // Object triangle
    const objectTriangleGradient = ctx.createLinearGradient(
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      objectX,
      PINHOLE_Y,
    );
    objectTriangleGradient.addColorStop(0, 'rgba(255, 99, 71, 0.05)');
    objectTriangleGradient.addColorStop(1, 'rgba(255, 99, 71, 0.3)');

    ctx.fillStyle = objectTriangleGradient;
    ctx.beginPath();
    ctx.moveTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(objectX, objectTop);
    ctx.lineTo(objectX, objectBottom);
    ctx.closePath();
    ctx.fill();

    // Object triangle border
    ctx.strokeStyle = 'rgba(255, 99, 71, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(objectX, objectTop);
    ctx.lineTo(objectX, objectBottom);
    ctx.closePath();
    ctx.stroke();

    // Image triangle
    const imageTriangleGradient = ctx.createLinearGradient(
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      screenX,
      PINHOLE_Y,
    );
    imageTriangleGradient.addColorStop(0, 'rgba(70, 130, 180, 0.05)');
    imageTriangleGradient.addColorStop(1, 'rgba(70, 130, 180, 0.3)');

    ctx.fillStyle = imageTriangleGradient;
    ctx.beginPath();
    ctx.moveTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(screenX, imageTop);
    ctx.lineTo(screenX, imageBottom);
    ctx.closePath();
    ctx.fill();

    // Image triangle border
    ctx.strokeStyle = 'rgba(49, 90, 125, 0.95)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ROOM_START_X + WALL_THICKNESS / 2, PINHOLE_Y);
    ctx.lineTo(screenX, imageTop);
    ctx.lineTo(screenX, imageBottom);
    ctx.closePath();
    ctx.stroke();

    // Angle markers
    const angleRadius = 15;

    // Object angle
    ctx.strokeStyle = 'rgba(184, 28, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      angleRadius,
      Math.atan2(objectBottom - PINHOLE_Y, objectX - (ROOM_START_X + WALL_THICKNESS / 2)),
      Math.atan2(objectTop - PINHOLE_Y, objectX - (ROOM_START_X + WALL_THICKNESS / 2)),
      true,
    );
    ctx.stroke();

    // Image angle
    ctx.strokeStyle = 'rgba(41, 77, 107, 0.8)';
    ctx.beginPath();
    ctx.arc(
      ROOM_START_X + WALL_THICKNESS / 2,
      PINHOLE_Y,
      angleRadius,
      Math.atan2(imageTop - PINHOLE_Y, screenX - (ROOM_START_X + WALL_THICKNESS / 2)),
      Math.atan2(imageBottom - PINHOLE_Y, screenX - (ROOM_START_X + WALL_THICKNESS / 2)),
      true,
    );
    ctx.stroke();

    // Draw labels
    ctx.font = 'bold 16px Aviner Next';

    // Object label
    ctx.fillStyle = '#E62300';
    ctx.fillText(t('scenes.S10.S10_D0_FX_C9.florence_cathedral'), objectX - 80, objectTop - 45);

    // Object height measurement
    ctx.beginPath();
    ctx.moveTo(objectX - 30, objectTop);
    ctx.lineTo(objectX - 30, objectBottom);
    ctx.strokeStyle = '#E62300';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Height arrows
    const arrowGradient = ctx.createLinearGradient(0, objectTop, 0, objectBottom);
    arrowGradient.addColorStop(0, '#E62300');
    arrowGradient.addColorStop(1, '#D14200');
    ctx.strokeStyle = arrowGradient;

    // Top arrow
    ctx.beginPath();
    ctx.moveTo(objectX - 30, objectTop);
    ctx.lineTo(objectX - 35, objectTop + 10);
    ctx.moveTo(objectX - 30, objectTop);
    ctx.lineTo(objectX - 25, objectTop + 10);
    ctx.stroke();

    // Bottom arrow
    ctx.beginPath();
    ctx.moveTo(objectX - 30, objectBottom);
    ctx.lineTo(objectX - 35, objectBottom - 10);
    ctx.moveTo(objectX - 30, objectBottom);
    ctx.lineTo(objectX - 25, objectBottom - 10);
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(objectX - 75, PINHOLE_Y - 10, 40, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`${objectHeight} ${t('scenes.S10.S10_D0_FX_C9.ft')}`, objectX - 75, PINHOLE_Y + 5);

    // Image label
    ctx.fillStyle = '#335D80';
    ctx.fillText(t('scenes.S10.S10_D0_FX_C9.image'), screenX + 10, imageBottom - 20);

    // Image height measurement
    ctx.beginPath();
    ctx.moveTo(screenX + 20, imageTop);
    ctx.lineTo(screenX + 20, imageBottom);
    ctx.strokeStyle = '#335D80';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Image arrows
    const imageArrowGradient = ctx.createLinearGradient(0, imageBottom, 0, imageTop);
    imageArrowGradient.addColorStop(0, '#335D80');
    imageArrowGradient.addColorStop(1, '#286CE6');
    ctx.strokeStyle = imageArrowGradient;

    // Top arrow
    ctx.beginPath();
    ctx.moveTo(screenX + 20, imageTop);
    ctx.lineTo(screenX + 25, imageTop - 10);
    ctx.moveTo(screenX + 20, imageTop);
    ctx.lineTo(screenX + 15, imageTop - 10);
    ctx.stroke();

    // Bottom arrow
    ctx.beginPath();
    ctx.moveTo(screenX + 20, imageBottom);
    ctx.lineTo(screenX + 25, imageBottom + 10);
    ctx.moveTo(screenX + 20, imageBottom);
    ctx.lineTo(screenX + 15, imageBottom + 10);
    ctx.stroke();

    // Image height text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(screenX + 31, PINHOLE_Y - 10, 100, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(t('scenes.S10.S10_D0_FX_C9.image_height'), screenX + 35, PINHOLE_Y + 5);

    // Object distance measurement
    ctx.fillStyle = '#F8F8F8';
    ctx.beginPath();
    ctx.moveTo(objectX, PINHOLE_Y + 40);
    ctx.lineTo(ROOM_START_X, PINHOLE_Y + 40);
    ctx.strokeStyle = '#F8F8F8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Distance arrows
    ctx.beginPath();
    ctx.moveTo(objectX, PINHOLE_Y + 40);
    ctx.lineTo(objectX + 10, PINHOLE_Y + 35);
    ctx.moveTo(objectX, PINHOLE_Y + 40);
    ctx.lineTo(objectX + 10, PINHOLE_Y + 45);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(ROOM_START_X, PINHOLE_Y + 40);
    ctx.lineTo(ROOM_START_X - 10, PINHOLE_Y + 35);
    ctx.moveTo(ROOM_START_X, PINHOLE_Y + 40);
    ctx.lineTo(ROOM_START_X - 10, PINHOLE_Y + 45);
    ctx.stroke();

    // Object distance text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    const objDistTextWidth = 155;
    ctx.fillRect(ROOM_START_X - objDistTextWidth - 35, PINHOLE_Y + 50, objDistTextWidth + 5, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(
      `${t('scenes.S10.S10_D0_FX_C9.object_distance')}: ${objectDistance} ${t('scenes.S10.S10_D0_FX_C9.ft')}`,
      ROOM_START_X - objDistTextWidth - 35,
      PINHOLE_Y + 65,
    );

    // Screen distance measurement
    ctx.fillStyle = '#F8F8F8';
    ctx.beginPath();
    ctx.moveTo(ROOM_START_X + WALL_THICKNESS, PINHOLE_Y + 40);
    ctx.lineTo(screenX, PINHOLE_Y + 40);
    ctx.strokeStyle = '#F8F8F8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Distance arrows
    ctx.beginPath();
    ctx.moveTo(ROOM_START_X + WALL_THICKNESS, PINHOLE_Y + 40);
    ctx.lineTo(ROOM_START_X + WALL_THICKNESS + 10, PINHOLE_Y + 35);
    ctx.moveTo(ROOM_START_X + WALL_THICKNESS, PINHOLE_Y + 40);
    ctx.lineTo(ROOM_START_X + WALL_THICKNESS + 10, PINHOLE_Y + 45);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(screenX, PINHOLE_Y + 40);
    ctx.lineTo(screenX - 10, PINHOLE_Y + 35);
    ctx.moveTo(screenX, PINHOLE_Y + 40);
    ctx.lineTo(screenX - 10, PINHOLE_Y + 45);
    ctx.stroke();

    // Screen distance text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(ROOM_START_X + WALL_THICKNESS + 10, PINHOLE_Y + 50, 160, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(
      `${t('scenes.S10.S10_D0_FX_C9.screen_distance')}: ${screenDistance} ${t('scenes.S10.S10_D0_FX_C9.ft')}`,
      ROOM_START_X + WALL_THICKNESS + 10,
      PINHOLE_Y + 65,
    );

    // Screen and pinhole labels
    ctx.fillStyle = '#CCCCCC';
    ctx.fillText('Screen', screenX - 30, 10);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Pinhole', ROOM_START_X + WALL_THICKNESS / 2 - 35, PINHOLE_Y - 15);
  }, [objectDistance, screenDistance, objectVisualScale, screenVisualScale]);

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const slider1 = document.getElementById(`slider-objectDistance`) as HTMLInputElement;
    const slider2 = document.getElementById(`slider-screenDistance`) as HTMLInputElement;
    if (slider1) {
      updateSliderBackground(slider1);
    }
    if (slider2) {
      updateSliderBackground(slider2);
    }
  }, [objectDistance, screenDistance, updateSliderBackground]);

  const objectDistanceSliderRef = useRef<HTMLInputElement>(null);
  const screenDistanceSliderRef = useRef<HTMLInputElement>(null);

  const handleSliderChangeForObjectDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);

    if (newValue !== objectDistance) {
      setObjectDistance(Number(e.target.value));
      updateSliderBackground(e.target as HTMLInputElement);
    }

    setTimeout(() => {
      objectDistanceSliderRef.current?.focus();
    }, 0);
  };

  const handleSliderChangeForScreenDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);

    if (newValue !== screenDistance) {
      setScreenDistance(Number(e.target.value));
      updateSliderBackground(e.target as HTMLInputElement);
    }

    setTimeout(() => {
      screenDistanceSliderRef.current?.focus();
    }, 0);
  };

  return (
    <div className="flex flex-col mx-auto overflow-hidden">
      <div className="w-full max-w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border border-gray-300 bg-white mb-4 max-w-full rounded-lg"
          style={{ justifySelf: 'center' }}
          aria-label={t('scenes.S10.S10_D0_FX_C9.pinhole_camera_canvas')}
          role="img"
        />

        <div className="flex flex-wrap gap-4 mb-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex-1 min-w-64">
            <label className="block text-md text-gray-700 font-semibold mb-1">
              {t('scenes.S10.S10_D0_FX_C9.object_distance')}: {objectDistance} {t('scenes.S10.S10_D0_FX_C9.ft')}
            </label>
            <input
              id="slider-objectDistance"
              ref={objectDistanceSliderRef}
              type="range"
              min="10"
              max="20"
              step="1"
              placeholder="0"
              value={objectDistance}
              onChange={handleSliderChangeForObjectDistance}
              className="w-full global-slider"
              aria-label={t('scenes.S10.S10_D0_FX_C9.object_distance_slider')}
            />
          </div>

          <div className="flex-1 min-w-64">
            <label className="block text-md font-semibold text-gray-700 mb-1">
              {t('scenes.S10.S10_D0_FX_C9.screen_distance')}: {screenDistance} {t('scenes.S10.S10_D0_FX_C9.ft')}
            </label>
            <input
              id="slider-screenDistance"
              ref={screenDistanceSliderRef}
              type="range"
              min="1"
              max="10"
              step="1"
              placeholder="0"
              value={screenDistance}
              onChange={handleSliderChangeForScreenDistance}
              className="w-full global-slider"
              aria-label={t('scenes.S10.S10_D0_FX_C9.screen_distance_slider')}
            />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg mb-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">{t('scenes.S10.S10_D0_FX_C9.image_height_calculation')}:</h3>
          <div className="flex items-center justify-center">
            <div
              className="text-base mb-2 font-medium text-gray-700 flex justify-center items-center gap-x-2"
              aria-hidden="true"
            >
              <div
                className="flex flex-col"
                style={{ fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}
              >
                <span className="text-red-800 border-b border-b-black pb-0.5">
                  {t('scenes.S10.S10_D0_FX_C9.image_height')}
                </span>
                <span className="text-blue-800">{t('scenes.S10.S10_D0_FX_C9.object_height')}</span>
              </div>
              <div>=</div>
              <div
                className="flex flex-col"
                style={{ fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}
              >
                <span className="text-red-800 border-b border-b-black pb-0.5">
                  {t('scenes.S10.S10_D0_FX_C9.screen_distance')}
                </span>
                <span className="text-blue-800">{t('scenes.S10.S10_D0_FX_C9.object_distance')}</span>
              </div>
            </div>
            <span className="sr-only">{`${t('scenes.S10.S10_D0_FX_C9.formula_1')}.`}</span>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="text-base mb-2 font-medium text-gray-700 flex justify-center items-center gap-x-2"
              aria-hidden="true"
            >
              <div
                className="flex flex-col justify-center"
                style={{ fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}
              >
                <span className="text-red-800 border-b border-b-black pb-0.5">
                  {t('scenes.S10.S10_D0_FX_C9.image_height')}
                </span>
                <span className="text-blue-800 text-center">
                  {objectHeight} {t('scenes.S10.S10_D0_FX_C9.ft')}
                </span>
              </div>
              <div>=</div>
              <div
                className="flex flex-col"
                style={{ fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}
              >
                <span className="text-red-800 border-b border-b-black pb-0.5">
                  {screenDistance} {t('scenes.S10.S10_D0_FX_C9.ft')}
                </span>
                <span className="text-blue-800">
                  {objectDistance} {t('scenes.S10.S10_D0_FX_C9.ft')}
                </span>
              </div>
            </div>
            <span className="sr-only">{`${t('scenes.S10.S10_D0_FX_C9.formula_2')} ${screenDistance} ${t('scenes.S10.S10_D0_FX_C9.ft')} ${t('scenes.S10.S10_D0_FX_C9.divided_by')} ${objectDistance} ${t('scenes.S10.S10_D0_FX_C9.ft')}.`}</span>
          </div>
          <div
            className="flex justify-center items-center gap-x-2 font-medium"
            style={{ fontFamily: 'Besley', fontWeight: 'bold', fontStyle: 'italic' }}
            aria-hidden="true"
          >
            <span className="text-red-800">{t('scenes.S10.S10_D0_FX_C9.image_height')}</span>
            <span>=</span>
            <span>
              {Math.round(imageHeight)} {t('scenes.S10.S10_D0_FX_C9.ft')}
            </span>
          </div>
          <span className="sr-only">{`${t('scenes.S10.S10_D0_FX_C9.formula_3')} ${Math.round(imageHeight)} ${t('scenes.S10.S10_D0_FX_C9.ft')}.`}</span>
        </div>
      </div>
    </div>
  );
};

export default CameraObscuraExplorer;
