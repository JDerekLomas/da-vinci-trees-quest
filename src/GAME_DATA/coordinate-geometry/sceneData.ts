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
      pan: 985,
      blur: 3,
      zoom: 1.03,
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
          alt: 'scenes.common.riley_description',
          size: 'chat-bubble-square',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
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
      initialZoom: 1,
      pan: 1460,
      blur: 3,
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
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
          {
            word: 'scenes.glossary.canopy.word',
            definitionAsHtml: 'scenes.glossary.canopy.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S2_D1_F4_C0_en.mp3',
      },
    ],
  },

  // Scene 3 [Introductory Dialogues]
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1010,
      zoom: 1.03,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D1_F5_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.cruz_description',
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
        audioUrl: '/assets/audio/coordinate-geometry_S3_D1_F5_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D2_F6_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
          {
            word: 'scenes.glossary.canopy.word',
            definitionAsHtml: 'scenes.glossary.canopy.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S3_D2_F6_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D3_F7_C1',
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
            word: 'scenes.glossary.canopy.word',
            definitionAsHtml: 'scenes.glossary.canopy.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S3_D3_F7_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D4_F8_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S3_D4_F8_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D5_F9_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S3_D5_F9_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D6_F10_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S3_D6_F10_C2_en.mp3',
      },
    ],
  },

  // Scene 4 [Interactive 1]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 949,
      zoom: 1.03,
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
        heading: 'scenes.S4.S4_D0_F11_C9.title',
        interactions: [
          {
            name: 'lidar-jungle-survey',
            config: 'lidar-jungle-survey',
            enableStateExchange: true,
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
        heading: 'scenes.common.riley',
        body: 'scenes.S4.S4_D1_F11_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.canopy.word',
            definitionAsHtml: 'scenes.glossary.canopy.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S4_D1_F11_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'lidar-jungle-survey',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S4.S4_D2_F12_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S4_D2_F12_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'lidar-jungle-survey',
              step: 1,
              disabled: 'lidar-jungle-survey-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S4.S4_D3_F13_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.canopy.word',
            definitionAsHtml: 'scenes.glossary.canopy.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S4_D3_F13_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'lidar-jungle-survey',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S4.S4_D4_F14_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S4_D4_F14_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'lidar-jungle-survey',
              step: 2,
              disabled: 'lidar-jungle-survey-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S4.S4_D9_F19_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S4_D9_F19_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'lidar-jungle-survey',
              step: 3,
              disabled: 'lidar-jungle-survey-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S4.S4_D10_F20_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S4_D10_F20_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S4.S4_D11_F21_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S4_D11_F21_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S4.S4_D12_F22_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.point_cloud.word',
            definitionAsHtml: 'scenes.glossary.point_cloud.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S4_D12_F22_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S4.S4_D13_F23_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S4_D13_F23_C1_en.mp3',
      },
    ],
  },

  // Scene 5 [Interactive 1 result]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1010,
      zoom: 1.03,
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
        heading: 'scenes.S5.S5_D0_F24_C9.title',
        interactions: [
          {
            name: 'lidar-analysis-results',
            config: 'lidar-analysis-results',
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
            heading: 'scenes.S5.S5_D0_F24_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F24_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_F24_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F24_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S5.S5_D1_F24_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S5_D1_F24_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S5.S5_D2_F25_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D2_F25_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S5.S5_D3_F26_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D3_F26_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S5.S5_D4_F27_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D4_F27_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S5.S5_D5_F28_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D5_F28_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S5.S5_D6_F29_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D6_F29_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S5.S5_D7_F30_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D7_F30_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S5.S5_D8_F31_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D8_F31_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S5.S5_D9_F32_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D9_F32_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S5.S5_D10_F33_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D10_F33_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S5.S5_D11_F34_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S5_D11_F34_C2_en.mp3',
      },
    ],
  },

  // Scene 6 [Interactive 2]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1234,
      zoom: 1.03,
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
        heading: 'scenes.S6.S6_D0_F35_C9.title',
        interactions: [
          {
            name: 'precision-partitioning',
            config: 'precision-partitioning',
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
            heading: 'scenes.S6.S6_D0_F35_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F35_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F35_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F35_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S6.S6_D1_F35_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S6_D1_F35_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S6.S6_D2_F36_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S6_D2_F36_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S6.S6_D3_F37_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-two-inputbox',
            config: 'precision-partitioning-question-1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S6_D3_F37_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S6.S6_D4_F38_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S6_D4_F38_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S6.S6_D5_F39_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
          {
            word: 'scenes.glossary.point_cloud.word',
            definitionAsHtml: 'scenes.glossary.point_cloud.definition',
          },
          {
            word: 'scenes.glossary.anomaly.word',
            definitionAsHtml: 'scenes.glossary.anomaly.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S6_D5_F39_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S6.S6_D6_F40_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S6_D6_F40_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S6.S6_D7_F41_C1',
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
            config: 'precision-partitioning-question-2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S6_D7_F41_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S6.S6_D8_F42_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S6_D8_F42_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S6.S6_D9_F43_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S6_D9_F43_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S6.S6_D10_F44_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S6_D10_F44_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S6.S6_D11_F45_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S6_D11_F45_C2_en.mp3',
      },
    ],
  },

  // Scene 7 [Geometric Analysis]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 810,
      zoom: 1.03,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D1_F46_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.cruz_description',
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
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S7_D1_F46_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D2_F47_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.point_cloud.word',
            definitionAsHtml: 'scenes.glossary.point_cloud.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S7_D2_F47_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D3_F48_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D3_F48_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D4_F49_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D4_F49_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D5_F50_C1',
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
            word: 'scenes.glossary.cosmological_principles.word',
            definitionAsHtml: 'scenes.glossary.cosmological_principles.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S7_D5_F50_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D6_F51_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D6_F51_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D7_F52_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D7_F52_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D8_F53_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D8_F53_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D9_F54_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D9_F54_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D10_F55_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D10_F55_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S7.S7_D11_F56_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D11_F56_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D12_F57_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S7_D12_F57_C2_en.mp3',
      },
    ],
  },

  {
    name: 'scenesList.scene_8I',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1010,
      zoom: 1.03,
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
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S8I.S8I_D0_F58_C10.title',
        interactions: [
          {
            name: 'distance-formula',
            config: 'distance-formula',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S8I.S8I_D0_F58_C10.about.heading',
            bodyAsHtml: 'scenes.S8I.S8I_D0_F58_C10.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8I.S8I_D0_F58_C10.help.heading',
            bodyAsHtml: 'scenes.S8I.S8I_D0_F58_C10.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8I.S8I_D1_F59_C1',
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
              target: 'distance-formula',
              step: 6,
            },
            triggers: ['on-back', 'on-next'],
          },
          {
            payload: {
              target: 'distance-formula',
              disabled: 'check-for-both-points-placed',
            },
            triggers: ['on-next'],
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S8I_D1_F59_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8I.S8I_D2_F60_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8I_D2_F60_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8I.S8I_D3_F61_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8I_D3_F61_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8I.S8I_D4_F62_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8I_D4_F62_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8I.S8I_D5_F63_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8I_D5_F63_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8I.S8I_D6_F64_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8I_D6_F64_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8I.S8I_D7_F65_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8I_D7_F65_C1_en.mp3',
      },
    ],
  },

  // Scene 8 [Interactive 3 - Maya Measures]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 530,
      zoom: 1.03,
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
        heading: 'scenes.S8.S8_D0_F58_C9.title',
        interactions: [
          {
            name: 'maya-measures',
            config: 'maya-measures',
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
            heading: 'scenes.S8.S8_D0_F58_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F58_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F58_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F58_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D1_F58_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S8_D1_F58_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8.S8_D2_F59_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D2_F59_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D3_F60_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D3_F60_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D4_F61_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'maya-measures-question-1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S8_D4_F61_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8.S8_D5_F62_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D5_F62_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D6_F63_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'maya-measures-question-2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S8_D6_F63_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8.S8_D7_F64_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D7_F64_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D8_F65_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D8_F65_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D9_F66_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'maya-measures-question-3',
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
        audioUrl: '/assets/audio/coordinate-geometry_S8_D9_F66_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8.S8_D10_F67_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.sacbe.word',
            definitionAsHtml: 'scenes.glossary.sacbe.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S8_D10_F67_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D11_F68_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D11_F68_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S8.S8_D12_F69_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D12_F69_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S8.S8_D13_F70_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S8_D13_F70_C2_en.mp3',
      },
    ],
  },

  // Scene 9 [Complete Dataset Analysis]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      pan: 1015,
      zoom: 1.03,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D1_F71_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.cruz_description',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D1_F71_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D2_F72_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S9_D2_F72_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D3_F73_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D3_F73_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D4_F74_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D4_F74_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D5_F75_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D5_F75_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D6_F76_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.canopy.word',
            definitionAsHtml: 'scenes.glossary.canopy.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S9_D6_F76_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D7_F77_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D7_F77_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D8_F78_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.cosmological_principles.word',
            definitionAsHtml: 'scenes.glossary.cosmological_principles.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S9_D8_F78_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D9_F79_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D9_F79_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.riley',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D10_F80_C2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D10_F80_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S9.S9_D11_F81_C1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S9_D11_F81_C1_en.mp3',
      },
    ],
  },

  // Scene 10 [Interactive 4 - Full Scan Control]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      pan: 1372,
      zoom: 1.03,
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
        heading: 'scenes.S10.S10_D0_F82_C9.title',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        interactions: [
          {
            name: 'archaeologists-toolkit',
            config: 'archaeologists-toolkit',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S10.S10_D0_F82_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F82_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F82_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F82_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D1_F82_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D1_F82_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D2_F83_C1',
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
              target: 'archaeologists-toolkit',
              step: 1,
              disabled: 'archaeologists-toolkit-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D2_F83_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D3_F84_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D3_F84_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D4_F85_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D4_F85_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D5_F86_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D5_F86_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D6_F87_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.sacbeob.word',
            definitionAsHtml: 'scenes.glossary.sacbeob.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D6_F87_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D7_F88_C2',
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
              target: 'archaeologists-toolkit',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D7_F88_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D8_F89_C1',
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
              target: 'archaeologists-toolkit',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D8_F89_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D9_F90_C2',
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
              target: 'archaeologists-toolkit',
              step: 2,
              disabled: 'archaeologists-toolkit-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D9_F90_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D10_F91_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D10_F91_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D11_F92_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D11_F92_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D11_F92X_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D11_F92X_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D11_F92Y_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D11_F92Y_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D11_F92Z_C1',
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
            config: 'archaeologists-toolkit-question-1',
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
        audioUrl: '/assets/audio/coordinate-geometry_S10_D11_F92Z_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D11_F92XW_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D11_F92XW_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D12_F93_C2',
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
              target: 'archaeologists-toolkit',
              step: 2,
              disabled: 'archaeologists-toolkit-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D12_F93_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D12_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D13_F94_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D13_F94_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D14_F95_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D14_F95_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D14_F95X_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'archaeologists-toolkit-question-2',
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
        audioUrl: '/assets/audio/coordinate-geometry_S10_D14_F95X_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D14_F95Y_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D14_F95Y_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D14_F95_C2',
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
              target: 'archaeologists-toolkit',
              step: 2,
              disabled: 'archaeologists-toolkit-step-4-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D14_F95_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D15_F96_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S10_D15_F96_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D16_F97_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sacbeob.word',
            definitionAsHtml: 'scenes.glossary.sacbeob.definition',
          },
          {
            word: 'scenes.glossary.cosmological_principles.word',
            definitionAsHtml: 'scenes.glossary.cosmological_principles.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D16_F97_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.cruz',
        body: 'scenes.S10.S10_D17_F98_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.sacbeob.word',
            definitionAsHtml: 'scenes.glossary.sacbeob.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D17_F98_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        body: 'scenes.S10.S10_D18_F99_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sacbeob.word',
            definitionAsHtml: 'scenes.glossary.sacbeob.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S10_D18_F99_C2_en.mp3',
      },
    ],
  },

  // Scene 11 [Mathematical Insights - Conclusion]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      blur: 5,
      zoom: 1.04,
      pan: 465,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.cruz',
        bodyAsHtml: 'scenes.S11.S11_D1_F102_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S11_D1_F102_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        bodyAsHtml: 'scenes.S11.S11_D2_F103_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S11_D2_F103_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.cruz',
        bodyAsHtml: 'scenes.S11.S11_D3_F104_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.lidar.word',
            definitionAsHtml: 'scenes.glossary.lidar.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S11_D3_F104_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        bodyAsHtml: 'scenes.S11.S11_D4_F105_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.sacbeob.word',
            definitionAsHtml: 'scenes.glossary.sacbeob.definition',
          },
          {
            word: 'scenes.glossary.cosmological_principles.word',
            definitionAsHtml: 'scenes.glossary.cosmological_principles.definition',
          },
        ],
        audioUrl: '/assets/audio/coordinate-geometry_S11_D4_F105_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.cruz',
        bodyAsHtml: 'scenes.S11.S11_D5_F106_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S11_D5_F106_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.riley',
        bodyAsHtml: 'scenes.S11.S11_D6_F107_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S11_D6_F107_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.cruz',
        bodyAsHtml: 'scenes.S11.S11_D7_F108_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/coordinate-geometry_S11_D7_F108_C1_en.mp3',
      },
    ],
  },

  // Ending Screen
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      blur: 3,
      pan: 700,
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
