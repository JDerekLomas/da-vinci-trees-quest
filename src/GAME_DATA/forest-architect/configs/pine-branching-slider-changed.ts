export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // Check if user has changed any of the 4 Pine branching sliders
  // Return true to disable navigation, false to enable
  const treeVolumeExplorer = interactiveResponses?.['tree-volume-explorer'];
  if (!treeVolumeExplorer || typeof treeVolumeExplorer !== 'object') {
    return true;
  }
  const pineSliderChanged = (treeVolumeExplorer as Record<string, unknown>)?.pineSliderChanged;
  return !pineSliderChanged;
};

