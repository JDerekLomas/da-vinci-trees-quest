export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if spacing slider has been adjusted
  const spacingSliderAdjusted = interactiveResponses?.['12_0']?.['spacing-slider-adjusted'] === true;

  // Disable if spacing slider hasn't been adjusted yet
  return !spacingSliderAdjusted;
};
