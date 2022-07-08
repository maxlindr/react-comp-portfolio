import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { AccordionSummary, AccordionSummaryProps } from './AccordionSummary';
import { Collapse } from '../Collapse';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

type Summary = ReactNode | ((props: AccordionSummaryProps) => ReactNode);

interface Props {
  className?: string;
  expanded?: boolean;
  summary: Summary;
  details: ReactNode;
  disabled?: boolean;
  transitionDuration?: number;
  onExpand?: (expanded: boolean) => void;
  onTransitionEnd?: () => void;
}

export const Accordion = ({
  className,
  expanded,
  summary,
  details,
  disabled,
  transitionDuration,
  onExpand = noop,
  onTransitionEnd = noop,
}: Props) => {
  const [detailsExpanded, setDetailsExpanded] = useState(Boolean(expanded));

  useEffect(() => {
    if (expanded != undefined) {
      setDetailsExpanded(expanded);
    }
  }, [expanded]);

  const handleSummaryClick = useCallback(() => {
    if (expanded == undefined) {
      setDetailsExpanded(!detailsExpanded);
    }

    onExpand(!detailsExpanded);
  }, [detailsExpanded, expanded, onExpand]);

  const summaryProps = useMemo(
    (): AccordionSummaryProps => ({
      onClick: handleSummaryClick,
      disabled,
      expanded: detailsExpanded,
    }),
    [detailsExpanded, disabled, handleSummaryClick]
  );

  return (
    <div className={className}>
      {typeof summary === 'function' ? (
        summary(summaryProps)
      ) : (
        <AccordionSummary
          disabled={disabled}
          expanded={expanded}
          onClick={handleSummaryClick}
        >
          {summary}
        </AccordionSummary>
      )}

      <Collapse
        expanded={detailsExpanded}
        onTransitionEnd={onTransitionEnd}
        transitionDuration={transitionDuration}
      >
        {details}
      </Collapse>
    </div>
  );
};
