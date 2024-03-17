import React, { useState } from "react";
import {
  SubmitButton,
  ButtonContent,
  Spinner,
  ButtonContentBig,
} from "../Buttons";
import {
  createUserWithEmailAndPassword,
  useAuth,
} from "../../../../firebaseProvider";
import Text from "../../../Atoms/Text";
import { useTranslation } from "react-i18next";
import { useAuthErrStore } from "../../../../stateManager";

const RegisterForm = ({ children }) => {
  const [form, setform] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyError, setShowEmptyError] = useState(false);
  const authErrorMsg = useAuthErrStore((state) => state.err);
  const { isSignedIn } = useAuth();

  const { t } = useTranslation();

  const getErrMsg = (err) => {
    switch (err) {
      case "auth/email-already-in-use":
        return t("Auth.EmailInUse");
      case "auth/invalid-email":
        return t("Auth.InvalidEmail");
      case "auth/weak-password":
        return t("Auth.WeakPassword");
      default:
        return t("Auth.UndefinedError");
    }
  };

  if (showSpinner && isSignedIn) {
    setShowSpinner(false);
    setShowSuccess(t("Auth.RegisterSuccess"));
    setform({
      email: "",
      password1: "",
      password2: "",
    });
  }

  if (showSpinner && authErrorMsg) {
    setShowSpinner(false);
    setErrorMessage(getErrMsg(authErrorMsg));
  }

  const handleFormChange = (name, value) => {
    setErrorMessage(null);
    setform({ ...form, [name]: value });
  };

  const handleRegister = () => {
    if (form.email === "" || form.password1 === "" || form.password2 === "") {
      setShowEmptyError(true);
    } else if (form.password1 !== form.password2) {
      setErrorMessage(t("Auth.PasswordNotMatch"));
    } else {
      setShowSpinner(true);
      createUserWithEmailAndPassword(form.email, form.password1);
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
          <SubmitButton onClick={handleRegister}>
            <ButtonContentBig>
              <Text color="white" size="16px">
                {t("Auth.Register")}
              </Text>
            </ButtonContentBig>
          </SubmitButton>
        </>
      )}
      {errorMessage && (
        <Text size="12px" color="#c93328" marginTop="10px">
          {errorMessage}
        </Text>
      )}
      {showSuccess && (
        <Text size="12px" color="#16702e" marginTop="10px">
          {t("Auth.RegisterSuccess")}
        </Text>
      )}
    </>
  );
};

export default RegisterForm;
