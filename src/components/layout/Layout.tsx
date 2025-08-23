import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  width: 1200px;
  height: 2200px;
  margin: 0 auto;
`;

export default Layout;
