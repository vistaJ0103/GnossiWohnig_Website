import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import { device } from "../../Components/Atoms/Devices";
import Section from "../../Components/Atoms/Section";
import InfoImage from "../../Assets/header2.webp";
import HeaderSection from "../../Components/Atoms/HeaderSection";
import Text from "../../Components/Atoms/Text";
import { getCollection } from "../../firebaseProvider";
import Table from "./Table";

const Title = styled.h3`
  font-size: 55px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: ${(props) => props.theme.colors.white};

  @media ${device.tablet} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  @media ${device.mobile} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const Infos = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [data, setData] = useState();

  if (data == null) {
    getCollection("cooperativesData").then((coop) => {
      setData(coop[0].data);
    });
  }

  return (
    <>
      <HeaderSection
        pt="50px"
        pb="180px"
        ptTablet="90px"
        pbTablet="150px"
        ptMobile="80px"
        pbMobile="100px"
        backgroundImage={InfoImage}
      >
        <Title>{t("Infos.Title")}</Title>
        <Text color={theme.colors.white} size="18px">
          {t("Infos.Subtitle")}
        </Text>
      </HeaderSection>

      {data ? (
        <Section
          widthMobile="80%"
          widthTablet="80%"
          width="80%"
          pt="40px"
          pb="40px"
          minHeight="500px"
        >
          <Table data={data} />
        </Section>
      ) : (
        <Text color={theme.colors.white} size="18px">
          {t("Infos.Loading")}
        </Text>
      )}
    </>
  );
};

export default Infos;
