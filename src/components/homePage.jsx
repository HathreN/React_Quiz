import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css'
import {decodeToken, isExpired} from "react-jwt";

const Homepage = () => {

    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('token')
        window.location.reload();
    };
    const [isLoggedIn, setIsLoggedIn] = useState('')
    const goToCategories = () => {
        navigate('/category')
    };
    const goToResult = () => {
        navigate('/result')
    };
    const goToRegister = () => {
        navigate('/register')
    };
    const goToLogin = () => {
        navigate('/login')
    };
    const [checkToken, setCheckToken] = useState('')
    const user = decodeToken(localStorage.getItem('token'));
    const isNotLogged = isExpired(localStorage.getItem('token'));


    return (
        <div id="homePageBackground">
            <div id="homePageContent">
                <div>
                    {!isNotLogged &&  <button id="logOutButton" className="homePageButton" onClick={logOut}>Wyloguj się z konta</button>}
                </div>
                <div>
                    <button className="homePageButton" onClick={goToCategories}>Przejdź do kategorii</button>
                </div>
                <div>
                    {!isNotLogged && <button className="homePageButton" onClick={goToResult}>Przejdź do tablicy wyników</button>}
                </div>
                <div>
                    {isNotLogged && <button className="homePageButton" onClick={goToRegister}>Przejdź do rejestracji</button>}
                </div>
                <div>
                    {isNotLogged && <button className="homePageButton" onClick={goToLogin}>Przejdź do logowania</button>}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
