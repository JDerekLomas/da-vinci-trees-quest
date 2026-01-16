export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the student has launched with circular orbit velocity
  const satelliteSimulator = interactiveResponses?.['satellite-launch-simulator'];

  if (!satelliteSimulator || typeof satelliteSimulator !== 'object') {
    // Disable if no satellite simulator data exists
    return true;
  }

  const hasLaunchedCircular = (satelliteSimulator as any)?.hasLaunchedCircular;

  // Disable if the student hasn't launched with circular orbit velocity
  return !hasLaunchedCircular;
};
