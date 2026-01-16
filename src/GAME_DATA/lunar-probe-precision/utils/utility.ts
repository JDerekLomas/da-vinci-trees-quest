import { TARGET_POSITION } from '../constants/constants';

export const calculateProjectileDistance = (angle: number, velocity: number) => {
  // Convert angle to radians
  const angleInRadians = (angle * Math.PI) / 180;

  // Gravity constant in ft/s²
  const gravity = 5.35;

  // Calculate distance using projectile motion formula
  // Distance = (v² * sin(2θ)) / g
  const distance = (Math.pow(velocity, 2) * Math.sin(2 * angleInRadians)) / gravity;

  // Round the distance
  return Math.round(distance);
};

export const calculateQuadraticEquation = (a: number, b: number, c: number) => {
  return a * Math.pow(TARGET_POSITION, 2) + b * TARGET_POSITION + c;
};

export const calculateTrajectoryAlignment = (a: number, h: number, k: number) => {
  return a * Math.pow(TARGET_POSITION - h, 2) + k;
};

export const checkTargetPosition = (position: number) => {
  return position === TARGET_POSITION;
};
