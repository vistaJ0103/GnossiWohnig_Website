import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const List = styled.ul`
  list-style-type: none;
  margin: 30px 0px 40px 0px;
`;

const ListItem = styled.li`
  font-size: 14px;
  padding: 5px;
`;

const BoldText = styled.div`
  font-weight: 600;
`;

const Details = ({ item }) => {
  const { t } = useTranslation();

  const typeText = (type) => {
    var res = [];
    if (type.subsidized) {
      res.push(t("Infos.Subsidized"));
    }
    if (type.selfSupporting) {
      res.push(t("Infos.SelfSupporting"));
    }
    return res.join(", ");
  };

  return (
    <List>
      <ListItem>
        <>
          <BoldText>{t("Infos.PlacesZH")}</BoldText>
          {"Kreis " + item.zurichPlaces.join(", ")}
        </>
      </ListItem>
      <ListItem>
        <>
          <BoldText>{t("Infos.OtherPlaces")}</BoldText>
          {item.otherPlaces.join(", ")}
        </>
      </ListItem>
      <ListItem>
        <>
          <BoldText>{t("Infos.AppSize")}</BoldText>
          {item.flatSizes.join(", ")}
        </>
      </ListItem>
      {item.houseSizes.lenght === 0 && (
        <ListItem>
          <>
            <BoldText>{t("Infos.HouseSize")}</BoldText>
            {item.houseSizes.join(", ")}
          </>
        </ListItem>
      )}
      <ListItem>
        <>
          <BoldText>{t("Infos.Specials")}</BoldText>
          {item.specials}
        </>
      </ListItem>
      <ListItem>
        <>
          <BoldText>{t("Infos.Type")}</BoldText>
          {typeText(item.type)}
        </>
      </ListItem>
    </List>
  );
};

export default Details;
