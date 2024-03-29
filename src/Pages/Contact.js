import styled from "styled-components";
import Form from "../Components/Organisms/Form/Form";
import FormInput from "../Components/Organisms/Form/FormInput";
import { useTranslation } from "react-i18next";
import HeaderSection from "../Components/Atoms/HeaderSection";
import ContactImage from "../Assets/header2.webp";
import Text from "../Components/Atoms/Text";
import { device } from "../Components/Atoms/Devices";

const FormContainer = styled.div`
  padding: 0.5rem calc((100vw - 1000px) / 2);
  padding-top: 100px;
  margin-bottom: 100px;

  @media ${device.tablet} {
    padding: 50px;
  }
  @media ${device.mobile} {
    padding: 20px;
  }
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

const Contact = () => {
  const { t } = useTranslation();
  const sendButtonText = (
    <Text color="white" size="16px">
      {t("Contact.SendNow")}
    </Text>
  );
  const successMessage = (
    <>
      <Text color="#1fa31f" size="18px">
        {t("Contact.SuccessMessage1")}
      </Text>
      <Text color="#1fa31f" size="18px">
        {t("Contact.SuccessMessage2")}
      </Text>
    </>
  );
  const errorMessage = (
    <>
      <Text color="#eb3434" size="18px">
        {t("Contact.ErrorMessage1")}
      </Text>
      <Text color="#eb3434" size="18px">
        {t("Contact.ErrorMessage2")}
      </Text>
    </>
  );

  return (
    <>
      <HeaderSection
        pt="70px"
        pb="150px"
        ptTablet="90px"
        pbTablet="150px"
        ptMobile="80px"
        pbMobile="100px"
        backgroundImage={ContactImage}
      >
        <Title>{t("Nav.Contact")}</Title>
      </HeaderSection>
      <FormContainer>
        <Form
          sendButtonText={sendButtonText}
          successMessage={successMessage}
          errorMessage={errorMessage}
        >
          <FormInput
            placeholder={t("Contact.FirstName")}
            type="text"
            name="firstName"
            marginTop="60px"
            marginBottom="20px"
          />
          <FormInput
            placeholder={t("Contact.LastName")}
            type="text"
            name="lastName"
            marginBottom="20px"
          />
          <FormInput
            placeholder={t("Contact.EMail")}
            type="email"
            name="email"
            marginBottom="20px"
          />
          <FormInput
            placeholder={t("Contact.Message")}
            name="message"
            type="textarea"
            marginBottom="45px"
            multiline
          />
        </Form>
      </FormContainer>
    </>
  );
};

export default Contact;
