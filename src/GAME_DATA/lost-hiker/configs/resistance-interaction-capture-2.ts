export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['4_0']?.['resistance-interaction-capture-2'] === true);
};
