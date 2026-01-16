// Matrix multiplication 2x2 interactive config
// This is a placeholder config - the actual interactive component needs to be built

export interface MatrixMultiplyConfig {
  type: 'matrix-calculator';
  matrixA: number[][];
  matrixB: number[][];
  showSteps: boolean;
}

const config: MatrixMultiplyConfig = {
  type: 'matrix-calculator',
  matrixA: [
    [1, 2],
    [3, 4]
  ],
  matrixB: [
    [5, 6],
    [7, 8]
  ],
  showSteps: true
};

export default config;
