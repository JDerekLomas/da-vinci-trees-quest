import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { RandomizationInteractiveProps, RandomizationDisplayFlags } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

interface Participant {
  id: number;
  score: number;
  shade: number;
  group: 'neuroboost' | 'placebo' | null;
  assignedGroup: 'neuroboost' | 'placebo' | null;
  falling: boolean;
}

interface Payload {
  target: string;
  displayFlags?: RandomizationDisplayFlags;
  disabled?: string;
}

const RandomizationInteractive: React.FC<RandomizationInteractiveProps> = ({ interaction, onInteraction }) => {
  const { translations } = interaction;
  const { t } = useTranslations();
  const { payload } = useEventListener('randomization-interactive');
  const gameContext = useContext(GameContext);
  const { interactiveResponses } = gameContext || {};

  // Get saved state to restore randomization status
  const savedState =
    interactiveResponses?.['7_0'] && typeof interactiveResponses?.['7_0'] === 'object'
      ? interactiveResponses['7_0']
      : undefined;

  const [isRandomized, setIsRandomized] = useState(savedState?.['randomization-complete'] === true || false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [neuroBoostGroup, setNeuroBoostGroup] = useState<Participant[]>([]);
  const [placeboGroup, setPlaceboGroup] = useState<Participant[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationOrder, setAnimationOrder] = useState<number[]>([]);

  // Track if user has viewed analysis at least once (allows free exploration after)
  const [hasViewedAnalysis, setHasViewedAnalysis] = useState(false);

  // Persist display flags in state so they remain even when payload resets
  const [displayFlags, setDisplayFlags] = useState<RandomizationDisplayFlags>({});

  // Update display flags when payload changes
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'displayFlags' in payload) {
      const payloadWithFlags = payload as Payload;
      if (payloadWithFlags.displayFlags) {
        setDisplayFlags((prev) => ({
          ...prev,
          ...payloadWithFlags.displayFlags,
        }));
      }
    }
  }, [payload]);

  // Generate 100 participants with scores distributed in a bell curve
  const generateParticipants = (): Participant[] => {
    const newParticipants: Participant[] = [];
    // Bell curve distribution - total ~100
    const distribution = [3, 8, 15, 20, 22, 18, 10, 3, 1, 0];

    let id = 0;
    distribution.forEach((count, shadeIndex) => {
      const minScore = shadeIndex * 10;
      const maxScore = (shadeIndex + 1) * 10;

      for (let i = 0; i < count; i++) {
        const score = Math.floor(Math.random() * (maxScore - minScore) + minScore);
        newParticipants.push({
          id: id++,
          score,
          shade: shadeIndex,
          group: null,
          assignedGroup: null,
          falling: false,
        });
      }
    });

    // Shuffle to randomize positions
    return newParticipants.sort(() => Math.random() - 0.5);
  };

  const [participants, setParticipants] = useState<Participant[]>(generateParticipants());

  // Get color based on shade (0-9) - using BLUE gradient (light to dark)
  const getColor = (shade: number): string => {
    const colors = [
      '#dbeafe', // lightest blue
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6', // main blue
      '#2563eb',
      '#1d4ed8',
      '#1e40af',
      '#1e3a8a',
      '#1e3a8a', // darkest blue
    ];
    return colors[shade];
  };

  // Animation effect - drop balls one by one into groups
  useEffect(() => {
    if (!isAnimating || currentIndex >= animationOrder.length) {
      if (isAnimating && currentIndex >= animationOrder.length) {
        setTimeout(() => {
          setIsAnimating(false);
          setIsRandomized(true);
        }, 300);
      }
      return;
    }

    const timer = setTimeout(() => {
      // Get the participant index from the randomized order
      const participantIndex = animationOrder[currentIndex];
      const currentParticipant = participants[participantIndex];

      // Use pre-assigned group
      const assignedGroup = currentParticipant.assignedGroup;

      setParticipants((prev) =>
        prev.map((participant, idx) =>
          idx === participantIndex
            ? {
                ...participant,
                group: assignedGroup,
                falling: true,
              }
            : participant,
        ),
      );

      setCurrentIndex(currentIndex + 1);
    }, 60); // Drop one every 60ms

    return () => clearTimeout(timer);
  }, [isAnimating, currentIndex, animationOrder, participants]);

  const handleRandomize = () => {
    // Shuffle participants and pre-assign to groups (50-50 split)
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const withGroups = shuffled.map((p, idx) => ({
      ...p,
      assignedGroup: (idx < 50 ? 'neuroboost' : 'placebo') as 'neuroboost' | 'placebo',
    }));

    // Create randomized animation order (which participant drops when)
    const order = Array.from({ length: 100 }, (_, i) => i).sort(() => Math.random() - 0.5);

    setParticipants(withGroups);
    setAnimationOrder(order);
    setIsAnimating(true);
    setCurrentIndex(0);
  };

  const handleReset = () => {
    const newParticipants = generateParticipants();
    setParticipants(newParticipants);
    setIsRandomized(false);
    setShowAnalysis(false);
    setNeuroBoostGroup([]);
    setPlaceboGroup([]);
    setIsAnimating(false);
    setCurrentIndex(0);
    setAnimationOrder([]);

    // Clear persisted state flags
    onInteraction({
      'randomization-complete': false,
      'analysis-viewed': false,
    });

    // If user has viewed analysis, make buttons visible for free exploration
    if (hasViewedAnalysis) {
      setDisplayFlags({
        showRandomizeButtons: true,
        showAnalysisButton: true,
      });
    }
  };

  // Update group arrays when animation completes
  useEffect(() => {
    if (isRandomized && !isAnimating) {
      const neuro = participants.filter((p) => p.group === 'neuroboost');
      const placebo = participants.filter((p) => p.group === 'placebo');
      setNeuroBoostGroup(neuro);
      setPlaceboGroup(placebo);

      // Notify completion
      onInteraction({
        'randomization-complete': true,
      });
    }
  }, [isRandomized, isAnimating, participants, onInteraction]);

  // Check for randomization completion when flag is set in payload
  useEffect(() => {
    if (
      payload &&
      typeof payload === 'object' &&
      'checkForRandomizationComplete' in payload &&
      payload.checkForRandomizationComplete &&
      isRandomized &&
      !isAnimating
    ) {
      onInteraction({
        'randomization-complete': true,
      });
    }
  }, [payload, isRandomized, isAnimating, onInteraction]);

  // Set flag when user views analysis
  useEffect(() => {
    if (showAnalysis) {
      setHasViewedAnalysis(true);
      onInteraction({
        'analysis-viewed': true,
      });
    }
  }, [showAnalysis, onInteraction]);

  const calculateStats = (group: Participant[]) => {
    if (group.length === 0) return { mean: '0.0', sd: '0.0' };

    const mean = group.reduce((sum, p) => sum + p.score, 0) / group.length;
    const variance = group.reduce((sum, p) => sum + Math.pow(p.score - mean, 2), 0) / group.length;
    const sd = Math.sqrt(variance);

    return { mean: mean.toFixed(1), sd: sd.toFixed(1) };
  };

  const getHistogramData = (group: Participant[]) => {
    const ranges = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'];
    const counts = new Array(10).fill(0);

    group.forEach((p) => {
      const index = Math.min(Math.floor(p.score / 10), 9);
      counts[index]++;
    });

    return ranges.map((range, i) => ({
      range,
      count: counts[i],
    }));
  };

  const neuroStats = calculateStats(neuroBoostGroup);
  const placeboStats = calculateStats(placeboGroup);
  const difference = (parseFloat(neuroStats.mean) - parseFloat(placeboStats.mean)).toFixed(1);

  // Helper function to check display flags (uses persisted state)
  const getDisplayFlag = (flagName: keyof RandomizationDisplayFlags): boolean => {
    const flag = displayFlags[flagName];
    // Only show when explicitly true
    return flag === true;
  };

  // Helper function to determine if Randomize/Reset buttons should be shown
  const showRandomizeAndResetButtons = (): boolean => {
    // If user has viewed analysis, always show buttons (they've completed the flow)
    // Otherwise, only show when explicitly set by dialog event
    if (hasViewedAnalysis) {
      return true;
    }
    return getDisplayFlag('showRandomizeButtons');
  };

  // Helper function to determine if See Analysis button should be shown
  const showSeeAnalysisButton = (): boolean => {
    const flag = getDisplayFlag('showAnalysisButton');
    // If user has viewed analysis, show button automatically after re-randomization
    // Otherwise, only show when explicitly set by dialog event
    if (!flag && !hasViewedAnalysis) {
      return false;
    }
    // Check if randomization is complete (from local state or persisted state)
    const randomizationComplete = isRandomized || savedState?.['randomization-complete'] === true;
    // Check that groups are actually populated (not empty)
    const groupsPopulated = neuroBoostGroup.length > 0 && placeboGroup.length > 0;
    // Also check that not animating
    return randomizationComplete && !isAnimating && groupsPopulated;
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <div className="w-full max-w-6xl">
        {!showAnalysis ? (
          <>
            {/* Action Buttons */}
            {showRandomizeAndResetButtons() && (
              <div className="text-center mb-6 flex gap-4 flex-col lg:flex-row lg:justify-center lg:items-center">
                <button
                  onClick={handleRandomize}
                  disabled={isAnimating || (!hasViewedAnalysis && isRandomized)}
                  className="px-8 py-3 text-lg rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-[#006BE0] disabled:bg-gray-400 disabled:opacity-60"
                >
                  {t(translations.randomize)}
                </button>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 text-lg rounded transition-colors text-center text-blue-600 bg-white border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t(translations.reset)}
                </button>
              </div>
            )}

            {/* Visualization Container */}
            <div className="w-full flex flex-col gap-6">
              {/* Top Pool Area - Always visible until all balls are assigned */}
              {!isRandomized && (
                <div className="w-full min-h-[220px] bg-white rounded-lg border-2 border-slate-300 p-5">
                  <div className="text-lg font-semibold text-slate-600 text-center mb-4">
                    {t(translations.allParticipants)} (n = 100)
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center max-w-4xl mx-auto">
                    {participants
                      .filter((p) => !p.group)
                      .map((p) => (
                        <div
                          key={p.id}
                          className="w-5 h-5 rounded-full border-2 border-black/15 shadow-sm"
                          style={{ backgroundColor: getColor(p.shade) }}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Groups Display - show when animating or randomized */}
              {(isAnimating || isRandomized) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* NeuroBoost Group */}
                  <div className="min-h-[250px] p-5 bg-blue-50 rounded-lg border-2 border-blue-500">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2 text-center">
                      {t(translations.neuroBoostGroup)}
                    </h3>
                    <p className="text-sm text-blue-600 mb-4 text-center">
                      n = {participants.filter((p) => p.group === 'neuroboost').length}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {participants
                        .filter((p) => p.group === 'neuroboost')
                        .map((p) => (
                          <div
                            key={p.id}
                            className="w-5 h-5 rounded-full border-2 border-black/15 shadow-sm"
                            style={{
                              backgroundColor: getColor(p.shade),
                              animation: p.falling ? 'fallIn 0.6s ease-out forwards' : 'none',
                              opacity: p.falling ? 0 : 1,
                            }}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Placebo Group */}
                  <div className="min-h-[250px] p-5 bg-gray-100 rounded-lg border-2 border-gray-400">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                      {t(translations.placeboGroup)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      n = {participants.filter((p) => p.group === 'placebo').length}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {participants
                        .filter((p) => p.group === 'placebo')
                        .map((p) => (
                          <div
                            key={p.id}
                            className="w-5 h-5 rounded-full border-2 border-black/15 shadow-sm"
                            style={{
                              backgroundColor: getColor(p.shade),
                              animation: p.falling ? 'fallIn 0.6s ease-out forwards' : 'none',
                              opacity: p.falling ? 0 : 1,
                            }}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* See Analysis Button */}
            {showSeeAnalysisButton() && (
              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setShowAnalysis(true);
                    // Set flag immediately when button is clicked
                    onInteraction({
                      'analysis-viewed': true,
                    });
                  }}
                  className="px-8 py-3 text-lg rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t(translations.seeAnalysis)}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Analysis View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* NeuroBoost Group Chart */}
              <div>
                <h4 className="text-center text-lg font-semibold text-blue-600 mb-4">
                  {t(translations.neuroBoostGroup)}
                </h4>
                <div style={{ width: '100%', height: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getHistogramData(neuroBoostGroup)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis
                        dataKey="range"
                        tick={{ fontSize: '11px' }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center -mt-4">
                  <div className="text-4xl font-semibold text-blue-600">{neuroStats.mean}</div>
                  <div className="text-sm text-gray-600 mt-1">{t(translations.averageMemoryScore)}</div>
                </div>
              </div>

              {/* Placebo Group Chart */}
              <div>
                <h4 className="text-center text-lg font-semibold text-gray-600 mb-4">
                  {t(translations.placeboGroup)}
                </h4>
                <div style={{ width: '100%', height: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getHistogramData(placeboGroup)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis
                        dataKey="range"
                        tick={{ fontSize: '11px' }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: '11px' }} />
                      <Bar dataKey="count" fill="#6b7280" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center -mt-4">
                  <div className="text-4xl font-semibold text-gray-700">{placeboStats.mean}</div>
                  <div className="text-sm text-gray-600 mt-1">{t(translations.averageMemoryScore)}</div>
                </div>
              </div>
            </div>

            {/* Balance Verification */}
            <div className="p-6 bg-green-50 border-2 border-green-300 rounded-lg mb-6">
              <h4 className="text-base font-semibold text-green-800 mb-4 text-center">
                {t(translations.groupBalanceVerification)}
              </h4>
              <div className="flex flex-wrap justify-center gap-8 text-sm text-green-700 mb-4">
                <div>
                  <strong>{t(translations.neuroBoostMean)}:</strong> {neuroStats.mean}
                </div>
                <div>
                  <strong>{t(translations.placeboMean)}:</strong> {placeboStats.mean}
                </div>
                <div>
                  <strong>{t(translations.difference)}:</strong> {difference}
                </div>
              </div>
              <p className="text-center text-sm text-green-700 mt-4 font-medium">
                {t(translations.groupsWellBalanced)}
              </p>
              <p className="text-center text-xs text-green-700 mt-2 leading-relaxed">
                {t(translations.randomizationProducesBalancedGroups)}
              </p>
            </div>

            <div className="text-center flex gap-3 flex-col sm:flex-row sm:justify-center">
              <button
                onClick={() => setShowAnalysis(false)}
                className="px-6 py-3 text-base rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t(translations.backToRandomization)}
              </button>

              <button
                onClick={handleReset}
                className="px-6 py-3 text-base rounded transition-colors text-center text-blue-600 bg-white border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t(translations.reset)}
              </button>
            </div>
          </>
        )}

        <style>{`
          @keyframes fallIn {
            from {
              opacity: 0;
              transform: translateY(-300px) scale(0.5);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default RandomizationInteractive;
