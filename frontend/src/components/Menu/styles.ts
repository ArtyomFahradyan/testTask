import styled from "styled-components";

export const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Right = styled.div`
  position: absolute;
  right: 0;
`;

export const TopNav = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.white};
  border-radius: 5px;
  box-shadow: 5px 1px 10px rgb(0 0 0 / 10%);
`;

export const ListItem = styled.span<{ $selected?: boolean }>`
  float: left;
  text-align: center;
  padding: 14px 16px;
  font-size: 17px;
  align-items: center;
  color: ${({ theme }) => theme.topBarItemColor};
  ${({ $selected }) => ($selected ? "background:#efefef" : "")};

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.topBarItemHoverColor};
  }
`;
