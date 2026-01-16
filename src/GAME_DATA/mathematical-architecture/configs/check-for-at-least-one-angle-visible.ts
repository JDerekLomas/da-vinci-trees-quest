export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if at least one angle is visible
  const atLeastOneAngleVisible = interactiveResponses?.['10_0']?.['at-least-one-angle-visible'] === true;

  // Disable if no angles are visible yet
  return !atLeastOneAngleVisible;
};
