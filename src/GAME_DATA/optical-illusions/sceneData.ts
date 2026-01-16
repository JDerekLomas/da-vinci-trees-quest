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
      blur: 5,
      pan: 819,
      zoom: 1.01,
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
          alt: 'scenes.common.hayes_description',
          size: 'chat-bubble-square',
          background: '#EBC4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
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

  // Scene2

  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 914,
      blur: 5,
      zoom: 1.01,
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
        glossary: [
          {
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
          },
        ],
        width: '80.5vw',
        audioUrl: '/assets/audio/optical-illusions_S2_D1_F4_C0_en.mp3',
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
      blur: 5,
      pan: 427,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D2_F6_C2',
        headingColor: '#A22DDC',
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
        glossary: [
          {
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S3_D2_F6_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D3_F7_C1',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.owens_description',
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
        audioUrl: '/assets/audio/optical-illusions_S3_D3_F7_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D4_F8_C2',
        headingColor: '#A22DDC',
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
        audioUrl: '/assets/audio/optical-illusions_S3_D4_F8_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D5_F9_C1',
        headingColor: '#238B21',
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
            word: 'scenes.glossary.sampling.word',
            definitionAsHtml: 'scenes.glossary.sampling.definition',
          },
          {
            word: 'scenes.glossary.data_distributions.word',
            definitionAsHtml: 'scenes.glossary.data_distributions.definition',
          },
          {
            word: 'scenes.glossary.response_rate.word',
            definitionAsHtml: 'scenes.glossary.response_rate.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S3_D5_F9_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D6_F10_C2',
        headingColor: '#A22DDC',
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
        glossary: [
          {
            word: 'scenes.glossary.sampling.word',
            definitionAsHtml: 'scenes.glossary.sampling.definition',
          },
          {
            word: 'scenes.glossary.data_distributions.word',
            definitionAsHtml: 'scenes.glossary.data_distributions.definition',
          },
          {
            word: 'scenes.glossary.response_rate.word',
            definitionAsHtml: 'scenes.glossary.response_rate.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S3_D6_F10_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S3.S3_D7_F11_C1',
        headingColor: '#238B21',
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
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S3_D7_F11_C1_en.mp3',
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
      zoom: 1.02,
      pan: 704,
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
        heading: 'scenes.S4.S4_D0_F21_C9.title',
        isPrimaryHeading: true,
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        interactions: [
          {
            name: 'optical-illusions-library',
            config: 'optical-illusions-library-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S4.S4_D0_F21_C9.about.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F21_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.S4.S4_D0_F21_C9.help.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F21_C9.help.body',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S4.S4_D1_F12_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.samples.word',
            definitionAsHtml: 'scenes.glossary.samples.definition',
          },
          {
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S4_D1_F12_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              illusion: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S4.S4_D2_F13_C2',
        headingColor: '#A22DDC',
        glossary: [
          {
            word: 'scenes.glossary.sample.word',
            definitionAsHtml: 'scenes.glossary.sample.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S4_D2_F13_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              illusion: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S4.S4_D3_F14_C1',
        headingColor: '#238B21',
        glossary: [
          {
            word: 'scenes.glossary.bias.word',
            definitionAsHtml: 'scenes.glossary.bias.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S4_D3_F14_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              illusion: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S4.S4_D4_F15_C2',
        headingColor: '#A22DDC',
        glossary: [
          {
            word: 'scenes.glossary.sample.word',
            definitionAsHtml: 'scenes.glossary.sample.definition',
          },
          {
            word: 'scenes.glossary.population.word',
            definitionAsHtml: 'scenes.glossary.population.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S4_D4_F15_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              disabled: 'cafe-wall-illusion-completion',
              illusion: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S4.S4_D5_F16_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S4_D5_F16_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              illusion: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S4.S4_D6_F17_C2',
        headingColor: '#A22DDC',
        glossary: [
          {
            word: 'scenes.glossary.population.word',
            definitionAsHtml: 'scenes.glossary.population.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S4_D6_F17_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              illusion: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S4.S4_D7_F18_C1',
        headingColor: '#238B21',
        glossary: [
          {
            word: 'scenes.glossary.bias.word',
            definitionAsHtml: 'scenes.glossary.bias.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S4_D7_F18_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              illusion: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S4.S4_D8_F19_C2',
        headingColor: '#A22DDC',
        glossary: [
          {
            word: 'scenes.glossary.population.word',
            definitionAsHtml: 'scenes.glossary.population.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S4_D8_F19_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusions-library',
              illusion: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
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
      pan: 570,
      zoom: 1.01,
      blur: 5,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D1_F20_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S5_D1_F20_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D2_F21_C2',
        headingColor: '#A22DDC',
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
        audioUrl: '/assets/audio/optical-illusions_S5_D2_F21_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D3_F22_C1',
        headingColor: '#238B21',
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
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S5_D3_F22_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D4_F23_C2',
        headingColor: '#A22DDC',
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
        glossary: [
          {
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S5_D4_F23_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S5.S5_D5_F24_C1',
        headingColor: '#238B21',
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
            word: 'scenes.glossary.population.word',
            definitionAsHtml: 'scenes.glossary.population.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S5_D5_F24_C1_en.mp3',
      },
    ],
  },

  // Scene 6 - Angle Perception Explorer
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.03,
      pan: 1507,
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
        heading: 'scenes.S6.S6_D0_F24_C9.title',
        isPrimaryHeading: true,
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        interactions: [
          {
            name: 'angle-perceptions',
            config: 'angle-perceptions-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S6.S6_D0_F24_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F24_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F24_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F24_C9.help.body',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S6.S6_D1_F25_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D1_F25_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S6.S6_D2_F26_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D2_F26_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S6.S6_D3_F27_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D3_F27_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S6.S6_D4_F28_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D4_F28_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S6.S6_D5_F29_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D5_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S6.S6_D6_F30_C2',
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
              target: 'angle-perceptions',
              shouldStart: true,
              disabled: 'show-result-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S6_D6_F30_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S6.S6_D7_F29_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D7_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S6.S6_D8_F30_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D8_F30_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S6.S6_D9_F31_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D9_F31_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S6.S6_D10_F32_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S6_D10_F32_C2_en.mp3',
      },
    ],
  },

  // Scene 7 - Triangle Properties Introduction
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1104,
      zoom: 1.04,
      blur: 5,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D1_F33_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S7_D1_F33_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D2_F34_C2',
        headingColor: '#A22DDC',
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
        glossary: [
          {
            word: 'scenes.glossary.polygon.word',
            definitionAsHtml: 'scenes.glossary.polygon.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S7_D2_F34_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D3_F35_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S7_D3_F35_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D4_F36_C2',
        headingColor: '#A22DDC',
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
        audioUrl: '/assets/audio/optical-illusions_S7_D4_F36_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D5_F37_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S7_D5_F37_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D6_F38_C2',
        headingColor: '#A22DDC',
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
        audioUrl: '/assets/audio/optical-illusions_S7_D6_F38_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D14_F46_C1',
        headingColor: '#238B21',
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
            word: 'scenes.glossary.sas.word',
            definitionAsHtml: 'scenes.glossary.sas.definition',
          },
          {
            word: 'scenes.glossary.sss.word',
            definitionAsHtml: 'scenes.glossary.sss.definition',
          },
          {
            word: 'scenes.glossary.asa.word',
            definitionAsHtml: 'scenes.glossary.asa.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S7_D14_F46_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D15_F47_C2',
        headingColor: '#A22DDC',
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
        audioUrl: '/assets/audio/optical-illusions_S7_D15_F47_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S7.S7_D16_F48_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S7_D16_F48_C1_en.mp3',
      },
    ],
  },

  // Scene 8 - Rigid Motion Triangle Explorer
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.01,
      pan: 705,
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
        heading: 'scenes.S8.S8_D0_F49_C9.title',
        isPrimaryHeading: true,
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        interactions: [
          {
            name: 'rigid-motion-triangle-congruence-explorer',
            config: 'rigid-motion-triangle-congruence-explorer',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S8.S8_D0_F49_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F49_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F49_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F49_C9.help.body',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D1_F49_C2',
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
              target: 'rigid-motion-triangle-congruence-explorer',
              disabled: 'rigid-motion-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S8_D1_F49_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S8.S8_D2_F50_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D2_F50_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D3_F51_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.rotation.word',
            definitionAsHtml: 'scenes.glossary.rotation.definition',
          },
          {
            word: 'scenes.glossary.translation.word',
            definitionAsHtml: 'scenes.glossary.translation.definition',
          },
          {
            word: 'scenes.glossary.reflection.word',
            definitionAsHtml: 'scenes.glossary.reflection.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S8_D3_F51_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S8.S8_D4_F52_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.rigid-motions.word',
            definitionAsHtml: 'scenes.glossary.rigid-motions.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S8_D4_F52_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D4_F53_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D4_F53_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D5_F53_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D5_F53_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'rigid-motion-triangle-congruence-explorer',
              shouldCheckTranslation: true,
              disabled: 'translation-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S8.S8_D6_F54_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D6_F54_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'rigid-motion-triangle-congruence-explorer',
              shouldCheckRotation: true,
              disabled: 'rotation-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S8.S8_D6_F54X_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D6_F54X_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D7_F55_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D7_F55_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'rigid-motion-triangle-congruence-explorer',
              shouldCheckReflection: true,
              disabled: 'reflection-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S8.S8_D8_F56_C1',
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
            config: 'rigid-motion-triangle-question',
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
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S8_D8_F56_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D9_F57_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S8_D9_F57_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S8.S8_D9_F57X_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.transformations.word',
            definitionAsHtml: 'scenes.glossary.transformations.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S8_D9_F57X_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D9_F57Y_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D9_F57Y_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S8.S8_D9_F57Z_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D9_F57Z_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S8.S8_D9_F57XY_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S8_D9_F57XY_C2_en.mp3',
      },
    ],
  },

  // Scene 9 - Kanizsa Triangle Introduction
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1104,
      zoom: 1.04,
      blur: 5,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S9.S9_D1_F58_C2',
        headingColor: '#A22DDC',
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
        glossary: [
          {
            word: 'scenes.glossary.congruent.word',
            definitionAsHtml: 'scenes.glossary.congruent.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/optical-illusions_S9_D1_F58_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S9.S9_D2_F59_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S9_D2_F59_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S9.S9_D3_F60_C2',
        headingColor: '#A22DDC',
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
        audioUrl: '/assets/audio/optical-illusions_S9_D3_F60_C2_en.mp3',
      },
    ],
  },

  // Scene 10 - Kanizsa Triangle Analysis
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.03,
      pan: 533,
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
        heading: 'scenes.S10.S10_D0_F61_C9.title',
        isPrimaryHeading: true,
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        interactions: [
          {
            name: 'kaniza-triangle-analysis',
            config: 'kaniza-triangle-analysis',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S10.S10_D0_F61_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F61_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F61_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F61_C9.help.body',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D1_F61_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D1_F61_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S10.S10_D2_F62_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D2_F62_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D3_F63_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D3_F63_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
              shouldTriangleLinesVisible: true,
              disabled: 'check-triangle-lines-visibility',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S10.S10_D4_F64_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D4_F64_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
              shouldMeasurementsVisible: true,
              disabled: 'check-measurements-visibility',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.sss.word',
            definitionAsHtml: 'scenes.glossary.sss.definition',
          },
          {
            word: 'scenes.glossary.sas.word',
            definitionAsHtml: 'scenes.glossary.sas.definition',
          },
          {
            word: 'scenes.glossary.asa.word',
            definitionAsHtml: 'scenes.glossary.asa.definition',
          },
          {
            word: 'scenes.glossary.aas.word',
            definitionAsHtml: 'scenes.glossary.aas.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S10_D5_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D6_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
              disabled: 'scenario-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S10.S10_D7_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sss.word',
            definitionAsHtml: 'scenes.glossary.sss.definition',
          },
          {
            word: 'scenes.glossary.sas.word',
            definitionAsHtml: 'scenes.glossary.sas.definition',
          },
          {
            word: 'scenes.glossary.asa.word',
            definitionAsHtml: 'scenes.glossary.asa.definition',
          },
          {
            word: 'scenes.glossary.aas.word',
            definitionAsHtml: 'scenes.glossary.aas.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S10_D7_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D8_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 1,
              disabled: 'scenario-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S10.S10_D10_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sas.word',
            definitionAsHtml: 'scenes.glossary.sas.definition',
          },
          {
            word: 'scenes.glossary.asa.word',
            definitionAsHtml: 'scenes.glossary.asa.definition',
          },
          {
            word: 'scenes.glossary.aas.word',
            definitionAsHtml: 'scenes.glossary.aas.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S10_D10_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D11_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D11_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S10.S10_D12_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D12_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 2,
              disabled: 'scenario-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S10.S10_D13_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S10_D13_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'kaniza-triangle-analysis',
              scenario: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
    ],
  },

  //  Scene 10x
  {
    name: 'scenesList.scene_10x',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1104,
      zoom: 1.04,
      blur: 5,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S10.S10_D14_FX_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S10_D14_FX_C1_en.mp3',
      },
      {
        heading: 'scenes.common.hayes',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S10.S10_D15_FX_C2',
        headingColor: '#A22DDC',
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
        audioUrl: '/assets/audio/optical-illusions_S10_D15_FX_C2_en.mp3',
      },
      {
        heading: 'scenes.common.owens',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S10.S10_D16_FX_C1',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/optical-illusions_S10_D16_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 11 - Geometric Illusions Gallery
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.03,
      pan: 800,
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
        heading: 'scenes.S11.S11_D0_F93_C9.title',
        isPrimaryHeading: true,
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        interactions: [
          {
            name: 'optical-illusion-gallery-2.0',
            config: 'optical-illusion-gallery-2.0',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S11.S11_D0_F93_C9.about.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F93_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_F93_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F93_C9.help.body',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S11.S11_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S11_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        body: 'scenes.S11.S11_D2_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#EBC4FF',
        },
        audioUrl: '/assets/audio/optical-illusions_S11_D2_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'optical-illusion-gallery-2.0',
              disabled: 'check-squares-overlapped',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.owens',
        body: 'scenes.S11.S11_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        audioUrl: '/assets/audio/optical-illusions_S11_D3_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 12 - Conclusion
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      blur: 5,
      zoom: 1.02,
      pan: 600,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        bodyAsHtml: 'scenes.S12.S12_D1_F100_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D1_F100_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        bodyAsHtml: 'scenes.S12.S12_D2_F101_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.optical-illusions.word',
            definitionAsHtml: 'scenes.glossary.optical-illusions.definition',
          },
        ],
        audioUrl: '/assets/audio/optical-illusions_S12_D2_F101_C2_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.owens',
        bodyAsHtml: 'scenes.S12.S12_D3_F102_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D3_F102_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        bodyAsHtml: 'scenes.S12.S12_D3_F103_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D3_F103_C2_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.owens',
        bodyAsHtml: 'scenes.S12.S12_D4_F104_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D4_F104_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        bodyAsHtml: 'scenes.S12.S12_D4_F103_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D4_F103_C2_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.owens',
        bodyAsHtml: 'scenes.S12.S12_D5_F104_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D5_F104_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hayes',
        bodyAsHtml: 'scenes.S12.S12_D6_F105_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D6_F105_C2_en.mp3',
      },
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.owens',
        bodyAsHtml: 'scenes.S12.S12_D7_F106_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/optical-illusions_S12_D7_F106_C1_en.mp3',
      },
    ],
  },

  // Ending Screen
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      blur: 5,
      pan: 1011,
      zoom: 1.01,
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
