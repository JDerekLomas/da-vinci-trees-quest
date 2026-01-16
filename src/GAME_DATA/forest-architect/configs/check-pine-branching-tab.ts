export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // Check if current tab is Pine Branching (Step 2)
  // Return true to disable navigation, false to enable
  const treeVolumeExplorer = interactiveResponses?.['tree-volume-explorer'];
  if (!treeVolumeExplorer || typeof treeVolumeExplorer !== 'object') {
    return true;
  }
  const step2ActiveTab = (treeVolumeExplorer as Record<string, unknown>)?.step2ActiveTab;
  return step2ActiveTab !== 'pine-branching';
};

