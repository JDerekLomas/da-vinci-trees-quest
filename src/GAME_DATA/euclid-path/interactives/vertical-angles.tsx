/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import verticalAnglesConfig from '../configs/vertical-angles';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameContext } from '../../../contexts/GameContext';
import PostulareInfoPopover from './postulate-info-popover';

// SVG Icon
const PencilRuler = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
    <path d="m8 6 2-2" />
    <path d="m18 16 2-2" />
    <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" />
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
  </svg>
);

// Header Component
interface HeaderProps {
  step: number;
  title: string;
  instruction: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { t } = useTranslations();
  return (
    <div className="flex justify-between items-center mb-2">
      <div>
        <div className="flex items-center gap-2"></div>
        <div className="text-2xl">{t(title)}</div>
      </div>
    </div>
  );
};

const EuclidTools: React.FC = () => {
  const [popoverState, setPopoverState] = useState<{
    isOpen: boolean;
    content: string;
    position: { x: number; y: number };
    triggerRef: React.RefObject<HTMLButtonElement>;
  } | null>(null);

  const { t } = useTranslations();
  const postulateButtonRef = useRef<HTMLButtonElement>(null);

  const handleInfoClick = (
    content: string,
    event: React.MouseEvent<HTMLButtonElement>,
    buttonRef: React.RefObject<HTMLButtonElement>,
  ) => {
    if (popoverState?.triggerRef === buttonRef) {
      setPopoverState(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverState({
      isOpen: true,
      content,
      position: {
        x: rect.right + 10,
        y: rect.top,
      },
      triggerRef: buttonRef,
    });
  };

  return (
    <div className="mt-2 mb-2">
      {' '}
      <div className="flex items-center gap-2 mb-2">
        <PencilRuler />
        <div className="font-bold text-xl">{t(verticalAnglesConfig.tools.title)}</div>{' '}
      </div>
      <ul className="space-y-2">
        <li className={`transition-all duration-700 relative`}>
          {' '}
          <span className=" font-bold">{t(verticalAnglesConfig.tools.definition1.label)}:</span>{' '}
          {t(verticalAnglesConfig.tools.definition1.description)}
        </li>
        <li className={`transition-all duration-700 relative`}>
          {' '}
          <span className=" font-bold">{t(verticalAnglesConfig.tools.notion1.label)}:</span>{' '}
          {t(verticalAnglesConfig.tools.notion1.description)}
        </li>
        <li className={`transition-all duration-700 relative`}>
          {' '}
          <span className=" font-bold">{t(verticalAnglesConfig.tools.notion3.label)}:</span>{' '}
          {t(verticalAnglesConfig.tools.notion3.description)}
        </li>
        <li className={` transition-all duration-700 relative`}>
          <span className=" font-bold">{t(verticalAnglesConfig.tools.postulate2.label)}:</span>{' '}
          {t(verticalAnglesConfig.tools.postulate2.description)}
          <button
            type="button"
            ref={postulateButtonRef}
            aria-label={t('scenes.S12.S12_D0_F60_C9.accessibility.show_info')}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full ml-2 transform translate-y-0.5"
            onClick={(e) => {
              handleInfoClick(
                t(verticalAnglesConfig.tools.postulate2.popoverDescription),
                e,
                postulateButtonRef
              )
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 hover:text-gray-700"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>
        </li>
      </ul>
      {popoverState && (
        <PostulareInfoPopover
          isOpen={popoverState.isOpen}
          onClose={() => setPopoverState(null)}
          content={popoverState.content}
          position={popoverState.position}
          triggerRef={popoverState.triggerRef}
          postulateType={'postulate2'}
          heading={t(verticalAnglesConfig.tools.postulate2.popoverTitle)}
        />     
      )}
    </div>
  );
};

// EquationBuilder Component
interface EquationBuilderProps {
  equation: { [key: string]: string | null };
  type: number;
  previousEquation: { [key: string]: string | null } | null;
  dragStart: (e: React.DragEvent, piece: string) => void;
  draggedOver: string | null;
  handleDragOver: (e: React.DragEvent, position: string) => void;
  handleDrop: (e: React.DragEvent, position: string | null, equationType?: string) => void;
  handleDragLeave: () => void;
  resetEquation: () => void;
  setStep: (step: number) => void;
  setFirstEquation: (equation: { [key: string]: string | null }) => void;
  setSecondEquation: (equation: { [key: string]: string | null }) => void;
}

const getAngleColor = (angle: string) => {
  switch (angle) {
    case 'a':
      return '#008217';
    case 'b':
      return '#DB0072';
    case 'c':
      return '#8E24AA';
    case 'd':
      return '#00749D';
    default:
      return 'black';
  }
};

const EquationBuilder: React.FC<EquationBuilderProps> = ({
  setFirstEquation,
  setSecondEquation,
  equation,
  type,
  previousEquation,
  dragStart,
  draggedOver,
  handleDragOver,
  handleDrop,
  handleDragLeave,
  setStep,
}) => {
  const { t } = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const [touchDragging, setTouchDragging] = useState<string | null>(null);
  const [localDraggedOver, setLocalDraggedOver] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const validateEquation = (newEquation: { [key: string]: string | null }) => {
    const filledSlots = Object.values(newEquation).filter(Boolean).length;
    if (filledSlots < 2) return null;

    const angles = Object.entries(newEquation)
      .filter(([_, position]) => position)
      .map(([angle]) => angle)
      .sort();

    if (previousEquation) {
      const prevAngles = Object.entries(previousEquation)
        .filter(([_, position]) => position)
        .map(([angle]) => angle)
        .sort();

      if (angles.every((angle) => prevAngles.includes(angle))) {
        return t(verticalAnglesConfig.errors.sameAngles);
      }

      const hasCommonAngle = angles.some((angle) => prevAngles.includes(angle));
      if (!hasCommonAngle) {
        return t(verticalAnglesConfig.errors.noCommonAngle);
      }
    }

    const adjacentPairs = [
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'd'],
      ['d', 'a'],
    ];

    const isAdjacent = adjacentPairs.some((pair) => {
      const sortedPair = [...pair].sort();
      return angles[0] === sortedPair[0] && angles[1] === sortedPair[1];
    });

    return isAdjacent ? null : t(verticalAnglesConfig.errors.notAdjacent);
  };

  const handleValidatedDrop = (e: React.DragEvent, position: string) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData('text/plain');
    const existingAngle = Object.keys(equation).find((angle) => equation[angle] === position);
    const newEquation = { ...equation };

    if (existingAngle) {
      delete newEquation[existingAngle];
    }

    newEquation[piece] = position;
    setError(null);

    const validationError = validateEquation(newEquation);
    if (validationError) {
      setError(validationError);
      setTimeout(() => {
        handleDrop(e, null);
        setError(null);
      }, 5000);
    } else {
      handleDrop(e, position, type === 1 ? 'first' : 'second');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, angle: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();

      const position = Object.values(equation).includes('left') ? 'right' : 'left';
      const existingAngle = Object.keys(equation).find((a) => equation[a] === position);
      const newEquation = { ...equation };

      // If the position is already occupied, remove the existing angle
      if (existingAngle) {
        delete newEquation[existingAngle];
      }

      // Assign the new angle to the position
      newEquation[angle] = position;
      setError(null);

      // Validate the new equation
      const validationError = validateEquation(newEquation);
      if (validationError) {
        setError(validationError);
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        if (type === 1) {
          setFirstEquation(newEquation);
        } else {
          setSecondEquation(newEquation);
        }
        if (Object.values(newEquation).filter(Boolean).length === 2) {
          setStep(type === 1 ? 2 : 3);
        }
        setAnnouncement(`${angle} ${t('scenes.S5.S5_D0_F31_C9.angleAddedArialLabel')} ${position}`);
      }
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent, angle: string) => {
    e.stopPropagation();
    setTouchDragging(angle);
    // Synthetic drag event for the dragStart function
    const syntheticEvent = {
      dataTransfer: {
        setData: () => { },
        getData: () => angle,
      },
    } as unknown as React.DragEvent;
    dragStart(syntheticEvent, angle);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDragging) return;
    e.stopPropagation();

    // Get the touch position
    const touch = e.touches[0];

    // Find which drop zone (if any) the touch is over
    const leftDropZone = document.getElementById('left-drop-zone');
    const rightDropZone = document.getElementById('right-drop-zone');

    if (leftDropZone && rightDropZone) {
      const leftRect = leftDropZone.getBoundingClientRect();
      const rightRect = rightDropZone.getBoundingClientRect();

      // Check if touch is over left drop zone
      if (
        touch.clientX >= leftRect.left &&
        touch.clientX <= leftRect.right &&
        touch.clientY >= leftRect.top &&
        touch.clientY <= leftRect.bottom
      ) {
        setLocalDraggedOver('left');
        const syntheticEvent = {} as React.DragEvent;
        handleDragOver(syntheticEvent, 'left');
      }
      // over right drop zone
      else if (
        touch.clientX >= rightRect.left &&
        touch.clientX <= rightRect.right &&
        touch.clientY >= rightRect.top &&
        touch.clientY <= rightRect.bottom
      ) {
        setLocalDraggedOver('right');
        // Synthetic drag event for the dragOver function
        const syntheticEvent = {} as React.DragEvent;
        handleDragOver(syntheticEvent, 'right');
      }
      // Not over any drop zone
      else {
        setLocalDraggedOver(null);
        handleDragLeave();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchDragging) return;
    e.stopPropagation();

    // Get the last touch position
    const touch = e.changedTouches[0];

    // Find which drop zone (if any) the touch ended on
    const leftDropZone = document.getElementById('left-drop-zone');
    const rightDropZone = document.getElementById('right-drop-zone');

    if (leftDropZone && rightDropZone) {
      const leftRect = leftDropZone.getBoundingClientRect();
      const rightRect = rightDropZone.getBoundingClientRect();

      // Check if touch ended on left drop zone
      if (
        touch.clientX >= leftRect.left &&
        touch.clientX <= leftRect.right &&
        touch.clientY >= leftRect.top &&
        touch.clientY <= leftRect.bottom
      ) {
        // Create a new equation object
        const newEquation = { ...equation };

        // Check if the position is already occupied
        const existingAngle = Object.keys(newEquation).find((angle) => newEquation[angle] === 'left');

        // If the position is already occupied, remove the existing angle
        if (existingAngle) {
          delete newEquation[existingAngle];
        }

        // Assign the new angle to the position
        newEquation[touchDragging] = 'left';

        // Validate the new equation
        const validationError = validateEquation(newEquation);
        if (validationError) {
          setError(validationError);
          setTimeout(() => {
            setError(null);
          }, 5000);
        } else {
          if (type === 1) {
            setFirstEquation(newEquation);
          } else {
            setSecondEquation(newEquation);
          }
          if (Object.values(newEquation).filter(Boolean).length === 2) {
            setStep(type === 1 ? 2 : 3);
          }
        }
      }
      // Check if touch ended on right drop zone
      else if (
        touch.clientX >= rightRect.left &&
        touch.clientX <= rightRect.right &&
        touch.clientY >= rightRect.top &&
        touch.clientY <= rightRect.bottom
      ) {
        // Create a new equation object
        const newEquation = { ...equation };

        // Check if the position is already occupied
        const existingAngle = Object.keys(newEquation).find((angle) => newEquation[angle] === 'right');

        // If the position is already occupied, remove the existing angle
        if (existingAngle) {
          delete newEquation[existingAngle];
        }

        // Assign the new angle to the position
        newEquation[touchDragging] = 'right';

        // Validate the new equation
        const validationError = validateEquation(newEquation);
        if (validationError) {
          setError(validationError);
          setTimeout(() => {
            setError(null);
          }, 5000);
        } else {
          if (type === 1) {
            setFirstEquation(newEquation);
          } else {
            setSecondEquation(newEquation);
          }
          if (Object.values(newEquation).filter(Boolean).length === 2) {
            setStep(type === 1 ? 2 : 3);
          }
        }
      }
    }

    setTouchDragging(null);
    setLocalDraggedOver(null);
    handleDragLeave();
  };

  const availableAngles = ['a', 'b', 'c', 'd'].filter((angle) => !equation[angle]);

  return (
    <div className="mb-6">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <div className="flex gap-4 max-[960px]:gap-2 mb-4">
        {availableAngles.map((angle) => (
          <button
            key={angle}
            className={`w-12 h-12 flex items-center justify-center rounded cursor-move border-2 border-[#757575] font-bold font-[besley] italic ${touchDragging === angle ? 'opacity-50' : ''}`}
            role="button"
            aria-pressed={Object.values(equation).includes(angle)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', angle);
              dragStart(e, angle);
            }}
            onKeyDown={(e) => handleKeyDown(e, angle)}
            onClick={(e) => handleKeyDown(e as unknown as React.KeyboardEvent, angle)}
            onTouchStart={(e) => handleTouchStart(e, angle)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            style={{ color: getAngleColor(angle) }}
          >
            ∠{angle}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 max-[960px]:gap-1 max-[1024px]:gap-2">
        <div
          id="left-drop-zone"
          className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center font-besley italic font-bold transition-colors duration-200 ${draggedOver === 'left' || localDraggedOver === 'left'
            ? 'border-blue-500 bg-blue-500/20'
            : error
              ? 'border-red-500 bg-red-500/20'
              : 'border-[#757575]'
            }`}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(e, 'left');
          }}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleValidatedDrop(e, 'left')}
        >
          {Object.entries(equation).map(
            ([angle, pos]) => pos === 'left' && <span style={{ color: getAngleColor(angle) }}>{`∠${angle}`}</span>,
          )}
        </div>
        <span className=" text-2xl max-[960px]:text-base">+</span>
        <div
          id="right-drop-zone"
          className={`w-12 h-12 border-2 border-dashed rounded flex items-center justify-center font-besley italic font-bold transition-colors duration-200 ${draggedOver === 'right' || localDraggedOver === 'right'
            ? 'border-blue-500 bg-blue-500/20'
            : error
              ? 'border-red-500 bg-red-500/20'
              : 'border-[#757575]'
            }`}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(e, 'right');
          }}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleValidatedDrop(e, 'right')}
        >
          {Object.entries(equation).map(
            ([angle, pos]) =>
              pos === 'right' && <span style={{ color: getAngleColor(angle) }}>{`∠${angle}`}</span>,
          )}{' '}
        </div>
        <span className=" text-2xl max-[960px]:text-base">=</span>
        <span className=" text-2xl max-[960px]:text-xl">180°</span>
      </div>
      {error && (
        <div className="mt-2 text-[#EB0000] text-base animate-fade-in flex items-center gap-2 border-dashed border-2 border-[#EB0000] p-3 rounded-lg">
          <span className="inline-block w-2 h-2 bg-[#EB0000] rounded-full animate-pulse"></span>
          {error}
        </div>
      )}
    </div>
  );
};

const styleEquation = (equation: string) => {
  return equation.replace(/∠([a-d])/g, (match, angle) => {
    return `<span class="italic font-besley" style="color: ${getAngleColor(angle)};">${match}</span>`;
  });
};

// ProofDisplay Component
interface ProofDisplayProps {
  firstEquation: { [key: string]: string | null };
  secondEquation: { [key: string]: string | null };
  setShowSummary: (show: boolean) => void;
  setIsReviewing: (isReviewing: boolean) => void;
  isReviewing: boolean;
  firstPairCompleted: boolean;
  secondPairCompleted: boolean;
  setFirstPairCompleted: (firstPairCompleted: boolean) => void;
  setSecondPairCompleted: (secondPairCompleted: boolean) => void;
}

const ProofDisplay: React.FC<ProofDisplayProps> = ({
  firstEquation,
  secondEquation,
  setShowSummary,
  setFirstPairCompleted,
  setSecondPairCompleted,
}) => {
  const { t } = useTranslations();
  const isFirstEquationComplete = Object.values(firstEquation).filter(Boolean).length === 2;
  const isSecondEquationComplete = Object.values(secondEquation).filter(Boolean).length === 2;

  if (!isFirstEquationComplete) return null;
  if (isFirstEquationComplete) {
    setFirstPairCompleted(true);
  }
  if (isSecondEquationComplete) {
    setSecondPairCompleted(true);
  }

  const getEquationPair = (equation: { [key: string]: string | null }) => {
    return Object.entries(equation)
      .filter(([_, pos]) => pos)
      .map(([angle]) => angle)
      .sort();
  };

  const firstPair = getEquationPair(firstEquation);
  const secondPair = isSecondEquationComplete ? getEquationPair(secondEquation) : null;

  const steps = [];

  if (firstPair.length === 2) {
    steps.push({
      equation: `∠${firstPair[0]} + ∠${firstPair[1]} = 180°`,
      explanation: t(verticalAnglesConfig.steps.adjacentAngles),
    });
  }

  if (secondPair && secondPair.length === 2) {
    steps.push({
      equation: `∠${secondPair[0]} + ∠${secondPair[1]} = 180°`,
      explanation: t(verticalAnglesConfig.steps.adjacentAngles),
    });

    const commonAngle = firstPair.find((angle) => secondPair.includes(angle));
    if (commonAngle) {
      steps.push({
        equation: `∠${firstPair[0]} + ∠${firstPair[1]} = ∠${secondPair[0]} + ∠${secondPair[1]}`,
        explanation: t(verticalAnglesConfig.steps.commonNotion1),
      });

      const uniqueFirstAngle = firstPair.find((angle) => angle !== commonAngle);
      const uniqueSecondAngle = secondPair.find((angle) => angle !== commonAngle);

      const allAngles = ['a', 'b', 'c', 'd'];
      const usedAngles = new Set([...firstPair, ...secondPair]);
      const remainingAngle = allAngles.find((angle) => !usedAngles.has(angle));

      if (remainingAngle) {
        const isFirstPairGreen = ['a', 'c'].includes(uniqueFirstAngle!);
        steps.push({
          equation: `∠${firstPair[0]} + ∠${firstPair[1]} - ∠${commonAngle} = ∠${secondPair[0]} + ∠${secondPair[1]} - ∠${commonAngle}`,
          explanation: t(verticalAnglesConfig.steps.commonNotion3),
        });

        steps.push({
          equation: `∠${uniqueFirstAngle} = ∠${uniqueSecondAngle}`,
          type: isFirstPairGreen ? 'green' : 'blue',
          explanation: t(verticalAnglesConfig.steps.verticalAnglesEqual),
        });

        if (isSecondEquationComplete) {
          steps.push({
            equation: t(verticalAnglesConfig.steps.verticalAnglesConclusion),
            explanation: t(verticalAnglesConfig.steps.verticalAnglesProof),
          });
        }
      }
    }
  }

  return (
    <div className="mt-8 animate-fade-in">
      <div>
        {' '}
        <div className="text-xl  mb-4">{t(verticalAnglesConfig.title)}</div>
        <div className="space-y-4 ">
          {' '}
          {steps.map((step, index) => (
            <div key={index} className="transform transition-all duration-500 ease-out">
              <p
                className={` ${step.type === 'green' ? 'text-[#238B21]' : step.type === 'blue' ? 'text-[#006BE0]' : ''
                  }`}
                dangerouslySetInnerHTML={{ __html: styleEquation(step.equation) }}
              />
              <p className="ml-6">→ {step.explanation}</p>
            </div>
          ))}
        </div>
        {isSecondEquationComplete && (
          <div className="mt-6 pt-4 border-t border-[#757575]">
            <div className="flex justify-center">
              <button
                onClick={() => setShowSummary(true)}
                className="px-6 py-2 bg-[#006BE0] text-white rounded-lg"
              >
                {t(verticalAnglesConfig.viewSummary)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// SummarySlide Component
interface SummarySlideProps {
  onClose: () => void;
}

const SummarySlide: React.FC<SummarySlideProps> = ({ onClose }) => {
  const { t } = useTranslations();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded-lg p-8 max-w-xl mx-4 shadow-2xl bg-white border-2 border-[#006BE0]">
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold">{t(verticalAnglesConfig.summarySlideConfig.title)}</h2>
            <button
              autoFocus
              onClick={onClose}
              aria-label={t('popover.close')}
              className="p-2 rounded-full text-3xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="w-96 h-96 relative">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              <line x1="80" y1="80" x2="220" y2="220" stroke="black" strokeWidth="2" />
              <line x1="80" y1="220" x2="220" y2="80" stroke="black" strokeWidth="2" />
              <text x="130" y="100" fill="#008217" fontSize="24" className="font-besley italic ">
                ∠a
              </text>
              <text x="195" y="160" fill="#8E24AA" fontSize="24" className="font-besley italic ">
                ∠c
              </text>
              <text x="120" y="215" className="translate-x-2 font-besley italic" fill="#00749D" fontSize="24">
                ∠d
              </text>
              <text x="85" y="160" className="-translate-x-2 font-besley italic" fill="#DB0072" fontSize="24">
                ∠b
              </text>
            </svg>
          </div>

          <div className="text-center space-y-4 mb-5">
            <p className="text-xl">{t(verticalAnglesConfig.summarySlideConfig.description)}</p>
            <p className="text-2xl font-medium tracking-wide">
              <span className="font-besley italic text-[#008217]">∠a</span>
              <span className="mx-2">=</span>
              <span className="font-besley italic text-[#8E24AA]">∠c</span>
              <span className="mx-4">and</span>
              <span className="font-besley italic text-[#DB0072]">∠b</span>
              <span className="mx-2">=</span>
              <span className="font-besley italic text-[#00749D]">∠d</span>
            </p>
          </div>

          <button onClick={onClose} className="px-8 py-3 bg-[#006BE0] text-lg text-white rounded-full">
            {t(verticalAnglesConfig.summarySlideConfig.gotIt)}
          </button>
        </div>
      </div>
    </div>
  );
};

// DrawingCanvas Component
interface DrawingCanvasProps {
  lines: { line1: { x: number; y: number }[]; line2: { x: number; y: number }[] }
  step: number;
  firstEquation: { [key: string]: string | null };
  secondEquation: { [key: string]: string | null };
  activeAngle: string | null;
  currentStep: number;
}

const calculateIntersection = (lines: {
  line1: { x: number; y: number }[];
  line2: { x: number; y: number }[];
}) => {
  if (!lines.line1[0] || !lines.line1[1] || !lines.line2[0] || !lines.line2[1]) {
    return null;
  }
  const x1 = lines.line1[0].x;
  const y1 = lines.line1[0].y;
  const x2 = lines.line1[1].x;
  const y2 = lines.line1[1].y;
  const x3 = lines.line2[0].x;
  const y3 = lines.line2[0].y;
  const x4 = lines.line2[1].x;
  const y4 = lines.line2[1].y;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 0.001) return null;

  const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
  const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;

  const onLine1 =
    px >= Math.min(x1, x2) && px <= Math.max(x1, x2) && py >= Math.min(y1, y2) && py <= Math.max(y1, y2);
  const onLine2 =
    px >= Math.min(x3, x4) && px <= Math.max(x3, x4) && py >= Math.min(y3, y4) && py <= Math.max(y3, y4);

  return onLine1 && onLine2 ? { x: px, y: py } : null;
};

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  lines,
  step,
  firstEquation,
  secondEquation,
  activeAngle,
  currentStep,
}) => {
  const intersection = calculateIntersection(lines);

  const getAngleColor = (label: string | null) => {
    if (label === activeAngle) return 'rgb(59, 130, 246)';

    switch (label) {
      case 'a':
        return '#008217';
      case 'b':
        return '#DB0072';
      case 'c':
        return '#8E24AA';
      case 'd':
        return '#00749D';
      default:
        return 'black';
    }
  };

  const drawAdjacentAngleArc = (equation: { [key: string]: string | null }) => {
    if (!intersection || Object.values(equation).filter(Boolean).length !== 2) return null;

    const angles = Object.entries(equation)
      .filter(([_, pos]) => pos)
      .map(([angle]) => angle)
      .sort();

    if (angles.length !== 2) return null;

    const anglePositions: { [key: string]: number } = {
      a: 0,
      b: Math.PI / 2,
      c: Math.PI,
      d: (3 * Math.PI) / 2,
    };

    const angle1 = anglePositions[angles[0]];
    const angle2 = anglePositions[angles[1]];
    const radius = 50;

    if (angles.includes('a') && angles.includes('d')) {
      const startAngle = anglePositions['a'];
      const endAngle = anglePositions['d'];

      const start = {
        x: intersection.x + radius * Math.cos(startAngle),
        y: intersection.y + radius * Math.sin(startAngle),
      };

      const end = {
        x: intersection.x + radius * Math.cos(endAngle),
        y: intersection.y + radius * Math.sin(endAngle),
      };

      const baseColor = getAngleColor('a');
      const arcColor = baseColor.replace('rgb', 'rgba').replace(')', ', 0.5)');

      return (
        <path
          d={`M ${start.x} ${start.y} 
             A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`}
          fill="none"
          stroke={arcColor}
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      );
    }

    const startAngle = angle1;
    const endAngle = angle2;

    const start = {
      x: intersection.x + radius * Math.cos(startAngle),
      y: intersection.y + radius * Math.sin(startAngle),
    };

    const end = {
      x: intersection.x + radius * Math.cos(endAngle),
      y: intersection.y + radius * Math.sin(endAngle),
    };

    const baseColor = getAngleColor(angles[0]);
    const arcColor = baseColor.replace('rgb', 'rgba').replace(')', ', 0.5)');

    return (
      <path
        d={`M ${start.x} ${start.y} 
           A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`}
        fill="none"
        stroke={arcColor}
        strokeWidth="2"
        strokeDasharray="5,5"
        className="animate-pulse"
      />
    );
  };

  return (
    <svg
      className="w-full h-80"
      viewBox="0 0 400 300"
      style={{
        transform: currentStep === 2 || currentStep === 3 ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {lines.line1[0] && lines.line1[1] && (
        <line
          x1={lines.line1[0].x}
          y1={lines.line1[0].y}
          x2={lines.line1[1].x}
          y2={lines.line1[1].y}
          stroke="black"
          strokeWidth="2"
        />
      )}

      {lines.line2[0] && lines.line2[1] && (
        <line
          x1={lines.line2[0].x}
          y1={lines.line2[0].y}
          x2={lines.line2[1].x}
          y2={lines.line2[1].y}
          stroke="black"
          strokeWidth="2"
        />
      )}

      {step >= 1 && intersection && (
        <>
          {drawAdjacentAngleArc(firstEquation)}
          {drawAdjacentAngleArc(secondEquation)}

          {['a', 'b', 'c', 'd'].map((label, i) => {
            const angle = (Math.PI / 2) * i;
            const x = intersection.x + 40 * Math.cos(angle);
            const y = intersection.y + 40 * Math.sin(angle);

            return (
              <g key={label} className="transition-all duration-300">
                {label === activeAngle && (
                  <circle cx={x} cy={y} r="22" fill="rgba(59, 130, 246, 0.2)" className="animate-pulse" />
                )}
                <text
                  x={x}
                  y={y}
                  fill={getAngleColor(label)}
                  fontSize="16"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`transform transition-all duration-300 font-besley italic ${label === activeAngle ? 'scale-125' : ''}`}
                >
                  ∠{label}
                </text>
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
};

interface VerticalAnglesProofProps {
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const VerticalAnglesProof: React.FC<VerticalAnglesProofProps> = ({ onInteraction }) => {
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    throw new Error();
  }
  const { interactiveResponses, setInteractiveResponses } = gameContext;
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const storedLines = interactiveResponses['vertical-angles']?.lines
    ? (JSON.parse(interactiveResponses['vertical-angles'].lines as string) as {
      line1: { x: number; y: number }[];
      line2: { x: number; y: number }[];
    })
    : { line1: [], line2: [] };

  const storedFirstEquation = interactiveResponses['vertical-angles']?.firstEquation
    ? (JSON.parse(interactiveResponses['vertical-angles'].firstEquation as string) as {
      [key: string]: string | null;
    })
    : {};

  const storedSecondEquation = interactiveResponses['vertical-angles']?.secondEquation
    ? (JSON.parse(interactiveResponses['vertical-angles'].secondEquation as string) as {
      [key: string]: string | null;
    })
    : {};

  const [firstEquation, setFirstEquation] = useState<{ [key: string]: string | null }>(storedFirstEquation);
  const [secondEquation, setSecondEquation] = useState<{ [key: string]: string | null }>(storedSecondEquation);
  const [lines, setLines] = useState<{ line1: { x: number; y: number }[]; line2: { x: number; y: number }[] }>(
    storedLines,
  );

  const [step, setStep] = useState(0); // 0: Draw lines, 1: Show angles, 2: First Eqn , 3: Second Eqn
  const [isDragging, setIsDragging] = useState<{ piece: string } | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [activeAngle, setActiveAngle] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [firstPairCompleted, setFirstPairCompleted] = useState(false);
  const [secondPairCompleted, setSecondPairCompleted] = useState(false);

  const { payload } = useEventListener('vertical-angles');

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      setStep(payload.step as number);
    }
  }, [payload, step]);

  useEffect(() => {
    setInteractiveResponses((prev) => ({
      ...prev,
      'vertical-angles': {
        ...prev['vertical-angles'],
        lines: JSON.stringify(lines),
        firstEquation: JSON.stringify(firstEquation),
        secondEquation: JSON.stringify(secondEquation),
      },
    }));
    if (step === 1) {
      onInteraction({ 'step-1-completed': true });
    } else if (Object.values(firstEquation).filter(Boolean).length === 2) {
      onInteraction({ 'step-2-completed': true });
      setFirstPairCompleted(true);
    }

    if (step === 3 && firstPairCompleted && secondPairCompleted) {
      onInteraction({ 'step-3-completed': true });
    }
  }, [
    lines,
    firstEquation,
    secondEquation,
    step,
    firstPairCompleted,
    secondPairCompleted,
    onInteraction,
    setInteractiveResponses,
  ]);

  const drawDefaultLines = () => {
    const defaultLines = {
      line1: [
        { x: 100, y: 50 },
        { x: 300, y: 250 },
      ],
      line2: [
        { x: 100, y: 250 },
        { x: 300, y: 50 },
      ],
    };

    setLines(defaultLines);
    setAnnouncement(t('scenes.S5.S5_D0_F31_C9.drawDefaultLinesAriaLabel'));
    onInteraction({ 'step-0-completed': true });
  };

  const dragStart = (e: React.DragEvent, piece: string) => {
    if (!e.dataTransfer) return;
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging({ piece });
    setActiveAngle(piece);
    setTimeout(() => {
      setActiveAngle(null);
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent, position: string) => {
    e.preventDefault();
    setDraggedOver(position);
  };

  const handleDrop = (e: React.DragEvent, position: string | null, equationType?: string) => {
    e.preventDefault();
    setDraggedOver(null);
    setActiveAngle(null);
    if (isDragging && position) {
      if (equationType === 'first') {
        const newFirstEquation = { ...firstEquation };
        const existingAngle = Object.keys(newFirstEquation).find((angle) => newFirstEquation[angle] === position);
        if (existingAngle) {
          delete newFirstEquation[existingAngle];
        }
        newFirstEquation[isDragging.piece] = position;
        setFirstEquation(newFirstEquation);
        if (Object.values(newFirstEquation).filter(Boolean).length === 2) {
          setStep(2);
        }
      } else if (equationType === 'second') {
        const newSecondEquation = { ...secondEquation };
        const existingAngle = Object.keys(newSecondEquation).find(
          (angle) => newSecondEquation[angle] === position,
        );
        if (existingAngle) {
          delete newSecondEquation[existingAngle];
        }
        newSecondEquation[isDragging.piece] = position;
        setSecondEquation(newSecondEquation);
        if (Object.values(newSecondEquation).filter(Boolean).length === 2) {
          setStep(3);
        }
      }
      setIsDragging(null);
    }
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
    setActiveAngle(null);
  };

  const resetFirstEquation = () => {
    setFirstEquation({});
  };

  const resetSecondEquation = () => {
    setSecondEquation({});
  };

  const steps = [
    {
      title: t(verticalAnglesConfig.steps.step1.title),
      instruction: t(verticalAnglesConfig.steps.step1.instruction),
    },
    {
      title: t(verticalAnglesConfig.steps.step2.title),
      instruction: t(verticalAnglesConfig.steps.step2.instruction),
    },
    {
      title: t(verticalAnglesConfig.steps.step3.title),
      instruction: t(verticalAnglesConfig.steps.step3.instruction),
    },
    {
      title: t(verticalAnglesConfig.steps.step4.title),
      instruction: t(verticalAnglesConfig.steps.step4.instruction),
    },
  ];

  const currentStep = step >= 0 && step < steps.length ? step : 0;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-6 rounded-lg mt-[-35px]">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <Header step={currentStep} title={steps[currentStep].title} instruction={steps[currentStep].instruction} />
      <EuclidTools />
      <div
        className={`relative w-full ${currentStep === 2 || currentStep === 3 ? 'flex gap-4' : ''} min-h-[100px]`}
      >
        <div
          className={`relative ${currentStep === 2 || currentStep === 3 ? 'w-1/2' : 'w-full'} rounded-lg overflow-hidden mt-2 border-2 border-dashed border-[#757575]`}
        >
          <DrawingCanvas
            lines={lines}
            step={currentStep}
            firstEquation={firstEquation}
            secondEquation={secondEquation}
            activeAngle={activeAngle}
            currentStep={currentStep}
          />
        </div>

        {(currentStep === 2 || currentStep === 3) && (
          <div className="w-1/2 rounded-lg p-6 min-[960px]:p-6 min-[820px]:p-3 min-[768px]:p-1 border-2 mt-2 border-solid border-[#757575]">
            <div className="flex-none space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium">
                  {currentStep === 2
                    ? t(verticalAnglesConfig.steps.step2.equationTitle)
                    : t(verticalAnglesConfig.steps.step3.equationTitle)}
                </div>
              </div>
              <div className="sr-only">{t('scenes.common.focusModeAnnouncement')}</div>
              <EquationBuilder
                equation={currentStep === 2 ? firstEquation : secondEquation}
                type={currentStep === 2 ? 1 : 2}
                previousEquation={currentStep === 3 ? firstEquation : null}
                dragStart={dragStart}
                draggedOver={draggedOver}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleDragLeave={handleDragLeave}
                resetEquation={currentStep === 2 ? resetFirstEquation : resetSecondEquation}
                setStep={setStep}
                setFirstEquation={setFirstEquation}
                setSecondEquation={setSecondEquation}
              />
              <ProofDisplay
                firstEquation={firstEquation}
                secondEquation={secondEquation}
                setShowSummary={setShowSummary}
                isReviewing={isReviewing}
                setIsReviewing={setIsReviewing}
                firstPairCompleted={firstPairCompleted}
                setFirstPairCompleted={setFirstPairCompleted}
                secondPairCompleted={secondPairCompleted}
                setSecondPairCompleted={setSecondPairCompleted}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add the button below the canvas */}
      {currentStep === 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={drawDefaultLines}
            className="px-6 py-2 bg-[#006BE0] text-white rounded-lg hover:bg-[#0056b3] transition-colors"
          >
            {t(verticalAnglesConfig.drawDefaultLines)}
          </button>
        </div>
      )}

      {showSummary && <SummarySlide onClose={() => setShowSummary(false)} />}
    </div>
  );
};

export default VerticalAnglesProof;
