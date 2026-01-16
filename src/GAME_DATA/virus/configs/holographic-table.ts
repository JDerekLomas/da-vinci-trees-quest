import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  title: 'Holographic Table',
  type: 'holographic-table',
  ariaLabel:
    'Graph representing the revenue function, showing how revenue changes based on the number of T-shirts sold',
  data: [
    { firstCol: 0, secondCol: 100 },
    { firstCol: 1, secondCol: 200 },
    { firstCol: 2, secondCol: 400 },
    { firstCol: 3, secondCol: 800 },
  ],
};

export default interaction;
