import React from "react";
import { TopBarWrapper, MenuWrapper, Content } from "./styles";

type Props = {
  menu?: React.ReactNode;
  children?: React.ReactNode;
};

function TopBar({ children, menu }: Props) {
  return (
    <TopBarWrapper>
      <MenuWrapper>{menu}</MenuWrapper>
      <Content>{children}</Content>
    </TopBarWrapper>
  );
}

export default TopBar;
