import React, { useState } from "react";
import { MultipleToggleOptions } from "./OptionButtons";
import { getDocument } from "../../../firebaseProvider";

export const FoodOptions = (props) => {
  const options = getOptions();
  const [regPeople, setRegPeople] = useState();

  if (!regPeople) {
    getDocument("guestList", props.actionProvider.doc).then((res) =>
      setRegPeople(res.registered)
    );
  }

  return regPeople ? (
    <MultipleToggleOptions
      titles={regPeople}
      options={options}
      handler={
        regPeople.length > 1
          ? props.actionProvider.handleFoodMultiplePeople
          : props.actionProvider.handleFoodOnePerson
      }
    />
  ) : (
    <div></div>
  );
};

const getOptions = () => {
  let options = [];
  options.push({
    text: "Fisch",
    id: 1,
  });
  options.push({
    text: "Fleisch",
    id: 2,
  });
  options.push({
    text: "Vegetarisch",
    id: 3,
  });
  options.push({
    text: "Vegan",
    id: 4,
  });

  return options;
};
