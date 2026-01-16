import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.02,
      blur: 3,
      pan: 771,
    },
    logoTheme: {
      landscape: LogoTheme.LIGHT,
      portrait: LogoTheme.DARK,
    },
    audioUrl: '/assets/audio/bgmusic.mp3',
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'start.title',
        body: 'start.description',
        headingColor: '#000',
        disableAnimation: true,
        position: {
          left: DialogPosition.START_SCREEN_LEFT,
          top: DialogPosition.START_SCREEN_TOP,
        },
        width: DialogWidth.START_SCREEN,
        glossary: [
          {
            word: 'scenes.glossary.dot_plots.word',
            definitionAsHtml: 'scenes.glossary.dot_plots.definition',
          },
          {
            word: 'scenes.glossary.histograms.word',
            definitionAsHtml: 'scenes.glossary.histograms.definition',
          },
          {
            word: 'scenes.glossary.box_plots.word',
            definitionAsHtml: 'scenes.glossary.box_plots.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.thomas_description',
          size: 'chat-bubble-square',
          background: '#C0DEFF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
      },
    ],
  },

  // Scene 2
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.1,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.S2.S2_D1_F3_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0.body',
        headingColor: '#000',
        disableAnimation: true,
        position: {
          top: '50%',
          right: '50%',
        },
        background: {
          blur: 3,
          zoom: 1.03,
          pan: 307,
        },
        width: '80.55vw',
        glossary: [
          {
            word: 'scenes.glossary.triangulation.word',
            definitionAsHtml: 'scenes.glossary.triangulation.definition',
          },
          {
            word: 'scenes.glossary.rdf.word',
            definitionAsHtml: 'scenes.glossary.rdf.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S2_D1_F3_C0_en.mp3',
      },
    ],
  },

  // Scene 3
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 849,
      zoom: 1.02,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D1_F1_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S3_D1_F1_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D2_F2_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S3_D2_F2_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D3_F3_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S3_D3_F3_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D4_F4_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S3_D4_F4_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.radio_direction_finding.word',
            definitionAsHtml: 'scenes.glossary.radio_direction_finding.definition',
          },
          {
            word: 'scenes.glossary.triangulation.word',
            definitionAsHtml: 'scenes.glossary.triangulation.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.sarah_over_radio',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D5_F5_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 1,
          pan: 1150,
          zoom: 1.4,
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S3_D5_F5_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.rdf.word',
            definitionAsHtml: 'scenes.glossary.rdf.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D6_F6_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S3_D6_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D7_F7_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S3_D7_F7_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
    ],
  },

  // Scene 4
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 695,
      zoom: 1.05,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        skipNavigation: true,
        heading: 'scenes.S4.S4_D0_FX_C9.title',
        interactions: [
          {
            name: 'rdf-bearing-station',
            config: 'rdf-bearing-station',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S4.S4_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S4.S4_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D1_F1_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 1,
              disabled: 'beacon-A-frequency-tuned-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D1_F1_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.sarah_over_radio',
        body: 'scenes.S4.S4_D2_F2_C3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D2_F2_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D3_F3_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 2,
              disabled: 'beacon-A-bearing-found-completion',
              flags: {
                enableFrequencyTuning: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableCompassBearing: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D3_F3_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D4_F4_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'bearing-finder-question-1',
          },
        ],
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'submit',
            text: 'dialog.button.submit',
          },
        ],
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 2,
              flags: {
                enableFrequencyTuning: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableCompassBearing: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D4_F4_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D5_F5_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 3,
              disabled: 'beacon-A-bearing-recorded-completion',
              flags: {
                enableFrequencyTuning: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableLockBearing: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D5_F5_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sarah_over_radio',
        body: 'scenes.S4.S4_D6_F6_C3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 3,
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D6_F6_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S4.S4_D7_F7_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 3,
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D7_F7_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D8_F8_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 3,
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D8_F8_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D9_F9_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 4,
              disabled: 'beacon-B-frequency-tuned-completion',
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: false,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D9_F9_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.sarah_over_radio',
        body: 'scenes.S4.S4_D10_F10_C3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 4,
              disabled: 'beacon-B-bearing-found-completion',
              flags: {
                enableFrequencyTuning: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D10_F10_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D11_F11_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 5,
              flags: {
                enableFrequencyTuning: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'bearing-finder-question-2',
          },
        ],
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'submit',
            text: 'dialog.button.submit',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D11_F11_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D12_F12_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 6,
              disabled: 'beacon-B-bearing-recorded-completion',
              flags: {
                enableFrequencyTuning: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
                enableLockBearing: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D12_F12_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sarah_over_radio',
        body: 'scenes.S4.S4_D13_F13_C3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 6,
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D13_F13_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S4.S4_D14_F14_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 6,
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D14_F14_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D15_F15_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 6,
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D15_F15_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.rdf.word',
            definitionAsHtml: 'scenes.glossary.rdf.definition',
          },
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D16_F16_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 7,
              disabled: 'beacon-C-frequency-tuned-completion',
              flags: {
                enableFrequencyTuning: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D16_F16_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
          {
            word: 'scenes.glossary.triangulation.word',
            definitionAsHtml: 'scenes.glossary.triangulation.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sarah_over_radio',
        body: 'scenes.S4.S4_D17_F17_C3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 7,
              flags: {
                enableFrequencyTuning: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D17_F17_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D18_F18_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 8,
              flags: {
                enableFrequencyTuning: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D18_F18_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sarah_over_radio',
        body: 'scenes.S4.S4_D19_F19_C3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 8,
              disabled: 'beacon-C-bearing-found-completion',
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D19_F19_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D20_F20_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 8,
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableBearingsLog: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'bearing-finder-question-3',
          },
        ],
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'submit',
            text: 'dialog.button.submit',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D20_F20_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S4.S4_D21_F21_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 9,
              disabled: 'beacon-C-bearing-recorded-completion',
              flags: {
                enableFrequencyTuning: true,
                enableCompassBearing: true,
                enableAntennaDirection: true,
                enableSignalStrength: true,
                enableBearingsLog: true,
                enableLockBearing: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D21_F21_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sarah_over_radio',
        body: 'scenes.S4.S4_D22_F22_C3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        events: [
          {
            payload: {
              target: 'rdf-bearing-station',
              step: 9,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S4_D22_F22_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 429,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.sarah_over_radio',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S5.S5_D1_F1_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 1,
          pan: 1150,
          zoom: 1.4,
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S5_D1_F1_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.rdf.word',
            definitionAsHtml: 'scenes.glossary.rdf.definition',
          },
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S5.S5_D2_F2_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S5_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S5.S5_D3_F3_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S5_D3_F3_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S5.S5_D4_F4_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S5_D4_F4_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 695,
      zoom: 1.05,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        skipNavigation: true,
        heading: 'scenes.S6.S6_D0_F0_C9.title',
        interactions: [
          {
            name: 'triangulation-plotter',
            config: 'triangulation-plotter',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S6.S6_D0_F0_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F0_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F0_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F0_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S6.S6_D1_F1_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D1_F1_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearings.word',
            definitionAsHtml: 'scenes.glossary.bearings.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S6.S6_D2_F2_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S6.S6_D3_F3_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D3_F3_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S6.S6_D4_F4_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 1,
              disabled: 'triangulation-plotter-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D4_F4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S6.S6_D5_F5_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 2,
              disabled: 'triangulation-plotter-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D5_F5_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S6.S6_D6_F6_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D6_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S6.S6_D7_F7_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D7_F7_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S6.S6_D8_F8_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 3,
              disabled: 'triangulation-plotter-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D8_F8_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S6.S6_D9_F9_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D9_F9_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S6.S6_D10_F10_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'triangulation-plotter',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S6_D10_F10_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 586,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D1_F1_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S7_D1_F1_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.bearing.word',
            definitionAsHtml: 'scenes.glossary.bearing.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D2_F2_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S7_D2_F2_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D3_F3_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S7_D3_F3_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D4_F4_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/calculated-rescue_S7_D4_F4_C1_en.mp3',
      },
    ],
  },

  // scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1185,
      zoom: 1.05,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      // S8_D0_FX_C9
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#000',
        isPrimaryHeading: true,
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        heading: 'scenes.S8.S8_D0_FX_C9.title',
        interactions: [
          {
            name: 'circle-calculator',
            config: 'circle-calculator',
          },
        ],
        about: [
          {
            heading: 'scenes.S8.S8_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D1_F1_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D1_F1_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D2_F2_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D2_F2_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D3_F3_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D3_F3_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D4_F4_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D4_F4_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D5_F5_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D5_F5_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D6_F6_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.circumcenter.word',
            definitionAsHtml: 'scenes.glossary.circumcenter.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D6_F6_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D7_F7_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumcenter.word',
            definitionAsHtml: 'scenes.glossary.circumcenter.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D7_F7_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D8_F8_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 3,
              displayFlags: {
                showRadiusButton: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D8_F8_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D9_F9_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 3,
              displayFlags: {
                showRadiusButton: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D9_F9_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D10_F10_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 3,
              displayFlags: {
                showRadiusButton: true,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D10_F10_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D11_F11_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'circle-calculator-question-1',
          },
        ],
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'submit',
            text: 'dialog.button.submit',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 3,
              displayFlags: {
                showRadiusButton: true,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D11_F11_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D12_F12_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 3,
              displayFlags: {
                showRadiusButton: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D12_F12_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D13_F13_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 3,
              displayFlags: {
                showRadiusButton: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D13_F13_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D14_F14_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumcenter.word',
            definitionAsHtml: 'scenes.glossary.circumcenter.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 3,
              displayFlags: {
                showRadiusButton: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D14_F14_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D15_F15_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.angle_bisector.word',
            definitionAsHtml: 'scenes.glossary.angle_bisector.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D15_F15_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D16_F16_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D16_F16_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.angle_bisector.word',
            definitionAsHtml: 'scenes.glossary.angle_bisector.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D17_F17_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.angle_bisector.word',
            definitionAsHtml: 'scenes.glossary.angle_bisector.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D17_F17_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D18_F18_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D18_F18_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.angle_bisector.word',
            definitionAsHtml: 'scenes.glossary.angle_bisector.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D19_F19_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.incenter.word',
            definitionAsHtml: 'scenes.glossary.incenter.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D19_F19_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D20_F20_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.incenter.word',
            definitionAsHtml: 'scenes.glossary.incenter.definition',
          },
          {
            word: 'scenes.glossary.angle_bisector.word',
            definitionAsHtml: 'scenes.glossary.angle_bisector.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D20_F20_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D21_F21_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D21_F21_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D22_F22_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.incenter.word',
            definitionAsHtml: 'scenes.glossary.incenter.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D22_F22_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D23_F23_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 6,
              displayFlags: {
                showRadiusButton: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D23_F23_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D24_F24_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.semi_perimeter.word',
            definitionAsHtml: 'scenes.glossary.semi_perimeter.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 6,
              displayFlags: {
                showRadiusButton: true,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D24_F24_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D25_F25_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'circle-calculator-question-2',
          },
        ],
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'submit',
            text: 'dialog.button.submit',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.semi_perimeter.word',
            definitionAsHtml: 'scenes.glossary.semi_perimeter.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 6,
              displayFlags: {
                showRadiusButton: true,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D25_F25_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D26_F26_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 6,
              displayFlags: {
                showRadiusButton: true,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.semi_perimeter.word',
            definitionAsHtml: 'scenes.glossary.semi_perimeter.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D26_F26_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D27_F27_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.semi_perimeter.word',
            definitionAsHtml: 'scenes.glossary.semi_perimeter.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 6,
              displayFlags: {
                showRadiusButton: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D27_F27_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D29_F29_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'circle-calculator',
              step: 7,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D29_F29_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D30_F30_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/calculated-rescue_S8_D30_F30_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D31_F31_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/calculated-rescue_S8_D31_F31_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D32_F32_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'circle-calculator-question-3',
          },
        ],
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'submit',
            text: 'dialog.button.submit',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D32_F32_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D33_F33_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D33_F33_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D34_F34_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D34_F34_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D35_F35_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/calculated-rescue_S8_D35_F35_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        body: 'scenes.S8.S8_D36_F36_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.circumscribed_circle.definition',
          },
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D36_F36_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.quinn',
        body: 'scenes.S8.S8_D37_F37_C2',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.inscribed_circle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_circle.definition',
          },
        ],
        audioUrl: '/assets/audio/calculated-rescue_S8_D37_F37_C2_en.mp3',
      },
    ],
  },

  // scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 455,
      zoom: 1.03,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S9.S9_D1_F0_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/calculated-rescue_S9_D1_F0_C1_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D2_F1_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/calculated-rescue_S9_D2_F1_C2_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D3_F1_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/calculated-rescue_S9_D3_F1_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.thomas',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D4_F2_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.thomas_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/calculated-rescue_S9_D4_F2_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
          {
            word: 'scenes.glossary.angle_bisector.word',
            definitionAsHtml: 'scenes.glossary.angle_bisector.definition',
          },
          {
            word: 'scenes.glossary.law_of_cosines.word',
            definitionAsHtml: 'scenes.glossary.law_of_cosines.definition',
          },
        ],
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.quinn',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D5_F3_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.quinn_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/calculated-rescue_S9_D5_F3_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      pan: 1269,
      zoom: 1.03,
      blur: 3,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    showConfetti: true,
    type: 'end-screen',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: '',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'start',
            text: 'dialog.button.start_again',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dot_plots.word',
            definitionAsHtml: 'scenes.glossary.dot_plots.definition',
          },
          {
            word: 'scenes.glossary.herons_formula.word',
            definitionAsHtml: 'scenes.glossary.herons_formula.definition',
          },
          {
            word: 'scenes.glossary.law_of_cosines.word',
            definitionAsHtml: 'scenes.glossary.law_of_cosines.definition',
          },
        ],
        position: { left: '50%', top: '50%' },
        width: '81vw',
        headingColor: '#000000',
        disableAnimation: true,
      },
    ],
  },
];
