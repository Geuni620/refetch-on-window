import { Link } from 'react-router-dom';
import { HomeIcon, Package2Icon } from '@/components/icons';

export const SideBar = () => {
  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <a className="flex items-center gap-2 font-semibold">
            <Package2Icon className="size-6" />
            <span className="">Acme Inc</span>
          </a>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              to="/home"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <HomeIcon className="size-4" />
              Home
            </Link>
            <Link
              to="/item"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <HomeIcon className="size-4" />
              Item
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
