import axios from "axios";
import { useEffect, useState } from "react";
import "./messageView.css";
import { useNavigate } from "react-router-dom";


const messageView = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState<any[]>([]);
    async function Search() {
        try {
            const groupId = window.location.pathname.split("/")[2];
            const response = await axios.get(`http://localhost:3000/messageView/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setMessages(response.data.response);
            console.log("Response data:", response.data.response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        Search();
    }, []);

    return (
        <>
            <div onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="backArrow lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <div className="messageContainer">
                {messages.map((message) => (
                    <div key={message._id} className={"messageBlock" + (message.senderName === "me" ? "sender" : "receiver")}>
                        <div></div>
                        <div></div>
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default messageView;