import React, { useState, useEffect, useRef } from 'react';
import { CarGraphConfig } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { getFuelBarColorClass, getFuelLevelStrokeColor } from './fuel-color-helper';
import parse from 'html-react-parser';
import carImage from '../assets/images/Redcar1.webp';

const normalizeCoordinate = (value: number, gridSize: number): number => {
  return ((value + gridSize) / (gridSize * 2)) * 100;
};

const calculatePosition = (x: number, y: number, gridSize: number) => {
  return {
    left: `${normalizeCoordinate(x, gridSize)}%`,
    top: `${100 - normalizeCoordinate(y, gridSize)}%`,
  };
};

interface CarGraphProps {
  interaction: {
    graphConfig: CarGraphConfig;
  };
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}
const CarGraph: React.FC<CarGraphProps> = ({ interaction, onInteraction }) => {
  const {
    initialPosition = { x: 0, y: 0 },
    targetPositions = [],
    transactions = 1,
    rotateMove,
    backwardRotation,
    fuelPosition,
    showFuelBar = false,
    enableReset = true,
    fuelRotation,
    enableDirectionChange = false,
    gridSize = 4,
    fuelBarColor = '#EB0000',
    ariaLabel = 'Car Graph Simulation',
    translations = {
      resetButton: 'Reset Position',
      changeDirectionButton: 'Change Direction',
      fuelStationAt: 'Fuel Station at ',
      fuelLabel: 'Fuel Level',
      targetReached: '🎉 Target Reached!',
      target: 'Target',
      reached: 'Reached',
      reach: 'Reach',
      refuelCarAnd: 'refuel the car and',
      refueling: 'Refueling...',
      moveForward: '→ (Right Arrow): Move Forward',
      moveBackward: '← (Left Arrow): Move Forward',
      moveDownward: '↓ (Down Arrow): Move Forward',
      rotateCar: 'Rotate Car',
      rotationPoint: 'Rotation Point',
      gridLine: 'Grid Line',
      frontPoint: 'Front Point',
      rearPoint: 'Rear Point',
      carPosition: 'Car Position',
      targetFlag: 'Target Flag',
      correct: 'Correct',
      incorrect: 'Incorrect',
      pointAt: 'Point at ',
      carRefueled: 'Car refueled: 100%, Change direction.',
      carRefueling: 'Car is refueling: ',
      carRotatedBy: 'Car rotated by',
      degreesAtRotationAxis: 'degrees at rotation axis',
      rotateCarBy90: 'Rotate Car by 90°',
      rotateCarBy180: 'Rotate Car by 180°',
      translation: 'Translation ',
      rotationAroundThePoint: '180° rotation around point',
      translationInstruction: 'Select the appropriate set of translations to reach the target located at ',
      translationPoints: [
        { x: -3, y: 2, isCorrect: false },
        { x: -3, y: -2, isCorrect: true },
        { x: 3, y: -2, isCorrect: false },
      ],
    },
  } = interaction.graphConfig;

  const { t } = useTranslations();
  const [position, setPosition] = useState(initialPosition);
  const [hasMoved, setHasMoved] = useState(false);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);
  const [canChangeDirection, setCanChangeDirection] = useState(enableDirectionChange);
  const [isInitialDirection, setIsInitialDirection] = useState(true);
  const [fuelLevel, setFuelLevel] = useState(showFuelBar ? 11 : 0);
  const [isRefueling, setIsRefueling] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentRotationStep, setCurrentRotationStep] = useState(0);
  const [feedback, setFeedback] = useState<{ point: string | null; show: boolean }>({ point: null, show: false });
  const [currentTransaction, setCurrentTransaction] = useState(0);
  const [resetRequired, setResetRequired] = useState(false);
  const [changeDirectionRequired, setChangeDirectionRequired] = useState(false);
  const [showRotationAxis, setShowRotationAxis] = useState(false);
  const [isCorrectPointReached, setIsCorrectPointReached] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState(0);
  const [hasFirstTargetBeenReached, setHasFirstTargetBeenReached] = useState(false);
  const hasTriggeredCheckpointReachedRef = useRef(false);

  // ARIA Live Region for Dynamic stuff
  const [ariaMessage, setAriaMessage] = useState('');
  useEffect(() => {
    let message = '';
    if (isCorrectPointReached) {
      message = `${t(translations.correct)}`;
    } else if (hasReachedTarget) {
      message = `${t(translations.target)} ${
        backwardRotation ? (currentTarget === 0 ? '1' : '2') : ''
      } ${t(translations.reached)}`;
    } else if (isRotating) {
      const axis =
        selectedTranslation === 1
          ? { x: 0, y: 0.25 }
          : selectedTranslation === 2
            ? { x: -1, y: 0.25 }
            : interaction.graphConfig.rotationAxes?.[currentRotationStep] || { x: 0, y: 0 };
      message = `${t(translations.carRotatedBy)} ${rotation} ${t(translations.degreesAtRotationAxis)} (${axis.x},${axis.y})`;
    } else if (isRefueling) {
      if (fuelLevel === 100) {
        message = `${t(translations.carRefueled)}`;
      } else {
        message = `${t(translations.carRefueling)} ${fuelLevel}`;
      }
    } else {
      message = showFuelBar
        ? !isRefueling
          ? fuelLevel < 30
            ? parse(t(translations.moveForward)).toString()
            : rotation === 0
              ? parse(t(translations.rotateCar)).toString()
              : rotation === 180
                ? parse(t(translations.moveBackward)).toString()
                : parse(t(translations.rotateCar)).toString()
          : ''
        : backwardRotation
          ? rotation === 0
            ? parse(t(translations.rotateCar)).toString()
            : rotation === 180
              ? parse(t(translations.moveBackward)).toString()
              : rotation === 90
                ? parse(t(translations.moveDownward)).toString()
                : parse(t(translations.rotateCar)).toString()
          : rotateMove
            ? ''
            : parse(t(translations.moveForward)).toString();
    }

    setAriaMessage(message);
  }, [
    hasReachedTarget,
    currentTarget,
    backwardRotation,
    t,
    translations,
    isRotating,
    rotation,
    isRefueling,
    fuelLevel,
    showFuelBar,
    fuelRotation,
    rotateMove,
    isCorrectPointReached,
    hasStarted,
    isAnimating,
  ]);

  useEffect(() => {
    if (
      backwardRotation &&
      hasReachedTarget &&
      position.x === targetPositions[currentTarget].x &&
      position.y === targetPositions[currentTarget].y
    ) {
      onInteraction({
        [`target-${currentTarget + 1}-reached`]: true,
      });
      if (currentTarget === 0) {
        setHasFirstTargetBeenReached(true);
      }
    } else if (fuelRotation && hasReachedTarget) {
      onInteraction({
        'target-reached': true,
      });
    } else if (rotateMove && isCorrectPointReached && !hasTriggeredCheckpointReachedRef.current) {
      hasTriggeredCheckpointReachedRef.current = true;
      onInteraction({
        'target-reached': true,
      });
    } else if (hasReachedTarget) {
      onInteraction({
        'target-2-reached': true,
      });
    } else if (position.x === 1 && position.y === 0 && !fuelRotation && !rotateMove && !backwardRotation) {
      onInteraction({
        'target-1-reached': true,
      });
    }
  }, [
    position,
    hasReachedTarget,
    currentTarget,
    backwardRotation,
    targetPositions,
    fuelRotation,
    isCorrectPointReached,
    hasStarted,
    rotateMove,
    onInteraction,
  ]);

  useEffect(() => {
    let refuelInterval: NodeJS.Timeout;
    if (isRefueling && fuelLevel < 100) {
      refuelInterval = setInterval(() => {
        setFuelLevel((prev) => {
          const newLevel = Math.min(100, prev + 1.2);
          if (newLevel === 100) {
            setIsRefueling(false);
            setCanChangeDirection(true);
            setIsInitialDirection(false);
          }
          return newLevel;
        });
      }, 50);
    }
    return () => clearInterval(refuelInterval);
  }, [isRefueling, fuelLevel, fuelRotation, hasStarted, isAnimating]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => handleKeyDown(event);
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    isInitialDirection,
    hasReachedTarget,
    fuelLevel,
    isRefueling,
    targetPositions,
    fuelPosition,
    showFuelBar,
    currentTransaction,
    resetRequired,
    changeDirectionRequired,
    rotation,
    isRotating,
    rotateMove,
    showRotationAxis,
  ]);

  const handleKeyDown = (event: KeyboardEvent | string) => {
    const key = typeof event === 'string' ? event : event.key;

    if (
      showRotationAxis ||
      rotateMove ||
      changeDirectionRequired ||
      resetRequired ||
      hasReachedTarget ||
      (showFuelBar && (fuelLevel <= 0 || (isRefueling && fuelLevel < 100)))
    ) {
      return;
    }

    const { enabledKeys, stepSize } = interaction.graphConfig.movement || {
      enabledKeys: [''],
      stepSize: 0,
    };

    const allowedKeys = enabledKeys.slice(currentTransaction, currentTransaction + 1);

    if (allowedKeys.includes(key)) {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (key === 'ArrowRight' && rotation === 0) {
          newX += stepSize;
        } else if (key === 'ArrowLeft' && rotation === 180) {
          newX -= stepSize;
        } else if (key === 'ArrowDown' && rotation === 90) {
          newY -= stepSize;
        } else if (key === 'ArrowUp' && rotation === 270) {
          newY += stepSize;
        } else {
          return prev;
        }

        setHasMoved(true);
        const target = targetPositions[currentTransaction];

        if (newX === target.x && newY === target.y) {
          setHasReachedTarget(true);
          setResetRequired(true);
        }

        if (showFuelBar && fuelPosition && Math.abs(newX - fuelPosition.x) < stepSize && !isRefueling) {
          setIsRefueling(true);
          setChangeDirectionRequired(true);
        }

        if (showFuelBar && !isRefueling) {
          setFuelLevel((prevFuel) => Math.max(0, prevFuel - 10));
        }

        return {
          x: newX,
          y: newY,
        };
      });
    }
  };

  const handleReset = () => {
    // Edge Case for Interactive 2 only
    if (
      backwardRotation &&
      !(position.x === targetPositions[currentTarget].x && position.y === targetPositions[currentTarget].y)
    ) {
      setPosition(initialPosition);
      return;
    }

    if (backwardRotation && hasFirstTargetBeenReached && currentTarget === 0) {
      onInteraction({
        'reset-pressed': true,
      });
    }

    setCurrentTarget((prev) => (prev + 1) % targetPositions.length);
    setCurrentTransaction((prev) => (prev + 1) % transactions);
    setIsRotating(false);
    setPosition(initialPosition);
    setHasMoved(false);
    setHasReachedTarget(false);
    setIsInitialDirection(true);
    setCanChangeDirection(enableDirectionChange);
    setShowRotationAxis(false);
    setRotation(0);
    if (showFuelBar) {
      setFuelLevel(11);
    }
    setIsRefueling(false);
    setResetRequired(false);
    setChangeDirectionRequired(false);
    setFeedback({ point: null, show: false });
    setIsCorrectPointReached(false);
    setAriaMessage('');
    setHasStarted(false);
    setSelectedTranslation(0);
    hasTriggeredCheckpointReachedRef.current = false;
  };

  const applyRotation = async (degrees: number, axisOverride?: { x: number; y: number }) => {
    setIsRotating(true);

    const axis = axisOverride || interaction.graphConfig.rotationAxes?.[currentRotationStep] || { x: 0, y: 0 };

    const dx = position.x - axis.x;
    const dy = position.y - axis.y;

    const rad = (degrees * Math.PI) / 180;
    const newX = axis.x + dx * Math.cos(rad) - dy * Math.sin(rad);
    const newY = Math.round(axis.y + dx * Math.sin(rad) - dy * Math.cos(rad));

    setRotation((prev) => prev + degrees);
    setPosition({ x: newX, y: newY });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsRotating(false);
  };

  const handleRotation = async () => {
    if (!canChangeDirection || (showFuelBar && fuelLevel < 100)) return;
    setShowRotationAxis(true);
    const degrees = interaction.graphConfig.rotationDegrees?.[currentRotationStep] || 90;
    await applyRotation(degrees);
    setCanChangeDirection(false);
    setIsInitialDirection((prev) => !prev);
    setTimeout(() => {
      setShowRotationAxis(false);
      setIsRotating(false);
      setCurrentRotationStep((prev) => (prev + 1) % (interaction.graphConfig.rotationAxes?.length ?? 1));
    }, 500);
  };

  const getRotationPoint = () => {
    if (rotateMove) {
      return { x: -3, y: 0 };
    } else if (fuelRotation && selectedTranslation === 1) {
      return { x: 1, y: 0 };
    } else {
      return interaction.graphConfig.rotationAxes?.[currentRotationStep] || { x: 0, y: 0 };
    }
  };

  const handlePointClick = async (point?: { x: number; y: number; isCorrect?: boolean }) => {
    if (
      isAnimating ||
      hasReachedTarget ||
      isCorrectPointReached ||
      (position.x === point?.x && position.y === point?.y)
    )
      return;

    if (point?.isCorrect) {
      const path = [{ x: -2, y: 0 }];

      setFeedback({ point: `${point.x},${point.y}`, show: true });
      await animateToPosition(path);
      setIsRotating(true);
      setShowRotationAxis(true);
      const axis = { x: -3, y: 0 };

      const dx = position.x - axis.x - 4;
      const dy = position.y - axis.y;

      const rad = (-90 * Math.PI) / 180;
      const newX = axis.x + dx * Math.cos(rad) - dy * Math.sin(rad);
      const newY = axis.y + dx * Math.sin(rad) - dy * Math.cos(rad);

      setRotation(-90);
      setPosition({ x: newX, y: newY });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowRotationAxis(false);

      setIsRotating(false);

      await animateToPosition([{ x: -3, y: -2 }]);

      setIsCorrectPointReached(true);
      setResetRequired(true);
      setHasMoved(true);
    } else if (fuelRotation) {
      if (selectedTranslation === 1) {
        await animateToPosition([{ x: 1, y: 0 }]);
        setFuelLevel(1);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsRefueling(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setIsRefueling(false);
        setShowRotationAxis(true);
        await applyRotation(180, { x: 0, y: 0 });
        await new Promise((resolve) => setTimeout(resolve, 500));
        setShowRotationAxis(false);
        await animateToPosition([{ x: -4, y: 0 }]);
        setHasReachedTarget(true);
        setFuelLevel(60);
        setResetRequired(true);
        setHasMoved(true);
      } else if (selectedTranslation === 2) {
        setShowRotationAxis(true);
        await applyRotation(180, { x: 0, y: 0 });
        await new Promise((resolve) => setTimeout(resolve, 500));
        setShowRotationAxis(false);
        await animateToPosition([{ x: -1.15, y: 0 }]);
        setResetRequired(true);
        setHasMoved(true);
      }
    } else {
      if (point) {
        showIncorrectFeedback(point);
      }
    }
  };

  const animateToPosition = async (path: { x: number; y: number }[]) => {
    const ANIMATION_SPEED_FACTOR = rotateMove ? 2.6 : 2.2;

    setIsAnimating(true);

    for (const step of path) {
      const dx = step.x - position.x;
      const dy = step.y - position.y;

      await new Promise((resolve) => {
        const fps = 15;
        const stepDuration = 1800 / (1800 / fps);
        const stepX = dx / stepDuration;
        const stepY = dy / stepDuration;

        let frames = 0;
        const interval = setInterval(
          () => {
            setPosition((prev) => {
              let newX = prev.x + stepX;
              let newY = prev.y + stepY;

              if (stepX > 0) newX = Math.min(newX, step.x);
              else if (stepX < 0) newX = Math.max(newX, step.x);

              if (stepY > 0) newY = Math.min(newY, step.y);
              else if (stepY < 0) newY = Math.max(newY, step.y);

              return {
                x: Number(newX.toFixed(2)),
                y: Number(newY.toFixed(2)),
              };
            });

            if (showFuelBar && !isRefueling) {
              if (selectedTranslation === 1) {
                setFuelLevel((prevFuel) =>
                  prevFuel <= 12 ? Math.max(0, prevFuel - 0.5) : Math.max(0, prevFuel - 2.2),
                );
              } else {
                setFuelLevel((prevFuel) => Math.max(0, prevFuel - 0.7));
              }
            }

            frames++;
            if (frames >= stepDuration) {
              clearInterval(interval);
              resolve(true);
            }
          },
          (ANIMATION_SPEED_FACTOR * 1000) / fps,
        );
      });
    }

    setIsAnimating(false);
  };

  const showIncorrectFeedback = (point: { x: number; y: number }) => {
    setFeedback({ point: `${point.x},${point.y}`, show: true });
    setTimeout(() => {
      setFeedback({ point: null, show: false });
      setAriaMessage('');
    }, 2000);
  };

  const handleTranslationChange = (option: number) => {
    setSelectedTranslation(option);
  };

  useEffect(() => {
    if (selectedTranslation !== null) {
      handlePointClick();
    }
  }, [selectedTranslation]);

  const movementConfig = interaction.graphConfig.movement || { enabledKeys: ['ArrowRight'], stepSize: 1 };
  const { enabledKeys } = movementConfig;
  const allowedKeys = enabledKeys.slice(currentTransaction, currentTransaction + 1);
  const currentKey = allowedKeys[0];

  const keyToTranslationMap: Record<string, React.ReactNode> = {
    ArrowRight: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
    ArrowLeft: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    ),
    ArrowDown: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    ),
  };

  const currentKeyTranslation = currentKey ? keyToTranslationMap[currentKey] : '';

  const isDisabled =
    !currentKeyTranslation ||
    showRotationAxis ||
    rotateMove ||
    changeDirectionRequired ||
    resetRequired ||
    hasReachedTarget ||
    isAnimating ||
    isRotating ||
    (backwardRotation && currentTransaction === 0 && rotation !== 90) ||
    (backwardRotation && currentTransaction === 1 && rotation !== 180);

  return (
    <>
      {rotateMove && !isCorrectPointReached && (
        <div className="mb-2 text-left">
          <strong className="text-base mb-3 font-semibold">{t(translations.translationInstruction)}</strong>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-base flex-col">
              <p className="mt-2">
                {t(translations.translation)} <span style={{ color: '#A8351D' }}>T</span>&lt;
                <span style={{ color: '#8E24AA' }}>-3</span>, <span style={{ color: '#DB0072' }}>0</span>&gt; →{' '}
                {t(translations.rotationAroundThePoint)} (<span style={{ color: '#0061FC' }}>-3</span>,{' '}
                <span style={{ color: '#E0002B' }}>0</span>) → {t(translations.translation)}{' '}
                <span style={{ color: '#A8351D' }}>T</span>&lt;<span style={{ color: '#8E24AA' }}>0</span>,{' '}
                <span style={{ color: '#DB0072' }}>-2</span>&gt;
              </p>
              <p className="mt-2 font-semibold">{t('scenes.S10.S10_D0_F47_C9.clickInstruction')}</p>
            </div>
          </div>
        </div>
      )}

      {rotateMove && isCorrectPointReached && (
        <div className="mb-2 text-left">
          <strong className="text-base mb-3 font-semibold">
            {t('scenes.S10.S10_D0_F47_C9.stepByStepTranslations')}
          </strong>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-base flex-col">
              <p className="mt-2">(0, 0) → (-3, 0) {t('scenes.S10.S10_D0_F47_C9.translationLeft')}</p>
              <p className="mt-2">(-3, 0) → (-3, 0) {t('scenes.S10.S10_D0_F47_C9.rotationAround')}</p>
              <p className="mt-2">(-3, 0) → (-3, -2) {t('scenes.S10.S10_D0_F47_C9.translationDown')}</p>
            </div>
          </div>
        </div>
      )}

      {fuelRotation && (
        <div className="mb-4 text-left">
          <p className="text-sm mb-2 font-medium">{t(translations.translationInstruction)}(-3, 0)</p>
          <div className="flex flex-col gap-2">
            <label
              className={`
                flex items-center gap-2 p-2 rounded-m border-2 text-sm
                ${selectedTranslation === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${!resetRequired && !isAnimating && fuelLevel > 0 ? 'hover:border-blue-500 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                transition-colors duration-200 focus-within:ring-2 ring-blue-500
              `}
            >
              <input
                type="radio"
                name="translation"
                className="accent-blue-500 w-3 h-3"
                checked={selectedTranslation === 1}
                onChange={() => handleTranslationChange(1)}
                disabled={
                  resetRequired ||
                  isAnimating ||
                  fuelLevel <= 0 ||
                  selectedTranslation === 1 ||
                  selectedTranslation === 2
                }
              />
              <div>
                <span>
                  {t(translations.translation)} <span style={{ color: '#A8351D' }}>T</span>&lt;
                  <span style={{ color: '#8E24AA' }}>1</span>, <span style={{ color: '#DB0072' }}>0</span>&gt;
                </span>
                <span className="mx-1">→</span>
                <span>
                  {t(translations.rotationAroundThePoint)} (<span style={{ color: '#0061FC' }}>1</span>,{' '}
                  <span style={{ color: '#E0002B' }}>0</span>)
                </span>
                <span className="mx-1">→</span>
                <span>
                  {t(translations.translation)} <span style={{ color: '#A8351D' }}>T</span>&lt;
                  <span style={{ color: '#8E24AA' }}>-4</span>, <span style={{ color: '#DB0072' }}>0</span>&gt;
                </span>
              </div>
            </label>
            <label
              className={`
                flex items-center gap-2 p-2 rounded-m border-2 text-sm
                ${selectedTranslation === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${!resetRequired && !isAnimating && fuelLevel > 0 ? 'hover:border-blue-500 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                transition-colors duration-200 focus-within:ring-2 ring-blue-500
              `}
            >
              <input
                type="radio"
                name="translation"
                className="accent-blue-500 w-3 h-3"
                checked={selectedTranslation === 2}
                onChange={() => handleTranslationChange(2)}
                disabled={
                  resetRequired ||
                  isAnimating ||
                  fuelLevel <= 0 ||
                  selectedTranslation === 1 ||
                  selectedTranslation === 2
                }
              />
              <div>
                <span>
                  {t(translations.rotationAroundThePoint)} (<span style={{ color: '#0061FC' }}>0</span>,{' '}
                  <span style={{ color: '#E0002B' }}>0</span>)
                </span>
                <span className="mx-1">→</span>
                <span>
                  {t(translations.translation)} <span style={{ color: '#A8351D' }}>T</span>&lt;
                  <span style={{ color: '#8E24AA' }}>-3</span>, <span style={{ color: '#DB0072' }}>0</span>&gt;
                </span>
              </div>
            </label>
          </div>
        </div>
      )}

      <div className="p-2" style={{ fontFamily: 'Avenir Next' }} aria-label={t(ariaLabel)}>
        <div aria-live="polite" role="status" className="sr-only">
          {ariaMessage}
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="mx-auto" style={{ width: fuelRotation || rotateMove ? '440px' : '534px' }}>
            <div className="relative aspect-square w-full border border-gray-300 bg-[#ffffff]">
              {enableReset && (
                <button
                  onClick={handleReset}
                  disabled={!hasMoved || (isRefueling && fuelLevel < 100)}
                  className={`px-4 py-2 z-10 rounded-md font-medium absolute top-2 right-2 ${
                    hasMoved && (!isRefueling || fuelLevel === 100)
                      ? 'bg-[#006BE0] text-white hover:bg-[#006BE0]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label={t(translations.resetButton)}
                >
                  {t(translations.resetButton)}
                </button>
              )}
              {enableDirectionChange && (
                <button
                  onClick={() => {
                    handleRotation();
                    setChangeDirectionRequired(false);
                  }}
                  disabled={!canChangeDirection || isRotating}
                  className={`px-4 py-2 z-10 rounded-md font-medium absolute top-2 left-2 ${
                    canChangeDirection && !isRotating
                      ? 'bg-white text-[#006BE0] border border-[#006BE0] hover:bg-gray-100'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label={
                    backwardRotation
                      ? currentTransaction === 0
                        ? t(translations.rotateCarBy90)
                        : currentTransaction === 1
                          ? t(translations.rotateCarBy180)
                          : t(translations.changeDirectionButton)
                      : t(translations.changeDirectionButton)
                  }
                >
                  {backwardRotation
                    ? currentTransaction === 0
                      ? t(translations.rotateCarBy90)
                      : currentTransaction === 1
                        ? t(translations.rotateCarBy180)
                        : t(translations.changeDirectionButton)
                    : t(translations.changeDirectionButton)}
                </button>
              )}
              {/* Grid lines - using dynamic gridSize */}
              {Array.from({ length: gridSize * 2 + 1 }, (_, i) => i - gridSize).map((num) => (
                <div
                  key={`grid-v-${num}`}
                  className="absolute top-0 bottom-0 w-px bg-[#8F959E]"
                  style={{ left: `${normalizeCoordinate(num, gridSize)}%` }}
                  role="img"
                  aria-label={`${t(translations.gridLine)} x ${num}`}
                />
              ))}
              {Array.from({ length: gridSize * 2 + 1 }, (_, i) => i - gridSize).map((num) => (
                <div
                  key={`grid-h-${num}`}
                  className="absolute left-0 right-0 h-px bg-[#8F959E]"
                  style={{ top: `${100 - normalizeCoordinate(num, gridSize)}%` }}
                  role="img"
                  aria-label={`${t(translations.gridLine)} y ${num}`}
                />
              ))}

              {/* Axes */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-600">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 font-medium">Y</div>
              </div>
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-600">
                <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 font-medium">X</div>
              </div>

              {showRotationAxis && (
                <div
                  className="absolute z-30"
                  style={{
                    ...calculatePosition(getRotationPoint().x, getRotationPoint().y, gridSize),
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="w-4 h-4 bg-[#EB0000] rounded-full animate-pulse" />
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-[#EB0000] font-semibold text-xs whitespace-nowrap bg-white px-1">
                    {t(translations.rotationPoint)} ({getRotationPoint().x}, {getRotationPoint().y})
                  </div>
                </div>
              )}

              <div
                aria-live="polite"
                className="absolute z-20"
                style={{
                  ...calculatePosition(
                    position.x +
                      (rotation === -90
                        ? 0
                        : fuelRotation && rotation === 180
                          ? selectedTranslation === 1
                            ? 1
                            : 0
                          : rotation === 180
                            ? 0
                            : 0),
                    position.y + (rotation === -90 ? 1 : rotation === 180 ? 0 : 0),
                    gridSize,
                  ),
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-2 h-2 bg-[#006BE0] rounded-full" />
                <div
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 text-[#006BE0] font-semibold text-xs whitespace-nowrap"
                  style={{
                    left: rotation === 90 ? '-30px' : rotation === -90 ? '30px' : '50%',
                    top: rotation === 90 ? '0px' : rotation === -90 ? '0px' : rotation === 180 ? '-15px' : '8px',
                  }}
                >
                  <div className="sr-only">{t(translations.frontPoint)}</div>(
                  {Math.round(
                    position.x + (rotation === 180 ? (fuelRotation && selectedTranslation === 1 ? 1 : 0) : 0),
                  )}
                  , {Math.round(position.y + (rotation === 90 ? 0 : rotation == -90 ? 1 : 0))})
                </div>
              </div>
              <div
                aria-live="polite"
                className="absolute z-20"
                style={{
                  ...calculatePosition(
                    position.x -
                      1 +
                      (rotation === 90
                        ? 1
                        : rotation === -90
                          ? 1
                          : fuelRotation && rotation === 180
                            ? selectedTranslation === 1
                              ? 3
                              : 2
                            : rotation === 180
                              ? 2
                              : 0),
                    position.y + (rotation === 90 ? 1 : rotation === -90 ? 0 : rotation === 180 ? 0 : 0),
                    gridSize,
                  ),
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-2 h-2 bg-[#006BE0] rounded-full" />
                <div
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 text-[#006BE0] font-semibold text-xs whitespace-nowrap"
                  style={{
                    left: rotation === 90 ? '-30px' : rotation === -90 ? '30px' : '50%',
                    top: rotation === 90 ? '0px' : rotation === -90 ? '0px' : rotation === 180 ? '-15px' : '8px',
                  }}
                >
                  <div className="sr-only">{t(translations.rearPoint)}</div>(
                  {Math.round(
                    position.x +
                      (rotation === 180
                        ? fuelRotation && selectedTranslation === 1
                          ? 2
                          : 1
                        : rotation === 0
                          ? -1
                          : 0),
                  )}
                  , {Math.round(position.y + (rotation === 90 ? 1 : rotation == -90 ? 0 : 0))})
                </div>
              </div>
              {(interaction.graphConfig.translationPoints ?? []).map((point) => (
                <div
                  key={`point-${point.x}-${point.y}`}
                  className="absolute z-50"
                  style={{
                    ...calculatePosition(point.x, point.y, gridSize),
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        handlePointClick(point);
                        setAriaMessage(point.isCorrect ? t(translations.correct) : t(translations.incorrect));
                      }}
                      disabled={
                        isAnimating ||
                        hasReachedTarget ||
                        isRotating ||
                        isCorrectPointReached ||
                        (position.x === point.x && position.y === point.y)
                      }
                      className="w-4 h-4 bg-[#006BE0] rounded-full cursor-pointer"
                      aria-label={`${t(translations.pointAt)} (${point.x}, ${point.y})`}
                    />
                    {feedback.point === `${point.x},${point.y}` && feedback.show && (
                      <div
                        aria-hidden="true"
                        className={`absolute mt-6 text-sm ${
                          point.isCorrect ? 'text-[#238B21] animate-bounce' : 'text-[#EB0000]'
                        }`}
                        style={{
                          fontSize: '18px',
                          animation: point.isCorrect ? 'bounce 1s infinite' : 'shake 0.5s infinite',
                        }}
                      >
                        <style>
                          {`
                        @keyframes shake {
                          0%, 100% { transform: translateX(0); }
                          25% { transform: translateX(-5px); }
                          75% { transform: translateX(5px); }
                        }
                      `}
                        </style>
                        {point.isCorrect ? t(translations.correct) : t(translations.incorrect)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {targetPositions.map((target, index) => (
                <div
                  key={`target-${index}`}
                  className="absolute z-10"
                  style={{
                    ...calculatePosition(target.x, target.y, gridSize),
                    transform: 'translate(-50%, -100%)',
                    opacity: currentTarget === index ? 1 : 0,
                  }}
                >
                  {hasReachedTarget && index === currentTarget && (
                    <div
                      className="absolute z-30 text-sm font-medium text-[#238B21] whitespace-nowrap animate-bounce"
                      style={{
                        bottom: backwardRotation ? (currentTarget === 0 ? '50%' : '120%') : '130%',
                        left: backwardRotation ? (currentTarget === 0 ? '200%' : '-40%') : '-150%',
                        transform: 'translateX(-50%) translateY(-8px)',
                        fontFamily: 'Avenir Next',
                      }}
                    >
                      🎉 {t(interaction.graphConfig.translations?.target || 'Target')}{' '}
                      {backwardRotation ? (currentTarget === 0 ? '1' : '2') : ''}{' '}
                      {t(interaction.graphConfig.translations?.reached || 'Reached')}
                    </div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    style={{ marginLeft: '10px' }}
                  >
                    {/* Flag pole */}
                    <rect x="14" y="0" width="4" height="40" fill="#222" />

                    {/* Checkered flag */}
                    <g transform="translate(18, 2)">
                      {/* Base white background */}
                      <rect
                        width="20"
                        height="16"
                        fill={hasReachedTarget && index === currentTarget ? '#22C55E' : '#FFFFFF'}
                        stroke={hasReachedTarget && index === currentTarget ? '#22C55E' : '#FF0000'}
                        strokeWidth="1"
                      />

                      {/* Checkered pattern - only show when not reached */}
                      {!(hasReachedTarget && index === currentTarget) && (
                        <>
                          <rect x="0" y="0" width="5" height="4" fill="#000" />
                          <rect x="10" y="0" width="5" height="4" fill="#000" />
                          <rect x="5" y="4" width="5" height="4" fill="#000" />
                          <rect x="15" y="4" width="5" height="4" fill="#000" />
                          <rect x="0" y="8" width="5" height="4" fill="#000" />
                          <rect x="10" y="8" width="5" height="4" fill="#000" />
                          <rect x="5" y="12" width="5" height="4" fill="#000" />
                          <rect x="15" y="12" width="5" height="4" fill="#000" />
                        </>
                      )}
                    </g>
                  </svg>
                </div>
              ))}
              {/* Fuel Station */}
              {fuelPosition && (
                <div
                  className="absolute z-10"
                  style={{
                    ...calculatePosition(fuelPosition.x, fuelPosition.y, gridSize),
                    transform: 'translate(-50%, -100%)',
                  }}
                  role="img"
                  aria-label={`${t(translations.fuelStationAt)} (${fuelPosition.x}, ${fuelPosition.y})`}
                >
                  {isRefueling && (
                    <div
                      className="absolute top-0 left-0 transform -translate-y-full -translate-x-1/2 whitespace-nowrap text-blue-500 text-base"
                      style={{ marginTop: '-10px' }}
                    >
                      {t(translations.refueling)}
                    </div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={fuelBarColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" x2="15" y1="22" y2="22" />
                    <line x1="4" x2="14" y1="9" y2="9" />
                    <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
                    <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
                  </svg>
                </div>
              )}

              {/* Car SVG */}
              <div
                className="absolute z-10"
                style={{
                  ...calculatePosition(
                    position.x -
                      0.7 +
                      (rotation === 90
                        ? fuelRotation || rotateMove
                          ? 0
                          : 0
                        : rotation === 180
                          ? fuelRotation && selectedTranslation === 1
                            ? 1
                            : fuelRotation || rotateMove
                              ? 0
                              : -0.1
                          : rotation === -90
                            ? fuelRotation || rotateMove
                              ? 0.8
                              : 0.5
                            : fuelRotation || rotateMove
                              ? 0.1
                              : 0),
                    position.y + (rotation === 90 ? 0.1 : rotation === 180 ? 0.1 : rotation === -90 ? 0.21 : 0.1),
                    gridSize,
                  ),
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {' '}
                {showFuelBar && fuelLevel < 1 && (
                  <div
                    className="absolute transform -translate-y-full whitespace-nowrap text-red-600 text-base"
                    style={{
                      top: '-15px',
                    }}
                  >
                    ⚠️ {t(`scenes.S8.S8_D0_F40_C9.outOfFuel`)}
                  </div>
                )}
                <div className="relative w-0 h-0">
                  <div
                    style={{
                      width: `${(rotateMove || fuelRotation ? 44 : 54) * (5 / gridSize)}px`,
                      height: `${(rotateMove || fuelRotation ? 38 : 38) * (4 / gridSize)}px`,
                      position: 'relative',
                      transform: `translate(-${20 * (4 / gridSize)}px, -${27 * (4 / gridSize)}px) ${
                        rotation === 0
                          ? 'rotate(0deg)'
                          : rotation === 90
                            ? 'rotate(90deg)'
                            : rotation === -90
                              ? 'rotate(-90deg)'
                              : 'rotate(180deg)'
                      }`,
                      transformOrigin:
                        rotation === 0
                          ? 'center'
                          : rotation === 90
                            ? '105% 96%'
                            : rotation === -90
                              ? '20% 80%'
                              : rotation === 180 && fuelRotation
                                ? '105% 90%'
                                : '105% 96%',
                      transition: isRotating ? 'transform 1.5s' : 'none',
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox={`0 -15 ${60 * (gridSize / 4)} 30`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: 1,
                      }}
                    >
                      <rect
                        x="0"
                        y="-15"
                        width={`${60 * (gridSize / 4)}`}
                        height="30"
                        fill="none"
                        stroke="#006BE0"
                        strokeWidth="2"
                        strokeDasharray="4"
                      />
                      <g>
                        <rect
                          x={
                            interaction.graphConfig.rotateMove
                              ? `${-3 * (gridSize / 4)}`
                              : `${55 * (gridSize / 4)}`
                          }
                          y="-2"
                          width="8"
                          height="4"
                          fill="#1E3A8A"
                          rx="1"
                        />
                      </g>
                    </svg>{' '}
                    <img
                      src={carImage}
                      alt="Car"
                      style={{
                        position: 'absolute',
                        left: interaction.graphConfig.rotateMove ? '0' : '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        zIndex: 20,
                        transform: interaction.graphConfig.rotateMove ? 'scaleX(-1)' : 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ARIA Live Region for Car Position */}
              <div aria-live="polite" className="sr-only">
                {`${t(translations.carPosition)} (${Math.round(position.x)}, ${Math.round(position.y)})`} (
                {Math.round(position.x + (rotation === 180 ? 1 : rotation === 0 ? -1 : 0))},{' '}
                {Math.round(position.y + (rotation === 90 ? 1 : rotation == -90 ? 0 : 0))})
              </div>

              {/* Coordinate labels - make dynamic */}
              {Array.from({ length: gridSize * 2 + 1 }, (_, i) => i - gridSize).map((num) => (
                <div
                  key={`x-${num}`}
                  className="absolute top-1/2 transform -translate-x-1/2 mt-4 text-sm"
                  style={{ left: `${normalizeCoordinate(num, gridSize)}%` }}
                  aria-hidden="true"
                >
                  {num}
                </div>
              ))}
              {Array.from({ length: gridSize * 2 + 1 }, (_, i) => i - gridSize).map((num) => (
                <div
                  key={`y-${num}`}
                  className="absolute left-1/2 transform -translate-y-1/2 -ml-6 text-sm"
                  style={{ top: `${100 - normalizeCoordinate(num, gridSize)}%` }}
                  aria-hidden="true"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {showFuelBar && (
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={getFuelLevelStrokeColor(fuelLevel)}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="15" y1="22" y2="22" />
                <line x1="4" x2="14" y1="9" y2="9" />
                <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
                <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
              </svg>
              <div className="w-48 h-4 bg-[#949494] rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-200 ${getFuelBarColorClass(fuelLevel)}`}
                  aria-label={t(translations.fuelLabel)}
                  style={{ width: `${Math.max(0, Math.min(100, fuelLevel))}%` }}
                />
              </div>
              <span className={`font-medium ${getFuelLevelStrokeColor(fuelLevel)}`}>{Math.floor(fuelLevel)}%</span>
            </div>
          )}
          {showFuelBar && fuelLevel === 0 && (
            <p className="text-sm text-[#EB0000]">{t('scenes.S8.S8_D0_F40_C9.noFuel')}</p>
          )}

          {!showFuelBar && !rotateMove && currentKeyTranslation && (
            <div className="flex items-center justify-center gap-4 mt-1">
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-col items-center gap-y-1">
                  <p>
                    {backwardRotation
                      ? rotation === 0
                        ? parse(t(translations.rotateCar))
                        : rotation === 180
                          ? parse(t(translations.moveBackward))
                          : rotation === 90
                            ? parse(t(translations.moveDownward))
                            : parse(t(translations.rotateCar))
                      : rotateMove
                        ? ''
                        : parse(t(translations.moveForward))}
                  </p>
                  <p>
                    <span className="text-[#006BE0] font-medium">
                      {t(interaction.graphConfig.translations?.reach || 'Reach')}{' '}
                      {t(interaction.graphConfig.translations?.target || 'Target')} (
                      {targetPositions[currentTarget]?.x ?? 0},{targetPositions[currentTarget]?.y ?? 0})
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleKeyDown(currentKey)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    isDisabled
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#006BE0] text-white hover:bg-[#0056b3]'
                  }`}
                  aria-live="polite"
                >
                  {currentKeyTranslation}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarGraph;
