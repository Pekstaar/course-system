import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/404";
import Account from "./pages/Account";
import CreateAssignment from "./pages/CreateAssignment";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ManageAssignment from "./pages/ManageAssignment";
import ManageProfile from "./pages/ManageProfile";
import Signup from "./pages/Signup";
import AssignmentSubmits from "./pages/AssignmentSubmits";
import Submit from "./pages/Submit";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* landing page route */}
        <Route path="/" exact element={<LandingPage />} />

        {/* dashboard path */}
        <Route path="/dashboard" exact element={<Dashboard />} />

        {/* profile path */}
        <Route path="/profile" exact element={<ManageProfile />} />

        {/* Assignment path */}
        <Route path="assignment" exact element={<ManageAssignment />} />
        <Route path="assignment/create" exact element={<CreateAssignment />} />
        <Route path="assignment/submits/:id" exact element={<Submit />} />

        <Route
          path="assignment/submits"
          exact
          element={<AssignmentSubmits />}
        />

        {/* account path */}
        <Route path="/account" exact element={<Account />} />

        {/* login route */}
        <Route path="/login" exact element={<Login />} />

        {/* signup route */}
        <Route path="/signup" exact element={<Signup />} />

        {/* 404 page */}
        <Route path="/notfound" exact element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
