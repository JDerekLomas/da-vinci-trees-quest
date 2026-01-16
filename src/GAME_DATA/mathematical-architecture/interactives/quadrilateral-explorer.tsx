import React, { useState, useCallback, useEffect } from 'react';
import { QuadrilateralExplorerProps } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';

// Helper function for interpolation
const tInterpolate = (
  t: (key: string) => string,
  key: string,
  variables: Record<string, string | number> = {},
) => {
  let translatedString = t(key);
  Object.entries(variables).forEach(([variable, value]) => {
    const placeholder = `{{${variable}}}`;
    translatedString = translatedString.replace(new RegExp(placeholder, 'g'), String(value));
  });
  return translatedString;
};

const QuadrilateralExplorer: React.FC<QuadrilateralExplorerProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;
  const { payload } = useEventListener('quadrilateral-explorer');

  const [angle, setAngle] = useState(70);
  const [ratio, setRatio] = useState(1.3);
  const [currentShape, setCurrentShape] = useState('parallelogram');

  // Accessibility state
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');

  const canvasWidth = 600;
  const canvasHeight = 300;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  const shapes = {
    parallelogram: { name: t(translations.parallelogram) },
    rectangle: { name: t(translations.rectangle) },
    rhombus: { name: t(translations.rhombus) },
    square: { name: t(translations.square) },
    quadrilateral: { name: t(translations.quadrilateral) },
    trapezoid: { name: t(translations.trapezoid) },
    isosceles_trapezoid: { name: t(translations.isoscelesTrapezoid) },
    kite: { name: t(translations.kite) },
  };

  // Additional shape data for non-parallelogram shapes
  const additionalShapeData = {
    quadrilateral: {
      name: t(translations.quadrilateral),
      description: t(translations.quadrilateralDescription),
      facts: [
        t(translations.quadrilateralFact1),
        t(translations.quadrilateralFact2),
        t(translations.quadrilateralFact3),
      ],
    },
    trapezoid: {
      name: t(translations.trapezoid),
      description: t(translations.trapezoidDescription),
      facts: [t(translations.trapezoidFact1), t(translations.trapezoidFact2)],
    },
    isosceles_trapezoid: {
      name: t(translations.isoscelesTrapezoid),
      description: t(translations.isoscelesTrapezoidDescription),
      facts: [
        t(translations.isoscelesTrapezoidFact1),
        t(translations.isoscelesTrapezoidFact2),
        t(translations.isoscelesTrapezoidFact3),
        t(translations.isoscelesTrapezoidFact4),
      ],
    },
    kite: {
      name: t(translations.kite),
      description: t(translations.kiteDescription),
      facts: [t(translations.kiteFact1), t(translations.kiteFact2), t(translations.kiteFact3)],
    },
  };

  const dynamicShapes = ['parallelogram', 'rectangle', 'rhombus', 'square'];

  // Accessibility helper functions
  const announceToScreenReader = useCallback((message: string, isStatus: boolean = false) => {
    if (isStatus) {
      setStatusAnnouncement(message);
      setTimeout(() => setStatusAnnouncement(''), 100);
    } else {
      setLiveAnnouncement(message);
      setTimeout(() => setLiveAnnouncement(''), 100);
    }
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, elementType: string, elementValue?: string) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (elementType === 'button' && elementValue) {
            handleShapeClick(elementValue);
          }
          break;
        case 'ArrowLeft':
          if (elementType === 'slider') {
            e.preventDefault();
            const currentValue = elementValue === 'angle' ? angle : ratio;
            const step = elementValue === 'angle' ? 1 : 0.01;
            const min = elementValue === 'angle' ? 45 : 0.5;
            const newValue = Math.max(min, currentValue - step);
            if (elementValue === 'angle') {
              setAngle(newValue);
              onInteraction({
                'angle-changed': newValue,
                'current-shape': getActiveButton(),
              });
            } else {
              setRatio(newValue);
              onInteraction({
                'ratio-changed': newValue,
                'current-shape': getActiveButton(),
              });
            }
          }
          break;
        case 'ArrowRight':
          if (elementType === 'slider') {
            e.preventDefault();
            const currentValue = elementValue === 'angle' ? angle : ratio;
            const step = elementValue === 'angle' ? 1 : 0.01;
            const max = elementValue === 'angle' ? 135 : 1.5;
            const newValue = Math.min(max, currentValue + step);
            if (elementValue === 'angle') {
              setAngle(newValue);
              onInteraction({
                'angle-changed': newValue,
                'current-shape': getActiveButton(),
              });
            } else {
              setRatio(newValue);
              onInteraction({
                'ratio-changed': newValue,
                'current-shape': getActiveButton(),
              });
            }
          }
          break;
      }
    },
    [angle, ratio, onInteraction],
  );

  const getDefaultsForShape = (shapeKey: string) => {
    switch (shapeKey) {
      case 'square':
        return { angle: 90, ratio: 1.0 };
      case 'rectangle':
        return { angle: 90, ratio: 1.5 };
      case 'rhombus':
        return { angle: 60, ratio: 1.0 };
      case 'parallelogram':
      default:
        return { angle: 70, ratio: 1.3 };
    }
  };

  const getDynamicShapeInfo = (shapeType: string) => {
    const parallelogramFacts = [
      t(translations.parallelogramFact1),
      t(translations.parallelogramFact2),
      t(translations.parallelogramFact3),
      t(translations.parallelogramFact4),
    ];
    const rhombusFacts = [
      t(translations.rhombusFact1),
      t(translations.rhombusFact2),
      t(translations.rhombusFact3),
    ];
    const rectangleFacts = [
      t(translations.rectangleFact1),
      t(translations.rectangleFact2),
      t(translations.rectangleFact3),
    ];
    const squareFacts = [t(translations.squareFact1), t(translations.squareFact2)];

    switch (shapeType) {
      case t(translations.shapeTypeSquare):
        return {
          name: t(translations.square),
          description: t(translations.squareDescription),
          facts: squareFacts,
        };
      case t(translations.shapeTypeRectangle):
        return {
          name: t(translations.rectangle),
          description: t(translations.rectangleDescription),
          facts: rectangleFacts,
        };
      case t(translations.shapeTypeRhombus):
        return {
          name: t(translations.rhombus),
          description: t(translations.rhombusDescription),
          facts: rhombusFacts,
        };
      case t(translations.shapeTypeParallelogram):
      default:
        return {
          name: t(translations.parallelogram),
          description: t(translations.parallelogramDescription),
          facts: parallelogramFacts,
        };
    }
  };

  const getCanvasVertices = useCallback(() => {
    // For parallelogram-based shapes (original 4)
    if (dynamicShapes.includes(currentShape)) {
      const angleRad = angle * (Math.PI / 180);
      const w = 150 * 1.5; // Scale up by 1.5x
      const h = w / ratio;

      const x_offset = h * Math.cos(angleRad);
      const y_offset = h * Math.sin(angleRad);

      const p1 = [centerX - w / 2 - x_offset / 2, centerY + y_offset / 2];
      const p2 = [centerX + w / 2 - x_offset / 2, centerY + y_offset / 2];
      const p3 = [centerX + w / 2 + x_offset / 2, centerY - y_offset / 2];
      const p4 = [centerX - w / 2 + x_offset / 2, centerY - y_offset / 2];

      return [p1, p2, p3, p4];
    }

    // For additional shapes (new 4)
    const w = 120; // Base width
    const h = 100; // Base height

    switch (currentShape) {
      case 'quadrilateral':
        return [
          [centerX - w, centerY - h * 0.3], // A - top left
          [centerX + w * 0.8, centerY - h], // B - top right
          [centerX + w * 0.4, centerY + h], // C - bottom right
          [centerX - w * 0.6, centerY + h * 0.7], // D - bottom left
        ];

      case 'trapezoid':
        return [
          [centerX - w * 0.6, centerY - h * 0.5], // A - top left
          [centerX + w * 0.6, centerY - h * 0.5], // B - top right
          [centerX + w, centerY + h], // C - bottom right
          [centerX - w, centerY + h], // D - bottom left
        ];

      case 'isosceles_trapezoid':
        return [
          [centerX - w * 0.5, centerY - h * 0.5], // A - top left
          [centerX + w * 0.5, centerY - h * 0.5], // B - top right
          [centerX + w * 0.8, centerY + h], // C - bottom right
          [centerX - w * 0.8, centerY + h], // D - bottom left
        ];

      case 'kite':
        return [
          [centerX, centerY - h * 0.8], // A - top
          [centerX + w * 0.7, centerY], // B - right
          [centerX, centerY + h * 1], // C - bottom
          [centerX - w * 0.7, centerY], // D - left
        ];

      default:
        return [
          [centerX, centerY],
          [centerX, centerY],
          [centerX, centerY],
          [centerX, centerY],
        ];
    }
  }, [angle, ratio, centerX, centerY, currentShape]);

  const getCurrentShapeInfo = (currentShape?: string) => {
    // If we have a current shape and it's an additional shape, return its data
    if (currentShape && additionalShapeData[currentShape as keyof typeof additionalShapeData]) {
      return additionalShapeData[currentShape as keyof typeof additionalShapeData];
    }

    // Otherwise, calculate dynamic shape info for parallelogram-based shapes
    const isRightAngle = Math.abs(angle - 90) < 1;
    const isEqualSides = Math.abs(ratio - 1.0) < 0.01;

    let shapeType = t(translations.shapeTypeParallelogram);
    if (isRightAngle && isEqualSides) shapeType = t(translations.shapeTypeSquare);
    else if (isRightAngle) shapeType = t(translations.shapeTypeRectangle);
    else if (isEqualSides) shapeType = t(translations.shapeTypeRhombus);

    return getDynamicShapeInfo(shapeType);
  };

  const getActiveButton = () => {
    // For additional shapes, return the current shape
    if (additionalShapeData[currentShape as keyof typeof additionalShapeData]) {
      return currentShape;
    }

    // For dynamic shapes, calculate based on angle and ratio
    const isRightAngle = Math.abs(angle - 90) < 1;
    const isEqualSides = Math.abs(ratio - 1.0) < 0.01;

    if (isRightAngle && isEqualSides) return 'square';
    else if (isRightAngle) return 'rectangle';
    else if (isEqualSides) return 'rhombus';
    else return 'parallelogram';
  };

  const handleShapeClick = (shapeKey: string) => {
    setCurrentShape(shapeKey);

    if (dynamicShapes.includes(shapeKey)) {
      const defaults = getDefaultsForShape(shapeKey);
      setAngle(defaults.angle);
      setRatio(defaults.ratio);
    }

    // Announce shape selection to screen readers
    const shapeInfo = getCurrentShapeInfo(shapeKey);
    const announcement = tInterpolate(t, translations.shapeChangeNotification, {
      shapeName: shapeInfo.name,
      description: shapeInfo.description,
    });
    announceToScreenReader(announcement, true);

    // Announce slider state change
    const sliderAnnouncement = dynamicShapes.includes(shapeKey)
      ? t(translations.sliderEnabledNotification)
      : t(translations.sliderDisabledNotification);
    announceToScreenReader(sliderAnnouncement, false);

    onInteraction({
      'shape-selected': shapeKey,
      angle: dynamicShapes.includes(shapeKey) ? getDefaultsForShape(shapeKey).angle : null,
      ratio: dynamicShapes.includes(shapeKey) ? getDefaultsForShape(shapeKey).ratio : null,
    });
  };

  const handleAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = Number(event.target.value);
    setAngle(newAngle);

    // Announce angle change to screen readers
    const currentShapeInfo = getCurrentShapeInfo(currentShape);
    const announcement = tInterpolate(t, translations.angleChangeNotification, {
      angle: newAngle,
      shapeType: currentShapeInfo.name,
    });
    announceToScreenReader(announcement, false);

    onInteraction({
      'angle-changed': newAngle,
      'current-shape': getActiveButton(),
    });
  };

  const handleRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRatio = parseFloat(event.target.value);
    setRatio(newRatio);

    // Announce ratio change to screen readers
    const currentShapeInfo = getCurrentShapeInfo(currentShape);
    const announcement = tInterpolate(t, translations.ratioChangeNotification, {
      ratio: newRatio.toFixed(2),
      shapeType: currentShapeInfo.name,
    });
    announceToScreenReader(announcement, false);

    onInteraction({
      'ratio-changed': newRatio,
      'current-shape': getActiveButton(),
    });
  };

  // Handle payload from external control
  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if ('angle' in payload && typeof payload.angle === 'number') {
        setAngle(payload.angle);
      }
      if ('ratio' in payload && typeof payload.ratio === 'number') {
        setRatio(payload.ratio);
      }
      if ('shape' in payload && typeof payload.shape === 'string') {
        const defaults = getDefaultsForShape(payload.shape);
        setAngle(defaults.angle);
        setRatio(defaults.ratio);
      }
    }
  }, [payload]);

  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if (
        'checkForShapeExploration' in payload &&
        typeof payload.checkForShapeExploration === 'boolean' &&
        payload.checkForShapeExploration
      ) {
        onInteraction({
          'has-explored-shapes': true,
        });
      }
    }
  }, [payload, currentShape]);

  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if (
        'checkForSkewAndRatioChange' in payload &&
        typeof payload.checkForSkewAndRatioChange === 'boolean' &&
        payload.checkForSkewAndRatioChange
      ) {
        onInteraction({
          'has-adjusted-sliders': true,
        });
      }
    }
  }, [payload, angle, ratio]);

  const shapeInfo = getCurrentShapeInfo(currentShape);

  // Calculate slider background position
  const anglePercent = ((angle - 45) / (135 - 45)) * 100;
  const ratioPercent = ((ratio - 0.5) / (1.5 - 0.5)) * 100;

  return (
    <div className="flex flex-col gap-6 mb-8" role="application" aria-label={t(translations.srInstructions)}>
      {/* Enhanced screen reader announcements */}
      <div aria-live="polite" className="sr-only" role="status">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" className="sr-only" role="alert">
        {statusAnnouncement}
      </div>

      {/* Hidden screen reader content */}
      <div className="sr-only">
        <h1>{t(translations.mainHeading)}</h1>
        <p>{t(translations.interactiveDescription)}</p>
        <p>{t(translations.visualDescription)}</p>
        <p>{t(translations.mathematicalDescription)}</p>
        <p>{t(translations.srInstructions)}</p>
      </div>

      {/* First Row: 8 Shape Buttons */}
      <section aria-labelledby="shape-selector-heading">
        <h2 id="shape-selector-heading" className="sr-only">
          {t(translations.shapeSelectorLabel)}
        </h2>
        <div className="sr-only">{t(translations.shapeSelectorInstructions)}</div>
        <div
          className="grid grid-cols-2 gap-3 text-base xl:grid-cols-4"
          role="group"
          aria-label={t(translations.shapeSelectorLabel)}
        >
          {Object.entries(shapes).map(([key, shape]) => {
            const isActive = getActiveButton() === key;
            return (
              <button
                key={key}
                onClick={() => handleShapeClick(key)}
                onKeyDown={(e) => handleKeyDown(e, 'button', key)}
                onFocus={() => {}}
                onBlur={() => {}}
                className={
                  isActive
                    ? 'px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : 'px-4 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }
                aria-pressed={isActive}
                aria-describedby={`button-${key}-description`}
                aria-label={tInterpolate(t, translations.srButtonInstructions, {
                  isSelected: isActive ? t(translations.yes) : t(translations.no),
                })}
              >
                {shape.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Second Row: 2 Sliders */}
      <section aria-labelledby="slider-controls-heading">
        <h2 id="slider-controls-heading" className="sr-only">
          {t(translations.sliderControlsLabel)}
        </h2>
        <div className="sr-only">{t(translations.sliderControlsInstructions)}</div>
        <div
          className="grid grid-cols-1 gap-6 text-lg xl:grid-cols-2"
          role="group"
          aria-label={t(translations.sliderControlsLabel)}
        >
          <div>
            <label className="block mb-2 font-bold text-lg" htmlFor="angle-slider" id="angle-label">
              {t(translations.angleSkew)}:{' '}
              {tInterpolate(t, translations.angleLabel, { angle, degreeSymbol: t(translations.degreeSymbol) })}
            </label>
            <input
              id="angle-slider"
              type="range"
              min="45"
              max="135"
              step="1"
              value={angle}
              onChange={handleAngleChange}
              onKeyDown={(e) => handleKeyDown(e, 'slider', 'angle')}
              onFocus={() => {}}
              onBlur={() => {}}
              disabled={!dynamicShapes.includes(currentShape)}
              className={`w-full h-[10px] rounded-lg appearance-none ${
                dynamicShapes.includes(currentShape) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              style={{
                background: `linear-gradient(to right, #007bff ${anglePercent}%, #949494 ${anglePercent}%)`,
              }}
              aria-labelledby="angle-label"
              aria-describedby="angle-description"
              aria-valuemin={45}
              aria-valuemax={135}
              aria-valuenow={angle}
              aria-valuetext={tInterpolate(t, translations.srAngleValue, { angle })}
            />
            <div id="angle-description" className="sr-only">
              {dynamicShapes.includes(currentShape)
                ? t(translations.srEnabledSliders)
                : t(translations.srDisabledSliders)}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-bold text-lg" htmlFor="ratio-slider" id="ratio-label">
              {t(translations.sideLengthRatio)}:{' '}
              {tInterpolate(t, translations.ratioLabel, { ratio: ratio.toFixed(2) })}
            </label>
            <input
              id="ratio-slider"
              type="range"
              min="0.5"
              max="1.5"
              step="0.01"
              value={ratio}
              onChange={handleRatioChange}
              onKeyDown={(e) => handleKeyDown(e, 'slider', 'ratio')}
              onFocus={() => {}}
              onBlur={() => {}}
              disabled={!dynamicShapes.includes(currentShape)}
              className={`w-full h-[10px] rounded-lg appearance-none ${
                dynamicShapes.includes(currentShape) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              style={{
                background: `linear-gradient(to right, #007bff ${ratioPercent}%, #949494 ${ratioPercent}%)`,
              }}
              aria-labelledby="ratio-label"
              aria-describedby="ratio-description"
              aria-valuemin={0.5}
              aria-valuemax={1.5}
              aria-valuenow={ratio}
              aria-valuetext={tInterpolate(t, translations.srRatioValue, { ratio: ratio.toFixed(2) })}
            />
            <div id="ratio-description" className="sr-only">
              {dynamicShapes.includes(currentShape)
                ? t(translations.srEnabledSliders)
                : t(translations.srDisabledSliders)}
            </div>
          </div>
        </div>
      </section>

      {/* Third Row: Canvas and Properties Side by Side */}
      <div className="flex flex-col xl:flex-row gap-4 h-[380px]">
        {/* Left: Canvas Section */}
        <section className="w-1/2 flex flex-col" aria-labelledby="canvas-section-heading">
          <h2 id="canvas-section-heading" className="sr-only">
            {t(translations.canvasSectionLabel)}
          </h2>
          <div className="sr-only">{t(translations.canvasSectionInstructions)}</div>
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-700 mb-1" id="current-shape-title">
              {shapeInfo.name}
            </h3>
            <p className="text-sm text-gray-500" id="current-shape-description">
              {shapeInfo.description}
            </p>
          </div>

          <div
            className="w-full h-full rounded-lg overflow-hidden bg-gray-200"
            role="img"
            aria-labelledby="current-shape-title"
            aria-describedby="canvas-description"
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
              className="w-full h-full"
              style={{
                background: `
                  linear-gradient(45deg, #f8f9fa 25%, transparent 25%),
                  linear-gradient(-45deg, #f8f9fa 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #f8f9fa 75%),
                  linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              }}
              role="img"
              aria-label={tInterpolate(t, translations.srCanvasDescription, {
                shapeName: shapeInfo.name,
              })}
            >
              {/* Shape - All shapes now use polygons */}
              <polygon
                points={getCanvasVertices()
                  .map(([x, y]) => `${x},${y}`)
                  .join(' ')}
                fill="rgba(8, 14, 43, 0.8)"
                stroke="#007BFF"
                strokeWidth="3"
              />
              {/* Vertices for all shapes */}
              {getCanvasVertices().map(([x, y], index) => {
                const vertexLabels = [
                  t(translations.vertexA),
                  t(translations.vertexB),
                  t(translations.vertexC),
                  t(translations.vertexD),
                ];
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="white"
                      stroke="#007BFF"
                      strokeWidth="2"
                      aria-label={`Vertex ${vertexLabels[index]}`}
                    />
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill="#374151"
                      aria-hidden="true"
                    >
                      {vertexLabels[index]}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div id="canvas-description" className="sr-only">
              {t(translations.srCanvasDescription)}
            </div>
          </div>
        </section>

        {/* Right: Properties Section */}
        <section
          className="w-1/2 rounded-lg p-6 bg-white border-2 border-[#006BE0] flex flex-col"
          role="region"
          aria-labelledby="properties-section-heading"
          aria-describedby="properties-description"
        >
          <h2 id="properties-section-heading" className="sr-only">
            {t(translations.propertiesSectionLabel)}
          </h2>
          <div className="sr-only">{t(translations.propertiesSectionInstructions)}</div>
          <h3 id="properties-title" className="text-xl font-bold text-[#006BE0] mb-4">
            {t(translations.properties)}
          </h3>

          <div className="flex-1" role="list" aria-label={t(translations.srPropertiesDescription)}>
            {shapeInfo.facts.map((fact, index) => (
              <div key={index} className="flex items-start mb-3 gap-3" role="listitem">
                <div className="w-2 h-2 bg-[#006BE0] rounded-full mt-1.5 flex-shrink-0" aria-hidden="true"></div>
                <div className="text-sm text-gray-700 leading-relaxed">{fact}</div>
              </div>
            ))}
          </div>
          <div id="properties-description" className="sr-only">
            {t(translations.srPropertiesDescription)}
          </div>
        </section>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
            height: 25px;
            width: 25px;
            border-radius: 50%;
            background: white;
            border: 3px solid #007bff;
            cursor: pointer;
            margin-top: -4px;
        }
        input[type="range"]::-moz-range-thumb {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: white;
          border: 3px solid #007bff;
          cursor: pointer;
        }
        input[type="range"]:focus::-webkit-slider-thumb {
            border-color: #007bff;
            background: white;
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.8), 0 0 15px rgba(0, 123, 255, 0.6);
            transform: scale(1.2);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        input[type="range"]:focus::-moz-range-thumb {
            border-color: #007bff;
            background: white;
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.8), 0 0 15px rgba(0, 123, 255, 0.6);
            transform: scale(1.2);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        input[type="range"]:focus {
            outline: 2px solid #007bff;
            outline-offset: 2px;
        }
        /* Screen reader only content */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        /* Focus indicators for better accessibility */
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid #007bff;
          outline-offset: 2px;
        }
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .sr-only {
            position: static;
            width: auto;
            height: auto;
            padding: 0.5rem;
            margin: 0;
            overflow: visible;
            clip: auto;
            white-space: normal;
            background: #000;
            color: #fff;
            border: 1px solid #fff;
          }
        }
      `}</style>
    </div>
  );
};

export default QuadrilateralExplorer;
