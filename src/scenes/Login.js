import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "../App.css";
import { useAuth0 } from '../auth/Auth';

const SignUp = (props) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const { login } = useAuth0();

    return (
       <div>
           <h1>LOGIN FORM</h1>
           <br/>
           <div>EMAIL</div>
                        <input
                            className="input"
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                            value={email}
                            placeholder="Enter your email address here"
                        />
                        <br />
                        <div>PASSWORD</div>
                        <input
                            className="input"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            placeholder="Enter a password"
                        />
                        <br/>
                        <br/>
                        <button className="button" onClick={()=> login(email, password)}>Login Button</button>
                    <br/>
                    <br/>
                    <div>Need to sign up?&nbsp;
                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </div>
                </div>
    )
}

export default SignUp;