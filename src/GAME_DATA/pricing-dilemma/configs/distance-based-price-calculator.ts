/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslations } from '../../../hooks/useTranslations';
import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  inputs: [
    {
      type: 'slider',
      id: 'zone1',
      title: 'scenes.distance_based_price_calculator.inputs.zone1.title',
      titleColor: '#0055B2',
      label: 'scenes.distance_based_price_calculator.inputs.zone1.label',
      sliderConfig: {
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 0,
      },
    },
    {
      type: 'slider',
      id: 'zone2',
      title: 'scenes.distance_based_price_calculator.inputs.zone2.title',
      titleColor: '#8200C3',
      label: 'scenes.distance_based_price_calculator.inputs.zone2.label',
      sliderConfig: {
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 0,
      },
    },
    {
      type: 'slider',
      id: 'zone3',
      title: 'scenes.distance_based_price_calculator.inputs.zone3.title',
      titleColor: '#a13c34',
      label: 'scenes.distance_based_price_calculator.inputs.zone3.label',
      sliderConfig: {
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 0,
      },
    },
  ],
  formulas: [
    {
      displayFormula: (inputValues?: Record<string, number> | null) => {
        if (!inputValues) return null;
        const { t } = useTranslations();
        const ariaLabelPart1 = t('scenes.understanding-piecewise-functions.formula-aria-label-parts.part1');
        const ariaLabelPart2 = t('scenes.understanding-piecewise-functions.formula-aria-label-parts.part2');
        const ariaLabelPart3 = t('scenes.understanding-piecewise-functions.formula-aria-label-parts.part3');
        const ariaLabelPart4 = t('scenes.understanding-piecewise-functions.formula-aria-label-parts.part4');
        const ariaLabelPart5 = t('scenes.understanding-piecewise-functions.formula-aria-label-parts.part5');

        const ariaLabel = `${ariaLabelPart1} ${inputValues['zone1']} ${ariaLabelPart2} ${inputValues['zone1']} ${ariaLabelPart3} ${inputValues['zone2']} ${ariaLabelPart4} ${inputValues['zone1']} ${ariaLabelPart3} ${inputValues['zone2'] * 15} ${ariaLabelPart3} ${inputValues['zone3']} ${ariaLabelPart5}`;
        return `
                    <div className="bg-gray-50 p-2 rounded-lg mt-5" aria-label="${ariaLabel}" role='math'>
                        <div className="text-m">
                            <div className="flex items-baseline gap-2">
                                <span className="text-[#A6001A]"><span className="font-besley italic">P</span>(<span className="font-besley italic">d</span>)</span> = {
                            </div>
                            <div className="ml-8 space-y-2">
                                <div className="flex items-baseline gap-4">
                                    <div className="text-[#0055B2]">${inputValues['zone1']},</div>
                                    <div className="text-[#005F20]">
                                        0 < <span className="font-besley italic">d</span> ≤ 5
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-4">
                                    <div className="text-[#8200C3]">
                                        ${inputValues['zone1']} + ${inputValues['zone2']}<span className="font-besley italic">d</span>,
                                    </div>
                                    <div className="text-[#005F20]">
                                        5 < <span className="font-besley italic">d</span> ≤ 15
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-4">
                                    <div className="text-[#a13c34]">
                                        ${inputValues['zone1']} + ${+inputValues['zone2'] * 15} + ${inputValues['zone3']}<span className="font-besley italic">d</span>,
                                    </div>
                                    <div className="text-[#005F20]">
                                        15 < <span className="font-besley italic">d</span> ≤ 50
                                    </div>
                                </div>
                            </div>
                            <div>}</div>
                        </div>
                    </div>
                `;
      },
    },
  ],
  graphConfig: {
    ariaLabel: 'scenes.distance_based_price_calculator.graph.ariaLabel',
    x: {
      label: 'scenes.distance_based_price_calculator.graph.labelX',
      min: 0,
      max: 20,
      steps: 1,
      tooltipLabel: 'scenes.distance_based_price_calculator.graph.tooltipX',
      tooltipLabelValue: 'distance',
    },
    y: {
      label: 'scenes.distance_based_price_calculator.graph.labelY',
    },
    referenceAreas: [
      {
        start: 0,
        end: 5,
        fillColor: '#0055B2',
        fillOpacity: 0.1,
      },
      {
        start: 5,
        end: 15,
        fillColor: '#8200C3',
        fillOpacity: 0.1,
      },
      {
        start: 15,
        end: 20,
        fillColor: '#a13c34',
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
        dataKey: 'zoneOnePrice',
        stroke: '#0055B2',
        name: 'scenes.distance_based_price_calculator.graph.new_price.zone1Name',
        tooltipLabel: 'scenes.distance_based_price_calculator.graph.new_price.tooltipLabel',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues) return 0;
          else if (xValue >= 0 && xValue <= 5) return +inputValues['zone1'];
          return null;
        },
        isLineStartPoint: (xValue: number) => {
          return !xValue;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 5;
        },
      },
      {
        dataKey: 'zoneTwoPrice',
        stroke: '#8200C3',
        name: 'scenes.distance_based_price_calculator.graph.new_price.zone2Name',
        tooltipLabel: 'scenes.distance_based_price_calculator.graph.new_price.tooltipLabel',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues || xValue === 0) return null;
          else if (xValue >= 5 && xValue <= 15) return +inputValues['zone1'] + +inputValues['zone2'] * xValue;
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
        dataKey: 'zoneThreePrice',
        stroke: '#a13c34',
        name: 'scenes.distance_based_price_calculator.graph.new_price.zone3Name',
        tooltipLabel: 'scenes.distance_based_price_calculator.graph.new_price.tooltipLabel',
        calculateYValue: (xValue: number, inputValues?: Record<string, number>) => {
          if (!inputValues || xValue === 0) return null;
          if (xValue >= 15 && xValue <= 50)
            return +inputValues['zone1'] + +inputValues['zone2'] * 15 + +inputValues['zone3'] * xValue;
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
        dataKey: 'oldPrice',
        stroke: '#595959',
        name: 'scenes.distance_based_price_calculator.graph.old_price.name',
        tooltipLabel: 'scenes.distance_based_price_calculator.graph.old_price.tooltipLabel',
        calculateYValue: (xValue: number) => 2 * xValue,
        isLineStartPoint: (xValue: number) => {
          return !xValue;
        },
        isLineEndPoint: (xValue: number) => {
          return xValue === 15 || xValue === 5;
        },
      },
    ],
    showLegend: true,
    show: '',
  },
};

export default interaction;
