'use client'

import { NavbarContainer, NavbarLinks } from "./Navbar.styles";


//STYLED COMPONENT ISSUE
//ADD GET USER FUNCTION AND IF NOT NULL THEN SHOW LOGGED IN BAR
const Navbar = () => {
  return (
    <NavbarContainer>
        <NavbarLinks href="/">Home</NavbarLinks>
        <NavbarLinks href="/login">Log in</NavbarLinks>
    </NavbarContainer>
  );
}

export default Navbar;