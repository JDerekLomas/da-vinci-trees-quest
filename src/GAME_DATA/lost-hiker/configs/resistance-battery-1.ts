export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['7_0']?.['resistance-battery-1'] === true);
};
