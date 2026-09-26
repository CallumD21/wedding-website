'use client'

import { useState } from "react";
import { Input, TextButton } from "../../globals.styles";
import { PasswordInputContainer } from "./PasswordInput.styles";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  placeholder: string;
}

const PasswordInput = ({password, setPassword, placeholder} : PasswordInputProps) => {
  const [passwordInputType, setPasswordInputType] = useState<string>("password");

  return (
    <PasswordInputContainer>
        <Input placeholder={placeholder} type={passwordInputType} value={password} onChange={e => setPassword(e.target.value)} />
        <TextButton type="button" onClick={() => setPasswordInputType(passwordInputType === "password" ? "text" : "password")} name="password">
           {passwordInputType === "password" ? "show" : "hide"} password
        </TextButton>
    </PasswordInputContainer>
  );
}

export default PasswordInput;