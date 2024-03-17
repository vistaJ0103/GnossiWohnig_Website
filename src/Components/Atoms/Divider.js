import styled from "styled-components";

const Divider = styled.div`
  width: ${(props) => props.width || "80%"};
  margin-bottom: ${(props) => props.marginBottom || "auto"};
  margin-top: ${(props) => props.marginTop || "auto"};
  background-color: ${(props) => props.color || props.theme.colors.primary};
  height: ${(props) => props.height || "3px"};
`;

export default Divider;
