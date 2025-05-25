import { useWindowDimensions } from 'react-native';
import { breakpoints } from '../constants/theme';
import { useMemo } from 'react';

const getBreakpoint = (width) => {
  if (width >= breakpoints.xxlarge) return 'xxlarge';
  if (width >= breakpoints.xlarge) return 'xlarge';
  if (width >= breakpoints.large) return 'large';
  if (width >= breakpoints.medium) return 'medium';
  if (width >= breakpoints.small) return 'small';
  return 'xsmall';
};

const useBreakpoint = () => {
  const { width } = useWindowDimensions();

  const breakpoint = useMemo(() => {
    // Si width es 0, devolvemos null para evitar estilos incorrectos
    if (width === 0) return null;
    return getBreakpoint(width);
  }, [width]);

  return useMemo(() => {
    if (!breakpoint) return { breakpoint: null, width };

    return {
      breakpoint,
      isSmall: breakpoint === 'small' || breakpoint === 'xsmall',
      isMobile: breakpoint === 'small' || breakpoint === 'medium',
      isTablet: breakpoint === 'large',
      isDesktop: breakpoint === 'xlarge' || breakpoint === 'xxlarge',
      width,
    };
  }, [breakpoint, width]);
};

export default useBreakpoint;
