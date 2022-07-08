import { FC, PropsWithChildren, ReactElement, useMemo } from 'react';
import styles from './AccordionSummary.module.scss';
import {
  AccordionSummaryIcon,
  AccordionSummaryIconProps,
} from './AccordionSummaryIcon';

export interface AccordionSummaryProps {
  onClick(): void;
  disabled?: boolean;
  expanded?: boolean;
  icon?: (props: AccordionSummaryIconProps) => ReactElement;
}

export const AccordionSummary: FC<PropsWithChildren<AccordionSummaryProps>> = ({
  children,
  expanded,
  disabled,
  onClick,
  icon,
}) => {
  const customIconProps = useMemo(
    (): AccordionSummaryIconProps => ({ disabled, expanded }),
    [disabled, expanded]
  );

  return (
    <button onClick={onClick} className={styles.root}>
      {children}
      <span className={styles.iconWrapper}>
        {icon ? (
          icon(customIconProps)
        ) : (
          <AccordionSummaryIcon expanded={expanded} disabled={disabled} />
        )}
      </span>
    </button>
  );
};
