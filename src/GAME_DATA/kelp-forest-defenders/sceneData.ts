import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';
export const sceneData: SceneData[] = [
  //Scene 1 [Start Scene]
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
          src: '/assets/characters/antonio.webp',
          alt: 'scenes.common.antonio_description',
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
          blur: 6,
          zoom: 1.1,
          pan: 1230,
        },
      },
    ],
  },

  // Scene 2
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.0,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C2',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 0,
          zoom: 1.1,
          pan: 980,
        },
        glossary: [
          {
            word: 'scenes.glossary.sea_star_wasting_syndrome.word',
            definitionAsHtml: 'scenes.glossary.sea_star_wasting_syndrome.definition',
          },
        ],
        width: '81.5vw',
        audioUrl: '/assets/audio/kelp-forest-defenders_S2_D1_F3_C2_en.mp3',
      },
    ],
  },

  // Scene 3 (Intro to kelp forest)
  {
    name: 'scenesList.scene_3I',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'split-screen-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.S4.S4_D1_F1_C0.mainTitle',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'ocean-life-explorer',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D2_F2_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D2_F2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D4_F4_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D4_F4_C2_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: 'scenes.S4.S4_D1_F1_C0.mainTitle2',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'ocean-life-explorer',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D5_F5_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D5_F5_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D7_F7_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D7_F7_C2_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: 'scenes.S4.S4_D1_F1_C0.mainTitle3',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'ocean-life-explorer',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D8_F8_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 5,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D8_F8_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D2_F10_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 6,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D2_F10_C2_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: 'scenes.S4.S4_D1_F1_C0.mainTitle4',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'ocean-life-explorer',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D11_F12_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 7,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.sea_star_wasting_syndrome.word',
            definitionAsHtml: 'scenes.glossary.sea_star_wasting_syndrome.definition',
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D11_F12_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S4.S4_D12_F13_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 8,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S4_D12_F13_C2_en.mp3',
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1230,
      blur: 6,
      zoom: 0.9,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.lauren',
        bodyAsHtml: 'scenes.S5.S5_D0_F3_C2',
        headingColor: '#AF52DE',
        position: {
          top: '49.5%',
          left: '35.5%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.lauren_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '57vw',
        audioUrl: '/assets/audio/kelp-forest-defenders_S5_D0_F3_C2_en.mp3',
      },
      {
        disableAnimation: true,
        heading: 'scenes.common.antonio',
        bodyAsHtml: 'scenes.S5.S5_D1_F4_C1',
        headingColor: '#006BE0',
        position: {
          top: '49.5%',
          left: '63%',
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
        width: '56vw',
        audioUrl: '/assets/audio/kelp-forest-defenders_S5_D1_F4_C1_en.mp3',
      },
      {
        heading: 'scenes.common.lauren',
        bodyAsHtml: 'scenes.S5.S5_D2_F5_C2',
        headingColor: '#AF52DE',
        position: {
          top: '49.5%',
          left: '35.5%',
        },
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: 'scenes.common.lauren_description',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '57vw',
        audioUrl: '/assets/audio/kelp-forest-defenders_S5_D2_F5_C2_en.mp3',
      },
      // {
      //   heading: 'scenes.common.antonio',
      //   bodyAsHtml: 'scenes.S5.S5_D4_F7_C1',
      //   headingColor: '#006BE0',
      //   position: {
      //     top: '49.5%',
      //     left: '62.7%',
      //   },
      //   avatar: {
      //     src: '/assets/characters/char1long.webp',
      //     alt: '',
      //     size: 'large',
      //     position: 'left',
      //     animation: {
      //       duration: 300,
      //       delay: 0,
      //       entry: 'fadeIn',
      //       exit: 'fadeOutLeft',
      //     },
      //   },
      //   width: '55.5vw',
      //   audioUrl: '/assets/audio/kelp-forest-defenders_S5_D4_F7_C1_en.mp3',
      // },
      // {
      //   heading: 'scenes.common.lauren',
      //   bodyAsHtml: 'scenes.S5.S5_D5_F8_C2',
      //   headingColor: '#AF52DE',
      //   position: {
      //     top: '49.5%',
      //     left: '36%',
      //   },
      //   avatar: {
      //     src: '/assets/characters/char2long.webp',
      //     alt: '',
      //     size: 'large',
      //     position: 'right',
      //     animation: {
      //       duration: 300,
      //       delay: 0,
      //       entry: 'fadeIn',
      //       exit: 'fadeOutRight',
      //     },
      //   },
      //   width: '56vw',
      //   audioUrl: '/assets/audio/kelp-forest-defenders_S5_D5_F8_C2_en.mp3',
      // },
      // {
      //   heading: 'scenes.common.antonio',
      //   bodyAsHtml: 'scenes.S5.S5_D6_F9_C1',
      //   headingColor: '#006BE0',
      //   position: {
      //     top: '49.5%',
      //     left: '63%',
      //   },
      //   avatar: {
      //     src: '/assets/characters/char1long.webp',
      //     alt: '',
      //     size: 'large',
      //     position: 'left',
      //     animation: {
      //       duration: 300,
      //       delay: 0,
      //       entry: 'fadeIn',
      //       exit: 'fadeOutLeft',
      //     },
      //   },
      //   width: '56vw',
      //   audioUrl: '/assets/audio/kelp-forest-defenders_S5_D6_F9_C1_en.mp3',
      // },
      // {
      //   heading: 'scenes.common.lauren',
      //   bodyAsHtml: 'scenes.S5.S5_D3_F6_C2',
      //   headingColor: '#AF52DE',
      //   position: {
      //     top: '49.5%',
      //     left: '35.5%',
      //   },
      //   avatar: {
      //     src: '/assets/characters/char2long.webp',
      //     alt: 'scenes.common.lauren_description',
      //     size: 'large',
      //     position: 'right',
      //     animation: {
      //       duration: 300,
      //       delay: 0,
      //       entry: 'fadeIn',
      //       exit: 'fadeOutRight',
      //     },
      //   },
      //   width: '57vw',
      //   audioUrl: '/assets/audio/kelp-forest-defenders_S5_D3_F6_C2_en.mp3',
      // },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1230,
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
        heading: 'scenes.S6.S6_D0_F9_C9.header.title',
        interactions: [
          {
            name: 'kelp-forest-explorer-interactive-chart',
            config: 'kelp-forest-explorer-interactive',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S6.S6_D0_F9_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F9_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S6.S6_D0_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D0_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_DX_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_DX_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S6.S6_DX_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_DX_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_DY_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_DY_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S6.S6_D4_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_D5_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D5_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_D1_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D1_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S6.S6_D2_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_D3_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_D6_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S6.S6_D7_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_D8_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S6.S6_D9_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S6.S6_D10_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S6_D10_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1230,
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
        heading: 'scenes.S8.S8_D0_F13_C9.header.title',
        interactions: [
          {
            name: 'sea-urchin-explorer-interactive-chart',
            config: 'sea-urchin-explorer-interactive',
          },
        ],
        headingColor: '#000',
        about: [
          {
            heading: 'scenes.S8.S8_D0_F13_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F13_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S8.S8_D1_F13_C2',
        headingColor: '#A22DDC',
        glossary: [
          {
            word: 'scenes.glossary.overabundance.word',
            definitionAsHtml: 'scenes.glossary.overabundance.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        events: [
          {
            payload: {
              target: 'kelp-forest-explorer-interactive-chart',
              step: 3,
            },
            triggers: ['on-back'],
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S8_D1_F13_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S8.S8_D2_F14_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S8_D2_F14_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S8.S8_D3_F15_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S8_D3_F15_C2_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1230,
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
        heading: 'scenes.S9.S9_D0_F16_C9.header.title',
        interactions: [
          {
            name: 'sea-star-explorer-interactive-chart',
            config: 'sea-star-explorer-interactive',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S9.S9_D0_F16_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F16_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S9.S9_D1_F16_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.sea_star_wasting_syndrome.word',
            definitionAsHtml: 'scenes.glossary.sea_star_wasting_syndrome.definition',
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S9_D1_F16_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S9.S9_D2_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S9_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S9.S9_D3_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S9_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S9.S9_D4_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S9_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S9.S9_D5_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S9_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S9.S9_D6_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S9_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S9.S9_D7_F17_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S9_D7_F17_C1_en.mp3',
      },
    ],
  },

  // Scene 10
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 0.9,
      pan: 2050,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.lauren',
        bodyAsHtml: 'scenes.S10.S10_D1_F19_C2',
        headingColor: '#AF52DE',
        position: {
          top: '49%',
          left: '36%',
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
        width: '56vw',
        audioUrl: '/assets/audio/kelp-forest-defenders_S10_D1_F19_C2_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1230,
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
        heading: 'scenes.S11.S11_D0_F22_C9.header.title',
        interactions: [
          {
            name: 'ocean-life-explorer-chart',
            config: 'ocean-life-explorer',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S11.S11_D0_F22_C9.about.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F22_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_F22_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F22_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S11.S11_D1_F22_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S11_D1_F22_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S11.S11_D2_F23_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S11_D2_F23_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S11.S11_D3_F24_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.regression.word',
            definitionAsHtml: 'scenes.glossary.regression.definition',
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S11_D3_F24_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S11.S11_D4_F25_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S11_D4_F25_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S11.S11_D7_F28_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S11_D7_F28_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S11.S11_D8_F29_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S11_D8_F29_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S11.S11_D10_F31_C2',
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
            config: 'ocean-life-explorer-sea-star-and-kelp-density-question',
          },
        ],
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S11_D10_F31_C2_en.mp3',
      },
    ],
  },

  // Scene 14
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.1,
      pan: 1230,
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
        heading: 'scenes.S14.S14_D0_F50_C9.header.title',
        interactions: [
          {
            name: 'kelp-forest-restoration-planner-chart',
            config: 'kelp-forest-restoration-planner-interactive',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S14.S14_D0_F50_C9.about.heading',
            bodyAsHtml: 'scenes.S14.S14_D0_F50_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S14.S14_D0_F50_C9.help.heading',
            bodyAsHtml: 'scenes.S14.S14_D0_F50_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S14.S14_D1_F50_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D1_F50_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S14.S14_D2_F51_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D2_F51_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S14.S14_D3_F52_C2',
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
            config: 'kelp-forest-restoration-planner-choice-question',
          },
        ],
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D3_F52_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S14.S14_D4_F53_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D4_F53_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S14.S14_D5_F54_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
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
            config: 'kelp-forest-restoration-planner-choice-question1',
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D5_F54_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S14.S14_D6_F55_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D6_F55_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S14.S14_D7_F56_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
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
            config: 'kelp-forest-restoration-planner-choice-question2',
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D7_F56_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.antonio',
        body: 'scenes.S14.S14_D8_F57_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/antonio.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D8_F57_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S14.S14_D8_F57X_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
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
            config: 'kelp-forest-restoration-planner-choice-question3',
          },
        ],
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D8_F57X_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        body: 'scenes.S14.S14_D9_F58_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/lauren.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#D7CCFF',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S14_D9_F58_C2_en.mp3',
      },
    ],
  },

  // Scene 15
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      pan: 1230,
      zoom: 1.1,
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        bodyAsHtml: 'scenes.S15.S15_D1_F59_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        background: {
          pan: 0,
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S15_D1_F59_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.antonio',
        bodyAsHtml: 'scenes.S15.S15_D2_F60_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S15_D2_F60_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        bodyAsHtml: 'scenes.S15.S15_D3_F61_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        background: {
          pan: 0,
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S15_D3_F61_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.antonio',
        bodyAsHtml: 'scenes.S15.S15_D4_F62_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S15_D4_F62_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.lauren',
        bodyAsHtml: 'scenes.S15.S15_D5_F63_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        background: {
          pan: 0,
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S15_D5_F63_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.antonio',
        bodyAsHtml: 'scenes.S15.S15_D6_F64_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/kelp-forest-defenders_S15_D6_F64_C1_en.mp3',
      },
    ],
  },

  // End Scene
  {
    name: 'scenesList.scene_15',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 11,
      zoom: 1.1,
      pan: 1200,
    },
    audioUrl: '/assets/audio/bgmusic.mp3',
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: 'scenes.S16.S16_D1_F67_C9.title',
        body: 'scenes.S16.S16_D1_F67_C9.description',
        headingColor: '#000',
        disableAnimation: true,
        position: { left: '50%', top: '50%' },
        width: '80vw',
        avatar: {
          src: '/assets/icons/plant2.webp',
          alt: 'Plant',
          size: 'chat-bubble-square',
          background: '#6FE9FF',
        },
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
          pan: 1230,
          zoom: 1.1,
          blur: 6,
        },
      },
    ],
  },
];
