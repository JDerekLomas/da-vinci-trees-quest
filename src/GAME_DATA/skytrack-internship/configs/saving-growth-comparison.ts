import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  inputs: [
    {
      id: 'monthly_contribution',
      type: 'slider',
      title: 'scenes.S7.S7_D0_F20_C10.slider.monthly_contribution',
      titleColor: '#008217',
      label: 'scenes.S7.S7_D0_F20_C10.slider.monthly_contribution',
      sliderConfig: {
        min: 0,
        max: 2500,
        step: 100,
        defaultValue: 1200,
      },
    },
    {
      id: 'initial_savings',
      type: 'slider',
      title: 'scenes.S7.S7_D0_F20_C10.slider.initial_savings',
      titleColor: '#DB0072',
      label: 'scenes.S7.S7_D0_F20_C10.slider.initial_savings',
      sliderConfig: {
        min: 0,
        max: 6000,
        step: 100,
        defaultValue: 500,
      },
    },
  ],
  formulas: [
    {
      displayFormula: (inputValues?: Record<string, number> | null, translations?: Record<string, string>) => {
        if (!inputValues) return null;

        const t = (key: string) => translations?.[key] || key;
        const monthlyContribution = inputValues['monthly_contribution'] || 0;
        const oldSavingsPlan = 1500;
        const initialSavings = inputValues['initial_savings'] || 0;

        return `
                    <div class="mb-3 space-y-2 text-gray-900 text-[16px]">
                     <div className="text-[16px] font-bold">
                            ${t('scenes.S7.S7_D0_F20_C10.formula.new_saving_formula')}
                            <span class="text-[#E0002B] font-besley italic">y</span> = 
                            <span class="text-[#008217] font-besley">${monthlyContribution}</span> <span class="text-[#0061FC] font-besley italic">x</span> + 
                            <span class="text-[#DB0072] font-besley">${initialSavings}</span>
                        </div>
                        <div className="text-[16px] font-bold">
                            ${t('scenes.S7.S7_D0_F20_C10.formula.old_saving_formula')}
                            <span class="text-[#E0002B] font-besley italic">y</span> = 
                            <span class="text-[#008217] font-besley">${oldSavingsPlan}</span> <span class="text-[#0061FC] font-besley italic">x</span>
                        </div>
                        <div class="text-gray-600">
                            ${t('scenes.S7.S7_D0_F20_C10.formula.where')}:
                            <ul class="list-disc ml-6">
                                <li>
                                    <span class="text-[#0061FC] font-besley italic">x</span> 
                                    ${t('scenes.S7.S7_D0_F20_C10.formula.month')}
                                </li>
                                <li>
                                    <span class="text-[#E0002B] font-besley italic">y</span> 
                                    ${t('scenes.S7.S7_D0_F20_C10.formula.in_dollar')}
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
      },
    },
  ],
  graphConfig: {
    ariaLabel: 'scenes.S7.S7_D0_F20_C10.header.title',
    x: {
      label: 'scenes.S7.S7_D0_F20_C10.graph.x_axis_label',
      min: 0,
      max: 12,
      steps: 1,
      tooltipLabel: 'scenes.S7.S7_D0_F20_C10.graph.tooltip.month',
      tooltipLabelValue: 'month',
    },
    y: {
      label: 'scenes.S7.S7_D0_F20_C10.graph.y_axis_label',
      ticks: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000],
    },
    lines: [
      {
        dataKey: 'newSavings',
        stroke: '#005F20',
        name: 'scenes.S7.S7_D0_F20_C10.graph.lines.new_savings',
        tooltipLabel: 'scenes.S7.S7_D0_F20_C10.graph.tooltip.new_savings',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues) return 0;
          const monthlyContribution = inputValues['monthly_contribution'] || 0;
          const initialSavings = inputValues['initial_savings'] || 0;
          return monthlyContribution * xValue + initialSavings;
        },
      },
      {
        dataKey: 'oldSavings',
        stroke: '#00749D',
        name: 'scenes.S7.S7_D0_F20_C10.graph.lines.old_savings',
        tooltipLabel: 'scenes.S7.S7_D0_F20_C10.graph.tooltip.old_savings',
        calculateYValue: (xValue: number) => {
          return 1500 * xValue;
        },
      },
      {
        dataKey: 'goal',
        stroke: '#8E24AA',
        name: 'scenes.S7.S7_D0_F20_C10.graph.lines.goal',
        tooltipLabel: 'scenes.S7.S7_D0_F20_C10.graph.tooltip.goal',
        calculateYValue: () => 10000,
      },
    ],
    showLegend: true,
    height: 320,
  },
};

export default interaction;
