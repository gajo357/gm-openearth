import React from "react";
import { Navigate } from "react-router-dom";
import { Roles } from "../models/UserDto";
import { useAuth } from "./useAuth";

const withRoles =
  <TProps,>(
    WrappedComponent: React.ComponentType | React.FC<TProps>,
    roles: Roles[]
  ) =>
  (props: TProps) => {
    const { hasAnyRole, authenticated } = useAuth();

    return hasAnyRole(roles) ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to={authenticated ? "/" : "/login"} />
    );
  };

export default withRoles;
