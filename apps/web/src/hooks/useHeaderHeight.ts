'use client';

import { HEADER_HEIGHT } from '@/utils/constants/misc';
import { useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from './useMediaQuery';

const useHeaderHeight = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const resolvedHeaderHeight = useMemo(() => (isMobile ? HEADER_HEIGHT.MOBILE : HEADER_HEIGHT.DESKTOP), [isMobile]);
  const [headerHeight, setHeaderHeight] = useState(resolvedHeaderHeight);

  useEffect(() => {
    setHeaderHeight(resolvedHeaderHeight);
  }, [resolvedHeaderHeight]);

  return headerHeight;
};

export default useHeaderHeight;
