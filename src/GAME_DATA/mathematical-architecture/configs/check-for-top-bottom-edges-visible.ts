export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if top and bottom edges are visible
  const topBottomEdgesVisible = interactiveResponses?.['10_0']?.['top-bottom-edges-visible'] === true;

  // Disable if top and bottom edges are not visible yet
  return !topBottomEdgesVisible;
};
