export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if at least one side length is visible
  const atLeastOneSideVisible = interactiveResponses?.['10_0']?.['at-least-one-side-visible'] === true;

  // Disable if no sides are visible yet
  return !atLeastOneSideVisible;
};
