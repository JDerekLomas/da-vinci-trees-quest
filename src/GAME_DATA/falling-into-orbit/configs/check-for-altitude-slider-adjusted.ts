export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the altitude slider has been manually adjusted by the user
  const satelliteSimulator = interactiveResponses?.['satellite-launch-simulator'];

  if (!satelliteSimulator || typeof satelliteSimulator !== 'object') {
    // Disable if no satellite simulator data exists
    return true;
  }

  const altitudeSliderAdjusted = (satelliteSimulator as any)?.altitudeSliderAdjusted;

  // Disable if the altitude slider hasn't been manually adjusted yet
  return !altitudeSliderAdjusted;
};
