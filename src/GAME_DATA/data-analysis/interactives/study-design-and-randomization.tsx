import React, { useContext, useEffect, useState } from 'react';
import {
  FlowCardProps,
  ArrowProps,
  StudyDesignAndRandomizationState,
  StudyDesignAndRandomizationProps,
} from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import { useTranslations } from '../../../hooks/useTranslations';
import parse from 'html-react-parser';

const StudyDesignAndRandomization: React.FC<StudyDesignAndRandomizationProps> = ({ interaction }) => {
  const { translations } = interaction;
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.study_design_and_randomization &&
    typeof interactiveResponses?.study_design_and_randomization === 'object'
      ? (interactiveResponses?.study_design_and_randomization as unknown as StudyDesignAndRandomizationState)
      : undefined;
  const { payload } = useEventListener('study-design-and-randomization');

  // Flowchart step state
  const [flowchartStep, setFlowchartStep] = useState(savedState?.flowChartStep ?? 0);

  const flowchartStepTitles = [
    t(translations.step1RecruitParticipants),
    t(translations.step2RandomlyAssignGroups),
    t(translations.step3AdministerTreatmentPlacebo),
    t(translations.step4MeasureOutcomes),
  ];

  const FlowCard: React.FC<FlowCardProps> = ({ title, subtitle, color, children, note }) => (
    <div className="relative bg-white rounded-lg border-2 p-4 min-w-[160px]" style={{ borderColor: color }}>
      <div className="flex flex-col items-center text-center space-y-2">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
          {subtitle && <p className="text-base text-slate-600 mt-1">{subtitle}</p>}
        </div>
        {children}
        {note && (
          <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded mt-2">
            <span>{note}</span>
          </div>
        )}
      </div>
    </div>
  );

  const Diamond = () => (
    <div className="relative" style={{ width: '140px', height: '140px' }}>
      <svg width="140" height="140" className="drop-shadow-lg">
        <defs>
          <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <polygon
          points="70,10 130,70 70,130 10,70"
          fill="url(#diamondGradient)"
          stroke="#2563eb"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <span className="text-white text-sm text-center leading-tight">{t(translations.randomAssignment)}</span>
      </div>
    </div>
  );

  const Arrow: React.FC<ArrowProps> = ({ horizontal = true, short = false }) => (
    <svg width={horizontal ? (short ? '40' : '60') : '20'} height={horizontal ? '20' : '60'} className="mx-2">
      {horizontal ? (
        <>
          <line x1="0" y1="10" x2={short ? '35' : '55'} y2="10" stroke="#94a3b8" strokeWidth="2" />
          <polygon points={`${short ? '40,10 30,6 30,14' : '60,10 50,6 50,14'}`} fill="#94a3b8" />
        </>
      ) : (
        <>
          <line x1="10" y1="0" x2="10" y2="55" stroke="#94a3b8" strokeWidth="2" />
          <polygon points="10,60 6,50 14,50" fill="#94a3b8" />
        </>
      )}
    </svg>
  );

  useEffect(() => {
    if (payload && typeof payload === 'object') {
      if ('flowChartStep' in payload && typeof payload.flowChartStep === 'number') {
        setFlowchartStep(payload.flowChartStep - 1);
      }
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: StudyDesignAndRandomizationState = { step: 0, flowChartStep: flowchartStep };
    setInteractiveResponses((prev) => ({
      ...prev,
      study_design_and_randomization: currentState as unknown as Record<string, string | number | boolean | null>,
    }));
  }, [setInteractiveResponses, flowchartStep]);

  return (
    <div className="w-full flex flex-col text-lg">
      <div className="overflow-auto mb-4">
        {/* Flowchart visualization */}
        <div className="max-w-5xl flex flex-col items-center px-2">
          <div className="text-center mb-6">
            <p className="text-xl text-slate-700">{parse(flowchartStepTitles[flowchartStep])}</p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center">
              <FlowCard
                title={t(translations.participantsRecruited)}
                subtitle={t(translations.recruitedForStudy)}
                color="#3b82f6"
              />
            </div>

            {flowchartStep >= 1 && <Arrow horizontal={false} />}

            {flowchartStep >= 1 && <Diamond />}

            {flowchartStep >= 2 && (
              <div className="flex items-start justify-center gap-20 relative">
                <div className="flex flex-col items-center" style={{ position: 'relative', top: '-20px' }}>
                  <Arrow horizontal={false} short={true} />
                </div>
                <div className="flex flex-col items-center" style={{ position: 'relative', top: '-20px' }}>
                  <Arrow horizontal={false} short={true} />
                </div>
              </div>
            )}

            {flowchartStep >= 2 && (
              <div className="flex items-start justify-center gap-8">
                <FlowCard
                  title={t(translations.treatmentGroup)}
                  subtitle={t(translations.treatmentGroupParticipants)}
                  color="#10b981"
                >
                  <div className="text-sm font-semibold text-green-700">{t(translations.receiveNeuroBoost)}</div>
                </FlowCard>
                <FlowCard
                  title={t(translations.controlGroup)}
                  subtitle={t(translations.controlGroupParticipants)}
                  color="#DB0072"
                >
                  <div className="text-sm font-semibold text-[#DB0072]">{t(translations.receivePlacebo)}</div>
                </FlowCard>
              </div>
            )}

            {flowchartStep >= 3 && (
              <div className="flex items-center justify-center gap-20">
                <Arrow horizontal={false} />
                <Arrow horizontal={false} />
              </div>
            )}

            {flowchartStep >= 3 && (
              <div className="flex items-center">
                <FlowCard
                  title={t(translations.outcomeMeasurement)}
                  subtitle={t(translations.measureCognitiveImprovement)}
                  color="#8b5cf6"
                ></FlowCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDesignAndRandomization;
