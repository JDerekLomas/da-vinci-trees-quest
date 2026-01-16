import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface ForestGrowthSimulatorInteraction {
  ariaLabel: string;
  translations: {
    title: string;
    simulationYear: string;
    forestType: string;
    pineForest: string;
    oakForest: string;
    timberYield: string;
    carbonStorage: string;
    volumePerAcre: string;
    basedOnVolume: string;
    forestManagementGuide: string;
    optimalRotationStrategy: string;
    shortRotation: string;
    longRotation: string;
    balancedApproach: string;
    year: string;
    years: string;
    previous: string;
    next: string;
    conical: string;
    cylindrical: string;
    rotation: string;
    focusFastTimber: string;
    focusCarbonSequestration: string;
    balanceTimberCarbon: string;
    tonsPerAcre: string;
    pineBalancedRotation: string;
    oakBalancedRotation: string;
    oakShortRotation: string;
    pineShortRotation: string;
    oakLongRotation: string;
    pineLongRotation: string;
    selected: string;
  };
  speciesData: {
    pine: {
      shortCycleYield: number;
      sustainableCycleYield: number;
      longCycleYield: number;
      shortCycle: number;
      sustainableCycle: number;
      longCycle: number;
    };
    oak: {
      shortCycleYield: number;
      sustainableCycleYield: number;
      longCycleYield: number;
      shortCycle: number;
      sustainableCycle: number;
      longCycle: number;
    };
  };
  carbonData: {
    pine: {
      short: number[];
      sustainable: number[];
      long: number[];
    };
    oak: {
      short: number[];
      sustainable: number[];
      long: number[];
    };
  };
}

interface TreeProps {
  type: 'pine' | 'oak';
  size?: 'small' | 'medium' | 'large';
  growth?: number;
  t: (key: string) => string;
}

const Tree: React.FC<TreeProps> = ({ type, size = 'medium', growth = 1 }) => {
  return (
    <div aria-hidden="true" className="inline-block mx-0.5">
      <div className="flex flex-col items-center">
        <span
          style={{
            fontSize: size === 'small' ? '16px' : size === 'medium' ? '24px' : '32px',
            transform: `scale(${0.6 + growth * 0.4})`,
          }}
        >
          {type === 'pine' ? '🌲' : '🌳'}
        </span>
      </div>
    </div>
  );
};

