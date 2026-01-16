import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  bodyAsHtml: 'scenes.service_fee_calculator.body',
  inputs: [
    {
      type: 'textbox',
      id: 'serviceFee',
      label: 'scenes.service_fee_calculator.input.label',
      textboxConfig: {
        prefix: '$',
        min: 0,
        max: 20,
      },
    },
  ],
  formulas: [
    {
      title: 'scenes.service_fee_calculator.graph.base_price.name',
      displayFormula: (_inputValues?: Record<string, number> | null, title?: string) => {
        return `
                    <p className="text-[#1E40AF] mt-3 font-semibold text-m">${title}</p>
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
    {
      title: 'scenes.service_fee_calculator.graph.with_service_fee.name',
      displayFormula: (_inputValues?: Record<string, number> | null, title?: string) => {
        return `
                    <p className="text-[#6D28D9] mt-3 font-semibold text-m">${title}</p>
                    <div className="bg-gray-50 p-2 rounded-lg mt-1">
                        <div className="text-m" role="text" aria-label="p of d equals: 1 plus z, where 0 is less than d which is less than or equal to 5. 1 plus 2 times d minus 5 plus z, where 5 is less than d which is less than or equal to 15. 1 plus 20 plus 4 times d minus 15 plus z, where 15 is less than d which is less than or equal to 50">
                            <div className="flex items-baseline gap-2" aria-hidden="true">
                                <span className="text-[#A6001A]"><span className="font-besley italic">P</span>(<span className="font-besley italic">d</span>)</span> <span>=</span> {
                            </div>
                            <div className="flex flex-col gap-y-1 my-1 ml-4" aria-hidden="true">
                                <div className="flex bg-[#2563EB] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-4/6 text-[#0000FF]">1 + <span className="text-[#059669] font-besley italic">z</span></div>
                                    <div className="w-2/6 text-[#005F20]">0 < <span className="font-besley italic">d</span> ≤ 5</div>
                                </div>
                                <div className="flex bg-[#7C3AED] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-4/6 text-[#800080]">1 + 2(<span className="font-besley italic">d</span> - 5) + <span className="text-[#059669] font-besley italic">z</span></div>
                                    <div className="w-2/6 text-[#005F20]">5 < <span className="font-besley italic">d</span> ≤ 15</div>
                                </div>
                                <div className="flex bg-[#DC2626] rounded w-full bg-opacity-10 p-1">
                                    <div className="w-4/6 text-[#800000]">1 + 20 + 4(<span className="font-besley italic">d</span> - 15) + <span className="text-[#059669] font-besley italic">z</span></div>
                                    <div className="w-2/6 text-[#005F20]">15 < <span className="font-besley italic">d</span> ≤ 50</div>
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
    show: '',
    ariaLabel: 'scenes.service_fee_calculator.graph.ariaLabel',
    x: {
      label: 'scenes.service_fee_calculator.graph.labelX',
      min: 0,
      max: 20,
      steps: 1,
      tooltipLabel: 'scenes.service_fee_calculator.graph.tooltipX',
      tooltipLabelValue: 'distance',
    },
    y: {
      label: 'scenes.service_fee_calculator.graph.labelY',
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
        dataKey: 'serviceFeeZoneOne',
        stroke: '#1E40AF',
        name: 'scenes.service_fee_calculator.graph.with_service_fee.zone1.name',
        tooltipLabel: 'scenes.service_fee_calculator.graph.with_service_fee.tooltipLabel',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues) return null;
          if (xValue >= 0 && xValue <= 5) return 1 + +inputValues['serviceFee'];
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
        dataKey: 'serviceFeeZoneTwo',
        stroke: '#8200C3',
        name: 'scenes.service_fee_calculator.graph.with_service_fee.zone2.name',
        tooltipLabel: 'scenes.service_fee_calculator.graph.with_service_fee.tooltipLabel',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues) return null;
          if (xValue >= 5 && xValue <= 15) return 1 + 2 * (xValue - 5) + +inputValues['serviceFee'];
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
        dataKey: 'serviceFeeZoneThree',
        stroke: '#a13c34',
        name: 'scenes.service_fee_calculator.graph.with_service_fee.zone3.name',
        tooltipLabel: 'scenes.service_fee_calculator.graph.with_service_fee.tooltipLabel',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues) return null;
          if (xValue >= 15 && xValue <= 20) return 1 + 20 + 4 * (xValue - 15) + +inputValues['serviceFee'];
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
        dataKey: 'baseZoneOne',
        stroke: '#595959',
        name: 'scenes.service_fee_calculator.graph.base_price.zone1.name',
        tooltipLabel: 'scenes.service_fee_calculator.graph.base_price.tooltipLabel',
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
        dataKey: 'baseZoneTwo',
        stroke: '#595959',
        name: 'scenes.service_fee_calculator.graph.base_price.zone2.name',
        tooltipLabel: 'scenes.service_fee_calculator.graph.base_price.tooltipLabel',
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
        dataKey: 'baseZoneThree',
        stroke: '#595959',
        name: 'scenes.service_fee_calculator.graph.base_price.zone3.name',
        tooltipLabel: 'scenes.service_fee_calculator.graph.base_price.tooltipLabel',
        calculateYValue: (xValue: number) => {
          if (xValue >= 15 && xValue <= 20) return 1 + 20 + 4 * (xValue - 15);
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
