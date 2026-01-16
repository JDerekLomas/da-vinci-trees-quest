export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if opposite sides slopes are measured
  const oppositeSidesSlopeMeasured = interactiveResponses?.['8_0']?.['opposite-sides-slope-measured'] === true;

  // Disable if opposite sides slopes are not measured yet
  return !oppositeSidesSlopeMeasured;
};
