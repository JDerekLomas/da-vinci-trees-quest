import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  correctnessFunction: (value: string | number) => Number(value) === 103,
};

export default interaction;
