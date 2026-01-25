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
        const phone_string = phone.trim(); // Pour enlever les espace
        if (!phoneRegex.test(phone_string)) {
            window.alert("Format de téléphone invalide (attendu : 06/07 suivi de 8 chiffres).");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/login`, { phone: phone_string, password });
            localStorage.setItem("token", response.data.token);
        } catch (err:any) {
            console.error(err);
            window.alert("Utilisateur inconnu enregistre vous !"); // A embelir
            navigate("/register");
            return;
        }
        navigate("/home");
        return;

    }
    return (
        <div>
            <div className="logo-container">
                <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo" />
            </div>
            <h1>Cherry</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="phone number"
                        className="input"
                        pattern="^0[67]\d{8}$"
                        title="Format attendu : 06 ou 07 suivi de 8 chiffres"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    /><br></br>
                    <input id="password" type="password" placeholder="password" className="input" onChange={(e) => setPassword(e.target.value)} /><br></br>
                    <button type="submit" className="button">Sign in</button>
                </form>
            </div>
        </div>
    )
}

export default Login;