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
  background: ${(props) => props.backgroundColor || props.theme.colors.primary};
  background-image: url(${(props) => props.backgroundImage || "transparent"});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: ${(props) => props.backgroundSize || "100%"};
  margin: auto;

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
