import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText1:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 24px; margin-bottom:2pm'><span style='color: #8e24aa; font-family: Besley; font-style: italic'>x</span><p> = </p></div>",
  prefixText2:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 24px;'><span style='color: #633300; font-family: Besley; font-style: italic'>y</span><p> = </p></div>",
  type: 'two-input-box',
  correctnessFunction: (a: string | number, b: string | number) => {
    // Convert inputs to numbers
    const valA = Number(a);
    const valB = Number(b);

    return valA === 330 && valB === 200;
  },
  ariaLabel: '',
};

export default interaction;
