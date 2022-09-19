import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const TopNavigation: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="top-navigation">
      <h5 className="title-text">{title}</h5>
      {children}
    </div>
  );
};

export default TopNavigation;
