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
      blur: 3,
      pan: 1016,
      zoom: 1.02,
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
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.leonardo_description',
          size: 'chat-bubble-square',
          background: '#F6E4FF',
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

  // Scene 2 [Welcome Scene]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 473,
      blur: 3,
      zoom: 1.09,
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
        width: '80.5vw',
        audioUrl: '/assets/audio/similar-triangles_S2_D1_F4_C0_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
          {
            word: 'scenes.glossary.camera_obscura.word',
            definitionAsHtml: 'scenes.glossary.camera_obscura.definition',
          },
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
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
      blur: 3,
      pan: 1138,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D1_FX_C2',
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
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/similar-triangles_S3_D1_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D2_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.toscanelli_description',
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
        audioUrl: '/assets/audio/similar-triangles_S3_D2_FX_C1_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D3_FX_C2',
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
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/similar-triangles_S3_D3_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D4_FX_C1',
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
        audioUrl: '/assets/audio/similar-triangles_S3_D4_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D5_FX_C2',
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
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/similar-triangles_S3_D5_FX_C2_en.mp3',
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
      blur: 3,
      pan: 524,
      zoom: 1.09,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S4.S4_D1_FX_C1',
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
        audioUrl: '/assets/audio/similar-triangles_S4_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S4.S4_D2_FX_C1',
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
        audioUrl: '/assets/audio/similar-triangles_S4_D2_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D3_FX_C2',
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
            exit: 'fadeOutLeft',
          },
        },
        width: '56.5vw',
        audioUrl: '/assets/audio/similar-triangles_S4_D3_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S4.S4_D4_FX_C1',
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
        audioUrl: '/assets/audio/similar-triangles_S4_D4_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 961,
      zoom: 1.07,
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
            name: 'thales-shadow-calculator',
            config: 'thales-shadow-calculator',
            enableStateExchange: true,
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.orbit.word',
            definitionAsHtml: 'scenes.glossary.orbit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D1_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S5.S5_D2_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D3_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S5.S5_D4_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D5_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D5_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
          {
            word: 'scenes.glossary.right_triangles.word',
            definitionAsHtml: 'scenes.glossary.right_triangles.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D6_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D8_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D9_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D10_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D10_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'thales-shadow-calculator',
              disabled: 'thales-shadow-calculator-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D11_FX_C1',
        headingColor: '#006BE0',
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
            name: 'interactive-inputbox',
            config: 'question-itr1-pyramid-height',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S5_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D12_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S5.S5_D13_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D13_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S5.S5_D14_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S5_D14_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 328,
      zoom: 1.07,
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
        heading: 'scenes.S6.S6_D0_FX_C9.title',
        about: [
          {
            heading: 'scenes.S6.S6_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        interactions: [
          {
            name: 'proving-pythagorus',
            config: 'proving-pythagorus',
            enableStateExchange: true,
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.orbit.word',
            definitionAsHtml: 'scenes.glossary.orbit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D1_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D1_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D2_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D2_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.right_triangles.word',
            definitionAsHtml: 'scenes.glossary.right_triangles.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S6.S6_D3_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D3_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.right_triangles.word',
            definitionAsHtml: 'scenes.glossary.right_triangles.definition',
          },
          {
            word: 'scenes.glossary.hypotenuse.word',
            definitionAsHtml: 'scenes.glossary.hypotenuse.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D4_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D4_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 0,
              disabled: 'proving-pythagorus-step-0-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D5_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D5_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D6_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D6_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      // step 2
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D7_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D7_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.altitude.word',
            definitionAsHtml: 'scenes.glossary.altitude.definition',
          },
          {
            word: 'scenes.glossary.hypotenuse.word',
            definitionAsHtml: 'scenes.glossary.hypotenuse.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S6.S6_D8_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D8_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.right_triangles.word',
            definitionAsHtml: 'scenes.glossary.right_triangles.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D9_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D9_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
        ],
      },
      // step 3
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D10_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D10_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S6.S6_D11_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D11_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D12_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D12_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 2,
              disabled: 'proving-pythagorus-step-2-completion',
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
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D13_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D13_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      // step 4
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D14_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D14_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D15_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D15_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 3,
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
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D16_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D16_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 3,
              disabled: 'proving-pythagorus-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D17_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D17_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      // step 5
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D18_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D18_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S6.S6_D19_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D19_FX_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S6.S6_D20_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/similar-triangles_S6_D20_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'proving-pythagorus',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
      },
    ],
  },

  // Scene 7 [Eratosthenes]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 736,
      zoom: 1.04,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D1_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.toscanelli_description',
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
        audioUrl: '/assets/audio/similar-triangles_S7_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D2_FX_C2',
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
        audioUrl: '/assets/audio/similar-triangles_S7_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D3_FX_C1',
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
        audioUrl: '/assets/audio/similar-triangles_S7_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S7.S7_D4_FX_C2',
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
        audioUrl: '/assets/audio/similar-triangles_S7_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D5_FX_C1',
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
            word: 'scenes.glossary.proportions.word',
            definitionAsHtml: 'scenes.glossary.proportions.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S7_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 8 [Eratosthenes' Measurement]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 961,
      zoom: 1.07,
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
        heading: 'scenes.S8.S8_D0_FX_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'earth-circumference',
            config: 'earth-circumference',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S8.S8_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FX_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_FX_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D1_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.summer_solstice.word',
            definitionAsHtml: 'scenes.glossary.summer_solstice.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'earth-circumference',
              disabled: 'is-correct-time',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S8_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D6_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S8_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S8.S8_D7_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S8_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D7_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S8_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D8_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumference.word',
            definitionAsHtml: 'scenes.glossary.circumference.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S8_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D8_F1_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'degree-calculation',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.circumference.word',
            definitionAsHtml: 'scenes.glossary.circumference.definition',
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
        audioUrl: '/assets/audio/similar-triangles_S8_D8_F1_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D8_F2_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.circumference.word',
            definitionAsHtml: 'scenes.glossary.circumference.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S8_D8_F2_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S8.S8_D8_F3_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S8_D8_F3_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D9_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S8_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D10_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.proportions.word',
            definitionAsHtml: 'scenes.glossary.proportions.definition',
          },
          {
            word: 'scenes.glossary.circumference.word',
            definitionAsHtml: 'scenes.glossary.circumference.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S8_D10_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D12_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'earth-circumference-calculation',
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
        audioUrl: '/assets/audio/similar-triangles_S8_D12_FX_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.circumference.word',
            definitionAsHtml: 'scenes.glossary.circumference.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S8.S8_D13_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S8_D13_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S8.S8_D14_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S8_D14_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 9 [Ibn al-Haytham]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1285,
      zoom: 1.25,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S9.S9_D1_FX_C1',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'scenes.common.toscanelli_description',
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
        audioUrl: '/assets/audio/similar-triangles_S9_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D2_FX_C2',
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
        audioUrl: '/assets/audio/similar-triangles_S9_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S9.S9_D3_FX_C1',
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
        audioUrl: '/assets/audio/similar-triangles_S9_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leonardo',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S9.S9_D4_FX_C2',
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
        audioUrl: '/assets/audio/similar-triangles_S9_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S9.S9_D5_FX_C1',
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
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
          {
            word: 'scenes.glossary.camera_obscura.word',
            definitionAsHtml: 'scenes.glossary.camera_obscura.definition',
          },
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S9_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 10 [Camera Obscura]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 524,
      zoom: 1.09,
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
        heading: 'scenes.S10.S10_D0_FX_C9.title',
        isPrimaryHeading: true,
        interactions: [
          {
            name: 'camera-obscura-simulator',
            config: 'camera-obscura-simulator',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.S10.S10_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_FX_C9.about.body',
            accentColor: '#006BE0',
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
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D2_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.camera_obscura.word',
            definitionAsHtml: 'scenes.glossary.camera_obscura.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S10_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S10.S10_D3_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D4_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D5_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S10_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S10.S10_D6_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.proportions.word',
            definitionAsHtml: 'scenes.glossary.proportions.definition',
          },
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
          {
            word: 'scenes.glossary.right_triangles.word',
            definitionAsHtml: 'scenes.glossary.right_triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S10_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D7_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.proportions.word',
            definitionAsHtml: 'scenes.glossary.proportions.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S10_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D8_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'camera-obscura-calculation-1',
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
        audioUrl: '/assets/audio/similar-triangles_S10_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D10_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D10_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'camera-obscura-simulator',
              disabled: 'screen-distance-slider-interaction',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S10.S10_D11_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D11_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D12_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D13_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'camera-obscura-calculation-2',
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
        audioUrl: '/assets/audio/similar-triangles_S10_D13_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D14_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D14_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        body: 'scenes.S10.S10_D15_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D15_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.toscanelli',
        body: 'scenes.S10.S10_D16_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#E0F2FF',
        },
        audioUrl: '/assets/audio/similar-triangles_S10_D16_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 11 [Final Reflections - Ending]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      blur: 3,
      zoom: 1.06,
      pan: 1221,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        isPrimaryHeading: true,
        heading: 'scenes.common.toscanelli',
        bodyAsHtml: 'scenes.S11.S11_D1_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S11_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        bodyAsHtml: 'scenes.S11.S11_D2_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.proportions.word',
            definitionAsHtml: 'scenes.glossary.proportions.definition',
          },
        ],
        audioUrl: '/assets/audio/similar-triangles_S11_D2_FX_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.toscanelli',
        bodyAsHtml: 'scenes.S11.S11_D3_FX_C1',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1long.webp',
          alt: '',
          size: 'large',
          position: 'left',
        },
        audioUrl: '/assets/audio/similar-triangles_S11_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leonardo',
        bodyAsHtml: 'scenes.S11.S11_D4_FX_C2',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char2long.webp',
          alt: '',
          size: 'large',
          position: 'right',
        },
        audioUrl: '/assets/audio/similar-triangles_S11_D4_FX_C2_en.mp3',
      },
    ],
  },

  // Ending Screen
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      blur: 3,
      zoom: 1.06,
      pan: 1221,
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
        glossary: [
          {
            word: 'scenes.glossary.pythagorean_theorem.word',
            definitionAsHtml: 'scenes.glossary.pythagorean_theorem.definition',
          },
          {
            word: 'scenes.glossary.camera_obscura.word',
            definitionAsHtml: 'scenes.glossary.camera_obscura.definition',
          },
          {
            word: 'scenes.glossary.similar_triangles.word',
            definitionAsHtml: 'scenes.glossary.similar_triangles.definition',
          },
          {
            word: 'scenes.glossary.circumference.word',
            definitionAsHtml: 'scenes.glossary.circumference.definition',
          },
        ],
      },
    ],
  },
];
