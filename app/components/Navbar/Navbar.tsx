'use client'

import { NavbarContainer } from "./Navbar.styles";


//STYLED COMPONENT ISSUE
//ADD GET USER FUNCTION AND IF NOT NULL THEN SHOW LOGGED IN BAR
const Navbar = () => {
  return (
    <NavbarContainer>
        <a href="/">Home</a>
        <a href="/login">Log in</a>
    </NavbarContainer>
  );
}

export default Navbar;