import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  type: 'radio-button',
  correctnessFunction: (selectedValue) => selectedValue === 'index_2',
  options: [
    { value: 'index_1', label: 'scenes.S8.options.index_1' },
    { value: 'index_2', label: 'scenes.S8.options.index_2' },
    { value: 'index_3', label: 'scenes.S8.options.index_3' },
  ],
  ariaLabel: '',
  title: '',
};

export default interaction;
