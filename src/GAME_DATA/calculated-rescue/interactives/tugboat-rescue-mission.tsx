import { useState, useEffect, useRef } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';

interface TugboatRescueMissionProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const TugboatRescueMission = ({ onInteraction }: TugboatRescueMissionProps) => {
  const [angle, setAngle] = useState(110);
  const [force1, setForce1] = useState(30);
  const [force2, setForce2] = useState(30);
  const [showBisector, setShowBisector] = useState(false);
  const [showResultant, setShowResultant] = useState(false);
  const [showForceValues, setShowForceValues] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { t } = useTranslations();

  // Colors
  const colors = {
    water: '#4a8fe2',
    ship: '#8d6e63',
    tug1: '#f44336',
    tug2: '#f44336',
    rope: '#ffc107',
    bisector: '#000000',
    resultant: '#9c27b0',
    protractor: 'rgba(255, 255, 255, 0.6)',
  };

  // Calculate resultant force magnitude
  const calculateResultant = () => {
    const angleRad = (angle * Math.PI) / 180;
    const resultantSquared = Math.pow(force1, 2) + Math.pow(force2, 2) + 2 * force1 * force2 * Math.cos(angleRad);
    return Math.sqrt(resultantSquared);
  };

  // Calculate resultant force direction
  const calculateResultantDirection = () => {
    const halfAngle = angle / 2;
    const angleRad1 = ((270 - halfAngle) * Math.PI) / 180;
    const angleRad2 = ((270 + halfAngle) * Math.PI) / 180;

    // Calculate force components
    const force1X = force1 * Math.cos(angleRad1);
    const force1Y = force1 * Math.sin(angleRad1);
    const force2X = force2 * Math.cos(angleRad2);
    const force2Y = force2 * Math.sin(angleRad2);

    // Calculate resultant components
    const resultantX = force1X + force2X;
    const resultantY = force1Y + force2Y;

    // Calculate resultant angle
    return Math.atan2(resultantY, resultantX);
  };

