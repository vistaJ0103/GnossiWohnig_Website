import styled from "styled-components";

const ShadowBox = styled.div`
  border: ${(props) => `1px solid ${props.theme.colors.white}`};
  padding: ${(props) => props.padding || "20px 4px"};
  display: flex;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  min-height: ${(props) => props.minHeight || "auto"};
  flex-direction: column;
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.75);
  -webkit-box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.75);
  -moz-box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.75);
  @media screen and (max-width: 768px) {
    min-height: ${(props) => (!props.noHeight && props.minHeight) || "auto"};
  }
`;

export default ShadowBox;
