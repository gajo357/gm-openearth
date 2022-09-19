import React from "react";
import withRoles from "../../hooks/withRoles";
import { Roles } from "../../models/UserDto";

const MyTrees: React.FC = () => {
  return <div className="content-container"></div>;
};

export default withRoles(MyTrees, [Roles.User]);
