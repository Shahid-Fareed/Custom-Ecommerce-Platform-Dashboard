// components/SideBar.tsx
"use client";
import Link from "next/link";
import { TbSettings2 } from "react-icons/tb";
import Menu from "./Menu";

const SideBar: React.FC = () => {
  return (
    <>
      <aside className="h-[100vh] bg-[#F9FAFB] flex flex-col justify-between overflow-hidden w-[15%] fixed top-0">
        <div>
          <div className="p-5 flex items-center">
            <Link
              href={"/"}
              className="bg-white w-10 h-10 mr-5 flex justify-center items-center"
            >
              R
            </Link>
            <span>Clush Sports</span>
          </div>
          <Menu />
        </div>
        <div className="p-4">
          {/* <h2 className="font-semibold text-sm mb-2">Account</h2> */}
          <ul className="text-sm">
            {/* <li className="flex items-center mb-2"><IoNotificationsOutline className="mr-2"/>Notifications</li> */}
            <li className="flex items-center">
              <TbSettings2 className="mr-2" />
              Settings
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
