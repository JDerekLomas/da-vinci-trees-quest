import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: 'scenes.growth_calculation.interaction_1.title',
  type: 'exponential-function',
  ariaLabel: 'scenes.growth_calculation.interaction_1.aria_label',
  fill_in_the_blank_config: {
    subtitle: 'scenes.growth_calculation.interaction_1.subtitle',
    equation: `<div style='font-family: besley; font-size: 40px; font-style: italic; font-weight: 600; line-height: 60px; text-align: left'>
    <div role="text" aria-label="N of t equals 100 multiplied by 2 to the power of t" style="display: inline">
      <span style='color: #A6001A' aria-hidden="true">N(t)</span>
      <span aria-hidden="true"> = </span>
      <span style='color: #0055B2' aria-hidden="true">100</span>
      <span aria-hidden="true">•</span>
      <span style='color: #9F008F' aria-hidden="true">2</span>
      <sup style='color: #005F20' aria-hidden="true">t</sup>
    </div>
  </div>`,

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
