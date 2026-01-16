export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.['4_0']?.['has-launched-with-max-speed'] === true);
};
