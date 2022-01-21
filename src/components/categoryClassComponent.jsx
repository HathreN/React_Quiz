import React from 'react';
import '../App.css'
import axios from "axios";

class CategoryClassComponent extends React.Component {
    state = {
        categories: [],
    };
    componentDidMount = () => {
        this.getCategories();
    };
    goToQuiz = (id) => {
        localStorage.setItem("id", id)
    };
    goToHome = () => {
    };
    getCategories = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/category',
            data: {
                name: this.name,
                id: this.id,
            }
        }).then((response) => {
            const data = response.data;
            this.setState({categories: data});
            console.log('Data has been received!');
        }).catch((error) => {
            alert('Error retrieving data!');
            console.log(error);
        });
    };

    render() {
        return (
            <div id="categoryBackground">
                <div id="categoryContent">
                    <div>
                        <button className="homePageButton" onClick={this.props.navigation.navigate('/')}>Wróć do ekranu głównego</button>
                    </div>
                    <div id="categoriesMap">
                        {this.state.categories.map((item, index) => (
                            <div id="categoryButton">
                                <button className="homePageButton" onClick={this.goToQuiz(item.id)}>{item.name}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;
