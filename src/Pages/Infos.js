import React from "react";
import { useTranslation } from "react-i18next";
import Section from "../Components/Atoms/Section";

const Infos = () => {
  const { t } = useTranslation();

  return (
    <>
      <Section
        pt="200px"
        pb="100px"
        widthMobile="80%"
        widthTablet="80%"
        width="60%"
      ></Section>
      <Section widthMobile="80%" widthTablet="80%" width="60%"></Section>
    </>
  );
};

export default Infos;
