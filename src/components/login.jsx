import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const Login = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate();

    const HandleChangeRoute = () => {
        navigate('/')
        window.location.reload();
    };



    const Validate = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/auth',
            data: {
                email: email,
                password: password,
            }
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName',email);
            localStorage.setItem('isLoggedIn', 'yes');
            HandleChangeRoute();
        }).catch((error) => {
            alert("Podany email lub login są błędne!")
            console.log(error);
        });
        ;
    };
    return (
        <div id="signUpBackground">
            <div id="signinForm">
            </div>
            <div id="signForm">
                <form id="formSign" onSubmit={Validate}>
                    <input className="formInput" placeholder="First Name" size="lg"
                           onChange={e => setEmail(e.target.value)}/><br />
                    <input id="password1"
                           pr="4.5rem"
                           type={"password"}
                           placeholder="Password"
                           onChange={e => setPassword(e.target.value)}
                    />

                    <br/>
                    <button id="createAccountButton" type="submit" colorScheme="blue">Zaloguj!</button>&nbsp;&nbsp;
                </form>
            </div>
        </div>

    )
}


export default Login;
