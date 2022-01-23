import styled from "styled-components";
import { Form } from "antd";

export const StyledFormItem = styled(Form.Item)`
  width: 100%;
  margin-bottom: 12px;
  svg {
    width: 16px !important;
  }

  textarea {
    border-radius: 0 4px 4px 0;
    min-height: 300px;
  }

  .ant-input-group-addon {
    border-radius: 4px 0 0 4px;
    border: none;
  }
`;
