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
      initialZoom: 1.0,
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
          src: '/assets/characters/leo.webp',
          alt: 'scenes.common.leo_description',
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
          zoom: 1.1,
          pan: 1245,
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
      initialZoom: 1.0,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S2.S2_D1_F2_C0',
        headingColor: '#000',
        disableAnimation: true,
        position: {
          top: '45%',
          left: '50%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 1245,
        },
        width: '55.625vw',
        audioUrl: '/assets/audio/skytrack-internship_S2_D1_F2_C0_en.mp3',
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
      blur: 6,
      zoom: 1.1,
      pan: 1010,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.dean',
        bodyAsHtml: 'scenes.S3.S3_D1_F3_C1',
        headingColor: '#007AFF',
        position: {
          top: '40%',
          left: '60%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.dean_description',
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
        audioUrl: '/assets/audio/skytrack-internship_S3_D1_F3_C1_en.mp3',
      },
      {
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.S3.S3_D2_F28_C2',
        headingColor: '#EB0000',
        position: {
          top: '42%',
          left: '40%',
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
        audioUrl: '/assets/audio/skytrack-internship_S3_D2_F28_C2_en.mp3',
      },
      {
        heading: 'scenes.common.dean',
        bodyAsHtml: 'scenes.S3.S3_D3_F5_C1',
        headingColor: '#007AFF',
        position: {
          top: '40%',
          left: '60%',
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
        audioUrl: '/assets/audio/skytrack-internship_S3_D3_F5_C1_en.mp3',
      },
      {
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.S3.S3_D4_F6_C2',
        headingColor: '#EB0000',
        position: {
          top: '42%',
          left: '40%',
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
        audioUrl: '/assets/audio/skytrack-internship_S3_D4_F6_C2_en.mp3',
      },
      {
        heading: 'scenes.common.dean',
        bodyAsHtml: 'scenes.S3.S3_D5_F7_C1',
        headingColor: '#007AFF',
        position: {
          top: '40%',
          left: '60%',
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
        audioUrl: '/assets/audio/skytrack-internship_S3_D5_F7_C1_en.mp3',
      },
      {
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.S3.S3_D6_F8_C2',
        headingColor: '#EB0000',
        position: {
          top: '42%',
          left: '40%',
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
        audioUrl: '/assets/audio/skytrack-internship_S3_D6_F8_C2_en.mp3',
      },
      {
        heading: 'scenes.common.dean',
        bodyAsHtml: 'scenes.S3.S3_D7_F9_C1',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.linear_equations.word',
            definitionAsHtml: 'scenes.glossary.linear_equations.definition',
          },
        ],
        position: {
          top: '40%',
          left: '60%',
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
        audioUrl: '/assets/audio/skytrack-internship_S3_D7_F9_C1_en.mp3',
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
      blur: 6,
      zoom: 1.1,
      pan: 1235,
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
        heading: 'scenes.S4.S4_D0_F10_C9.header.title',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'saving-planner',
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
        heading: 'scenes.common.dean',
        body: 'scenes.S4.S4_D1_F10_C1',
        glossary: [
          {
            word: 'scenes.glossary.linear_equation.word',
            definitionAsHtml: 'scenes.glossary.linear_equation.definition',
          },
        ],
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S4_D1_F10_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S4.S4_D2_F12_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S4_D2_F12_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S4.S4_D3_F13_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S4_D3_F13_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S4.S4_D4_F14_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S4_D4_F14_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S4.S4_D5_F15_C1',
        headingColor: '#007AFF',
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
            config: 'saving-planner-question',
          },
        ],
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S4_D5_F15_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S4.S4_D6_F16_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S4_D6_F16_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S4.S4_D7_F17_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S4_D7_F17_C1_en.mp3',
      },
    ],
  },

  // Scene 5
  // {
  //   name: 'scenesList.scene_5',
  //   background: {
  //     alt: 'scenes.common.bg2_description',
  //     url: '/assets/backgrounds/bg2-extended.webp',
  //   },
  //   type: 'one-at-a-time',
  //   dialogs: [
  //     {
  //       heading: 'scenes.common.dean',
  //       bodyAsHtml: 'scenes.S5.S5_D1_F18_C1',
  //       headingColor: '#007AFF',
  //       position: {
  //         top: '44%',
  //         left: '67%',
  //       },
  //       background: {
  //         blur: 14,
  //         zoom: 1.1,
  //         pan: 410,
  //       },
  //       buttonAlignment: 'left',
  //       controls: [
  //         {
  //           type: 'back',
  //           text: 'dialog.button.back',
  //         },
  //       ],
  //       avatar: {
  //         src: '/assets/characters/char1.webp',
  //         alt: '',
  //         size: 'enlarged',
  //         position: 'left',
  //         animation: {
  //           duration: 300,
  //           delay: 0,
  //           entry: 'fadeIn',
  //           exit: 'fadeOutLeft',
  //         },
  //       },
  //       width: '42vw',
  //       audioUrl: '/assets/audio/skytrack-internship_S5_D1_F18_C1_en.mp3',
  //     },
  //   ],
  // },

  // Scene 6
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1235,
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
        heading: 'scenes.S6.S6_D0_F19_C9.header.title',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'budget-analysis',
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
            heading: 'scenes.S6.S6_D0_F19_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F19_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F19_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F19_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S6.S6_D1_F19_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S6_D1_F19_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S6.S6_D2_F20_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S6_D2_F20_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S6.S6_D1_F21_C1',
        headingColor: '#007AFF',
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
            config: 'budget-analysis-question',
          },
        ],
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S6_D1_F21_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S6.S6_D2_F22_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        glossary: [
          {
            word: 'scenes.glossary.linear_equations.word',
            definitionAsHtml: 'scenes.glossary.linear_equations.definition',
          },
          {
            word: 'scenes.glossary.steeper_slope.word',
            definitionAsHtml: 'scenes.glossary.steeper_slope.definition',
          },
        ],
        audioUrl: '/assets/audio/skytrack-internship_S6_D2_F22_C2_en.mp3',
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1235,
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
        heading: 'scenes.S7.S7_D0_F20_C10.header.title',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'saving-growth-comparison',
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
            heading: 'scenes.S7.S7_D0_F20_C10.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F20_C10.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_F20_C10.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F20_C10.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S7.S7_D1_F24_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S7_D1_F24_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S7.S7_D2_F25_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S7_D2_F25_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S7.S7_D3_F26_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S7_D3_F26_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S7.S7_D4_F27_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S7_D4_F27_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S7.S7_D5_F28_C1',
        headingColor: '#007AFF',
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
            config: 'saving-growth-question',
          },
        ],
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S7_D5_F28_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S7.S7_D6_F29_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S7_D6_F29_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S7.S7_D7_F30_C1',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.y_intercept.word',
            definitionAsHtml: 'scenes.glossary.y_intercept.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S7_D7_F30_C1_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1235,
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
        heading: 'scenes.S7.S7_D0_F20_C10.header.title',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'saving-growth-comparison',
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
            heading: 'scenes.S7.S7_D0_F20_C10.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F20_C10.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_F20_C10.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F20_C10.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S8.S8_D1_F32_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S8_D1_F32_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S8.S8_D3_F34_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S8_D3_F34_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.dean',
        body: 'scenes.S8.S8_D4_F35_C1',
        headingColor: '#007AFF',
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
            config: 'saving-growth-over-time-question',
          },
        ],
        avatar: {
          src: '/assets/characters/dean.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#BFC5EC',
        },
        audioUrl: '/assets/audio/skytrack-internship_S8_D4_F35_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S8.S8_D5_F36_C2',
        glossary: [
          {
            word: 'scenes.glossary.steeper_slope.word',
            definitionAsHtml: 'scenes.glossary.steeper_slope.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FFD6BE',
        },
        audioUrl: '/assets/audio/skytrack-internship_S8_D5_F36_C2_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      pan: 1235,
      zoom: 1.1,
      blur: 15,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.S9.S9_D0_F43_C2',
        glossary: [
          {
            word: 'scenes.glossary.linear_equations.word',
            definitionAsHtml: 'scenes.glossary.linear_equations.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        background: {
          blur: 4,
          zoom: 100,
          pan: 40,
        },
        audioUrl: '/assets/audio/skytrack-internship_S9_D0_F43_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.dean',
        bodyAsHtml: 'scenes.S9.S9_D1_F42_C1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 40,
        },
        audioUrl: '/assets/audio/skytrack-internship_S9_D1_F42_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.S9.S9_D2_F41_C2',
        headingColor: '#EB0000',
        position: {
          left: '50%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 40,
        },
        audioUrl: '/assets/audio/skytrack-internship_S9_D2_F41_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      pan: 1235,
      zoom: 1.1,
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    showConfetti: true,
    type: 'end-screen',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S10.S10_D0_F39_C10',
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
