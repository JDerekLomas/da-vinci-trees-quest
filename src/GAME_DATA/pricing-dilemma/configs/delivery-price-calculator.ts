import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  inputs: [
    {
      type: 'textbox',
      id: 'distance',
      label: 'scenes.delivery_price_calculator.inputs.distance.label',
      textboxConfig: {
        min: 0,
        max: 20,
      },
    },
    {
      type: 'textbox',
      id: 'weight',
      label: 'scenes.delivery_price_calculator.inputs.weight.label',
      textboxConfig: {
        min: 0,
        max: 20,
      },
    },
  ],
  graphs: [
    {
      ariaLabel: 'scenes.delivery_price_calculator.graphs.graph1.ariaLabel',
      title: 'scenes.delivery_price_calculator.graphs.graph1.title',
      x: {
        label: 'scenes.delivery_price_calculator.graphs.graph1.labelX',
        min: 0,
        max: 20,
        steps: 1,
        tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph1.tooltipX',
        tooltipLabelValue: 'distance',
      },
      y: {
        label: 'scenes.delivery_price_calculator.graphs.graph1.labelY',
      },
      lines: [
        {
          name: 'scenes.delivery_price_calculator.graphs.graph1.line.name',
          dataKey: 'priceZoneOne',
          stroke: '#2563EB',
          tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph1.line.tooltipLabel',
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
          name: 'scenes.delivery_price_calculator.graphs.graph1.line.name',
          dataKey: 'priceZoneTwo',
          stroke: '#7C3AED',
          tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph1.line.tooltipLabel',
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
          name: 'scenes.delivery_price_calculator.graphs.graph1.line.name',
          dataKey: 'priceZoneThree',
          stroke: '#DC2626',
          tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph1.line.tooltipLabel',
          calculateYValue: (xValue: number) => {
            if (xValue >= 15 && xValue <= 20) return 31 + 4 * (xValue - 15);
            return null;
          },
          isLineStartPoint: (xValue: number) => {
            return xValue === 15;
          },
          isLineEndPoint: (xValue: number) => {
            return xValue === 20;
          },
        },
      ],
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
      showLegend: false,
      show: ''
    },
    {
      ariaLabel: 'scenes.delivery_price_calculator.graphs.graph2.ariaLabel',
      title: 'scenes.delivery_price_calculator.graphs.graph2.title',
      x: {
        label: 'scenes.delivery_price_calculator.graphs.graph2.labelX',
        min: 0,
        max: 15,
        steps: 1,
        tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph2.tooltipX',
        tooltipLabelValue: 'weight',
      },
      y: {
        label: 'scenes.delivery_price_calculator.graphs.graph2.labelY',
      },
      lines: [
        {
          name: 'scenes.delivery_price_calculator.graphs.graph2.base_zone.name',
          dataKey: 'zone1',
          stroke: '#2563EB',
          tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph2.base_zone.tooltipLabel',
          calculateYValue: (xValue: number) => 2 * xValue,
          isLineStartPoint: () => {
            return false;
          },
          isLineEndPoint: () => {
            return false;
          },
        },
        {
          name: 'scenes.delivery_price_calculator.graphs.graph2.mid_zone.name',
          dataKey: 'zone2',
          stroke: '#7C3AED',
          tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph2.mid_zone.tooltipLabel',
          calculateYValue: (xValue: number) => 3 * xValue,
          isLineStartPoint: () => {
            return false;
          },
          isLineEndPoint: () => {
            return false;
          },
        },
        {
          name: 'scenes.delivery_price_calculator.graphs.graph2.premium_zone.name',
          dataKey: 'zone3',
          stroke: '#DC2626',
          tooltipLabel: 'scenes.delivery_price_calculator.graphs.graph2.premium_zone.tooltipLabel',
          calculateYValue: (xValue: number) => 4 * xValue,
          isLineStartPoint: () => {
            return false;
          },
          isLineEndPoint: () => {
            return false;
          },
        },
      ],
      showLegend: false,
      show: ''
    },
  ],
};

export default interaction;
