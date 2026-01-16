import { useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import config from '../configs/decibel-formula-interactive';

const DecibelFormulaInteractive = () => {
  const { t } = useTranslations();
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = config.examples.map((example) => ({
    ...example,
    name: t(example.name),
    calculation: t(example.calculation),
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Simple Formula */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold mb-4" style={{ fontFamily: 'Besley, serif' }}>
          <span style={{ color: '#E0002B', fontStyle: 'italic', fontFamily: 'Besley, serif' }}>dB</span> ={' '}
          <span style={{ color: '#DB0072', fontFamily: 'Besley, serif' }}>10</span> ×{' '}
          <span style={{ color: '#8E24AA', fontStyle: 'italic', fontFamily: 'Besley, serif' }}>log</span>
          <sub style={{ color: '#8E24AA', fontFamily: 'Besley, serif' }}>10</sub>(
          <span style={{ color: '#0061FC', fontStyle: 'italic', fontFamily: 'Besley, serif' }}>I</span>/
          <span style={{ color: '#633300', fontStyle: 'italic', fontFamily: 'Besley, serif' }}>I</span>
          <sub style={{ color: '#633300', fontFamily: 'Besley, serif' }}>₀</sub>)
        </div>
      </div>

      {/* Term explanation cards in single row */}
      <div className="grid grid-cols-4 gap-3 mb-8 max-w-3xl mx-auto">
        {config.termCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-lg p-3 border-2`}>
            <div
              className={`font-bold text-lg mb-1 ${card.textColor}`}
              style={{ fontFamily: 'Besley, serif', fontStyle: 'italic', color: card.textColor }}
            >
              {card.title}
            </div>
            <div className={`text-sm ${card.textColor}`}>{t(card.description)}</div>
          </div>
        ))}
      </div>

      {/* New title for examples */}
      <h3 className="text-xl font-bold mb-6 text-center text-gray-800">{t(config.labels.examplesTitle)}</h3>

      {/* Example selector cards in single row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setSelectedExample(index)}
            className={`p-4 rounded-lg border-2 text-center transition-all ${
              selectedExample === index
                ? 'bg-blue-100 border-blue-500 text-blue-800'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}
            aria-label={example.name}
          >
            {/* <div className="text-2xl mb-2">{example.emoji}</div> */}
            <div className="font-semibold mb-1">{example.name}</div>
            <div className="text-sm font-mono">
              {t(config.labels.intensityLabel).replace('{intensity}', example.intensity)}
            </div>
          </button>
        ))}
      </div>

      {/* Convert to dB section - removed title and gray bg */}
      <div className="rounded-lg border-2 border-gray-200">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="space-y-2 font-mono text-sm">
            {examples[selectedExample].calculation.split('\n').map((line, index) => (
              <div key={index} className="text-gray-700">
                {line}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg text-center">
            <span className="text-lg font-semibold text-green-800">
              {t(config.labels.resultLabel).replace('{db}', examples[selectedExample].db.toString())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecibelFormulaInteractive;
