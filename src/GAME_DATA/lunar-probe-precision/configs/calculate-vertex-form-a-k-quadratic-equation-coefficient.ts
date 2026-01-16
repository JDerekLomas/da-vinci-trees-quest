import { Interaction } from '../interactives/interface';
import { calculateTrajectoryAlignment } from '../utils/utility';

const interaction: Interaction = {
  title: '',
  prefixText1:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>a</em><p> = </p></div>",
  prefixText2:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>k</em><p> = </p></div>",
  label1: 'scenes.common.coefficient_a',
  label2: 'scenes.common.coefficient_k',
  type: 'two-input-box',
  correctnessFunction: (value1: string | number, value2: string | number): boolean => {
    const a = typeof value1 === 'string' ? parseFloat(value1) : value1;
    const k = typeof value2 === 'string' ? parseFloat(value2) : value2;

    if (isNaN(a) || isNaN(k)) {
      return false;
    }

    const h = 25;

    const value = Math.round(calculateTrajectoryAlignment(a, h, k));
    return value === 0;
  },

  ariaLabel: '',
};

export default interaction;
