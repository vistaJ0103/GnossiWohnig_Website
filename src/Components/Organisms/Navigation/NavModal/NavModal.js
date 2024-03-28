import styled from "styled-components";
import { device } from "../../../Atoms/Devices";
import { useOnClickOutside } from "../utils";
import { useRef, useState } from "react";
import FocusLock from "react-focus-lock";

const NavModalContent = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.navDropdownBGColor};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 25px 30px 30px 30px;
  margin-top: 30px;
  margin-right: 20px;
  right: 0;
  text-align: center;
  display: ${({ open }) => (open ? "block" : "none")};
  width: ${(props) => (props.width ? props.width : "300px")};

  @media ${device.mobile} {
    margin-right: 0px;
  }
`;

const Label = styled.p`
  margin: 0px;
  padding: 0px;
  display: inline-block;
`;

const NavModalButton = styled.button`
  width: 100px;
  border-radius: 4px;
  background: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  padding: 10px 20px;
  border: solid 1px
    ${(props) =>
      props.active ? props.theme.colors.primary : props.theme.colors.white};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  display: inline-block;
  text-align: center;
  margin-left: 20px;

  @media ${device.mobile} {
    margin: 10px 50px 0px 0px;
  }
`;

const NavIconButton = styled.button`
  width: 100px;
  margin: 0px;
  padding: 0px;
  border: none;
  color: transparent;
  background-color: transparent;
  display: inline-block;
  cursor: pointer;

  @media ${device.mobile} {
    margin: 15px 20px 0px 0px;
  }
`;

const Icon = styled.img`
  height: 30px;
  display: inline-block;
  margin: 0px 20px;
`;

const NavModal = (props) => {
  const node = useRef();
  const [open, setOpen] = useState(false);

  useOnClickOutside(node, () => {
    setOpen(false);
  });

  return (
    <div className={props.className}>
      <div ref={node}>
        <FocusLock disabled={!open}>
          {props.buttonLabel && (
            <NavModalButton
              active={open}
              onClick={() => setOpen(open ? false : true)}
              aria-label={props.buttonLabel}
            >
              <Label>{props.buttonLabel}</Label>
            </NavModalButton>
          )}
          {props.buttonIcon && (
            <NavIconButton
              onClick={() => setOpen(open ? false : true)}
              aria-label="Einstellungen"
            >
              <Icon src={props.buttonIcon} />
            </NavIconButton>
          )}
          <NavModalContent open={open} width={props.modalWidth}>
            {props.children}
          </NavModalContent>
        </FocusLock>
      </div>
    </div>
  );
};

export default NavModal;
