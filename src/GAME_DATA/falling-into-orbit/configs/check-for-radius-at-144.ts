export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the orbit radius has been set to 144 units
  const orbitSimulator = interactiveResponses?.['geosynchronous-orbit-simulator'];

  if (!orbitSimulator || typeof orbitSimulator !== 'object') {
    // Disable if no orbit simulator data exists
    return true;
  }

  const lowOrbitRadius = (orbitSimulator as any)?.lowOrbitRadius;

  // Disable if the radius is not set to 144 units
  return lowOrbitRadius !== 22236;
};
