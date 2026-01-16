const interactive5Config = {
  // Default values
  defaultValues: {
    currentAge: 12,
    weeklyProfit: 250,
    investmentPercentage: 50,
    businessGrowthRate: 25,
    investmentReturn: 8,
  },

  // Slider configurations
  sliders: {
    currentAge: {
      min: 10,
      max: 18,
      step: 1,
    },
    weeklyProfit: {
      min: 50,
      max: 500,
      step: 10,
    },
    investmentPercentage: {
      min: 10,
      max: 90,
      step: 5,
    },
    businessGrowthRate: {
      min: 5,
      max: 50,
      step: 5,
    },
    investmentReturn: {
      min: 4,
      max: 12,
      step: 1,
    },
  },

  // Colors
  colors: {
    business: '#235790',
    portfolio: '#5E24E0',
    total: '#17644A',
    accent: '#5C0000',
    milestone: '#9B303A',
  },

  // Chart and calculation constants
  constants: {
    maxYears: 30,
    businessValueMultiplier: 2, // Used in businessValue = currentWeeklyProfit * 52 * 2
    weeksPerYear: 52,
  },

  // Display and data intervals
  display: {
    tenYearInterval: 10,
    twentyYearInterval: 20,
    fifteenYearInterval: 15,
  },

  // Formatting thresholds
  formatting: {
    millionThreshold: 1000000,
    thousandThreshold: 1000,
    millionDivisor: 1000000,
    thousandDivisor: 1000,
  },

  // Milestone thresholds
  milestones: {
    thousand: 1000,
    hundredThousand: 100000,
    million: 1000000,
  },

  // Achievement thresholds
  achievements: {
    earlyMillionaireAge: 21,
    conservativeReturnThreshold: 6,
  },

  // Translation keys
  translations: {
    adjustParameters: 'scenes.S13.S13_D0_FX_C9.adjust_parameters',
    currentAge: 'scenes.S13.S13_D0_FX_C9.current_age',
    currentAgeSlider: 'scenes.S13.S13_D0_FX_C9.current_age_slider',
    yearsOld: 'scenes.S13.S13_D0_FX_C9.years_old',
    setCurrentAgeBetween: 'scenes.S13.S13_D0_FX_C9.set_current_age_between',
    and: 'scenes.S13.S13_D0_FX_C9.and',
    years: 'scenes.S13.S13_D0_FX_C9.years',
    currentlySetTo: 'scenes.S13.S13_D0_FX_C9.currently_set_to',
    weeklyBusinessProfit: 'scenes.S13.S13_D0_FX_C9.weekly_business_profit',
    weeklyBusinessProfitSlider: 'scenes.S13.S13_D0_FX_C9.weekly_business_profit_slider',
    dollarsPerWeek: 'scenes.S13.S13_D0_FX_C9.dollars_per_week',
    setWeeklyBusinessProfitBetween: 'scenes.S13.S13_D0_FX_C9.set_weekly_business_profit_between',
    perWeek: 'scenes.S13.S13_D0_FX_C9.per_week',
    percentageToInvest: 'scenes.S13.S13_D0_FX_C9.percentage_to_invest',
    investmentPercentageSlider: 'scenes.S13.S13_D0_FX_C9.investment_percentage_slider',
    percentToInvest: 'scenes.S13.S13_D0_FX_C9.percent_to_invest',
    setPercentageOfBusinessProfitToInvestBetween:
      'scenes.S13.S13_D0_FX_C9.set_percentage_of_business_profit_to_invest_between',
    businessGrowthRate: 'scenes.S13.S13_D0_FX_C9.business_growth_rate',
    businessGrowthRateSlider: 'scenes.S13.S13_D0_FX_C9.business_growth_rate_slider',
    percentAnnualGrowth: 'scenes.S13.S13_D0_FX_C9.percent_annual_growth',
    setAnnualBusinessGrowthRateBetween: 'scenes.S13.S13_D0_FX_C9.set_annual_business_growth_rate_between',
    perYear: 'scenes.S13.S13_D0_FX_C9.per_year',
    investmentReturnApr: 'scenes.S13.S13_D0_FX_C9.investment_return_apr',
    investmentReturnRateSlider: 'scenes.S13.S13_D0_FX_C9.investment_return_rate_slider',
    percentAnnualReturn: 'scenes.S13.S13_D0_FX_C9.percent_annual_return',
    setExpectedAnnualInvestmentReturnBetween:
      'scenes.S13.S13_D0_FX_C9.set_expected_annual_investment_return_between',
    yourPathToMillion: 'scenes.S13.S13_D0_FX_C9.your_path_to_million',
    chartShowsProjectedWealthGrowthOverTime:
      'scenes.S13.S13_D0_FX_C9.chart_shows_projected_wealth_growth_over_time',
    chartDisplaysDataFromAge: 'scenes.S13.S13_D0_FX_C9.chart_displays_data_from_age',
    toAge: 'scenes.S13.S13_D0_FX_C9.to_age',
    chartDataSummary: 'scenes.S13.S13_D0_FX_C9.chart_data_summary',
    keyDataPoints: 'scenes.S13.S13_D0_FX_C9.key_data_points',
    startingAge: 'scenes.S13.S13_D0_FX_C9.starting_age',
    currentWeeklyProfit: 'scenes.S13.S13_D0_FX_C9.current_weekly_profit',
    investmentPercentage: 'scenes.S13.S13_D0_FX_C9.investment_percentage',
    investmentReturnRate: 'scenes.S13.S13_D0_FX_C9.investment_return_rate',
    annually: 'scenes.S13.S13_D0_FX_C9.annually',
    projectedNetWorthAtAge: 'scenes.S13.S13_D0_FX_C9.projected_net_worth_at_age',
    projectedToReachMillionAtAge: 'scenes.S13.S13_D0_FX_C9.projected_to_reach_million_at_age',
    ageInYears: 'scenes.S13.S13_D0_FX_C9.age_in_years',
    dollarAmount: 'scenes.S13.S13_D0_FX_C9.dollar_amount',
    age: 'scenes.S13.S13_D0_FX_C9.age',
    millionaireGoal: 'scenes.S13.S13_D0_FX_C9.millionaire_goal',
    investmentPortfolio: 'scenes.S13.S13_D0_FX_C9.investment_portfolio',
    businessValue: 'scenes.S13.S13_D0_FX_C9.business_value',
    totalNetWorth: 'scenes.S13.S13_D0_FX_C9.total_net_worth',
    financialMilestonesAndProjections: 'scenes.S13.S13_D0_FX_C9.financial_milestones_and_projections',
    keyMilestones: 'scenes.S13.S13_D0_FX_C9.key_milestones',
    financialMilestoneAchievements: 'scenes.S13.S13_D0_FX_C9.financial_milestone_achievements',
    firstThousand: 'scenes.S13.S13_D0_FX_C9.first_thousand',
    firstThousandDollarsAtAge: 'scenes.S13.S13_D0_FX_C9.first_thousand_dollars_at_age',
    unknown: 'scenes.S13.S13_D0_FX_C9.unknown',
    firstHundredThousand: 'scenes.S13.S13_D0_FX_C9.first_hundred_thousand',
    firstHundredThousandDollarsAtAge: 'scenes.S13.S13_D0_FX_C9.first_hundred_thousand_dollars_at_age',
    millionaire: 'scenes.S13.S13_D0_FX_C9.millionaire',
    millionaireStatusAtAge: 'scenes.S13.S13_D0_FX_C9.millionaire_status_at_age',
    valueAtAge: 'scenes.S13.S13_D0_FX_C9.value_at_age',
    projectedValuesAtAgeFifteenYearsFromNow:
      'scenes.S13.S13_D0_FX_C9.projected_values_at_age_fifteen_years_from_now',
    portfolio: 'scenes.S13.S13_D0_FX_C9.portfolio',
    portfolioValue: 'scenes.S13.S13_D0_FX_C9.portfolio_value',
    business: 'scenes.S13.S13_D0_FX_C9.business',
    achievementNotification: 'scenes.S13.S13_D0_FX_C9.achievement_notification',
    earlyFinancialFreedom: 'scenes.S13.S13_D0_FX_C9.early_financial_freedom',
    youWillBeMillionaireBeforeTurning: 'scenes.S13.S13_D0_FX_C9.you_will_be_millionaire_before_turning',
    keepUpGreatWork: 'scenes.S13.S13_D0_FX_C9.keep_up_great_work',
    investmentStrategyNote: 'scenes.S13.S13_D0_FX_C9.investment_strategy_note',
    yourInvestmentReturnIsConservative: 'scenes.S13.S13_D0_FX_C9.your_investment_return_is_conservative',
    considerDiversifyingIntoIndexFunds: 'scenes.S13.S13_D0_FX_C9.consider_diversifying_into_index_funds',
  },
};

export default interactive5Config;
