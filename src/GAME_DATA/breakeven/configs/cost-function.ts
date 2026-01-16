import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  type: 'cost-function-calculator',
  ariaLabel: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.aria_label',
  inputs: [
    {
      id: 'perUnitCost',
      label: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.inputs.per_unit_costs',
      type: 'slider',
      min: 0,
      max: 30,
      step: 1,
      defaultValue: 0,
    },
    {
      id: 'fixedCosts',
      label: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.inputs.fixed_costs',
      type: 'slider',
      min: 0,
      max: 3000,
      step: 100,
      defaultValue: 0,
    },
    {
      id: 'x',
      label: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.inputs.number_of_t_shirts',
      type: 'number',
      min: 0,
      max: 200,
      step: 1,
      defaultValue: 0,
    },
  ],
  graph_config: {
    x: {
      min: 0,
      max: 200,
      step: 5,
      label:
        'scenes.understanding-cost-functions.cost_function_calculator_interaction.graph_config.number_of_t_shirts',
    },
    y: {
      min: 0,
      max: 5000,
      label: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.graph_config.cost',
    },
  },
  formulas: {
    totalCost: (x, inputs) => inputs.fixedCosts + inputs.perUnitCost * x,
  },
  labels: {
    totalCost: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.labels.total_cost',
    calculation_result:
      'scenes.understanding-cost-functions.cost_function_calculator_interaction.labels.calculation_result',
    x_units_y_dollars_label:
      'scenes.understanding-cost-functions.cost_function_calculator_interaction.labels.x_units_y_dollars_label',
  },
  displayFormulas: [
    {
      label:
        'scenes.understanding-cost-functions.cost_function_calculator_interaction.display_formulas.cost_function',
      formula: (inputs) => `<em>C</em> (<em>x</em>) = ${inputs.perUnitCost}<em>x</em> + ${inputs.fixedCosts}`,
    },
  ],
};

export default interaction;
