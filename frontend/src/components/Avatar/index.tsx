import React, { ReactNode } from "react";
import { StyledAvatar } from "./styles";

type Props = {
  avatar?: string | ReactNode;
  firstname?: string;
  lastname?: string;
};

function UserAvatar({ avatar, firstname, lastname }: Props) {
  return (
    <StyledAvatar src={avatar}>
      {firstname && firstname[0].toUpperCase()}
      {lastname && lastname[0].toUpperCase()}
    </StyledAvatar>
  );
}

export default UserAvatar;
