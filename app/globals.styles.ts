import styled from 'styled-components';

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => (props.$primary ? 'palevioletred' : 'white')};
  color: ${props => (props.$primary ? 'white' : 'palevioletred')};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 300px;
  border: 2px solid black;
  padding: 0.25rem;
  margin-bottom: 1rem;
`;

export const TextButton = styled.button`
  text-decoration: underline;
  cursor: pointer;
 
  &:hover {
    text-decoration: none;
  }
`;

export const Form = styled.form`
`;