import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
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
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.marcus_description',
          size: 'chat-bubble-square',
          background: '#C0DEFF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        background: {
          blur: 6,
          zoom: 1,
          pan: 1230,
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
      initialZoom: 1,
      pan: 1235,
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
        background: {
          blur: 6,
          zoom: 1,
          pan: 1235,
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/wind-wise_S2_D1_F3_C0_en.mp3',
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
      zoom: 1,
      pan: 1235,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S3.S3_D1_F4_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.carmen_description',
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
        audioUrl: '/assets/audio/wind-wise_S3_D1_F4_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S3.S3_D2_F5_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S3_D2_F5_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S3_D3_F6_C1_en.mp3',
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
      zoom: 1,
      pan: 1235,
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
        heading: 'scenes.S4.S4_D0_F7_C9.title',
        interactions: [
          {
            name: 'wind-power-data-explorer',
            config: 'wind-power-data-plot',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S4.S4_D1_F7_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S4_D1_F7_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S4.S4_D2_F8_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S4_D2_F8_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S4.S4_D3_F9_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S4_D3_F9_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S4.S4_D4_F10_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S4_D4_F10_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S4.S5_D1_F11_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S5_D1_F11_C1_en.mp3',
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
      blur: 6,
      zoom: 1,
      pan: 1235,
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
        isPrimaryHeading: true,
        heading: 'scenes.S6.S6_D0_F12_C9.title',
        interactions: [
          {
            name: 'wind-power-data-explorer',
            config: 'linear-model-fitting',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        about: [
          {
            heading: 'scenes.S6.S6_D0_F12_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F12_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F12_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F12_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S6.S6_D1_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S6_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S6.S6_D2_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S6_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S6.S6_D3_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S6_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S6.S6_D4_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
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
            name: 'interactive-radio',
            config: 'calculate-c-coefficient',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S6_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S6.S6_D5_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S6_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S6.S6_D5U_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
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
            name: 'interactive-radio',
            config: 'calculate-d-coefficient',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S6_D5U_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S6.S6_D6_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'wind-power-data-explorer',
              disabled: 'interactive-1-disabled',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S6_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S6.S6_D7_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S6_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S6.S6_D8_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S6_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S6.S6_D9_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S6_D9_FX_C2_en.mp3',
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
      blur: 6,
      zoom: 1,
      pan: 1235,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S7.S7_D1_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S7_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S7.S7_D2_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S7_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S7.S7_D3_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.quadratic_term.word',
            definitionAsHtml: 'scenes.glossary.quadratic_term.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S7_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S7.S7_D4_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S7_D4_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 17
  {
    name: 'scenesList.scene_17',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1235,
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
        isPrimaryHeading: true,
        heading: 'scenes.S17.S17_D0_FX_C9.title',
        interactions: [
          {
            name: 'interactive2a',
            config: 'interactive2a',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        // about: [
        //   {
        //     heading: 'scenes.S17.S17_D0_FX_C9.about.heading',
        //     bodyAsHtml: 'scenes.S17.S17_D0_FX_C9.about.body',
        //     accentColor: '#006BE0',
        //   },
        // ],
        // help: [
        //   {
        //     heading: 'scenes.S17.S17_D0_FX_C9.help.heading',
        //     bodyAsHtml: 'scenes.S17.S17_D0_FX_C9.help.body',
        //     accentColor: '#A22DDC',
        //   },
        // ],
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S17.S17_D1_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive2a',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S17_D1_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D2_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S17.S17_D3_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D4_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S17.S17_D5_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D5_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D6_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive2a',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S17_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D7_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive2a',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S17_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S17.S17_D8_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'interactive2a',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S17_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D9_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive2a',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S17_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S17.S17_D10_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D10_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D11_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S17.S17_D12_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D12_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D13_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D13_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S17.S17_D14_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D14_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S17.S17_D15_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S17_D15_FX_C1_en.mp3',
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
      blur: 6,
      zoom: 1,
      pan: 1235,
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
        isPrimaryHeading: true,
        heading: 'scenes.S8.S8_D0_F29_C9.title',
        interactions: [
          {
            name: 'wind-power-data-explorer',
            config: 'quadratic-model-fitting',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        about: [
          {
            heading: 'scenes.S8.S8_D0_F29_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F29_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F29_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F29_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S8.S8_D1_F29_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S8_D1_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S8.S8_D2_F30_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
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
            name: 'interactive-radio',
            config: 'calculate-b-coefficient',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.quadratic_term.word',
            definitionAsHtml: 'scenes.glossary.quadratic_term.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S8_D2_F30_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S8.S8_D3_F31_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'wind-power-data-explorer',
              disabled: 'interactive-2-disabled',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S8_D3_F31_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S8.S8_D4_F32_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S8_D4_F32_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S8.S8_D5_F33_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S8_D5_F33_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S8.S8_D6_F34_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S8_D6_F34_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S8.S8_D7_F35_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S8_D7_F35_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S8.S8_D8_F36_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S8_D8_F36_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S8.S8_D9_F37_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cubic_term.word',
            definitionAsHtml: 'scenes.glossary.cubic_term.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S8_D9_F37_C1_en.mp3',
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
      blur: 6,
      zoom: 1,
      pan: 1235,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S9.S9_D1_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.swept_area.word',
            definitionAsHtml: 'scenes.glossary.swept_area.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D1_FX_C1_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S9.S9_D2_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D2_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S9.S9_D3_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D3_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S9.S9_D4_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.cubic_term.word',
            definitionAsHtml: 'scenes.glossary.cubic_term.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D4_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S9.S9_D5_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D5_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S9.S9_D6_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.cubic_term.word',
            definitionAsHtml: 'scenes.glossary.cubic_term.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D6_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S9.S9_D7_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D7_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S9.S9_D8_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.cubic_term.word',
            definitionAsHtml: 'scenes.glossary.cubic_term.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S9_D8_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1235,
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
        isPrimaryHeading: true,
        heading: 'scenes.S10.S10_D0_F43_C9.title',
        interactions: [
          {
            name: 'wind-power-data-explorer',
            config: 'cubic-model-fitting',
          },
        ],
        headingColor: '#333',
        about: [
          {
            heading: 'scenes.S10.S10_D0_F43_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F43_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F43_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F43_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S10.S10_D1_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S10_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S10.S10_D2_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S10_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S10.S10_D3_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
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
            name: 'interactive-radio',
            config: 'wind-speed-double-question',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S10_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S10.S10_D4_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S10_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S10.S10_D5_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
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
            name: 'interactive-radio',
            config: 'cubic-model-prediction-question',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S10_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S10.S10_D6_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S10_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S10.S10_D7_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S10_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S10.S10_D8_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S10_D8_FX_C1_en.mp3',
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
      blur: 6,
      zoom: 1,
      pan: 1075,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S11.S11_D1_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S11.S11_D2_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S11.S11_D3_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S11.S11_D4_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S11.S11_D5_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D5_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S11.S11_D6_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D6_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S11.S11_D7_FX_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        glossary: [
          {
            word: 'scenes.glossary.power_curve.word',
            definitionAsHtml: 'scenes.glossary.power_curve.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D7_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S11.S11_D8_FX_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        glossary: [
          {
            word: 'scenes.glossary.power_curve.word',
            definitionAsHtml: 'scenes.glossary.power_curve.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S11_D8_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 12
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1235,
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
        isPrimaryHeading: true,
        heading: 'scenes.S12.S12_D0_F58_C9.title',
        interactions: [
          {
            name: 'region-definition',
            config: 'region-definition',
          },
        ],
        headingColor: '#333',
        about: [
          {
            heading: 'scenes.S12.S12_D0_F58_C9.about.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F58_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S12.S12_D0_F58_C9.help.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_F58_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D1_F58_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D1_F58_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S12.S12_D2_F59_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D2_F59_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D3_F60_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S12_D3_F60_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S12.S12_D4_F61_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D4_F61_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D5_F62_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D5_F62_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D6_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
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
            config: 'lower-cut-in-speed-question',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S12_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S12.S12_D7_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D8_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.rated_speed.word',
            definitionAsHtml: 'scenes.glossary.rated_speed.definition',
          },
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S12_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D9_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
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
            config: 'flat-rated-speed-question',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S12_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S12.S12_D10_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D10_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D11_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.rated_speed.word',
            definitionAsHtml: 'scenes.glossary.rated_speed.definition',
          },
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S12_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D12_F63_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D12_F63_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S12.S12_D13_F64_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S12_D13_F64_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D14_F65_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
          {
            word: 'scenes.glossary.rated_speed.word',
            definitionAsHtml: 'scenes.glossary.rated_speed.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S12_D14_F65_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S12.S12_D15_F66_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D15_F66_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S12.S12_D16_F67_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S12_D16_F67_C1_en.mp3',
      },
    ],
  },

  // Scene 13
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1075,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S13.S13_D1_F68_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S13_D1_F68_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S13.S13_D2_F69_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        glossary: [
          {
            word: 'scenes.glossary.rated_speed.word',
            definitionAsHtml: 'scenes.glossary.rated_speed.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S13_D2_F69_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S13.S13_D3_F70_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S13_D3_F70_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S13.S13_D4_F71_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S13_D4_F71_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S13.S13_D5_F72_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
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
        width: '56.5vw',
        audioUrl: '/assets/audio/wind-wise_S13_D5_F72_C1_en.mp3',
      },
    ],
  },

  // Scene 14
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1235,
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
        isPrimaryHeading: true,
        heading: 'scenes.S14.S14_D0_F73_C9.title',
        interactions: [
          {
            name: 'polynomial-model-explorer',
            config: 'polynomial-model',
          },
        ],
        headingColor: '#333',
        about: [
          {
            heading: 'scenes.S14.S14_D0_F73_C9.about.heading',
            bodyAsHtml: 'scenes.S14.S14_D0_F73_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S14.S14_D0_F73_C9.help.heading',
            bodyAsHtml: 'scenes.S14.S14_D0_F73_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D1_F73_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D1_F73_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S14.S14_D2_F74_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D2_F74_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D3_F75_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D3_F75_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S14.S14_D4_F76_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D4_F76_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D5_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
          {
            word: 'scenes.glossary.rated_speed.word',
            definitionAsHtml: 'scenes.glossary.rated_speed.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D6_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
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
            name: 'interactive-radio',
            config: 'power-model-question1',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S14.S14_D7_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D8_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cubic_term.word',
            definitionAsHtml: 'scenes.glossary.cubic_term.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S14.S14_D9_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D9_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D10_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.quadratic_term.word',
            definitionAsHtml: 'scenes.glossary.quadratic_term.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D10_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D11_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
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
            name: 'interactive-radio',
            config: 'power-model-question2',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S14.S14_D12_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.quadratic_term.word',
            definitionAsHtml: 'scenes.glossary.quadratic_term.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D12_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D13_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.linear_term.word',
            definitionAsHtml: 'scenes.glossary.linear_term.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D13_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S14.S14_D14_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D14_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D15_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
          {
            word: 'scenes.glossary.rated_speed.word',
            definitionAsHtml: 'scenes.glossary.rated_speed.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S14_D15_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        body: 'scenes.S14.S14_D16_FX_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D16_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.carmen',
        body: 'scenes.S14.S14_D17_FX_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/wind-wise_S14_D17_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 15
  {
    name: 'scenesList.scene_15',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      pan: 1235,
      zoom: 1,
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S15.S15_D1_F92_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/wind-wise_S15_D1_F92_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S15.S15_D2_F93_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/wind-wise_S15_D2_F93_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S15.S15_D3_F94_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.cubic_term.word',
            definitionAsHtml: 'scenes.glossary.cubic_term.definition',
          },
          {
            word: 'scenes.glossary.linear_term.word',
            definitionAsHtml: 'scenes.glossary.linear_term.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S15_D3_F94_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S15.S15_D4_F95_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/wind-wise_S15_D4_F95_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.marcus',
        bodyAsHtml: 'scenes.S15.S15_D5_F96_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.cut_in_speed.word',
            definitionAsHtml: 'scenes.glossary.cut_in_speed.definition',
          },
          {
            word: 'scenes.glossary.rated_speed.word',
            definitionAsHtml: 'scenes.glossary.rated_speed.definition',
          },
          {
            word: 'scenes.glossary.operating_zone.word',
            definitionAsHtml: 'scenes.glossary.operating_zone.definition',
          },
        ],
        audioUrl: '/assets/audio/wind-wise_S15_D5_F96_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.carmen',
        bodyAsHtml: 'scenes.S15.S15_D6_F97_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/wind-wise_S15_D6_F97_C1_en.mp3',
      },
    ],
  },

  // Scene 16
  {
    name: 'scenesList.scene_16',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      pan: 1235,
      zoom: 1,
      blur: 6,
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
