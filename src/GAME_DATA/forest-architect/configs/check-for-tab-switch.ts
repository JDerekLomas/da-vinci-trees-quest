export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // Check if user has switched between Oak/Pine tabs in Step 1
  // Return true to disable navigation, false to enable
  const treeVolumeExplorer = interactiveResponses?.['tree-volume-explorer'];
  if (!treeVolumeExplorer || typeof treeVolumeExplorer !== 'object') {
    return true;
  }
  const tabSwitched = (treeVolumeExplorer as Record<string, unknown>)?.tabSwitched;
  return !tabSwitched;
};

