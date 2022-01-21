import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css'
const Homepage = () => {
    
    const navigate = useNavigate();
    const logOut = () => {
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

    return (
        <div id="homePageBackground">
            <div id="homePageContent">
                <div>
                    <button id="logOutButton" className="homePageButton" onClick={logOut}>Wyloguj się z konta</button>
                </div>
                <div>
                    <button className="homePageButton" onClick={goToCategories}>Przejdź do kategorii</button>
                </div>
                <div>
                    <button className="homePageButton" onClick={goToResult}>Przejdź do tablicy wyników</button>
                </div>
                <div>
                    <button className="homePageButton" onClick={goToRegister}>Przejdź do rejestracji</button>
                </div>
                <div>
                    <button className="homePageButton" onClick={goToLogin}>Przejdź do logowania</button>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
