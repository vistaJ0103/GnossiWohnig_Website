import React from "react";
import { useTranslation } from "react-i18next";
import Row from "../../Components/Atoms/Row";
import Column from "../../Components/Atoms/Column";
import Tick from "../../Assets/tick.png";
import Text from "../../Components/Atoms/Text";
import { CustomList } from "../../Components/Molecules/List";

const AdApp = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Column width="30%"></Column>
      <Column width="30%">
        <CustomList
          marker={Tick}
          list={[
            <Text align="left">{t("Home.AppArgue1")}</Text>,
            <Text>{t("Home.AppArgue2")}</Text>,
            <Text>{t("Home.AppArgue3")}</Text>,
          ]}
        />
      </Column>
      <Column width="30%"></Column>
    </Row>
  );
};

export default AdApp;
