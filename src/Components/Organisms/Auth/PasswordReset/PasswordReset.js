import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import Text from "../../../Atoms/Text";
import PasswordResetForm from "./PasswordResetForm";
import AuthInput from "../AuthInput";

const PasswordReset = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Text size="20px" color={theme.colors.primary}>
        {t("Auth.LoginTitle")}
      </Text>
      <PasswordResetForm>
        <AuthInput
          placeholder={t("Auth.Email")}
          type="text"
          name="email"
          marginTop="30px"
          marginBottom="10px"
        />
      </PasswordResetForm>
    </>
  );
};

export default PasswordReset;
