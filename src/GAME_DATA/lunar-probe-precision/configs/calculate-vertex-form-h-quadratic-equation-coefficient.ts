import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>h</em><p> = </p></div>",
  type: 'input-box',
  label: 'scenes.common.coefficient_h',
  correctnessFunction: (value: string | number): boolean => {
    const h = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(h)) {
      return false;
    }
    return h === 25;
  },
  ariaLabel: '',
};

export default interaction;
