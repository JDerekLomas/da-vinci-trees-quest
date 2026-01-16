import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  type: 'break-even-analysis',
  ariaLabel: 'scenes.break-even-analyzer.break_even_analysis_interaction.aria_label',
  inputs: [
    {
      id: 'equipmentCost',
      label: 'scenes.break-even-analyzer.break_even_analysis_interaction.inputs.equipment_cost',
      type: 'slider',
      min: 0,
      max: 1500,
      step: 50,
      defaultValue: 0,
    },
    {
      id: 'materialCost',
      label: 'scenes.break-even-analyzer.break_even_analysis_interaction.inputs.material_cost',
      type: 'slider',
      min: 0,
      max: 20,
      step: 0.5,
      defaultValue: 0,
    },
    {
      id: 'sellingPrice',
      label: 'scenes.break-even-analyzer.break_even_analysis_interaction.inputs.selling_price',
      type: 'slider',
      min: 0,
      max: 30,
      step: 0.5,
      defaultValue: 0,
    },
  ],
  graph_config: {
    x: {
      min: 0,
      max: 100,
      step: 5,
      label: 'scenes.break-even-analyzer.break_even_analysis_interaction.graph_config.number_of_t_shirts',
    },
    y: {
      min: 0,
      max: 3000,
      label: 'scenes.break-even-analyzer.break_even_analysis_interaction.graph_config.amount',
    },
  },
  formulas: {
    totalCost: (x, inputs) => inputs.equipmentCost + inputs.materialCost * x,
    totalRevenue: (x, inputs) => inputs.sellingPrice * x,
  },
  intersectionFormulas: [
    {
      formula1: 'totalCost',
      formula2: 'totalRevenue',
      solveForX: (inputs) => {
        const { equipmentCost, materialCost, sellingPrice } = inputs;
        return sellingPrice !== materialCost ? equipmentCost / (sellingPrice - materialCost) : null;
      },
    },
  ],
  labels: {
    totalCost: 'scenes.break-even-analyzer.break_even_analysis_interaction.labels.total_cost',
    totalRevenue: 'scenes.break-even-analyzer.break_even_analysis_interaction.labels.total_revenue',
    calculation_result: 'scenes.common.calculation_result',
    x_units_y_dollars_label: 'scenes.common.x_units_y_dollars_label',
  },
  displayFormulas: [
    {
      label: 'scenes.break-even-analyzer.break_even_analysis_interaction.display_formulas.cost_equation',
      formula: (inputs) => `<em>C</em> (<em>x</em>) = ${inputs.materialCost}<em>x</em> + ${inputs.equipmentCost}`,
    },
    {
      label: 'scenes.break-even-analyzer.break_even_analysis_interaction.display_formulas.revenue_equation',
      formula: (inputs) => `<em>R</em> (<em>x</em>) = ${inputs.sellingPrice}<em>x</em>`,
    },
  ],
  hideCalculationResult: true,
};

export default interaction;
