import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGameContext } from '../../../hooks/useGameContext';
import { useEventListener } from '../../../hooks/useEventListener';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/ceiling-light-angle';
import parse from 'html-react-parser';

const { diameterInput, sliderConfigs, totalSteps } = interaction;
const { slide1, slide2, slide3, slide4, slide5, slide6 } = sliderConfigs;

interface Bubble {
  id: number;
  x: number;
  y: number;
  r: number;
  speed: number;
}

interface Payload {
  step: number;
}

interface TunnelVisualizationProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

interface SlideProps extends TunnelVisualizationProps {
  bubbles: Bubble[];
}

// Shared underwater background with definitions
const UnderwaterBackground = ({ id, isLightOn = false }: { id: string; isLightOn?: boolean }) => (
  <>
    <defs>
      <linearGradient id={`waterGradient${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0066aa" />
        <stop offset="100%" stopColor="#003366" />
      </linearGradient>
      <radialGradient id={`tunnelGradient${id}`}>
        <stop offset="0%" stopColor="#000" />
        <stop offset="100%" stopColor="#000" />
      </radialGradient>
      <linearGradient id={`centerLightBeam${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,200,0.8)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
      {/* Light beam gradients */}
      <radialGradient
        id="leftLightBeam"
        gradientUnits="userSpaceOnUse"
        cx="300"
        cy="380"
        r="100"
        fx="300"
        fy="380"
      >
        <stop offset="0%" stopColor={isLightOn ? 'rgba(255,255,200,0.6)' : 'rgba(0,0,0,0)'} />
        <stop offset="100%" stopColor="rgba(255,255,200,0.01)" />
      </radialGradient>
      <radialGradient
        id="rightLightBeam"
        gradientUnits="userSpaceOnUse"
        cx="400"
        cy="380"
        r="100"
        fx="400"
        fy="380"
      >
        <stop offset="0%" stopColor={isLightOn ? 'rgba(255,255,200,0.6)' : 'rgba(0,0,0,0)'} />
        <stop offset="100%" stopColor="rgba(255,255,200,0.01)" />
      </radialGradient>
      {/* Car body gradient */}
      <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      {/* Headlight gradient */}
      <linearGradient id="headlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <filter id={`waterRipple${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
      </filter>
    </defs>
    <rect x="0" y="0" width="800" height="600" fill={`url(#waterGradient${id})`} />
    <rect
      x="0"
      y="0"
      width="800"
      height="600"
      fill={`url(#waterGradient${id})`}
      opacity="0.3"
      filter={`url(#waterRipple${id})`}
    />
  </>
);

// Reusable Car Component
const Car = ({ translateX = 340, translateY = 360, scale = 0.7 }) => (
  <g transform={`translate(${translateX}, ${translateY}) scale(${scale})`}>
    {/* Main car body */}
    <path
      d="M-80 25 L-80 -20 C-80 -40 -60 -50 -40 -50 L40 -50 C60 -50 80 -40 80 -20 L80 25 Z"
      fill="url(#carBodyGradient)"
      stroke="#1e3a8a"
      strokeWidth="2"
    />
    {/* Windshield */}
    <path d="M-60 -20 L-50 -40 L50 -40 L60 -20" fill="#a5f3fc" stroke="#0369a1" strokeWidth="2" />
    {/* Rear view mirror */}
    <rect x="-5" y="-45" width="10" height="5" fill="#1e293b" />
    {/* Grill */}
    <rect x="-40" y="10" width="80" height="15" fill="#1e293b" rx="2" />
    {/* Headlights */}
    <path
      d="M-75 -10 L-55 -10 L-55 10 L-75 10 Z"
      fill="url(#headlightGradient)"
      stroke="#1e3a8a"
      strokeWidth="1"
    />
    <path d="M55 -10 L75 -10 L75 10 L55 10 Z" fill="url(#headlightGradient)" stroke="#1e3a8a" strokeWidth="1" />
    {/* Fog lights */}
    <circle cx="-30" cy="20" r="4" fill="url(#headlightGradient)" />
    <circle cx="30" cy="20" r="4" fill="url(#headlightGradient)" />
    {/* Wheels */}
    <rect x="-85" y="25" width="25" height="25" fill="#000000" rx="2" />
    <rect x="60" y="25" width="25" height="25" fill="#000000" rx="2" />
  </g>
);

// Slide 1
const Slide1 = ({ bubbles }: SlideProps) => {
  const { t } = useTranslations();
  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="w-full h-96">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <UnderwaterBackground id="1" isLightOn={true} />
          {bubbles.map((bubble) => (
            <circle key={bubble.id} cx={bubble.x} cy={bubble.y} r={bubble.r} fill="rgba(255,255,255,0.3)" />
          ))}
          <circle cx="400" cy="300" r="200" fill="url(#tunnelGradient1)" stroke="#333" strokeWidth="10" />
          <line x1="227" y1="400" x2="573" y2="400" stroke="#fff" strokeWidth="4" />
          <Car />
          {/* Light beams */}
          <path d="M295 370 L220 250 L370 250 Z" fill="url(#leftLightBeam)" />
          <path d="M385 370 L310 250 L460 250 Z" fill="url(#rightLightBeam)" />
        </svg>
      </div>
      <p className="text-center py-4">{t(slide1.description as string)}</p>
    </div>
  );
};

