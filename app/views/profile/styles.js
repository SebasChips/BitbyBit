import { StyleSheet } from 'react-native';
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
} from '../../constants/theme';

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
});

export const buttonStyles = StyleSheet.create({
  primary: {
    width: dimensions.buttonWidth,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    alignItems: layout.alignCenter,
    ...shadows.md,
  },
  secondary: {
    width: dimensions.buttonWidth,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.transparent,
    borderRadius: radii.pill,
    alignItems: layout.alignCenter,
    ...shadows.sm,
  },
  danger: {
    width: dimensions.buttonWidth,
    paddingVertical: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: radii.pill,
    alignItems: layout.alignCenter,
    ...shadows.md,
  },
  ghost: {
    width: dimensions.buttonWidth,
    paddingVertical: spacing.sm,
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    alignItems: layout.alignCenter,
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
});

export const scrollStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
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
    textAlign: 'left',
  },
  footer: {
    flexDirection: layout.row,
    justifyContent: layout.justifyEnd,
    marginTop: spacing.lg,
  },
});