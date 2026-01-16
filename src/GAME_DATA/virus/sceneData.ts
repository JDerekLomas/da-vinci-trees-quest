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
    },
    logoTheme: {
      landscape: LogoTheme.DARK,
      portrait: LogoTheme.LIGHT,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: 'start.title',
        bodyAsHtml: 'start.start_body',
        headingColor: '#000',
        disableAnimation: true,
        position: {
          left: DialogPosition.START_SCREEN_LEFT,
          top: DialogPosition.START_SCREEN_TOP,
        },
        controls: [
          {
            type: 'start',
            text: 'start.start_game',
          },
        ],
        width: DialogWidth.START_SCREEN,
        avatar: {
          src: '/assets/characters/char1_small.webp',
          alt: 'scenes.common.aisha_patel_description',
          size: 'chat-bubble-square',
          background: '#B4D8FF',
        },
        background: {
          blur: 5,
          zoom: 1.1,
          pan: 1250,
        },
      },
    ],
  },

  // Scene 2 [Intro]
  {
    name: 'scenesList.scene_2',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'one-at-a-time',
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.intro.description',
        headingColor: '#000',
        position: { top: '50%', left: '50%' },
        disableAnimation: true,
        background: {
          blur: 7,
          zoom: 1.13,
          pan: 610,
        },
        width: '55vw',
        audioUrl: '/assets/audio/viral-quest/scene_0_0_en.mp3',
      },
    ],
  },
  {
    name: 'scenesList.scene_3',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 7,
      zoom: 1,
      pan: 650,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.aisha_patel',
        bodyAsHtml: 'scenes.intro.aisha_intro',
        headingColor: '#5856D6',
        position: { top: '40%', right: '33%' },
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
        width: '50vw',
        audioUrl: '/assets/audio/viral-quest/scene_0_1_en.mp3',
      },
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        heading: 'scenes.common.chen',
        bodyAsHtml: 'scenes.intro.chen_intro',
        headingColor: '#FF3B30',
        position: { top: '35%', left: '35%' },
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: 'scenes.common.chen_description',
          size: 'enlarged',
          position: 'right',
          animation: {
            duration: 300,
            delay: 0,
            entry: 'fadeIn',
            exit: 'fadeOutRight',
          },
        },
        width: '50vw',
        audioUrl: '/assets/audio/viral-quest/scene_0_2_en.mp3',
        glossary: [
          {
            word: 'scenes.glossary.exponential_functions.word',
            definitionAsHtml: 'scenes.glossary.exponential_functions.definition',
          },
          {
            word: 'scenes.glossary.model.word',
            definitionAsHtml: 'scenes.glossary.model.definition',
          },
        ],
      },
    ],
  },
  // {
  //   name: 'scenesList.scene_5',
  //   background: {
  //     alt: 'scenes.common.bg3_description',
  //     url: '/assets/backgrounds/bg2.webp',
  //     blur: 6,
  //     zoom: 1.2,
  //   },
  //   audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
  //   type: 'one-at-a-time',
  //   dialogs: [
  //     {
  //       isPrimaryHeading: true,
  //       heading: 'scenes.planning.heading',
  //       bodyAsHtml: 'scenes.planning.planning_body',
  //       headingColor: '#333333',
  //       position: { left: '30%', top: '50%' },
  //       audioUrl: '/assets/audio/viral-quest/scene_1_0_en.mp3',
  //       buttonAlignment: 'left',
  //       controls: [
  //         {
  //           type: 'back',
  //           text: 'dialog.button.back',
  //         },
  //       ],
  //       glossary: [
  //         {
  //           word: 'scenes.glossary.holographic_map.word',
  //           definitionAsHtml: 'scenes.glossary.holographic_map.definition',
  //         },
  //       ],
  //       width: '41vw',
  //     },
  //   ],
  // },

  // Scene 5 [Interactive - 1]
  {
    name: 'scenesList.scene_6',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 7,
      pan: 1480,
      zoom: 1.34,
    },
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.examine_raw_numbers.outbreak_text',
        bodyAsHtml: 'scenes.examine_raw_numbers.outbreak_sub_text',
        interactions: [
          {
            name: 'holographic-table',
            config: 'holographic-table',
          },
        ],
        side: 'left',
        skipNavigation: true,
        headingColor: '',
        position: { left: '4.3%', bottom: '' },
        about: [
          {
            heading: 'scenes.examine_raw_numbers.about.heading',
            bodyAsHtml: 'scenes.examine_raw_numbers.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.examine_raw_numbers.help.heading',
            bodyAsHtml: 'scenes.examine_raw_numbers.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        showTextBox: true,
        audioUrl: '/assets/audio/viral-quest/scene_1_1_en.mp3',
        heading: 'scenes.common.chen',
        body: 'scenes.examine_raw_numbers.chen_text_2',
        headingColor: '#FF3B30',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_small.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        glossary: [
          {
            word: 'scenes.glossary.raw_data.word',
            definitionAsHtml: 'scenes.glossary.raw_data.definition',
          },
          {
            word: 'scenes.glossary.growth_factor.word',
            definitionAsHtml: 'scenes.glossary.growth_factor.definition',
          },
        ],
      },
      {
        showTextBox: true,
        audioUrl: '/assets/audio/viral-quest/scene_1_2_en.mp3',
        heading: 'Professor Chen',
        body: 'scenes.examine_raw_numbers.chen_explaining',
        headingColor: '#FF3B30',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_small.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#DCADF3',
        },
        interactions: [
          {
            name: 'interactive-inputbox',
            config: 'question1-function',
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
        heading: 'scenes.common.aisha_patel',
        body: 'scenes.examine_raw_numbers.aisha_conclusion_1',
        headingColor: '#5856D6',
        position: {
          left: '24.3%',
          bottom: '6.25%',
        },

        avatar: {
          src: '/assets/characters/char1_small.webp',
          alt: '',
          size: 'chat-bubble',
          background: '#B4D8FF',
        },
        audioUrl: '/assets/audio/viral-quest/scene_2_1_en.mp3',
      },
    ],
  },

  // Scene 6 [Pre-Interactive - 2]
  {
    name: 'scenesList.scene_7',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 7,
      pan: 1580,
      zoom: 1.5,
    },
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        isPrimaryHeading: true,
        width: '50vw',
        heading: 'scenes.examine_raw_numbers.chen_text_3',
        body: 'scenes.examine_raw_numbers.chen_text_4',
        headingColor: '',
        position: { top: '45%', left: '35%' },
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
        about: [
          {
            heading: 'scenes.examine_raw_numbers.equation_about.heading',
            bodyAsHtml: 'scenes.examine_raw_numbers.equation_about.body',
            accentColor: '#4285F4',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_factor.word',
            definitionAsHtml: 'scenes.glossary.growth_factor.definition',
          },
        ],
        audioUrl: '/assets/audio/viral-quest/scene_2_2_en.mp3',
      },
    ],
  },

  // Scene 7 [Interactive - 2]
  {
    name: 'scenesList.scene_8',
    background: {
      alt: 'scenes.common.bg3_description',
      url: '/assets/backgrounds/bg3_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 7,
      pan: 1480,
      zoom: 1.34,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.growth_calculation.interaction_1.title',
        bodyAsHtml: 'scenes.examine_raw_numbers.exponential_function_subtitle',
        side: 'left',
        skipNavigation: true,
        interactions: [
          {
            name: 'interactive-graph-with-slider',
            config: 'interactive-graph-with-slider',
          },
        ],
        headingColor: '#000000',
        position: { left: '24.3%', bottom: '6.25%' },
        glossary: [
          {
            word: 'scenes.glossary.growth_factor.word',
            definitionAsHtml: 'scenes.glossary.growth_factor.definition',
          },
          {
            word: 'scenes.glossary.initial_value.word',
            definitionAsHtml: 'scenes.glossary.initial_value.definition',
          },
        ],
        about: [
          {
            heading: 'scenes.examine_raw_numbers.exponential_interaction.about.heading',
            bodyAsHtml: 'scenes.examine_raw_numbers.exponential_interaction.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.examine_raw_numbers.exponential_interaction.help.heading',
            bodyAsHtml: 'scenes.examine_raw_numbers.exponential_interaction.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        heading: 'scenes.common.chen',
        body: 'scenes.examine_raw_numbers.chen_text_5',
        headingColor: '#FF3B30',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char2_small.webp',
          alt: '',
          size: 'chat-bubble',
          position: 'right',
        },
        audioUrl: '/assets/audio/viral-quest/scene_3_1_0_en.mp3',
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
      },
      {
        showTextBox: true,
        heading: 'scenes.common.chen',
        body: 'scenes.examine_raw_numbers.chen_text_6',
        headingColor: '#FF3B30',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        glossary: [
          {
            word: 'scenes.glossary.growth_factor.word',
            definitionAsHtml: 'scenes.glossary.growth_factor.definition',
          },
          {
            word: 'scenes.glossary.initial_value.word',
            definitionAsHtml: 'scenes.glossary.initial_value.definition',
          },
        ],
        avatar: {
          src: '/assets/characters/char2_small.webp',
          alt: '',
          size: 'chat-bubble',
          position: 'right',
        },
        audioUrl: '/assets/audio/viral-quest/scene_3_1_1_en.mp3',
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
            config: 'question2a-function',
          },
          {
            name: 'interactive-inputbox',
            config: 'question2b-function',
          },
        ],
      },
      {
        side: 'right',
        heading: 'scenes.common.aisha_patel',
        bodyAsHtml: 'scenes.data_visualization.aisha_agreeing_text_1',
        headingColor: '#5856D6',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_small.webp',
          alt: '',
          size: 'chat-bubble',
          position: 'left',
        },
        audioUrl: '/assets/audio/viral-quest/scene_3_2_en.mp3',
      },
    ],
  },

  // Scene 9 [Narrator]
  {
    name: 'scenesList.scene_10',
    background: {
      blur: 7,
      zoom: 1.15,
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      pan: 1390,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'one-at-a-time',
    dialogs: [
      {
        disableAnimation: true,
        heading: '',
        body: 'scenes.growth_calculation.explain_text_1',
        position: { left: '50%', top: '50%' },
        headingColor: '#000000',
        width: '55vw',
        audioUrl: '/assets/audio/viral-quest/scene_4_0_en.mp3',
      },
    ],
  },

  // Scene 10 [Interactive - 3]
  {
    name: 'scenesList.scene_11',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 8,
      zoom: 1,
      pan: 620,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.growth_calculation.interaction_1.title',
        side: 'left',
        skipNavigation: true,
        interactions: [
          {
            name: 'interactive-fill-in-the-blank',
            config: 'exponential-function',
          },
        ],
        headingColor: '#000000',
        position: { left: '24.3%', bottom: '6.25%' },
        about: [
          {
            heading: 'scenes.growth_calculation.interaction_1.about.heading',
            bodyAsHtml: 'scenes.growth_calculation.interaction_1.about.body',
            accentColor: '#006BE0',
          },
        ],
        glossary: [
          {
            word: 'scenes.glossary.growth_factor.word',
            definitionAsHtml: 'scenes.glossary.growth_factor.definition',
          },
        ],
        help: [
          {
            heading: 'scenes.growth_calculation.interaction_1.help.heading',
            bodyAsHtml: 'scenes.growth_calculation.interaction_1.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        heading: 'scenes.common.aisha_patel',
        body: 'scenes.growth_calculation.aisha_text_1',
        headingColor: '#5856D6',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_small.webp',
          alt: '',
          size: 'chat-bubble',
          position: 'left',
        },
        audioUrl: '/assets/audio/viral-quest/scene_4_1_0_en.mp3',
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
            config: 'question3-function',
          },
        ],
      },
      {
        heading: 'scenes.common.aisha_patel',
        body: 'scenes.growth_calculation.aisha_appreciating',
        headingColor: '#5856D6',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_small.webp',
          alt: '',
          size: 'chat-bubble',
        },
        audioUrl: '/assets/audio/viral-quest/scene_4_1_1_en.mp3',
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
            config: 'question4-function',
          },
        ],
      },
      {
        heading: 'scenes.common.aisha_patel',
        body: 'scenes.post_calculations.aisha_concluding_text_1',
        headingColor: '#5856D6',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_small.webp',
          alt: '',
          size: 'chat-bubble',
        },
        audioUrl: '/assets/audio/viral-quest/scene_5_0_en.mp3',
      },
    ],
  },

  // Scene 12 [Interactive - 4]
  {
    name: 'scenesList.scene_13',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 8,
      zoom: 1,
      pan: 620,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'split-screen-chat',
    leftConfig: {
      blur: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },
    dialogs: [
      {
        isPrimaryHeading: true,
        heading: 'scenes.post_calculations.interaction_1.title',
        side: 'left',
        skipNavigation: true,
        interactions: [
          {
            name: 'interactive-fill-in-the-blank',
            config: 'exponential-function',
          },
        ],
        headingColor: '#000000',
        position: { left: '24.3%', bottom: '6.25%' },
        glossary: [
          {
            word: 'scenes.glossary.growth_factor.word',
            definitionAsHtml: 'scenes.glossary.growth_factor.definition',
          },
        ],
        about: [
          {
            heading: 'scenes.post_calculations.interaction_1.about.heading',
            bodyAsHtml: 'scenes.post_calculations.interaction_1.about.body',
            accentColor: '#006BE0',
          },
        ],
        help: [
          {
            heading: 'scenes.post_calculations.interaction_1.help.heading',
            bodyAsHtml: 'scenes.post_calculations.interaction_1.help.body',
            accentColor: '#A22DDC',
          },
        ],
      },
      {
        heading: 'scenes.common.aisha_patel',
        body: 'scenes.post_calculations.aisha_explaining_text_1',
        headingColor: '#5856D6',
        position: {
          right: '23%',
          bottom: '6.25%',
        },
        avatar: {
          src: '/assets/characters/char1_small.webp',
          alt: '',
          size: 'chat-bubble',
          position: 'left',
        },
        audioUrl: '/assets/audio/viral-quest/scene_5_1_en.mp3',
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
            config: 'question5-function',
          },
        ],
      },
    ],
  },

  // Scene 13 [Pre-Ending]
  {
    name: 'scenesList.scene_14',
    background: {
      alt: 'scenes.common.bg2_description',
      url: '/assets/backgrounds/bg2_flipped.webp',
      waitDelay: SCENE_CHANGE_DELAY,
      blur: 7,
      zoom: 1,
      pan: 620,
    },
    audioUrl: '/assets/audio/viral-quest/bg_music.mp3',
    type: 'turn-based-chat',
    dialogs: [
      {
        isPrimaryHeading: true,
        side: 'left',
        heading: 'scenes.common.aisha_patel',
        headingColor: '#5856D6',
        bodyAsHtml: 'scenes.pre_ending.aisha_praise',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/viral-quest/scene_6_0_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.chen',
        headingColor: '#FF3B30',
        bodyAsHtml: 'scenes.pre_ending.chen_talks_about_formula',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        audioUrl: '/assets/audio/viral-quest/scene_6_1_en.mp3',
      },
      {
        side: 'left',
        heading: 'scenes.common.aisha_patel',
        headingColor: '#5856D6',
        bodyAsHtml: 'scenes.pre_ending.aisha_concern',
        avatar: {
          src: '/assets/characters/char1.webp',
          alt: '',
          size: 'enlarged',
          position: 'left',
        },
        audioUrl: '/assets/audio/viral-quest/scene_6_2_en.mp3',
      },
      {
        side: 'right',
        heading: 'scenes.common.chen',
        headingColor: '#FF3B30',
        bodyAsHtml: 'scenes.pre_ending.chen_give_thanks_aisha',
        avatar: {
          src: '/assets/characters/char2.webp',
          alt: '',
          size: 'enlarged',
          position: 'right',
        },
        glossary: [
          {
            word: 'scenes.glossary.epidemiology.word',
            definitionAsHtml: 'scenes.glossary.epidemiology.definition',
          },
        ],
        audioUrl: '/assets/audio/viral-quest/scene_6_3_en.mp3',
      },
    ],
  },

  // End Screen
  {
    name: 'scenesList.scene_15',
    background: {
      blur: 8,
      zoom: 1.15,
      alt: 'scenes.common.bg5_description',
      url: '/assets/backgrounds/bg5.webp',
      pan: 1390,
      waitDelay: SCENE_CHANGE_DELAY,
    },
    type: 'end-screen',
    showConfetti: true,
    dialogs: [
      {
        heading: '',
        bodyAsHtml: 'scenes.quest_complete.quest_conclusion_text',
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
        headingColor: '#000000',
        width: '62vw',
        disableAnimation: true,
      },
    ],
  },
];
