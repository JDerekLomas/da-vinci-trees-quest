/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import emailFeatureTrackerConfig from '../configs/email-feature-tracker';
import { SpamOrNotSpamCategory } from './interface';
const CustomCheckbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <div
    onClick={() => onChange(!checked)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange(!checked);
      }
    }}
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    aria-label={label}
    className="flex items-center space-x-2 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 rounded"
  >
    <div
      className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
        checked
          ? 'shadow-[0px_0px_3px_rgba(117,117,117,0.5)] bg-white'
          : 'shadow-[0px_0px_3px_rgba(117,117,117,0.5)] bg-white'
      }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-[#757575]" viewBox="0 0 12 12">
          <path
            fill="currentColor"
            d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"
          />
        </svg>
      )}
    </div>
    <span className="select-none">{label}</span>
  </div>
);

const CustomButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`
                        
            px-2 py-1 rounded transition-colors text-center
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            lg:px-4 lg:py-2
        
                        bg-[#006BE0] hover:bg-blue-600 text-white
                        
                    `}
  >
    {children}
  </button>
);

interface EmailFeatureTrackerProps {
  onInteraction: (data: Record<string, unknown>) => void;
}

const EmailFeatureTracker = ({ onInteraction }: EmailFeatureTrackerProps) => {
  const { t } = useTranslations();
  const sampleEmails = [
    {
      id: 1,
      subject: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.0.subject'),
      content: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.0.content'),
      sender: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.0.sender'),
    },
    {
      id: 2,
      subject: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.1.subject'),
      content: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.1.content'),
      sender: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.1.sender'),
    },
    {
      id: 3,
      subject: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.2.subject'),
      content: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.2.content'),
      sender: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.2.sender'),
    },
    {
      id: 4,
      subject: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.3.subject'),
      content: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.3.content'),
      sender: t('scenes.S5.S5_D0_F17_C9.sample_emails.emails.3.sender'),
    },
  ];

  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [features, setFeatures] = useState({
    containsFree: false,
    containsWin: false,
    moreThanTwoLinks: false,
    senderUnknown: false,
  });
  const [frequencyTable, setFrequencyTable] = useState({
    spam: { present: 0, absent: 0 },
    notSpam: { present: 0, absent: 0 },
  });
  const [classification, setClassification] = useState<string | null>(null);
  const [emailHistory, setEmailHistory] = useState<
    Record<number, { features: typeof features; classification: string | null }>
  >({});

  const handleEmailSelect = (email: { id: number; subject: string; content: string; sender: string }) => {
    setSelectedEmail(email);

    if (email.id === 1) {
      onInteraction({ 'step-1-completed': true });
    }

    if (email.id === 2 && emailHistory[1]?.classification === emailFeatureTrackerConfig.spamClassification) {
      onInteraction({ 'step-3-completed': true });
    }

    // Always start with unchecked features for all emails
    const initialFeatures = {
      containsFree: false,
      containsWin: false,
      moreThanTwoLinks: false,
      senderUnknown: false,
    };

    if (emailHistory[email.id]) {
      setFeatures(emailHistory[email.id].features || initialFeatures);
      setClassification(emailHistory[email.id].classification || null);
    } else {
      setFeatures(initialFeatures);
      setClassification(null);
    }
  };

  const handleFeatureChange = (featureName: string, checked: boolean) => {
    const updatedFeatures = { ...features, [featureName]: checked };
    setFeatures(updatedFeatures);

    if (selectedEmail && emailHistory[selectedEmail.id]?.classification) {
      setEmailHistory((prev) => ({
        ...prev,
        [selectedEmail.id]: {
          ...prev[selectedEmail.id],
          features: updatedFeatures,
        },
      }));
    }
  };

  useEffect(() => {
    const newTable = {
      spam: { present: 0, absent: 0 },
      notSpam: { present: 0, absent: 0 },
    };

    Object.values(emailHistory).forEach((entry) => {
      if (!entry.classification) {
        return;
      }
      const category =
        entry.classification === emailFeatureTrackerConfig.spamClassification
          ? (emailFeatureTrackerConfig.spamCategory as SpamOrNotSpamCategory)
          : (emailFeatureTrackerConfig.notSpamCategory as SpamOrNotSpamCategory);
      const hasFeatures = Object.values(entry.features).some(Boolean);
      if (hasFeatures) {
        newTable[category].present += 1;
      } else {
        newTable[category].absent += 1;
      }
    });

    setFrequencyTable(newTable);
  }, [emailHistory]);

  const handleClassify = (isSpam: boolean) => {
    if (!selectedEmail) return;

    // Validation for first email - all features should be checked
    if (selectedEmail.id === 1) {
      const allFeaturesChecked = Object.values(features).every(Boolean);
      if (!allFeaturesChecked) {
        // You might want to show an error message here
        // For now, we'll just prevent classification
        return;
      }
    }

    // Validation for second email - no features should be checked
    if (selectedEmail.id === 2) {
      const anyFeatureChecked = Object.values(features).some(Boolean);
      if (anyFeatureChecked) {
        // You might want to show an error message here
        // For now, we'll just prevent classification
        return;
      }
    }

    const hasFeatures = Object.values(features).some(Boolean);
    const newClassification = isSpam
      ? emailFeatureTrackerConfig.spamClassification
      : emailFeatureTrackerConfig.notSpamClassification;
    const previousData = emailHistory[selectedEmail.id];

    if (previousData?.classification === newClassification) {
      return;
    }

    if (selectedEmail.id === 1 && isSpam) {
      onInteraction({ 'step-2-completed': true });
    }

    if (
      selectedEmail.id === 2 &&
      !isSpam &&
      emailHistory[1]?.classification === emailFeatureTrackerConfig.spamClassification
    ) {
      onInteraction({ 'step-4-completed': true });
    }

    setEmailHistory((prev) => ({
      ...prev,
      [selectedEmail.id]: {
        classification: newClassification,
        hasFeatures: hasFeatures,
        features: { ...features },
      },
    }));

    setClassification(newClassification);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[900px] mx-auto bg-white rounded-xl">
        <div className="grid grid-cols-2 gap-2">
          {/* Left side - Email List */}
          <div className="rounded-xl p-2">
            <h2 className="text-xl font-bold mb-3 text-gray-800">{t('scenes.S5.S5_D0_F17_C9.sample_email')}</h2>
            <div className="space-y-2">
              {sampleEmails.map((email) => (
                <div
                  key={email.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedEmail?.id === email.id
                      ? 'shadow-[0px_0px_5px_rgba(117,117,117,0.5)]'
                      : 'shadow-[0px_0px_3px_rgba(117,117,117,0.2)] hover:shadow-[0px_0px_5px_rgba(117,117,117,0.5)]'
                  }`}
                  onClick={() => handleEmailSelect(email)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedEmail?.id === email.id}
                  aria-label={`${t('scenes.S5.S5_D0_F17_C9.email_from')} ${email.sender} ${t('scenes.S5.S5_D0_F17_C9.with_subject')} ${email.subject}`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      handleEmailSelect(email);
                    }
                  }}
                >
                  <div className="break-words">
                    <div className="font-medium text-gray-800">{email.subject}</div>
                    <div className="text-sm text-gray-500">{email.sender}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Email Content */}
          <div className="rounded-xl p-2">
            <h2 className="text-xl font-bold mb-3 text-gray-800">{t('scenes.S5.S5_D0_F17_C9.email_content')}</h2>
            {selectedEmail ? (
              <div
                className="flex flex-col p-4 rounded-lg shadow-[0px_0px_5px_rgba(117,117,117,0.3)]"
                role="region"
                aria-label={t('scenes.S5.S5_D0_F17_C9.email_details')}
              >
                <div className="border-b border-gray-200 pb-3 mb-3">
                  <div className="flex flex-col gap-2 text-sm w-full" role="list">
                    <div className="flex text-gray-500" role="listitem">
                      <span className="mr-2">{t('scenes.S5.S5_D0_F17_C9.from')}:</span>
                      <span className="text-gray-800 font-medium break-all">{selectedEmail.sender}</span>
                    </div>
                    <div className="flex text-gray-500" role="listitem">
                      <span className="mr-2">{t('scenes.S5.S5_D0_F17_C9.subject')}:</span>
                      <span className="text-gray-800 font-medium break-all">{selectedEmail.subject}</span>
                    </div>
                    <div className="flex text-gray-500" role="listitem">
                      <span className="mr-2">{t('scenes.S5.S5_D0_F17_C9.date')}:</span>
                      <span className="text-gray-600 break-all">{t('scenes.S5.S5_D0_F17_C9.date_value')}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="text-gray-800 whitespace-pre-line break-words"
                  role="article"
                  aria-label={t('scenes.S5.S5_D0_F17_C9.aria_label.email_body')}
                >
                  {typeof selectedEmail.content === 'string' && selectedEmail.content.includes('\n') ? (
                    selectedEmail.content.split('\n').map((paragraph: string, index: number) =>
                      paragraph.trim() ? (
                        <p key={index} className="mb-2">
                          {paragraph}
                        </p>
                      ) : (
                        <span key={index} aria-hidden="true"></span>
                      ),
                    )
                  ) : (
                    // Handle continuous text without newlines
                    <div className="mb-2">
                      {selectedEmail.content.split(/(?<=[.!?])\s+/).map((sentence: string, index: number) => (
                        <span key={index} className="inline">
                          {sentence}{' '}
                          {index < selectedEmail.content.split(/(?<=[.!?])\s+/).length - 1 && index % 3 === 2 && (
                            <br />
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="text-gray-800 text-center p-4 rounded-lg shadow-[0px_0px_5px_rgba(117,117,117,0.3)]"
                role="region"
                aria-label={t('scenes.S5.S5_D0_F17_C9.aria_label.select_email_prompt')}
              >
                {t('scenes.S5.S5_D0_F17_C9.select_email')}
              </div>
            )}
          </div>
        </div>

        {/* Separator line above Email Features section */}
        <div className="mx-4 my-4 border-t border-gray-300"></div>

        {/* Features Card */}
        <div className="mt-4 rounded-xl p-4 mx-4">
          <h2 className="text-xl font-bold mb-3 text-gray-800">{t('scenes.S5.S5_D0_F17_C9.email_features')}</h2>
          {selectedEmail ? (
            <div className="space-y-3">
              <div className="space-y-2 p-3 rounded-lg">
                <CustomCheckbox
                  checked={features.containsFree}
                  onChange={(checked) => handleFeatureChange('containsFree', checked)}
                  label={t('scenes.S5.S5_D0_F17_C9.aria_label.contains_free')}
                />
                <CustomCheckbox
                  checked={features.containsWin}
                  onChange={(checked) => handleFeatureChange('containsWin', checked)}
                  label={t('scenes.S5.S5_D0_F17_C9.aria_label.contains_win')}
                />
                <CustomCheckbox
                  checked={features.moreThanTwoLinks}
                  onChange={(checked) => handleFeatureChange('moreThanTwoLinks', checked)}
                  label={t('scenes.S5.S5_D0_F17_C9.aria_label.more_than_two_lakhs')}
                />
                <CustomCheckbox
                  checked={features.senderUnknown}
                  onChange={(checked) => handleFeatureChange('senderUnknown', checked)}
                  label={t('scenes.S5.S5_D0_F17_C9.aria_label.sender_unknown')}
                />
              </div>

              <div className="flex space-x-3 justify-center">
                <CustomButton onClick={() => handleClassify(true)}>
                  {t('scenes.S5.S5_D0_F17_C9.mark_as_spam_button')}
                </CustomButton>
                <CustomButton onClick={() => handleClassify(false)}>
                  {t('scenes.S5.S5_D0_F17_C9.not_spam_button')}
                </CustomButton>
              </div>

              {classification && (
                <div
                  className={`mt-3 p-3 rounded-lg text-center font-medium shadow-[0px_0px_5px_rgba(117,117,117,0.3)]`}
                >
                  {t('scenes.S5.S5_D0_F17_C9.classified_as')}: {classification}
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-800 text-center p-4 rounded-lg shadow-[0px_0px_5px_rgba(117,117,117,0.3)]">
              {t('scenes.S5.S5_D0_F17_C9.select_email_to_analyze')}
            </div>
          )}
        </div>

        {/* Frequency Table */}
        <div className="mt-4 mb-4 rounded-xl p-4 mx-4">
          <h2 className="text-xl font-bold mb-3 text-gray-800">
            {t('scenes.S5.S5_D0_F17_C9.feature_frequency_table')}
          </h2>
          <div className="overflow-hidden rounded-xl shadow-[0px_0px_5px_rgba(117,117,117,0.3)]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-3 text-left border-b border-gray-200"></th>
                  <th className="p-3 text-center border-b border-gray-200">
                    {t('scenes.S5.S5_D0_F17_C9.feature_present')}
                  </th>
                  <th className="p-3 text-center border-b border-gray-200">
                    {t('scenes.S5.S5_D0_F17_C9.feature_absent')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 font-medium border-b border-gray-200">{t('scenes.S5.S5_D0_F17_C9.spam')}</td>
                  <td className="p-2 text-center border-b border-gray-200 font-medium">
                    {frequencyTable.spam.present}
                  </td>
                  <td className="p-2 text-center border-b border-gray-200 font-medium">
                    {frequencyTable.spam.absent}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 font-medium">{t('scenes.S5.S5_D0_F17_C9.not_spam')}</td>
                  <td className="p-2 text-center font-medium">{frequencyTable.notSpam.present}</td>
                  <td className="p-2 text-center font-medium">{frequencyTable.notSpam.absent}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailFeatureTracker;
