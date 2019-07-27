import React, { useEffect } from "react";
import history from "../history";
import { Route } from "react-router-dom";
import { useAuth0 } from '../auth/Auth';

const PrivateRouteAuth = ({ component: Component, path, ...rest }) => {
  const { authenticated, getUser, user } = useAuth0();
  useEffect(() => {
    const fn = async () => {
      if (authenticated) {
          debugger;
          console.log(user);
        console.log(getUser());
        history.replace('/profile');
      }
    };
    fn();
  }, [authenticated, path]);

  const render = props => <Component {...props} />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRouteAuth;
