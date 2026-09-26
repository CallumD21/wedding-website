'use client'

import { useState } from "react";
import { Button, Input, TextButton } from "../../globals.styles";
import { createAccount } from "./SignInActions";
import { SignInForm } from "./SignIn.styles";
import PasswordInput from "../PasswordInput/PasswordInput";


const SignIn = () => {
  const [createAccountForm, setCreateAccountForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <>
        { createAccountForm ?
            <SignInForm action={createAccount}>
                <Input placeholder="Create username" type="text" name="username" />
                <PasswordInput password={createPassword} setPassword={setCreatePassword} placeholder="Create password" />
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm password" />
                <Button type="submit">
                    Create
                </Button>
            </SignInForm>
        :
            <SignInForm>
                <Input placeholder="Username" type="text" />
                <PasswordInput password={password} setPassword={setPassword} placeholder="Password" />
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