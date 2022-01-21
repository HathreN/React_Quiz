import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Quiz = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/quiz',
            data: {
                name: name,
                id: id,
                questionsDetails: categoryQuestions,
            }
        }).then((response) => {
            const data = response.data;
            setCategoryQuestions(data[id].questionsDetails);
            setCategory(data[id].name);
            setUserName(localStorage.getItem("userID"))
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    }, []);
    const id = localStorage.getItem("id");
    let [userName, setUserName] = useState('')
    let [category, setCategory] = useState('')
    let [score, setScore] = useState(0)
    let [questionNumber, setQuestionNumber] = useState(0)
    const [categoryQuestions, setCategoryQuestions] = useState([])
    const [name] = useState('')
    const checkAnswer = (answer) => {
        console.log(score);
        setQuestionNumber(questionNumber + 1);
        if (answer === true) {
            setScore(score+1)
            console.log(questionNumber);
            nextQuestion();
        } else {
            console.log(questionNumber);
            nextQuestion();
        }
    };
    let questionContent;
    function goToResults() {
        console.log(score + ' ' + category + ' ' + userName)
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/result/create',
            data: {
                name: userName,
                category: category,
                score: score,
            }
        }).then((response) => {
            navigate('/result')
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    }
    function nextQuestion() {
        if (questionNumber === categoryQuestions.length - 1) {
            console.log(userName)
            if(userName === 'empty'){
                questionContent = (
                    <div id="homePageBackground">
                        <div>{'Twój wynik to: ' + score}</div>
                        <button className="resultScoreButton" onClick={() => navigate('/')}>{'Wróć do ekranu głównego'}</button>
                        <button id="resultPostButton"className="resultPostScoreButton" disabled={true} onClick={() => goToResults()}>{'Przejdź do tablicy wyników'}</button>
                    </div>
                )
            } else {
                questionContent = (
                    <div id="homePageBackground">
                        <div>{'Twój wynik to: ' + score}</div>
                        <button className="resultScoreButton"
                                onClick={() => navigate('/')}>{'Wróć do ekranu głównego'}</button>
                        <button id="resultPostButton" className="resultPostScoreButton"
                                onClick={() => goToResults()}>{'Przejdź do tablicy wyników'}</button>
                    </div>
                )
            }
        } else {
            questionContent = (
                <div id="homePageBackground">
                    {categoryQuestions.map((item, index) => (
                        index === questionNumber ? (
                            <div id="quizContent">
                                <div id="quizQuestion">
                                    {item.question}
                                </div>
                                {item.answers.map((item) => (
                                    <div id="quizAnswers">
                                        <button className="homePageButton"
                                                onClick={() => checkAnswer(item.isCorrect)}>{item.content}{item.isCorrect.toString()}</button>
                                    </div>
                                ))}
                            </div>
                        ) : false
                    ))}
                </div>
            )
        }
        return questionContent;
    }

    return (
        <div>
            {nextQuestion()}
        </div>
    );

}

export default Quiz;
