import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-full flex-col items-center">
      <Outlet />
    </div>
  );
};

export default Layout;
