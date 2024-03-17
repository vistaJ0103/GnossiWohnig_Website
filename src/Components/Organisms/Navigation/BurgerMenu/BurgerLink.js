import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const BurgerLink = styled(Link)`
  text-decoration: none;
  display: flex;
  text-align: left;
  padding: 20px 0px;
  margin: 0px;
  align-items: center;
  curser: pointer;
  color: ${(props) => props.theme.colors.burgerFontColor};

  &.active {
    color: ${(props) => props.theme.colors.white};
  }
`;

export default BurgerLink;
