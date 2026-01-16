import React, { useState } from 'react';
import { InteractionState } from './interface';

interface MatrixCalculatorProps {
  interaction: {
    matrixA?: number[][];
    matrixB?: number[][];
    showSteps?: boolean;
  };
  onInteraction: (state: InteractionState) => void;
}

const MatrixCalculator: React.FC<MatrixCalculatorProps> = ({ interaction }) => {
  const matrixA = interaction.matrixA || [[1, 2], [3, 4]];
  const matrixB = interaction.matrixB || [[5, 6], [7, 8]];

  const [highlightedCell, setHighlightedCell] = useState<{row: number, col: number} | null>(null);

  // Calculate result matrix
  const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
    const result: number[][] = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  };

  const resultMatrix = multiplyMatrices(matrixA, matrixB);

  const renderMatrix = (matrix: number[][], label: string, highlight?: 'row' | 'col', highlightIndex?: number) => (
    <div className="flex flex-col items-center mx-2">
      <div className="text-sm font-semibold mb-2 text-gray-600">{label}</div>
      <div className="flex items-center">
        <div className="text-3xl font-light text-gray-400 mr-1">[</div>
        <div className="flex flex-col">
          {matrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((val, j) => (
                <div
                  key={j}
                  className={`w-12 h-12 flex items-center justify-center text-lg font-medium border border-gray-200 m-0.5 rounded transition-all duration-300
                    ${highlight === 'row' && highlightIndex === i ? 'bg-red-100 border-red-400 text-red-700' : ''}
                    ${highlight === 'col' && highlightIndex === j ? 'bg-blue-100 border-blue-400 text-blue-700' : ''}
                  `}
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-3xl font-light text-gray-400 ml-1">]</div>
      </div>
    </div>
  );

  const renderResultMatrix = (matrix: number[][]) => (
    <div className="flex flex-col items-center mx-2">
      <div className="text-sm font-semibold mb-2 text-gray-600">Result</div>
      <div className="flex items-center">
        <div className="text-3xl font-light text-gray-400 mr-1">[</div>
        <div className="flex flex-col">
          {matrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((val, j) => (
                <div
                  key={j}
                  className={`w-12 h-12 flex items-center justify-center text-lg font-bold border-2 m-0.5 rounded transition-all duration-300 cursor-pointer
                    ${highlightedCell?.row === i && highlightedCell?.col === j
                      ? 'bg-purple-100 border-purple-500 text-purple-700 scale-110'
                      : 'border-gray-300 bg-white hover:bg-gray-50'}
                  `}
                  onMouseEnter={() => setHighlightedCell({row: i, col: j})}
                  onMouseLeave={() => setHighlightedCell(null)}
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-3xl font-light text-gray-400 ml-1">]</div>
      </div>
    </div>
  );

  const getCalculationString = () => {
    if (!highlightedCell) return null;
    const { row, col } = highlightedCell;
    const terms = matrixA[row].map((val, k) => `${val} × ${matrixB[k][col]}`).join(' + ');
    const products = matrixA[row].map((val, k) => val * matrixB[k][col]).join(' + ');
    return (
      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
        <div className="text-sm text-gray-600 mb-1">
          Row {row + 1} × Column {col + 1}
        </div>
        <div className="font-mono text-lg">
          {terms} = {products} = <span className="font-bold text-purple-700">{resultMatrix[row][col]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {renderMatrix(matrixA, 'Matrix A', highlightedCell ? 'row' : undefined, highlightedCell?.row)}
        <div className="text-2xl font-light text-gray-400 mx-2">×</div>
        {renderMatrix(matrixB, 'Matrix B', highlightedCell ? 'col' : undefined, highlightedCell?.col)}
        <div className="text-2xl font-light text-gray-400 mx-2">=</div>
        {renderResultMatrix(resultMatrix)}
      </div>

      <div className="min-h-[60px]">
        {highlightedCell ? getCalculationString() : (
          <div className="text-center text-gray-500 p-3">
            Hover over a result cell to see how it&apos;s calculated
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixCalculator;
