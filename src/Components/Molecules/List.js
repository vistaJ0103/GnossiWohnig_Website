import React from "react";
import styled from "styled-components";
import { device } from "../Atoms/Devices";

const StyledList = styled.ul`
  margin-left: ${(props) => props.left || "10px"};
  list-style-type: ${(props) => props.listStyleType || "disc"};

  @media ${device.mobile} {
    padding-inline-start: 20px;
  }
`;
const StyledListItem = styled.li`
  font-size: 18px;
  line-height: ${(props) => props.lineHight || "33px"};

  &::marker {
    font-size: 25px;
    color: ${(props) => props.theme.colors.primary};
  }
  @media ${device.tablet} {
    font-size: ${(props) => props.fontSizeTablet || props.fontSize || "15px"};
    line-height: ${(props) =>
      props.lineHightTablet || props.lineHight || "25px"};
  }
  @media ${device.mobile} {
    font-size: ${(props) =>
      props.fontSizeMobile || props.fontSizeTablet || props.fontSize || "13px"};
    line-height: ${(props) =>
      props.lineHightMobile ||
      props.lineHightTablet ||
      props.lineHight ||
      "20px"};
    &::marker {
      font-size: 20px;
    }
  }
`;

const List = (props) => {
  return (
    <StyledList left={props.left} listStyleType={props.listStyleType}>
      {props.list?.map((l, i) => (
        <StyledListItem
          lineHight={props.lineHight}
          paddingBottom={props.paddingBottom}
          paddingBottomTablet={props.paddingBottomTablet}
          sizeMobile={props.sizeMobile}
          key={i}
        >
          {l}
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default List;
