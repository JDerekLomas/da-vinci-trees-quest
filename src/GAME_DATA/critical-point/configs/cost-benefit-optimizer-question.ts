import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  correctnessFunction: (value: string | number) => Number(value) === 2.5,
};

export default interaction;
