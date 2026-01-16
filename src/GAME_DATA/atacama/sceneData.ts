import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1
  {
    name: 'scenesList.scene_1',
    background: {
      url: '/assets/backgrounds/bg1.webp',
      alt: 'scenes.common.bg1_description',
      waitDelay: SCENE_CHANGE_DELAY,
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
          alt: 'scenes.common.alex_description',
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
          blur: 5,
          zoom: 1.1,
          pan: 805,
        },
      },
    ],
  },

  // Scene 2
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 800,
      blur: 4,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.S2.S2_D1_F3_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 5,
          zoom: 1.1,
          pan: 800,
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/atacama_S2_D1_F3_C0_en.mp3',
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
      initialZoom: 1,
      pan: 800,
      blur: 4,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S3.S3_D1_F4_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
        },
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: 'scenes.common.vega_description',
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
        audioUrl: '/assets/audio/atacama_S3_D1_F4_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S3.S3_D2_F5_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D2_F5_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D3_F6_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S3.S3_D4_F7_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D4_F7_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S3.S3_D5_F8_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D5_F8_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S3.S3_D6_F9_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D6_F9_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S3.S3_D7_F10_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
        },
        glossary: [
          {
            word: 'scenes.glossary.sine.word',
            definitionAsHtml: 'scenes.glossary.sine.definition',
          },
          {
            word: 'scenes.glossary.cosine.word',
            definitionAsHtml: 'scenes.glossary.cosine.definition',
          },
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
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
        audioUrl: '/assets/audio/atacama_S3_D7_F10_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S3.S3_D8_F11_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D8_F11_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S3.S3_D9_F12_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D9_F12_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S3.S3_D10_F13_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D10_F13_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S3.S3_D11_F14_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S3_D11_F14_C1_en.mp3',
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
      zoom: 1.08,
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
        isPrimaryHeading: true,
        heading: 'scenes.S4.S4_D0_F15_C9.title',
        interactions: [
          {
            name: 'right-angle-triangle-explorer',
            config: 'right-angle-triangle-explorer',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 7,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S4.S4_D0_F15_C9.about.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F15_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S4.S4_D0_F15_C9.help.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F15_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D1_F15_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S4_D1_F15_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S4.S4_D2_F16_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S4_D2_F16_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D3_F17_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S4_D3_F17_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D4_F18_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S4_D4_F18_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D5_F19_C1',
        headingColor: '#A22DDC',
        events: [
          {
            payload: {
              target: 'right-angle-triangle-explorer',
              step: 1,
              disabled: 'right-angle-45-completed',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S4_D5_F19_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D6_F20_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'right-angle-triangle-explorer',
              step: 1,
              disabled: 'right-angle-60-completed',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/atacama_S4_D6_F20_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D7_F21_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'fill-in-blank-question',
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
        audioUrl: '/assets/audio/atacama_S4_D7_F21_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S4.S4_D8_F22_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S4_D8_F22_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D9_F23_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S4_D9_F23_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S4.S4_D10_F24_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S4_D10_F24_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S4.S4_D11_F25_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S4_D11_F25_C1_en.mp3',
      },
    ],
  },

  // Pre scene 5
  {
    name: 'scenesList.scene_5I',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.08,
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
        isPrimaryHeading: true,
        heading: 'scenes.S5.S5_D0_F26_C9.title',
        interactions: [
          {
            name: 'stellar-parallax',
            config: 'pre-stellar-parallax',
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 7,
          pan: 0,
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax.word',
            definitionAsHtml: 'scenes.glossary.parallax.definition',
          },
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_F26_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F26_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_F26_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F26_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D1_F26_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S5_D1_F26_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D2_F27_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S5_D2_F27_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S5.S5_D3_F28_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S5_D3_F28_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D4_F29_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S5_D4_F29_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S5.S5_D5_F30_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S5_D5_F30_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D6_F31_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S5_D6_F31_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S5.S5_D7_F32_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S5_D7_F32_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D8_F33_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax.word',
            definitionAsHtml: 'scenes.glossary.parallax.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D8_F33_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D9_F34_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax.word',
            definitionAsHtml: 'scenes.glossary.parallax.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D9_F34_C3_en.mp3',
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
      zoom: 1.08,
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
        isPrimaryHeading: true,
        heading: 'scenes.S5.S5_D0_F26_C9.title',
        interactions: [
          {
            name: 'stellar-parallax',
            config: 'stellar-parallax',
            enableStateExchange: true,
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 7,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S5.S5_D0_F26_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F26_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_F26_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F26_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.parallax.word',
            definitionAsHtml: 'scenes.glossary.parallax.definition',
          },
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D10_F35_C3',
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
              target: 'stellar-parallax-math',
              step: 1,
              disabled: 'stellar-parallax-motion-started',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D10_F35_C3_en.mp3',
      },
      {
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D11_F36_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D11_F36_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D12_F37_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D12_F37_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D13_F38_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.arcsecond.word',
            definitionAsHtml: 'scenes.glossary.arcsecond.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D13_F38_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D14_F39_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        interactions: [
          {
            name: 'interactive-two-fill-in-blanks',
            config: 'space-distance-unit-question',
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
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D14_F39_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D15_F40_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D15_F40_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S5.S5_D16_F41_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D16_F41_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D17_F42_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D17_F42_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S5.S5_D18_F43_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D18_F43_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S5.S5_D19_F44_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D19_F44_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D20_F45_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.arcsecond.word',
            definitionAsHtml: 'scenes.glossary.arcsecond.definition',
          },
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D20_F45_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S5.S5_D21_F46_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S5_D21_F46_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D22_F47_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.au.word',
            definitionAsHtml: 'scenes.glossary.au.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D22_F47_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D23_F48_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.arcsecond.word',
            definitionAsHtml: 'scenes.glossary.arcsecond.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S5_D23_F48_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S5.S5_D24_F49_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S5_D24_F49_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S5.S5_D24_F49_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.arcsecond.word',
            definitionAsHtml: 'scenes.glossary.arcsecond.definition',
          },
        ],
        //update audio here
        audioUrl: '/assets/audio/atacama_S5_D24_F49_C1_en.mp3',
      },
    ],
  },

  // Combined Scene 6 with event bus for updating equations (including back navigation)
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.08,
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
        isPrimaryHeading: true,
        heading: 'scenes.S6.S6_D0_F50_C9.title',
        interactions: [
          {
            name: 'stellar-parallax-equation',
            config: 'stellar-parallax-equation-1',
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax.word',
            definitionAsHtml: 'scenes.glossary.parallax.definition',
          },
          {
            word: 'scenes.glossary.parsec.word',
            definitionAsHtml: 'scenes.glossary.parsec.definition',
          },
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.arcsecond.word',
            definitionAsHtml: 'scenes.glossary.arcsecond.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S6.S6_D1_F50_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S6_D1_F50_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'updateEquationConfig',
              configName: 'stellar-parallax-equation-2',
            },
            triggers: ['on-next'],
          },
          {
            payload: {
              target: 'updateEquationConfig',
              configName: 'stellar-parallax-equation-1',
            },
            triggers: ['on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S6.S6_D2_F51_C1',
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
            config: 'tan-p-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S6_D2_F51_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'updateEquationConfig',
              configName: 'stellar-parallax-equation',
            },
            triggers: ['on-next'],
          },
          {
            payload: {
              target: 'updateEquationConfig',
              configName: 'stellar-parallax-equation-2',
            },
            triggers: ['on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S6.S6_D3_F52_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S6_D3_F52_C1_en.mp3',
        // Event to go back to the full equation when moving backward
        events: [
          {
            payload: {
              target: 'updateEquationConfig',
              configName: 'stellar-parallax-equation',
            },
            triggers: ['on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S6.S6_D4_F53_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S6_D4_F53_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S6.S6_D5_F54_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax.word',
            definitionAsHtml: 'scenes.glossary.parallax.definition',
          },
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S6_D5_F54_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S6.S6_D6_F55_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.black_hole.word',
            definitionAsHtml: 'scenes.glossary.black_hole.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S6_D6_F55_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S6.S6_D7_F56_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S6_D7_F56_C1_en.mp3',
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
      blur: 5,
      zoom: 1.08,
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
        isPrimaryHeading: true,
        heading: 'scenes.S7.S7_D0_F57_C9.title',
        interactions: [
          {
            name: 'stellar-parallax-math',
            config: 'stellar-parallax-math',
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 7,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S7.S7_D0_F57_C9.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F57_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_F57_C9.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F57_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.black_hole.word',
            definitionAsHtml: 'scenes.glossary.black_hole.definition',
          },
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S7.S7_D1_F57_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.black_hole.word',
            definitionAsHtml: 'scenes.glossary.black_hole.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D1_F57_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S7.S7_D2_F58_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.black_hole.word',
            definitionAsHtml: 'scenes.glossary.black_hole.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D2_F58_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S7.S7_D3_F59_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary:[
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D3_F59_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S7.S7_D4_F60_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D4_F60_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S7.S7_D5_F61_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D5_F61_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S7.S7_D6_F62_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'stellar-parallax-math-distance-question',
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
            word: 'scenes.glossary.black_hole.word',
            definitionAsHtml: 'scenes.glossary.black_hole.definition',
          },
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
          {
            word: 'scenes.glossary.arcseconds.word',
            definitionAsHtml: 'scenes.glossary.arcseconds.definition',
          },
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D6_F62_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S7.S7_D7_F63_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.black_hole.word',
            definitionAsHtml: 'scenes.glossary.black_hole.definition',
          },
          {
            word: 'scenes.glossary.parsecs.word',
            definitionAsHtml: 'scenes.glossary.parsecs.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D7_F63_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S7.S7_D8_F64_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax_angle.word',
            definitionAsHtml: 'scenes.glossary.parallax_angle.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S7_D8_F64_C1_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      blur: 5,
      zoom: 1.08,
      pan: 800,
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S8.S8_D1_F65_C2',
        headingColor: '#EB0000',
        position: {
          top: '50.7%',
          left: '38%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        audioUrl: '/assets/audio/atacama_S8_D1_F65_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S8.S8_D2_F66_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '64.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
        width: '54.5vw',
        audioUrl: '/assets/audio/atacama_S8_D2_F66_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S8.S8_D3_F67_C1',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '64.5%',
        },
        background: {
          blur: 4,
          zoom: 1.1,
          pan: 800,
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
            word: 'scenes.glossary.tangent.word',
            definitionAsHtml: 'scenes.glossary.tangent.definition',
          },
        ],
        width: '54.5vw',
        audioUrl: '/assets/audio/atacama_S8_D3_F67_C1_en.mp3',
      },
    ],
  },

  // Scene 9 with event bus for updating antenna triangulation
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      zoom: 1.08,
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
        isPrimaryHeading: true,
        heading: 'scenes.S9.S9_D0_F68_C9.title',
        interactions: [
          {
            name: 'antenna-triangulation',
            config: 'pre-antenna-triangulation',
          },
        ],
        headingColor: '#333',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 7,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S9.S9_D0_F68_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F68_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F68_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F68_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.arturo',
        body: 'scenes.S9.S9_D1_F68_C3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S9_D1_F68_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S9.S9_D2_F69_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S9_D2_F69_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D3_F70_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S9_D3_F70_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D4_F71_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sines.word',
            definitionAsHtml: 'scenes.glossary.sines.definition',
          },
        ],
        audioUrl: '/assets/audio/atacama_S9_D4_F71_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'updateAntennaConfig',
              configName: 'antenna-triangulation',
            },
            triggers: ['on-next'],
          },
          // Back event to ensure pre-triangulation is shown when navigating backward
          {
            payload: {
              target: 'updateAntennaConfig',
              configName: 'pre-antenna-triangulation',
            },
            triggers: ['on-back'],
          },
        ],
      },
      // Remaining dialogs from original Scene 9
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S9.S9_D5_F72_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S9_D5_F72_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'updateAntennaConfig',
              configName: 'antenna-triangulation',
            },
            triggers: ['on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D6_F73_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S9_D6_F73_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D7_F74_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S9_D7_F74_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S9.S9_D8_F75_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S9_D8_F75_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D9_F76_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S9_D9_F76_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D10_F77_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S9_D10_F77_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S9.S9_D11_F78_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S9_D11_F78_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D12_F79_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.cosines.word',
            definitionAsHtml: 'scenes.glossary.cosines.definition',
          },
          {
            word: 'scenes.glossary.sines.word',
            definitionAsHtml: 'scenes.glossary.sines.definition',
          }
        ],
        audioUrl: '/assets/audio/atacama_S9_D12_F79_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S9.S9_D13_F80_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sines.word',
            definitionAsHtml: 'scenes.glossary.sines.definition',
          }
        ],
        audioUrl: '/assets/audio/atacama_S9_D13_F80_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D14_F81_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sines.word',
            definitionAsHtml: 'scenes.glossary.sines.definition',
          }
        ],
        interactions: [
          {
            name: 'interactive-two-inputbox',
            config: 'calculate-source-antenna-distance',
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
        audioUrl: '/assets/audio/atacama_S9_D14_F81_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S9.S9_D15_F82_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S9_D15_F82_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.vega',
        body: 'scenes.S9.S9_D16_F83_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/atacama_S9_D16_F83_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.S9.S9_D17_F84_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/atacama_S9_D17_F84_C2_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      blur: 5,
      zoom: 1.08,
      pan: 800,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S10.S10_D1_F85_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/atacama_S10_D1_F85_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S10.S10_D2_F86_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/atacama_S10_D2_F86_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S10.S10_D3_F87_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/atacama_S10_D3_F87_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S10.S10_D4_F88_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/atacama_S10_D4_F88_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        bodyAsHtml: 'scenes.S10.S10_D5_F89_C2',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/atacama_S10_D5_F89_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.vega',
        bodyAsHtml: 'scenes.S10.S10_D6_F90_C1',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/atacama_S10_D6_F90_C1_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      url: '/assets/backgrounds/bg5.webp',
      alt: 'scenes.common.bg5_description',
      waitDelay: SCENE_CHANGE_DELAY,
      zoom: 1.105,
      pan: 796,
      blur: 10,
    },
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: 'scenes.S11.S11_D1_FX_C9',
        body: 'scenes.S11.S11_D2_FX_C9',
        headingColor: '#333333',
        disableAnimation: true,
        position: { left: '50%', top: '50%' },
        width: '80vw',
        avatar: {
          src: '/assets/icons/solarSystem.svg',
          alt: 'solar system',
          size: 'chat-bubble-square',
          background: '#fff',
        },
        glossary: [
          {
            word: 'scenes.glossary.parallax.word',
            definitionAsHtml: 'scenes.glossary.parallax.definition',
          },
        ],
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
        background: {
          blur: 5,
          zoom: 1.1,
          pan: 805,
        },
      },
    ],
  },
];
