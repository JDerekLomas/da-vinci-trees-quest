import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // TODO: Update Audio URL, Background and character image once finalized.
  // Start Scene
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.0,
      blur: 5,
      zoom: 1.05,
      pan: 730,
    },
    logoTheme: {
      landscape: LogoTheme.DARK,
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
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.leo_description',
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
      initialZoom: 1.0,
      blur: 5,
      zoom: 1.054,
      pan: 1123,
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
        width: '80.5vw',
        audioUrl: '/assets/audio/lost-hiker_S2_D1_F4_C0_en.mp3',
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
      pan: 615,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        disableAnimation: true,
        bodyAsHtml: 'scenes.S3.S3_D1_F5_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.claire_description',
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
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
        audioUrl: '/assets/audio/lost-hiker_S3_D1_F5_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D2_F6_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S3_D2_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D3_F7_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S3_D3_F7_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D4_F8_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S3_D4_F8_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D5_F9_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S3_D5_F9_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.multi-rotor-drone.word',
            definitionAsHtml: 'scenes.glossary.multi-rotor-drone.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D6_F10_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S3_D6_F10_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
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
      zoom: 1.04,
      pan: 1245,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        disableAnimation: true,
        bodyAsHtml: 'scenes.S4.S4_D1_F1_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S4_D1_F1_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D2_F2_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S4_D2_F2_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.ohms_law.word',
            definitionAsHtml: 'scenes.glossary.ohms_law.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S4.S4_D3_F3_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.ohms_law.word',
            definitionAsHtml: 'scenes.glossary.ohms_law.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S4_D3_F3_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D4_F4_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S4_D4_F4_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.ohms_law.word',
            definitionAsHtml: 'scenes.glossary.ohms_law.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D5_F5_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S4_D5_F5_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S4.S4_D6_F6_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S4_D6_F6_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      url: '/assets/backgrounds/bg2.webp',
      alt: 'scenes.common.bg2_description',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.05,
      pan: 512,
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
        heading: 'scenes.S5.S5_D0_FX_C9.title',
        interactions: [
          {
            name: 'ohms-law-explorer',
            config: 'ohms-law-explorer-config',
            enableStateExchange: true,
          },
        ],
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
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S5.S5_D1_F1_C1',
        glossary: [
          {
            word: 'scenes.glossary.ohms_law.word',
            definitionAsHtml: 'scenes.glossary.ohms_law.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S5_D1_F1_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S5.S5_D2_F2_C1',
        events: [
          {
            payload: {
              target: 'ohms-law-explorer',
              step: 1,
              disabled: 'resistance-interaction-capture-1',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S5_D2_F2_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S5.S5_D3_F3_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S5_D3_F3_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S5.S5_D4_F4_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'ohms-law-explorer',
              step: 2,
              disabled: 'resistance-interaction-capture-2',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/lost-hiker_S5_D4_F4_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S5.S5_D5_F5_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S5_D5_F5_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S5.S5_D5_F5_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S5_D5_F5_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S5.S5_D6_F6_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'ohms-law-question',
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
        audioUrl: '/assets/audio/lost-hiker_S5_D6_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S5.S5_D7_F7_C1',
        glossary: [
          {
            word: 'scenes.glossary.ohms_law.word',
            definitionAsHtml: 'scenes.glossary.ohms_law.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S5_D7_F7_C1_en.mp3',
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
      blur: 5,
      zoom: 1.048,
      pan: 1036,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        disableAnimation: true,
        bodyAsHtml: 'scenes.S6.S6_D1_F1_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S6_D1_F1_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D2_F2_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S6_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S6.S6_D3_F3_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S6_D3_F3_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D4_F4_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S6_D4_F4_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S6.S6_D5_F5_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S6_D5_F5_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D6_F6_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S6_D6_F6_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.ohms_law.word',
            definitionAsHtml: 'scenes.glossary.ohms_law.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S6.S6_D7_F7_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S6_D7_F7_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D8_F8_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S6_D8_F8_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S6.S6_D9_F9_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S6_D9_F9_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
    ],
  },

  // Scene 6_X
  {
    name: 'scenesList.scene_6_X',
    background: {
      url: '/assets/backgrounds/bg2.webp',
      alt: 'scenes.common.bg2_description',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.05,
      pan: 512,
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
        heading: 'scenes.S6_X.S6_X_F0_C0.title',
        bodyAsHtml: 'scenes.S6_X.S6_X_F0_C0.body',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6_X.S6_D10_F10_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S6_D10_F10_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S6_X.S6_D11_F11_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S6_D11_F11_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.048,
      pan: 600,
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
        heading: 'scenes.S7.S7_D0_FX_C9.title',
        interactions: [
          {
            name: 'battery-power-loss-explorer',
            config: 'battery-power-loss-explorer-config',
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
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D1_F1_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D1_F1_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D2_F2_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D3_F3_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D3_F3_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D4_F4_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
        audioUrl: '/assets/audio/lost-hiker_S7_D4_F4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D5_F5_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D5_F5_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'ohms-law-explorer',
              disabled: 'resistance-battery-1',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D5_F6_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D5_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D5_F7_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D5_F7_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'resistance-current-battery-1',
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
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D5_F8_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D5_F8_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'resistance-joules-law-battery-1',
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
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D5_F9_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D5_F9_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D6_F6_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'battery-question',
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
        audioUrl: '/assets/audio/lost-hiker_S7_D6_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D7_F7_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D7_F7_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D8_F8_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D8_F8_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D9_F9_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S7_D9_F9_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.circuit.word',
            definitionAsHtml: 'scenes.glossary.circuit.definition',
          },
          {
            word: 'scenes.glossary.joules_law.word',
            definitionAsHtml: 'scenes.glossary.joules_law.definition',
          },
        ],
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.048,
      pan: 1036,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        disableAnimation: true,
        bodyAsHtml: 'scenes.S8.S8_D1_F1_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S8_D1_F1_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S8.S8_D2_F2_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S8_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S8.S8_D3_F3_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S8_D3_F3_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S8.S8_D4_F4_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S8_D4_F4_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.048,
      pan: 600,
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
        heading: 'scenes.S9.S9_D0_FX_C9.title',
        interactions: [
          {
            name: 'drone-speed-and-power-consumption',
            config: 'drone-speed-and-power-consumption-config',
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
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D1_F1_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'drone-speed-and-power-consumption',
              disabled: 'drone-speed-capture',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/lost-hiker_S9_D1_F1_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S9.S9_D2_F2_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S9_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D3_F3_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S9_D3_F3_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S9.S9_D4_F4_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S9_D4_F4_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D4_F4_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S9_D4_F4_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D5_F5_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S9_D5_F5_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D6_F6_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'power-consumption-question',
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
        audioUrl: '/assets/audio/lost-hiker_S9_D6_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
        ],
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      url: '/assets/backgrounds/bg2.webp',
      alt: 'scenes.common.bg2_description',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.05,
      pan: 512,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        disableAnimation: true,
        bodyAsHtml: 'scenes.S10.S10_D1_F1_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S10_D1_F1_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S10.S10_D2_F2_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S10_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D3_F3_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S10_D3_F3_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S10.S10_D4_F4_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S10_D4_F4_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D5_F5_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S10_D5_F5_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D6_F6_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S10_D6_F6_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S10.S10_D7_F7_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S10_D7_F7_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D8_F8_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S10_D8_F8_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S10.S10_D9_F9_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S10_D9_F9_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D10_F10_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S10_D10_F10_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S10.S10_D11_F11_C2',
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
        audioUrl: '/assets/audio/lost-hiker_S10_D11_F11_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D12_F12_C1',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/lost-hiker_S10_D12_F12_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      url: '/assets/backgrounds/bg2.webp',
      alt: 'scenes.common.bg2_description',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.05,
      pan: 790,
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
        heading: 'scenes.S11.S11_D0_FX_C9.title',
        interactions: [
          {
            name: 'flight-time-calc',
            config: 'flight-time-calc',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S11.S11_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_FX_C9.about.body',
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
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D1_F1_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'flight-time-calc',
              disabled: 'flight-time-capture',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/lost-hiker_S11_D1_F1_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S11.S11_D2_F2_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D2_F2_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D3_F3_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D3_F3_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S11.S11_D3_F3_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D3_F3_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D3_F4_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D3_F4_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D4_F4_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D4_F4_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D5_F5_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D5_F5_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D6_F6_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D6_F6_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S11.S11_D7_F7_C2',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D7_F7_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D8_F8_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-two-inputbox',
            config: 'min-max-speed',
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
        audioUrl: '/assets/audio/lost-hiker_S11_D8_F8_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.claire',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S11.S11_D9_F9_C1',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/lost-hiker_S11_D9_F9_C1_en.mp3',
      },
    ],
  },

  // Scene 12
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.04,
      pan: 965,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.claire',
        bodyAsHtml: 'scenes.S12.S12_D1_F1_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/lost-hiker_S12_D1_F1_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.S12.S12_D2_F2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        audioUrl: '/assets/audio/lost-hiker_S12_D2_F2_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.claire',
        bodyAsHtml: 'scenes.S12.S12_D3_F3_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/lost-hiker_S12_D3_F3_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.S12.S12_D4_F4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        audioUrl: '/assets/audio/lost-hiker_S12_D4_F4_C2_en.mp3',
      },
    ],
  },

  // End Scene
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.05,
      pan: 515,
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
            word: 'scenes.glossary.power-consumption.word',
            definitionAsHtml: 'scenes.glossary.power-consumption.definition',
          },
          {
            word: 'scenes.glossary.flight-time.word',
            definitionAsHtml: 'scenes.glossary.flight-time.definition',
          },
          {
            word: 'scenes.glossary.internal-resistance.word',
            definitionAsHtml: 'scenes.glossary.internal-resistance.definition',
          },
          {
            word: 'scenes.glossary.voltage.word',
            definitionAsHtml: 'scenes.glossary.voltage.definition',
          },
          {
            word: 'scenes.glossary.current.word',
            definitionAsHtml: 'scenes.glossary.current.definition',
          },
          {
            word: 'scenes.glossary.resistance.word',
            definitionAsHtml: 'scenes.glossary.resistance.definition',
          }
        ],
      },
    ],
    
  },
];
