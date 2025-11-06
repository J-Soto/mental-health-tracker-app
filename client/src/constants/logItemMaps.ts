export const COLOR_MAP: Record<number, string> = {
  1: 'bg-red-500',
  2: 'bg-orange-400',
  3: 'bg-yellow-400',
  4: 'bg-lime-500',
  5: 'bg-emerald-600',
};

export const getScaleColor = (value: number) => COLOR_MAP[value] || 'bg-gray-400';