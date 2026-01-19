import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();


    function Register1() {

        return (
            <div>
                <div className = "logo-container">
                    <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo"/>
                </div>
                <h1>Cherry</h1>
                <div className="container">
                    <form>
                        <input id="phone" type="tel" placeholder="phone number" className="input" onChange={(e) => setPhone(e.target.value)}/><br></br>
                        <button type="submit" className="button" onClick={Register2}>Sign in</button>
        
                        
                    </form>
                </div>
            </div>
        )
        }
     function Register2() {

        return (
            <div>
                <h1>ellor3r3r3r3r3</h1>
            </div>
        )
        }
}


export default Register;