import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 3.5,
};

export default interaction;
