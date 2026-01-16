import React from 'react';
import { Point } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import useScreenSize from '../../../hooks/useScreenSize';

interface ComplexPlaneProps {
  gridSize: number;
  dimension: number;
  points: Point[];
  min: number;
  max: number;
  step: number;
  showDistanceFromOrigin?: boolean;
}

export const ComplexPlane: React.FC<ComplexPlaneProps> = ({
  gridSize,
  points,
  min,
  max,
  step,
  dimension,
  showDistanceFromOrigin,
}) => {
  const range = Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step),
    { t } = useTranslations(),
    { isZoomed200, isVerticalScreen } = useScreenSize();

  const calculateLineProperties = (point: Point) => {
    const originX = gridSize / 2;
    const originY = gridSize / 2;
    const pointX = (point.realPart + dimension / 2) * (gridSize / dimension);
    const pointY = (dimension / 2 - point.imaginaryPart) * (gridSize / dimension);

    const deltaX = pointX - originX;
    const deltaY = pointY - originY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    return {
      length,
      angle,
      originX,
      originY,
    };
  };

  const calculateDistance = (point: Point) => {
    return Math.sqrt(point.realPart * point.realPart + point.imaginaryPart * point.imaginaryPart);
  };

  const getDistanceLabelPosition = (point: Point) => {
    const pointX = (point.realPart + dimension / 2) * (gridSize / dimension);
    const pointY = (dimension / 2 - point.imaginaryPart) * (gridSize / dimension);
    const originX = gridSize / 2;
    const originY = gridSize / 2;

    // Position the label at the midpoint of the line
    const midX = (originX + pointX) / 2;
    const midY = (originY + pointY) / 2;

    // Offset the label slightly to avoid overlapping with the line
    const offsetDistance = 15;
    const lineAngle = Math.atan2(pointY - originY, pointX - originX);
    const perpAngle = lineAngle + Math.PI / 2;

    return {
      x: midX + Math.cos(perpAngle) * offsetDistance,
      y: midY + Math.sin(perpAngle) * offsetDistance,
    };
  };

  return (
    <div
      className="w-fit mx-auto border border-gray-400 rounded-lg p-10 relative"
      tabIndex={0}
      role="region"
      aria-label={t('scenes.common.complex_plane_description')}
    >
      <p className="absolute top-[calc(50%-8px)] -right-1 font-medium text-sm lg:text-base">
        {t('scenes.common.real_axis')}
      </p>
      <h4 className="absolute top-1 left-[calc(45%-8px)] text-center font-medium text-sm lg:text-base">
        {t('scenes.common.imaginary_axis')}
      </h4>
      <div
        className="grid relative"
        style={{
          width: gridSize,
          height: gridSize,
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gridTemplateRows: `repeat(${dimension}, 1fr)`,
        }}
      >
        <div className="w-[2px] h-full absolute left-1/2 bg-black"></div>
        <div className="h-[2px] w-full absolute top-1/2 bg-black"></div>
        <>
          {Array.from({ length: 64 }, (_, i) => i + 1).map((i) => (
            <div className="border-[0.5px] border-gray-400" key={`box-${i}`}></div>
          ))}
        </>
        <>
          {range.map((number, index) => (
            <div
              key={`real-${number}`}
              className={`absolute text-sm lg:text-base top-1/2 font-medium`}
              style={{ left: `${(index * gridSize) / dimension - (number === 0 ? -2 : 4)}px` }}
            >
              {number}
            </div>
          ))}
        </>
        <>
          {range.reverse().map(
            (number, index) =>
              number !== 0 && (
                <div
                  key={`imaginary-${number}`}
                  className={`absolute text-sm lg:text-base left-[calc(50%-24px)] font-medium`}
                  style={{ top: `${(index * gridSize) / dimension - 8}px` }}
                >
                  {number}i
                </div>
              ),
          )}
        </>

        {/* Dashed lines from origin to points */}
        {showDistanceFromOrigin &&
          points.map((point, index) => {
            const lineProps = calculateLineProperties(point);
            return (
              <div
                key={`line-${index}`}
                className="absolute"
                style={{
                  left: `${lineProps.originX}px`,
                  top: `${lineProps.originY}px`,
                  width: `${lineProps.length}px`,
                  height: '0px',
                  borderTop: `2px dashed ${point.color || '#dc2626'}`,
                  transformOrigin: '0 50%',
                  transform: `rotate(${lineProps.angle}deg)`,
                  opacity: 0.7,
                  zIndex: 1,
                }}
                aria-hidden="true"
              />
            );
          })}

        {/* Distance labels */}
        {showDistanceFromOrigin &&
          points.map((point, index) => {
            const distance = calculateDistance(point);
            const labelPos = getDistanceLabelPosition(point);
            const lineProps = calculateLineProperties(point);
            return (
              <div
                key={`distance-${index}`}
                className="absolute text-[10px] lg:text-sm"
                style={{
                  left: `${labelPos.x - (isZoomed200 || isVerticalScreen ? 25 : 15)}px`,
                  top: `${labelPos.y - (isZoomed200 || isVerticalScreen ? 25 : 15)}px`,
                  color: point.color ?? '#333333',
                  transform: `rotate(${lineProps.angle}deg)`,
                  transformOrigin: 'center',
                  zIndex: 3,
                }}
              >
                {distance.toFixed(2)}
              </div>
            );
          })}

        {/* Points */}
        {points.map((point, index) => (
          <>
            <div
              key={`point-${index}`}
              className="absolute w-4 h-4 rounded-full"
              style={{
                left: `${(point.realPart + dimension / 2) * (gridSize / dimension) - 8}px`,
                top: `${(dimension / 2 - point.imaginaryPart) * (gridSize / dimension) - 8}px`,
                backgroundColor: point.color || '#dc2626',
                zIndex: 2,
              }}
              tabIndex={0}
              aria-label={`${t('scenes.common.complex_number')}: ${point.realPart} ${point.imaginaryPart < 0 ? '-' : '+'} ${Math.abs(point.imaginaryPart)}i`}
              role="img"
            ></div>
            <div
              key={`label-${index}`}
              className="absolute font-bold text-xs font-besley lg:text-base"
              style={{
                left: `${(point.realPart + dimension / 2) * (gridSize / dimension) - (point.realPart === 0 ? -10 : 20)}px`,
                top: `${(dimension / 2 - point.imaginaryPart) * (gridSize / dimension) - (point.realPart === 0 ? (point.imaginaryPart === 0 ? 30 : 12) : 30)}px`,
                zIndex: 3,
              }}
            >
              <span className="text-[#DB0072]">{point.realPart}</span> {point.imaginaryPart < 0 ? '-' : '+'}{' '}
              <span className="text-[#0061FC]">{Math.abs(point.imaginaryPart)}</span>
              <span className="italic text-[#008217]">i</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
