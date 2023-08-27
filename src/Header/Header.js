import React from "react";
import styled from "styled-components";
import { device } from "../Components/Atoms/Devices";
import NavMenu from "./NavMenu";
import BurgerMenu from "./BurgerMenu";

const HeaderContainer = styled.nav`
  height: 80px;
  display: flex;
  justify-content: right;
  padding: 10px 20px;
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
`;

const StyledBurgerMenu = styled(BurgerMenu)`
  display: none;
  @media ${device.mobile} {
    display: block;
  }
`;

const StyledNavMenu = styled(NavMenu)`
  @media ${device.mobile} {
    display: none;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <StyledBurgerMenu />
      <StyledNavMenu />
    </HeaderContainer>
  );
};

export default Header;
