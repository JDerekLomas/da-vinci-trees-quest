import { SCENE_CHANGE_DELAY, LogoTheme } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 0: Start Screen
  {
    name: 'scenesList.scene_1',
    audioUrl: '/assets/audio/bgmusic.mp3',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.0,
      blur: 5,
      zoom: 1.1,
    },
    logoTheme: {
      landscape: LogoTheme.DARK,
      portrait: LogoTheme.LIGHT,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'start.title',
        body: 'start.description',
        headingColor: '#000',
        position: { left: '50%', top: '70%' },
        width: '82vw',
        disableAnimation: true,
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'Alex',
          size: 'chat-bubble-square',
          background: '#6FE9FF',
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

  // Scene 1: The Problem - Game graphics look wrong
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.0,
      blur: 5,
      zoom: 1.1,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.alex',
        body: 'scenes.the-problem.alex_confused',
        audioUrl: '/assets/audio/matrix-multiplication_scene_0_0_en.mp3',
        headingColor: '#007AFF',
        position: { top: '35%', right: '41%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'Alex',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        background: {
          blur: 15,
          zoom: 1.1,
        },
        width: '56vw',
      },
      {
        heading: 'scenes.common.dr_chen',
        body: 'scenes.the-problem.chen_introduction',
        audioUrl: '/assets/audio/matrix-multiplication_scene_0_1_en.mp3',
        headingColor: '#AF52DE',
        position: { top: '35%', left: '41%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'Dr. Chen',
          size: 'large',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        background: {
          blur: 16,
          pan: 30,
          zoom: 1.1,
        },
        width: '56vw',
      },
      {
        heading: 'scenes.common.alex',
        body: 'scenes.the-problem.alex_question',
        audioUrl: '/assets/audio/matrix-multiplication_scene_0_2_en.mp3',
        headingColor: '#007AFF',
        position: { top: '37%', right: '41%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'Alex',
          size: 'large',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        background: {
          blur: 15,
          zoom: 1.2,
          pan: -30,
        },
        width: '56vw',
      },
    ],
  },

  // Scene 2: What is a Matrix?
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 0,
      zoom: 1.1,
      blur: 15,
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
        heading: 'scenes.what-is-matrix.matrix_intro.title',
        bodyAsHtml: 'scenes.what-is-matrix.matrix_intro.content',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.what-is-matrix.matrix_intro.about_heading',
            bodyAsHtml: 'scenes.what-is-matrix.matrix_intro.about',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.what-is-matrix.chen_explanation',
        audioUrl: '/assets/audio/matrix-multiplication_scene_1_0_en.mp3',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.what-is-matrix.alex_understanding',
        audioUrl: '/assets/audio/matrix-multiplication_scene_1_1_en.mp3',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: 'Alex',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        heading: 'scenes.what-is-matrix.dimensions.title',
        bodyAsHtml: 'scenes.what-is-matrix.dimensions.content',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.what-is-matrix.chen_dimensions',
        audioUrl: '/assets/audio/matrix-multiplication_scene_1_2_en.mp3',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
    ],
  },

  // Scene 3: The Multiplication Rule
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 50,
      zoom: 1.4,
      blur: 10,
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
        heading: 'scenes.multiplication-rule.rule.title',
        bodyAsHtml: 'scenes.multiplication-rule.rule.content',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.multiplication-rule.rule.about_heading',
            bodyAsHtml: 'scenes.multiplication-rule.rule.about',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.multiplication-rule.chen_row_column',
        audioUrl: '/assets/audio/matrix-multiplication_scene_2_0_en.mp3',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.multiplication-rule.alex_pattern',
        audioUrl: '/assets/audio/matrix-multiplication_scene_2_1_en.mp3',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: 'Alex',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.multiplication-rule.chen_confirm',
        audioUrl: '/assets/audio/matrix-multiplication_scene_2_2_en.mp3',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
    ],
  },

  // Scene 4: Practice - Interactive Matrix Multiplication
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 0,
      zoom: 1,
      blur: 10,
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
        heading: 'scenes.practice.calculator.heading',
        interactions: [
          {
            name: 'matrix-calculator',
            config: 'matrix-multiply-2x2',
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
            heading: 'scenes.practice.calculator.about_heading',
            bodyAsHtml: 'scenes.practice.calculator.about',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.practice.calculator.help_heading',
            bodyAsHtml: 'scenes.practice.calculator.help',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.practice.chen_try_it',
        audioUrl: '/assets/audio/matrix-multiplication_scene_3_0_en.mp3',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
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
            config: 'matrix-result-question',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.practice.alex_success',
        audioUrl: '/assets/audio/matrix-multiplication_scene_3_1_en.mp3',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: 'Alex',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
    ],
  },

  // Scene 5: Scaling Up - 3x3 Matrices
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 0,
      zoom: 1,
      blur: 15,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.dr_chen',
        body: 'scenes.scaling-up.chen_3d',
        audioUrl: '/assets/audio/matrix-multiplication_scene_4_0_en.mp3',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Dr. Chen',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        background: {
          zoom: 1,
          blur: 14,
          pan: 0,
        },
        width: '56vw',
        glossary: [
          {
            word: 'scenes.glossary.transformation_matrix.word',
            definitionAsHtml: 'scenes.glossary.transformation_matrix.definition',
          },
        ],
      },
      {
        heading: 'scenes.common.alex',
        body: 'scenes.scaling-up.alex_realization',
        audioUrl: '/assets/audio/matrix-multiplication_scene_4_1_en.mp3',
        headingColor: '#007AFF',
        position: { top: '38%', right: '39%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
          alt: 'Alex',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        background: {
          zoom: 1.1,
          blur: 14,
          pan: 50,
        },
        width: '56vw',
      },
    ],
  },

  // Scene 6: Real Application - Transformation Visualizer
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 0,
      zoom: 1,
      blur: 10,
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
        heading: 'scenes.application.visualizer.heading',
        interactions: [
          {
            name: 'transformation-visualizer',
            config: 'transform-2d',
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
            heading: 'scenes.application.visualizer.about_heading',
            bodyAsHtml: 'scenes.application.visualizer.about',
            accentColor: '#006BE0',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.application.chen_demo',
        audioUrl: '/assets/audio/matrix-multiplication_scene_5_0_en.mp3',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.application.alex_amazed',
        audioUrl: '/assets/audio/matrix-multiplication_scene_5_1_en.mp3',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: 'Alex',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.application.chen_conclusion',
        audioUrl: '/assets/audio/matrix-multiplication_scene_5_2_en.mp3',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
    ],
  },

  // Scene 7b: Image Transformation - See Matrices Transform Images
  {
    name: 'scenesList.scene_7b',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 0,
      zoom: 1,
      blur: 10,
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
        heading: 'scenes.image-transformer.heading',
        interactions: [
          {
            name: 'image-transformer',
            config: 'image-transform',
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
            heading: 'scenes.image-transformer.about_heading',
            bodyAsHtml: 'scenes.image-transformer.about',
            accentColor: '#4F46E5',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.dr_chen',
        body: 'scenes.image-transformer.chen_intro',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Dr. Chen',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.alex',
        body: 'scenes.image-transformer.alex_wow',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: 'Alex',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 30,
        },
      },
    ],
  },

  // Scene 7: Beyond Graphics - Matrix Multiplication in AI
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 0,
      zoom: 1,
      blur: 15,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.alex',
        body: 'scenes.ai-connection.alex_question',
        audioUrl: '/assets/audio/matrix-multiplication_scene_6_0_en.mp3',
        headingColor: '#007AFF',
        position: { top: '38%', right: '39%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
          alt: 'Alex',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        background: {
          zoom: 1.1,
          blur: 14,
          pan: 50,
        },
        width: '56vw',
      },
      {
        heading: 'scenes.common.dr_chen',
        body: 'scenes.ai-connection.chen_ai_intro',
        audioUrl: '/assets/audio/matrix-multiplication_scene_6_1_en.mp3',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Dr. Chen',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        background: {
          zoom: 1,
          blur: 14,
          pan: 0,
        },
        width: '56vw',
        glossary: [
          {
            word: 'scenes.glossary.neural_network.word',
            definitionAsHtml: 'scenes.glossary.neural_network.definition',
          },
        ],
      },
      {
        heading: 'scenes.common.alex',
        body: 'scenes.ai-connection.alex_amazed',
        audioUrl: '/assets/audio/matrix-multiplication_scene_6_2_en.mp3',
        headingColor: '#007AFF',
        position: { top: '38%', right: '39%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
          alt: 'Alex',
          size: 'enlarged',
          position: 'left',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutLeft',
          },
        },
        background: {
          zoom: 1.2,
          blur: 14,
          pan: -50,
        },
        width: '56vw',
      },
      {
        heading: 'scenes.common.dr_chen',
        body: 'scenes.ai-connection.chen_gpu_connection',
        audioUrl: '/assets/audio/matrix-multiplication_scene_6_3_en.mp3',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Dr. Chen',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        background: {
          zoom: 1.1,
          blur: 14,
          pan: 30,
        },
        width: '56vw',
      },
    ],
  },

  // Scene 8: End Screen
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: 1500,
    },
    showConfetti: true,
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.quest_completion.learning_points',
        audioUrl: '/assets/audio/matrix-multiplication_scene_7_0_en.mp3',
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
        position: { left: '50%', top: '50%' },
        background: {
          blur: 15,
          zoom: 1.1,
        },
        width: '65.7vw',
        headingColor: '#000000',
      },
    ],
  },
];
