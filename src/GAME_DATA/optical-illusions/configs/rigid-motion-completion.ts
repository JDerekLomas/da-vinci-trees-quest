export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  console.log('interactiveResponses', interactiveResponses);
  return !(interactiveResponses?.['7_0']?.['rigid-motion-completion'] === true);
};
