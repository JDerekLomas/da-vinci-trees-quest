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
      landscape: LogoTheme.LIGHT,
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
          alt: 'scenes.common.maya_description',
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
          blur: 6,
          zoom: 1.1,
          pan: 1010,
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
      },
    ],
    audioUrl: '/assets/audio/bgmusic.mp3',
  },

  // Scene 2 [Welcom Scene]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 1210,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.S2.S2_D1_F3_C0.heading',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 1210,
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/game-geometry_S2_D1_F3_C0_en.mp3',
      },
    ],
  },

  // Scene 3 [Introduction & Pre-Interactive 1]
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 770,
      zoom: 1.1,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.jordan',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D1_F4_C1',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.jordan_description',
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
        audioUrl: '/assets/audio/game-geometry_S3_D1_F4_C1_en.mp3',
      },
      {
        heading: 'scenes.common.maya',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D2_F5_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/game-geometry_S3_D2_F5_C2_en.mp3',
      },
      {
        heading: 'scenes.common.jordan',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C1',
        headingColor: '#EB0000',
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
        audioUrl: '/assets/audio/game-geometry_S3_D3_F6_C1_en.mp3',
      },
      {
        heading: 'scenes.common.maya',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D4_F7_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/game-geometry_S3_D4_F7_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.sprites.word',
            definitionAsHtml: 'scenes.glossary.sprites.definition',
          },
        ],
      },
      {
        heading: 'scenes.common.jordan',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D5_F8_C1',
        headingColor: '#EB0000',
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
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/game-geometry_S3_D5_F8_C1_en.mp3',
      },
      {
        heading: 'scenes.common.maya',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D6_F9_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/game-geometry_S3_D6_F9_C2_en.mp3',
      },
      {
        heading: 'scenes.common.jordan',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D7_F10_C1',
        headingColor: '#EB0000',
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
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/game-geometry_S3_D7_F10_C1_en.mp3',
      },
    ],
  },

  // Scene 4 [Interactive 1]
  {
    name: 'scenesList.scene_4',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 970,
      zoom: 1.15,
      blur: 6,
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
        heading: 'scenes.S4.S4_D0_F11_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'car-graph',
            config: 'forward-direction',
            enableStateExchange: true,
          },
        ],
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S4.S4_D0_F11_C9.about.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F11_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S4.S4_D0_F11_C9.help.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F11_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S4.S4_D1_F11_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        audioUrl: '/assets/audio/game-geometry_S4_D1_F11_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S4.S4_D2_F12_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S4_D2_F12_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.sprites.word',
            definitionAsHtml: 'scenes.glossary.sprites.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S4.S4_D3_F13_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'car-graph',
              disabled: 'forward-1-step-interactive-question',
            },
            triggers: ['on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.transformation.word',
            definitionAsHtml: 'scenes.glossary.transformation.definition',
          },
          {
            word: 'scenes.glossary.translations.word',
            definitionAsHtml: 'scenes.glossary.translations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S4_D3_F13_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S4.S4_D4_F14_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S4_D4_F14_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S4.S4_D5_F15_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        glossary: [
          {
            word: 'scenes.glossary.translations.word',
            definitionAsHtml: 'scenes.glossary.translations.definition',
          },
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S4_D5_F15_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S4.S4_D6_F16_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S4_D6_F16_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S4.S4_D7_F17_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'car-graph',
              disabled: 'forward-3-step-interactive-question',
            },
            triggers: ['on-next'],
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S4_D7_F17_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S4.S4_D8_F18_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S4_D8_F18_C2_en.mp3',
      },
    ],
  },

  // Scene 5 [Pre-Interactive 2]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 770,
      zoom: 1.1,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.jordan',
        bodyAsHtml: 'scenes.S5.S5_D1_F19_C1',
        headingColor: '#EB0000',
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
        audioUrl: '/assets/audio/game-geometry_S5_D1_F19_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.translation.word',
            definitionAsHtml: 'scenes.glossary.translation.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jordan',
        bodyAsHtml: 'scenes.S5.S5_D2_F20_C1',
        headingColor: '#EB0000',
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
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/game-geometry_S5_D2_F20_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.maya',
        bodyAsHtml: 'scenes.S5.S5_D3_F21_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/game-geometry_S5_D3_F21_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jordan',
        bodyAsHtml: 'scenes.S5.S5_D4_F22_C1',
        headingColor: '#EB0000',
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
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/game-geometry_S5_D4_F22_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.jordan',
        bodyAsHtml: 'scenes.S5.S5_D5_F23_C1',
        headingColor: '#EB0000',
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
        glossary: [
          {
            word: 'scenes.glossary.rotations.word',
            definitionAsHtml: 'scenes.glossary.rotations.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/game-geometry_S5_D5_F23_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.maya',
        bodyAsHtml: 'scenes.S5.S5_D6_F24_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/game-geometry_S5_D6_F24_C2_en.mp3',
      },
    ],
  },

  // Scene 6 [Interactive 2]
  {
    name: 'scenesList.scene_6',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 970,
      zoom: 1.15,
      blur: 6,
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
        heading: 'scenes.S6.S6_D0_F25_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'car-graph',
            config: 'backward-direction',
            enableStateExchange: true,
          },
        ],
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S6.S6_D0_F25_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F25_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F25_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F25_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S6.S6_D1_F25_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },

        audioUrl: '/assets/audio/game-geometry_S6_D1_F25_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S6.S6_D2_F26_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D2_F26_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S6.S6_D3_F27_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'car-graph',
              disabled: 'rotate-y-3-step-interactive-question',
            },
            triggers: ['on-next'],
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S6_D3_F27_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S6.S6_D4_F28_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D4_F28_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S6.S6_D5_F29_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        events: [
          {
            payload: {
              target: 'car-graph',
              disabled: 'reset-3-step-interactive-question',
            },
            triggers: ['on-next'],
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S6_D5_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S6.S6_D6_F30_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D6_F30_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S6.S6_D7_F31_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D7_F31_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S6.S6_D8_F32_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D8_F32_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S6.S6_D9_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'car-graph',
              disabled: 'rotate-x-3-step-interactive-question',
            },
            triggers: ['on-next'],
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S6_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S6.S6_D10_F33_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D10_F33_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S6.S6_D13_F36_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D13_F36_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S6.S6_D14_F37_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S6_D14_F37_C2_en.mp3',
      },
    ],
  },

  // Scene 7 [Pre-Interactive 3]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 770,
      zoom: 1.1,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.jordan',
        bodyAsHtml: 'scenes.S7.S7_D1_F38_C1',
        headingColor: '#EB0000',
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
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/game-geometry_S7_D1_F38_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.maya',
        bodyAsHtml: 'scenes.S7.S7_D2_F39_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/game-geometry_S7_D2_F39_C2_en.mp3',
      },
    ],
  },

  // Scene 8 [Interactive 3]
  {
    name: 'scenesList.scene_8',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 970,
      zoom: 1.15,
      blur: 6,
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
        heading: 'scenes.S8.S8_D0_F40_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'car-graph',
            config: 'fuel-direction',
            enableStateExchange: true,
          },
        ],
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S8.S8_D0_F40_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F40_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F40_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F40_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S8.S8_D1_F40_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },

        audioUrl: '/assets/audio/game-geometry_S8_D1_F40_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S8.S8_D2_F41_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.rotation.word',
            definitionAsHtml: 'scenes.glossary.rotation.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S8_D2_F41_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S8.S8_D3_F42_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S8_D3_F42_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S8.S8_D4_F43_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'car-graph',
              disabled: 'fuel-x-4-step-interactive-question',
            },
            triggers: ['on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S8_D4_F43_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S8.S8_D5_F44_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S8_D5_F44_C2_en.mp3',
      },
    ],
  },

  // Scene 9 [Pre-Interactive 4]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 770,
      zoom: 1.1,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.jordan',
        bodyAsHtml: 'scenes.S9.S9_D1_F45_C1',
        headingColor: '#EB0000',
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
        glossary: [
          {
            word: 'scenes.glossary.translations.word',
            definitionAsHtml: 'scenes.glossary.translations.definition',
          },
          {
            word: 'scenes.glossary.rotations.word',
            definitionAsHtml: 'scenes.glossary.rotations.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/game-geometry_S9_D1_F45_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.maya',
        bodyAsHtml: 'scenes.S9.S9_D2_F46_C2',
        headingColor: '#006BE0',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/game-geometry_S9_D2_F46_C2_en.mp3',
      },
    ],
  },

  // Scene 10 [Interactive 4]
  {
    name: 'scenesList.scene_10',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 970,
      zoom: 1.15,
      blur: 6,
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
        heading: 'scenes.S10.S10_D0_F47_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'car-graph',
            config: 'rotate-move',
            enableStateExchange: true,
          },
        ],
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S10.S10_D0_F47_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F47_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F47_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F47_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S10.S10_D1_F47_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },

        audioUrl: '/assets/audio/game-geometry_S10_D1_F47_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S10.S10_D2_F48_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S10_D2_F48_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S10.S10_D3_F49_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        audioUrl: '/assets/audio/game-geometry_S10_D3_F49_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S10.S10_D4_F50_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/game-geometry_S10_D4_F50_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S10.S10_D5_F51_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'car-graph',
              disabled: 'move-step-interactive-question',
            },
            triggers: ['on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S10_D5_F51_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        body: 'scenes.S10.S10_D6_F52_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S10_D6_F52_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jordan',
        body: 'scenes.S10.S10_D7_F53_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFB2B2',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S10_D7_F53_C1_en.mp3',
      },
    ],
  },

  // Scene 11 [Pre-Ending Screen]
  {
    name: 'scenesList.scene_11',
    background: {
      url: '/assets/backgrounds/bg4.webp',
      alt: 'scenes.common.bg4_description',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.2,
      pan: 800,
      zoom: 1.1,
      blur: 6,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.jordan',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S11.S11_D1_F54_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/game-geometry_S11_D1_F54_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        bodyAsHtml: 'scenes.S11.S11_D2_F55_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
          {
            word: 'scenes.glossary.translations.word',
            definitionAsHtml: 'scenes.glossary.translations.definition',
          },
          {
            word: 'scenes.glossary.rotations.word',
            definitionAsHtml: 'scenes.glossary.rotations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S11_D2_F55_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.jordan',
        bodyAsHtml: 'scenes.S11.S11_D3_F56_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
          {
            word: 'scenes.glossary.translation.word',
            definitionAsHtml: 'scenes.glossary.translation.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S11_D3_F56_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.maya',
        bodyAsHtml: 'scenes.S11.S11_D4_F57_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/game-geometry_S11_D4_F57_C2_en.mp3',
      },
    ],
  },

  // End Screen
  {
    name: 'scenesList.scene_12',
    background: {
      url: '/assets/backgrounds/bg4.webp',
      alt: 'scenes.common.bg4_description',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.2,
      pan: 800,
      zoom: 1.1,
      blur: 6,
    },
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: '',
        body: 'scenes.S12.S12_D2_F59_C2',
        headingColor: '',
        disableAnimation: true,
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
