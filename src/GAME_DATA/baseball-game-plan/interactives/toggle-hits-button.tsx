import * as React from 'react';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  hits: number;
}

const ToggleHits = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, onPressedChange, hits, ...props }, ref) => {
    const ariaLabel = `${hits} hits ${pressed ? 'pressed' : 'unpressed'}`;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        onClick={() => onPressedChange?.(!pressed)}
        className={className}
        {...props}
      >
        {hits}
      </button>
    );
  },
);

export { ToggleHits };
