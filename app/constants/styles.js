import { View, Text, StyleSheet } from 'react-native';
import theme from './theme';

const getStyles = ({ isSmall, isMobile, isTablet, isDesktop }) => {
    return StyleSheet.create({
        //Default
        screen: { flex: 1 },
        container: { flex: 1, backgroundColor: theme.colors.background.dark, },
        scrollContent: { flexGrow: 1, justifyContent: "flex-start", },
        box: { flex: 1, justifyContent: 'center', width: '100%', },
        //Contenedores backgroundColor: theme.colors.background.light,
        topContainer: {
            flex: isSmall ? 0.4 : isMobile ? 0.5 : isTablet ? 0.5 : 0.7,
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
        topicContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: theme.spacing.sm,
            width: isSmall ? '65%' : isMobile ? '75%' : isTablet ? '60%' : '70%',
            alignSelf: 'center',
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
        card:
        {
            justifyContent: 'space-around',
            width: '100%',
            backgroundColor: theme.colors.background.dark,
            borderBottomStartRadius: theme.radius.circular,
            borderBottomEndRadius: theme.radius.circular,
            padding: theme.spacing.md,
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
        subTitle: {
            fontSize: isSmall
                ? theme.typography.fontSize.sm
                : isMobile
                    ? theme.typography.fontSize.md
                    : isTablet
                        ? theme.typography.fontSize.lg
                        : theme.typography.fontSize.xl,
            color: theme.colors.white,
            textAlign: 'center',
            padding: theme.spacing.sm,
        },
        text: {
            fontSize: isSmall ? theme.typography.fontSize.xs
                : isMobile ? theme.typography.fontSize.sm
                    : theme.typography.fontSize.md,
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
            marginBottom: theme.spacing.md,
        },
        //<------------------------------------------------>
        //inputs
        input: {
            width: isSmall ? '80%' : isMobile ? '80%' : isTablet ? '70%' : '60%',
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: theme.colors.gray[400],
            borderRadius: theme.radius.xl,
            paddingVertical: isSmall ? theme.spacing.sm : isMobile ? theme.spacing.md : theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            fontSize: isSmall ? theme.typography.fontSize.xs : isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.sm,
            color: theme.colors.black,
            marginBottom: theme.spacing.md,
        },
        //<------------------------------------------------>
        //botones
        button: {
            width: isSmall ? '80%' : isMobile ? '80%' : isTablet ? '50%' : '30%',
            alignSelf: 'center',
            paddingVertical: isSmall ? theme.spacing.sm : isMobile ? theme.spacing.md : theme.spacing.sm,
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
        buttonDanger: {
            backgroundColor: theme.buttonVariants.danger.backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: isSmall ? '50%' : isMobile ? '50%' : isTablet ? '40%' : '30%',
            paddingHorizontal: theme.spacing.md,
            marginHorizontal: theme.spacing.md,
        },
        buttonDisabled: {
            backgroundColor: theme.buttonVariants.disabled.backgroundColor,
        },
        buttonText: {
            fontSize: isSmall ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            color: theme.buttonVariants.primary.textColor,
        },
        buttonTab: {
            backgroundColor: theme.buttonVariants.disabled.backgroundColor,
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: isSmall
                ? 25
                : isMobile
                    ? 40
                    : 45,
            borderRadius: theme.radius.pill,
            paddingHorizontal: theme.spacing.md,
        },
        buttonTabSelected: {
            backgroundColor: theme.colors.primary[400], // o cualquier otro color que indique selección
        },
        selectedText: {
            color: theme.colors.white,
            fontWeight: 'bold',
        },
        unselectedText: {
            color: theme.colors.black,
        },
        buttonstats: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: isSmall
                ? 25
                : isMobile
                    ? 40
                    : 45,
            borderRadius: theme.radius.pill,
            paddingHorizontal: theme.spacing.md,
        },
        //<------------------------------------------------>
        //imagenes
        googleIcon: {
            width: isSmall
                ? 20
                : isMobile
                    ? 30
                    : 50,
            height: isSmall
                ? 20
                : isMobile
                    ? 30
                    : 40,
            resizeMode: 'contain',
        },

        loginImage: {
            width: isSmall
                ? 70
                : isMobile
                    ? 110
                    : isTablet
                        ? 130
                        : 150,
            height: isSmall
                ? 70
                : isMobile
                    ? 110
                    : isTablet
                        ? 130
                        : 150,
            resizeMode: 'contain',
            alignSelf: 'center',
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
            paddingVertical: isSmall ? theme.spacing.xs : theme.spacing.sm,
            //fontSize: isSmall ? theme.typography.fontSize.xs : isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.xl,
            alignItems: 'center',
            borderRadius: theme.radius.pill,
        },
        tabActive: {
            backgroundColor: theme.colors.white,
        },
        tabText: {
            color: theme.colors.gray[500],
        },
        tabTextActive: {
            color: theme.colors.primary[600],
        },
        //<------------------------------------------------>
        //separacion
        divider: {
            height: 1,
            width: '95%',
            backgroundColor: theme.colors.gray[300], // o theme.colors.border.light si tenés definido
            marginVertical: 12,
            alignSelf: 'center',
        },
        //<------------------------------------------------>
        //foooter
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'center',
            backgroundColor: theme.colors.background.dark,
            borderRadius: theme.radius.circular,
            padding: theme.spacing.md,
            margin: theme.spacing.md,
            width: isSmall ? '85%' : isMobile ? '90%' : isTablet ? '80%' : '40%',
        },
        footerButton: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        footerText: {
            color: theme.colors.white,
            fontSize: 12,
            marginTop: 2,
        },
        container2: {
            flexDirection: 'row',
            alignItems: 'center',
            width: isSmall ? '80%' : isMobile ? '80%' : isTablet ? '70%' : '50%',
            alignSelf: 'center',
            marginVertical: theme.spacing.md,
        },
        line: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.gray[300],
        },
        label: {
            marginHorizontal: theme.spacing.sm,
            fontSize: isSmall
                ? theme.typography.fontSize.xs
                : isMobile
                    ? theme.typography.fontSize.sm
                    : isTablet
                        ? theme.typography.fontSize.md
                        : theme.typography.fontSize.md, 
            color: theme.colors.gray[500],
            fontWeight: 'bold',
        },
    });

};




export default getStyles;
