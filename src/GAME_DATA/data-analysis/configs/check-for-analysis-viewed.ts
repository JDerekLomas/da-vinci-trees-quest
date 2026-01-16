export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // Returns true when navigation should be DISABLED (waiting for user to view analysis)
  // Returns false when navigation should be ENABLED (user clicked "See Analysis" button)
  return !(interactiveResponses?.['7_0']?.['analysis-viewed'] === true);
};
