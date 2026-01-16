import { DialogPosition, DialogWidth, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1 [Title Screen]
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.02,
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
          top: '50%',
        },
        width: DialogWidth.START_SCREEN,
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.char1_description',
          size: 'chat-bubble-square',
          background: '#ABE99B',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        background: {
          blur: 4,
          zoom: 1.06,
          pan: 1050,
        },
      },
    ],
  },

  // Scene 2 [Welcome Screen]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.2,
      pan: 1700,
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
        glossary: [
          {
            word: 'scenes.glossary.mathematikoi.word',
            definitionAsHtml: 'scenes.glossary.mathematikoi.definition',
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S2_D1_FX_C0_en.mp3',
      },
    ],
  },

  // Scene 4 [Introduction Scene]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.05,
      pan: 1220,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D1_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/pythagoras-quest_S4_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        body: 'scenes.S4.S4_D2_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/pythagoras-quest_S4_D2_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 5 [Interactive 1 - Virtual Monochord]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.5,
      pan: 900,
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
        heading: 'scenes.S5.S5_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'the-virtual-monochord',
            config: 'the-virtual-monochord-config',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.info.body',
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
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        width: '35vw',
        glossary: [
          {
            word: 'scenes.glossary.monochord.word',
            definitionAsHtml: 'scenes.glossary.monochord.definition',
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S5_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        width: '35vw',
        audioUrl: '/assets/audio/pythagoras-quest_S5_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        width: '35vw',
        audioUrl: '/assets/audio/pythagoras-quest_S5_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        width: '35vw',
        audioUrl: '/assets/audio/pythagoras-quest_S5_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S5.S5_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        width: '35vw',
        audioUrl: '/assets/audio/pythagoras-quest_S5_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 6 [Scene 2 - Music to Geometry Transition]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.15,
      pan: 1300,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        body: 'scenes.S6.S6_D1_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/pythagoras-quest_S6_D1_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 7 [Interactive 2]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.4,
      pan: 1800,
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
        heading: 'scenes.S7.S7_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'pebble-interactive',
            config: 'pebble-interactive',
            enableStateExchange: true,
          },
        ],
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
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D1_FX_C1',
        audioUrl: '/assets/audio/pythagoras-quest_S7_D1_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'pebble-interactive',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D2_FX_C1',
        audioUrl: '/assets/audio/pythagoras-quest_S7_D2_FX_C1_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.right-triangle.word',
            definitionAsHtml: 'scenes.glossary.right-triangle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        audioUrl: '/assets/audio/pythagoras-quest_S7_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'pebble-interactive',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S7_D4_FX_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'interactive-2-question-1',
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
        body: 'scenes.S7.S7_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.tetractys.word',
            definitionAsHtml: 'scenes.glossary.tetractys.definition',
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S7_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.tetractys.word',
            definitionAsHtml: 'scenes.glossary.tetractys.definition',
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S7_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S7.S7_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        audioUrl: '/assets/audio/pythagoras-quest_S7_D7_FX_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-radio',
            config: 'interactive-2-question-2',
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
    ],
  },

  // Scene 8 [Scene 3 - Pythagorean Theorem Introduction]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.1,
      pan: 980,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.char1',
        body: 'scenes.S8.S8_D1_FX_C1',
        headingColor: '#238B21',
        position: {
          top: '53%',
          left: '62%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.char1_description',
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
        audioUrl: '/assets/audio/pythagoras-quest_S8_D1_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 9 [Interactive 3 - Pythagorean Theorem Proofs]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.06,
      pan: 1172,
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
            name: 'pythagorean-theorem-proofs',
            config: 'pythagorean-theorem-proofs-config',
            enableStateExchange: true,
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
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        audioUrl: '/assets/audio/pythagoras-quest_S9_D1_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.right-triangles.word',
            definitionAsHtml: 'scenes.glossary.right-triangles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.right-triangle.word',
            definitionAsHtml: 'scenes.glossary.right-triangle.definition',
          },
          {
            word: 'scenes.glossary.hypotenuse.word',
            definitionAsHtml: 'scenes.glossary.hypotenuse.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.right-triangle.word',
            definitionAsHtml: 'scenes.glossary.right-triangle.definition',
          },
          {
            word: 'scenes.glossary.hypotenuse.word',
            definitionAsHtml: 'scenes.glossary.hypotenuse.definition',
          },
          {
            word: 'scenes.glossary.pythagorean-theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean-theorem.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D5_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D6_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.hypotenuse.word',
            definitionAsHtml: 'scenes.glossary.hypotenuse.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D7_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.right-triangles.word',
            definitionAsHtml: 'scenes.glossary.right-triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D7_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D8_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        audioUrl: '/assets/audio/pythagoras-quest_S9_D8_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D9_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        audioUrl: '/assets/audio/pythagoras-quest_S9_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D10_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.right-triangle.word',
            definitionAsHtml: 'scenes.glossary.right-triangle.definition',
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D10_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S9.S9_D11_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'pythagorean-theorem-proofs',
              proof: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.hypotenuse.word',
            definitionAsHtml: 'scenes.glossary.hypotenuse.definition',
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S9_D11_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 10 [Interactive 6-7]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.1,
      pan: 1570,
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
        heading: 'scenes.S10.S10_D0_FX_C9.title',
        headingColor: '#333333',
        interactions: [
          {
            name: 'the-ladder-problem',
            config: 'the-ladder-problem-config',
            enableStateExchange: true,
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D1_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'the-ladder-problem',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S10_D1_FX_C1_en.mp3',
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'interactive-6-question',
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
            word: 'scenes.glossary.hypotenuse.word',
            definitionAsHtml: 'scenes.glossary.hypotenuse.definition',
          },
          {
            word: 'scenes.glossary.right-triangle.word',
            definitionAsHtml: 'scenes.glossary.right-triangle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D2_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'the-ladder-problem',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S10_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D3_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'the-ladder-problem',
              step: 2,
              disabled: 'coordinate-challenge-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S10_D3_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.right-triangle.word',
            definitionAsHtml: 'scenes.glossary.right-triangle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.char1',
        body: 'scenes.S10.S10_D4_FX_C1',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
          position: 'right',
        },
        events: [
          {
            payload: {
              target: 'the-ladder-problem',
              step: 2,
              disabled: 'coordinate-challenge-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/pythagoras-quest_S10_D4_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 11 [Ending Screen]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.03,
      pan: 1300,
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
