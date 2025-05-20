export const colors = {
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

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,
  giant: 72,
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

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 8,
  },
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