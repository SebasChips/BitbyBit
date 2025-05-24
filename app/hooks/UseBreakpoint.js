import { useWindowDimensions } from 'react-native';
import { breakpoints } from '../constants/ui/breakpoints';

const useBreakpoint = () => {
  const { width } = useWindowDimensions();

  if (width >= breakpoints.xlarge) return 'xlarge';
  if (width >= breakpoints.large) return 'large';
  if (width >= breakpoints.medium) return 'medium';
  return 'small';
};

export default useBreakpoint;
