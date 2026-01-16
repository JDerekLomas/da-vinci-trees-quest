import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1 [Start Screen]
  {
    name: 'scenesList.scene_1',
    background: {
      url: '/assets/backgrounds/bg1.webp',
      alt: 'scenes.common.bg1_description',
      waitDelay: SCENE_CHANGE_DELAY,
    },
    logoTheme: {
      landscape: LogoTheme.DARK,
      portrait: LogoTheme.DARK,
    },
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
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.max_description',
          size: 'chat-bubble-square',
          background: '#C0DEFF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        background: {
          blur: 5,
          zoom: 1.08,
          pan: 1200,
        },
      },
    ],
    audioUrl: '/assets/audio/bgmusic.mp3',
  },

  // Scene 2
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: '',
        bodyAsHtml: 'scenes.S2.S2_D1_F4_C0',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 5,
          zoom: 1.12,
          pan: 1275,
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S2_D1_F4_C0_en.mp3',
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
      blur: 5,
      zoom: 1.06,
      pan: 1180,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S3.S3_D1_F6_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.jazz_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '55.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S3_D1_F6_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S3.S3_D2_F7_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S3_D2_F7_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S3.S3_D3_F8_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S3_D3_F8_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S3.S3_D4_F9_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S3_D4_F9_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S3.S3_D5_F10_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S3_D5_F10_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S3.S3_D5_F11_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S3_D5_F11_C2_en.mp3',
      },
    ],
  },

  // Scene 4
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.06,
      pan: 1180,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S4.S4_D1_F13_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '55.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S4_D1_F13_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S4.S4_D2_F14_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '53.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S4_D2_F14_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S4.S4_D3_F15_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S4_D3_F15_C1_en.mp3',
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1020,
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
        isPrimaryHeading: true,
        heading: 'scenes.S5.S5_D0_F14_C9.title',
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 7,
          pan: 0,
        },
        interactions: [
          {
            name: 'sound-wave-visualizer',
            config: 'sound-wave-visualizer',
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_F14_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F14_C9.about.body',
            accentColor: '#0061FC',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_F14_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F14_C9.help.body',
            accentColor: '#8E24AA',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S5.S5_D1_F15_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D1_F15_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S5.S5_D2_F16_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D2_F16_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S5.S5_D3_F17_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D3_F17_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S5.S5_D4_F18_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D4_F18_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S5.S5_D5_F19_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D5_F19_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S5.S5_D6_F20_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D6_F20_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S5.S5_D7_F21_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
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
            name: 'interactive-radio',
            config: 'sound-wave-question',
          },
        ],
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D7_F21_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S5.S5_D8_F22_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D8_F22_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S5.S5_D9_F23_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D9_F23_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S5.S5_D10_F24_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S5_D10_F24_C1_en.mp3',
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 480,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        skipNavigation: true,
        heading: 'scenes.S6.S6_D0_F18_C9.title',
        interactions: [
          {
            name: 'logarithmic-explorer',
            config: 'logarithmic-explorer',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S6.S6_D0_F18_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F18_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F18_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F18_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S6.S6_D1_F22_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S6_D1_F22_C1_en.mp3',
        events: [{ payload: { target: 'logarithmic-explorer', tab: 'linear' }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S6.S6_D2_F23_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S6_D2_F23_C2_en.mp3',
        events: [{ payload: { target: 'logarithmic-explorer', tab: 'linear' }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S6.S6_D3_F24_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S6_D3_F24_C1_en.mp3',
        events: [{ payload: { target: 'logarithmic-explorer', tab: 'linear' }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S6.S6_D4_F25_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S6_D4_F25_C2_en.mp3',
        events: [{ payload: { target: 'logarithmic-explorer', tab: 'log' }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S6.S6_D5_F26_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S6_D5_F26_C1_en.mp3',
        events: [{ payload: { target: 'logarithmic-explorer', tab: 'log' }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S6.S6_D6_F27_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S6_D6_F27_C2_en.mp3',
        events: [{ payload: { target: 'logarithmic-explorer', tab: 'log' }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S6.S6_D7_F28_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S6_D7_F28_C1_en.mp3',
        events: [{ payload: { target: 'logarithmic-explorer', tab: 'log' }, triggers: ['on-next', 'on-back'] }],
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.06,
      pan: 835,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S7.S7_D1_F30_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D1_F30_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.logarithmic_scale.word',
            definitionAsHtml: 'scenes.glossary.logarithmic_scale.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S7.S7_D2_F31_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '55.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D2_F31_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S7.S7_D3_F32_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D3_F32_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S7.S7_D4_F33_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D4_F33_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S7.S7_D5_F34_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D5_F34_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S7.S7_D6_F35_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D6_F35_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S7.S7_D7_F36_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D7_F36_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S7.S7_D8_F37_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D8_F37_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.logarithmic_scale.word',
            definitionAsHtml: 'scenes.glossary.logarithmic_scale.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S7.S7_D9_F38_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D9_F38_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S7.S7_D10_F39_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D10_F39_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.decibels.word',
            definitionAsHtml: 'scenes.glossary.decibels.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S7.S7_D11_F40_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D11_F40_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.decibels.word',
            definitionAsHtml: 'scenes.glossary.decibels.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S7.S7_D12_F41_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D12_F41_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S7.S7_D13_F42_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S7_D13_F42_C2_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      blur: 5,
      zoom: 1.2,
      pan: 470,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      // 1. Start with the original Scene 9 left dialog (with interactive, about, help)
      {
        side: 'left',
        isPrimaryHeading: true,
        skipNavigation: true,
        heading: 'scenes.S9.S9_D0_F50_C9.title',
        interactions: [
          {
            name: 'intensity-decibel',
            config: 'intensity-decibel',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S9.S9_D0_F50_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F50_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F50_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F50_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      // 2. Then all Scene 8 dialogs (except the formula card)
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S8.S8_D1_F44_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S8_D1_F44_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S8.S8_D2_F45_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S8_D2_F45_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S8.S8_D3_F46_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.reference_intensity.word',
            definitionAsHtml: 'scenes.glossary.reference_intensity.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S8_D3_F46_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S8.S8_D4_F47_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S8_D4_F47_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S8.S8_D5_F48_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S8_D5_F48_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S9.S9_D1_F50_C1',
        headingColor: '#EB0000',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'intensity-decibel-relation-question1',
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
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S9_D1_F50_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S9.S9_D2_F51_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S9_D2_F51_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S9.S9_D3_F52_C1',
        headingColor: '#EB0000',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'intensity-decibel-relation-question2',
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
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S9_D3_F52_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S9.S9_D4_F53_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S9_D4_F53_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S9.S9_D5_F54_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S9_D5_F54_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S9.S9_D6_F55_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [{ payload: { target: 'intensity-decibel', flipAxes: true }, triggers: ['on-next', 'on-back'] }],
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S9_D6_F55_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S9.S9_D7_F57_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        glossary: [
          {
            word: 'scenes.glossary.decibels.word',
            definitionAsHtml: 'scenes.glossary.decibels.definition',
          },
        ],
        events: [{ payload: { target: 'intensity-decibel', flipAxes: false }, triggers: ['on-next', 'on-back'] }],
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D1_F57_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S9.S9_D8_F58_C1',
        headingColor: '#EB0000',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'intensity-decibel-formula-question',
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
        events: [{ payload: { target: 'intensity-decibel', flipAxes: false }, triggers: ['on-next', 'on-back'] }],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D2_F58_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S9.S9_D9_F59_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D3_F59_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.25,
      pan: 110,
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
        isPrimaryHeading: true,
        heading: 'scenes.S10.S10_D0_F57_C9.title',
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 7,
          pan: 0,
        },
        interactions: [
          {
            name: 'decibel-formula-interactive',
            config: 'decibel-formula-interactive',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F57_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F57_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S10.S10_D1_F60_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D1_F60_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S10.S10_D2_F61_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D2_F61_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S10.S10_D3_F62_C1',
        headingColor: '#EB0000',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'decibel-calculation-question',
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
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D3_F62_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S10.S10_D4_F63_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D4_F63_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S10.S10_D5_F64_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S10_D5_F64_C1_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.23,
      pan: 1125,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S11.S11_D1_F63_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '36%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S11_D1_F63_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S11.S11_D2_F64_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '55.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S11_D2_F64_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S11.S11_D3_F65_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
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
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S11_D3_F65_C2_en.mp3',
      },
    ],
  },

  // Scene 12
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.25,
      pan: 110,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        skipNavigation: true,
        heading: 'scenes.S12.S12_D0_F76_C9.title',
        interactions: [
          {
            name: 'sound-level-sim',
            config: 'sound-level-sim',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S12.S12_D0_F76_C9.about.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F76_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S12.S12_D0_F76_C9.help.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F76_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S12.S12_D1_F69_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S12_D1_F69_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S12.S12_D2_F70_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.summation.word',
            definitionAsHtml: 'scenes.glossary.summation.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S12_D2_F70_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S12.S12_D3_F71_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S12_D3_F71_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S12.S12_D4_F72_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S12_D4_F72_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S12.S12_D5_F73_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S12_D5_F73_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S12.S12_D6_F74_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S12_D6_F74_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S12.S12_D7_F76_C1',
        headingColor: '#EB0000',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'sound-level-simulator-question',
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
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S13_D1_F76_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S12.S12_D8_F77_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S13_D2_F77_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S12.S12_D9_F78_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S13_D3_F78_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S12.S12_D10_F79_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S13_D4_F79_C2_en.mp3',
      },
    ],
  },

  // Scene 14
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.23,
      pan: 1335,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S14.S14_D1_F81_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '55.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S14_D1_F81_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S14.S14_D2_F82_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '53.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S14_D2_F82_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S14.S14_D3_F83_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S14_D3_F83_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S14.S14_D4_F84_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '53.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S14_D4_F84_C2_en.mp3',
      },
    ],
  },

  // Scene 15
  {
    name: 'scenesList.scene_15',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.4,
      pan: 1080,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        skipNavigation: true,
        heading: 'scenes.S15.S15_D0_F86_C9.title',
        interactions: [
          {
            name: 'inverse-square-graph',
            config: 'inverse-square-graph',
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
        heading: 'scenes.common.jazz',
        body: 'scenes.S15.S15_D1_F86_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S15_D1_F86_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S15.S15_D2_F87_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S15_D2_F87_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S15.S15_D3_F88_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S15_D3_F88_C1_en.mp3',
      },
    ],
  },

  // Scene 16
  {
    name: 'scenesList.scene_16',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.4,
      pan: 1080,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        skipNavigation: true,
        heading: 'scenes.S16.S16_D0_90_C9.title',
        interactions: [
          {
            name: 'inverse-square-law',
            config: 'inverse-square-law',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S16.S16_D0_90_C9.about.heading',
            bodyAsHtml: 'scenes.S16.S16_D0_90_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S16.S16_D0_90_C9.help.heading',
            bodyAsHtml: 'scenes.S16.S16_D0_90_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S16.S16_D1_F90_C1',
        headingColor: '#EB0000',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'inverse-square-law-question',
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
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S16_D1_F90_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S16.S16_D2_F91_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S16_D2_F91_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S16.S16_D3_F92_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S16_D3_F92_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S16.S16_D4_F93_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S16_D4_F93_C2_en.mp3',
      },
    ],
  },

  // Scene 17
  {
    name: 'scenesList.scene_17',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.23,
      pan: 940,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.jazz',
        bodyAsHtml: 'scenes.S17.S17_D1_F95_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '55.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S17_D1_F95_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        bodyAsHtml: 'scenes.S17.S17_D2_F96_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '53.5vw',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S17_D2_F96_C2_en.mp3',
      },
    ],
  },

  // Scene 18
  {
    name: 'scenesList.scene_18',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.4,
      pan: 1080,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        skipNavigation: true,
        heading: 'scenes.S18.S18_D0_F98_C9.title',
        interactions: [
          {
            name: 'speaker-optimizer',
            config: 'speaker-optimizer',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S18.S18_D0_F98_C9.info.heading',
            bodyAsHtml: 'scenes.S18.S18_D0_F98_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S18.S18_D0_F98_C9.help.heading',
            bodyAsHtml: 'scenes.S18.S18_D0_F98_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S18.S18_D1_F98_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D1_F98_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S18.S18_D2_F99_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D2_F99_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S18.S18_D3_F100_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
          {
            word: 'scenes.glossary.logarithmic_addition.word',
            definitionAsHtml: 'scenes.glossary.logarithmic_addition.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D3_F100_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S18.S18_D4_F101_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D4_F101_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S18.S18_D5_F102_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D5_F102_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S18.S18_D6_F103_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D6_F103_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S18.S18_D7_F104_C1',
        headingColor: '#EB0000',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'speaker-distance-optimizer-question',
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
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D7_F104_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        body: 'scenes.S18.S18_D8_F105_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D8_F105_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jazz',
        body: 'scenes.S18.S18_D9_F106_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
          {
            word: 'scenes.glossary.logarithmic_addition.word',
            definitionAsHtml: 'scenes.glossary.logarithmic_addition.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F2B875',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S18_D9_F106_C1_en.mp3',
      },
    ],
  },

  // Scene 19 [Pre-Ending]
  {
    name: 'scenesList.scene_19',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1386,
      zoom: 1.07,
      blur: 5,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.max',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S19.S19_D1_F106_C2',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S19_D1_F106_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.jazz',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S19.S19_D2_F107_C1',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S19_D2_F107_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.max',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S19.S19_D3_F108_C2',
        audioUrl: '/assets/audio/engineering-the-perfect-beat_S19_D3_F108_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
          {
            word: 'scenes.glossary.logarithmic_addition.word',
            definitionAsHtml: 'scenes.glossary.logarithmic_addition.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
      },
    ],
  },

  // End Screen
  {
    name: 'scenesList.scene_19',
    background: {
      url: '/assets/backgrounds/bg4.webp',
      alt: 'scenes.common.bg4_description',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.2,
      pan: 780,
      zoom: 1.08,
      blur: 5,
    },
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: '',
        body: 'scenes.quest_completion.content',
        headingColor: '',
        disableAnimation: true,
        glossary: [
          {
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
          },
        ],
        position: { left: '50%', top: '50%' },
        width: '80vw',
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
      },
    ],
  },
];
