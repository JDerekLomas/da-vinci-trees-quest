export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if columns slider has been adjusted
  const columnsSliderAdjusted = interactiveResponses?.['12_0']?.['columns-slider-adjusted'] === true;

  // Disable if columns slider hasn't been adjusted yet
  return !columnsSliderAdjusted;
};
