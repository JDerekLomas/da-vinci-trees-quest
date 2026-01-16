import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  correctnessFunction: (value: string | number) => Number(value) === 17,
};

export default interaction;
