import styled from "styled-components";
import { useTranslation } from "react-i18next";
import HeaderSection from "../Components/Atoms/HeaderSection";
import HeaderImage from "../Assets/header2.jpg";
import { device } from "../Components/Atoms/Devices";

const ContentContainer = styled.div`
  padding: 0.5rem calc((100vw - 1000px) / 2);
  padding-top: 100px;
  margin-bottom: 100px;
`;

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

const Content = styled.p`
  font-size: 18px;
`;

const Subtitle = styled.p`
  font-size: 22px;
  margin-top: 50px;
  text-align: center;
`;

const PricacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderSection pt="70px" pb="150px" backgroundImage={HeaderImage}>
        <Title>{t("Nav.PrivacyPolicy")}</Title>
      </HeaderSection>
      <ContentContainer>
        <Content>{t("PrivacyPolicy.Content")}</Content>
        <Subtitle>{t("PrivacyPolicy.Title1")}</Subtitle>
        <Content>{t("PrivacyPolicy.Content1")}</Content>
        <Subtitle>{t("PrivacyPolicy.Title2")}</Subtitle>
        <Content>{t("PrivacyPolicy.Content2")}</Content>
        <Subtitle>{t("PrivacyPolicy.Title3")}</Subtitle>
        <Content>{t("PrivacyPolicy.Content3")}</Content>
        <Subtitle>{t("PrivacyPolicy.Title4")}</Subtitle>
        <Content>{t("PrivacyPolicy.Content4")}</Content>
        <Subtitle>{t("PrivacyPolicy.Title5")}</Subtitle>
        <Content>{t("PrivacyPolicy.Content5")}</Content>
        <Subtitle>{t("PrivacyPolicy.Title6")}</Subtitle>
        <Content>{t("PrivacyPolicy.Content6")}</Content>
        <Subtitle>{t("PrivacyPolicy.Title7")}</Subtitle>
        <Content>{t("PrivacyPolicy.Content7")}</Content>
      </ContentContainer>
    </>
  );
};

export default PricacyPolicy;
