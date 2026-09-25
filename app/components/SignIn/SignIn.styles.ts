import styled from 'styled-components';

export const SignInForm = styled.form`
  max-width: 300px;
`;

export const PasswordInput = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  button {
    position: absolute;
    font-size: 14px;
    right: 0;
    bottom: -20px;
  }
`;