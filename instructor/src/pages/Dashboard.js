import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default Dashboard;
