import React from "react";
import { ToggleOptions, MultipleOptions } from "./OptionButtons";

export const ParticipateOptions = (props) => {
  return <ToggleOptions options={getParticipateOptions(props)} />;
};

export const ParticipantsPartOptions = (props) => {
  let options = [];
  /*eslint-disable */
  props.peopleNames.map((name) => {
    options.push({
      id: name,
      text: name,
    });
  });
  /*eslint-enable */

  return (
    <MultipleOptions
      options={options}
      handler={props.actionProvider.handleParticipantsSelected}
    />
  );
};

export const ParticipantsOnlyOneOptions = (props) => {
  let options = [];
  /*eslint-disable */
  props.peopleNames.map((name) => {
    options.push({
      id: name,
      handler: props.actionProvider.handleParticipantsSelected,
      text: name,
    });
  });
  /*eslint-enable */

  return <ToggleOptions options={options} />;
};

const getParticipateOptions = (props) => {
  let options = [];

  if (props.peopleNames.length === 1) {
    options.push({
      text: "Ja, ich melde mich an",
      handler: props.actionProvider.handleParticipantsPosOnlyOne,
      id: 1,
    });
    options.push({
      text: "Ja und ich nehme eine Begleitung mit",
      handler: props.actionProvider.handleParticipantsBeg,
      id: 2,
    });
    options.push({
      text: "Ich kann nicht kommen",
      handler: props.actionProvider.handleParticipantsNeg,
      id: 3,
    });
  } else if (props.peopleNames.length === 2) {
    options.push({
      text: "Ja, wir melden uns an",
      handler: props.actionProvider.handleParticipantsPosMultiplePeople,
      id: 1,
    });
    options.push({
      text: "Nur einer von uns kann kommen",
      handler: props.actionProvider.handleParticipantsOnlyOne,
      id: 2,
    });
    options.push({
      text: "Wir können nicht kommen",
      handler: props.actionProvider.handleParticipantsNeg,
      id: 3,
    });
  } else {
    options.push({
      text: "Ja, wir melden uns an",
      handler: props.actionProvider.handleParticipantsPosMultiplePeople,
      id: 1,
    });
    options.push({
      text: "Nicht alle von uns können kommen",
      handler: props.actionProvider.handleParticipantsPart,
      id: 2,
    });
    options.push({
      text: "Wir können nicht kommen",
      handler: props.actionProvider.handleParticipantsNeg,
      id: 3,
    });
  }
  return options;
};
