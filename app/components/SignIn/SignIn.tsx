'use client'

import { useState } from "react";
import { Button, Input, TextButton } from "../../globals.styles";
import { createAccount } from "./SignInActions";
import { PasswordInput, SignInForm } from "./SignIn.styles";


const SignIn = () => {
  const [createAccountForm, setCreateAccountForm] = useState<boolean>(false);
  const [passwordInputType, setPasswordInputType] = useState<string>("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState<string>("password");

  const togglePasswordType = (passwordInputType: string, setPasswordInputType: (passwordInputType: string) => void) => {
    setPasswordInputType(passwordInputType === "password" ? "text" : "password");
  }

  return (
    <>
        { createAccountForm ?
            <SignInForm action={createAccount}>
                <Input placeholder="Create username" type="text" name="username" />
                <PasswordInput>
                    <Input placeholder="Create password" type={passwordInputType} name="password" />
                    <TextButton type="button" onClick={() => togglePasswordType(passwordInputType, setPasswordInputType)}>
                        show password
                    </TextButton>
                </PasswordInput>
                <PasswordInput>
                    <Input placeholder="Create password" type={confirmPasswordInputType} name="confirmPassword" />
                    <TextButton type="button" onClick={() => togglePasswordType(confirmPasswordInputType, setConfirmPasswordInputType)}>
                        show password
                    </TextButton>
                </PasswordInput>
                <Button type="submit">
                    Create
                </Button>
            </SignInForm>
        :
            <SignInForm>
                <Input placeholder="Username" type="text" />
                <Input placeholder="Password" type="password" />
                <Button type="submit">
                    Log in
                </Button>
            </SignInForm>
        }
        <TextButton onClick={() => setCreateAccountForm(!createAccountForm)}>
            { createAccountForm ? "Back to log in" : "Create account"}
        </TextButton>
  </>);
}

export default SignIn;