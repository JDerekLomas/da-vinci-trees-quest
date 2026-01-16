/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import emailClassificationThresholdAdjuster from '../configs/email-classification-threshold-adjuster';

const CustomSlider = ({
  value,
  onChange,
  id,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  id: string;
  label: string;
}) => (
  <input
    type="range"
    id={id}
    value={value}
    onChange={(e) => onChange(parseFloat(e.target.value))}
    min={0}
    max={1}
    step={0.05}
    className="w-full mt-3 h-2 bg-[#757575] rounded-lg appearance-none cursor-pointer accent-[#006BE0]"
    style={{
      background: `linear-gradient(to right, #006BE0 0%, #006BE0 ${value * 100}%, #757575 ${value * 100}%, #757575 100%)`,
    }}
    aria-label={`${label} ${(value * 100).toFixed(0)}%`}
  />
);

const CustomCard = ({ children, className = '' }: { children: any; className: string }) => (
  <div className={`rounded-lg p-2 ${className}`}>{children}</div>
);

interface EmailClassifierProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const EmailClassifier: React.FC<EmailClassifierProps> = ({ onInteraction }) => {
  const { t } = useTranslations();

  const sampleEmails = [
    {
      id: 1,
      subject: t('scenes.S9.S9_D0_F48_C9.email_classifier.email1_subject'),
      sender: t('scenes.S9.S9_D0_F48_C9.email_classifier.email1_sender'),
      preview: t('scenes.S9.S9_D0_F48_C9.email_classifier.email1_preview'),
      spamProbability: emailClassificationThresholdAdjuster.email1_spam_threshold,
      isLegitimate: true,
    },
    {
      id: 2,
      subject: t('scenes.S9.S9_D0_F48_C9.email_classifier.email2_subject'),
      sender: t('scenes.S9.S9_D0_F48_C9.email_classifier.email2_sender'),
      preview: t('scenes.S9.S9_D0_F48_C9.email_classifier.email2_preview'),
      spamProbability: emailClassificationThresholdAdjuster.email2_spam_threshold,
      isLegitimate: false,
    },
    {
      id: 3,
      subject: t('scenes.S9.S9_D0_F48_C9.email_classifier.email3_subject'),
      sender: t('scenes.S9.S9_D0_F48_C9.email_classifier.email3_sender'),
      preview: t('scenes.S9.S9_D0_F48_C9.email_classifier.email3_preview'),
      spamProbability: emailClassificationThresholdAdjuster.email3_spam_threshold,
      isLegitimate: true,
    },
    {
      id: 4,
      subject: t('scenes.S9.S9_D0_F48_C9.email_classifier.email4_subject'),
      sender: t('scenes.S9.S9_D0_F48_C9.email_classifier.email4_sender'),
      preview: t('scenes.S9.S9_D0_F48_C9.email_classifier.email4_preview'),
      spamProbability: emailClassificationThresholdAdjuster.email4_spam_threshold,
      isLegitimate: false,
    },
    {
      id: 5,
      subject: t('scenes.S9.S9_D0_F48_C9.email_classifier.email5_subject'),
      sender: t('scenes.S9.S9_D0_F48_C9.email_classifier.email5_sender'),
      preview: t('scenes.S9.S9_D0_F48_C9.email_classifier.email5_preview'),
      spamProbability: emailClassificationThresholdAdjuster.email5_spam_threshold,
      isLegitimate: true,
    },
  ];

  const [threshold, setThreshold] = useState(0.4);
  const [emails] = useState(sampleEmails);
  const [prevFalsePositives, setPrevFalsePositives] = useState(0);
  const [prevFalseNegatives, setPrevFalseNegatives] = useState(0);
  const announceRef = useRef(null);

  const falsePositives = emails.filter((email) => email.spamProbability >= threshold && email.isLegitimate).length;

  const falseNegatives = emails.filter((email) => email.spamProbability < threshold && !email.isLegitimate).length;

  useEffect(() => {
    if (threshold === 0.7) {
      onInteraction({
        'seventy-percent-threshold-set': true,
      });
    }

    if (threshold === 0.5) {
      onInteraction({
        'fifty-percent-threshold-step': true,
      });
    }
  }, [threshold]);

