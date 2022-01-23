import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "constants/common";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useWorkspaceActions, WorkspaceSelectors } from "@redux";
import { MenuWrapper, ListItem, TopNav, Right } from "./styles";

function Menu() {
  const { t } = useTranslation("navbar");
  const location = useLocation();
  const navigate = useNavigate();
  const pars = location.pathname.split("/");
  const { clearWorkspace } = useWorkspaceActions();
  const user = useSelector(WorkspaceSelectors.getUser);

  const handleNavigate = (id: string) => {
    navigate(`${id}`);
  };

  const handleLogOut = () => {
    clearWorkspace();
    localStorage.removeItem("token");
  };

  return (
    <MenuWrapper>
      <TopNav>
        <div>
          {menuItems.map(({ id, name }) => {
            return (
              <ListItem
                key={id}
                onClick={() => handleNavigate(id)}
                $selected={`${id}` === pars[1]}
              >
                {t(name)}
              </ListItem>
            );
          })}
        </div>
        <Right>
          <ListItem onClick={handleLogOut}>{t("logOut")}</ListItem>
          <ListItem>{user?.firstName + " " + user?.lastName}</ListItem>
        </Right>
      </TopNav>
    </MenuWrapper>
  );
}

export default Menu;
