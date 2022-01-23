import styled from "styled-components";
import { Avatar } from "antd";

export const StyledAvatar = styled(Avatar)`
  min-width: 24px;
  && {
    border: none;
  }
  && svg {
    width: 24px;
    height: 24px;
  }
`;
