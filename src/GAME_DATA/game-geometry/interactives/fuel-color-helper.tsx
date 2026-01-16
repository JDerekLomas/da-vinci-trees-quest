export const getFuelLevelStrokeColor = (level: number): string => {
  if (level >= 60) return '#238B21';
  if (level >= 30) return '#C78700';
  return '#EB0000';
};

export const getFuelBarColorClass = (level: number): string => {
  if (level >= 60) return 'bg-[#238B21]';
  if (level >= 30) return 'bg-[#C78700]';
  return 'bg-[#EB0000]';
};
