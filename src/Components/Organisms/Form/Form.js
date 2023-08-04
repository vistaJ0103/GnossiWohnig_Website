import React, { useState } from "react";

import { SendButton, ArrowRight, ButtonContent, Spinner } from "./SendButton";
import { callCloudFunctionWithAppCheck } from "../../firebaseProvider";

const sendingStatus = {
  notSent: 0,
  pending: 1,
  sentWithSuccess: 2,
  sentWithError: 3,
};

const Form = (props) => {
  const [form, setform] = useState({
    name: "",
    contactPerson: "",
    email: "",
    message: "",
  });
  const [showError, setShowError] = useState(false);
  const [formSendingStatus, setFormSendingStatus] = useState(
    sendingStatus.notSent
  );

  const handleFormChange = (name, value) => {
    setShowError(false);
    setform({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (
      form.name === "" ||
      form.contactPerson === "" ||
      form.email === "" ||
      form.message === ""
    ) {
      setShowError(true);
    } else {
      setFormSendingStatus(sendingStatus.pending);
      callCloudFunctionWithAppCheck("sendEmail", form)
        .then((_) => setFormSendingStatus(sendingStatus.sentWithSuccess))
        .catch((_) => setFormSendingStatus(sendingStatus.sentWithError));
    }
  };

  const checkFieldError = (prop) => {
    return showError && form[prop] === "";
  };

  const childrenWithProps = React.Children.map(props.children, (child) => {
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

  const getFormContent = () => {
    switch (formSendingStatus) {
      case 1:
        return (
          <>
            {childrenWithProps}
            <SendButton onClick={handleSubmit}>
              <ButtonContent>
                <Spinner />
              </ButtonContent>
            </SendButton>
          </>
        );
      case 2:
        return props.successMessage;
      case 3:
        return props.errorMessage;
      default:
        return (
          <>
            {childrenWithProps}
            <SendButton onClick={handleSubmit}>
              <ButtonContent>
                {props.sendButtonText}
                <ArrowRight />
              </ButtonContent>
            </SendButton>
          </>
        );
    }
  };

  return (
    <div>
      {props.title}
      {getFormContent()}
    </div>
  );
};

export default Form;
