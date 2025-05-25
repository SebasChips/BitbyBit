import { StyleSheet } from 'react-native';
import theme from './theme';

const getStyles = ({ isSmall, isMobile, isTablet, isDesktop }) => {
  return StyleSheet.create({
    // ===== Layout =====
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background.dark,
      padding: isSmall ? theme.spacing.md : theme.spacing.xl,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.status.success,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      padding: isMobile ? theme.spacing.lg : theme.spacing.lg,
      width: isDesktop ? '100%' : isTablet ? '90%' : '90%',
      backgroundColor: theme.colors.status.error,
      maxWidth: 700,
    },
    formContainer: {
      alignSelf: 'center',
      width: isDesktop ? '90%' : isTablet ? '90%' : '90%',
      padding: isMobile ? theme.spacing.lg : theme.spacing.lg,
      backgroundColor: theme.colors.status.warning,
    },

    // ===== Typography =====
    title: {
      fontSize: isSmall
        ? theme.typography.fontSize.lg
        : isMobile
          ? theme.typography.fontSize.xl
          : isTablet
            ? theme.typography.fontSize.xxl
            : theme.typography.fontSize.huge,
      lineHeight: theme.typography.lineHeight.huge,
      fontFamily: theme.typography.fontFamily.bold,
      color: theme.colors.black,
      textAlign: 'center',
    },
    text: {
      fontSize: isSmall
        ? theme.typography.fontSize.sm
        : isTablet
          ? theme.typography.fontSize.md
          : theme.typography.fontSize.lg,
      lineHeight: theme.typography.lineHeight.lg,
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.gray[700],
      textAlign: 'center',
    },
    caption: {
      fontSize: isSmall
        ? theme.typography.fontSize.xs
        : theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.sm,
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.gray[500],
      textAlign: 'center',
    },

    // ===== Inputs =====
    input: {
      width: isSmall ? '100%' : isMobile ? '90%' : isTablet ? '80%' : '70%',
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray[300],
      borderRadius: theme.radius.md,
      paddingVertical: isSmall ? theme.spacing.sm : theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
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
      width: isSmall ? '90%' : isMobile ? '50%' : isTablet ? '40%' : '30%',
      alignSelf: 'center',
      paddingVertical: isSmall ? theme.spacing.sm : theme.spacing.md,
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.md,
    },
    buttonPrimary: {
      backgroundColor: theme.buttonVariants.primary.backgroundColor,
    },
    buttonSecondary: {
      backgroundColor: theme.buttonVariants.secondary.backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.md,
    },
    buttonDisabled: {
      backgroundColor: theme.buttonVariants.disabled.backgroundColor,
    },
    buttonText: {
      fontSize: isSmall ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.md,
      letterSpacing: theme.typography.letterSpacing.wide,
      fontFamily: theme.typography.fontFamily.medium,
      color: theme.buttonVariants.primary.textColor,
    },

    // ===== Icono e imagen =====
    // ===== Iconos e Imágenes =====
    googleIcon: {
      height: isSmall ? 40 : isMobile ? 40 : 50,
      resizeMode: 'contain',
      marginRight: theme.spacing.sm,
    },

    loginImage: {
      width: isSmall
        ? 100
        : isMobile
          ? 140
          : isTablet
            ? 180
            : 200,
      height: isSmall
        ? 100
        : isMobile
          ? 140
          : isTablet
            ? 180
            : 200,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginBottom: theme.spacing.lg,
    },

    image: {
      width: isSmall
        ? '80%'
        : isMobile
          ? '70%'
          : isTablet
            ? '60%'
            : '50%',
      maxWidth: 400,
      height: 'auto',
      aspectRatio: 1,
      alignSelf: 'center',
      resizeMode: 'contain',
      marginBottom: theme.spacing.md,
    },


    // ===== Spacing Helpers =====
    mbSm: { marginBottom: theme.spacing.sm },
    mbMd: { marginBottom: theme.spacing.md },
    mbLg: { marginBottom: theme.spacing.lg },
    mtMd: { marginTop: theme.spacing.md },
    pxMd: { paddingHorizontal: theme.spacing.md },
    pyMd: { paddingVertical: theme.spacing.md },
  });
};

export default getStyles;
