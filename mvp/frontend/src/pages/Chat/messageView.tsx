import axios from "axios";
import { useEffect, useState } from "react";
import "./messageView.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const messageView = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState<any[]>([]);
    const [groupInfo, setGroupInfo] = useState<any[]>([]);
    const groupId = window.location.pathname.split("/")[2];
    async function SearchGroup() {
        try {
            const response = await axios.get(`http://localhost:3000/groupInfo/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setGroupInfo(response.data);
        } catch (error) {
            console.error("Error fetching group data:", error);
        }
    }
    async function SearchMessage() {
        try {
            const response = await axios.get(`http://localhost:3000/messageView/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setMessages(response.data.response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        SearchGroup();
        SearchMessage();
    }, []);



    return (
        <> 
            <div className="messageViewHeader">
                <svg onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="backArrow lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                <div className="groupHeader" onClick={() => navigate(+1)}>
                    <img className="eventPicture" src={groupInfo.photo} alt="Group Photo" />
                    <div className="eventTitle">{groupInfo.title}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </div>
            </div>
            <div className="messageViewContainer">
                {messages.map((message) => (
                    <div key={message._id} className={"messageBlock"}>
                        <div className="userPicture"><img src={message.userPicture} alt="User Picture" /></div>
                        <div className="messageContent">{message.content}</div>
                        <div className="messageDate">{new Date(message.sentAt).toLocaleString()}</div>
                        
                    </div>
                ))}
            </div>
            <NavBar />
        </>
    );
}

export default messageView;