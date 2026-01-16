import { InputBoxInteraction } from '../interactives/interface';

const interaction: InputBoxInteraction = {
  type: 'input-box',
  title: 'Kelp Forest Restoration Planner B Value Question',
  ariaLabel: 'Enter the B value',
  correctnessFunction: (value: string | number) => Number(value) === 3,
};

export default interaction;
