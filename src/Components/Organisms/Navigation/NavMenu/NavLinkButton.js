import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const NavLinkButton = styled(Link)`
  border-radius: 4px;
  background: ${(props) => props.theme.colors.primary};
  padding: 8px 20px;
  border: solid 1px ${(props) => props.theme.colors.primary};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: ${(props) => props.theme.colors.navFontColor};
    border: solid 1px ${(props) => props.theme.colors.navFontColor};
  }
`;

export default NavLinkButton;
