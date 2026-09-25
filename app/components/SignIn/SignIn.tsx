'use client'

import { useState } from "react";
import { Button, Form, Input, TextButton } from "../../globals.styles";
import { createAccount } from "./SignInActions";


const SignIn = () => {
  const [createAccountForm, setCreateAccountForm] = useState<boolean>(false);
  return (
    <>
        { createAccountForm ?
            <Form action={createAccount}>
                <Input placeholder="Create username" type="text" name="username" />
                <Input placeholder="Create password" type="password" name="password" />
                <Input placeholder="Confirm password" type="password" />
                <Button type="submit">
                    Create
                </Button>
            </Form>
        :
            <Form>
                <Input placeholder="Username" type="text" />
                <Input placeholder="Password" type="password" />
                <Button type="submit">
                    Log in
                </Button>
            </Form>
        }
        <TextButton onClick={() => setCreateAccountForm(!createAccountForm)}>
            { createAccountForm ? "Back to log in" : "Create account"}
        </TextButton>
  </>);
}

export default SignIn;