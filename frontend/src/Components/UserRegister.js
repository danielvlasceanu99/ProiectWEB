import React, { Component } from 'react'
import axios from 'axios'

class UserRegister extends Component {

    state = {
        name: "", 
        password: "", 
        email: "", 
        confirmPassword: ""
    }

    handleNameChange = event => {
        this.setState({ name: event.target.value});
    }
    handlePasswordChange = event => {
        this.setState({ password: event.target.value});
    }
    handleEmailChange = event => {
        this.setState({ email: event.target.value});
    }
    handleConfirmPasswordChange = event => {
        this.setState({ confirmPassword: event.target.value});
    }

    handleRegister = event =>{
        event.preventDefault();

        const user = {
            name: this.state.name, 
            password: this.state.password, 
            email: this.state.email, 
            confirmPassword: this.state.confirmPassword
        }

        console.log(user)

        // axios.post("http://localhost:9999/create-user", {user})
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // }).catch(err => {
        //     console.log(err.response)
        // });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({   name: this.state.name, 
                password: this.state.password, 
                email: this.state.email, 
                confirmPassword: this.state.confirmPassword  })
        };
        fetch('http://localhost:9999/create-user', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={this.handleNameChange}></input>
                </label>
                <label>
                    Email:
                    <input type="text" name="email" onChange={this.handleEmailChange}></input>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" onChange={this.handlePasswordChange}></input>
                </label>
                <label>
                    Confirm Password:
                    <input type="text" name="confirmPassword" onChange={this.handleConfirmPasswordChange}></input>
                </label>
                <button type="register">Register</button>
            </form>
        )
    }
}

export default UserRegister
