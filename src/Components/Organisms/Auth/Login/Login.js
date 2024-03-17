import { useTranslation } from "react-i18next";
import { useState } from "react";
import Text from "../../../Atoms/Text";
import LoginForm from "./LoginForm";
import AuthInput from "../AuthInput";
import PasswordCheckbox from "../PasswordCheckbox";

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Text size="20px">{t("Auth.LoginTitle")}</Text>
      <LoginForm>
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
          name="password"
          marginBottom="5px"
        />
        <PasswordCheckbox
          id="passwordCheckbox"
          name="passwordCheckbox"
          value={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
          label={t("Auth.ShowPassword")}
        />
      </LoginForm>
    </>
  );
};

export default Login;
