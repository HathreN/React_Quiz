import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css'
import axios from "axios";

const Result = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/result',
            data: {
                name: name,
                category: category,
                score: score,
            }
        }).then((response) => {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    let j = resultsCategory.length
                    if (!resultsCategory.includes(data[i].category)) {
                        resultsCategory[j] = data[i].category
                    }
                }
            }
            setCategories(resultsCategory)
            console.log(categories)
            console.log(resultsCategory)
            setResults(data);
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    });

    const resultsCategory = [];
    const [categories, setCategories] = useState([])
    const [results, setResults] = useState([]);
    const name = '';
    const category = '';
    const score = 0;

    function setVisibility(className) {
        let elems = document.getElementsByClassName(className);
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.visibility = 'visible';
        }
    }

    return (
        <div id="resultPageBackground">
            <div id="resultContent">
                {categories.map((categoryItem, index) => (
                    <div>
                        <button className="showCategoryResultsButton"
                                onClick={() => setVisibility(categoryItem)}>{categoryItem}</button>
                        {results.map((item, index) => (
                            categoryItem === item.category ? (
                                <div className={item.category} style={{visibility: "hidden", borderStyle: 'solid',borderRadius: '50px',margin: '10px 10px 10px 10px',borderColor: 'black',justifyContent: 'center',width: '50vh',height: '5vw',color: 'white',backgroundColor: '#4CAF50'}}>
                                    <div id="resultName" style={{marginTop: '15px'}}>
                                        {item.name}
                                    </div>
                                    <div id="resultCategory">
                                        {item.category}
                                    </div>
                                    <div id="resultScore">
                                        {item.score}
                                    </div>
                                </div>
                            ) : (
                                false
                            )
                        ))}
                    </div>
                ))
                }
            </div>
            <button className="homePageButton" onClick={() => navigate('/')}>Przejdź do strony głównej</button>
        </div>
    )
        ;
}

export default Result;
