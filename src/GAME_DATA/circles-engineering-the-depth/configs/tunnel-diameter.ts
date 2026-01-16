import { SvgElementsData, TunnelDiameterInteraction } from '../interactives/interface';

const interaction: TunnelDiameterInteraction = {
  type: 'tunnel-diameter',
  totalSteps: 6,
  CONSTS: {
    SVG_WIDTH: 700,
    SVG_HEIGHT: 400,
  },
  translations: {
    checkAnswerBtn: "scenes.S10.S10_D0_F47_C9.translations.checkAnswerBtn",
    resetBtn: "scenes.S10.S10_D0_F47_C9.translations.resetBtn",
    submitBtn: "scenes.S10.S10_D0_F47_C9.translations.submitBtn",
  },
  slideConfigs: {
    slide1: {
      ariaLabel: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide1.ariaLabel",
    },
    slide2: {
      ariaLabel: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide2.ariaLabel",
    },
    slide3: {
      ariaLabel: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide3.ariaLabel",
      quePart1: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide3.quePart1",
      quePart2: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide3.quePart2",
      successMessage: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide3.successMessage",
      failureMessage1: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide3.failureMessage1",
      failureMessage2: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide3.failureMessage2",
    },
    slide5: {
      title: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide5.title",
      ariaLabel: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide5.ariaLabel",
      description: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide5.description",
      successMessage: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide5.successMessage",
      failureMessage: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide5.failureMessage",
    },
    slide6: {
      title: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide6.title",
      ariaLabel: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide6.ariaLabel",
      description: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide6.description",
      successMessage: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide6.successMessage",
      failureMessage: "scenes.S10.S10_D0_F47_C9.slideConfigs.slide6.failureMessage",
    },
  },
  getBaseGeometryElements: (coordinates: { [key: string]: number }, slideNo: number): SvgElementsData => {
    const { rectX, rectY, centerX, centerY } = coordinates;

    const data: SvgElementsData = {
      points: [
        { x: rectX, y: rectY, label: 'D' },
        { x: centerX, y: centerY, label: 'O' },
        { x: rectX + 280, y: rectY, label: 'C' },
        { x: rectX, y: centerY + 40, label: 'A' },
        { x: centerX - 180, y: centerY + 40, label: 'E' },
        { x: centerX + 180, y: centerY + 40, label: 'F' },
        { x: rectX + 280, y: centerY + 40, label: 'B', labelX: rectX + 285 },
        { x: centerX + (centerX - rectX), y: centerY + (centerY - rectY), label: 'P' },
      ],
      lines: [
        { x1: rectX + 280, y1: rectY, x2: rectX, y2: rectY },
        { x1: rectX, y1: rectY, x2: rectX, y2: centerY + 40 },
        { x1: rectX + 280, y1: centerY + 40, x2: rectX + 280, y2: rectY },
        { x1: rectX, y1: centerY + 40, x2: rectX + 280, y2: centerY + 40 },
        { x1: centerX - 180, y1: centerY + 40, x2: centerX + 180, y2: centerY + 40, strokeWidth: '3' },
      ],
      labels: [
        { x: centerX, y: centerY + 65, text: '24 ft' },
        { x: rectX - 15, y: centerY + 25, text: '6 ft', textAnchor: 'end' },
        { x: rectX + 290, y: centerY - 20, text: '18 ft', textAnchor: 'start' },
        { x: rectX + 295, y: centerY + 25, text: '6 ft', textAnchor: 'start' },
      ],
    };

    if (slideNo === 2) {
      data.lines = [
        ...(data.lines || []),
        { x1: rectX, y1: rectY, x2: centerX + (centerX - rectX), y2: centerY + (centerY - rectY), dashed: true },
        {
          x1: rectX + 280,
          y1: centerY + 40,
          x2: centerX + (centerX - rectX),
          y2: centerY + (centerY - rectY),
          dashed: true,
        },
      ];
      return data;
    }

    if (slideNo === 3) {
      return {
        points: [
          { x: rectX, y: rectY, label: 'D' },
          { x: rectX + 280, y: rectY, label: 'C' },
          { x: centerX + (centerX - rectX), y: centerY + (centerY - rectY), label: 'P' },
        ],
        lines: [
          { x1: rectX, y1: rectY, x2: rectX + 280, y2: rectY, dashed: true },
          {
            x1: rectX + 280,
            y1: rectY,
            x2: centerX + (centerX - rectX),
            y2: centerY + (centerY - rectY),
            dashed: true,
          },
          { x1: rectX, y1: rectY, x2: centerX + (centerX - rectX), y2: centerY + (centerY - rectY), dashed: true },
        ],
      };
    }

    if (slideNo === 5) {
      return {
        points: [
          { x: rectX - 40, y: centerY + 40, label: 'E' },
          { x: rectX + 280, y: centerY + 40, labelX: rectX + 285, label: 'B' },
          { x: rectX + 280, y: rectY, label: 'C' },
          { x: centerX + 180, y: centerY + 40, label: 'F' },
          { x: centerX + (centerX - rectX), y: centerY + (centerY - rectY), label: 'P' },
        ],
        lines: [
          { x1: rectX - 40, y1: centerY + 40, x2: centerX + 180, y2: centerY + 40 },
          { x1: rectX + 280, y1: rectY, x2: centerX + (centerX - rectX), y2: centerY + (centerY - rectY) },
        ],
        labels: [
          { x: centerX, y: centerY + 30, text: '30 ft' },
          { x: centerX + 170, y: centerY + 30, text: '6 ft' },
          { x: centerX + (centerX - rectX) - 20, y: centerY + 70, text: 'x', fontStyle: 'italic' },
          {
            x: centerX + (centerX - rectX) - 15,
            y: centerY - 20,
            text: '18 ft',
            textAnchor: 'end',
          },
        ],
      }
    }

    if (slideNo === 6) {
      return {
        points: [
          { x: rectX, y: rectY, label: 'D' },
          { x: rectX + 280, y: rectY, label: 'C' },
          { x: centerX + (centerX - rectX), y: centerY + (centerY - rectY), label: 'P' },
        ],
        lines: [
          { x1: rectX, y1: rectY, x2: rectX + 280, y2: rectY, dashed: true },
          {
            x1: rectX + 280,
            y1: rectY,
            x2: centerX + (centerX - rectX),
            y2: centerY + (centerY - rectY),
            dashed: true,
          },
          { x1: rectX, y1: rectY, x2: centerX + (centerX - rectX), y2: centerY + (centerY - rectY), dashed: true },
        ],
        labels: [
          { x: rectX + 140, y: rectY - 10, text: '24 ft', textAnchor: 'middle' },
          { x: rectX + 350, y: centerY, text: '28 ft', textAnchor: 'middle' },
        ],
      }
    }

    return data;
  },
};
export default interaction;
