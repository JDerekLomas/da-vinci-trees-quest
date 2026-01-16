import { Interaction } from '../interactives/interface';
import { calculateQuadraticEquation } from '../utils/utility';

const interaction: Interaction = {
  title: '',
  prefixText1:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>a</em><p> = </p></div>",
  prefixText2:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>b</em><p> = </p></div>",
  prefixText3:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>c</em><p> = </p></div>",
  label1: 'scenes.common.coefficient_a',
  label2: 'scenes.common.coefficient_b',
  label3: 'scenes.common.coefficient_c',
  type: 'three-input-box',
  correctnessFunction: (value1: string | number, value2: string | number, value3: string | number): boolean => {
    // Convert values to numbers if they're strings
    const a = typeof value1 === 'string' ? parseFloat(value1) : value1;
    const b = typeof value2 === 'string' ? parseFloat(value2) : value2;
    const c = typeof value3 === 'string' ? parseFloat(value3) : value3;

    // Check if all values are valid numbers and not NaN
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      return false;
    }

    const xAtFifty = calculateQuadraticEquation(a, b, c);

    // If both checks pass, the function is valid
    return xAtFifty === 0;
  },

  ariaLabel: '',
};

export default interaction;
