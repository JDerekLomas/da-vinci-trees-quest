export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['10_0']?.['proof-step-2-completed'] === true);
};
