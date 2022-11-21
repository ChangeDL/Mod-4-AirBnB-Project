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
import SpotShow from "./components/SpotShowRoom";
import EditSpotForm from "./components/EditSpotForm";
import EditReviewForm from "./components/EditReviewForm";
import ReviewForm from "./components/ReviewForm";
import UserSpots from "./components/UserSpots";
import SignUpFormModal from "./components/SignUpModal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  // useEffect(() => {
  //   dispatch(spotActions.loadSpots())
  // }, [dispatch])

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);




  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route path="/signup">
            <SignUpFormModal />
          </Route>
          <Route path='/spot/new'>
            <CreateASpot />
          </Route>
          {/* <Route path='/login'>
            <LoginFormModal />
          </Route> */}
          <Route path='/spot/edit/:spotId'>
            <EditSpotForm />
          </Route>
          <Route path='/spot/:spotId/review/new'>
            <ReviewForm />
          </Route>
          <Route path='/spot/:spotId/reviews/:reviewId'>
            <EditReviewForm />
          </Route>
          <Route path='/spot/:spotId'>
            <SpotShow />
          </Route>
          {/* <Route path='/spots/my-spots' >
            <UserSpots />
          </Route> */}

          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
