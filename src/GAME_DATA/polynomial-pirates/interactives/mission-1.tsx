import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import mission1Config from '../configs/mission-1';
import './mission-1.css';
import parse from 'html-react-parser';

// Types and Interfaces
interface GameParams {
  n: number;
  a: number;
  h: number;
  k: number;
}

interface GameState {
  missionPhase: number;
  params: GameParams;
  targetParams: GameParams;
  scale: number;
  noiseAmplitude: number;
  noiseFrequency: number;
  noiseProfile: number[];
  animationFrameId: number | null;
}
interface Mission1Props {
  interaction: any;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

// Dial
const Dial: React.FC<{
  param: keyof GameParams;
  min: number;
  max: number;
  label: string;
  disabled: boolean;
  step: number;
  dialRotations: { a: number; h: number; k: number };
  setDialRotations: React.Dispatch<React.SetStateAction<{ a: number; h: number; k: number }>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameState: GameState;
}> = ({ param, min, max, label, disabled, step, dialRotations, setDialRotations, setGameState, gameState }) => {
  const dialRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const centerXRef = useRef(0);
  const centerYRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const rotationAccumulatorRef = useRef(0);

  // Add local input state for natural typing
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Update input value when gameState changes (but not during focus)
  useEffect(() => {
    if (!isInputFocused) {
      const displayValue = param === 'a' ? gameState.params[param].toFixed(4) : gameState.params[param].toFixed(2);
      setInputValue(displayValue);
    }
  }, [gameState.params[param], param, isInputFocused]);

  // Initialize dial center coordinates (like Knob.tsx componentDidMount)
  useEffect(() => {
    if (dialRef.current) {
      const rect = dialRef.current.getBoundingClientRect();
      centerXRef.current = rect.left + 0.5 * rect.width;
      centerYRef.current = rect.top + 0.5 * rect.height;
      lastXRef.current = centerXRef.current;
      lastYRef.current = centerYRef.current;
    }
  }, []);

  // Calculate angle delta using cross product (from Knob.tsx)
  const calculateAngleDelta = useCallback((x: number, y: number): number => {
    const ax = lastXRef.current - centerXRef.current;
    const ay = lastYRef.current - centerYRef.current;
    const bx = x - centerXRef.current;
    const by = y - centerYRef.current;

    lastXRef.current = x;
    lastYRef.current = y;

    const crossProduct = ax * by - ay * bx;
    const magnitude = Math.sqrt((ax * ax + ay * ay) * (bx * bx + by * by));

    if (magnitude === 0) return 0;

    return (180 * Math.asin(Math.max(-1, Math.min(1, crossProduct / magnitude)))) / Math.PI;
  }, []);

  // Get sensitivity for parameter value changes
  const getSensitivity = useCallback(() => {
    switch (param) {
      case 'a':
        return 0.0002; // Very fine control for 'a'
      case 'h':
        return 0.02; // Medium control for 'h'
      case 'k':
        return 0.02; // Medium control for 'k'
      default:
        return 0.01;
    }
  }, [param]);

  // Handle drag movement (inspired by Knob.tsx onMouseMove)
  const handleDrag = useCallback(
    (x: number, y: number) => {
      if (!isDraggingRef.current) return;

      const angleDelta = calculateAngleDelta(x, y);
      rotationAccumulatorRef.current += angleDelta;

      // Update visual rotation
      setDialRotations((prev) => ({
        ...prev,
        [param]: rotationAccumulatorRef.current,
      }));

      // Update parameter value with sensitivity
      const sensitivity = getSensitivity();
      setGameState((prev) => {
        const currentValue = prev.params[param];
        const newValue = Math.max(min, Math.min(max, currentValue + angleDelta * sensitivity));
        return {
          ...prev,
          params: { ...prev.params, [param]: newValue },
        };
      });
    },
    [param, min, max, calculateAngleDelta, getSensitivity, setDialRotations, setGameState],
  );

  // Mouse event handlers
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      handleDrag(e.pageX, e.pageY);
    },
    [handleDrag],
  );
  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (dialRef.current) {
      dialRef.current.style.cursor = 'grab';
      // Re-enable transition after drag
      const dialElement = dialRef.current.querySelector('.dial') as HTMLElement;
      if (dialElement) {
        dialElement.style.transition = 'transform 0.1s ease-out';
      }
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();

      // Update center coordinates in case component moved
      if (dialRef.current) {
        const rect = dialRef.current.getBoundingClientRect();
        centerXRef.current = rect.left + 0.5 * rect.width;
        centerYRef.current = rect.top + 0.5 * rect.height;
      }
      isDraggingRef.current = true;
      lastXRef.current = e.pageX;
      lastYRef.current = e.pageY;

      if (dialRef.current) {
        dialRef.current.style.cursor = 'grabbing';
        // Disable transition during drag for responsive feel
        const dialElement = dialRef.current.querySelector('.dial') as HTMLElement;
        if (dialElement) {
          dialElement.style.transition = 'none';
        }
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [disabled, handleMouseMove, handleMouseUp],
  );

  // Touch event handlers
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleDrag(touch.pageX, touch.pageY);
      }
    },
    [handleDrag],
  );
  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;

    // Re-enable transition after drag
    if (dialRef.current) {
      const dialElement = dialRef.current.querySelector('.dial') as HTMLElement;
      if (dialElement) {
        dialElement.style.transition = 'transform 0.1s ease-out';
      }
    }

    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchMove]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();

      // Update center coordinates
      if (dialRef.current) {
        const rect = dialRef.current.getBoundingClientRect();
        centerXRef.current = rect.left + 0.5 * rect.width;
        centerYRef.current = rect.top + 0.5 * rect.height;
      }
      if (e.touches.length > 0) {
        isDraggingRef.current = true;
        const touch = e.touches[0];
        lastXRef.current = touch.pageX;
        lastYRef.current = touch.pageY;

        // Disable transition during drag
        if (dialRef.current) {
          const dialElement = dialRef.current.querySelector('.dial') as HTMLElement;
          if (dialElement) {
            dialElement.style.transition = 'none';
          }
        }
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    },
    [disabled, handleTouchMove, handleTouchEnd],
  );

  // Mouse wheel support
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();

      const wheelDelta = e.deltaY > 0 ? 5 : -5;
      rotationAccumulatorRef.current += wheelDelta;

      setDialRotations((prev) => ({
        ...prev,
        [param]: rotationAccumulatorRef.current,
      }));

      setGameState((prev) => {
        const currentValue = prev.params[param];
        const newValue = e.deltaY < 0 ? Math.max(min, currentValue - step) : Math.min(max, currentValue + step);
        return {
          ...prev,
          params: { ...prev.params, [param]: newValue },
        };
      });
    },
    [disabled, max, min, param, step, setDialRotations, setGameState],
  );
  // Input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const value = e.target.value;
      setInputValue(value);

      // Only update game state if the value is a valid number
      const newValue = parseFloat(value);
      if (!isNaN(newValue)) {
        const clampedValue = Math.max(min, Math.min(max, newValue));
        setGameState((prev) => ({
          ...prev,
          params: { ...prev.params, [param]: clampedValue },
        }));
      }
    },
    [disabled, min, max, param, setGameState],
  );

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);

    // Validate and format the input value on blur
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      const clampedValue = Math.max(min, Math.min(max, newValue));
      const displayValue = param === 'a' ? clampedValue.toFixed(4) : clampedValue.toFixed(2);
      setInputValue(displayValue);

      // Update game state with clamped value
      setGameState((prev) => ({
        ...prev,
        params: { ...prev.params, [param]: clampedValue },
      }));
    } else {
      // Revert to current game state value if invalid
      const displayValue = param === 'a' ? gameState.params[param].toFixed(4) : gameState.params[param].toFixed(2);
      setInputValue(displayValue);
    }
  }, [inputValue, min, max, param, gameState.params, setGameState]);

  return (
    <div id={`group-${param}`} className={`control-group ${disabled ? 'disabled' : ''}`}>
      <label className="font-bold text-base" dangerouslySetInnerHTML={{ __html: label }} />
      <div
        ref={dialRef}
        className="dial-container mx-auto"
        data-param={param}
        data-min={min}
        data-max={max}
        data-step={step}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
        style={{ touchAction: 'none' }}
      >
        <div
          className="dial"
          style={{ transform: `rotate(${param === 'n' ? 0 : dialRotations[param as 'a' | 'h' | 'k']}deg)` }}
        >
          <div className="dial-pointer" />
          <div className="dial-center" />
        </div>
      </div>{' '}
      <input
        type="number"
        id={`input-${param}`}
        className="param-input mt-2"
        step={step}
        min={min}
        max={max}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={disabled}
      />
    </div>
  );
};