const ForestRow: React.FC<{
  label: string;
  cycle: number;
  yearsPassed: number;
  color: { bgLight: string; accent: string };
  percentComplete: number;
  treeType: 'pine' | 'oak';
  isActive: boolean;
  t: (key: string) => string;
  translations: Record<string, string>;
}> = ({ label, cycle, yearsPassed, color, percentComplete, treeType, isActive, t, translations }) => {
  const percent = Math.round(percentComplete);
  const isHarvestYear = yearsPassed === cycle;

  const harvestAnimationStyle = isHarvestYear
    ? {
        animation: 'pulse 3s infinite',
      }
    : {};

  const treeCount = 30;
  const visibleTrees = Math.ceil((percentComplete / 100) * treeCount);

  return (
    <div
      className={`p-4 rounded-md ${isHarvestYear ? 'border-[#5A3714]' : isActive ? 'border-[#0055B2]' : 'border-[#757575]'} ${isHarvestYear ? 'border-2' : 'border-2'} transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <span className={`font-medium text-lg ${isActive ? 'text-blue-700' : ''}`}>{label}</span>
          <span className="ml-2 text-base">
            {percent}% {t(translations.complete)}
          </span>
        </div>

        {isHarvestYear ? (
          <div
            className="bg-[#5A3714] text-white font-bold px-3 py-1 rounded-md flex items-center mb-2"
            style={{
              ...harvestAnimationStyle,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {t(translations.harvestTime)}
          </div>
        ) : null}
      </div>

      <div
        className={`w-full h-3 bg-gray-300 overflow-hidden rounded-full relative mb-2 ${isHarvestYear ? '' : ''}`}
      >
        <div
          className={`h-full absolute top-0 left-0 ${isHarvestYear ? 'bg-[#5A3714]' : ''}`}
          style={{
            width: `${percentComplete}%`,
            backgroundColor: isHarvestYear ? color.accent : color.accent,
          }}
        />
      </div>

      <div className={`flex flex-wrap justify-start gap-0.5 p-1 rounded-md transition-colors duration-300`}>
        {[...Array(treeCount)].map((_, index) => (
          <div
            key={index}
            style={{
              display: index < visibleTrees ? 'block' : 'none',
              animation: isHarvestYear && index < visibleTrees ? '' : 'none',
            }}
          >
            <Tree type={treeType} size="small" growth={1} t={t} />
          </div>
        ))}
      </div>

      {isHarvestYear && (
        <div className="mt-2 p-2 border border-[#5A3714] rounded-md text-[#5A3714] text-base font-medium">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t(translations.readyToHarvest)}
          </div>
        </div>
      )}
    </div>
  );
};

const ForestGrowthSimulator: React.FC<{ interaction: ForestGrowthSimulatorInteraction }> = ({ interaction }) => {
  const { t } = useTranslations();
  const { translations, speciesData, carbonData } = interaction;
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const [step, setStep] = useState(isFirstIndex ? 1 : 3);
  const [year, setYear] = useState(1);
  const [treeSpecies, setTreeSpecies] = useState<'pine' | 'oak'>('pine');
  const [stats, setStats] = useState({
    timber: 0,
    carbon: 0,
  });

  const { payload } = useEventListener('forest-growth-simulator');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const newExternalStep = payload.step as number;
      if (newExternalStep >= 1 && newExternalStep <= 3) {
        setStep(newExternalStep);
        if (newExternalStep === 1) setStep(1);
        else if (newExternalStep === 2) setStep(2);
        else setStep(3);
      }
    }
  }, [payload, treeSpecies]);

  const colors = {
    short: {
      bgLight: '#757575',
      accent: '#5A3714',
    },
    sustainable: {
      bgLight: '#757575',
      accent: '#005F20',
    },
    long: {
      bgLight: '#757575',
      accent: '#8200C3',
    },
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-1px); }
        50% { transform: translateX(0); }
        75% { transform: translateX(1px); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getCurrentCycle = () => {
    const cycles = speciesData[treeSpecies];
    if (step === 1) return cycles.shortCycle;
    if (step === 2) return cycles.longCycle;
    return cycles.sustainableCycle;
  };

  const calculatePercentComplete = () => {
    const currentCycle = getCurrentCycle();
    return Math.min((year / currentCycle) * 100, 100);
  };

  useEffect(() => {
    setYear(1);
  }, [step]);

  useEffect(() => {
    const currentMaxYear = getCurrentCycle();
    if (year > currentMaxYear) {
      setYear(currentMaxYear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeSpecies]);

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || isNaN(num)) return '0';
    return num.toLocaleString();
  };

  const maxYear = getCurrentCycle();

  const getRotationTypeName = () => {
    if (step === 1) return t(translations.shortRotation);
    if (step === 2) return t(translations.longRotation);
    return t(translations.balancedApproach);
  };

  const getRotationType = () => {
    if (step === 1) return 'short';
    if (step === 2) return 'long';
    return 'sustainable';
  };

  const calculateTimber = () => {
    const cycleType = getRotationType();
    const cycle = speciesData[treeSpecies][`${cycleType}Cycle`];
    const maxYield = speciesData[treeSpecies][`${cycleType}CycleYield`];
    const percentComplete = year / cycle;
    return Math.round(percentComplete * maxYield);
  };

  const calculateCarbon = () => {
    const rotationType = getRotationType();
    const data = carbonData[treeSpecies][rotationType];
    const cycleLength = speciesData[treeSpecies][`${rotationType}Cycle`];
    if (year === 0) return 0;
    const cycleRatio = year / cycleLength;
    if (year >= cycleLength) return data[data.length - 1];
    const carbonIndex = Math.min(Math.floor(cycleRatio * 6), 5);
    const nextIndex = carbonIndex + 1;
    const lower = data[carbonIndex];
    const upper = data[nextIndex];
    const ratio = cycleRatio * 6 - carbonIndex;
    return Math.round(lower + (upper - lower) * ratio);
  };

  useEffect(() => {
    setStats({
      timber: calculateTimber(),
      carbon: calculateCarbon(),
    });
  }, [year, step, treeSpecies]);

  const currentCycle = getCurrentCycle();
  const percentComplete = calculatePercentComplete();
  const rotationLabel = `${getRotationTypeName()} (${currentCycle} ${t(translations.years)})`;

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #757575 ${percent}%)`;
  }, []);

  useEffect(() => {
    const simulationSlider = document.getElementById(`simulation-year-slider`) as HTMLInputElement;
    if (simulationSlider) {
      updateSliderBackground(simulationSlider);
    }
  }, [year, treeSpecies, step, updateSliderBackground]);

  return (
    <div className="w-full mt-[-10px]">
      <div className="mb-2">
        <div className="font-medium text-base">
          {step === 1
            ? t(translations.focusFastTimber)
            : step === 2
              ? t(translations.focusCarbonSequestration)
              : t(translations.balanceTimberCarbon)}
        </div>
      </div>

      <div className="mb-4">
        <div className="relative w-full mb-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-base font-medium">{t(translations.simulationYear)}:</label>
            <span className="text-[#005F20] px-2 py-0.5 rounded-full text-base font-medium">
              {t(translations.year)} {year}
            </span>
          </div>

          <div className="relative w-full h-4">
            <input
              type="range"
              min="1"
              id="simulation-year-slider"
              max={maxYear}
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full global-slider"
            />
          </div>

          <div className="flex justify-between text-base mt-2">
            <span>{t(translations.year)} 1</span>
            <span>
              {t(translations.year)} {maxYear}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="w-full mb-3 lg:mb-2 g:inline-block lg:mr-4 lg:w-auto">{t(translations.forestType)}:</div>

          <div className="flex flex-col lg:flex-row gap-2 w-full">
            <button
              onClick={() => setTreeSpecies('pine')}
              className={`w-full lg:w-auto p-2 rounded-md text-base font-medium ${
                treeSpecies === 'pine'
                  ? 'border-solid border-2 border-[#005F20] bg-[#005F20] text-white'
                  : 'border-solid border-2 border-[#005F20] text-[#005F20]'
              }`}
            >
              {t(translations.pineForest)}
              {treeSpecies === 'pine' && <span className="sr-only">&nbsp;{t(translations.selected)}</span>}
            </button>
            <button
              onClick={() => setTreeSpecies('oak')}
              className={`w-full lg:w-auto p-2 rounded-md text-base font-medium ${
                treeSpecies === 'oak'
                  ? 'border-solid border-2 border-[#005F20] bg-[#005F20] text-white'
                  : 'border-solid border-2 border-[#005F20] text-[#005F20]'
              }`}
            >
              {t(translations.oakForest)}
              {treeSpecies === 'oak' && <span className="sr-only">&nbsp;{t(translations.selected)}</span>}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-md border border-[#5A3714]" aria-hidden="true">
          <div className="text-[#5A3714] font-medium mb-1">{t(translations.timberYield)}</div>
          <div className="text-2xl font-bold text-[#5A3714]">
            {formatNumber(Math.round(stats.timber / 12))} ft³
          </div>
          <div className="text-base text-[#5A3714] mt-1">{t(translations.volumePerAcre)}</div>
        </div>

        <div className="p-3 rounded-md border border-[#005F20]" aria-hidden="true">
          <div className="text-[#005F20] font-medium mb-1">{t(translations.carbonStorage)}</div>
          <div className="text-2xl font-bold text-[#005F20]">
            {formatNumber(stats.carbon)} {t(translations.tonsPerAcre)}
          </div>
          <div className="text-base text-[#005F20] mt-1">{t(translations.basedOnVolume)}</div>
        </div>

        {/* Screen Reader Announcement */}
        <div className="sr-only" aria-live="polite">
          <p>
            {t(translations.timberYield)}: {formatNumber(Math.round(stats.timber / 12))} cubic feet{' '}
            {t(translations.volumePerAcre)}
          </p>
          <p>
            {t(translations.carbonStorage)}: {formatNumber(stats.carbon)} {t(translations.tonsPerAcre)},{' '}
            {t(translations.basedOnVolume)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <ForestRow
          label={rotationLabel}
          cycle={currentCycle}
          yearsPassed={year}
          color={step === 1 ? colors.short : step === 2 ? colors.long : colors.sustainable}
          percentComplete={percentComplete}
          treeType={treeSpecies}
          isActive={true}
          t={t}
          translations={translations}
        />
      </div>

      <div className="rounded-md border overflow-hidden mb-4">
        <div className="bg-gray-100 font-medium text-lg px-3 py-1">
          <span>{t(translations.forestManagementGuide)}</span>
        </div>
        <div className="p-3">
          <div className="font-medium text-gray-800 mb-1">{t(translations.optimalRotationStrategy)}:</div>
          <div className="text-gray-700 text-base mb-3">
            {treeSpecies === 'pine'
              ? step === 1
                ? t(translations.pineShortRotation)
                : step === 2
                  ? t(translations.pineLongRotation)
                  : t(translations.pineBalancedRotation)
              : step === 1
                ? t(translations.oakShortRotation)
                : step === 2
                  ? t(translations.oakLongRotation)
                  : t(translations.oakBalancedRotation)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestGrowthSimulator;
