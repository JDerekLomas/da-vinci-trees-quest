import React, { useContext, useEffect, useState } from 'react';
import { StatisticalSignificanceProps, StatisticalSignificanceState } from './interface';
import { GameContext } from '../../../contexts/GameContext';
import { useTranslations } from '../../../hooks/useTranslations';

const StatisticalSignificance: React.FC<StatisticalSignificanceProps> = ({ interaction }) => {
  const { translations } = interaction;
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};

  // Load saved state
  const savedState =
    interactiveResponses?.statistical_significance &&
    typeof interactiveResponses?.statistical_significance === 'object'
      ? (interactiveResponses?.statistical_significance as unknown as StatisticalSignificanceState)
      : undefined;

  // Component state
  const [animated, setAnimated] = useState(savedState?.animated ?? false);
  const [displayPValue, setDisplayPValue] = useState(savedState?.displayPValue ?? 0);
  const [displayMean, setDisplayMean] = useState(savedState?.displayMean ?? 0);

  // Statistical values
  const pValue = 0.003;
  const meanDifference = 5.0;
  const ciLower = 3.2;
  const ciUpper = 6.8;

  // Auto-animate on component mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Animate values when component becomes animated
  useEffect(() => {
    if (animated) {
      let pCurrent = 0;
      const pInterval = setInterval(() => {
        pCurrent += 0.0003;
        if (pCurrent >= pValue) {
          setDisplayPValue(pValue);
          clearInterval(pInterval);
        } else {
          setDisplayPValue(pCurrent);
        }
      }, 10);

      let meanCurrent = 0;
      const meanInterval = setInterval(() => {
        meanCurrent += 0.5;
        if (meanCurrent >= meanDifference) {
          setDisplayMean(meanDifference);
          clearInterval(meanInterval);
        } else {
          setDisplayMean(meanCurrent);
        }
      }, 30);

      return () => {
        clearInterval(pInterval);
        clearInterval(meanInterval);
      };
    }
  }, [animated]);

  // Save state to context
  useEffect(() => {
    if (setInteractiveResponses) {
      setInteractiveResponses((prev) => ({
        ...prev,
        statistical_significance: { animated, displayPValue, displayMean },
      }));
    }
  }, [animated, displayPValue, displayMean, setInteractiveResponses]);

  const scalePosition = (value: number) => ((value - 0) / 10) * 100;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto space-y-4 w-full">
        {/* Statistical Test Card */}
        <div
          className="bg-white rounded-lg shadow-md p-4 border border-slate-200"
          style={{ opacity: animated ? 1 : 0, transition: 'all 0.5s' }}
        >
          <div className="text-sm font-semibold text-slate-500 uppercase mb-1">
            {t(translations.statisticalTest)}
          </div>
          <div className="text-lg font-bold text-slate-800">{t(translations.independentSamplesTTest)}</div>
        </div>

        {/* P-Value and Mean Difference Cards in same row */}
        <div className="flex gap-4">
          {/* P-Value Card - Using green color for significance */}
          <div
            className="bg-green-50 rounded-lg shadow-md p-6 border-2 border-green-400"
            style={{ opacity: animated ? 1 : 0, transition: 'all 0.6s 0.1s', width: '60%' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-600 uppercase mb-2">{t(translations.pValue)}</div>
                <div className="text-5xl font-bold text-green-700 mb-3">{displayPValue.toFixed(3)}</div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-700 font-semibold">{t(translations.statisticallySignificant)}</span>
                </div>
                <div className="text-sm text-slate-700">{t(translations.probabilityByChance)}</div>
              </div>
              <div className="bg-green-500 text-white rounded-full p-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Mean Difference Card - Using blue color */}
          <div
            className="bg-blue-50 rounded-lg shadow-md p-5 border border-blue-200"
            style={{ opacity: animated ? 1 : 0, transition: 'all 0.5s 0.2s', width: '40%' }}
          >
            <div className="text-sm font-semibold text-slate-600 uppercase mb-1">
              {t(translations.meanDifference)}
            </div>
            <div className="text-4xl font-bold text-blue-700 mb-2">{displayMean.toFixed(1)}%</div>
            <div className="text-sm text-slate-700">{t(translations.neuroBoostMinusPlacebo)}</div>
          </div>
        </div>

        {/* Confidence Interval Card - Using purple color */}
        <div
          className="bg-purple-50 rounded-lg shadow-md p-5 border border-purple-200"
          style={{ opacity: animated ? 1 : 0, transition: 'all 0.5s 0.3s' }}
        >
          <div className="text-sm font-semibold text-slate-600 uppercase mb-3">
            {t(translations.confidenceInterval)}
          </div>
          <div className="relative h-16 bg-slate-100 rounded-lg mb-8">
            <div
              className="absolute h-full bg-purple-400 rounded-lg opacity-60"
              style={{
                left: `${scalePosition(ciLower)}%`,
                width: `${scalePosition(ciUpper) - scalePosition(ciLower)}%`,
                transition: 'all 0.8s 0.5s',
                opacity: animated ? 0.6 : 0,
              }}
            />
            <div
              className="absolute top-0 bottom-0 w-1 bg-purple-700"
              style={{
                left: `${scalePosition(5)}%`,
                transition: 'all 0.8s 0.6s',
                opacity: animated ? 1 : 0,
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-700">
                5.0%
              </div>
            </div>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-purple-700"
              style={{
                left: `${scalePosition(ciLower)}%`,
                transition: 'all 0.8s 0.5s',
                opacity: animated ? 1 : 0,
              }}
            >
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-purple-700">
                {ciLower}%
              </div>
            </div>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-purple-700"
              style={{
                left: `${scalePosition(ciUpper)}%`,
                transition: 'all 0.8s 0.5s',
                opacity: animated ? 1 : 0,
              }}
            >
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-purple-700">
                {ciUpper}%
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-700">
            {t(translations.confidentTrueEffect)
              .replace('{ciLower}', ciLower.toString())
              .replace('{ciUpper}', ciUpper.toString())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalSignificance;
