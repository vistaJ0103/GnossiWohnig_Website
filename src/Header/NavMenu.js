import React from "react";
import { useTranslation } from "react-i18next";

import NavContainer from "../Components/Organisms/Navigation/NavMenu/NavContainer";
import NavLink from "../Components/Organisms/Navigation/NavMenu/NavLink";
import NavP from "../Components/Organisms/Navigation/NavMenu/NavP";

const checkHomeActive = () => {
  const pathname = window.location.pathname;
  return pathname === "/";
};

const NavMenu = ({ className }) => {
  const { t } = useTranslation();

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
    </NavContainer>
  );
};

export default NavMenu;
