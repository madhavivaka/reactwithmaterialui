import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { render } from "@testing-library/react";

const ProfileWithAuth0 = () => {
  const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (

        <div className='auth'>
            {user.name}
            {JSON.stringify(user)}
        </div>
        )
        
    )

}

export default ProfileWithAuth0;