import styled, { keyframes } from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

const rotation = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
`;

const LngDropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${(props) => props.theme.colors.lngDropdownBGColor};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 5px 0px;
  margin-top: 0px;
`;

const StyledChevron = styled(FaChevronDown)`
  color: ${(props) => props.theme.colors.lngChevronColor};
  margin: 0px 8px 2px 0px;
  display: inline-block;
  vertical-align: middle;
  width: 12px;
`;

const LngPTitle = styled.p`
  margin: 0px;
  display: inline-block;
  color: ${(props) => props.theme.colors.lngFontColor};
`;

const LngDropdownButton = styled.div`
  display: inline-block;
  text-align: center;
  padding: 12px 12px;
  text-decoration: none;
  cursor: pointer;

  &:hover ${LngDropdownContent} {
    display: block;
  }

  &:hover ${StyledChevron} {
    color: ${(props) => props.theme.colors.white};
    animation: ${rotation} 0.2s linear;
    animation-fill-mode: forwards;
  }

  &.active ${StyledChevron} {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const LngDropdownItem = styled.button`
  text-decoration: none;
  display: flex;
  text-align: left;
  padding: 2px 0px;
  margin: 0px 10px;
  align-items: center;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

const LngP = styled.p`
  margin: 0px;
  color: ${(props) => props.theme.colors.lngDropdownFontColor};
  curser: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const LngChangerDropdown = () => {
  const { i18n } = useTranslation();

  const [value, setvalue] = useState(i18n.language.slice(0, 2));
  const handleSelect = (value) => {
    setvalue(value);
    i18n.changeLanguage(value);
  };

  return (
    <LngDropdownButton>
      <StyledChevron />
      <LngPTitle>{value}</LngPTitle>
      <LngDropdownContent>
        <LngDropdownItem
          onClick={() => handleSelect("en")}
          aria-label="englisch"
        >
          <LngP>en</LngP>
        </LngDropdownItem>
        <LngDropdownItem
          onClick={() => handleSelect("de")}
          aria-label="deutsch"
        >
          <LngP>de</LngP>
        </LngDropdownItem>
      </LngDropdownContent>
    </LngDropdownButton>
  );
};

export default LngChangerDropdown;
