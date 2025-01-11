import { createGlobalStyle } from "styled-components";

const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        font-weight: 400 700;
        src: url('/assets/fonts/PretendardVariable.woff2') format('woff-variations');
    }
`;

export default GlobalFonts;
