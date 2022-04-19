import React, { Component} from "react";
import SignUpModal from "./components/signupModal";

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
                firstName: '',
                lastName: '',
            },
        }
    };

    handleSubmit = (item) => {

        item.song_artist = item.song + '_'+item.artist
        // create method 
        axios
            .get(`http://localhost:8000/api/'users'/`, item)
            .then((res) => this.refreshList())
            .catch((e) => this.setState({errorFlag:true, errorMessage: 'user does not exist'}))
        return;

    }


    render() {
        return(
            <main>
                <SignUpModal
                    activeItem = {this.state.activeInfo}
                    onSave = {this.handleSubmit}
                />
            </main>
        );
    }
}

export default Login;