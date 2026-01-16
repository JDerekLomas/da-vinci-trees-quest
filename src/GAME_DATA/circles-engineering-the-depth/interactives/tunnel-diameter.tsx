/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useGameContext } from '../../../hooks/useGameContext';
import { useEventListener } from '../../../hooks/useEventListener';
import { SvgElementsData } from '../interactives/interface';
import interaction from '../configs/tunnel-diameter';
import parse from 'html-react-parser';
import { useTranslations } from '../../../hooks/useTranslations';

const { totalSteps, CONSTS, slideConfigs, translations, getBaseGeometryElements } = interaction;
const { slide1, slide2, slide3, slide5, slide6 } = slideConfigs;
const { checkAnswerBtn, resetBtn, submitBtn } = translations;
const { SVG_WIDTH, SVG_HEIGHT } = CONSTS;

const COORDINATES = {
  centerX: SVG_WIDTH / 2,
  centerY: SVG_HEIGHT / 2,
  rectX: (SVG_WIDTH - 280) / 2,
  rectY: (SVG_HEIGHT - 240) / 2,
};

interface Payload {
  step: number;
}

interface EquationData {
  title: string;
  description: string;
  format: Array<string | { slot: string; suffix?: string }>;
}

interface TunnelDiameterProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

// Shared components
const BubblesAnimation: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    setBubbles(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 6 + 2,
        speed: Math.random() * 1.5 + 0.5,
        wobble: Math.random() * 2 - 1,
      })),
    );

    const intervalId = setInterval(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => ({
          ...bubble,
          y: bubble.y <= 0 ? height : bubble.y - bubble.speed,
          x: bubble.x + Math.sin(bubble.y / 40) * bubble.wobble,
        })),
      );
    }, 40);

    return () => clearInterval(intervalId);
  }, [width, height]);

  return bubbles.map((bubble) => (
    <circle key={bubble.id} cx={bubble.x} cy={bubble.y} r={bubble.r} fill="rgba(255,255,255,0.4)" />
  ));
};

