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
      zoom: 1.04,
      pan: 1015,
      blur: 4,
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
          src: '/assets/characters/char2mini_2.webp',
          alt: 'scenes.common.lena_description',
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

  // Scene 2 [Welcome Screen]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 835,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.S2.S2_D1_FX_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_FX_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/falling-into-orbit_S2_D1_FX_C0_en.mp3',
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
      blur: 3,
      pan: 1425,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D1_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char3',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S3.S3_D2_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D2_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S3.S3_D3_FX_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D3_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D4_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D4_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D5_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D5_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char3',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S3.S3_D6_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D6_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D7_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D7_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S3.S3_D8_FX_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D8_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S3.S3_D9_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S3_D9_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 4 [The First Law of Falling]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1425,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S4.S4_D1_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S4_D1_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parabola.word',
            definitionAsHtml: 'scenes.glossary.parabola.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char3',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S4.S4_D2_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S4_D2_FX_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.parabola.word',
            definitionAsHtml: 'scenes.glossary.parabola.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S4.S4_D3_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S4_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S4.S4_D4_FX_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S4_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S4.S4_D5_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S4_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 5 [Projectile Motion Simulator]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 315,
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
        heading: 'scenes.S5.S5_D0_FX_C9.title',
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
        interactions: [
          {
            name: 'projectile-simulation',
            config: 'projectile-simulation-config',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D1_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D1_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'projectile-simulation',
              checkAngleSliderChange: true,
              disabled: 'check-for-angle-change',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D2_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D3_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D3_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'projectile-simulation',
              checkSpeedSliderChange: true,
              disabled: 'check-for-speed-change',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S5.S5_D4_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D4_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D5_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D5_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'projectile-simulation',
              checkMaxSpeedLaunch: true,
              disabled: 'check-for-max-speed-launch',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S5.S5_D6_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D6_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S5.S5_D7_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D8_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D9_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S5.S5_D10_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D10_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D11_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D12_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S5_D12_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 6 [Newton's Revolutionary Idea]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1425,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S6.S6_D1_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S6_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char3',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S6.S6_D2_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S6_D2_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S6.S6_D3_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S6_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S6.S6_D4_FX_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S6_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S6.S6_D5_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S6_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 7 [Newton's Canon]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 315,
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
        heading: 'scenes.S7.S7_D0_FX_C9.title',
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
        interactions: [
          {
            name: 'newtons-canon',
            config: 'newtons-canon-config',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D1_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D1_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'newtons-canon',
              checkParabolicOrbit: true,
              disabled: 'check-for-parabolic-orbit',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S7.S7_D2_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D2_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D3_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D3_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'newtons-canon',
              checkEllipticalOrbit: true,
              disabled: 'check-for-elliptical-orbit',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D4_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S7.S7_D5_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D5_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D6_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D7_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D7_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'newtons-canon',
              checkHyperbolicOrbit: true,
              disabled: 'check-for-hyperbolic-orbit',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D8_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D9_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D9_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.escape-velocity.word',
            definitionAsHtml: 'scenes.glossary.escape-velocity.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D10_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D10_FX_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-radio',
            config: 'newtons-canon-question',
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
        body: 'scenes.S7.S7_D11_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S7.S7_D12_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D12_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S7.S7_D13_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D13_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D14_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S7_D14_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 8 [The Ancient Secret]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1425,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S8.S8_D1_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S8_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char3',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S8.S8_D2_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S8_D2_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S8.S8_D3_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S8_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S8.S8_D4_FX_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S8_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S8.S8_D5_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S8_D5_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.conic-sections.word',
            definitionAsHtml: 'scenes.glossary.conic-sections.definition',
          },
        ],
      },
    ],
  },

  // Scene 9 [3D Cone Slicer]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 315,
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
        heading: 'scenes.S9.S9_D0_FX_C9.title',
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
        interactions: [
          {
            name: '3d-cone-slicer',
            config: '3d-cone-slicer-config',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D1_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D1_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: '3d-cone-slicer',
              disabled: 'check-for-circle-clicked',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D2_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D2_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D3_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D3_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: '3d-cone-slicer',
              disabled: 'check-for-ellipse-clicked',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S9.S9_D4_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D4_FX_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D5_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D5_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.ellipse.word',
            definitionAsHtml: 'scenes.glossary.ellipse.definition',
          },
        ],
        events: [
          {
            payload: {
              target: '3d-cone-slicer',
              disabled: 'check-for-parabola-clicked',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D6_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D7_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D7_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: '3d-cone-slicer',
              disabled: 'check-for-hyperbola-clicked',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S9.S9_D8_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D8_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D9_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: '3d-cone-slicer',
              disabled: 'check-for-angle-slider-adjusted',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S9.S9_D10_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D10_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D11_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D11_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.conic-sections.word',
            definitionAsHtml: 'scenes.glossary.conic-sections.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D12_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'conic-sections-question',
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
        audioUrl: '/assets/audio/falling-into-orbit_S9_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D13_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D13_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.ellipse.word',
            definitionAsHtml: 'scenes.glossary.ellipse.definition',
          },
          {
            word: 'scenes.glossary.hyperbola.word',
            definitionAsHtml: 'scenes.glossary.hyperbola.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D16_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S9_D16_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 10 [The Parking Spot in the Sky]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1425,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S10.S10_D1_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S10_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S10.S10_D2_FX_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S10_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S10.S10_D3_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S10_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char3',
        headingColor: '#008217',
        bodyAsHtml: 'scenes.S10.S10_D4_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S10_D4_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S10.S10_D5_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S10_D5_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char2',
        headingColor: '#0061FC',
        bodyAsHtml: 'scenes.S10.S10_D6_FX_C2',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S10_D6_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        headingColor: '#E0002B',
        bodyAsHtml: 'scenes.S10.S10_D7_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/falling-into-orbit_S10_D7_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 11 [Geosynchronous Orbit Simulator]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 315,
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
        heading: 'scenes.S11.S11_D0_FX_C9.title',
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
        interactions: [
          {
            name: 'geosynchronous-orbit-simulator',
            config: 'geosynchronous-orbit-simulator-config',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D1_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D2_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D2_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geosynchronous-orbit-simulator',
              disabled: 'check-for-orbit-radius-slider-adjusted',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S11.S11_D3_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D3_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D4_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D5_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D5_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geosynchronous-orbit-simulator',
              disabled: 'check-for-radius-at-144',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S11.S11_D6_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D6_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D7_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D7_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.altitude.word',
            definitionAsHtml: 'scenes.glossary.altitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D9_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S11.S11_D10_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D10_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S11.S11_D11_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D11_FX_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
          {
            word: 'scenes.glossary.ellipse.word',
            definitionAsHtml: 'scenes.glossary.ellipse.definition',
          },
          {
            word: 'scenes.glossary.conic-sections.word',
            definitionAsHtml: 'scenes.glossary.conic-sections.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S11.S11_D12_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S11_D12_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 13 [Satellite Launch Simulator]
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 315,
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
        heading: 'scenes.S13.S13_D0_FX_C9.title',
        about: [
          {
            heading: 'scenes.S13.S13_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S13.S13_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S13.S13_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S13.S13_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        interactions: [
          {
            name: 'satellite-launch-simulator',
            config: 'satellite-launch-simulator-config',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D1_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D1_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.altitude.word',
            definitionAsHtml: 'scenes.glossary.altitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D2_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D3_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D3_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.altitude.word',
            definitionAsHtml: 'scenes.glossary.altitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D4_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D4_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
          {
            word: 'scenes.glossary.ellipse.word',
            definitionAsHtml: 'scenes.glossary.ellipse.definition',
          },
          {
            word: 'scenes.glossary.parabola.word',
            definitionAsHtml: 'scenes.glossary.parabola.definition',
          },
          {
            word: 'scenes.glossary.hyperbola.word',
            definitionAsHtml: 'scenes.glossary.hyperbola.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D5_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D5_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'satellite-launch-simulator',
              disabled: 'check-for-altitude-slider-adjusted',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D6_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D6_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.altitude.word',
            definitionAsHtml: 'scenes.glossary.altitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D7_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D7_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.escape-velocity.word',
            definitionAsHtml: 'scenes.glossary.escape-velocity.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D8_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D8_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'satellite-launch-simulator',
              disabled: 'check-for-velocity-below-circular',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D9_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D9_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D10_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D10_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'satellite-launch-simulator',
              disabled: 'check-for-circular-velocity-launch',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S13.S13_D11_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D11_FX_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D12_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D12_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D13_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D13_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.escape-velocity.word',
            definitionAsHtml: 'scenes.glossary.escape-velocity.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'satellite-launch-simulator',
              disabled: 'check-for-velocity-between-circular-escape',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S13.S13_D14_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D14_FX_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.ellipse.word',
            definitionAsHtml: 'scenes.glossary.ellipse.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D15_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D15_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.escape-velocity.word',
            definitionAsHtml: 'scenes.glossary.escape-velocity.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'satellite-launch-simulator',
              disabled: 'check-for-escape-velocity-launch',
            },
            triggers: ['on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S13.S13_D16_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D16_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S13.S13_D17_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0FFEF',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D17_FX_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.hyperbola.word',
            definitionAsHtml: 'scenes.glossary.hyperbola.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D18_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'satellite-orbit-question',
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
        audioUrl: '/assets/audio/falling-into-orbit_S13_D18_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.altitude.word',
            definitionAsHtml: 'scenes.glossary.altitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S13.S13_D19_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FEB4B4',
        },
        audioUrl: '/assets/audio/falling-into-orbit_S13_D19_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.altitude.word',
            definitionAsHtml: 'scenes.glossary.altitude.definition',
          },
          {
            word: 'scenes.glossary.parabola.word',
            definitionAsHtml: 'scenes.glossary.parabola.definition',
          },
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
          {
            word: 'scenes.glossary.ellipse.word',
            definitionAsHtml: 'scenes.glossary.ellipse.definition',
          },
          {
            word: 'scenes.glossary.hyperbola.word',
            definitionAsHtml: 'scenes.glossary.hyperbola.definition',
          },
        ],
      },
    ],
  },

  // Scene 14 [Reflection and Synthesis]
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1425,
      zoom: 1.04,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.char3',
        body: 'scenes.S14.S14_D1_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        audioUrl: '/assets/audio/falling-into-orbit_S14_D1_FX_C3_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.char1',
        body: 'scenes.S14.S14_D2_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        audioUrl: '/assets/audio/falling-into-orbit_S14_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char2',
        body: 'scenes.S14.S14_D3_FX_C2',
        headingColor: '#0061FC',
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/falling-into-orbit_S14_D3_FX_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circle.word',
            definitionAsHtml: 'scenes.glossary.circle.definition',
          },
          {
            word: 'scenes.glossary.ellipse.word',
            definitionAsHtml: 'scenes.glossary.ellipse.definition',
          },
          {
            word: 'scenes.glossary.parabola.word',
            definitionAsHtml: 'scenes.glossary.parabola.definition',
          },
          {
            word: 'scenes.glossary.hyperbola.word',
            definitionAsHtml: 'scenes.glossary.hyperbola.definition',
          },
          {
            word: 'scenes.glossary.conic-sections.word',
            definitionAsHtml: 'scenes.glossary.conic-sections.definition',
          },
        ],
      },
      {
        side: 'left',
        heading: 'scenes.common.char3',
        body: 'scenes.S14.S14_D4_FX_C3',
        headingColor: '#008217',
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.char3_description',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        audioUrl: '/assets/audio/falling-into-orbit_S14_D4_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S14.S14_D5_FX_C1',
        headingColor: '#E0002B',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        audioUrl: '/assets/audio/falling-into-orbit_S14_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 15 [Ending Screen]
  {
    name: 'scenesList.scene_15',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      pan: 875,
      zoom: 1.03,
      blur: 3,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    audioUrl: '/assets/audio/bgmusic.mp3',
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: '',
        body: '',
        headingColor: '#000',
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
