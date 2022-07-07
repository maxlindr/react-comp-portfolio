import { RefObject, useCallback, useEffect, useState } from 'react';

export const useInputValue = (
  inputRef: RefObject<HTMLInputElement>,
  value: number,
  dirty: boolean
) => {
  const [inputValue, setInputValue] = useState<number | null>(value);

  useEffect(() => {
    if (dirty) {
      setInputValue(value);
    }
  }, [dirty, value]);

  const handleUnchangedFocus = useCallback(() => {
    setInputValue(null);
  }, []);

  useEffect(() => {
    inputRef.current?.addEventListener('focus', handleUnchangedFocus);
  }, [handleUnchangedFocus, inputRef]);

  useEffect(() => {
    if (dirty) {
      inputRef.current?.removeEventListener('focus', handleUnchangedFocus);
    }
  }, [handleUnchangedFocus, dirty, inputRef]);

  useEffect(() => {
    const input = inputRef.current;

    const handleBlur = () => {
      if (!dirty) {
        setInputValue(value);
      }
    };

    input?.addEventListener('blur', handleBlur);

    return () => {
      input?.removeEventListener('blur', handleBlur);
    };
  }, [dirty, inputRef, value]);

  return inputValue;
};
