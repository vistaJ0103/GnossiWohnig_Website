import styled from "styled-components";
import { device } from "./Devices";

export const TextButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 35px;
  display: inline-block;
  margin: 0px 10px;
  box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.3);
  border-radius: 5px;
  object-fit: contain;
  

  @media ${device.mobile} {
    height: 30px;
  }
`;

const Icon2 = styled.img`
  height: ${(props) => props.size || "20px"};
  width: ${(props) => props.size || "20px"};
  display: inline-block;
  opacity: ${(props) => props.opacity || "1.0"};
`;

const Link = styled.a`
  margin: 5px;
`;

export const ButtonWithIcon = styled.button`
  border: 0;
  cursor: pointer;
  align-items: center;
  background-color: #ffffff;
  width: fit-content;
`;

export const ButtonWithRoundIcon = styled.button`
  border: 0;
  border-radius: 25px;
  cursor: pointer;
  align-items: center;
  background-color: transparent;
  width: 40px;
  height: 40px;
  box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.3);
  padding: 0px;
`;

export const IconLinkButton = ({ link, icon, alt, ariaLabel }) => {
  return (
    <Link href={link} aria-label={ariaLabel}>
      <Icon src={icon} width={100} height={35} alt={alt} />
    </Link>
  );
};

export const IconButton = ({ onClick, icon, opacity, size, alt}) => {
  return (
    <ButtonWithIcon onClick={onClick}>
      <Icon2 src={icon} opacity={opacity} size={size} width={size} height={size} alt={alt} />
    </ButtonWithIcon>
  );
};

export const RoundIconButton = ({ onClick, icon, opacity, alt}) => {
  return (
    <ButtonWithRoundIcon onClick={onClick}>
      <Icon2 src={icon} opacity={opacity} size="40px" width="40px" height="40px" alt={alt} />
    </ButtonWithRoundIcon>
  );
};
