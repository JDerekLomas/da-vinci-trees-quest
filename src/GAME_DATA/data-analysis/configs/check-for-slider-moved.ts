export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the slider has been moved from its default value (5)
  const distributionAnalysis = interactiveResponses?.['distribution_analysis'];

  if (!distributionAnalysis || typeof distributionAnalysis !== 'object') {
    // Disable if no distribution analysis data exists
    return true;
  }

  const threshold = (distributionAnalysis as any)?.threshold;
  const defaultThreshold = 5;

  // Disable if threshold is still at default value (user hasn't moved the slider)
  return threshold === defaultThreshold;
};
