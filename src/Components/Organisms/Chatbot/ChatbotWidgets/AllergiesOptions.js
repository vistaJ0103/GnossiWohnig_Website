import React, { useState } from "react";
import { ToggleOptions } from "./OptionButtons";
import { getDocument } from "../../../firebaseProvider";

export const AllergiesOptions = (props) => {
  const [regPeople, setRegPeople] = useState();

  if (!regPeople) {
    getDocument("guestList", props.actionProvider.doc).then((res) =>
      setRegPeople(res.registered)
    );
  }

  const optionsOnePerson = [
    {
      id: 1,
      text: "Nein",
      handler: props.actionProvider.handleNoAllergiesOnePerson,
    },
    {
      id: 2,
      text: "Ja",
      handler: props.actionProvider.handleAllergiesOnePerson,
    },
  ];

  const optionsMultiplePeople = [
    {
      id: 1,
      text: "Nein",
      handler: props.actionProvider.handleNoAllergiesMultiplePeople,
    },
    {
      id: 2,
      text: "Ja",
      handler: props.actionProvider.handleAllergiesMultiplePeople,
    },
  ];

  return regPeople ? (
    <ToggleOptions
      options={regPeople.length > 1 ? optionsMultiplePeople : optionsOnePerson}
    />
  ) : (
    <div></div>
  );
};
