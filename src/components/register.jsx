import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const Register = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate();

    const HandleChangeRoute = () => {
        navigate('/')
        window.location.reload();
    };



    const HandleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/create',
            data: {
                email: email,
                name: name,
                password: password,
            }
        }).then((response) => {
            HandleChangeRoute();
        }).catch((error) => {
            alert("Podany email lub login są już używane!")
            console.log(error);
        });
        ;
    };
    return (
        <div id="signUpBackground">
            <div id="signinForm">
                </div>
                <div id="signForm">
                    <form id="formSign" onSubmit={HandleSubmit}>
                            <input className="formInput" placeholder="First Name" size="lg"
                                   onChange={e => setName(e.target.value)}/><br />
                            <input className="formInput" placeholder="Email" size="lg"
                                   onChange={e => setEmail(e.currentTarget.value)}/><br />
                                <input id="password1"
                                       pr="4.5rem"
                                       type={"password"}
                                       placeholder="Password"
                                       onChange={e => setPassword(e.target.value)}
                                />

                            <br/>
                            <button id="createAccountButton" type="submit" colorScheme="blue">Stwórz konto!</button>&nbsp;&nbsp;
                    </form>
                </div>
        </div>

    )
    }


export default Register;
