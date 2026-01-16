import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';
export const sceneData: SceneData[] = [
  // Start Screen
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 900,
      blur: 5,
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
          src: '/assets/characters/char1mini.webp',
          alt: 'scenes.common.james_description',
          size: 'chat-bubble-square',
          background: '#C0DEFF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        glossary: [],
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
      pan: 800,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.S2.S2_D1_F3_C0.heading',
        bodyAsHtml: 'scenes.S2.S2_D1_F3_C0.body',
        audioUrl: '/assets/audio/journey-through-waves_S2_D1_F3_C0_en.mp3',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        glossary: [],
        // audioUrl: '/assets/audio/circles-engineering-the-depth_S2_D1_F3_C0_en.mp3',
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
      pan: 800,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D1_F4_C1',
        audioUrl: '/assets/audio/journey-through-waves_S3_D1_F4_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D2_F5_C2',
        audioUrl: '/assets/audio/journey-through-waves_S3_D2_F5_C2_en.mp3',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.sophie_description',
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
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D3_F6_C1',
        audioUrl: '/assets/audio/journey-through-waves_S3_D3_F6_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S3.S3_D4_F7_C2',
        audioUrl: '/assets/audio/journey-through-waves_S3_D4_F7_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S3.S3_D5_F8_C1',
        audioUrl: '/assets/audio/journey-through-waves_S3_D5_F8_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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

  // Scene 3X
  {
    name: 'scenesList.scene_3x',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1170,
      zoom: 1.1,
      blur: 6,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S3X.S3X_D0_F9_C9.title',
        interactions: [
          {
            name: 'sohcahtoa-visualizer',
            config: 'sohcahtoa-visualizer',
          },
        ],
        about: [
          {
            heading: 'scenes.S3X.S3X_D0_F9_C9.about.heading',
            bodyAsHtml: 'scenes.S3X.S3X_D0_F9_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S3X.S3X_D0_F9_C9.help.heading',
            bodyAsHtml: 'scenes.S3X.S3X_D0_F9_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S3X.S3X_D1_F9_C2',
        audioUrl: '/assets/audio/journey-through-waves_S3X_D1_F9_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S3X.S3X_D2_F10_C1',
        audioUrl: '/assets/audio/journey-through-waves_S3X_D2_F10_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S3X.S3X_D3_F11_C2',
        audioUrl: '/assets/audio/journey-through-waves_S3X_D3_F11_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.sine-wave.word',
            definitionAsHtml: 'scenes.glossary.sine-wave.definition',
          },
          {
            word: 'scenes.glossary.sohcahtoa.word',
            definitionAsHtml: 'scenes.glossary.sohcahtoa.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S3X.S3X_D4_F12_C1',
        audioUrl: '/assets/audio/journey-through-waves_S3X_D4_F12_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S3X.S3X_D5_F13_C2',
        audioUrl: '/assets/audio/journey-through-waves_S3X_D5_F13_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
    ],
  },

  // Scene 4
  {
    name: 'scenesList.scene_4',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1170,
      zoom: 1.1,
      blur: 6,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S4.S4_D0_F12_C9.title',
        interactions: [
          {
            name: 'circle-to-wave-visualizer',
            config: 'circle-to-wave-visualizer',
          },
        ],
        about: [
          {
            heading: 'scenes.S4.S4_D0_F12_C9.about.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F12_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S4.S4_D0_F12_C9.help.heading',
            bodyAsHtml: 'scenes.S4.S4_D0_F12_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D1_F12_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D1_F12_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D2_F13_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D2_F13_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D3_F14_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D3_F14_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.sine-wave.word',
            definitionAsHtml: 'scenes.glossary.sine-wave.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D4_F15_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D4_F15_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'value-of-sine-question',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D5_F16_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D5_F16_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D6_F17_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D6_F17_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.unit-circle.word',
            definitionAsHtml: 'scenes.glossary.unit-circle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D7_F18_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D7_F18_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D8_F19_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D8_F19_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.radians.word',
            definitionAsHtml: 'scenes.glossary.radians.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D9_F20_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D9_F20_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D10_F21_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D10_F21_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.radians.word',
            definitionAsHtml: 'scenes.glossary.radians.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D11_F22_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D11_F22_C1_en.mp3',
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
            name: 'interactive-radio',
            config: 'wave-cycle-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.radians.word',
            definitionAsHtml: 'scenes.glossary.radians.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D12_F23_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D12_F23_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.radians.word',
            definitionAsHtml: 'scenes.glossary.radians.definition',
          },
          {
            word: 'scenes.glossary.unit-circle.word',
            definitionAsHtml: 'scenes.glossary.unit-circle.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D13_F24_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D13_F24_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.radians.word',
            definitionAsHtml: 'scenes.glossary.radians.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D14_F25_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D14_F25_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'maximum-value-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.sine-wave.word',
            definitionAsHtml: 'scenes.glossary.sine-wave.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D15_F26_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D15_F26_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D16_F27_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D16_F27_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D17_F28_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D17_F28_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D18_F29_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D18_F29_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S4.S4_D19_F30_C1',
        audioUrl: '/assets/audio/journey-through-waves_S4_D19_F30_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S4.S4_D20_F31_C2',
        audioUrl: '/assets/audio/journey-through-waves_S4_D20_F31_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
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
      blur: 6,
      pan: 1050,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S5.S5_D1_F35_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5_D1_F35_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S5.S5_D2_F36_C1',
        audioUrl: '/assets/audio/journey-through-waves_S5_D2_F36_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S5.S5_D3_F37_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5_D3_F37_C2_en.mp3',
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
        glossary: [
          { word: 'scenes.glossary.octave.word', definitionAsHtml: 'scenes.glossary.octave.definition' },
          { word: 'scenes.glossary.scale.word', definitionAsHtml: 'scenes.glossary.scale.definition' },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S5.S5_D4_F38_C1',
        audioUrl: '/assets/audio/journey-through-waves_S5_D4_F38_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [{ word: 'scenes.glossary.octave.word', definitionAsHtml: 'scenes.glossary.octave.definition' }],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S5.S5_D5_F39_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5_D5_F39_C2_en.mp3',
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
        glossary: [{ word: 'scenes.glossary.scale.word', definitionAsHtml: 'scenes.glossary.scale.definition' }],
      },
    ],
  },

  // Scene 5X
  {
    name: 'scenesList.scene_5x',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1170,
      zoom: 1.1,
      blur: 6,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S5X.S5X_D0_F39_C9.title',
        interactions: [
          {
            name: 'frequency-ratio-explorer',
            config: 'frequency-ratio-explorer',
          },
        ],
        about: [
          {
            heading: 'scenes.S5X.S5X_D0_F39_C9.about.heading',
            bodyAsHtml: 'scenes.S5X.S5X_D0_F39_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S5X.S5X_D0_F39_C9.help.heading',
            bodyAsHtml: 'scenes.S5X.S5X_D0_F39_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
        glossary: [
          { word: 'scenes.glossary.octave.word', definitionAsHtml: 'scenes.glossary.octave.definition' },
          { word: 'scenes.glossary.octaves.word', definitionAsHtml: 'scenes.glossary.octaves.definition' },
          { word: 'scenes.glossary.scale.word', definitionAsHtml: 'scenes.glossary.scale.definition' },
          { word: 'scenes.glossary.scales.word', definitionAsHtml: 'scenes.glossary.scales.definition' },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S5X.S5X_D1_F40_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D1_F40_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [{ word: 'scenes.glossary.octave.word', definitionAsHtml: 'scenes.glossary.octave.definition' }],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S5X.S5X_D2_F41_C1',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D2_F41_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [{ word: 'scenes.glossary.octave.word', definitionAsHtml: 'scenes.glossary.octave.definition' }],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S5X.S5X_D3_F42_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D3_F42_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S5X.S5X_D4_F43_C1',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D4_F43_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S5X.S5X_D5_F44_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D5_F44_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S5X.S5X_D6_F45_C1',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D6_F45_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S5X.S5X_D7_F46_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D7_F46_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.dissonance.word',
            definitionAsHtml: 'scenes.glossary.dissonance.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S5X.S5X_D8_F47_C1',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D8_F47_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S5X.S5X_D9_F48_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D9_F48_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          { word: 'scenes.glossary.octaves.word', definitionAsHtml: 'scenes.glossary.octaves.definition' },
          { word: 'scenes.glossary.consonance.word', definitionAsHtml: 'scenes.glossary.consonance.definition' },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S5X.S5X_D10_F49_C1',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D10_F49_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S5X.S5X_D11_F50_C2',
        audioUrl: '/assets/audio/journey-through-waves_S5X_D11_F50_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
    ],
  },

  // Scene 6
  {
    name: 'scenesList.scene_6',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1570,
      zoom: 1.1,
      blur: 6,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S6.S6_D0_F44_C9.title',
        interactions: [
          {
            name: 'harmonic-series-builder',
            config: 'harmonic-series-builder',
          },
        ],
        about: [
          {
            heading: 'scenes.S6.S6_D0_F44_C9.about.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F44_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S6.S6_D0_F44_C9.help.heading',
            bodyAsHtml: 'scenes.S6.S6_D0_F44_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S6.S6_D1_F44_C2',
        audioUrl: '/assets/audio/journey-through-waves_S6_D1_F44_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S6.S6_D2_F45_C1',
        audioUrl: '/assets/audio/journey-through-waves_S6_D2_F45_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S6.S6_D3_F46_C2',
        audioUrl: '/assets/audio/journey-through-waves_S6_D3_F46_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'frequency-ratio-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.harmonic.word',
            definitionAsHtml: 'scenes.glossary.harmonic.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S6.S6_D4_F47_C1',
        audioUrl: '/assets/audio/journey-through-waves_S6_D4_F47_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.harmonic.word',
            definitionAsHtml: 'scenes.glossary.harmonic.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S6.S6_D5_F48_C2',
        audioUrl: '/assets/audio/journey-through-waves_S6_D5_F48_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'third-harmonic-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.fundamental-frequency.word',
            definitionAsHtml: 'scenes.glossary.fundamental-frequency.definition',
          },
          {
            word: 'scenes.glossary.harmonic.word',
            definitionAsHtml: 'scenes.glossary.harmonic.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S6.S6_D6_F49_C1',
        audioUrl: '/assets/audio/journey-through-waves_S6_D6_F49_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.harmonic.word',
            definitionAsHtml: 'scenes.glossary.harmonic.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S6.S6_D7_F50_C2',
        audioUrl: '/assets/audio/journey-through-waves_S6_D7_F50_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        events: [
          {
            payload: {
              target: 'harmonic-series-builder',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S6.S6_D8_F51_C1',
        audioUrl: '/assets/audio/journey-through-waves_S6_D8_F51_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S6.S6_D9_F52_C2',
        audioUrl: '/assets/audio/journey-through-waves_S6_D9_F52_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S6.S6_D10_F53_C2',
        audioUrl: '/assets/audio/journey-through-waves_S6_D10_F53_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.timbre.word',
            definitionAsHtml: 'scenes.glossary.timbre.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S6.S6_D11_F54_C1',
        audioUrl: '/assets/audio/journey-through-waves_S6_D11_F54_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S6.S6_D12_F55_C2',
        audioUrl: '/assets/audio/journey-through-waves_S6_D12_F55_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.fundamental-frequency.word',
            definitionAsHtml: 'scenes.glossary.fundamental-frequency.definition',
          },
        ],
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
      blur: 6,
      pan: 1090,
      zoom: 1.0,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D1_F58_C1',
        audioUrl: '/assets/audio/journey-through-waves_S7_D1_F58_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S7.S7_D2_F59_C2',
        audioUrl: '/assets/audio/journey-through-waves_S7_D2_F59_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S7.S7_D3_F60_C1',
        audioUrl: '/assets/audio/journey-through-waves_S7_D3_F60_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S7.S7_D4_F61_C2',
        audioUrl: '/assets/audio/journey-through-waves_S7_D4_F61_C2_en.mp3',
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
      },
    ],
  },

  // Scene 8

  {
    name: 'scenesList.scene_8',
    background: {
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1170,
      zoom: 1.05,
      blur: 6,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S8.S8_D0_F62_C9.title',
        interactions: [
          {
            name: 'beat-frequency-demo',
            config: 'beat-frequency-demo',
          },
        ],
        about: [
          {
            heading: 'scenes.S8.S8_D0_F62_C9.about.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F62_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S8.S8_D0_F62_C9.help.heading',
            bodyAsHtml: 'scenes.S8.S8_D0_F62_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D1_F62_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D1_F62_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S8.S8_D2_F63_C1',
        audioUrl: '/assets/audio/journey-through-waves_S8_D2_F63_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D3_F64_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D3_F64_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
        glossary: [
          {
            word: 'scenes.glossary.beat-frequency.word',
            definitionAsHtml: 'scenes.glossary.beat-frequency.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D4_F65_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D4_F65_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S8.S8_D5_F66_C1',
        audioUrl: '/assets/audio/journey-through-waves_S8_D5_F66_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D6_F67_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D6_F67_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'beat-frequency-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.beat-frequency.word',
            definitionAsHtml: 'scenes.glossary.beat-frequency.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S8.S8_D7_F68_C1',
        audioUrl: '/assets/audio/journey-through-waves_S8_D7_F68_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D8_F69_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D8_F69_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'amplitude-combine-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.amplitude.word',
            definitionAsHtml: 'scenes.glossary.amplitude.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S8.S8_D9_F70_C1',
        audioUrl: '/assets/audio/journey-through-waves_S8_D9_F70_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D10_F71_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D10_F71_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'frequency-difference-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.beat-frequency.word',
            definitionAsHtml: 'scenes.glossary.beat-frequency.definition',
          },
          {
            word: 'scenes.glossary.constructive-interference.word',
            definitionAsHtml: 'scenes.glossary.constructive-interference.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S8.S8_D11_F72_C1',
        audioUrl: '/assets/audio/journey-through-waves_S8_D11_F72_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D12_F73_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D12_F73_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S8.S8_D13_F74_C1',
        audioUrl: '/assets/audio/journey-through-waves_S8_D13_F74_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S8.S8_D14_F75_C2',
        audioUrl: '/assets/audio/journey-through-waves_S8_D14_F75_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
    ],
  },

  // Scene 9

  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 650,
      zoom: 1.1,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S9.S9_D1_F79_C1',
        audioUrl: '/assets/audio/journey-through-waves_S9_D1_F79_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        glossary: [
          {
            word: 'scenes.glossary.sine-wave.word',
            definitionAsHtml: 'scenes.glossary.sine-wave.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S9.S9_D2_F80_C2',
        audioUrl: '/assets/audio/journey-through-waves_S9_D2_F80_C2_en.mp3',
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
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.james',
        headingColor: '#006BE0',
        bodyAsHtml: 'scenes.S9.S9_D3_F81_C1',
        audioUrl: '/assets/audio/journey-through-waves_S9_D3_F81_C1_en.mp3',
        position: {
          top: '50.7%',
          left: '38%',
        },
        avatar: {
          src: '/assets/characters/char1.webp',
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
        heading: 'scenes.common.sophie',
        headingColor: '#EB0000',
        bodyAsHtml: 'scenes.S9.S9_D4_F82_C2',
        audioUrl: '/assets/audio/journey-through-waves_S9_D4_F82_C2_en.mp3',
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
      },
    ],
  },

  // Scene 10

  {
    name: 'scenesList.scene_10',
    background: {
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1030,
      zoom: 1,
      blur: 6,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        side: 'left',
        skipNavigation: true,
        headingColor: '#333333',
        isPrimaryHeading: true,
        heading: 'scenes.S10.S10_D0_F83_C9.title',
        interactions: [
          {
            name: 'fourier-visualization',
            config: 'fourier-visualization',
          },
        ],
        about: [
          {
            heading: 'scenes.S10.S10_D0_F83_C9.about.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F83_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S10.S10_D0_F83_C9.help.heading',
            bodyAsHtml: 'scenes.S10.S10_D0_F83_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S10.S10_D1_F84_C2',
        audioUrl: '/assets/audio/journey-through-waves_S10_D1_F84_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S10.S10_D2_F85_C1',
        audioUrl: '/assets/audio/journey-through-waves_S10_D2_F85_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.harmonic.word',
            definitionAsHtml: 'scenes.glossary.harmonic.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S10.S10_D3_F86_C2',
        audioUrl: '/assets/audio/journey-through-waves_S10_D3_F86_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'even-numbered-harmonic-question',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S10.S10_D4_F87_C1',
        audioUrl: '/assets/audio/journey-through-waves_S10_D4_F87_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S10.S10_D5_F88_C2',
        audioUrl: '/assets/audio/journey-through-waves_S10_D5_F88_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
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
            config: 'forth-harmonic-question',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.fundamental-frequency.word',
            definitionAsHtml: 'scenes.glossary.fundamental-frequency.definition',
          },
          {
            word: 'scenes.glossary.harmonic.word',
            definitionAsHtml: 'scenes.glossary.harmonic.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        body: 'scenes.S10.S10_D6_F89_C1',
        audioUrl: '/assets/audio/journey-through-waves_S10_D6_F89_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#C0DEFF',
        },
        glossary: [
          {
            word: 'scenes.glossary.harmonic.word',
            definitionAsHtml: 'scenes.glossary.harmonic.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.sophie',
        body: 'scenes.S10.S10_D7_F90_C2',
        audioUrl: '/assets/audio/journey-through-waves_S10_D7_F90_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#FF9999',
        },
      },
    ],
  },

  // Scene 11

  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      pan: 840,
      zoom: 1.02,
      blur: 5,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        heading: 'scenes.common.james',
        bodyAsHtml: 'scenes.S11.S11_D1_F94_C1',
        audioUrl: '/assets/audio/journey-through-waves_S11_D1_F94_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
      {
        side: 'left',
        heading: 'scenes.common.sophie',
        bodyAsHtml: 'scenes.S11.S11_D2_F95_C2',
        audioUrl: '/assets/audio/journey-through-waves_S11_D2_F95_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        bodyAsHtml: 'scenes.S11.S11_D3_F96_C1',
        audioUrl: '/assets/audio/journey-through-waves_S11_D3_F96_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
      {
        side: 'left',
        heading: 'scenes.common.sophie',
        bodyAsHtml: 'scenes.S11.S11_D4_F97_C2',
        audioUrl: '/assets/audio/journey-through-waves_S11_D4_F97_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        bodyAsHtml: 'scenes.S11.S11_D5_F98_C1',
        audioUrl: '/assets/audio/journey-through-waves_S11_D5_F98_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
      {
        side: 'left',
        heading: 'scenes.common.sophie',
        bodyAsHtml: 'scenes.S11.S11_D6_F99_C2',
        audioUrl: '/assets/audio/journey-through-waves_S11_D6_F99_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.james',
        bodyAsHtml: 'scenes.S11.S11_D7_F100_C1',
        audioUrl: '/assets/audio/journey-through-waves_S11_D7_F100_C1_en.mp3',
        headingColor: '#006BE0',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
      {
        side: 'left',
        heading: 'scenes.common.sophie',
        bodyAsHtml: 'scenes.S11.S11_D8_F101_C2',
        audioUrl: '/assets/audio/journey-through-waves_S11_D8_F101_C2_en.mp3',
        headingColor: '#EB0000',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
      },
    ],
  },

  // End Scene
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 11,
      zoom: 1.04,
      pan: 1100,
    },
    // audioUrl: '/assets/audio/bgmusic.mp3',
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
          blur: 16,
        },
      },
    ],
  },
];
