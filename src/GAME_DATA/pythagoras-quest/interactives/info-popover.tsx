import React, { useRef, useState, useEffect } from 'react';
import parse from 'html-react-parser';

// Interface for the InfoPopover component
interface InfoPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  heading?: string;
  position: { x: number; y: number };
  triggerRef: React.RefObject<HTMLDivElement>;
}

// Main InfoPopover component
const InfoPopover: React.FC<InfoPopoverProps> = ({
  isOpen,
  onClose,
  content,
  heading,
  position: initialPosition,
  triggerRef,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Focus management and keyboard accessibility
  useEffect(() => {
    if (isOpen) {
      // Focus the popover container when it opens
      setTimeout(() => {
        popoverRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle Escape key and other keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          triggerRef.current?.focus();
          break;
        case 'Tab':
          // Since there are no focusable elements inside, prevent tab from doing anything
          e.preventDefault();
          break;
        case 'Enter':
        case ' ':
          // Close on Enter/Space when popover is focused
          if (document.activeElement === popoverRef.current) {
            e.preventDefault();
            onClose();
            triggerRef.current?.focus();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Don't start dragging if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, a, input, select, textarea')) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsDragging(true);
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setPosition({
      x: clientX - dragOffset.x,
      y: clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleOutsideClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onClose();
    triggerRef.current?.focus();
  };

  const handleCloseClick = () => {
    onClose();
    triggerRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={handleOutsideClick} 
        role="presentation"
        aria-hidden="true"
      />
      
      {/* Popover */}
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={heading ? "popover-heading" : undefined}
        aria-describedby="popover-content"
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: `${position.y}px`,
          left: `${position.x}px`,
          zIndex: 50,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div
            className="overflow-hidden bg-white rounded-xl shadow-lg border-2 border-solid border-[#006BE0]"
            style={{
            width: '400px',
            maxWidth: '90vw',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header section with heading and close button */}
          {heading && (
            <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-200">
              <h3 
                id="popover-heading"
                className="text-lg font-bold text-gray-900"
              >
                {heading}
              </h3>
              <button
                ref={closeButtonRef}
                className="p-2 hover:bg-gray-100 rounded-full focus:outline-none"
                aria-label="Close information popup"
                onClick={handleCloseClick}
                type="button"
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
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          <div
            className={`overflow-y-auto ${heading ? 'p-4 pt-3' : 'p-6 pt-8 pr-8'}`}
            style={{
              maxHeight: '87vh',
            }}
          >
            {/* Close button for when there's no heading */}
            {!heading && (
              <button
                ref={closeButtonRef}
                className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full focus:outline-none"
                aria-label="Close information popup"
                onClick={handleCloseClick}
                type="button"
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
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            {/* Content */}
            <div 
              id="popover-content"
              className="font-['avenir-next'] text-base leading-relaxed text-gray-800"
            >
              {parse(content)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPopover;
