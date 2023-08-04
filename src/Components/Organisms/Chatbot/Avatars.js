import styled from "styled-components";
import nelinik from "../../Assets/nelinik.png";
import guest from "../../Assets/guest.jpg";

const AvatarImg = styled.img`
  height: 35px;
  width: auto;
  padding: 5px;
`;

export const NeliNikAvatar = () => {
  return <AvatarImg src={nelinik} alt="Avatar" />;
};

export const GuestAvatar = () => {
  return <AvatarImg src={guest} />;
};
