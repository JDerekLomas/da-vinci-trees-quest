export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['3_0']?.['right-angle-45-completed'] === true);
};
