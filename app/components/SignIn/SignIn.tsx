'use client'

import { useState, SubmitEvent } from "react";
import { Button, ErrorMessage, Input, TextButton } from "../../globals.styles";
import { createAccount } from "./SignInActions";
import { SignInForm } from "./SignIn.styles";
import PasswordInput from "../PasswordInput/PasswordInput";

interface CreateAccountErrors {
    username: string;
    password: string;
    confirmPassword: string;
}

const SignIn = () => {
  const [createAccountForm, setCreateAccountForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [createUsername, setCreateUsername] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const EMPTY_CREATE_ACCOUNT_ERRORS: CreateAccountErrors = {
    username: "",
    password: "",
    confirmPassword: "",
  }
  const [createAccountErrors, setCreateAccountErrors] = useState<CreateAccountErrors>(EMPTY_CREATE_ACCOUNT_ERRORS); 

  const createEmptyError = (value: string): string => value.trim().length === 0 ? "Please enter a value" : ""

  const onCreateAccount = (event: SubmitEvent<HTMLFormElement>) => {
     event.preventDefault();
     const trimmedUsername = createUsername.trim();
     const trimmedPassword = createPassword.trim();
     const trimmedConfirmPassword = confirmPassword.trim();

     if(!trimmedUsername || !trimmedPassword || !confirmPassword){
        setCreateAccountErrors({
            username: createEmptyError(trimmedUsername),
            password: createEmptyError(trimmedPassword),
            confirmPassword: createEmptyError(trimmedConfirmPassword),
        });

        return;
     }

     if(trimmedPassword !== trimmedConfirmPassword){
        setCreateAccountErrors({
            username: "",
            password: "Passwords do not match",
            confirmPassword: "Passwords do not match",
        });

        return;
     }

     setCreateAccountErrors(EMPTY_CREATE_ACCOUNT_ERRORS);
     createAccount(trimmedUsername, trimmedPassword);
  }

  return (
    <>
        { createAccountForm ?
            <SignInForm onSubmit={onCreateAccount}>
                <Input $error={createAccountErrors.username != ""} placeholder="Create username" type="text" name="username" value={createUsername} onChange={e => setCreateUsername(e.target.value)} onClick={() => setCreateAccountErrors({...createAccountErrors, username: ""})} />
                {createAccountErrors.username && <ErrorMessage>{createAccountErrors.username}</ErrorMessage>}
                <PasswordInput password={createPassword} setPassword={setCreatePassword} placeholder="Create password" errorMessage={createAccountErrors.password} clearError={() => setCreateAccountErrors({...createAccountErrors, password: ""})} />
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm password" errorMessage={createAccountErrors.confirmPassword} clearError={() => setCreateAccountErrors({...createAccountErrors, confirmPassword: ""})} />
                <Button type="submit">
                    Create
                </Button>
            </SignInForm>
        :
            <SignInForm>
                <Input placeholder="Username" type="text" />
                <PasswordInput password={password} setPassword={setPassword} placeholder="Password" errorMessage="" clearError={() => {}} />
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