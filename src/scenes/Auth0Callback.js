import React from 'react'
import { ClipLoader } from 'react-spinners'

const Auth0CallbackPage = () => {
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