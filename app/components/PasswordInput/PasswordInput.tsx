'use client'

import { useState } from "react";
import { Message, Input, TextButton } from "../../globals.styles";
import { PasswordInputContainer } from "./PasswordInput.styles";

interface PasswordInputProps {
  name: string;
  password: string;
  setPassword: (password: string) => void;
  placeholder: string;
  errorMessage?: string[];
  clearError: () => void;
}

const PasswordInput = ({name, password, setPassword, placeholder, errorMessage, clearError} : PasswordInputProps) => {
  const [passwordInputType, setPasswordInputType] = useState<string>("password");

  return (
    <PasswordInputContainer>
        <Input $error={errorMessage !== undefined} name={name} autoComplete={name} placeholder={placeholder} type={passwordInputType} value={password} onChange={e => setPassword(e.target.value)} onClick={clearError} />
        {errorMessage && <Message $status="error">{errorMessage[0]}</Message>}
        <TextButton type="button" onClick={() => setPasswordInputType(passwordInputType === "password" ? "text" : "password")} name="password">
           {passwordInputType === "password" ? "show" : "hide"} password
        </TextButton>
    </PasswordInputContainer>
  );
}

export default PasswordInput;