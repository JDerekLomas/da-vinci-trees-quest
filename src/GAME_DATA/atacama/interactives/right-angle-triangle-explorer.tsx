import React, { useEffect, useState } from 'react';
import { RightAngleTriangleExplorerInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';

interface TrigonometricTriangleProps {
  interaction: RightAngleTriangleExplorerInteraction;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const TrigonometricTriangle: React.FC<TrigonometricTriangleProps> = ({
  interaction,
  onInteraction,
}) => {
  const { t } = useTranslations();

  const { inputs, translations } = interaction;

  const [angle, setAngle] = useState(30);
  const [startPositon, setStartPosition] = useState({ x: 25, y: 180 });
  const [announcement, setAnnouncement] = useState('');

  // Fixed hypotenuse length
  const hypotenuse = 100;

  // Calculate side lengths based on angle
  const opposite = hypotenuse * Math.sin((angle * Math.PI) / 180);
  const adjacent = hypotenuse * Math.cos((angle * Math.PI) / 180);

  // Calculate tangent
  const tangent = Math.tan((angle * Math.PI) / 180);

  // Scale factor for visualization
  const scale = 180 / hypotenuse;

  const createArc = (
    startX: number,
    startY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ): string => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = startX + radius * Math.cos(startRad);
    const y1 = startY - radius * Math.sin(startRad);
    const x2 = startX + radius * Math.cos(endRad);
    const y2 = startY - radius * Math.sin(endRad);
    const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2}`;
  };

  const handleClicked = (value: number) => {
    setAngle(value);
    if (value === 30) {
      setStartPosition((prev) => ({ ...prev, x: 25 }));
    } else if (value === 45) {
      setStartPosition((prev) => ({ ...prev, x: 40 }));
      onInteraction({ 'right-angle-45-completed': true });
    } else if (value === 60) {
      setStartPosition((prev) => ({ ...prev, x: 55 }));
      onInteraction({ 'right-angle-60-completed': true });
    }
  };

  useEffect(() => {
    setAnnouncement(
      `${t(translations.adjecentSide)} ${adjacent.toFixed(1)}, ${t(translations.oppositeSide)} ${opposite.toFixed(1)}, tan(${angle}°) = ${opposite.toFixed(1)} divided by ${adjacent.toFixed(1)}, tan(${angle}°) = ${tangent.toFixed(3)}`
    );
  }, [angle, t, translations.adjecentSide, translations.oppositeSide]);

  return (
    <div className="w-full bg-black" role="region" aria-label={t(interaction.ariaLabel)}>
      <div className="grid grid-cols-1 gap-4 p-4">
        {/* Triangle visualization */}
        <svg viewBox="-10 -10 220 220" className="w-full h-96">
          {/* Triangle */}
          <path
            d={`M ${startPositon.x} ${startPositon.y} L ${startPositon.x + adjacent * scale} ${startPositon.y} L ${startPositon.x + adjacent * scale} ${startPositon.y - opposite * scale} Z`}
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="transition-all duration-500"
          />
          {/* Right angle marker */}
          <path
            d={`M ${startPositon.x + adjacent * scale - 15} 165 L ${startPositon.x + adjacent * scale - 15} ${startPositon.y} L ${startPositon.x + adjacent * scale} ${startPositon.y} L ${startPositon.x + adjacent * scale} 165 Z`}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          {/* Angle arc indicator */}
          <path
            d={createArc(startPositon.x, startPositon.y, 25, 0, angle)}
            fill="none"
            stroke="#3399FF"
            strokeWidth="1"
            className="transition-all duration-500"
          />
          <text x={startPositon.x - 55} y={startPositon.y} fill="#3399FF" className="text-base" aria-hidden="true">
            θ = {angle}°
          </text>
          {/* Side labels */}
          {/* Opposite side */}
          <g>
            <text
              x={startPositon.x + adjacent * scale + 20}
              y={startPositon.y - (opposite * scale) / 2 + 5}
              fill="#A22DDC"
              textAnchor="middle"
              className="text-base"
              aria-hidden="true"
              transform={`rotate(-90 ${startPositon.x + adjacent * scale + 20} ${startPositon.y - (opposite * scale) / 2 + 5})`}
            >
              o = {opposite.toFixed(1)}
            </text>
          </g>
          {/* Adjacent side */}
          <g role="group">
            <text
              x={startPositon.x + (adjacent * scale) / 2}
              y="198"
              fill="#00B33D"
              textAnchor="middle"
              className="text-base"
              aria-hidden="true"
            >
              a = {adjacent.toFixed(1)}
            </text>
          </g>
          {/* Hypotenuse */}
          <g>
            <text
              x={startPositon.x + (adjacent * scale) / 2}
              y={startPositon.y - (opposite * scale) / 2 - 5}
              fill="white"
              textAnchor="middle"
              className="text-base"
              aria-hidden="true"
              transform={`rotate(${-angle} ${startPositon.x + (adjacent * scale) / 2 - 5} ${startPositon.y - (opposite * scale) / 2})`}
            >
              {hypotenuse}
            </text>
          </g>
        </svg>
        <div className="sr-only">
          <p>{`${t(translations.angle)} ${angle}°`}</p>
          <p role="status">{`${t(translations.hypotenuse)} ${hypotenuse}`}</p>
          <p role="status" aria-live="polite">
            {announcement}
          </p>
        </div>
        <div className="sr-only"></div>
        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {inputs.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleClicked(preset.defaultValue)}
              className={`px-4 py-2 rounded-lg text-base font-bold transition-all bg-white ${
                angle === preset.defaultValue ? 'text-[#0055B2]' : 'text-black'
              }`}
            >
              {preset.defaultValue}°
            </button>
          ))}
        </div>
        {/* Formula */}
        <div className="flex flex-col items-center text-center bg-white rounded-lg">
          <p className="text-lg font-besley" role="math" aria-label={t(translations.tanFormulaText)}>
            {parse(t(translations.tanFormula))}
          </p>
          <p className="text-lg font-besley transition-all duration-500" aria-hidden="true">
            <span className="text-[#E0002B]">tan</span>(<span className="text-[#0061FC]">{angle}°</span>) ={' '}
            <span className="inline-flex flex-col items-center align-middle ml-1">
              <span className="text-[#A22DDC]">{opposite.toFixed(1)}</span>
              <span className="text-[#008217] border-t border-gray-400 mt-0.5 pt-0.5">{adjacent.toFixed(1)}</span>
            </span>
          </p>
          <p className="text-lg font-besley transition-all duration-500" aria-hidden="true">
            <span className="text-[#E0002B]">tan</span>(<span className="text-[#0061FC]">{angle}°</span>) ={' '}
            <span className="text-[#633300]">{Number(tangent.toFixed(3))}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrigonometricTriangle;