import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import GlobalFonts from "./styles/GlobalFonts";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GlobalFonts />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
