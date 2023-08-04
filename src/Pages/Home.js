import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RadioButton from "../Components/Molecules/RadioButton";
import Checkbox from "../Components/Molecules/Checkbox";
import Carousel from "../Components/Organisms/Carousel/Carousel";
import Row from "../Components/Atoms/Row";
import Column from "../Components/Atoms/Column";
import Text from "../Components/Atoms/Text";
import Divider from "../Components/Atoms/Divider";
import Section from "../Components/Atoms/Section";

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
  1440: { items: 1 },
  1920: { items: 1 },
};

const Home = () => {
  const { t } = useTranslation();
  const [radioOption, setRadioOption] = useState("option1");
  const [markedOptions, setMarkedOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleRadioChange = (value) => {
    setRadioOption(value);
  };

  const handleCheckboxChange = (id) => {
    markedOptions[id]
      ? setMarkedOptions({ ...markedOptions, [id]: false })
      : setMarkedOptions({ ...markedOptions, [id]: true });
  };

  const items = [
    <Row marginTop="20px">
      <Text
        size="36px"
        sizeTablet="25px"
        sizeMobile="17px"
        marginLeft="30px"
        color="#000000"
        transform="uppercase"
        align="left"
        lineHeightMobile="2"
      >
        {t("Home.Carousel.Title")}
      </Text>
      <Divider width="97%" />
      <Column width="40%">
        <Text>sec 1</Text>
      </Column>
      <Column width="40%">
        <Text>sec 2</Text>
      </Column>
    </Row>,
    <Row marginTop="20px">
      <Column>
        <Text>sec 3</Text>
      </Column>
      <Column>
        <Text>sec 4</Text>
      </Column>
    </Row>,
    <Row marginTop="20px">
      <Column>
        <Text>sec 5</Text>
      </Column>
      <Column>
        <Text>sec 6</Text>
      </Column>
    </Row>,
  ];

  return (
    <>
      <Section
        pt="200px"
        pb="100px"
        widthMobile="80%"
        widthTablet="80%"
        width="60%"
      >
        <Row isRow isRowOnMobile>
          <Column width="45%" marginBottom="50px" marginBottomMobile="10px">
            <RadioButton
              id="option1"
              name="radioOption"
              label={t("Home.Radiobutton.Option1")}
              checked={radioOption === "option1"}
              onChange={handleRadioChange}
            />
            <RadioButton
              id="option2"
              name="radioOption"
              label={t("Home.Radiobutton.Option2")}
              checked={radioOption === "option2"}
              onChange={handleRadioChange}
            />
            <p>{radioOption + " selected"}</p>
          </Column>
          <Column width="45%">
            <Checkbox
              id="option1"
              name="option1"
              label={t("Home.Checkbox.Option1")}
              value={markedOptions["option1"]}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              id="option2"
              name="option2"
              label={t("Home.Checkbox.Option2")}
              value={markedOptions["option2"]}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              id="option3"
              name="option3"
              label={t("Home.Checkbox.Option3")}
              value={markedOptions["option3"]}
              onChange={handleCheckboxChange}
            />
            {markedOptions["option1"] && <p>{"option1" + " selected"}</p>}
            {markedOptions["option2"] && <p>{"option2" + " selected"}</p>}
            {markedOptions["option3"] && <p>{"option3" + " selected"}</p>}
          </Column>
        </Row>
      </Section>
      <Section widthMobile="80%" widthTablet="80%" width="60%">
        <Carousel items={items} responsive={responsive} />
      </Section>
    </>
  );
};

export default Home;
