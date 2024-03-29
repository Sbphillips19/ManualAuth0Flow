import React, { useEffect } from "react";
import history from "../history";
import { Route } from "react-router-dom";
import { useAuth0 } from '../auth/Auth';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { authenticated } = useAuth0();
  useEffect(() => {
    const fn = async () => {
      if (!authenticated) {
        history.replace('/');
      }
    };
    fn();
  }, [authenticated, path]);

  const render = props => <Component {...props} />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;