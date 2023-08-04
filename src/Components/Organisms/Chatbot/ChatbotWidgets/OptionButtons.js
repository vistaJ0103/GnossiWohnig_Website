import React, { useState } from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const OptionsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const OptionsContainerEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const OptionButton = styled.button`
  padding: 0.5rem;
  border-radius: 25px;
  background: transparent;
  border: 1px solid #d6c5ab;
  margin: 3px;
  outline: none;
`;

const OptionButtonSelected = styled.button`
  padding: 0.5rem;
  border-radius: 25px;
  background: #f1f1f1;
  border: 1px solid #d6c5ab;
  margin: 3px;
  outline: none;
`;

const OptionTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  font-family: system-ui;
  font-variant-caps: normal;
  margin: 5px 0px;
`;

const OptionLink = styled(Link)`
  padding: 0.5rem;
  border-radius: 25px;
  background: transparent;
  border: 1px solid #d6c5ab;
  margin: 3px;
`;

const OptionLinkText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  font-family: system-ui;
  font-variant-caps: normal;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  color: black;
  margin: 0px;
`;

export const ToggleOptions = ({ options }) => {
  let optionsSelectedInit = {};
  /*eslint-disable */
  options.map((option) => {
    optionsSelectedInit[option.id] = false;
  });
  /*eslint-enable */
  const [selected, setSelected] = useState(optionsSelectedInit);

  const setSelectedOption = (id) => {
    if (selected[id]) {
      let tmpSelected = { ...selected };
      tmpSelected[id] = false;
      setSelected(tmpSelected);
    } else {
      let tmpSelected = optionsSelectedInit;
      tmpSelected[id] = true;
      setSelected(tmpSelected);
    }
  };

  const optionsMarkup = options.map((option) => (
    <ToggleOptionButtonContainer
      key={option.id}
      id={option.id}
      handler={option.handler}
      text={option.text}
      selected={selected}
      setSelected={setSelectedOption}
    />
  ));

  return <OptionsContainer>{optionsMarkup}</OptionsContainer>;
};

export const MultipleOptions = ({ options, handler }) => {
  let optionsSelectedInit = {};
  /*eslint-disable */
  options.map((option) => {
    optionsSelectedInit[option.id] = false;
  });
  /*eslint-enable */
  const [selected, setSelected] = useState(optionsSelectedInit);
  const setSelectedOption = (id) => {
    let tmpSelected = { ...selected };
    tmpSelected[id] = selected[id] ? false : true;
    setSelected(tmpSelected);
  };

  const triggerHandler = () => {
    handler(selected);
  };

  const optionsMarkup = options.map((option) => (
    <OptionButtonContainer
      key={option.id}
      id={option.id}
      handler={() => {}}
      text={option.text}
      selected={selected}
      setSelected={setSelectedOption}
    />
  ));

  return (
    <>
      <OptionsContainer>{optionsMarkup}</OptionsContainer>
      <OptionsContainerEnd>
        <OptionButtonContainer
          key="finish"
          handler={triggerHandler}
          text="weiter"
          selected={false}
        />
      </OptionsContainerEnd>
    </>
  );
};

export const MultipleToggleOptions = ({ titles, options, handler }) => {
  let optionsSelectedInit = {};
  /*eslint-disable */
  options.map((option) => {
    optionsSelectedInit[option.id] = false;
  });
  /*eslint-enable */

  let optionsSelectedPerTitleInit = {};
  /*eslint-disable */
  titles.map((title) => {
    optionsSelectedPerTitleInit[title] = optionsSelectedInit;
  });
  /*eslint-enable */

  const [selected, setSelected] = useState(optionsSelectedPerTitleInit);

  const triggerHandler = () => {
    handler(selected);
  };

  const setSelectedOption = (title, id) => {
    var tmpSelected = { ...selected[title] };
    tmpSelected[id] = tmpSelected[id] ? false : true;
    setSelected((state) => ({ ...state, [title]: tmpSelected }));
  };

  const optionsMarkup = (title) => {
    return options.map((option) => (
      <TitleOptionButtonContainer
        key={title + option.id.toString()}
        id={option.id}
        title={title}
        handler={() => {}}
        text={option.text}
        selected={selected}
        setSelected={setSelectedOption}
      />
    ));
  };

  return (
    <>
      {titles.map((title) => (
        <div key={title}>
          <OptionTitle>{title}</OptionTitle>
          <OptionsContainer>{optionsMarkup(title)}</OptionsContainer>
        </div>
      ))}
      <OptionsContainerEnd>
        <OptionButtonContainer
          key="finish"
          handler={triggerHandler}
          text="weiter"
          selected={false}
        />
      </OptionsContainerEnd>
    </>
  );
};

export const RedirectButton = ({ title, link }) => {
  return (
    <OptionsContainer>
      <OptionLink to={link}>
        <OptionLinkText>{title}</OptionLinkText>
      </OptionLink>
    </OptionsContainer>
  );
};

const ToggleOptionButtonContainer = ({
  id,
  handler,
  text,
  selected,
  setSelected,
}) => {
  const setOnClick = () => {
    if (selected !== false) {
      setSelected(id);
    }
    const selOptions = selected;
    selOptions[id] = true;
    handler(selOptions);
  };

  return selected[id] ? (
    <OptionButtonSelected onClick={setOnClick}>
      <OptionLinkText>{text}</OptionLinkText>
    </OptionButtonSelected>
  ) : (
    <OptionButton onClick={setOnClick}>
      <OptionLinkText>{text}</OptionLinkText>
    </OptionButton>
  );
};

const OptionButtonContainer = ({
  id,
  handler,
  text,
  selected,
  setSelected,
}) => {
  const setOnClick = () => {
    if (selected !== false) {
      setSelected(id);
    }
    handler(selected);
  };

  return selected[id] ? (
    <OptionButtonSelected onClick={setOnClick}>
      <OptionLinkText>{text}</OptionLinkText>
    </OptionButtonSelected>
  ) : (
    <OptionButton onClick={setOnClick}>
      <OptionLinkText>{text}</OptionLinkText>
    </OptionButton>
  );
};

const TitleOptionButtonContainer = ({
  id,
  title,
  handler,
  text,
  selected,
  setSelected,
}) => {
  const setOnClick = () => {
    if (selected !== false) {
      setSelected(title, id);
    }
    handler(selected);
  };

  return selected[title][id] ? (
    <OptionButtonSelected onClick={setOnClick}>{text}</OptionButtonSelected>
  ) : (
    <OptionButton onClick={setOnClick}>{text}</OptionButton>
  );
};
