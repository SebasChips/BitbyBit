export const breakpoints = {
  xsmall: 0,
  small: 320,
  medium: 375,
  mediumLarge: 540,
  large: 768,
  xlarge: 1024,
  xxlarge: 1280,
};

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  gray: {
    50: '#FDFDFD',
    100: '#F3F3F3',
    200: '#E0E0E0',
    300: '#C2C2C2',
    400: '#A3A3A3',
    500: '#858585',
    600: '#666666',
    700: '#4D4D4D',
    800: '#333333',
    900: '#1A1A1A',
  },
    primary: {
    100: '#D6E4FF',
    200: '#84A9FF',
    300: '#3366FF', 
    400: '#254EDB',
    500: '#1939B7',
    600: '#102693', 
  },
  secondary: {
    100: '#FFE2E0',
    200: '#FFB3A7',
    300: '#FF7B66', 
    400: '#FF5C3E',
    500: '#E84828',
    600: '#C13720', 
  },
  status: {
  success: '#6DFF88',  //59ff00
  warning: '#FFE066',  //fff300
  error:   '#FF6B6B',  //ff1700
  info:    '#4DABF7',  //6e2c00
},
  background: {
    light: '#FFFDF9',    
    dark: '#1E1E1E',
    overlay: 'rgba(0, 0, 0, 0.3)',
  },

  primary: '#3B82F6',             // Azul brillante (acción principal)
  primaryDark: '#1E3A8A',         // Azul oscuro (hover o estados activos)
  secondary: '#FACC15',           // Amarillo vibrante (elementos llamativos para niños)
  secondaryDark: '#D97706',       // Ámbar oscuro
  background: '#FFFBEA',          // Fondo claro cálido y amigable
  surface: '#FFFFFF',             // Superficies limpias
  border: '#E5E7EB',              // Bordes sutiles
  text: '#1F2937',                // Texto principal
  textSecondary: '#6B7280',       // Texto secundario
  textMuted: '#9CA3AF',           // Texto deshabilitado o muy secundario
  placeholder: '#9CA3AF',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  success: '#10B981',
  successLight: '#DCFCE7',
  info: '#0EA5E9',
  infoLight: '#E0F2FE',
  warning: '#F97316',
  warningLight: '#FFEDD5',
  overlay: 'rgba(0, 0, 0, 0.6)',
  transparent: 'transparent',
};

export const buttonVariants = {
  primary: {
    backgroundColor: colors.primary[400],
    textColor: colors.white,
  },
  secondary: {
    backgroundColor: colors.secondary[300],
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
    textColor: colors.primary[400],
    borderColor: colors.primary[400],
  },
};

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  pill: 50,
  circular: 9999,
};

export const shadows = {
  none: {},
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
  xxxxl: 100,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 30,
    xxl: 36,
    huge: 50,
  },
  lineHeight: {
    sm: 18,
    md: 22,
    lg: 26,
    xl: 32,
    xxl: 40,
    huge: 48,
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
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
};

export const elementSizes = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  xxl: 96,
};

export const fontSizes = {
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 30,
  xxxl: 36,
};

export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

export const fontFamilies = {
  primary: 'System',
  heading: 'System',
  body: 'System',
  monospace: 'Courier',
};

export const transitionDurations = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const layout = {
  alignCenter: 'center',
  alignStart: 'flex-start',
  alignEnd: 'flex-end',
  justifyCenter: 'center',
  justifyStart: 'flex-start',
  justifyEnd: 'flex-end',
  row: 'row',
  column: 'column',
};

export const imageSizes = {
  xxs: 20,
  xs: 40,
  sm: 60,
  md: 90,
  lg: 120,
  xl: 180,
  xxl: 240,
};

export const radii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  pill: 9999,
};

export const zIndices = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  tooltip: 30,
  toast: 50,
  modal: 100,
  overlay: 200,
  highest: 999,
};

export const opacities = {
  transparent: 0,
  disabled: 0.5,
  visible: 1,
};

export const dimensions = {
  buttonWidth: '60%',
  inputWidth: '80%',
  quarterWidth: '25%',
  thirdWidth: '33.33%',
  halfWidth: '50%',
  fullWidth: '100%',
};

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
