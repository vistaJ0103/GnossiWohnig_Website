import React, { useState } from "react";
import { SubmitButton, Spinner } from "../Buttons";
import {
  signInWithEmailAndPassword,
  useAuth,
} from "../../../../firebaseProvider";
import Text from "../../../Atoms/Text";
import { useTranslation } from "react-i18next";
import { useAuthErrStore } from "../../../../stateManager";
import styled from "styled-components";

export const ButtonContent = styled.div`
  width: 40px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LoginForm = ({ children }) => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const authErrorMsg = useAuthErrStore((state) => state.err);
  const { user } = useAuth();

  const getErrMsg = (err) => {
    switch (err) {
      case "auth/invalid-email":
        return t("Auth.InvalidEmail");
      case "auth/wrong-password":
        return t("Auth.WrongPassword");
      case "auth/user-not-found":
        return t("Auth.UserNotFound");
      case "auth/user-disabled":
        return t("Auth.UserDisabled");
      default:
        return t("Auth.UndefinedError");
    }
  };

  if (showSpinner && user && !user.emailVerified) {
    setShowSpinner(false);
    setErrorMessage(t("Auth.EmailNotVerified"));
  }

  if (showSpinner && user && user.emailVerified) {
    setShowSpinner(false);
  }

  if (showSpinner && authErrorMsg) {
    setShowSpinner(false);
    setErrorMessage(getErrMsg(authErrorMsg));
  }

  const handleFormChange = (name, value) => {
    setform({ ...form, [name]: value });
  };

  const handleLogin = () => {
    setErrorMessage(null);
    if (form.email === "" || form.password === "") {
      setShowEmptyError(true);
    } else {
      setShowSpinner(true);
      signInWithEmailAndPassword(form.email, form.password);
    }
  };

  const checkFieldError = (prop) => {
    return showEmptyError && form[prop] === "";
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const value = form[child.props.name];
      return React.cloneElement(child, {
        value: value,
        setValue: handleFormChange,
        showError: checkFieldError(child.props.name),
      });
    }
    return child;
  });

  return (
    <>
      {showSpinner === true ? (
        <>
          {childrenWithProps}
          <SubmitButton aria-label="Lädt">
            <ButtonContent>
              <Spinner />
            </ButtonContent>
          </SubmitButton>
        </>
      ) : (
        <>
          {childrenWithProps}
          <SubmitButton onClick={handleLogin} aria-label="Login">
            <ButtonContent>
              <Text color="white" size="16px">
                {t("Auth.Login")}
              </Text>
            </ButtonContent>
          </SubmitButton>
        </>
      )}
      {errorMessage && (
        <Text size="12px" color="#c93328" marginTop="10px">
          {errorMessage}
        </Text>
      )}
    </>
  );
};

export default LoginForm;
