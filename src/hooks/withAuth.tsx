import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const withAuth =
  <TProps extends JSX.IntrinsicAttributes>(
    WrappedComponent: React.ComponentType | React.FC<TProps>
  ) =>
  (props: TProps) => {
    const { authenticated } = useAuth();

    return authenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

export default withAuth;
