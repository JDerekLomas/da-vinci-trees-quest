export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['10_0']?.['step-4-part-3-completed'] === true);
};
