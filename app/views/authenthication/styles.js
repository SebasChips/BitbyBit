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
  centerText: {
    textAlign: layout.alignCenter,
  },
  centerItem: {
    alignItems: layout.alignCenter,
    justifyContent: layout.alignCenter,
  },
  roundedPill: {
    borderRadius: radii.pill,
  },
  paddedButton: {
    paddingVertical: spacing.sm,
  },
});

export const textStyles = StyleSheet.create({
  heading: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies.heading,
    lineHeight: lineHeights.heading,
    color: colors.textPrimary,
    textAlign: layout.alignCenter,
    marginBottom: spacing.lg,
  },
  subheading: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.heading,
    lineHeight: lineHeights.subheading,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.subtitle,
    color: colors.textSecondary,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.body,
    color: colors.textPrimary,
  },
  link: {
    color: colors.interactive,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.body,
    textAlign: layout.alignCenter,
    textDecorationLine: 'underline',
  },
  buttonPrimary: {
    fontSize: fontSizes.md,
    color: colors.background,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.button,
    lineHeight: lineHeights.button,
    textAlign: layout.alignCenter,
  },
  buttonSecondary: {
    fontSize: fontSizes.md,
    color: colors.primary,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.button,
    lineHeight: lineHeights.button,
    textAlign: layout.alignCenter,
  },
  buttonText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.button,
    lineHeight: lineHeights.button,
    textAlign: layout.alignCenter,
  },
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.caption,
    color: colors.textMuted,
  },
  muted: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.muted,
    color: colors.textMuted,
  },
  error: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.error,
    color: colors.error,
  },
  datePickerText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.body,
    color: colors.textPrimary,
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: layout.alignCenter,
    alignItems: layout.alignCenter,
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
    ...shadows.sm,
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.body,
    color: colors.textPrimary,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    backgroundColor: colors.surfaceDark,
    opacity: opacities.disabled,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  formGroup: {
    width: dimensions.inputWidth,
    alignItems: layout.alignCenter,
    justifyContent: layout.alignCenter,
  },
  socialLoginRow: {
    flexDirection: layout.row,
    justifyContent: layout.alignCenter,
    marginTop: spacing.md,
  },
  dividerText: {
    textAlign: layout.alignCenter,
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.dividerText,
  },
  dateInputWeb: {
    width: dimensions.inputWidth,
    marginVertical: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.body,
    color: colors.textPrimary,
    fontWeight: fontWeights.regular,
    ...shadows.sm,
  },
  datePickerButton: {
    width: dimensions.inputWidth,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    flexDirection: layout.row,
    alignItems: layout.alignCenter,
    justifyContent: layout.justifySpaceBetween,
    ...shadows.sm,
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
    borderRadius: radii.pill,
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
    borderColor: 'transparent',
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
    flexWrap: layout.wrap,
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
    lineHeight: lineHeights.tagText,
  },
  textSelected: {
    color: colors.background,
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
    backgroundColor: colors.textPrimary,
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
    lineHeight: lineHeights.heading,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    fontFamily: fontFamilies.body,
    lineHeight: lineHeights.body,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: layout.row,
    justifyContent: layout.justifyEnd,
    marginTop: spacing.lg,
  },
});