  useEffect(() => {
    const thresholdMessage = `${t('scenes.S9.S9_D0_F48_C9.email_classifier.threshold_set_to')} ${(threshold * 100).toFixed(0)}%.`;

    let changesMessage = '';
    if (falsePositives !== prevFalsePositives || falseNegatives !== prevFalseNegatives) {
      changesMessage = ` ${t('scenes.S9.S9_D0_F48_C9.email_classifier.false_positives')}: ${falsePositives}. ${t('scenes.S9.S9_D0_F48_C9.email_classifier.false_negatives')}: ${falseNegatives}.`;
    }
    if (announceRef.current) {
      (announceRef.current as HTMLElement).textContent = thresholdMessage + changesMessage;
    }

    setPrevFalsePositives(falsePositives);
    setPrevFalseNegatives(falseNegatives);
  }, [threshold, falsePositives, falseNegatives, prevFalsePositives, prevFalseNegatives, t]);

  const EmailList = ({
    title,
    emails,
    symbol,
    titleColor = 'text-[#006BE0]',
  }: {
    title: string;
    emails: any;
    symbol: any;
    titleColor: string;
  }) => (
    <section aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`} className="space-y-3">
      <div className={`flex items-center gap-2 text-[15px] font-medium ${titleColor}`}>
        <span className="w-4 h-4" aria-hidden="true" style={{ height: '1.4rem' }}>
          {symbol}
        </span>
        <h2 id={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}>{title}</h2>
      </div>
      <ul className="space-y-2" role="list">
        {emails.map((email: any) => (
          <li
            key={email.id}
            className="rounded-lg p-3 border border-[#757575]"
            aria-label={`${t('scenes.S9.S9_D0_F48_C9.email_classifier.email_from')} ${email.sender} ${t('scenes.S9.S9_D0_F48_C9.email_classifier.with_subject')} ${email.subject}`}
          >
            <div className="space-y-2">
              <div className="mb-2 space-y-1">
                <div className="text-[14px] font-medium">{email.subject}</div>
                <div className="text-[12px]">
                  <span id={`sender-${email.id}`}>{t('scenes.S9.S9_D0_F48_C9.email_classifier.sender')}: </span>
                  <span aria-labelledby={`sender-${email.id}`}>{email.sender}</span>
                </div>
                <div className="text-[12px]">{email.preview}</div>
              </div>
            </div>
            <div className="pt-2 border-t border-[#757575]">
              <div
                className={`text-[12px] ${email.spamProbability >= threshold ? 'text-[#EB0000]' : 'text-[#006BE0]'}`}
                aria-disabled
              >
                {t('scenes.S9.S9_D0_F48_C9.email_classifier.spam_probability')}:{' '}
                {(email.spamProbability * 100).toFixed(0)}%
              </div>
            </div>
          </li>
        ))}
        <span className="sr-only"></span>
      </ul>
    </section>
  );

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="max-w-3xl w-full space-y-2 rounded-lg">
        <CustomCard className={''}>
          <div className="flex gap-10 space-y-2" style={{ alignItems: 'baseline', gap: '6rem' }}>
            <div className="flex flex-col">
              <label htmlFor="threshold-slider" className="text-[15px] font-medium" aria-hidden="true">
                {t('scenes.S9.S9_D0_F48_C9.email_classifier.spam_probability_threshold')}:{' '}
                {(threshold * 100).toFixed(0)}%
              </label>
              <CustomSlider
                id="threshold-slider"
                value={threshold}
                onChange={(newVal) => {
                  setThreshold(newVal);
                }}
                label={t('scenes.S9.S9_D0_F48_C9.email_classifier.spam_probability_threshold')}
              />
            </div>

            <div className="flex gap-5 text-[14px] rounded-lg" role="status" style={{ gap: '5rem' }}>
              <div className="flex flex-col">
                <span className="font-medium">{t('scenes.S9.S9_D0_F48_C9.email_classifier.false_positives')}</span>
                <span className="text-xl">{falsePositives}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{t('scenes.S9.S9_D0_F48_C9.email_classifier.false_negatives')}</span>
                <span className="text-xl">{falseNegatives}</span>
              </div>
            </div>
          </div>
        </CustomCard>

        <div className="grid grid-cols-2">
          <CustomCard className={''}>
            <EmailList
              title={t('scenes.S9.S9_D0_F48_C9.email_classifier.not_spam')}
              emails={emails.filter((email) => email.spamProbability < threshold)}
              symbol={'✓'}
              titleColor="text-[#006BE0]"
            />
          </CustomCard>

          <CustomCard className={''}>
            <EmailList
              title={t('scenes.S9.S9_D0_F48_C9.email_classifier.spam')}
              emails={emails.filter((email) => email.spamProbability >= threshold)}
              symbol={'⚠️'}
              titleColor="text-[#EB0000]"
            />
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default EmailClassifier;
