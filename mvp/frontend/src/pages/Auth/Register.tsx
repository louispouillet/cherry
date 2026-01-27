import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

// Implementer peut etre une verification de mot de passe fort

const Register = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [description, setDescription] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [pictures, setPictures] = useState("");
    const [error, setError] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const phoneRegex = /^0[67]\d{8}$/;

    useEffect(() => {
        document.body.classList.add('bg');
        return () => {
            document.body.classList.remove('bg');
        };
    }, []);



    async function handleSubmit(event: any) {
        event.preventDefault();
        setError("");
        const phone_string = phone.replace(/\s/g, ''); // Supprime tous les espaces en trop
        if (!phoneRegex.test(phone_string)) {
            window.alert("Invalid phone number format (expected: 06/07 followed by 8 digits).");
            return;
        }

        const birth = new Date(birthdate);
        if (Number.isNaN(birth.getTime())) {
            window.alert("Invalid birthdate.");
            return;
        }
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age -= 1;
        }
        if (age < 18) {
            window.alert("Too young: minimum 18 years old.");
            return;
        }
        if (age > 110) {
            window.alert("Incoherent age (over 110 years old).");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/register`, { phone: phone_string, password, birthdate, firstname, lastname, description, hobbies, pictures, city });
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 409) { // Code d'erreur si le compte existe deja
                window.alert("This phone number is already in use.");
                navigate("/login");
            } else {
                window.alert("An error occurred during registration.");
            }
        }
    }
    return (
        <div className="auth-bg">
            <div className="auth-card">
                    <div className="logo-container">
                        <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo" />
                    </div>
                    <h1>Cherry</h1>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
                            <input id="firstname" type="text" placeholder="First name" className="input" onChange={(e) => setFirstname(e.target.value)} required /><br></br>
                            <input id="lastname" type="text" placeholder="Last name" className="input" onChange={(e) => setLastname(e.target.value)} required /><br></br>
                            <input id="phone" type="tel" placeholder="Phone number" className="input" onChange={(e) => setPhone(e.target.value)} required /><br></br>
                            <input id="password" type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} required /><br></br>
                            <input id="birthdate" type="date" placeholder="Birthdate" className="input" onChange={(e) => setBirthdate(e.target.value)} required /><br></br>
                            <textarea id="description" placeholder="Description" className="input" onChange={(e) => setDescription(e.target.value)} required /><br></br>
                            <input id="city" placeholder="City" className="input" onChange={(e) => setCity(e.target.value)} required /><br></br>
                            <select id="hobbies" className="input" onChange={(e) => setHobbies(e.target.value)} defaultValue="" required>
                                <option value="" disabled>Choose a hobby</option>
                                <option value="culture">Culture</option>
                                <option value="soiree">Party</option>
                                <option value="sport">Sport</option>
                                <option value="fun">Fun</option>
                            </select><br></br>
                            <input id="pictures" type="text" placeholder="Photos URL (optional)" className="input" onChange={(e) => setPictures(e.target.value)} /><br></br>
                            <button type="submit" className="button" >Register</button>
                            <p style={{ color: "black" }}> Already registered ? <a href="/login"> Login here</a> </p>
                        </form>
                    </div>
                </div>
        </div>
    )

}


export default Register;