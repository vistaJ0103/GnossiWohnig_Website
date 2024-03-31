import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { device } from "../../Components/Atoms/Devices";
import Row from "../../Components/Atoms/Row";
import Column from "../../Components/Atoms/Column";
import Card from "../../Components/Molecules/Card";
import {
  checkIfProUser,
  streamCollection,
  useAuth,
} from "../../firebaseProvider";
import SwitchButton from "../../Components/Molecules/SwitchButton";
import Text from "../../Components/Atoms/Text";
import DummyCard from "../../Components/Molecules/DummyCard";
import Spinner from "../../Components/Atoms/Spinner";

const SubTitle = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
  display: block;
  font-weight: normal;

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
  const [objectsInView, setObjectsInView] = useState(null);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [freeObjects, setFreeObjects] = useState(null);
  const [addSnapshots, setAddSnapshots] = useState(null);
  const [modSnapshots, setModSnapshots] = useState(null);
  const [delSnapshots, setDelSnapshots] = useState(null);
  const [proUser, setProUser] = useState(null);
  const { user } = useAuth();

  if (proUser == null && user) {
    checkIfProUser(user.uid).then((res) => {
      setProUser(res);
    });
  }

  const sortObjects = (obj) => {
    var res = null;

    if (obj !== null) {
      res = Array.from(obj).sort((x, y) => {
        return x.timestamp - y.timestamp;
      });
      res = res.reverse();
    }
    return res;
  };

  useEffect(() => {
    streamCollection(
      "freeObjects",
      setAddSnapshots,
      setModSnapshots,
      setDelSnapshots
    );
  }, []);

  useEffect(() => {
    if (freeObjects === null) {
      const sortedAddSnap = sortObjects(addSnapshots);
      setFreeObjects(sortedAddSnap);
      setObjectsInView(sortedAddSnap);
    } else {
      addSnapshots.forEach((obj) => {
        setFreeObjects([obj, ...freeObjects]);
      });
    }
  }, [addSnapshots]);

  useEffect(() => {
    if (modSnapshots) {
      modSnapshots.forEach((obj) => {
        var index = null;

        for (var i = 0; i < freeObjects.length; i++) {
          if (freeObjects[i].id === obj.id) {
            index = i;
          }
        }
        if (index !== null) {
          let updateFreeObjects = [...freeObjects];
          updateFreeObjects[index] = obj;
          setFreeObjects(updateFreeObjects);
        }
      });
    }
  }, [modSnapshots]);

  useEffect(() => {
    if (delSnapshots) {
      delSnapshots.forEach((obj) => {
        var index = null;

        for (var i = 0; i < freeObjects.length; i++) {
          if (freeObjects[i].id === obj.id) {
            index = i;
          }
        }

        if (index !== null) {
          let updateFreeObjects = [...freeObjects];
          updateFreeObjects.splice(index, 1);
          setFreeObjects(updateFreeObjects);
        }
      });
    }
  }, [delSnapshots]);

  useEffect(() => {
    if (switchChecked) {
      var res = [];
      freeObjects.forEach((element) => {
        if (element["objectInZH"]) res.push(element);
      });
      setObjectsInView(res);
    } else {
      setObjectsInView(freeObjects);
    }
  }, [freeObjects, switchChecked]);

  const filterZHObjects = (value) => {
    setSwitchChecked(value);
    if (value) {
      var res = [];
      freeObjects.forEach((element) => {
        if (element["objectInZH"]) res.push(element);
      });
      setObjectsInView(res);
    } else {
      setObjectsInView(freeObjects);
    }
  };

  return (
    <>
      <Row justify="center" isRow={true} isRowOnMobile={true}>
        <SubTitle>{t("Home.FreeObjects")}</SubTitle>
      </Row>
      <Row justify="center" isRow={true} isRowOnMobile={true}>
        <Column width="60%">
          <Row>
            <Column marginLeft="10px">
              <SwitchButton
                onChange={filterZHObjects}
                checked={switchChecked}
              />
              <Text
                size="14px"
                display="inline"
                marginLeft="10px"
                lineHeight="1.5"
              >
                {t("Home.OnlyZHCity")}
              </Text>
            </Column>
          </Row>
          {objectsInView ? (
            objectsInView.length === 0 ? (
              <Text marginTop="50px" size="18px">
                {t("Home.NoObjects")}
              </Text>
            ) : (
              objectsInView.map((element) =>
                proUser ? (
                  <Card key={element.id} data={element} />
                ) : (
                  <DummyCard key={element.id} data={element} />
                )
              )
            )
          ) : (
            <Row justify="center" isRow={true}>
              <Column marginTop="50px">
                <Spinner />
              </Column>
            </Row>
          )}
        </Column>
      </Row>
    </>
  );
};

export default FreeObjects;
