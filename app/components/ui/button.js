import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import buttonVariants from '../../constants/ui/button';
import theme from '../../constants/ui/theme';

const getVariant = (variant) => buttonVariants[variant] || buttonVariants.primary;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ variant }) => getVariant(variant).backgroundColor};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.radius.md}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text`
  color: ${({ variant }) => getVariant(variant).textColor};
  font-family: ${theme.typography.fontFamily.bold};
  font-size: ${theme.typography.fontSize.md}px;
`;

const Button = ({ title, variant = 'primary', onPress, loading = false, disabled = false }) => (
  <ButtonContainer variant={variant} onPress={onPress} disabled={disabled || loading}>
    {loading ? (
      <ActivityIndicator color={getVariant(variant).textColor} />
    ) : (
      <ButtonText variant={variant}>{title}</ButtonText>
    )}
  </ButtonContainer>
);

export default Button;
