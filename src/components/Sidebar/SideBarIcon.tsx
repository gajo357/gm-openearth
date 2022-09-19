import React from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: React.ReactNode;
  text?: string;
  to?: string;
  onClick?: () => void;
}

const SideBarIcon: React.FC<Props> = ({ icon, text, to, onClick }) => (
  <Link to={to}>
    <div className="sidebar-item" onClick={onClick}>
      <div className="sidebar-icon">{icon}</div>
      <span className="sidebar-tooltip">{text}</span>
    </div>
  </Link>
);

export default SideBarIcon;
