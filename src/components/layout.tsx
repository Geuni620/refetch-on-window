import { Outlet } from 'react-router-dom';
import { SideBar } from 'src/components/sidebar';

export const Layout = () => {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <SideBar />
      <Outlet />
    </div>
  );
};
