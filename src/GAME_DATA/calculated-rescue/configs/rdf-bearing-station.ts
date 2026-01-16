const interaction = {
  totalSteps: 3,
  beacons: [
    { id: 'A', name: 'beaconA', frequency: 285, targetBearing: 42, color: '#dc2626', enabled: true },
    { id: 'B', name: 'beaconB', frequency: 315, targetBearing: 330, color: '#059669', enabled: false },
    { id: 'C', name: 'beaconC', frequency: 405, targetBearing: 82, color: '#7c3aed', enabled: false },
  ],
  signalColors: {
    peak: 'bg-green-400', // 100% signal strength
    veryStrong: 'bg-green-400', // 80-99% signal strength
    strong: 'bg-yellow-400', // 50-79% signal strength
    weak: 'bg-orange-400', // 15-49% signal strength
    noise: 'bg-red-400', // 0-14% signal strength
  },
  buttonColors: {
    lockButton: {
      enabled: {
        background: 'bg-[#004718]',
        hover: 'hover:bg-[#006121]',
        focus: 'focus:ring-[#006121]',
      },
      disabled: {
        background: 'bg-[#505763]',
        hover: 'hover:bg-[#505763]',
      },
    },
  },
  translations: {
    title: 'scenes.S4.S4_D0_FX_C9.title',
    about: {
      heading: 'scenes.S4.S4_D0_FX_C9.about.heading',
      body: 'scenes.S4.S4_D0_FX_C9.about.body',
    },
    help: {
      heading: 'scenes.S4.S4_D0_FX_C9.help.heading',
      body: 'scenes.S4.S4_D0_FX_C9.help.body',
    },
    ui: {
      rdfBearingStation: 'scenes.S4.S4_D0_FX_C9.ui.rdfBearingStation',
      selectBeacon: 'scenes.S4.S4_D0_FX_C9.ui.selectBeacon',
      frequencyTuning: 'scenes.S4.S4_D0_FX_C9.ui.frequencyTuning',
      antennaDirection: 'scenes.S4.S4_D0_FX_C9.ui.antennaDirection',
      signalStrength: 'scenes.S4.S4_D0_FX_C9.ui.signalStrength',
      lockBearing: 'scenes.S4.S4_D0_FX_C9.ui.lockBearing',
      findSignalPeak: 'scenes.S4.S4_D0_FX_C9.ui.findSignalPeak',
      compassBearing: 'scenes.S4.S4_D0_FX_C9.ui.compassBearing',
      bearingsLog: 'scenes.S4.S4_D0_FX_C9.ui.bearingsLog',
      allBearingsComplete: 'scenes.S4.S4_D0_FX_C9.ui.allBearingsComplete',
      reset: 'scenes.S4.S4_D0_FX_C9.ui.reset',
      progress: 'scenes.S4.S4_D0_FX_C9.ui.progress',
      complete: 'scenes.S4.S4_D0_FX_C9.ui.complete',
      locked: 'scenes.S4.S4_D0_FX_C9.ui.locked',
      tuned: 'scenes.S4.S4_D0_FX_C9.ui.tuned',
      tuning: 'scenes.S4.S4_D0_FX_C9.ui.tuning',
      completed: 'scenes.S4.S4_D0_FX_C9.ui.completed',
      noBearingsRecorded: 'scenes.S4.S4_D0_FX_C9.ui.noBearingsRecorded',
      accuracy: 'scenes.S4.S4_D0_FX_C9.ui.accuracy',
      target: 'scenes.S4.S4_D0_FX_C9.ui.target',
      rotateAntenna: 'scenes.S4.S4_D0_FX_C9.ui.rotateAntenna',
      strongSignalDetected: 'scenes.S4.S4_D0_FX_C9.ui.strongSignalDetected',
      signalFound: 'scenes.S4.S4_D0_FX_C9.ui.signalFound',
      tuneToFrequency: 'scenes.S4.S4_D0_FX_C9.ui.tuneToFrequency',
      selectBeaconToBegin: 'scenes.S4.S4_D0_FX_C9.ui.selectBeaconToBegin',
      allBearingsCollected: 'scenes.S4.S4_D0_FX_C9.ui.allBearingsCollected',

      // Signal strength labels
      signalPeak: 'scenes.S4.S4_D0_FX_C9.ui.signalPeak',
      signalVeryStrong: 'scenes.S4.S4_D0_FX_C9.ui.signalVeryStrong',
      signalStrong: 'scenes.S4.S4_D0_FX_C9.ui.signalStrong',
      signalWeak: 'scenes.S4.S4_D0_FX_C9.ui.signalWeak',
      signalNoise: 'scenes.S4.S4_D0_FX_C9.ui.signalNoise',

      // Cardinal directions
      compassNorth: 'scenes.S4.S4_D0_FX_C9.ui.compassNorth',
      compassEast: 'scenes.S4.S4_D0_FX_C9.ui.compassEast',
      compassSouth: 'scenes.S4.S4_D0_FX_C9.ui.compassSouth',
      compassWest: 'scenes.S4.S4_D0_FX_C9.ui.compassWest',

      // Beacon label and frequency unit
      beacon: 'scenes.S4.S4_D0_FX_C9.ui.beacon',
      frequencyUnit: 'scenes.S4.S4_D0_FX_C9.ui.frequencyUnit',
      frequencyUnitFull: 'scenes.S4.S4_D0_FX_C9.ui.frequencyUnitFull',

      // Beacon names
      beaconA: 'scenes.S4.S4_D0_FX_C9.ui.beaconA',
      beaconB: 'scenes.S4.S4_D0_FX_C9.ui.beaconB',
      beaconC: 'scenes.S4.S4_D0_FX_C9.ui.beaconC',

      // Symbols and units
      degreeSymbol: 'scenes.S4.S4_D0_FX_C9.ui.degreeSymbol',
      percentageSymbol: 'scenes.S4.S4_D0_FX_C9.ui.percentageSymbol',
      plusMinusSymbol: 'scenes.S4.S4_D0_FX_C9.ui.plusMinusSymbol',
      checkmarkSymbol: 'scenes.S4.S4_D0_FX_C9.ui.checkmarkSymbol',

      // Dynamic content templates
      bearingLogCount: 'scenes.S4.S4_D0_FX_C9.ui.bearingLogCount',
      bearingAccuracyLabel: 'scenes.S4.S4_D0_FX_C9.ui.bearingAccuracyLabel',
      frequencyDisplay: 'scenes.S4.S4_D0_FX_C9.ui.frequencyDisplay',
      antennaAngleDisplay: 'scenes.S4.S4_D0_FX_C9.ui.antennaAngleDisplay',
      signalStrengthDisplay: 'scenes.S4.S4_D0_FX_C9.ui.signalStrengthDisplay',
      bearingDegreeDisplay: 'scenes.S4.S4_D0_FX_C9.ui.bearingDegreeDisplay',
    },
    accessibility: {
      // Screen reader instructions
      instructions: 'scenes.S4.S4_D0_FX_C9.accessibility.instructions',
      instructionStep1: 'scenes.S4.S4_D0_FX_C9.accessibility.instructionStep1',
      instructionStep2: 'scenes.S4.S4_D0_FX_C9.accessibility.instructionStep2',
      instructionStep3: 'scenes.S4.S4_D0_FX_C9.accessibility.instructionStep3',
      instructionStep4: 'scenes.S4.S4_D0_FX_C9.accessibility.instructionStep4',
      keyboardInstructions: 'scenes.S4.S4_D0_FX_C9.accessibility.keyboardInstructions',

      // Progress and status
      progressHeading: 'scenes.S4.S4_D0_FX_C9.accessibility.progressHeading',
      progressStatus: 'scenes.S4.S4_D0_FX_C9.accessibility.progressStatus',

      // Beacon states
      beaconSelected: 'scenes.S4.S4_D0_FX_C9.accessibility.beaconSelected',
      beaconCompleted: 'scenes.S4.S4_D0_FX_C9.accessibility.beaconCompleted',
      beaconActive: 'scenes.S4.S4_D0_FX_C9.accessibility.beaconActive',
      beaconAvailable: 'scenes.S4.S4_D0_FX_C9.accessibility.beaconAvailable',
      beaconLocked: 'scenes.S4.S4_D0_FX_C9.accessibility.beaconLocked',

      // Frequency slider
      frequencySliderLabel: 'scenes.S4.S4_D0_FX_C9.accessibility.frequencySliderLabel',
      frequencyValue: 'scenes.S4.S4_D0_FX_C9.accessibility.frequencyValue',
      frequencyHelp: 'scenes.S4.S4_D0_FX_C9.accessibility.frequencyHelp',
      frequencyAdjusted: 'scenes.S4.S4_D0_FX_C9.accessibility.frequencyAdjusted',
      frequencyTuned: 'scenes.S4.S4_D0_FX_C9.accessibility.frequencyTuned',

      // Antenna slider
      antennaSliderLabel: 'scenes.S4.S4_D0_FX_C9.accessibility.antennaSliderLabel',
      antennaValue: 'scenes.S4.S4_D0_FX_C9.accessibility.antennaValue',
      antennaHelp: 'scenes.S4.S4_D0_FX_C9.accessibility.antennaHelp',
      antennaAdjusted: 'scenes.S4.S4_D0_FX_C9.accessibility.antennaAdjusted',

      // Signal strength
      signalStrengthMeter: 'scenes.S4.S4_D0_FX_C9.accessibility.signalStrengthMeter',
      signalStrengthDescription: 'scenes.S4.S4_D0_FX_C9.accessibility.signalStrengthDescription',
      signalStrengthChanged: 'scenes.S4.S4_D0_FX_C9.accessibility.signalStrengthChanged',
      peakSignalFound: 'scenes.S4.S4_D0_FX_C9.accessibility.peakSignalFound',

      // Bearing actions
      bearingRecorded: 'scenes.S4.S4_D0_FX_C9.accessibility.bearingRecorded',
      allBearingsComplete: 'scenes.S4.S4_D0_FX_C9.accessibility.allBearingsComplete',
      lockBearingHelp: 'scenes.S4.S4_D0_FX_C9.accessibility.lockBearingHelp',
      findPeakHelp: 'scenes.S4.S4_D0_FX_C9.accessibility.findPeakHelp',

      // Compass and lists
      compassDescription: 'scenes.S4.S4_D0_FX_C9.accessibility.compassDescription',
      recordedBearingsList: 'scenes.S4.S4_D0_FX_C9.accessibility.recordedBearingsList',
      completedBearingsList: 'scenes.S4.S4_D0_FX_C9.accessibility.completedBearingsList',
      completedBeaconIcon: 'scenes.S4.S4_D0_FX_C9.accessibility.completedBeaconIcon',
    },
  },
};

export type RDFBearingStationConfig = typeof interaction;

export default interaction;
