import { NavbarContainer } from "./Navbar.styles";
import { validateSession } from "../Login/LoginActions";
import NavbarLogOutButton from "./NavbarLogOutButton";

const Navbar = async () => {
  const isValidSession = await validateSession();

  return (
    <NavbarContainer>
      <a href="/">Home</a>
      {isValidSession ? <NavbarLogOutButton /> : <a href="/login">Login</a>}
    </NavbarContainer>
  );
};

export default Navbar;
