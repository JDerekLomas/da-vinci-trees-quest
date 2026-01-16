import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: '',
  ariaLabel: '',
  correctnessFunction: (value: string | number) => {
    const num = Number(value);
    return num === 16.3 || num === 16.4;
  },
};

export default interaction;
