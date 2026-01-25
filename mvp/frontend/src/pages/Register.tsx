import { useState } from "react";
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
    const [description, setDescripyion] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [pictures, setPictures] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const phoneRegex = /^0[67]\d{8}$/;



    async function handleSubmit(event: any) {
        event.preventDefault();
        setError("");
        const phone_string = phone.replace(/\s/g, ''); // Supprime tous les espaces en trop
        if (!phoneRegex.test(phone_string)) {
            window.alert("Format de téléphone invalide (attendu : 06/07 suivi de 8 chiffres).");
            return;
        }

        const birth = new Date(birthdate);
        if (Number.isNaN(birth.getTime())) {
            window.alert("Date de naissance invalide.");
            return;
        }
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age -= 1;
        }
        if (age < 18) {
            window.alert("Trop jeune : 18 ans minimum.");
            return;
        }
        if (age > 110) {
            window.alert("Âge incohérent (plus de 110 ans)." );
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/register`, { phone: phone_string, password, birthdate, firstname, lastname, description, hobbies, pictures });
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 409) { // Code d'erreur si le compte existe deja
                window.alert("Ce numéro de téléphone est déjà utilisé.");
                navigate("/login");
            } else {
                window.alert("Une erreur est survenue lors de l'inscription.");
            }
        }
    }
    return (
        < div >
            <div className="logo-container">
                <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo" />
            </div>
            <h1>Cherry</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
                    <input id="firstname" type="text" placeholder="Prénom" className="input" onChange={(e) => setFirstname(e.target.value)} required /><br></br>
                    <input id="lastname" type="text" placeholder="Nom" className="input" onChange={(e) => setLastname(e.target.value)} required /><br></br>
                    <input id="phone" type="tel" placeholder="Numéro de téléphone" className="input" onChange={(e) => setPhone(e.target.value)} required /><br></br>
                    <input id="password" type="password" placeholder="Mot de passe" className="input" onChange={(e) => setPassword(e.target.value)} required /><br></br>
                    <input id="birthdate" type="date" placeholder="Date de naissance" className="input" onChange={(e) => setBirthdate(e.target.value)} required /><br></br>
                    <textarea id="description" placeholder="Description" className="input" onChange={(e) => setDescripyion(e.target.value)} required /><br></br>
                    <select id="hobbies" className="input" onChange={(e) => setHobbies(e.target.value)} defaultValue="" required>
                        <option value="" disabled>Choisir un hobby</option>
                        <option value="culture">Culture</option>
                        <option value="soiree">Soirée</option>
                        <option value="sport">Sport</option>
                        <option value="fun">Fun</option>
                    </select><br></br>
                    <input id="pictures" type="text" placeholder="URL des photos (optionnel)" className="input" onChange={(e) => setPictures(e.target.value)} /><br></br>
                    <button type="submit" className="button" >Register</button>
                    <p style={{color: "black"}}> Already registered ? <a href="/login"> Login here</a> </p>
                </form>
            </div>
        </div >
    )

}


export default Register;