import { StyleSheet } from 'react-native';
import theme from './theme';

const getStyles = ({ isSmall, isMobile, isTablet, isDesktop }) => {
  return StyleSheet.create({
    // ===== Layout =====
    screen: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.dark,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "flex-start",
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      padding: isMobile ? theme.spacing.md : theme.spacing.sm,
      width: isDesktop ? '100%' : isTablet ? '90%' : '90%',
      backgroundColor: theme.colors.status.error,
      maxWidth: 700,
    },
    formContainer: {
      alignSelf: 'center',
      width: isDesktop ? '90%' : isTablet ? '90%' : '90%',
      padding: isMobile ? theme.spacing.sm : theme.spacing.ms,
      backgroundColor: theme.colors.status.warning,
    },
    buttonContainer: {
      flexDirection: 'row', // Esto coloca los elementos en fila (horizontal)
      justifyContent: 'center', // Centra los elementos horizontalmente
      alignItems: 'center', // Centra los elementos verticalmente
      alignSelf: 'center',
      width: isDesktop ? '90%' : isTablet ? '90%' : '90%',
      padding: isMobile ? theme.spacing.lg : theme.spacing.lg,
      backgroundColor: theme.colors.primary[600],
    },
    sectionContainer: {
      flex: 1,
      width: isDesktop ? '100%' : isTablet ? '95%' : '100%',
      backgroundColor: theme.colors.background.light,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.lg,
      alignSelf: 'center',

    },
    tabContainer: {
      flexDirection: 'row',
      width: isSmall ? '90%' : isMobile ? '50%' : isTablet ? '40%' : '30%',
      backgroundColor: theme.colors.gray[200],
      borderRadius: theme.radius.xl,
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.lg,
      alignSelf: 'center',
    },
    tab: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      alignItems: 'center',
      borderRadius: theme.radius.xl,
    },
    tabActive: {
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    tabText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.gray[500],
    },
    tabTextActive: {
      color: theme.colors.black,
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
      fontSize: isSmall ? theme.typography.fontSize.xs
        : isMobile ? theme.typography.fontSize.sm
          : theme.typography.fontSize.md,
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
      borderRadius: theme.radius.lg,
      paddingVertical: isSmall ? theme.spacing.sm : theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: isSmall ? theme.typography.fontSize.xs : isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
      color: theme.colors.black,
      backgroundColor: theme.colors.white,
      marginBottom: theme.spacing.md,
    },
    inputError: {
      borderColor: theme.colors.status.error,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    inputIcon: {
      marginRight: 8,
    },
    inputIconRight: {
      marginLeft: "auto",
      padding: 8,
    },
    input: {
      flex: 1,
      height: 48,
      fontSize: 16,
      color: "#333",
    },


    // ===== Buttons =====
    button: {
      width: isSmall ? '90%' : isMobile ? '50%' : isTablet ? '40%' : '30%',
      alignSelf: 'center',
      paddingVertical: isSmall ? theme.spacing.sm : theme.spacing.md,
      borderRadius: theme.radius.xl,
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
      marginHorizontal: theme.spacing.md,
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
    googleIcon: {
      height: isSmall ? 40 : isMobile ? 40 : 50,
      resizeMode: 'contain',
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
