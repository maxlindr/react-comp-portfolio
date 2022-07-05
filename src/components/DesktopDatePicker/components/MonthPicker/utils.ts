const generateNumbers = (start: number, end: number) => {
  const length = Math.abs(end - start + 1);
  const absStart = Math.abs(start);

  return Array(length)
    .fill(null)
    .map((_, i) => absStart + i);
};

const date = new Date('2020-01-01');

export const monthIndexToName = (index: number, locale: string) => {
  date.setMonth(index);
  return date.toLocaleString(locale, { month: 'long' });
};

export const MONTH_INDEXES = generateNumbers(0, 11);
