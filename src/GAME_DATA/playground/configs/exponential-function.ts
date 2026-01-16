import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: 'scenes.growth_calculation.interaction_1.title',
  type: 'exponential-function',
  ariaLabel: 'scenes.growth_calculation.interaction_1.aria_label',
  fill_in_the_blank_config: {
    subtitle: 'scenes.growth_calculation.interaction_1.subtitle',
    equation: '\\(N(t) = 100 \\cdot 2^t\\)',
    input: {
      leftText: 'scenes.growth_calculation.interaction_1.input_left_text',
      rightText: 'scenes.growth_calculation.interaction_1.input_right_text',
      placeholder: 'scenes.growth_calculation.interaction_1.input_place_holder',
    },
    buttonText: 'scenes.growth_calculation.interaction_1.button_text',
    resultPrefix: 'scenes.growth_calculation.interaction_1.result_prefix',
    resultSuffix: 'scenes.growth_calculation.interaction_1.result_suffix',
    calculateResult: (input: string) => {
      const days = parseFloat(input);
      if (isNaN(days)) return null;
      const N0 = 100; // Initial cases
      const b = 2; // Growth factor
      return Math.round(N0 * Math.pow(b, days));
    },
  },
};

export default interaction;
