import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Category = () =>  {
    const navigate = useNavigate();
    const name='';
    const id='';
    const [categories, setCategories] = useState([])
    const getQuestions = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/category',
            data: {
                name: name,
                id: id,
            }
        }).then((response) => {
            const data = response.data;
            //console.log(data);
            setCategories(data);
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
    useEffect(() => {
            getQuestions();
    }, []);
        return (
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
        );
}

export default Category;
