import styled from "styled-components";
import ExcelDownload from "../Components/Organisms/ExcelDownload/ExcelDownload";
import { device } from "../Components/Atoms/Devices";

const DownloadContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const DownloadButtonContainer = styled.div`
  text-align: center;
  padding: 200px 0px;
  @media ${device.mobileL} {
    padding: 100px 20px;
  }
`;

const DBDownload = () => {
  return (
    <DownloadContainer>
      <DownloadButtonContainer>
        <ExcelDownload collection="guestList" />
      </DownloadButtonContainer>
    </DownloadContainer>
  );
};

export default DBDownload;
