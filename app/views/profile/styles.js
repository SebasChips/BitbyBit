import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fontWeights,  radii, opacities, layout , dimensions, imageSizes } from '../../constants/theme';

export const textStyles = StyleSheet.create({
  heading: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subheading: {
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  link: {
    color: colors.primary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  buttonPrimary: {
    fontSize: fontSizes.md,
    color: colors.background,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  buttonSecondary: {
    fontSize: fontSizes.md,
    color: colors.primary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: layout.alignCenter,
    alignItems: layout.alignCenter,
  },
  input: {
    width: dimensions.inputWidth,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
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
  },
});

export const buttonStyles = StyleSheet.create({
  primary: {
    width: dimensions.buttonWidth,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    alignItems: layout.alignCenter,
  },
  secondary: {
    width: dimensions.buttonWidth,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radii.pill,
    backgroundColor: 'transparent',
    alignItems: layout.alignCenter,
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
    flexDirection: 'row',
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
  tagSelected: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: fontWeights.medium,
  },
  textSelected: {
    color: colors.background,
  },
});
