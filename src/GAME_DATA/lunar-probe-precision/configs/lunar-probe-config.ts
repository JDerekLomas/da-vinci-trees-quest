import { LunarProbeInteraction } from '../interactives/interface';

const interaction: LunarProbeInteraction = {
  title: 'Lunar Probe Launch Simulation',
  type: 'lunar-probe',
  ariaLabel: 'Interactive lunar probe launch simulation',
  inputs: [
    {
      id: 'velocity',
      type: 'slider',
      label: 'scenes.S5.S5_D0_FSQ4_C9.initial_velocity',
      min: 5,
      max: 20,
      step: 0.1,
      defaultValue: 10,
      unit: 'scenes.S5.S5_D0_FSQ4_C9.velocity_unit',
    },
    {
      id: 'angle',
      type: 'slider',
      label: 'scenes.S5.S5_D0_FSQ4_C9.launch_angle',
      min: 0,
      max: 90,
      step: 1,
      defaultValue: 25,
      unit: 'scenes.S5.S5_D0_FSQ4_C9.degrees_unit',
    },
  ],
  graphConfig: {
    ariaLabel: 'Launch trajectory visualization',
    x: {
      label: 'scenes.S5.S5_D0_FSQ4_C9.graph.xAxisLabel',
      min: 0,
      max: 90,
      steps: 10,
    },
    y: {
      label: 'scenes.S5.S5_D0_FSQ4_C9.graph.yAxisLabel',
      min: 0,
      max: 45,
    },
    visualization: {
      width: 800,
      height: 400,
      background: '#0F172A',
      trajectory: {
        stroke: '#60A5FA',
        strokeWidth: 2,
        hintOpacity: 0.3,
        fullOpacity: 0.6,
      },
    },
  },
  environment: {
    gravity: 5.35,
    target: {
      x: 50,
      y: 0,
      radius: 2,
      color: {
        default: '#EF4444',
        hit: '#4ADE80',
      },
    },
    grid: {
      lines: 10,
      spacing: 5,
      color: '#1E293B',
    },
    stars: {
      count: 100,
      minSize: 0.5,
      maxSize: 1,
      minOpacity: 0.5,
      maxOpacity: 1,
    },
  },
  labels: {
    reset: 'scenes.S5.S5_D0_FSQ4_C9.reset',
    launch: 'scenes.S5.S5_D0_FSQ4_C9.launch',
    launching: 'scenes.S5.S5_D0_FSQ4_C9.launching',
    targetHit: 'scenes.S5.S5_D0_FSQ4_C9.target_hit',
    targetPosition: 'scenes.S5.S5_D0_FSQ4_C9.target_position',
    adjustControls: 'scenes.S5.S5_D0_FSQ4_C9.adjust_slider',
    hit: 'scenes.S5.S5_D0_FSQ4_C9.hit',
    miss: 'scenes.S5.S5_D0_FSQ4_C9.miss'
  },
};

export default interaction;
