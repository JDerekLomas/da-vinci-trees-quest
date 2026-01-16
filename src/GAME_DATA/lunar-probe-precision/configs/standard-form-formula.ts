export type ParamKey = 'a' | 'b' | 'c';

const config = {
  title: 'scenes.S7.S7_D0_FSQ4_C9.standard_form_title',
  subtitle: 'scenes.S7.S7_D0_FSQ4_C9.standard_form_subtitle',
  params: {
    options: {
      a: {
        option5: -0.1,
        option2: -0.05,
        option1: -0.02,
        option7: -0.01,
        option4: 0.02,
        option8: 0.03,
        option3: 0.05,
        option6: 0.1,
      },
      b: {
        option4: -2,
        option2: -1,
        option7: -0.5,
        option5: 0,
        option6: 0.5,
        option1: 1,
        option3: 2,
        option8: 3,
      },
      c: {
        option4: -40,
        option2: -20,
        option7: -10,
        option5: 0,
        option6: 10,
        option1: 20,
        option8: 30,
        option3: 40,
      },
    },
    descriptions: {
      a: {
        label: 'scenes.S7.S7_D0_FSQ4_C9.param_a_label',
        description: 'scenes.S7.S7_D0_FSQ4_C9.param_a_description',
        effectText: 'scenes.S7.S7_D0_FSQ4_C9.param_a_effect',
      },
      b: {
        label: 'scenes.S7.S7_D0_FSQ4_C9.param_b_label',
        description: 'scenes.S7.S7_D0_FSQ4_C9.param_b_description',
        effectText: 'scenes.S7.S7_D0_FSQ4_C9.param_b_effect',
      },
      c: {
        label: 'scenes.S7.S7_D0_FSQ4_C9.param_c_label',
        description: 'scenes.S7.S7_D0_FSQ4_C9.param_c_description',
        effectText: 'scenes.S7.S7_D0_FSQ4_C9.param_c_effect',
      },
    },
  },
  visualization: {
    title: 'scenes.S7.S7_D0_FSQ4_C9.visualization_title',
    grid: {
      width: 450,
      height: 360,
      xRange: [-40, 40],
      yOffset: 180,
      yScale: 2.5,
    },
    labels: {
      origin: 'scenes.S7.S7_D0_FSQ4_C9.origin_label',
      yIntercept: 'scenes.S7.S7_D0_FSQ4_C9.y_intercept_marker',
    },
  },
  ui: {
    parametersTitle: 'scenes.S7.S7_D0_FSQ4_C9.parameters_title',
    currentValueLabel: 'scenes.S7.S7_D0_FSQ4_C9.current_value_label',
    currentEquationLabel: 'scenes.S7.S7_D0_FSQ4_C9.current_equation_label',
    yInterceptLabel: 'scenes.S7.S7_D0_FSQ4_C9.y_intercept_label',
    vertexLabel: 'scenes.S7.S7_D0_FSQ4_C9.vertex_label',
    opensUpText: 'scenes.S7.S7_D0_FSQ4_C9.opens_up_text',
    opensDownText: 'scenes.S7.S7_D0_FSQ4_C9.opens_down_text',
    narrowText: 'scenes.S7.S7_D0_FSQ4_C9.narrow_text',
    wideText: 'scenes.S7.S7_D0_FSQ4_C9.wide_text',
    leftShiftText: 'scenes.S7.S7_D0_FSQ4_C9.left_shift_text',
    rightShiftText: 'scenes.S7.S7_D0_FSQ4_C9.right_shift_text',
    noShiftText: 'scenes.S7.S7_D0_FSQ4_C9.no_shift_text',
    aboveAxisText: 'scenes.S7.S7_D0_FSQ4_C9.above_axis_text',
    belowAxisText: 'scenes.S7.S7_D0_FSQ4_C9.below_axis_text',
    onAxisText: 'scenes.S7.S7_D0_FSQ4_C9.on_axis_text',
  },
};

export default config;
