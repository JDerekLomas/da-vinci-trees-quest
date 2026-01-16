import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText1:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>x<sub>1</sub></em><p> = </p></div>",
  prefixText2:
    "<div style='display: flex; align-items: center; gap: 0px 8px; font-size: 22px;'><em style='font-weight: 400; color: #0055B2; font-family: besley;'>x<sub>2</sub></em><p> = </p></div>",
  label1: 'scenes.common.root_x1',
  label2: 'scenes.common.root_x2',
  type: 'two-input-box',
  correctnessFunction: (value1: string | number, value2: string | number): boolean => {
    // Convert inputs to numbers
    const x1 = typeof value1 === 'string' ? parseFloat(value1) : value1;
    const x2 = typeof value2 === 'string' ? parseFloat(value2) : value2;

    // Check if all values are valid numbers and not NaN
    if (isNaN(x1) || isNaN(x2)) {
      return false;
    }

    // Small epsilon for floating-point comparison
    const epsilon = 0.01;

    // Verify if the equation satisfies the point (0, 0)
    const yAtZero = (0 - x1) * (0 - x2);
    const satisfiesZero = Math.abs(yAtZero) < epsilon;

    // Verify if the equation satisfies the point (50, 0)
    const yAtFifty = (50 - x1) * (50 - x2);
    const satisfiesFifty = Math.abs(yAtFifty) < epsilon;

    // Both conditions must be satisfied
    return satisfiesZero && satisfiesFifty;
  },
  ariaLabel: '',
};

export default interaction;
