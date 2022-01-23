import styled from "styled-components";
import { Dropdown, Typography } from "antd";

const { Text } = Typography;

export const FeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const FeedsList = styled.div`
  max-width: 800px;
  margin-top: 20px;
`;

export const FeedItem = styled.div`
  margin-bottom: 20px;
  min-height: 150px;
  min-width: 700px;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

export const FeedContent = styled.div`
  margin-top: 10px;
`;

export const FeedTitle = styled.div`
  display: -webkit-box;
  position: relative;
`;

export const ContentWrapper = styled.div`
  margin-top: 10px;
`;

export const UserNameAndDateWrapper = styled.div`
  display: grid;
  margin-left: 10px;
`;

export const CreatButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const StyledDropdown = styled(Dropdown.Button)`
  right: 0;
  position: absolute;

  &&& > button {
    border: none;
  }
`;

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
