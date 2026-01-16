export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['9_0']?.['step-6-completed'] === true);
};
