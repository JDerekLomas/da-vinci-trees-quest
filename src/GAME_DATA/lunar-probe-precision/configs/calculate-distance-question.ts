import { Interaction } from '../interactives/interface';
import { calculateProjectileDistance, checkTargetPosition } from '../utils/utility';

const interaction: Interaction = {
  title: '',
  prefixText1: 'scenes.S5.S5_D3_FSQ4_C9_V_Prefix',
  prefixText2: 'scenes.S5.S5_D3_FSQ4_C9_A_Prefix',
  label1: 'scenes.common.velocity',
  label2: 'scenes.common.angle',
  type: 'two-input-box',
  correctnessFunction: (angle: string | number, velocity: string | number) => {
    // Convert inputs to numbers
    const angleInDegrees = Number(angle);
    const velocityInFtPerSec = Number(velocity);

    const distance = calculateProjectileDistance(velocityInFtPerSec, angleInDegrees);

    // Check if rounded distance equals 50 feet
    return checkTargetPosition(distance);
  },
  ariaLabel: '',
};

export default interaction;
