import React from "react";
import { ImSpinner9 } from "react-icons/im";

const LoginSpinner: React.FC = () => (
  <div className="flex justify-center items-center flex-wrap mx-auto">
    <ImSpinner9 size="64" className="animate-spin" />
    <p className="text-size-32">Logging in</p>
  </div>
);

export default LoginSpinner;
