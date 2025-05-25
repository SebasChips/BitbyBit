import { StyleSheet } from 'react-native';
import theme from './theme';

const getStyles = (breakpoint) => {
  const isSmall = breakpoint === 'xsmall' || breakpoint === 'small';
  const isMedium = breakpoint === 'medium';
  const isTablet = breakpoint === 'large';
  const isDesktop = breakpoint === 'xlarge' || breakpoint === 'xxlarge';

  return StyleSheet.create({
    // ===== Layout =====
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: isSmall ? theme.spacing.md : theme.spacing.xl,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    authContainer: {
      width: '100%',
      maxWidth: isTablet || isDesktop ? 500 : '100%',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.white,
      borderRadius: theme.radius.lg,
      ...theme.shadows.md,
    },
    formContainer: {
      width: '100%',
      maxWidth: 500,
      alignSelf: 'center',
    },

    column: {
      flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    // ===== Typography =====
    title: {
      fontSize: isSmall ? theme.typography.fontSize.lg : theme.typography.fontSize.xl,
      fontFamily: theme.typography.fontFamily.bold,
      color: theme.colors.black,
      textAlign: 'center',
    },
    text: {
      fontSize: theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.gray[700],
      textAlign: 'center',
    },
    caption: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.gray[500],
      textAlign: 'center',
    },

    // ===== Inputs =====
    input: {
      width: isSmall ? '100%' : isMedium ? '90%' : '80%',
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray[300],
      borderRadius: theme.radius.md,
      paddingVertical: isSmall ? theme.spacing.sm : isMedium ? theme.spacing.md : theme.spacing.lg,
      paddingHorizontal: isSmall ? theme.spacing.sm : theme.spacing.md,
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: isSmall ? theme.typography.fontSize.md : theme.typography.fontSize.lg,
      color: theme.colors.black,
      backgroundColor: theme.colors.white,
      marginBottom: theme.spacing.md,
    },
    inputError: {
      borderColor: theme.colors.status.error,
    },

    // ===== Buttons =====
    button: {
      width: isSmall ? '100%' : isMedium ? '90%' : '80%',
      alignSelf: 'center',
      paddingVertical: isSmall ? theme.spacing.md : theme.spacing.lg,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonPrimary: {
      backgroundColor: theme.buttonVariants.primary.backgroundColor,
    },
    buttonSecondary: {
      backgroundColor: theme.buttonVariants.secondary.backgroundColor,
      flexDirection: 'row',
      gap: 8,
    },
    buttonDisabled: {
      backgroundColor: theme.buttonVariants.disabled.backgroundColor,
    },
    buttonText: {
      fontSize: isSmall ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.medium,
      color: theme.buttonVariants.primary.textColor,
    },

    // ===== Google Icon =====
    googleIcon: {
      width: isSmall ? 32 : isMedium ? 40 : 48,
      height: isSmall ? 32 : isMedium ? 40 : 48,
      resizeMode: 'contain',
      marginRight: theme.spacing.sm,
    },
    loginImage: {
      width: isSmall ? 80 : isMedium ? 120 : 160,
      height: isSmall ? 80 : isMedium ? 120 : 160,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginBottom: theme.spacing.lg,
    },

    // ===== Spacing =====
    mbSm: { marginBottom: theme.spacing.sm },
    mbMd: { marginBottom: theme.spacing.md },
    mbLg: { marginBottom: theme.spacing.lg },
    mtMd: { marginTop: theme.spacing.md },
    pxMd: { paddingHorizontal: theme.spacing.md },
    pyMd: { paddingVertical: theme.spacing.md },
  });
};

export default getStyles;
