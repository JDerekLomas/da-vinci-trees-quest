// Configuration file for Interactive 3 - Equation Builder
const INTERACTIVE_3_CONFIG = {
  // Core Variables
  FIRST_NUMBER_VALUE: 5,
  SECOND_NUMBER_VALUE: 25,
  DEFAULT_LEFT_DIVISION_VALUE: 2,
  DEFAULT_RIGHT_DIVISION_VALUE: 2,
  INITIAL_RESULT_LEFT: 5,
  INITIAL_RESULT_RIGHT: 25,

  // Translation Keys
  TRANSLATION_KEYS: {
    // Success and Error Messages
    EQUATION_SUCCESS: 'scenes.S19.S19_D0_F76_C9.equation_success',
    EQUATION_ERROR: 'scenes.S19.S19_D0_F76_C9.equation_error',
    ENTER_POSITIVE_NUMBER: 'scenes.S19.S19_D0_F76_C9.enter_positive_number',
    LEFT_DIVISION_SUCCESS: 'scenes.S19.S19_D0_F76_C9.left_division_success',
    RIGHT_DIVISION_SUCCESS: 'scenes.S19.S19_D0_F76_C9.right_division_success',
    ENFORCING_CORRECT_VALUE: 'scenes.S19.S19_D0_F76_C9.enforcing_correct_value',

    // Division Messages
    DIVIDING_BY: 'scenes.S19.S19_D0_F76_C9.dividing_by',
    GIVES_US: 'scenes.S19.S19_D0_F76_C9.gives_us',
    DATES_FRACTION: 'scenes.S19.S19_D0_F76_C9.dates_fraction',
    NO_WHOLE_NUMBER: 'scenes.S19.S19_D0_F76_C9.no_whole_number',
    DOESNT_BALANCE: 'scenes.S19.S19_D0_F76_C9.doesnt_balance',
    REMEMBER_ONE_DATE: 'scenes.S19.S19_D0_F76_C9.remember_one_date',

    // Validation Messages
    CREATE_VALID_EQUATION: 'scenes.S19.S19_D0_F76_C9.create_valid_equation',
    DIVIDE_LEFT_CORRECTLY: 'scenes.S19.S19_D0_F76_C9.divide_left_correctly',
    DIVIDE_RIGHT_CORRECTLY: 'scenes.S19.S19_D0_F76_C9.divide_right_correctly',

    // Step Headings
    STEP_1_BUILD_EQUATION: 'scenes.S19.S19_D0_F76_C9.step_1_build_equation',
    STEP_2_DIVIDE_LEFT: 'scenes.S19.S19_D0_F76_C9.step_2_divide_left',
    STEP_3_DIVIDE_RIGHT: 'scenes.S19.S19_D0_F76_C9.step_3_divide_right',
    STEP_4_FINAL_SOLUTION: 'scenes.S19.S19_D0_F76_C9.step_4_final_solution',

    // Step 1 - Equation Building
    EQUATION_PLACEHOLDERS: 'scenes.S19.S19_D0_F76_C9.equation_placeholders',
    LEFT_SIDE_EQUATION: 'scenes.S19.S19_D0_F76_C9.left_side_equation',
    FIRST_POSITION: 'scenes.S19.S19_D0_F76_C9.first_position',
    SECOND_POSITION: 'scenes.S19.S19_D0_F76_C9.second_position',
    RESULT_POSITION: 'scenes.S19.S19_D0_F76_C9.result_position',
    CURRENTLY_CONTAINS: 'scenes.S19.S19_D0_F76_C9.currently_contains',
    EMPTY: 'scenes.S19.S19_D0_F76_C9.empty',
    FIRST_POSITION_CHANGED: 'scenes.S19.S19_D0_F76_C9.first_position_changed',
    SECOND_POSITION_CHANGED: 'scenes.S19.S19_D0_F76_C9.second_position_changed',
    RESULT_POSITION_CHANGED: 'scenes.S19.S19_D0_F76_C9.result_position_changed',
    EQUALS: 'scenes.S19.S19_D0_F76_C9.equals',
    KEYBOARD_INSTRUCTIONS: 'scenes.S19.S19_D0_F76_C9.keyboard_instructions',
    AVAILABLE_VALUES: 'scenes.S19.S19_D0_F76_C9.available_values',
    DRAGGABLE_VALUES: 'scenes.S19.S19_D0_F76_C9.draggable_values',
    ADD: 'scenes.S19.S19_D0_F76_C9.add',
    TO_EQUATION: 'scenes.S19.S19_D0_F76_C9.to_equation',
    CLICK_AUTO_FILL: 'scenes.S19.S19_D0_F76_C9.click_auto_fill',
    ADD_MULTIPLICATION: 'scenes.S19.S19_D0_F76_C9.add_multiplication',
    DRAG_INSTRUCTIONS: 'scenes.S19.S19_D0_F76_C9.drag_instructions',
    RESET_ALL_POSITIONS: 'scenes.S19.S19_D0_F76_C9.reset_all_positions',
    RESET_EQUATION: 'scenes.S19.S19_D0_F76_C9.reset_equation',

    // Step 2 & 3 - Balance Scale
    BALANCE_SCALE_SHOWING: 'scenes.S19.S19_D0_F76_C9.balance_scale_showing',
    ON_LEFT_PLATE: 'scenes.S19.S19_D0_F76_C9.on_left_plate',
    AND: 'scenes.S19.S19_D0_F76_C9.and',
    COINS: 'scenes.S19.S19_D0_F76_C9.coins',
    ON_RIGHT_PLATE: 'scenes.S19.S19_D0_F76_C9.on_right_plate',
    SCALE_TIPPED_RIGHT: 'scenes.S19.S19_D0_F76_C9.scale_tipped_right',
    SCALE_BALANCED: 'scenes.S19.S19_D0_F76_C9.scale_balanced',
    SCALE_LEVEL: 'scenes.S19.S19_D0_F76_C9.scale_level',
    SCALE_STILL_TIPPED: 'scenes.S19.S19_D0_F76_C9.scale_still_tipped',
    LEFT_PLATE: 'scenes.S19.S19_D0_F76_C9.left_plate',
    RIGHT_PLATE: 'scenes.S19.S19_D0_F76_C9.right_plate',
    DATE: 'scenes.S19.S19_D0_F76_C9.date',
    DATES: 'scenes.S19.S19_D0_F76_C9.dates',

    // Division Operations
    DIVIDE_LEFT_SIDE: 'scenes.S19.S19_D0_F76_C9.divide_left_side',
    DIVIDE_RIGHT_SIDE: 'scenes.S19.S19_D0_F76_C9.divide_right_side',
    CURRENT_EQUATION_DISPLAY: 'scenes.S19.S19_D0_F76_C9.current_equation_display',
    TIMES: 'scenes.S19.S19_D0_F76_C9.times',
    DIVIDE_LEFT_BY: 'scenes.S19.S19_D0_F76_C9.divide_left_by',
    DIVIDE_RIGHT_BY: 'scenes.S19.S19_D0_F76_C9.divide_right_by',
    DIVISION_VALUE: 'scenes.S19.S19_D0_F76_C9.division_value',
    CLICK_TO_EDIT: 'scenes.S19.S19_D0_F76_C9.click_to_edit',
    ENTER_DIVISION_VALUE: 'scenes.S19.S19_D0_F76_C9.enter_division_value',
    APPLY_DIVISION_BY: 'scenes.S19.S19_D0_F76_C9.apply_division_by',
    TO_LEFT_SIDE: 'scenes.S19.S19_D0_F76_C9.to_left_side',
    TO_RIGHT_SIDE: 'scenes.S19.S19_D0_F76_C9.to_right_side',
    DIVIDE: 'scenes.S19.S19_D0_F76_C9.divide',
    RESET_LEFT_DIVISION: 'scenes.S19.S19_D0_F76_C9.reset_left_division',
    RESET_RIGHT_DIVISION: 'scenes.S19.S19_D0_F76_C9.reset_right_division',
    RESET: 'scenes.S19.S19_D0_F76_C9.reset',
    DIVISION_INSTRUCTIONS: 'scenes.S19.S19_D0_F76_C9.division_instructions',
    RIGHT_DIVISION_INSTRUCTIONS: 'scenes.S19.S19_D0_F76_C9.right_division_instructions',
    AFTER_DIVIDING_LEFT: 'scenes.S19.S19_D0_F76_C9.after_dividing_left',
    AFTER_DIVIDING_RIGHT: 'scenes.S19.S19_D0_F76_C9.after_dividing_right',
    RESULT_OF_DIVISION: 'scenes.S19.S19_D0_F76_C9.result_of_division',
    RESULT: 'scenes.S19.S19_D0_F76_C9.result',
    X_UNKNOWN_VALUE: 'scenes.S19.S19_D0_F76_C9.x_unknown_value',

    // Step 4 - Final Solution
    FINAL_SCALE_DESCRIPTION: 'scenes.S19.S19_D0_F76_C9.final_scale_description',
    FINAL_SOLUTION: 'scenes.S19.S19_D0_F76_C9.final_solution',
    FINAL_EQUATION_SOLUTION: 'scenes.S19.S19_D0_F76_C9.final_equation_solution',
    X_SOLVED_FOR: 'scenes.S19.S19_D0_F76_C9.x_solved_for',
    SOLUTION_5: 'scenes.S19.S19_D0_F76_C9.solution_5',
    EQUATION_SOLVED_EXPLANATION: 'scenes.S19.S19_D0_F76_C9.equation_solved_explanation',

    // Instructions
    STEP1_INSTRUCTION1: 'scenes.S19.S19_D0_F76_C9.step1_instruction1',
    DATES_AND_WANT: 'scenes.S19.S19_D0_F76_C9.dates_and_want',
    DIRHAMS_FOR_THEM: 'scenes.S19.S19_D0_F76_C9.dirhams_for_them',
    STEP1_INSTRUCTION2: 'scenes.S19.S19_D0_F76_C9.step1_instruction2',
    STEP2_INSTRUCTION1: 'scenes.S19.S19_D0_F76_C9.step2_instruction1',
    STEP2_INSTRUCTION2: 'scenes.S19.S19_D0_F76_C9.step2_instruction2',
    STEP2_INSTRUCTION3: 'scenes.S19.S19_D0_F76_C9.step2_instruction3',
    STEP3_INSTRUCTION1: 'scenes.S19.S19_D0_F76_C9.step3_instruction1',
    STEP3_INSTRUCTION2: 'scenes.S19.S19_D0_F76_C9.step3_instruction2',
    STEP4_INSTRUCTION: 'scenes.S19.S19_D0_F76_C9.step4_instruction',
    LETS_SOLVE_STEP_BY_STEP: 'scenes.S19.S19_D0_F76_C9.lets_solve_step_by_step',
    INSTRUCTIONS: 'scenes.S19.S19_D0_F76_C9.instructions',

    // Navigation
    STEP_NAVIGATION: 'scenes.S19.S19_D0_F76_C9.step_navigation',
    GO_TO_PREVIOUS_STEP: 'scenes.S19.S19_D0_F76_C9.go_to_previous_step',
    CURRENTLY_ON_STEP: 'scenes.S19.S19_D0_F76_C9.currently_on_step',
    OF: 'scenes.S19.S19_D0_F76_C9.of',
    PREVIOUS_STEP: 'scenes.S19.S19_D0_F76_C9.previous_step',
    STEP: 'scenes.S19.S19_D0_F76_C9.step',
    GO_TO_NEXT_STEP: 'scenes.S19.S19_D0_F76_C9.go_to_next_step',
    CLICK_TO_PROCEED: 'scenes.S19.S19_D0_F76_C9.click_to_proceed',
    COMPLETE_REQUIREMENTS: 'scenes.S19.S19_D0_F76_C9.complete_requirements',
    NEXT_STEP: 'scenes.S19.S19_D0_F76_C9.next_step',
    RESTART_ENTIRE_ACTIVITY: 'scenes.S19.S19_D0_F76_C9.restart_entire_activity',
    RESTART_ACTIVITY: 'scenes.S19.S19_D0_F76_C9.restart_activity',
    COMPLETE_EQUATION_TO_PROCEED: 'scenes.S19.S19_D0_F76_C9.complete_equation_to_proceed',
    DIVIDE_LEFT_CORRECTLY_TO_PROCEED: 'scenes.S19.S19_D0_F76_C9.divide_left_correctly_to_proceed',
    DIVIDE_RIGHT_CORRECTLY_TO_FINISH: 'scenes.S19.S19_D0_F76_C9.divide_right_correctly_to_finish',

    // Misc
    ONE_DATE: 'scenes.S19.S19_D0_F76_C9.one_date',
  },
};

export default INTERACTIVE_3_CONFIG;
