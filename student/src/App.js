import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Account from "./pages/Account";
import AssignmentDetails from "./pages/AssignmentDetails";
import Assignments from "./pages/Assignments";

import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ManageProfile from "./pages/ManageProfile";
import Signup from "./pages/Signup";
import Submits from "./pages/Submits";
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar />
      <Sidebar /> */}
      <ToastContainer />

      <Routes>
        {/* dashboard */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* login route */}
        <Route path="/login" element={<Login />} />

        {/* signup route */}
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<ManageProfile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/submits" element={<Submits />} />
        <Route path="/assignment/:id" element={<AssignmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
