import React, {useEffect} from 'react'
import { ClipLoader } from 'react-spinners'
import { useAuth0 } from '../auth/Auth'

const Auth0CallbackPage = () => {

    const { renewSession, handleAuthentication, setSession } = useAuth0();

    useEffect(() => {
        handleAuthentication()
    }, [])  

  debugger;
  return (
    <div>
      <h1>
        This is the auth callback page, you should be redirected immediately.
      </h1>
      <ClipLoader sizeUnit="px" size={150} />
    </div>
  )
}

export default Auth0CallbackPage