import React from 'react';
import euclidConfig from '../configs/postulates';
import { useTranslations } from '../../../hooks/useTranslations';

interface PostulateBoxProps {
  postulateName: string;
  title: string;
  children: React.ReactNode;
  ariaLabel: string;
}

const PostulateBox = ({ postulateName, title, children, ariaLabel }: PostulateBoxProps) => (
  <div
    className="border border-[#757575] rounded-xl p-4 md:p-6 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm"
    aria-label={ariaLabel}
  >
    <div className="text-black text-base md:text-lg font-semibold mb-3">{postulateName}</div>
    <div className="text-black text-sm md:text-base mb-3">{title}</div>
    {children}
  </div>
);

const EuclidPostulates = () => {
  const { t } = useTranslations();

  const PostulateOne = () => (
    <svg
      className="w-full h-24 md:h-32"
      viewBox="0 0 200 100"
      aria-label={t(euclidConfig.postulates.postulate1.description)}
    >
      <g transform="translate(0, 55)">
        <circle cx="40" cy="25" r="3" fill="black" />
        <circle cx="160" cy="25" r="3" fill="black" />
        <line x1="40" y1="25" x2="160" y2="25" stroke="black" strokeWidth="1.5" />
      </g>
    </svg>
  );

  const PostulateTwo = () => {
    const styles = `
      @keyframes extendLine {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;

    return (
      <svg
        className="w-full h-24 md:h-32"
        viewBox="0 0 200 100"
        aria-label={t(euclidConfig.postulates.postulate2.description)}
      >
        <defs>
          <style>{styles}</style>
        </defs>
        <g transform="translate(0, 25)">
          <line x1="40" y1="25" x2="160" y2="25" stroke="black" strokeWidth="1.5" />
          <line
            x1="160"
            y1="25"
            x2="190"
            y2="25"
            stroke="black"
            strokeWidth="1.5"
            strokeDasharray="4"
            style={{ animation: 'extendLine 1s ease-in-out infinite alternate' }}
          />
          <line
            x1="40"
            y1="25"
            x2="10"
            y2="25"
            stroke="black"
            strokeWidth="1.5"
            strokeDasharray="4"
            style={{ animation: 'extendLine 1s ease-in-out infinite alternate' }}
          />
        </g>
      </svg>
    );
  };

  const PostulateThree = () => (
    <svg
      className="w-full h-24 md:h-32"
      viewBox="0 0 200 100"
      aria-label={t(euclidConfig.postulates.postulate3.description)}
    >
      <g transform="translate(0, 15)">
        <circle cx="100" cy="35" r="35" stroke="black" fill="none" strokeWidth="1.5" />
        <circle cx="100" cy="35" r="2" fill="black" />
        <line x1="100" y1="35" x2="135" y2="35" stroke="black" strokeWidth="1" strokeDasharray="3" />
      </g>
    </svg>
  );

  const PostulateFour = () => (
    <svg
      className="w-full h-32 md:h-40"
      viewBox="0 0 300 120"
      aria-label={t(euclidConfig.postulates.postulate4.description)}
    >
      <g transform="translate(50, 30)">
        <line x1="0" y1="25" x2="51" y2="25" stroke="black" strokeWidth="1.5" />
        <line x1="27" y1="0" x2="27" y2="51" stroke="black" strokeWidth="1.5" />
        <path d="M 27,25 L 27,19 L 33,19 L 33,25" fill="none" stroke="black" strokeWidth="1" />
        <text x="30" y="10" fontSize="12" fill="black" aria-hidden="true">∠1</text>
      </g>

      <text x="145" y="60" fontSize="16" fill="black" aria-hidden="true">
        =
      </text>

      <g transform="translate(200, 30)">
        <line x1="0" y1="0" x2="55" y2="55" stroke="black" strokeWidth="1.5" />
        <line x1="0" y1="55" x2="55" y2="0" stroke="black" strokeWidth="1.5" />
        <path d="M 22,22 L 27,17 L 32,22" fill="none" stroke="black" strokeWidth="1" />
        <text x="20" y="10" fontSize="12" fill="black" aria-hidden="true">∠2</text>
      </g>

      <text x="150" y="100" fontSize="14" fill="black" textAnchor="middle" aria-hidden="true">
        ∠1 = ∠2
      </text>
    </svg>
  );

  const PostulateFive = () => (
    <svg
      className="w-full h-28 md:h-40"
      viewBox="0 0 400 100"
      aria-label="{t(euclidConfig.postulates.postulate5.description)}"
    >
      <g transform="translate(110, 5)">
        <text x="85" textAnchor="middle" fontSize="14" fill="black" aria-hidden="true">
          ∠1 + ∠2 = 180°
        </text>

        <line x1="40" y1="30" x2="150" y2="30" stroke="black" strokeWidth="1.5" transform="rotate(30 85 50)" />
        <line x1="40" y1="70" x2="150" y2="70" stroke="black" strokeWidth="1.5" transform="rotate(30 85 50)" />

        <line x1="85" y1="10" x2="85" y2="90" stroke="black" strokeWidth="1.5" />

        <path d="M 85,40 A 15,15 0 0 0 95,33" fill="none" stroke="black" strokeWidth="1" />
        <path d="M 95,79 A 15,15 0 0 0 85, 60" fill="none" stroke="black" strokeWidth="1" />

        <text x="90" y="50" fontSize="12" fill="black" aria-hidden="true">
          ∠1
        </text>
        <text x="100" y="75" fontSize="12" fill="black" aria-hidden="true">
          ∠2
        </text>
      </g>
    </svg>
  );

  return (
    <div className="bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <PostulateBox
            postulateName={t(euclidConfig.postulates.postulate1.name)}
            title={t(euclidConfig.postulates.postulate1.title)}
            ariaLabel={`${t(euclidConfig.postulates.postulate1.title)}: ${t(euclidConfig.postulates.postulate1.description)}`}
          >
            <PostulateOne />
          </PostulateBox>

          <PostulateBox
            postulateName={t(euclidConfig.postulates.postulate2.name)}
            title={t(euclidConfig.postulates.postulate2.title)}
            ariaLabel={`${t(euclidConfig.postulates.postulate2.title)}: ${t(euclidConfig.postulates.postulate2.description)}`}
          >
            <PostulateTwo />
          </PostulateBox>

          <PostulateBox
            postulateName={t(euclidConfig.postulates.postulate3.name)}
            title={t(euclidConfig.postulates.postulate3.title)}
            ariaLabel={`${t(euclidConfig.postulates.postulate3.title)}: ${t(euclidConfig.postulates.postulate3.description)}`}
          >
            <PostulateThree />
          </PostulateBox>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <PostulateBox
            postulateName={t(euclidConfig.postulates.postulate4.name)}
            title={t(euclidConfig.postulates.postulate4.title)}
            ariaLabel={`${t(euclidConfig.postulates.postulate4.title)}: ${t(euclidConfig.postulates.postulate4.description)}`}
          >
            <PostulateFour />
          </PostulateBox>

          <PostulateBox
            postulateName={t(euclidConfig.postulates.postulate5.name)}
            title={t(euclidConfig.postulates.postulate5.title)}
            ariaLabel={`${t(euclidConfig.postulates.postulate5.title)}: ${t(euclidConfig.postulates.postulate5.description)}`}
          >
            <PostulateFive />
          </PostulateBox>
        </div>
      </div>
    </div>
  );
};

export default EuclidPostulates;
