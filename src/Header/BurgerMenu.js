import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";

import BurgerContainer from "../Components/Organisms/Navigation/BurgerMenu/BurgerContainer";
import BurgerButton from "../Components/Organisms/Navigation/BurgerMenu/BurgerButton";
import BurgerLink from "../Components/Organisms/Navigation/BurgerMenu/BurgerLink";
import LngChangerLine from "../Components/Organisms/LngChanger/LngChangerLine";
import BurgerP from "../Components/Organisms/Navigation/BurgerMenu/BurgerP";

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
            <BurgerLink to="/infos" onClick={() => setOpen(false)}>
              <BurgerP>{t("Nav.Infos")}</BurgerP>
            </BurgerLink>
            <BurgerLink to="/contact" onClick={() => setOpen(false)}>
              <BurgerP>{t("Nav.Contact")}</BurgerP>
            </BurgerLink>
            <LngChangerLine />
          </BurgerContainer>
        </FocusLock>
      </div>
    </div>
  );
};

export default BurgerMenu;
