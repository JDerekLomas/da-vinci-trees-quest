import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'anchor-angle',
  ariaLabel: 'scenes.S8.S8_D0_F30_C9.ariaLabel',
  depthInput: {
    id: 'depth',
    type: 'slider',
    label: 'scenes.S8.S8_D0_F30_C9.depthInputLabel',
    min: 17,
    max: 50,
    value: 30,
    step: 0.1,
    unit: 'ft',
  },
  totalSteps: 3,
  CONSTS: {
    SVG_WIDTH: 400,
    SVG_HEIGHT: 450,
    SCALE_FACTOR: 6,
    TUNNEL_DIAMETER: 11.58,
  },
  translations: {
    tunnelDiameterLabel: 'scenes.S8.S8_D0_F30_C9.tunnelDiameterLabel',
    cableLength: 'scenes.S8.S8_D0_F30_C9.cableLength',
  },
};

export default interaction;
