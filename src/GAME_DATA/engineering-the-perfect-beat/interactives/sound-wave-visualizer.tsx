import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import config from '../configs/sound-wave-visualizer';

const SoundWaveVisualizer: React.FC = () => {
  const { t } = useTranslations();
  const [currentSound, setCurrentSound] = useState<any>(null);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get sound data with translations
  const soundData = config.soundData.map((sound) => ({
    ...sound,
    name: t(sound.name),
  }));

  const minLog = soundData[0].log10;
  const maxLog = soundData[soundData.length - 1].log10;
  const logRange = maxLog - minLog;

  // Function to format pressure in scientific notation with × symbol
  const formatPressure = (pressure: number): string => {
    const exponential = pressure.toExponential(2);
    const [coefficient, exponent] = exponential.split('e');
    return `${coefficient} × 10<sup>${exponent}</sup>`;
  };

  // Canvas setup and resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 300;
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!currentSound) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(t(config.labels.selectSourceToBegin), canvas.width / 2, canvas.height / 2);
      return;
    }

    const frequency = 2.5;
    const maxAmplitude = canvas.height / 2 - 20;
    const yOffset = canvas.height / 2;
    const normalizedLog = (currentSound.log10 - minLog) / logRange;
    const amplitude = maxAmplitude * normalizedLog;

    // Draw main glowing wave
    ctx.shadowColor = currentSound.color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = currentSound.color;

    for (let x = 0; x < canvas.width; x++) {
      const angle = (x / canvas.width) * Math.PI * 2 * frequency + time;
      const y = yOffset - Math.sin(angle) * amplitude;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw white overlay wave
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';

    for (let x = 0; x < canvas.width; x++) {
      const angle = (x / canvas.width) * Math.PI * 2 * frequency + time;
      const y = yOffset - Math.sin(angle) * amplitude;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Add vignette effect for polished look
    const vignetteStrength = 30;
    ctx.shadowBlur = 0;

    // Top vignette
    const topGrad = ctx.createLinearGradient(0, 0, 0, vignetteStrength);
    topGrad.addColorStop(0, 'rgba(0,0,0,1)');
    topGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, canvas.width, vignetteStrength);

    // Bottom vignette
    const bottomGrad = ctx.createLinearGradient(0, canvas.height - vignetteStrength, 0, canvas.height);
    bottomGrad.addColorStop(0, 'rgba(0,0,0,0)');
    bottomGrad.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, canvas.height - vignetteStrength, canvas.width, vignetteStrength);
  }, [currentSound, time, minLog, logRange, t]);

  // Handle sound selection with colored backgrounds when selected
  const handleSoundSelection = (sound: any, index: number) => {
    setCurrentSound(sound);

    // Create a light version of the sound color for background
    const getLightColor = (color: string) => {
      // Convert hex to RGB and create a light version
      const colorMap: { [key: string]: string } = {
        '#008217': '#dcfce7', // light green
        '#00749D': '#dbeafe', // light blue
        '#677600': '#fefce8', // light yellow
        '#E0002B': '#fecaca', // light red
        '#DB0072': '#fce7f3', // light pink
        '#8E24AA': '#f3e8ff', // light purple
      };
      return colorMap[color] || '#f3f4f6';
    };

    const getTextColor = (color: string) => {
      const colorMap: { [key: string]: string } = {
        '#008217': '#15803d', // dark green
        '#00749D': '#1e40af', // dark blue
        '#677600': '#a16207', // dark yellow
        '#E0002B': '#dc2626', // dark red
        '#DB0072': '#be185d', // dark pink
        '#8E24AA': '#7c3aed', // dark purple
      };
      return colorMap[color] || '#374151';
    };

    const getBorderColor = (color: string) => {
      const colorMap: { [key: string]: string } = {
        '#008217': '#22c55e', // green border
        '#00749D': '#3b82f6', // blue border
        '#677600': '#eab308', // yellow border
        '#E0002B': '#ef4444', // red border
        '#DB0072': '#ec4899', // pink border
        '#8E24AA': '#8b5cf6', // purple border
      };
      return colorMap[color] || '#d1d5db';
    };

    // Update button styles with colored backgrounds
    const buttons = document.querySelectorAll('.sound-btn');
    buttons.forEach((btn, idx) => {
      const button = btn as HTMLElement;
      if (idx === index) {
        button.style.backgroundColor = getLightColor(sound.color);
        button.style.color = getTextColor(sound.color);
        button.style.borderColor = getBorderColor(sound.color);
        button.style.transform = '';
        button.style.boxShadow = '';
      } else {
        button.style.backgroundColor = '#f9fafb'; // bg-gray-50
        button.style.color = '#374151'; // text-gray-700
        button.style.borderColor = '#d1d5db'; // border-gray-300
        button.style.transform = '';
        button.style.boxShadow = '';
      }
    });
  };

  // Setup effects
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const animationId = requestAnimationFrame(() => {
      animate();
      setTime((prev) => prev + 0.05);
    });
    return () => cancelAnimationFrame(animationId);
  }, [animate, time]);

  // Initialize with Concert/Siren selected
  useEffect(() => {
    if (soundData.length > 0 && !currentSound) {
      handleSoundSelection(soundData[0], 0); // Concert/Siren
    }
  }, [soundData]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Sound Source Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t(config.labels.selectSoundSource)}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {soundData.map((sound, index) => (
            <button
              key={index}
              onClick={() => handleSoundSelection(sound, index)}
              className="sound-btn text-center py-4 px-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none transition-all duration-200 text-sm"
            >
              {sound.name}
            </button>
          ))}
        </div>
      </div>

      {/* Visualization and Data */}
      <div className="space-y-6">
        {/* Data Display */}
        <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            {currentSound?.name || t(config.labels.selectSourceToBegin)}
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{t(config.labels.decibelsLoudness)}</p>
              <p className="text-lg font-semibold text-gray-900">{currentSound ? `${currentSound.db} dB` : '-'}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{t(config.labels.pressurePsi)}</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentSound ? (
                  <span dangerouslySetInnerHTML={{ __html: formatPressure(currentSound.pressure) }} />
                ) : (
                  '-'
                )}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{t(config.labels.scaledPressure)}</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentSound ? currentSound.scaled.toLocaleString() : '-'}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{t(config.labels.log10ScaledPressure)}</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentSound ? currentSound.log10.toFixed(4) : '-'}
              </p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600 border-t border-gray-200 pt-4">
            <p>{t(config.labels.amplitudeExplanation)}</p>
          </div>
        </div>

        {/* Canvas for Wave */}
        <div className="bg-black rounded-lg p-2 shadow-inner">
          <canvas ref={canvasRef} className="w-full" style={{ display: 'block' }} />
        </div>
      </div>
    </div>
  );
};

export default SoundWaveVisualizer;
