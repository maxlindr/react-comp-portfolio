/* eslint-disable @typescript-eslint/no-empty-function */
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { DesktopDatePicker } from '../DesktopDatePicker';

beforeAll(() => {
  // a stub for the missing HTMLElement.scroll method in JSDOM
  window.HTMLElement.prototype.scroll = () => {};
});

afterEach(() => {
  cleanup();
});

const findToggleButton = (container: HTMLElement) =>
  container.querySelector('button[aria-label="toggle-btn"]');

describe('DesktopDatePicker', () => {
  it('should initially render PickerTextField only', () => {
    const { queryByTestId } = render(<DesktopDatePicker />);

    expect(queryByTestId('year-picker')).toBeNull();
    expect(queryByTestId('month-picker')).toBeNull();
  });

  it('toggle open/close picker controlled by toggle button', () => {
    const getPicker = () => queryByTestId('year-picker');

    const { container, queryByTestId } = render(
      <DesktopDatePicker toggleLabel="toggle-btn" />
    );

    const toggleBtn = findToggleButton(container);

    fireEvent.click(toggleBtn as HTMLButtonElement);
    expect(getPicker()).toBeTruthy();

    fireEvent.click(toggleBtn as HTMLButtonElement);
    expect(getPicker()).toBeNull();
  });

  it('renders the list of years in the specified range', () => {
    const { container, getAllByTestId } = render(
      <DesktopDatePicker
        minDate={new Date('2000-01-01')}
        maxDate={new Date('2002-01-01')}
        value={null}
        toggleLabel="toggle-btn"
      />
    );

    fireEvent.click(findToggleButton(container) as HTMLButtonElement);

    const yearButtons = getAllByTestId('year-picker-item');
    expect(yearButtons.length).toBe(3);
    expect(yearButtons[0].textContent).toBe('2000');
    expect(yearButtons[1].textContent).toBe('2001');
    expect(yearButtons[2].textContent).toBe('2002');
  });

  it('renders MonthPicker with all monthes after the year item has been pressed', () => {
    const { container, queryByTestId, getAllByTestId } = render(
      <DesktopDatePicker toggleLabel="toggle-btn" />
    );

    fireEvent.click(findToggleButton(container) as HTMLButtonElement);

    const yearItems = getAllByTestId('year-picker-item');
    fireEvent.click(yearItems[0] as HTMLButtonElement);

    const picker = queryByTestId('month-picker');
    expect(picker).toBeTruthy();

    const monthItems = getAllByTestId('month-picker-item');
    expect(monthItems.length).toBe(12);
    expect(monthItems[0].textContent).toBe('January');
    expect(monthItems[1].textContent).toBe('February');
    expect(monthItems[2].textContent).toBe('March');
    expect(monthItems[3].textContent).toBe('April');
    expect(monthItems[4].textContent).toBe('May');
    expect(monthItems[5].textContent).toBe('June');
    expect(monthItems[6].textContent).toBe('July');
    expect(monthItems[7].textContent).toBe('August');
    expect(monthItems[8].textContent).toBe('September');
    expect(monthItems[9].textContent).toBe('October');
    expect(monthItems[10].textContent).toBe('November');
    expect(monthItems[11].textContent).toBe('December');
  });

  it('displays specified date in the text input', () => {
    render(
      <DesktopDatePicker
        value={new Date('2018-04-10')}
        toggleLabel="toggle-btn"
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('April 2018');
  });

  it('disables buttons with months later than specified', () => {
    const MAX_DATE = new Date('2018-05-01');

    const { container, getAllByTestId } = render(
      <DesktopDatePicker
        toggleLabel="toggle-btn"
        maxDate={MAX_DATE}
        value={MAX_DATE}
      />
    );

    fireEvent.click(findToggleButton(container) as HTMLButtonElement);

    const yearButtons = getAllByTestId('year-picker-item');
    const targetYearItem = yearButtons.find((it) => it.textContent === '2018');
    fireEvent.click(targetYearItem as HTMLButtonElement);

    const monthItems = getAllByTestId('month-picker-item');

    const findButton = (text: string) =>
      monthItems.find((it) => it.textContent === text) as HTMLButtonElement;

    expect(findButton('January').disabled).toBeFalsy();
    expect(findButton('February').disabled).toBeFalsy();
    expect(findButton('March').disabled).toBeFalsy();
    expect(findButton('April').disabled).toBeFalsy();
    expect(findButton('May').disabled).toBeFalsy();
    expect(findButton('June').disabled).toBeTruthy();
    expect(findButton('July').disabled).toBeTruthy();
    expect(findButton('August').disabled).toBeTruthy();
    expect(findButton('September').disabled).toBeTruthy();
    expect(findButton('October').disabled).toBeTruthy();
    expect(findButton('November').disabled).toBeTruthy();
    expect(findButton('December').disabled).toBeTruthy();
  });

  it('disables buttons with months earlier than specified', () => {
    const MIN_DATE = new Date('2018-05-01');

    const { container, getAllByTestId } = render(
      <DesktopDatePicker
        toggleLabel="toggle-btn"
        minDate={MIN_DATE}
        value={MIN_DATE}
      />
    );

    fireEvent.click(findToggleButton(container) as HTMLButtonElement);

    const yearButtons = getAllByTestId('year-picker-item');
    const targetYearItem = yearButtons.find((it) => it.textContent === '2018');
    fireEvent.click(targetYearItem as HTMLButtonElement);

    const monthItems = getAllByTestId('month-picker-item');

    const findButton = (text: string) =>
      monthItems.find((it) => it.textContent === text) as HTMLButtonElement;

    expect(findButton('January').disabled).toBeTruthy();
    expect(findButton('February').disabled).toBeTruthy();
    expect(findButton('March').disabled).toBeTruthy();
    expect(findButton('April').disabled).toBeTruthy();
    expect(findButton('May').disabled).toBeFalsy();
    expect(findButton('June').disabled).toBeFalsy();
    expect(findButton('July').disabled).toBeFalsy();
    expect(findButton('August').disabled).toBeFalsy();
    expect(findButton('September').disabled).toBeFalsy();
    expect(findButton('October').disabled).toBeFalsy();
    expect(findButton('November').disabled).toBeFalsy();
    expect(findButton('December').disabled).toBeFalsy();
  });

  it('invokes onChange callback with selected date', () => {
    const onChange = jest.fn(
      (date: Date | null) => `${date?.getFullYear()}-${date?.getMonth()}`
    );

    const { container, getAllByTestId } = render(
      <DesktopDatePicker toggleLabel="toggle-btn" onChange={onChange} />
    );

    fireEvent.click(findToggleButton(container) as HTMLButtonElement);

    const yearItems = getAllByTestId('year-picker-item');

    const targetYearBtn = yearItems.find(
      (yearBtn) => yearBtn.textContent === '2018'
    ) as HTMLButtonElement;

    fireEvent.click(targetYearBtn);

    const monthItems = getAllByTestId('month-picker-item');

    const targetMonthBtn = monthItems.find(
      (monthBtn) => monthBtn.textContent === 'April'
    ) as HTMLButtonElement;

    fireEvent.click(targetMonthBtn);

    expect(onChange).toHaveReturnedWith('2018-3');
  });
});
