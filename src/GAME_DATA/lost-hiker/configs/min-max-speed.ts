import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText1: 'scenes.S11.S11_D0_FX_C9.translations.min_speed',
  prefixText2: 'scenes.S11.S11_D0_FX_C9.translations.max_speed',
  type: 'two-input-box',
  correctnessFunction: (a: string | number, b: string | number) => {
    const minSpeed = Number(a);
    const maxSpeed = Number(b);

    return minSpeed === 12 && maxSpeed === 13.5;
  },
  ariaLabel: '',
};

export default interaction;
