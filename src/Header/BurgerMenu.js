import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";

import BurgerContainer from "../Components/Organisms/Navigation/BurgerMenu/BurgerContainer";
import BurgerButton from "../Components/Organisms/Navigation/BurgerMenu/BurgerButton";
import BurgerLink from "../Components/Organisms/Navigation/BurgerMenu/BurgerLink";
import LngChangerLine from "../Components/Organisms/LngChanger/LngChangerLine";
import BurgerP from "../Components/Organisms/Navigation/BurgerMenu/BurgerP";
import Placeholder from "../Components/Atoms/Placeholder";
import NavModal from "../Components/Organisms/Navigation/NavModal/NavModal";
import Settings from "../Components/Organisms/Auth/Settings/Settings";
import Auth from "../Components/Organisms/Auth/Auth";
import { useAuth } from "../firebaseProvider";
import accountIcon from "../Assets/Icons/account3.png";
import { useOnClickOutside } from "../Components/Organisms/Navigation/utils";

const BurgerMenu = ({ className }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const { t } = useTranslation();
  const { pending, isSignedIn, user } = useAuth();

  const getAuthElement = () => {
    if (pending) {
      return <Placeholder width="100px" />;
    } else if (isSignedIn && user.emailVerified) {
      return (
        <NavModal key="settings" buttonIcon={accountIcon}>
          <Settings />
        </NavModal>
      );
    } else {
      return (
        <NavModal key="auth" buttonLabel="Login">
          <Auth />
        </NavModal>
      );
    }
  };

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
      {getAuthElement()}
    </div>
  );
};

export default BurgerMenu;
