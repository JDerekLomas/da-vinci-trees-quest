export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['2_0']?.['system-calibrate-check'] === true);
};
