import styled, { keyframes } from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const rotation = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
`;

const NavDropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${(props) => props.theme.colors.navDropdownBGColor};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 8px 0px;
  margin-top: 10px;
`;

const StyledChevron = styled(FaChevronDown)`
  color: ${(props) => props.theme.colors.navChevronColor};
  margin: 0px 8px 2px 0px;
  display: inline-block;
  vertical-align: middle;
  width: 12px;
`;

const Label = styled.p`
  display: inline-block;
  color: ${(props) => props.theme.colors.navFontColor};
`;

const NavP = styled.p`
  margin: 0px;
  display: inline-block;
`;

const NavDropdownButton = styled(Link)`
  display: inline-block;
  text-align: center;
  padding: 12px 12px;
  text-decoration: none;
  cursor: pointer;

  &:hover ${NavDropdownContent} {
    display: block;
  }

  &:hover ${StyledChevron} {
    color: ${(props) => props.theme.colors.primary};
    animation: ${rotation} 0.2s linear;
    animation-fill-mode: forwards;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  &.active ${Label} {
    color: ${(props) => props.theme.colors.primary};
  }

  &.active ${StyledChevron} {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const NavDropdown = (props) => {
  const isActive = () => {
    return props.isActive();
  };

  return (
    <NavDropdownButton to="" isActive={isActive} aria-label={props.label}>
      <StyledChevron />
      <Label>
        <NavP>{props.label}</NavP>
      </Label>
      <NavDropdownContent>{props.children}</NavDropdownContent>
    </NavDropdownButton>
  );
};

export default NavDropdown;
