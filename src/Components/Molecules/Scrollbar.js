import React from "react";
import styled from "styled-components";
import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import { device } from "../Atoms/Devices";

const PerfectScrollbarStyled = styled(PerfectScrollbar)`
  .ps__thumb-y {
    background-color: ${(props) => props.theme.colors.primary};
    width: 10px;
  }
  .ps__rail-y {
    background-color: ${(props) => props.theme.colors.lightgrey};
  }
`;

const ScrollBarContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || "400px"};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.75);
  padding: 2px 0px;
  @media ${device.tablet} {
    height: ${(props) => props.tabletHeight || "200px"};
  }
  @media ${device.mobile} {
    height: ${(props) => props.mobileHeight || "100px"};
  }
`;

const ScrollBar = (props) => {
  return (
    <ScrollBarContainer
      height={props.height}
      tabletHeight={props.tabletHeight}
      mobileHeight={props.mobileHeight}
    >
      <PerfectScrollbarStyled>{props.children}</PerfectScrollbarStyled>
    </ScrollBarContainer>
  );
};

export default ScrollBar;
