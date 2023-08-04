import React, { useState } from "react";
import { ToggleOptions } from "./OptionButtons";
import { getDocument } from "../../../firebaseProvider";

export const BreakfastOptions = (props) => {
  const [regPeople, setRegPeople] = useState();

  if (!regPeople) {
    getDocument("guestList", props.actionProvider.doc).then((res) =>
      setRegPeople(res.registered)
    );
  }

  return regPeople ? (
    <ToggleOptions options={getParticipateOptions(regPeople, props)} />
  ) : (
    <div></div>
  );
};

const getParticipateOptions = (regPeople, props) => {
  let options = [];

  if (regPeople.length === 1) {
    options.push({
      text: "Ja",
      handler: props.actionProvider.handleBreakfastPosOnlyOne,
      id: 1,
    });
    options.push({
      text: "Weiss noch nicht",
      handler: props.actionProvider.handleBreakfastUnclearOnlyOne,
      id: 2,
    });
    options.push({
      text: "Nein",
      handler: props.actionProvider.handleBreakfastNegOnlyOne,
      id: 3,
    });
  } else if (regPeople.length === 2) {
    options.push({
      text: "Ja",
      handler: props.actionProvider.handleBreakfastPosMultiplePeople,
      id: 1,
    });
    options.push({
      text: "Wissen wir noch nicht",
      handler: props.actionProvider.handleBreakfastUnclearMultiplePeople,
      id: 2,
    });
    options.push({
      text: "Nur einer von uns",
      handler: props.actionProvider.handleBreakfastOnlyOne,
      id: 3,
    });
    options.push({
      text: "Nein",
      handler: props.actionProvider.handleBreakfastNegMultiplePeople,
      id: 4,
    });
  } else {
    options.push({
      text: "Ja",
      handler: props.actionProvider.handleBreakfastPosMultiplePeople,
      id: 1,
    });
    options.push({
      text: "Wissen wir noch nicht",
      handler: props.actionProvider.handleBreakfastUnclearMultiplePeople,
      id: 2,
    });
    options.push({
      text: "Nicht alle von uns",
      handler: props.actionProvider.handleBreakfastPart,
      id: 3,
    });
    options.push({
      text: "Nein",
      handler: props.actionProvider.handleBreakfastNegMultiplePeople,
      id: 4,
    });
  }
  return options;
};
