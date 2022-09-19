import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../pages/Account";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import MyTrees from "../pages/MyTrees";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<MyTrees />} />
    <Route path="/account" element={<Account />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
