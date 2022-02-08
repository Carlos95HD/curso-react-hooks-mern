import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { JournalScreen } from "../components/journal/JournalScreen";
import { Loading } from "../components/loadingScreen/Loading";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

  const dispatch = useDispatch();

  //Revisa el estado en firebase
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //condicional de login

  useEffect(() => {
    //esto crea un observable
    getAuth().onAuthStateChanged( async (user) => {

      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));

      } else {
        setIsLoggedIn(false);
      }

      setChecking(false)
    });

  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          
          <Route
            path="/*"
            element={
              <PublicRoute isAuth={isLoggedIn}>
                <AuthRouter />
              </PublicRoute>
            }
          />

          <Route 
            path="/"
            element={
              <PrivateRoute isAuth={isLoggedIn}>
                <JournalScreen/>
              </PrivateRoute>
            }
          />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};
