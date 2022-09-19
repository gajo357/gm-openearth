import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const withAdmin =
  <TProps,>(WrappedComponent: React.ComponentType | React.FC<TProps>) =>
  (props: TProps) => {
    const { isAdmin } = useAuth();

    return isAdmin ? <WrappedComponent {...props} /> : <Navigate to="/" />;
  };

export default withAdmin;
