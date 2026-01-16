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
      initialZoom: 1.08,
    },
    logoTheme: {
      landscape: LogoTheme.LIGHT,
      portrait: LogoTheme.LIGHT,
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
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.ashford_description',
          size: 'chat-bubble-square',
          background: '#6FE9FF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        background: {
          blur: 7,
          zoom: 1.08,
          pan: 1150,
        },
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
      initialZoom: 1.04,
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
        background: {
          blur: 5,
          zoom: 1.04,
          pan: 758,
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/forest-architect_S2_D1_F4_C0_en.mp3',
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
      zoom: 1.05,
      pan: 580,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.daniela',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D1_F5_C3',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.daniela_description',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S3_D1_F5_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S3.S3_D2_F6_C2',
        position: { top: '50.7%', left: '38%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.julian_description',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutRight' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S3_D2_F6_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D3_F7_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S3_D3_F7_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.daniela',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D4_F8_C3',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S3_D4_F8_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D5_F9_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        glossary: [
          {
            word: 'scenes.glossary.lumber.word',
            definitionAsHtml: 'scenes.glossary.lumber.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S3_D5_F9_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S3.S3_D6_F10_C2',
        position: { top: '50.7%', left: '38%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutRight' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S3_D6_F10_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D7_F11_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S3_D7_F11_C1_en.mp3',
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
      blur: 4,
      zoom: 1.03,
      pan: 587,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D1_F12_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S4_D1_F12_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S4.S4_D2_F13_C2',
        position: { top: '50.7%', left: '38%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutRight' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S4_D2_F13_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D3_F14_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S4_D3_F14_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.daniela',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S4.S4_D4_F15_C3',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S4_D4_F15_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D5_F16_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S4_D5_F16_C1_en.mp3',
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 820,
      zoom: 1.035,
      blur: 5,
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
        heading: 'scenes.S5.S5_D0_FX_C9.title',
        interactions: [
          {
            name: 'tree-volume-explorer',
            config: 'tree-volume-explorer',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D1_F17_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              displayFlags: {
                showVolumeFormula: true,
                showLeonardoRule: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D1_F17_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S5.S5_D2_F18_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              displayFlags: {
                showVolumeFormula: true,
                showLeonardoRule: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D2_F18_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D3_F19_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              displayFlags: {
                showVolumeFormula: true,
                showLeonardoRule: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D3_F19_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S5.S5_D4_F20_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              displayFlags: {
                showVolumeFormula: true,
                showLeonardoRule: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D4_F20_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D5_F21_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              displayFlags: {
                showVolumeFormula: true,
                showLeonardoRule: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D5_F21_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S5.S5_D6_F22_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 1,
              displayFlags: {
                showVolumeFormula: true,
              },
              disabled: 'check-for-tab-switch',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D6_F22_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D7_F23_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 1,
              displayFlags: {
                showVolumeFormula: true,
              },
              disabled: 'check-for-slider-change',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D7_F23_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S5.S5_D8_F24_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 1,
              displayFlags: {
                showVolumeFormula: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D8_F24_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D9_F25_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 1,
              displayFlags: {
                showVolumeFormula: true,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D9_F25_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D10_F26_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D10_F26_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D11_F27_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
              disabled: 'check-oak-branching-tab',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D11_F27_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D12_F28_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
              disabled: 'oak-branching-slider-changed',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D12_F28_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D13_F29_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D13_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D14_F30_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
              disabled: 'check-pine-branching-tab',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D14_F30_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D15_F31_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
              disabled: 'pine-branching-slider-changed',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D15_F31_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S5.S5_D16_F32_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D16_F32_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S5.S5_D17_F33_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'tree-volume-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S5_D17_F33_C1_en.mp3',
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
      blur: 4,
      zoom: 1.03,
      pan: 587,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D1_F33_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S6_D1_F33_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S6.S6_D2_F34_C2',
        position: { top: '50.7%', left: '38%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutRight' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S6_D2_F34_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D3_F35_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S6_D3_F35_C1_en.mp3',
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.04,
      pan: 1010,
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
        heading: 'scenes.S7.S7_D0_F36_C9.title',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S7.S7_D0_F36_C9.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F36_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_F36_C9.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F36_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        interactions: [
          {
            name: 'timber-quality-optimizer',
            config: 'timber-quality-optimizer',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D1_F36_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D1_F36_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S7.S7_D2_F37_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D2_F37_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D3_F38_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D3_F38_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D4_F39_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D4_F39_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S7.S7_D5_F40_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D5_F40_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S7.S7_D6_F41_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D6_F41_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D7_F42_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D7_F42_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S7.S7_D8_F43_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D8_F43_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D9_F44_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D9_F44_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S7.S7_D10_F45_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D10_F45_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D11_FX_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S7.S7_D12_F46_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D12_F46_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D13_F47_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
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
        interactions: [
          {
            name: 'interactive-radio',
            config: 'height-to-diameter-ratio-question',
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D13_F47_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S7.S7_D15_F49_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'timber-quality-optimizer',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S7_D15_F49_C1_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.04,
      pan: 758,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D1_F50_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S8_D1_F50_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.daniela',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D2_F51_C3',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S8_D2_F51_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S8.S8_D3_F52_C2',
        position: { top: '50.7%', left: '38%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutRight' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S8_D3_F52_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D4_F53_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S8_D4_F53_C1_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.04,
      pan: 450,
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
        heading: 'scenes.S9.S9_D0_F54_C9.title',
        interactions: [
          {
            name: 'forest-design-explorer',
            config: 'forest-design-explorer',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S9.S9_D0_F54_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F54_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F54_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F54_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S9.S9_D1_F54_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D1_F54_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S9.S9_D2_F55_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D2_F55_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S9.S9_D3_F56_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
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
            config: 'timber-priority-question',
          },
        ],
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D3_F56_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S9.S9_D4_F57_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D4_F57_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S9.S9_D5_F58_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D5_F58_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S9.S9_D6_F59_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
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
            config: 'wider-spacing-question',
          },
        ],
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D6_F59_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S9.S9_D7_F60_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D7_F60_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S9.S9_D8_F61_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D8_F61_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S9.S9_D9_F62_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D9_F62_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S9.S9_D10_F63_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-design-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S9_D10_F63_C1_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.04,
      pan: 1010,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D1_F64_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S10_D1_F64_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S10.S10_D2_F65_C2',
        position: { top: '50.7%', left: '38%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutRight' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S10_D2_F65_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D3_F66_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S10_D3_F66_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.daniela',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S10.S10_D4_F67_C3',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S10_D4_F67_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D5_F68_C1',
        position: { top: '50.7%', left: '63.5%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOutLeft' },
        },
        glossary: [
          {
            word: 'scenes.glossary.rotation-cycle.word',
            definitionAsHtml: 'scenes.glossary.rotation-cycle.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/forest-architect_S10_D5_F68_C1_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      url: '/assets/backgrounds/bg4.webp',
      alt: 'scenes.common.bg4_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1455,
      zoom: 1.05,
      blur: 5,
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
        heading: 'scenes.S11.S11_D0_F69_C9.title',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S11.S11_D0_F69_C9.about.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F69_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_F69_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F69_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        interactions: [
          {
            name: 'forest-growth-simulator',
            config: 'forest-growth-simulator',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D1_F69_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D1_F69_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D2_F70_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D2_F70_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S11.S11_D3_F71_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D3_F71_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D4_F72_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D4_F72_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S11.S11_D5_F73_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D5_F73_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D6_F74_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D6_F74_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D7_F75_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
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
            name: 'interactive-inputbox',
            config: 'carbon-stored-per-acre-question',
          },
        ],
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D7_F75_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S11.S11_D8_F76_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D8_F76_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D9_F77_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D9_F77_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S11.S11_D10_F78_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D10_F78_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D11_F79_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D11_F79_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D12_F80_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D12_F80_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.daniela',
        body: 'scenes.S11.S11_D13_F81_C3',
        headingColor: '#EB0000',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D13_F81_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D14_F82_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D14_F82_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ashford',
        body: 'scenes.S11.S11_D15_F83_C1',
        headingColor: '#238B21',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
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
            name: 'interactive-inputbox',
            config: 'value-after-three-rotations-question',
          },
        ],
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D15_F83_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        body: 'scenes.S11.S11_D16_F84_C2',
        headingColor: '#0061FC',
        position: { right: '23%', bottom: '6.25%' },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'forest-growth-simulator',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/forest-architect_S11_D16_F84_C2_en.mp3',
      },
    ],
  },

  // Scene 12
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 320,
      zoom: 1.02,
      blur: 5,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S12.S12_D1_F85_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D1_F85_C1_en.mp3',
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S12.S12_D2_F86_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D2_F86_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.daniela',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S12.S12_D3_F87_C3',
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D3_F87_C3_en.mp3',
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S12.S12_D4_F88_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D4_F88_C2_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S12.S12_D5_F89_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D5_F89_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S12.S12_D6_F90_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D6_F90_C2_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.daniela',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S12.S12_D7_F91_C3',
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D7_F91_C3_en.mp3',
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.julian',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S12.S12_D8_F92_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D8_F92_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.ashford',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S12.S12_D9_F93_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: { duration: 300, delay: 0, entry: 'fadeIn', exit: 'fadeOut' },
        },
        audioUrl: '/assets/audio/forest-architect_S12_D9_F93_C1_en.mp3',
      },
    ],
  },

  // End Scene
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      pan: 700,
      zoom: 1.03,
      blur: 5,
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
      },
    ],
  },
];
