import React from "react";
import { Input, Tooltip, Grid } from "antd";
import { StyledFormItem } from "./styles";
import { SearchProps } from "antd/lib/input/Search";
const { useBreakpoint } = Grid;

interface Props extends SearchProps {
  success?: boolean;
  error?: string;
  password?: boolean;
  touched?: boolean;
  label?: string | React.ReactNode;
}

function FormInput({
  success,
  error,
  password,
  touched,
  className,
  label,
  ...rest
}: Props) {
  const screens = useBreakpoint();

  const render = () => {
    return password ? <Input.Password {...rest} /> : <Input {...rest} />;
  };

  return (
    <StyledFormItem
      hasFeedback
      labelCol={{ span: 24 }}
      label={label}
      className={className}
      validateStatus={touched && error ? "error" : success ? "success" : ""}
    >
      <Tooltip
        title={touched && error}
        color="red"
        placement={screens.lg ? "right" : "top"}
        overlayStyle={{ whiteSpace: "pre-line" }}
      >
        {render()}
      </Tooltip>
    </StyledFormItem>
  );
}

export default FormInput;
