import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Home from "./scenes/Home";
import Profile from "./scenes/Profile";
import SignUp from "./scenes/SignUp";
import Login from "./scenes/Login";
import Auth0Callback from "./scenes/Auth0Callback";
import { useAuth0 } from "./auth/Auth";

import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAuth from "./components/PrivateRouteAuth";

const NavRoute = ({ exact, path, component: Component }) => (
  <PrivateRoute
    exact={exact}
    path={path} render={(props) => (
      <>
        <Component {...props} />
      </>
    )} />
)

function App() {

  const { renewSession, handleAuthentication, setSession } = useAuth0();

  const handleAuth = (nextState, replace) => {
    console.log("NEXT STATE", nextState);
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      handleAuthentication()
    }
  }

  // call as if componentDidMount to see if user is logged in
  // if so extend their session
  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      renewSession();
    }
  },[]);


  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <PrivateRouteAuth path="/" exact component={Home} />
          <PrivateRouteAuth path="/signup" exact component={SignUp} />
          <PrivateRouteAuth path="/login" exact component={Login} />
          <Route path="/auth0_callback" exact render={(props) => {
            handleAuth(props);
            return <Auth0Callback {...props} />
          }} />
          <NavRoute exact component={Profile} path="/profile" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;