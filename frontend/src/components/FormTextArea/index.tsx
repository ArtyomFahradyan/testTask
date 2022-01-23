import React from "react";
import { Input, Tooltip, Grid } from "antd";
import { StyledFormItem } from "./styles";
import { TextAreaProps } from "antd/lib/input/TextArea";
const { useBreakpoint } = Grid;

interface Props extends TextAreaProps {
  success?: boolean;
  error?: string;
  touched?: boolean;
  label?: string | React.ReactNode;
}

function FormTextArea({ success, error, touched, label, ...rest }: Props) {
  const screens = useBreakpoint();

  return (
    <StyledFormItem
      hasFeedback
      labelCol={{ span: 24 }}
      label={label}
      validateStatus={touched && error ? "error" : success ? "success" : ""}
    >
      <Tooltip
        title={touched && error}
        color="red"
        placement={screens.lg ? "right" : "top"}
        overlayStyle={{ whiteSpace: "pre-line" }}
      >
        <Input.TextArea {...rest} />
      </Tooltip>
    </StyledFormItem>
  );
}

export default FormTextArea;
