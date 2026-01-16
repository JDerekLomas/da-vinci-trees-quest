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
      landscape: LogoTheme.DARK,
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
          src: '/assets/characters/char1mini_front.webp',
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
        background: {
          blur: 5,
          zoom: 1.04,
          pan: 822,
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
    audioUrl: '/assets/audio/bg_music.mp3',
  },

  // Scene 2 [Welcome Scene]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 1210,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.S2.S2_D1_F3_C0.heading',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 4,
          zoom: 1.04,
          pan: 1210,
        },
        width: '80.5vw',
        audioUrl: '/assets/audio/euclid-path_S2_D1_F3_C0_en.mp3',
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
      blur: 4,
      zoom: 1.05,
      pan: 1410,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D1_F6_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D1_F6_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S3.S3_D2_F7_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D2_F7_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D3_F8_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/euclid-path_S3_D3_F8_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S3.S3_D4_F9_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D4_F9_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D5_F10_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D5_F10_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S3.S3_D6_F11_C3',
        headingColor: '#238B21',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char3.webp',
          alt: 'scenes.common.theon_description',
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
        audioUrl: '/assets/audio/euclid-path_S3_D6_F11_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.geometric_necessity.word',
            definitionAsHtml: 'scenes.glossary.geometric_necessity.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D7_F12_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D7_F12_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S3.S3_D8_F13_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
        ],
        width: '56.5vw',
        audioUrl: '/assets/audio/euclid-path_S3_D8_F13_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D9_F14_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D9_F14_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S3.S3_D10_F15_C3',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/euclid-path_S3_D10_F15_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.geometric_necessity.word',
            definitionAsHtml: 'scenes.glossary.geometric_necessity.definition',
          },
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D11_F16_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D11_F16_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S3.S3_D12_F17_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        audioUrl: '/assets/audio/euclid-path_S3_D12_F17_C2_en.mp3',
      },
    ],
  },

  // Scene 4
  {
    name: 'scenesList.scene_4',
    background: {
      url: '/assets/backgrounds/bg2.webp',
      alt: 'scenes.common.bg2_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 840,
      zoom: 1.05,
      blur: 4,
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
        heading: 'scenes.S4.S4_D0_F18_C9.title',
        interactions: [
          {
            name: 'postulates',
            config: 'postulates',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S4.S4_D0_F18_C9.about.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F18_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S4.S4_D0_F18_C9.help.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F18_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S4.S4_D1_F19_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D1_F19_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S4.S4_D2_F20_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D2_F20_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D3_F21_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.postulate.word',
            definitionAsHtml: 'scenes.glossary.postulate.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S4_D3_F21_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D4_F22_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.postulates.word',
            definitionAsHtml: 'scenes.glossary.postulates.definition',
          },
          {
            word: 'scenes.glossary.proofs.word',
            definitionAsHtml: 'scenes.glossary.proofs.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S4_D4_F22_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S4.S4_D5_F23_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D5_F23_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S4.S4_D6_F24_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D6_F24_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D7_F25_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.postulates.word',
            definitionAsHtml: 'scenes.glossary.postulates.definition',
          },
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
          {
            word: 'scenes.glossary.proofs.word',
            definitionAsHtml: 'scenes.glossary.proofs.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S4_D7_F25_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S4.S4_D8_F26_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D8_F26_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S4.S4_D9_F27_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D9_F27_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S4.S4_D10_F28_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D10_F28_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S4.S4_D11_F29_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S4_D11_F29_C3_en.mp3',
      },
    ],
  },

  // Scene 5
  {
    name: 'scenesList.scene_5',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      alt: 'scenes.common.bg3_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 700,
      zoom: 1.05,
      blur: 4,
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
        heading: 'scenes.S5.S5_D0_F31_C9.title',
        interactions: [
          {
            name: 'vertical-angles',
            config: 'vertical-angles',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S5.S5_D0_F31_C9.about.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F31_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5.S5_D0_F31_C9.help.heading',
            bodyAsHtml: 'scenes.S5.S5_D0_F31_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S5.S5_D1_F31_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D1_F31_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S5.S5_D2_F32_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D2_F32_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proofs.word',
            definitionAsHtml: 'scenes.glossary.proofs.definition',
          },
        ],
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
              target: 'vertical-angles',
              step: 0,
              disabled: 'vertical-angles-step-0-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S5.S5_D3_F33_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D3_F33_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S5.S5_D4_F34_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D4_F34_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S5.S5_D5_F35_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.intersection.word',
            definitionAsHtml: 'scenes.glossary.intersection.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S5_D5_F35_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S5.S5_D6_F36_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D6_F36_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S5.S5_D7_F37_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D7_F37_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S5.S5_D8_F38_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D8_F38_C2_en.mp3',
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
              target: 'vertical-angles',
              step: 2,
              disabled: 'vertical-angles-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S5.S5_D9_F39_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D9_F39_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S5.S5_DX_FX_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S5_DX_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S5.S5_D10_F42_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D10_F42_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S5.S5_D11_F43_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D11_F43_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S5.S5_D12_F44_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D12_F44_C2_en.mp3',
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
              target: 'vertical-angles',
              step: 3,
              disabled: 'vertical-angles-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S5.S5_D13_F45_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D13_F45_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S5.S5_D14_F46_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D14_F46_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S5.S5_D15_F47_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S5_D15_F47_C3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'vertical-angles',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
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
      blur: 4,
      zoom: 1.05,
      pan: 1150,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S6.S6_D1_F49_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '61.5vw',
        audioUrl: '/assets/audio/euclid-path_S6_D1_F49_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
          {
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S6.S6_D2_F50_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '58.5vw',
        audioUrl: '/assets/audio/euclid-path_S6_D2_F50_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
      },
    ],
  },

  // Scene 7
  {
    name: 'scenesList.scene_7',
    background: {
      url: '/assets/backgrounds/bg5.webp',
      alt: 'scenes.common.bg5_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 840,
      zoom: 1.03,
      blur: 4,
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
        heading: 'scenes.S7.S7_D0_F53_C9.title',
        interactions: [
          {
            name: 'corresponding-angles',
            config: 'corresponding-angles',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S7.S7_D0_F53_C9.about.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F53_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S7.S7_D0_F53_C9.help.heading',
            bodyAsHtml: 'scenes.S7.S7_D0_F53_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D1_F53_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D1_F53_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S7.S7_D2_F55_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D2_F55_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 0,
              disabled: 'corresponding-angles-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D3_FX_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D3_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D4_F56_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D4_F56_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S7.S7_D5_F57_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        glossary: [
          {
            word: 'scenes.glossary.transversal.word',
            definitionAsHtml: 'scenes.glossary.transversal.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S7_D5_F57_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D6_F59_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D6_F59_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 1,
              disabled: 'corresponding-angles-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D7_F60_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D7_F60_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S7.S7_D8_F61_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        glossary: [
          {
            word: 'scenes.glossary.transversal.word',
            definitionAsHtml: 'scenes.glossary.transversal.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S7_D8_F61_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D9_F62_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.intersection.word',
            definitionAsHtml: 'scenes.glossary.intersection.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S7_D9_F62_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D10_F63_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D10_F63_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D11_F64_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S7_D11_F64_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D12_F65_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.intersection.word',
            definitionAsHtml: 'scenes.glossary.intersection.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S7_D12_F65_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S7.S7_D13_F66_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D13_F66_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 3,
              disabled: 'corresponding-angles-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D14_FX_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D14_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 3,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D15_F68_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D15_F68_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 4,
              disabled: 'corresponding-angles-step-4-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D16_F69_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D16_F69_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S7.S7_D17_FX_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        interactions: [
          {
            name: 'interactive-radio',
            config: 'postulate-question',
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
            word: 'scenes.glossary.postulate.word',
            definitionAsHtml: 'scenes.glossary.postulate.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S7_D17_FX_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S7.S7_D18_F70_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D18_F70_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D19_F71_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D19_F71_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S7.S7_D20_FX_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D20_FX_C1_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S7.S7_D21_F72_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S7_D20_F72_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'corresponding-angles',
              step: 4,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
    ],
  },

  // Scene 8
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 4,
      zoom: 1.05,
      pan: 1150,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D1_F74_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
          {
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        width: '61.5vw',
        audioUrl: '/assets/audio/euclid-path_S8_D1_F74_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S8.S8_D2_F75_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '58.5vw',
        audioUrl: '/assets/audio/euclid-path_S8_D2_F75_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D3_F76_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        width: '61.5vw',
        audioUrl: '/assets/audio/euclid-path_S8_D3_F76_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S8.S8_D4_F77_C3',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/euclid-path_S8_D4_F77_C3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S8.S8_D5_F78_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
        ],
        width: '61.5vw',
        audioUrl: '/assets/audio/euclid-path_S8_D5_F78_C1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S8.S8_D6_F79_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
          {
            word: 'scenes.glossary.transversal.word',
            definitionAsHtml: 'scenes.glossary.transversal.definition',
          },
        ],
        width: '58.5vw',
        audioUrl: '/assets/audio/euclid-path_S8_D6_F79_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.theon',
        bodyAsHtml: 'scenes.S8.S8_D7_F80_C3',
        headingColor: '#238B21',
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
        audioUrl: '/assets/audio/euclid-path_S8_D7_F80_C3_en.mp3',
      },
    ],
  },

  // Scene 9
  {
    name: 'scenesList.scene_9',
    background: {
      url: '/assets/backgrounds/bg5.webp',
      alt: 'scenes.common.bg5_description',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 666,
      zoom: 1.03,
      blur: 4,
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
        heading: 'scenes.S9.S9_D0_F82_C9.title',
        interactions: [
          {
            name: 'interactive-4',
            config: 'interactive-4',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S9.S9_D0_F82_C9.info.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F82_C9.info.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F82_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F82_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S9.S9_D1_F82_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 0,
              disabled: 'interactive-4-step-0-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D1_F82_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D2_F83_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 0,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D2_F83_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S9.S9_D3_F84_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        glossary: [
          {
            word: 'scenes.glossary.transversal.word',
            definitionAsHtml: 'scenes.glossary.transversal.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 1,
              disabled: 'interactive-4-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D3_F84_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D4_F85_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S9_D4_F85_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S9.S9_D5_F86_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.interior_region.word',
            definitionAsHtml: 'scenes.glossary.interior_region.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D5_F86_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D6_F87_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.transversal.word',
            definitionAsHtml: 'scenes.glossary.transversal.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D6_F87_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S9.S9_D7_F88_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S9_D7_F88_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S9.S9_D8_F89_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D8_F89_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D9_F90_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D9_F90_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S9.S9_D10_F91_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 2,
              disabled: 'interactive-4-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D10_F91_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S9.S9_D11_F92_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        glossary: [
          {
            word: 'scenes.glossary.intersection.word',
            definitionAsHtml: 'scenes.glossary.intersection.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D11_F92_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D12_F93_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S9_D12_F93_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S9.S9_D13_F94_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S9_D13_F94_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D14_F95_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D14_F95_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S9.S9_D15_F96_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-4',
              step: 3,
              disabled: 'interactive-4-step-3-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D15_F96_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D16_F97_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.alternate_interior_angles.word',
            definitionAsHtml: 'scenes.glossary.alternate_interior_angles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D16_F97_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S9.S9_D17_F98_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.alternate_interior_angles.word',
            definitionAsHtml: 'scenes.glossary.alternate_interior_angles.definition',
          },
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D17_F98_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S9.S9_D18_F99_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.alternate_interior_angles.word',
            definitionAsHtml: 'scenes.glossary.alternate_interior_angles.definition',
          },
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D18_F99_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S9.S9_D19_F100_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.alternate_interior_angles.word',
            definitionAsHtml: 'scenes.glossary.alternate_interior_angles.definition',
          },
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S9_D19_F100_C2_en.mp3',
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
      blur: 4,
      zoom: 1.05,
      pan: 1020,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.hypatia',
        bodyAsHtml: 'scenes.S10.S10_D1_F104_C2',
        headingColor: '#A22DDC',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
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
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
          {
            word: 'scenes.glossary.alternate_interior_angles.word',
            definitionAsHtml: 'scenes.glossary.alternate_interior_angles.definition',
          },
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        width: '58.5vw',
        audioUrl: '/assets/audio/euclid-path_S10_D1_F104_C2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S10.S10_D2_F105_C1',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
        ],
        width: '61.5vw',
        audioUrl: '/assets/audio/euclid-path_S10_D2_F105_C1_en.mp3',
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
      pan: 840,
      zoom: 1.03,
      blur: 4,
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
        heading: 'scenes.S11.S11_D0_F108_C9.title',
        interactions: [
          {
            name: 'triangle-angle-sum',
            config: 'triangle-angle-sum',
            enableStateExchange: true,
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.S11.S11_D0_F108_C9.about.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F108_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_F108_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F108_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S11.S11_D1_F108_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        glossary: [
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D1_F108_C3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S11.S11_D2_F109_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D2_F109_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              disabled: 'triangle-angle-sum-add-point-a-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S11.S11_D3_F110_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        glossary: [
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D3_F110_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              disabled: 'triangle-angle-sum-add-point-b-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S11.S11_DX1_FX_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S11_DX1_FX_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              disabled: 'triangle-angle-sum-add-point-b-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S11.S11_D4_F111_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.postulate.word',
            definitionAsHtml: 'scenes.glossary.postulate.definition',
          },
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D4_F111_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              disabled: 'triangle-angle-sum-add-point-c-completion',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S11.S11_D5_F112_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S11_D5_F112_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proofs.word',
            definitionAsHtml: 'scenes.glossary.proofs.definition',
          },
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S11.S11_D6_F113_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.alternate_interior_angles.word',
            definitionAsHtml: 'scenes.glossary.alternate_interior_angles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D6_F113_C2_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              step: 2,
              disabled: 'triangle-angle-sum-step-2-completion',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S11.S11_D7_F114_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.transversal.word',
            definitionAsHtml: 'scenes.glossary.transversal.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D7_F114_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S11.S11_D8_F115_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S11_D8_F115_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              step: {
                proofStep: 1,
              },
              disabled: 'triangle-angle-sum-proof-step-1-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S11.S11_D9_F116_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D9_F116_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.theon',
        body: 'scenes.S11.S11_D10_FX_C3',
        headingColor: '#238B21',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char3mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ACE7AA',
        },
        audioUrl: '/assets/audio/euclid-path_S11_D10_FX_C3_en.mp3',
        events: [
          {
            payload: {
              target: 'triangle-angle-sum',
              step: {
                proofStep: 2,
              },
              disabled: 'triangle-angle-sum-proof-step-2-completion',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S11.S11_D11_FX_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        audioUrl: '/assets/audio/euclid-path_S11_D11_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S11.S11_D12_FX_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D12_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S11.S11_D13_FX_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D13_FX_C1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.hypatia',
        body: 'scenes.S11.S11_D14_FX_C2',
        headingColor: '#A22DDC',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        audioUrl: '/assets/audio/euclid-path_S11_D14_FX_C2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.akila',
        body: 'scenes.S11.S11_D15_FX_C1',
        headingColor: '#EB0000',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S11_D15_FX_C1_en.mp3',
      },
    ],
  },

  // Scene 12
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg6_description',
      url: '/assets/backgrounds/bg6.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 884,
      zoom: 1.05,
      blur: 5,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.theon',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S12.S12_D1_F123_C3',
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
        audioUrl: '/assets/audio/euclid-path_S12_D1_F123_C3_en.mp3',
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S12.S12_D2_F124_C1',
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
        glossary: [
          {
            word: 'scenes.glossary.corresponding_angles.word',
            definitionAsHtml: 'scenes.glossary.corresponding_angles.definition',
          },
          {
            word: 'scenes.glossary.alternate_interior_angles.word',
            definitionAsHtml: 'scenes.glossary.alternate_interior_angles.definition',
          },
          {
            word: 'scenes.glossary.vertical_angles.word',
            definitionAsHtml: 'scenes.glossary.vertical_angles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S12_D2_F124_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.hypatia',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S12.S12_D3_F125_C2',
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
            word: 'scenes.glossary.postulates.word',
            definitionAsHtml: 'scenes.glossary.postulates.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S12_D3_F125_C2_en.mp3',
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S12.S12_D4_F126_C1',
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
        glossary: [
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
        audioUrl: '/assets/audio/euclid-path_S12_D4_F126_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.theon',
        headingColor: '#005F20',
        bodyAsHtml: 'scenes.S12.S12_D5_F127_C3',
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
        audioUrl: '/assets/audio/euclid-path_S12_D5_F127_C3_en.mp3',
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S12.S12_D6_F128_C1',
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
        audioUrl: '/assets/audio/euclid-path_S12_D6_F128_C1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.hypatia',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S12.S12_D7_F129_C2',
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
        audioUrl: '/assets/audio/euclid-path_S12_D7_F129_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
          {
            word: 'scenes.glossary.triangles.word',
            definitionAsHtml: 'scenes.glossary.triangles.definition',
          },
        ],
      },
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.akila',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S12.S12_D8_F130_C1',
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
        audioUrl: '/assets/audio/euclid-path_S12_D8_F130_C1_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.proof.word',
            definitionAsHtml: 'scenes.glossary.proof.definition',
          },
          {
            word: 'scenes.glossary.triangle.word',
            definitionAsHtml: 'scenes.glossary.triangle.definition',
          },
        ],
      },
    ],
  },

  // End Screen
  {
    name: 'scenesList.scene_13',
    background: {
      url: '/assets/backgrounds/bg6.webp',
      alt: 'scenes.common.bg6_description',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.2,
      pan: 1090,
      zoom: 1.05,
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
            word: 'scenes.glossary.inverse_square_law.word',
            definitionAsHtml: 'scenes.glossary.inverse_square_law.definition',
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
