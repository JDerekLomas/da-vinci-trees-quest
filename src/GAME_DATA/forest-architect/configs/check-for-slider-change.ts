export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // Check if user has changed height or diameter slider in Step 1
  // Return true to disable navigation, false to enable
  const treeVolumeExplorer = interactiveResponses?.['tree-volume-explorer'];
  if (!treeVolumeExplorer || typeof treeVolumeExplorer !== 'object') {
    return true;
  }
  const step1SliderChanged = (treeVolumeExplorer as Record<string, unknown>)?.step1SliderChanged;
  return !step1SliderChanged;
};

