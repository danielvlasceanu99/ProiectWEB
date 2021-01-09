import axios from "axios";
import React, { Component, Fragment } from "react";
import NoteStore from "./NoteStore";

class UserRegister extends Component {
	state = {
		name: "",
		password: "",
		email: "",
		confirmPassword: "",
		registered: false,
		loggedIn: null,
	};

	//luam referintele pentru inputuri pentru a le reseta valorile
	inputNameRegister = React.createRef();
	inputEmailRegister = React.createRef();
	inputPasswordRegister = React.createRef();
	inputConfirmPasswordRegister = React.createRef();

	inputEmailLogin = React.createRef();
	inputPasswordLogin = React.createRef();

	changeForm = (event) => {
		event.preventDefault();
		//daca intram pe login
		if (this.state.registered === false) {
			this.setState({ registered: true });

			this.inputNameRegister.current.value = "";
			this.inputConfirmPasswordRegister.current.value = "";
			this.inputEmailRegister.current.value = "";
			this.inputPasswordRegister.current.value = "";
		} else {
			//daca intram pe register
			this.setState({ registered: false });

			this.inputEmailLogin.current.value = "";
			this.inputPasswordLogin.current.value = "";
		}
	};

	handleNameChange = (event) => {
		this.setState({ name: event.target.value });
	};
	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};
	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};
	handleConfirmPasswordChange = (event) => {
		this.setState({ confirmPassword: event.target.value });
	};

	handleRegister = (event) => {
		event.preventDefault();

		const user = {
			name: this.state.name,
			password: this.state.password,
			email: this.state.email,
			confirmPassword: this.state.confirmPassword,
		};

		console.log(user);

		// axios.post("http://localhost:9999/create-user", {user})
		// .then(res => {
		//     console.log(res);
		//     console.log(res.data);
		// }).catch(err => {
		//     console.log(err.response)
		// });

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: this.state.name, password: this.state.password, email: this.state.email, confirmPassword: this.state.confirmPassword }),
		};
		fetch("http://localhost:9999/create-user", requestOptions).then((response) => response.json());
	};

	handleLogin = (event) => {
		event.preventDefault();

		const user = {
			password: this.state.password,
			email: this.state.email,
		};

		axios.post("http://localhost:9999/login", { password: this.state.password, email: this.state.email }).then((response) => {
			this.setState({ loggedIn: response.data });
			this.setState({ loggedIn: response.data["id"] });
			console.log(this.state.loggedIn);
		});
	};

	render() {
		return (
			<div>
				{this.state.loggedIn ? ( //iei datele in componenta ta cu this.props //<Componenta this.state.loggedIn/>
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					// aici madaline -> componenta
					<NoteStore />
				) : (
					<section className='login'>
						<div className='loginContainer'>
							{this.state.registered ? (
								<Fragment>
									<label>
										Email:
										<input ref={this.inputEmailLogin} type='text' name='emailLogin' onChange={this.handleEmailChange}></input>
									</label>
									<label>
										Password:
										<input ref={this.inputPasswordLogin} type='text' name='passwordLogin' onChange={this.handlePasswordChange}></input>
									</label>
									<button onClick={this.handleLogin}>Login</button>
								</Fragment>
							) : (
								<Fragment>
									<label>
										Name:
										<input ref={this.inputNameRegister} type='text' name='nameRegister' onChange={this.handleNameChange}></input>
									</label>
									<label>
										Email:
										<input ref={this.inputEmailRegister} type='text' name='emailRegister' onChange={this.handleEmailChange}></input>
									</label>
									<label>
										Password:
										<input ref={this.inputPasswordRegister} type='text' name='passwordRegister' onChange={this.handlePasswordChange}></input>
									</label>
									<label>
										Confirm Password:
										<input
											ref={this.inputConfirmPasswordRegister}
											type='text'
											name='confirmPasswordRegister'
											onChange={this.handleConfirmPasswordChange}></input>
									</label>
									<button onClick={this.handleRegister}>Register</button>
								</Fragment>
							)}

							<div className='btnContainer'>
								{this.state.registered ? (
									<p>
										Don't have an account?<span onClick={this.changeForm}>Sign up</span>
									</p>
								) : (
									<p>
										Have an account?<span onClick={this.changeForm}>Sign in</span>
									</p>
								)}
							</div>
						</div>
					</section>
				)}
			</div>
		);
	}
}

export default UserRegister;
