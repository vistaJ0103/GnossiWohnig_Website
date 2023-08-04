import React, { useState } from "react";
import styled from "styled-components";
import { setFile } from "../firebaseProvider";
import FileUpload from "../Components/FileUpload/FileUpload";

const UploadContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const SuccessMessage = styled.p`
  color: ${(props) => props.theme.colors.primary};
  margin: 0px;
  padding: 20px 0px 0px 0px;
  text-align: center;
`;

const FailMessage = styled.p`
  color: red;
  margin: 0px;
  padding: 20px 0px 0px 0px;
  text-align: center;
`;

const PaddingContainer = styled.div`
  padding-top: 150px;
`;

const DBUpload = () => {
  const [loading, setLoading] = useState();
  const [uploadRes, setUploadRes] = useState("pending");

  const photoUploadOnChangeHandler = (event) => {
    const photoFiles = event.target.files;
    if (photoFiles.length !== 0) {
      setLoading(true);
      setUploadRes("pending");
      let photoUploadProm = [];
      for (let i = 0; i < photoFiles.length; i++) {
        photoUploadProm.push(
          setFile("guestImages", "title", "Heiri", "Photo", photoFiles[i])
        );
      }

      Promise.all(photoUploadProm)
        .then(() => {
          setLoading(false);
          setUploadRes("success");
        })
        .catch(() => {
          setLoading(false);
          setUploadRes("fail");
        });
    }
  };

  return (
    <UploadContainer>
      <PaddingContainer>
        <FileUpload
          onUploadHandler={photoUploadOnChangeHandler}
          loading={loading}
        />
      </PaddingContainer>

      {uploadRes === "success" && (
        <SuccessMessage>erfolgreich hochgeladen</SuccessMessage>
      )}
      {uploadRes === "fail" && (
        <FailMessage>Hochladen fehlgeschlagen</FailMessage>
      )}
    </UploadContainer>
  );
};

export default DBUpload;
