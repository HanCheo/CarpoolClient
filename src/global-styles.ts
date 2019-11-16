import reset from "styled-reset";
import { createGlobalStyle } from "./typed-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Sunflower:300&display=swap&subset=korean');
  @import url('https://fonts.googleapis.com/css?family=Cute+Font|Sunflower:300&display=swap&subset=korean');
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    font-family: "Cute Font", sans-serif;
  }
  input,
  button {
    &:focus,&:active{outline: none}
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: "Sunflower", sans-serif;
  }

`;

export default GlobalStyle;