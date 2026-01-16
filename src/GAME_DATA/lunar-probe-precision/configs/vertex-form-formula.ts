export type ParamKey = 'a' | 'h' | 'k';

const config = {
  title: 'scenes.S9.S9_D0_FCH1_C9.vertex_form_title',
  subtitle: 'scenes.S9.S9_D0_FCH1_C9.vertex_form_subtitle',
  params: {
    options: {
      a: {
        option1: -0.1,
        option2: -0.05,
        option3: -0.02,
        option4: -0.01,
        option5: 0.02,
        option6: 0.03,
        option7: 0.05,
        option8: 0.1,
      },
      h: {
        option1: -50,
        option2: -25,
        option3: -10,
        option4: 0,
        option5: 10,
        option6: 25,
        option7: 50,
        option8: 75,
      },
      k: {
        option1: -50,
        option2: -30,
        option3: -15,
        option4: 0,
        option5: 15,
        option6: 30,
        option7: 50,
        option8: 60,
      },
    },
    descriptions: {
      a: {
        label: 'scenes.S9.S9_D0_FCH1_C9.param_a_label',
        description: 'scenes.S9.S9_D0_FCH1_C9.param_a_description',
        effectText: 'scenes.S9.S9_D0_FCH1_C9.param_a_effect',
      },
      h: {
        label: 'scenes.S9.S9_D0_FCH1_C9.param_h_label',
        description: 'scenes.S9.S9_D0_FCH1_C9.param_h_description',
        effectText: 'scenes.S9.S9_D0_FCH1_C9.param_h_effect',
      },
      k: {
        label: 'scenes.S9.S9_D0_FCH1_C9.param_k_label',
        description: 'scenes.S9.S9_D0_FCH1_C9.param_k_description',
        effectText: 'scenes.S9.S9_D0_FCH1_C9.param_k_effect',
      },
    },
  },
  visualization: {
    title: 'scenes.S9.S9_D0_FCH1_C9.visualization_title',
    grid: {
      width: 450,
      height: 360,
      xRange: [-60, 100],
      yOffset: 180,
      yScale: 1.8,
    },
    labels: {
      origin: 'scenes.S9.S9_D0_FCH1_C9.origin_label',
      vertex: 'scenes.S9.S9_D0_FCH1_C9.vertex_marker',
    },
  },
  ui: {
    parametersTitle: 'scenes.S9.S9_D0_FCH1_C9.parameters_title',
    currentValueLabel: 'scenes.S9.S9_D0_FCH1_C9.current_value_label',
    currentEquationLabel: 'scenes.S9.S9_D0_FCH1_C9.current_equation_label',
    vertexLabel: 'scenes.S9.S9_D0_FCH1_C9.vertex_label',
    opensUpText: 'scenes.S9.S9_D0_FCH1_C9.opens_up_text',
    opensDownText: 'scenes.S9.S9_D0_FCH1_C9.opens_down_text',
    narrowText: 'scenes.S9.S9_D0_FCH1_C9.narrow_text',
    wideText: 'scenes.S9.S9_D0_FCH1_C9.wide_text',
  },
};

export default config;
