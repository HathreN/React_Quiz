import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./components/homePage";
import Login from "./components/login";
import Register from "./components/register";
import Category from "./components/category";
import Quiz from "./components/quiz";
import Result from "./components/result";

function App() {
    return (
        <div className="App">
            <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Homepage/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/quiz' element={<Quiz/>}/>
                        <Route path='/result' element={<Result/>}/>
                        <Route path='/category' element={<Category/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
