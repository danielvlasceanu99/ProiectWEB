import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserRegister from "./Components/UserRegister";

function App() {
	return (
		<div className='App'>
			<div>
				<UserRegister />
			</div>
		</div>
	);
}

export default App;
