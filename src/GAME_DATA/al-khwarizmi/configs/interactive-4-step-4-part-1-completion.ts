export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['20_0']?.['step-4-part-1-completed'] === true);
};
