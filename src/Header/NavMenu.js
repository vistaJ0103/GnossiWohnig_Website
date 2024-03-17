import React from "react";
import { useTranslation } from "react-i18next";

import NavContainer from "../Components/Organisms/Navigation/NavMenu/NavContainer";
import NavLink from "../Components/Organisms/Navigation/NavMenu/NavLink";
import NavP from "../Components/Organisms/Navigation/NavMenu/NavP";
import Settings from "../Components/Organisms/Auth/Settings/Settings";
import NavModal from "../Components/Organisms/Navigation/NavModal/NavModal";
import Auth from "../Components/Organisms/Auth/Auth";
import Placeholder from "../Components/Atoms/Placeholder";
import accountIcon from "../Assets/Icons/account3.png";
import { useAuth } from "../firebaseProvider";

const checkHomeActive = () => {
  const pathname = window.location.pathname;
  return pathname === "/";
};

const NavMenu = ({ className }) => {
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

  return (
    <NavContainer className={className}>
      <NavLink to="/" isActive={checkHomeActive}>
        <NavP>{t("Nav.Home")}</NavP>
      </NavLink>
      <NavLink to="/infos">
        <NavP>{t("Nav.Infos")}</NavP>
      </NavLink>
      <NavLink to="/contact">
        <NavP>{t("Nav.Contact")}</NavP>
      </NavLink>
      {getAuthElement()}
    </NavContainer>
  );
};

export default NavMenu;
