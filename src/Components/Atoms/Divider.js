import styled from "styled-components";

const Divider = styled.div`
  width: ${(props) => props.width || "80%"};
  margin: auto;
  background-color: ${(props) => props.theme.colors.primary};
  height: 3px;
  margin-bottom: 10px;
`;

export default Divider;
