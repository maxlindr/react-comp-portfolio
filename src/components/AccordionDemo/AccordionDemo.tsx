import { useState } from 'react';
import { Accordion } from '../Accordion';

export const AccordionDemo = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      expanded={expanded}
      onExpand={setExpanded}
      summary={expanded ? 'Не играй гармонь!' : 'Играй гармонь!'}
      details={
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        </div>
      }
    />
  );
};
