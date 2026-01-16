/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import { AnglePerceptionProps, AnglePerceptionStates, UserResponses } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

const AnglePerceptionLab: React.FC<AnglePerceptionProps> = ({ onInteraction }) => {
  const [angles, setAngles] = useState<number[]>([]);
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [userAngle, setUserAngle] = useState(45);
  const [userResponses, setUserResponses] = useState<UserResponses[]>([]);
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { payload } = useEventListener('angle-perceptions');
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.angle_perceptions && typeof interactiveResponses?.angle_perceptions === 'object'
      ? (interactiveResponses?.angle_perceptions as unknown as AnglePerceptionStates)
      : undefined;
  const [isStartDisabled, setIsStartDisabled] = useState(savedState?.isStartDisabled ?? true);

  const { t } = useTranslations();

  const generateAngles = () => {
    const angles = [];
    for (let i = 0; i < 4; i++) {
      const angle = Math.floor(Math.random() * 140) + 20;
      angles.push(angle);
    }
    return angles;
  };

  useEffect(() => {
    setAngles(generateAngles());
  }, []);

  useEffect(() => {
    if (showResults) {
      onInteraction({
        'show-results': true,
      });
    }
  }, [showResults]);

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'shouldStart' in payload && payload.shouldStart) {
      setIsStartDisabled(false);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: AnglePerceptionStates = { isStartDisabled };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      angle_perceptions: currentState,
    }));
  }, [isStartDisabled]);

  const drawAngle = (ctx: any, centerX: number, centerY: number, angle: number, color: string) => {
    const radius = 170;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.moveTo(centerX, centerY);
    const endX = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const endY = centerY - radius * Math.sin((angle * Math.PI) / 180);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, (-angle * Math.PI) / 180, true);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawGrid = (ctx: any, width: number, height: number) => {
    ctx.beginPath();
    ctx.strokeStyle = '#757575';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x += 20) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    for (let y = 0; y <= height; y += 20) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();
  };

  useEffect(() => {
    if (angles.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    drawGrid(ctx, width, height);

    drawAngle(ctx, width * 0.21, height * 0.65, angles[currentAngleIndex], '#006BE0');

    drawAngle(ctx, width * 0.7, height * 0.65, userAngle, '#EB0000');
  }, [angles, currentAngleIndex, userAngle]);

  const submitAngle = () => {
    const newResponses = [
      ...userResponses,
      {
        referenceAngle: angles[currentAngleIndex],
        userAngle: userAngle,
        error: userAngle - angles[currentAngleIndex],
      },
    ];
    setUserResponses(newResponses);

    if (currentAngleIndex < angles.length - 1) {
      setCurrentAngleIndex((prev) => prev + 1);
      setUserAngle(45);
    } else {
      setShowResults(true);
    }
  };

  const getResultsData = () => {
    return userResponses.map((response, index) => ({
      id: index + 1,
      referenceAngle: response.referenceAngle,
      error: response.error,
      userAngle: response.userAngle,
      zeroLine: 0,
      pattern: response.error > 0 ? 'dots' : 'lines',
    }));
  };

  if (showResults) {
    return (
      <div className="flex">
        <div className="w-full max-w-4xl">
          <div className="bg-white">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl text-center font-semibold pb-4">
                  {t('scenes.S6.S6_D0_F24_C9.angle_perception_errors')}
                </h3>
                <div aria-labelledby={t('scenes.S6.S6_D0_F24_C9.angle_perception_errors')} role="figure">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={getResultsData()}
                      margin={{ top: 20, right: 10, bottom: 60, left: 40 }}
                      aria-label={t('scenes.S6.S6_D0_F24_C9.bar_chart')}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="undefined" />
                      <XAxis
                        dataKey="id"
                        name={t('scenes.S6.S6_D0_F24_C9.reference_angle')}
                        label={{
                          value: t('scenes.S6.S6_D0_F24_C9.reference_angle'),
                          position: 'bottom',
                          offset: 20,
                          fill: '#000000',
                        }}
                        tickFormatter={(id: number) => {
                          // Find the reference angle for this bar
                          const ref = getResultsData().find((d) => d.id === id);
                          return ref
                            ? `${t('scenes.S6.S6_D0_F24_C9.ref_angle_label')} ${id} (${ref.referenceAngle}°)`
                            : `${t('scenes.S6.S6_D0_F24_C9.ref_angle_label')} ${id}`;
                        }}
                        stroke="#000000"
                      />
                      <YAxis
                        domain={[-45, 45]}
                        label={() => {
                          return (
                            <text
                              x={-135}
                              y={45}
                              textAnchor="middle"
                              dominantBaseline="central"
                              transform="rotate(-90)"
                              fill="#000000"
                            >
                              {t('scenes.S6.S6_D0_F24_C9.error')}
                            </text>
                          );
                        }}
                        stroke="#000000"
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (!active || !payload || !payload.length) return null;
                          const data = payload[0].payload;
                          const error = data.error;
                          const userAngle = data.userAngle;
                          const errorAbs = Math.abs(error);
                          const overOrUnder =
                            error > 0
                              ? t('scenes.S6.S6_D0_F24_C9.over_estimated')
                              : t('scenes.S6.S6_D0_F24_C9.under_estimated');
                          const refAngle = data.referenceAngle;
                          return (
                            <div
                              style={{
                                background: 'white',
                                border: '1px solid #ccc',
                                padding: 8,
                                borderRadius: 4,
                              }}
                            >
                              <div style={{ fontWeight: 600 }}>
                                {t('scenes.S6.S6_D0_F24_C9.ref_angle_label')}: {refAngle}°
                              </div>
                              <div>
                                {t('scenes.S6.S6_D0_F24_C9.your_estimate')}: {userAngle}°
                              </div>
                              {errorAbs !== 0 && (
                                <div>
                                  {errorAbs}° {overOrUnder}
                                </div>
                              )}
                            </div>
                          );
                        }}
                      />
                      <ReferenceLine y={0} stroke="#757575" strokeDasharray="3 3" />
                      <defs>
                        <pattern id="dots" patternUnits="userSpaceOnUse" width="10" height="10">
                          <circle cx="5" cy="5" r="2" fill="#006BE0" />
                        </pattern>
                        <pattern id="lines" patternUnits="userSpaceOnUse" width="10" height="10">
                          <line x1="0" y1="5" x2="10" y2="5" stroke="#EB0000" strokeWidth="2" />
                        </pattern>
                      </defs>
                      <Bar
                        dataKey="error"
                        shape={(props: any) => {
                          const { x, y, width, height } = props;
                          const error = props.payload.error;
                          const pattern = error > 0 ? 'lines' : 'dots';
                          return (
                            <rect
                              x={x}
                              y={error < 0 ? y + height : y}
                              width={width}
                              height={Math.abs(height)}
                              fill={`url(#${pattern})`}
                              stroke={error > 0 ? '#EB0000' : '#006BE0'}
                              strokeWidth={1}
                            />
                          );
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="sr-only">
                  {userResponses.map((response, index) => (
                    <div key={index}>
                      {t('scenes.S6.S6_D0_F24_C9.ariaLabels.trial')} {index + 1}:{' '}
                      {t('scenes.S6.S6_D0_F24_C9.reference_angle')}: {response.referenceAngle}°{' '}
                      {t('scenes.S6.S6_D0_F24_C9.ariaLabels.user_angle')}: {response.userAngle}°{' '}
                      {t('scenes.S6.S6_D0_F24_C9.error')}: {response.error}°
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-sm text-[#000000]">
                  <span className="inline-flex items-center mr-4">
                    <span className="flex items-center">
                      <div className="border border-[#757575] rounded p-1 mr-1">
                        <svg width="10" height="10">
                          <rect width="10" height="10" fill="url(#lines)" />
                        </svg>
                      </div>
                      <span className="sr-only">{t('scenes.S6.S6_D0_F24_C9.ariaLabels.red_lined_legend')}</span>
                      {t('scenes.S6.S6_D0_F24_C9.over_estimated')}
                    </span>
                  </span>
                  <span className="inline-flex items-center">
                    <span className="flex items-center">
                      <div className="border border-[#757575] rounded p-1 mr-1">
                        <svg width="10" height="10">
                          <rect width="10" height="10" fill="url(#dots)" />
                        </svg>
                      </div>
                      <span className="sr-only">{t('scenes.S6.S6_D0_F24_C9.ariaLabels.blue_dotted_legend')}</span>
                      {t('scenes.S6.S6_D0_F24_C9.under_estimated')}
                    </span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setAngles(generateAngles());
                  setCurrentAngleIndex(0);
                  setUserAngle(45);
                  setUserResponses([]);
                  setShowResults(false);
                }}
                className="w-full px-4 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white"
              >
                {t('dialog.button.try-again')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="bg-white">
          <div className="">
            <div className="space-y-6">
              <div className="text-center mb-4">
                <span className="text-sm font-medium">
                  {t('scenes.common.angle')} {currentAngleIndex + 1} {t('scenes.common.of')} {angles.length}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full bg-white border border-gray-200 rounded-lg"
                aria-label={t('scenes.S6.S6_D0_F24_C9.ariaLabels.canvas')}
              />

              <div className="flex items-center space-x-4">
                <div style={{ flex: '1', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '34%',
                      left: '0',
                      width: '99%',
                      height: '8px',
                      backgroundColor: '#757575',
                      transform: 'translateY(-50%)',
                      borderRadius: '4px',
                      marginTop: '2px',
                      pointerEvents: 'none',
                    }}
                  ></div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '34%',
                      left: '0',
                      width: `${(userAngle / 180) * 100}% `,
                      height: '8px',
                      backgroundColor: '#006BE0',
                      transform: 'translateY(-50%)',
                      borderRadius: '4px',
                      marginTop: '2px',
                      pointerEvents: 'none',
                    }}
                  ></div>
                  <input
                    type="range"
                    value={userAngle}
                    min={0}
                    max={180}
                    step={1}
                    placeholder={'0'}
                    onChange={(e) => setUserAngle(parseInt(e.target.value))}
                    className="w-full"
                    aria-live="off"
                    aria-label={`${t('scenes.S6.S6_D0_F24_C9.ariaLabels.adjust_angle')}: ${userAngle}`}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      appearance: 'none',
                      backgroundColor: 'transparent',
                      width: '100%',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  onClick={submitAngle}
                  className="px-4 py-1 rounded transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2lg:px-4 lg:py-2 bg-[#006BE0] hover:bg-blue-600 text-white disabled:hover:bg-[#006BE0] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isStartDisabled}
                >
                  {currentAngleIndex < angles.length - 1
                    ? `${t('dialog.button.next')}`
                    : `${t('dialog.button.show_result')}`}
                </button>
              </div>
              {!isStartDisabled && (
                <p className="text-center">
                  {currentAngleIndex < angles.length - 1
                    ? t('scenes.S6.S6_D0_F24_C9.instructions.next')
                    : t('scenes.S6.S6_D0_F24_C9.instructions.show_results')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnglePerceptionLab;
