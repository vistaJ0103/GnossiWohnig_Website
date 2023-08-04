import styled from "styled-components";
import { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "./alice-carousel.css";

import ArrowLeft from "../../../Assets/Icons/ArrowLeft.png";
import ArrowRight from "../../../Assets/Icons/ArrowRight.png";
import ShadowBox from "./ShadowBox";

const StyledCarousel = styled.div`
  width: 85%;
  margin: auto;
  @media screen and (max-width: 568px) {
    width: 78%;
  }
`;

const ArrowContainer = styled.div`
  margin-left: ${(props) => props.marginLeft || 0};
  margin-right: ${(props) => props.marginRight || 0};
  & > * {
    cursor: pointer;
  }
  @media screen and (max-width: 568px) {
    margin-left: 0;
    padding: 0 8px;
  }
`;

const Carousel = (props) => {
  const ref = useRef();

  return (
    <ShadowBox>
      <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <ArrowContainer marginLeft="10px">
          <img
            src={ArrowLeft}
            width="20px"
            height="40px"
            onClick={() => ref.current?.slidePrev()}
            alt="arrow"
          />
        </ArrowContainer>
        <StyledCarousel>
          <AliceCarousel
            mouseTracking
            ref={ref}
            infinite
            items={props.items}
            disableButtonsControls
            responsive={props.responsive}
            controlsStrategy="alternate"
          />
        </StyledCarousel>
        <ArrowContainer marginRight="20px">
          <img
            src={ArrowRight}
            width="20px"
            height="40px"
            onClick={() => ref.current?.slideNext()}
            alt="arrow"
          />
        </ArrowContainer>
      </div>
    </ShadowBox>
  );
};

export default Carousel;
