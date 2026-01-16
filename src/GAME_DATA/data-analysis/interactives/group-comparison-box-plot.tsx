import React, { useEffect, useState } from 'react';

interface BoxplotStats {
  q1: number;
  median: number;
  q3: number;
  whiskerMin: number;
  whiskerMax: number;
  outliers: number[];
  mean: number;
}

interface BoxplotProps {
  x: number;
  stats: BoxplotStats;
  color: string;
  label: string;
  statsLabelColor: string;
}

const GroupComparisonBoxPlot: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Auto-animate on component mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Generate normally distributed data - using fixed seed for consistent values
  const generateData = (
    mean: number,
    stdDev: number,
    n: number,
    min: number,
    max: number,
    seed = 42,
  ): number[] => {
    const data: number[] = [];
    let currentSeed = seed;

    // Simple seeded random number generator
    const seededRandom = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };

    for (let i = 0; i < n; i++) {
      const u1 = seededRandom();
      const u2 = seededRandom();
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      let value = mean + z0 * stdDev;
      value = Math.max(min, Math.min(max, value));
      data.push(value);
    }
    return data.sort((a, b) => a - b);
  };

  // Use fixed seeds to ensure consistent data
  const placeboData = generateData(4, 1.5, 40, 0, 8, 42);
  const neuroBoostData = generateData(9, 2, 40, 4, 14, 123);

  const calculateBoxplotStats = (data: number[]): BoxplotStats => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    const q1 = sorted[Math.floor(n * 0.25)];
    const median = sorted[Math.floor(n * 0.5)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    const whiskerMin = sorted.find((v) => v >= lowerFence) || sorted[0];
    const whiskerMax = [...sorted].reverse().find((v) => v <= upperFence) || sorted[0];
    const outliers = data.filter((v) => v < lowerFence || v > upperFence);
    const mean = data.reduce((a, b) => a + b, 0) / n;
    return { q1, median, q3, whiskerMin, whiskerMax, outliers, mean };
  };

  const placeboStats = calculateBoxplotStats(placeboData);
  const neuroBoostStats = calculateBoxplotStats(neuroBoostData);

  // Shared chart dimensions and scaling
  const height = 450;
  const margin = { top: 40, right: 40, bottom: 60, left: 80 };
  const chartHeight = height - margin.top - margin.bottom;
  const yScale = (value: number) => chartHeight - (value / 16) * chartHeight;

  const Boxplot: React.FC<BoxplotProps> = ({ x, stats, color, label, statsLabelColor }) => {
    const boxWidth = 80;
    const animationScale = animated ? 1 : 0;

    return (
      <g>
        <line
          x1={x + boxWidth / 2}
          y1={yScale(stats.whiskerMax)}
          x2={x + boxWidth / 2}
          y2={yScale(stats.q3)}
          stroke="#666"
          strokeWidth="2"
        />
        <line
          x1={x + boxWidth / 2}
          y1={yScale(stats.whiskerMin)}
          x2={x + boxWidth / 2}
          y2={yScale(stats.q1)}
          stroke="#666"
          strokeWidth="2"
        />
        <line
          x1={x + boxWidth * 0.3}
          y1={yScale(stats.whiskerMax)}
          x2={x + boxWidth * 0.7}
          y2={yScale(stats.whiskerMax)}
          stroke="#666"
          strokeWidth="2"
        />
        <line
          x1={x + boxWidth * 0.3}
          y1={yScale(stats.whiskerMin)}
          x2={x + boxWidth * 0.7}
          y2={yScale(stats.whiskerMin)}
          stroke="#666"
          strokeWidth="2"
        />
        <rect
          x={x}
          y={yScale(stats.q3)}
          width={boxWidth}
          height={(yScale(stats.q1) - yScale(stats.q3)) * animationScale}
          fill={color}
          stroke="#333"
          strokeWidth="2"
          opacity="0.8"
          style={{ transition: 'all 0.8s ease-out' }}
        />
        <line
          x1={x}
          y1={yScale(stats.median)}
          x2={x + boxWidth}
          y2={yScale(stats.median)}
          stroke="#1a1a1a"
          strokeWidth="3"
        />
        <circle cx={x + boxWidth / 2} cy={yScale(stats.mean)} r="4" fill="white" stroke="#333" strokeWidth="2" />
        {stats.outliers.map((outlier, i) => (
          <circle
            key={i}
            cx={x + boxWidth / 2 + (Math.random() - 0.5) * 20}
            cy={yScale(outlier)}
            r="3"
            fill={color}
            opacity="0.6"
          />
        ))}
        <text
          x={x + boxWidth / 2}
          y={yScale(stats.median) - 10}
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={statsLabelColor}
        >
          {stats.median.toFixed(1)}%
        </text>
        <text
          x={x + boxWidth / 2}
          y={chartHeight + 35}
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          fill="#333"
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <svg width={700} height={450} className="mx-auto">
          <g transform="translate(80, 40)">
            {[0, 2, 4, 6, 8, 10, 12, 14, 16].map((tick) => (
              <g key={tick}>
                <line
                  x1={0}
                  y1={yScale(tick)}
                  x2={540}
                  y2={yScale(tick)}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x={-10}
                  y={yScale(tick)}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {tick}%
                </text>
              </g>
            ))}
            <line x1={0} y1={yScale(0)} x2={540} y2={yScale(0)} stroke="#333" strokeWidth="2" />
            <line x1={0} y1={yScale(0)} x2={0} y2={yScale(16)} stroke="#333" strokeWidth="2" />
            <text
              x={-50}
              y={yScale(9)}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#333"
              transform="rotate(-90, -50, 150)"
            >
              Percentage Improvement
            </text>
            <Boxplot x={135} stats={placeboStats} color="#DB0072" label="Placebo" statsLabelColor="#fff" />
            <Boxplot
              x={405}
              stats={neuroBoostStats}
              color="#10b981"
              label="NeuroBoost"
              statsLabelColor="#1a1a1a"
            />
            {animated && showComparison && (
              <g>
                <line
                  x1={175}
                  y1={yScale(placeboStats.median)}
                  x2={445}
                  y2={yScale(neuroBoostStats.median)}
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <text x={310} y={yScale(7) - 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#f59e0b">
                  ~5% Difference
                </text>
              </g>
            )}
          </g>
        </svg>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-slate-700" style={{ backgroundColor: '#DB0072' }}></div>
            <span className="text-sm text-slate-700">Placebo (~4%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-slate-700" style={{ backgroundColor: '#10b981' }}></div>
            <span className="text-sm text-slate-700">NeuroBoost (~9%)</span>
          </div>
        </div>
        {showComparison && (
          <div className="mt-4 w-fit mx-auto bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">
                Key Finding: The supplement shows a ~5% effect above placebo—far less than the 40% claim.
              </span>
            </p>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            {showComparison ? 'Reset' : 'Show Comparison'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupComparisonBoxPlot;
