import React from "react";

interface Props {
  icon: React.ReactNode;
  text?: string;
}

const SideBarIcon: React.FC<Props> = ({ icon, text }) => (
  <div className="sidebar-item">
    <div className="sidebar-icon">{icon}</div>
    <span className="sidebar-tooltip">{text}</span>
  </div>
);

export default SideBarIcon;
