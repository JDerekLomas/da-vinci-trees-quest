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
      blur: 6,
      zoom: 1,
      pan: 952,
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
          src: '/assets/characters/leo.webp',
          alt: '',
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

  // Scene 2 [Intro]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      initialZoom: 1.0,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.intro.description',
        headingColor: '#000',
        disableAnimation: true,
        position: {
          top: '50%',
          left: '50%',
        },
        background: {
          blur: 6,
          zoom: 1.07,
          pan: 1020,
        },
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_narrator_en.mp3',
      },
    ],
  },
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1080,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        bodyAsHtml: 'scenes.intro.mira_inform_leo',
        headingColor: '#AF52DE',
        position: {
          top: '40%',
          left: '40%',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_0_0_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.intro.leo_meet_mira',
        headingColor: '#007AFF',
        position: {
          top: '40%',
          right: '40%',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_0_1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.intro.mira_thinking',
        headingColor: '#AF52DE',
        position: { top: '45%', left: '40%' },
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_0_2_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.intro.leo_question',
        headingColor: '#007AFF',
        position: { top: '35%', right: '41%' },
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_0_3_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.skytrack-office.mira_explanation',
        headingColor: '#AF52DE',
        position: { top: '47%', left: '39%' },
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_0_4_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.skytrack-office.leo_response',
        headingColor: '#007AFF',
        position: { top: '45%', right: '41%' },
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
        width: '55.625vw',
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
        audioUrl: '/assets/audio/pricing_quest_scene_0_7_en.mp3',
      },
    ],
  },

  // Scene 3 [Pre-Interactive -1]
  {
    name: 'scenesList.scene_4',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.15,
      pan: 1055,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.skytrack-office.mira_affirmation',
        headingColor: '#AF52DE',
        position: { top: '45%', left: '40%' },
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
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_0_8_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.skytrack-office.leo_question',
        headingColor: '#007AFF',
        position: { top: '45%', right: '42%' },
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
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_0_9_en.mp3',
      },
    ],
  },

  // Scene 4 [Interactive - 1]
  {
    name: 'scenesList.scene_5',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1405,
      zoom: 1,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'top',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        skipNavigation: true,
        heading: 'scenes.understanding-piecewise-functions.piecewise_function_calculator_equation.title',
        bodyAsHtml:
          'scenes.understanding-piecewise-functions.piecewise_function_calculator_equation.formula_equation',
        headingColor: '#000',
        glossary: [
          {
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_solution',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_1_0_en.mp3',
      },
      {
        isPrimaryHeading: true,
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        heading: 'scenes.understanding-piecewise-functions.piecewise_function_calculator_equation.title',
        bodyAsHtml:
          'scenes.understanding-piecewise-functions.piecewise_function_calculator_equation.formula_equation2',
        headingColor: '#000',
        glossary: [
          {
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.medium_distance_explanation',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_1_1_en.mp3',
      },
      {
        isPrimaryHeading: true,
        side: 'left',
        discardPrevious: true,
        skipNavigation: true,
        heading: 'scenes.understanding-piecewise-functions.piecewise_function_calculator_equation.title',
        bodyAsHtml:
          'scenes.understanding-piecewise-functions.piecewise_function_calculator_equation.formula_equation3',
        headingColor: '#000',
        glossary: [
          {
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.long_distance_explanation',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_1_2_en.mp3',
      },
    ],
  },

  // Scene 5 [Pre-Interactive - 2]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_confusion',
        headingColor: '#007AFF',
        position: { top: '45%', right: '40%' },
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
        background: {
          blur: 6,
          zoom: 1,
          pan: 820,
        },
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_2_0_en.mp3',
      },
    ],
  },

  // Scene 6 [Interactive - 2]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 820,
      zoom: 1,
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
        heading: 'scenes.understanding-piecewise-functions.zone_wise_explanation.zone1.title',
        bodyAsHtml: 'scenes.understanding-piecewise-functions.zone_wise_explanation.zone1.description',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        glossary: [
          {
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_zone_explanation_intro',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_flat_rate_understanding',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        glossary: [
          {
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_text1',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_3_en.mp3',
      },
    ],
  },

  // Scene 7 [Interactive - 3]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 820,
      zoom: 1,
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
        heading: 'scenes.understanding-piecewise-functions.zone_wise_explanation.zone2.title',
        bodyAsHtml: 'scenes.understanding-piecewise-functions.zone_wise_explanation.zone2.description',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_zone2_calculation',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_4_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_zone2_confirmation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_5_en.mp3',
      },
    ],
  },

  // Scene 8 [Interactive - 4]
  {
    name: 'scenesList.scene_9',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 820,
      zoom: 1,
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
        heading: 'scenes.understanding-piecewise-functions.zone_wise_explanation.zone3.title',
        bodyAsHtml: 'scenes.understanding-piecewise-functions.zone_wise_explanation.zone3.description',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_zone3_intro',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_6_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_17_miles_calculation',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_7_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_17_miles_calculation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_8_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_zone3_reaction',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_2_9_en.mp3',
      },
    ],
  },

  // Scene 9 [Pre-Interactive - 5]
  {
    name: 'scenesList.scene_10',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_visualization_request',
        headingColor: '#007AFF',
        position: { top: '45%', right: '40%' },
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
        background: {
          blur: 6,
          zoom: 1,
          pan: 820,
        },
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_2_10_en.mp3',
      },
    ],
  },

  // Scene 10 [Interactive - 5]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1405,
      zoom: 1,
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
        heading: 'scenes.distance_based_price_calculator.heading',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'distance-based-price-calculator',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.distance_based_price_calculator.about.heading',
            bodyAsHtml: 'scenes.distance_based_price_calculator.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.distance_based_price_calculator.help.heading',
            bodyAsHtml: 'scenes.distance_based_price_calculator.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_tool_intro',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_3_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_tool_understanding',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_3_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_customer_scenario',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_3_2_en.mp3',
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
            config: 'distance-based-price-calculator-question',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_price_concern',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_3_3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_price_jump_example',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_3_4_en.mp3',
      },
    ],
  },

  // Scene 11 [Pre-Interactive - 6]
  {
    name: 'scenesList.scene_12',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1035,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_zone3_concern',
        headingColor: '#007AFF',
        position: { top: '42%', right: '40%' },
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_3_5_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_suggestion',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_3_6_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_modified_example',
        headingColor: '#007AFF',
        position: { top: '42%', right: '40%' },
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_3_7_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_revised_approach',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_3_8_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.understanding-piecewise-functions.leo_premium_suggestion',
        headingColor: '#007AFF',
        position: { top: '42%', right: '40%' },
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_3_9_en.mp3',
      },
      {
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.understanding-piecewise-functions.mira_graph_suggestion',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_3_10_en.mp3',
      },
    ],
  },

  // Scene 12 [Interactive - 6]
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 250,
      zoom: 1.1,
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
        heading: 'scenes.distance_based_pricing_comparison.heading',
        interactions: [
          {
            name: 'interactive-graph',
            config: 'distance-based-pricing-comparison',
          },
        ],
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.distance_based_pricing_comparison.about.heading',
            bodyAsHtml: 'scenes.distance_based_pricing_comparison.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.distance_based_pricing_comparison.help.heading',
            bodyAsHtml: 'scenes.distance_based_pricing_comparison.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.distance-base-price-calculator.mira_cost_question',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_4_0_en.mp3',
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
            config: 'distance-based-pricing-comparison-question',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.distance-base-price-calculator.leo_price_observation',
        headingColor: '#007AFF',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_4_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.distance-base-price-calculator.mira_praise',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_4_2_en.mp3',
      },
    ],
  },
  // {
  //   name: 'scenesList.scene_14',
  //   background: {
  //     alt: 'scenes.common.bg3_description',
  //     url: '/assets/backgrounds/bg3.webp',
  //     blur: 8,
  //     zoom: 1.2,
  //     pan: 550,
  //   },
  //   // audioUrl: "/assets/audio/viral-quest/bg_music.mp3",
  //   type: 'one-at-a-time',
  //   dialogs: [
  //     {
  //       isPrimaryHeading: true,
  //       heading: 'scenes.common.mira',
  //       bodyAsHtml: 'scenes.planning.planning_body',
  //       headingColor: '#AF52DE',
  //       position: { left: '30%', top: '50%' },
  //       audioUrl: '/assets/audio/pricing_quest_scene_5_0_en.mp3',
  //       avatar: {
  //         src: '/assets/characters/char2.webp',
  //         alt: '',
  //         size: 'enlarged',
  //         position: 'right',
  //         animation: {
  //           duration: 300,
  //           delay: 0,
  //           entry: 'fadeIn',
  //           exit: 'fadeOutRight',
  //         },
  //       },
  //       buttonAlignment: 'left',
  //       controls: [
  //         {
  //           type: 'back',
  //           text: 'dialog.button.back',
  //         },
  //       ],

  //       width: '42vw',
  //     },
  //   ],
  // },
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.05,
      pan: 1150,
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
        heading: 'scenes.competitor_analysis.section_header.title',
        bodyAsHtml: 'scenes.competitor_analysis.section_header.description',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.competitor_analysis.mira_observation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_6_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.competitor_analysis.leo_reaction',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_6_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.competitor_analysis.mira_opportunity',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_6_2_en.mp3',
      },
    ],
  },

  // Scene 16 [Interactive - 8]
  {
    name: 'scenesList.scene_16',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.05,
      pan: 1150,
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
        heading: 'scenes.service_fee_formula.formula_title',
        bodyAsHtml: 'scenes.service_fee_formula.complete_formula',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.service_fee_formula.mira_explanation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_7_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.service_fee_formula.leo_understanding',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_7_2_en.mp3',
      },
    ],
  },

  // Scene 17 [Post-Interactive - 8]
  {
    name: 'scenesList.scene_17',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1.05,
      pan: 1150,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.competitor_analysis.mira_analysis',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_7_3_en.mp3',
      },
    ],
  },

  // Scene 18 [Interactive - 9]
  {
    name: 'scenesList.scene_18',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1510,
      zoom: 1.05,
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
        heading: 'scenes.service_fee_calculator.heading',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        interactions: [
          {
            name: 'interactive-graph',
            config: 'service-fee-calculator',
          },
        ],
        about: [
          {
            heading: 'scenes.service_fee_calculator.about.heading',
            bodyAsHtml: 'scenes.service_fee_calculator.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.service_fee_calculator.help.heading',
            bodyAsHtml: 'scenes.service_fee_calculator.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.service_fee_calculator.mira_question',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_8_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.service_fee_calculator.leo_observation',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_8_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.service_fee_calculator.mira_confirmation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
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
            config: 'service-fee-calculator-question',
          },
        ],
        audioUrl: '/assets/audio/pricing_quest_scene_8_2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.service_fee_calculator.leo_calculation',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_8_3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.service_fee_calculator.mira_hypothesis',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_8_4_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.service_fee_calculator.leo_realization',
        headingColor: '#007AFF',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_8_5_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.service_fee_calculator.mira_praise',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_8_6_en.mp3',
      },
    ],
  },

  // Scene 19 [Pre-Interactive - 10]
  {
    name: 'scenesList.scene_19',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1510,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.heavy_package_pricing.leo_concern',
        headingColor: '#007AFF',
        position: { top: '45%', right: '40%' },
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_9_0_en.mp3',
      },
    ],
  },
  {
    name: 'scenesList.scene_20',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1100,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: 'scenes.common.mira',
        body: 'scenes.heavy_package_pricing.mira_agreement',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_9_1_en.mp3',
      },
    ],
  },
  {
    name: 'scenesList.scene_21',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1510,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.heavy_package_pricing.leo_question',
        headingColor: '#007AFF',
        position: { top: '45%', right: '40%' },
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
        glossary: [
          {
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_9_2_en.mp3',
      },
    ],
  },

  // Scene 20 [Interactive - 10]
  {
    name: 'scenesList.scene_22',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1510,
      zoom: 1.05,
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
        heading: 'scenes.enhance_pricing_model.header',
        bodyAsHtml: 'scenes.enhance_pricing_model.formula',
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.enhance_pricing_model.mira_proposal',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        glossary: [
          {
            word: 'scenes.glossary.flat_fee.word',
            definitionAsHtml: 'scenes.glossary.flat_fee.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_9_3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.enhance_pricing_model.leo_feedback',
        headingColor: '#007AFF',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_9_4_en.mp3',
      },
    ],
  },

  // Scene 21 [Interactive - 11]
  {
    name: 'scenesList.scene_23',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1510,
      zoom: 1.05,
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
        headingColor: '#000',
        position: { left: '24.3%', bottom: '6.25%' },
        heading: 'scenes.delivery_price_calculator.heading',
        interactions: [
          {
            name: 'delivery-price-calculator',
            config: 'delivery-price-calculator',
          },
        ],
        about: [
          {
            heading: 'scenes.dual_factor_price_calculator.about.heading',
            bodyAsHtml: 'scenes.dual_factor_price_calculator.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.dual_factor_price_calculator.help.heading',
            bodyAsHtml: 'scenes.dual_factor_price_calculator.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.dual_factor_price_calculator.mira_tool_explanation',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_10_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.dual_factor_price_calculator.leo_understanding',
        headingColor: '#007AFF',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_10_1_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.dual_factor_price_calculator.mira_enthusiasm',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_10_2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        body: 'scenes.dual_factor_price_calculator.mira_challenge',
        headingColor: '#AF52DE',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/mira.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
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
            config: 'dual-factor-price-calculator-question',
          },
        ],
        audioUrl: '/assets/audio/pricing_quest_scene_10_3_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.leo',
        body: 'scenes.dual_factor_price_calculator.leo_calculation',
        headingColor: '#007AFF',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/leo.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_10_4_en.mp3',
      },
    ],
  },

  // Scene 22 [Post-Interactive - 11]
  {
    name: 'scenesList.scene_24',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1510,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.mira',
        body: 'scenes.dual_factor_price_calculator.mira_confirmation',
        headingColor: '#AF52DE',
        position: { top: '42%', left: '40%' },
        avatar: {
          src: '/assets/characters/char2.webp',
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
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_10_5_en.mp3',
      },
    ],
  },
  {
    name: 'scenesList.scene_25',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      pan: 1510,
      zoom: 1.05,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.leo',
        body: 'scenes.dual_factor_price_calculator.leo_realization',
        headingColor: '#007AFF',
        position: { top: '42%', right: '40%' },
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
        background: {
          zoom: 1.1,
          blur: 6,
        },
        width: '55.625vw',
        audioUrl: '/assets/audio/pricing_quest_scene_10_6_en.mp3',
      },
    ],
  },

  // Scene 23 [Pre-End Screen]
  {
    name: 'scenesList.scene_26',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1080,
      initialZoom: 1.1,
    },
    // audioUrl: "/assets/audio/viral-quest/bg_music.mp3",
    type: 'turn-based-chat',
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.outro.leo_text_1',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_11_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        bodyAsHtml: 'scenes.outro.mira_text_1',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_11_1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.outro.leo_text_2',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_11_2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.mira',
        bodyAsHtml: 'scenes.outro.mira_text_2',
        headingColor: '#AF52DE',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_11_3_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.leo',
        bodyAsHtml: 'scenes.outro.leo_text_3',
        headingColor: '#007AFF',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/pricing_quest_scene_11_4_en.mp3',
      },
    ],
  },

  // Scene 24 [End Screen]
  {
    name: 'scenesList.scene_27',
    background: {
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 6,
      zoom: 1,
      pan: 1370,
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
        position: { left: '50%', top: '50%' },
        background: {
          blur: 6,
          zoom: 1.89,
          pan: -160,
        },
        width: '80.7vw',
        headingColor: '#000000',
        disableAnimation: true,
      },
    ],
  },
];
