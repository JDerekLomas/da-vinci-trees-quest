import React, { useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import config, { ParamKey } from '../configs/vertex-form-formula';

// Add slider styles
const sliderStyles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2);
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2);
  }
  
  .slider:focus::-webkit-slider-thumb {
    background: #2563eb;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  .slider:focus::-moz-range-thumb {
    background: #2563eb;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
`;

interface VertexFormInteractiveProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const VertexFormInteractive: React.FC<VertexFormInteractiveProps> = ({ onInteraction }) => {
  // Base values that create a proper parabola
  const [aValue, setAValue] = useState(config.params.options.a.option1);
  const [hValue, setHValue] = useState(config.params.options.h.option1);
  const [kValue, setKValue] = useState(config.params.options.k.option1);

  const [selectedParam, setSelectedParam] = useState<ParamKey>('h');
  const { t } = useTranslations();

  const [hasSelectedA, setHasSelectedA] = useState(false);
  const [hasSelectedH, setHasSelectedH] = useState(false);
  const [hasSelectedK, setHasSelectedK] = useState(false);
  // Get slider configuration for each parameter
  const getSliderConfig = (param: ParamKey) => {
    switch (param) {
      case 'a':
        return { min: -0.1, max: 0.1, step: 0.005 };
      case 'h':
        return { min: -50, max: 75, step: 1 };
      case 'k':
        return { min: -50, max: 60, step: 1 };
      default:
        return { min: 0, max: 1, step: 0.1 };
    }
  };

  // Handle custom slider value change
  const handleSliderChange = (value: number) => {
    if (selectedParam === 'a') setAValue(value);
    if (selectedParam === 'h') setHValue(value);
    if (selectedParam === 'k') setKValue(value);
  };

  const handleParamSelection = (param: ParamKey) => {
    if (param === 'a' && !hasSelectedA) {
      setHasSelectedA(true);
      onInteraction({ 'a-selected': true });
    } else if (param === 'h' && !hasSelectedH) {
      setHasSelectedH(true);
      onInteraction({ 'h-selected': true });
    } else if (param === 'k' && !hasSelectedK) {
      setHasSelectedK(true);
      onInteraction({ 'k-selected': true });
    }
    setSelectedParam(param);
  };

  // Generate parabola points using vertex form: y = a(x-h)² + k
  const generatePoints = (a: number, h: number, k: number) => {
    const points = [];
    const { xRange, yOffset, yScale } = config.visualization.grid;
    for (let x = xRange[0]; x <= xRange[1]; x += 3) {
      const y = a * Math.pow(x - h, 2) + k;
      const screenX = x * 2.5 + 200;
      const screenY = yOffset - y * yScale;
      points.push(`${screenX},${screenY}`);
    }
    return points.join(' ');
  };

  const updateParameter = (option: string) => {
    const value = config.params.options[selectedParam][option as keyof typeof config.params.options.a];
    if (selectedParam === 'a') setAValue(value);
    if (selectedParam === 'h') setHValue(value);
    if (selectedParam === 'k') setKValue(value);
  };

  const getCurrentParamValue = (): number => {
    if (selectedParam === 'a') return aValue;
    if (selectedParam === 'h') return hValue;
    return kValue; // For selectedParam === 'k'
  };
  // Helper function to get button color based on parameter and selection
  const getButtonColor = (option: string): string => {
    const value = config.params.options[selectedParam][option as keyof typeof config.params.options.a];
    const isSelected = getCurrentParamValue() === value;
    if (isSelected) {
      if (selectedParam === 'a') return 'bg-[#8200C3] text-white';
      if (selectedParam === 'h') return 'bg-[#005F20] text-white';
      if (selectedParam === 'k') return 'bg-[#0055B2] text-white';
    }
    return 'bg-slate-700 text-slate-300 hover:bg-slate-600';
  };
  const equation = `y = ${aValue}(x - ${hValue})² + ${kValue}`;
  return (
    <div className="w-full h-screen max-h-screen p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden mt-[-20px] rounded-lg shadow-lg">
      {/* Inject slider styles */}
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />

      {/* Header */}
      <div className="text-center mb-4">
        <span className="sr-only">{t('scenes.S9.S9_D0_FCH1_C9.vertex_form_formula_ariaLabel')}</span>
        <h2 className="text-xl font-bold mb-1">
          {t(config.title)}
          <em style={{ color: '#FF5A7A', fontFamily: 'besley' }}>y</em> ={' '}
          <em style={{ color: '#D1A9F7', fontFamily: 'besley' }}>a</em>(
          <em style={{ color: '#7EC3FF', fontFamily: 'besley' }}>x</em> -
          <em style={{ color: '#FF8FC1', fontFamily: 'besley' }}>h</em>)<sup>2</sup> +{' '}
          <em style={{ color: '#7FFFA1', fontFamily: 'besley' }}>k</em>
        </h2>
        <p className="text-base text-slate-300">{t(config.subtitle)}</p>
      </div>

      <div className="flex h-[calc(100vh-120px)] gap-4">
        {/* Left Panel - Controls */}
        <div className="w-80 bg-slate-800 p-4 rounded-lg flex flex-col">
          <h3 className="text-lg font-semibold mb-3">{t(config.ui.parametersTitle)}</h3>
          {/* Parameter Tabs */}
          <div className="flex bg-slate-700 rounded-lg p-1 mb-4">
            {['a', 'h', 'k'].map((param) => (
              <button
                key={param}
                onClick={() => handleParamSelection(param as ParamKey)}
                className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                  selectedParam === param ? 'bg-[#8200C3] text-white shadow-lg' : 'text-slate-300 hover:text-white'
                }`}
              >
                {param}
              </button>
            ))}
          </div>{' '}
          {/* Current Parameter Info */}
          <div className="bg-slate-700 p-3 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">{t(config.params.descriptions[selectedParam].label)}</h4>
            <p className="text-base text-slate-300 mb-2">
              {t(config.params.descriptions[selectedParam].description)}
            </p>
            <p className="text-base text-slate-300">
              {t(config.ui.currentValueLabel)}{' '}
              <span className="font-mono text-white">{getCurrentParamValue()}</span>
            </p>

            {/* Custom Value Slider */}
            <div className="bg-slate-700 p-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400 w-8">{getSliderConfig(selectedParam).min}</span>
                <input
                  type="range"
                  min={getSliderConfig(selectedParam).min}
                  max={getSliderConfig(selectedParam).max}
                  step={getSliderConfig(selectedParam).step}
                  value={getCurrentParamValue()}
                  onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-slate-400 w-8">{getSliderConfig(selectedParam).max}</span>
              </div>
            </div>
          </div>
          {/* Value Options - In a 2x4 grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 min-h-[160px] h-[40%] overflow-y-auto">
            {Object.keys(config.params.options[selectedParam]).map((optionKey) => (
              <button
                key={optionKey}
                onClick={() => updateParameter(optionKey)}
                className={`p-2 rounded-lg transition-all text-base ${getButtonColor(optionKey)}`}
              >
                {selectedParam} ={' '}
                {config.params.options[selectedParam][optionKey as keyof typeof config.params.options.a]}
              </button>
            ))}
          </div>{' '}
          {/* Current Equation & Vertex */}
          <div className="space-y-3 mt-auto">
            <div className="p-3 bg-slate-700 rounded-lg">
              <h4 className="text-base font-semibold text-slate-400 mb-1">{t(config.ui.currentEquationLabel)}</h4>
              <p className="font-mono text-base text-white">{equation}</p>
            </div>
            <div className="p-3 bg-purple-700/30 rounded-lg border border-purple-500/30">
              <h4 className="text-base font-semibold text-purple-300 mb-1">{t(config.ui.vertexLabel)}</h4>
              <p className="font-mono text-base text-white">
                ({hValue}, {kValue})
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Visualization */}
        <div className="flex-1 bg-slate-800 p-4 rounded-lg flex flex-col">
          <h3 className="text-lg font-semibold mb-3">{t(config.visualization.title)}</h3>
          <div className="flex-1 flex items-center justify-center">
            {' '}
            <svg
              width={config.visualization.grid.width}
              height={config.visualization.grid.height}
              className="border border-slate-600 bg-black rounded-lg"
            >
              {/* Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Axes */}
              <line
                x1="0"
                y1={config.visualization.grid.yOffset}
                x2={config.visualization.grid.width}
                y2={config.visualization.grid.yOffset}
                stroke="#6B7280"
                strokeWidth="2"
              />
              <line
                x1="200"
                y1="0"
                x2="200"
                y2={config.visualization.grid.height}
                stroke="#6B7280"
                strokeWidth="2"
              />

              {/* Axis labels */}
              <text x="430" y="175" fill="#9CA3AF" fontSize="12" fontWeight="bold">
                x
              </text>
              <text x="205" y="15" fill="#9CA3AF" fontSize="12" fontWeight="bold">
                y
              </text>

              {/* Origin */}
              <circle cx="200" cy={config.visualization.grid.yOffset} r="3" fill="#F59E0B" />
              <text
                x="205"
                y={config.visualization.grid.yOffset - 5}
                fill="#F59E0B"
                fontSize="12"
                fontWeight="bold"
              >
                {t(config.visualization.labels.origin)}
              </text>

              {/* Vertex point and guidelines */}
              <circle
                cx={200 + hValue * 2.5}
                cy={config.visualization.grid.yOffset - kValue * config.visualization.grid.yScale}
                r="6"
                fill="#10B981"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={205 + hValue * 2.5}
                y={config.visualization.grid.yOffset - kValue * config.visualization.grid.yScale - 5}
                fill="white"
                fontSize="11"
                fontWeight="bold"
              >
                {' '}
                {t(config.visualization.labels.vertex)}
              </text>

              {/* Vertex guidelines */}
              <line
                x1={200 + hValue * 2.5}
                y1="0"
                x2={200 + hValue * 2.5}
                y2={config.visualization.grid.height}
                stroke="#10B981"
                strokeWidth="1"
                strokeDasharray="5,5"
                opacity="0.6"
              />
              <line
                x1="0"
                y1={config.visualization.grid.yOffset - kValue * config.visualization.grid.yScale}
                x2={config.visualization.grid.width}
                y2={config.visualization.grid.yOffset - kValue * config.visualization.grid.yScale}
                stroke="#10B981"
                strokeWidth="1"
                strokeDasharray="5,5"
                opacity="0.6"
              />

              {/* Parabola */}
              <polyline
                points={generatePoints(aValue, hValue, kValue)}
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
              />
            </svg>
          </div>{' '}
          {/* Parameter Effects - Horizontal Layout */}
          <div className="flex gap-3 mt-3">
            <div
              className={`flex-1 p-2 rounded-lg border-l-4 ${selectedParam === 'a' ? 'bg-purple-700/30 border-purple-400' : 'bg-slate-700/50 border-slate-600'}`}
            >
              <p className="font-semibold text-purple-300">a = {aValue}</p>
              <p className="text-base text-slate-300">
                {aValue > 0 ? t(config.ui.opensUpText) : t(config.ui.opensDownText)} •
                {Math.abs(aValue) > 0.05 ? ' ' + t(config.ui.narrowText) : ' ' + t(config.ui.wideText)}
              </p>
            </div>
            <div
              className={`flex-1 p-2 rounded-lg border-l-4 ${selectedParam === 'h' ? 'bg-purple-700/30 border-purple-400' : 'bg-slate-700/50 border-slate-600'}`}
            >
              <p className="font-semibold text-green-400">h = {hValue}</p>
              <p className="text-base text-slate-300">{hValue > 0 ? 'Right' : hValue < 0 ? 'Left' : 'Center'}</p>
            </div>
            <div
              className={`flex-1 p-2 rounded-lg border-l-4 ${selectedParam === 'k' ? 'bg-purple-700/30 border-purple-400' : 'bg-slate-700/50 border-slate-600'}`}
            >
              <p className="font-semibold text-cyan-400">k = {kValue}</p>
              <p className="text-base text-slate-300">
                {kValue > 0 ? 'Above axis' : kValue < 0 ? 'Below axis' : 'On axis'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VertexFormInteractive;
