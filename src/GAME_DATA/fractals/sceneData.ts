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
      initialZoom: 1.05,
    },
    logoTheme: {
      landscape: LogoTheme.DARK,
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
          alt: 'scenes.common.char2_description',
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
          zoom: 1.06,
          pan: 1172,
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
        ],
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
      pan: 1541,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.S2.S2_D1_FX_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_FX_C0.body',
        headingColor: '#333333',
        audioUrl: '/assets/audio/fractals_S2_D1_FX_C0_en.mp3',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
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
      zoom: 1.06,
      pan: 856,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S3_D1_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D2_FX_C2',
        audioUrl: '/assets/audio/fractals_S3_D2_FX_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S3_D3_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D4_FX_C2',
        audioUrl: '/assets/audio/fractals_S3_D4_FX_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
      },
    ],
  },

  // Scene 4 [Fractals in Nature]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.06,
      pan: 1506,
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
            name: 'image-container',
            config: 'fractals-in-nature-config',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S4_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S4.S4_D2_FX_C2',
        audioUrl: '/assets/audio/fractals_S4_D2_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S4_D3_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.self_similarity.word',
            definitionAsHtml: 'scenes.glossary.self_similarity.definition',
          },
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
    ],
  },

  // Scene 5 [Exploring Fractals]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.06,
      pan: 856,
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
            name: 'fractals-explorer',
            config: 'fractals-explorer-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.info.body',
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
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D1_FX_C2',
        audioUrl: '/assets/audio/fractals_S5_D1_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D2_FX_C1',
        audioUrl: '/assets/audio/fractals_S5_D2_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.julia_set.word',
            definitionAsHtml: 'scenes.glossary.julia_set.definition',
          },
        ],
        interactions: [
          {
            name: 'mcq-question',
            config: 'itr1-question1-config',
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
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S5_D3_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D4_FX_C1',
        audioUrl: '/assets/audio/fractals_S5_D4_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'fractals-explorer',
              step: 1,
              disabled: 'disable-event1',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D5_FX_C2',
        audioUrl: '/assets/audio/fractals_S5_D5_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D6_FX_C1',
        audioUrl: '/assets/audio/fractals_S5_D6_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'fractals-explorer',
              step: 3,
              disabled: 'disable-event10',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D7_FX_C2',
        audioUrl: '/assets/audio/fractals_S5_D7_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D8_FX_C2',
        audioUrl: '/assets/audio/fractals_S5_D8_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
    ],
  },

  // Scene 6 [About Complex Numbers]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.04,
      pan: 819,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S6_D1_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D2_FX_C2',
        audioUrl: '/assets/audio/fractals_S6_D2_FX_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S6_D3_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D4_FX_C2',
        audioUrl: '/assets/audio/fractals_S6_D4_FX_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D5_FX_C1',
        audioUrl: '/assets/audio/fractals_S6_D5_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D6_FX_C2',
        audioUrl: '/assets/audio/fractals_S6_D6_FX_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
        ],
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D7_FX_C1',
        audioUrl: '/assets/audio/fractals_S6_D7_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
      },
    ],
  },

  // Scene 7 [Plotting Complex Numbers on Complex Plane]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.05,
      pan: 1190,
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
            name: 'complex-number-plotter',
            config: 'complex-number-plotter-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S7.S7_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_FX_C9.info.body',
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
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D2_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D2_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D3_FX_C2',
        audioUrl: '/assets/audio/fractals_S7_D3_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D4_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D4_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D5_FX_C2',
        audioUrl: '/assets/audio/fractals_S7_D5_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D6_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D6_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        interactions: [
          {
            name: 'mcq-question',
            config: 'itr2-question1-config',
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
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D7_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D7_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D8_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D8_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'complex-number-plotter',
              step: 1,
              disabled: 'disable-event3',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D9_FX_C2',
        audioUrl: '/assets/audio/fractals_S7_D9_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D10_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D10_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_number.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D11_FX_C2',
        audioUrl: '/assets/audio/fractals_S7_D11_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D12_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D12_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_number.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D13_FX_C2',
        audioUrl: '/assets/audio/fractals_S7_D13_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D14_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D14_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_number.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D15_FX_C1',
        audioUrl: '/assets/audio/fractals_S7_D15_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
    ],
  },

  // Scene 8X [Arithmetic Operations on Complex Numbers]
  {
    name: 'scenesList.scene_8X',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.04,
      pan: 453,
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
        heading: 'scenes.S8.S8_X.S8_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'arithmetic-operations',
            config: 'arithmetic-operations-config',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_X.S8_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
          {
            word: 'scenes.glossary.geometric_transformations.word',
            definitionAsHtml: 'scenes.glossary.geometric_transformations.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_X.S8_D2_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D2_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        interactions: [
          {
            name: 'mcq-question',
            config: 'pre-itr3-question1-config',
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
              target: 'arithmetic-operations',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_X.S8_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D3_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_X.S8_D4_FX_C2',
        audioUrl: '/assets/audio/fractals_S8_D4_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_X.S8_D5_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D5_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_X.S8_D6_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D6_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        interactions: [
          {
            name: 'mcq-question',
            config: 'pre-itr3-question2-config',
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
              target: 'arithmetic-operations',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_X.S8_D7_FX_C2',
        audioUrl: '/assets/audio/fractals_S8_D7_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_X.S8_D8_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D8_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.origin.word',
            definitionAsHtml: 'scenes.glossary.origin.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_X.S8_D9_FX_C2',
        audioUrl: '/assets/audio/fractals_S8_D9_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.origin.word',
            definitionAsHtml: 'scenes.glossary.origin.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_X.S8_D10_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D10_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
          {
            word: 'scenes.glossary.geometric_transformations.word',
            definitionAsHtml: 'scenes.glossary.geometric_transformations.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'arithmetic-operations',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
    ],
  },

  // Scene 8 [Using Complex Numbers to Create Fractals]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      blur: 4,
      zoom: 1.1,
      pan: 582,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D11_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D11_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S8.S8_D12_FX_C2',
        audioUrl: '/assets/audio/fractals_S8_D12_FX_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D13_FX_C1',
        audioUrl: '/assets/audio/fractals_S8_D13_FX_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
    ],
  },

  // Scene 9 [Understanding Fractals Creation Process]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.1,
      pan: 582,
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
            name: 'fractals-creation-simulator',
            config: 'fractals-creation-simulator-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_FX_C9.info.body',
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
        audioUrl: '/assets/audio/fractals_S9_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D2_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D2_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D3_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D4_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D4_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'fractals-creation-simulator',
              step: 1,
              disabled: 'disable-event4',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D5_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D5_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'fractals-creation-simulator',
              step: 2,
              disabled: 'disable-event5',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D6_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D6_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D7_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D7_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
          {
            word: 'scenes.glossary.geometric_transformations.word',
            definitionAsHtml: 'scenes.glossary.geometric_transformations.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D8_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D8_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.origin.word',
            definitionAsHtml: 'scenes.glossary.origin.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D9_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D9_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D10_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D10_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        interactions: [
          {
            name: 'mcq-question',
            config: 'itr3-question1-config',
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
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D11_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D11_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.escape_threshold.word',
            definitionAsHtml: 'scenes.glossary.escape_threshold.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D12_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D12_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.origin.word',
            definitionAsHtml: 'scenes.glossary.origin.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D13_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D13_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D14_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D14_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D15_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D15_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D16_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D16_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D17_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D17_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D18_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D18_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D19_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D19_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D20_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D20_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D21_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D21_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'fractals-creation-simulator',
              step: 3,
              disabled: 'disable-event6',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D22_FX_C2',
        audioUrl: '/assets/audio/fractals_S9_D22_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D23_FX_C1',
        audioUrl: '/assets/audio/fractals_S9_D23_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
    ],
  },

  // Scene 10 [Using Fractals in Game Design]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      blur: 4,
      zoom: 1.1,
      pan: 582,
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
            name: 'image-container',
            config: 'realistic-terrain-landscape-config',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S10_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D2_FX_C2',
        audioUrl: '/assets/audio/fractals_S10_D2_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S10_D3_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D4_FX_C2',
        audioUrl: '/assets/audio/fractals_S10_D4_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D5_FX_C1',
        audioUrl: '/assets/audio/fractals_S10_D5_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
    ],
  },

  // Scene 11 [Generating Terrain using Fractals]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.1,
      pan: 582,
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
            name: 'terrain-generator',
            config: 'terrain-generator-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S11.S11_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_FX_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'terrain-generator',
              step: 1,
              disabled: 'disable-event7',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D2_FX_C2',
        audioUrl: '/assets/audio/fractals_S11_D2_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D3_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        interactions: [
          {
            name: 'mcq-question',
            config: 'itr4-question1-config',
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
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D4_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D4_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D5_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D5_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'terrain-generator',
              step: 2,
              disabled: 'disable-event8',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D6_FX_C2',
        audioUrl: '/assets/audio/fractals_S11_D6_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D7_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D7_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'terrain-generator',
              step: 3,
              disabled: 'disable-event9',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D8_FX_C2',
        audioUrl: '/assets/audio/fractals_S11_D8_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.julia_set.word',
            definitionAsHtml: 'scenes.glossary.julia_set.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D9_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D9_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D10_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D10_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        interactions: [
          {
            name: 'mcq-question',
            config: 'itr4-question2-config',
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
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D11_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D11_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D12_FX_C2',
        audioUrl: '/assets/audio/fractals_S11_D12_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D13_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D13_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D14_FX_C1',
        audioUrl: '/assets/audio/fractals_S11_D14_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
      },
    ],
  },

  // Scene 12 [Pre-Ending Screen]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.06,
      pan: 1030,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D1_FX_C1',
        audioUrl: '/assets/audio/fractals_S12_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D2_FX_C2',
        audioUrl: '/assets/audio/fractals_S12_D2_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.complex_plane.word',
            definitionAsHtml: 'scenes.glossary.complex_plane.definition',
          },
          {
            word: 'scenes.glossary.complex_numbers.word',
            definitionAsHtml: 'scenes.glossary.complex_numbers.definition',
          },
        ],
      },
      {
        side: 'left',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D3_FX_C1',
        audioUrl: '/assets/audio/fractals_S12_D3_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D4_FX_C2',
        audioUrl: '/assets/audio/fractals_S12_D4_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
      {
        side: 'left',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D5_FX_C1',
        audioUrl: '/assets/audio/fractals_S12_D5_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.iteration.word',
            definitionAsHtml: 'scenes.glossary.iteration.definition',
          },
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D6_FX_C2',
        audioUrl: '/assets/audio/fractals_S12_D6_FX_C2_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
      {
        side: 'left',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D7_FX_C1',
        audioUrl: '/assets/audio/fractals_S12_D7_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.fractals.word',
            definitionAsHtml: 'scenes.glossary.fractals.definition',
          },
        ],
      },
    ],
  },

  // Scene 13 [Ending Screen]
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.06,
      pan: 1030,
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
