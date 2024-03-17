import React from "react";
import { useTranslation } from "react-i18next";
import LngChangerDropdown from "../Components/Organisms/LngChanger/LngChangerDrowdown";
import Section from "../Components/Atoms/Section";
import Row from "../Components/Atoms/Row";
import Column from "../Components/Atoms/Column";
import Text from "../Components/Atoms/Text";
import styled, { useTheme } from "styled-components";
import { device } from "../Components/Atoms/Devices";
import PageLink from "../Components/Atoms/PageLink";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Section
      pt="40px"
      ptTablet="50px"
      ptMobile="30px"
      pb="30px"
      pbTablet="20px"
      backgroundColor={theme.colors.primary}
    >
      <Row
        justify="center"
        alignItems="center"
        flexDirection="row"
        widthTablet="90%"
        isRow={true}
      >
        <Column width="20%" widthTablet="30%" textAlign="center">
          <PageLink to="/privacypolicy" color="#ffffff" display="block">
            <Text
              size="16px"
              align="center"
              marginBottom="10px"
              marginBottomMobile="5px"
              color={theme.colors.white}
              weightMobile="bold"
            >
              {t("Nav.PrivacyPolicy")}
            </Text>
          </PageLink>
          <PageLink to="/termsofservice" color="#ffffff" display="block">
            <Text
              size="16px"
              align="center"
              marginBottom="10px"
              marginBottomMobile="15px"
              color={theme.colors.white}
              weightMobile="bold"
            >
              {t("Nav.TermsOfService")}
            </Text>
          </PageLink>
        </Column>
        <Column width="20%" widthTablet="30%" widthMobile="90%">
          <Text
            size="16px"
            weight="bolder"
            align="center"
            color={theme.colors.white}
            weightMobile="bold"
          >
            {t("Footer.Address")}
          </Text>
          <Text size="16px" align="center" color={theme.colors.white}>
            TecFox GmbH
          </Text>
          <Text size="16px" align="center" color={theme.colors.white}>
            Sperletweg 56
          </Text>
          <Text size="16px" align="center" color={theme.colors.white}>
            8052 Zürich
          </Text>
        </Column>
        <Column
          width="20%"
          widthTablet="30%"
          widthMobile="90%"
          textAlign="center"
        >
          <Text
            size="16px"
            weight="bolder"
            align="center"
            color={theme.colors.white}
          >
            {t("Footer.Language")}
          </Text>
          <LngChangerDropdown />
        </Column>
      </Row>
      <Row justify="flex-end">
        <Column
          width="20%"
          widthTablet="95%"
          widthMobile="90%"
          marginRight="30px"
          marginTopTablet="15px"
        >
          <Text size="14px" align="right" color={theme.colors.white}>
            © 2022 TecFox GmbH
          </Text>
        </Column>
      </Row>
    </Section>
  );
};

export default Footer;
