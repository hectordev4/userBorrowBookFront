import React, { createContext, useContext } from "react";
import Services from "./services";

// Create a context for the app services
const AppServicesContext = createContext(Services);

// Custom hook to use the app services context
export const useAppServices = () => {
  return useContext(AppServicesContext);
};

// Provider component to wrap the app and provide the services context
// This component will be used in the main App component to provide the context
// to the entire application
export const AppServicesProvider = ({ children }) => {
  return (
    <AppServicesContext.Provider value={Services}>
      {children}
    </AppServicesContext.Provider>
  );
};

export default AppServicesContext;
