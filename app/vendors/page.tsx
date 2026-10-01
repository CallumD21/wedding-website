'use client'

import { logOut } from "../components/Login/LoginActions";
import { Button, Heading } from "../globals.styles";

export default function Vendors() {
  return (
    <>
      <Heading>
        Vendor page
      </Heading>
      <Button onClick={() => logOut()}>Log out</Button>
    </>
  );
}