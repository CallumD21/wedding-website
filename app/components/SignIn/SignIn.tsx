'use client'

import { useState, SubmitEvent } from "react";
import { Button, Message, Input, TextButton } from "../../globals.styles";
import { createAccount, signIn } from "./SignInActions";
import { SignInForm } from "./SignIn.styles";
import PasswordInput from "../PasswordInput/PasswordInput";
import { CreateAccountErrors, SignInErrors } from "@/app/lib/types/SignInTypes";

const SignIn = () => {
  const [createAccountForm, setCreateAccountForm] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createAccountSuccess, setCreateAccountSuccess] = useState<boolean>(false);

  const [createUsername, setCreateUsername] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [signInErrors, setSignInErrors] = useState<SignInErrors>();
  const [createAccountErrors, setCreateAccountErrors] = useState<CreateAccountErrors>();

  const onCreateAccount = async (event: SubmitEvent<HTMLFormElement>) => {
     event.preventDefault();

    setCreateAccountErrors(undefined);
    const formState = await createAccount(createUsername, createPassword, confirmPassword);

    if(formState.success){
        setCreateAccountSuccess(true);
        setCreateAccountForm(false);
        setCreateUsername("");
        setCreatePassword("");
        setConfirmPassword("");
    }
    else{
         setCreateAccountErrors(formState.errors);
    }
  }

  const onSignIn = async (event: SubmitEvent<HTMLFormElement>) => {
     event.preventDefault();

    setSignInErrors(undefined);
    const formState = await signIn(username, password);

    if(!formState.success){
        setSignInErrors(formState.errors);
    }
  }

  return (
    <>
        { createAccountForm ?
            <SignInForm onSubmit={onCreateAccount}>
                <Input $error={createAccountErrors?.username !== undefined} placeholder="Create username" type="text" name="username" value={createUsername} onChange={e => setCreateUsername(e.target.value)} onClick={() => setCreateAccountErrors({...createAccountErrors, username: undefined})} />
                {createAccountErrors?.username && <Message $status="error">{createAccountErrors.username}</Message>}
                <PasswordInput password={createPassword} setPassword={setCreatePassword} placeholder="Create password" errorMessage={createAccountErrors?.password} clearError={() => setCreateAccountErrors({...createAccountErrors, password: undefined})} />
                <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm password" errorMessage={createAccountErrors?.confirmPassword} clearError={() => setCreateAccountErrors({...createAccountErrors, confirmPassword: undefined})} />
                <Button type="submit">
                    Create
                </Button>
            </SignInForm>
        :
            <SignInForm onSubmit={onSignIn}>
                {createAccountSuccess && <Message $status="success">Account created successfully! Please log in below:</Message>}
                <Input $error={signInErrors?.username !== undefined} placeholder="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} onClick={() => setSignInErrors({...signInErrors, username: undefined})}/>
                {signInErrors?.username && <Message $status="error">{signInErrors.username}</Message>}
                <PasswordInput password={password} setPassword={setPassword} placeholder="Password" errorMessage={signInErrors?.password} clearError={() => setSignInErrors({...signInErrors, password: undefined})} />
                <Button type="submit">
                    Log in
                </Button>
            </SignInForm>
        }
        {/* <TextButton onClick={() => setCreateAccountForm(!createAccountForm)}>
            { createAccountForm ? "Back to log in" : "Create account"}
        </TextButton> */}
  </>);
}

export default SignIn;