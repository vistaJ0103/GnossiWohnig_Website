import styled from "styled-components";
import Form from "../Components/Form/Form";
import FormInput from "../Components/Form/FormInput";
import { useTranslation } from "react-i18next";

const FormContainer = styled.div`
  padding: 0.5rem calc((100vw - 1000px) / 2);
  padding-top: 100px;
`;

const Contact = () => {
  const { t } = useTranslation();

  const title = <h1>{t("Contact.Title")}</h1>;

  const sendButtonText = <p>{t("Contact.SendNow")}</p>;

  const successMessage = (
    <>
      <p>{t("Contact.SuccessMessage1")}</p>
      <p>{t("Contact.SuccessMessage2")}</p>
    </>
  );

  const errorMessage = (
    <>
      <p>{t("Contact.ErrorMessage1")}</p>
      <p>{t("Contact.ErrorMessage2")}</p>
    </>
  );

  return (
    <FormContainer>
      <Form
        title={title}
        sendButtonText={sendButtonText}
        successMessage={successMessage}
        errorMessage={errorMessage}
      >
        <FormInput
          placeholder={t("Contact.Company")}
          type="text"
          name="name"
          marginTop="60px"
          marginBottom="20px"
          width="90%"
        />
        <FormInput
          placeholder={t("Contact.ContactPerson")}
          type="text"
          name="contactPerson"
          marginBottom="20px"
          width="90%"
        />
        <FormInput
          placeholder={t("Contact.EMail")}
          type="email"
          name="email"
          marginBottom="20px"
          width="90%"
        />
        <FormInput
          placeholder={t("Contact.Message")}
          name="message"
          type="textarea"
          marginBottom="45px"
          width="90%"
          multiline
        />
      </Form>
    </FormContainer>
  );
};

export default Contact;
