import React, { useEffect, useState } from 'react';
import { ComplexNumberPlotterConfig, Point } from './interface';
import { SliderInput } from './SliderInput';
import { useTranslations } from '../../../hooks/useTranslations';
import { ComplexPlane } from './ComplexPlane';
import useScreenSize from '../../../hooks/useScreenSize';
import { useEventListener } from '../../../hooks/useEventListener';

interface ComplexNumberPlotterProps {
  interaction: ComplexNumberPlotterConfig;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const ComplexNumberPlotter: React.FC<ComplexNumberPlotterProps> = ({ interaction, onInteraction }) => {
  const [parameters, setParameters] = useState<{ [key: string]: number }>({}),
    { t } = useTranslations(),
    [points, setPoints] = useState<Point[]>([
      {
        realPart: 3,
        imaginaryPart: 2,
      },
    ]),
    [announcement, setAnnouncement] = useState<string>(''),
    { isZoomed200, isVerticalScreen } = useScreenSize(),
    { payload } = useEventListener('complex-number-plotter');

  useEffect(() => {
    const initialParams: { [key: string]: number } = {};
    interaction.parameters.forEach((param) => {
      initialParams[param.id] = param.defaultValue;
    });
    setParameters(initialParams);
  }, [interaction]);

  const plotComplexNumber = () => {
    const realPart = parameters['realPart'] || 0,
      imaginaryPart = parameters['imaginaryPart'] || 0;

    const newPoint: Point = { realPart, imaginaryPart };
    setPoints((prev) => [...prev, newPoint]);
    setAnnouncement(
      t('scenes.S7.S7_D0_FX_C9.pointPlotted').replace(
        '{complexNumber}',
        `${realPart} ${imaginaryPart < 0 ? '-' : '+'} ${Math.abs(imaginaryPart)}i`,
      ),
    );
  };

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 1) {
        const idx = points.findIndex((point) => point.realPart === -1 && point.imaginaryPart === 3);
        if (idx !== -1) {
          onInteraction({
            'disable-event-3': true,
          });
        }
      }
    }
  }, [points]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-y-4">
        <div className="grid gap-x-6 gap-y-4 lg:grid-cols-2">
          {interaction.parameters.map((param) => (
            <SliderInput
              key={param.id}
              id={param.id}
              label={param.label}
              value={parameters[param.id] || param.defaultValue}
              min={param.min}
              max={param.max}
              step={param.step}
              onChange={(value: number) => {
                setParameters((prev) => ({
                  ...prev,
                  [param.id]: value,
                }));
              }}
            />
          ))}
        </div>
        <div>
          {parameters['realPart'] !== undefined && parameters['imaginaryPart'] !== undefined && (
            <p className="text-center text-lg" aria-live="off">
              <span className="font-semibold">{t('scenes.common.complex_number')}</span>:{' '}
              <span className="font-besley font-bold text-[#DB0072]">{parameters['realPart']}</span>{' '}
              {parameters['imaginaryPart'] < 0 ? '-' : '+'}{' '}
              <span className="font-besley font-bold text-[#0061FC]">{Math.abs(parameters['imaginaryPart'])}</span>
              <span className="font-besley font-bold italic text-[#008217]">i</span>
            </p>
          )}
          <p className="text-center">{t(interaction.instruction)}</p>
        </div>
        <div className="flex justify-center items-center gap-x-3">
          <button
            onClick={plotComplexNumber}
            className="px-2 py-1 rounded transition-colors text-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:px-4 lg:py-2"
          >
            {t(interaction.buttons.plotNumber)}
          </button>
          <button
            onClick={() => {
              setPoints([]);
              setAnnouncement(t('scenes.S7.S7_D0_FX_C9.pointsCleared'));
            }}
            className="px-2 py-1 rounded transition-colors text-center text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:px-4 lg:py-2"
          >
            {t(interaction.buttons.clearAll)}
          </button>
        </div>
        <div aria-live="assertive" className="sr-only">
          {announcement}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full overflow-x-auto">
        <h3 className="text-center text-xl font-semibold mb-4">{t('scenes.common.complex_plane')}</h3>
        <ComplexPlane
          gridSize={isZoomed200 || isVerticalScreen ? 200 : 400}
          points={points}
          min={interaction.complexPlaneConfig.min}
          max={interaction.complexPlaneConfig.max}
          step={interaction.complexPlaneConfig.step}
          dimension={interaction.complexPlaneConfig.dimension}
        />
      </div>
    </div>
  );
};

export default ComplexNumberPlotter;
