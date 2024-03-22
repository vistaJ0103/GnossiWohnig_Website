import { useTranslation } from "react-i18next";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import Text from "../../Atoms/Text";
import { TextButton } from "../../Atoms/Button";
import Row from "../../Atoms/Row";
import Divider from "../../Atoms/Divider";
import Login from "./Login/Login";
import Register from "./Register/Register";
import PasswordReset from "./PasswordReset/PasswordReset";
import SocialMediaRegister from "./SocialMediaRegister";

const AuthContainer = styled.div`
  margin: 20px 20px;
`;

const FormContainer = styled.div`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  margin: 30px 0px 0px 0px;
`;

const Auth = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [formState, setFormState] = useState("Login");

  const getForm = () => {
    if (formState === "Login") {
      return <Login />;
    } else if (formState === "Register") {
      return <Register />;
    } else if (formState === "PasswordReset") {
      return <PasswordReset />;
    } else {
      return <Login />;
    }
  };

  return (
    <AuthContainer>
      <FormContainer>{getForm()}</FormContainer>

      {formState === "Login" && (
        <Row>
          <TextButton
            aria-label="Registrieren"
            onClick={() => setFormState("Register")}
          >
            <Text color={theme.colors.primary} size="12px" weight="bold">
              {t("Auth.Register")}
            </Text>
          </TextButton>
          <TextButton
            aria-label="Passwort zurücksetzen"
            onClick={() => setFormState("PasswordReset")}
          >
            <Text color={theme.colors.primary} size="12px" weight="bold">
              {t("Auth.ForgotPassword")}
            </Text>
          </TextButton>
        </Row>
      )}
      {formState !== "Login" && (
        <Row>
          <TextButton aria-label="Login" onClick={() => setFormState("Login")}>
            <Text color={theme.colors.primary} size="12px" weight="bold">
              {t("Auth.Login")}
            </Text>
            <Text></Text>
          </TextButton>
        </Row>
      )}
      <Divider
        height="1px"
        width="100%"
        color="#b0b0b0"
        marginTop="40px"
        marginBottom="30px"
      />
      <SocialContainer>
        <SocialMediaRegister />
      </SocialContainer>
    </AuthContainer>
  );
};

export default Auth;
