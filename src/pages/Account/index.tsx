import React from "react";
import withRoles from "../../hooks/withRoles";
import { Roles } from "../../models/UserDto";

const Account: React.FC = () => {
  return <div className="content-container"></div>;
};

export default withRoles(Account, [Roles.User]);
