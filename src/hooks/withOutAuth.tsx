import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const withOutAuth =
  <TProps,>(WrappedComponent: React.ComponentType | React.FC<TProps>) =>
  (props: TProps) => {
    const { authenticated } = useAuth();

    return authenticated ? (
      <Navigate to="/" />
    ) : (
      <WrappedComponent {...props} />
    );
  };

export default withOutAuth;
