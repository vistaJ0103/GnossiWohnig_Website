import React, { useState } from "react";
import { SubmitButton, ButtonContent, Spinner } from "../Buttons";
import Text from "../../../Atoms/Text";
import { useTranslation } from "react-i18next";
import {
  useAuthErrStore,
  usePasswordResetSuccessStore,
} from "../../../../stateManager";
import { resetPassword } from "../../../../firebaseProvider";

const PasswordResetForm = ({ children }) => {
  const [form, setform] = useState({
    email: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [showSpinner, setShowSpinner] = useState();
  const authErrorMsg = useAuthErrStore((state) => state.err);
  const passwordResetSuccess = usePasswordResetSuccessStore(
    (state) => state.res
  );
  const [regTriggered, setRegTriggered] = useState(false);
  const { t } = useTranslation();

  const getErrMsg = (err) => {
    switch (err) {
      case "auth/invalid-email":
        return t("Auth.InvalidEmail");
      case "auth/user-not-found":
        return t("Auth.UserNotFound");
      case "auth/user-disabled":
        return t("Auth.UserDisabled");
      default:
        return t("Auth.UndefinedError");
    }
  };

  if (regTriggered && authErrorMsg) {
    setRegTriggered(false);
    setShowSpinner(false);
    setErrorMessage(authErrorMsg);
  }

  if (regTriggered && passwordResetSuccess) {
    setRegTriggered(false);
    setShowSpinner(false);
    setShowSuccess(t("Auth.PasswordResetSuccess"));
  }

  const handleFormChange = (name, value) => {
    setform({ ...form, [name]: value });
  };

  const handlePasswordReset = () => {
    setErrorMessage("");
    if (form.email === "") {
      setShowEmptyError(true);
    } else {
      setRegTriggered(true);
      setShowSpinner(true);
      resetPassword(form.email);
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
          <SubmitButton>
            <ButtonContent>
              <Spinner />
            </ButtonContent>
          </SubmitButton>
        </>
      ) : (
        <>
          {childrenWithProps}
          <SubmitButton onClick={handlePasswordReset}>
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
          {getErrMsg(errorMessage)}
        </Text>
      )}
      {showSuccess && (
        <Text size="12px" color="#16702e" marginTop="10px">
          {t("Auth.PasswordResetSuccess")}
        </Text>
      )}
    </>
  );
};

export default PasswordResetForm;
