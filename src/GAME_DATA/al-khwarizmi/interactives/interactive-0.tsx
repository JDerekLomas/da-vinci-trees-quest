/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import config from '../configs/interactive-0';

interface LedgerEntry {
  id: number;
  amount: string;
  description: string;
  category: 'uncategorized' | 'revenue' | 'variable' | 'fixed';
  correctCategory: 'revenue' | 'variable' | 'fixed';
  isWrong: boolean;
}

interface DraggedItem {
  id: number;
  fromCategory: string;
}

interface Feedback {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const VirtualLedgerExplorer = ({ onInteraction }: { onInteraction: (state: Record<string, string | number | boolean | null>) => void }) => {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [announceText, setAnnounceText] = useState<string>('');

  const [touchDraggedItem, setTouchDraggedItem] = useState<DraggedItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState({ x: 0, y: 0 });
  const [touchStartTime, setTouchStartTime] = useState(0);

  const { t } = useTranslations();

  const originalEntries: any[] = useMemo(
    () =>
      config.ledgerEntries.map((entry) => ({
        id: entry.id,
        amount: t(config.translationKeys[entry.amountKey as keyof typeof config.translationKeys]),
        description: t(config.translationKeys[entry.descriptionKey as keyof typeof config.translationKeys]),
        category: entry.category,
        correctCategory: entry.correctCategory,
        isWrong: entry.isWrong,
      })),
    [t],
  );

  const shuffleArray = (array: LedgerEntry[]): LedgerEntry[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    const incorrectEntries = ledgerEntries.filter((entry) => entry.category !== entry.correctCategory);
    if(incorrectEntries.length === 0 && ledgerEntries.length === originalEntries.length) {
      onInteraction({
        'ledger-completed': true,
      });
    }
  }, [ledgerEntries, originalEntries]);

  useEffect(() => {
    setLedgerEntries(shuffleArray(originalEntries));
  }, [originalEntries]);

  const announceToScreenReader = (text: string) => {
    setAnnounceText(text);
    setTimeout(() => setAnnounceText(''), 100);
  };

  const handleDragStart = (id: number, fromCategory: string) => {
    setDraggedItem({ id, fromCategory });
  };

