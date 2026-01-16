import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  correctnessFunction: (value: string | number) => Number(value) === 9000,
};

export default interaction;
