import * as React from 'react';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, onPressedChange, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? 'on' : 'off'}
        onClick={() => onPressedChange?.(!pressed)}
        className={className}
        {...props}
      />
    );
  },
);
Toggle.displayName = 'Toggle';

export { Toggle };
