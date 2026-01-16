import { SceneData } from '../../types/interfaces';

export const sceneData: SceneData[] = [
  {
    background: {
      url: '/assets/backgrounds/bg1.webp',
      waitDelay: 1000,
      initialZoom: 1.0,
    },
    audioUrl: '/assets/audio/bgmusic.mp3',
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'start.title',
        body: 'start.description',
        headingColor: '#000',
        position: { left: '50%', top: '70%' },
        width: '82vw',
        avatar: {
          src: '/assets/characters/char1_profile.webp',
          alt: 'Mei',
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
          blur: 5,
          zoom: 1.1,
        },
      },
    ],
  },

  {
    background: {
      url: '/assets/backgrounds/scene0.webp',
      waitDelay: 2000,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.mei',
        body: 'scenes.introduction.mei_thinking',
        headingColor: '#007AFF',
        position: { top: '35%', right: '41%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'Mei',
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
        audioUrl: '/assets/audio/break_even_quest_scene_0_0_en.mp3',
      },
    ],
  },

  {
    background: {
      url: '/assets/backgrounds/long.jpg',
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.aunt-lilys-office.aunt_lily_greeting',
        headingColor: '#AF52DE',
        position: { top: '35%', left: '41%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'Aunt Lily',
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
          pan: 400,
          zoom: 1.1,
        },
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_1_0_en.mp3',
      },
      {
        heading: 'scenes.common.mei',
        body: 'scenes.aunt-lilys-office.mei_explanation',
        headingColor: '#007AFF',
        position: { top: '37%', right: '41%' },
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: 'Mei',
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
          pan: -200,
        },
        width: '56vw',
        audioUrl: '/assets/audio/break_even_quest_scene_1_1_en.mp3',
      },
      {
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.aunt-lilys-office.aunt_lily_offer',
        headingColor: '#AF52DE',
        position: { top: '40%', left: '41%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'Aunt Lily',
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
          pan: 400,
          zoom: 1.1,
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
        heading: 'scenes.common.mei',
        body: 'scenes.aunt-lilys-office.mei_question',
        headingColor: '#007AFF',
        position: { top: '35%', right: '37%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
          alt: 'Mei',
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
          blur: 12,
          zoom: 1.4,
          pan: -400,
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
      {
        heading: 'scenes.common.aunt_lily',
        bodyAsHtml: 'scenes.aunt-lilys-office.aunt_lily_explanation',
        headingColor: '#AF52DE',
        position: { top: '45%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Aunt Lily',
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
          blur: 16,
          pan: 800,
        },
        width: '42vw',
        glossary: [
          {
            word: 'scenes.glossary.revenue.word',
            definitionAsHtml: 'scenes.glossary.revenue.definition',
          },
        ],
        buttonAlignment: 'left',
        controls: [
          {
            type: 'back',
            text: 'dialog.button.back',
          },
        ],
        audioUrl: '/assets/audio/break_even_quest_scene_1_4_en.mp3',
      },
    ],
  },

  {
    background: {
      url: '/assets/backgrounds/scene3.webp',
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
        heading: 'scenes.understanding-cost-functions.cost_function_calculator_equation.title',
        bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_equation.formula_equation',
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
            accentColor: '#006BE0',
          },
        ],
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
          alt: 'Aunt Lily',
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
        heading: 'scenes.understanding-cost-functions.cost_function_calculator_equation.title',
        bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_equation.cost_types_explanation',
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
            accentColor: '#006BE0',
          },
        ],
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
          alt: 'Aunt Lily',
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
            accentColor: '#006BE0',
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
          alt: 'Aunt Lily',
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
          alt: 'Mei',
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
        avatar: {
          src: '/assets/characters/char2_profile.webp',
          alt: 'Aunt Lily',
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

  {
    background: {
      url: '/assets/backgrounds/scene4.webp',
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
        heading: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.heading',
        interactions: [
          {
            name: 'vertical-angles',
            config: 'vertical-angles',
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
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading:
              'scenes.understanding-cost-functions.cost_function_calculator_interaction.instructions_heading',
            bodyAsHtml: 'scenes.understanding-cost-functions.cost_function_calculator_interaction.instructions',
            accentColor: '#A22DDC',
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
          alt: 'Aunt Lily',
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
          alt: 'Mei',
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
          alt: 'Aunt Lily',
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
          alt: 'Mei',
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

  {
    background: {
      url: '/assets/backgrounds/scene3.webp',
      pan: 0,
      zoom: 1,
      blur: 15,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_praise',
        headingColor: '#AF52DE',
        position: { top: '45%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Aunt Lily',
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
        audioUrl: '/assets/audio/break_even_quest_scene_2_2_en.mp3',
      },
    ],
  },

  {
    background: {
      url: '/assets/backgrounds/scene3.webp',
      pan: 0,
      zoom: 1,
      blur: 15,
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
            accentColor: '#006BE0',
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
          alt: 'Aunt Lily',
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
          alt: 'Mei',
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
          alt: 'Aunt Lily',
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

  {
    background: {
      url: '/assets/backgrounds/scene4.webp',
      pan: 50,
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
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading:
              'scenes.understanding-revenue-functions.revenue_function_generator_interaction.instructions_heading',
            bodyAsHtml:
              'scenes.understanding-revenue-functions.revenue_function_generator_interaction.instructions',
            accentColor: '#A22DDC',
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
          alt: 'Aunt Lily',
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
          alt: 'Mei',
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

  {
    background: {
      url: '/assets/backgrounds/scene3.webp',
      pan: 0,
      zoom: 1,
      blur: 15,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.understanding-cost-functions.aunt_lily_praise',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Aunt Lily',
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
        width: '54vw',
        // similar to scene 2_2
        audioUrl: '/assets/audio/break_even_quest_scene_2_2_en.mp3',
      },
    ],
  },

  {
    background: {
      url: '/assets/backgrounds/scene3.webp',
      pan: 0,
      zoom: 1,
      blur: 15,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_break_even',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Aunt Lily',
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
        width: '54vw',
        audioUrl: '/assets/audio/break_even_quest_scene_3_2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.break_even_point.word',
            definitionAsHtml: 'scenes.glossary.break_even_point.definition',
          },
        ],
      },
      {
        heading: 'scenes.common.mei',
        body: 'scenes.break-even-analyzer.mei_how_to_find',
        headingColor: '#007AFF',
        position: { top: '38%', right: '39%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
          alt: 'Mei',
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
        audioUrl: '/assets/audio/break_even_quest_scene_3_3_en.mp3',
      },
      {
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_equation',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Aunt Lily',
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
        audioUrl: '/assets/audio/break_even_quest_scene_3_4_en.mp3',
      },
      {
        heading: 'scenes.common.mei',
        body: 'scenes.break-even-analyzer.mei_equation_question',
        headingColor: '#007AFF',
        position: { top: '33%', right: '38%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
          alt: 'Mei',
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
        audioUrl: '/assets/audio/break_even_quest_scene_3_5_en.mp3',
      },
      {
        heading: 'scenes.common.aunt_lily',
        body: 'scenes.break-even-analyzer.aunt_lily_equation_explanation',
        headingColor: '#AF52DE',
        position: { top: '35%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2_half.webp',
          alt: 'Aunt Lily',
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
        audioUrl: '/assets/audio/break_even_quest_scene_3_6_en.mp3',
      },
    ],
  },

  // break even point interactive to be added here
  {
    background: {
      url: '/assets/backgrounds/scene4.webp',
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
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.break-even-analyzer.break_even_analysis_interaction.instructions_heading',
            bodyAsHtml: 'scenes.break-even-analyzer.break_even_analysis_interaction.instructions',
            accentColor: '#A22DDC',
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
          alt: 'Aunt Lily',
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
          alt: 'Aunt Lily',
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
          alt: 'Aunt Lily',
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
    ],
  },

  {
    background: {
      url: '/assets/backgrounds/scene3.webp',
      pan: 0,
      zoom: 1,
      blur: 15,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'scenes.common.mei',
        body: 'scenes.break-even-analyzer.mei_gratitude',
        headingColor: '#007AFF',
        position: { top: '42%', right: '37%' },
        avatar: {
          src: '/assets/characters/char1_half.webp',
          alt: 'Mei',
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
        audioUrl: '/assets/audio/break_even_quest_scene_4_3_en.mp3',
      },
    ],
  },
  {
    background: {
      url: '/assets/backgrounds/scene5.webp',
      waitDelay: 1500,
    },
    type: 'one-at-a-time',
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
