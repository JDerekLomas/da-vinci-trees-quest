export interface Input {
  id: string;
  label?: string;
  type?: 'button' | 'slider' | 'number';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
}

export interface BaseInteraction {
  title: string;
  type: string;
  ariaLabel: string;
  hint?: string;
}

export interface InputBoxInteraction extends BaseInteraction {
  prefixText?: string;
  type: 'input-box';
  correctnessFunction: (inputValues: string | number) => boolean;
  postfixText?: string;
}

export type Interaction = InputBoxInteraction | TwoInputBoxInteraction | RadioButtonInteraction;

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
  value2?: string;
}

// Interface for radio button interactions
export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

export interface TwoInputBoxInteraction extends BaseInteraction {
  prefixText1?: string;
  prefixText2?: string;
  type: 'two-input-box';
  correctnessFunction: (value1: string | number, value2: string | number) => boolean;
  postfixText1?: string;
  postfixText2?: string;
}

export interface TreeVolumeExplorerInteraction {
  translations: {
    // Step 1: Trunk Geometry
    title: string;
    treeHeight: string;
    trunkDiameter: string;
    cylindrical: string;
    conical: string;
    volumeFormula: string;
    cylindricalVolume: string;
    conicalVolume: string;
    leonardoRule: string;
    trunkArea: string;
    branchAreas: string;
    crossSectionHeight: string;
    branchAreasSum: string;
    trunkAreaLabel: string;
    sum: string;
    squareFeet: string;
    cubeFeet: string;
    square: string;
    treeType: string;
    // Step 2: Branching Explorer
    branchingExplorer: string;
    oakBranching: string;
    pineBranching: string;
    branchAngle: string;
    branchDepth: string;
    lengthRatio: string;
    leonardoExponent: string;
    whorlInterval: string;
    branchesPerWhorl: string;
    maxBranchLength: string;
    initialAngle: string;
    droopFactor: string;
    daVinciRuleCheck: string;
    trunkAreaBranching: string;
    branchesAreaSumBranching: string;
    areaDifference: string;
    degrees: string;
    meters: string;
  };
  ariaLabels: {
    // Step 1
    treeHeightSlider: string;
    trunkDiameterSlider: string;
    cylindricalModelToggle: string;
    conicalModelToggle: string;
    treeVisualization: string;
    // Step 2
    oakBranchingTab: string;
    pineBranchingTab: string;
    branchAngleSlider: string;
    branchDepthSlider: string;
    lengthRatioSlider: string;
    leonardoExponentSlider: string;
    whorlIntervalSlider: string;
    branchesPerWhorlSlider: string;
    maxBranchLengthSlider: string;
    initialAngleSlider: string;
    droopFactorSlider: string;
    oakBranchingVisualization: string;
    pineBranchingVisualization: string;
  };
  colors: {
    cylindrical: string;
    conical: string;
    trunk: string;
    highlight: string;
  };
}

export interface TimberQualityOptimizerInteraction {
  translations: {
    timberQualityOptimizer: string;
    maximizeValue: string;
    poorQualityTimber: string;
    betterHeightRatio: string;
    strategicThinning: string;
    optimalSpacing: string;
    timberQuality: string;
    timberValue: string;
    carbonStorage: string;
    heightRatio: string;
    thinning: string;
    spacing: string;
    lowGradeDescription: string;
    mediumGradeDescription: string;
    highGradeDescription: string;
    premiumGradeDescription: string;
    carbonPremiumDescription: string;
    maximumPotential: string;
    branchThinningShort: string;
    optimalHeightRatioFull: string;
    branchThinningFull: string;
    spacingShort: string;
    spacingFull: string;
    currentStage: string;
    heightToDiameterRatio: string;
    branchThinningLabel: string;
    treeSpacingLabel: string;
    perCubicFoot: string;
    tonsPerAcre: string;
    optimized: string;
    poor: string;
    applied: string;
    notApplied: string;
    optimal: string;
    suboptimal: string;
    of: string;
    hdRatio: string;
    timberValueProgress: string;
    carbonStorageLabel: string;
    // 3D viewer labels
    hdRatioLabel: string;
    spacingLabel: string;
    interactive3DView: string;
  };
  ariaLabels: {
    timberVisualization: string;
    progressIndicator: string;
    qualityMetrics: string;
    navigationControls: string;
    zoomIn: string;
    zoomOut: string;
  };
}
