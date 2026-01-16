import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: 'Kelp Forest Restoration Planner A Value Question',
  ariaLabel: 'Enter the A value',
  correctnessFunction: (value: string | number) => Number(value) === 5,
};

export default interaction;
