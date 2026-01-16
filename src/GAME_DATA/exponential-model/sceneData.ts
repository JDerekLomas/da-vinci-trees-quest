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
    },
    logoTheme: {
      landscape: LogoTheme.LIGHT,
      portrait: LogoTheme.DARK,
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
          src: '/assets/characters/char2mini.webp',
          alt: 'scenes.common.ben_description',
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
          blur: 5,
          zoom: 1,
          pan: 1120,
        },
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
          {
            word: 'scenes.glossary.proofs.word',
            definitionAsHtml: 'scenes.glossary.proofs.definition',
          },
          {
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
        ],
      },
    ],
    audioUrl: '/assets/audio/bgmusic.mp3',
  },

  // Scene 2 [Welcome Scene]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.S2.S2_D1_FX_C0.heading',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S2.S2_D1_FX_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 4,
          zoom: 1.025,
          pan: 663,
        },
        glossary: [
          {
            word: 'scenes.glossary.exponential_growth.word',
            definitionAsHtml: 'scenes.glossary.exponential_growth.definition',
          },
        ],
        width: '80.5vw',
        audioUrl: '/assets/audio/exponential-model_S2_D1_FX_C0_en.mp3',
      },
    ],
  },

  // Scene 3 - Removed

  // Scene 4 [Powerpoint Presentation]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1282,
      zoom: 1.025,
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
        heading: 'scenes.S4.S4_D0_FX_C9.title',
        interactions: [
          {
            name: 'interactive-0',
            config: 'interactive-0',
            enableStateExchange: true,
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S4.S4_D1_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: 'scenes.common.donovan_description',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive0',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D1_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S4.S4_D2_FX_C2',
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
              target: 'interactive0',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S4.S4_D3_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.samantha_description',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'interactive0',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S4.S4_D4_FX_C2',
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
              target: 'interactive0',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S4.S4_D5_FX_C1',
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
              target: 'interactive0',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S4.S4_D6_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive0',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D6_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S4.S4_D8_FX_C1',
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
              target: 'interactive0',
              step: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S4.S4_D7_FX_C2',
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
              target: 'interactive0',
              step: 4,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S4.S4_D9_FX_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.exponential_growth.word',
            definitionAsHtml: 'scenes.glossary.exponential_growth.definition',
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
              target: 'interactive0',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D9_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S4.S4_D11_FX_C1',
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
              target: 'interactive0',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S4.S4_D12_FX_C2',
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
              target: 'interactive0',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D12_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S4.S4_D10_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive0',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D10_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S4.S4_D15_FX_C2',
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
              target: 'interactive0',
              step: 5,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
          {
            word: 'scenes.glossary.exponential_growth.word',
            definitionAsHtml: 'scenes.glossary.exponential_growth.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S4_D15_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 5 [Exponential Growth]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 975,
      zoom: 1.025,
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
            name: 'interactive-1',
            config: 'interactive-1',
            enableStateExchange: true,
          },
        ],
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
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D1_FX_C2',
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
              target: 'interactive-1',
              step: 1,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D1_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D2_FX_C2',
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
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D3_FX_C2',
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
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D4_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D4_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D6_FX_C2',
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
              target: 'interactive-1',
              disabled: 'set-years',
            },
            triggers: ['on-next', 'on-back'],
          },
          {
            payload: {
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D5_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D5_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D11_FX_C2',
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
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D11_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D10_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
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
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D10_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D7_FX_C1',
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
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D12_FX_C1',
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
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.exponential_growth.word',
            definitionAsHtml: 'scenes.glossary.exponential_growth.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D12_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D13_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D13_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D14_FX_C2',
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
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D14_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D14_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D14_FX_C3_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S5.S5_D0_FX_C9.title',
        interactions: [
          {
            name: 'interactive-1',
            config: 'interactive-1',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.about_step3.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.about_step3.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_FX_C9.help_step3.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_FX_C9.help_step3.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D15_FX_C1',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D15_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D15_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D15_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D16_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
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
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D16_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D16_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D16_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D17_FX_C2',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D17_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D18_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              disabled: 'show-realistic-growth',
            },
            triggers: ['on-next', 'on-back'],
          },
          {
            payload: {
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D18_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D19_FX_C1',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D19_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D20_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D20_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D21_FX_C2',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D21_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D22_FX_C3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D22_FX_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D23_FX_C1',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D23_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D24_FX_C2',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D24_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D25_FX_C1',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D25_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D26_FX_C2',
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
              target: 'interactive-1',
              step: 3,
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S5_D26_FX_C2_en.mp3',
      },
    ],
  },

  // scene 5 extended
  {
    name: 'scenesList.scene_5X',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1420,
      zoom: 1.0325,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D31_FX_C3',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/exponential-model_S5_D31_FX_C3_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        body: 'scenes.S5.S5_D32_FX_C1',
        headingColor: '#EB0000',
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
        audioUrl: '/assets/audio/exponential-model_S5_D32_FX_C1_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D33_FX_C3',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/exponential-model_S5_D33_FX_C3_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        body: 'scenes.S5.S5_D34_FX_C2',
        headingColor: '#006BE0',
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
        audioUrl: '/assets/audio/exponential-model_S5_D34_FX_C2_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.donovan',
        body: 'scenes.S5.S5_D35_FX_C3',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
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
        audioUrl: '/assets/audio/exponential-model_S5_D35_FX_C3_en.mp3',
      },
    ]
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1420,
      zoom: 1.0325,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S6.S6_D1_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S6_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D2_FX_C2',
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
        audioUrl: '/assets/audio/exponential-model_S6_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S6.S6_D3_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S6_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D4_FX_C2',
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
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/exponential-model_S6_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S6.S6_D5_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S6_D5_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D6_FX_C2',
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
        audioUrl: '/assets/audio/exponential-model_S6_D6_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S6.S6_D7_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S6_D7_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S6.S6_D8_FX_C2',
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
        audioUrl: '/assets/audio/exponential-model_S6_D8_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S6.S6_D9_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S6_D9_FX_C1_en.mp3',
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
      pan: 820,
      zoom: 1.035,
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
        heading: 'scenes.S7.S7_D0_FX_C9.title',
        interactions: [
          {
            name: 'interactive-2',
            config: 'interactive-2',
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
        heading: 'scenes.common.samantha',
        body: 'scenes.S7.S7_D1_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S7_D1_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S7.S7_D2_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/exponential-model_S7_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S7.S7_D3_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.minimum_payments.word',
            definitionAsHtml: 'scenes.glossary.minimum_payments.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S7_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S7.S7_D4_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
          {
            word: 'scenes.glossary.minimum_payments.word',
            definitionAsHtml: 'scenes.glossary.minimum_payments.definition',
          },
          {
            word: 'scenes.glossary.apr.word',
            definitionAsHtml: 'scenes.glossary.apr.definition',
          },
        ],
        interactions: [
          {
            name: 'interactive-inputbox',
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
        audioUrl: '/assets/audio/exponential-model_S7_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S7.S7_D5_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S7_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S7.S7_D6_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S7_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S7.S7_D7_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.apr.word',
            definitionAsHtml: 'scenes.glossary.apr.definition',
          },
        ],
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
        audioUrl: '/assets/audio/exponential-model_S7_D7_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S7.S7_D8_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S7_D8_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S7.S7_D9_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S7_D9_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S7.S7_D10_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.growth_rate.word',
            definitionAsHtml: 'scenes.glossary.growth_rate.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S7_D10_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S7.S7_D11_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S7_D11_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 980,
      zoom: 1.025,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D1_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S8_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S8.S8_D2_FX_C2',
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
        audioUrl: '/assets/audio/exponential-model_S8_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D3_FX_C1',
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
            word: 'scenes.glossary.conversion_rate.word',
            definitionAsHtml: 'scenes.glossary.conversion_rate.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/exponential-model_S8_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S8.S8_D4_FX_C2',
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
        audioUrl: '/assets/audio/exponential-model_S8_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D5_FX_C1',
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
            word: 'scenes.glossary.conversion_rate.word',
            definitionAsHtml: 'scenes.glossary.conversion_rate.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/exponential-model_S8_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1410,
      zoom: 1.035,
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
        heading: 'scenes.S9.S9_D0_FX_C9.title',
        interactions: [
          {
            name: 'interactive-3',
            config: 'interactive-3',
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_FX_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_FX_C9.about.body',
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
        heading: 'scenes.common.samantha',
        body: 'scenes.S9.S9_D1_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S9_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S9.S9_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.apr.word',
            definitionAsHtml: 'scenes.glossary.apr.definition',
          },
          {
            word: 'scenes.glossary.conversion_rate.word',
            definitionAsHtml: 'scenes.glossary.conversion_rate.definition',
          },
        ],
        interactions: [
          {
            name: 'interactive-inputbox',
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
        audioUrl: '/assets/audio/exponential-model_S9_D1_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S9.S9_D2_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/exponential-model_S9_D2_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S9.S9_D3_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S9_D3_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S9.S9_D4_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/exponential-model_S9_D4_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S9.S9_D5_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S9_D5_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S9.S9_D6_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.exponential_growth.word',
            definitionAsHtml: 'scenes.glossary.exponential_growth.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S9_D6_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S9.S9_D7_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S9_D7_FX_C1_en.mp3',
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
      pan: 1422,
      zoom: 1.0325,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S10.S10_D1_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S10_D1_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S10.S10_D2_FX_C2',
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
            word: 'scenes.glossary.portfolio_diversification.word',
            definitionAsHtml: 'scenes.glossary.portfolio_diversification.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/exponential-model_S10_D2_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S10.S10_D3_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S10_D3_FX_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S10.S10_D4_FX_C2',
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
            word: 'scenes.glossary.concentration_risk.word',
            definitionAsHtml: 'scenes.glossary.concentration_risk.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/exponential-model_S10_D4_FX_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S10.S10_D5_FX_C1',
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
        audioUrl: '/assets/audio/exponential-model_S10_D5_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 11
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 822,
      zoom: 1.0325,
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
        heading: 'scenes.S11.S11_D0_FX_C9.title',
        interactions: [
          {
            name: 'interactive-4',
            config: 'interactive-4',
          },
        ],
        about: [
          {
            heading: 'scenes.S11.S11_D0_FX_C9.info.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_FX_C9.info.description',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_FX_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_FX_C9.help.description',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S11.S11_D1_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.compound_interest.word',
            definitionAsHtml: 'scenes.glossary.compound_interest.definition',
          },
          {
            word: 'scenes.glossary.return.word',
            definitionAsHtml: 'scenes.glossary.return.definition',
          },
        ],
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'interactive4-question1',
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
        audioUrl: '/assets/audio/exponential-model_S11_D1_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S11.S11_D2_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S11_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S11.S11_D3_FX_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.compound_interest_formula.word',
            definitionAsHtml: 'scenes.glossary.compound_interest_formula.definition',
          },
          {
            word: 'scenes.glossary.pmt.word',
            definitionAsHtml: 'scenes.glossary.pmt.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/exponential-model_S11_D3_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S11.S11_D4_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'interactive4-question2',
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
            word: 'scenes.glossary.return.word',
            definitionAsHtml: 'scenes.glossary.return.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S11_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S11.S11_D5_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.concentration_risk.word',
            definitionAsHtml: 'scenes.glossary.concentration_risk.definition',
          },
        ],
        audioUrl: '/assets/audio/exponential-model_S11_D5_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S11.S11_D6_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S11_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S11.S11_D7_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/exponential-model_S11_D7_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S11.S11_D8_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'interactive4-question3',
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
        audioUrl: '/assets/audio/exponential-model_S11_D8_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S11.S11_D9_FX_C2',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/exponential-model_S11_D9_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.samantha',
        body: 'scenes.S11.S11_D10_FX_C1',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/exponential-model_S11_D10_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        body: 'scenes.S11.S11_D11_FX_C2',
        headingColor: '#006BE0',
        glossary: [
          {
            word: 'scenes.glossary.exponential_growth.word',
            definitionAsHtml: 'scenes.glossary.exponential_growth.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        audioUrl: '/assets/audio/exponential-model_S11_D11_FX_C2_en.mp3',
      },
    ],
  },

  // Scene 12
  // {
  //   name: 'scenesList.scene_12',
  //   background: {
  //     alt: 'scenes.common.bg3_description',
  //     url: '/assets/backgrounds/bg3.webp',
  //     waitDelay: SCENE_CHANGE_DELAY,
  //     blur: 5,
  //     pan: 978,
  //     zoom: 1.025,
  //   },
  //   type: 'one-at-a-time',
  //   dialogs: [
  //     {
  //       disableAnimation: true,
  //       isPrimaryHeading: true,
  //       heading: 'scenes.common.samantha',
  //       headingColor: '#EB0000',
  //       bodyAsHtml: 'scenes.S12.S12_D1_FX_C1',
  //       position: {
  //         top: '50.7%',
  //         left: '63.5%',
  //       },
  //       avatar: {
  //         src: '/assets/characters/char1.webp',
  //         alt: '',
  //         size: 'large',
  //         position: 'left',
  //         animation: {
  //           duration: 300,
  //           delay: 0,
  //           entry: 'fadeIn',
  //           exit: 'fadeOutLeft',
  //         },
  //       },
  //       width: '56.5vw',
  //       audioUrl: '/assets/audio/exponential-model_S12_D1_FX_C1_en.mp3',
  //     },
  //     {
  //       isPrimaryHeading: true,
  //       heading: 'scenes.common.ben',
  //       headingColor: '#006BE0',
  //       bodyAsHtml: 'scenes.S12.S12_D2_FX_C2',
  //       position: {
  //         top: '50.7%',
  //         left: '38%',
  //       },
  //       avatar: {
  //         src: '/assets/characters/char2.webp',
  //         alt: '',
  //         size: 'large',
  //         position: 'right',
  //         animation: {
  //           duration: 300,
  //           delay: 0,
  //           entry: 'fadeIn',
  //           exit: 'fadeOutRight',
  //         },
  //       },
  //       width: '56.5vw',
  //       audioUrl: '/assets/audio/exponential-model_S12_D2_FX_C2_en.mp3',
  //     },
  //     {
  //       isPrimaryHeading: true,
  //       heading: 'scenes.common.ben',
  //       headingColor: '#006BE0',
  //       bodyAsHtml: 'scenes.S12.S12_D3_FX_C2',
  //       position: {
  //         top: '50.7%',
  //         left: '38%',
  //       },
  //       avatar: {
  //         src: '/assets/characters/char2.webp',
  //         alt: '',
  //         size: 'large',
  //         position: 'right',
  //         animation: {
  //           duration: 300,
  //           delay: 0,
  //           entry: 'fadeIn',
  //           exit: 'fadeOutRight',
  //         },
  //       },
  //       glossary: [
  //         {
  //           word: 'scenes.glossary.growth_rates.word',
  //           definitionAsHtml: 'scenes.glossary.growth_rates.definition',
  //         },
  //       ],
  //       width: '56.5vw',
  //       audioUrl: '/assets/audio/exponential-model_S12_D3_FX_C2_en.mp3',
  //     },
  //   ],
  // },

  // Scene 13
  // {
  //   name: 'scenesList.scene_13',
  //   background: {
  //     alt: 'scenes.common.bg4_description',
  //     url: '/assets/backgrounds/bg4.webp',
  //     waitDelay: SCENE_CHANGE_DELAY,
  //     blur: 5,
  //     pan: 822,
  //     zoom: 1.0325,
  //   },
  //   type: 'split-screen-chat',
  //   leftConfig: {
  //     blur: 0,
  //     background: 'rgba(255, 255, 255, 0.2)',
  //   },
  //   dialogs: [
  //     {
  //       side: 'left',
  //       skipNavigation: true,
  //       headingColor: '#333333',
  //       isPrimaryHeading: true,
  //       heading: 'scenes.S13.S13_D0_FX_C9.title',
  //       interactions: [
  //         {
  //           name: 'interactive-5',
  //           config: 'interactive-5',
  //         },
  //       ],
  //       about: [
  //         {
  //           heading: 'scenes.S13.S13_D0_FX_C9.info.heading',
  //           bodyAsHtml: 'scenes.S13.S13_D0_FX_C9.info.description',
  //           accentColor: '#006BE0',
  //         },
  //       ],
  //       help: [
  //         {
  //           heading: 'scenes.S13.S13_D0_FX_C9.help.heading',
  //           bodyAsHtml: 'scenes.S13.S13_D0_FX_C9.help.description',
  //           accentColor: '#A22DDC',
  //         },
  //       ],
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.ben',
  //       body: 'scenes.S13.S13_D1_FX_C2',
  //       headingColor: '#006BE0',
  //       avatar: {
  //         src: '/assets/characters/char2mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#C0DEFF',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D1_FX_C2_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.samantha',
  //       body: 'scenes.S13.S13_D2_FX_C1',
  //       headingColor: '#EB0000',
  //       avatar: {
  //         src: '/assets/characters/char1mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#FF9999',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D2_FX_C1_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.ben',
  //       body: 'scenes.S13.S13_D3_FX_C2',
  //       headingColor: '#006BE0',
  //       avatar: {
  //         src: '/assets/characters/char2mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#C0DEFF',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D3_FX_C2_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.samantha',
  //       body: 'scenes.S13.S13_D4_FX_C1',
  //       headingColor: '#EB0000',
  //       avatar: {
  //         src: '/assets/characters/char1mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#FF9999',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D4_FX_C1_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.ben',
  //       body: 'scenes.S13.S13_D5_FX_C2',
  //       headingColor: '#006BE0',
  //       avatar: {
  //         src: '/assets/characters/char2mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#C0DEFF',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D5_FX_C2_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.samantha',
  //       body: 'scenes.S13.S13_D6_FX_C1',
  //       headingColor: '#EB0000',
  //       avatar: {
  //         src: '/assets/characters/char1mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#FF9999',
  //       },
  //       interactions: [
  //         {
  //           name: 'interactive-inputbox',
  //           config: 'interactive5-question1',
  //         },
  //       ],
  //       controls: [
  //         {
  //           type: 'back',
  //           text: 'dialog.button.back',
  //         },
  //         {
  //           type: 'submit',
  //           text: 'dialog.button.submit',
  //         },
  //       ],
  //       audioUrl: '/assets/audio/exponential-model_S13_D6_FX_C1_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.ben',
  //       body: 'scenes.S13.S13_D7_FX_C2',
  //       headingColor: '#006BE0',
  //       avatar: {
  //         src: '/assets/characters/char2mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#C0DEFF',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D7_FX_C2_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.samantha',
  //       body: 'scenes.S13.S13_D8_FX_C1',
  //       headingColor: '#EB0000',
  //       avatar: {
  //         src: '/assets/characters/char1mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#FF9999',
  //       },
  //       interactions: [
  //         {
  //           name: 'interactive-inputbox',
  //           config: 'interactive5-question2',
  //         },
  //       ],
  //       controls: [
  //         {
  //           type: 'back',
  //           text: 'dialog.button.back',
  //         },
  //         {
  //           type: 'submit',
  //           text: 'dialog.button.submit',
  //         },
  //       ],
  //       audioUrl: '/assets/audio/exponential-model_S13_D8_FX_C1_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.ben',
  //       body: 'scenes.S13.S13_D9_FX_C2',
  //       headingColor: '#006BE0',
  //       avatar: {
  //         src: '/assets/characters/char2mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#C0DEFF',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D9_FX_C2_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.samantha',
  //       body: 'scenes.S13.S13_D10_FX_C1',
  //       headingColor: '#EB0000',
  //       avatar: {
  //         src: '/assets/characters/char1mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#FF9999',
  //       },
  //       interactions: [
  //         {
  //           name: 'interactive-inputbox',
  //           config: 'interactive5-question3',
  //         },
  //       ],
  //       controls: [
  //         {
  //           type: 'back',
  //           text: 'dialog.button.back',
  //         },
  //         {
  //           type: 'submit',
  //           text: 'dialog.button.submit',
  //         },
  //       ],
  //       audioUrl: '/assets/audio/exponential-model_S13_D10_FX_C1_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.ben',
  //       body: 'scenes.S13.S13_D11_FX_C2',
  //       headingColor: '#006BE0',
  //       avatar: {
  //         src: '/assets/characters/char2mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#C0DEFF',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D11_FX_C2_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.samantha',
  //       body: 'scenes.S13.S13_D12_FX_C1',
  //       headingColor: '#EB0000',
  //       avatar: {
  //         src: '/assets/characters/char1mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#FF9999',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D12_FX_C1_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.ben',
  //       body: 'scenes.S13.S13_D13_FX_C2',
  //       headingColor: '#006BE0',
  //       avatar: {
  //         src: '/assets/characters/char2mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#C0DEFF',
  //       },
  //       audioUrl: '/assets/audio/exponential-model_S13_D13_FX_C2_en.mp3',
  //     },
  //     {
  //       side: 'right',
  //       heading: 'scenes.common.samantha',
  //       body: 'scenes.S13.S13_D14_FX_C1',
  //       headingColor: '#EB0000',
  //       avatar: {
  //         src: '/assets/characters/char1mini.webp',
  //         alt: '',
  //         size: 'chat-bubble',
  //         background: '#FF9999',
  //       },
  //       glossary: [
  //         {
  //           word: 'scenes.glossary.conversion_rate.word',
  //           definitionAsHtml: 'scenes.glossary.conversion_rate.definition',
  //         },
  //       ],
  //       audioUrl: '/assets/audio/exponential-model_S13_D14_FX_C1_en.mp3',
  //     },
  //   ],
  // },

  // Scene 14
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 5,
      pan: 1048,
      zoom: 1.025,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S14.S14_D1_FX_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D1_FX_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S14.S14_D2_FX_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D2_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S14.S14_D3_FX_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D3_FX_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S14.S14_D4_FX_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D4_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S14.S14_D5_FX_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D5_FX_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S14.S14_D6_FX_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D6_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.ben',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S14.S14_D7_FX_C2',
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D7_FX_C2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.samantha',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S14.S14_D8_FX_C1',
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/exponential-model_S14_D8_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 15
  {
    name: 'scenesList.scene_15',
    background: {
      url: '/assets/backgrounds/bg5.webp',
      alt: 'scenes.common.bg5_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 760,
      zoom: 1.03,
      blur: 5,
    },
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: '',
        body: 'scenes.quest_completion.content',
        headingColor: '',
        disableAnimation: true,
        glossary: [
          {
            word: 'scenes.glossary.growth_rates.word',
            definitionAsHtml: 'scenes.glossary.growth_rates.definition',
          },
        ],
        position: { left: '50%', top: '50%' },
        width: '80vw',
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
