import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="mx-auto min-h-screen w-[1200px] overflow-hidden p-[10rem] lg:grid-cols-[280px_1fr]">
      <Outlet />
    </div>
  );
};
