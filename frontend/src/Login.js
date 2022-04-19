import React, { Component} from "react";
import LoginModal from "./components/loginModal";

import axios from "axios";


class Login extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            songsList:[],
            ratingsList:[],
            activeInfo:{
                id: null,
                username: '',
                password: '',
                passwordConfirm: '',
            },
        }
    };

    handleSubmit = (item) => {
        // create method 
        axios
            .post(`http://localhost:8000/api/users/`, item)
            .then((res) => this.refreshList())
            .catch((e) => this.setState({errorFlag:true, errorMessage: 'user does not exist'}))
        return;

    }

    render() {
        return(
            <main>
                <LoginModal
                    activeItem = {this.state.activeInfo}
                    onSave = {this.handleSubmit}
                />
            </main>
        );
    }
}

export default Login;