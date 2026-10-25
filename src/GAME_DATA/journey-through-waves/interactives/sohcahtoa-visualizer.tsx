import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { SOHCAHTOAVisualizerInteraction, TrigFunction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface SOHCAHTOAVisualizerProps {
  interaction: SOHCAHTOAVisualizerInteraction;
}

type Side = 'opposite' | 'adjacent' | 'hypotenuse';

// Which two sides each ratio compares: [numerator, denominator]
const RATIO_SIDES: Record<TrigFunction, [Side, Side]> = {
  sine: ['opposite', 'hypotenuse'],
  cosine: ['adjacent', 'hypotenuse'],
  tangent: ['opposite', 'adjacent'],
};

// Triangle drawing area
const VB_W = 440;
const VB_H = 330;
const ORIGIN_X = 30;
const ORIGIN_Y = 300;
// The triangle grows on screen as the size slider grows, but its shape only depends on the angle
const hypotenusePixels = (size: number) => 100 + 20 * (size - 1);

// Trace chart: every angle the student visits leaves a dot of the selected ratio
const CHART_W = 440;
const CHART_H = 150;
const CHART_PAD = { left: 40, right: 12, top: 12, bottom: 26 };
const CHART_MAX: Record<TrigFunction, number> = { sine: 1, cosine: 1, tangent: 4 };
const MIN_DOTS_FOR_CURVE = 6;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const ratioValue = (fn: TrigFunction, angleDeg: number) => {
  const r = toRad(angleDeg);
  if (fn === 'sine') return Math.sin(r);
  if (fn === 'cosine') return Math.cos(r);
  return Math.tan(r);
};

const emptyTrace = (): Record<TrigFunction, number[]> => ({ sine: [], cosine: [], tangent: [] });

const SOHCAHTOAVisualizer = ({ interaction }: SOHCAHTOAVisualizerProps) => {
  const { t } = useTranslations();
  const { angleInput, sizeInput, functions, colors, translations, ariaLabel } = interaction;

  const [angle, setAngle] = useState(angleInput.value);
  const [size, setSize] = useState(sizeInput.value);
  const [selected, setSelected] = useState<TrigFunction>('sine');
  const [trace, setTrace] = useState<Record<TrigFunction, number[]>>(emptyTrace);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const currentFunction = functions.find((f) => f.value === selected) ?? functions[0];
  const [numeratorSide, denominatorSide] = RATIO_SIDES[selected];

  // Side lengths in "units" (what the student reads) and in pixels (what is drawn)
  const lengths = useMemo(() => {
    const r = toRad(angle);
    return { hypotenuse: size, opposite: size * Math.sin(r), adjacent: size * Math.cos(r) };
  }, [angle, size]);

  const geometry = useMemo(() => {
    const r = toRad(angle);
    const hyp = hypotenusePixels(size);
    const adjPx = hyp * Math.cos(r);
    const oppPx = hyp * Math.sin(r);
    return {
      cornerX: ORIGIN_X + adjPx,
      topY: ORIGIN_Y - oppPx,
      adjPx,
      oppPx,
      arcRadius: Math.min(32, adjPx * 0.45),
    };
  }, [angle, size]);

  const value = ratioValue(selected, angle);

  // Record every whole-degree angle visited, per ratio
  useEffect(() => {
    const deg = Math.round(angle);
    setTrace((prev) => {
      if (prev[selected].includes(deg)) return prev;
      return { ...prev, [selected]: [...prev[selected], deg].sort((a, b) => a - b) };
    });
  }, [angle, selected]);

  const sideColor = (side: Side) =>
    side === numeratorSide || side === denominatorSide ? colors[side] : colors.inactive;
  const sideWidth = (side: Side) => (side === numeratorSide || side === denominatorSide ? 6 : 3);

  // Dragging the top corner sets the angle
  const angleFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      const ctm = svg?.getScreenCTM();
      if (!svg || !ctm) return;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const local = pt.matrixTransform(ctm.inverse());
      const deg = (Math.atan2(ORIGIN_Y - local.y, local.x - ORIGIN_X) * 180) / Math.PI;
      setAngle(Math.round(Math.min(angleInput.max, Math.max(angleInput.min, deg))));
    },
    [angleInput.max, angleInput.min],
  );

  const handlePointerDown = (e: React.PointerEvent<SVGCircleElement>) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
  };
  const handlePointerMove = (e: React.PointerEvent<SVGCircleElement>) => {
    if (isDragging) angleFromPointer(e.clientX, e.clientY);
  };
  const handlePointerUp = () => setIsDragging(false);

  const insight = (() => {
    if (size === 1 && selected === 'sine') return t(translations.unitSine);
    if (size === 1 && selected === 'cosine') return t(translations.unitCosine);
    return t(translations.sameRatio);
  })();

  const announcement = t(translations.announcement)
    .replace('{function}', t(currentFunction.short))
    .replace('{angle}', String(angle))
    .replace('{value}', value.toFixed(3));

  // Chart helpers
  const chartMax = CHART_MAX[selected];
  const plotW = CHART_W - CHART_PAD.left - CHART_PAD.right;
  const plotH = CHART_H - CHART_PAD.top - CHART_PAD.bottom;
  const chartX = (deg: number) => CHART_PAD.left + (deg / 90) * plotW;
  const chartY = (v: number) => CHART_PAD.top + plotH - (Math.min(v, chartMax) / chartMax) * plotH;
  const dots = trace[selected];
  const curvePoints = dots.map((d) => `${chartX(d)},${chartY(ratioValue(selected, d))}`).join(' ');

  const midHyp = { x: (ORIGIN_X + geometry.cornerX) / 2, y: (ORIGIN_Y + geometry.topY) / 2 };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg" aria-label={ariaLabel ? t(ariaLabel) : undefined}>
      {/* Ratio picker */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4" role="radiogroup" aria-label={t(translations.pickRatio)}>
        <span className="text-base font-bold text-gray-800">{t(translations.pickRatio)}</span>
        {functions.map((f) => {
          const isActive = f.value === selected;
          return (
            <button
              key={f.value}
              role="radio"
              aria-checked={isActive}
              onClick={() => setSelected(f.value)}
              className={`px-4 py-2 rounded-lg border-2 font-bold transition-colors ${
                isActive ? 'bg-[#006BE0] border-[#006BE0] text-white' : 'bg-white border-gray-300 text-gray-800 hover:border-[#006BE0]'
              }`}
            >
              <span className="tracking-wider">{f.mnemonic}</span>
              <span className="ml-2 font-normal">{t(f.label)}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {/* Triangle */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto select-none touch-none"
          role="img"
          aria-label={announcement}
        >
          <polygon
            points={`${ORIGIN_X},${ORIGIN_Y} ${geometry.cornerX},${ORIGIN_Y} ${geometry.cornerX},${geometry.topY}`}
            fill="rgba(0, 107, 224, 0.06)"
          />

          {/* Right-angle marker */}
          <path
            d={`M ${geometry.cornerX - 14} ${ORIGIN_Y} L ${geometry.cornerX - 14} ${ORIGIN_Y - 14} L ${geometry.cornerX} ${ORIGIN_Y - 14}`}
            fill="none"
            stroke="#333"
            strokeWidth="1.5"
          />

          {/* Angle arc and label */}
          <path
            d={`M ${ORIGIN_X + geometry.arcRadius} ${ORIGIN_Y} A ${geometry.arcRadius} ${geometry.arcRadius} 0 0 0 ${ORIGIN_X + geometry.arcRadius * Math.cos(toRad(angle))} ${ORIGIN_Y - geometry.arcRadius * Math.sin(toRad(angle))}`}
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Angle value lives in the formula and slider; the triangle only marks where θ is */}
          <text
            x={ORIGIN_X + (geometry.arcRadius + 10) * Math.cos(toRad(angle / 2))}
            y={ORIGIN_Y - (geometry.arcRadius + 10) * Math.sin(toRad(angle / 2)) + 5}
            textAnchor="middle"
            className="font-bold"
            style={{ fontSize: '16px', fontFamily: 'Besley' }}
            fill="#333"
          >
            θ
          </text>

          {/* Sides */}
          <line x1={ORIGIN_X} y1={ORIGIN_Y} x2={geometry.cornerX} y2={ORIGIN_Y} stroke={sideColor('adjacent')} strokeWidth={sideWidth('adjacent')} strokeLinecap="round" />
          <line x1={geometry.cornerX} y1={ORIGIN_Y} x2={geometry.cornerX} y2={geometry.topY} stroke={sideColor('opposite')} strokeWidth={sideWidth('opposite')} strokeLinecap="round" />
          <line x1={ORIGIN_X} y1={ORIGIN_Y} x2={geometry.cornerX} y2={geometry.topY} stroke={sideColor('hypotenuse')} strokeWidth={sideWidth('hypotenuse')} strokeLinecap="round" />

          {/* Side labels with live lengths */}
          <text x={(ORIGIN_X + geometry.cornerX) / 2} y={ORIGIN_Y + 22} textAnchor="middle" fill={sideColor('adjacent')} className="font-bold" style={{ fontSize: '14px' }}>
            {t(translations.adjacent)} {lengths.adjacent.toFixed(2)}
          </text>
          <text x={geometry.cornerX + 12} y={(ORIGIN_Y + geometry.topY) / 2 + 5} fill={sideColor('opposite')} className="font-bold" style={{ fontSize: '14px' }}>
            {t(translations.opposite)} {lengths.opposite.toFixed(2)}
          </text>
          <text
            x={midHyp.x - 14 * Math.sin(toRad(angle))}
            y={midHyp.y - 14 * Math.cos(toRad(angle))}
            textAnchor="middle"
            fill={sideColor('hypotenuse')}
            className="font-bold"
            style={{ fontSize: '14px' }}
            transform={`rotate(${-angle} ${midHyp.x - 14 * Math.sin(toRad(angle))} ${midHyp.y - 14 * Math.cos(toRad(angle))})`}
          >
            {t(translations.hypotenuse)} {lengths.hypotenuse.toFixed(2)}
          </text>

          {/* Draggable corner */}
          <circle
            cx={geometry.cornerX}
            cy={geometry.topY}
            r={isDragging ? 13 : 11}
            fill="#006BE0"
            stroke="white"
            strokeWidth="3"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        </svg>

        {/* Live ratio */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-xl font-bold whitespace-nowrap" style={{ fontFamily: 'Besley' }}>
            <span>
              {t(currentFunction.short)}({angle}°) =
            </span>
            <div className="flex flex-col items-center text-base">
              <span style={{ color: colors[numeratorSide] }}>{t(translations[numeratorSide])}</span>
              <span className="w-full border-t-2 border-gray-800 my-1" />
              <span style={{ color: colors[denominatorSide] }}>{t(translations[denominatorSide])}</span>
            </div>
            <span>=</span>
            <div className="flex flex-col items-center text-base">
              <span style={{ color: colors[numeratorSide] }}>{lengths[numeratorSide].toFixed(2)}</span>
              <span className="w-full border-t-2 border-gray-800 my-1" />
              <span style={{ color: colors[denominatorSide] }}>{lengths[denominatorSide].toFixed(2)}</span>
            </div>
            <span>=</span>
            <span className="px-3 py-1 rounded-lg bg-[#F3E8FF] text-[#6B21A8] text-2xl">{value.toFixed(3)}</span>
          </div>
          <p className="text-base text-gray-700 text-center bg-gray-50 rounded-lg p-3 w-full">{insight}</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <label className="flex flex-col gap-1">
          <span className="text-base font-bold text-gray-800">
            {t(angleInput.label)}: {angle}°
          </span>
          <input
            id={angleInput.id}
            type="range"
            min={angleInput.min}
            max={angleInput.max}
            step={angleInput.step}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="global-slider w-full"
            aria-valuetext={`${angle}°`}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-base font-bold text-gray-800">
            {t(sizeInput.label)}: {size.toFixed(1)}
          </span>
          <input
            id={sizeInput.id}
            type="range"
            min={sizeInput.min}
            max={sizeInput.max}
            step={sizeInput.step}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="global-slider w-full"
            aria-valuetext={size.toFixed(1)}
          />
        </label>
      </div>
      <p className="text-sm text-gray-600 mt-1">{t(translations.dragHint)}</p>

      {/* Trace chart: the curve emerges from the triangles the student tries */}
      <div className="mt-4 border-t border-gray-200 pt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-base font-bold text-gray-800">
            {t(translations.traceTitle).replace('{function}', t(currentFunction.short))}
          </span>
          <button
            onClick={() => setTrace(emptyTrace())}
            className="text-sm px-3 py-1 rounded border border-gray-300 hover:border-[#006BE0]"
          >
            {t(translations.clearTrace)}
          </button>
        </div>
        <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-auto" aria-hidden="true">
          <line x1={CHART_PAD.left} y1={CHART_PAD.top + plotH} x2={CHART_PAD.left + plotW} y2={CHART_PAD.top + plotH} stroke="#999" />
          <line x1={CHART_PAD.left} y1={CHART_PAD.top} x2={CHART_PAD.left} y2={CHART_PAD.top + plotH} stroke="#999" />
          {[0, 30, 45, 60, 90].map((d) => (
            <text key={d} x={chartX(d)} y={CHART_H - 8} textAnchor="middle" fill="#666" style={{ fontSize: '11px' }}>
              {d}°
            </text>
          ))}
          {[0, chartMax / 2, chartMax].map((v) => (
            <text key={v} x={CHART_PAD.left - 6} y={chartY(v) + 4} textAnchor="end" fill="#666" style={{ fontSize: '11px' }}>
              {v}
            </text>
          ))}
          {dots.length >= MIN_DOTS_FOR_CURVE && (
            <polyline points={curvePoints} fill="none" stroke="#C4B5FD" strokeWidth="2" />
          )}
          {dots.map((d) => {
            const offChart = ratioValue(selected, d) > chartMax;
            return (
              <circle
                key={d}
                cx={chartX(d)}
                cy={chartY(ratioValue(selected, d))}
                r="3"
                fill={offChart ? 'white' : '#8E24AA'}
                stroke="#8E24AA"
                strokeWidth={offChart ? 1.5 : 0}
              />
            );
          })}
          {/* Current angle */}
          <line x1={chartX(angle)} y1={CHART_PAD.top} x2={chartX(angle)} y2={CHART_PAD.top + plotH} stroke="#006BE0" strokeDasharray="3 3" />
          <circle cx={chartX(angle)} cy={chartY(value)} r="6" fill="#006BE0" stroke="white" strokeWidth="2" />
        </svg>
        {dots.length < MIN_DOTS_FOR_CURVE && <p className="text-sm text-gray-600">{t(translations.traceEmpty)}</p>}
      </div>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
};

export default SOHCAHTOAVisualizer;
