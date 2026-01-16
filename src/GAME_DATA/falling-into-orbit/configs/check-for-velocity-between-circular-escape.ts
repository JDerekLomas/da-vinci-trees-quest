export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the student has launched with velocity between circular and escape velocity
  const satelliteSimulator = interactiveResponses?.['satellite-launch-simulator'];

  if (!satelliteSimulator || typeof satelliteSimulator !== 'object') {
    // Disable if no satellite simulator data exists
    return true;
  }

  const hasLaunchedBetweenCircularEscape = (satelliteSimulator as any)?.hasLaunchedBetweenCircularEscape;

  // Disable if the student hasn't launched with velocity between circular and escape velocity
  return !hasLaunchedBetweenCircularEscape;
};
