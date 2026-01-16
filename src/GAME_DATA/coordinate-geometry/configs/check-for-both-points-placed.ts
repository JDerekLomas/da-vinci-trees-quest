export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the student has placed both points on the canvas
  const distanceFormula = interactiveResponses?.['distance-formula'];

  if (!distanceFormula || typeof distanceFormula !== 'object') {
    // Disable if no distance formula data exists
    return true;
  }

  const bothPointsPlaced = (distanceFormula as any)?.bothPointsPlaced;

  // Disable if both points haven't been placed yet
  return !bothPointsPlaced;
};
