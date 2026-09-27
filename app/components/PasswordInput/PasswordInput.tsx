'use client'

import { useState } from "react";
import { ErrorMessage, Input, TextButton } from "../../globals.styles";
import { PasswordInputContainer } from "./PasswordInput.styles";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  placeholder: string;
  errorMessage?: string[];
  clearError: () => void;
}

const PasswordInput = ({password, setPassword, placeholder, errorMessage, clearError} : PasswordInputProps) => {
  const [passwordInputType, setPasswordInputType] = useState<string>("password");

  return (
    <PasswordInputContainer>
        <Input $error={errorMessage !== undefined} placeholder={placeholder} type={passwordInputType} value={password} onChange={e => setPassword(e.target.value)} onClick={clearError} />
        {errorMessage && <ErrorMessage>{errorMessage[0]}</ErrorMessage>}
        <TextButton type="button" onClick={() => setPasswordInputType(passwordInputType === "password" ? "text" : "password")} name="password">
           {passwordInputType === "password" ? "show" : "hide"} password
        </TextButton>
    </PasswordInputContainer>
  );
}

export default PasswordInput;