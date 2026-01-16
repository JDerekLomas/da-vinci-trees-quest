import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  correctnessFunction: (value: string | number) => Number(value) === 4,
};

export default interaction;
