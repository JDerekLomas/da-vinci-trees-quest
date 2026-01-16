export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if skew slider has been adjusted
  const skewSliderAdjusted = interactiveResponses?.['12_0']?.['skew-slider-adjusted'] === true;

  // Disable if skew slider hasn't been adjusted yet
  return !skewSliderAdjusted;
};
