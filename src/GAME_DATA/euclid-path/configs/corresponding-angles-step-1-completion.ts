export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['6_0']?.['step-1-completed'] === true);
};
