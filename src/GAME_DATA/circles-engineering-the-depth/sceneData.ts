import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
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
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.astrid_description',
          size: 'chat-bubble-square',
          background: '#C0DEFF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.tangents.word',
            definitionAsHtml: 'scenes.glossary.tangents.definition',
          },
          {
            word: 'scenes.glossary.inscribed_angles.word',
            definitionAsHtml: 'scenes.glossary.inscribed_angles.definition',
          },
        ],
        background: {
          blur: 6,
          zoom: 1.05,
          pan: 1335,
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
      blur: 6,
      pan: 730,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.S2.S2_D1_F3_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        glossary: [
          {
            word: 'scenes.glossary.fjord.word',
            definitionAsHtml: 'scenes.glossary.fjord.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S2_D1_F3_C0_en.mp3',
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
      pan: 730,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D1_F4_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.hansen_description',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S3_D1_F4_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S3.S3_D2_F5_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S3_D2_F5_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.larsen_description',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S3_D3_F6_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D4_F7_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S3_D4_F7_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S3.S3_D5_F8_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
            word: 'scenes.glossary.fjord.word',
            definitionAsHtml: 'scenes.glossary.fjord.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/circles-engineering-the-depth_S3_D5_F8_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D6_F9_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S3_D6_F9_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S3.S3_D7_F10_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S3_D7_F10_C2_en.mp3',
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
      blur: 7,
      pan: 1150,
      zoom: 1.03,
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
        heading: 'scenes.S4.S4_D0_F11_C9.title',
        interactions: [
          {
            name: 'interactive-underwater-tunnel',
            config: 'interactive-underwater-tunnel-config',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hansen',
        body: 'scenes.S4.S4_D1_F11_C3',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S4_D1_F11_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S4.S4_D2_F12_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S4_D2_F12_C1_en.mp3',
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1150,
      zoom: 1.03,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S5.S5_D1_F13_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S5_D1_F13_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S5.S5_D2_F14_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S5_D2_F14_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S5.S5_D3_F15_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S5_D3_F15_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S5.S5_D4_F16_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S5_D4_F16_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S5.S5_D5_F17_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/circles-engineering-the-depth_S5_D5_F17_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S5.S5_D6_F18_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S5_D6_F18_C1_en.mp3',
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1150,
      zoom: 1.03,
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
        heading: 'scenes.S6.S6_D0_F19_C9.title',
        interactions: [
          {
            name: 'calculating-tangent',
            config: 'calculating-tangent',
          },
        ],
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
        glossary: [
          {
            word: 'scenes.glossary.tangents.word',
            definitionAsHtml: 'scenes.glossary.tangents.definition',
          },
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S6.S6_D1_F19_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S6_D1_F19_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S6.S6_D2_F20_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S6_D2_F20_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S6.S6_D3_F21_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S6_D3_F21_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S6.S6_D4_F22_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'calculating-tangent',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S6_D4_F22_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S6.S6_D5_F23_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'tunnel-stability-length-question',
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
              target: 'calculating-tangent',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S6_D5_F23_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S6.S6_D6_F24_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S6_D6_F24_C1_en.mp3',
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 853,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S7.S7_D1_F25_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S7_D1_F25_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S7.S7_D2_F26_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S7_D2_F26_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S7.S7_D3_F27_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S7_D3_F27_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S7.S7_D4_F28_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S7_D4_F28_C3_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1215,
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
        heading: 'scenes.S8.S8_D0_F30_C9.title',
        interactions: [
          {
            name: 'anchor-angle',
            config: 'anchor-angle',
          },
        ],
        about: [
          {
            heading: 'scenes.S8.S8_D0_F30_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F30_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F30_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F30_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.tangents.word',
            definitionAsHtml: 'scenes.glossary.tangents.definition',
          },
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
          {
            word: 'scenes.glossary.secant.word',
            definitionAsHtml: 'scenes.glossary.secant.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D16_F30_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D16_F30_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D1_F30_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D1_F30_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D2_F31_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D2_F31_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D2_FX1_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D2_FX1_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D2_FX2_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D2_FX2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D3_F32_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D3_F32_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D4_F33_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'anchor-angle',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D4_F33_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D5_F34_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'anchor-angle',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D5_F34_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D6_F35_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D6_F35_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D7_F36_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D7_F36_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D8_F37_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D8_F37_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D9_F38_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D9_F38_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D10_F39_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D10_F39_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hansen',
        body: 'scenes.S8.S8_D11_F40_C3',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        events: [
          {
            payload: {
              target: 'anchor-angle',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D11_F40_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D12_F41_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'anchor-angle',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D12_F41_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D13_F42_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'anchor-angle-question',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D13_F42_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S8.S8_D14_F43_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D14_F43_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S8.S8_D15_F44_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S8_D15_F44_C2_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1117,
      zoom: 1.03,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S9.S9_D1_F45_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S9_D1_F45_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S9.S9_D2_F46_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S9_D2_F46_C1_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 490,
      zoom: 1.03,
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
        heading: 'scenes.S10.S10_D0_F47_C9.title',
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        interactions: [
          {
            name: 'tunnel-diameter',
            config: 'tunnel-diameter',
            enableStateExchange: true,
          },
        ],
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
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D1_F47_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D1_F47_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hansen',
        body: 'scenes.S10.S10_D2_F48_C3',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D2_F48_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D3_F49_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D3_F49_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S10.S10_D4_F50_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },

        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D4_F50_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D5_F51_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D5_F51_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S10.S10_D6_F52_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D6_F52_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D7_F53_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D7_F53_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D8_F54_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 3,
              disabled: 'tunnel-diameter-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D8_F54_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S10.S10_D9_F55_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D9_F55_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D10_F56_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D10_F56_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hansen',
        body: 'scenes.S10.S10_D11_F57_C3',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D11_F57_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D12_F58_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.chords.word',
            definitionAsHtml: 'scenes.glossary.chords.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D12_F58_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S10.S10_D13_F59_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D13_F59_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D14_F60_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 5,
              disabled: 'tunnel-diameter-step-5-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D14_F60_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S10.S10_D15_F61_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D15_F61_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D16_F62_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'tunnel-diameter',
              step: 6,
              disabled: 'tunnel-diameter-step-6-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D16_F62_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S10.S10_D17_F63_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D17_F63_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S10.S10_D18_F64_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S10_D18_F64_C2_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 746,
      zoom: 1.03,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S11.S11_D1_F65_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S11_D1_F65_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S11.S11_D2_F66_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S11_D2_F66_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S11.S11_D3_F67_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S11_D3_F67_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S11.S11_D4_F68_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S11_D4_F68_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S11.S11_D5_F69_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/circles-engineering-the-depth_S11_D5_F69_C1_en.mp3',
      },
    ],
  },

  // Scene 12
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1117,
      zoom: 1.03,
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
        heading: 'scenes.S12.S12_D0_F70_C9.title',
        interactions: [
          {
            name: 'ceiling-light-angle',
            config: 'ceiling-light-angle',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S12.S12_D0_F70_C9.about.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F70_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S12.S12_D0_F70_C9.help.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F70_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D3_F72_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D3_F72_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D4_F73_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.inscribed_angle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_angle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D4_F73_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D5_F74_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
          {
            word: 'scenes.glossary.inscribed_angle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_angle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D5_F74_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D6_F75_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.inscribed_angle.word',
            definitionAsHtml: 'scenes.glossary.inscribed_angle.definition',
          },
          {
            word: 'scenes.glossary.central_angle.word',
            definitionAsHtml: 'scenes.glossary.central_angle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D6_F75_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D7_F76_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.central_angle.word',
            definitionAsHtml: 'scenes.glossary.central_angle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D7_F76_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D8_F77_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.chord.word',
            definitionAsHtml: 'scenes.glossary.chord.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D8_F77_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D9_F78_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.chord.word',
            definitionAsHtml: 'scenes.glossary.chord.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D9_F78_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D10_F79_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 4,
              disabled: 'ceiling-light-angle-step-4-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.trigonometric_function.word',
            definitionAsHtml: 'scenes.glossary.trigonometric_function.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D10_F79_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D11_F80_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D11_F80_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D12_F81_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'acd-angle-cal-question',
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
              target: 'ceiling-light-angle',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D12_F81_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D13_F82_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D13_F82_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D14_F83_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D14_F83_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D15_F84_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D15_F84_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D16_F85_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'ceiling-light-angle',
              step: 6,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D16_F85_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D17_F86_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D17_F86_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D18_F87_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'tunnel-diameter-angle-question',
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
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D18_F87_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.astrid',
        body: 'scenes.S12.S12_D19_F88_C1',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.diameter.word',
            definitionAsHtml: 'scenes.glossary.diameter.definition',
          },
          {
            word: 'scenes.glossary.central_angle.word',
            definitionAsHtml: 'scenes.glossary.central_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D19_F88_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.larsen',
        body: 'scenes.S12.S12_D20_F89_C2',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S12_D20_F89_C2_en.mp3',
      },
    ],
  },

  // Scene 13
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1087,
      zoom: 1.03,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S13.S13_D1_F90_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S13_D1_F90_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.hansen',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S13.S13_D2_F91_C3',
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        glossary: [
          {
            word: 'scenes.glossary.fjord.word',
            definitionAsHtml: 'scenes.glossary.fjord.definition',
          },
        ],
        audioUrl: '/assets/audio/circles-engineering-the-depth_S13_D2_F91_C3_en.mp3',
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.astrid',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S13.S13_D3_F92_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S13_D3_F92_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.larsen',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S13.S13_D4_F93_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOut',
          },
        },
        audioUrl: '/assets/audio/circles-engineering-the-depth_S13_D4_F93_C2_en.mp3',
      },
    ],
  },

  // Scene 14
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1087,
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
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
          {
            word: 'scenes.glossary.secant.word',
            definitionAsHtml: 'scenes.glossary.secant.definition',
          },
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
      },
    ],
  },
];
