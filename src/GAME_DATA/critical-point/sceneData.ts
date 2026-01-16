import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.0,
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
        disableAnimation: true,
        position: {
          left: DialogPosition.START_SCREEN_LEFT,
          top: DialogPosition.START_SCREEN_TOP,
        },
        width: DialogWidth.START_SCREEN,
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: 'scenes.common.kaipo_description',
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
          blur: 14,
          zoom: 1.1,
          pan: 1110,
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
        isPrimaryHeading: true,
        heading: '',
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0',
        headingColor: '#000',
        disableAnimation: true,
        glossary: [
          {
            word: 'scenes.glossary.yields.word',
            definitionAsHtml: 'scenes.glossary.yields.definition',
          },
          {
            word: 'scenes.glossary.optimal.word',
            definitionAsHtml: 'scenes.glossary.optimal.definition',
          },
        ],
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 15,
          zoom: 1.02,
          pan: 1420,
        },
        width: '65.625vw',
        audioUrl: '/assets/audio/critical-point_S2_D1_F3_C0_en.mp3',
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
      pan: 600,
      zoom: 1,
      initialZoom: 1.0,
      blur: 15,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        disableAnimation: true,
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S3.S3_D1_F5_C1',
        headingColor: '#AF52DE',
        position: {
          top: '37%',
          left: '42%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D1_F5_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D1_F5_C2',
        headingColor: '#007AFF',
        position: {
          top: '37%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D1_F5_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S3.S3_D2_F6_C1',
        headingColor: '#AF52DE',
        position: {
          top: '37%',
          left: '42%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D2_F6_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D2_F6_C2',
        headingColor: '#007AFF',
        position: {
          top: '37%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D2_F6_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C1',
        headingColor: '#AF52DE',
        position: {
          top: '37%',
          left: '42%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D3_F6_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C2',
        headingColor: '#007AFF',
        position: {
          top: '37%',
          right: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.leach.word',
            definitionAsHtml: 'scenes.glossary.leach.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D3_F6_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S3.S3_D3_F7_C1',
        headingColor: '#AF52DE',
        position: {
          top: '37%',
          left: '42%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D3_F7_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D4_F8_C2',
        headingColor: '#007AFF',
        position: {
          top: '37%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D4_F8_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S3.S3_D5_F9_C1',
        headingColor: '#AF52DE',
        position: {
          top: '37%',
          left: '42%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D5_F9_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S3.S3_D6_F10_C2',
        headingColor: '#007AFF',
        position: {
          top: '37%',
          right: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.quadratic.word',
            definitionAsHtml: 'scenes.glossary.quadratic.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        audioUrl: '/assets/audio/critical-point_S3_D6_F10_C2_en.mp3',
      },
    ],
  },

  // Scene 4
  // {
  //   name: 'scenesList.scene_4',
  //   background: {
  //     alt: 'scenes.common.bg2_description',
  //     url: '/assets/backgrounds/bg2-extended.webp',
  //   },
  //   type: 'one-at-a-time',
  //   dialogs: [
  //     {
  //       heading: 'scenes.common.martinez',
  //       bodyAsHtml: 'scenes.S4.S4_D1_F11_C2',
  //       headingColor: '#007AFF',
  //       glossary: [
  //         {
  //           word: 'scenes.glossary.raw_data.word',
  //           definitionAsHtml: 'scenes.glossary.linear_equations.definition',
  //         },
  //       ],
  //       position: {
  //         top: '44%',
  //         left: '64%',
  //       },
  //       background: {
  //         blur: 15,
  //         zoom: 1.2,
  //         pan: 160,
  //       },
  //       buttonAlignment: 'left',
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
  //         position: 'left',
  //         animation: {
  //           duration: 300,
  //           delay: 0,
  //           entry: 'fadeIn',
  //           exit: 'fadeOutLeft',
  //         },
  //       },
  //       width: '41vw',
  //       audioUrl: '/assets/audio/critical-point_S4_D1_F11_C2_en.mp3',
  //     },
  //   ],
  // },

  // Scene 5
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 14,
      pan: 955,
      zoom: 1,
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
        heading: 'scenes.S5.S5_D0_F11C1A_C9.header.title',
        interactions: [
          {
            name: 'data-table',
            config: 'data-table',
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
            heading: 'scenes.S5.S5_D0_F11C1A_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F11C1A_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_F11C1A_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F11C1A_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S5.S5_D1_F11C1A_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S5_D1_F11C1A_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S5.S5_D2_F11C1B_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.linear.word',
            definitionAsHtml: 'scenes.glossary.linear.definition',
          },
          {
            word: 'scenes.glossary.quadratic.word',
            definitionAsHtml: 'scenes.glossary.quadratic.definition',
          },
          {
            word: 'scenes.glossary.peak.word',
            definitionAsHtml: 'scenes.glossary.peak.definition',
          },
        ],
        audioUrl: '/assets/audio/critical-point_S5_D2_F11C1B_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S5.S5_D3_F11C1C_C1',
        headingColor: '#AF52DE',
        glossary: [
          {
            word: 'scenes.glossary.peak.word',
            definitionAsHtml: 'scenes.glossary.peak.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S5_D3_F11C1C_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S5.S5_D4_F11C1D_C2',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.peak.word',
            definitionAsHtml: 'scenes.glossary.peak.definition',
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
            name: 'interactive-inputbox',
            config: 'nitrogen-analyser-impact-function',
          },
        ],
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S5_D4_F11C1D_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S5.S5_D5_F11C1E_C1',
        headingColor: '#AF52DE',
        glossary: [
          {
            word: 'scenes.glossary.peak.word',
            definitionAsHtml: 'scenes.glossary.peak.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S5_D5_F11C1E_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S5.S5_D6_FX_C2',
        glossary: [
          {
            word: 'scenes.glossary.peak.word',
            definitionAsHtml: 'scenes.glossary.peak.definition',
          },
        ],
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S5_D6_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 15,
      pan: 965,
      zoom: 1.2,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        disableAnimation: true,
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D1_F11C2A_C2',
        headingColor: '#007AFF',
        position: { top: '39%', right: '36%' },
        glossary: [
          {
            word: 'scenes.glossary.quadratic.word',
            definitionAsHtml: 'scenes.glossary.quadratic.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/critical-point_S6_D1_F11C2A_C2_en.mp3',
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
      blur: 15,
      pan: 1380,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        skipNavigation: true,
        heading: 'scenes.S6.S6_D0_F11C2B_C9.title',
        bodyAsHtml: 'scenes.S6.S6_D0_F11C2B_C9.quadratic_equation',
        headingColor: '#000',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D1_F11C2B_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S6_D1_F11C2B_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D2_F11C2C_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S6_D2_F11C2C_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D3_F11C2D_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        glossary: [
          {
            word: 'scenes.glossary.linear.word',
            definitionAsHtml: 'scenes.glossary.linear.definition',
          },
          {
            word: 'scenes.glossary.quadratic.word',
            definitionAsHtml: 'scenes.glossary.quadratic.definition',
          },
        ],
        audioUrl: '/assets/audio/critical-point_S6_D3_F11C2D_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D4_F11C2E_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S6_D4_F11C2E_C2_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        heading: 'scenes.S6.S6_D0_F11C2C_C9.header.title',
        interactions: [
          {
            name: 'plant-growth-chart',
            config: 'plant-growth-chart',
          },
        ],
        headingColor: '#000',
        about: [
          {
            heading: 'scenes.S6.S6_D0_F11C2C_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F11C2C_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F11C2C_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F11C2C_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D5_F11C2F_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S6_D5_F11C2F_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D6_F11C2G_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S6_D6_F11C2G_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D7_F11C2H_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S6_D7_F11C2H_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D8_F11C2I_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S6_D8_F11C2I_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D9_F11C2J_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S6_D9_F11C2J_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D10_FX_C2',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.peak.word',
            definitionAsHtml: 'scenes.glossary.peak.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S6_D10_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D10_FX_C1',
        headingColor: '#AF52DE',
        glossary: [
          {
            word: 'scenes.glossary.vertex.word',
            definitionAsHtml: 'scenes.glossary.vertex.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S6_D10_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D11_FX_C2',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.peak.word',
            definitionAsHtml: 'scenes.glossary.peak.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'nitrogen-analyser-impact-function',
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
        audioUrl: '/assets/audio/critical-point_S6_D11_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D12_FX_C1',
        headingColor: '#AF52DE',
        glossary: [
          {
            word: 'scenes.glossary.vertex.word',
            definitionAsHtml: 'scenes.glossary.vertex.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S6_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S6.S6_D13_FX_C2',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.soil_degradation.word',
            definitionAsHtml: 'scenes.glossary.soil_degradation.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S6_D13_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S6.S6_D14_FX_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S6_D14_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 15,
      zoom: 1.2,
      pan: 980,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        disableAnimation: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S7.S7_D1_F12_C2',
        headingColor: '#007AFF',
        position: {
          top: '40%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        audioUrl: '/assets/audio/critical-point_S7_D1_F12_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S7.S7_D2_F13_C1',
        headingColor: '#AF52DE',
        glossary: [
          {
            word: 'scenes.glossary.break_even_point.word',
            definitionAsHtml: 'scenes.glossary.break_even_point.definition',
          },
        ],
        position: {
          top: '40%',
          left: '41%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/critical-point_S7_D2_F13_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S7.S7_D3_F14_C1',
        headingColor: '#AF52DE',
        glossary: [
          {
            word: 'scenes.glossary.break_even_point.word',
            definitionAsHtml: 'scenes.glossary.break_even_point.definition',
          },
        ],
        position: {
          top: '40%',
          left: '41%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/critical-point_S7_D3_F14_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S7.S7_D4_F15_C2',
        headingColor: '#007AFF',
        position: {
          top: '40%',
          right: '37%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
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
        audioUrl: '/assets/audio/critical-point_S7_D4_F15_C2_en.mp3',
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
      blur: 14,
      pan: 1400,
      zoom: 1.2,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        skipNavigation: true,
        heading: 'scenes.S8.S8_D0_F16_C9.formula-revenue-title',
        bodyAsHtml: 'scenes.S8.S8_D0_F16_C9.formula-revenue',
        glossary: [
          {
            word: 'scenes.glossary.financial_metrics.word',
            definitionAsHtml: 'scenes.glossary.financial_metrics.definition',
          },
        ],
        headingColor: '#000',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S8.S8_D1_F16_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#AF52DE',
        },
        audioUrl: '/assets/audio/critical-point_S8_D1_F16_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        heading: 'scenes.S8.S8_D0_F16_C9.formula-cost-title',
        bodyAsHtml: 'scenes.S8.S8_D0_F16_C9.formula-cost',
        headingColor: '#000',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S8.S8_D2_F17_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S8_D2_F17_C2_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        heading: 'scenes.S8.S8_D0_F16_C9.formula-cost-updated-title',
        bodyAsHtml: 'scenes.S8.S8_D0_F16_C9.formula-cost-updated',
        headingColor: '#000',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S8.S8_D3_F18_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S8_D3_F18_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        heading: 'scenes.S8.S8_D0_F16_C9.formula-derivation-title',
        bodyAsHtml: 'scenes.S8.S8_D0_F16_C9.formula-derivation',
        headingColor: '#000',
        about: [
          {
            heading: 'scenes.S8.S8_D0_F16_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F16_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S8.S8_D4_F19_C2',
        headingColor: '#007AFF',
        glossary: [
          {
            word: 'scenes.glossary.break_even_point.word',
            definitionAsHtml: 'scenes.glossary.break_even_point.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S8_D4_F19_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S8.S8_D5_F20_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S8_D5_F20_C1_en.mp3',
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
      blur: 14,
      pan: 970,
      zoom: 1.2,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        skipNavigation: true,
        heading: 'scenes.S9.S9_D0_F21C3A_C9.header.title',
        interactions: [
          {
            name: 'cost-benefit-chart',
            config: 'cost-benefit-optimizer',
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
            heading: 'scenes.S9.S9_D0_F21C3A_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F21C3A_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F21C3A_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F21C3A_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S9.S9_D1_F21C3A_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S9_D1_F21C3A_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S9.S9_D2_F21C3B_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'cost-benefit-optimizer-nitrogen-level-question',
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
        audioUrl: '/assets/audio/critical-point_S9_D2_F21C3B_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S9.S9_D3_F21C3C_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S9_D3_F21C3C_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S9.S9_D4_F21C3D_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'cost-benefit-optimizer-profit-drop-question',
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
        audioUrl: '/assets/audio/critical-point_S9_D4_F21C3D_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S9.S9_D5_F21C3E_C1',
        headingColor: '#AF52DE',
        glossary: [
          {
            word: 'scenes.glossary.vertex.word',
            definitionAsHtml: 'scenes.glossary.vertex.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S9_D5_F21C3E_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S9.S9_D6_F21C3F_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S9_D6_F21C3F_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S9.S9_D7_F21C3G_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S9_D7_F21C3G_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S9.S9_D8_F21C3H_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S9_D8_F21C3H_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        body: 'scenes.S9.S9_D9_F21C3I_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/kaipo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/critical-point_S9_D9_F21C3I_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.martinez',
        body: 'scenes.S9.S9_D10_F21C3J_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/martinez.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/critical-point_S9_D10_F21C3J_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      pan: 1400,
      zoom: 1.2,
      blur: 15,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'right',
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S10.S10_D1_F22_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 40,
        },
        audioUrl: '/assets/audio/critical-point_S10_D1_F22_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S10.S10_D2_F23_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 40,
        },
        audioUrl: '/assets/audio/critical-point_S10_D2_F23_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.kaipo',
        bodyAsHtml: 'scenes.S10.S10_D3_F24_C1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 40,
        },
        audioUrl: '/assets/audio/critical-point_S10_D3_F24_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.martinez',
        bodyAsHtml: 'scenes.S10.S10_D4_F25_C2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 40,
        },
        audioUrl: '/assets/audio/critical-point_S10_D4_F25_C2_en.mp3',
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
      blur: 12,
      pan: 1200,
      zoom: 1.3,
    },
    showConfetti: true,
    type: 'end-screen',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S11.S11_D0_F30_C9',
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
        background: {
          blur: 16,
          zoom: 1.3,
          pan: 1200,
        },
        width: '65vw',
        headingColor: '#000000',
        disableAnimation: true,
      },
    ],
  },
];
