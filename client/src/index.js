import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import MainContext from "./context/Context";

ReactDOM.render(
  <React.StrictMode>
    <MainContext>
      <App />
    </MainContext>
  </React.StrictMode>,
  document.getElementById("root")
);
