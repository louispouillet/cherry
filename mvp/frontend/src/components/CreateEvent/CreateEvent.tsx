import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";


const CreateEvent = () => {
    const navigate = useNavigate();
    return (
        <div className="test">
            <div onClick={() => navigate('/CreateEvent')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon_plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </div>
        </div>
    );
}

export default CreateEvent;
