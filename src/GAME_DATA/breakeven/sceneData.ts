import { DialogPosition, DialogWidth, LogoTheme, SCENE_CHANGE_DELAY } from '../../constants/constants';
import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  // Scene 1 [Start Screen]
  {
    name: 'scenesList.scene_1',
    background: {
      alt: 'scenes.common.bg1_description',
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.0,
      blur: 5,
      zoom: 1.15,
      pan: 1200,
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
        position: {
          left: DialogPosition.START_SCREEN_LEFT,
          top: DialogPosition.START_SCREEN_TOP,
        },
        width: DialogWidth.START_SCREEN,
        disableAnimation: true,
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: 'scenes.common.mei_description',
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

  // Scene 2 [Introduction Talk]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.3,
      pan: 1290,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mei',
        body: 'scenes.introduction.mei_thinking',
        headingColor: '#007AFF',
        position: { top: '35%', right: '41%' },
        disableAnimation: true,
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
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_0_0_en.mp3',
      },
    ],
  },
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1650,
      zoom: 1,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.aunt-lilys-office.aunt_lily_greeting',
        headingColor: '#AF52DE',
        position: { top: '35%', left: '41%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.aunt_lily_description',
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
        audioUrl: '/assets/audio/break_even_quest_scene_1_0_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mei',
        body: 'scenes.aunt-lilys-office.mei_explanation',
        headingColor: '#007AFF',
        position: { top: '37%', right: '41%' },
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
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_1_1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.aunt-lilys-office.aunt_lily_offer',
        headingColor: '#AF52DE',
        position: { top: '40%', left: '41%' },
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
        width: '56vw',
        glossary: [
          {
            word: 'scenes.glossary.revenue.word',
            definitionAsHtml: 'scenes.glossary.revenue.definition',
          },
          {
            word: 'scenes.glossary.linear_functions.word',
            definitionAsHtml: 'scenes.glossary.linear_functions.definition',
          },
        ],
        audioUrl: '/assets/audio/break_even_quest_scene_1_2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mei',
        body: 'scenes.aunt-lilys-office.mei_question',
        headingColor: '#007AFF',
        position: { top: '35%', right: '37%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
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
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_1_3_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.Linear_functions.word',
            definitionAsHtml: 'scenes.glossary.Linear_functions.definition',
          },
        ],
      },
      // {
      //   isPrimaryHeading: true,
      //   heading: 'scenes.common.aunt_lily',
      //   bodyAsHtml: 'scenes.aunt-lilys-office.aunt_lily_explanation',
      //   headingColor: '#AF52DE',
      //   position: { top: '45%', left: '40%' },
      //   avatar: {
      //     src: '/assets/characters/char2_half.webp',
      //     alt: '',
      //     size: 'enlarged',
      //     position: 'right',
      //     animation: {
      //       duration: 300,
      //       delay: 0,
      //       entry: 'fadeIn',
      //       exit: 'fadeOutRight',
      //     },
      //   },
      //   background: {
      //     zoom: 1,
      //     blur: 16,
      //     pan: 800,
      //   },
      //   width: '42vw',
      //   glossary: [
      //     {
      //       word: 'scenes.glossary.revenue.word',
      //       definitionAsHtml: 'scenes.glossary.revenue.definition',
      //     },
      //   ],
      //   buttonAlignment: 'left',
      //   controls: [
      //     {
      //       type: 'back',
      //       text: 'dialog.button.back',
      //     },
      //   ],
      //   audioUrl: '/assets/audio/break_even_quest_scene_1_4_en.mp3',
      // },
    ],
  },

  // Scene 3 [Interactive - 1]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1090,
      zoom: 1.8,
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
        isPrimaryHeading: true,
        heading: 'scenes.understanding-cost-functions.cost_function_calculator_equation.title',
        bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_equation.formula_equation',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_formula',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_0_0_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        isPrimaryHeading: true,
        heading: 'scenes.understanding-cost-functions.cost_function_calculator_equation.title',
        bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_equation.cost_types_explanation',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_explanation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_0_1_en.mp3',
      },
      {
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        isPrimaryHeading: true,
        heading: 'scenes.understanding-cost-functions.cost_function_calculator_equation.title',
        bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_equation.detailed_cost_function',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.about_heading',
            bodyAsHtml:
              'scenes.understanding-cost-functions.cost_function_calculator_equation.function_notation_info',
            accentColor: '#0055B2',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_formula_explanation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_0_2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mei',
        body: 'scenes.understanding-cost-functions.mei_understanding',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_0_3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_confirm',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        glossary: [
          {
            word: 'scenes.glossary.input.word',
            definitionAsHtml: 'scenes.glossary.input.definition',
          },
          {
            word: 'scenes.glossary.output.word',
            definitionAsHtml: 'scenes.glossary.output.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_0_4_en.mp3',
      },
    ],
  },

  // Scene 4 [Interactive - 2]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1250,
      zoom: 1,
      blur: 6,
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
        heading: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.heading',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'cost-function',
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
            heading: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.about_heading',
            bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.about',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading:
              'scenes.understanding-cost-functions.cost_function_calculator_interaction.instructions_heading',
            bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.instructions',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_example',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_1_0_en.mp3',
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
            config: 'cost-function-question',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mei',
        body: 'scenes.understanding-cost-functions.mei_answer',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_1_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_question',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_1_2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mei',
        body: 'scenes.understanding-cost-functions.mei_calculation',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_2_1_3_en.mp3',
      },
    ],
  },

  // Scene 5 [Interactive - 3]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1090,
      zoom: 1.8,
      blur: 6,
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
        heading: 'scenes.understanding-revenue-functions.revenue_function_calculator_equation.title',
        bodyAsHtml: 'scenes.understanding-revenue-functions.revenue_function_calculator_equation.data',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        background: {
          blur: 20,
          pan: 0,
        },
        about: [
          {
            heading: 'scenes.understanding-revenue-functions.revenue_function_calculator_equation.title',
            bodyAsHtml:
              'scenes.understanding-revenue-functions.revenue_function_calculator_equation.function_notation_info',
            accentColor: '#0055B2',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-revenue-functions.aunt_lily_explanation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_3_0_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mei',
        body: 'scenes.understanding-revenue-functions.mei_revenue_understanding',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_3_0_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-revenue-functions.aunt_lily_revenue_description',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_3_0_2_en.mp3',
      },
    ],
  },

  // Scene 6 [Interactive - 4]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1250,
      zoom: 1,
      blur: 6,
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
        heading: 'scenes.understanding-revenue-functions.revenue_function_generator_interaction.heading',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'revenue-function',
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
            heading: 'scenes.understanding-revenue-functions.revenue_function_generator_interaction.about_heading',
            bodyAsHtml: 'scenes.understanding-revenue-functions.revenue_function_generator_interaction.about',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading:
              'scenes.understanding-revenue-functions.revenue_function_generator_interaction.instructions_heading',
            bodyAsHtml:
              'scenes.understanding-revenue-functions.revenue_function_generator_interaction.instructions',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-revenue-functions.aunt_lily_revenue_example',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'revenue-function-question',
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
        audioUrl: '/assets/audio/break_even_quest_scene_3_1_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mei',
        body: 'scenes.understanding-revenue-functions.mei_revenue_calculation',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_3_1_1_en.mp3',
      },
    ],
  },

  // Scene 7 [Pre-Interactive - 5]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1500,
      zoom: 1.65,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_praise',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
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
        width: '54vw',
        // similar to scene 2_2
        audioUrl: '/assets/audio/break_even_quest_scene_2_2_en.mp3',
      },
    ],
  },
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1100,
      zoom: 1.65,
      blur: 6,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.mei',
        body: 'scenes.break-even-analyzer.mei_how_to_find',
        headingColor: '#007AFF',
        position: { top: '38%', right: '39%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
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
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_3_3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_equation',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
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
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_3_4_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mei',
        body: 'scenes.break-even-analyzer.mei_equation_question',
        headingColor: '#007AFF',
        position: { top: '33%', right: '38%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
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
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_3_5_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_equation_explanation',
        headingColor: '#AF52DE',
        position: { top: '35%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
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
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_3_6_en.mp3',
      },
    ],
  },

  // Scene 8 [Interactive - 6]
  // break even point interactive to be added here
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1250,
      zoom: 1,
      blur: 6,
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
        heading: 'scenes.break-even-analyzer.break_even_analysis_interaction.heading',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'break-even-function',
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
            heading: 'scenes.break-even-analyzer.break_even_analysis_interaction.about_heading',
            bodyAsHtml: 'scenes.break-even-analyzer.break_even_analysis_interaction.about',
            accentColor: '#0055B2',
          },
        ],
        help: [
          {
            heading: 'scenes.break-even-analyzer.break_even_analysis_interaction.instructions_heading',
            bodyAsHtml: 'scenes.break-even-analyzer.break_even_analysis_interaction.instructions',
            accentColor: '#8200C3',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_past_context',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_4_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_description',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_4_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_interactive_question',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'break-even-function-question',
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
        audioUrl: '/assets/audio/break_even_quest_scene_4_2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.break_even_point.word',
            definitionAsHtml: 'scenes.glossary.break_even_point.definition',
          },
          {
            word: 'scenes.glossary.profit.word',
            definitionAsHtml: 'scenes.glossary.profit.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mei',
        body: 'scenes.break-even-analyzer.mei_practical_question',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        audioUrl: '/assets/audio/break_even_quest_scene_4_3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_practical_explanation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        glossary: [
          {
            word: 'scenes.glossary.revenue.word',
            definitionAsHtml: 'scenes.glossary.revenue.definition',
          },
          {
            word: 'scenes.glossary.profit.word',
            definitionAsHtml: 'scenes.glossary.profit.definition',
          },
        ],
        audioUrl: '/assets/audio/break_even_quest_scene_4_4_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mei',
        body: 'scenes.break-even-analyzer.mei_breakeven_realization',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        background: {
          blur: 20,
          pan: 350,
        },
        glossary: [
          {
            word: 'scenes.glossary.break_even_point.word',
            definitionAsHtml: 'scenes.glossary.break_even_point.definition',
          },
          {
            word: 'scenes.glossary.profit.word',
            definitionAsHtml: 'scenes.glossary.profit.definition',
          },
        ],
        audioUrl: '/assets/audio/break_even_quest_scene_4_5_en.mp3',
      },
    ],
  },

  // Scene 9 [Pre-Ending]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg4_description',
      url: '/assets/backgrounds/bg4.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1350,
      zoom: 1.65,
      blur: 6,
    },
    type: 'turn-based-chat',
    dialogs: [
      {
        side: 'right',
        isPrimaryHeading: true,
        heading: 'scenes.common.aunt_lily',
        headingColor: '#AF52DE',
        bodyAsHtml: 'scenes.pre_ending.aunt_lily_praise',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        audioUrl: '/assets/audio/break_even_quest_scene_5_0_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.mei',
        headingColor: '#007AFF',
        bodyAsHtml: 'scenes.pre_ending.mei_formula',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/break_even_quest_scene_5_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.aunt_lily',
        headingColor: '#AF52DE',
        bodyAsHtml: 'scenes.pre_ending.aunt_lily_break_even',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        audioUrl: '/assets/audio/break_even_quest_scene_5_2_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.mei',
        headingColor: '#007AFF',
        bodyAsHtml: 'scenes.pre_ending.mei_give_thanks',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/break_even_quest_scene_5_3_en.mp3',
      },
    ],
  },

  // Scene 10 [Ending]
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      blur: 6,
      waitDelay: SCENE_CHANGE_DELAY,
      zoom: 1.04,
      pan: 1320,
    },
    showConfetti: true,
    type: 'end-screen',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.quest_completion.quest_learning_points',
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
        position: { left: '50%', top: '52%' },
        background: {
          blur: 15,
          zoom: 1.1,
          pan: 100,
        },
        width: '79vw',
        headingColor: '#000000',
        disableAnimation: true,
      },
    ],
  },
];
