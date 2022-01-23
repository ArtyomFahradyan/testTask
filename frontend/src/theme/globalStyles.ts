import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /**
  * Here we can add global styles using Styled-components features
  */
  body {
    padding: 0;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
