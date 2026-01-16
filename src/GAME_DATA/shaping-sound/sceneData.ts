import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Start Scene
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1068,
      zoom: 1.02,
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
        position: {
          left: DialogPosition.START_SCREEN_LEFT,
          top: DialogPosition.START_SCREEN_TOP,
        },
        width: DialogWidth.START_SCREEN,
        disableAnimation: true,
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.micah_description',
          size: 'chat-bubble-square',
          background: '#6FE9FF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
          {
            word: 'scenes.glossary.function_transformations.word',
            definitionAsHtml: 'scenes.glossary.function_transformations.definition',
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
      blur: 5,
      pan: 1405,
      zoom: 1.015,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.S2.S2_D1_F4_C0.heading',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S2.S2_D1_F4_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        glossary: [
          {
            word: 'scenes.glossary.function_transformations.word',
            definitionAsHtml: 'scenes.glossary.function_transformations.definition',
          },
        ],
        width: '80.5vw',
        audioUrl: '/assets/audio/shaping-sound_S2_D1_F4_C0_en.mp3',
      },
    ],
  },

  // Scene 3
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 805,
      zoom: 1.025,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S3.S3_D0_FX_C9.title',
        interactions: [
          {
            name: 'digital-sound-synthesizer',
            config: 'digital-sound-synthesizer-config',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S3.S3_D1_F3_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S3_D1_F3_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S3.S3_D2_F4_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.whitaker_description',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S3_D2_F4_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.digital_synthesizer.word',
            definitionAsHtml: 'scenes.glossary.digital_synthesizer.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S3.S3_D3_F5_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S3_D3_F5_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S3.S3_D4_F6_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S3_D4_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S3.S3_D5_F7_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S3_D5_F7_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S3.S3_D6_F8_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S3_D6_F8_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S3.S3_D7_F9_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S3_D7_F9_C2_en.mp3',
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
      blur: 5,
      pan: 408,
      zoom: 1.025,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S4.S4_D0_F10_C9.title',
        interactions: [
          {
            name: 'drum-beats-without-adsr',
            config: 'drum-beats-without-adsr',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S4.S4_D0_F10_C9.about.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F10_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S4.S4_D0_F10_C9.help.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F10_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S4.S4_D1_F10_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D1_F10_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'drum-beats-without-adsr',
              step: 2,
              disabled: 'drum-beats-without-adsr-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S4.S4_D2_F11_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D2_F11_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S4.S4_D3_F12_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S4_D3_F12_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S4.S4_D4_F13_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D4_F13_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S4.S4_D5_F14_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D5_F14_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S4.S4_D6_F15_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D6_F15_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S4.S4_D7_F16_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D7_F16_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S4.S4_D8_F17_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D8_F17_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S4.S4_D9_F18_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S4_D9_F18_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S4.S4_D10_F19_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S4_D10_F19_C2_en.mp3',
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 805,
      zoom: 1.025,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S5.S5_D0_F24_C9.title',
        about: [],
        help: [],
        interactions: [
          {
            name: 'interactive-adsr-envelop',
            config: 'interactive-adsr-envelop-config',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S5.S5_D1_F24_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S5_D1_F24_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S5.S5_D2_F25_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S5_D2_F25_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S5.S5_D3_F26_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S5_D3_F26_C1_en.mp3',
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1100,
      zoom: 1.015,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S6.S6_D0_F27_C9.title',
        interactions: [
          {
            name: 'attack-phase-function',
            config: 'attack-phase-function',
          },
        ],
        about: [
          {
            heading: 'scenes.S6.S6_D0_F27_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F27_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F27_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F27_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D1_F27_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S6_D1_F27_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D2_F28_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D2_F28_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D3_F29_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S6_D3_F29_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D4_F30_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D4_F30_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D5_F31_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D5_F31_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D6_F32_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D6_F32_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D7_F33_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D7_F33_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D8_F34_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D8_F34_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D9_F35_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.function_transformations.word',
            definitionAsHtml: 'scenes.glossary.function_transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S6_D9_F35_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D10_F36_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D10_F36_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D11_F37_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S6_D11_F37_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D12_F38_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S6_D12_F38_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D13_F39_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D13_F39_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D14_F40_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D14_F40_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D15_F41_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D15_F41_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D16_F42_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D16_F42_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D17_F43_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D17_F43_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D18_F44_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D18_F44_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D19_F45_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D19_F45_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D20_F46_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D20_F46_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D21_F47_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D21_F47_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D22_F48_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D22_F48_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D23_F49_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D23_F49_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D24_F50_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D24_F50_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D25_F51_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D25_F51_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D26_F52_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D26_F52_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D27_F53_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D27_F53_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D28_F54_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
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
        interactions: [
          {
            name: 'interactive-four-inputbox',
            config: 'fine-tune-the-attack-phase',
          },
        ],
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S6_D28_F54_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D29_F55_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D29_F55_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D30_F56_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D30_F56_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S6.S6_D31_F57_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S6_D31_F57_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S6.S6_D32_F58_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'attack-phase-function',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S6_D32_F58_C1_en.mp3',
      },
    ],
  },

  // Scene 7X
  {
    name: 'scenesList.scene_7X',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 907,
      zoom: 1.035,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S7.S7_X.S7_D0_FX_C9.title',
        bodyAsHtml: 'scenes.S7.S7_X.S7_D0_FX_C9.body',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_X.S7_D1_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S7_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S7.S7_X.S7_D2_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_X.S7_D3_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_X.S7_D4_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D4_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_X.S7_D5_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D5_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_X.S7_D6_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D6_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_X.S7_D7_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D7_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S7.S7_X.S7_D8_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D8_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_X.S7_D9_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D9_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      blur: 5,
      pan: 907,
      zoom: 1.035,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S7.S7_D0_F59_C9.title',
        interactions: [
          {
            name: 'transformations-on-kick-drum',
            config: 'transformations-on-kick-drum',
          },
        ],
        about: [
          {
            heading: 'scenes.S7.S7_D0_F59_C9.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F59_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_F59_C9.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F59_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_D10_F64_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S7_D10_F64_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S7.S7_D11_F65_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S7_D11_F65_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_D12_F66_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D12_F66_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S7.S7_D13_F67_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
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
        interactions: [
          {
            name: 'interactive-four-inputbox',
            config: 'fine-tune-kick-drum',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S7_D13_F67_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S7.S7_D14_F68_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D14_F68_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_D15_F69_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S7_D15_F69_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S7.S7_D16_F70_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.envelope.word',
            definitionAsHtml: 'scenes.glossary.envelope.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S7_D16_F70_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S7.S7_D17_F71_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S7_D17_F71_C1_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 907,
      zoom: 1.035,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S8.S8_D0_F72_C9.title',
        interactions: [
          {
            name: 'transformations-on-cymbal',
            config: 'transformations-on-cymbal',
          },
        ],
        about: [
          {
            heading: 'scenes.S8.S8_D0_F72_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F72_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F72_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F72_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S8.S8_D1_F72_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S8_D1_F72_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S8.S8_D2_F73_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
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
        interactions: [
          {
            name: 'interactive-four-inputbox',
            config: 'fine-tune-cymbal',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S8_D2_F73_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S8.S8_D3_F74_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S8_D3_F74_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S8.S8_D4_F75_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S8_D4_F75_C1_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 805,
      zoom: 1.025,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S9.S9_D0_F76_C9.title',
        interactions: [
          {
            name: 'remix-beats-with-adsr',
            config: 'remix-beats-with-adsr',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_F76_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F76_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F76_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F76_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D1_F76_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr_envelope.word',
            definitionAsHtml: 'scenes.glossary.adsr_envelope.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'remix-beats-with-adsr',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S9_D1_F76_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S9.S9_D2_F77_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S9_D2_F77_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D3_F78_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S9_D3_F78_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'remix-beats-with-adsr',
              step: 1,
              disabled: 'without-adsr-play-check',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S9.S9_D4_F79_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S9_D4_F79_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D5_F80_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S9_D5_F80_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S9.S9_D6_F81_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S9_D6_F81_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D7_F82_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        events: [
          {
            payload: {
              target: 'remix-beats-with-adsr',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S9_D7_F82_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D8_F83_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'remix-beats-with-adsr',
              step: 2,
              disabled: 'kick-check-adsr-match',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S9_D8_F83_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D9_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S9_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'remix-beats-with-adsr',
              step: 2,
              disabled: 'cymbal-check-adsr-match',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D10_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/shaping-sound_S9_D10_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'remix-beats-with-adsr',
              step: 2,
              disabled: 'with-adsr-play-check',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        body: 'scenes.S9.S9_D11_F84_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/shaping-sound_S9_D11_F84_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.whitaker',
        body: 'scenes.S9.S9_D12_F85_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'remix-beats-with-adsr',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/shaping-sound_S9_D12_F85_C1_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 925,
      zoom: 1.01,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.micah',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S10.S10_D1_F86_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/shaping-sound_S10_D1_F86_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.whitaker',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S10.S10_D2_F87_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/shaping-sound_S10_D2_F87_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.micah',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S10.S10_D3_F88_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/shaping-sound_S10_D3_F88_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.whitaker',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S10.S10_D4_F89_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/shaping-sound_S10_D4_F89_C1_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      blur: 5,
      pan: 1215,
      zoom: 1.015,
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
        position: { left: '50%', top: '50%' },
        width: '67vw',
        headingColor: '#000000',
        disableAnimation: true,
        glossary: [
          {
            word: 'scenes.glossary.adsr.word',
            definitionAsHtml: 'scenes.glossary.adsr.definition',
          },
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
          {
            word: 'scenes.glossary.envelope.word',
            definitionAsHtml: 'scenes.glossary.envelope.definition',
          },
        ],
      },
    ],
  },
];
