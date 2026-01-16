export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['18_0']?.['step-2-part-2-completed'] === true);
};
