import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconButton } from "../../Components/Atoms/Button";
import DeleteIcon from "../../Assets/cross.png";

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  height: 32px;
  width: 300px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #b8b8b8;
  padding: 0 32px 0 16px;
  margin: 30px 5px;
`;

const FilterInput = ({ filterText, onFilter, onClear }) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        id="search"
        type="text"
        placeholder={t("Infos.FilterBy")}
        value={filterText}
        onChange={onFilter}
        aria-label={filterText}
      />
      <IconButton
        icon={DeleteIcon}
        onClick={onClear}
        opacity={"0.4"}
        aria-label="löschen"
      />
    </>
  );
};

export default FilterInput;
