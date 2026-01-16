/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import batteryPowerLossExplorerConfig from '../configs/battery-power-loss-explorer-config';
import parse from 'html-react-parser';

const BatteryPowerLossAnalyzer = ({
  onInteraction,
}: {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}) => {
  const { t } = useTranslations();
  const loadResistance = batteryPowerLossExplorerConfig.loadResistance;
  const battery = t(batteryPowerLossExplorerConfig.battery);

  const batteries = [
    {
      id: '1',
      name: battery + ' 1',
      voltage: 23.6,
      internalResistance: 0.02,
      capacity: 12000,
    },
    {
      id: '2',
      name: battery + ' 2',
      voltage: 23.7,
      internalResistance: 0.026,
      capacity: 12000,
    },
    {
      id: '3',
      name: battery + ' 3',
      voltage: 24.8,
      internalResistance: 0.013,
      capacity: 12000,
    },
    {
      id: '4',
      name: battery + ' 4',
      voltage: 22.2,
      internalResistance: 0.018,
      capacity: 12000,
    },
  ];

  const [selectedBattery, setSelectedBattery] = useState(batteries[1]);

  useEffect(() => {
    if (selectedBattery.id === '1') {
      onInteraction({
        'resistance-battery-1': true,
      });
    }
  }, [selectedBattery]);

  const calculateCurrent = (voltage: number, internalResistance: number) => {
    return voltage / (loadResistance + internalResistance);
  };

  const calculatePowerLoss = (current: number, internalResistance: number) => {
    return Math.pow(current, 2) * internalResistance;
  };

  const handleBatteryChange = (batteryOrEvent: any) => {
    const selected =
      typeof batteryOrEvent === 'object' && 'target' in batteryOrEvent
        ? batteries.find((battery) => battery.id === batteryOrEvent.target.value)
        : batteryOrEvent;

    if (selected) {
      setSelectedBattery(selected);
    }
  };

  const current = calculateCurrent(selectedBattery.voltage, selectedBattery.internalResistance);
  const powerLoss = calculatePowerLoss(current, selectedBattery.internalResistance);

  return (
    <div className="mx-auto">
      <div className="mb-6 bg-white">
        <label className="block font-bold mb-3 pb-2 text-lg">
          {t('scenes.S7.S7_D0_FX_C9.labels.select_battery')}:
        </label>
        <div className="flex flex-row justify-between gap-2">
          {batteries.map((battery) => (
            <label
              key={battery.id}
              className={`relative flex items-center justify-center py-2 px-4 rounded transition-all duration-200 w-[190px] cursor-pointer ${
                selectedBattery.id === battery.id
                  ? 'bg-[#006BE0] text-white border-none'
                  : 'bg-transparent text-[#006BE0] border border-[#006BE0]'
              }`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleBatteryChange(battery);
                }
              }}
            >
              <input
                type="radio"
                name="battery"
                value={battery.id}
                tabIndex={1}
                role="button"
                checked={selectedBattery.id === battery.id}
                onChange={handleBatteryChange}
                className="absolute opacity-0"
              />
              <div className="text-center">
                <span className="font-medium">{battery.name}</span>
                {battery.id === selectedBattery.id ? (
                  <span className="sr-only" aria-live="off">
                    {t('scenes.common.selected')}
                  </span>
                ) : null}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white mb-5">
        <h3 className="font-bold text-lg mb-3 pb-2">{t('scenes.S7.S7_D0_FX_C9.labels.specifications')}</h3>
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="flex-1 bg-white shadow-md p-4">
            <div className="h-full flex flex-col justify-between">
              <p className="text-gray-600 text-md mb-2">{parse(t('scenes.S7.S7_D0_FX_C9.labels.voltage'))}</p>
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-2xl text-[#0061FC]">{selectedBattery.voltage}</p>
                <span className="text-md text-[#0061FC]" aria-hidden="true">
                  V
                </span>
                <span className="sr-only">{t('scenes.common.volts')}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-md p-4">
            <div className="h-full flex flex-col justify-between">
              <p className="text-gray-600 text-md mb-2">
                {parse(t('scenes.S7.S7_D0_FX_C9.labels.internal_resistance'))}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-2xl text-[#DB0072]">{selectedBattery.internalResistance}</p>
                <span className="text-md text-[#DB0072]" aria-hidden="true">
                  Ω
                </span>
                <span className="sr-only">{t('scenes.common.ohms')}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-md p-4">
            <div className="h-full flex flex-col justify-between">
              <p className="text-gray-600 text-md mb-2">{parse(t('scenes.S7.S7_D0_FX_C9.labels.capacity'))}</p>
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-2xl text-gray-800">{selectedBattery.capacity}</p>
                <span className="text-md text-gray-800" aria-hidden="true">
                  mAh
                </span>
                <span className="sr-only">{t('scenes.common.milliampere_hours')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mb-5">
        <div className="mb-3 pb-2 flex items-center gap-20">
          <h3 className="font-bold text-lg">{t('scenes.S7.S7_D0_FX_C9.labels.calculated_results')}</h3>
        </div>
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="flex-1 shadow-md p-4">
            <h4 className="font-bold mb-1">{parse(t('scenes.S7.S7_D0_FX_C9.labels.current'))}</h4>
            <p className="text-3xl font-bold text-[#633300]">
              {current.toFixed(2)}{' '}
              <span className="text-xl" aria-hidden="true">
                {t('scenes.S7.S7_D0_FX_C9.units.amps')}
              </span>
              <span className="sr-only">{t('scenes.common.ampere')}</span>
            </p>
            <div className="mt-2 text-md">{parse(t('scenes.S7.S7_D0_FX_C9.labels.ohms_law'))}</div>
            <p className="text-md">({parse(t('scenes.S7.S7_D0_FX_C9.labels.fixed_resistance'))})</p>
          </div>

          <div className="flex-1 shadow-md p-4">
            <h4 className="font-bold mb-1">{parse(t('scenes.S7.S7_D0_FX_C9.labels.power_loss'))}</h4>
            <p className="text-3xl font-bold text-[#8E24AA]">
              {powerLoss.toFixed(2)}{' '}
              <span className="text-xl" aria-hidden="true">
                {t('scenes.S7.S7_D0_FX_C9.units.watts')}
              </span>
              <span className="sr-only">{t('scenes.common.watts')}</span>
            </p>
            <div className="mt-2 bg-opacity-70 text-md">{parse(t('scenes.S7.S7_D0_FX_C9.labels.joules_law'))}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryPowerLossAnalyzer;
