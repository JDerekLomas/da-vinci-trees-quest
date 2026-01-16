const kanizaTriangleAnalysisConfig = {
  scenarios: [
    {
      name: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario1.name',
      description: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario1.description',
      isCongruent: true,
      triangles: [
        {
          vertices: [
            { x: 150, y: 60 },
            { x: 230, y: 180 },
            { x: 70, y: 180 },
          ],
          sides: { a: 141.4, b: 141.4, c: 141.4 },
          angles: { A: 60, B: 60, C: 60 },
          sideOffset: { a: { x: 0, y: 20 }, b: { x: -55, y: 0 }, c: { x: 55, y: 0 } },
          angleOffset: { a: { x: 0, y: -25 }, b: { x: 10, y: 35 }, c: { x: -10, y: 35 } },
        },
        {
          vertices: [
            { x: 150, y: 60 },
            { x: 230, y: 180 },
            { x: 70, y: 180 },
          ],
          sides: { a: 141.4, b: 141.4, c: 141.4 },
          angles: { A: 60, B: 60, C: 60 },
          sideOffset: { a: { x: 0, y: 20 }, b: { x: -55, y: 0 }, c: { x: 55, y: 0 } },
          angleOffset: { a: { x: 0, y: -25 }, b: { x: 10, y: 35 }, c: { x: -10, y: 35 } },
        },
      ],
      explanations: {
        SSS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario1.explanations.SSS',
        SAS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario1.explanations.SAS',
        ASA: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario1.explanations.ASA',
        AAS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario1.explanations.AAS',
      },
    },
    {
      name: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario2.name',
      description: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario2.description',
      isCongruent: true,
      triangles: [
        {
          vertices: [
            { x: 150, y: 60 },
            { x: 200, y: 180 },
            { x: 70, y: 180 },
          ],
          sides: { a: 120, b: 120, c: 101.45 },
          angles: { A: 65, B: 65, C: 50 },
          sideOffset: { a: { x: 0, y: 20 }, b: { x: -55, y: 0 }, c: { x: 55, y: 0 } },
          angleOffset: { a: { x: 0, y: -25 }, b: { x: 10, y: 35 }, c: { x: -10, y: 35 } },
        },
        {
          vertices: [
            { x: 150, y: 60 },
            { x: 200, y: 180 },
            { x: 70, y: 180 },
          ],
          sides: { a: 120, b: 120, c: 101.45 },
          angles: { A: 65, B: 65, C: 50 },
          sideOffset: { a: { x: 0, y: 20 }, b: { x: -55, y: 0 }, c: { x: 55, y: 0 } },
          angleOffset: { a: { x: 0, y: -25 }, b: { x: 10, y: 35 }, c: { x: -10, y: 35 } },
        },
      ],
      explanations: {
        SAS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario2.explanations.SAS',
        ASA: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario2.explanations.ASA',
        AAS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario2.explanations.AAS',
      },
    },
    {
      name: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario3.name',
      description: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario3.description',
      isCongruent: false,
      triangles: [
        {
          vertices: [
            { x: 150, y: 60 },
            { x: 230, y: 180 },
            { x: 70, y: 180 },
          ],
          sides: { a: 141.4, b: 141.4, c: 141.4 },
          angles: { A: 60, B: 60, C: 60 },
          sideOffset: { a: { x: 0, y: 20 }, b: { x: -55, y: 0 }, c: { x: 55, y: 0 } },
          angleOffset: { a: { x: 0, y: -25 }, b: { x: 10, y: 35 }, c: { x: -10, y: 35 } },
        },
        {
          vertices: [
            { x: 150, y: 40 },
            { x: 250, y: 190 },
            { x: 50, y: 190 },
          ],
          sides: { a: 180, b: 180, c: 180 },
          angles: { A: 60, B: 60, C: 60 },
          sideOffset: { a: { x: 0, y: 20 }, b: { x: -55, y: 0 }, c: { x: 55, y: 0 } },
          angleOffset: { a: { x: 0, y: -25 }, b: { x: 25, y: -25 }, c: { x: -25, y: -25 } },
        },
      ],
      explanations: {
        SSS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario3.explanations.SSS',
        SAS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario3.explanations.SAS',
        ASA: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario3.explanations.ASA',
        AAS: 'scenes.S10.S10_D0_F61_C9.scenarios.scenario3.explanations.AAS',
      },
    },
  ],
};

export default kanizaTriangleAnalysisConfig;
