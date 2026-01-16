import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'input-box',
  title: 'scenes.practice.calculator.heading',
  ariaLabel: 'Enter the value for the top-left position of the result matrix',
  correctnessFunction: (input: string | number) => {
    // For matrices A = [[1,2],[3,4]] and B = [[5,6],[7,8]]
    // Result[0][0] = 1*5 + 2*7 = 5 + 14 = 19
    return Number(input) === 19;
  },
  prefixText: '',
};

export default interaction;
