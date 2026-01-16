export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['5_0']?.['a-selected'] === true);
};
