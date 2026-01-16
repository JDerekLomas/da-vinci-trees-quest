import { useState, useMemo, useCallback } from 'react';
import { SOHCAHTOAVisualizerInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface SOHCAHTOAVisualizerProps {
  interaction: SOHCAHTOAVisualizerInteraction;
}

const SOHCAHTOAVisualizer = ({ interaction }: SOHCAHTOAVisualizerProps) => {
  const { t } = useTranslations();

  const { functions, interactiveConstants, colors, translations } = interaction;
  const {
    SVG_WIDTH,
    SVG_HEIGHT,
    TRIANGLE_START_X,
    TRIANGLE_START_Y,
    TRIANGLE_END_X,
    TRIANGLE_END_Y,
    ADJACENT_LENGTH,
    FIXED_ANGLE,
  } = interactiveConstants;

  const [selectedFunction, setSelectedFunction] = useState('sine');

  const currentFunction = functions.find((f) => f.value === selectedFunction);

  // Calculate triangle dimensions based on fixed angle
  const { opposite } = useMemo(() => {
    const radians = (FIXED_ANGLE * Math.PI) / 180;
    const adj = ADJACENT_LENGTH;
    const opp = adj * Math.tan(radians);
    const hyp = adj / Math.cos(radians);
    return { opposite: opp, adjacent: adj, hypotenuse: hyp };
  }, [FIXED_ANGLE, ADJACENT_LENGTH]);

  // Get colors for highlighting sides
  const getColors = useCallback(() => {
    return colors[selectedFunction] || colors.sine;
  }, [selectedFunction, colors]);

  const currentColors = getColors();

  // Determine which sides are relevant for the selected function
  const getRelevantSides = useCallback(() => {
    switch (selectedFunction) {
      case 'sine':
        return { opposite: true, adjacent: false, hypotenuse: true };
      case 'cosine':
        return { opposite: false, adjacent: true, hypotenuse: true };
      case 'tangent':
        return { opposite: true, adjacent: true, hypotenuse: false };
      default:
        return { opposite: true, adjacent: true, hypotenuse: true };
    }
  }, [selectedFunction]);

  const relevantSides = getRelevantSides();

  // Helper function to get line thickness based on relevance
  const getLineThickness = useCallback(
    (side: 'opposite' | 'adjacent' | 'hypotenuse') => {
      return relevantSides[side] ? 6 : 3;
    },
    [relevantSides],
  );

  // Helper function to get opacity based on relevance
  const getOpacity = useCallback(
    (side: 'opposite' | 'adjacent' | 'hypotenuse') => {
      return relevantSides[side] ? 1 : 0.4;
    },
    [relevantSides],
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* Controls */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4">
          <label className="text-lg font-bold text-gray-800">{t(translations.selectFunction)}</label>
          <select
            value={selectedFunction}
            onChange={(e) => setSelectedFunction(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          >
            {functions.map((func) => (
              <option key={func.value} value={func.value}>
                {t(func.label)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Triangle Visualization */}
        <div className="flex flex-col items-center mb-10">
          <svg width={SVG_WIDTH} height={SVG_HEIGHT} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
            {/* Triangle */}
            <polygon
              points={`${TRIANGLE_START_X},${TRIANGLE_START_Y} ${TRIANGLE_END_X},${TRIANGLE_END_Y} ${TRIANGLE_END_X},${TRIANGLE_END_Y - opposite}`}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="#333"
              strokeWidth="2"
            />

            {/* Right angle indicator */}
            <path
              d={`M ${TRIANGLE_END_X - 20} ${TRIANGLE_END_Y} L ${TRIANGLE_END_X - 20} ${TRIANGLE_END_Y - 20} L ${TRIANGLE_END_X} ${TRIANGLE_END_Y - 20}`}
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />

            {/* Arc showing angle θ - FIXED */}
            <path
              d={`M ${TRIANGLE_START_X + 25} ${TRIANGLE_START_Y} A 25 25 0 0 0 ${TRIANGLE_START_X + 25 * Math.cos((FIXED_ANGLE * Math.PI) / 180)} ${TRIANGLE_START_Y - 25 * Math.sin((FIXED_ANGLE * Math.PI) / 180)}`}
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />

            {/* Theta (θ) symbol in bottom left corner */}
            <text
              x={TRIANGLE_START_X + 30}
              y={TRIANGLE_START_Y - 5}
              fill="#333"
              className="font-bold text-lg"
              style={{ fontSize: '18px' }}
            >
              θ
            </text>

            {/* Opposite side */}
            <line
              x1={TRIANGLE_END_X}
              y1={TRIANGLE_END_Y}
              x2={TRIANGLE_END_X}
              y2={TRIANGLE_END_Y - opposite}
              stroke={currentColors.opposite}
              strokeWidth={getLineThickness('opposite')}
              opacity={getOpacity('opposite')}
            />

            {/* Adjacent side */}
            <line
              x1={TRIANGLE_START_X}
              y1={TRIANGLE_START_Y}
              x2={TRIANGLE_END_X}
              y2={TRIANGLE_END_Y}
              stroke={currentColors.adjacent}
              strokeWidth={getLineThickness('adjacent')}
              opacity={getOpacity('adjacent')}
            />

            {/* Hypotenuse */}
            <line
              x1={TRIANGLE_START_X}
              y1={TRIANGLE_START_Y}
              x2={TRIANGLE_END_X}
              y2={TRIANGLE_END_Y - opposite}
              stroke={currentColors.hypotenuse}
              strokeWidth={getLineThickness('hypotenuse')}
              opacity={getOpacity('hypotenuse')}
            />

            {/* Callout Box for Opposite */}
            <g opacity={getOpacity('opposite')}>
              {/* Drop shadow */}
              <rect
                x={TRIANGLE_END_X + 15}
                y={TRIANGLE_END_Y - opposite / 2 - 25}
                width="80"
                height="30"
                rx="8"
                fill="rgba(0,0,0,0.1)"
                transform="translate(2,2)"
              />
              {/* Main box */}
              <rect
                x={TRIANGLE_END_X + 15}
                y={TRIANGLE_END_Y - opposite / 2 - 25}
                width="80"
                height="30"
                rx="8"
                fill="white"
                stroke={currentColors.opposite}
                strokeWidth={relevantSides.opposite ? 4 : 2}
                filter={relevantSides.opposite ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'}
              />
              {/* Text */}
              <text
                x={TRIANGLE_END_X + 55}
                y={TRIANGLE_END_Y - opposite / 2 - 5}
                fill={currentColors.opposite}
                className="font-bold"
                textAnchor="middle"
                style={{ fontSize: '14px' }}
              >
                {t(translations.opposite)}
              </text>
            </g>

            {/* Callout Box for Adjacent */}
            <g opacity={getOpacity('adjacent')}>
              {/* Drop shadow */}
              <rect
                x={(TRIANGLE_START_X + TRIANGLE_END_X) / 2 - 40}
                y={TRIANGLE_END_Y + 10}
                width="80"
                height="30"
                rx="8"
                fill="rgba(0,0,0,0.1)"
                transform="translate(2,2)"
              />
              {/* Main box */}
              <rect
                x={(TRIANGLE_START_X + TRIANGLE_END_X) / 2 - 40}
                y={TRIANGLE_END_Y + 10}
                width="80"
                height="30"
                rx="8"
                fill="white"
                stroke={currentColors.adjacent}
                strokeWidth={relevantSides.adjacent ? 4 : 2}
                filter={relevantSides.adjacent ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'}
              />
              {/* Text */}
              <text
                x={(TRIANGLE_START_X + TRIANGLE_END_X) / 2}
                y={TRIANGLE_END_Y + 30}
                fill={currentColors.adjacent}
                className="font-bold"
                textAnchor="middle"
                style={{ fontSize: '14px' }}
              >
                {t(translations.adjacent)}
              </text>
            </g>

            {/* Callout Box for Hypotenuse */}
            <g opacity={getOpacity('hypotenuse')}>
              {/* Calculate hypotenuse angle */}
              {(() => {
                const hypAngle = Math.atan2(opposite, ADJACENT_LENGTH) * (180 / Math.PI);
                const centerX = (TRIANGLE_START_X + TRIANGLE_END_X) / 2;
                const centerY = TRIANGLE_END_Y - opposite / 2;

                return (
                  <>
                    {/* Drop shadow */}
                    <rect
                      x={centerX - 50}
                      y={centerY - 45}
                      width="100"
                      height="30"
                      rx="8"
                      fill="rgba(0,0,0,0.1)"
                      transform={`rotate(${-hypAngle} ${centerX} ${centerY}) translate(2,2)`}
                    />
                    {/* Main box */}
                    <rect
                      x={centerX - 50}
                      y={centerY - 45}
                      width="100"
                      height="30"
                      rx="8"
                      fill="white"
                      stroke={currentColors.hypotenuse}
                      strokeWidth={relevantSides.hypotenuse ? 4 : 2}
                      filter={relevantSides.hypotenuse ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'}
                      transform={`rotate(${-hypAngle} ${centerX} ${centerY})`}
                    />
                    {/* Text */}
                    <text
                      x={centerX}
                      y={centerY - 30}
                      fill={currentColors.hypotenuse}
                      className="font-bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontSize: '14px' }}
                      transform={`rotate(${-hypAngle} ${centerX} ${centerY})`}
                    >
                      {t(translations.hypotenuse)}
                    </text>
                  </>
                );
              })()}
            </g>
          </svg>
        </div>

        {/* Formula Card */}
        <div className="flex flex-col justify-center">
          <div className="p-6 rounded-lg text-center">
            <div className="text-2xl font-bold mb-6" style={{ color: '#8E24AA' }}>
              {currentFunction?.mnemonic}
            </div>
            <div className="text-xl">
              {currentFunction && (
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {currentFunction.value === 'sine'
                      ? 'sin(θ) = '
                      : currentFunction.value === 'cosine'
                        ? 'cos(θ) = '
                        : 'tan(θ) = '}
                  </span>
                  <div className="flex flex-col items-center mx-4">
                    {/* Numerator */}
                    <div className="relative mb-2">
                      {/* Drop shadow */}
                      <div
                        className="absolute inset-0 bg-gray-300 rounded-lg"
                        style={{ transform: 'translate(2px, 2px)' }}
                      />
                      {/* Main box */}
                      <div
                        className={`px-4 py-2 rounded-lg border-4 font-bold text-lg relative ${
                          currentFunction.value === 'sine' || currentFunction.value === 'tangent'
                            ? 'bg-white'
                            : 'bg-gray-100'
                        }`}
                        style={{
                          borderColor:
                            currentFunction.value === 'sine' || currentFunction.value === 'tangent'
                              ? currentColors.opposite
                              : currentColors.adjacent,
                          opacity:
                            currentFunction.value === 'sine' || currentFunction.value === 'tangent'
                              ? getOpacity('opposite')
                              : getOpacity('adjacent'),
                        }}
                      >
                        {currentFunction.value === 'sine'
                          ? t(translations.opposite)
                          : currentFunction.value === 'cosine'
                            ? t(translations.adjacent)
                            : t(translations.opposite)}
                      </div>
                    </div>

                    {/* Fraction line */}
                    <div className="w-full h-1 bg-gray-800 mb-2" />

                    {/* Denominator */}
                    <div className="relative">
                      {/* Drop shadow */}
                      <div
                        className="absolute inset-0 bg-gray-300 rounded-lg"
                        style={{ transform: 'translate(2px, 2px)' }}
                      />
                      {/* Main box */}
                      <div
                        className={`px-4 py-2 rounded-lg border-4 font-bold text-lg relative ${
                          currentFunction.value === 'sine' || currentFunction.value === 'cosine'
                            ? 'bg-white'
                            : 'bg-gray-100'
                        }`}
                        style={{
                          borderColor:
                            currentFunction.value === 'sine' || currentFunction.value === 'cosine'
                              ? currentColors.hypotenuse
                              : currentColors.adjacent,
                          opacity:
                            currentFunction.value === 'sine' || currentFunction.value === 'cosine'
                              ? getOpacity('hypotenuse')
                              : getOpacity('adjacent'),
                        }}
                      >
                        {currentFunction.value === 'sine' || currentFunction.value === 'cosine'
                          ? t(translations.hypotenuse)
                          : t(translations.adjacent)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOHCAHTOAVisualizer;
