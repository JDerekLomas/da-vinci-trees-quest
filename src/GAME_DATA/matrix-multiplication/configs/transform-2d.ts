// Transformation visualizer config
// This is a placeholder config - the actual interactive component needs to be built

export interface TransformConfig {
  type: 'transformation-visualizer';
  initialShape: 'square' | 'triangle';
  showGrid: boolean;
  allowRotation: boolean;
  allowScaling: boolean;
}

const config: TransformConfig = {
  type: 'transformation-visualizer',
  initialShape: 'square',
  showGrid: true,
  allowRotation: true,
  allowScaling: true
};

export default config;
