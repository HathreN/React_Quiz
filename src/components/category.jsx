import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {isExpired} from "react-jwt";

const Category = () => {
    const navigate = useNavigate();
    const name = '';
    const id = '';
    const [categories, setCategories] = useState([{name: 'Moda na sukces', id: 0}])
    const [isNotLogged, setIsNotLogged] = useState(true)

    const goToLevel = (id) => {
        localStorage.setItem("id", id)
            if (isNotLogged === false) {
                navigate('/level');
            } else {
                navigate('/quiz');
                localStorage.setItem("level", 1)
            }
    };
    const goToHome = () => {
        navigate('/');
    };

    let categoryContent;
    useEffect(() => {
        console.log(localStorage.getItem('id'))
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
            //console.log(categories);
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    }, []);

    function showCategoryContent() {
        //console.log(isNotLogged)
        //console.log(categories)
        if (isNotLogged === true) {
            categoryContent = (
                <div id="categoryBackground">
                    <div id="categoryContent">
                        <div>
                            <button className="homePageButton" onClick={() => goToHome()}>Wróć do ekranu głównego
                            </button>
                        </div>
                        <div id="categoriesMap">
                            <div id="categoryButton">
                                <button className="homePageButton"
                                        onClick={() => goToLevel(categories[0].id)}>{categories[0].name}</button>
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
                            <button className="homePageButton" onClick={() => goToHome()}>Wróć do ekranu głównego
                            </button>
                        </div>
                        <div id="categoriesMap">
                            {categories.map((item, index) => (
                                <div id="categoryButton">
                                    <button className="homePageButton"
                                            onClick={() => goToLevel(item.id)}>{item.name}</button>
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
