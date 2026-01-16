export const keysClassName = (isPressed: boolean, isActive: boolean, baseColor: string, activeColor: string) =>
  isPressed || isActive
    ? `cursor-pointer border border-gray-800 ${activeColor} flex justify-center items-center w-full h-full transition-colors duration-150`
    : `cursor-pointer border border-gray-800 ${baseColor} flex justify-center items-center w-full h-full transition-colors duration-150`;

export const keysBaseColor = (isWhiteKey: boolean) => isWhiteKey ? 'bg-white text-black' : 'bg-gray-900 text-white';
export const keysActiveColor = (isWhiteKey: boolean) => isWhiteKey ? 'bg-gray-300 text-black' : 'bg-gray-700 text-white';