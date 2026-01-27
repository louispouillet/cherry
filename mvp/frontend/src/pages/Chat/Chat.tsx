import axios from "axios";
import "./Chat.css";
import NavBar from "../../components/NavBar/NavBar";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';


const Chat = () => {
  const [event, setEvent] = useState<any[]>([]);
  async function handleSearch() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/user", {
        headers: {'Authorization': `Bearer ${token}`},
      });
      const groupIds = response.data.groups;

      const eventPromises = groupIds.map(async (id: any) => { 
        const response = await axios.get(`http://localhost:3000/events/${id}`, {
          headers: {'Authorization': `Bearer ${token}`},
        });
        console.log(response.data.lastMessage)
        return {
          title: response.data.title,
          photo: response.data.photos[0],
          content: response.data.lastMessage.content,
          sentAt: response.data.lastMessage.sentAt,
          senderName: response.data.lastMessage.senderName
        }
      });
      const eventResults = await Promise.all(eventPromises);
      setEvent(eventResults);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);


  return (
    <>
      <div className="header">
          <div className="firstLine">
              <div className="title">Message</div>
              <CreateEvent />
          </div>
          <div className="secondLine">
              <SearchBar />
          </div>
      </div>
      <div className="messageContainer">
        {
          event.map((event: any, index: number) => (
            <div className="messageBlock" key={index}>
              <img className="eventPicture" src={event.photo} alt="Event photo" />
              <div className="eventDetails">
                <div className="eventHeader">
                  <div className="eventTitle">{event.title}</div>
                  <div className="eventSendAgo">{formatShortAgo(new Date(event.sentAt))}</div>
                </div>
                <div className="eventText">
                  <div className="eventSenderName">{event.senderName}:</div>
                  <div className="eventContent">{event.content}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <NavBar />
    </>
  );
};

function formatShortAgo(date: Date) {
  const now = new Date(); //date actuelle
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

export default Chat;
