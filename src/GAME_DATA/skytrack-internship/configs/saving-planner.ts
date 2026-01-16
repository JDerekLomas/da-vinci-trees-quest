import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  inputs: [
    {
      id: 'monthlySavings',
      type: 'slider',
      title: 'scenes.S4.S4_D0_F10_C9.title',
      titleColor: '#008217',
      label: 'scenes.S4.S4_D0_F10_C9.labels.monthly_savings',
      sliderConfig: {
        min: 0,
        max: 4000,
        step: 100,
        defaultValue: 0,
      },
    },
  ],
  formulas: [
    {
      displayFormula: (inputValues?: Record<string, number> | null, translations?: Record<string, string>) => {
        if (!inputValues) return null;

        const t = (key: string) => translations?.[key] || key;

        return `
                    <div className="bg-gray-50 rounded-lg p-1 w-full text-[16px]">
                        <h3 className="text-[16px] font-bold mb-1">${t(
                          'scenes.S4.S4_D0_F10_C9.formula.title',
                        )}:</h3>
                        <div className="text-[16px] mb-1">
                            <span className="text-[#E0002B] font-besley italic">y</span>
                            <span> = </span>
                            <span className="text-[#008217] font-besley">${inputValues['monthlySavings']}</span
                            > <span className="text-[#0061FC] font-besley italic">x</span>
                        </div>
                        <div>
                            <h4 className="text-[16px] text-gray-700">${t(
                              'scenes.S4.S4_D0_F10_C9.formula.where',
                            )}:</h4>
                           <ul className="list-disc ml-6 space-y-1 text-m">
                                <li>
                                    <span className="text-[#E0002B] font-besley italic text-[16px]">y</span>
                                    <span className="text-gray-600 text-[16px]"> ${t(
                                      'scenes.S4.S4_D0_F10_C9.formula.total_savings',
                                    )} ($)</span>
                                </li>
                                <li>
                                    <span className="text-[#0061FC] font-besley italic text-[16px]">x</span>
                                    <span className="text-gray-600 text-[16px]"> ${t(
                                      'scenes.S4.S4_D0_F10_C9.formula.number_of_months',
                                    )}</span>
                                </li>
                                <li>
                                    <span className="text-[#008217] font-besley text-[16px]">${
                                      inputValues['monthlySavings']
                                    }</span>
                                    <span className="text-gray-600 text-[16px]"> ${t(
                                      'scenes.S4.S4_D0_F10_C9.formula.monthly_savings',
                                    )} ($/month)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
      },
    },
  ],
  graphConfig: {
    ariaLabel: 'scenes.S4.S4_D0_F10_C9.header.title',
    x: {
      label: 'scenes.S4.S4_D0_F10_C9.graph.x_axis_label',
      min: 0,
      max: 20,
      steps: 1,
      tooltipLabel: 'scenes.S4.S4_D0_F10_C9.graph.tooltip.month',
      tooltipLabelValue: 'month',
    },
    y: {
      label: 'scenes.S4.S4_D0_F10_C9.graph.y_axis_label',
    },
    lines: [
      {
        dataKey: 'savings',
        stroke: '#005F20',
        name: 'scenes.S4.S4_D0_F10_C9.labels.total',
        tooltipLabel: 'scenes.S4.S4_D0_F10_C9.graph.tooltip.savings',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues) return 0;
          return inputValues.monthlySavings * xValue;
        },
      },
    ],
    showLegend: false,
  },
};

export default interaction;
