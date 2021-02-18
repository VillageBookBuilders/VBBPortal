import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Booking from "./Booking";
import Dashboard from "./Dashboard";
import MasterForm from "./registration/MasterForm";
import HomeSignin from "./HomeSignin";
import SessionDetails from "./SessionDetails";
import Donation from "./registration/Donation"
import thankYouPage from "./registration/ThankYouPage";
import TryAgainPage from "./registration/TryAgainPage";

function Routes(props) {
  return (
    <div>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/booking/" component={Booking} />
      <Route exact path="/signin/" component={HomeSignin} />
      <Route exact path="/register/" component={MasterForm} />
      <Route exact path="/donate/" component={Donation}/>
      <Route exact path="/thankYou/" component={thankYouPage}/>
      <Route exact path="/tryAgain/" component={TryAgainPage}/>
      <PrivateRoute
        exact
        path="/sessiondetails/:sessionid/"
        component={SessionDetails}
      />
    </div>
  );
}

export default Routes;
