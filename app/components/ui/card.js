import styled from 'styled-components/native';
import theme from '../../constants/ui/theme';

const Card = styled.View`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-vertical: ${theme.spacing.sm}px;
  box-shadow: ${theme.shadows.sm};
  elevation: 3; /* Android shadow */
`;

export default Card;
