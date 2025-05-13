import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, radii, opacities, fontWeights, dimensions, imageSizes } from '../constants/theme';

export const textStyles = StyleSheet.create({
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.lg,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: colors.muted,
    marginBottom: spacing.md,
  },
  buttonText: {
    fontSize: fontSizes.md,
    color: colors.background,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  buttonText2: {
    fontSize: fontSizes.md,
    color: colors.primary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  link: {
    color: colors.primary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  }
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  input: {
    width: dimensions.inputWidth,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
  },
});

export const buttonStyles = StyleSheet.create({
  primary: {
    width: dimensions.buttonWidth,
    marginVertical: spacing.sm,
    marginTop: spacing.sm, 
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    padding: spacing.sm,
  },
  secondary: {
    width: dimensions.buttonWidth,
    marginVertical: spacing.sm,
    marginTop: spacing.sm, 
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radii.pill,
    padding: spacing.sm,
  },
});

export const imageStyles = StyleSheet.create({
  small: {
    width: imageSizes.sm,
    height: imageSizes.sm,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
  },
  medium: {
    width: imageSizes.md,
    height: imageSizes.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  large: {
    width: imageSizes.lg,
    height: imageSizes.lg,
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
  },
  xlarge: {
    width: imageSizes.xl,
    height: imageSizes.xl,
    borderRadius: radii.lg,
    marginBottom: spacing.xl,
  },
});
