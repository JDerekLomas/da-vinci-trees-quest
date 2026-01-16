import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.1,
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
        glossary: [
          {
            word: 'scenes.glossary.quadratic_functions.word',
            definitionAsHtml: 'scenes.glossary.quadratic_functions.definition',
          },
          {
            word: 'scenes.glossary.skylight.word',
            definitionAsHtml: 'scenes.glossary.skylight.definition',
          },
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
          {
            word: 'scenes.glossary.lava_tubes.word',
            definitionAsHtml: 'scenes.glossary.lava_tubes.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.ethan_description',
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
          zoom: 1.11,
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
      initialZoom: 1.11,
      pan: 1235,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S2.S2_D1_FSQ2_C2',
        headingColor: '#333333',
        disableAnimation: true,
        glossary: [
          {
            word: 'scenes.glossary.skylight.word',
            definitionAsHtml: 'scenes.glossary.skylight.definition',
          },
          {
            word: 'scenes.glossary.trajectories.word',
            definitionAsHtml: 'scenes.glossary.trajectories.definition',
          },
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 6,
          zoom: 1.11,
          pan: 1235,
        },
        width: '81.5vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D1_FSQ2_C2_en.mp3',
      },
    ],
  },

  // Scene 2 Extended Narration
  {
    name: 'scenesList.scene_3E',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1235,
      zoom: 1.09,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        side: 'left',
        heading: '',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D2_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D2_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D3_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D3_FSQ2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D3_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D3_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D4_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D4_FSQ2_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: '',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D4_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D4_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D5_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D5_FSQ2_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'interactive-slideshow',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D6_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D6_FSQ2_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: '',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D6_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D6_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D7_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D7_FSQ2_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: '',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D7_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D7_FSQ2_C2_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: '',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D8_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D8_FSQ2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D8_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D8_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D10_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D10_FSQ2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D10_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D10_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D11_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        glossary: [
          {
            word: 'scenes.glossary.skylights.word',
            definitionAsHtml: 'scenes.glossary.skylights.definition',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D11_FSQ2_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: '',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D11_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D11_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D13_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D13_FSQ2_C1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        heading: '',
        interactions: [
          {
            name: 'interactive-slideshow',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D13_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D13_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D14_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D14_FSQ2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D15_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D15_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D16_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D16_FSQ2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D16_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D16_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D15_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D15_FSQ2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D12_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D12_FSQ2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S2.S2_D2_FSQ2_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D2_FSQ2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S2.S2_D9_FSQ2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S2_D9_FSQ2_C2_en.mp3',
      },
    ],
  },

  //  Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      initialZoom: 1.11,
      pan: 1230,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.S5.S5_D0_FSQ4_C9.title',
        interactions: [
          {
            name: 'lunar-probe',
            config: 'lunar-probe-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_FSQ4_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FSQ4_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_FSQ4_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FSQ4_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S5.S5_D1_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D1_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S5.S5_D2_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D2_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S5.S5_D3_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.skylight.word',
            definitionAsHtml: 'scenes.glossary.skylight.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D3_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S5.S5_D4_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D4_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S5.S5_D4_FSQ5_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'lunar-probe',
              disabled: 'lunar-probe-set-45',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D4_FSQ5_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S5.S5_D5_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'target-hit',
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
              target: 'lunar-probe',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D5_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S5.S5_D6_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.skylight.word',
            definitionAsHtml: 'scenes.glossary.skylight.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'lunar-probe',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D6_FSQ4_C2_en.mp3',
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6E',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      pan: 780,
      zoom: 1.1,
      initialZoom: 1.1,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S6.S5_D4_FSQ4_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
        },
        glossary: [
          {
            word: 'scenes.glossary.skylight.word',
            definitionAsHtml: 'scenes.glossary.skylight.definition',
          },
        ],
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
        audioUrl: '/assets/audio/lunar-probe-precision_S5_D4_FSQ4_C2_en.mp3',
      },
      {
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S6.S6_D1_FSQ4_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
        },
        buttonAlignment: 'right',
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
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        width: '56vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S6_D1_FSQ4_C1_en.mp3',
      },
      {
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S6.S6_D2_FSQ4_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
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
        audioUrl: '/assets/audio/lunar-probe-precision_S6_D2_FSQ4_C2_en.mp3',
      },
      {
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S6.S6_D3_FSQ4_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
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
        audioUrl: '/assets/audio/lunar-probe-precision_S6_D3_FSQ4_C1_en.mp3',
      },
      {
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S6.S6_D4_FSQ4_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
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
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        width: '56vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S6_D4_FSQ4_C2_en.mp3',
      },
    ],
  },

  //  Scene 7
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1235,
      zoom: 1.09,
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
        heading: 'scenes.S7.S7_D0_FSQ4_C9.title',
        interactions: [
          {
            name: 'standard-form-formula',
            config: 'standard-form-formula',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S7.S7_D3_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'standard-form-formula',
              disabled: 'standard-formula-a-selected',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S7_D3_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S7.S7_D4_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S7_D4_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S7.S7_D5_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'standard-form-formula',
              disabled: 'standard-formula-b-selected',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S7_D5_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S7.S7_D6_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S7_D6_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S7.S7_D7_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'standard-form-formula',
              disabled: 'standard-formula-c-selected',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S7_D7_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S7.S7_D8_FSQ4_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S7_D8_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S7.S7_D9_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S7_D9_FSQ4_C2_en.mp3',
      },
    ],
  },

  //  Scene 8
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      initialZoom: 1.11,
      pan: 1230,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.S8.S8_D0_FSQ4_C9.title',
        interactions: [
          {
            name: 'quadratic-function-explorer',
            config: 'quadratic-function-explorer-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S8.S8_D0_FSQ4_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FSQ4_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_FSQ4_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FSQ4_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S8.S8_D1_FSQ4_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D1_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S8.S8_D2_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'calculate-c',
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
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D2_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S8.S8_D3_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D3_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S8.S8_D4_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'quadratic-function-explorer',
              disabled: 'quadratic-function-explorer-set-b',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D4_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S8.S8_D5_FSQ4_C1',
        headingColor: '#EB0000',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        events: [
          {
            payload: {
              target: 'quadratic-function-explorer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D5_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S8.S8_D6_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'calculate-a',
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
              target: 'quadratic-function-explorer',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D6_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S8.S8_D7_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'quadratic-function-explorer',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D7_FSQ4_C2_en.mp3',
      },
    ],
  },

  // Scene 8 Extended
  {
    name: 'scenesList.scene_8E',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      pan: 780,
      zoom: 1.1,
      initialZoom: 1.1,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S8.S8_D8_FSQ4_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
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
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D8_FSQ4_C2_en.mp3',
      },
      {
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S8.S8_D9_FSQ4_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
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
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D9_FSQ4_C1_en.mp3',
      },
      {
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S8.S8_D10_FSQ4_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        background: {
          blur: 6,
          zoom: 1.1,
          pan: 780,
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
        audioUrl: '/assets/audio/lunar-probe-precision_S8_D10_FSQ4_C2_en.mp3',
      },
    ],
  },

  //  Scene 9
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1235,
      zoom: 1.09,
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
        heading: 'scenes.S9.S9_D0_FCH1_C9.title',
        interactions: [
          {
            name: 'vertex-form-formula',
            config: 'vertex-form-formula',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S9.S9_D1_FCH1_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.quadratic_function.word',
            definitionAsHtml: 'scenes.glossary.quadratic_function.definition',
          },
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D1_FCH1_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S9.S9_D2_FCH2_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'vertex-form-formula',
              disabled: 'vertex-formula-a-selected',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D2_FCH2_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S9.S9_D3_FCH3_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D3_FCH3_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S9.S9_D5_FCH5_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D5_FCH5_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S9.S9_D6_FCH6_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'vertex-form-formula',
              disabled: 'vertex-formula-h-selected',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D6_FCH6_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S9.S9_D7_FCH7_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D7_FCH7_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S9.S9_D8_FCH8_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'vertex-form-formula',
              disabled: 'vertex-formula-k-selected',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D8_FCH8_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S9.S9_D9_FCH9_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D9_FCH9_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S9.S9_D10_FCH10_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S9_D10_FCH10_C2_en.mp3',
      },
    ],
  },

  //  Scene 10
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      initialZoom: 1.11,
      pan: 1230,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.S10.S10_D0_FSQ4_C9.title',
        interactions: [
          {
            name: 'trajectory-alignment',
            config: 'trajectory-alignment-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S10.S10_D0_FSQ4_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_FSQ4_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_FSQ4_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_FSQ4_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        skipNavigation: true,
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 6,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S10.S10_D1_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D1_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S10.S10_D2_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D2_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S10.S10_D3_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'calculate-vertex-form-h-quadratic-equation-coefficient',
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
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D3_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S10.S10_D4_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D4_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S10.S10_D5_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'trajectory-alignment',
              disabled: 'trajectory-alignment-set-a',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D5_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S10.S10_D6_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        events: [
          {
            payload: {
              target: 'trajectory-alignment',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D6_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S10.S10_D7_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'calculate-vertex-form-k-quadratic-equation-coefficient',
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
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'trajectory-alignment',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D7_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S10.S10_D8_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        events: [
          {
            payload: {
              target: 'trajectory-alignment',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S10_D8_FSQ4_C2_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 780,
      zoom: 1.1,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S11.S11_D1_FPS1_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.quadratic_function.word',
            definitionAsHtml: 'scenes.glossary.quadratic_function.definition',
          },
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
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
        audioUrl: '/assets/audio/lunar-probe-precision_S11_D1_FPS1_C2_en.mp3',
      },
      {
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S11.S11_D2_FPS2_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
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
        audioUrl: '/assets/audio/lunar-probe-precision_S11_D2_FPS2_C1_en.mp3',
      },
      {
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S11.S11_D3_FPS3_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
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
        audioUrl: '/assets/audio/lunar-probe-precision_S11_D3_FPS3_C2_en.mp3',
      },
      {
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S11.S11_D4_FPS4_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
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
        width: '56vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S11_D4_FPS4_C1_en.mp3',
      },
      {
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S11.S11_D5_FPS5_C2',
        headingColor: '#006BE0',
        position: {
          top: '50%',
          left: '37%',
        },
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
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
        audioUrl: '/assets/audio/lunar-probe-precision_S11_D5_FPS5_C2_en.mp3',
      },
      {
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S11.S11_D6_FPS6_C1',
        headingColor: '#EB0000',
        position: {
          top: '50%',
          right: '37%',
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
        audioUrl: '/assets/audio/lunar-probe-precision_S11_D6_FPS6_C1_en.mp3',
      },
    ],
  },

  //  Scene 12
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1235,
      zoom: 1.09,
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
        heading: 'scenes.S12.S12_D0_FSQ4_C9.title',
        interactions: [
          {
            name: 'quadratic-visualizer',
            config: 'quadratic-visualizer-config',
          },
        ],
        about: [
          {
            heading: 'scenes.S12.S12_D0_FSQ4_C9.about.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_FSQ4_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S12.S12_D0_FSQ4_C9.help.heading',
            bodyAsHtml: 'scenes.S12.S12_D0_FSQ4_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        headingColor: '',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S12.S12_D1_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.quadratic_function.word',
            definitionAsHtml: 'scenes.glossary.quadratic_function.definition',
          },
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S12_D1_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S12.S12_D2_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S12_D2_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S12.S12_D3_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        glossary: [
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        audioUrl: '/assets/audio/lunar-probe-precision_S12_D3_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S12.S12_D4_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S12_D4_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S12.S12_D5_FSQ4_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
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
            name: 'interactive-two-inputbox',
            config: 'calculate-quadratic-roots',
          },
        ],
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S12_D5_FSQ4_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ethan',
        body: 'scenes.S12.S12_D6_FSQ4_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C8EAC7',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S12_D6_FSQ4_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        body: 'scenes.S12.S12_D7_FSQ4_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
          {
            word: 'scenes.glossary.skylight.word',
            definitionAsHtml: 'scenes.glossary.skylight.definition',
          },
          {
            word: 'scenes.glossary.probe.word',
            definitionAsHtml: 'scenes.glossary.probe.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        width: '35vw',
        audioUrl: '/assets/audio/lunar-probe-precision_S12_D7_FSQ4_C2_en.mp3',
      },
    ],
  },

  // Scene 13
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      pan: 1230,
      zoom: 1.1,
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S13.S13_D1_FSQ3_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/lunar-probe-precision_S13_D1_FSQ3_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S13.S13_D2_FSQ3_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/lunar-probe-precision_S13_D2_FSQ3_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S13.S13_D3_FSQ3_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/lunar-probe-precision_S13_D3_FSQ3_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.emma',
        bodyAsHtml: 'scenes.S13.S13_D4_FSQ3_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.trajectory.word',
            definitionAsHtml: 'scenes.glossary.trajectory.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/lunar-probe-precision_S13_D4_FSQ3_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.ethan',
        bodyAsHtml: 'scenes.S13.S13_D11_FSQ3_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/lunar-probe-precision_S13_D11_FSQ3_C1_en.mp3',
      },
    ],
  },

  // Scene 14
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      pan: 1230,
      zoom: 1.1,
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    showConfetti: true,
    type: 'end-screen',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.S14.S14_D0_FSQE_C9',
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
            word: 'scenes.glossary.quadratic_functions.word',
            definitionAsHtml: 'scenes.glossary.quadratic_functions.definition',
          },
          {
            word: 'scenes.glossary.skylight.word',
            definitionAsHtml: 'scenes.glossary.skylight.definition',
          },
        ],
        position: { left: '50%', top: '50%' },
        width: '81vw',
        headingColor: '#000000',
        disableAnimation: true,
      },
    ],
  },
];
