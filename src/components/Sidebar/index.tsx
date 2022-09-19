import React from "react";
import SideBarIcon from "./SideBarIcon";
import {
  MdLogout,
  MdManageAccounts,
  MdOutlineAdminPanelSettings
} from "react-icons/md";
import { GiTreeGrowth } from "react-icons/gi";

const Sidebar: React.FC = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col md:w-32
                      bg-white dark:bg-gray-900 shadow-lg"
    >
      <SideBarIcon icon={<GiTreeGrowth size="28" />} text="My Trees" />
      <SideBarIcon icon={<MdManageAccounts size="28" />} text="Account" />
      <Divider />
      <SideBarIcon
        icon={<MdOutlineAdminPanelSettings size="28" />}
        text="Admin"
      />
      <Divider />
      <SideBarIcon icon={<MdLogout size="28" />} text="Log Out" />
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
