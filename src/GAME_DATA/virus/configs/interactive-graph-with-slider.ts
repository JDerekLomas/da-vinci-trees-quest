import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '', // Empty as not needed
  type: 'exponential-model-finder',
  ariaLabel: 'scenes.examine_raw_numbers.exponential_interaction.graph_config.aria_label',
  inputs: [
    {
      id: 'initialValue',
      label: 'scenes.examine_raw_numbers.exponential_interaction.inputs.initial_value',
      ariaLabel: 'scenes.examine_raw_numbers.exponential_interaction.inputs.initial_value_aria_label',
      type: 'slider',
      min: 0,
      max: 1000,
      step: 100,
      defaultValue: 500,
    },
    {
      id: 'growthFactor',
      label: 'scenes.examine_raw_numbers.exponential_interaction.inputs.growth_factor',
      ariaLabel: 'scenes.examine_raw_numbers.exponential_interaction.inputs.growth_factor_aria_label',
      type: 'slider',
      min: 0,
      max: 10,
      step: 0.1,
      defaultValue: 1.2,
    },
  ],
  graph_config: {
    x: {
      min: 0,
      max: 5,
      label: 'scenes.examine_raw_numbers.exponential_interaction.graph_config.x_label',
    },
    y: {
      min: 400,
      max: 1600,
      label: 'scenes.examine_raw_numbers.exponential_interaction.graph_config.y_label',
    },
  },
  labels: {
    title: 'scenes.examine_raw_numbers.exponential_interaction.graph_config.title',
    subtitle: 'scenes.examine_raw_numbers.exponential_interaction.graph_config.subtitle',
  },
  formulas: {
    cases: (x: number, inputValues: { [key: string]: number }) => {
      return inputValues.initialValue * Math.pow(inputValues.growthFactor, x);
    },
  },
  displayFormulas: [],
};

export default interaction;
