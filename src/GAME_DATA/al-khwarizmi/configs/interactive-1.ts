const interactive1Config = {
  TRANSLATION_KEYS: {
    // Main activity labels
    AL_KHWARIZMI_BALANCE_SCALE_ACTIVITY: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_balance_scale_activity',
    BALANCE_SCALE_ACTIVITY: 'scenes.S11.S11_D0_F33_C9.balance_scale_activity',
    CURRENT_QUANTITIES: 'scenes.S11.S11_D0_F33_C9.current_quantities',
    NUMBER_OF_DATES: 'scenes.S11.S11_D0_F33_C9.number_of_dates',
    NUMBER_OF_DIRHAMS: 'scenes.S11.S11_D0_F33_C9.number_of_dirhams',

    // Scale description
    BALANCE_SCALE_SHOWING: 'scenes.S11.S11_D0_F33_C9.balance_scale_showing',
    DATES_ON_LEFT_PLATE: 'scenes.S11.S11_D0_F33_C9.dates_on_left_plate',
    EMPTY_LEFT_PLATE: 'scenes.S11.S11_D0_F33_C9.empty_left_plate',
    AND: 'scenes.S11.S11_D0_F33_C9.and',
    DIRHAMS_ON_RIGHT_PLATE: 'scenes.S11.S11_D0_F33_C9.dirhams_on_right_plate',
    EMPTY_RIGHT_PLATE: 'scenes.S11.S11_D0_F33_C9.empty_right_plate',
    SCALE_IS: 'scenes.S11.S11_D0_F33_C9.scale_is',
    BALANCED: 'scenes.S11.S11_D0_F33_C9.balanced',
    TILTED_LEFT: 'scenes.S11.S11_D0_F33_C9.tilted_left',
    TILTED_RIGHT: 'scenes.S11.S11_D0_F33_C9.tilted_right',
    EMPTY: 'scenes.S11.S11_D0_F33_C9.empty',

    // Halving operations
    HALVING_OPERATIONS: 'scenes.S11.S11_D0_F33_C9.halving_operations',
    REMOVE_HALF_DATES: 'scenes.S11.S11_D0_F33_C9.remove_half_dates',
    REMOVE_HALF_COINS: 'scenes.S11.S11_D0_F33_C9.remove_half_coins',
    REMOVE_HALF_DATES_LEFT_SIDE: 'scenes.S11.S11_D0_F33_C9.remove_half_dates_left_side',
    REMOVE_HALF_DIRHAMS_RIGHT_SIDE: 'scenes.S11.S11_D0_F33_C9.remove_half_dirhams_right_side',

    // Container labels
    DRAGGABLE_ITEMS: 'scenes.S11.S11_D0_F33_C9.draggable_items',
    DIRHAMS: 'scenes.S11.S11_D0_F33_C9.dirhams',
    DATES: 'scenes.S11.S11_D0_F33_C9.dates',
    DATE: 'scenes.S11.S11_D0_F33_C9.date',
    DIRHAMS_CONTAINER_WITH: 'scenes.S11.S11_D0_F33_C9.dirhams_container_with',
    DATES_CONTAINER_WITH: 'scenes.S11.S11_D0_F33_C9.dates_container_with',
    CLICK_TO_PLACE_SCALE: 'scenes.S11.S11_D0_F33_C9.click_to_place_scale',
    NOT_CURRENTLY_INTERACTIVE: 'scenes.S11.S11_D0_F33_C9.not_currently_interactive',

    // Navigation
    INSTRUCTIONS: 'scenes.S11.S11_D0_F33_C9.instructions',
    NAVIGATION_CONTROLS: 'scenes.S11.S11_D0_F33_C9.navigation_controls',
    PREVIOUS_STEP: 'scenes.S11.S11_D0_F33_C9.previous_step',
    STEP: 'scenes.S11.S11_D0_F33_C9.step',
    CURRENT_STEP: 'scenes.S11.S11_D0_F33_C9.current_step',
    NEXT_STEP: 'scenes.S11.S11_D0_F33_C9.next_step',
    RESTART: 'scenes.S11.S11_D0_F33_C9.restart',
    GO_TO_PREVIOUS_STEP: 'scenes.S11.S11_D0_F33_C9.go_to_previous_step',
    CURRENTLY_ON_STEP: 'scenes.S11.S11_D0_F33_C9.currently_on_step',
    GO_TO_NEXT_STEP: 'scenes.S11.S11_D0_F33_C9.go_to_next_step',
    RESTART_ACTIVITY: 'scenes.S11.S11_D0_F33_C9.restart_activity',
    AVAILABLE: 'scenes.S11.S11_D0_F33_C9.available',
    COMPLETE_CURRENT_STEP_FIRST: 'scenes.S11.S11_D0_F33_C9.complete_current_step_first',

    // Success messages
    EXCELLENT_SEE_SCALE_TIPS: 'scenes.S11.S11_D0_F33_C9.excellent_see_scale_tips',
    NOW_NEED_BALANCE: 'scenes.S11.S11_D0_F33_C9.now_need_balance',
    PERFECT_SCALE_BALANCED: 'scenes.S11.S11_D0_F33_C9.perfect_scale_balanced',
    DATES_EQUALS: 'scenes.S11.S11_D0_F33_C9.dates_equals',
    SCALE_TIPS_TOWARD_COINS: 'scenes.S11.S11_D0_F33_C9.scale_tips_toward_coins',
    TO_RESTORE_BALANCE: 'scenes.S11.S11_D0_F33_C9.to_restore_balance',
    WHAT_MUST_WE_DO: 'scenes.S11.S11_D0_F33_C9.what_must_we_do',
    LOOK_WHAT_REMAINS: 'scenes.S11.S11_D0_F33_C9.look_what_remains',
    PERFECTLY_BALANCED: 'scenes.S11.S11_D0_F33_C9.perfectly_balanced',
    SCALE_REVEALED_TRUTH: 'scenes.S11.S11_D0_F33_C9.scale_revealed_truth',
    WONDERFUL: 'scenes.S11.S11_D0_F33_C9.wonderful',
    NOW_WE_HAVE: 'scenes.S11.S11_D0_F33_C9.now_we_have',
    STILL_BALANCED: 'scenes.S11.S11_D0_F33_C9.still_balanced',
    EACH_DATE_WORTH: 'scenes.S11.S11_D0_F33_C9.each_date_worth',

    // Error messages
    NEED_EXACTLY: 'scenes.S11.S11_D0_F33_C9.need_exactly',
    DATES_LEFT_SIDE: 'scenes.S11.S11_D0_F33_C9.dates_left_side',
    CURRENTLY_HAVE: 'scenes.S11.S11_D0_F33_C9.currently_have',
    DATES_SELECTED: 'scenes.S11.S11_D0_F33_C9.dates_selected',
    DIRHAMS_RIGHT_SIDE: 'scenes.S11.S11_D0_F33_C9.dirhams_right_side',
    DIRHAMS_SELECTED: 'scenes.S11.S11_D0_F33_C9.dirhams_selected',

    // Al-Khwarizmi instructions
    AL_KHWARIZMI_PLACE_CURRENT_LEFT: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_place_current_left',
    AL_KHWARIZMI_PLACE_WANT_RIGHT: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_place_want_right',
    AL_KHWARIZMI_SECRET_REMOVE_HALF_DATES: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_secret_remove_half_dates',
    AL_KHWARIZMI_PRECISELY_REMOVE_HALF_COINS: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_precisely_remove_half_coins',
    AL_KHWARIZMI_WONDERFUL_BALANCE_RESTORED: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_wonderful_balance_restored',
    AL_KHWARIZMI_CLOSER_REMOVE_HALF_DATES_AGAIN:
      'scenes.S11.S11_D0_F33_C9.al_khwarizmi_closer_remove_half_dates_again',
    AL_KHWARIZMI_NOW_HALF_COINS_BALANCE: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_now_half_coins_balance',
    AL_KHWARIZMI_EACH_DATE_WORTH: 'scenes.S11.S11_D0_F33_C9.al_khwarizmi_each_date_worth',
    DIRHAMS_POWER_BALANCE: 'scenes.S11.S11_D0_F33_C9.dirhams_power_balance',
    SCALE_REVEALED_ANSWER: 'scenes.S11.S11_D0_F33_C9.scale_revealed_answer',
  },
};

export default interactive1Config;
