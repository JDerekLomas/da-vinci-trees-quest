import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  bodyAsHtml: 'scenes.distance_based_pricing_comparison.body',
  formulas: [
    {
      title: 'scenes.distance_based_pricing_comparison.graph.original_price.name',
      displayFormula: (_inputValues?: Record<string, number> | null, title?: string) => {
        return `
                    <p className="text-[#1E40AF] font-semibold text-m mt-3">${title}</p>
                    <div className="bg-gray-50 p-2 rounded-lg mt-1">
                        <div className="text-m" role="text" aria-label="p of d equals: 1, where 0 is less than d which is less than or equal to 5. 1 plus 2d, where 5 is less than d which is less than or equal to 15. 1 plus 30 plus 4d, where 15 is less than d which is less than or equal to 50">
                            <div className="flex items-baseline gap-2" aria-hidden="true">
                                <span className="text-[#A6001A]"><span className="font-besley italic">P</span>(<span className="font-besley italic">d</span>)</span> <span>=</span> {
                            </div>
                            <div className="flex flex-col gap-y-1 my-1 ml-4" aria-hidden="true">
                                <div className="flex bg-[#2563EB] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-2/5 text-[#0000FF]">1</div>
                                    <div className="w-3/5 text-[#005F20]">0 < <span className="font-besley italic">d</span> ≤ 5</div>
                                </div>
                                <div className="flex bg-[#7C3AED] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-2/5 text-[#800080]">1 + 2<span className="font-besley italic">d</span></div>
                                    <div className="w-3/5 text-[#005F20]">5 < <span className="font-besley italic">d</span> ≤ 15</div>
                                </div>
                                <div className="flex bg-[#DC2626] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-2/5 text-[#800000]">1 + 30 + 4<span className="font-besley italic">d</span></div>
                                    <div className="w-3/5 text-[#005F20]">15 < <span className="font-besley italic">d</span> ≤ 50</div>
                                </div>
                            </div>
                            <div aria-hidden="true">}</div>
                        </div>
                    </div>
                `;
      },
    },
    {
      title: 'scenes.distance_based_pricing_comparison.graph.new_price.name',
      displayFormula: (_inputValues?: Record<string, number> | null, title?: string) => {
        return `
                    <p className="text-[#6D28D9] font-semibold text-m mt-3">${title}</p>
                    <div className="bg-gray-50 p-2 rounded-lg mt-1">
                        <div className="text-m" role="text" aria-label="p of d equals: 1, where 0 is less than d which is less than or equal to 5. 1 plus 2 times d minus 5, where 5 is less than d which is less than or equal to 15. 1 plus 20 plus 4 times d minus 15, where 15 is less than d which is less than or equal to 50">
                            <div className="flex items-baseline gap-2" aria-hidden="true">
                                <span className="text-[#A6001A]"><span className="font-besley italic">P</span>(<span className="font-besley italic">d</span>)</span> <span>=</span> {
                            </div>
                            <div className="flex flex-col gap-y-1 my-1 ml-4" aria-hidden="true">
                                <div className="flex bg-[#2563EB] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-3/5 text-[#0000FF]">1</div>
                                    <div className="w-2/5 text-[#005F20]">0 < <span className="font-besley italic">d</span> ≤ 5</div>
                                </div>
                                <div className="flex bg-[#7C3AED] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-3/5 text-[#800080]">1 + 2(<span className="font-besley italic">d</span> - 5)</div>
                                    <div className="w-2/5 text-[#005F20]">5 < <span className="font-besley italic">d</span> ≤ 15</div>
                                </div>
                                <div className="flex bg-[#DC2626] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-3/5 text-[#800000]">1 + 20 + 4(<span className="font-besley italic">d</span> - 15)</div>
                                    <div className="w-2/5 text-[#005F20]">15 < <span className="font-besley italic">d</span> ≤ 50</div>
                                </div>
                            </div>
                            <div aria-hidden="true">}</div>
                        </div>
                    </div>
                `;
      },
    },
  ],
  graphConfig: {
    show: 'scenes.distance_based_pricing_comparison.graph.show',
    ariaLabel: 'scenes.distance_based_pricing_comparison.graph.ariaLabel',
    x: {
      label: 'scenes.distance_based_pricing_comparison.graph.labelX',
      min: 0,
      max: 20,
      steps: 1,
      tooltipLabel: 'scenes.distance_based_pricing_comparison.graph.tooltipX',
      tooltipLabelValue: 'distance',
    },
    y: {
      label: 'scenes.distance_based_pricing_comparison.graph.labelY',
    },
    referenceAreas: [
      {
        start: 0,
        end: 5,
        fillColor: '#2563EB',
        fillOpacity: 0.1,
      },
      {
        start: 5,
        end: 15,
        fillColor: '#7C3AED',
        fillOpacity: 0.1,
      },
      {
        start: 15,
        end: 20,
        fillColor: '#DC2626',
        fillOpacity: 0.1,
      },
    ],
    referenceLines: [
      {
        value: 5,
        stroke: '#0055B2',
        label: 'scenes.distance_based_price_calculator.graph.zone1_zone2_separator_label',
      },
      {
        value: 15,
        stroke: '#8200C3',
        label: 'scenes.distance_based_price_calculator.graph.zone2_zone3_separator_label',
      },
    ],
    lines: [
      {
        dataKey: 'newPriceZone1',
        stroke: '#1E40AF',
        name: 'scenes.distance_based_pricing_comparison.graph.new_price.zone1.name',
        tooltipLabel: 'scenes.distance_based_pricing_comparison.graph.new_price.tooltipLabel',
        calculateYValue: (xValue: number) => {
          if (xValue >= 0 && xValue <= 5) return 1;
          return null;
        },
        isLineStartPoint: (xValue: number) => {
          return xValue === 0;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 5;
        },
      },

      {
        dataKey: 'newPriceZone2',
        stroke: '#8200C3',
        name: 'scenes.distance_based_pricing_comparison.graph.new_price.zone2.name',
        tooltipLabel: 'scenes.distance_based_pricing_comparison.graph.new_price.tooltipLabel',
        calculateYValue: (xValue: number) => {
          if (xValue >= 5 && xValue <= 15) return 1 + 2 * (xValue - 5);
          return null;
        },
        isLineStartPoint: (xValue: number) => {
          return xValue === 5;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 15;
        },
      },

      {
        dataKey: 'newPriceZone3',
        stroke: '#a13c34',
        name: 'scenes.distance_based_pricing_comparison.graph.new_price.zone3.name',
        tooltipLabel: 'scenes.distance_based_pricing_comparison.graph.new_price.tooltipLabel',
        calculateYValue: (xValue: number) => {
          if (xValue >= 15 && xValue <= 20) return 21 + 4 * (xValue - 15);
          return null;
        },
        isLineStartPoint: (xValue: number) => {
          return xValue === 15;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 50;
        },
      },
      {
        dataKey: 'oldPriceZone1',
        stroke: '#595959',
        name: 'scenes.distance_based_pricing_comparison.graph.original_price.zone1.name',
        tooltipLabel: 'scenes.distance_based_pricing_comparison.graph.original_price.tooltipLabel',
        calculateYValue: (xValue: number) => {
          if (xValue >= 0 && xValue <= 5) return 1;
          return null;
        },
        isLineStartPoint: (xValue: number) => {
          return xValue === 0;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 5;
        },
      },
      {
        dataKey: 'oldPriceZone2',
        stroke: '#595959',
        name: 'scenes.distance_based_pricing_comparison.graph.original_price.zone2.name',
        tooltipLabel: 'scenes.distance_based_pricing_comparison.graph.original_price.tooltipLabel',
        calculateYValue: (xValue: number) => {
          if (xValue >= 5 && xValue <= 15) return 1 + 2 * xValue;
          return null;
        },
        isLineStartPoint: (xValue: number) => {
          return xValue === 5;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 15;
        },
      },
      {
        dataKey: 'oldPriceZone3',
        stroke: '#595959',
        name: 'scenes.distance_based_pricing_comparison.graph.original_price.zone3.name',
        tooltipLabel: 'scenes.distance_based_pricing_comparison.graph.original_price.tooltipLabel',
        calculateYValue: (xValue: number) => {
          if (xValue >= 15 && xValue <= 20) return 1 + 30 + 4 * xValue;
          return null;
        },
        isLineStartPoint: (xValue: number) => {
          return xValue === 15;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 50;
        },
      },

    ],
    showLegend: true,
  },
};

export default interaction;
