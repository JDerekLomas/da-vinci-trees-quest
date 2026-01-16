import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue: string) => selectedValue === 'value1',
  options: [
    { value: 'value0', label: 'scenes.common.pi_radians' },
    { value: 'value1', label: 'scenes.common.2pi_radians' },
    { value: 'value2', label: 'scenes.common.3pi_radians' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
