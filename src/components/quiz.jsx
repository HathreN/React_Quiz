import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {isExpired} from "react-jwt";
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

const Quiz = () => {
    const navigate = useNavigate();
    const [isNotLogged, setIsNotLogged] = useState(true)
    useEffect(() => {
        setLevel(localStorage.getItem("level"));
        setIsNotLogged(isExpired(localStorage.getItem('token')));
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
            setUserName(localStorage.getItem("userName"))
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    });
    const id = localStorage.getItem("id");
    let [userName, setUserName] = useState('')
    let [category, setCategory] = useState('')
    let [score, setScore] = useState(0)
    let [level, setLevel] = useState(1)
    let [questionNumber, setQuestionNumber] = useState(0)
    const [categoryQuestions, setCategoryQuestions] = useState([])
    const [name] = useState('')
    const checkAnswer = (answer) => {
        console.log(score);
        setQuestionNumber(questionNumber + 1);
        if (answer === true) {
            setScore(score + 1)
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
            localStorage.removeItem('id');
            localStorage.removeItem('level');
            navigate('/result');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    }
    function goToHome(){
        localStorage.removeItem('id');
        localStorage.removeItem('level');
        navigate('/');
    }

    function nextQuestion() {
        console.log(userName)
        if (questionNumber === categoryQuestions.length - 1) {
            console.log('test1')
            if (isNotLogged === true) {
                console.log('dzilaam')
                questionContent = (
                    <div id="quizPageBackground">
                        <div id="quizResult">
                            <button className="resultScoreButton"
                                    onClick={() => goToHome()}>{'Wróć do ekranu głównego'}</button>
                           {/* <button id="resultPostButton" className="resultPostScoreButton" disabled={true}
                                    onClick={() => goToResults()}>{'Przejdź do tablicy wyników'}</button>*/}
                            <div id="quizScore1">{'Twój wynik to: ' + score}</div>
                        </div>
                    </div>
                )
            } else {
                console.log('dzilaam')
                questionContent = (
                    <div id="quizPageBackground">
                        <div id="quizResult">
                            <button className="resultScoreButton"
                                    onClick={() => goToHome()}>{'Wróć do ekranu głównego'}</button>
                            <button id="resultPostButton" className="resultPostScoreButton"
                                    onClick={() => goToResults()}>{'Przejdź do tablicy wyników'}</button>
                            <div id="quizScore">{'Twój wynik to: ' + score}</div>
                        </div>
                    </div>
                )
            }
        } else {
            questionContent = (
                <div id="quizPageBackground">
                    {categoryQuestions.map((item, index) => (
                        index === questionNumber ? (
                            <div id="quizContent">
                                <div id="timer">
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={item.duration * level}
                                        colors={['#4CAF50', '#F7B801', '#A30000', '#A30000']}
                                        colorsTime={[7, 5, 2, 0]}
                                        onComplete={() => {
                                            setTimeout(() => {
                                                checkAnswer(false)
                                            }, 1000);
                                        }}
                                    >
                                        {({remainingTime}) => remainingTime}
                                    </CountdownCircleTimer>
                                </div>
                                <div id="quizQuestion">
                                    {item.question}
                                </div>
                                {item.answers.map((item) => (
                                    <div id="quizAnswers">
                                        <button className="homePageButton"
                                                onClick={() => checkAnswer(item.isCorrect)}>{item.content}</button>
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
