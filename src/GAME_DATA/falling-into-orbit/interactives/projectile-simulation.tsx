import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../../shared/slider.css';
import { ProjectileSimulationProps } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';

const ProjectileSimulation: React.FC<ProjectileSimulationProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;
  const { payload } = useEventListener('projectile-simulation');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cannonBarrelSVGRef = useRef<HTMLImageElement | null>(null);
  const cannonBaseSVGRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Simulation State
  const EARTH_GRAVITY_FT = 32.2;
  const CANNON_WORLD_WIDTH = 300;

  const [angle, setAngle] = useState(45);
  const angleSliderRef = useRef(angle);
  const [velocity, setVelocity] = useState(328.1);
  const velocitySliderRef = useRef(velocity);
  const [results, setResults] = useState<Array<{ angle: string; velocity: string; distance: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isRocketLaunched, setIsRocketLaunched] = useState(false);

  const projectileRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, destroyed: false, radius: 10 });
  const simulationRef = useRef({
    isRunning: false,
    time: 0,
    path: [] as Array<{ x: number; y: number }>,
    timeScale: 1.5,
    maxAltitude: 0,
    baseScale: 0.4, // Store the initial/base scale
  });
  const viewRef = useRef({ scale: 0.2, offsetX: 50, offsetY: 0 });
  const mouseRef = useRef({ isPanning: false, lastX: 0, lastY: 0, userHasPanned: false });
  const explosionRef = useRef({ active: false, particles: [] as Array<any>, startTime: 0 });
  const starsRef = useRef<Array<{ screenX: number; screenY: number; radius: number; opacity: number }>>([]);
  const screenShakeRef = useRef({ active: false, magnitude: 0, duration: 0, startTime: 0 });

  // Trajectory Formula
  const getTrajectoryFormula = useCallback(() => {
    const angleRad = (angle * Math.PI) / 180;
    const b = Math.tan(angleRad);
    const a = -(EARTH_GRAVITY_FT / (2 * velocity ** 2 * Math.cos(angleRad) ** 2));
    return { a, b };
  }, [angle, velocity]);

  // Create Stars
  const createStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const stars = [];
    for (let i = 0; i < 500; i++) {
      stars.push({
        screenX: Math.random() * canvas.width,
        screenY: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    starsRef.current = stars;
  }, []);

  // Set Initial View
  const setInitialView = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Center the cannon (at world position 0, 0) on screen
    // The cannon is at ground level (y=0), so we position it near the bottom of the canvas
    const baseScale = 0.2;
    simulationRef.current.baseScale = baseScale;
    viewRef.current = {
      scale: baseScale,
      offsetX: canvas.width / 2, // Center horizontally - world origin (0,0) at center
      offsetY: canvas.height * 0.85, // Position near bottom - world y=0 appears here
    };
  }, []);

  // Resize Canvas
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    createStars();
    setInitialView();
    draw();
  }, [createStars, setInitialView]);

  // Drawing Functions
  const drawStars = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    starsRef.current.forEach((star) => {
      ctx.globalAlpha = star.opacity;
      ctx.beginPath();
      ctx.arc(star.screenX, star.screenY, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;
  }, []);

  const drawPlanetSurface = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const view = viewRef.current;
    const groundGradient = ctx.createLinearGradient(0, 0, 0, -5000);
    groundGradient.addColorStop(0, '#4a5568');
    groundGradient.addColorStop(1, '#1a202c');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(-100000, -10000, 200000, 10000);

    const minPixelSpacing = 120;
    const tickOptions = [100, 200, 500, 1000, 2000, 5000, 10000];
    let majorTickSpacing = tickOptions[0];

    for (const spacing of tickOptions) {
      majorTickSpacing = spacing;
      if (spacing * view.scale > minPixelSpacing) {
        break;
      }
    }

    const visibleStart = -view.offsetX / view.scale;
    const visibleEnd = (canvas.width - view.offsetX) / view.scale;
    const firstTick = Math.floor(visibleStart / majorTickSpacing) * majorTickSpacing;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillStyle = 'white';
    ctx.font = `bold ${28 / view.scale}px Inter`;
    ctx.textAlign = 'center';

    for (let x = firstTick; x <= visibleEnd; x += majorTickSpacing) {
      ctx.save();
      ctx.translate(x, -30 / view.scale);
      ctx.scale(1, -1);
      const text = `${x.toFixed(0)}ft`;
      const textMetrics = ctx.measureText(text);
      ctx.fillStyle = 'rgba(17, 25, 40, 0.7)';
      ctx.fillRect(
        -textMetrics.width / 2 - 5 / view.scale,
        -20 / view.scale,
        textMetrics.width + 10 / view.scale,
        30 / view.scale,
      );
      ctx.fillStyle = 'white';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
  }, []);

  const drawProjectile = useCallback((ctx: CanvasRenderingContext2D) => {
    const projectile = projectileRef.current;
    const simulation = simulationRef.current;
    const view = viewRef.current;

    if (!simulation.isRunning || projectile.destroyed) return;

    const radius = projectile.radius / view.scale;
    const gradient = ctx.createRadialGradient(-radius * 0.3, -radius * 0.4, radius * 0.1, 0, 0, radius);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.1, '#E0E0E0');
    gradient.addColorStop(0.4, '#A0A0A0');
    gradient.addColorStop(0.8, '#424242');
    gradient.addColorStop(1, '#111111');

    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 1 / view.scale;
    ctx.stroke();
    ctx.restore();
  }, []);

  const drawExplosion = useCallback((ctx: CanvasRenderingContext2D) => {
    const explosion = explosionRef.current;
    const view = viewRef.current;

    explosion.particles.forEach((p) => {
      const elapsed = Date.now() - p.startTime;
      if (elapsed < p.lifespan) {
        const lifeRatio = 1 - elapsed / p.lifespan;
        ctx.globalAlpha = lifeRatio;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius / view.scale, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1.0;
  }, []);

  const drawTrajectoryPrediction = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const view = viewRef.current;
      const simulation = simulationRef.current;

      // Only show prediction before launch (when not launched and not running)
      if (simulation.isRunning || isRocketLaunched) return;

      const angleRad = (angle * Math.PI) / 180;
      const barrelLength = 6; // Same as in the original code
      const startX = barrelLength * Math.cos(angleRad);
      const startY = barrelLength * Math.sin(angleRad);

      // Calculate trajectory points
      const predictionPoints: Array<{ x: number; y: number }> = [];
      let predX = startX;
      let predY = startY;
      let predVx = velocity * Math.cos(angleRad);
      let predVy = velocity * Math.sin(angleRad);

      const dt = 0.1; // Time step for prediction
      const maxSteps = 500; // Limit iterations

      for (let i = 0; i < maxSteps; i++) {
        predX += predVx * dt;
        predY += predVy * dt;
        predVy -= EARTH_GRAVITY_FT * dt;

        // Stop when projectile hits the ground (y <= 0)
        if (predY <= 0) {
          predY = 0;
          predictionPoints.push({ x: predX, y: predY });
          break;
        }

        predictionPoints.push({ x: predX, y: predY });
      }

      // Draw red dotted line
      if (predictionPoints.length > 1) {
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 3 / view.scale;
        ctx.setLineDash([10 / view.scale, 5 / view.scale]);
        ctx.beginPath();
        ctx.moveTo(predictionPoints[0].x, predictionPoints[0].y);
        for (let i = 1; i < predictionPoints.length; i++) {
          ctx.lineTo(predictionPoints[i].x, predictionPoints[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash
      }
    },
    [angle, velocity, isRocketLaunched],
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const view = viewRef.current;
    const simulation = simulationRef.current;
    const explosion = explosionRef.current;
    const screenShake = screenShakeRef.current;

    // Sky gradient
    const skyGradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height,
      0,
      canvas.width / 2,
      canvas.height,
      canvas.height,
    );
    skyGradient.addColorStop(0, '#3a6b99');
    skyGradient.addColorStop(0.5, '#173a5e');
    skyGradient.addColorStop(1, '#0a192f');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars(ctx);

    // Screen shake
    let shakeX = 0,
      shakeY = 0;
    if (screenShake.active) {
      const falloff = (screenShake.duration - (Date.now() - screenShake.startTime)) / screenShake.duration;
      if (falloff > 0) {
        const mag = screenShake.magnitude * falloff * falloff;
        shakeX = (Math.random() - 0.5) * mag;
        shakeY = (Math.random() - 0.5) * mag;
      }
    }

    ctx.translate(shakeX, shakeY);
    ctx.save();
    ctx.translate(view.offsetX, view.offsetY);
    ctx.scale(view.scale, -view.scale);

    drawPlanetSurface(ctx, canvas);

    // Draw trajectory prediction (before launch)
    drawTrajectoryPrediction(ctx);

    // Draw path (during/after flight)
    if (simulation.path.length > 1) {
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 5 / view.scale;
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur = 15 / view.scale;
      ctx.beginPath();
      ctx.moveTo(simulation.path[0].x, simulation.path[0].y);
      for (let i = 1; i < simulation.path.length; i++) {
        ctx.lineTo(simulation.path[i].x, simulation.path[i].y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    drawProjectile(ctx);

    // Draw cannon
    const angleRad = (angle * Math.PI) / 180;
    const drawWidth = CANNON_WORLD_WIDTH;
    const drawHeight = drawWidth * (80 / 150);
    const pivotXOffset = -drawWidth * (45 / 150);
    const pivotYOffset = -drawHeight * (35 / 80);

    // Draw stationary base (flipped right-side up)
    ctx.save();
    ctx.translate(0, 0);
    ctx.scale(1, 1);
    if (cannonBaseSVGRef.current && cannonBaseSVGRef.current.complete) {
      ctx.drawImage(cannonBaseSVGRef.current, pivotXOffset, -pivotYOffset - drawHeight, drawWidth, drawHeight);
    }
    ctx.restore();

    // Draw rotating barrel
    ctx.save();
    ctx.translate(0, 0);
    ctx.scale(1, -1);
    ctx.rotate(-angleRad);
    if (cannonBarrelSVGRef.current && cannonBarrelSVGRef.current.complete) {
      ctx.drawImage(cannonBarrelSVGRef.current, pivotXOffset, pivotYOffset, drawWidth, drawHeight);
    }
    ctx.restore();

    if (explosion.active) drawExplosion(ctx);

    ctx.restore();
    ctx.restore();
  }, [angle, drawStars, drawPlanetSurface, drawProjectile, drawExplosion, drawTrajectoryPrediction]);

  // Effects Functions
  const triggerExplosion = useCallback((x: number, y: number) => {
    const explosion = explosionRef.current;
    explosion.active = true;
    explosion.particles = [];
    explosion.startTime = Date.now();
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 500 + 100;
      explosion.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 20 + 10,
        lifespan: Math.random() * 1000 + 500,
        startTime: Date.now(),
        color: `rgba(255, ${Math.floor(Math.random() * 155) + 100}, 0, 0.8)`,
      });
    }
  }, []);

  const updateExplosion = useCallback(() => {
    const explosion = explosionRef.current;
    const dt = 1 / 60.0;

    explosion.particles.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy -= EARTH_GRAVITY_FT * dt;
      if (p.y < 0) {
        p.y = 0;
        p.vy *= -0.4;
        p.vx *= 0.8;
      }
    });
  }, []);

  const triggerScreenShake = useCallback((magnitude: number, duration: number) => {
    const screenShake = screenShakeRef.current;
    screenShake.magnitude = magnitude;
    screenShake.duration = duration;
    screenShake.startTime = Date.now();
    screenShake.active = true;
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    const projectile = projectileRef.current;
    const simulation = simulationRef.current;
    const view = viewRef.current;
    const explosion = explosionRef.current;
    const screenShake = screenShakeRef.current;
    const canvas = canvasRef.current;
    const mouse = mouseRef.current;

    if (!canvas) return;

    let stillAnimating = false;

    if (simulation.isRunning) {
      stillAnimating = true;
      const dt = (1 / 60.0) * simulation.timeScale;
      simulation.time += dt;

      projectile.vy -= EARTH_GRAVITY_FT * dt;
      projectile.x += projectile.vx * dt;
      projectile.y += projectile.vy * dt;

      simulation.path.push({ x: projectile.x, y: projectile.y });

      // Track maximum altitude
      if (projectile.y > simulation.maxAltitude) {
        simulation.maxAltitude = projectile.y;
      }

      // Camera tracking - only if user hasn't manually panned
      if (!mouse.userHasPanned) {
        const baseScale = simulation.baseScale;
        const currentAltitude = projectile.y;
        const maxAltitude = simulation.maxAltitude;

        // Dynamic zoom calculation
        let targetScale = baseScale;

        if (maxAltitude > 0) {
          // Calculate zoom based on altitude
          // Zoom out as altitude increases, zoom in as it comes down
          const altitudeRatio = currentAltitude / maxAltitude;

          // When going up (altitudeRatio < 1), zoom out more
          // When coming down (altitudeRatio decreases from 1), zoom back in
          if (altitudeRatio >= 1) {
            // At or past peak - most zoomed out
            const minScale = baseScale * 0.3; // Zoom out to 30% of base scale at peak
            targetScale = minScale;
          } else {
            // Going up or coming down - interpolate between base and min scale
            const minScale = baseScale * 0.3;
            // Use altitude ratio to determine zoom level
            // Higher altitude = more zoomed out
            targetScale = baseScale - (baseScale - minScale) * altitudeRatio;
          }
        }

        // Smoothly interpolate to target scale
        const scaleLerpFactor = 0.03;
        view.scale += (targetScale - view.scale) * scaleLerpFactor;
        view.scale = Math.max(0.05, Math.min(2, view.scale)); // Clamp scale

        // Position tracking - keep ball centered
        const positionLerpFactor = 0.05;
        const targetOffsetX = canvas.width / 2 - projectile.x * view.scale;
        view.offsetX += (targetOffsetX - view.offsetX) * positionLerpFactor;
        const targetOffsetY = canvas.height * 0.6 + projectile.y * view.scale;
        view.offsetY += (targetOffsetY - view.offsetY) * positionLerpFactor;
      }

      if (projectile.y < 0 && simulation.time > 0.1) {
        projectile.y = 0;
        simulation.isRunning = false;
        projectile.destroyed = true;
        setIsRunning(false);

        setResults((prev) => [
          ...prev,
          {
            angle: angle.toFixed(1),
            velocity: velocity.toFixed(1),
            distance: projectile.x.toFixed(0),
          },
        ]);

        triggerExplosion(projectile.x, projectile.y);
        triggerScreenShake(15, 500);
      }
    }

    if (explosion.active) {
      updateExplosion();
      if (Date.now() - explosion.startTime < 2000) {
        stillAnimating = true;
      } else {
        explosion.active = false;
      }
    }

    if (screenShake.active) {
      const elapsed = Date.now() - screenShake.startTime;
      if (elapsed > screenShake.duration) {
        screenShake.active = false;
      }
      stillAnimating = true;
    }

    draw();

    if (stillAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [angle, velocity, draw, triggerExplosion, triggerScreenShake, updateExplosion]);

  // Fire Projectile
  const fireProjectile = useCallback(() => {
    setIsRocketLaunched(true);
    const simulation = simulationRef.current;
    const projectile = projectileRef.current;
    const explosion = explosionRef.current;
    const mouse = mouseRef.current;

    if (simulation.isRunning) return;

    simulation.isRunning = true;
    simulation.time = 0;
    simulation.path = [];
    simulation.maxAltitude = 0; // Reset max altitude tracking
    projectile.x = 0;
    projectile.y = 0;
    projectile.destroyed = false;
    explosion.active = false;
    mouse.userHasPanned = false; // Re-enable auto-tracking

    setIsRunning(true);

    const angleRad = (angle * Math.PI) / 180;
    projectile.vx = velocity * Math.cos(angleRad);
    projectile.vy = velocity * Math.sin(angleRad);

    animationRef.current = requestAnimationFrame(animate);
  }, [angle, velocity, animate]);

  // Reset Simulation
  const resetSimulation = useCallback(() => {
    const simulation = simulationRef.current;
    const projectile = projectileRef.current;
    const explosion = explosionRef.current;
    const screenShake = screenShakeRef.current;
    const mouse = mouseRef.current;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    simulation.isRunning = false;
    simulation.path = [];
    simulation.maxAltitude = 0; // Reset max altitude tracking
    projectile.destroyed = false;
    explosion.active = false;
    screenShake.active = false;
    mouse.userHasPanned = false;

    setResults([]);
    setIsRunning(false);
    setIsRocketLaunched(false);
    setInitialView();
    draw();
  }, [setInitialView, draw]);

  // Mouse Events
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (simulationRef.current.isRunning) return;
    mouseRef.current.isPanning = true;
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
    mouseRef.current.userHasPanned = true;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const mouse = mouseRef.current;
      const view = viewRef.current;

      if (!mouse.isPanning || simulationRef.current.isRunning) return;

      view.offsetX += e.clientX - mouse.lastX;
      view.offsetY += e.clientY - mouse.lastY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      draw();
    },
    [draw],
  );

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isPanning = false;
  }, []);

  // Handle double-click to reset camera and re-enable auto-tracking
  const handleDoubleClick = useCallback(() => {
    mouseRef.current.userHasPanned = false;
    setInitialView();
    draw();
  }, [setInitialView, draw]);

  // Zoom functionality
  const handleZoomIn = useCallback(() => {
    const canvas = canvasRef.current;
    const view = viewRef.current;
    const mouse = mouseRef.current;

    if (!canvas) return;

    mouse.userHasPanned = true;

    // Zoom around canvas center
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const worldX = (canvasCenterX - view.offsetX) / view.scale;
    const worldY = (canvasCenterY - view.offsetY) / -view.scale;

    const factor = 1.2; // Zoom in by 20%
    const newScale = Math.max(0.05, Math.min(2, view.scale * factor));

    view.scale = newScale;
    view.offsetX = canvasCenterX - worldX * view.scale;
    view.offsetY = canvasCenterY + worldY * view.scale;
    draw();
  }, [draw]);

  const handleZoomOut = useCallback(() => {
    const canvas = canvasRef.current;
    const view = viewRef.current;
    const mouse = mouseRef.current;

    if (!canvas) return;

    mouse.userHasPanned = true;

    // Zoom around canvas center
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const worldX = (canvasCenterX - view.offsetX) / view.scale;
    const worldY = (canvasCenterY - view.offsetY) / -view.scale;

    const factor = 0.833; // Zoom out by ~20% (1/1.2)
    const newScale = Math.max(0.05, Math.min(2, view.scale * factor));

    view.scale = newScale;
    view.offsetX = canvasCenterX - worldX * view.scale;
    view.offsetY = canvasCenterY + worldY * view.scale;
    draw();
  }, [draw]);

  // Initialize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load cannon barrel SVG (the part that rotates)
    const barrelImg = new Image();
    barrelImg.onload = () => {
      draw();
    };
    barrelImg.src =
      'data:image/svg+xml,' +
      encodeURIComponent(`
      <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gunMetal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#8e9eab"/>
            <stop offset="50%" stop-color="#f0f4f7"/>
            <stop offset="100%" stop-color="#8e9eab"/>
          </linearGradient>
          <linearGradient id="darkMetal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#4a5568"/>
            <stop offset="100%" stop-color="#1a202c"/>
          </linearGradient>
        </defs>
        <path d="M 50 30 L 140 25 L 145 30 L 145 40 L 140 45 L 50 40 Z" fill="url(#gunMetal)" stroke="#2d3748" stroke-width="1"/>
        <rect x="60" y="29" width="10" height="12" fill="#a0aec0" rx="2"/>
        <rect x="80" y="28" width="10" height="14" fill="#a0aec0" rx="2"/>
        <rect x="100" y="27" width="10" height="16" fill="#a0aec0" rx="2"/>
        <rect x="145" y="22" width="5" height="26" fill="url(#darkMetal)" rx="1"/>
        <rect x="150" y="20" width="5" height="30" fill="url(#darkMetal)" rx="1"/>
        <rect x="25" y="25" width="25" height="20" fill="url(#darkMetal)" rx="3" stroke="#1a202c" stroke-width="1.5"/>
        <circle cx="45" cy="35" r="8" fill="url(#darkMetal)"/>
        <circle cx="45" cy="35" r="4" fill="#a0aec0"/>
      </svg>
    `);
    cannonBarrelSVGRef.current = barrelImg;

    // Load cannon base SVG (stationary)
    const baseImg = new Image();
    baseImg.onload = () => {
      draw();
    };
    baseImg.src =
      'data:image/svg+xml,' +
      encodeURIComponent(`
      <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="darkMetal2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#4a5568"/>
            <stop offset="100%" stop-color="#1a202c"/>
          </linearGradient>
          <radialGradient id="darkHub2">
            <stop offset="0%" stop-color="#666" />
            <stop offset="100%" stop-color="#222" />
          </radialGradient>
        </defs>
        <path d="M 0 75 L 90 75 L 80 50 L 10 50 Z" fill="url(#darkMetal2)" stroke="#1a202c" stroke-width="1.5"/>
        <circle cx="35" cy="50" r="22" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
        <circle cx="35" cy="50" r="18" fill="none" stroke="#4a5568" stroke-width="2" stroke-dasharray="8 4"/>
        <circle cx="35" cy="50" r="5" fill="url(#darkHub2)"/>
      </svg>
    `);
    cannonBaseSVGRef.current = baseImg;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas]);

  // Update preview when sliders change
  useEffect(() => {
    draw();
  }, [angle, velocity, draw]);

  // Track angle changes
  useEffect(() => {
    if (angleSliderRef.current !== angle && !isRunning && !isRocketLaunched) {
      onInteraction({
        'is-angle-changed': true,
      });
      angleSliderRef.current = angle;
    }
  }, [angle, isRocketLaunched, onInteraction]);

  // Track velocity changes
  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if (
        'checkSpeedSliderChange' in payload &&
        typeof payload.checkSpeedSliderChange === 'boolean' &&
        payload.checkSpeedSliderChange &&
        velocitySliderRef.current !== velocity &&
        isRocketLaunched
      ) {
        onInteraction({
          'is-speed-changed': true,
        });
        velocitySliderRef.current = velocity;
      }

      if (
        'checkMaxSpeedLaunch' in payload &&
        typeof payload.checkMaxSpeedLaunch === 'boolean' &&
        payload.checkMaxSpeedLaunch &&
        velocity === 330 &&
        isRocketLaunched
      ) {
        onInteraction({
          'has-launched-with-max-speed': true,
        });
      }
    }
  }, [payload, velocity, isRocketLaunched, onInteraction]);

  // Slider background update
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const angleSlider = document.getElementById('angle-slider') as HTMLInputElement;
    const velocitySlider = document.getElementById('velocity-slider') as HTMLInputElement;

    if (angleSlider) {
      updateSliderBackground(angleSlider);
    }
    if (velocitySlider) {
      updateSliderBackground(velocitySlider);
    }
  }, [angle, velocity, updateSliderBackground]);

  const formula = getTrajectoryFormula();

  return (
    <div className="flex flex-col gap-6 text-lg max-w-5xl mx-auto">
      {/* Controls Row 1: Sliders in same row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="slider">
          <label className="block">
            <span className="font-bold">{t(translations.angle)}:</span>
            <span> {angle.toFixed(1)}°</span>
          </label>
          <div className="relative">
            <input
              id="angle-slider"
              type="range"
              min="0"
              max="89"
              value={angle}
              step="0.1"
              onChange={(e) => setAngle(parseFloat(e.target.value))}
              disabled={isRunning || isRocketLaunched}
              className="global-slider w-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-valuetext={`${t(translations.angle)}: ${angle.toFixed(1)}°`}
            />
          </div>
        </div>

        <div className="slider">
          <label className="block">
            <span className="font-bold">{t(translations.velocity)}:</span>
            <span> {velocity.toFixed(1)} ft/s</span>
          </label>
          <div className="relative">
            <input
              id="velocity-slider"
              type="range"
              min="1"
              max="330"
              value={velocity}
              step="0.1"
              onChange={(e) => setVelocity(parseFloat(e.target.value))}
              disabled={isRunning || isRocketLaunched}
              className="global-slider w-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-valuetext={`${t(translations.velocity)}: ${velocity.toFixed(1)} ft/s`}
            />
          </div>
        </div>
      </div>

      {/* Controls Row 2: Formula and Fire Button */}
      <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-6">
        <div className="text-lg font-bold text-gray-700">
          <div className="mb-2">
            <span className="mr-1">{t(translations.formula)}:</span>
            <span className="font-besley">
              <em className="text-[#008217]">y</em> = <span>{formula.a.toFixed(4)}</span>
              <em className="text-[#0061FC]">x²</em>+ <span>{formula.b.toFixed(3)}</span>
              <em className="text-[#0061FC]">x</em>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fireProjectile}
            className="px-10 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#006BE0]"
            disabled={isRunning || isRocketLaunched}
          >
            {t(translations.fire)}
          </button>
          <button
            onClick={resetSimulation}
            className="px-8 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#006BE0]"
            disabled={isRunning}
          >
            {t(translations.reset)}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[440px] rounded-lg overflow-hidden border border-gray-300 mb-6 xl:mb-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        />

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white/90 hover:bg-white hover:text-blue-600 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white/90 hover:bg-white hover:text-blue-600 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="border-2 border-[#006BE0] rounded-lg p-4 mb-6">
          <h4 className="text-xl text-blue-600 font-semibold">{t(translations.results)}</h4>
          <div className="mt-3 flex flex-col gap-1">
            {results.map((result, index) => (
              <p key={index}>
                {index + 1}. <strong>{t(translations.angle_label)}</strong> {result.angle}°,{' '}
                <strong>{t(translations.speed_label)}</strong> {result.velocity} ft/s,{' '}
                <strong>{t(translations.distance_label)}</strong> {result.distance} ft
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectileSimulation;
