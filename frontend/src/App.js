// frontend/src/App.js
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots"
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots";
import CreateASpot from "./components/CreateSpotPage";
import LoginFormModal from "./components/LoginFormModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(spotActions.loadSpots())
  }, [dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/spot/new'>
            <CreateASpot />
          </Route>
          <Route path='/login'>
            <LoginFormModal />
          </Route>
          <AllSpots />
        </Switch>
      )}
    </>
  );
}

export default App;
