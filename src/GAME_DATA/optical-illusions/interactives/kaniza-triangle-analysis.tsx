'use client';
import { useEffect, useState } from 'react';
import kanizaTriangleAnalysisConfig from '../configs/kaniza-triangle-analysis';
import { useTranslations } from '../../../hooks/useTranslations';
import { KanizaTriangleAnalysisProps } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

const KanizsaTriangleExplorer: React.FC<KanizaTriangleAnalysisProps> = ({ onInteraction }) => {
  const { dialogIndex } = useGameContext();
  const isFirstIndex = dialogIndex === 1;
  const scenarios = kanizaTriangleAnalysisConfig.scenarios;
  const [showHiddenLines, setShowHiddenLines] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [testedCongruence, setTestedCongruence] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(isFirstIndex ? 0 : scenarios.length - 1);
  const { payload } = useEventListener('kaniza-triangle-analysis');
  const { t } = useTranslations();
  const currentScenario = scenarios[scenarioIndex];

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'scenario' in payload && payload.scenario !== scenarioIndex) {
      navigateScenario(payload.scenario as number);
      setShowHiddenLines(false);
      setShowMeasurements(false);
    }
  }, [payload]);

  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if ('shouldTriangleLinesVisible' in payload && payload.shouldTriangleLinesVisible && showHiddenLines) {
        onInteraction({
          'are-triangle-lines-visible': true,
        });
      }
      if ('shouldMeasurementsVisible' in payload && payload.shouldMeasurementsVisible && showMeasurements) {
        onInteraction({
          'are-measurements-visible': true,
        });
      }
    }
  }, [payload, showHiddenLines, showMeasurements]);

  useEffect(() => {
    if (scenarioIndex === 0 && testedCongruence) {
      onInteraction({
        'scenario-1-completed': true,
      });
    }
    if (scenarioIndex === 1 && testedCongruence) {
      onInteraction({
        'scenario-2-completed': true,
      });
    }
    if (scenarioIndex === 2 && testedCongruence) {
      onInteraction({
        'scenario-3-completed': true,
      });
    }
  }, [scenarioIndex, testedCongruence]);

  const calculatePacmanMouths = (vertices: { x: number; y: number }[]) => {
    return vertices.map((vertex, i) => {
      const v1 = vertices[(i + 1) % 3];
      const v2 = vertices[(i + 2) % 3];

      const vec1 = { x: v1.x - vertex.x, y: v1.y - vertex.y };
      const vec2 = { x: v2.x - vertex.x, y: v2.y - vertex.y };

      const angle1 = Math.atan2(vec1.y, vec1.x);
      const angle2 = Math.atan2(vec2.y, vec2.x);

      let angleDiff = angle2 - angle1;
      while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      let startAngle, endAngle;
      if (angleDiff > 0) {
        startAngle = angle1;
        endAngle = angle2;
      } else {
        startAngle = angle2;
        endAngle = angle1;
      }

      const temp = startAngle;
      startAngle = endAngle;
      endAngle = temp + 2 * Math.PI;

      return {
        cx: vertex.x,
        cy: vertex.y,
        startAngle: startAngle,
        endAngle: endAngle,
      };
    });
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = {
      x: x + radius * Math.cos(startAngle),
      y: y + radius * Math.sin(startAngle),
    };
    const end = {
      x: x + radius * Math.cos(endAngle),
      y: y + radius * Math.sin(endAngle),
    };

    return `
      M ${x} ${y}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}
      Z
    `;
  };

  const resetAll = () => {
    setShowHiddenLines(false);
    setShowMeasurements(false);
    setTestedCongruence(false);
  };

  const testCongruence = () => {
    setTestedCongruence(true);
  };

  const getAngleLabel = (triangleIndex: number, angleKey: string) => {
    if (triangleIndex === 0) {
      return t(`scenes.S10.S10_D0_F61_C9.${angleKey.toLowerCase()}`);
    } else {
      const angleMap: { [key: string]: string } = { A: 'X', B: 'Y', C: 'Z' };
      return angleMap[angleKey] || angleKey;
    }
  };

  const getSideLabel = (triangleIndex: number, sideKey: string) => {
    if (triangleIndex === 0) {
      return t(`scenes.S10.S10_D0_F61_C9.side_${sideKey}`);
    } else {
      const sideMap: { [key: string]: string } = { a: 'x', b: 'y', c: 'z' };
      return t(`scenes.S10.S10_D0_F61_C9.side_${sideMap[sideKey] || sideKey}`);
    }
  };

  const renderTriangle = (triangleIndex: number) => {
    const triangle = currentScenario.triangles[triangleIndex];
    const vertices = triangle.vertices;
    const pacmanMouths = calculatePacmanMouths(vertices);

    return (
      <svg viewBox="0 0 300 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <rect width="300" height="220" fill="white" />

        {(showHiddenLines || showMeasurements) && (
          <>
            <line
              x1={vertices[0].x}
              y1={vertices[0].y}
              x2={vertices[1].x}
              y2={vertices[1].y}
              stroke="#006BE0"
              strokeWidth="2"
              strokeDasharray={showHiddenLines ? 'none' : '5,5'}
            />
            <line
              x1={vertices[1].x}
              y1={vertices[1].y}
              x2={vertices[2].x}
              y2={vertices[2].y}
              stroke="#006BE0"
              strokeWidth="2"
              strokeDasharray={showHiddenLines ? 'none' : '5,5'}
            />
            <line
              x1={vertices[2].x}
              y1={vertices[2].y}
              x2={vertices[0].x}
              y2={vertices[0].y}
              stroke="#006BE0"
              strokeWidth="2"
              strokeDasharray={showHiddenLines ? 'none' : '5,5'}
            />
          </>
        )}

        {pacmanMouths.map((mouth, i) => (
          <path
            key={`pacman-${triangleIndex}-${i}`}
            d={describeArc(mouth.cx, mouth.cy, 22, mouth.startAngle, mouth.endAngle)}
            fill="black"
          />
        ))}
        <text x="20" y="30" fontSize="16" fontWeight="bold" fill="#000000">
          {t('scenes.S10.S10_D0_F61_C9.triangle')} {triangleIndex + 1}
        </text>

        {showMeasurements && (
          <>
            <g>
              <text
                x={(vertices[1].x + vertices[2].x) / 2 + triangle.sideOffset.a.x}
                y={(vertices[1].y + vertices[2].y) / 2 + triangle.sideOffset.a.y}
                fontSize="12"
                textAnchor="middle"
                fill="#006BE0"
                fontWeight="bold"
              >
                {getSideLabel(triangleIndex, 'a')}: {triangle.sides.a.toFixed(1)}
              </text>
            </g>

            <g>
              <text
                x={(vertices[0].x + vertices[2].x) / 2 + triangle.sideOffset.b.x}
                y={(vertices[0].y + vertices[2].y) / 2 + triangle.sideOffset.b.y}
                fontSize="12"
                textAnchor="middle"
                fill="#006BE0"
                fontWeight="bold"
              >
                {getSideLabel(triangleIndex, 'b')}: {triangle.sides.b.toFixed(1)}
              </text>
            </g>

            {scenarioIndex !== 1 && (
              <g>
                <text
                  x={(vertices[0].x + vertices[1].x) / 2 + triangle.sideOffset.c.x}
                  y={(vertices[0].y + vertices[1].y) / 2 + triangle.sideOffset.c.y}
                  fontSize="12"
                  textAnchor="middle"
                  fill="#006BE0"
                  fontWeight="bold"
                >
                  {getSideLabel(triangleIndex, 'c')}: {triangle.sides.c.toFixed(1)}
                </text>
              </g>
            )}

            <g>
              <text
                x={vertices[0].x + triangle.angleOffset.a.x}
                y={vertices[0].y + triangle.angleOffset.a.y}
                fontSize="12"
                textAnchor="middle"
                fill="#238B21"
                fontWeight="bold"
              >
                ∠{getAngleLabel(triangleIndex, 'A')}: {triangle.angles.A}°
              </text>
            </g>

            <g>
              <text
                x={vertices[1].x + triangle.angleOffset.b.x}
                y={vertices[1].y + triangle.angleOffset.b.y}
                fontSize="12"
                textAnchor="middle"
                fill="#238B21"
                fontWeight="bold"
              >
                ∠{getAngleLabel(triangleIndex, 'B')}: {triangle.angles.B}°
              </text>
            </g>

            <g>
              <text
                x={vertices[2].x + triangle.angleOffset.c.x}
                y={vertices[2].y + triangle.angleOffset.c.y}
                fontSize="12"
                textAnchor="middle"
                fill="#238B21"
                fontWeight="bold"
              >
                ∠{getAngleLabel(triangleIndex, 'C')}: {triangle.angles.C}°
              </text>
            </g>
          </>
        )}
      </svg>
    );
  };

  const determineApplicableCriteria = () => {
    const triangle1 = currentScenario.triangles[0];
    const triangle2 = currentScenario.triangles[1];
    const applicable = [];

    if (scenarioIndex !== 1) {
      const sssApplicable =
        Math.abs(triangle1.sides.a - triangle2.sides.a) < 0.1 &&
        Math.abs(triangle1.sides.b - triangle2.sides.b) < 0.1 &&
        Math.abs(triangle1.sides.c - triangle2.sides.c) < 0.1;

      if (sssApplicable) {
        applicable.push('SSS');
      }
    }

    const sasChecks = [
      {
        sides: ['a', 'b'],
        angle: 'C',
        condition:
          Math.abs(triangle1.sides.a - triangle2.sides.a) < 0.1 &&
          Math.abs(triangle1.sides.b - triangle2.sides.b) < 0.1 &&
          Math.abs(triangle1.angles.C - triangle2.angles.C) < 1,
      },
      {
        sides: ['b', 'c'],
        angle: 'A',
        condition:
          Math.abs(triangle1.sides.b - triangle2.sides.b) < 0.1 &&
          Math.abs(triangle1.sides.c - triangle2.sides.c) < 0.1 &&
          Math.abs(triangle1.angles.A - triangle2.angles.A) < 1,
      },
      {
        sides: ['a', 'c'],
        angle: 'B',
        condition:
          Math.abs(triangle1.sides.a - triangle2.sides.a) < 0.1 &&
          Math.abs(triangle1.sides.c - triangle2.sides.c) < 0.1 &&
          Math.abs(triangle1.angles.B - triangle2.angles.B) < 1,
      },
    ];

    const sasApplicable = sasChecks.some((check) => check.condition);
    if (sasApplicable) {
      applicable.push('SAS');
    }

    const asaChecks = [
      {
        angles: ['A', 'B'],
        side: 'c',
        condition:
          Math.abs(triangle1.angles.A - triangle2.angles.A) < 1 &&
          Math.abs(triangle1.angles.B - triangle2.angles.B) < 1 &&
          Math.abs(triangle1.sides.c - triangle2.sides.c) < 0.1,
      },
      {
        angles: ['B', 'C'],
        side: 'a',
        condition:
          Math.abs(triangle1.angles.B - triangle2.angles.B) < 1 &&
          Math.abs(triangle1.angles.C - triangle2.angles.C) < 1 &&
          Math.abs(triangle1.sides.a - triangle2.sides.a) < 0.1,
      },
      {
        angles: ['A', 'C'],
        side: 'b',
        condition:
          Math.abs(triangle1.angles.A - triangle2.angles.A) < 1 &&
          Math.abs(triangle1.angles.C - triangle2.angles.C) < 1 &&
          Math.abs(triangle1.sides.b - triangle2.sides.b) < 0.1,
      },
    ];

    const asaApplicable = asaChecks.some((check) => check.condition);
    if (asaApplicable) {
      applicable.push('ASA');
    }

    if (scenarioIndex !== 1) {
      const aasChecks = [
        {
          angles: ['A', 'B'],
          side: 'c',
          condition:
            Math.abs(triangle1.angles.A - triangle2.angles.A) < 1 &&
            Math.abs(triangle1.angles.B - triangle2.angles.B) < 1 &&
            Math.abs(triangle1.sides.c - triangle2.sides.c) < 0.1,
        },
        {
          angles: ['B', 'C'],
          side: 'a',
          condition:
            Math.abs(triangle1.angles.B - triangle2.angles.B) < 1 &&
            Math.abs(triangle1.angles.C - triangle2.angles.C) < 1 &&
            Math.abs(triangle1.sides.a - triangle2.sides.a) < 0.1,
        },
        {
          angles: ['A', 'C'],
          side: 'b',
          condition:
            Math.abs(triangle1.angles.A - triangle2.angles.A) < 1 &&
            Math.abs(triangle1.angles.C - triangle2.angles.C) < 1 &&
            Math.abs(triangle1.sides.b - triangle2.sides.b) < 0.1,
        },
      ];

      const aasApplicable = aasChecks.some((check) => check.condition);
      if (aasApplicable) {
        applicable.push('AAS');
      }
    } else {
      // For scenario 2, we can check AAS using side a (non-included side) with angles A and B
      const aasApplicable =
        Math.abs(triangle1.angles.A - triangle2.angles.A) < 1 &&
        Math.abs(triangle1.angles.B - triangle2.angles.B) < 1 &&
        Math.abs(triangle1.sides.a - triangle2.sides.a) < 0.1;

      if (aasApplicable) {
        applicable.push('AAS');
      }
    }

    return applicable;
  };

  const getCongruenceExplanation = () => {
    if (!testedCongruence) return null;

    const applicableCriteria = determineApplicableCriteria();

    if (applicableCriteria.length === 0) {
      return {
        isCongruent: false,
        explanation: t('scenes.S10.S10_D0_F61_C9.congruence.not_congruent_explanation'),
        criteria: [],
        details: [],
      };
    }

    return {
      isCongruent: true,
      explanation: `${t('scenes.S10.S10_D0_F61_C9.congruence.congruent_explanation')} ${applicableCriteria.join(', ')}.`,
      criteria: applicableCriteria,
      details: applicableCriteria.map((criterion) => {
        const explanationKey =
          currentScenario.explanations[criterion as keyof typeof currentScenario.explanations];
        return {
          name: criterion,
          explanation: explanationKey ? t(explanationKey) : '',
        };
      }),
    };
  };

  const navigateScenario = (newScenarioIndex: number) => {
    setScenarioIndex(newScenarioIndex);
    resetAll();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 flex-grow">
          <p className="font-bold text-[#00000]">{t(currentScenario.name)}</p>
          <p className="text-[#00000]">{t(currentScenario.description)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setShowHiddenLines(!showHiddenLines)}
          style={{
            padding: '8px 16px',
            backgroundColor: showHiddenLines ? '#006BE0' : 'transparent',
            color: showHiddenLines ? 'white' : '#006BE0',
            border: showHiddenLines ? 'none' : '1px solid #006BE0',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '190px',
          }}
        >
          {showHiddenLines
            ? t('scenes.S10.S10_D0_F61_C9.buttons.hideTriangleLines')
            : t('scenes.S10.S10_D0_F61_C9.buttons.showTriangleLines')}
        </button>

        <button
          onClick={() => setShowMeasurements(!showMeasurements)}
          style={{
            padding: '8px 16px',
            backgroundColor: showMeasurements ? '#006BE0' : 'transparent',
            color: showMeasurements ? 'white' : '#006BE0',
            border: showMeasurements ? 'none' : '1px solid #006BE0',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '190px',
            height: '40px',
          }}
        >
          {showMeasurements
            ? t('scenes.S10.S10_D0_F61_C9.buttons.hideMeasurements')
            : t('scenes.S10.S10_D0_F61_C9.buttons.showMeasurements')}
        </button>

        <button
          onClick={resetAll}
          style={{
            padding: '8px 16px',
            backgroundColor: '#006BE0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            position: 'relative',
            fontWeight: 'medium',
            width: '190px',
            height: '40px',
          }}
        >
          {t('scenes.S10.S10_D0_F61_C9.buttons.resetView')}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6 rounded-lg">
        <div className="rounded-lg shadow-lg h-60">{renderTriangle(0)}</div>
        <div className="rounded-lg shadow-lg h-60">{renderTriangle(1)}</div>
      </div>

      {showMeasurements && !testedCongruence && (
        <div className="mb-6">
          <button
            onClick={testCongruence}
            style={{
              padding: '8px 16px',
              backgroundColor: '#006BE0',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {t('scenes.S10.S10_D0_F61_C9.buttons.testCongruence')}
          </button>
        </div>
      )}

      {testedCongruence &&
        (() => {
          const explanation = getCongruenceExplanation();
          if (!explanation) return null;

          return (
            <div
              className={`p-6 rounded-lg mb-8 ${explanation.isCongruent ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
            >
              <div className="flex items-start">
                <div className="flex flex-col">
                  <span className="font-medium">{explanation.explanation}</span>

                  {explanation.details && explanation.details.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {explanation.details.map((detail, index) => (
                        <div key={index} className="bg-white bg-opacity-60 rounded-lg p-3 border border-gray-200">
                          <h4 className="font-semibold mb-1">
                            {detail.name} -{' '}
                            {t(`scenes.S10.S10_D0_F61_C9.congruence.criteria_names.${detail.name}`)}
                          </h4>
                          <p className="text-gray-700">{detail.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default KanizsaTriangleExplorer;
