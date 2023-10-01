import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback, useRef } from 'react';

// state
export const useNote = () => {
  return useSelector<RootState>(({ notes }) => notes);
};

// debounce
export const useDebounce = (func: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<number | undefined>();

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );
};
