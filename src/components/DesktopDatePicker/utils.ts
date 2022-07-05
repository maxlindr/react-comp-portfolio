// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const getMinMonth = (minDate?: Date, selectedYear?: number) =>
  minDate && selectedYear != null && minDate.getFullYear() === selectedYear
    ? minDate.getMonth()
    : undefined;

export const getMaxMonth = (maxDate?: Date, selectedYear?: number) =>
  maxDate && selectedYear != null && maxDate.getFullYear() === selectedYear
    ? maxDate.getMonth()
    : undefined;
