// styled-components ThemeProvider 사용

import { DefaultTheme } from "styled-components/dist/types";

// 반응형 웹 breakpoints
export const windowSize = {
    desktop: "1920px",
    laptop: "1200px",
    tablet: "768px",
    //767px 이하
    mobile: "767px",
    smallMobile: "360px"
}

// 곡률 (Radius)
export const sizes = {
    XL: { height: 120, curve: 12 },
    L: { height: 80, curve: 10 },
    M: [
      { height: 64, curve: 8 },
      { height: 44, curve: 6 },
    ],
    S: { height: 32, curve: 4 },
    card: { curve: 20 },
    allbox: { curve: 8 },
}

// 폰트 굵기 (Weight)
export const fontWeight = {
    bold: 700,
    semiBold: 600,
    medium: 500,
    regular: 400
}

export const fontSize = {
    XXL: 32,
    XL: 24,
    L: 18,
    M: 16,
    S: 14,
    XS: 12,
    XXS: 10
}

// lineHeight
export const lineHeight = "150%";
  
  // letterSpacing
  export const letterSpacing = {
    default: "0px",
    spaced: "1px",
  };

// 폰트 타입 (Types)
// 고민: 이렇게 정의하는 게 정말 효율적인가...

// 1안
export const typography = {
    // Heading
    headingXXLRegular: { fontSize: fontSize.XXL, fontWeight: fontWeight.regular },
    headingXXLBold: { fontSize: 26, fontWeight: fontWeight.bold },
  
    // Title
    titleXL: { fontSize: fontSize.XL, fontWeight: fontWeight.semiBold },
    titleL: { fontSize: fontSize.L, fontWeight: fontWeight.semiBold },
    titleM: { fontSize: 18, fontWeight: fontWeight.semiBold },
  
    // subTitle
    subTitleLRegular: { fontSize: fontSize.L, fontWeight: fontWeight.regular },
    subTitleLMedium: { fontSize: fontSize.M, fontWeight: fontWeight.medium },
    subTitleLSemiBold: { fontSize: fontSize.S, fontWeight: fontWeight.semiBold },
  
    // Body
    bodyMRegular: { fontSize: fontSize.M, fontWeight: fontWeight.regular },
    bodyMMedium: { fontSize: fontSize.M, fontWeight: fontWeight.medium },
    bodySRegular: { fontSize: fontSize.S, fontWeight: fontWeight.regular },
    bodySMedium: { fontSize: fontSize.S, fontWeight: fontWeight.medium },
    bodyXSRegular: { fontSize: fontSize.XS, fontWeight: fontWeight.regular },
    bodyXSMedium: { fontSize: fontSize.XS, fontWeight: fontWeight.medium },
  
    // ETC
    etcSRegular: { fontSize: 13, fontWeight: fontWeight.regular },
    etcSMedium: { fontSize: 13, fontWeight: fontWeight.medium },
    etcSSemiBold: { fontSize: 13, fontWeight: fontWeight.semiBold },
    etcXSRegular: { fontSize: fontSize.XS, fontWeight: fontWeight.regular },
    etcXSSemiBold: { fontSize: fontSize.XS, fontWeight: fontWeight.semiBold },
    etcXXSRegular: { fontSize: fontSize.XXS, fontWeight: fontWeight.regular },
};

// 2안
export const textStyle = (
    size: keyof typeof fontSize,
    weight: keyof typeof fontWeight,
    lineHeight: string = "150%",
    letterSpacing: string = "0px"
) => ({
    fontSize: fontSize[size],
    fontWeight: fontWeight[weight],
    lineHeight,
    letterSpacing,
});

// 2안 사용 방식
const headingXXLRegular = textStyle("XXL", "regular");

// 색상 (Color)
export const colors = {
        // primary 색상
        primary: {
            default:"#0066ff",
            defaultHover: "#005ce6",
            defaultActive: "#0052cc",
            light: "#e6f0ff",
            lightHover: "#d9e8ff",
            lightActive: "#b0d0ff"
        },

        // grey 색상
        grey: {
            1: "#ffffff",
            2: "#fdfdfd",
            3: "#f6f6f6",
            4: "#f1f1f1",
            5: "#dcdcdd",
            6: "#c5c5c6",
            7: "#979798",
            8: "#68686b",
            9: "#565659",
            10: "#3a3a3d",
            11: "#333336",
            12: "#2a2a2d",
            13: "#17171b"
        },

        // green 색상
        green: {
            default:"#1ab415",
            defaultHover: "#17a213",
            defaultActive: "#159011",
            light: "#e8f8e8",
            lightHover: "#ddf4dc",
            lightActive: "#b8e8b6"
        },

        // orange 색상
        orange: {
            default:"#ff8820",
            defaultHover: "#e67a1d",
            defaultActive: "#cc6d1a",
            light: "#fff3e9",
            lightHover: "#ffedde",
            lightActive: "#ffdaba"
        },

        // yellow 색상
        yellow: {
            default:"#ffe100",
            defaultHover: "#e6cb00",
            defaultActive: "#ccb400",
            light: "#fffce6",
            lightHover: "#fffbd9",
            lightActive: "#fff6b0"
        }
}

export const theme: DefaultTheme = {
    windowSize,
    sizes,
    fontWeight,
    fontSize,
    typography,
    colors
};

export type ThemeType = typeof theme;