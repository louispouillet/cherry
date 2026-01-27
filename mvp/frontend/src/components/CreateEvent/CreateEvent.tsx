import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";


const CreateEvent = () => {
    const navigate = useNavigate();
    return (
        <div  className="plus" onClick={() => navigate('/CreateEvent')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon_plus"viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
        </div>
    );
}

export default CreateEvent;
