import React from "react";
import { Link } from "react-router-dom";

import { useAuth0 } from '../auth/Auth';

const Home = () => {
    const { user, authenticated } = useAuth0();
    console.log("USER", user);
    console.log("AUTHENTICATED", authenticated);


    return (
        <div>
            <h1>
                Home Page
            </h1>
            <div>
                <Link to="/signup">
                    <div>Link to signup</div>
                </Link>
                <Link to="/login">
                    <div>Link to login</div>
                </Link>
            </div>
        </div>
    );
};

export default Home;