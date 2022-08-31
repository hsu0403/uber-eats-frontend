import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Login } from "../pages/login";
import { SignUp } from "../pages/signup";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
