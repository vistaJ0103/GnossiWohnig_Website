import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";

import BurgerContainer from "../Components/Navigation/BurgerMenu/BurgerContainer";
import BurgerButton from "../Components/Navigation/BurgerMenu/BurgerButton";
import BurgerDropdown from "../Components/Navigation/BurgerMenu/BurgerDropdown/BurgerDropdown";
import BurgerDropdownLink from "../Components/Navigation/BurgerMenu/BurgerDropdown/BurgerDropdownLink";
import BurgerLinkButton from "../Components/Navigation/BurgerMenu/BurgerLinkButton";
import BurgerLink from "../Components/Navigation/BurgerMenu/BurgerLink";
import BurgerContentButton from "../Components/Navigation/BurgerMenu/BurgerContentButton";
import LngChangerLine from "../Components/LngChanger/LngChangerLine";
import BurgerP from "../Components/Navigation/BurgerMenu/BurgerP";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const BurgerMenu = ({ className }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const { t } = useTranslation();

  useOnClickOutside(node, () => setOpen(false));

  const checkHomeActive = () => {
    const pathname = window.location.pathname;
    return pathname === "/";
  };

  const checkServicesActive = () => {
    const pathname = window.location.pathname;
    return pathname === "/dbdownload" || pathname === "/SubPage2";
  };

  return (
    <div className={className}>
      <div ref={node}>
        <FocusLock disabled={!open}>
          <BurgerButton open={open} setOpen={setOpen} />
          <BurgerContainer open={open} setOpen={setOpen}>
            <BurgerLink
              to="/"
              isActive={checkHomeActive}
              onClick={() => setOpen(false)}
            >
              <BurgerP>{t("Nav.Home")}</BurgerP>
            </BurgerLink>
            <BurgerLink to="/chatbot/AdRoTom" onClick={() => setOpen(false)}>
              <BurgerP>{t("Nav.Chatbot")}</BurgerP>
            </BurgerLink>
            <BurgerDropdown label="Services" isActive={checkServicesActive}>
              <BurgerDropdownLink
                to="/dbdownload"
                onClick={() => setOpen(false)}
              >
                <BurgerP>{t("Nav.DBDownload")}</BurgerP>
              </BurgerDropdownLink>
              <BurgerDropdownLink to="/dbupload" onClick={() => setOpen(false)}>
                <BurgerP>{t("Nav.DBUpload")}</BurgerP>
              </BurgerDropdownLink>
            </BurgerDropdown>
            <BurgerLink to="/contact" onClick={() => setOpen(false)}>
              <BurgerP>{t("Nav.Contact")}</BurgerP>
            </BurgerLink>
            <BurgerContentButton>
              <BurgerLinkButton to="/login" onClick={() => setOpen(false)}>
                <BurgerP>{t("Nav.Login")}</BurgerP>
              </BurgerLinkButton>
            </BurgerContentButton>
            <LngChangerLine />
          </BurgerContainer>
        </FocusLock>
      </div>
    </div>
  );
};

export default BurgerMenu;
