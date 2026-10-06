"use client";

import { useEffect, useState } from "react";
import { LogOutButton, NavbarContainer } from "./Navbar.styles";
import { logOut, validateSession } from "../Login/LoginActions";

const Navbar = () => {
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    async function calculateValidSession() {
      setIsValidSession(await validateSession());
    }

    calculateValidSession();
  }, []);

  return (
    <NavbarContainer>
      <a href="/">Home</a>
      {isValidSession ? <LogOutButton onClick={() => logOut()}>Log out</LogOutButton> : <a href="/login">Login</a>}
    </NavbarContainer>
  );
};

export default Navbar;
