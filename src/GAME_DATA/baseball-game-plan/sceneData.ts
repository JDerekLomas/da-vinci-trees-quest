import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.09,
      pan: 1236,
    },
    logoTheme: {
      landscape: LogoTheme.DARK,
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
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.jamie_description',
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
          blur: 6,
          zoom: 1.09,
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
      initialZoom: 1.1,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0',
        headingColor: '#000',
        disableAnimation: true,
        position: {
          top: '50%',
          right: '50%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 1230,
        },
        width: '80.55vw',
        audioUrl: '/assets/audio/baseball-game-plan_S2_D1_F3_C0_en.mp3',
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
      pan: 1230,
      zoom: 1.07,
      initialZoom: 1.07,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D1_F4_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.martinez_description',
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
        audioUrl: '/assets/audio/baseball-game-plan_S3_D1_F4_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S3.S3_D2_F5_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S3_D2_F5_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S3_D3_F6_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S3.S3_D4_F7_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S3_D4_F7_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D5_F8_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S3_D5_F8_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S3.S3_D6_F9_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S3_D6_F9_C2_en.mp3',
      },
    ],
  },

  //  Scene 4
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1230,
      zoom: 1.1,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 6,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        heading: 'scenes.S4.S4_D0_F10_C9.title',
        interactions: [
          {
            name: 'holographic-table',
            config: 'holographic-table',
          },
        ],
        side: 'left',
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S4.S4_D1_F10_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S4_D1_F10_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S4.S4_D2_F11_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S4_D2_F11_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S4.S4_D3_F12_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S4_D3_F12_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S4.S4_D4_F13_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S4_D4_F13_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S4.S4_D5_F14_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S4_D5_F14_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S4.S4_D6_F15_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S4_D6_F15_C1_en.mp3',
      },
    ],
  },

  // Scene 5
  // {
  //   name: 'scenesList.scene_5',
  //   background: {
  //     alt: 'scenes.common.bg3_description',
  //     url: '/assets/backgrounds/bg3.webp',
  //   },
  //   type: 'one-at-a-time',
  //   dialogs: [
  //     {
  //       heading: 'scenes.common.jamie',
  //       bodyAsHtml: 'scenes.S5.S5_D1_F15_C2',
  //       headingColor: '#006BE0',
  //       position: {
  //         top: '50%',
  //         left: '37%',
  //       },
  //       background: {
  //         blur: 6,
  //         zoom: 1.1,
  //         pan: 380,
  //       },
  //       buttonAlignment: 'right',
  //       controls: [
  //         {
  //           type: 'back',
  //           text: 'dialog.button.back',
  //         },
  //       ],
  //       avatar: {
  //         src: '/assets/characters/char2.webp',
  //         alt: '',
  //         size: 'enlarged',
  //         position: 'right',
  //         animation: {
  //           duration: 300,
  //           delay: 0,
  //           entry: 'fadeIn',
  //           exit: 'fadeOutRight',
  //         },
  //       },
  //       width: '56vw',
  //      audioUrl: '/assets/audio/baseball-game-plan_S5_D1_F15_C2_en.mp3',
  //     },
  //   ],
  // },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1230,
      zoom: 1.25,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S5.S5_D1_F16_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.dot_plot.word',
            definitionAsHtml: 'scenes.glossary.dot_plot.definition',
          },
        ],
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S5_D1_F16_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S5.S5_D2_F17_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S5_D2_F17_C1_en.mp3',
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
      blur: 6,
      pan: 1230,
      zoom: 1.1,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 6,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        heading: 'scenes.S6.S6_D0_F18_C9.title',
        interactions: [
          {
            name: 'baseball-hit-analysis',
            config: 'baseball-hit-analysis',
            enableStateExchange: true,
          },
        ],
        side: 'left',
        skipNavigation: true,
        headingColor: '',
        position: { left: '4.3%', bottom: '' },
        background: {
          blur: 6,
          pan: 20,
        },
        glossary: [
          {
            word: 'scenes.glossary.dot_plot.word',
            definitionAsHtml: 'scenes.glossary.dot_plot.definition',
          },
        ],
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
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D1_F18_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D1_F18_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D2_F19_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D2_F19_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D3_F20_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D3_F20_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D4_F21_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D4_F21_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D5_F22_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D5_F22_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D6_F23_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'baseball-hit-analysis',
              step: 1,
              disabled: 'keep-the-median-same',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D6_F23_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D7_F24_C2',
        headingColor: '#006BE0',
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
            config: 'median-value-question',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D7_F24_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D8_F25_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D8_F25_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D9_F26_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D9_F26_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D10_F27_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'baseball-hit-analysis',
              step: 1,
              disabled: 'lower-the-median',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D10_F27_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D11_F28_C2',
        headingColor: '#006BE0',
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
            name: 'interactive-inputbox',
            config: 'new-median-value-question',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D11_F28_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D12_F29_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D12_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D13_F30_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D13_F30_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D14_F31_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D14_F31_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S6.S6_D15_F32_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S6_D15_F32_C2_en.mp3',
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
      pan: 1230,
      zoom: 1.05,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S7.S7_D1_F33_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '38%',
        },
        glossary: [
          {
            word: 'scenes.glossary.box_plots.word',
            definitionAsHtml: 'scenes.glossary.box_plots.definition',
          },
        ],
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S7_D1_F33_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S7.S7_D2_F34_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '38%',
        },
        glossary: [
          {
            word: 'scenes.glossary.box_plots.word',
            definitionAsHtml: 'scenes.glossary.box_plots.definition',
          },
        ],
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S7_D2_F34_C1_en.mp3',
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
      blur: 6,
      pan: 1230,
      zoom: 1.1,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 6,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        heading: 'scenes.S8.S8_D0_F35_C9.title',
        interactions: [
          {
            name: 'high-pitch-performance',
            config: 'high-pitch-performance',
          },
        ],
        side: 'left',
        skipNavigation: true,
        headingColor: '',
        position: { left: '4.3%', bottom: '' },
        background: {
          blur: 20,
          pan: 0,
        },
        glossary: [
          {
            word: 'scenes.glossary.box_plots.word',
            definitionAsHtml: 'scenes.glossary.box_plots.definition',
          },
          {
            word: 'scenes.glossary.strike.word',
            definitionAsHtml: 'scenes.glossary.strike.definition',
          },
          {
            word: 'scenes.glossary.strike_rates.word',
            definitionAsHtml: 'scenes.glossary.strike_rates.definition',
          },
        ],
        about: [
          {
            heading: 'scenes.S8.S8_D0_F35_C9.info_box_title',
            bodyAsHtml: 'scenes.S8.S8_D0_F35_C9.info_box',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F35_C9.help_box_title',
            bodyAsHtml: 'scenes.S8.S8_D0_F35_C9.help_box',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D1_F35_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S8_D1_F35_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S8.S8_D2_F36_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S8_D2_F36_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D3_F37_C2',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.percentile.word',
            definitionAsHtml: 'scenes.glossary.percentile.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S8_D3_F37_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D4_F38_C2',
        headingColor: '#007AFF',
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
            name: 'interactive-radio',
            config: 'high-striker-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.strike.word',
            definitionAsHtml: 'scenes.glossary.strike.definition',
          },
        ],
        audioUrl: '/assets/audio/baseball-game-plan_S8_D4_F38_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D5_F39_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.strike.word',
            definitionAsHtml: 'scenes.glossary.strike.definition',
          },
        ],
        audioUrl: '/assets/audio/baseball-game-plan_S8_D5_F39_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S8.S8_D6_F40_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S8_D6_F40_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D7_F41_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S8_D7_F41_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D8_F42_C2',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.strikes.word',
            definitionAsHtml: 'scenes.glossary.strikes.definition',
          },
          {
            word: 'scenes.glossary.strike_rates.word',
            definitionAsHtml: 'scenes.glossary.strike_rates.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S8_D8_F42_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D9_F43_C2',
        headingColor: '#007AFF',
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
            name: 'interactive-radio',
            config: 'consistent-striker-question',
          },
        ],
        audioUrl: '/assets/audio/baseball-game-plan_S8_D9_F43_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S8.S8_D10_F44_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.strike.word',
            definitionAsHtml: 'scenes.glossary.strike.definition',
          },
        ],
        audioUrl: '/assets/audio/baseball-game-plan_S8_D10_F44_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S8.S8_D11_F45_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S8_D11_F45_C1_en.mp3',
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
      pan: 500,
      zoom: 1.05,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S9.S9_D1_F46_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.dot_plots.word',
            definitionAsHtml: 'scenes.glossary.dot_plots.definition',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S9_D1_F46_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S9.S9_D2_F47_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.dot_plot.word',
            definitionAsHtml: 'scenes.glossary.dot_plot.definition',
          },
          {
            word: 'scenes.glossary.histograms.word',
            definitionAsHtml: 'scenes.glossary.histograms.definition',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S9_D2_F47_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S9.S9_D3_F48_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.dot_plot.word',
            definitionAsHtml: 'scenes.glossary.dot_plot.definition',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S9_D3_F48_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S9.S9_D4_F49_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.histogram.word',
            definitionAsHtml: 'scenes.glossary.histogram.definition',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S9_D4_F49_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S9.S9_D5_F50_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S9_D5_F50_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S9.S9_D6_F51_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.histograms.word',
            definitionAsHtml: 'scenes.glossary.histograms.definition',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S9_D6_F51_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1230,
      zoom: 1.1,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 6,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        heading: 'scenes.S10.S10_D0_F52_C9.title',
        interactions: [
          {
            name: 'distribution-analysis',
            config: 'distribution-analysis',
          },
        ],
        side: 'left',
        skipNavigation: true,
        headingColor: '',
        position: { left: '4.3%', bottom: '' },
        background: {
          blur: 6,
          pan: 0,
        },
        glossary: [
          {
            word: 'scenes.glossary.histograms.word',
            definitionAsHtml: 'scenes.glossary.histograms.definition',
          },
        ],
        about: [
          {
            heading: 'scenes.S10.S10_D0_F52_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F52_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F52_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F52_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S10.S10_D1_F52_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.dot_plots.word',
            definitionAsHtml: 'scenes.glossary.dot_plots.definition',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S10_D1_F52_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S10.S10_D2_F53_C2',
        headingColor: '#006BE0',
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
            name: 'interactive-radio',
            config: 'high-average-team-question',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S10_D2_F53_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S10.S10_D3_F54_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.standard_deviation.word',
            definitionAsHtml: 'scenes.glossary.standard_deviation.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S10_D3_F54_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S10.S10_D4_F55_C2',
        headingColor: '#006BE0',
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
            name: 'interactive-radio',
            config: 'consistent-team-question',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S10_D4_F55_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S10.S10_D5_F56_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.standard_deviation.word',
            definitionAsHtml: 'scenes.glossary.standard_deviation.definition',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S10_D5_F56_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S10.S10_D6_F57_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S10_D6_F57_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        body: 'scenes.S10.S10_D7_F58_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/baseball-game-plan_S10_D7_F58_C2_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1230,
      zoom: 1.05,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S11.S11_D1_F59_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        buttonAlignment: 'right',
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S11_D1_F59_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S11.S11_D2_F60_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
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
        glossary: [
          {
            word: 'scenes.glossary.histogram.word',
            definitionAsHtml: 'scenes.glossary.histogram.definition',
          },
        ],
        width: '56vw',
        audioUrl: '/assets/audio/baseball-game-plan_S11_D2_F60_C1_en.mp3',
      },
    ],
  },

  // Scene 12
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1230,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 6,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        heading: 'scenes.S12.S12_D0_F60_C9.title',
        interactions: [
          {
            name: 'pitching-bar-chart',
            config: 'pitching-bar-chart',
          },
        ],
        side: 'left',
        skipNavigation: true,
        headingColor: '',
        position: { left: '4.3%', bottom: '' },
        background: {
          blur: 20,
          pan: 0,
        },
        glossary: [
          {
            word: 'scenes.glossary.histograms.word',
            definitionAsHtml: 'scenes.glossary.histograms.definition',
          },
        ],
        about: [
          {
            heading: 'scenes.S12.S12_D0_F60_C9.about.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F60_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S12.S12_D0_F60_C9.help.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F60_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D1_F60_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D1_F60_C2_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D2_F61_C2',
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
            config: 'average-pitcher-question',
          },
        ],
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D2_F61_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        body: 'scenes.S12.S12_D3_F62_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D3_F62_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D4_F63_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.right_skewed.word',
            definitionAsHtml: 'scenes.glossary.right_skewed.definition',
          },
        ],
        audioUrl: '/assets/audio/baseball-game-plan_S12_D4_F63_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        body: 'scenes.S12.S12_D5_F64_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D5_F64_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D6_F65_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.outliers.word',
            definitionAsHtml: 'scenes.glossary.outliers.definition',
          },
        ],
        audioUrl: '/assets/audio/baseball-game-plan_S12_D6_F65_C2_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D7_F66_C2',
        headingColor: '#006BE0',
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
            name: 'interactive-radio',
            config: 'consistent-pitcher-question',
          },
        ],
        audioUrl: '/assets/audio/baseball-game-plan_S12_D7_F66_C2_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D8_F67_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D8_F67_C2_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D9_F68_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D9_F68_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        body: 'scenes.S12.S12_D10_F69_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D10_F69_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D11_F70_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D11_F70_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        body: 'scenes.S12.S12_D12_F71_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D12_F71_C1_en.mp3',
      },
      {
        heading: 'scenes.common.jamie',
        body: 'scenes.S12.S12_D13_F72_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D13_F72_C2_en.mp3',
      },
      {
        heading: 'scenes.common.martinez',
        body: 'scenes.S12.S12_D14_F73_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFC2A7',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S12_D14_F73_C1_en.mp3',
      },
    ],
  },

  // Scene 13
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      pan: 1430,
      zoom: 1.1,
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S13.S13_D1_F74_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S13_D1_F74_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S13.S13_D2_F75_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S13_D2_F75_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S13.S13_D3_F76_C2',
        headingColor: '#006BE0',
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
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S13_D3_F76_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S13.S13_D4_F77_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S13_D4_F77_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.jamie',
        bodyAsHtml: 'scenes.S13.S13_D5_F78_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/baseball-game-plan_S13_D5_F78_C2_en.mp3',
      },
    ],
  },

  // Scene 14
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      pan: 1430,
      zoom: 1.1,
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    showConfetti: true,
    type: 'end-screen',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S15.S15_D0_F71_C9',
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
            word: 'scenes.glossary.standard_deviation.word',
            definitionAsHtml: 'scenes.glossary.standard_deviation.definition',
          },
          {
            word: 'scenes.glossary.histograms.word',
            definitionAsHtml: 'scenes.glossary.histograms.definition',
          },
          {
            word: 'scenes.glossary.box_plots.word',
            definitionAsHtml: 'scenes.glossary.box_plots.definition',
          },
          {
            word: 'scenes.glossary.strike_rates.word',
            definitionAsHtml: 'scenes.glossary.strike_rates.definition',
          },
          {
            word: 'scenes.glossary.strike.word',
            definitionAsHtml: 'scenes.glossary.strike.definition',
          },
          {
            word: 'scenes.glossary.median.word',
            definitionAsHtml: 'scenes.glossary.median.definition',
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
