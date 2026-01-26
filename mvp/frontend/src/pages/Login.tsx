import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const phoneRegex = /^0[67]\d{8}$/;

    async function handleSubmit(event: any) {
        event.preventDefault();
        const phone_string = phone.replace(/\s/g, ''); // Pour enlever tous les espaces en trop
        console.log("Submitting login for phone:", phone_string);
        if (!phoneRegex.test(phone_string)) {
            window.alert("Invalid phone number format (expected: 06/07 followed by 8 digits).");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/login`, { phone: phone_string, password });
            localStorage.setItem("token", response.data.token);
        } catch (err: any) {
            console.error(err);
            window.alert("You don't have an account! Please register."); // A embelir
            navigate("/register");
            return;
        }
        navigate("/home");
        return;

    }
    return (
        <body className="bg">
            <div className="auth-bg">
                <div className="auth-card">
                    <div className="logo-container">
                        <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo" />
                    </div>
                    <h1>Cherry</h1>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Phone number"
                                className="input"
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            /><br></br>
                            <input id="password" type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} /><br></br>
                            <button type="submit" className="button">Sign in</button>
                            <p style={{ color: "black" }}> You don't have an account ? <a href="/register">Register here</a> </p>
                        </form>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Login;