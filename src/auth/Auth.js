import React, { useContext, useState } from 'react'
import auth0 from 'auth0-js';
import history from '../history';

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

const Auth0Provider = (props) => {

  const prevAuth = (window.localStorage.auth || null)
  const prevUser = (window.localStorage.user || null)

  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [user, setUser] = useState(prevUser);
  
  const auth0Client = new auth0.WebAuth({
    domain: "testing-react-hooks.auth0.com",
    clientID: "57FeImJYc8lXbo21sCt4Cn1Kj971KIsg",
    redirectUri: `${window.location.origin}/auth0_callback`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

  // useEffect(() => {
  //   setAuthenticated(isAuthenticated());
  //   setUser(getUser());
  //   setLoading(false);
  //   // eslint-disable-next-line
  // }, []);

  // login method takes email password and db connection
  const login = async (email, password) => {
    console.log("the user called login method")
    auth0Client.login({
      "connection": 'Username-Password-Authentication',
      "email": email,
      "password": password,
    }, function (err) {
      console.log("ERROR", err);
      alert("error inside of login function", err.code);
      if (err) {
        return err
      }
      else {
        setUser(getUser());
        setAuthenticated(true);
      }
    })
  }

  // signup method takes email password and db connection
  const signUp = async (email, password) => {
    console.log("the user called signup method")
    auth0Client.redirect.signupAndLogin({
      "connection": 'Username-Password-Authentication',
      "email": email,
      "password": password
    }, function (err) {
      if (err) {
        return err
      }
      else {
        setUser(getUser());
        setAuthenticated(true);
      }
    })
  };

  // logoout method removes all id's from local storage
  const logout = () => {
    console.log("the user is logging out");
    // Remove tokens and expiry time
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
    setAuthenticated(false);
    setUser(null);
    auth0Client.logout({
      returnTo: window.location.origin
    });
  }

  // method called once callback initiated
  const handleAuthentication = () => {
    console.log("auth0Client", auth0Client);
    if (typeof window !== 'undefined') {
        auth0Client.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              setSession(authResult);
              history.replace('/');
            } else if (err) {
              console.log(err)
              return err;
            }
        })
      }
  }



  const isAuthenticated = () => {
    if (typeof localStorage !== 'undefined') {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
      localStorage.setItem('auth', true)
      return new Date().getTime() < expiresAt
    } else {
      localStorage.setItem('auth', false)
      return false
    }
  }

  const setSession = async authResult => {

    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('auth', true)
    
    setAuthenticated(true);

    await auth0Client.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem('user', JSON.stringify(user))
      setUser(JSON.stringify(user));
    })
  }

  const renewSession = async () => {
    auth0Client.checkSession({}, async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        await setSession(authResult);
      } else if (err) {
        console.log("loggin out inside renew session");
        logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
    setUser(getUser());
    setAuthenticated(true);
  }

  const getUser = () => {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))
    }
  }

  const getToken = () => {
    return localStorage.getItem('id_token')
  }

  const seeIfVerified = () => {
    auth0Client.client.userInfo(localStorage.getItem('access_token'), function (err, user) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
      else {
        console.log("ERROR inside see if verified", err);
      }
    });
  }

  return (
    <Auth0Context.Provider
      value={{
        login,
        signUp,
        logout,
        handleAuthentication,
        isAuthenticated,
        setSession,
        renewSession,
        getUser,
        getToken,
        authenticated,
        user,
        seeIfVerified,
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  );
}

export default Auth0Provider;