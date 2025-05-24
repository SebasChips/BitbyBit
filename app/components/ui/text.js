import styled from 'styled-components/native';
import theme from '../../constants/ui/theme';

const variants = {
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
  },
  body: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textPrimary,
  },
  caption: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
};

const StyledText = styled.Text`
  font-size: ${({ variant }) => variants[variant]?.fontSize || theme.typography.fontSize.md}px;
  font-family: ${({ variant }) => variants[variant]?.fontFamily || theme.typography.fontFamily.regular};
  color: ${({ variant }) => variants[variant]?.color || theme.colors.textPrimary};
`;

export default StyledText;
