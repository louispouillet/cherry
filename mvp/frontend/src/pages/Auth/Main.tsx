import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Auth.css";

const Main = () => {
    const navigate = useNavigate();
    
    return (
        <div className="auth-bg">
                <div className="auth-card">
                    <div className="logo-container">
                        <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo" />
                    </div>
                    <h1>Cherry</h1>
                    <div className="container vertical">
                        <button className="button" onClick={() => navigate("/login")}>Login</button>
                        <button className="button" onClick={() => navigate("/register")}>Register</button>
                    </div>
                </div>
        </div>
    )
}

export default Main;