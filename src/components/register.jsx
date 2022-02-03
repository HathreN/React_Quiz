import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Form.css'
import '../Input.css'
import '../App.css'
import axios from "axios";

const Register = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate();

    const handleChangeRoute = () => {
        navigate('/login')
        window.location.reload();
    };



    const handleSubmit = (event) => {
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
            handleChangeRoute();
        }).catch((error) => {
            alert("Podany email lub login są już używane!")
            console.log(error);
        });
        ;
    };
    return (
        <div id="homePageBackground">
            <div id="signinForm">
                </div>
                <div id="signForm">
                    <form id="formSign" onSubmit={handleSubmit}>
                            <input className="formInput" placeholder="Username" size="lg"
                                   onChange={e => setName(e.target.value)}/><br />
                            <input className="formInput" placeholder="Email" size="lg" type={"email"}
                                   onChange={e => setEmail(e.currentTarget.value)}/><br />
                                <input id="password1"
                                       pr="4.5rem"
                                       type={"password"}
                                       placeholder="Password"
                                       onChange={e => setPassword(e.target.value)}
                                />

                            <br/>
                            <button className="homePageButton" type="submit" >Stwórz konto!</button>
                    </form>
                </div>
        </div>

    )
    }


export default Register;
