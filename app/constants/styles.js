import { StyleSheet } from 'react-native';
import theme from './theme';

const getStyles = ({ isSmall, isMobile, isTablet, isDesktop }) => {
  return StyleSheet.create({
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
      paddingTop: isMobile ? theme.spacing.xl : theme.spacing.xl,
      width: isDesktop ? '100%' : isTablet ? '90%' : '90%',
      maxWidth: 700,
    },
    formContainer: {
      alignSelf: 'center',
      width: isDesktop ? '90%' : isTablet ? '90%' : '90%',
      padding: isMobile ? theme.spacing.sm : theme.spacing.ms,
    },
    formRow: {
      flexDirection: isDesktop ? "row" : "column",
      justifyContent: "space-between",
      gap: theme.spacing.lg,
      flexWrap: "wrap",
    },
    formSection: {
      flex: 1,
      padding: theme.spacing.sm,
      minWidth: isDesktop ? "45%" : "100%",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
    },

    sectionTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: isMobile ? theme.typography.fontSize.xl : theme.typography.fontSize.xxl,
      color: theme.colors.black,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
    },

    topicContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    topicButton: {
      backgroundColor: theme.colors.gray[200],
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radius.xl,
      margin: theme.spacing.xs,
    },
    topicButtonSelected: {
      backgroundColor: theme.colors.primary[500],
    },
    topicText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.black,
    },
    topicTextSelected: {
      color: theme.colors.white,
    },
    datePickerText: {
      fontSize: theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.gray[700],
      textAlign: 'center',
      padding: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.gray[300],
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.white,
      marginBottom: theme.spacing.md,
      width: isSmall ? '100%' : '70%',
      alignSelf: 'center',
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: isDesktop ? '90%' : isTablet ? '90%' : '90%',
      padding: isMobile ? theme.spacing.lg : theme.spacing.lg,
      backgroundColor: theme.colors.primary[600],
    },
    sectionContainer: {
      flex: 1,
      width: isDesktop ? '100%' : isTablet ? '100%' : '100%',
      backgroundColor: theme.colors.background.light,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      padding: theme.spacing.xl,
      alignSelf: 'center',
    },
    tabContainer: {
      flexDirection: 'row',
      width: isSmall ? '90%' : isMobile ? '60%' : isTablet ? '50%' : '40%',
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
      padding: theme.spacing.sm,
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

    mbSm: { marginBottom: theme.spacing.sm },
    mbMd: { marginBottom: theme.spacing.md },
    mbLg: { marginBottom: theme.spacing.lg },
    mtMd: { marginTop: theme.spacing.md },
    pxMd: { paddingHorizontal: theme.spacing.md },
    pyMd: { paddingVertical: theme.spacing.md },
  });
};

export default getStyles;
