import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText:
    "<div style='display: flex; gap: 0px 8px; font-size: 32px; font-style: italic;'><p style='color: #9F008F; font-weight: 700;'>b</p> <p>=</p></div>",
  type: 'input-box',
  correctnessFunction: (value: string | number) => Number(value) === 2,
  ariaLabel: '',
};

export default interaction;
