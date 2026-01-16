/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useCallback, useMemo, useContext } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';
import { GameContext } from '../../../contexts/GameContext';
import { useEventListener } from '../../../hooks/useEventListener';

// Type definitions
interface PolyCoeffs {
  0: number;
  1: number;
  2: number;
}

interface Polys {
  'chip-a': PolyCoeffs;
  'chip-b': PolyCoeffs;
  'chip-c': PolyCoeffs;
}

interface GameState {
  'drop-1a': string | null;
  'drop-1b': string | null;
  'result-1': PolyCoeffs | null;
  'drop-2': string | null;
  'final-result': PolyCoeffs | null;
  result_1_correct: boolean;
  result_2_correct: boolean;
}

interface ErrorMessages {
  step1: string;
  step2: string;
  calculation1: string;
  calculation2: string;
}

interface Inputs {
  'input-1-x2': string;
  'input-1-x': string;
  'input-1-c': string;
  'input-2-x2': string;
  'input-2-x': string;
  'input-2-c': string;
}

interface ChipPositions {
  'chip-a': string;
  'chip-b': string;
  'chip-c': string;
}

type ChipId = 'chip-a' | 'chip-b' | 'chip-c';
type DropZoneId = 'drop-1a' | 'drop-1b' | 'drop-2' | 'bay';
type Operation = '+' | '-';

interface CombiningSonarScansState {
  currentScreen: number;
  chipPositions: ChipPositions;
  state: GameState;
  inputs: Inputs;
}

