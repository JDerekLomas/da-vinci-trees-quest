export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if levels slider has been adjusted
  const levelsSliderAdjusted = interactiveResponses?.['12_0']?.['levels-slider-adjusted'] === true;

  // Disable if levels slider hasn't been adjusted yet
  return !levelsSliderAdjusted;
};
