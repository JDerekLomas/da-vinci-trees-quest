import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1 [Title Screen]
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
    },
    logoTheme: {
      landscape: LogoTheme.LIGHT,
      portrait: LogoTheme.LIGHT,
    },
    type: 'one-at-a-time',
    audioUrl: '/assets/audio/bgmusic.mp3',
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
          alt: '',
          size: 'chat-bubble-square',
          background: '#C6D8FF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        background: {
          blur: 4,
          zoom: 1.03,
          pan: 1250,
        },
      },
    ],
  },

  // Scene 2 [Welcome Screen]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 1550,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.S2.S2_D1_FX_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_FX_C0.body',
        headingColor: '#333333',
        audioUrl: '/assets/audio/mathematical-architecture_S2_D1_FX_C0_en.mp3',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        glossary: [
          {
            word: 'scenes.glossary.tessellation.word',
            definitionAsHtml: 'scenes.glossary.tessellation.definition',
          },
        ],
      },
    ],
  },

  // Scene 3 [Introduction]
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 1000,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S3.S3_D1_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D1_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S3.S3_D2_FX_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.char2_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D2_FX_C2_en.mp3',
      },
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S3.S3_D3_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D3_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S3.S3_D4_FX_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.char2_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D4_FX_C2_en.mp3',
      },
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S3.S3_D5_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D5_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S3.S3_D6_FX_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.char2_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D6_FX_C2_en.mp3',
      },
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S3.S3_D7_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D7_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S3.S3_D8_FX_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.char2_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D8_FX_C2_en.mp3',
      },
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S3.S3_D9_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D9_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S3.S3_D10_FX_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.char2_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D10_FX_C2_en.mp3',
      },
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S3.S3_D11_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S3_D11_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.geodesic_domes.word',
            definitionAsHtml: 'scenes.glossary.geodesic_domes.definition',
          },
        ],
      },
    ],
  },

  // Scene 4 [Geodesic Domes]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 800,
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
        headingColor: '#333333',
        interactions: [
          {
            name: 'geodesic-domes',
            config: 'geodesic-domes-config',
            enableStateExchange: true,
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.geodesic_domes.word',
            definitionAsHtml: 'scenes.glossary.geodesic_domes.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S4.S4_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D1_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S4.S4_D2_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D2_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D3_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S4.S4_D4_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D4_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D5_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S4.S4_D6_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D6_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D7_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S4.S4_D8_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D8_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S4.S4_D10_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S4_D10_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geodesic-domes',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
    ],
  },

  // Scene 5 [Tiling Different Shapes]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 800,
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
        headingColor: '#333333',
        interactions: [
          {
            name: 'shape-tiling',
            config: 'shape-tiling-config',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S5_D1_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S5_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D3_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S5_D3_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 6 [Angle Sum Explorer]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 800,
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
        heading: 'scenes.S6.S6_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'angle-sum-explorer',
            config: 'angle-sum-explorer-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S6.S6_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S6.S6_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D1_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 3,
              checkTriangleTiling: true,
              disabled: 'check-for-triangle-tiling',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S6.S6_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D2_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S6.S6_D3_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D3_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 4,
              checkSquareTiling: true,
              disabled: 'check-for-square-tiling',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S6.S6_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D4_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S6.S6_D5_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D5_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 5,
              checkPentagonTiling: true,
              disabled: 'check-for-pentagon-tiling',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S6.S6_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D6_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S6.S6_D7_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D7_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 6,
              checkHexagonTiling: true,
              disabled: 'check-for-hexagon-tiling',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S6.S6_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D8_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 6,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S6.S6_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 6,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S6.S6_D10_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D10_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 6,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S6.S6_D11_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D11_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 6,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S6.S6_D12_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S6_D12_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'angle-sum-explorer',
              shape: 6,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
    ],
  },

  // Scene 7 [Quadrilateral Explorer]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 200,
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
        heading: 'scenes.S7.S7_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'quadrilateral-explorer',
            config: 'quadrilateral-explorer-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S7.S7_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D1_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'quadrilateral-explorer',
              checkForShapeExploration: true,
              disabled: 'check-for-shapes-exploration',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D2_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D3_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D3_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'quadrilateral-explorer',
              checkForSkewAndRatioChange: true,
              disabled: 'check-for-skew-and-ratio-change',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D5_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D5_FX_C2_en.mp3',
        interactions: [
          {
            name: 'interactive-radio',
            config: 'quadrilateral-properties-question',
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
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D6_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D7_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D8_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D9_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S7_D9_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 8 [Initial Dome Modeling]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 800,
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
        heading: 'scenes.S8.S8_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: '3d-dome-visualizer',
            config: '3d-dome-visualizer-config',
            enableStateExchange: true,
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.geodesic_dome.word',
            definitionAsHtml: 'scenes.glossary.geodesic_dome.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D1_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D3_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D5_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D5_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D6_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D7_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D7_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D9_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S8_D9_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
    ],
  },

  // Scene 9 [Parallelogram Definition & Verification]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 1000,
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
        heading: 'scenes.S9.S9_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'panel-inspector-parallelogram',
            config: 'panel-inspector-parallelogram-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D1_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D2_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D2_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D4_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D6_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D6_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'panel-inspector-parallelogram',
              disabled: 'check-for-protractor-and-angles-visible',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D8_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D8_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'panel-inspector-parallelogram',
              disabled: 'check-for-all-sides-visible-parallelogram',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D10_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D10_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'panel-inspector-parallelogram',
              disabled: 'check-for-opposite-sides-slope-measured',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D11_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D16_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D16_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D12_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D12_FX_C2_en.mp3',
        interactions: [
          {
            name: 'interactive-radio',
            config: 'parallelogram-properties-question',
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
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D13_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D13_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D14_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D14_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D15_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S9_D15_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
    ],
  },

  // Scene 10 [Dome Tiling Visualization - Parallelograms]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 800,
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
        heading: 'scenes.S10.S10_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'parallelogram-verifier',
            config: 'parallelogram-verifier-config',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S10_D1_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S10_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D3_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S10_D3_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S10_D4_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D5_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S10_D5_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S10_D6_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D7_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S10_D7_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parallelogram.word',
            definitionAsHtml: 'scenes.glossary.parallelogram.definition',
          },
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
    ],
  },

  // Scene 11 [Trapezoid Definition & Verification]
  // TODO: PRINCE : Add the Audio for this scene dialogs.
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 800,
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
        heading: 'scenes.S11.S11_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'trapezoid-explorer',
            config: 'trapezoid-explorer-config',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D1_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'trapezoid-explorer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D2_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D2_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'trapezoid-explorer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D3_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D3_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'trapezoid-explorer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D4_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'trapezoid-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D5_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D5_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'trapezoid-explorer',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D6_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D6_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'trapezoid-explorer',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D8_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D8_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S11_D9_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.trapezoid.word',
            definitionAsHtml: 'scenes.glossary.trapezoid.definition',
          },
        ],
      },
    ],
  },

  // Scene 12 [Final Design Optimization]
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 1000,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D2_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S12_D2_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D3_FX_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.char2_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S12_D3_FX_C2_en.mp3',
      },
      {
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D4_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.char1_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S12_D4_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D5_FX_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.char2_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        width: '56vw',
        audioUrl: '/assets/audio/mathematical-architecture_S12_D5_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 13 [Final Dome Builder]
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 1150,
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
        heading: 'scenes.S13.S13_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'dome-builder',
            config: 'dome-builder-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S13.S13_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S13.S13_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S13.S13_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S13.S13_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D1_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
          {
            payload: {
              target: 'dome-builder',
              disabled: 'check-for-skew-slider-adjusted',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D2_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D3_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D3_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
          {
            payload: {
              target: 'dome-builder',
              disabled: 'check-for-levels-slider-adjusted',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D4_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D5_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D5_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
          {
            payload: {
              target: 'dome-builder',
              disabled: 'check-for-columns-slider-adjusted',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D6_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D7_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D7_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
          {
            payload: {
              target: 'dome-builder',
              disabled: 'check-for-spacing-slider-adjusted',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D8_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D10_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D10_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D11_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/mathematical-architecture_S13_D11_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'dome-builder',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
    ],
  },

  // Scene 14 [Conclusion]
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.15,
      pan: 1000,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S14.S14_D1_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/mathematical-architecture_S14_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S14.S14_D2_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/mathematical-architecture_S14_D2_FX_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S14.S14_D3_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/mathematical-architecture_S14_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S14.S14_D4_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/mathematical-architecture_S14_D4_FX_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S14.S14_D5_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/mathematical-architecture_S14_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S14.S14_D6_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/mathematical-architecture_S14_D6_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 15 [Ending Screen]
  {
    name: 'scenesList.scene_15',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 1300,
    },
    showConfetti: true,
    type: 'end-screen',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: '',
        headingColor: '#333333',
        disableAnimation: true,
        position: { left: '50%', top: '50%' },
        width: '81vw',
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
