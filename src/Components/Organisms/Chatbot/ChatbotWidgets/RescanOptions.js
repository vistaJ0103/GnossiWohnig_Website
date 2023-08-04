import React from "react";
import { ToggleOptions, RedirectButton } from "./OptionButtons";

export const RescanOptions = (props) => {
  const optionsOnePerson = [
    {
      id: 1,
      text: "An- / Abmeldung korrigieren",
      handler: props.actionProvider.handleRestartOnePerson,
    },
  ];

  const optionsMultiplePeople = [
    {
      id: 1,
      text: "An- / Abmeldung korrigieren",
      handler: props.actionProvider.handleRestartMultiplePeople,
    },
  ];

  return (
    <>
      <RedirectButton title="Weiter zur Webseite" link="/" />
      <ToggleOptions
        options={
          props.peopleNames.length > 1
            ? optionsMultiplePeople
            : optionsOnePerson
        }
      />
    </>
  );
};
