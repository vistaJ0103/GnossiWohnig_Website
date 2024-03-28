import styled from "styled-components";

export const SubmitButton = styled.button`
  border: 0;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
  width: fit-content;
  padding: 12px 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.3);

  @media screen and (max-width: 768px) {
    padding: 10px 15px;
  }
`;

export const Spinner = styled.div`
  border: 3px solid;
  border-color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  border-top: 3px solid;
  border-top-color: ${(props) => props.theme.colors.primary};
  width: 16px;
  height: 16px;
  margin: auto;
  -webkit-animation: spin 1.5s linear infinite; /* Safari */
  animation: spin 1.5s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
