import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [ready ,setReady] = useState(false);
  useEffect(() => {
    
    if (!user) {
      axios.get("/profile").then(( response) => {
        const userdata = response.data;
        setUser(userdata);
        setReady(true);
      });
    }
  }, []); 
  return (
    //here children is used for content rendering whose having access of these values
    <UserContext.Provider value={{ user, setUser ,ready}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
