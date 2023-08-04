import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const NavDropdownLink = styled(Link)`
  text-decoration: none;
  display: flex;
  text-align: left;
  padding: 20px 0px;
  margin: 0px 20px;
  align-items: center;
  curser: pointer;
  border-bottom: dotted 2px ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.navDropdownFontColor};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }

  &:last-child {
    border: none;
  }
`;

export default NavDropdownLink;
