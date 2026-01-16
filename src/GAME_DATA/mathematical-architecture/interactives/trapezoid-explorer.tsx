import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import { PanelInspectorProps, TrapezoidExplorerState } from '../interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';

const TrapezoidExplorer: React.FC<PanelInspectorProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;

  // Step-based state management
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.trapezoid_explorer && typeof interactiveResponses?.trapezoid_explorer === 'object'
      ? (interactiveResponses?.trapezoid_explorer as unknown as TrapezoidExplorerState)
      : undefined;
  const [currentStep, setCurrentStep] = useState(savedState?.currentStep ?? 0);
  const { payload } = useEventListener('trapezoid-explorer');

  // Helper function for interpolation
  const tInterpolate = useCallback(
    (key: string, variables: Record<string, string | number> = {}) => {
      let translatedString = t(key);
      Object.entries(variables).forEach(([variable, value]) => {
        const placeholder = `{{${variable}}}`;
        translatedString = translatedString.replace(new RegExp(placeholder, 'g'), String(value));
      });
      return translatedString;
    },
    [t],
  );

  // Basic state
  const svgRef = useRef<SVGSVGElement>(null);

  // Accessibility state
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [statusAnnouncement, setStatusAnnouncement] = useState('');

  // Trapezoid model
  const model = {
    name: t(translations.modelTrapezoidName),
    description: t(translations.modelTrapezoidDescription),
    vertices: [
      [-125, 150],     // Maps to canvas (225, 60)
      [166.67, 150],   // Maps to canvas (400, 60)
      [191.67, -150],  // Maps to canvas (415, 240)
      [-200, -150],    // Maps to canvas (180, 240)
    ],
    properties: [t(translations.diagonalsDontBisect), t(translations.onePairParallel)],
  };

  const canvasWidth = 600;
  const canvasHeight = 300;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Accessibility helper functions
  const announceToScreenReader = useCallback((message: string, isStatus: boolean = false) => {
    if (isStatus) {
      setStatusAnnouncement(message);
      setTimeout(() => setStatusAnnouncement(''), 100);
    } else {
      setLiveAnnouncement(message);
      setTimeout(() => setLiveAnnouncement(''), 100);
    }
  }, []);

  // Helper functions for shape rendering
  const getCanvasVertices = useCallback((): [number, number][] => {
    return model.vertices.map(([x, y]) => {
      return [centerX + x * 0.6, centerY - y * 0.6] as [number, number];
    });
  }, [model.vertices, centerX, centerY]);

  // Calculate height line (perpendicular from top vertex to bottom base)
  const getHeightLine = useCallback((): { start: [number, number]; end: [number, number] } => {
    const vertices = getCanvasVertices();
    // Top vertex (index 0 or 1 - we'll use the left one for consistency)
    const topVertex = vertices[0];
    // Bottom base (line between vertices 2 and 3)
    const bottomLeft = vertices[3];
    const bottomRight = vertices[2];

    // Calculate the perpendicular projection point on the bottom base
    // The bottom base goes from bottomLeft to bottomRight
    const baseVector = [bottomRight[0] - bottomLeft[0], bottomRight[1] - bottomLeft[1]];
    const pointVector = [topVertex[0] - bottomLeft[0], topVertex[1] - bottomLeft[1]];

    // Project the point onto the base line
    const dotProduct = pointVector[0] * baseVector[0] + pointVector[1] * baseVector[1];
    const baseLengthSquared = baseVector[0] * baseVector[0] + baseVector[1] * baseVector[1];
    const t = dotProduct / baseLengthSquared;

    // Clamp t to [0, 1] to ensure the projection is on the line segment
    const clampedT = Math.max(0, Math.min(1, t));

    const projectionPoint: [number, number] = [
      bottomLeft[0] + clampedT * baseVector[0],
      bottomLeft[1] + clampedT * baseVector[1],
    ];

    return {
      start: topVertex,
      end: projectionPoint,
    };
  }, [getCanvasVertices]);

  // Step-based visualization logic
  const getStepHighlighting = useCallback(() => {
    switch (currentStep) {
      case 0:
        return {
          highlightBases: false,
          highlightLegs: false,
          highlightHeight: false,
        };
      case 1:
        return {
          highlightBases: true,
          highlightLegs: false,
          highlightHeight: false,
        };
      case 2:
        return {
          highlightBases: false,
          highlightLegs: true,
          highlightHeight: false,
        };
      case 3:
        return {
          highlightBases: false,
          highlightLegs: false,
          highlightHeight: true,
        };
      default:
        return {
          highlightBases: false,
          highlightLegs: false,
          highlightHeight: false,
        };
    }
  }, [currentStep]);

  // Simple interaction handler
  const handleBasicInteraction = useCallback(() => {
    onInteraction({
      'trapezoid-explored': true,
      'current-step': currentStep,
    });
  }, [onInteraction, currentStep]);

  // Step management effects
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload && typeof payload.step === 'number') {
      setCurrentStep(payload.step);
    }
  }, [payload]);

  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState: TrapezoidExplorerState = { currentStep };
    setInteractiveResponses((prev: any) => ({
      ...prev,
      trapezoid_explorer: currentState,
    }));
  }, [setInteractiveResponses, currentStep]);

  React.useEffect(() => {
    announceToScreenReader(
      tInterpolate(translations.modelInfo, {
        name: model.name,
        description: model.description,
      }),
    );
    handleBasicInteraction();
  }, [announceToScreenReader, tInterpolate, translations, model, handleBasicInteraction]);

  const stepHighlighting = getStepHighlighting();
  const vertices = getCanvasVertices();

  return (
    <div className="flex flex-col gap-6" role="application" aria-label={t(translations.interactiveTitle)}>
      <div aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>
      <div aria-live="assertive" className="sr-only">
        {statusAnnouncement}
      </div>

      <div className="sr-only">
        <p>{t(translations.screenReaderInstructions)}</p>
        <p>{tInterpolate(translations.modelInfo, { name: model.name, description: model.description })}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-full">
          <div className="mb-3 text-center">
            <div className="text-lg font-bold text-gray-800">{model.name}</div>
            <div className="text-sm text-gray-600">{model.description}</div>
          </div>
          <div className="border border-gray-300 rounded-lg bg-gray-50 w-full">
            <svg
              ref={svgRef}
              width="100%"
              height={canvasHeight}
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
              className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                background:
                  'linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8f9fa 75%), linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              }}
              role="img"
              aria-label={t(translations.canvasAriaLabel)}
              aria-describedby="canvas-description"
            >
              {/* Panel shape */}
              <polygon
                points={vertices.map(([x, y]) => `${x},${y}`).join(' ')}
                fill="rgba(8, 14, 43, 0.8)"
                stroke="#007BFF"
                strokeWidth="3"
              />

              {/* Step 1 & 2: Highlight with Yellow (#FFD700) */}
              {stepHighlighting.highlightBases && (
                <>
                  {/* Top base */}
                  <line
                    x1={vertices[0][0]}
                    y1={vertices[0][1]}
                    x2={vertices[1][0]}
                    y2={vertices[1][1]}
                    stroke="#FFD700"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Bottom base */}
                  <line
                    x1={vertices[2][0]}
                    y1={vertices[2][1]}
                    x2={vertices[3][0]}
                    y2={vertices[3][1]}
                    stroke="#FFD700"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </>
              )}

              {stepHighlighting.highlightLegs && (
                <>
                  {/* Left leg */}
                  <line
                    x1={vertices[0][0]}
                    y1={vertices[0][1]}
                    x2={vertices[3][0]}
                    y2={vertices[3][1]}
                    stroke="#FFD700"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Right leg */}
                  <line
                    x1={vertices[1][0]}
                    y1={vertices[1][1]}
                    x2={vertices[2][0]}
                    y2={vertices[2][1]}
                    stroke="#FFD700"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Step 3: Height line with perpendicular drop */}
              {stepHighlighting.highlightHeight && (
                <>
                  {(() => {
                    const heightLine = getHeightLine();
                    return (
                      <g>
                        {/* Height line */}
                        <line
                          x1={heightLine.start[0]}
                          y1={heightLine.start[1]}
                          x2={heightLine.end[0]}
                          y2={heightLine.end[1]}
                          stroke="#FFD700"
                          strokeWidth="3"
                          strokeDasharray="8,4"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  })()}
                </>
              )}

              {/* Vertices */}
              {vertices.map(([x, y], index) => (
                <circle key={index} cx={x} cy={y} r={'8'} fill={'#0056b3'} stroke={'white'} strokeWidth={'3'} />
              ))}
            </svg>
          </div>

          <div id="canvas-description" className="sr-only">
            {t(translations.canvasDescription)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrapezoidExplorer;
