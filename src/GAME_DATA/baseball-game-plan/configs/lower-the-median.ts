export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  console.log('Interactive Responses:', interactiveResponses);
  return !(interactiveResponses?.['5_0']?.['lower-the-median'] === true);
};