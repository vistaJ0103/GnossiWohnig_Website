import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { device } from "../../Components/Atoms/Devices";
import Row from "../../Components/Atoms/Row";
import Column from "../../Components/Atoms/Column";
import Card from "../../Components/Molecules/Card";
import { getCollection } from "../../firebaseProvider";
import Scrollbar from "../../Components/Molecules/Scrollbar";

const SubTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
  color: ${(props) => props.theme.colors.white};
  display: block;

  @media ${device.tablet} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  @media ${device.mobile} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const FreeObjects = () => {
  const { t } = useTranslation();
  const [freeObjects, setFreeObjects] = useState();

  if (freeObjects == null) {
    getCollection("freeObjects").then((data) => {
      setFreeObjects(data);
    });
  }

  return (
    <>
      <Row justify="center">
        <SubTitle>{t("Home.FreeObjects")}</SubTitle>
      </Row>
      <Row justify="center">
        <Column width="60%">
          {freeObjects ? (
            <Scrollbar height="250px" heightMobile="40px" heightTablet="50px">
              {freeObjects.map((element) => (
                <Card key={element.doc} data={element} />
              ))}
            </Scrollbar>
          ) : (
            <p>noObjects</p>
          )}
        </Column>
      </Row>
    </>
  );
};

export default FreeObjects;
