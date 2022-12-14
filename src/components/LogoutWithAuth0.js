import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const LogoutWithAuth0 = () =>{
   const { logout, isAuthenticated } = useAuth0();

   return (
    isAuthenticated && (
    <div>
        <button onClick={() => logout()}>
            Log Out
        </button>
    </div>
    )
   )
}

export default LogoutWithAuth0;