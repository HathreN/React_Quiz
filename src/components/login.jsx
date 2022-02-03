import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Form.css'
import '../Input.css'
import '../App.css'
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleChangeRoute = () => {
        navigate('/')
        window.location.reload();
    };

    const validate = (event) => {
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
            handleChangeRoute();
        }).catch((error) => {
            alert("Podany email lub login są błędne!")
            console.log(error);
        });
        ;
    };
    return (
        <div id="homePageBackground">
            <div id="signinForm">
            </div>
            <div id="signForm">
                <form id="formSign" onSubmit={validate}>
                    <input className="formInput" placeholder="Login or Email" size="lg"
                           onChange={e => setEmail(e.target.value)}/><br />
                    <input id="password1"
                           pr="4.5rem"
                           type={"password"}
                           placeholder="Password"
                           onChange={e => setPassword(e.target.value)}
                    />

                    <br/>
                    <button className="homePageButton"type="submit" >Zaloguj!</button>
                </form>
            </div>
        </div>

    )
}


export default Login;
