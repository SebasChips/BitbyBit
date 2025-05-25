import { useWindowDimensions } from 'react-native';
import { breakpoints } from '../constants/theme';

const useBreakpoint = () => {
  const { width } = useWindowDimensions();

  let breakpoint = 'xsmall';

  if (width >= breakpoints.xxlarge) breakpoint = 'xxlarge';
  else if (width >= breakpoints.xlarge) breakpoint = 'xlarge';
  else if (width >= breakpoints.large) breakpoint = 'large';
  else if (width >= breakpoints.medium) breakpoint = 'medium';
  else if (width >= breakpoints.small) breakpoint = 'small';

  return {
    breakpoint,
    isSmall: breakpoint === 'small' || breakpoint === 'xsmall',
    isMobile: breakpoint === 'small' || breakpoint === 'medium',
    isTablet: breakpoint === 'large',
    isDesktop: breakpoint === 'xlarge' || breakpoint === 'xxlarge',
    width,
  };
};

export default useBreakpoint;
