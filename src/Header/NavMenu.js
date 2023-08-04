import React from "react";
import { useTranslation } from "react-i18next";

import NavContainer from "../Components/Navigation/NavMenu/NavContainer";
import NavButton from "../Components/Navigation/NavMenu/NavButton";
import NavLink from "../Components/Navigation/NavMenu/NavLink";
import NavDropdown from "../Components/Navigation/NavMenu/NavDropdown/NavDropdown";
import NavDropdownLink from "../Components/Navigation/NavMenu/NavDropdown/NavDropdownLink";
import NavLinkButton from "../Components/Navigation/NavMenu/NavLinkButton";
import LngChangerDropdown from "../Components/LngChanger/LngChangerDrowdown";
import NavP from "../Components/Navigation/NavMenu/NavP";

const checkHomeActive = () => {
  const pathname = window.location.pathname;
  return pathname === "/";
};

const checkServicesActive = () => {
  const pathname = window.location.pathname;
  return pathname === "/dbdownload" || pathname === "/dbupload";
};

const NavMenu = ({ className }) => {
  const { t } = useTranslation();

  return (
    <NavContainer className={className}>
      <NavLink to="/" isActive={checkHomeActive}>
        <NavP>{t("Nav.Home")}</NavP>
      </NavLink>
      <NavLink to="/chatbot/AdRoTom">
        <NavP>{t("Nav.Chatbot")}</NavP>
      </NavLink>
      <NavDropdown label={t("Nav.Services")} isActive={checkServicesActive}>
        <NavDropdownLink to="/dbdownload">
          <NavP>{t("Nav.DBDownload")}</NavP>
        </NavDropdownLink>
        <NavDropdownLink to="/dbupload">
          <NavP>{t("Nav.DBUpload")}</NavP>
        </NavDropdownLink>
      </NavDropdown>
      <NavLink to="/contact">
        <NavP>{t("Nav.Contact")}</NavP>
      </NavLink>
      <NavButton>
        <NavLinkButton to="/login">
          <NavP>{t("Nav.Login")}</NavP>
        </NavLinkButton>
      </NavButton>
      <LngChangerDropdown />
    </NavContainer>
  );
};

export default NavMenu;
