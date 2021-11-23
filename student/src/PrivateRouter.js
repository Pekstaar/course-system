import React from "react";
import { useNavigate } from "react-router";
import { Context } from "./context/Context";

const PrivateRouter = ({ children }) => {
  const { initState } = React.useContext(Context);

  const navigate = useNavigate();
  // get signed In user
  React.useEffect(() => {
    if (!initState.auth) {
      navigate("/login");
    } else {
      if (!initState.auth._id) {
        navigate("/login");
      }
    }
  }, [initState, navigate]);

  return <>{children}</>;
};

export default PrivateRouter;
