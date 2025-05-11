'use client';

import { HEADER_HEIGHT } from '@/utils/constants/misc';
import { useEffect, useState } from 'react';

import { useMediaQuery } from './useMediaQuery';

const useHeaderHeight = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [headerHeight, setHeaderHeight] = useState(isMobile ? HEADER_HEIGHT.MOBILE : HEADER_HEIGHT.DESKTOP);

  useEffect(() => {
    setHeaderHeight(isMobile ? HEADER_HEIGHT.MOBILE : HEADER_HEIGHT.DESKTOP);
  }, [isMobile]);

  return headerHeight;
};

export default useHeaderHeight;