  useEffect(() => {
    // Send all conditions with their current boolean values
    onInteraction({
      'angle-90': angle === 90,
      'angle-120': angle === 120,
      'angle-150': angle === 150,
      'force-40': force1 === 40 && force2 === 40,
      'force-60-30': force1 === 60 && force2 === 30,
      'show-bisector': showBisector,
      'show-forces': showResultant,
      'show-values': showForceValues,
      'angle-120-force-40': angle === 120 && force1 === 40 && force2 === 40,
    });
  }, [angle, force1, force2, showBisector, showResultant, showForceValues]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Draw water
    ctx.fillStyle = colors.water;
    ctx.fillRect(0, 0, width, height);

    // Draw waves (fewer to save space)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 20) {
        const y = Math.sin(x / 40 + i) * 4 + height / 2 + i * 30 - 80;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Center point (ship position)
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate positions based on angle
    const halfAngle = angle / 2;
    const angleRad1 = ((270 - halfAngle) * Math.PI) / 180;
    const angleRad2 = ((270 + halfAngle) * Math.PI) / 180;

    // Lengths for ropes/vectors - scale forces to fit
    const scale = 3;
    const length1 = force1 * scale;
    const length2 = force2 * scale;

    // Calculate tugboat positions
    const tug1X = centerX + length1 * Math.cos(angleRad1);
    const tug1Y = centerY + length1 * Math.sin(angleRad1);
    const tug2X = centerX + length2 * Math.cos(angleRad2);
    const tug2Y = centerY + length2 * Math.sin(angleRad2);

    // Draw protractor (simplified)
    ctx.beginPath();
    ctx.strokeStyle = colors.protractor;
    ctx.lineWidth = 2;
    ctx.arc(centerX, centerY, 90, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw angle lines (fewer to save space)
    for (let a = 0; a < 360; a += 30) {
      const startX = centerX + 85 * Math.cos((a * Math.PI) / 180);
      const startY = centerY + 85 * Math.sin((a * Math.PI) / 180);
      const endX = centerX + 90 * Math.cos((a * Math.PI) / 180);
      const endY = centerY + 90 * Math.sin((a * Math.PI) / 180);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Add labels for major angles
      if (a % 90 === 0) {
        const textX = centerX + 100 * Math.cos((a * Math.PI) / 180);
        const textY = centerY + 100 * Math.sin((a * Math.PI) / 180);
        ctx.fillStyle = colors.protractor;
        ctx.font = '16px Avenir Next';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${a}°`, textX, textY);
      }
    }

    // Draw angle arc
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.arc(centerX, centerY, 60, angleRad1, angleRad2);
    ctx.stroke();

    // Label angle (smaller text)
    const arcLabelX = centerX + 65 * Math.cos((angleRad1 + angleRad2) / 2);
    const arcLabelY = centerY + 65 * Math.sin((angleRad1 + angleRad2) / 2);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Avenir Next';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${angle}°`, arcLabelX, arcLabelY);

    // Draw angle bisector if enabled (simplified)
    if (showBisector) {
      const bisectorAngle = (270 * Math.PI) / 180; // straight down
      const bisectorLength = 120;
      const bisectorEndX = centerX + bisectorLength * Math.cos(bisectorAngle);
      const bisectorEndY = centerY + bisectorLength * Math.sin(bisectorAngle);

      ctx.beginPath();
      ctx.strokeStyle = colors.bisector;
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 3]);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(bisectorEndX, bisectorEndY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label bisector
      ctx.fillStyle = colors.bisector;
      ctx.font = 'bold 16px Avenir Next';
      ctx.textAlign = 'center';
      ctx.fillText(t('scenes.S8.S8_D0_FX_C9.tugboat.bisector'), bisectorEndX, bisectorEndY - 20);

      // Label half angles
      const halfAngleLabel = angle / 2;
      const halfAngle1X = centerX + 50 * Math.cos((angleRad1 + bisectorAngle) / 2);
      const halfAngle1Y = centerY + 40 * Math.sin((angleRad1 + bisectorAngle) / 2);
      const halfAngle2X = centerX + 50 * Math.cos((angleRad2 + bisectorAngle) / 2);
      const halfAngle2Y = centerY + 40 * Math.sin((angleRad2 + bisectorAngle) / 2);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Avenir Next';
      ctx.fillText(`${halfAngleLabel}°`, halfAngle1X, halfAngle1Y);
      ctx.fillText(`${halfAngleLabel}°`, halfAngle2X, halfAngle2Y);
    }

    // Draw ships
    // Main ship (disabled vessel)
    ctx.fillStyle = colors.ship;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 25, 15, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '16px Avenir Next';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Position Meridian text slightly below
    ctx.fillText(t('scenes.S8.S8_D0_FX_C9.tugboat.meridian'), centerX, centerY + 20);

    // Draw tugboat 1
    ctx.fillStyle = colors.tug1;
    ctx.beginPath();
    ctx.ellipse(tug1X, tug1Y, 15, 10, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '16px Avenir Next';
    // Position Determined text slightly above and left
    ctx.fillText(t('scenes.S8.S8_D0_FX_C9.tugboat.determined'), tug1X - 15, tug1Y - 15);

    // Draw tugboat 2
    ctx.fillStyle = colors.tug2;
    ctx.beginPath();
    ctx.ellipse(tug2X, tug2Y, 15, 10, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '16px Avenir Next';
    // Position Resolute text slightly above and right
    ctx.fillText(t('scenes.S8.S8_D0_FX_C9.tugboat.resolute'), tug2X + 15, tug2Y - 15);

    // Draw ropes/force vectors
    // Rope 1
    ctx.beginPath();
    ctx.strokeStyle = colors.rope;
    ctx.lineWidth = 3;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(tug1X, tug1Y);
    ctx.stroke();

    // Rope 2
    ctx.beginPath();
    ctx.strokeStyle = colors.rope;
    ctx.lineWidth = 3;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(tug2X, tug2Y);
    ctx.stroke();

    // Draw force labels if enabled
    if (showForceValues) {
      // Force 1 label (Determined) - position above the tugboat name
      const force1LabelX = tug1X - 15; // Match the position of the "Determined" text
      const force1LabelY = tug1Y - 35; // Position above the tugboat name
      ctx.fillStyle = colors.tug1;
      ctx.font = 'bold 16px Avenir Next';
      ctx.textAlign = 'center'; // Center align the text
      ctx.fillText(`${force1} kN`, force1LabelX, force1LabelY);

      // Force 2 label (Resolute) - position above the tugboat name
      const force2LabelX = tug2X + 15; // Match the position of the "Resolute" text
      const force2LabelY = tug2Y - 35; // Position above the tugboat name
      ctx.fillStyle = colors.tug2;
      ctx.font = 'bold 16px Avenir Next';
      ctx.textAlign = 'center'; // Center align the text
      ctx.fillText(`${force2} kN`, force2LabelX, force2LabelY);
    }

    // Draw resultant force if enabled
    if (showResultant) {
      const resultantMagnitude = calculateResultant();
      const resultantLength = resultantMagnitude * scale * 0.5; // Scale for display
      const resultantAngle = calculateResultantDirection();

      const resultantEndX = centerX + resultantLength * Math.cos(resultantAngle);
      const resultantEndY = centerY + resultantLength * Math.sin(resultantAngle);

      // Draw resultant vector
      ctx.beginPath();
      ctx.strokeStyle = colors.resultant;
      ctx.lineWidth = 4;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(resultantEndX, resultantEndY);
      ctx.stroke();

      // Draw arrowhead
      const arrowSize = 10;
      const arrowAngle1 = resultantAngle + 0.7;
      const arrowAngle2 = resultantAngle - 0.7;

      ctx.beginPath();
      ctx.fillStyle = colors.resultant;
      ctx.moveTo(resultantEndX, resultantEndY);
      ctx.lineTo(
        resultantEndX - arrowSize * Math.cos(arrowAngle1),
        resultantEndY - arrowSize * Math.sin(arrowAngle1),
      );
      ctx.lineTo(
        resultantEndX - arrowSize * Math.cos(arrowAngle2),
        resultantEndY - arrowSize * Math.sin(arrowAngle2),
      );
      ctx.closePath();
      ctx.fill();

      // Label resultant (more compact)
      ctx.fillStyle = colors.resultant;
      ctx.font = 'bold 16px Avenir Next';
      ctx.textAlign = 'left';
      ctx.fillText(`${resultantMagnitude.toFixed(1)} kN`, resultantEndX + 15, resultantEndY);
    }
  }, [angle, force1, force2, showBisector, showResultant, showForceValues, t]);

  const resetDemo = () => {
    setAngle(120);
    setForce1(40);
    setForce2(40);
    setShowBisector(false);
    setShowResultant(false);
    setShowForceValues(false);
  };

  // Add a function to update slider backgrounds
  const updateSliderBackground = (input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  };

  // Update the slider background when the component mounts or when values change
  useEffect(() => {
    const angleSlider = document.getElementById('slider-angle') as HTMLInputElement;
    const force1Slider = document.getElementById('slider-force1') as HTMLInputElement;
    const force2Slider = document.getElementById('slider-force2') as HTMLInputElement;

    if (angleSlider) updateSliderBackground(angleSlider);
    if (force1Slider) updateSliderBackground(force1Slider);
    if (force2Slider) updateSliderBackground(force2Slider);
  }, [angle, force1, force2]);

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const newValue = parseInt(e.target.value);
    setter(newValue);
    updateSliderBackground(e.target as HTMLInputElement);
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto pb-4">
      <div className="flex flex-col w-full gap-4">
        <div className="relative w-full" aria-label={t('scenes.S8.S8_D0_FX_C9.tugboat.ariaLabel')}>
          <canvas
            ref={canvasRef}
            width={800}
            height={480}
            className="border border-gray-700 rounded-lg bg-sky-800 w-full h-auto"
          />
        </div>

        <div>
          {/* Heading for Tugboat Controls */}
          <h2 className="text-lg font-bold text-gray-700 mb-3">{t('scenes.S8.S8_D0_FX_C9.tugboat.controls')}</h2>

          {/* Sliders container */}
          <div className="sliders-container mb-4">
            <div className="slider-item">
              <div aria-live="off" className="text-base font-semibold">
                <label htmlFor="slider-angle">{t('scenes.S8.S8_D0_FX_C9.tugboat.angle')}</label>: {angle}°
              </div>
              <div className="relative mt-1">
                <input
                  id="slider-angle"
                  type="range"
                  min="60"
                  max="180"
                  placeholder="60"
                  value={angle}
                  onChange={(e) => handleSliderChange(e, setAngle)}
                  className="global-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  aria-valuetext={`${t('scenes.S8.S8_D0_FX_C9.tugboat.angle')}: ${angle}°`}
                />
              </div>
            </div>

            <div className="slider-item">
              <div aria-live="off" className="text-base font-semibold">
                <label htmlFor="slider-force1">{t('scenes.S8.S8_D0_FX_C9.tugboat.determined')}</label>: {force1}{' '}
                <span aria-hidden="true">kN</span>
                <span className="sr-only">{t('scenes.S8.S8_D0_FX_C9.tugboat.kiloNewton')}</span>
              </div>
              <div className="relative mt-1">
                <input
                  id="slider-force1"
                  type="range"
                  min="10"
                  max="80"
                  placeholder="10"
                  value={force1}
                  onChange={(e) => handleSliderChange(e, setForce1)}
                  className="global-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  aria-valuetext={`${t('scenes.S8.S8_D0_FX_C9.tugboat.determined')}: ${force1} ${t('scenes.S8.S8_D0_FX_C9.tugboat.kiloNewton')}`}
                />
              </div>
            </div>

            <div className="slider-item">
              <div aria-live="off" className="text-base font-semibold">
                <label htmlFor="slider-force2">{t('scenes.S8.S8_D0_FX_C9.tugboat.resolute')}</label>: {force2}{' '}
                <span aria-hidden="true">kN</span>
                <span className="sr-only">{t('scenes.S8.S8_D0_FX_C9.tugboat.kiloNewton')}</span>
              </div>
              <div className="relative mt-1">
                <input
                  id="slider-force2"
                  type="range"
                  min="10"
                  max="80"
                  placeholder="10"
                  value={force2}
                  onChange={(e) => handleSliderChange(e, setForce2)}
                  className="global-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  aria-valuetext={`${t('scenes.S8.S8_D0_FX_C9.tugboat.resolute')}: ${force2} ${t('scenes.S8.S8_D0_FX_C9.tugboat.kiloNewton')}`}
                />
              </div>
            </div>
          </div>

          {/* Row 2: All buttons in one row */}
          <div className="buttons-container mb-6" aria-live="off">
            <button
              onClick={() => setShowBisector(!showBisector)}
              aria-label={
                showBisector
                  ? t('scenes.S8.S8_D0_FX_C9.tugboat.hideBisector')
                  : t('scenes.S8.S8_D0_FX_C9.tugboat.showBisector')
              }
              className={`px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 min-h-[64px] lg:min-h-[64px] w-full flex items-center justify-center ${
                showBisector
                  ? 'bg-[#006BE0] hover:bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <span>
                {showBisector
                  ? t('scenes.S8.S8_D0_FX_C9.tugboat.hideBisector')
                  : t('scenes.S8.S8_D0_FX_C9.tugboat.showBisector')}
              </span>
            </button>

            <button
              onClick={() => setShowResultant(!showResultant)}
              aria-label={
                showResultant
                  ? t('scenes.S8.S8_D0_FX_C9.tugboat.hideForces')
                  : t('scenes.S8.S8_D0_FX_C9.tugboat.showForces')
              }
              className={`px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 min-h-[64px] lg:min-h-[64px] w-full flex items-center justify-center ${
                showResultant
                  ? 'bg-[#006BE0] hover:bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <span>
                {showResultant
                  ? t('scenes.S8.S8_D0_FX_C9.tugboat.hideForces')
                  : t('scenes.S8.S8_D0_FX_C9.tugboat.showForces')}
              </span>
            </button>

            <button
              onClick={() => setShowForceValues(!showForceValues)}
              aria-label={
                showForceValues
                  ? t('scenes.S8.S8_D0_FX_C9.tugboat.hideValues')
                  : t('scenes.S8.S8_D0_FX_C9.tugboat.showValues')
              }
              className={`px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 min-h-[64px] lg:min-h-[64px] w-full flex items-center justify-center ${
                showForceValues
                  ? 'bg-[#006BE0] hover:bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <span>
                {showForceValues
                  ? t('scenes.S8.S8_D0_FX_C9.tugboat.hideValues')
                  : t('scenes.S8.S8_D0_FX_C9.tugboat.showValues')}
              </span>
            </button>

            <button
              onClick={resetDemo}
              aria-label={t('scenes.S8.S8_D0_FX_C9.tugboat.reset')}
              className="px-2 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2 min-h-[64px] lg:min-h-[64px] w-full flex items-center justify-center bg-[#006BE0] hover:bg-blue-600 text-white"
            >
              <span>{t('scenes.S8.S8_D0_FX_C9.tugboat.reset')}</span>
            </button>
          </div>

          {/* Row 3: Captain's Log */}
          <div className="bg-gray-100 p-3 rounded-lg">
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              {t('scenes.S8.S8_D0_FX_C9.tugboat.captainsLog')}
            </h2>
            <p className="text-gray-700 text-md">
              {`${t('scenes.S8.S8_D0_FX_C9.tugboat.logMessage_1')} ${angle}° ${t('scenes.S8.S8_D0_FX_C9.tugboat.logMessage_2')} ${angle / 2}° ${t('scenes.S8.S8_D0_FX_C9.tugboat.logMessage_3')}`}
              {showResultant && (
                <span>
                  {` ${t('scenes.S8.S8_D0_FX_C9.tugboat.resultantForce')} ${calculateResultant().toFixed(1)}`}{' '}
                  <span aria-hidden="true">kN</span>
                  <span className="sr-only">{t('scenes.S8.S8_D0_FX_C9.tugboat.kiloNewton')}</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .sliders-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .slider-item {
            width: 100%;
          }

          .buttons-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          @media (min-width: 1025px) {
            .sliders-container {
              flex-direction: row;
            }

            .buttons-container {
              grid-template-columns: repeat(4, 1fr);
              gap: 0.5rem;
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default TugboatRescueMission;
