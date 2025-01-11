import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import GlobalFonts from "./styles/GlobalFonts";

function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalFonts />
      <Outlet />
    </>
  );
}

export default App;
