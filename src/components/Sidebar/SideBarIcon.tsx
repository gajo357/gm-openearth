import React from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: React.ReactNode;
  text?: string;
  to?: string;
  onClick?: () => void;
}

const SideBarIcon: React.FC<Props> = ({ icon, text, to, onClick }) => {
  return to ? (
    <Link to={to}>
      <div className="sidebar-item">
        <div className="sidebar-icon">{icon}</div>
        <span className="sidebar-tooltip">{text}</span>
      </div>
    </Link>
  ) : (
    <div className="sidebar-item" onClick={onClick}>
      <div className="sidebar-icon">{icon}</div>
      <span className="sidebar-tooltip">{text}</span>
    </div>
  );
};

export default SideBarIcon;
