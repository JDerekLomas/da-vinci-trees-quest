import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1 [Start Screen]
  {
    name: 'scenesList.scene_1',
    background: {
      url: '/assets/backgrounds/bg1.webp',
      alt: 'scenes.common.bg1_description',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.07,
      pan: 725,
    },
    logoTheme: {
      landscape: LogoTheme.LIGHT,
      portrait: LogoTheme.LIGHT,
    },
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
          alt: 'scenes.common.akila_description',
          size: 'chat-bubble-square',
          background: '#FF9999',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
      },
    ],
    audioUrl: '/assets/audio/bgmusic.mp3',
  },

  // Scene 2
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.24,
      pan: 1000,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.S2.S2_D1_F4_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_F4_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/ancient-alexandria_S2_D1_F4_C0_en.mp3',
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
      zoom: 1.24,
      pan: 1418,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        headingColor: '#005F20',
        bodyAsHtml: 'scenes.S3.S3_D1_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D1_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S3.S3_D2_FX_C2',
        headingColor: '#8200C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.hypatia_description',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        headingColor: '#005F20',
        bodyAsHtml: 'scenes.S3.S3_D3_FX_C3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D3_FX_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D4_FX_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D4_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        headingColor: '#8200C3',
        bodyAsHtml: 'scenes.S3.S3_D5_FX_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/ancient-alexandria_S3_D5_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D6_FX_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D6_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        headingColor: '#8200C3',
        bodyAsHtml: 'scenes.S3.S3_D7_FX_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/ancient-alexandria_S3_D7_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D8_FX_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D8_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D9_FX_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D9_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        headingColor: '#8200C3',
        bodyAsHtml: 'scenes.S3.S3_D10_FX_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/ancient-alexandria_S3_D10_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D11_FX_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S3_D11_FX_C1_en.mp3',
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
      zoom: 0.95,
      pan: 1350,
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
        isPrimaryHeading: true,
        heading: 'scenes.S4.S4_D0_F11_C9.title',
        interactions: [
          {
            name: 'circle-construction',
            config: 'circle-construction',
            enableStateExchange: true,
          },
        ],
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
        headingColor: '#333',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D1_FX_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D1_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'circle-construction',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D2_FX_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S4_D2_FX_C2_en.mp3',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-construction',
              step: 2,
              disabled: 'circle-construction-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D3_FX_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D3_FX_C2_en.mp3',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-construction',
              step: 3,
              disabled: 'circle-construction-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D4_FX_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D4_FX_C2_en.mp3',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'circle-construction',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S4.S4_D5_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D5_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'circle-construction',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D6_FX_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'circle-construction-question-1',
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
        audioUrl: '/assets/audio/ancient-alexandria_S4_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S4.S4_D7_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D8_FX_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S4.S4_D9_FX_C3',
        headingColor: '#005F20',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D9_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S4.S4_D10_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D10_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S4.S4_D11_FX_C3',
        headingColor: '#005F20',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'circle-construction-question-2',
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
        audioUrl: '/assets/audio/ancient-alexandria_S4_D11_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S4.S4_D12_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S4.S4_D13_FX_C3',
        headingColor: '#005F20',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S4_D13_FX_C3_en.mp3',
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
      blur: 5,
      zoom: 1,
      pan: 1817,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S5.S5_D1_F20_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S5_D1_F20_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S5.S5_D2_F21_C2',
        headingColor: '#8200C3',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S5_D2_F21_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S5.S5_D3_F22_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S5_D3_F22_C1_en.mp3',
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      blur: 5,
      zoom: 1,
      pan: 1240,
      waitDelay: SCENE_CHANGE_DELAY,
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
        isPrimaryHeading: true,
        heading: 'scenes.S6.S6_D0_F27_C9.title',
        interactions: [
          {
            name: 'geometric-construction',
            config: 'geometric-construction',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S6.S6_D0_F27_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F27_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F27_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F27_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        headingColor: '#333',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S6.S6_D0_F23_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D0_F23_C2_en.mp3',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 1,
              disabled: 'geometric-construction-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S6.S6_D1_F27_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D1_F27_C1_en.mp3',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 1,
              disabled: 'geometric-construction-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S6.S6_D2_F28_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.equidistant.word',
            definitionAsHtml: 'scenes.glossary.equidistant.definition',
          },
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S6_D2_F28_C2_en.mp3',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 2,
              disabled: 'geometric-construction-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S6.S6_D3_F29_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D3_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S6.S6_D4_F30_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.intersection_points.word',
            definitionAsHtml: 'scenes.glossary.intersection_points.definition',
          },
          {
            word: 'scenes.glossary.equidistant.word',
            definitionAsHtml: 'scenes.glossary.equidistant.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S6_D4_F30_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S6.S6_D5_F31_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D5_F31_C1_en.mp3',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
          {
            type: 'next',
            text: 'dialog.button.next',
          },
        ],
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S6.S6_D6_F32_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.equidistant.word',
            definitionAsHtml: 'scenes.glossary.equidistant.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S6_D6_F32_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S6.S6_D7_F33_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D7_F33_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S6.S6_D8_F34_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D8_F34_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S6.S6_D9_F35_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D9_F35_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'geometric-construction',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S6.S6_D10_F36_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D10_F36_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S6.S6_D11_F37_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D11_F37_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S6.S6_D12_F38_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.equidistant.word',
            definitionAsHtml: 'scenes.glossary.equidistant.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S6_D12_F38_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S6.S6_D13_F39_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S6_D13_F39_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.equidistant.word',
            definitionAsHtml: 'scenes.glossary.equidistant.definition',
          },
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
        ],
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
      blur: 5,
      zoom: 1.21,
      pan: 1398,
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
        isPrimaryHeading: true,
        heading: 'scenes.S7.S7_D0_F76_C9.title',
        interactions: [
          {
            name: 'circle-center-construction',
            config: 'circle-center-construction',
            enableStateExchange: true,
          },
        ],
        // about: [
        //   {
        //     heading: 'scenes.S7.S7_D0_F76_C9.about.heading',
        //     bodyAsHtml: 'scenes.S7.S7_D0_F76_C9.about.body',
        //     accentColor: '#006BE0',
        //   },
        // ],
        // help: [
        //   {
        //     heading: 'scenes.S7.S7_D0_F76_C9.help.heading',
        //     bodyAsHtml: 'scenes.S7.S7_D0_F76_C9.help.body',
        //     accentColor: '#A22DDC',
        //   },
        // ],
        headingColor: '#333',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D1_F35_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D1_F35_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 1 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D2_F36_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D2_F36_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 1 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D3_F37_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D3_F37_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 1 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D4_F38_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D4_F38_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 2 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D5_F39_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D5_F39_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 2 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D6_F40_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D6_F40_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 2 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D7_F41_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D7_F41_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 3 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D8_F42_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D8_F42_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 3 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D9_F43_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D9_F43_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 3 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.equidistant.word',
            definitionAsHtml: 'scenes.glossary.equidistant.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D10_F44_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D10_F44_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 3 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D11_F45_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D11_F45_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 4 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisectors.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisectors.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D12_F46_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D12_F46_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 4 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisectors.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisectors.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D13_F47_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D13_F47_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 4 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisector.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisector.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D14_F48_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D14_F48_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 5 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D15_F49_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D15_F49_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 5 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.perpendicular_bisectors.word',
            definitionAsHtml: 'scenes.glossary.perpendicular_bisectors.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D16_F50_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D16_F50_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 6 }, triggers: ['on-next', 'on-back'] }],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D17_F51_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D17_F51_C2_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 6 }, triggers: ['on-next', 'on-back'] }],
        glossary: [
          {
            word: 'scenes.glossary.equidistant.word',
            definitionAsHtml: 'scenes.glossary.equidistant.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D18_F52_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S7_D18_F52_C1_en.mp3',
        controls: [
          { type: 'back', text: 'dialog.button.back' },
          { type: 'next', text: 'dialog.button.next' },
        ],
        events: [{ payload: { target: 'circle-center-construction', step: 6 }, triggers: ['on-next', 'on-back'] }],
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
      blur: 5,
      zoom: 1.21,
      pan: 1398,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D1_F48_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S8_D1_F48_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S8.S8_D2_F49_C3',
        headingColor: '#005F20',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
            word: 'scenes.glossary.mathematical_truth.word',
            definitionAsHtml: 'scenes.glossary.mathematical_truth.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S8_D2_F49_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S8.S8_D3_F50_C3',
        headingColor: '#005F20',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
            word: 'scenes.glossary.mathematical_truth.word',
            definitionAsHtml: 'scenes.glossary.mathematical_truth.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S8_D3_F50_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D4_F51_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S8_D4_F51_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S8.S8_D5_F52_C3',
        headingColor: '#005F20',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S8_D5_F52_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S8.S8_D6_F53_C2',
        headingColor: '#8200C3',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.mathematical_truth.word',
            definitionAsHtml: 'scenes.glossary.mathematical_truth.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S8_D6_F53_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D7_F54_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
          {
            word: 'scenes.glossary.mathematical_truth.word',
            definitionAsHtml: 'scenes.glossary.mathematical_truth.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S8_D7_F54_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S8.S8_D8_F55_C2',
        headingColor: '#8200C3',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        glossary: [
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S8_D8_F55_C2_en.mp3',
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
      blur: 5,
      zoom: 1.2,
      pan: 350,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S9.S9_D1_F52_C3',
        headingColor: '#005F20',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S9_D1_F52_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S9.S9_D2_F53_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S9_D2_F53_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S9.S9_D3_F54_C3',
        headingColor: '#005F20',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S9_D3_F54_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S9.S9_D4_F55_C2',
        headingColor: '#8200C3',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/ancient-alexandria_S9_D4_F55_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S9.S9_D5_F56_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S9_D5_F56_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S9.S9_D6_F57_C3',
        headingColor: '#005F20',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3long.webp',
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
        audioUrl: '/assets/audio/ancient-alexandria_S9_D6_F57_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S9.S9_D7_F58_C2',
        headingColor: '#8200C3',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/ancient-alexandria_S9_D7_F58_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S9.S9_D8_F59_C2',
        headingColor: '#8200C3',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/ancient-alexandria_S9_D8_F59_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1,
      pan: 1240,
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
        isPrimaryHeading: true,
        heading: 'scenes.S10.S10_D0_F76_C9.title',
        headingColor: '#333',
        interactions: [
          {
            name: 'triangle-construction',
            config: 'triangle-construction',
          },
        ],
        about: [
          {
            heading: 'scenes.S10.S10_D0_F76_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F76_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F76_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F76_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S10.S10_D1_F55_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S10_D1_F55_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S10.S10_D2_F56_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S10_D2_F56_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S10.S10_D3_F57_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/ancient-alexandria_S10_D3_F57_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S10.S10_D4_F58_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S10_D4_F58_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S10.S10_D5_F59_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S10_D5_F59_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S10.S10_D6_F60_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S10_D6_F60_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S10.S10_D7_F61_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S10_D7_F61_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S10.S10_D8_F62_C2',
        headingColor: '#8200C3',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S10_D8_F62_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S10.S10_D9_F63_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.radius.word',
            definitionAsHtml: 'scenes.glossary.radius.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S10_D9_F63_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-construction',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
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
      pan: 1010,
      zoom: 1.24,
      blur: 5,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.hypatia',
        headingColor: '#8200C3',
        bodyAsHtml: 'scenes.S11.S11_D1_F66_C2',
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
        audioUrl: '/assets/audio/ancient-alexandria_S11_D1_F66_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.constructions.word',
            definitionAsHtml: 'scenes.glossary.constructions.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S11.S11_D2_F67_C1',
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
        audioUrl: '/assets/audio/ancient-alexandria_S11_D2_F67_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.theon',
        headingColor: '#005F20',
        bodyAsHtml: 'scenes.S11.S11_D3_F68_C3',
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
        audioUrl: '/assets/audio/ancient-alexandria_S11_D3_F68_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S11.S11_D4_F69_C1',
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
        audioUrl: '/assets/audio/ancient-alexandria_S11_D4_F69_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.hypatia',
        headingColor: '#8200C3',
        bodyAsHtml: 'scenes.S11.S11_D5_F70_C2',
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
        glossary: [
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
        ],
        audioUrl: '/assets/audio/ancient-alexandria_S11_D5_F70_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S11.S11_D6_F71_C1',
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
        audioUrl: '/assets/audio/ancient-alexandria_S11_D6_F71_C1_en.mp3',
      },
    ],
  },

  // End Screen (unchanged)
  {
    name: 'scenesList.scene_12',
    background: {
      url: '/assets/backgrounds/bg5.webp',
      alt: 'scenes.common.bg5_description',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.24,
      pan: 1010,
      zoom: 1.24,
      blur: 5,
    },
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: '',
        headingColor: '',
        disableAnimation: true,
        glossary: [
          {
            word: 'scenes.glossary.construction.word',
            definitionAsHtml: 'scenes.glossary.construction.definition',
          },
          {
            word: 'scenes.glossary.mathematical_truth.word',
            definitionAsHtml: 'scenes.glossary.mathematical_truth.definition',
          },
        ],
      },
    ],
  },
];
