export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the current active slice is Circle
  const coneSlicer = interactiveResponses?.['3d-cone-slicer'];

  if (!coneSlicer || typeof coneSlicer !== 'object') {
    // Disable if no cone slicer data exists
    return true;
  }

  const activeSliceExample = (coneSlicer as any)?.activeSliceExample;

  // Disable if current active slice is not 'circle'
  return activeSliceExample !== 'circle';
};
