import styled from "styled-components";

export const SpinnerWrapper = styled.div`
  background-color: ${({ theme }) => theme.spinnerBgColor};
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const RelativeWrapper = styled.div`
  position: relative;
  height: 100%;
`;
