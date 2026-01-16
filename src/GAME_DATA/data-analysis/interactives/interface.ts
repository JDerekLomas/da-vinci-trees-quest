export interface VolunteerSelectionSimulatorConfig {
  translations: Record<string, string>;
}

export interface VolunteerSelectionSimulatorProps {
  interaction: VolunteerSelectionSimulatorConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface Participant {
  color: string;
  id: string;
}

export interface FactorColor {
  color: string;
  label: string;
  type: string;
}

export interface FlowCardProps {
  title: string;
  subtitle?: string;
  color: string;
  children?: React.ReactNode;
  note?: string;
}

export interface ParticipantIconProps {
  color: string;
  visible: boolean;
  delay: number;
}

export interface ArrowProps {
  horizontal?: boolean;
  short?: boolean;
}

export interface StudyDesignAndRandomizationState {
  step: number;
  flowChartStep: number;
}

export interface StudyDesignAndRandomizationConfig {
  translations: Record<string, string>;
}

export interface StudyDesignAndRandomizationProps {
  interaction: StudyDesignAndRandomizationConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface GroupComparisonBoxPlotConfig {
  translations: Record<string, string>;
}

export interface GroupComparisonBoxPlotProps {
  interaction: GroupComparisonBoxPlotConfig;
}

export interface GroupComparisonBoxPlotState {
  animated: boolean;
  showComparison: boolean;
}

export interface StatisticalSignificanceConfig {
  translations: Record<string, string>;
}

export interface StatisticalSignificanceProps {
  interaction: StatisticalSignificanceConfig;
}

export interface StatisticalSignificanceState {
  animated: boolean;
  displayPValue: number;
  displayMean: number;
}

export interface DistributionAnalysisConfig {
  translations: Record<string, string>;
}

export interface DistributionAnalysisProps {
  interaction: DistributionAnalysisConfig;
}

export interface DistributionAnalysisState {
  threshold: number;
}

export interface SubgroupDistributionAnalysisConfig {
  translations: Record<string, string>;
}

export interface SubgroupDistributionAnalysisProps {
  interaction: SubgroupDistributionAnalysisConfig;
}

export interface SubgroupDistributionAnalysisState {
  step: number;
}

export interface InteractionState {
  isCorrect?: boolean;
  isEmpty?: boolean;
  value?: string;
  value2?: string;
}

export interface RadioButtonInteraction {
  title: string;
  prefixText?: string;
  type: 'radio-button';
  options: { value: string; label: string }[];
  correctnessFunction?: (selectedValue: string) => boolean;
  ariaLabel?: string;
}

export interface RandomizationInteractiveConfig {
  translations: Record<string, string>;
}

export interface RandomizationInteractiveProps {
  interaction: RandomizationInteractiveConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

export interface RandomizationDisplayFlags {
  showRandomizeButtons?: boolean;
  showAnalysisButton?: boolean;
}
