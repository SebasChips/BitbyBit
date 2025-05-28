import { StyleSheet } from 'react-native';
import theme from './theme';
import {
    colors,
    spacing,
    fontSizes,
    fontWeights,
    radii,
    opacities,
    layout,
    dimensions,
    imageSizes,
    shadows,
    zIndices,
    lineHeights,
    fontFamilies,
} from './theme';

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
            alignSelf: 'center',
            width: isSmall ? '85%' : isMobile ? '90%' : isTablet ? '80%' : '50%',
            marginTop: isMobile ? theme.spacing.md : theme.spacing.lg,
            backgroundColor: theme.colors.background.dark,
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
            backgroundColor: theme.colors.secondary[200],
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
            alignItems: 'center',
            backgroundColor: theme.colors.primary[600],
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: theme.colors.primary[100],
            width: '100%',
        },
        footerButton: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        footerText: {
            color: '#fff',
            fontSize: 12,
            marginTop: 2,
        },
    });

};

export const baseStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        width: dimensions.fullWidth,
        backgroundColor: colors.background,
    },
    centerContent: {
        alignItems: layout.alignCenter,
        justifyContent: layout.justifyCenter,
    },
    alignStart: {
        alignItems: layout.alignStart,
    },
    alignEnd: {
        alignItems: layout.alignEnd,
    },
    row: {
        flexDirection: layout.row,
    },
    column: {
        flexDirection: layout.column,
    },
    roundedPill: {
        borderRadius: radii.pill,
    },
    rounded: {
        borderRadius: radii.md,
    },
    padded: {
        padding: spacing.md,
    },
    marginBottom: {
        marginBottom: spacing.md,
    },
    centerText: {
        textAlign: layout.alignCenter,
    },
    screenPadding: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    absoluteFill: {
        ...StyleSheet.absoluteFillObject,
    },
    hidden: {
        display: 'none',
    },
    centeredView: {
        flex: 1,
        justifyContent: layout.justifyCenter,
        alignItems: layout.alignCenter,
    },
});

export const textStyles = StyleSheet.create({
    heading: {
        fontSize: fontSizes.xxl,
        fontWeight: fontWeights.bold,
        fontFamily: fontFamilies.heading,
        lineHeight: fontSizes.xxl * lineHeights.normal,
        color: colors.text,
        textAlign: layout.alignCenter,
        marginBottom: spacing.lg,
    },
    subheading: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.semibold,
        fontFamily: fontFamilies.heading,
        lineHeight: fontSizes.lg * lineHeights.normal,
        color: colors.textSecondary,
        textAlign: layout.alignCenter,
        marginBottom: spacing.md,
    },
    body: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.regular,
        fontFamily: fontFamilies.body,
        lineHeight: fontSizes.md * lineHeights.normal,
        color: colors.text,
    },
    caption: {
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.regular,
        fontFamily: fontFamilies.body,
        lineHeight: fontSizes.xs * lineHeights.relaxed,
        color: colors.textMuted,
    },
    link: {
        color: colors.info,
        fontWeight: fontWeights.semibold,
        fontFamily: fontFamilies.primary,
        textAlign: layout.alignCenter,
        textDecorationLine: 'underline',
    },
    error: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.regular,
        fontFamily: fontFamilies.primary,
        color: colors.error,
    },
    buttonPrimary: {
        fontSize: fontSizes.md,
        color: colors.surface,
        fontWeight: fontWeights.semibold,
        fontFamily: fontFamilies.primary,
        textAlign: layout.alignCenter,
    },
    buttonSecondary: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: fontWeights.semibold,
        fontFamily: fontFamilies.primary,
        textAlign: layout.alignCenter,
    },
    label: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.medium,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        fontFamily: fontFamilies.body,
    },
    overline: {
        fontSize: fontSizes.xxs,
        textTransform: 'uppercase',
        color: colors.textMuted,
        fontWeight: fontWeights.medium,
        letterSpacing: 1,
    },
    muted: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
    },
});

export const formStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: layout.alignCenter,
        justifyContent: layout.justifyCenter,
        backgroundColor: colors.background,
    },
    input: {
        width: dimensions.inputWidth,
        marginVertical: spacing.sm,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        backgroundColor: colors.surface,
        fontFamily: fontFamilies.primary,
        fontSize: fontSizes.md,
        color: colors.text,
        ...shadows.sm,
    },
    inputFocused: {
        borderColor: colors.primary,
    },
    inputError: {
        borderColor: colors.error,
    },
    inputDisabled: {
        backgroundColor: colors.surface,
        opacity: opacities.disabled,
    },
    label: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.primary,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    formGroup: {
        width: dimensions.inputWidth,
        alignItems: layout.alignCenter,
        marginBottom: spacing.md,
    },
    inputIcon: {
        position: 'absolute',
        right: spacing.md,
        top: '50%',
        transform: [{ translateY: -spacing.sm }],
    },
    checkbox: {
        width: spacing.lg,
        height: spacing.lg,
        borderRadius: radii.sm,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: layout.alignCenter,
        justifyContent: layout.justifyCenter,
    },
    checkboxChecked: {
        backgroundColor: colors.success,
        borderColor: colors.success,
    },
});

