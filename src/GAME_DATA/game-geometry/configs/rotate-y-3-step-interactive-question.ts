export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  return !(interactiveResponses?.["5_0"]?.["target-1-reached"] === true);
}