import React from "react";
import styled, { useTheme } from "styled-components";
import { BiUpload } from "react-icons/bi";
import Spinner from "./Spinner";

const FileUploadContainer = styled.div`
  height: 100px;
  width: 100px;
  margin: auto;
`;

const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

const FileInputLabel = styled.label`
  display: block;
  position: relative;
  width: 100px;
  height: 100px;
  outline: 3px dashed ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FileUpload = ({ onUploadHandler, loading }) => {
  const theme = useTheme();
  return (
    <FileUploadContainer>
      <FileInput
        type="file"
        name="file"
        id="file"
        multiple
        onChange={onUploadHandler}
      />
      <FileInputLabel htmlFor="file">
        {loading ? (
          <Spinner size="50px" color={theme.colors.primary} />
        ) : (
          <BiUpload size={50} color={theme.colors.primary} />
        )}
      </FileInputLabel>
    </FileUploadContainer>
  );
};

export default FileUpload;
