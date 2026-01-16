import { TerrainGeneratorConfig } from '../interactives/interface';

const terrainGeneratorConfig: TerrainGeneratorConfig = {
  instruction: 'scenes.S11.S11_D0_FX_C9.instruction',
  parameters: [
    {
      id: 'realPart',
      label: 'scenes.S11.S11_D0_FX_C9.realPart',
      min: -2,
      max: 2,
      step: 0.05,
      defaultValue: -0.8,
    },
    {
      id: 'imaginaryPart',
      label: 'scenes.S11.S11_D0_FX_C9.imaginaryPart',
      min: -2,
      max: 2,
      step: 0.05,
      defaultValue: 0.2,
    },
  ],
  colorThemesLabel: 'scenes.S11.S11_D0_FX_C9.colorTheme',
  themeSelectorAriaLabel: 'scenes.S11.S11_D0_FX_C9.themeSelector_ariaLabel',
  colorThemes: [
    {
      id: 'earth',
      name: 'scenes.S11.S11_D0_FX_C9.colorThemes.earthLike.name',
      description: 'scenes.S11.S11_D0_FX_C9.colorThemes.earthLike.description',
      color: 'bg-green-200',
    },
    {
      id: 'alien',
      name: 'scenes.S11.S11_D0_FX_C9.colorThemes.desertWorld.name',
      description: 'scenes.S11.S11_D0_FX_C9.colorThemes.desertWorld.description',
      color: 'bg-orange-200',
    },
    {
      id: 'frozen',
      name: 'scenes.S11.S11_D0_FX_C9.colorThemes.iceWorld.name',
      description: 'scenes.S11.S11_D0_FX_C9.colorThemes.iceWorld.description',
      color: 'bg-blue-200',
    },
  ],
  presetsLabel: 'scenes.S11.S11_D0_FX_C9.landscapes',
  presetsAriaLabel: 'scenes.S11.S11_D0_FX_C9.presets_ariaLabel',
  presets: [
    {
      name: 'scenes.S11.S11_D0_FX_C9.presets.alpineLakes',
      values: { realPart: -0.8, imaginaryPart: 0.2 },
      bgColor: 'bg-purple-200',
    },
    {
      name: 'scenes.S11.S11_D0_FX_C9.presets.islands',
      values: { realPart: -1.1, imaginaryPart: 0.6 },
      bgColor: 'bg-green-200',
    },
    {
      name: 'scenes.S11.S11_D0_FX_C9.presets.mountains',
      values: { realPart: 0.28, imaginaryPart: -0.01 },
      bgColor: 'bg-yellow-200',
    },
    {
      name: 'scenes.S11.S11_D0_FX_C9.presets.coastal',
      values: { realPart: -0.4, imaginaryPart: 0.6 },
      bgColor: 'bg-pink-200',
    },
    {
      name: 'scenes.S11.S11_D0_FX_C9.presets.desert',
      values: { realPart: -0.7, imaginaryPart: -0.5 },
      bgColor: 'bg-orange-200',
    },
  ],
  landscapeCanvas: {
    ariaLabel: 'scenes.S11.S11_D0_FX_C9.landscape_canvas.ariaLabel',
  },
  presetSelected: 'scenes.S11.S11_D0_FX_C9.presetSelected',
  themeSelected: 'scenes.S11.S11_D0_FX_C9.themeSelected',
  landscapeChanged: 'scenes.S11.S11_D0_FX_C9.landscapeChanged',
};

export default terrainGeneratorConfig;
