import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import rigidMotionTriangleCongruenceExplorerConfig from '../configs/rigid-motion-triangle-congruence-explorer';
import { useEventListener } from '../../../hooks/useEventListener';

interface RigidMotionTriangleCongruenceExplorerProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const TriangleCongruenceExplorer: React.FC<RigidMotionTriangleCongruenceExplorerProps> = ({ onInteraction }) => {
  const { t } = useTranslations();

  const [rotation, setRotation] = useState(Math.floor(Math.random() * 360));
  const [translateX, setTranslateX] = useState(Math.floor(Math.random() * 50) + 100);
  const [selectedCriteria, setSelectedCriteria] = useState(rigidMotionTriangleCongruenceExplorerConfig.sss);
  const [isReflected, setIsReflected] = useState(Math.random() > 0.5);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track individual slider interactions
  const [hasInteractedWithRotation, setHasInteractedWithRotation] = useState(false);
  const [hasInteractedWithTranslation, setHasInteractedWithTranslation] = useState(false);
  const [hasInteractedWithReflection, setHasInteractedWithReflection] = useState(false);

  const { payload } = useEventListener('rigid-motion-triangle-congruence-explorer');

  const baseTriangle = [
    { x: 50, y: 150 },
    { x: 120, y: 40 },
    { x: 160, y: 140 },
  ];

  useEffect(() => {
    if (hasInteracted) {
      onInteraction({
        'rigid-motion-completion': true,
      });
    }
  }, [hasInteracted]);

  useEffect(() => {
    if (
      payload &&
      typeof payload === 'object' &&
      'shouldCheckTranslation' in payload &&
      payload.shouldCheckTranslation &&
      hasInteractedWithTranslation
    ) {
      onInteraction({
        'is-translation-completed': true,
      });
    }
  }, [payload, hasInteractedWithTranslation]);

  useEffect(() => {
    if (
      payload &&
      typeof payload === 'object' &&
      'shouldCheckRotation' in payload &&
      payload.shouldCheckRotation &&
      hasInteractedWithRotation
    ) {
      onInteraction({
        'is-rotation-completed': true,
      });
    }
  }, [payload, hasInteractedWithRotation]);

  useEffect(() => {
    if (
      payload &&
      typeof payload === 'object' &&
      'shouldCheckReflection' in payload &&
      payload.shouldCheckReflection &&
      hasInteractedWithReflection
    ) {
      onInteraction({
        'is-reflection-completed': true,
      });
    }
  }, [payload, hasInteractedWithReflection, isReflected]);

  const resetPosition = useCallback(() => {
    const newRotation = Math.floor(Math.random() * 360);
    const newTranslation = Math.floor(Math.random() * 50) + 100;
    const newReflection = Math.random() > 0.5;
    setRotation(newRotation);
    setTranslateX(newTranslation);
    setIsReflected(newReflection);
  }, []);

  const getTriangleCenter = (points: { x: number; y: number }[]) => {
    const x = (points[0].x + points[1].x + points[2].x) / 3;
    const y = (points[0].y + points[1].y + points[2].y) / 3;
    return { x, y };
  };

  const transformPoint = (point: { x: number; y: number }) => {
    const x = point.x + translateX;
    const y = point.y;
    const center = getTriangleCenter(baseTriangle.map((p) => ({ x: p.x + translateX, y: p.y })));
    const rad = (rotation * Math.PI) / 180;
    const rotatedX = center.x + (x - center.x) * Math.cos(rad) - (y - center.y) * Math.sin(rad);
    const rotatedY = center.y + (x - center.x) * Math.sin(rad) + (y - center.y) * Math.cos(rad);
    if (isReflected) {
      return { x: 400 - rotatedX, y: rotatedY };
    }
    return { x: rotatedX, y: rotatedY };
  };

  const generatePath = (points: { x: number; y: number }[]) => {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;
  };

  const transformedTriangle = baseTriangle.map(transformPoint);

