import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'battery_3',
  options: [
    { value: 'battery_1', label: 'scenes.S7.S7_D0_FX_C9.labels.battery_1' },
    { value: 'battery_2', label: 'scenes.S7.S7_D0_FX_C9.labels.battery_2' },
    { value: 'battery_3', label: 'scenes.S7.S7_D0_FX_C9.labels.battery_3' },
    { value: 'battery_4', label: 'scenes.S7.S7_D0_FX_C9.labels.battery_4' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
