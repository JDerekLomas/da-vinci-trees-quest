const config = {
  title: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.title',
  examples: [
    {
      name: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.whisper',
      emoji: '🤫',
      db: 20,
      intensity: '1 × 10⁻¹⁰',
      calculation: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.whisperCalc',
    },
    {
      name: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.speech',
      emoji: '🗣️',
      db: 60,
      intensity: '1 × 10⁻⁶',
      calculation: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.speechCalc',
    },
    {
      name: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.rock',
      emoji: '🎵',
      db: 110,
      intensity: '1 × 10⁻¹',
      calculation: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.rockCalc',
    },
    {
      name: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.jet',
      emoji: '✈️',
      db: 140,
      intensity: '1 × 10²',
      calculation: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examples.jetCalc',
    },
  ],
  termCards: [
    {
      term: 'dB',
      color: 'bg-red-50 border-red-300',
      textColor: 'text-red-800',
      title: 'dB',
      description: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.terms.db',
    },
    {
      term: 'log₁₀',
      color: 'bg-purple-50 border-purple-300',
      textColor: 'text-purple-800',
      title: 'log₁₀',
      description: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.terms.log10',
    },
    {
      term: 'I',
      color: 'bg-blue-50 border-blue-300',
      textColor: 'text-blue-800',
      title: 'I',
      description: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.terms.I',
    },
    {
      term: 'I₀',
      color: 'bg-amber-50 border-amber-300',
      textColor: 'text-amber-800',
      title: 'I₀',
      description: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.terms.I0',
    },
  ],
  labels: {
    convertTitle: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.convertTitle',
    intensityLabel: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.intensityLabel',
    resultLabel: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.resultLabel',
    examplesTitle: 'scenes.S10.S10_D0_F57_C9.decibelInteractive.examplesTitle',
  },
};

export default config;