  const getMidpoint = (p1: { x: number; y: number }, p2: { x: number; y: number }, outward: boolean) => {
    const midpoint = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const dir = { x: -dy / length, y: dx / length };

    const offset = 12 * (outward ? 1 : -1);
    return {
      x: midpoint.x + dir.x * 2 * offset,
      y: midpoint.y + dir.y * 2 * offset,
    };

    return midpoint;
  };

  const getAngle = (
    p1: { x: number; y: number },
    vertex: { x: number; y: number },
    p2: { x: number; y: number },
  ) => {
    const a = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const b = { x: p2.x - vertex.x, y: p2.y - vertex.y };
    const dot = a.x * b.x + a.y * b.y;
    const maga = Math.sqrt(a.x * a.x + a.y * a.y);
    const magb = Math.sqrt(b.x * b.x + b.y * b.y);
    const angle = Math.acos(dot / (maga * magb));
    return ((angle * 180) / Math.PI).toFixed(1);
  };

  const getSideLength = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)).toFixed(1);
  };

  const getAnglePosition = (
    p1: { x: number; y: number },
    vertex: { x: number; y: number },
    p2: { x: number; y: number },
  ) => {
    const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
    const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };

    const bisector = {
      x: v1.x / Math.hypot(v1.x, v1.y) + v2.x / Math.hypot(v2.x, v2.y),
      y: v1.y / Math.hypot(v1.x, v1.y) + v2.y / Math.hypot(v2.x, v2.y),
    };

    const length = Math.hypot(bisector.x, bisector.y);
    const offset = 12;
    return {
      x: vertex.x - (bisector.x / length) * offset,
      y: vertex.y - (bisector.y / length) * offset,
    };
  };

  const renderMeasurements = (points: { x: number; y: number }[], isOriginal: boolean) => {
    const color = isOriginal ? '#006BE0' : '#238B21';
    const measurements = [];

    if (selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.sss) {
      for (let i = 0; i < 3; i++) {
        const nextIndex = (i + 1) % 3;
        const midpoint = getMidpoint(points[i], points[nextIndex], isReflected && !isOriginal);
        const length = getSideLength(points[i], points[nextIndex]);
        measurements.push(
          <text
            key={`side-${i}`}
            x={midpoint.x}
            y={midpoint.y}
            fill={color}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '10px' }}
          >
            {length}
          </text>,
        );
      }
    } else if (selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.sas) {
      const sidePoints = [
        { start: 0, end: 1 },
        { start: 1, end: 2 },
      ];
      sidePoints.forEach(({ start, end }, i) => {
        const midpoint = getMidpoint(points[start], points[end], isReflected && !isOriginal);
        const length = getSideLength(points[start], points[end]);
        measurements.push(
          <text
            key={`side-${i}`}
            x={midpoint.x}
            y={midpoint.y}
            fill={color}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '10px' }}
          >
            {length}
          </text>,
        );
      });

      const anglePos = getAnglePosition(points[0], points[1], points[2]);
      const angle = getAngle(points[0], points[1], points[2]);
      measurements.push(
        <text
          key="angle"
          x={anglePos.x}
          y={anglePos.y}
          fill={color}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: '10px' }}
        >
          {angle}°
        </text>,
      );
    } else if (selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.asa) {
      const angles = [
        { p1: 2, vertex: 0, p2: 1 },
        { p1: 0, vertex: 1, p2: 2 },
      ];
      angles.forEach(({ p1, vertex, p2 }, i) => {
        const anglePos = getAnglePosition(points[p1], points[vertex], points[p2]);
        const angle = getAngle(points[p1], points[vertex], points[p2]);
        measurements.push(
          <text
            key={`angle-${i}`}
            x={anglePos.x}
            y={anglePos.y}
            fill={color}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '10px' }}
          >
            {angle}°
          </text>,
        );
      });

      const midpoint = getMidpoint(points[0], points[1], isReflected && !isOriginal);
      const length = getSideLength(points[0], points[1]);
      measurements.push(
        <text
          key="side"
          x={midpoint.x}
          y={midpoint.y}
          fill={color}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: '10px' }}
        >
          {length}
        </text>,
      );
    } else if (selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.aas) {
      const angles = [
        { p1: 2, vertex: 0, p2: 1 },
        { p1: 0, vertex: 1, p2: 2 },
      ];
      angles.forEach(({ p1, vertex, p2 }, i) => {
        const anglePos = getAnglePosition(points[p1], points[vertex], points[p2]);
        const angle = getAngle(points[p1], points[vertex], points[p2]);
        measurements.push(
          <text
            key={`angle-${i}`}
            x={anglePos.x}
            y={anglePos.y}
            fill={color}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '10px' }}
          >
            {angle}°
          </text>,
        );
      });

      // For AAS, we show one non-included side (the side opposite to the first angle)
      const midpoint = getMidpoint(points[2], points[0], isReflected && !isOriginal);
      const length = getSideLength(points[2], points[0]);
      measurements.push(
        <text
          key="side"
          x={midpoint.x}
          y={midpoint.y}
          fill={color}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: '10px' }}
        >
          {length}
        </text>,
      );
    }

    return measurements;
  };

  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(parseInt(e.target.value));
    setHasInteracted(true);
    setHasInteractedWithRotation(true);
  };

  const handleTranslateXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTranslateX(parseInt(e.target.value));
    setHasInteracted(true);
    setHasInteractedWithTranslation(true);
  };

  const handleReflect = () => {
    setIsReflected((prev) => !prev);
    setHasInteracted(true);
    setHasInteractedWithReflection(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          position: 'relative',
          backgroundColor: 'white',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {[
              rigidMotionTriangleCongruenceExplorerConfig.sss,
              rigidMotionTriangleCongruenceExplorerConfig.sas,
              rigidMotionTriangleCongruenceExplorerConfig.asa,
              rigidMotionTriangleCongruenceExplorerConfig.aas,
            ].map((criteria) => (
              <button
                key={criteria}
                onClick={() => setSelectedCriteria(criteria)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedCriteria === criteria ? '#006BE0' : 'transparent',
                  color: selectedCriteria === criteria ? 'white' : '#006BE0',
                  border: selectedCriteria === criteria ? 'none' : '1px solid #006BE0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  position: 'relative',
                  fontWeight: 'medium',
                }}
              >
                {t(
                  rigidMotionTriangleCongruenceExplorerConfig[
                    criteria as keyof typeof rigidMotionTriangleCongruenceExplorerConfig
                  ],
                )}
              </button>
            ))}
            <button
              onClick={resetPosition}
              style={{
                padding: '8px 16px',
                backgroundColor: '#006BE0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                position: 'relative',
                fontWeight: 'medium',
              }}
            >
              {t('scenes.S8.S8_D0_F49_C9.random_reset')}
            </button>
          </div>

          <svg
            style={{
              width: '100%',
              height: '256px',
              border: '1px solid #757575',
            }}
            viewBox="0 -20 400 220"
            aria-label={t('scenes.S8.S8_D0_F49_C9.canvas')}
            role="img"
          >
            <path d={generatePath(baseTriangle)} fill="none" stroke="#006BE0" strokeWidth="2" />

            <path d={generatePath(transformedTriangle)} fill="none" stroke="#238B21" strokeWidth="2" />

            {renderMeasurements(baseTriangle, true)}
            {renderMeasurements(transformedTriangle, false)}

            {/* Triangle labels with collision avoidance */}
            {(() => {
              // Calculate triangle centers for label positioning
              const baseCenterX = (baseTriangle[0].x + baseTriangle[1].x + baseTriangle[2].x) / 3;
              const baseTopY = Math.min(...baseTriangle.map((p) => p.y));
              const baseLabelY = baseTopY - 18;

              const transformedCenterX =
                (transformedTriangle[0].x + transformedTriangle[1].x + transformedTriangle[2].x) / 3;
              const transformedTopY = Math.min(...transformedTriangle.map((p) => p.y));
              let transformedLabelY = transformedTopY - 18;

              // Check if labels would collide (vertical and horizontal proximity)
              const dx = transformedCenterX - baseCenterX;
              const dy = transformedLabelY - baseLabelY;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minLabelDistance = 70; // px
              if (distance < minLabelDistance) {
                // Move B label further up to avoid collision
                transformedLabelY = baseLabelY - 22;
              }

              return (
                <>
                  {/* Triangle A label (fixed triangle) */}
                  <text
                    x={baseCenterX}
                    y={baseLabelY - 10}
                    fill="#006BE0"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  >
                    {t(rigidMotionTriangleCongruenceExplorerConfig.triangleA)}
                  </text>

                  {/* Triangle B label (transformed triangle) */}
                  <text
                    x={transformedCenterX}
                    y={transformedLabelY - 10}
                    fill="#238B21"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  >
                    {t(rigidMotionTriangleCongruenceExplorerConfig.triangleB)}
                  </text>
                </>
              );
            })()}
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ height: '24px', marginRight: '10px' }} aria-live="off">
                {t('scenes.S8.S8_D0_F49_C9.rotate')}:
              </span>
              <div style={{ flex: '1', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
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
                    top: '50%',
                    left: '0',
                    width: `${(rotation / 360) * 100}% `,
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
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  placeholder={'0'}
                  onChange={handleRotationChange}
                  className="w-full mt-2"
                  aria-live="off"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    appearance: 'none',
                    backgroundColor: 'transparent',
                    width: '100%',
                    outline: 'none',
                  }}
                />
                <span className="sr-only">{`${t('scenes.S8.S8_D0_F49_C9.rotate')}: ${rotation} ${t('scenes.S8.S8_D0_F49_C9.degree')}`}</span>
              </div>
              <span style={{ width: '48px', textAlign: 'center' }} aria-live="off">
                {rotation}°
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ height: '24px', marginRight: '15px' }} aria-live="off">
                {t('scenes.S8.S8_D0_F49_C9.move')}:
              </span>
              <div style={{ flex: '1', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
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
                    top: '50%',
                    left: '0',
                    width: `${((translateX + 200) / 400) * 100}% `,
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
                  value={translateX}
                  min={-200}
                  max={200}
                  step={1}
                  placeholder={'0'}
                  onChange={handleTranslateXChange}
                  className="w-full mt-2"
                  aria-live="off"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    appearance: 'none',
                    backgroundColor: 'transparent',
                    width: '100%',
                    outline: 'none',
                  }}
                />
                <span className="sr-only">{`${t('scenes.S8.S8_D0_F49_C9.move')}: ${translateX}`}</span>
              </div>
              <span style={{ width: '48px', textAlign: 'center' }} aria-live="off">
                {translateX}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={handleReflect}
                style={{
                  padding: '8px 16px',
                  backgroundColor: isReflected ? '#006BE0' : 'transparent',
                  color: isReflected ? 'white' : '#006BE0',
                  border: isReflected ? 'none' : '1px solid #006BE0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {t('scenes.S8.S8_D0_F49_C9.reflect')}
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              {t(
                rigidMotionTriangleCongruenceExplorerConfig[
                  selectedCriteria as keyof typeof rigidMotionTriangleCongruenceExplorerConfig
                ],
              )}{' '}
              {t('scenes.S8.S8_D0_F49_C9.criteria_explanation')}
            </h3>
            {selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.sss && (
              <p>{t('scenes.S8.S8_D0_F49_C9.sss_explain')}</p>
            )}
            {selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.sas && (
              <p>{t('scenes.S8.S8_D0_F49_C9.sas_explain')}</p>
            )}
            {selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.asa && (
              <p>{t('scenes.S8.S8_D0_F49_C9.asa_explain')}</p>
            )}
            {selectedCriteria === rigidMotionTriangleCongruenceExplorerConfig.aas && (
              <p>{t('scenes.S8.S8_D0_F49_C9.aas_explain')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriangleCongruenceExplorer;
