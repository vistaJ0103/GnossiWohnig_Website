import styled from "styled-components";
import { device } from "./Devices";

const Image = styled.img`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  display: block;
  margin-left: ${(props) => props.marginLeft || "auto"};
  margin-right: ${(props) => props.marginRight || "auto"};
  lazy="loading" 

    



  @media ${device.tablet} {
    width: ${(props) => props.widthTablet || props.width || "auto"};
    height: ${(props) => props.heightTablet || props.height || "auto"};
  }

  @media ${device.mobile} {
    width: ${(props) =>
      props.widthMobile || props.widthTablet || props.width || "auto"};
    height: ${(props) =>
      props.heightMobile || props.heightTablet || props.height || "auto"};
  }
`;

export default Image;
