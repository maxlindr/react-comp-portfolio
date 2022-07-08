export interface AccordionSummaryIconProps {
  expanded?: boolean;
  disabled?: boolean;
}

export const AccordionSummaryIcon = ({
  expanded,
  disabled,
}: AccordionSummaryIconProps) => {
  const fillColor = disabled ? '#aaa' : '#9e9e9e';

  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ExpandMoreIcon"
      style={{ transform: `rotate(${expanded ? 180 : 0}deg)` }}
    >
      <path
        d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
        fill={fillColor}
      ></path>
    </svg>
  );
};
