export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['7_0']?.['is-mary-lamb-playing-base-value-1.5'] === true);
};