// Slide 2
const Slide2 = ({ bubbles }: SlideProps) => {
  const { t } = useTranslations();
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div className="h-96">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-2xl">
          <UnderwaterBackground id="2" />
          {bubbles.map((bubble) => (
            <circle key={bubble.id} cx={bubble.x} cy={bubble.y} r={bubble.r} fill="rgba(255,255,255,0.3)" />
          ))}
          <circle cx="400" cy="300" r="200" fill="url(#tunnelGradient2)" stroke="#666" strokeWidth="10" />
          <line x1="227" y1="400" x2="573" y2="400" stroke="#fff" strokeWidth="4" />
          {/* Central light beam */}
          <path d="M400 100 L227 400 L573 400 Z" fill="url(#centerLightBeam2)" opacity="0.8" />
          {/* Upper triangle outline (alpha) */}
          <path d="M400 100 L227 400 L573 400 Z" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          {/* Text for angle */}
          <text x="390" y="160" fill="#fff" fontSize="32" className="font-besley font-bold italic">
            α
          </text>
          <Car />
          {/* Problem description */}
          <text x="400" y="50" fill="#fff" fontSize="28" textAnchor="middle">
            {parse(t(slide2.svgDescription as string))}
          </text>
        </svg>
      </div>
      <p>{parse(t(slide2.description as string))}</p>
    </div>
  );
};

// Slide 3
const Slide3 = ({ bubbles }: SlideProps) => {
  const { t } = useTranslations();
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div className="w-full h-96">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <UnderwaterBackground id="3" />
          {bubbles.map((bubble) => (
            <circle key={bubble.id} cx={bubble.x} cy={bubble.y} r={bubble.r} fill="rgba(255,255,255,0.3)" />
          ))}
          <circle cx="400" cy="300" r="200" fill="url(#tunnelGradient3)" stroke="#666" strokeWidth="10" />
          <line x1="227" y1="400" x2="573" y2="400" stroke="#fff" strokeWidth="4" />
          <path d="M400 100 L227 400 L573 400 Z" fill="url(#centerLightBeam3)" opacity="0.8" />
          <path d="M400 100 L227 400 L573 400 Z" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M400 300 L227 400 L573 400 Z" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          <text x="390" y="160" fill="#fff" fontSize="32" className="font-besley font-bold italic">
            α
          </text>
          <text x="390" y="340" fill="#fff" fontSize="32" className="font-besley font-bold italic">
            β
          </text>
        </svg>
      </div>
      <div>
        <p>{parse(t(slide3.description1 as string))}</p>
        <p>{parse(t(slide3.description2 as string))}</p>
      </div>
    </div>
  );
};

