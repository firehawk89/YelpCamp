export const STROKE_WIDTH = 12;
export const STROKE_BORDER_RADIUS = 42;
export const CIRCUMFERENCE = 2 * Math.PI * STROKE_BORDER_RADIUS;

export const getStrokeDashoffset = (percentage: number) => {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  return CIRCUMFERENCE - (safePercentage / 100) * CIRCUMFERENCE;
};

export const getFormattedPercentage = (safePercentage: number) => {
  return `${Math.round(safePercentage)}%`;
};
