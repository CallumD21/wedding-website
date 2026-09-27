'use client'

import { useState, SubmitEvent } from "react";
import { Button, ErrorMessage, Input, TextButton } from "../../globals.styles";
import { createAccount } from "./SignInActions";
import { SignInForm } from "./SignIn.styles";
import PasswordInput from "../PasswordInput/PasswordInput";
import { CreateAccountErrors } from "@/app/lib/types/SignInTypes";

const SignIn = () => {
  const [createAccountForm, setCreateAccountForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [createUsername, setCreateUsername] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [createAccountErrors, setCreateAccountErrors] = useState<CreateAccountErrors>();

  const onCreateAccount = async (event: SubmitEvent<HTMLFormElement>) => {
     event.preventDefault();

    setCreateAccountErrors(undefined);
    const formState = await createAccount(createUsername, createPassword, confirmPassword);

    if(!formState.success){
        setCreateAccountErrors(formState.errors);
    }
  }

  return (
    <>
        { createAccountForm ?
            <SignInForm onSubmit={onCreateAccount}>
                <Input $error={createAccountErrors?.username !== undefined} placeholder="Create username" type="text" name="username" value={createUsername} onChange={e => setCreateUsername(e.target.value)} onClick={() => setCreateAccountErrors({...createAccountErrors, username: undefined})} />
                {createAccountErrors?.username && <ErrorMessage>{createAccountErrors.username}</ErrorMessage>}
                <PasswordInput password={createPassword} setPassword={setCreatePassword} placeholder="Create password" errorMessage={createAccountErrors?.password} clearError={() => setCreateAccountErrors({...createAccountErrors, password: undefined})} />
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm password" errorMessage={createAccountErrors?.confirmPassword} clearError={() => setCreateAccountErrors({...createAccountErrors, confirmPassword: undefined})} />
                <Button type="submit">
                    Create
                </Button>
            </SignInForm>
        :
            <SignInForm>
                <Input placeholder="Username" type="text" />
                <PasswordInput password={password} setPassword={setPassword} placeholder="Password" clearError={() => {}} />
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