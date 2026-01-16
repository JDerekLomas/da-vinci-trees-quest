export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['3_0']?.['beacon-B-bearing-found'] === true);
};
