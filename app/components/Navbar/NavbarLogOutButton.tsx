'use client'

import { LogOutButton } from "./Navbar.styles";
import { logOut } from "../Login/LoginActions";

const NavbarLogOutButton = async () => <LogOutButton onClick={() => logOut()}>Log out</LogOutButton>;

export default NavbarLogOutButton;
