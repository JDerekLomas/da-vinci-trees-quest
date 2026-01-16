import React, { useRef, useState, useEffect } from 'react';
import parse from 'html-react-parser';

// Interface for the InfoPopover component
interface InfoPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  heading?: string;
  postulateType?: 'postulate2' | 'postulate5' | 'definition' | 'notion' | null;
  position: { x: number; y: number };
  triggerRef: React.RefObject<HTMLButtonElement>;
}

// Interface for PostulateVisual component
interface PostulateVisualProps {
  type: 'postulate2' | 'postulate5' | 'definition' | 'notion';
}

// Reusable PostulateVisual component
const PostulateVisual: React.FC<PostulateVisualProps> = ({ type }) => {
  const renderPostulate2 = () => {
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
        aria-label="Postulate 2: Line extension illustration"
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

  const renderPostulate5 = () => {
    return (
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

          <text x="60" y="35" fontSize="12" fill="black" aria-hidden="true">
            ∠1
          </text>
          <text x="90" y="55" fontSize="12" fill="black" aria-hidden="true">
            ∠2
          </text>
        </g>
      </svg>
    );
  };

  switch (type) {
    case 'postulate2':
      return renderPostulate2();
    case 'postulate5':
      return renderPostulate5();
    default:
      return null;
  }
};

// Main InfoPopover component
const PostulareInfoPopover: React.FC<InfoPopoverProps> = ({
  isOpen,
  onClose,
  content,
  heading,
  postulateType = null,
  position: initialPosition,
  triggerRef,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, triggerRef]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Don't start dragging if clicking on the close button
    if ((e.target as HTMLElement).closest('button')) return;

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

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0" onClick={handleOutsideClick} role="presentation" />
      <div
        ref={popoverRef}
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
              <h3 className="text-lg font-bold text-gray-900">{heading}</h3>
              <button
                className="p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Close"
                onClick={() => {
                  onClose();
                  triggerRef.current?.focus();
                }}
                autoFocus
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Close"
                onClick={() => {
                  onClose();
                  triggerRef.current?.focus();
                }}
                autoFocus
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            {/* Content */}
            <div className="font-['avenir-next'] text-m mb-4">{parse(content)}</div>

            {/* Visual representation based on postulate type */}
            {postulateType && <PostulateVisual type={postulateType} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostulareInfoPopover;
