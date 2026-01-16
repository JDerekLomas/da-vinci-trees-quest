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
      initialZoom: 1,
      blur: 3,
      pan: 1015,
      zoom: 1.04,
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
          alt: 'scenes.common.mateo_description',
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
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 1630,
      blur: 3,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.S2.S2_D1_FX_C0.heading',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S2.S2_D1_FX_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/data-analysis_S2_D1_FX_C0_en.mp3',
      },
    ],
  },

  // Scene 3 [Introduction]
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 735,
      zoom: 1.02,
      blur: 3,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D1_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D1_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D2_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D2_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D3_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D3_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D4_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D4_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D5_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D5_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D6_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D6_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D7_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D7_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D8_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S3_D8_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 4 [Why We Can't Trust the Data]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 735,
      zoom: 1.02,
      blur: 3,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D1_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D1_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D2_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D2_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D3_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D3_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D4_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D4_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D5_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D5_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D6_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D6_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D7_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D7_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S4.S4_D8_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S4_D8_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 5 [Volunteer Selection Simulator]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      zoom: 1.02,
      pan: 883,
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
        heading: 'scenes.S5.S5_D0_FX_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'volunteer-selection-simulator',
            config: 'volunteer-selection-simulator-config',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
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
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D2_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D3_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'volunteer-selection-simulator',
              checkForVolunteerSelectionSimulation: true,
              disabled: 'check-for-volunteer-selection-simulation',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D4_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D6_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D8_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D10_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S5_D10_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 6 [Proper Study Design Intro]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      zoom: 1.02,
      pan: 883,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S6.S6_D1_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S6_D1_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S6.S6_D2_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S6_D2_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S6.S6_D3_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S6_D3_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 7 [Study Design and Randomization]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1495,
      zoom: 1,
      blur: 3,
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
        heading: 'scenes.S7.S7_D0_FX_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'study-design-and-randomization',
            config: 'study-design-and-randomization-config',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
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
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D1_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 1,
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
        audioUrl: '/assets/audio/data-analysis_S7_D2_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D3_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D3_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 1,
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
        audioUrl: '/assets/audio/data-analysis_S7_D4_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D5_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D5_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 2,
            },
            triggers: ['on-back', 'on-next'],
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
        audioUrl: '/assets/audio/data-analysis_S7_D6_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D7_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D7_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
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
        audioUrl: '/assets/audio/data-analysis_S7_D8_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D9_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D9_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D10_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D10_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D11_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D11_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D12_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D12_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D13_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D13_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D14_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S7_D14_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'study-design-and-randomization',
              flowChartStep: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
    ],
  },

  // Scene 8 [Randomization Interactive]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1495,
      zoom: 1,
      blur: 3,
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
        heading: 'scenes.S8.S8_D0_FX_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'randomization-interactive',
            config: 'randomization-interactive-config',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S8.S8_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D1_FX_C1_en.mp3',
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
        audioUrl: '/assets/audio/data-analysis_S8_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D3_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D3_FX_C2_en.mp3',
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
        events: [
          {
            payload: {
              target: 'randomization-interactive',
              displayFlags: {
                showRandomizeButtons: true,
              },
              checkForRandomizationComplete: true,
              disabled: 'check-for-randomization-complete',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/data-analysis_S8_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D5_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        events: [
          {
            payload: {
              target: 'randomization-interactive',
              displayFlags: {
                showRandomizeButtons: false,
              },
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/data-analysis_S8_D5_FX_C2_en.mp3',
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
        events: [
          {
            payload: {
              target: 'randomization-interactive',
              displayFlags: {
                showAnalysisButton: true,
              },
              disabled: 'check-for-analysis-viewed',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/data-analysis_S8_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D7_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D7_FX_C2_en.mp3',
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
        audioUrl: '/assets/audio/data-analysis_S8_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D9_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D9_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D10_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D10_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D11_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D11_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D12_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D13_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D13_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D14_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D14_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S8.S8_D15_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S8_D15_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 9 [Trial Data Introduction]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1495,
      zoom: 1,
      blur: 3,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S9.S9_D1_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S9_D1_FX_C1_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char2',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S9.S9_D2_FX_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '38%',
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
            exit: 'fadeOutRight',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S9_D2_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.char1',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S9.S9_D3_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/data-analysis_S9_D3_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 10 [Group Comparison Box Plot]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1495,
      zoom: 1,
      blur: 3,
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
        heading: 'scenes.S10.S10_D0_FX_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'group-comparison-box-plot',
            config: 'group-comparison-box-plot-config',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S10.S10_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D1_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S10_D1_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'group-comparison-box-plot',
              animate: true,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D2_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S10_D2_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'group-comparison-box-plot',
              showComparison: true,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S10_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D4_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S10_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/data-analysis_S10_D5_FX_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-radio',
            config: 'placebo-effect-question',
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
        heading: 'scenes.common.char2',
        body: 'scenes.S10.S10_D6_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S10_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S10_D7_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 11 [Statistical Significance]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1495,
      zoom: 1,
      blur: 3,
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
        heading: 'scenes.S11.S11_D0_FX_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'statistical-significance',
            config: 'statistical-significance-config',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D1_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S11_D1_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'statistical-significance',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/data-analysis_S11_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D3_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S11_D3_FX_C2_en.mp3',
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
        audioUrl: '/assets/audio/data-analysis_S11_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        width: '35vw',
        audioUrl: '/assets/audio/data-analysis_S11_D5_FX_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-radio',
            config: 'p-value-question',
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
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D6_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/data-analysis_S11_D6_FX_C2_en.mp3',
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
        audioUrl: '/assets/audio/data-analysis_S11_D7_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 12 [Turn-Based Chat - Final Discussion]
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1495,
      zoom: 1,
      blur: 3,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D1_FX_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D2_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D3_FX_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D4_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D5_FX_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D6_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        bodyAsHtml: 'scenes.S12.S12_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D7_FX_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.char2',
        bodyAsHtml: 'scenes.S12.S12_D8_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/data-analysis_S12_D8_FX_C2_en.mp3',
      },
    ],
  },

  // Ending Screen
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      blur: 3,
      pan: 1190,
      zoom: 1.03,
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
