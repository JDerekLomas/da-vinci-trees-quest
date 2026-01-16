import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 734710,
};

export default interaction;
