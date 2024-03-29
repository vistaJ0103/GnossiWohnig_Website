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

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderSection pt="70px" pb="150px" backgroundImage={HeaderImage}>
        <Title>{t("Nav.TermsOfService")}</Title>
      </HeaderSection>
      <ContentContainer>
        <Subtitle>{t("TermsOfService.Title")}</Subtitle>
        <Content>{t("TermsOfService.Content")}</Content>
        <Subtitle>{t("TermsOfService.Title1")}</Subtitle>
        <Content>{t("TermsOfService.Content1")}</Content>
        <Subtitle>{t("TermsOfService.Title2")}</Subtitle>
        <Content>{t("TermsOfService.Content2")}</Content>
        <Subtitle>{t("TermsOfService.Title3")}</Subtitle>
        <Content>{t("TermsOfService.Content3")}</Content>
        <Subtitle>{t("TermsOfService.Title4")}</Subtitle>
        <Content>{t("TermsOfService.Content4")}</Content>
        <Subtitle>{t("TermsOfService.Title5")}</Subtitle>
        <Content>{t("TermsOfService.Content5")}</Content>
        <Subtitle>{t("TermsOfService.Title6")}</Subtitle>
        <Content>{t("TermsOfService.Content6")}</Content>
        <Subtitle>{t("TermsOfService.Title7")}</Subtitle>
        <Content>{t("TermsOfService.Content7")}</Content>
        <Subtitle>{t("TermsOfService.Title8")}</Subtitle>
        <Content>{t("TermsOfService.Content8")}</Content>
        <Subtitle>{t("TermsOfService.Title9")}</Subtitle>
        <Content>{t("TermsOfService.Content9")}</Content>
      </ContentContainer>
    </>
  );
};

export default TermsOfService;
