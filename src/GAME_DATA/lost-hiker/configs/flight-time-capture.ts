export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['11_0']?.['flight-time-capture'] === true);
};
