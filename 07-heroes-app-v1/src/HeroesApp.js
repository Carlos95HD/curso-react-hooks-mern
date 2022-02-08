import React, { useReducer, useEffect } from "react";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { AppRouters } from "./routers/AppRouters";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

export const HeroesApp = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    // const {name} = user;
    localStorage.setItem( "user", JSON.stringify(user) );
  }, [user])

  return (
    <div>
      <AuthContext.Provider value={{ user, dispatch }}>
        <AppRouters />
      </AuthContext.Provider>
    </div>
  );
};
