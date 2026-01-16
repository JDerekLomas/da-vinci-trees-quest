import { FractalsExplorerConfig } from '../interactives/interface';

const fractalsExplorerConfig: FractalsExplorerConfig = {
  presetInstruction: 'scenes.S5.S5_D0_FX_C9.preset_instruction',
  presets: [
    {
      name: 'scenes.S5.S5_D0_FX_C9.presets.preset1',
      values: {
        realPart: 0.4,
        imaginaryPart: 0.2,
      },
      bgColor: 'bg-blue-200',
    },
    {
      name: 'scenes.S5.S5_D0_FX_C9.presets.preset2',
      values: {
        realPart: -0.1,
        imaginaryPart: 0.8,
      },
      bgColor: 'bg-green-200',
    },
    {
      name: 'scenes.S5.S5_D0_FX_C9.presets.preset3',
      values: {
        realPart: -0.4,
        imaginaryPart: 0.6,
      },
      bgColor: 'bg-purple-200',
    },
    {
      name: 'scenes.S5.S5_D0_FX_C9.presets.preset4',
      values: {
        realPart: 0.4,
        imaginaryPart: 0.6,
      },
      bgColor: 'bg-pink-200',
    },
  ],
  parameters: [
    {
      id: 'realPart',
      label: 'scenes.S5.S5_D0_FX_C9.parameters.realPart',
      min: -2,
      max: 2,
      step: 0.01,
      defaultValue: -0.7,
    },
    {
      id: 'imaginaryPart',
      label: 'scenes.S5.S5_D0_FX_C9.parameters.imaginaryPart',
      min: -2,
      max: 2,
      step: 0.01,
      defaultValue: 0.27,
    },
  ],
  canvasAriaLabel: 'scenes.S5.S5_D0_FX_C9.canvas_ariaLabel',
  presetsAriaLabel: 'scenes.S5.S5_D0_FX_C9.preset_ariaLabel',
  patternChangeAnnouncement: {
    presetSelected: 'scenes.S5.S5_D0_FX_C9.preset_selected',
    parameterChanged: 'scenes.S5.S5_D0_FX_C9.parameter_changed',
  },
  zoom: {
    id: 'zoom',
    label: 'scenes.S5.S5_D0_FX_C9.zoomLevel',
    min: 0.5,
    max: 10,
    step: 0.5,
    defaultValue: 1.5,
    valuePrefix: 'x',
  },
};

export default fractalsExplorerConfig;