const SvgElements: React.FC<{
  id: string;
  tunnel?: boolean;
  children: React.ReactNode;
}> = ({ id, children, tunnel = true }) => {
  const { centerX, centerY, rectX, rectY } = COORDINATES;
  const radius = Math.sqrt(Math.pow(rectX + 280 - centerX, 2) + Math.pow(rectY - centerY, 2));

  return (
    <>
      {/* Defs and background */}
      <defs>
        <linearGradient id={`waterGradient${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a7bb5" />
          <stop offset="100%" stopColor="#064273" />
        </linearGradient>
        <radialGradient id={`tunnelGradient${id}`}>
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
        <filter id={`waterRipple${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill={`url(#waterGradient${id})`} />
      <rect
        x="0"
        y="0"
        opacity="0.4"
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        fill={`url(#waterGradient${id})`}
        filter={`url(#waterRipple${id})`}
      />

      <BubblesAnimation width={SVG_WIDTH} height={SVG_HEIGHT} />

      {/* Tunnel */}
      {tunnel && (
        <circle
          r={radius}
          cx={centerX}
          cy={centerY}
          stroke="#777"
          strokeWidth="8"
          fill={`url(#tunnelGradient${id})`}
        />
      )}
      {/* Content */}
      {children}
    </>
  );
};

// Simplified point component
const LabeledPoint = ({ x, y, labelX, labelY, label }: any) => {
  const { centerX, centerY } = COORDINATES;
  const adjustedX = labelX ? labelX : x > centerX ? x - 5 : x - 10;
  const adjustedY = labelY ? labelY : y > centerY ? y + 25 : y - 10;
  return (
    <>
      <circle cx={x} cy={y} r="5" fill="#fff" stroke="#000" strokeWidth="1" />
      <text x={adjustedX} y={adjustedY} fill="#fff" className="font-besley text-xl font-bold">
        {label}
      </text>
    </>
  );
};

// Simplified SVG elements rendering
const renderSvgElements = (elements: any, key: string): React.ReactNode => {
  if (!elements) return null;

  if (key === 'points') {
    return elements.map((point: any) => <LabeledPoint key={point.label} {...point} />);
  } else if (key === 'lines') {
    return elements.map((line: any, index: number) => (
      <line
        {...line}
        key={`line-${index}`}
        stroke={line.stroke || '#fff'}
        strokeWidth={line.strokeWidth || '2'}
        strokeDasharray={line.dashed ? '8,8' : undefined}
      />
    ));
  } else if (key === 'labels') {
    return elements.map((label: any, index: number) => (
      <text
        {...label}
        key={`label-${index}`}
        fill={label.fill || '#fff'}
        className="font-besley text-xl font-bold"
        textAnchor={label.textAnchor || 'middle'}
      >
        {label.text}
      </text>
    ));
  }
  return null;
};

// Generic drag and drop component
const DragDropGame: React.FC<{
  items: string[];
  slots: string[];
  colors: string[];
  isCorrect: boolean;
  equation: EquationData;
  successMessage: string;
  failureMessage: string;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  checkMethod: (values: Record<string, string>) => boolean;
}> = ({
  isCorrect,
  setIsCorrect,
  items,
  slots,
  colors,
  equation,
  checkMethod,
  successMessage,
  failureMessage,
}) => {
  const { t } = useTranslations();

  const [dropTargets, setDropTargets] = useState<Record<string, string>>(
    Object.fromEntries(slots.map((s) => [s, ''])),
  );
  const [activeSlot, setActiveSlot] = useState(slots[0]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [touchDrag, setTouchDrag] = useState({
    active: false,
    value: '',
    x: 0,
    y: 0,
    color: '',
  });
  const dropZoneRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleDragStart = (e: React.DragEvent, value: string) => {
    e.dataTransfer.setData('text', value);
  };

  const handleDrop = (e: React.DragEvent, target: string) => {
    setActiveSlot(target);
    const value = e.dataTransfer.getData('text');
    setDropTargets((prev) => ({ ...prev, [target]: value }));
    setShowFeedback(false);
  };

  const handleTouchStart = (e: React.TouchEvent, value: string) => {
    const touch = e.touches[0];
    setTouchDrag({
      active: true,
      value,
      x: touch.clientX,
      y: touch.clientY,
      color: colors[items.indexOf(value)],
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDrag.active) return;
    const touch = e.touches[0];
    setTouchDrag((prev) => ({
      ...prev,
      x: touch.clientX,
      y: touch.clientY,
    }));
  };

  const handleTouchEnd = () => {
    if (!touchDrag.active) return;
    const touchX = touchDrag.x;
    const touchY = touchDrag.y;
    for (const slot of slots) {
      const element = dropZoneRefs.current[slot];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (touchX >= rect.left && touchX <= rect.right && touchY >= rect.top && touchY <= rect.bottom) {
          setActiveSlot(slot);
          setShowFeedback(false);
          setDropTargets((prev) => ({ ...prev, [slot]: touchDrag.value }));
          break;
        }
      }
    }
    setTouchDrag({ active: false, value: '', x: 0, y: 0, color: '' });
  };

  const handleOnClick = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowFeedback(false);
      setDropTargets((prev) => ({ ...prev, [activeSlot]: value }));
      setActiveSlot(slots[(slots.indexOf(activeSlot) + 1) % slots.length]);
    }
  };

  const checkAnswer = () => {
    setShowFeedback(true);
    setIsCorrect(checkMethod(dropTargets));
  };

  const resetDrops = () => {
    setIsCorrect(false);
    setShowFeedback(false);
    setActiveSlot(slots[0]);
    setDropTargets(Object.fromEntries(slots.map((s) => [s, ''])));
  };

  return (
    <div className="w-full">
      <div>
        <h3 className="text-xl font-semibold">{t(equation.title)}</h3>
        <p className="text-gray-700">{parse(t(equation.description))}</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-around items-center gap-4 pt-4">
        <div role="application">
          <div aria-atomic className="flex items-center justify-center space-x-3">
            {equation.format.map((item, idx) =>
              typeof item === 'string' ? (
                <span key={`eq-${idx}`} className="text-xl">
                  {item}
                </span>
              ) : (
                <div
                  key={`drop-${idx}`}
                  ref={(el) => (dropZoneRefs.current[item.slot] = el)}
                  onDrop={(e) => handleDrop(e, item.slot)}
                  onDragOver={(e) => e.preventDefault()}
                  className={`w-16 h-12 border-2 border-dashed rounded flex items-center justify-center bg-white font-besley font-bold text-[${colors[items.indexOf(dropTargets[item.slot])]}]
                ${showFeedback ? (isCorrect ? 'border-[#008217]' : 'border-[#E0002B]') : activeSlot === item.slot ? 'border-[#0061FC]' : 'border-[#333333]'}`}
                >
                  {dropTargets[item.slot] || '?'}
                  {item.suffix || ''}
                </div>
              ),
            )}
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {items.map((item, idx) => (
              <button
                draggable
                key={item}
                onKeyDown={(e) => handleOnClick(e, item)}
                onDragStart={(e) => handleDragStart(e, item)}
                onTouchStart={(e) => handleTouchStart(e, item)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`px-4 py-2 border-2 border-[#333333] outline-[#0061FC] outline-offset-[3px] rounded cursor-move font-besley font-bold text-[${colors[idx]}]`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex lg:flex-col items-center justify-center gap-4">
          <button onClick={checkAnswer} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            {t(checkAnswerBtn)}
          </button>
          <button onClick={resetDrops} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
            {t(resetBtn)}
          </button>
        </div>
      </div>
      {showFeedback && <p className="py-4">{parse(t(isCorrect ? successMessage : failureMessage))}</p>}

      {/* Floating drag element for touch */}
      {touchDrag.active && (
        <div
          className={`fixed z-50 opacity-80 p-2 px-4 rounded-md pointer-events-none font-besley font-bold text-[${touchDrag.color}] bg-white border-2 border-[#333333]`}
          style={{
            top: touchDrag.y - 20,
            left: touchDrag.x - 40,
          }}
        >
          {touchDrag.value}
        </div>
      )}
    </div>
  );
};

// Base slide layout
const BaseSlide: React.FC<{
  id: string;
  tunnel?: boolean;
  children?: React.ReactNode;
  svgElements?: SvgElementsData;
}> = ({ id, children, svgElements = {}, tunnel = true }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-[300px]">
        <SvgElements id={id} tunnel={tunnel}>
          {Object.entries(svgElements).map(([key, elements]) => renderSvgElements(elements, key))}
        </SvgElements>
      </svg>
      {children}
    </div>
  );
};

const Slide1 = () => <BaseSlide id="1" svgElements={getBaseGeometryElements(COORDINATES, 1)} />;

const Slide2 = () => <BaseSlide id="2" svgElements={getBaseGeometryElements(COORDINATES, 2)} />;

const Slide3 = ({ onInteraction }: TunnelDiameterProps) => {
  const { t } = useTranslations();

  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAnswerSubmit = () => {
    const correct = userAnswer.trim() === '90';
    setIsCorrect(correct);
    setShowFeedback(true);
    if (!correct) setWrongAttempts((prev) => prev + 1);
  };

  useEffect(() => {
    if (isCorrect) {
      onInteraction({ 'step-3-completed': true });
    }
  }, [isCorrect, onInteraction]);

  return (
    <BaseSlide id="3" svgElements={getBaseGeometryElements(COORDINATES, 3)}>
      <div>
        <div>
          <p>
            {parse(t(slide3?.quePart1 as string))}{' '}
            <input
              type="text"
              placeholder="∠DCP"
              ref={inputRef}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-16 px-2 py-1 border-2 border-[#333333] rounded text-center"
            />{' '}
            {parse(t(slide3?.quePart2 as string))}
          </p>
        </div>

        <button
          onClick={handleAnswerSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-fit my-4"
        >
          {t(submitBtn)}
        </button>
        {showFeedback && (
          <p>
            {parse(
              t(
                isCorrect
                  ? (slide3?.successMessage as string)
                  : wrongAttempts === 1
                    ? (slide3?.failureMessage1 as string)
                    : (slide3?.failureMessage2 as string),
              ),
            )}
          </p>
        )}
      </div>
    </BaseSlide>
  );
};

const Slide4 = Slide2;

const Slide5 = ({ onInteraction }: TunnelDiameterProps) => {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      onInteraction({ 'step-5-completed': true });
    }
  }, [isCorrect, onInteraction]);

  const checkEquation = (values: Record<string, string>): boolean => {
    const { a, b, c, d } = values;
    const isValidPair = (x: string, y: string, vals: string[]) => vals.includes(x) && vals.includes(y) && x !== y;

    return (
      (isValidPair(a, b, ['30', '6']) && isValidPair(c, d, ['18', 'x'])) ||
      (isValidPair(a, b, ['18', 'x']) && isValidPair(c, d, ['30', '6']))
    );
  };

  return (
    <BaseSlide id="5" svgElements={getBaseGeometryElements(COORDINATES, 5)}>
      <DragDropGame
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        checkMethod={checkEquation}
        slots={['a', 'b', 'c', 'd']}
        items={['30', '18', '6', 'x']}
        colors={['#A6001A', '#DB0072', '#0061FC', '#00749D']}
        successMessage={slide5?.successMessage as string}
        failureMessage={slide5?.failureMessage as string}
        equation={{
          title: slide5?.title as string,
          description: slide5?.description as string,
          format: [{ slot: 'a' }, '×', { slot: 'b' }, '=', { slot: 'c' }, '×', { slot: 'd' }],
        }}
      />
    </BaseSlide>
  );
};

const Slide6 = ({ onInteraction }: TunnelDiameterProps) => {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      onInteraction({ 'step-6-completed': true });
    }
  }, [isCorrect, onInteraction]);

  const checkEquation = (values: Record<string, string>): boolean => {
    const { a, b, c } = values;
    return c === 'DP' && ((a === 'DC' && b === 'CP') || (a === 'CP' && b === 'DC'));
  };

  return (
    <BaseSlide id="6" svgElements={getBaseGeometryElements(COORDINATES, 6)}>
      <DragDropGame
        isCorrect={isCorrect}
        slots={['a', 'b', 'c']}
        items={['CP', 'DP', 'DC']}
        setIsCorrect={setIsCorrect}
        checkMethod={checkEquation}
        colors={['#8E24AA', '#008217', '#633300']}
        successMessage={slide6?.successMessage as string}
        failureMessage={slide6?.failureMessage as string}
        equation={{
          title: slide6?.title as string,
          description: slide6?.description as string,
          format: [{ slot: 'a', suffix: '²' }, '+', { slot: 'b', suffix: '²' }, '=', { slot: 'c', suffix: '²' }],
        }}
      />
    </BaseSlide>
  );
};

// Main component
const InteractiveSlides = ({ onInteraction }: TunnelDiameterProps) => {
  const { t } = useTranslations();

  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('tunnel-diameter') as { payload: Payload };

  const [currentSlide, setCurrentSlide] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlide = slides[currentSlide - 1];

  const ariaLabels = [
    slide1?.ariaLabel,
    slide2?.ariaLabel,
    slide3?.ariaLabel,
    slide2?.ariaLabel, // Slide4 is same as Slide2
    slide5?.ariaLabel,
    slide6?.ariaLabel,
  ];
  const ariaLabel = t(ariaLabels[currentSlide - 1] as string);

  // handle slides
  useEffect(() => {
    if (payload && (payload as Payload).step !== currentSlide) {
      setCurrentSlide(payload.step);
    }
  }, [currentSlide, payload]);

  return (
    <div role="region" aria-label={ariaLabel} className="w-full">
      <CurrentSlide onInteraction={onInteraction} />
    </div>
  );
};

export default InteractiveSlides;
