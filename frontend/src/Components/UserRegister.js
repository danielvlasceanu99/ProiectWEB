import React, { Component, Fragment } from 'react'

class UserRegister extends Component {

    state = {
        name: "", 
        password: "", 
        email: "", 
        confirmPassword: "",
        registered:false
    }

    changeForm = event => {
        event.preventDefault();
        if(this.state.registered === false)
            this.setState({registered: true})
        else this.setState({registered: false})
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
            .then(response => response.json());
    }

    handleLogin = event =>{
        event.preventDefault();

        const user = {
            password: this.state.password, 
            email: this.state.email
        }

        console.log(user)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                password: this.state.password, 
                email: this.state.email })
        };
        fetch('http://localhost:9999/login', requestOptions)
            .then(response => response.json());
    }

    render() {
        return (
            <section className="login">
                <div className="loginContainer">
                {this.state.registered ? (
                    <Fragment>
                        <label>
                            Email:
                            <input type="text" name="email" onChange={this.handleEmailChange}></input>
                        </label>
                        <label>
                            Password:
                            <input type="text" name="password" onChange={this.handlePasswordChange}></input>
                        </label>
                    <button  onClick={this.handleLogin}>Login</button>
                    </Fragment>
                ):
                    <Fragment>
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
                        <button  onClick={this.handleRegister}>Register</button>
                 </Fragment>}

                    <div className="btnContainer">
                        {this.state.registered ? (
                            <p>Don't have an account?<span onClick={this.changeForm}>Sign up</span></p>
                        ):<p>Have an account?<span onClick={this.changeForm}>Sign in</span></p>}
                    </div>
                </div>
            </section>
        )
    }
}

export default UserRegister