// Slide 4
const Slide4 = ({ bubbles, onInteraction }: SlideProps) => {
  const { t } = useTranslations();

  const [selectedFunction, setSelectedFunction] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [touchDragging, setTouchDragging] = useState<string | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const dropTargetRef = useRef<HTMLDivElement>(null);

  const options: string[] = ['sin', 'cos', 'tan'];

  const colors = {
    sin: '#8E24AA',
    cos: '#5A3714',
    tan: '#008217',
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setSelectedFunction(value);
    }
  };

  const handleDragStart = (e: React.DragEvent, value: string) => {
    e.dataTransfer.setData('text/plain', value);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const value = e.dataTransfer.getData('text/plain');
    setSelectedFunction(value);
  };

  const handleTouchStart = (e: React.TouchEvent, value: string) => {
    const touch = e.touches[0];
    setTouchDragging(value);
    setTouchPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDragging) return;
    const touch = e.touches[0];
    setTouchPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchDragging || !touchPosition || !dropTargetRef.current) return;
    // Check if touch ended over the drop target
    const dropRect = dropTargetRef.current.getBoundingClientRect();
    if (
      touchPosition.x >= dropRect.left &&
      touchPosition.x <= dropRect.right &&
      touchPosition.y >= dropRect.top &&
      touchPosition.y <= dropRect.bottom
    ) {
      setSelectedFunction(touchDragging);
    }
    setTouchDragging(null);
    setTouchPosition(null);
  };

  const checkAnswer = () => {
    const correct = selectedFunction === 'sin';
    setIsCorrect(correct);
    if (correct) onInteraction({ 'step-4-completed': correct });
  };

  const resetAnswer = () => {
    setSelectedFunction('');
    setIsCorrect(null);
  };

  return (
    <div className="w-full">
      <div className="h-96">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <UnderwaterBackground id="4" />
          {bubbles.map((bubble) => (
            <circle key={bubble.id} cx={bubble.x} cy={bubble.y} r={bubble.r} fill="rgba(255,255,255,0.3)" />
          ))}
          <circle cx="400" cy="300" r="200" fill="url(#tunnelGradient4)" stroke="#666" strokeWidth="10" />
          <line x1="227" y1="400" x2="400" y2="400" stroke="#fff" strokeWidth="4" />
          <text x="325" y="425" fill="#fff" fontSize="24" textAnchor="middle" className="font-besley font-bold">
            18 ft
          </text>
          <text x="340" y="320" fill="#fff" fontSize="24" textAnchor="end" className="font-besley font-bold">
            18.45 ft
          </text>
          <text x="210" y="425" fill="#fff" fontSize="24" className="font-besley font-bold">
            A
          </text>
          <text x="410" y="295" fill="#fff" fontSize="24" className="font-besley font-bold">
            C
          </text>
          <text x="410" y="425" fill="#fff" fontSize="24" className="font-besley font-bold">
            D
          </text>
          <line x1="400" y1="300" x2="400" y2="400" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M400 100 L227 400 L573 400 Z" fill="url(#centerLightBeam4)" opacity="0.8" />
          <path d="M400 300 L227 400" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          <g>
            <text
              x="350"
              y="335"
              fill="#fff"
              fontSize="24"
              className="font-besley font-bold italic"
              textAnchor="middle"
            >
              β
            </text>
            <line x1="342" y1="340" x2="358" y2="340" stroke="#fff" strokeWidth="1.5" />
            <text x="350" y="355" fill="#fff" fontSize="24" className="font-besley font-bold" textAnchor="middle">
              2
            </text>
          </g>
          <text x="400" y="50" fill="#fff" fontSize="24" textAnchor="middle">
            {parse(t(slide4.svgDescription as string))}
          </text>
        </svg>
      </div>

      <div className="w-full pt-2">
        <div className="flex flex-col lg:flex-row justify-around items-center gap-4">
          <div role="application">
            <div aria-atomic className="text-lg flex items-center justify-center gap-2">
              <div
                ref={dropTargetRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`w-16 h-12 border-2 border-dashed rounded flex items-center justify-center bg-white font-besley font-bold text-[${colors[selectedFunction as keyof typeof colors]}] ${isCorrect === null ? 'border-[#0061FC]' : isCorrect ? 'border-[#008217]' : 'border-red-500'}`}
              >
                {selectedFunction || '?'}
              </div>
              {parse(t(slide4.formula as string))}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              {options.map((option) => (
                <button
                  key={option}
                  draggable
                  onKeyDown={(e) => handleKeyDown(e, option)}
                  onDragStart={(e) => handleDragStart(e, option)}
                  onTouchStart={(e) => handleTouchStart(e, option)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`px-4 py-2 border-2 border-[#333333] rounded cursor-move font-besley font-bold text-[${colors[option as keyof typeof colors]}]`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex lg:flex-col items-center justify-center gap-4">
            <button onClick={checkAnswer} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              {t(slide4.checkAnswerLabel as string)}
            </button>
            <button onClick={resetAnswer} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
              {t(slide4.resetLabel as string)}
            </button>
          </div>
        </div>

        {isCorrect !== null && (
          <p className="my-4 p-2">
            {isCorrect ? parse(t(slide4.successMessage as string)) : parse(t(slide4.failureMessage as string))}
          </p>
        )}
      </div>

      {/* Visual representation of element being dragged on touch */}
      {touchDragging && touchPosition && (
        <div
          className="fixed z-[1000] opacity-80 px-4 py-2 bg-white border-2 border-[#333333] rounded pointer-events-none font-besley font-bold"
          style={{
            left: touchPosition.x - 30,
            top: touchPosition.y - 30,
          }}
        >
          {touchDragging}
        </div>
      )}
    </div>
  );
};

// Slide 5
const Slide5 = ({ bubbles }: SlideProps) => {
  const { t } = useTranslations();
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div className="h-96">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <UnderwaterBackground id="5" />
          {bubbles.map((bubble) => (
            <circle key={bubble.id} cx={bubble.x} cy={bubble.y} r={bubble.r} fill="rgba(255,255,255,0.3)" />
          ))}
          <circle cx="400" cy="300" r="200" fill="url(#tunnelGradient5)" stroke="#666" strokeWidth="10" />
          <line x1="227" y1="400" x2="573" y2="400" stroke="#fff" strokeWidth="4" />
          <text x="325" y="425" fill="#fff" fontSize="20" textAnchor="middle" className="font-besley font-bold">
            18 ft
          </text>
          <text x="350" y="330" fill="#fff" fontSize="20" textAnchor="end" className="font-besley font-bold">
            18.45 ft
          </text>
          <text x="210" y="425" fill="#fff" fontSize="24" className="font-besley font-bold">
            A
          </text>
          <text x="580" y="425" fill="#fff" fontSize="24" className="font-besley font-bold">
            B
          </text>
          <text x="390" y="290" fill="#fff" fontSize="24" className="font-besley font-bold">
            C
          </text>
          <text x="390" y="425" fill="#fff" fontSize="24" className="font-besley font-bold">
            D
          </text>
          <line x1="400" y1="300" x2="400" y2="400" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M400 100 L227 400 L573 400 Z" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M400 100 L227 400 L573 400 Z" fill="url(#centerLightBeam5)" opacity="0.8" />
          <path d="M400 300 L227 400 L573 400 Z" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
          <text x="390" y="160" fill="#fff" fontSize="28" className="font-besley font-bold italic">
            α
          </text>
          <text x="410" y="340" fill="#fff" fontSize="28" className="font-besley font-bold italic">
            β
          </text>
          <text x="400" y="50" fill="#fff" fontSize="24" textAnchor="middle" className="select-none">
            {parse(t(slide5.svgDescription as string))}
          </text>
        </svg>
      </div>
      <div className="flex flex-col justify-center items-center pt-4">
        <p>{parse(t(slide5.formula1 as string))}</p>
        <p>{parse(t(slide5.formula2 as string))}</p>
      </div>
    </div>
  );
};

// Slide 6
const Slide6 = ({ bubbles }: SlideProps) => {
  const { t } = useTranslations();

  const [diameterSlider, setdiameterSlider] = useState(diameterInput);

  const mToFt = useCallback((num: number) => num * 3.28084, []);

  const SCALE = 35;
  const xCenter = 400;
  const yAB = 450;
  const lineLength = 10.9728 * SCALE;
  const xA = xCenter - lineLength / 2;
  const xB = xCenter + lineLength / 2;
  const radius = (diameterSlider.value / 2) * SCALE;
  const halfChord = lineLength / 2;
  const centerHeight = Math.sqrt(radius * radius - halfChord * halfChord);
  const centerY = yAB - centerHeight;
  const topY = centerY - radius;
  const betaRadians = Math.asin(halfChord / radius);
  const betaDegrees = ((betaRadians * 180) / Math.PI) * 2;
  const alphaDegrees = betaDegrees / 2;

  // Handle slider updates
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const slider = document.getElementById(`slider-${diameterSlider.id}`) as HTMLInputElement;
    if (slider) {
      updateSliderBackground(slider);
    }
  }, [diameterSlider, updateSliderBackground]);

  // Slider change handler
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setdiameterSlider((prev) => ({ ...prev, value: Number(e.target.value) }));
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="h-96">
        <svg viewBox="-100 0 1000 700" className="w-full h-full max-w-2xl">
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0066cc" />
              <stop offset="100%" stopColor="#001933" />
            </linearGradient>
            <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            <linearGradient id="headlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <radialGradient id="tunnelGradient">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <linearGradient id="centerLightBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,200,0.8)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
          <rect x="-100" y="0" width="1000" height="700" fill="url(#waterGradient)" />
          {bubbles.map((bubble) => (
            <circle key={bubble.id} cx={bubble.x} cy={bubble.y} r={bubble.r} fill="rgba(255,255,255,0.3)" />
          ))}
          <g className="tunnel-elements">
            <circle
              cx={xCenter}
              cy={centerY}
              r={radius}
              fill="url(#tunnelGradient)"
              stroke="#666"
              strokeWidth="10"
            />
            <line x1={xA} y1={yAB} x2={xB} y2={yAB} stroke="#fff" strokeWidth="4" />
            <path
              d={`M${xCenter} ${topY} L${xA} ${yAB} L${xB} ${yAB} Z`}
              fill="url(#centerLightBeam)"
              opacity={0.8}
            />
            <Car translateX={325} translateY={420} scale={0.6} />
            <path
              d={`M${xCenter - lineLength / 4 + 20} ${yAB - 15}
                L${xCenter - lineLength / 3} ${yAB - radius / 3}
                L${xCenter - lineLength / 6} ${yAB - radius / 3} Z`}
              fill="url(#leftLightBeam)"
              opacity={0.6}
            />
            <path
              d={`M${xCenter + lineLength / 4 + 20} ${yAB - 15}
                L${xCenter + lineLength / 6} ${yAB - radius / 3}
                L${xCenter + lineLength / 3} ${yAB - radius / 3} Z`}
              fill="url(#rightLightBeam)"
              opacity={0.6}
            />
            <g opacity={1}>
              <path
                d={`M${xCenter} ${topY} L${xA} ${yAB} L${xB} ${yAB} Z`}
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <path
                d={`M${xCenter} ${centerY} L${xA} ${yAB} L${xB} ${yAB} Z`}
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.4"
              />
              <text x={xA - 25} y={yAB + 25} fill="#fff" fontSize="24" className="font-besley font-bold">
                A
              </text>
              <text x={xB + 10} y={yAB + 25} fill="#fff" fontSize="24" className="font-besley font-bold">
                B
              </text>
              <text x={xCenter - 10} y={centerY - 15} fill="#fff" fontSize="24" className="font-besley font-bold">
                C
              </text>
              <text
                x={xCenter - 7}
                y={centerY + 30}
                fill="#fff"
                fontSize="28"
                className="font-besley font-bold italic"
              >
                β
              </text>
              <text x={xCenter - 5} y={topY - 15} fill="#fff" fontSize="24" className="font-besley font-bold">
                P
              </text>
              <text
                x={xCenter - 7}
                y={topY + 40}
                fill="#fff"
                fontSize="28"
                className="font-besley font-bold italic"
              >
                α
              </text>
            </g>
          </g>
        </svg>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="w-full max-w-xl text-lg font-medium flex flex-col">
          <div aria-live="off" className="text-base font-semibold">
            <label htmlFor={`slider-${diameterSlider.id}`}>{t(diameterSlider.label)}</label>:{' '}
            {Number(mToFt(diameterSlider.value).toFixed(1))} {t(diameterSlider.unit ?? '')}
          </div>
          <div className="w-full">
            <div>
              <input
                id={`slider-${diameterSlider.id}`}
                type="range"
                value={diameterSlider.value}
                onChange={handleSliderChange}
                step={diameterSlider.step}
                min={diameterSlider.min}
                max={diameterSlider.max}
                className="global-slider w-full"
                aria-valuetext={`${t(diameterSlider.label ?? '')}: ${mToFt(diameterSlider.value).toFixed(1)} ${t(diameterSlider.unit ?? '')}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <p>{parse(t(slide6.description1 as string))}</p>
        <p>
          {parse(t(slide6.description2 as string))}{' '}
          <span className="font-besley font-bold text-[#E0002B]">{alphaDegrees.toFixed(1)}°</span>
        </p>
      </div>
    </div>
  );
};

// Main component
const TunnelVisualization = ({ onInteraction }: TunnelVisualizationProps) => {
  const { t } = useTranslations();

  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('ceiling-light-angle') as { payload: Payload };

  const [currentSlide, setCurrentSlide] = useState(dialogIndex === 1 ? 1 : totalSteps);
  const [bubbles, setBubbles] = useState<Array<Bubble>>([]);

  // handle slides
  useEffect(() => {
    if (payload && (payload as Payload).step !== currentSlide) {
      setCurrentSlide(payload.step);
    }
  }, [currentSlide, payload]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 600,
      r: Math.random() * 8 + 2,
      speed: Math.random() * 2 + 1,
    }));
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => ({
          ...bubble,
          y: bubble.y <= 0 ? 600 : bubble.y - bubble.speed,
          x: bubble.x + Math.sin(bubble.y / 30) * 0.5,
        })),
      );
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlide = slides[currentSlide - 1];

  const ariaLabels = [
    slide1?.ariaLabel,
    slide2?.ariaLabel,
    slide3?.ariaLabel,
    slide4?.ariaLabel,
    slide5?.ariaLabel,
    slide6?.ariaLabel,
  ];
  const ariaLabel = t(ariaLabels[currentSlide - 1] as string);

  return (
    <div role="region" aria-label={ariaLabel} className="w-full">
      <CurrentSlide bubbles={bubbles} onInteraction={onInteraction} />
    </div>
  );
};

export default TunnelVisualization;
