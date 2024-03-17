import styled from "styled-components";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

const LngChangerLineContainer = styled.div`
  padding: 8px 0px;
`;

const LngChangerLineItem = styled.button`
  text-decoration: none;
  display: inline-block;
  text-align: left;
  padding: 10px 0px;
  margin: 0px 0px 0px 20px;
  align-items: center;
  border: none;
  outline: none;
  background: transparent;
`;

const LngP = styled.p`
  margin: 0px;
  curser: pointer;
  color: ${(props) =>
    props.active
      ? props.theme.colors.white
      : props.theme.colors.lngLineFontColor};
`;

const LngChangerLine = () => {
  const { i18n } = useTranslation();

  const [value, setvalue] = useState(i18n.language.slice(0, 2));
  const handleSelect = (value) => {
    setvalue(value);
    i18n.changeLanguage(value);
  };

  return (
    <LngChangerLineContainer>
      <LngChangerLineItem onClick={() => handleSelect("en")}>
        <LngP active={value === "en"}>en</LngP>
      </LngChangerLineItem>
      <LngChangerLineItem onClick={() => handleSelect("de")}>
        <LngP active={value === "de"}>de</LngP>
      </LngChangerLineItem>
    </LngChangerLineContainer>
  );
};

export default LngChangerLine;
