import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const LoginWithAuth0 = () =>{
   const { loginWithRedirect, isAuthenticated} = useAuth0();

   return (
    !isAuthenticated && (
    <div>
        <button onClick={() => loginWithRedirect()}>
            Log In WithAuth0
        </button>
    </div>
    )
   )
}

export default LoginWithAuth0;