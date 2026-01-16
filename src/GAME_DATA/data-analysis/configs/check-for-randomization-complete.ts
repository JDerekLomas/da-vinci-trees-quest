export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // Returns true when navigation should be DISABLED (waiting for randomization to complete)
  // Returns false when navigation should be ENABLED (randomization animation finished)
  return !(interactiveResponses?.['7_0']?.['randomization-complete'] === true);
};
