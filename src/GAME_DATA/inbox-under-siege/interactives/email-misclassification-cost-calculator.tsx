/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import emailMisClassificationCostCalculatorConfig from '../configs/email-misclassification-cost-calculator';
import { ThresholdData } from './interface';

interface EmailClassifierProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const CostSimulator: React.FC<EmailClassifierProps> = ({ onInteraction }) => {
  const [legitSpamCost, setLegitSpamCost] = useState(emailMisClassificationCostCalculatorConfig.legitSpamCostInit);
  const [spamLeakCost, setSpamLeakCost] = useState(emailMisClassificationCostCalculatorConfig.spamLeakCostInit);
  const [threshold, setThreshold] = useState(emailMisClassificationCostCalculatorConfig.threshold);

  const [thresholdCostData, setThresholdCostData] = useState<ThresholdData[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [spamCount, setSpamCount] = useState(0);
  const [legitCount, setLegitCount] = useState(0);

  const { t } = useTranslations();

  const runSimulation = () => {
    const newData = [];
    let newTotalCost = 0;
    let spamMisses = 0;
    let legitMisses = 0;

    for (let i = 0; i < 200; i++) {
      const emailValue = Math.abs(Math.sin(i * 0.157)) * 0.999;
      const isSpam = emailValue > 0.7;
      const spamProbability = Math.abs(Math.cos(i * 0.193)) * 0.999;
      const classifiedAsSpam = spamProbability > threshold / 100;

      if (isSpam && !classifiedAsSpam) {
        spamMisses++;
        newTotalCost += spamLeakCost;
      } else if (!isSpam && classifiedAsSpam) {
        legitMisses++;
        newTotalCost += legitSpamCost;
      }

      newData.push({
        email: i + 1,
        cost: newTotalCost,
        spamMisses,
        legitMisses,
      });
    }

    setTotalCost(newTotalCost);
    setSpamCount(spamMisses);
    setLegitCount(legitMisses);
  };

  useEffect(() => {
    runSimulation();
  }, [threshold, legitSpamCost, spamLeakCost]);

  useEffect(() => {
    if (threshold === 75) {
      onInteraction({
        'spam-probability-threshold-step': true,
      });
    }
  }, [threshold]);

  useEffect(() => {
    const thresholdData = [];

    for (let t = 0; t <= 100; t += 1) {
      let tCost = 0;
      let tSpamMisses = 0;
      let tLegitMisses = 0;

      for (let i = 0; i < 200; i++) {
        const emailValue = Math.abs(Math.sin(i * 0.157)) * 0.999;
        const isSpam = emailValue > 0.7;

        const spamProbability = Math.abs(Math.cos(i * 0.193)) * 0.999;
        const classifiedAsSpam = spamProbability > t / 100;

        if (isSpam && !classifiedAsSpam) {
          tSpamMisses++;
          tCost += spamLeakCost;
        } else if (!isSpam && classifiedAsSpam) {
          tLegitMisses++;
          tCost += legitSpamCost;
        }
      }

      thresholdData.push({
        threshold: t,
        cost: tCost,
        spamMisses: tSpamMisses,
        legitMisses: tLegitMisses,
      });
    }

    setThresholdCostData(thresholdData);
  }, [legitSpamCost, spamLeakCost]);

  return (
    <div className="flex overflow-y-auto">
      <div className="space-y-2 bg-white rounded-lg w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 ml-[0.25rem] mb-6">
          <div className="space-y-2 mb-2 lg:mr-5 text-[#000000]">
            <label htmlFor="legitSpamCost" className="text-sm font-medium" aria-hidden="true">
              {t('scenes.S11.S11_D0_F59_C9.email_misclassification.costOfMissingRealEmail')}
            </label>
            <input
              id="legitSpamCost"
              type="number"
              value={legitSpamCost}
              onChange={(e) => setLegitSpamCost(Math.min(Number(e.target.value), 100))}
              min="0"
              max="200"
              className="w-full border border-[#757575] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              style={{ color: '#000000' }}
              aria-live="off"
              aria-label={`${t('scenes.S11.S11_D0_F59_C9.email_misclassification.costOfMissingRealEmail')}:  ${legitSpamCost}`}
            />
            <span className="sr-only">{`${t('scenes.S11.S11_D0_F59_C9.email_misclassification.costOfMissingRealEmail')}:  ${legitSpamCost}`}</span>
          </div>
          <div className="space-y-2 mb-3 text-[#000000]">
            <label htmlFor="spamLeakCost" className="text-sm font-medium" aria-hidden="true">
              {t('scenes.S11.S11_D0_F59_C9.email_misclassification.costOfLettingSpamThrough')}
            </label>
            <input
              id="spamLeakCost"
              type="number"
              value={spamLeakCost}
              onChange={(e) => setSpamLeakCost(Math.min(Number(e.target.value), 100))}
              min="0"
              max="200"
              className="w-full border border-[#757575] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              style={{ color: '#000000' }}
              aria-live="off"
              aria-label={`${t('scenes.S11.S11_D0_F59_C9.email_misclassification.costOfLettingSpamThrough')}:  ${spamLeakCost}`}
            />
            <span className="sr-only">{`${t('scenes.S11.S11_D0_F59_C9.email_misclassification.costOfLettingSpamThrough')}:  ${spamLeakCost}`}</span>
          </div>
          <div className="space-y-2 lg:ml-6 text-[#000000]">
            <label id="threshold-label" className="text-sm font-medium text-[#000000]" aria-hidden="true">
              {t('scenes.S11.S11_D0_F59_C9.email_misclassification.threshold')}: {threshold}%
            </label>
            <input
              type="range"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              min={0}
              max={100}
              step={1}
              aria-live="off"
              aria-labelledby="threshold-label"
              className="w-full md:w-[90%] h-2 rounded-lg appearance-none cursor-pointer accent-blue-500"
              style={{
                background: `linear-gradient(to right, #006BE0 0%, #006BE0 ${threshold}%, #757575 ${threshold}%, #757575 100%)`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-[#000000]">
          <div className="mt-2 rounded-lg">
            <div className="text-sm font-semibold" id="totalCostLabel">
              {t('scenes.S11.S11_D0_F59_C9.email_misclassification.totalCost')}
            </div>
            <div
              className="text-xl"
              aria-labelledby="totalCostLabel"
              aria-label={`${t('scenes.S11.S11_D0_F59_C9.email_misclassification.totalCost')}: $${totalCost.toFixed(2)}`}
            >
              ${totalCost.toFixed(2)}
            </div>
          </div>
          <div className="mt-2 ml-4 rounded-lg">
            <div className="text-sm font-semibold" id="missedLegitLabel">
              {t('scenes.S11.S11_D0_F59_C9.email_misclassification.missedLegit')}
            </div>
            <div
              className="text-xl"
              aria-labelledby="missedLegitLabel"
              aria-label={`${t('scenes.S11.S11_D0_F59_C9.email_misclassification.missedLegit')}: ${legitCount}`}
            >
              {legitCount}
            </div>
          </div>
          <div className="mt-2 rounded-lg">
            <div className="text-sm font-semibold" id="missedSpamLabel">
              {t('scenes.S11.S11_D0_F59_C9.email_misclassification.missedSpam')}
            </div>
            <div
              className="text-xl"
              aria-labelledby="missedSpamLabel"
              aria-label={`${t('scenes.S11.S11_D0_F59_C9.email_misclassification.missedSpam')}: ${spamCount}`}
            >
              {spamCount}
            </div>
          </div>
        </div>

        <div className="h-[25rem] bg-white mt-4 pt-8 rounded-lg" tabIndex={0} role="figure">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={thresholdCostData}
              margin={{
                bottom: 16,
                left: 4,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="undefined" />
              <XAxis
                dataKey="threshold"
                label={{
                  value: t('scenes.S11.S11_D0_F59_C9.email_misclassification.thresholdInPercentage'),
                  position: 'insideBottom',
                  offset: -12,
                  style: { fill: '#000000' },
                }}
                domain={emailMisClassificationCostCalculatorConfig.graphDomain}
                ticks={emailMisClassificationCostCalculatorConfig.graphTicks}
              />
              <YAxis
                label={{
                  value: t('scenes.S11.S11_D0_F59_C9.email_misclassification.totalCostInDollars'),
                  angle: -90,
                  position: 'insideLeft',
                  offset: 2,
                  x: 40,
                  dy: 35,
                  style: { fill: '#000000' },
                }}
              />
              <Tooltip
                formatter={(value) => {
                  return [`${value}`, t('scenes.S11.S11_D0_F59_C9.email_misclassification.totalCostInDollars')];
                }}
                labelFormatter={(label) =>
                  `${t('scenes.S11.S11_D0_F59_C9.email_misclassification.thresholdInPercentage')}: ${label}`
                }
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#006BE0"
                dot={({ cx, cy, payload }) => {
                  return payload.threshold === threshold ? (
                    <circle cx={cx} cy={cy} r={8} fill="#006BE0" stroke="#ffffff" strokeWidth={2} />
                  ) : (
                    <></>
                  );
                }}
                activeDot={{ r: 6, fill: '#ffffff', stroke: '#006BE0' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="sr-only" aria-live="polite">
          <ul>
            {thresholdCostData.map((data: any, index) => (
              <li key={index} tabIndex={0}>
                {t('scenes.S11.S11_D0_F59_C9.email_misclassification.totalCostInDollars')} {data.cost},
                {t('scenes.S11.S11_D0_F59_C9.email_misclassification.thresholdInPercentage')} {data.threshold}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CostSimulator;
