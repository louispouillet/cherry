import axios from "axios";
import "./messagePreview.css";
import NavBar from "../../components/NavBar/NavBar";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

const messagePreview = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);

  async function Search() {
    try {
      const response = await axios.get("http://localhost:3000/messagePreview", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvents(response.data.response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  
  function formatShortAgo(date: Date) {
    const now = new Date();
    const sec = differenceInSeconds(now, date);
    if (sec < 60) return `${sec} s`;
  
    const mins = differenceInMinutes(now, date);
    if (mins < 60) return `${mins} min`;
  
    const hrs = differenceInHours(now, date);
    if (hrs < 24) return `${hrs} h`;
  
    const days = differenceInDays(now, date);
    if (days < 30) return `${days} d`;
  
    const months = differenceInMonths(now, date);
    if (months < 12) return `${months} m`;
  
    const years = differenceInYears(now, date);
    return `${years} y`;
  }

  useEffect(() => {
    Search();
  }, []);

  return (
    <>
      <div className="messagePreviewHeader">
        <div className="messagePreviewFirstLine">
          <div className="messagePreviewTitle">Message</div>
          {/* <CreateEvent /> */}
        </div>
        <div className="messagePreviewSecondLine">
          <SearchBar />
        </div>
      </div>
      <div className="messagePreviewContainer">
        {events.map((event: any) => (
          <div
            className="messagePreviewMessageBlock"
            key={event._id}
            onClick={() => navigate(`/message/${event._id}`)}
          >
            <img className="messagePreviewEventPicture" src={event.photo} alt="Event photo" />
            <div className="messagePreviewEventDetails">
              <div className="messagePreviewEventHeader">
                <div className="messagePreviewEventTitle">{event.title}</div>
                <div className="messagePreviewEventSendAgo">
                  {formatShortAgo(new Date(event.sentAt))}
                </div>
              </div>
              <div className="messagePreviewEventText">
                <div className="messagePreviewEventSenderName">{event.senderName}:</div>
                <div className="messagePreviewEventContent">{event.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <NavBar />
    </>
  );
};


export default messagePreview;
