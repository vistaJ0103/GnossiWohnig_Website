import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 20px;
  height: 100%;
  curser: pointer;
  color: ${(props) => props.theme.colors.navFontColor};

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export default NavLink;
