import { useTranslations } from '../../../hooks/useTranslations';
import { Range } from './interface';

interface NumberLineProps {
  stroke: string;
  range: Range;
  generateTicks: () => number[];
  getPositionPercentage: (value: number) => number;
  filledDots?: boolean;
}

const NumberLine: React.FC<NumberLineProps> = ({ 
  stroke, 
  range, 
  generateTicks, 
  getPositionPercentage,
  filledDots = false 
}) => {
  const { t } = useTranslations();

  return (
    <div className="relative h-16">
      <div
        className="absolute h-1"
        style={{
          backgroundColor: stroke,
          left: `${getPositionPercentage(range.lower.value)}%`,
          width: `${getPositionPercentage(range.upper.value) - getPositionPercentage(range.lower.value)}%`,
          top: '18px',
        }}
      />
      <div
        className="absolute w-4 h-4 border-4 rounded-full"
        style={{
          borderColor: stroke,
          backgroundColor: filledDots ? stroke : 'white',
          left: `${getPositionPercentage(range.lower.value)}%`,
          top: '12px',
          transform: 'translateX(-50%)',
        }}
        role="img"
        aria-label={`${t(range.lower.label)}: ${range.lower.value}`}
      />
      <div
        className="absolute w-4 h-4 border-4 rounded-full"
        style={{
          borderColor: stroke,
          backgroundColor: filledDots ? stroke : 'white',
          left: `${getPositionPercentage(range.upper.value)}%`,
          top: '12px',
          transform: 'translateX(-50%)',
        }}
        role="img"
        aria-label={`${t(range.upper.label)}: ${range.upper.value}`}
      />
      <div className="absolute w-full bottom-0 h-8">
        <div className="absolute w-full h-0.5 bg-black" />
        <div className="absolute w-5 h-0.5 bg-black -left-4" />
        <div
          className="absolute w-0 h-0 -left-8"
          style={{
            top: -4,
            left: -20,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderRight: '5px solid black',
          }}
        />
        <div className="absolute w-5 h-0.5 bg-black -right-4" />
        <div
          className="absolute w-0 h-0 -right-8"
          style={{
            top: -4,
            right: -20,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '5px solid black',
          }}
        />
        <div className="absolute w-full h-full">
          {generateTicks().map((tick) => (
            <div
              key={tick}
              className="absolute flex items-center flex-col"
              style={{
                left: `${getPositionPercentage(tick)}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="h-2 border-l-2 border-black" />
              <div className="text-m text-center">{tick}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberLine;