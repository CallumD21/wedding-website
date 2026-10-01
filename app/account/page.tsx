'use client'

import { logOut } from "../components/Login/LoginActions";
import { Button, Heading } from "../globals.styles";

export default function Account() {
  return (
    <>
      <Heading>
        Account page
      </Heading>
      <Button onClick={() => logOut()}>Log out</Button>
    </>
  );
}