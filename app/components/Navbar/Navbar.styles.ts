import { TextButton } from "@/app/globals.styles";
import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  background-color: grey;
  padding: 1rem;
  justify-content: end;
  gap: 0.5rem;
`;

export const LogOutButton = styled(TextButton)`
  padding: 0;
  font-size: inherit;
  text-decoration: none;
`;