import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, disabled = false }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50' : ''}`}>
      <div className="relative">
        <input
          disabled={disabled}
          type="checkbox"
          className="sr-only peer"
          checked={disabled ? false : checked}
          onChange={(e) => onChange(e.target.checked)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onChange(!checked);
            }
          }}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
      </div>
      <span className="ms-3 text-m font-medium text-gray-700">{label}</span>
    </label>
  );
};

export default ToggleSwitch;
