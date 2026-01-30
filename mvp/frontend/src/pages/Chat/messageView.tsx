import axios from "axios";
import {useEffect, useState } from "react";
import "./messageView.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const messageView = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState<any[]>([]);
    const [groupInfo, setGroupInfo] = useState<any>([]);
    const [inputValue, setInputValue] = useState<string>("");
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
    async function SendMessage() {
        try {
            if (inputValue.trim().length === 0) {
                return;
            }
            await axios.post(`http://localhost:3000/sendMessage/${groupId}`, {
                content: inputValue,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setInputValue("");
            SearchMessage();
            //
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }


    useEffect(() => {
        SearchGroup();
        SearchMessage();
    }, []);



    return (
        <div className="viewPageContainer"> 
            <div className="messageViewHeader">
                <svg onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="backArrow lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                <div className="eventInfo" onClick={() => navigate(-1)}>
                    <img className="eventPicture" src={groupInfo.photo} alt={`${groupInfo.title} Photo`} />
                    <div className="eventTitle">{groupInfo.title}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="forwardArrow lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </div>
            </div>
            <div className="messageInputContainer">
                <input className="messageInput" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {SendMessage()} } }/>
                <svg onClick={SendMessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inputLogo lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg>
            </div>
            <div className="messageViewContainer">
                {messages.map((message, index) => {
                    // const isTheSameAsPrevious = index > 0 && messages[index - 1].userId === message.userId;
                    //date a revoir
                    const displayDate = index === 0 || (new Date(messages[index - 1].sentAt).toDateString() !== new Date(message.sentAt).toDateString());
                    const isMe = message.isMe;
                    console.log(message.content, new Date(message.sentAt).toDateString(), displayDate)
                    return (
                        <div key={message._id} className={isMe ? "messageRight" : "messageLeft"}>
                            {displayDate && <div className="messageDate">{new Date(message.sentAt).toLocaleString()}</div>}
                            <div className="messageBlock">
                                {!isMe && (
                                    <>
                                        <img className="userPicture" src={message.userPicture} alt={`${message.userName} Picture`} />
                                        <div className="userName">{message.userName}</div>
                                    </>
                                )}
                                <div className={isMe ? "messageContentRight" : "messageContentLeft"}>{message.content}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <NavBar />
        </div>
    );
}

export default messageView;