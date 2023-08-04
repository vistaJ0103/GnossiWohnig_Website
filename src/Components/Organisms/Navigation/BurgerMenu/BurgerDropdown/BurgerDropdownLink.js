import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const BurgerDropdownLink = styled(Link)`
  text-decoration: none;
  display: flex;
  text-align: left;
  padding: 20px 0px;
  margin: 0px 10px;
  align-items: center;
  curser: pointer;
  border-bottom: dotted 2px ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.burgerDropdownFontColor};

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default BurgerDropdownLink;
