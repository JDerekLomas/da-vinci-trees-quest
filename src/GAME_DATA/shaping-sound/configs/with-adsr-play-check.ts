export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['9_0']?.['playing-beat-with-adsr'] === true);
};
