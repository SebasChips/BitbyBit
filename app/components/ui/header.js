import styled from 'styled-components/native';
import theme from '../../constants/ui/theme';

const Header = styled.View`
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  color: ${theme.colors.onPrimary};
  font-size: ${theme.typography.fontSize.xl}px;
  font-family: ${theme.typography.fontFamily.bold};
`;

export { Header, HeaderText };
