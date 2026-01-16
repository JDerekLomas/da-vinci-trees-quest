import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1 [Start Scene]
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.03,
      blur: 6,
      pan: 1455,
      zoom: 1.03,
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
        disableAnimation: true,
        position: {
          left: DialogPosition.START_SCREEN_LEFT,
          top: DialogPosition.START_SCREEN_TOP,
        },
        width: DialogWidth.START_SCREEN,
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.tariq_description',
          size: 'chat-bubble-square',
          background: '#F6E4FF',
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

  // Scene 2 [Welcome Scene]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 822,
      blur: 6,
      zoom: 1.03,
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
        audioUrl: '/assets/audio/al-khwarizmi_S2_D1_F4_C0_en.mp3',
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
      pan: 1298,
      blur: 6,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D1_F5_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S3_D1_F5_C0_en.mp3',
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
      pan: 1299,
      blur: 6,
      zoom: 1.29,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D1_F6_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S4_D1_F6_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D2_F7_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S4_D2_F7_C0_en.mp3',
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1222,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D1_F8_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.al_jabr.word',
            definitionAsHtml: 'scenes.glossary.al_jabr.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S5_D1_F8_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D2_F9_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S5_D2_F9_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D3_F10_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S5_D3_F10_C0_en.mp3',
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
      pan: 832,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S6.S6_D1_F11_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S6_D1_F11_C0_en.mp3',
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 900,
      blur: 6,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D1_F12_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        glossary: [
          {
            word: 'scenes.glossary.salaam_aleikum.word',
            definitionAsHtml: 'scenes.glossary.salaam_aleikum.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S7_D1_F12_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D2_F13_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S7_D2_F13_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D3_F14_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S7_D3_F14_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D4_F15_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S7_D4_F15_C1_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1392,
      blur: 6,
      zoom: 1.05,
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
        heading: 'scenes.S8.S8_D0_F16_C9.title',
        interactions: [
          {
            name: 'ledger-table',
            config: 'ledger-table',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S8.S8_D1_F16_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S8_D1_F16_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S8.S8_D2_F17_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S8_D2_F17_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S8.S8_D3_F18_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S8_D3_F18_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S8.S8_D4_F19_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S8_D4_F19_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S8.S8_D5_F20_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.ledger.word',
            definitionAsHtml: 'scenes.glossary.ledger.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S8_D5_F20_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S8.S8_D6_F21_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S8_D6_F21_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S8.S8_D7_F22_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.with_the_moon.word',
            definitionAsHtml: 'scenes.glossary.with_the_moon.definition',
          },
          {
            word: 'scenes.glossary.revenue.word',
            definitionAsHtml: 'scenes.glossary.revenue.definition',
          },
          {
            word: 'scenes.glossary.fixed_costs.word',
            definitionAsHtml: 'scenes.glossary.fixed_costs.definition',
          },
          {
            word: 'scenes.glossary.variable_costs.word',
            definitionAsHtml: 'scenes.glossary.variable_costs.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S8_D7_F22_C1_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 900,
      blur: 6,
      zoom: 1.05,
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
        heading: 'scenes.S9.S9_D0_F23_C9.title',
        interactions: [
          {
            name: 'interactive-0',
            config: 'interactive-0',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_F23_C9.info.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F23_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F23_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F23_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S9.S9_D1_F23_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-0',
              disabled: 'interactive-0-ledger-completion',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.ledger.word',
            definitionAsHtml: 'scenes.glossary.ledger.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S9_D1_F23_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S9.S9_D2_F24_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S9_D2_F24_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S9.S9_D3_F25_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
          {
            word: 'scenes.glossary.revenue.word',
            definitionAsHtml: 'scenes.glossary.revenue.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S9_D3_F25_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S9.S9_D4_F26_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S9_D4_F26_C1_en.mp3',
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
      pan: 1222,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D1_F27_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S10_D1_F27_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D2_F28_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S10_D2_F28_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D3_F29_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: './audio/al-khwarizmi_S10_D3_F29_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D4_F30_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S10_D4_F30_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D5_F31_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: './audio/al-khwarizmi_S10_D5_F31_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D6_F32_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S10_D6_F32_C1_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1222,
      blur: 6,
      zoom: 1.04,
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
        heading: 'scenes.S11.S11_D0_F33_C9.title',
        interactions: [
          {
            name: 'interactive-1',
            config: 'interactive-1',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S11.S11_D0_F33_C9.info.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F33_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_F33_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F33_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D1_F33_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 1,
              disabled: 'interactive-1-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D1_F33_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D2_F34_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 2,
              disabled: 'interactive-1-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D2_F34_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D3_F35_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
              displayFlags: {
                showTakeAwayHalfDates: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D3_F35_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D4_F36_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
              displayFlags: {
                showTakeAwayHalfDates: true,
                showTakeAwayHalfCoins: false,
              },
              disabled: 'interactive-1-step-3-part-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D4_F36_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S11.S11_D5_F37_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
              displayFlags: {
                showTakeAwayHalfCoins: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D5_F37_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D6_F38_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
              displayFlags: {
                showTakeAwayHalfCoins: true,
              },
              disabled: 'interactive-1-step-3-part-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D6_F38_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S11.S11_D7_F39_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              displayFlags: {
                showHalvingButtons: false,
              },
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D7_F39_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D8_F40_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              displayFlags: {
                showHalvingButtons: false,
              },
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D8_F40_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S11.S11_D9_F41_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              displayFlags: {
                showHalvingButtons: false,
              },
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D9_F41_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D10_F42_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 4,
              displayFlags: {
                showTakeAwayHalfCoins: false,
                showTakeAwayHalfDates: true,
              },
              subStep: 1,
              disabled: 'interactive-1-step-4-part-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D10_F42_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D11_F43_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 4,
              displayFlags: {
                showTakeAwayHalfDates: false,
                showTakeAwayHalfCoins: true,
              },
              subStep: 2,
              disabled: 'interactive-1-step-4-part-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D11_F43_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S11.S11_D12_F44_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 4,
              subStep: 3,
              disabled: 'interactive-1-step-4-part-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S11_D12_F44_C1_en.mp3',
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
      pan: 1570,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S12.S12_D1_F45_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: './audio/al-khwarizmi_S12_D1_F45_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S12.S12_D2_F46_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S12_D2_F46_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S12.S12_D3_F47_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S12_D3_F47_C1_en.mp3',
      },
    ],
  },

  // Scene 13
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1222,
      blur: 6,
      zoom: 1.04,
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
        heading: 'scenes.S13.S13_D0_F48_C9.title',
        interactions: [
          {
            name: 'interactive-2',
            config: 'interactive-2',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S13.S13_D0_F48_C9.info.heading',
            bodyAsHtml: 'scenes.S13.S13_D0_F48_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S13.S13_D0_F48_C9.help.heading',
            bodyAsHtml: 'scenes.S13.S13_D0_F48_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D1_F48_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 1,
              disabled: 'interactive-2-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D1_F48_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D2_F49_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 2,
              disabled: 'interactive-2-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D2_F49_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D3_F50_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 3,
              displayFlags: {
                showRemovalButtons: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D3_F50_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S13.S13_D4_F51_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 3,
              displayFlags: {
                showRemovalButtons: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D4_F51_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D5_F52_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 3,
              disabled: 'interactive-2-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.ledger.word',
            definitionAsHtml: 'scenes.glossary.ledger.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D5_F52_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S13.S13_D6_F53_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 4,
              displayFlags: {
                showRemovalButtons: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D6_F53_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D7_F54_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 4,
              displayFlags: {
                showRemovalButtons: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D7_F54_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S13.S13_D8_F55_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 4,
              displayFlags: {
                showRemovalButtons: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D8_F55_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D9_F56_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 4,
              disabled: 'interactive-2-step-4-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D9_F56_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D10_F57_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 5,
              displayFlags: {
                showHalvingButtons: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D10_F57_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D11_F58_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 5,
              disabled: 'interactive-2-step-5-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D11_F58_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S13.S13_D12_F59_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D12_F59_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S13.S13_D13_F60_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D13_F60_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S13.S13_D14_F61_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S13_D14_F61_C2_en.mp3',
      },
    ],
  },

  // Scene 14
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 890,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S14.S14_D1_F62_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S14_D1_F62_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S14.S14_D2_F63_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S14_D2_F63_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S14.S14_D3_F64_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S14_D3_F64_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S14.S14_D4_F65_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S14_D4_F65_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S14.S14_D5_F66_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S14_D5_F66_C2_en.mp3',
      },
    ],
  },

  // Scene 15
  {
    name: 'scenesList.scene_15',
    background: {
      alt: 'scenes.common.bg7_description',
      url: '/assets/backgrounds/bg7.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 795,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S15.S15_D1_F67_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S15_D1_F67_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S15.S15_D2_F68_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S15_D2_F68_C0_en.mp3',
      },
    ],
  },

  // Scene 16
  {
    name: 'scenesList.scene_16',
    background: {
      alt: 'scenes.common.bg8_description',
      url: '/assets/backgrounds/bg8.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1147,
      blur: 6,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S16.S16_D1_F69_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S16_D1_F69_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S16.S16_D2_F70_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S16_D2_F70_C0_en.mp3',
      },
    ],
  },

  // Scene 17
  {
    name: 'scenesList.scene_17',
    background: {
      alt: 'scenes.common.bg9_description',
      url: '/assets/backgrounds/bg9.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 662,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S17.S17_D1_F71_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S17_D1_F71_C0_en.mp3',
      },
    ],
  },

  // Scene 18
  {
    name: 'scenesList.scene_18',
    background: {
      alt: 'scenes.common.bg9_description',
      url: '/assets/backgrounds/bg9.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1393,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S18.S18_D1_F72_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S18_D1_F72_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S18.S18_D2_F73_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: './audio/al-khwarizmi_S18_D2_F73_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S18.S18_D3_F74_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S18_D3_F74_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S18.S18_D4_F75_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S18_D4_F75_C1_en.mp3',
      },
    ],
  },

  // Scene 19
  {
    name: 'scenesList.scene_19',
    background: {
      alt: 'scenes.common.bg9_description',
      url: '/assets/backgrounds/bg9.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 662,
      blur: 6,
      zoom: 1.04,
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
        heading: 'scenes.S19.S19_D0_F76_C9.title',
        interactions: [
          {
            name: 'interactive-3',
            config: 'interactive-3',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S19.S19_D0_F76_C9.info.heading',
            bodyAsHtml: 'scenes.S19.S19_D0_F76_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S19.S19_D0_F76_C9.help.heading',
            bodyAsHtml: 'scenes.S19.S19_D0_F76_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D1_F76_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D1_F76_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D2_F77_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
              disabled: 'interactive-3-step-1-completion',
              displayFlags: {
                hideAvailableValues: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
          {
            word: 'scenes.glossary.equation.word',
            definitionAsHtml: 'scenes.glossary.equation.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D2_F77_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D3_F78_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
              displayFlags: {
                showDivideLeftSideBy: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D3_F78_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S19.S19_D4_F79_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
              displayFlags: {
                showDivideLeftSideBy: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D4_F79_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D5_F80_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
              displayFlags: {
                showDivideLeftSideBy: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D5_F80_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S19.S19_D6_F81_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
              displayFlags: {
                showDivideLeftSideBy: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D6_F81_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D7_F82_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
              displayFlags: {
                showDivideLeftSideBy: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D7_F82_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D8_F83_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'divide-number-que',
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
              target: 'interactive-3',
              step: 2,
              displayFlags: {
                showDivideLeftSideBy: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D8_F83_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D9_F84_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
              displayFlags: {
                showDivideLeftSideBy: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D9_F84_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D10_F85_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
              disabled: 'interactive-3-step-2-part-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D10_F85_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S19.S19_D11_F86_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D11_F86_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D12_F87_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D12_F87_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D13_F88_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 3,
              disabled: 'interactive-3-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D13_F88_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D14_F89_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirham.word',
            definitionAsHtml: 'scenes.glossary.dirham.definition',
          },
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D14_F89_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S19.S19_D15_F90_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D15_F90_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D16_F91_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.al_jabr.word',
            definitionAsHtml: 'scenes.glossary.al_jabr.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D16_F91_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S19.S19_D17_F92_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D17_F92_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S19.S19_D18_F93_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S19_D18_F93_C1_en.mp3',
      },
    ],
  },

  // Scene 20
  {
    name: 'scenesList.scene_20',
    background: {
      alt: 'scenes.common.bg10_description',
      url: '/assets/backgrounds/bg10.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1125,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S20.S20_D1_F94_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S20_D1_F94_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S20.S20_D2_F95_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
          {
            word: 'scenes.glossary.caravan.word',
            definitionAsHtml: 'scenes.glossary.caravan.definition',
          },
        ],
        audioUrl: './audio/al-khwarizmi_S20_D2_F95_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S20.S20_D3_F96_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S20_D3_F96_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S20.S20_D4_F97_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: './audio/al-khwarizmi_S20_D4_F97_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S20.S20_D5_F98_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S20_D5_F98_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S20.S20_D6_F99_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
            word: 'scenes.glossary.equations.word',
            definitionAsHtml: 'scenes.glossary.equations.definition',
          },
        ],
        audioUrl: './audio/al-khwarizmi_S20_D6_F99_C1_en.mp3',
      },
    ],
  },

  // Scene 21
  {
    name: 'scenesList.scene_21',
    background: {
      alt: 'scenes.common.bg10_description',
      url: '/assets/backgrounds/bg10.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 390,
      blur: 6,
      zoom: 1.05,
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
        heading: 'scenes.S21.S21_D0_F100_C9.title',
        interactions: [
          {
            name: 'interactive-4',
            config: 'interactive-4',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S21.S21_D0_F100_C9.info.heading',
            bodyAsHtml: 'scenes.S21.S21_D0_F100_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S21.S21_D0_F100_C9.help.heading',
            bodyAsHtml: 'scenes.S21.S21_D0_F100_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D1_F100_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 1,
              disabled: 'interactive-4-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D1_F100_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S21.S21_D2_F101_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 1,
              displayFlags: {
                showBaghdadProfitBuilder: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D2_F101_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D3_F102_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'ponds-left-to-sell-que',
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
              target: 'interactive-4',
              step: 1,
              displayFlags: {
                showBaghdadProfitBuilder: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D3_F102_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D4_F103_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 1,
              displayFlags: {
                showBaghdadProfitBuilder: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D4_F103_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D5_F104_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 2,
              displayFlags: {
                showDamascusProfitBuilder: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D5_F104_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D6_F105_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'per-pound-profit-que',
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
              target: 'interactive-4',
              step: 2,
              displayFlags: {
                showDamascusProfitBuilder: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D6_F105_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D7_F106_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 2,
              disabled: 'interactive-4-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D7_F106_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S21.S21_D8_F107_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 3,
              displayFlags: {
                showTotalProfitBuilder: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D8_F107_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D9_F108_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 3,
              disabled: 'interactive-4-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D9_F108_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D10_F109_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 4,
              simplificationSubStep: 1,
              disabled: 'interactive-4-step-4-part-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D10_F109_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D11_F110_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 4,
              simplificationSubStep: 2,
              disabled: 'interactive-4-step-4-part-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D11_F110_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S21.S21_D12_F111_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D12_F111_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D13_F112_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.equation.word',
            definitionAsHtml: 'scenes.glossary.equation.definition',
          },
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D13_F112_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D14_F113_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: '1600-mean-que',
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
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D14_F113_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S21.S21_D15_F114_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D15_F114_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D16_F115_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D16_F115_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D17_F116_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'sell-more-x-dir-que',
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
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D17_F116_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S21.S21_D18_F117_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossory.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D18_F117_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D19_F118_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D19_F118_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S21.S21_D20_F119_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D20_F119_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D21_F120_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.dirhams.word',
            definitionAsHtml: 'scenes.glossary.dirhams.definition',
          },
          {
            word: 'scenes.glossary.x.word',
            definitionAsHtml: 'scenes.glossary.x.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D21_F120_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S21.S21_D22_F121_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D22_F121_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S21.S21_D23_F122_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S21_D23_F122_C1_en.mp3',
      },
    ],
  },

  // Scene 22
  {
    name: 'scenesList.scene_22',
    background: {
      alt: 'scenes.common.bg11_description',
      url: '/assets/backgrounds/bg11.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 860,
      blur: 6,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S22.S22_D1_F122_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S22_D1_F122_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S22.S22_D2_F123_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.caravans.word',
            definitionAsHtml: 'scenes.glossary.caravans.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S22_D2_F123_C0_en.mp3',
      },
    ],
  },

  // Scene 23
  {
    name: 'scenesList.scene_23',
    background: {
      alt: 'scenes.common.bg12_description',
      url: '/assets/backgrounds/bg12.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 825,
      blur: 6,
      zoom: 1.08,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S23.S23_D1_F124_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S23_D1_F124_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S23.S23_D2_F125_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S23_D2_F125_C0_en.mp3',
      },
    ],
  },

  // Scene 24
  {
    name: 'scenesList.scene_24',
    background: {
      alt: 'scenes.common.bg13_description',
      url: '/assets/backgrounds/bg13.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 830,
      blur: 6,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S24.S24_D1_F126_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.caravans.word',
            definitionAsHtml: 'scenes.glossary.caravans.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S24_D1_F126_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S24.S24_D2_F127_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S24_D2_F127_C0_en.mp3',
      },
    ],
  },

  // Scene 25
  {
    name: 'scenesList.scene_25',
    background: {
      alt: 'scenes.common.bg14_description',
      url: '/assets/backgrounds/bg14.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 680,
      blur: 6,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S25.S25_D1_F128_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S25_D1_F128_C0_en.mp3',
      },
    ],
  },

  // Scene 26
  {
    name: 'scenesList.scene_26',
    background: {
      alt: 'scenes.common.bg15_description',
      url: '/assets/backgrounds/bg15.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1150,
      blur: 6,
      zoom: 1.07,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S26.S26_D1_F129_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D1_F129_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S26.S26_D2_F130_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D2_F130_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S26.S26_D3_F131_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D3_F131_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S26.S26_D4_F132_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D4_F132_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S26.S26_D5_F133_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D5_F133_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S26.S26_D6_F134_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D6_F134_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.tariq',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S26.S26_D7_F135_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.tariq_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D7_F135_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S26.S26_D8_F136_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D8_F136_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S26.S26_D9_F137_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        interactions: [
          {
            name: 'interactive-radio',
            config: 'profit-calculation-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D9_F137_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.al-khwarizmi',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S26.S26_D10_F138_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.al-khwarizmi_description',
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
        audioUrl: '/assets/audio/al-khwarizmi_S26_D10_F138_C1_en.mp3',
      },
    ],
  },

  // Scene 27
  {
    name: 'scenesList.scene_27',
    background: {
      alt: 'scenes.common.bg15_description',
      url: '/assets/backgrounds/bg15.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1950,
      zoom: 1.07,
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
        heading: 'scenes.S27.S27_D0_FX_C9.title',
        interactions: [
          {
            name: 'interactive-5-v1',
            config: 'interactive-5-v1',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S27.S27_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S27.S27_D0_FX_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S27.S27_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S27.S27_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D11_F139_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D11_F139_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D12_F140_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D12_F140_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 1,
              disabled: 'interactive-5-step-1-completion',
              displayFlags: {
                hideStep1Options: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D13_F141_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D13_F141_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D14_F142_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'variables-unknown-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S27_D14_F142_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D15_F143_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'variables-first-equation-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S27_D15_F143_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D16_F144_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'solve-equation-alone-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S27_D16_F144_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D17_F145_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'equations-needed-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S27_D17_F145_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D18_F146_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D18_F146_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 2,
              displayFlags: {
                showStep2Options: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D19_F147_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D19_F147_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 2,
              disabled: 'interactive-5-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D20_F148_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D20_F148_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 2,
              displayFlags: {
                showStep2Options: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D21_F149_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D21_F149_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 3,
              displayFlags: {
                showStep3Options: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D22_F150_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D22_F150_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 3,
              disabled: 'interactive-5-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D23_F151_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D23_F151_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 3,
              displayFlags: {
                showStep3Options: false,
              },
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D24_F152_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D24_F152_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S27.S27_D25_F153_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D25_F153_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D26_F154_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D26_F154_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D27_F155_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'variables-given-terms-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S27_D27_F155_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D28_F156_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D28_F156_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D29_F157_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D29_F157_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 1,
              disabled: 'interactive-5-step-4-subStep-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D30_F158_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D30_F158_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D31_F159_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D31_F159_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 2,
              disabled: 'interactive-5-step-4-subStep-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D32_F160_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D32_F160_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D33_F161_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D33_F161_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 3,
              disabled: 'interactive-5-step-4-subStep-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D34_F162_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D34_F162_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D35_F163_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D35_F163_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 4,
              disabled: 'interactive-5-step-4-subStep-4-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D36_F164_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D36_F164_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 5,
              disabled: 'interactive-5-step-4-subStep-5-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D37_F165_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D37_F165_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              step: 4,
              subStep: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D38_F166_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D38_F166_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D39_F167_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D39_F167_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D40_F168_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'lead-merchant-value-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S27_D40_F168_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S27.S27_D41_F169_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D41_F169_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D42_F170_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D42_F170_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D43_F171_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'merchant-share-value-que',
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
        audioUrl: '/assets/audio/al-khwarizmi_S27_D43_F171_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S27.S27_D44_F172_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D44_F172_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D45_F173_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/al-khwarizmi_S27_D45_F173_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              equationOnly: true,
              substitute: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D46_F174_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              substitute: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S27_D46_F174_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.tariq',
        body: 'scenes.S27.S27_D47_F175_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              substitute: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S27_D47_F175_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.al-khwarizmi',
        body: 'scenes.S27.S27_D48_F176_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-5-v1',
              substitute: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.al_jabr.word',
            definitionAsHtml: 'scenes.glossary.al_jabr.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S27_D48_F176_C1_en.mp3',
      },
    ],
  },

  // Scene 28
  {
    name: 'scenesList.scene_28',
    background: {
      alt: 'scenes.common.bg16_description',
      url: '/assets/backgrounds/bg16.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 870,
      blur: 6,
      zoom: 1.07,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S28.S28_D1_F177_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S28_D1_F177_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S28.S28_D2_F178_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.al_jabr.word',
            definitionAsHtml: 'scenes.glossary.al_jabr.definition',
          },
        ],
        audioUrl: '/assets/audio/al-khwarizmi_S28_D2_F178_C0_en.mp3',
      },
      {
        heading: 'scenes.common.narrator',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S28.S28_D3_F179_C0',
        headingColor: '#EB0000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/al-khwarizmi_S28_D3_F179_C0_en.mp3',
      },
    ],
  },

  // Ending Screen
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg17_description',
      url: '/assets/backgrounds/bg17.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1160,
      zoom: 1.06,
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
        glossary: [
          {
            word: 'scenes.glossary.optimization.word',
            definitionAsHtml: 'scenes.glossary.al_jabr.definition',
          },
        ],
      },
    ],
  },
];
