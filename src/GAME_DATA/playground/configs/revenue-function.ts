import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  type: 'revenue-function-generator',
  ariaLabel: 'scenes.understanding-revenue-functions.revenue_function_generator_interaction.aria_label',
  inputs: [
    {
      id: 'sellingPrice',
      label: 'scenes.understanding-revenue-functions.revenue_function_generator_interaction.inputs.selling_price',
      type: 'slider',
      min: 0,
      max: 50,
      step: 0.5,
      defaultValue: 0,
    },
    {
      id: 'x',
      label:
        'scenes.understanding-revenue-functions.revenue_function_generator_interaction.inputs.number_of_t_shirts',
      type: 'number',
      min: 0,
      max: 1000,
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
        'scenes.understanding-revenue-functions.revenue_function_generator_interaction.graph_config.number_of_t_shirts',
    },
    y: {
      min: 0,
      max: 8000,
      label: 'scenes.understanding-revenue-functions.revenue_function_generator_interaction.graph_config.revenue',
    },
  },
  formulas: {
    totalRevenue: (x: number, inputs) => inputs.sellingPrice * x,
  },
  labels: {
    totalRevenue:
      'scenes.understanding-revenue-functions.revenue_function_generator_interaction.labels.total_revenue',
    calculation_result:
      'scenes.understanding-revenue-functions.revenue_function_generator_interaction.labels.calculation_result',
    x_units_y_dollars_label:
      'scenes.understanding-revenue-functions.revenue_function_generator_interaction.labels.x_units_y_dollars_label',
  },
  displayFormulas: [
    {
      label:
        'scenes.understanding-revenue-functions.revenue_function_generator_interaction.display_formulas.revenue_function',
      formula: (inputs) => `R(x) = ${inputs.sellingPrice}x`,
    },
  ],
};

export default interaction;
