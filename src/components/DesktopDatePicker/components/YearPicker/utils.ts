export const generateNumbers = (start: number, end: number) => {
  const length = Math.abs(end - start + 1);
  const absStart = Math.abs(start);

  return Array(length)
    .fill(null)
    .map((_, i) => absStart + i);
};

export const findElementByDataId = (
  container: HTMLElement,
  id: number | string
) => {
  const idAsString = String(id);

  return Array.from(container.children).find(
    (el) => el instanceof HTMLElement && el.dataset.id === idAsString
  );
};

export const scrollCenter = (container: HTMLElement, value: number) => {
  const selected = findElementByDataId(container, value);

  if (selected instanceof HTMLElement) {
    const selectedOffsetTop = selected.offsetTop;
    const selectedHeight = selected.offsetHeight;
    const containerHeight = container.offsetHeight;
    container.scroll(
      0,
      selectedOffsetTop - containerHeight / 2 + selectedHeight / 2
    );
  }
};
