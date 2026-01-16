export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if diagonals are visible
  const diagonalsVisible = interactiveResponses?.['8_0']?.['diagonals-visible'] === true;

  // Disable if diagonals are not visible yet
  return !diagonalsVisible;
};
