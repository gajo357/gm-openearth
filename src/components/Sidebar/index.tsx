import React from "react";
import SideBarIcon from "./SideBarIcon";
import {
  MdLogout,
  MdManageAccounts,
  MdOutlineAdminPanelSettings
} from "react-icons/md";
import { GiTreeGrowth } from "react-icons/gi";
import { useAuth } from "../../hooks/useAuth";

const Sidebar: React.FC = () => {
  const { isAdmin, logout } = useAuth();

  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col md:w-32 bg-white dark:bg-gray-900 shadow-lg">
      <SideBarIcon icon={<GiTreeGrowth size="28" />} text="My Trees" to="/" />
      <SideBarIcon
        icon={<MdManageAccounts size="28" />}
        text="Account"
        to="/account"
      />
      {isAdmin && (
        <>
          <Divider />
          <SideBarIcon
            icon={<MdOutlineAdminPanelSettings size="28" />}
            text="Admin"
            to="/admin"
          />
        </>
      )}
      <Divider />
      <SideBarIcon
        icon={<MdLogout size="28" />}
        text="Log Out"
        onClick={logout}
      />
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
