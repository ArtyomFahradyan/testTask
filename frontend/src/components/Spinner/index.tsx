import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SpinnerWrapper, RelativeWrapper } from "./styles";

type Props = {
  relative?: boolean;
  size?: number;
};

function Spinner({ relative, size = 80 }: Props) {
  const Loading = (
    <SpinnerWrapper>
      <Spin indicator={<LoadingOutlined spin size={size} />} />
    </SpinnerWrapper>
  );

  if (relative) {
    return <RelativeWrapper>{Loading}</RelativeWrapper>;
  }
  return Loading;
}

export default Spinner;
