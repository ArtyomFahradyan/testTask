import styled from "styled-components";
import { Typography } from "antd";

const { Text } = Typography;

export const SignupWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

export const ChangeFormLink = styled(Text)`
  :not(:first-child) {
    margin-top: 8px;
  }

  > a:focus {
    text-decoration: underline;
  }
`;

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
