import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /**
  * Here we can add global styles using Styled-components features
  */
  body {
    padding: 0;
    background-color: #f0f2f5;
  }

  #root {
    width: 100%;
    //height: inherit;
  }
`;

export default GlobalStyle;
