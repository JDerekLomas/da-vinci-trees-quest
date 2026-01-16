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
          src: '/assets/characters/char3mini.webp',
          alt: 'scenes.common.leo_description',
          size: 'chat-bubble-square',
          background: '#C6D8FF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        background: {
          blur: 5,
          zoom: 1.06,
          pan: 1080,
        },
      },
    ],
  },

  // Scene 3 [Pre interactive 1]
  {
    name: 'scenesList.scene_3X',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1015,
      zoom: 1.03,
    },
    type: 'split-screen-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.S3.S3_D0_FX_C0.mainTitle',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.narrator',
        body: 'scenes.S3.S3_D1_FX_C0',
        headingColor: '#333333',
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              slide: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D1_FX_C0_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.S3.S3_D0_FX_C0.mainTitle2',
        discardPrevious: true,
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.narrator',
        body: 'scenes.S3.S3_D2_FX_C0',
        headingColor: '#333333',
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              slide: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D2_FX_C0_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.S3.S3_D0_FX_C0.mainTitle3',
        discardPrevious: true,
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.narrator',
        body: 'scenes.S3.S3_D3_FX_C0',
        headingColor: '#333333',
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              slide: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anoxic_zone.word',
            definitionAsHtml: 'scenes.glossary.anoxic_zone.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D3_FX_C0_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.S3.S3_D0_FX_C0.mainTitle4',
        discardPrevious: true,
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.narrator',
        body: 'scenes.S3.S3_D4_FX_C0',
        headingColor: '#333333',
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              slide: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anoxic_zone.word',
            definitionAsHtml: 'scenes.glossary.anoxic_zone.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D4_FX_C0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S3.S3_D4_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              slide: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D4_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D5_FX_C1',
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
              target: 'interactive-slideshow',
              slide: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anomalies.word',
            definitionAsHtml: 'scenes.glossary.anomalies.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D5_FX_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.S3.S3_D0_FX_C0.mainTitle5',
        discardPrevious: true,
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S3.S3_D6_FX_C2',
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
              target: 'interactive-slideshow',
              slide: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.bathymetry.word',
            definitionAsHtml: 'scenes.glossary.bathymetry.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S3.S3_D7_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              slide: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D7_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S3.S3_D8_FX_C2',
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
              target: 'interactive-slideshow',
              slide: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.submersible.word',
            definitionAsHtml: 'scenes.glossary.submersible.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D8_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 3 [Interactive 1]
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1180,
      zoom: 1.0425,
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
        heading: 'scenes.S3.S3_D0_FX_C9.title',
        interactions: [
          {
            name: 'mission-1',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S3.S3_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S3.S3_D0_FX_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S3.S3_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S3.S3_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S3.S3_D2_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S3_D2_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D4_FX_C1',
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
            config: 'interactive1-question1',
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
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S3.S3_D5_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D5_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S3.S3_D7_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S3_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S3_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D9_FX_C1',
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
              target: 'mission-1',
              disabled: 'system-calibrate-check',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S3_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S3.S3_D10_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S3_D10_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S3.S3_D9_FX_C2',
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
            config: 'interactive1-question2',
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
        audioUrl: '/assets/audio/polynomial-pirates_S3_D9_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 4 [Pre-Interactive 2]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 790,
      zoom: 1.0425,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.albert',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D1_FX_C2',
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
        audioUrl: '/assets/audio/polynomial-pirates_S4_D1_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.luke',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D2_FX_C1',
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
        audioUrl: '/assets/audio/polynomial-pirates_S4_D2_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.albert',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D3_FX_C2',
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
        audioUrl: '/assets/audio/polynomial-pirates_S4_D3_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.luke',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D4_FX_C1',
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
        audioUrl: '/assets/audio/polynomial-pirates_S4_D4_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S4.S4_D5_FX_C3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/polynomial-pirates_S4_D5_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.luke',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D6_FX_C1',
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
            word: 'scenes.glossary.regression.word',
            definitionAsHtml: 'scenes.glossary.regression.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/polynomial-pirates_S4_D6_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 5 [Interactive 2]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 880,
      zoom: 1.0425,
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
        interactions: [
          {
            name: 'interactive-2',
            config: 'interactive-2',
            enableStateExchange: true,
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S5.S5_D1_FX_C2',
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
              step: 1,
              disabled: 'interactive2-step-1',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anomaly.word',
            definitionAsHtml: 'scenes.glossary.anomaly.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D1_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S5.S5_D2_FX_C1',
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
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S5.S5_D3_FX_C2',
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
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S5.S5_D4_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'interactive2-question1',
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
              target: 'interactive-2',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D4_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S5.S5_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S5.S5_D6_FX_C2',
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
              step: 2,
              action: 'fit-model-button-clicked',
              disabled: 'interactive2-step-2',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S5.S5_D7_FX_C1',
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
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.regression.word',
            definitionAsHtml: 'scenes.glossary.regression.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S5.S5_D8_FX_C2',
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
            config: 'interactive2-question2',
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
            word: 'scenes.glossary.degree.word',
            definitionAsHtml: 'scenes.glossary.degree.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S5.S5_D9_FX_C2',
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
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anomaly.word',
            definitionAsHtml: 'scenes.glossary.anomaly.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D9_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S5.S5_D10_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-2',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D10_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S5.S5_D11_FX_C1',
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
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S5.S5_D12_FX_C2',
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
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anomaly.word',
            definitionAsHtml: 'scenes.glossary.anomaly.definition',
          },
          {
            word: 'scenes.glossary.drone_boats.word',
            definitionAsHtml: 'scenes.glossary.drone_boats.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S5_D12_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 6 [Pre-Interactive 3]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1662,
      zoom: 1.0425,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
    },
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        skipNavigation: true,
        heading: 'scenes.S6.S6_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'drone-boats',
            config: 'drone-boats-config',
            enableStateExchange: true,
          },
        ],
        contentBackgroundColor: '#101E3E',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S6.S6_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.luke_description',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.drone_boats.word',
            definitionAsHtml: 'scenes.glossary.drone_boats.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S6_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S6.S6_D2_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S6_D2_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S6.S6_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S6_D3_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 9 [Combining Sonar Scans]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.0425,
      pan: 897,
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
        heading: 'scenes.S9.S9_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'combining-sonar-scans',
            config: 'combining-sonar-scans-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_FX_C9.info.body',
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
        heading: 'scenes.common.luke',
        body: 'scenes.S9.S9_D1_FX_C1',
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
              target: 'combining-sonar-scans',
              step: 1,
              disabled: 'step1-dropped',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S9.S9_D2_FX_C1',
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
            config: 'interactive3-question1',
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
              target: 'combining-sonar-scans',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S9.S9_D3_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'combining-sonar-scans',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D3_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S9.S9_D4_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.albert_description',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'combining-sonar-scans',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S9.S9_D5_FX_C2',
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
            config: 'interactive3-question2',
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
              target: 'combining-sonar-scans',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D5_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S9.S9_D6_FX_C1',
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
              target: 'combining-sonar-scans',
              step: 1,
              disabled: 'step1-complete',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S9.S9_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S9_D7_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'combining-sonar-scans',
              step: 2,
              disabled: 'step2-dropped',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S9.S9_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/polynomial-pirates_S9_D8_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'combining-sonar-scans',
              step: 2,
              disabled: 'step2-complete',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anomaly.word',
            definitionAsHtml: 'scenes.glossary.anomaly.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S9.S9_D9_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'combining-sonar-scans',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D9_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S9.S9_D10_FX_C2',
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
              target: 'combining-sonar-scans',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.submersible.word',
            definitionAsHtml: 'scenes.glossary.submersible.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S9_D10_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg9_description',
      url: '/assets/backgrounds/bg9.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.07,
      pan: 1210,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.S10.S10_D0_FX_C0.mainTitle',
        interactions: [
          {
            name: 'interactive-slideshow-pre-end',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S10.S10_D1_FX_C1',
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
              target: 'interactive-slideshow-pre-end',
              slide: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.submersible.word',
            definitionAsHtml: 'scenes.glossary.submersible.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S10.S10_D2_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow-pre-end',
              slide: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D2_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S10.S10_D3_FX_C2',
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
              target: 'interactive-slideshow-pre-end',
              slide: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S10.S10_D4_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow-pre-end',
              slide: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D4_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S10.S10_D5_FX_C1',
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
              target: 'interactive-slideshow-pre-end',
              slide: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D5_FX_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: 'scenes.S10.S10_D0_FX_C0.mainTitle2',
        interactions: [
          {
            name: 'interactive-slideshow-pre-end',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S10.S10_D6_FX_C2',
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
              target: 'interactive-slideshow-pre-end',
              slide: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S10.S10_D7_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow-pre-end',
              slide: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.mast.word',
            definitionAsHtml: 'scenes.glossary.mast.definition',
          },
          {
            word: 'scenes.glossary.rigging.word',
            definitionAsHtml: 'scenes.glossary.rigging.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D7_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S10.S10_D8_FX_C1',
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
              target: 'interactive-slideshow-pre-end',
              slide: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S10.S10_D9_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow-pre-end',
              slide: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D9_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S10.S10_D10_FX_C2',
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
              target: 'interactive-slideshow-pre-end',
              slide: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D10_FX_C2_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: 'scenes.S10.S10_D0_FX_C0.mainTitle3',
        interactions: [
          {
            name: 'interactive-slideshow-pre-end',
            config: 'mission-1',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        contentBackgroundColor: '#231E3C',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S10.S10_D11_FX_C1',
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
              target: 'interactive-slideshow-pre-end',
              slide: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S10.S10_D12_FX_C2',
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
              target: 'interactive-slideshow-pre-end',
              slide: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.anoxic_zone.word',
            definitionAsHtml: 'scenes.glossary.anoxic_zone.definition',
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D12_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.S10.S10_D13_FX_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow-pre-end',
              slide: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D13_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.luke',
        body: 'scenes.S10.S10_D14_FX_C1',
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
              target: 'interactive-slideshow-pre-end',
              slide: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D14_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.albert',
        body: 'scenes.S10.S10_D15_FX_C2',
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
              target: 'interactive-slideshow-pre-end',
              slide: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/polynomial-pirates_S10_D15_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 11 [Ending Screen]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg7_description',
      url: '/assets/backgrounds/bg7.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.02,
      pan: 750,
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
