import React from "react";
import styled from "styled-components";
import Row from "../Atoms/Row";
import Column from "../Atoms/Column";
import Image from "../Atoms/Image";
import DummyHouse from "../../Assets/dummy_house.png";

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const ObjectCard = ({ data }) => {
  const imgUrl = data.previewImgUrl === "" ? DummyHouse : data.previewImgUrl;

  return (
    <CardContainer>
      <Row>
        <Column width="30%">
          <Image width="120px" height="120px" src={imgUrl}></Image>
        </Column>
        <Column width="65%">
          <Row>{data.description}</Row>
          <Row>{data.price}</Row>
        </Column>
      </Row>
    </CardContainer>
  );
};

export default ObjectCard;
