import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {isExpired} from "react-jwt";

const Category = () =>  {
    const navigate = useNavigate();


    const goToQuiz = (level) => {
        localStorage.setItem("level", level)
        navigate('/quiz');
    };
    const goToCategory = () => {
        navigate('/category');
    };


    return (
        <div>
            <div id="categoryBackground">
                <div id="categoryContent">
                    <div>
                        <button className="homePageButton" onClick={() => goToCategory()}>Wróć do kategorii</button>
                    </div>
                    <div id="categoriesMap">
                        <div id="categoryButton">
                            <button className="levelChooseButton" onClick={() => goToQuiz(2)}>Easy</button>
                            <button className="levelChooseButton" onClick={() => goToQuiz(1)}>Medium</button>
                            <button className="levelChooseButton" onClick={() => goToQuiz(0.5)}>Hard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
