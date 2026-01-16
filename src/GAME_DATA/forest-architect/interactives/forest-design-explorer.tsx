import React, { useState, useMemo, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

interface ForestDesignExplorerInteraction {
  ariaLabel: string;
  translations: {
    title: string;
    treeSpacing: string;
    harvestCycle: string;
    timberQuality: string;
    carbonStorage: string;
    sustainability: string;
    timberPriority: string;
    carbonPriority: string;
    balancedApproach: string;
    years: string;
    densePlanting: string;
    wideSpacing: string;
    balancedSpacing: string;
    trees: string;
    noTrees: string;
    step: string;
    of: string;
    previous: string;
    next: string;
    perTree: string;
    area: string;
    treesPerAcre: string;
    foot: string;
    squareFoot: string;
    illustrationAriaLabel: string;
  };
  scenarios: {
    timber: {
      name: string;
      description: string;
      step: number;
      spacing: number;
      harvestCycle: number;
    };
    carbon: {
      name: string;
      description: string;
      step: number;
      spacing: number;
      harvestCycle: number;
    };
    balanced: {
      name: string;
      description: string;
      step: number;
      spacing: number;
      harvestCycle: number;
    };
  };
}

interface ForestGridProps {
  gridSize: number;
  spacing: number;
  treeType: string;
  t: (key: string) => string;
  translations: ForestDesignExplorerInteraction['translations'];
}

const ForestGrid: React.FC<ForestGridProps> = ({ spacing, t, translations }) => {
  const cellsPerRow = 12;
  const cellSize = 28;
  const treeSize = 1.3;

  const gridCells = useMemo(() => {
    const cells = [];

    for (let row = 0; row < cellsPerRow; row++) {
      for (let col = 0; col < cellsPerRow; col++) {
        let hasTree = false;

        if (spacing <= 12) {
          hasTree = (row % 2 === 0 && col % 2 === 0) ||
                    (row % 2 === 1 && col % 2 === 1) ||
                    (row % 3 === 0 && col % 3 === 1) ||
                    (row % 3 === 1 && col % 3 === 2);
        } else if (spacing <= 16) {
          hasTree = (row % 3 === 0 && col % 3 === 0) ||
                    (row % 3 === 1 && col % 3 === 2) ||
                    (row % 3 === 2 && col % 3 === 1);
        } else {
          hasTree = (row % 4 === 0 && col % 4 === 0) ||
                    (row % 4 === 2 && col % 4 === 2);
        }

        cells.push({
          row,
          col,
          hasTree,
        });
      }
    }
    return cells;
  }, [spacing, cellsPerRow]);

  return (
    <div className="relative" aria-hidden="true">
      <div
        className="grid mx-auto border-2 border-green-500 p-2 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${cellsPerRow}, ${cellSize}px)`,
          gap: '3px',
          width: 'fit-content',
        }}
      >
        {gridCells.map((cell, i) => (
          <div
            key={i}
            className={`
              flex items-center justify-center
              ${cell.hasTree ? 'bg-green-100' : 'bg-green-800'}
              transition-all duration-300
              rounded-md
            `}
            style={{
              height: cellSize,
              width: cellSize,
              boxShadow: cell.hasTree ? 'none' : '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {cell.hasTree && (
              <div className="flex items-center space-x-1 text-xl" style={{ transform: `scale(${treeSize})` }}>
                {(cell.row * 10 + cell.col) % 2 === 0 ? '🌲' : '🌳'}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid-legend mt-3 grid grid-cols-2 gap-2 text-center" aria-hidden="true">
        <div className="flex items-center justify-center gap-1">
          <div className="w-6 h-6 bg-green-100 rounded-md">🌳</div>
          <span className="text-base">{t(translations.trees)}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="w-4 h-4 bg-green-800 rounded-md"></div>
          <span className="text-base">{t(translations.noTrees)}</span>
        </div>
      </div>

      <div className="mt-2 text-center text-base" aria-hidden="true">
        {Math.floor(43560 / (spacing * spacing))} {t(translations.treesPerAcre)}
      </div>
    </div>
  );
};

const ForestDesignExplorer: React.FC<{ interaction: ForestDesignExplorerInteraction }> = ({ interaction }) => {
  const { t } = useTranslations();
  const { translations, scenarios } = interaction;
  const [gridSize] = useState(14);
  const [spacing, setSpacing] = useState(16);
  const [harvestCycle, setHarvestCycle] = useState(50);
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const initialScenario = isFirstIndex ? 'timber' : 'balanced';
  const [selectedScenario, setSelectedScenario] = useState(initialScenario);
  const [, setCurrentStep] = useState(isFirstIndex ? 1 : 3);

  const treeType = 'mixed';

  const { payload } = useEventListener('forest-design-explorer');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const newExternalStep = payload.step as number;
      const mappedStep = newExternalStep + 1;
      if (mappedStep >= 1 && mappedStep <= 3) {
        setCurrentStep(mappedStep);

        const scenarioKey = Object.keys(scenarios).find(
          (key) => scenarios[key as keyof typeof scenarios].step === mappedStep,
        );
        if (scenarioKey) {
          setSelectedScenario(scenarioKey);
        }
      }
    }
  }, [payload, scenarios]);

  useEffect(() => {
    if (selectedScenario) {
      const scenario = scenarios[selectedScenario as keyof typeof scenarios];
      if ('spacing' in scenario) {
        setSpacing(scenario.spacing);
      }
      setHarvestCycle(scenario.harvestCycle);
      setCurrentStep(scenario.step);
    }
  }, [selectedScenario, scenarios]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .forest-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 8px;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        background: transparent;
        position: relative;
        z-index: 10;
      }

      .forest-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 2px solid #16a34a;
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 10;
      }

      .forest-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 2px solid #16a34a;
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 10;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const timberScore =
    selectedScenario === 'timber'
      ? Math.min(95, Math.max(55, 100 - Math.abs(spacing - 13) * 3))
      : selectedScenario === 'carbon'
        ? Math.min(95, Math.max(55, 60 + Math.min(spacing, 20) * 1.5))
        : Math.min(95, Math.max(55, 100 - Math.abs(spacing - 16) * 3));

  const carbonScore = Math.min(95, Math.max(55, 50 + spacing * 1.5));
  const sustainabilityScore = Math.round((timberScore + carbonScore) / 2);

  return (
    <div className="w-full space-y-3 mt-[-20px]">
      {/* Labels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300" aria-hidden="true">
          <h3 className="text-base font-medium mb-2">
            {selectedScenario === 'timber'
              ? t(translations.timberPriority)
              : selectedScenario === 'carbon'
                ? t(translations.carbonPriority)
                : t(translations.balancedApproach)}
          </h3>
          <p className="">
            {spacing <= 12
              ? t(translations.densePlanting)
              : spacing >= 20
                ? t(translations.wideSpacing)
                : t(translations.balancedSpacing)}
          </p>
        </div>
        <div className="sr-only">
          {selectedScenario === 'timber'
            ? `${t(translations.timberPriority)}:`
            : selectedScenario === 'carbon'
              ? `${t(translations.carbonPriority)}:`
              : `${t(translations.balancedApproach)}:`}
          {spacing <= 12
            ? ` ${t(translations.densePlanting)}`
            : spacing >= 20
              ? ` ${t(translations.wideSpacing)}`
              : ` ${t(translations.balancedSpacing)}`}
        </div>

        <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300" aria-hidden="true">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-medium">
              {t(translations.treeSpacing)}
              {t(translations.foot)}
            </span>
            <span aria-hidden="true" className="text-base font-bold">
              {spacing}&nbsp;ft
            </span>
          </div>
          <div className="">
            {t(translations.area)}: {spacing * spacing} ft² {t(translations.perTree)}
          </div>
        </div>
        <div className="sr-only">
          {t(translations.treeSpacing)}: {spacing} {t(translations.foot)} &nbsp;
          {t(translations.area)}: {spacing * spacing} {t(translations.squareFoot)} {t(translations.perTree)}.
        </div>

        <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300" aria-hidden="true">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-medium">{t(translations.harvestCycle)}</span>
            <span className="text-base font-bold">
              {harvestCycle}&nbsp;{t(translations.years)}
            </span>
          </div>
          <div className="">
            {Math.floor(43560 / (spacing * spacing))} {t(translations.treesPerAcre)}
          </div>
        </div>
        <div className="sr-only">
          {t(translations.harvestCycle)}: {harvestCycle} {t(translations.years)}.
          {Math.floor(43560 / (spacing * spacing))} {t(translations.treesPerAcre)}.
        </div>
      </div>
      {/* Range Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-2" aria-hidden="true">
          <div className="flex justify-between items-center mb-1">
            <span className="text-base">{t(translations.timberQuality)}</span>
            <span className="text-base font-bold">{timberScore.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 mt-2">
            <div className="bg-amber-700 h-3 rounded-full" style={{ width: `${timberScore}%` }}></div>
          </div>
        </div>
        <div className="sr-only">
          {t(translations.timberQuality)}: {timberScore.toFixed(0)}%
        </div>

        <div className="bg-white p-2" aria-hidden="true">
          <div className="flex justify-between items-center mb-1">
            <span className="text-base">{t(translations.carbonStorage)}</span>
            <span className="text-base font-bold">{carbonScore.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 mt-2">
            <div className="bg-green-700 h-3 rounded-full" style={{ width: `${carbonScore}%` }}></div>
          </div>
        </div>
        <div className="sr-only">
          {t(translations.carbonStorage)}: {carbonScore.toFixed(0)}%
        </div>

        <div className="bg-white p-2" aria-hidden="true">
          <div className="flex justify-between items-center mb-1">
            <span className="text-base">{t(translations.sustainability)}</span>
            <span className="text-base font-bold">{sustainabilityScore}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 mt-2">
            <div className="bg-blue-700 h-3 rounded-full" style={{ width: `${sustainabilityScore}%` }}></div>
          </div>
        </div>
        <div className="sr-only">
          {t(translations.sustainability)}: {sustainabilityScore}%
        </div>
      </div>
      <span className="sr-only">{t(translations.illustrationAriaLabel)}</span>
      {/* Illustration */}
      <div className="lg:p-6 h-[400px] lg:h-[450px] flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <ForestGrid
            gridSize={gridSize}
            spacing={spacing}
            treeType={treeType}
            t={t}
            translations={translations}
          />
        </div>
      </div>
    </div>
  );
};

export default ForestDesignExplorer;
