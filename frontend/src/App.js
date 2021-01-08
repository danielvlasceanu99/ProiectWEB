import "./App.css";
import React, { useState, useEffect } from "react";
import UserRegister from "./Components/UserRegister";
function App() {
	// const [user, setUser] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [emailError, setEmailError] = useState('');
	// const [passwordError, setPassordError] = useState('');
	// const [hasAccount, setHasAccount] = useState(false);

	// const handleLogin =() =>{
	//   axios.post("http://localhost:9999/login", {email: "", password: ""}).then();
	// }

	// const handleRegister = () =>{
	//   axios.post("http://localhost:9999/create-user", {name: "", password: "", email: "", confirmPassword: ""}).then();
	// }

	return (
		<div className='App'>
			<div>
				<UserRegister />
			</div>
		</div>
	);
}

export default App;
