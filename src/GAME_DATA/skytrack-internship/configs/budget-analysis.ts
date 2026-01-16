import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  inputs: [
    {
      id: 'rent',
      type: 'slider',
      title: 'scenes.S6.S6_D0_F19_C9.slider.rent',
      titleColor: '#633300',
      label: 'scenes.S6.S6_D0_F19_C9.slider.rent',
      sliderConfig: {
        min: 500,
        max: 2500,
        step: 100,
        defaultValue: 1500,
      },
    },
  ],
  formulas: [
    {
      displayFormula: (inputValues?: Record<string, number> | null, translations?: Record<string, string>) => {
        if (!inputValues) return null;

        const t = (key: string) => translations?.[key] || key;
        const monthlyStipend = 4000;
        const rent = inputValues['rent'] || 0;
        const food = 700;
        const transport = 300;
        const expenses = rent + food + transport;
        const currentSavings = monthlyStipend - expenses;

        return `
                <div class="mb-3 space-y-2 text-gray-900 text-[16px]">
                    <div className="text-[16px] font-bold">
                        ${t('scenes.S6.S6_D0_F19_C9.formula.new_saving_formula')}
                        <span class="text-[#E0002B] font-besley italic">y</span> = 
                        <span class="text-[#008217] font-besley">${currentSavings}</span><span class="text-[#0061FC] font-besley italic"> x</span>
                    </div>
                    <div className="text-[16px] font-bold">
                        ${t('scenes.S6.S6_D0_F19_C9.formula.previous_saving_formula')}
                        <span class="text-[#E0002B] font-besley italic">y</span> = 
                        <span class="text-[#008217] font-besley">1500</span><span class="text-[#0061FC] font-besley italic"> x</span>
                    </div>
                    <div class="text-gray-600">
                        ${t('scenes.S6.S6_D0_F19_C9.formula.where')}:
                        <ul class="list-disc ml-6">
                            <li>
                                <span class="text-[#0061FC] font-besley italic">x</span> 
                                ${t('scenes.S6.S6_D0_F19_C9.formula.month')}
                            </li>
                            <li>
                                <span class="text-[#E0002B] font-besley italic">y</span> 
                                ${t('scenes.S6.S6_D0_F19_C9.formula.in_dollar')}
                            </li>
                            <li>
                            <span class="text-[#008217] font-besley">${currentSavings}</span>
                            ${t('scenes.S6.S6_D0_F19_C9.formula.monthly_stipend')} ($${monthlyStipend}) ${t('scenes.S6.S6_D0_F19_C9.formula.expenses')} ($${expenses})
                        </li>
                        </ul>
                    </div>
                </div>
              `;
      },
    },
  ],
  graphConfig: {
    ariaLabel: 'scenes.S6.S6_D0_F19_C9.header.title',
    x: {
      label: 'scenes.S6.S6_D0_F19_C9.graph.x_axis_label',
      min: 0,
      max: 12,
      steps: 1,
      tooltipLabel: 'scenes.S6.S6_D0_F19_C9.graph.tooltip.month',
      tooltipLabelValue: 'month',
    },
    y: {
      label: 'scenes.S6.S6_D0_F19_C9.graph.y_axis_label',
      ticks: [4000, 8000, 12000, 16000, 20000, 24000, 28000, 32000],
    },
    lines: [
      {
        dataKey: 'currentPlan',
        stroke: '#005F20',
        name: 'scenes.S6.S6_D0_F19_C9.graph.lines.new_savings',
        tooltipLabel: 'scenes.S6.S6_D0_F19_C9.graph.tooltip.new_savings',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues) return 0;
          const rent = inputValues['rent'] || 0;
          const food = 700;
          const transport = 300;
          const monthlyStipend = 4000;
          const currentSavings = monthlyStipend - rent - food - transport;
          return currentSavings * xValue;
        },
      },
      {
        dataKey: 'previousPlan',
        stroke: '#00749D',
        name: 'scenes.S6.S6_D0_F19_C9.graph.lines.previous_savings',
        tooltipLabel: 'scenes.S6.S6_D0_F19_C9.graph.tooltip.previous_savings',
        calculateYValue: (xValue: number) => 1500 * xValue,
      },
      {
        dataKey: 'goal',
        stroke: '#8E24AA',
        name: 'scenes.S6.S6_D0_F19_C9.graph.lines.goal',
        tooltipLabel: 'scenes.S6.S6_D0_F19_C9.graph.tooltip.goal',
        calculateYValue: () => 10000,
      },
    ],
    showLegend: true,
  },
};

export default interaction;
