import { CeilingLightAngleInteraction } from '../interactives/interface';

const interaction: CeilingLightAngleInteraction = {
  type: 'ceiling-light-angle',
  totalSteps: 6,
  diameterInput: {
    type: 'slider',
    id: 'diameter',
    label: 'scenes.S12.S12_D0_F70_C9.tunnelDiameterLabel',
    value: 11.24712,
    min: 10.98,
    max: 14,
    step: 0.03048,
    unit: 'ft',
  },
  sliderConfigs: {
    slide1: {
      ariaLabel: 'scenes.S12.S12_D0_F70_C9.sliderConfigs.slide1.ariaLabel',
      lightOnLabel: 'scenes.S12.S12_D0_F70_C9.sliderConfigs.slide1.lightOnLabel',
      lightOffLabel: 'scenes.S12.S12_D0_F70_C9.sliderConfigs.slide1.lightOffLabel',
      description: 'scenes.S12.S12_D0_F70_C9.sliderConfigs.slide1.description',
    },
    slide2: {
      ariaLabel: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide2.ariaLabel",
      svgDescription: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide2.svgDescription",
      description: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide2.description",
    },
    slide3: {
      ariaLabel: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide3.ariaLabel",
      description1: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide3.description1",
      description2: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide3.description2"
    },
    slide4: {
      ariaLabel: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide4.ariaLabel",
      svgDescription: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide4.svgDescription",
      checkAnswerLabel: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide4.checkAnswerLabel",
      resetLabel: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide4.resetLabel",
      formula: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide4.formula",
      successMessage: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide4.successMessage",
      failureMessage: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide4.failureMessage",
    },
    slide5: {
      ariaLabel: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide5.ariaLabel",
      svgDescription: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide5.svgDescription",
      formula1: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide5.formula1",
      formula2: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide5.formula2",
    },
    slide6: {
      ariaLabel: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide6.ariaLabel",
      description1: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide6.description1",
      description2: "scenes.S12.S12_D0_F70_C9.sliderConfigs.slide6.description2"
    }
  },
};

export default interaction;