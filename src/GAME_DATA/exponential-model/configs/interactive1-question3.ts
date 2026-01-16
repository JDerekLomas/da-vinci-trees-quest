import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  prefixText1: 'scenes.S5.S5_D0_FX_C9.profit',
  prefixText2: 'scenes.S5.S5_D0_FX_C9.payback',
  label1: '',
  label2: '',
  type: 'two-input-box',
  correctnessFunction: (a: string | number, b: string | number) => {
    const profit = Number(a);
    const payback = Number(b);

    return profit === 7000 && payback === 0.4;
  },
};

export default interaction;
