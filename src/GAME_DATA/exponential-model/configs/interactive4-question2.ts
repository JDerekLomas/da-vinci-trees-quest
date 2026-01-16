import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 44383,
};

export default interaction;
