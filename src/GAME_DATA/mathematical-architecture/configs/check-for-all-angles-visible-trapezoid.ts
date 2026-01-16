export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if all 4 angles are visible
  const allAnglesVisible = interactiveResponses?.['10_0']?.['all-angles-visible'] === true;

  // Disable if not all angles are visible yet
  return !allAnglesVisible;
};
