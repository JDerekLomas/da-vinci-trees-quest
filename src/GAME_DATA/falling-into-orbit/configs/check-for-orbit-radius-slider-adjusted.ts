export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the orbit radius slider has been manually adjusted by the user
  const orbitSimulator = interactiveResponses?.['geosynchronous-orbit-simulator'];

  if (!orbitSimulator || typeof orbitSimulator !== 'object') {
    // Disable if no orbit simulator data exists
    return true;
  }

  const orbitRadiusSliderAdjusted = (orbitSimulator as any)?.orbitRadiusSliderAdjusted;

  // Disable if the orbit radius slider hasn't been manually adjusted yet
  return !orbitRadiusSliderAdjusted;
};
