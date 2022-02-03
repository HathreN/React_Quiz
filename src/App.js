import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Homepage from "./components/homePage";
import Login from "./components/login";
import Register from "./components/register";
import Category from "./components/category";
import Quiz from "./components/quiz";
import Result from "./components/result";
import Level from "./components/level"
import {isExpired} from "react-jwt";

function App() {
    const isNotLogged = isExpired(localStorage.getItem('token'));
    return (
        <div className="App">
            <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Homepage/>}/>
                        <Route path='/login' element={!isNotLogged ? <Navigate to='/'/> : <Login/>} />
                        <Route path='/register' element={!isNotLogged ? <Navigate to='/'/> : <Register/>} />
                        <Route path='/quiz' element={<Quiz/>} />
                        <Route path='/result' element={isNotLogged ? <Navigate to='/login'/> : <Result/>} />
                        <Route path='/level' element={isNotLogged ? <Navigate to='/login'/> : <Level/>} />
                        <Route path='/category' element={<Category/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
