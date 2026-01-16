export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
  // The function returns true when the event should be DISABLED
  // Check if the plane angle slider has been manually adjusted by the user
  const coneSlicer = interactiveResponses?.['3d-cone-slicer'];

  if (!coneSlicer || typeof coneSlicer !== 'object') {
    // Disable if no cone slicer data exists
    return true;
  }

  const angleSliderManuallyAdjusted = (coneSlicer as any)?.angleSliderManuallyAdjusted;

  // Disable if the angle slider hasn't been manually adjusted yet
  return !angleSliderManuallyAdjusted;
};
