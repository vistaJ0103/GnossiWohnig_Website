import { useTranslation } from "react-i18next";
import { useState } from "react";
import Text from "../../../Atoms/Text";
import RegisterForm from "./RegisterForm";
import PasswordCheckbox from "../PasswordCheckbox";
import AuthInput from "../AuthInput";

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Text size="20px">{t("Auth.RegisterTitle")}</Text>
      <RegisterForm>
        <AuthInput
          placeholder={t("Auth.Email")}
          type="text"
          name="email"
          marginTop="30px"
          marginBottom="10px"
        />
        <AuthInput
          placeholder={t("Auth.Password")}
          type={showPassword ? "text" : "password"}
          name="password1"
          marginBottom="5px"
        />
        <AuthInput
          placeholder={t("Auth.Password")}
          type={showPassword ? "text" : "password"}
          name="password2"
          marginBottom="5px"
        />
        <PasswordCheckbox
          id="passwordCheckbox"
          name="passwordCheckbox"
          value={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
          label={t("Auth.ShowPassword")}
        />
      </RegisterForm>
    </>
  );
};

export default Register;
