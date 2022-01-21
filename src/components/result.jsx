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
            setResults(data);
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    }, []);
    const [results, setResults] = useState([]);
    const name = '';
    const category = '';
    const score = 0;
    return (
        <div id="resultPageBackground">
            <div id="resultContent">
                {results.map((item, index) => (
                    <div id="individualResult">
                        <div id="resultName">
                            {item.name}
                        </div>
                        <div id="resultCategory">
                            {item.category}
                        </div>
                        <div id="resultScore">
                            {item.score}
                        </div>
                    </div>
                ))}
            </div>
            <button className="homePageButton" onClick={() => navigate('/')}>Przejdź do strony głównej</button>
        </div>
    );
}

export default Result;
