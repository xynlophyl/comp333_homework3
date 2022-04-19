import React, { Component} from "react";
import { Redirect } from 'react-router-dom';

import axios from "axios";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';


class NewLogin extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            activeItem:{
                username: '',
                password: '',
            },
        }
    };

    handleSubmit = (item) => {
        console.log(item)
        // create method 
        axios
            .post(`http://127.0.0.1:8000/api/auth/login`, item)
            .then((res) => 
                console.log(res.data)
            )
            .catch((e) => console.log(e))
        return;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
      
        this.setState({ activeItem });
      };
    

    toggleModal = () => {
        this.setState({loginModal: !this.state.loginModal});
    };

    render() {
        return(
            <main className="container">
                <h1 className="header">Account Login</h1>
                <div className="card">
                    <Form>
                        <FormGroup>
                            <Label for="login-username">Username</Label>
                            <Input
                                type="text"
                                id="login-username"
                                name="username"
                                value={this.state.activeItem.username}
                                onChange={this.handleChange}
                                placeholder=""
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="login-password">Password</Label>
                            <Input
                                type="password"
                                id="login-password"
                                name="password"
                                value={this.state.activeItem.password}
                                onChange={this.handleChange}
                                placeholder=""
                            />
                        </FormGroup>
                    </Form>
                    <Button
                        color="success"
                        onClick={() => this.handleSubmit(this.state.activeItem)}
                    >
                        Login
                    </Button>
                </div>
            </main>
        );
    }
}

export default NewLogin;