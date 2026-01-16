import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 16800,
};

export default interaction;
