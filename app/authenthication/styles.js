// styles.js
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
  border: '#CCCCCC',
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.large,
    color: colors.text,
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.medium,
    backgroundColor: colors.background,
  },
  input: {
    width: '60%',
    marginVertical: spacing.small,
    padding: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  googleButton: {
    width: 70,
    height: 70,
    marginTop: spacing.medium,
  },
});

export const buttonStyles = StyleSheet.create({
    primary: {
      width: '30%',
      marginVertical: spacing.small,
      backgroundColor: colors.primary,
      borderRadius: 20, 
      padding: spacing.small,
    },
    secondary: {
      width: '30%',
      marginVertical: spacing.small,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 20,
      padding: spacing.small,
    },
  });