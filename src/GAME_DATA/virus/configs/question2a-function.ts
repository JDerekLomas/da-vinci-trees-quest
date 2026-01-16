import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText:
    "<div style='display: flex; gap: 0px 8px; font-size: 30px; font-style: italic;'><p style='color: #0055B2; font-weight: 700;'>a</p> <p>=</p></div>",
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 100,
  ariaLabel: '',
};

export default interaction;