interface CombiningSonarScansProps {
  interaction: any;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const CombiningSonarScans: React.FC<CombiningSonarScansProps> = ({ interaction, onInteraction }) => {
  // Polynomial data
  const polys: Polys = useMemo(
    () => ({
      'chip-a': { 2: 1, 1: 2, 0: 0 },
      'chip-b': { 2: -3, 1: 1, 0: -3 },
      'chip-c': { 2: 0, 1: 4, 0: 1 },
    }),
    [],
  );
  const targetPolyCoeffs: PolyCoeffs = { 2: -2, 1: -1, 0: -4 };

  const polyOp = (p1: PolyCoeffs, p2: PolyCoeffs, op: Operation): PolyCoeffs => {
    const result: PolyCoeffs = { 0: 0, 1: 0, 2: 0 };
    ([0, 1, 2] as const).forEach((k) => {
      const val1 = p1 ? p1[k] || 0 : 0;
      const val2 = p2 ? p2[k] || 0 : 0;
      result[k] = op === '+' ? val1 + val2 : val1 - val2;
    });
    return result;
  };

  const polyEvaluate = (p: PolyCoeffs | null, x: number): number => {
    if (!p) return 0;
    return Object.entries(p).reduce((acc, [exp, coeff]) => acc + coeff * Math.pow(x, parseInt(exp)), 0);
  };

  const gameContext = useContext(GameContext),
    { interactiveResponses, setInteractiveResponses } = gameContext || {},
    savedState =
      interactiveResponses?.combining_sonar_scans &&
      typeof interactiveResponses?.combining_sonar_scans === 'object'
        ? (interactiveResponses?.combining_sonar_scans as unknown as CombiningSonarScansState)
        : undefined,
    { payload } = useEventListener('combining-sonar-scans');

  // State management
  const [currentScreen, setCurrentScreen] = useState<number>(savedState?.currentScreen ?? 1);
  const [state, setState] = useState<GameState>(
    savedState?.state ?? {
      'drop-1a': null,
      'drop-1b': null,
      'result-1': null,
      'drop-2': null,
      'final-result': null,
      result_1_correct: false,
      result_2_correct: false,
    },
  );

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    step1: '',
    step2: '',
    calculation1: '',
    calculation2: '',
  });

  const [inputs, setInputs] = useState<Inputs>(
    savedState?.inputs ?? {
      'input-1-x2': '',
      'input-1-x': '',
      'input-1-c': '',
      'input-2-x2': '',
      'input-2-x': '',
      'input-2-c': '',
    },
  );

  const [draggedElement, setDraggedElement] = useState<ChipId | null>(null);
  const [chipPositions, setChipPositions] = useState<ChipPositions>(
    savedState?.chipPositions ?? {
      'chip-a': 'bay',
      'chip-b': 'bay',
      'chip-c': 'bay',
    },
  );

  const hasChipsMoved: boolean =
    currentScreen === 1
      ? chipPositions['chip-a'] !== 'bay' || chipPositions['chip-b'] !== 'bay'
      : chipPositions['chip-c'] !== 'bay';

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setCurrentScreen(payload.step as number);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: CombiningSonarScansState = { currentScreen, chipPositions, state, inputs };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      combining_sonar_scans: currentState,
    }));
  }, [currentScreen, chipPositions, state, inputs, setInteractiveResponses]);

  // Find leftmost empty drop zone
  const findLeftmostEmptyDropZone = (): DropZoneId | null => {
    if (currentScreen === 1) {
      if (!state['drop-1a']) return 'drop-1a';
      if (!state['drop-1b']) return 'drop-1b';
    } else if (currentScreen === 2) {
      if (!state['drop-2']) return 'drop-2';
    }
    return null;
  };

  const handleChipActivation = (chipId: ChipId): void => {
    const targetDropZone = findLeftmostEmptyDropZone();
    if (targetDropZone) {
      handleChipDrop(chipId, targetDropZone);
    }
  };

  const handleChipKeyDown = (e: React.KeyboardEvent, chipId: ChipId): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChipActivation(chipId);
    }
  };

  const handleChipClick = (chipId: ChipId): void => {
    handleChipActivation(chipId);
  };

  const { t } = useTranslations();

  // Handle chip placement
  const handleChipDrop = (chipId: ChipId, dropZoneId: DropZoneId): void => {
    setErrorMessages({ step1: '', step2: '', calculation1: '', calculation2: '' });

    // Validate chip placement
    if (dropZoneId === 'drop-1a' || dropZoneId === 'drop-1b') {
      if (chipId === 'chip-c') {
        setErrorMessages((prev) => ({
          ...prev,
          step1: t(interaction.translations.step1.incorrectPlacement),
        }));
        return;
      }
    }

    const newPositions = { ...chipPositions };

    // Return existing chip to bay
    (Object.keys(newPositions) as ChipId[]).forEach((existingChipId) => {
      if (newPositions[existingChipId] === dropZoneId) {
        newPositions[existingChipId] = 'bay';
      }
    });

    newPositions[chipId] = dropZoneId;
    setChipPositions(newPositions);

    const newState = { ...state };
    if (dropZoneId === 'drop-1a' || dropZoneId === 'drop-1b' || dropZoneId === 'drop-2') {
      (newState as any)[dropZoneId] = chipId;
    }
    setState(newState);
  };

  // Canvas animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const noiseProfile = useRef<number[]>([]);

  const generateNoiseProfile = useCallback((widthInUnits: number): void => {
    noiseProfile.current = [];
    const noiseFrequency = 0.5;
    let seed = 12345;
    const seededRandom = (): number => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < widthInUnits * noiseFrequency; i++) {
      noiseProfile.current.push(seededRandom() * 2 - 1);
    }
  }, []);

  // Canvas drawing functions
  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      originX: number,
      originY: number,
      scale: number,
    ): void => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.font = '14px monospace';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let i = 0; i * scale < originX; i++) {
        ctx.beginPath();
        ctx.moveTo(originX - i * scale, 0);
        ctx.lineTo(originX - i * scale, canvasHeight);
        ctx.stroke();
        if (i > 0) ctx.fillText((-i).toString(), originX - i * scale + 2, originY + 16);

        ctx.beginPath();
        ctx.moveTo(originX + i * scale, 0);
        ctx.lineTo(originX + i * scale, canvasHeight);
        ctx.stroke();
        if (i > 0) ctx.fillText(i.toString(), originX + i * scale + 2, originY + 16);
      }

      // Horizontal lines
      for (let i = 0; i * scale < originY; i++) {
        ctx.beginPath();
        ctx.moveTo(0, originY - i * scale);
        ctx.lineTo(canvasWidth, originY - i * scale);
        ctx.stroke();
        if (i > 0) ctx.fillText(i.toString(), originX + 2, originY - i * scale - 2);

        ctx.beginPath();
        ctx.moveTo(0, originY + i * scale);
        ctx.lineTo(canvasWidth, originY + i * scale);
        ctx.stroke();
        if (i > 0) ctx.fillText((-i).toString(), originX + 2, originY + i * scale - 2);
      }

      // Main axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(canvasWidth, originY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, canvasHeight);
      ctx.stroke();

      ctx.fillText('0', originX + 2, originY + 10);
    },
    [],
  );

  const drawTrench = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      basePoly: PolyCoeffs,
      originX: number,
      originY: number,
      canvasWidth: number,
      canvasHeight: number,
      scale: number,
    ): void => {
      if (!basePoly) return;

      const trenchPath = new Path2D();
      trenchPath.moveTo(0, canvasHeight);

      for (let i = 0; i <= canvasWidth; i++) {
        const x = (i - originX) / scale;
        const base_y = polyEvaluate(basePoly, x);
        trenchPath.lineTo(i, originY - base_y * scale);
      }

      trenchPath.lineTo(canvasWidth, canvasHeight);
      trenchPath.closePath();

      const gradient = ctx.createLinearGradient(0, originY - 5 * scale, 0, canvasHeight);
      gradient.addColorStop(0, '#2d3748');
      gradient.addColorStop(1, '#1a202c');
      ctx.fillStyle = gradient;
      ctx.fill(trenchPath);

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.9)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(52, 211, 153, 1)';
      ctx.shadowBlur = 5;
      ctx.stroke(trenchPath);
      ctx.shadowBlur = 0;
    },
    [],
  );

  const drawFunction = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      poly: PolyCoeffs | null,
      color: string,
      lineWidth: number,
      canvasWidth: number,
      canvasHeight: number,
      scale: number,
    ): void => {
      if (!poly) return;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      const oX = canvasWidth / 2;
      const oY = canvasHeight / 2;

      for (let i = 0; i <= canvasWidth; i++) {
        const x = (i - oX) / scale;
        const y = polyEvaluate(poly, x);
        const pixelY = oY - y * scale;
        if (i === 0) ctx.moveTo(i, pixelY);
        else ctx.lineTo(i, pixelY);
      }
      ctx.stroke();
    },
    [],
  );
  const drawScanline = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, canvasWidth: number, canvasHeight: number): void => {
      const x = ((time / 20) % (canvasWidth + 20)) - 20;
      ctx.fillStyle = 'rgba(52, 211, 153, 0.15)';
      ctx.fillRect(x, 0, 20, canvasHeight);
    },
    [],
  );
  const drawLegend = useCallback(
    (ctx: CanvasRenderingContext2D): void => {
      const legendX = 20;
      const legendY = 20;
      const lineLength = 20;
      const lineSpacing = 25;

      ctx.font = '14px Avenir-Next, sans-serif';
      ctx.textAlign = 'left';

      // Possible Anomaly (trench outline color)
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(legendX, legendY);
      ctx.lineTo(legendX + lineLength, legendY);
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.fillText(t(interaction.translations.possibleAnomaly), legendX + lineLength + 10, legendY + 4);

      // Result 1 (blue function)
      if (state['result-1']) {
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(legendX, legendY + lineSpacing);
        ctx.lineTo(legendX + lineLength, legendY + lineSpacing);
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.fillText(t(interaction.translations.result1), legendX + lineLength + 10, legendY + lineSpacing + 4);
      }

      // Result 2 (orange function)
      if (state['final-result']) {
        ctx.strokeStyle = '#f6ad55';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(legendX, legendY + lineSpacing * 2);
        ctx.lineTo(legendX + lineLength, legendY + lineSpacing * 2);
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.fillText(
          t(interaction.translations.result2),
          legendX + lineLength + 10,
          legendY + lineSpacing * 2 + 4,
        );
      }

      // Reset text alignment
      ctx.textAlign = 'start';
    },
    [state, t, interaction.translations],
  );

  // Animation loop
  const animate = useCallback(
    (time: number): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      const scale = 30;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#060918';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const originX = canvasWidth / 2;
      const originY = canvasHeight / 2;
      drawGrid(ctx, canvasWidth, canvasHeight, originX, originY, scale);
      drawTrench(ctx, targetPolyCoeffs, originX, originY, canvasWidth, canvasHeight, scale);
      drawFunction(ctx, state['result-1'], 'rgba(96, 165, 250, 0.5)', 2, canvasWidth, canvasHeight, scale);
      drawFunction(ctx, state['final-result'], '#f6ad55', 4, canvasWidth, canvasHeight, scale);
      drawScanline(ctx, time, canvasWidth, canvasHeight);
      drawLegend(ctx);

      animationFrameId.current = requestAnimationFrame(animate);
    },
    [state, drawGrid, drawTrench, drawFunction, drawScanline, drawLegend],
  );

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = canvas.clientWidth;
    const scale = 30;
    generateNoiseProfile(canvasWidth / scale);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, generateNoiseProfile]);

  // Update calculations
  const updateEverything = useCallback((): void => {
    const newState = { ...state };
    const newErrorMessages = { ...errorMessages };

    const step1ChipsCorrect =
      (newState['drop-1a'] === 'chip-a' && newState['drop-1b'] === 'chip-b') ||
      (newState['drop-1a'] === 'chip-b' && newState['drop-1b'] === 'chip-a');

    if (step1ChipsCorrect) {
      const p1 = polys[newState['drop-1a'] as ChipId];
      const p2 = polys[newState['drop-1b'] as ChipId];
      const correctResult1 = polyOp(p1, p2, '+');
      const userResult1: PolyCoeffs = {
        2: parseFloat(inputs['input-1-x2']) || 0,
        1: parseFloat(inputs['input-1-x']) || 0,
        0: parseFloat(inputs['input-1-c']) || 0,
      };
      newState['result-1'] = userResult1;

      const allFilled = inputs['input-1-x2'] !== '' && inputs['input-1-x'] !== '' && inputs['input-1-c'] !== '';

      if (allFilled) {
        if (
          userResult1[2] === correctResult1[2] &&
          userResult1[1] === correctResult1[1] &&
          userResult1[0] === correctResult1[0]
        ) {
          newState.result_1_correct = true;
          newErrorMessages.calculation1 = '';
        } else {
          newState.result_1_correct = false;
          newErrorMessages.calculation1 = t(interaction.translations.step1.incorrectCalculation);
        }
      } else if (inputs['input-1-x2'] !== '' || inputs['input-1-x'] !== '' || inputs['input-1-c'] !== '') {
        newState.result_1_correct = false;
        newErrorMessages.calculation1 = '';
      } else {
        newState.result_1_correct = false;
        newErrorMessages.calculation1 = '';
      }
    } else {
      newState['result-1'] = null;
      newState.result_1_correct = false;
      newErrorMessages.calculation1 = '';
    }

    if (newState['drop-2'] === 'chip-c') {
      const userResult2: PolyCoeffs = {
        2: parseFloat(inputs['input-2-x2']) || 0,
        1: parseFloat(inputs['input-2-x']) || 0,
        0: parseFloat(inputs['input-2-c']) || 0,
      };
      newState['final-result'] = userResult2;

      const allFilled2 = inputs['input-2-x2'] !== '' && inputs['input-2-x'] !== '' && inputs['input-2-c'] !== '';

      if (allFilled2) {
        const correctResult2 = {
          0: -4,
          1: -1,
          2: -2,
        };

        if (
          userResult2[2] === correctResult2[2] &&
          userResult2[1] === correctResult2[1] &&
          userResult2[0] === correctResult2[0]
        ) {
          newState.result_2_correct = true;
          newErrorMessages.calculation2 = '';
        } else {
          console.log('userResult2:', userResult2);
          newState.result_2_correct = false;
          newErrorMessages.calculation2 = t(interaction.translations.step2.incorrectCalculation);
        }
      } else if (inputs['input-2-x2'] !== '' || inputs['input-2-x'] !== '' || inputs['input-2-c'] !== '') {
        newState.result_2_correct = false;
        newErrorMessages.calculation2 = '';
      } else {
        newState.result_2_correct = false;
        newErrorMessages.calculation2 = '';
      }
    } else {
      newState.result_2_correct = false;
      newState['final-result'] = null;
      newErrorMessages.calculation2 = '';
    }

    setState(newState);
    setErrorMessages(newErrorMessages);
  }, [state, inputs, polys, errorMessages]);

  useEffect(() => {
    updateEverything();
  }, [inputs, chipPositions]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, chipId: ChipId): void => {
    setDraggedElement(chipId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropZoneId: string): void => {
    e.preventDefault();
    if (!draggedElement || dropZoneId.startsWith('result-1')) return;

    handleChipDrop(draggedElement, dropZoneId as DropZoneId);
    setDraggedElement(null);
  };

  const handleInputChange = (inputId: keyof Inputs, value: string): void => {
    setInputs((prev) => ({
      ...prev,
      [inputId]: value,
    }));
  };

  const reset = (): void => {
    if (currentScreen === 1) {
      // Reset only first screen data
      const newChipPositions = { ...chipPositions };
      const newState = { ...state };
      const newInputs = { ...inputs };

      // Return chips used in step 1 to bay
      if (chipPositions['chip-a'] === 'drop-1a' || chipPositions['chip-a'] === 'drop-1b') {
        newChipPositions['chip-a'] = 'bay';
      }
      if (chipPositions['chip-b'] === 'drop-1a' || chipPositions['chip-b'] === 'drop-1b') {
        newChipPositions['chip-b'] = 'bay';
      }

      // Clear step 1 state
      newState['drop-1a'] = null;
      newState['drop-1b'] = null;
      newState['result-1'] = null;
      newState.result_1_correct = false;

      // Clear step 1 inputs
      newInputs['input-1-x2'] = '';
      newInputs['input-1-x'] = '';
      newInputs['input-1-c'] = '';

      setChipPositions(newChipPositions);
      setState(newState);
      setInputs(newInputs);
      setErrorMessages((prev) => ({ ...prev, step1: '', calculation1: '' }));
      setCurrentScreen(1);
    } else if (currentScreen === 2) {
      // Reset only second screen data
      const newChipPositions = { ...chipPositions };
      const newState = { ...state };
      const newInputs = { ...inputs };

      // Return chip used in step 2 to bay
      if (chipPositions['chip-c'] === 'drop-2') {
        newChipPositions['chip-c'] = 'bay';
      }

      // Clear step 2 state
      newState['drop-2'] = null;
      newState['final-result'] = null;

      // Clear step 2 inputs
      newInputs['input-2-x2'] = '';
      newInputs['input-2-x'] = '';
      newInputs['input-2-c'] = '';
      newState.result_2_correct = false;

      setChipPositions(newChipPositions);
      setState(newState);
      setInputs(newInputs);
      setErrorMessages((prev) => ({ ...prev, step2: '', calculation2: '' }));
      setCurrentScreen(2);
    }
  };

  const step1ChipsCorrect: boolean =
    (state['drop-1a'] === 'chip-a' && state['drop-1b'] === 'chip-b') ||
    (state['drop-1a'] === 'chip-b' && state['drop-1b'] === 'chip-a');

  const step1ChipsCorrectRef = useRef(step1ChipsCorrect);

  useEffect(() => {
    if (step1ChipsCorrectRef.current !== step1ChipsCorrect && step1ChipsCorrect) {
      onInteraction({
        'is-step1-dropped': true,
      });
      step1ChipsCorrectRef.current = step1ChipsCorrect;
    }
  }, [step1ChipsCorrect]);

  const step1Completed: boolean = step1ChipsCorrect && state.result_1_correct;

  useEffect(() => {
    if (step1Completed) {
      onInteraction({
        'is-step1-completed': true,
      });
    }
  }, [step1Completed]);

  const step2ChipCorrect: boolean = state['drop-2'] === 'chip-c';

  useEffect(() => {
    if (step2ChipCorrect) {
      onInteraction({
        'is-step2-dropped': true,
      });
    }
  }, [step2ChipCorrect]);

  const step2Completed: boolean = step2ChipCorrect && state.result_2_correct;

  useEffect(() => {
    if (step2Completed) {
      onInteraction({
        'is-step2-completed': true,
      });
    }
  }, [step2Completed]);

  return (
    <div className="flex flex-col rounded-lg p-6 bg-gray-900 text-gray-300">
      <div
        className="w-full flex flex-col gap-4"
        tabIndex={0}
        aria-label={
          currentScreen === 1
            ? t(interaction.translations.step1.ariaLabel)
            : t(interaction.translations.step2.ariaLabel)
        }
      >
        <div className="w-full flex flex-col gap-4">
          <div className="h-64 md:h-80">
            <canvas
              tabIndex={0}
              aria-label={t(interaction.translations.graph)}
              ref={canvasRef}
              className="w-full h-full rounded-lg border-4 border-gray-600 shadow-inner bg-[#060918]"
            ></canvas>
          </div>

          {(chipPositions['chip-a'] === 'bay' ||
            chipPositions['chip-b'] === 'bay' ||
            chipPositions['chip-c'] === 'bay') && (
            <div className="bg-gray-700 border-2 border-gray-500 shadow-[0_0_20px_rgba(0,0,0,0.5),_inset_0_0_5px_rgba(255,255,255,0.1)] text-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-lg text-amber-300 mb-2">
                {t(interaction.translations.availableDataChips)}
              </h3>
              <div
                className="grid lg:grid-cols-3 gap-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'bay')}
              >
                {chipPositions['chip-a'] === 'bay' && (
                  <div
                    className="bg-gray-800 border-2 border-gray-500 cursor-grab transition-all duration-200 ease-in-out select-none hover:shadow-[0_0_15px_#f6ad55] active:cursor-grabbing active:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-700 p-2 rounded-lg text-center text-gray-200"
                    draggable="true"
                    tabIndex={0}
                    role="button"
                    aria-label={t(interaction.translations.chips.chip1)}
                    onDragStart={(e) => handleDragStart(e, 'chip-a')}
                    onKeyDown={(e) => handleChipKeyDown(e, 'chip-a')}
                    onClick={() => handleChipClick('chip-a')}
                  >
                    <span className="font-medium">{t(interaction.translations.common.scanA)}</span>
                    <p className="font-besley font-bold">
                      <span className="italic text-indigo-300">
                        x<sup>2</sup>
                      </span>{' '}
                      + <span className="text-yellow-300">2</span>
                      <span className="italic text-indigo-300">x</span>
                    </p>
                  </div>
                )}
                {chipPositions['chip-b'] === 'bay' && (
                  <div
                    className="bg-gray-800 border-2 border-gray-500 cursor-grab transition-all duration-200 ease-in-out select-none hover:shadow-[0_0_15px_#f6ad55] active:cursor-grabbing active:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-700 p-2 rounded-lg text-center text-gray-200"
                    draggable="true"
                    tabIndex={0}
                    role="button"
                    aria-label={t(interaction.translations.chips.chip2)}
                    onDragStart={(e) => handleDragStart(e, 'chip-b')}
                    onKeyDown={(e) => handleChipKeyDown(e, 'chip-b')}
                    onClick={() => handleChipClick('chip-b')}
                  >
                    <span className="font-medium">{t(interaction.translations.common.scanB)}</span>
                    <p className="font-besley font-bold">
                      <span className="text-pink-300">-3</span>
                      <span className="italic text-indigo-300">
                        x<sup>2</sup>
                      </span>{' '}
                      + <span className="italic text-indigo-300">x</span> -{' '}
                      <span className="text-orange-300">3</span>
                    </p>
                  </div>
                )}
                {chipPositions['chip-c'] === 'bay' && (
                  <div
                    className="bg-gray-800 border-2 border-gray-500 cursor-grab transition-all duration-200 ease-in-out select-none hover:shadow-[0_0_15px_#f6ad55] active:cursor-grabbing active:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-700 p-2 rounded-lg text-center text-gray-200"
                    draggable="true"
                    tabIndex={0}
                    role="button"
                    aria-label={t(interaction.translations.chips.chip3)}
                    onDragStart={(e) => handleDragStart(e, 'chip-c')}
                    onKeyDown={(e) => handleChipKeyDown(e, 'chip-c')}
                    onClick={() => handleChipClick('chip-c')}
                  >
                    <span className="font-medium">{t(interaction.translations.common.scanC)}</span>
                    <p className="font-besley font-bold">
                      <span className="text-yellow-300">4</span>
                      <span className="italic text-indigo-300">x</span> +{' '}
                      <span className="text-orange-300">1</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full bg-gray-700 border-2 border-gray-500 shadow-[0_0_20px_rgba(0,0,0,0.5),_inset_0_0_5px_rgba(255,255,255,0.1)] text-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-amber-300">{t(interaction.translations.operationsConsole)}</h3>
            <button
              onClick={reset}
              disabled={!hasChipsMoved}
              className="px-2 py-1 rounded transition-colors text-center text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white lg:px-4 lg:py-2"
            >
              {t(interaction.translations.reset)}
            </button>
          </div>
          <div className="space-y-4 mt-4">
            {currentScreen === 1 && (
              <>
                <div className="p-4 rounded-md bg-black/20 border border-gray-600">
                  <p className="text-center mb-3">{parse(t(interaction.translations.step1.instruction))}</p>
                  <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                    <div
                      className="bg-black/20 border-2 border-dashed border-gray-500 transition-colors duration-200 ease-in-out hover:bg-amber-500/20 hover:border-amber-500 min-h-20 w-full rounded-md flex items-center justify-center p-2"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'drop-1a')}
                    >
                      {chipPositions['chip-a'] === 'drop-1a' && (
                        <div className="bg-gray-800 w-full border-2 border-gray-500 cursor-default p-2 rounded-md text-center text-gray-200">
                          <span className="font-medium">{t(interaction.translations.common.scanA)}</span>
                          <p className="font-besley font-bold">
                            <span className="italic text-indigo-300">
                              x<sup>2</sup>
                            </span>{' '}
                            + <span className="text-yellow-300">2</span>
                            <span className="italic text-indigo-300">x</span>
                          </p>
                        </div>
                      )}
                      {chipPositions['chip-b'] === 'drop-1a' && (
                        <div className="bg-gray-800 w-full border-2 border-gray-500 cursor-default p-2 rounded-md text-center text-gray-200">
                          <span className="font-medium">{t(interaction.translations.common.scanB)}</span>
                          <p className="font-besley font-bold">
                            <span className="text-pink-300">-3</span>
                            <span className="italic text-indigo-300">
                              x<sup>2</sup>
                            </span>{' '}
                            + <span className="italic text-indigo-300">x</span> -{' '}
                            <span className="text-orange-300">3</span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-center w-12 text-gray-200">+</div>
                    <div
                      className="bg-black/20 border-2 border-dashed border-gray-500 transition-colors duration-200 ease-in-out hover:bg-amber-500/20 hover:border-amber-500 min-h-20 w-full rounded-md flex items-center justify-center p-2"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'drop-1b')}
                    >
                      {chipPositions['chip-a'] === 'drop-1b' && (
                        <div className="bg-gray-800 w-full border-2 border-gray-500 cursor-default p-2 rounded-md text-center text-gray-200">
                          <span className="font-medium">{t(interaction.translations.common.scanA)}</span>
                          <p className="font-besley font-bold">
                            <span className="italic text-indigo-300">
                              x<sup>2</sup>
                            </span>{' '}
                            + <span className="text-yellow-300">2</span>
                            <span className="italic text-indigo-300">x</span>
                          </p>
                        </div>
                      )}
                      {chipPositions['chip-b'] === 'drop-1b' && (
                        <div className="bg-gray-800 w-full border-2 border-gray-500 cursor-default p-2 rounded-md text-center text-gray-200">
                          <span className="font-medium">{t(interaction.translations.common.scanB)}</span>
                          <p className="font-besley font-bold">
                            <span className="text-pink-300">-3</span>
                            <span className="italic text-indigo-300">
                              x<sup>2</sup>
                            </span>{' '}
                            + <span className="italic text-indigo-300">x</span> -{' '}
                            <span className="text-orange-300">3</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {step1ChipsCorrect && (
                    <div className="mt-4 text-center">
                      <p className="mb-2 text-gray-300">{t(interaction.translations.step1.calculate)}</p>
                      <div className="flex items-center justify-center flex-wrap gap-2">
                        <span className="text-lg font-besley font-bold">
                          <input
                            type="number"
                            className="w-12 bg-gray-800 border border-gray-500 text-pink-300 text-center py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={inputs['input-1-x2']}
                            onChange={(e) => handleInputChange('input-1-x2', e.target.value)}
                            aria-label={`${t(interaction.translations.step1.inputs.input1)}`}
                          />{' '}
                          <span className="font-besley italic text-indigo-300">
                            x<sup>2</sup>
                          </span>
                        </span>
                        <span>+</span>
                        <span className="text-lg font-besley font-bold">
                          <input
                            type="number"
                            className="w-12 bg-gray-800 border border-gray-500 text-yellow-300 text-center py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={inputs['input-1-x']}
                            onChange={(e) => handleInputChange('input-1-x', e.target.value)}
                            aria-label={`${t(interaction.translations.step1.inputs.input2)}`}
                          />{' '}
                          <span className="font-besley italic text-indigo-300">x</span>
                        </span>
                        <span>+</span>
                        <span className="text-lg font-besley font-bold">
                          <input
                            type="number"
                            className="w-12 bg-gray-800 border border-gray-500 text-orange-300 text-center py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={inputs['input-1-c']}
                            onChange={(e) => handleInputChange('input-1-c', e.target.value)}
                            aria-label={`${t(interaction.translations.step1.inputs.input3)}`}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                  {errorMessages.step1 && !step1ChipsCorrect && (
                    <div
                      aria-live="polite"
                      role="alert"
                      className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-200 text-sm"
                    >
                      <div>{errorMessages.step1}</div>
                    </div>
                  )}
                  {errorMessages.calculation1 && (
                    <div
                      aria-live="polite"
                      role="alert"
                      className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-200 text-sm"
                    >
                      {errorMessages.calculation1}
                    </div>
                  )}
                  {state.result_1_correct && (
                    <div
                      aria-live="polite"
                      role="alert"
                      className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded text-green-300 text-sm"
                    >
                      {t(interaction.translations.step1.success)}
                    </div>
                  )}
                </div>
              </>
            )}

            {currentScreen === 2 && (
              <>
                <div className="p-4 rounded-md bg-black/20 border border-gray-600">
                  <p className="text-center mb-3">{parse(t(interaction.translations.step2.instruction))}</p>
                  <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                    <div className="w-full bg-gray-800 flex justify-center items-center min-h-20 border-2 border-gray-500 cursor-default p-2 rounded-md text-center text-gray-200">
                      <div className="text-gray-200 flex flex-col justify-center items-center">
                        <span className="font-medium">{t(interaction.translations.common.result1)}</span>
                        <p className="font-besley font-bold">
                          <span className="text-pink-300">-2</span>
                          <span className="italic text-indigo-300">
                            x<sup>2</sup>
                          </span>{' '}
                          + <span className="text-yellow-300">3</span>
                          <span className="italic text-indigo-300">x</span> -{' '}
                          <span className="text-orange-300">3</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-center w-12 text-gray-200">-</div>
                    <div
                      className="bg-black/20 border-2 border-dashed border-gray-500 transition-colors duration-200 ease-in-out hover:bg-amber-500/20 hover:border-amber-500 min-h-20 w-full rounded-md flex items-center justify-center p-2"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'drop-2')}
                    >
                      {chipPositions['chip-c'] === 'drop-2' && (
                        <div className="bg-gray-800 w-full border-2 border-gray-500 cursor-default p-2 rounded-md text-center text-gray-200">
                          <span className="font-medium">{t(interaction.translations.common.scanC)}</span>
                          <p className="font-besley font-bold">
                            <span className="text-yellow-300">4</span>
                            <span className="italic text-indigo-300">x</span> +{' '}
                            <span className="text-orange-300">1</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {state['drop-2'] === 'chip-c' && (
                    <div className="mt-4 text-center">
                      <p className="mb-2 text-gray-300">{t(interaction.translations.step2.calculate)}</p>
                      <div className="flex items-center justify-center flex-wrap gap-2">
                        <span className="text-lg font-besley font-bold">
                          <input
                            type="number"
                            className="w-12 bg-gray-800 border border-gray-500 text-pink-300 text-center py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={inputs['input-2-x2']}
                            onChange={(e) => handleInputChange('input-2-x2', e.target.value)}
                            aria-label={`${t(interaction.translations.step2.inputs.input1)}`}
                          />{' '}
                          <span className="font-besley italic text-indigo-300">
                            x<sup>2</sup>
                          </span>
                        </span>
                        <span>+</span>
                        <span className="text-lg font-besley font-bold">
                          <input
                            type="number"
                            className="w-12 bg-gray-800 border border-gray-500 text-yellow-300 text-center py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={inputs['input-2-x']}
                            onChange={(e) => handleInputChange('input-2-x', e.target.value)}
                            aria-label={`${t(interaction.translations.step2.inputs.input2)}`}
                          />{' '}
                          <span className="font-besley italic text-indigo-300">x</span>
                        </span>
                        <span>+</span>
                        <span className="text-lg font-besley font-bold">
                          <input
                            type="number"
                            className="w-12 bg-gray-800 border border-gray-500 text-orange-300 text-center py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={inputs['input-2-c']}
                            onChange={(e) => handleInputChange('input-2-c', e.target.value)}
                            aria-label={`${t(interaction.translations.step2.inputs.input3)}`}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                  {errorMessages.calculation2 && (
                    <div
                      aria-live="polite"
                      role="alert"
                      className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded text-red-200 text-sm"
                    >
                      {errorMessages.calculation2}
                    </div>
                  )}
                  {state.result_2_correct && (
                    <div
                      aria-live="polite"
                      role="alert"
                      className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded text-green-300 text-sm"
                    >
                      {t(interaction.translations.step2.success)}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombiningSonarScans;
