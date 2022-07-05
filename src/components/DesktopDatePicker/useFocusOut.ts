import { RefObject, useCallback, useEffect } from 'react';

export const useFocusOut = (
  ref: RefObject<HTMLElement | null>,
  onFocusOut: () => void,
  deps: unknown[] = []
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(onFocusOut, [...deps]);

  const handleFocusIn = useCallback(
    (evt) => {
      if (ref.current?.contains(evt.target)) {
        return;
      }

      callback();
    },
    [callback, ref]
  );

  useEffect(() => {
    window.document.body.addEventListener('focusin', handleFocusIn, false);

    return () => {
      window.document.body.removeEventListener('focusin', handleFocusIn, false);
    };
  }, [handleFocusIn]);
};
