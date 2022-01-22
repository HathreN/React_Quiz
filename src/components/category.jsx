import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {isExpired} from "react-jwt";

const Category = () =>  {
    const navigate = useNavigate();
    const name='';
    const id='';
    const [categories, setCategories] = useState([{name: 'Moda na sukces', id: 0}])
    const [isNotLogged,setIsNotLogged] = useState(true)

    function getQuestions(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/category',
            data: {
                name: name,
                id: id,
            }
        }).then((response) => {
            const data = response.data;
            setCategories(data);
            console.log(categories);
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    };

    const goToQuiz = (id) => {
        localStorage.setItem("id", id)
        navigate('/quiz');
    };
    const goToHome = () => {
        navigate('/');
    };

    let categoryContent;
    useEffect(() => {
        setIsNotLogged(isExpired(localStorage.getItem('token')));
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/category',
            data: {
                name: name,
                id: id,
            }
        }).then((response) => {
            const data = response.data;
            setCategories(data);
            console.log(categories);
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    }, []);
    function showCategoryContent () {
        console.log(isNotLogged)
        console.log(categories)
        if (isNotLogged === true) {
            categoryContent = (
                <div id="categoryBackground">
                    <div id="categoryContent">
                        <div>
                            <button className="homePageButton" onClick={() => goToHome()}>Wróć do ekranu głównego</button>
                        </div>
                        <div id="categoriesMap">
                            <div id="categoryButton">
                                <button className="homePageButton" onClick={() => goToQuiz(categories[0].id)}>{categories[0].name}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            categoryContent = (
                <div id="categoryBackground">
                    <div id="categoryContent">
                        <div>
                            <button className="homePageButton" onClick={() => goToHome()}>Wróć do ekranu głównego</button>
                        </div>
                        <div id="categoriesMap">
                            {categories.map((item, index) => (
                                <div id="categoryButton">
                                    <button className="homePageButton" onClick={() => goToQuiz(item.id)}>{item.name}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
        return categoryContent;
    }

    return (
        <div>
            {showCategoryContent()}
        </div>
    );
}

export default Category;
