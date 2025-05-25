// Breakpoints
export const breakpoints = {
  xsmall: 0,
  small: 320,
  medium: 375,
  mediumLarge: 540,
  large: 768,
  xlarge: 1024,
  xxlarge: 1280,
};

// Colores
export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  gray: {
    50: '#FAFAFA',
    100: '#F7F7F7',
    200: '#E0E0E0',
    300: '#BDBDBD',
    400: '#9E9E9E',
    500: '#757575',
    600: '#616161',
    700: '#424242',
    800: '#212121',
    900: '#121212',
  },
  primary: {
    lightest: '#E1F5FE',
    lighter: '#B3E5FC',
    light: '#81D4FA',
    main: '#29B6F6',
    dark: '#0288D1',
    darkest: '#01579B',
  },
  secondary: {
    lightest: '#FFEBEE',
    lighter: '#FFCDD2',
    light: '#EF9A9A',
    main: '#E57373',
    dark: '#D32F2F',
    darkest: '#B71C1C',
  },
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  background: '#FAFAFA',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

// Botones
export const buttonVariants = {
  primary: {
    backgroundColor: colors.primary.main,
    textColor: colors.white,
  },
  secondary: {
    backgroundColor: colors.secondary.light,
    textColor: colors.black,
  },
  danger: {
    backgroundColor: colors.status.error,
    textColor: colors.white,
  },
  success: {
    backgroundColor: colors.status.success,
    textColor: colors.white,
  },
  warning: {
    backgroundColor: colors.status.warning,
    textColor: colors.black,
  },
  disabled: {
    backgroundColor: colors.gray[200],
    textColor: colors.gray[400],
  },
  outline: {
    backgroundColor: colors.transparent,
    textColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
};

// Radio de bordes
export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  pill: 999,
  circular: 9999,
};

// Sombras
export const shadows = {
  none: {},
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
};

// Espaciado
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 64,
};

// Tipografía
export const typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  fontSize: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    huge: 40,
  },
  lineHeight: {
    xs: 16,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 32,
    xxl: 40,
    huge: 48,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

export const opacity = {
  disabled: 0.4,
  hover: 0.8,
  active: 0.6,
  full: 1,
};

export const borders = {
  none: 0,
  thin: 1,
  thick: 2,
  heavy: 4,
};

export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
};

export const elementSizes = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  xxl: 96,
};

// Tema unificado
const theme = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  buttonVariants,
  breakpoints,
};

export default theme;
