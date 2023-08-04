import React from "react";
import styled from "styled-components";
import { device } from "../Components/Atoms/Devices";
import NavLink from "../Components/Navigation/NavMenu/NavLink";
import NavMenu from "./NavMenu";
import BurgerMenu from "./BurgerMenu";
import HeaderLogo from "../Assets/nelinik.png";

const HeaderContainer = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
`;

const LogoContainer = styled.div`
  margin-top: 2px;
  margin-left: 40px;
  & > * {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const Logo = styled.img`
  height: 60px;
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
      <NavLink to="/">
        <LogoContainer>
          <Logo src={HeaderLogo} />
        </LogoContainer>
      </NavLink>
      <StyledBurgerMenu />
      <StyledNavMenu />
    </HeaderContainer>
  );
};

export default Header;
