import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
      font-family: Arial, Helvetica, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  background: ${(props) => (props.$primary ? "palevioletred" : "white")};
  color: ${(props) => (props.$primary ? "white" : "palevioletred")};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const Input = styled.input<{ $error?: boolean }>`
  display: block;
  width: 100%;
  border: 2px solid ${(props) => (props.$error ? "red" : "black")};
  padding: 0.25rem;
  margin-bottom: ${(props) => (props.$error ? "0.25rem" : "1rem")};
`;

export const TextButton = styled.button`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

export const Message = styled.text<{ $status?: string }>`
  display: block;
  color: ${(props) => (props.$status === "error" ? "red" : "green")};
  font-size: 14px;
  margin-bottom: 1rem;
`;
