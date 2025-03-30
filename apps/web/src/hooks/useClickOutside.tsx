import { RefObject, useCallback, useEffect, useRef } from 'react';

type UseClickOutsideCallback = (event: MouseEvent) => void;

export const useClickOutside = <T extends HTMLElement>(callback: UseClickOutsideCallback): RefObject<T> => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};
