import { useEffect, useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import ohmsLawExplorerConfig from '../configs/ohms-law-explorer-config';
import parse from 'html-react-parser';
import { useEventListener } from '../../../hooks/useEventListener';

const OhmsLawCircuit = ({
  onInteraction,
}: {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}) => {
  const [batteries, setBatteries] = useState(1);
  const [resistance, setResistance] = useState(10);

  const { t } = useTranslations();
  const { payload } = useEventListener('ohms-law-explorer');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      if (payload.step === 1) {
        onInteraction({
          'resistance-interaction-capture-1': true,
        });
      }
      if (payload.step === 2) {
        onInteraction({
          'resistance-interaction-capture-2': true,
        });
      }
    }
  }, [resistance]);

  const voltage = batteries * ohmsLawExplorerConfig.defaultMultiplier;
  const current = voltage / resistance;

  const formatCurrent = (value: number) => {
    if (value >= 1) return value.toPrecision(3);
    return value.toPrecision(2);
  };

  return (
    <div className="bg-white max-w-3xl mx-auto">
      <div className="w-full max-w-xl mx-auto">
        <div
          className="w-full h-72 rounded  mt-2 mb-4 p-10 relative"
          role="img"
          aria-label={`${t(ohmsLawExplorerConfig.circuitDiagramLabel[0])} ${batteries} ${t(ohmsLawExplorerConfig.circuitDiagramLabel[1])} ${resistance.toFixed(1)} ${t(ohmsLawExplorerConfig.circuitDiagramLabel[2])} ${formatCurrent(current)} ${t(ohmsLawExplorerConfig.circuitDiagramLabel[3])}`}
        >
          <div className="w-full text-center mx-auto absolute top-0 left-0 text-blue-600 py-1 px-2 rounded font-semibold">
            {t('scenes.S5.S5_D0_FX_C9.labels.current')}: {formatCurrent(current)}
            <span aria-hidden="true">A</span>
            <span className="sr-only">{t('scenes.common.ampere')}</span>
          </div>
          <div className="w-full h-full border border-black rounded relative">
            <div className="rounded absolute top-[38%] -right-2">
              <div className="rounded-xl h-12 w-4 border border-orange-500 grid grid-rows-4 overflow-hidden">
                <div className="bg-orange-500 w-full"></div>
                <div className="bg-orange-700 w-full"></div>
                <div className="bg-orange-900 w-full"></div>
                <div className="bg-orange-300 w-full"></div>
              </div>
            </div>
            <div className="flex flex-col items-center font-semibold absolute top-[40%] right-6">
              <p className="text-md">{t('scenes.S5.S5_D0_FX_C9.labels.resistor')}</p>
              <p className="text-red-600">
                {resistance}
                <span aria-hidden="true">Ω</span>
                <span className="sr-only">{t('scenes.common.ohms')}</span>
              </p>
            </div>
            <div className="absolute h-full -left-[18px] top-0">
              <div className="flex flex-col h-full justify-center">
                {Array.from({ length: batteries }).map((_, i) => (
                  <div key={i} className="relative">
                    <p className="text-4xl">🔋</p>
                    <div className="absolute top-1/4 -left-9 text-md">
                      1.5<span aria-hidden="true">V</span>
                      <span className="sr-only">{t('scenes.common.volts')}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center absolute font-semibold top-[40%] -right-20">
                <p className="text-md">{t('scenes.S5.S5_D0_FX_C9.labels.batteries')}</p>
                <p className="text-purple-600">
                  {voltage}
                  <span aria-hidden="true">V</span>
                  <span className="sr-only">{t('scenes.common.volts')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-[40px] flex items-end">
              <label className="block font-medium whitespace-nowrap">
                {parse(t('scenes.S5.S5_D0_FX_C9.labels.battery_label_prefix'))} {batteries} (
                {(batteries * 1.5).toFixed(1)}
                <span aria-hidden="true">V</span>
                <span className="sr-only">{t('scenes.common.volts')}</span>)
              </label>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <input
                type="range"
                min={ohmsLawExplorerConfig.minimumNumberOfbattery}
                max={ohmsLawExplorerConfig.maximumNumberOfbattery}
                step={1}
                value={batteries}
                onChange={(e) => setBatteries(Number(e.target.value))}
                className="w-full global-slider"
                style={{
                  background: `linear-gradient(to right, #006BE0 0%, #006BE0 ${((batteries - 1) / (4 - 1)) * 100}%, #949494 ${((batteries - 1) / (4 - 1)) * 100}%, #949494 100%)`,
                }}
              />
              <div className="flex justify-between text-md text-gray-600 mt-1">
                <span>{ohmsLawExplorerConfig.minimumNumberOfbattery}</span>
                <span>{ohmsLawExplorerConfig.maximumNumberOfbattery}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="h-[40px] flex items-end">
              <label className="block font-medium">
                {t('scenes.S5.S5_D0_FX_C9.labels.resistance_label_prefix')} {resistance.toFixed(1)}
                <span aria-hidden="true">Ω</span>
                <span className="sr-only">{t('scenes.common.ohms')}</span>
              </label>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <input
                type="range"
                min={ohmsLawExplorerConfig.minimumResistance}
                max={ohmsLawExplorerConfig.maximumResistance}
                step={1}
                placeholder='0'
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full global-slider"
                style={{
                  background: `linear-gradient(to right, #006BE0 0%, #006BE0 ${((resistance - 1) / (100 - 1)) * 100}%, #949494 ${((resistance - 1) / (100 - 1)) * 100}%, #949494 100%)`,
                }}
              />
              <div className="flex justify-between text-md text-gray-600 mt-1">
                <span>
                  {ohmsLawExplorerConfig.minimumResistance}
                  <span aria-hidden="true">Ω</span>
                  <span className="sr-only">{t('scenes.common.ohms')}</span>
                </span>
                <span>
                  {ohmsLawExplorerConfig.maximumResistance}
                  <span aria-hidden="true">Ω</span>
                  <span className="sr-only">{t('scenes.common.ohms')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 rounded-lg">
          <div className="text-center space-y-2">
            <div className="text-lg font-medium">{parse(t('scenes.S5.S5_D0_FX_C9.labels.ohms_law'))}</div>
            <p>
              {parse(t('scenes.S5.S5_D0_FX_C9.labels.voltage_prefix'))}
              {voltage.toFixed(1)}
              <span aria-hidden="true">V</span>
              <span className="sr-only">{t('scenes.common.volts')}</span>,{' '}
              {parse(t('scenes.S5.S5_D0_FX_C9.labels.resistance_prefix'))}
              {resistance.toFixed(1)}
              <span aria-hidden="true">Ω</span>
              <span className="sr-only">{t('scenes.common.ohms')}</span>
            </p>
            <div className="text-md text-gray-600">
              <p>{parse(t('scenes.S5.S5_D0_FX_C9.labels.current_formula'))}</p>
              <p>
                {parse(t('scenes.S5.S5_D0_FX_C9.labels.current_result_prefix'))}
                {formatCurrent(current)}
                <span aria-hidden="true">A</span>
                <span className="sr-only">{t('scenes.common.ampere')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawCircuit;
