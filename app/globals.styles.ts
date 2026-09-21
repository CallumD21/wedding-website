import styled from 'styled-components';

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => (props.$primary ? 'palevioletred' : 'white')};
  color: ${props => (props.$primary ? 'white' : 'palevioletred')};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;