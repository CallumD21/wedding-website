"use client";

import { useState, SubmitEvent } from "react";
import { Button, Message, Input, TextButton } from "../../globals.styles";
import { createAccount, login } from "./LoginActions";
import { LoginForm } from "./Login.styles";
import PasswordInput from "../PasswordInput/PasswordInput";
import { CreateAccountErrors, LoginErrors } from "@/app/lib/types/LoginTypes";

const Login = () => {
  const [createAccountForm, setCreateAccountForm] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createAccountSuccess, setCreateAccountSuccess] =
    useState<boolean>(false);

  const [createUsername, setCreateUsername] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [LoginErrors, setLoginErrors] = useState<LoginErrors>();
  const [createAccountErrors, setCreateAccountErrors] =
    useState<CreateAccountErrors>();

  const onCreateAccount = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCreateAccountErrors(undefined);
    const formState = await createAccount(
      createUsername,
      createPassword,
      confirmPassword,
    );

    if (formState.success) {
      setCreateAccountSuccess(true);
      setCreateAccountForm(false);
      setCreateUsername("");
      setCreatePassword("");
      setConfirmPassword("");
    } else {
      setCreateAccountErrors(formState.errors);
    }
  };

  const onLogin = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoginErrors(undefined);
    const formState = await login(username, password);

    if (!formState.success) {
      setLoginErrors(formState.errors);
    }
  };

  return (
    <>
      {createAccountForm ? (
        <LoginForm onSubmit={onCreateAccount}>
          <Input
            $error={createAccountErrors?.username !== undefined}
            placeholder="Create username"
            type="text"
            name="createUsername"
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
            onClick={() =>
              setCreateAccountErrors({
                ...createAccountErrors,
                username: undefined,
              })
            }
          />
          {createAccountErrors?.username && (
            <Message $status="error">{createAccountErrors.username}</Message>
          )}
          <PasswordInput
            name="new-password"
            password={createPassword}
            setPassword={setCreatePassword}
            placeholder="Create password"
            errorMessage={createAccountErrors?.password}
            clearError={() =>
              setCreateAccountErrors({
                ...createAccountErrors,
                password: undefined,
              })
            }
          />
          <PasswordInput
            name="new-password"
            password={confirmPassword}
            setPassword={setConfirmPassword}
            placeholder="Confirm password"
            errorMessage={createAccountErrors?.confirmPassword}
            clearError={() =>
              setCreateAccountErrors({
                ...createAccountErrors,
                confirmPassword: undefined,
              })
            }
          />
          <Button type="submit">Create</Button>
        </LoginForm>
      ) : (
        <LoginForm onSubmit={onLogin}>
          {createAccountSuccess && (
            <Message $status="success">
              Account created successfully! Please log in below:
            </Message>
          )}
          <Input
            name="username"
            autoComplete="username"
            $error={LoginErrors?.username !== undefined}
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={() =>
              setLoginErrors({ ...LoginErrors, username: undefined })
            }
          />
          {LoginErrors?.username && (
            <Message $status="error">{LoginErrors.username}</Message>
          )}
          <PasswordInput
            name="current-password"
            password={password}
            setPassword={setPassword}
            placeholder="Password"
            errorMessage={LoginErrors?.password}
            clearError={() =>
              setLoginErrors({ ...LoginErrors, password: undefined })
            }
          />
          <Button type="submit">Log in</Button>
        </LoginForm>
      )}
      {/* <TextButton onClick={() => setCreateAccountForm(!createAccountForm)}>
            { createAccountForm ? "Back to log in" : "Create account"}
        </TextButton> */}
    </>
  );
};

export default Login;
