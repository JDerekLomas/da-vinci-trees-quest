import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText1: "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 24px; margin-bottom:2pm'><em style='font-weight: 400; color: #677600; font-family: besley;'>a</em><p> = </p></div>",
  prefixText2: "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 24px;'><em style='font-weight: 400; color: #00749D; font-family: besley;'>b</em><p> = </p></div>",
  type: 'two-input-box',
  correctnessFunction: (a: string | number, b: string | number) => {
    // Convert inputs to numbers
    const distanceA = Number(a);
    const distanceB = Number(b);

    return distanceA === 440 && distanceB === 538;
  },
  ariaLabel: '',
};

export default interaction;