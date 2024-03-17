import styled from "styled-components";
import { device } from "./Devices";

const HeaderSection = styled.section`
  position: relative;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  padding-left: ${(props) => props.pl || 0};
  padding-top: ${(props) => props.pt || 0};
  padding-bottom: ${(props) => props.pb || 0};
  padding-right: ${(props) => props.pr || 0};
  margin: auto;
  background-image: url(${(props) => props.backgroundImage || "transparent"});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: ${(props) => props.backgroundSize || "100%"};
  background-color: #000000;
  opacity: 1;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  @media ${device.tablet} {
    width: ${(props) => props.widthTablet || props.width || "100%"};
    height: ${(props) => props.heightTablet || props.height || "auto"};
    padding-top: ${(props) => props.ptTablet || props.pt || "0px"};
    padding-bottom: ${(props) => props.pbTablet || props.pb || "0px"};
  }
  @media ${device.mobile} {
    width: ${(props) => props.widthMobile || "100%"};
    height: ${(props) => (props.footer && props.heightMobile) || props.height};
    padding-top: ${(props) =>
      props.ptMobile || props.ptTablet || props.pt || "0px"};
    padding-bottom: ${(props) =>
      props.pbMobile || props.pbTablet || props.pb || "0px"};
  }
`;

export default HeaderSection;