const Mission1: React.FC<Mission1Props> = ({ onInteraction }) => {
  const { t } = useTranslations();
  const {
    stretchLabel,
    hShiftLabel,
    vShiftLabel,
    degreeLabel,
    checkMatchButton,
    calibrationLineLabel,
    seafloorMapLabel,
    resetSimulationButton,
    matchConfirmedMessage,
    calibrationMismatchPrefix,
    diagnosticsPrefix,
    degreeIncorrectMessage,
    stretchOffTargetMessage,
    hShiftOffTargetMessage,
    vShiftOffTargetMessage,
    quadraticLabel,
    cubicLabel,
    quarticLabel,
    quinticLabel,
    equationAriaLabel,
    vertexFormAriaLabel,
    linearLabel,
  } = mission1Config.translations;

  // State management
  const [gameState, setGameState] = useState<GameState>({
    missionPhase: 1,
    params: { n: 2, a: 0.05, h: 0.0, k: 0.0 },
    targetParams: { n: 3, a: -0.011, h: 0.56, k: -0.99 },
    scale: 40,
    noiseAmplitude: 0.2,
    noiseFrequency: 0.8,
    noiseProfile: [],
    animationFrameId: null,
  });
  const [feedback, setFeedback] = useState({ message: '', isSuccess: false });
  const [checkButtonPressed, setCheckButtonPressed] = useState(false);
  const [dialRotations, setDialRotations] = useState({ a: 0, h: 0, k: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const noiseProfileRef = useRef<number[]>([]);
  useEffect(() => {
    const { params, targetParams } = gameState;
    const isParamsMatch =
      params.n === targetParams.n &&
      Math.abs(params.a - targetParams.a) < 0.005 &&
      Math.abs(params.h - targetParams.h) < 0.5 &&
      Math.abs(params.k - targetParams.k) < 0.5;
    if (isParamsMatch && checkButtonPressed) {
      onInteraction({
        'system-calibrate-check': true,
      });
    }
  }, [gameState.params, gameState.targetParams, checkButtonPressed, onInteraction]);

  const getDegreeLabel = useCallback(
    (n: number): string => {
      switch (n) {
        case 1:
          return t(linearLabel);
        case 2:
          return t(quadraticLabel);
        case 3:
          return t(cubicLabel);
        case 4:
          return t(quarticLabel);
        case 5:
          return t(quinticLabel);
        default:
          return `${t(degreeLabel)} ${n}`;
      }
    },
    [t, quadraticLabel, cubicLabel, quarticLabel, quinticLabel, degreeLabel],
  );

  // Mathematical functions
  const userFunc = useCallback(
    (x: number): number => {
      return gameState.params.a * Math.pow(x - gameState.params.h, gameState.params.n) + gameState.params.k;
    },
    [gameState.params],
  );

  const targetFunc = useCallback(
    (x: number): number => {
      return (
        gameState.targetParams.a * Math.pow(x - gameState.targetParams.h, gameState.targetParams.n) +
        gameState.targetParams.k
      );
    },
    [gameState.targetParams],
  ); // Utility functions
  const generateNoiseProfile = useCallback((canvasWidth: number) => {
    const widthInUnits = canvasWidth / 40; // Use constant scale value
    const noiseProfile: number[] = [];
    for (let i = 0; i < widthInUnits * 0.8; i++) {
      // Use constant noise frequency
      noiseProfile.push(Math.random() * 2 - 1);
    }
    noiseProfileRef.current = noiseProfile;
    setGameState((prev) => ({ ...prev, noiseProfile }));
  }, []); // Empty dependency array since we use constants

  const getInterpolatedNoise = useCallback((x: number, canvasWidth: number): number => {
    const noiseProfile = noiseProfileRef.current;
    if (noiseProfile.length === 0) return 0;
    const widthInUnits = canvasWidth / 40; // Use constant scale value
    const pos = (x + widthInUnits / 2) * 0.8; // Use constant noise frequency
    const index1 = Math.floor(pos);
    const index2 = index1 + 1;
    const frac = pos - index1;
    const v1 = noiseProfile[index1 % noiseProfile.length] || 0;
    const v2 = noiseProfile[index2 % noiseProfile.length] || 0;
    return (v1 * (1 - frac) + v2 * frac) * 0.2; // Use constant noise amplitude
  }, []); // Drawing function
  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const originX = w / 2;
      const originY = h / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#060918';
      ctx.fillRect(0, 0, w, h);

      // Draw Grid and Axes
      ctx.lineWidth = 1;
      ctx.font = '10px Arial';
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.1)';
      for (let x = originX % gameState.scale; x < w; x += gameState.scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let x = originX % gameState.scale; x > 0; x -= gameState.scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = originY % gameState.scale; y < h; y += gameState.scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let y = originY % gameState.scale; y > 0; y -= gameState.scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(w, originY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, h);
      ctx.stroke();

      ctx.fillStyle = 'rgba(52, 211, 153, 0.5)';
      for (let i = 1; originX + i * gameState.scale < w; i++) {
        ctx.fillText(i.toString(), originX + i * gameState.scale + 4, originY - 4);
      }
      for (let i = 1; originX - i * gameState.scale > 0; i++) {
        ctx.fillText((-i).toString(), originX - i * gameState.scale + 4, originY - 4);
      }
      for (let i = 1; originY + i * gameState.scale < h; i++) {
        ctx.fillText((-i).toString(), originX + 4, originY + i * gameState.scale);
      }
      for (let i = 1; originY - i * gameState.scale > 0; i++) {
        ctx.fillText(i.toString(), originX + 4, originY - i * gameState.scale);
      } // Draw Trench
      const trenchPath = new Path2D();
      trenchPath.moveTo(0, h);
      for (let i = 0; i <= w; i++) {
        const x = (i - originX) / gameState.scale;
        trenchPath.lineTo(i, originY - (targetFunc(x) + getInterpolatedNoise(x, w)) * gameState.scale);
      }
      trenchPath.lineTo(w, h);
      trenchPath.closePath();
      // Use a semi-transparent gradient to fill the trench area
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(45, 55, 72, 0.7)');
      gradient.addColorStop(1, 'rgba(26, 32, 44, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fill(trenchPath);
      // Draw a stroke along the top of the trench for definition
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.9)';
      ctx.lineWidth = 1.5;
      ctx.stroke(trenchPath);
      const drawFunc = (
        func: (x: number) => number,
        color: string,
        lineWidth: number,
        dashed: boolean = false,
      ) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        if (dashed) ctx.setLineDash([5, 8]);
        for (let i = 0; i <= w; i++) {
          const x = (i - originX) / gameState.scale;
          const y = func(x);
          const pixelY = originY - y * gameState.scale;
          if (i === 0) ctx.moveTo(i, pixelY);
          else ctx.lineTo(i, pixelY);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };
      drawFunc(userFunc, '#f6ad55', 4);

      // Draw Marker
      const pulse = Math.abs(Math.sin(time / 500));
      ctx.strokeStyle = `rgba(52, 211, 153, ${0.5 + pulse * 0.5})`;
      ctx.fillStyle = `rgba(52, 211, 153, ${0.1 + pulse * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        originX + gameState.targetParams.h * gameState.scale,
        originY - gameState.targetParams.k * gameState.scale,
        5 + pulse * 10,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.stroke();

      // Draw Scanline
      const scanX = ((time / 20) % (w + 40)) - 40;
      const scanGradient = ctx.createLinearGradient(scanX, 0, scanX + 40, 0);
      scanGradient.addColorStop(0, 'rgba(52, 211, 153, 0)');
      scanGradient.addColorStop(0.5, 'rgba(52, 211, 153, 0.2)');
      scanGradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(scanX, 0, 40, h);

      animationFrameRef.current = requestAnimationFrame(draw);
    },
    [gameState, targetFunc, userFunc, getInterpolatedNoise],
  );

  // Event handlers
  const handleDegreeChange = useCallback((degree: number) => {
    setGameState((prev) => ({
      ...prev,
      params: { ...prev.params, n: degree },
    }));
  }, []);
  const handleNextPhase = useCallback(() => {
    const p = gameState.params;
    const targetParams = gameState.targetParams;

    const n_match = p.n === targetParams.n;
    const a_match = Math.abs(p.a - targetParams.a) < 0.005;
    const h_match = Math.abs(p.h - targetParams.h) < 0.5;
    const k_match = Math.abs(p.k - targetParams.k) < 0.5;

    if (n_match && a_match && h_match && k_match) {
      setCheckButtonPressed(true);
      setFeedback({ message: t(matchConfirmedMessage), isSuccess: true });
    } else {
      let diagnostics = [];
      if (!n_match) diagnostics.push(t(degreeIncorrectMessage));
      if (!a_match) diagnostics.push(t(stretchOffTargetMessage));
      if (!h_match) diagnostics.push(t(hShiftOffTargetMessage));
      if (!k_match) diagnostics.push(t(vShiftOffTargetMessage));

      const feedbackMessage = `${t(calibrationMismatchPrefix)} ${t(diagnosticsPrefix)} ${diagnostics.join(', ')}.`;
      setFeedback({ message: feedbackMessage, isSuccess: false });
    }
  }, [
    gameState.params,
    gameState.targetParams,
    t,
    degreeIncorrectMessage,
    stretchOffTargetMessage,
    hShiftOffTargetMessage,
    vShiftOffTargetMessage,
    matchConfirmedMessage,
    calibrationMismatchPrefix,
    diagnosticsPrefix,
    getDegreeLabel,
    degreeLabel,
  ]);
  const handleNextMission = useCallback(() => {
    setCheckButtonPressed(false);
    setGameState({
      missionPhase: 1,
      params: { n: 2, a: 0.05, h: 0.0, k: 0.0 },
      targetParams: { n: 3, a: -0.011, h: 0.56, k: -0.99 },
      scale: 40,
      noiseAmplitude: 0.2,
      noiseFrequency: 0.8,
      noiseProfile: [],
      animationFrameId: null,
    });
    setDialRotations({ a: 0, h: 0, k: 0 });
    setFeedback({ message: '', isSuccess: false });
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        // Only generate noise profile if it doesn't exist
        if (noiseProfileRef.current.length === 0) {
          generateNoiseProfile(canvas.width);
        }
        draw(0);
      }
    };

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    init();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [draw, generateNoiseProfile]);
  // Generate initial noise profile
  useEffect(() => {
    if (noiseProfileRef.current.length === 0) {
      generateNoiseProfile(1000); // Default width
    }
  }, [generateNoiseProfile]); // Equation display
  const getEquationDisplay = (): string => {
    const { a, h, k, n } = gameState.params;
    const hDisplay =
      h < 0
        ? `+ <span style="font-family: inherit; font-style: normal;">${(-h).toFixed(2)}</span>`
        : `- <span style="font-family: inherit; font-style: normal;">${h.toFixed(2)}</span>`;
    const kDisplay =
      k < 0
        ? ` - <span style="font-family: inherit; font-style: normal;">${(-k).toFixed(2)}</span>`
        : ` + <span style="font-family: inherit; font-style: normal;">${k.toFixed(2)}</span>`;
    return `<em>f(x)</em> = <span style="color: #f0c1dd;">${a.toFixed(4)}</span>(<em>x</em> <span style="color: #66e066;">${hDisplay}</span>${n !== 1 ? `<sup style="color: #e0ff00;">${n}</sup>` : ''}) <span style="color: #f7bdab;">${kDisplay}</span>`;
  };

  // Generate screen reader friendly equation description
  const getEquationAriaLabel = (): string => {
    const { a, h, k, n } = gameState.params;
    const degreeText = getDegreeLabel(n).toLowerCase();

    // Format coefficients for speech
    const aText = a.toFixed(4);
    const hText = Math.abs(h).toFixed(2);
    const kText = Math.abs(k).toFixed(2);

    // Build the aria label
    let ariaLabel = t(equationAriaLabel);

    // Replace placeholders with actual values
    ariaLabel = ariaLabel
      .replace('{degreeType}', degreeText)
      .replace('{aValue}', aText)
      .replace('{hValue}', hText)
      .replace('{hSign}', h >= 0 ? 'minus' : 'plus')
      .replace('{kValue}', kText)
      .replace('{kSign}', k >= 0 ? 'plus' : 'minus')
      .replace('{degree}', n.toString());

    return ariaLabel;
  };

  const getVertexFormEquation = () => {
    const { n } = gameState.params;
    return `<em>f(x)</em> = <em style="color: #f0c1dd;">a</em>(<em>x</em> -
            <em style="color: #66e066">h${n !== 1 ? `<sup style="color: #e0ff00; font-style: normal;">${n}</sup>` : ''}</em>) + <em style="color: #f7bdab;">k</em>`;
  };

  const getVertexFormAriaLabel = () => {
    const { n } = gameState.params;
    return t(vertexFormAriaLabel).replace('{n}', n.toString());
  };

  return (
    <div
      className="mission-container min-h-screen flex flex-col p-4 text-gray-300 rounded-lg mt-[-15px]"
      style={{ backgroundColor: '#1a202c' }}
    >
      {/* Model Controls - Responsive Layout for i18n */}
      <div className="w-full mb-4 p-4 rounded-lg control-panel">
        {/* Header Row - Title and Equation */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 mb-4">
          <p
            className="text-xl text-white overflow-x-auto overflow-y-hidden font-besley"
            aria-label={getVertexFormAriaLabel()}
          >
            {parse(getVertexFormEquation())}
          </p>{' '}
          <p
            id="equation-display"
            className="text-xl text-white overflow-x-auto overflow-y-hidden font-besley"
            dangerouslySetInnerHTML={{ __html: getEquationDisplay() }}
            aria-label={getEquationAriaLabel()}
          />
        </div>
        {/* Main Controls Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          {/* Parameter Dials Section */}
          <div className="lg:col-span-2 xl:col-span-2">
            {' '}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center justify-items-center">
              <Dial
                param="a"
                min={-0.1}
                max={0.1}
                label={t(stretchLabel).replace(
                  /\ba\b/g,
                  '<span style="font-family: serif; font-weight: bold; font-style: italic; color: #F0C1DD;">a</span>',
                )}
                disabled={false}
                step={0.0001}
                dialRotations={dialRotations}
                setDialRotations={setDialRotations}
                setGameState={setGameState}
                gameState={gameState}
              />
              <Dial
                param="h"
                min={-5}
                max={5}
                label={t(hShiftLabel).replace(
                  /\bh\b/g,
                  '<span style="font-family: serif; font-weight: bold; font-style: italic; color: #66E066;">h</span>',
                )}
                disabled={false}
                step={0.01}
                dialRotations={dialRotations}
                setDialRotations={setDialRotations}
                setGameState={setGameState}
                gameState={gameState}
              />
              <Dial
                param="k"
                min={-5}
                max={5}
                label={t(vShiftLabel).replace(
                  /\bk\b/g,
                  '<span style="font-family: serif; font-weight: bold; font-style: italic; color: #F7BDAB;">k</span>',
                )}
                disabled={false}
                step={0.01}
                dialRotations={dialRotations}
                setDialRotations={setDialRotations}
                setGameState={setGameState}
                gameState={gameState}
              />
            </div>
          </div>
          {/* Degree Controls and Action Button Section */}
          <div className="flex flex-col gap-4 justify-center">
            <div className="w-full">
              <label
                className="font-bold text-lg block mb-2 text-center"
                dangerouslySetInnerHTML={{
                  __html: `${t(degreeLabel).replace(/\bn\b/g, '<span style="font-family: serif; font-weight: bold; font-style: italic; color: #e0ff00;">n</span>')} (<em style="font-family: serif; font-weight: bold; font-style: italic; color: #B3CC00;">n</em>): <span class="text-amber-400 font-semibold text-base">${getDegreeLabel(gameState.params.n)}</span>`,
                }}
              />
              <div className="grid grid-cols-2 gap-2 max-w-[200px] mx-auto">
                <button
                  className={`btn-control px-3 py-2 rounded text-lg font-besley font-bold ${gameState.params.n === 1 ? 'active' : ''}`}
                  onClick={() => handleDegreeChange(1)}
                >
                  <em>n</em> = 1
                </button>
                <button
                  className={`btn-control px-3 py-2 rounded text-lg font-besley font-bold ${gameState.params.n === 2 ? 'active' : ''}`}
                  onClick={() => handleDegreeChange(2)}
                >
                  <em>n</em> = 2
                </button>
                <button
                  className={`btn-control px-3 py-2 rounded text-lg font-besley font-bold ${gameState.params.n === 3 ? 'active' : ''}`}
                  onClick={() => handleDegreeChange(3)}
                >
                  <em>n</em> = 3
                </button>
                <button
                  className={`btn-control px-3 py-2 rounded text-lg font-besley font-bold ${gameState.params.n === 4 ? 'active' : ''}`}
                  onClick={() => handleDegreeChange(4)}
                >
                  <em>n</em> = 4
                </button>
                <button
                  className={`btn-control px-3 py-2 rounded text-lg font-besley font-bold ${gameState.params.n === 5 ? 'active' : ''}`}
                  onClick={() => handleDegreeChange(5)}
                >
                  <em>n</em> = 5
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <button
                id="check-match-btn"
                className="px-4 py-3 text-lg rounded-md bg-amber-600 hover:bg-amber-500 border border-amber-400 text-black font-bold transition-colors whitespace-nowrap"
                onClick={handleNextPhase}
              >
                {t(checkMatchButton)}
              </button>
              <button
                id="reset-btn"
                className="px-3 py-3 text-lg rounded-md bg-gray-600 hover:bg-gray-500 border border-gray-400 text-white font-bold transition-colors flex items-center justify-center"
                onClick={handleNextMission}
                title={t(resetSimulationButton)}
              >
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
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Feedback message */}
        {feedback.message && (
          <div className="w-full mt-4 pt-3 border-t border-gray-600">
            <div
              className={`text-base leading-tight text-center ${
                feedback.isSuccess ? 'text-green-300' : 'text-red-300'
              }`}
              dangerouslySetInnerHTML={{ __html: feedback.message }}
            />
          </div>
        )}
      </div>
      {/* Graph Section - Full Width */}
      <div className="w-full h-80 sonar-screen rounded-lg relative">
        <div id="legend" className="absolute top-2 left-2 p-2 bg-black/30 rounded text-sm z-10">
          <div>
            <span className="inline-block w-4 h-0.5 bg-amber-400 mr-2 align-middle"></span>
            <span className="text-amber-300">{t(calibrationLineLabel)}</span>
          </div>
          <div>
            <span className="inline-block w-4 h-0.5 bg-green-400 mr-2 align-middle"></span>
            <span className="text-green-300">{t(seafloorMapLabel)}</span>
          </div>
        </div>
        <canvas id="sonar-canvas" ref={canvasRef} className="w-full h-full rounded-lg" />
      </div>
    </div>
  );
};

export default Mission1;
