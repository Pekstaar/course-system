import React, { createContext } from "react";

export const Context = createContext();

// const url = "";

const MainContext = ({ children }) => {
  const [initState, setInitState] = React.useState({});

  return (
    <Context.Provider value={{ setInitState, initState }}>
      {children}
    </Context.Provider>
  );
};

export default MainContext;
