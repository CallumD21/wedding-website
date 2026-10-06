"use client";

import { NavbarContainer } from "./Navbar.styles";

const Navbar = () => {
  return (
    <NavbarContainer>
      <a href="/">Home</a>
      <a href="/login">Log in</a>
    </NavbarContainer>
  );
};

export default Navbar;
