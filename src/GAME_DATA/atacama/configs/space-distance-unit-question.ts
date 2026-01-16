import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'two-input-box',
  title: '',
  ariaLabel: '',
  prefixText1: 'scenes.S5.S5_D14_F39_C9_prefix1',
  prefixText2: 'scenes.S5.S5_D14_F39_C9_prefix2',
  postfixText1: 'scenes.S5.S5_D14_F39_C9_postfix1',
  postfixText2: 'scenes.S5.S5_D14_F39_C9_postfix2',
  correctnessFunction: (value1: string | number, value2: string | number) => {
    // Convert inputs to numbers
    const A = Number(value1);
    const B = Number(value2);

    return A === 60 && B === 60;
  },
};

export default interaction;