  const handleTouchStart = (e: React.TouchEvent, id: number, fromCategory: string) => {
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setTouchStartTime(Date.now());
    setTouchDraggedItem({ id, fromCategory });
    setIsDragging(false); // Not dragging yet, just touching
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDraggedItem) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);
    const dragThreshold = 10; // pixels

    if (deltaX > dragThreshold || deltaY > dragThreshold) {
      if (!isDragging) {
        setIsDragging(true);
        e.preventDefault(); // Prevent scrolling when dragging
        const entry = ledgerEntries.find((entry) => entry.id === touchDraggedItem.id);
        if (entry) {
          announceToScreenReader(`${t(config.translationKeys.started_dragging)} ${entry.description}`);
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchDraggedItem) return;

    const touchDuration = Date.now() - touchStartTime;
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);
    const dragThreshold = 10;
    const tapMaxDuration = 500;

    const wasTap = touchDuration < tapMaxDuration && deltaX < dragThreshold && deltaY < dragThreshold;

    if (isDragging) {
      e.preventDefault();
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);

      let targetCategory: LedgerEntry['category'] | null = null;
      let element = elementBelow;

      while (element) {
        if (element.getAttribute('data-drop-category')) {
          targetCategory = element.getAttribute('data-drop-category') as LedgerEntry['category'];
          break;
        }
        element = element.parentElement;
      }

      if (targetCategory) {
        moveEntryToCategory(touchDraggedItem.id, targetCategory);
        announceToScreenReader(
          `${t(config.translationKeys.dropped_into)} ${getCategoryInfo(targetCategory).name}`,
        );
      } else {
        announceToScreenReader(t(config.translationKeys.drag_cancelled));
      }
    } else if (wasTap) {
      // Don't prevent default for taps so click event can fire
    }

    // Reset touch state
    setTouchDraggedItem(null);
    setIsDragging(false);
    setTouchStartPos({ x: 0, y: 0 });
    setTouchStartTime(0);
  };

  const handleDrop = (category: LedgerEntry['category']) => {
    if (draggedItem !== null) {
      moveEntryToCategory(draggedItem.id, category);
      setDraggedItem(null);
    }
  };

  const moveEntryToCategory = (entryId: number, category: LedgerEntry['category']) => {
    const entry = ledgerEntries.find((e) => e.id === entryId);
    if (!entry) return;

    setLedgerEntries(
      ledgerEntries.map((entry) => (entry.id === entryId ? { ...entry, category, isWrong: false } : entry)),
    );

    const categoryName = getCategoryInfo(category).name;
    announceToScreenReader(`${entry.description} ${t(config.translationKeys.moved_to)} ${categoryName}`);

    setSelectedEntry(null);
  };

  const handleEntryClick = (entryId: number) => {
    if (isDragging) return;

    if (selectedEntry === entryId) {
      setSelectedEntry(null);
      announceToScreenReader(
        `${t(config.translationKeys.entry_deselected)} ${t(config.translationKeys.category_buttons_hidden)}`,
      );
    } else {
      setSelectedEntry(entryId);
      const entry = ledgerEntries.find((e) => e.id === entryId);
      if (entry) {
        announceToScreenReader(
          `${entry.description} ${t(config.translationKeys.selected)} ${t(config.translationKeys.category_buttons_visible_below)}`,
        );
      }
    }
  };

  const handleEntryKeyDown = (e: React.KeyboardEvent, entryId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEntryClick(entryId);
    }
  };

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkCategorization = () => {
    const uncategorizedEntries = ledgerEntries.filter((entry) => entry.category === 'uncategorized');

    if (uncategorizedEntries.length > 0) {
      const message = `${t(config.translationKeys.you_still_have)} ${uncategorizedEntries.length} ${t(config.translationKeys.uncategorized_entries)} ${t(config.translationKeys.please_categorize_all)}`;
      setFeedback({
        type: 'warning',
        message,
      });
      announceToScreenReader(message);
      return;
    }

    const incorrectEntries = ledgerEntries.filter((entry) => entry.category !== entry.correctCategory);

    if (incorrectEntries.length === 0) {
      const message = `${t(config.translationKeys.excellent)} ${t(config.translationKeys.all_entries_correct)} ${t(config.translationKeys.successfully_identified)}`;
      setFeedback({
        type: 'success',
        message,
      });
      announceToScreenReader(message);
    } else {
      setLedgerEntries(
        ledgerEntries.map((entry) =>
          entry.category !== entry.correctCategory ? { ...entry, isWrong: true } : { ...entry, isWrong: false },
        ),
      );

      const message = `${incorrectEntries.length} ${t(config.translationKeys.entries_not_correctly_categorized)} ${t(config.translationKeys.incorrect_entries_highlighted)} ${t(config.translationKeys.click_entries_see_buttons)}`;
      setFeedback({
        type: 'error',
        message,
      });
      announceToScreenReader(message);
    }
  };

  const getCategoryInfo = (category: LedgerEntry['category']) => {
    switch (category) {
      case 'revenue':
        return { name: t(config.translationKeys.revenue), color: 'border-green-600' };
      case 'variable':
        return { name: t(config.translationKeys.variable_costs), color: 'border-yellow-700' };
      case 'fixed':
        return { name: t(config.translationKeys.fixed_costs), color: 'border-red-600' };
      default:
        return { name: t(config.translationKeys.uncategorized), color: 'border-gray-400' };
    }
  };

  const getCategoryButtons = (entry: LedgerEntry) => {
    const allCategories: LedgerEntry['category'][] = ['revenue', 'variable', 'fixed'];

    const handleButtonKeyDown = (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        action();
      }
    };

    if (entry.category === 'uncategorized') {
      return (
        <div
          className="mt-2 flex gap-1 flex-wrap"
          role="group"
          aria-label={t(config.translationKeys.move_to_category_options)}
        >
          {allCategories.map((category, index) => (
            <button
              key={category}
              onClick={() => moveEntryToCategory(entry.id, category)}
              onKeyDown={(e) => handleButtonKeyDown(e, () => moveEntryToCategory(entry.id, category))}
              className={`px-2 py-1 text-md rounded font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                category === 'revenue'
                  ? 'bg-green-800 hover:bg-green-900 text-white'
                  : category === 'variable'
                    ? 'bg-yellow-800 hover:bg-yellow-900 text-white'
                    : 'bg-red-800 hover:bg-red-900 text-white'
              }`}
              aria-label={`${t(config.translationKeys.move)} ${entry.description} ${t(config.translationKeys.to)} ${getCategoryInfo(category).name} ${t(config.translationKeys.category)} ${t(config.translationKeys.button)} ${index + 1} ${t(config.translationKeys.of)} 3`}
              aria-describedby={`category-${category}-info`}
            >
              {getCategoryInfo(category).name}
            </button>
          ))}
          <div id="category-revenue-info" className="sr-only">
            {t(config.translationKeys.revenue_represents_money)}
          </div>
          <div id="category-variable-info" className="sr-only">
            {t(config.translationKeys.variable_costs_change)}
          </div>
          <div id="category-fixed-info" className="sr-only">
            {t(config.translationKeys.fixed_costs_remain_constant)}
          </div>
        </div>
      );
    } else {
      const otherCategories = allCategories.filter((cat) => cat !== entry.category);
      const currentCategoryInfo = getCategoryInfo(entry.category);

      return (
        <div
          className="mt-2 flex gap-1 flex-wrap"
          role="group"
          aria-label={`${t(config.translationKeys.move_options_for_item)} ${currentCategoryInfo.name}`}
        >
          {otherCategories.map((category, index) => (
            <button
              key={category}
              onClick={() => moveEntryToCategory(entry.id, category)}
              onKeyDown={(e) => handleButtonKeyDown(e, () => moveEntryToCategory(entry.id, category))}
              className={`px-2 py-1 text-md rounded font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                category === 'revenue'
                  ? 'bg-green-800 hover:bg-green-900 text-white'
                  : category === 'variable'
                    ? 'bg-yellow-800 hover:bg-yellow-900 text-white'
                    : 'bg-red-800 hover:bg-red-900 text-white'
              }`}
              aria-label={`${t(config.translationKeys.move)} ${entry.description} ${t(config.translationKeys.from)} ${currentCategoryInfo.name} ${t(config.translationKeys.to)} ${getCategoryInfo(category).name} ${t(config.translationKeys.category)} ${t(config.translationKeys.button)} ${index + 1} ${t(config.translationKeys.of)} ${otherCategories.length + 1}`}
            >
              {getCategoryInfo(category).name}
            </button>
          ))}
          <button
            onClick={() => moveEntryToCategory(entry.id, 'uncategorized')}
            onKeyDown={(e) => handleButtonKeyDown(e, () => moveEntryToCategory(entry.id, 'uncategorized'))}
            className="px-2 py-1 text-md rounded font-medium bg-gray-600 hover:bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label={`${t(config.translationKeys.remove)} ${entry.description} ${t(config.translationKeys.from)} ${currentCategoryInfo.name} ${t(config.translationKeys.category_and_return)} ${t(config.translationKeys.button)} ${otherCategories.length + 1} ${t(config.translationKeys.of)} ${otherCategories.length + 1}`}
          >
            {t(config.translationKeys.remove)}
          </button>
        </div>
      );
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
        aria-label={t(config.translationKeys.screen_reader_announcements)}
      >
        {announceText}
      </div>

      <div className="w-full">
        {/* Main content with proper ARIA structure */}
        <main role="main" aria-labelledby="game-title">
          <h1 id="game-title" className="sr-only">
            {t(config.translationKeys.date_merchant_ledger_explorer)}
          </h1>

          {/* Instructions for screen readers */}
          <div className="sr-only" role="region" aria-labelledby="instructions-heading">
            <h2 id="instructions-heading">{t(config.translationKeys.instructions_for_screen_reader)}</h2>
            <p>{t(config.translationKeys.categorization_game_description)}</p>
            <p>{t(config.translationKeys.two_methods_description)}</p>
            <p>{t(config.translationKeys.check_understanding_instruction)}</p>
          </div>

          {/* Two column layout */}
          <div
            className="flex gap-6 mb-4"
            role="application"
            aria-label={t(config.translationKeys.ledger_categorization_interface)}
          >
            {/* Left column - ledger entries */}
            <div className="w-1/2" role="region" aria-labelledby="uncategorized-heading">
              <h2 id="uncategorized-heading" className="font-bold mb-2 text-center">
                {t(config.translationKeys.merchants_ledger)}
              </h2>
              <div
                className="bg-white"
                role="group"
                aria-labelledby="uncategorized-heading"
                aria-describedby="uncategorized-description"
              >
                <div id="uncategorized-description" className="sr-only">
                  {t(config.translationKeys.uncategorized_ledger_entries_description)}
                </div>
                {ledgerEntries.filter((entry) => entry.category === 'uncategorized').length > 0 ? (
                  <div
                    className="flex flex-col gap-2"
                    role="list"
                    aria-label={t(config.translationKeys.uncategorized_entries)}
                  >
                    {ledgerEntries
                      .filter((entry) => entry.category === 'uncategorized')
                      .map((entry, index) => (
                        <div
                          key={entry.id}
                          role="listitem"
                          draggable={true}
                          onDragStart={() => handleDragStart(entry.id, 'uncategorized')}
                          onTouchStart={(e) => handleTouchStart(e, entry.id, 'uncategorized')}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                          onClick={() => handleEntryClick(entry.id)}
                          onKeyDown={(e) => handleEntryKeyDown(e, entry.id)}
                          tabIndex={0}
                          aria-label={`${t(config.translationKeys.entry)} ${index + 1} ${t(config.translationKeys.of)} ${ledgerEntries.filter((e) => e.category === 'uncategorized').length} ${t(config.translationKeys.amount)} ${entry.amount} ${t(config.translationKeys.description)} ${entry.description} ${t(config.translationKeys.status)} ${t(config.translationKeys.uncategorized)} ${selectedEntry === entry.id ? t(config.translationKeys.category_buttons_visible) : t(config.translationKeys.press_enter_show_buttons)}`}
                          aria-describedby={
                            selectedEntry === entry.id ? `entry-${entry.id}-buttons` : `entry-${entry.id}-help`
                          }
                          aria-expanded={selectedEntry === entry.id}
                          className={`p-2 rounded border-l-4 border-black-400 shadow-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            selectedEntry === entry.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="font-bold text-lg mr-2" aria-hidden="true">
                              {entry.amount}
                            </div>
                            <div className="text-md" aria-hidden="true">
                              {entry.description}
                            </div>
                          </div>
                          <div id={`entry-${entry.id}-help`} className="sr-only">
                            {t(config.translationKeys.press_enter_space_show_buttons)}
                          </div>
                          {selectedEntry === entry.id && (
                            <div
                              id={`entry-${entry.id}-buttons`}
                              role="group"
                              aria-label={t(config.translationKeys.category_selection_buttons)}
                            >
                              {getCategoryButtons(entry)}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 italic" role="status" aria-live="polite">
                    {t(config.translationKeys.all_entries_categorized)}
                  </div>
                )}
              </div>
            </div>

            {/* Right column - categories */}
            <div className="w-1/2" role="region" aria-labelledby="categories-heading">
              <h2 id="categories-heading" className="font-bold mb-2 text-center">
                {t(config.translationKeys.categories)}
              </h2>
              <div className="flex flex-col gap-3" role="group" aria-labelledby="categories-heading">
                {(['revenue', 'variable', 'fixed'] as const).map((category, categoryIndex) => {
                  const info = getCategoryInfo(category);
                  const itemsInCategory = ledgerEntries.filter((item) => item.category === category);

                  return (
                    <div
                      key={category}
                      onDragOver={allowDrop}
                      onDrop={() => handleDrop(category)}
                      data-drop-category={category}
                      className={`p-3 rounded-lg border-2 ${info.color}`}
                      role="region"
                      aria-labelledby={`category-${category}-heading`}
                      aria-describedby={`category-${category}-description`}
                      aria-dropeffect="move"
                    >
                      <h3 id={`category-${category}-heading`} className="font-bold mb-2 text-center">
                        {info.name}
                      </h3>
                      <div id={`category-${category}-description`} className="sr-only">
                        {t(config.translationKeys.category)} {categoryIndex + 1} {t(config.translationKeys.of)} 3{' '}
                        {t(config.translationKeys.contains)} {itemsInCategory.length}{' '}
                        {t(config.translationKeys.items)} {t(config.translationKeys.drag_entries_here)}
                      </div>
                      <div
                        className="flex flex-col gap-2 min-h-12"
                        role="list"
                        aria-label={`${t(config.translationKeys.items_in)} ${info.name} ${t(config.translationKeys.category)}`}
                      >
                        {itemsInCategory.map((item, itemIndex) => (
                          <div
                            key={item.id}
                            role="listitem"
                            draggable={true}
                            onDragStart={() => handleDragStart(item.id, category)}
                            onTouchStart={(e) => handleTouchStart(e, item.id, category)}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onClick={() => handleEntryClick(item.id)}
                            onKeyDown={(e) => handleEntryKeyDown(e, item.id)}
                            tabIndex={0}
                            aria-label={`${t(config.translationKeys.entry)} ${itemIndex + 1} ${t(config.translationKeys.of)} ${itemsInCategory.length} ${t(config.translationKeys.in)} ${info.name} ${t(config.translationKeys.amount)} ${item.amount} ${t(config.translationKeys.description)} ${item.description} ${item.isWrong ? t(config.translationKeys.currently_incorrect) : t(config.translationKeys.currently_correct)} ${selectedEntry === item.id ? t(config.translationKeys.category_buttons_visible) : t(config.translationKeys.press_enter_show_buttons)}`}
                            aria-describedby={
                              selectedEntry === item.id ? `item-${item.id}-buttons` : `item-${item.id}-help`
                            }
                            aria-expanded={selectedEntry === item.id}
                            aria-invalid={item.isWrong}
                            className={`p-2 rounded shadow-md text-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              item.isWrong ? 'bg-red-100 border border-red-500' : 'bg-white'
                            } ${selectedEntry === item.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                          >
                            <div aria-hidden="true">
                              <strong>{item.amount}:</strong> {item.description}
                            </div>
                            <div id={`item-${item.id}-help`} className="sr-only">
                              {t(config.translationKeys.press_enter_space_show_move_options)}
                            </div>
                            {item.isWrong && (
                              <div
                                className="text-md text-red-600 font-medium mt-1"
                                role="alert"
                                aria-live="polite"
                              >
                                ({t(config.translationKeys.incorrect)})
                              </div>
                            )}
                            {selectedEntry === item.id && (
                              <div
                                id={`item-${item.id}-buttons`}
                                role="group"
                                aria-label={t(config.translationKeys.category_move_options)}
                              >
                                {getCategoryButtons(item)}
                              </div>
                            )}
                          </div>
                        ))}
                        {itemsInCategory.length === 0 && (
                          <div className="text-center text-gray-500 text-sm p-2" role="status" aria-live="polite">
                            {t(config.translationKeys.no_items_category_yet)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Check Understanding button */}
          <div className="text-center mb-4" role="region" aria-labelledby="check-section">
            <h2 id="check-section" className="sr-only">
              {t(config.translationKeys.verify_your_work)}
            </h2>
            <button
              onClick={checkCategorization}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-describedby="check-button-description"
              aria-label={t(config.translationKeys.check_understanding_verify)}
            >
              {t(config.translationKeys.check_understanding)}
            </button>
            <div id="check-button-description" className="sr-only">
              {t(config.translationKeys.click_button_finished_categorizing)}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-3 rounded-lg mb-4 ${
                feedback.type === 'success'
                  ? 'text-green-800'
                  : feedback.type === 'error'
                    ? 'text-red-800'
                    : 'text-yellow-800'
              }`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              tabIndex={-1}
              aria-labelledby="feedback-heading"
            >
              <h3 id="feedback-heading" className="sr-only">
                {feedback.type === 'success'
                  ? t(config.translationKeys.success)
                  : feedback.type === 'error'
                    ? t(config.translationKeys.error)
                    : t(config.translationKeys.warning)}
              </h3>
              <p className="text-center">{feedback.message}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VirtualLedgerExplorer;
