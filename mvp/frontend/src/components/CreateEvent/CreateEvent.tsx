import { useState } from "react";
import "./CreateEvent.css";

interface CreateEventProps {
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

const CreateEvent = ({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }: CreateEventProps) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Utiliser les props si fournies, sinon l'état interne
    const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
    const setIsOpen = propSetIsOpen || setInternalIsOpen;

    const handleClick = () => {
        console.log("Button clicked!");
        setIsOpen(!isOpen);
    };

    return (
        <>

            {isOpen && (
                <div className="create-event-modal" onClick={() => setIsOpen(false)}>
                    <div className="create-event-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Create New Event</h2>https://i.postimg.cc/hG3HmsBy/IMG-0390.jpg
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
                                <option value="music">Music</option>
                                <option value="art">Art</option>
                                <option value="tech">Tech</option>
                            </select>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateEvent;
