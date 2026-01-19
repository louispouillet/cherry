import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    
    async function handleSubmit(event : any) {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/login`,{ phone , password});
            localStorage.setItem("token", response.data.token);
        } catch (err) {
            console.log(err);
        }
        
    }
    return (
        <div>
            <div className = "logo-container">
                <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo"/>
            </div>
            <h1>Cherry</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input id="phone" type="tel" placeholder="phone number" className="input" onChange={(e) => setPhone(e.target.value)}/><br></br>
                    <input id="password" type="password" placeholder="password" className="input" onChange={(e) => setPassword(e.target.value)}/><br></br>
                    <button type="submit" className="button">Sign in</button>
     
                    
                </form>
            </div>
        </div>
    )
}

export default Login;