import React from 'react';
import styled from 'styled-components/native';
import theme from '../../constants/ui/theme';

const Container = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

const StyledInput = styled.TextInput`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.muted};
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.radius.md}px;
  font-size: ${theme.typography.fontSize.md}px;
  font-family: ${theme.typography.fontFamily.regular};
  color: ${theme.colors.textPrimary};
`;

const Label = styled.Text`
  margin-bottom: ${theme.spacing.xs}px;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm}px;
  font-family: ${theme.typography.fontFamily.medium};
`;

const Input = ({ label, ...props }) => (
  <Container>
    {label && <Label>{label}</Label>}
    <StyledInput {...props} placeholderTextColor={theme.colors.muted} />
  </Container>
);

export default Input;
