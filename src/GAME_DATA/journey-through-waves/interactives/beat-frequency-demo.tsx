import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BeatFrequencyDemoInteraction } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';

interface BeatFrequencyDemoProps {
  interaction: BeatFrequencyDemoInteraction;
}

const BeatFrequencyDemo = ({ interaction }: BeatFrequencyDemoProps) => {
  const { t } = useTranslations();

  const { freqInputs, ariaLabel, translations } = interaction;
  const { play, pause, freqLabel1, freqLabel2, beatfreqLabel, description } = translations;

  const [freqSliders, setFreqSliders] = useState(freqInputs);

  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new window.AudioContext();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle Play/Stop
  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      // Start audio
      const ctx = audioContextRef.current;

      if (!ctx) return;

      oscillator1Ref.current = ctx.createOscillator();
      oscillator2Ref.current = ctx.createOscillator();

      const gainNode1 = ctx.createGain();
      const gainNode2 = ctx.createGain();

      gainNode1.gain.value = 0.5;
      gainNode2.gain.value = 0.5;

      oscillator1Ref.current.frequency.value = freqSliders[0].value;
      oscillator2Ref.current.frequency.value = freqSliders[1].value;

      oscillator1Ref.current.connect(gainNode1).connect(ctx.destination);
      oscillator2Ref.current.connect(gainNode2).connect(ctx.destination);

      oscillator1Ref.current.start();
      oscillator2Ref.current.start();
    } else {
      // Stop audio
      oscillator1Ref.current?.stop();
      oscillator2Ref.current?.stop();
      oscillator1Ref.current = null;
      oscillator2Ref.current = null;
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  // Update oscillator frequencies when sliders change
  useEffect(() => {
    if (isPlaying && oscillator1Ref.current && oscillator2Ref.current) {
      oscillator1Ref.current.frequency.value = freqSliders[0].value;
      oscillator2Ref.current.frequency.value = freqSliders[1].value;
    }
  }, [freqSliders, isPlaying]);

  // Canvas visualization
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    const freq1 = freqSliders[0].value;
    const freq2 = freqSliders[1].value;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;

    // Draw wave 1
    ctx.beginPath();
    ctx.strokeStyle = '#E0002B';
    for (let i = 0; i < 500; i++) {
      const t = (i / 500) * 0.05;
      const y = Math.sin(2 * Math.PI * freq1 * t);
      const x = (i / 500) * width;
      const scaledY = (y * height) / 8 + (1.5 * height) / 10;

      if (i === 0) ctx.moveTo(x, scaledY);
      else ctx.lineTo(x, scaledY);
    }
    ctx.stroke();

    // Draw wave 2
    ctx.beginPath();
    ctx.strokeStyle = '#0061FC';
    for (let i = 0; i < 500; i++) {
      const t = (i / 500) * 0.05;
      const y = Math.sin(2 * Math.PI * freq2 * t);
      const x = (i / 500) * width;
      const scaledY = (y * height) / 8 + (4 * height) / 10;

      if (i === 0) ctx.moveTo(x, scaledY);
      else ctx.lineTo(x, scaledY);
    }
    ctx.stroke();

    // Draw combined wave
    ctx.beginPath();
    ctx.strokeStyle = '#8E24AA';
    for (let i = 0; i < 500; i++) {
      const t = (i / 500) * 0.05;
      const y1 = Math.sin(2 * Math.PI * freq1 * t);
      const y2 = Math.sin(2 * Math.PI * freq2 * t);
      const y = y1 + y2;
      const x = (i / 500) * width;
      const scaledY = (y * height) / 8 + (3 * height) / 4;

      if (i === 0) ctx.moveTo(x, scaledY);
      else ctx.lineTo(x, scaledY);
    }
    ctx.stroke();
  }, [freqSliders]);

  const beatFrequency = Math.abs(freqSliders[0].value - freqSliders[1].value);

  // Handle slider updates
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    freqSliders.forEach((slider) => {
      const sliderElement = document.getElementById(`slider-${slider.id}`) as HTMLInputElement;
      if (sliderElement) {
        updateSliderBackground(sliderElement);
      }
    });
  }, [freqSliders, updateSliderBackground]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const sliderIndex = freqSliders.findIndex((slider) => `slider-${slider.id}` === id);
    if (sliderIndex !== -1) {
      setFreqSliders((prevSliders) =>
        prevSliders.map((slider, index) => (index === sliderIndex ? { ...slider, value: Number(value) } : slider)),
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <div className="w-full flex items-center justify-center gap-4">
        <div className="w-full flex flex-col md:flex-row gap-4">
          {freqSliders.map((slider, index) => (
            <div key={`h-${index}`} className="h-full w-full text-lg font-medium flex flex-col">
              <div aria-live="off" className="text-base font-semibold">
                <label htmlFor={`slider-${slider.id}`}>{t(slider.label)}</label>: {slider.value.toFixed(2)}{' '}
                {t(slider.unit ?? '')}
              </div>
              <div className="w-full">
                <div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={slider.value}
                    id={`slider-${slider.id}`}
                    onChange={handleSliderChange}
                    className="global-slider w-full"
                    aria-valuetext={`${t(slider.label ?? '')} : ${slider.value.toFixed(2)} ${t(slider.unit ?? '')}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={togglePlay}
            className="px-8 py-2 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-[#006BE0] hover:bg-blue-600 text-white w-32"
          >
            {isPlaying ? t(pause) : t(play)}
          </button>
        </div>
      </div>

      <div
        aria-label={t(ariaLabel!)}
        role="region"
        className="w-full flex justify-between rounded-lg border border-gray-400 p-2"
      >
        <div className="flex flex-col justify-around" aria-hidden="true">
          <div className="text-[#E0002B]">{t(freqLabel1)}</div>
          <div className="text-[#0061FC]">{t(freqLabel2)}</div>
          <div className="text-[#8E24AA]">{t(beatfreqLabel)}</div>
        </div>
        <canvas ref={canvasRef} width={800} height={300} className="h-72 w-5/6 overflow-auto" />
      </div>

      <div>
        <div className="text-lg font-semibold">
          {t(beatfreqLabel)}: {beatFrequency} Hz
        </div>
        <p>{t(description)}</p>
      </div>
    </div>
  );
};

export default BeatFrequencyDemo;
