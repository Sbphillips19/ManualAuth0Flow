import React from "react";
import { Link } from "react-router-dom";

import { useAuth0 } from '../auth/Auth';

const Profile = () => {
    
    const { getUser, user, logout  } = useAuth0();
    debugger;
    console.log("HERE IS THE USER", getUser())
    
    return (
        <div>
            <h1>
               Profile Page
            </h1>
            <div>
                <div>You are currently logged in</div>
                <div>if you try to access either links below it should redirect back to profile</div>
                <br />
                <Link to="/signup">
                    <div>Link to signup</div>
                </Link>
                <Link to="/login">
                    <div>Link to login</div>
                </Link>
                <br />
                <button onClick={()=> logout()}>LOGOUT</button>
            </div>
        </div>
    );
};

export default Profile;