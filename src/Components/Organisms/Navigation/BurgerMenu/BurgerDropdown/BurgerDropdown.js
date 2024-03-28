import React from "react";
import styled, { keyframes } from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const rotation = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
`;

const BurgerDropdownContent = styled.div`
  background-color: ${(props) => props.theme.colors.burgerDropdownBGColor};
`;

const StyledChevron = styled(FaChevronDown)`
  color: ${(props) => props.theme.colors.burgerChevronColor};
  margin: 20px 20px 0px 0px;
  display: inline-block;
  vertical-align: middle;
  width: 12px;
`;

const Label = styled.div`
  display: inline-block;
  padding: 20px 0px;
  margin: 0px;
  color: ${(props) => props.theme.colors.burgerFontColor};
`;

const BurgerP = styled.p`
  margin: 0px;
  display: inline-block;
  padding: 0px 10px;
`;

const BurgerDropdownButton = styled.button`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border-bottom: 0;
  border-right: 0;
  border-left: 0;

  &:hover ${StyledChevron} {
    color: ${(props) => props.theme.colors.primary};
    animation: ${rotation} 0.2s linear;
    animation-fill-mode: forwards;
  }

  &.active ${Label} {
    color: ${(props) => props.theme.colors.primary};
  }

  &.active ${StyledChevron} {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const BurgerDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState();

  if (showDropdown === undefined) {
    setShowDropdown(props.isActive());
  }

  const toggleShowDropdown = () => {
    setShowDropdown(showDropdown ? false : true);
  };

  return (
    <>
      <BurgerDropdownButton
        className={props.isActive() ? "active" : undefined}
        onClick={toggleShowDropdown}
        aria-label={props.label}
      >
        <Label>
          <BurgerP>{props.label}</BurgerP>
        </Label>
        <StyledChevron />
      </BurgerDropdownButton>
      {showDropdown && (
        <BurgerDropdownContent>{props.children}</BurgerDropdownContent>
      )}
    </>
  );
};

export default BurgerDropdown;
