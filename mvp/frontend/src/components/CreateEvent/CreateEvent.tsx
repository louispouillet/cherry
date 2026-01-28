import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";



const CreateEvent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Create Event clicked");
        navigate("/create-event");
    };

    return (
        <>
            <div className="create-event-modal" onClick={() => navigate("/create-event")}></div>

        <h1>Create New Event</h1>
            <form className="create-event-form">
                <label>Event Name:</label>
                <input type="text" name="eventName" required />

                <label>Description:</label>
                <textarea name="eventDescription" required></textarea>

                <label>Date:</label>
                <input type="date" name="eventDate" required />

                <label>Type:</label>
                <select name="eventType" required>
                    <option value="sport">Sport</option>
                    <option value="culture">Culture</option>
                    <option value="soirée">Soirée</option>
                    <option value="sortie_extérieure">Sortie extérieure</option>
                    <option value="éducation">Éducation</option>
                    <option value="association">Association</option>
                </select>
                <label>Participant Limit:</label>
                <input type="number" name="eventParticipantLimit" required />

                <label>Pictures:</label>
                <input type="url" name="eventPictures" multiple />

                <button type="submit">Create Event</button>
            </form>
        </>
    );
}

export default CreateEvent;
