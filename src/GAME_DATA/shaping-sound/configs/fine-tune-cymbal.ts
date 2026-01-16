import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: '',
  prefixText1: 'scenes.common.vertical_shift',
  prefixText2: 'scenes.common.vertical_scale',
  prefixText3: 'scenes.common.horizontal_shift',
  prefixText4: 'scenes.common.horizontal_scale',
  label1: '',
  label2: '',
  label3: '',
  label4: '',
  type: 'four-input-box',
  correctnessFunction: (
    value1: string | number,
    value2: string | number,
    value3: string | number,
    value4: string | number,
  ): boolean => {
    // Convert values to numbers if they're strings
    const verticalShift = Number(value1);
    const verticalScale = Number(value2);
    const horizontalScale = Number(value3);
    const horizontalShift = Number(value4);

    // Check if all values are valid numbers and not NaN
    if (isNaN(verticalShift) || isNaN(verticalScale) || isNaN(horizontalScale) || isNaN(horizontalShift)) {
      return false;
    }

    return verticalShift == 0.1 && verticalScale == 1.1 && horizontalScale == 1 && horizontalShift == 0;
  },

  ariaLabel: '',
};

export default interaction;