export const buttonStyles = StyleSheet.create({
    base: {
        width: dimensions.buttonWidth,
        paddingVertical: spacing.sm,
        borderRadius: radii.pill,
        alignItems: layout.alignCenter,
        justifyContent: layout.justifyCenter,
    },
    primary: {
        backgroundColor: colors.primary,
        ...shadows.md,
    },
    secondary: {
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: colors.primary,
        ...shadows.sm,
    },
    danger: {
        backgroundColor: colors.error,
        ...shadows.md,
    },
    ghost: {
        backgroundColor: colors.transparent,
        borderColor: colors.transparent,
    },
    outline: {
        borderWidth: 2,
        borderColor: colors.primaryDark,
        backgroundColor: colors.transparent,
    },
    small: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
    },
    large: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    disabled: {
        opacity: opacities.disabled,
    },
    loading: {
        flexDirection: layout.row,
        justifyContent: layout.justifyCenter,
        alignItems: layout.alignCenter,
        gap: spacing.sm,
    },
    iconButton: {
        padding: spacing.sm,
        borderRadius: radii.full,
        backgroundColor: colors.primary,
        alignItems: layout.alignCenter,
        justifyContent: layout.justifyCenter,
    },
});

export const imageStyles = StyleSheet.create({
    avatarSmall: {
        width: imageSizes.sm,
        height: imageSizes.sm,
        borderRadius: radii.md,
        marginBottom: spacing.sm,
    },
    avatarMedium: {
        width: imageSizes.md,
        height: imageSizes.md,
        borderRadius: radii.md,
        marginBottom: spacing.md,
    },
    avatarLarge: {
        width: imageSizes.lg,
        height: imageSizes.lg,
        borderRadius: radii.lg,
        marginBottom: spacing.lg,
    },
    banner: {
        width: dimensions.fullWidth,
        height: imageSizes.xl,
        borderRadius: radii.lg,
        marginBottom: spacing.xl,
        ...shadows.lg,
    },
    thumbnail: {
        width: imageSizes.xs,
        height: imageSizes.xs,
        borderRadius: radii.sm,
    },
    icon: {
        width: spacing.lg,
        height: spacing.lg,
    },
    fullWidthImage: {
        width: dimensions.fullWidth,
        height: undefined,
        aspectRatio: 16 / 9,
    },
});

export const scrollStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
    },
    horizontalScroll: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,
    },
});

export const tagStyles = StyleSheet.create({
    container: {
        flexDirection: layout.row,
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    tag: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: radii.pill,
        borderWidth: 1,
        borderColor: colors.primary,
        marginRight: spacing.sm,
        marginBottom: spacing.sm,
    },
    tagError: {
        backgroundColor: colors.errorLight,
        borderColor: colors.error,
    },
    tagSuccess: {
        backgroundColor: colors.successLight,
        borderColor: colors.success,
    },
    tagInfo: {
        backgroundColor: colors.infoLight,
        borderColor: colors.info,
    },
    tagWarning: {
        backgroundColor: colors.warningLight,
        borderColor: colors.warning,
    },
    tagSelected: {
        backgroundColor: colors.primary,
    },
    text: {
        fontSize: fontSizes.sm,
        color: colors.primary,
        fontWeight: fontWeights.medium,
        fontFamily: fontFamilies.body,
    },
    textSelected: {
        color: colors.surface,
    },
});

export const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        padding: spacing.md,
        marginBottom: spacing.lg,
        ...shadows.md,
        zIndex: zIndices.base,
    },
    elevated: {
        ...shadows.lg,
        zIndex: zIndices.dropdown,
    },
    outlined: {
        borderWidth: 1,
        borderColor: colors.border,
    },
});

export const modalStyles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.overlay,
        opacity: 0.5,
        zIndex: zIndices.overlay,
    },
    modal: {
        backgroundColor: colors.background,
        borderRadius: radii.xl,
        padding: spacing.lg,
        marginHorizontal: spacing.md,
        ...shadows.lg,
        zIndex: zIndices.modal,
    },
    header: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.bold,
        fontFamily: fontFamilies.heading,
        lineHeight: fontSizes.lg * lineHeights.normal,
        color: colors.text,
        marginBottom: spacing.md,
        textAlign: layout.alignCenter,
    },
    body: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.regular,
        fontFamily: fontFamilies.body,
        lineHeight: fontSizes.md * lineHeights.normal,
        color: colors.textSecondary,
        textAlign: layout.alignStart,
    },
    footer: {
        flexDirection: layout.row,
        justifyContent: layout.justifyEnd,
        marginTop: spacing.lg,
    },
    fullScreenModal: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
    },
    centeredModal: {
        justifyContent: layout.justifyCenter,
        alignItems: layout.alignCenter,
        flex: 1,
    },
});

export default getStyles;
