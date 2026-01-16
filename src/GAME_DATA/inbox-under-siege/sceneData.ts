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
      initialZoom: 1.05,
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
        glossary: [
          {
            word: 'scenes.glossary.conditional_probability.word',
            definitionAsHtml: 'scenes.glossary.conditional_probability.definition',
          },
          {
            word: 'scenes.glossary.two_way_table.word',
            definitionAsHtml: 'scenes.glossary.two_way_table.definition',
          },
          {
            word: 'scenes.glossary.independence.word',
            definitionAsHtml: 'scenes.glossary.independence.definition',
          },
          {
            word: 'scenes.glossary.classification_thresholds.word',
            definitionAsHtml: 'scenes.glossary.classification_thresholds.definition',
          },
        ],
        width: DialogWidth.START_SCREEN,
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.ethan_description',
          size: 'chat-bubble-square',
          background: '#D7B9FF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        background: {
          blur: 4,
          zoom: 1.001,
          pan: 875,
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
      pan: 830,
      zoom: 1.1,
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
        audioUrl: '/assets/audio/inbox-under-siege_S2_D1_F3_C0_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.data_analysis.word',
            definitionAsHtml: 'scenes.glossary.data_analysis.definition',
          },
        ],
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
      blur: 5,
      pan: 1213,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D1_F6_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S3_D1_F6_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.alicia_description',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D2_F7_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S3_D2_F7_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D3_F8_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S3_D3_F8_C1_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D4_F9_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S3_D4_F9_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D5_F10_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S3_D5_F10_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '56.5vw',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D6_F11_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S3_D6_F11_C2_en.mp3',
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
      blur: 5,
      pan: 1015,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D1_F12_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S4_D1_F12_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S4.S4_D2_F13_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S4_D2_F13_C1_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D3_F14_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S4_D3_F14_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S4.S4_D4_F15_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S4_D4_F15_C1_en.mp3',
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
      },
    ],
  },

  // Scene 5: Email Analysis
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 639,
      zoom: 1.01,
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
        heading: 'scenes.S5.S5_D0_F17_C9.title',
        interactions: [
          {
            name: 'email-feature-tracker',
            config: 'email-feature-tracker',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_F17_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F17_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D1_F17_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D1_F17_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'email-feature-tracker',
              disabled: 'email-feature-tracker-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D2_F18_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D1_F18_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
          position: 'right',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S5.S5_D2_F18_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D2_F18_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D3_F19_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D3_F19_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },

        events: [
          {
            payload: {
              target: 'email-feature-tracker',
              disabled: 'email-feature-tracker-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D4_F20_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D4_F20_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'email-feature-tracker',
              disabled: 'email-feature-tracker-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D5_F21_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D5_F21_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S5.S5_D5_F21_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D5_F21_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
        events: [
          {
            payload: {
              target: 'email-feature-tracker',
              disabled: 'email-feature-tracker-step-4-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D6_F22_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D6_F22_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S5.S5_D7_F23_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D7_F23_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D8_F24_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D8_F24_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S5.S5_D9_F25_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S5_D9_F25_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
    ],
  },

  // Scene 6: Frequency Table Analysis
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1015,
      zoom: 1.01,
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
        heading: 'scenes.S6.S6_D0_F25_C9.title',
        bodyAsHtml: 'scenes.S6.frequency_table',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S6.S6_D1_F25_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D1_F25_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S6.S6_D2_F26_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D2_F26_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S6.S6_D3_F27_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D3_F27_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S6.S6_D4_F28_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D4_F28_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S6.S6_D5_F29_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D5_F29_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S6.S6_D6_F30_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D6_F30_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S6.S6_D7_F31_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D7_F31_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S6.S6_D8_F32_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S6_D8_F32_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.independent.word',
            definitionAsHtml: 'scenes.glossary.independent.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
    ],
  },

  // Scene 7: Feature Independence Test
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1054,
      zoom: 1.01,
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
        heading: 'scenes.S7.S7_D0_F34_C9.title',
        interactions: [
          {
            config: 'conditional-probability-calculator',
            name: 'conditional-probability-calculator',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S7.S7_D0_F34_C9.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F34_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_F34_C9.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F34_C9.help.body',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S7.S7_D1_F34_C1',
        glossary: [
          {
            word: 'scenes.glossary.independent.word',
            definitionAsHtml: 'scenes.glossary.independent.definition',
          },
        ],
        audioUrl: '/assets/audio/inbox-under-siege_S7_D1_F34_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S7.S7_D2_F35_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S7_D2_F35_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'conditional-probability-calculator',
              disabled: 'conditional-probability-calculator-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S7.S7_D3_F36_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S7_D3_F36_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'probability-calculator',
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
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S7.S7_D4_F37_C2',
        glossary: [
          {
            word: 'scenes.glossary.independent.word',
            definitionAsHtml: 'scenes.glossary.independent.definition',
          },
        ],
        audioUrl: '/assets/audio/inbox-under-siege_S7_D4_F37_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S7.S7_D5_F38_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S7_D5_F38_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S7.S7_D6_F39_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S7_D6_F39_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S7.S7_D7_F40_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S7_D7_F40_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.independent.word',
            definitionAsHtml: 'scenes.glossary.independent.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
    ],
  },

  // Scene 8: Spam Detection Model
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 467,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D1_F42_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S8_D1_F42_C1_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S8.S8_D2_F43_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S8_D2_F43_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D3_F44_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S8_D3_F44_C1_en.mp3',
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
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        width: '56.5vw',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S8.S8_D4_F45_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S8_D4_F45_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D5_F46_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S8_D5_F46_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
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
        width: '56.5vw',
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
      blur: 5,
      pan: 1020,
      zoom: 1.01,
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
        heading: 'scenes.S9.S9_D0_F48_C9.title',
        interactions: [
          {
            config: 'email-classification-threshold-adjuster',
            name: 'email-classification-threshold-adjuster',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_F48_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F48_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S9.S9_D1_F48_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S9_D1_F48_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'email-classification-threshold-adjuster',
              disabled: 'fifty-percent-threshold-step',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S9.S9_D1E_FX_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S9_D1E_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S9.S9_D2_F49_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S9_D2_F49_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S9.S9_D3_F50_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S9_D3_F50_C1_en.mp3',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
          {
            word: 'scenes.glossary.false_positive.word',
            definitionAsHtml: 'scenes.glossary.false_positive.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'email-classification-threshold-adjuster',
              disabled: 'seventy-percent-threshold-step',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S9.S9_D4_F51_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S9_D4_F51_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S9.S9_D5_F52_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S9_D5_F52_C1_en.mp3',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
          {
            word: 'scenes.glossary.false_positives.word',
            definitionAsHtml: 'scenes.glossary.false_positives.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
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
      blur: 5,
      pan: 560,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S10.S10_D1_F54_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S10_D1_F54_C1_en.mp3',
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
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
          {
            word: 'scenes.glossary.false_positives.word',
            definitionAsHtml: 'scenes.glossary.false_positives.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D2_F55_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S10_D2_F55_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alicia',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S10.S10_D3_F56_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S10_D3_F56_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
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
        width: '56.5vw',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ethan',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D4_F57_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S10_D4_F57_C2_en.mp3',
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
      },
    ],
  },

  // Scene 11: Optimizing Threshold
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1525,
      zoom: 1.01,
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
        heading: 'scenes.S11.S11_D0_F59_C9.title',
        interactions: [
          {
            config: 'email-misclassification-cost-calculator',
            name: 'email-misclassification-cost-calculator',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S11.S11_D0_F59_C9.about.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F59_C9.about.body',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_F59_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F59_C9.help.body',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S11.S11_D1_F59_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D1_F59_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S11.S11_D2_F60_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D2_F60_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S11.S11_D3_F60_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D3_F60_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S11.S11_D4_F61_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D4_F61_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S11.S11_D3_F61_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D3_F61_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'email-misclassification-cost-calculator',
              disabled: 'spam-probability-threshold-step',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S11.S11_D4_F62_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D4_F62_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S11.S11_D5_F63_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D5_F63_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'email-cost-calculator-question',
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
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S11.S11_D6_F64_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D6_F64_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S11.S11_D7_F65_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D7_F65_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S11.S11_D8_F66_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D8_F66_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alicia',
        body: 'scenes.S11.S11_D9_F67_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D9_F67_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S11.S11_D10_F68_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S11_D10_F68_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7B9FF',
        },
      },
    ],
  },

  // Scene 12: Conclusion
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      pan: 840,
      zoom: 1.02,
      blur: 5,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.alicia',
        bodyAsHtml: 'scenes.S_12.S12_D1_F70_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S12_D1_F70_C1_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S_12.S12_D2_F71_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S12_D2_F71_C2_en.mp3',
        headingColor: '#A22DDC',
        glossary: [
          {
            word: 'scenes.glossary.conditional_probability.word',
            definitionAsHtml: 'scenes.glossary.conditional_probability.definition',
          },
          {
            word: 'scenes.glossary.independence.word',
            definitionAsHtml: 'scenes.glossary.independence.definition',
          },
          {
            word: 'scenes.glossary.threshold.word',
            definitionAsHtml: 'scenes.glossary.threshold.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
      {
        side: 'left',
        heading: 'scenes.common.alicia',
        bodyAsHtml: 'scenes.S_12.S12_D3_F72_C1',
        audioUrl: '/assets/audio/inbox-under-siege_S12_D3_F72_C1_en.mp3',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.false_negatives.word',
            definitionAsHtml: 'scenes.glossary.false_negatives.definition',
          },
          {
            word: 'scenes.glossary.false_positives.word',
            definitionAsHtml: 'scenes.glossary.false_positives.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S_12.S12_D4_F73_C2',
        audioUrl: '/assets/audio/inbox-under-siege_S12_D4_F73_C2_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
    ],
  },

  // Scene 13
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      pan: 1160,
      zoom: 1.01,
      blur: 5,
      waitDelay: SCENE_CHANGE_DELAY,
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
