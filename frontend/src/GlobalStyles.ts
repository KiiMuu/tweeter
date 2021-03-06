import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        // * colors
        --mainColor: #1da1f2;
        --secondaryColor: #2563EB;
        --grayColor: #F9FAFB;
        --lightColor: #FFF;
        --darkColor: #111827;
        --grayDark: #bdb9b9;
        --textGray: rgb(91, 112, 131);

        // * spaces
        // * common
        --br: 3px;
        --borderColor: #f0ebeb;
        --paddingLeftRight: 20px;
        /* --bs: 3px; */
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    html {
        box-sizing: border-box;
    }
    body {
        font-family: 'Poppins', sans-serif;
        scroll-behavior: smooth;
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyles;
