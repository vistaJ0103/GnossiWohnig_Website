import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  border: 0;
  border-bottom: 1px solid;
  border-color: ${(props) =>
    props.showError
      ? props.theme.colors.red
      : props.theme.colors.inputBorderColor};
  padding: 3px;
  padding-bottom: 10px;
  font-size: 16px;
  display: block;
  color: ${(props) => props.theme.colors.black};
  margin-top: ${(props) => props.marginTop || "10px"};
  margin-bottom: ${(props) => props.marginBottom || "10px"};
  width: ${(props) => props.width || "100%"};
  &:focus {
    outline: none;
  }
`;

const AuthInput = (props) => {
  return (
    <InputField
      onChange={(e) => props.setValue(props.name, e.target.value)}
      {...props}
    />
  );
};

export default AuthInput;
