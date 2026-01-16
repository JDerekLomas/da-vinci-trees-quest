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
      pan: 890,
      zoom: 1.04,
    },
    logoTheme: {
      landscape: LogoTheme.DARK,
      portrait: LogoTheme.DARK,
    },
    type: 'one-at-a-time',
    audioUrl: './audio/bgmusic.mp3',
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
          alt: 'scenes.common.emery_description',
          size: 'chat-bubble-square',
          background: '#F6E4FF',
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
          {
            word: 'scenes.glossary.melodies.word',
            definitionAsHtml: 'scenes.glossary.melodies.definition',
          },
          {
            word: 'scenes.glossary.harmonies.word',
            definitionAsHtml: 'scenes.glossary.harmonies.definition',
          },
          {
            word: 'scenes.glossary.equal_temperament.word',
            definitionAsHtml: 'scenes.glossary.equal_temperament.definition',
          },
        ],
      },
    ],
  },

  // Scene 2 [Welcome Scene]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1,
      pan: 1055,
      blur: 3,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.S2.S2_D1_F4_C2.heading',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S2.S2_D1_F4_C2.body',
        headingColor: '#333333',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        width: '80.5vw',
        audioUrl: './audio/musical-scale_S2_D1_F4_C2_en.mp3',
      },
    ],
  },

  // Scene 3 [Introductory Dialogues]
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1000,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D1_F12_C2',
        position: {
          top: '50.7%',
          left: '63.5%',
        },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.noelle_description',
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
        audioUrl: './audio/musical-scale_S3_D1_F12_C2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D2_F13_C1',
        audioUrl: './audio/musical-scale_S3_D2_F13_C1_en.mp3',
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
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D3_F14_C2',
        audioUrl: './audio/musical-scale_S3_D3_F14_C2_en.mp3',
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
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D4_F15_C1',
        audioUrl: './audio/musical-scale_S3_D4_F15_C1_en.mp3',
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
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D5_F16_C2',
        audioUrl: './audio/musical-scale_S3_D5_F16_C2_en.mp3',
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
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D6_F17_C1',
        audioUrl: './audio/musical-scale_S3_D6_F17_C1_en.mp3',
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
            word: 'scenes.glossary.pitch.word',
            definitionAsHtml: 'scenes.glossary.pitch.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D7_F18_C2',
        audioUrl: './audio/musical-scale_S3_D7_F18_C2_en.mp3',
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
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D8_F19_C1',
        audioUrl: './audio/musical-scale_S3_D8_F19_C1_en.mp3',
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
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S3.S3_D9_F20_C2',
        audioUrl: './audio/musical-scale_S3_D9_F20_C2_en.mp3',
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
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
          {
            word: 'scenes.glossary.pitch.word',
            definitionAsHtml: 'scenes.glossary.pitch.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S3.S3_D10_F21_C1',
        audioUrl: './audio/musical-scale_S3_D10_F21_C1_en.mp3',
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

  // Scene 4 [Pre Interactive - 1 Dialogues]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 465,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D1_F22_C2',
        audioUrl: './audio/musical-scale_S4_D1_F22_C2_en.mp3',
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
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D2_F23_C1',
        audioUrl: './audio/musical-scale_S4_D2_F23_C1_en.mp3',
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
            word: 'scenes.glossary.melodies.word',
            definitionAsHtml: 'scenes.glossary.melodies.definition',
          },
          {
            word: 'scenes.glossary.harmonies.word',
            definitionAsHtml: 'scenes.glossary.harmonies.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D3_F24_C2',
        audioUrl: './audio/musical-scale_S4_D3_F24_C2_en.mp3',
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
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.harmonies.word',
            definitionAsHtml: 'scenes.glossary.harmonies.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S4.S4_D4_F25_C1',
        audioUrl: './audio/musical-scale_S4_D4_F25_C1_en.mp3',
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
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S4.S4_D5_F26_C2',
        audioUrl: './audio/musical-scale_S4_D5_F26_C2_en.mp3',
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
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
        ],
      },
    ],
  },

  // Scene 5 [Interactive - Octaves and Fifths]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1000,
      zoom: 1.01,
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
        heading: 'scenes.common.noelle',
        body: 'scenes.S5.S5_D1_F28_C2',
        audioUrl: './audio/musical-scale_S5_D1_F28_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S5.S5_D2_F29_C2',
        audioUrl: './audio/musical-scale_S5_D2_F29_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 1,
              disabled: 'interactive-1-disable-playsequence',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
          {
            word: 'scenes.glossary.pitch.word',
            definitionAsHtml: 'scenes.glossary.pitch.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S5.S5_D3_F30_C1',
        audioUrl: './audio/musical-scale_S5_D3_F30_C1_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S5.S5_D4_F31_C2',
        audioUrl: './audio/musical-scale_S5_D4_F31_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S5.S5_D5_F32_C1',
        audioUrl: './audio/musical-scale_S5_D5_F32_C1_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S5.S5_D6_F33_C2',
        audioUrl: './audio/musical-scale_S5_D6_F33_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-1',
              step: 3,
              disabled: 'interactive-1-disable-perfectfifth',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
          {
            word: 'scenes.glossary.harmonies.word',
            definitionAsHtml: 'scenes.glossary.harmonies.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S5.S5_D7_F34_C1',
        audioUrl: './audio/musical-scale_S5_D7_F34_C1_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S5.S5_D8_F35_C2',
        audioUrl: './audio/musical-scale_S5_D8_F35_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.harmonies.word',
            definitionAsHtml: 'scenes.glossary.harmonies.definition',
          },
        ],
      },
    ],
  },

  // Scene 6 [Pre Interactive - 2 Dialogues]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1280,
      zoom: 1.03,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S6.S6_D1_F36_C1',
        audioUrl: './audio/musical-scale_S6_D1_F36_C1_en.mp3',
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
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D2_F37_C2',
        audioUrl: './audio/musical-scale_S6_D2_F37_C2_en.mp3',
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
          {
            word: 'scenes.glossary.semitone.word',
            definitionAsHtml: 'scenes.glossary.semitone.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S6.S6_D3_F38_C1',
        audioUrl: './audio/musical-scale_S6_D3_F38_C1_en.mp3',
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
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S6.S6_D4_F39_C2',
        audioUrl: './audio/musical-scale_S6_D4_F39_C2_en.mp3',
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

  // Scene 8 [Pre - Interactive 3 Dialogues]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1280,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S8.S8_D1_F58_C1',
        audioUrl: './audio/musical-scale_S8_D1_F58_C1_en.mp3',
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
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
          {
            word: 'scenes.glossary.semitone.word',
            definitionAsHtml: 'scenes.glossary.semitone.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D2_FX_C2',
        audioUrl: './audio/musical-scale_S8_D2_FX_C2_en.mp3',
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
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D3_FX_C2',
        audioUrl: './audio/musical-scale_S8_D3_FX_C2_en.mp3',
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
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S8.S8_D4_FX_C1',
        audioUrl: './audio/musical-scale_S8_D4_FX_C1_en.mp3',
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
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D5_F59_C2',
        audioUrl: './audio/musical-scale_S8_D5_F59_C2_en.mp3',
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
          {
            word: 'scenes.glossary.semitone.word',
            definitionAsHtml: 'scenes.glossary.semitone.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S8.S8_D6_F60_C1',
        audioUrl: './audio/musical-scale_S8_D6_F60_C1_en.mp3',
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
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D7_F61_C2',
        audioUrl: './audio/musical-scale_S8_D7_F61_C2_en.mp3',
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
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S8.S8_D8_F62_C1',
        audioUrl: './audio/musical-scale_S8_D8_F62_C1_en.mp3',
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
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S8.S8_D9_F63_C2',
        audioUrl: './audio/musical-scale_S8_D9_F63_C2_en.mp3',
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

  // Scene 9 [Interactive - 3: Beyond the Octave]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 970,
      zoom: 1.05,
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
        heading: 'scenes.S9.S9_D0_F64_C9.title',
        interactions: [
          {
            name: 'interactive-3',
            config: 'interactive-3',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S9.S9_D0_F64_C9.about.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F64_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S9.S9_D0_F64_C9.help.heading',
            bodyAsHtml: 'scenes.S9.S9_D0_F64_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D1_FX_C2',
        audioUrl: './audio/musical-scale_S9_D1_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
              baseValue: 2,
              disabled: 'interactive-3-disable-base-2',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S9.S9_D2_FX_C1',
        audioUrl: './audio/musical-scale_S9_D2_FX_C1_en.mp3',
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
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D3_FX_C2',
        audioUrl: './audio/musical-scale_S9_D3_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D4_FX_C2',
        audioUrl: './audio/musical-scale_S9_D4_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D5_FX_C2',
        audioUrl: './audio/musical-scale_S9_D5_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
              baseValue: 1.5,
              disabled: 'interactive-3-disable-base-1-point-5',
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S9.S9_D6_FX_C1',
        audioUrl: './audio/musical-scale_S9_D6_FX_C1_en.mp3',
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
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D7_FX_C2',
        audioUrl: './audio/musical-scale_S9_D7_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.melodies.word',
            definitionAsHtml: 'scenes.glossary.melodies.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D8_FX_C2',
        audioUrl: './audio/musical-scale_S9_D8_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D10_FX_C2',
        audioUrl: './audio/musical-scale_S9_D10_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S9.S9_D11_FX_C1',
        audioUrl: './audio/musical-scale_S9_D11_FX_C1_en.mp3',
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
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D12_FX_C2',
        audioUrl: './audio/musical-scale_S9_D12_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D13_FX_C2',
        audioUrl: './audio/musical-scale_S9_D13_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D14_FX_C2',
        audioUrl: './audio/musical-scale_S9_D14_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D15_FX_C2',
        audioUrl: './audio/musical-scale_S9_D15_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 1,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D16_FX_C2',
        audioUrl: './audio/musical-scale_S9_D16_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.equal_temperament.word',
            definitionAsHtml: 'scenes.glossary.equal_temperament.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S9.S9_D17_FX_C1',
        audioUrl: './audio/musical-scale_S9_D17_FX_C1_en.mp3',
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
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D18_FX_C2',
        audioUrl: './audio/musical-scale_S9_D18_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S9.S9_D19_FX_C1',
        audioUrl: './audio/musical-scale_S9_D19_FX_C1_en.mp3',
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
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D20_FX_C2',
        audioUrl: './audio/musical-scale_S9_D20_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'third-step-frequency-question',
          },
        ],
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
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
        heading: 'scenes.common.emery',
        body: 'scenes.S9.S9_D21_FX_C1',
        audioUrl: './audio/musical-scale_S9_D21_FX_C1_en.mp3',
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
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
          {
            word: 'scenes.glossary.octave.word',
            definitionAsHtml: 'scenes.glossary.octave.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S9.S9_D22_FX_C2',
        audioUrl: './audio/musical-scale_S9_D22_FX_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        events: [
          {
            payload: {
              target: 'interactive-3',
              step: 2,
            },
            triggers: ['on-next', 'on-back'],
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.equal_temperament.word',
            definitionAsHtml: 'scenes.glossary.equal_temperament.definition',
          },
        ],
      },
    ],
  },

  // Scene 10 [Post Interactive - 3 Dialogues]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 825,
      zoom: 1.01,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D1_F72_C2',
        audioUrl: './audio/musical-scale_S10_D1_F72_C2_en.mp3',
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
          {
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D2_F73_C2',
        audioUrl: './audio/musical-scale_S10_D2_F73_C2_en.mp3',
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
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.emery',
        headingColor: '#A22DDC',
        bodyAsHtml: 'scenes.S10.S10_D3_F74_C1',
        audioUrl: './audio/musical-scale_S10_D3_F74_C1_en.mp3',
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
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.frequency.word',
            definitionAsHtml: 'scenes.glossary.frequency.definition',
          },
        ],
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.noelle',
        headingColor: '#238B21',
        bodyAsHtml: 'scenes.S10.S10_D4_F75_C2',
        audioUrl: './audio/musical-scale_S10_D4_F75_C2_en.mp3',
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
          {
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.equal_temperament.word',
            definitionAsHtml: 'scenes.glossary.equal_temperament.definition',
          },
        ],
      },
    ],
  },

  // Scene 11 [Interactive - 4: Basic Synth]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 1000,
      zoom: 1.01,
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
        heading: 'scenes.S11.S11_D0_F77_C9.title',
        interactions: [
          {
            name: 'basic-piano',
            config: 'basic-piano',
            enableStateExchange: true,
          },
        ],
        about: [
          {
            heading: 'scenes.S11.S11_D0_F77_C9.about.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F77_C9.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.S11.S11_D0_F77_C9.help.heading',
            bodyAsHtml: 'scenes.S11.S11_D0_F77_C9.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S11.S11_D1_F78_C1',
        audioUrl: './audio/musical-scale_S11_D1_F78_C1_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S11.S11_D2_FX_C1',
        audioUrl: './audio/musical-scale_S11_D2_FX_C1_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#F6E4FF',
        },
        glossary: [
          {
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
          {
            word: 'scenes.glossary.note.word',
            definitionAsHtml: 'scenes.glossary.note.definition',
          },
          {
            word: 'scenes.glossary.equal_temperament.word',
            definitionAsHtml: 'scenes.glossary.equal_temperament.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S11.S11_D3_FX_C1',
        audioUrl: './audio/musical-scale_S11_D3_FX_C1_en.mp3',
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
              target: 'basic-piano',
              checkForPlayScale: true,
              disabled: 'check-for-play-scale',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.noelle',
        body: 'scenes.S11.S11_D4_F81_C2',
        audioUrl: './audio/musical-scale_S11_D4_F81_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2mini.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#ABE99B',
        },
        glossary: [
          {
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        body: 'scenes.S11.S11_D5_FX_C1',
        audioUrl: './audio/musical-scale_S11_D5_FX_C1_en.mp3',
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
              target: 'basic-piano',
              checkForPlayTwinkle: true,
              disabled: 'check-for-play-twinkle',
            },
            triggers: ['on-back', 'on-next'],
          },
        ],
      },
    ],
  },

  // Scene 12 [Conclusion Dialogues] - Updated to turn-based-chat format
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 305,
      zoom: 1,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'left',
        heading: 'scenes.common.noelle',
        isPrimaryHeading: true,
        bodyAsHtml: 'scenes.S12.S12_D1_F82_C2',
        audioUrl: './audio/musical-scale_S12_D1_F82_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.synth.word',
            definitionAsHtml: 'scenes.glossary.synth.definition',
          },
          {
            word: 'scenes.glossary.equal_temperament.word',
            definitionAsHtml: 'scenes.glossary.equal_temperament.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        bodyAsHtml: 'scenes.S12.S12_D2_F83_C1',
        audioUrl: './audio/musical-scale_S12_D2_F83_C1_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
      {
        side: 'left',
        heading: 'scenes.common.noelle',
        bodyAsHtml: 'scenes.S12.S12_D3_F84_C2',
        audioUrl: './audio/musical-scale_S12_D3_F84_C2_en.mp3',
        headingColor: '#238B21',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        glossary: [
          {
            word: 'scenes.glossary.melodies.word',
            definitionAsHtml: 'scenes.glossary.melodies.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.emery',
        bodyAsHtml: 'scenes.S12.S12_D4_F85_C1',
        audioUrl: './audio/musical-scale_S12_D4_F85_C1_en.mp3',
        headingColor: '#A22DDC',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
      },
    ],
  },

  // Ending Screen
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 3,
      pan: 810,
      zoom: 1.03,
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
