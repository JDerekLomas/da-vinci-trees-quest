export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if all 4 sides are visible
  const allSidesVisible = interactiveResponses?.['10_0']?.['all-sides-visible'] === true;

  // Disable if not all sides are visible yet
  return !allSidesVisible;
};
