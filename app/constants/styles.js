import { StyleSheet } from 'react-native';
import theme from './theme';

const getStyles = ({ isSmall, isMobile, isTablet, isDesktop }) => {
  return StyleSheet.create({
    //Default
    screen: { flex: 1 },
    container: { flex: 1, backgroundColor: theme.colors.background.dark, },
    scrollContent: { flexGrow: 1, justifyContent: "flex-start", },
    card: { alignSelf: 'center', backgroundColor: theme.colors.status.dark, },
    box: { flex: 1, justifyContent: 'center', width: '100%', },
    //Contenedores backgroundColor: theme.colors.background.light,
    topContainer: {
      flex: isSmall ? 0.4 : isMobile ? 0.5 : isTablet ? 0.6 : 0.7,
      justifyContent: 'center',
      width: '100%',
    },
    sectionContainer: {
      flex: 1,
      //justifyContent: 'space-between',
      width: '100%',
      backgroundColor: theme.colors.background.light,
      borderTopLeftRadius: theme.radius.pill,
      borderTopRightRadius: theme.radius.pill,
      paddingTop: theme.spacing.md,
    },
    tabContainer: { //contenedor de pestanas
      flexDirection: 'row',
      width: isSmall ? '85%' : isMobile ? '90%' : isTablet ? '80%' : '50%',
      backgroundColor: theme.colors.gray[200],
      borderRadius: theme.radius.pill,
      padding: theme.spacing.sm,
      alignSelf: 'center',
    },
    formContainer: {
      alignSelf: 'center',
      width: '100%',
      //paddingTop : isSmall ? theme.spacing.sm : isMobile ? theme.spacing.xxxxl : theme.spacing.lg,
      padding: isSmall ? theme.spacing.sm : isMobile ? theme.spacing.md : theme.spacing.lg,
    },
    googleContainer: {
      justifyContent: 'center',
      backgroundColor: theme.colors.background.light,
      paddingTop: isSmall ? theme.spacing.lg : isMobile ? theme.spacing.xl : theme.spacing.xxl,
    },
    //
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: isDesktop ? '90%' : isTablet ? '90%' : '90%',
      padding: isMobile ? theme.spacing.lg : theme.spacing.lg,
      backgroundColor: theme.colors.primary[600],
    },
    topicContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    //<------------------------------------------------>
    //textos
    title: {
      fontSize: isSmall
        ? theme.typography.fontSize.lg
        : isMobile
          ? theme.typography.fontSize.xl
          : isTablet
            ? theme.typography.fontSize.xxl
            : theme.typography.fontSize.huge,
      color: theme.colors.white,
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
      color: theme.colors.gray[700],
      textAlign: 'center',
    },
    caption: {
      fontSize: isSmall ? theme.typography.fontSize.xs
        : isMobile ? theme.typography.fontSize.sm
          : theme.typography.fontSize.md,
      lineHeight: theme.typography.lineHeight.sm,
      color: theme.colors.gray[500],
      textAlign: 'center',
    },
    //<------------------------------------------------>
    //inputs
    input: {
      width: isSmall ? '80%' : isMobile ? '80%' : isTablet ? '70%' : '60%',
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray[400],
      borderRadius: theme.radius.xl,
      paddingVertical: isSmall ? theme.spacing.sm : isMobile ? theme.spacing.md : theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
      fontSize: isSmall ? theme.typography.fontSize.xs : isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
      color: theme.colors.black,
      marginBottom: theme.spacing.md,
    },
    //<------------------------------------------------>
    //botones
    button: {
      width: isSmall ? '50%' : isMobile ? '50%' : isTablet ? '40%' : '30%',
      alignSelf: 'center',
      paddingVertical: isSmall ? theme.spacing.sm : theme.spacing.md,
      borderRadius: theme.radius.pill,
      alignItems: 'center',
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
      fontSize: isSmall ? theme.typography.fontSize.xs : isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
      color: theme.buttonVariants.primary.textColor,
    },
    //<------------------------------------------------>
    //imagenes
    googleIcon: {
      height: isSmall ? 40 : isMobile ? 50 : 60,
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
    //<------------------------------------------------>
    //tab
    tab: {
      flex: 1,
      paddingVertical: isSmall ? theme.spacing.xs : isMobile ? theme.spacing.sm : theme.spacing.md,
      //fontSize: isSmall ? theme.typography.fontSize.xs : isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.xl,
      alignItems: 'center',
      borderRadius: theme.radius.pill,
    },
    tabActive: {
      backgroundColor: theme.colors.white,
    },
    tabText: {
      color: theme.colors.gray[500],
      fontSize: isSmall ? theme.typography.fontSize.xs : isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
    },
    tabTextActive: {
      color: theme.colors.primary[600],
    },
    ///Form
    formRow: {
      flexDirection: isDesktop ? "row" : "column",
      justifyContent: "space-between",
      gap: theme.spacing.lg,
      flexWrap: "wrap",
      padding: isMobile ? theme.spacing.sm : theme.spacing.md,
    },
    formSection: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
      padding: isMobile ? theme.spacing.sm : theme.spacing.md,
      width: isDesktop ? '40%' : isTablet ? '90%' : '90%',
      backgroundColor: theme.colors.white,
      borderRadius: theme.radius.md,
    },
    sectionTitle: {
      fontSize: isMobile ? theme.typography.fontSize.xl : theme.typography.fontSize.xxl,
      color: theme.colors.gray[700],
      marginBottom: theme.spacing.md,
      textAlign: 'center',
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
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.black,
    },
    topicTextSelected: {
      color: theme.colors.white,
    },
    datePickerText: {
      fontSize: theme.typography.fontSize.md,
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
  });
};

export default getStyles;
