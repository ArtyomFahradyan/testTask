import styled from "styled-components";

export const TopBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: block;
`;

export const MenuWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 1;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  background-color: ${({ theme }) => theme.feedBackGround};
`;
