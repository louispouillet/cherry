import { useEffect, useState } from "react";
import axios from "axios";
import "./Home_page.css";
import NavBar from "../../components/NavBar/NavBar";


const Home_page = () => {
  const [eventIndex, setEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [eventPictures, setEventPictures] = useState<string[]>([]);
  const [isEventExpanded, setIsEventExpanded] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventNbParticipants, setEventNbParticipants] = useState(0);
  const [eventNbMaxParticipants, setEventNbMaxParticipants] = useState(0);
  const [eventAge, setEventAge] = useState(0);

  let events = [];
  let events_city: any = [];
  const mockEventPictures = [ // Pour tel en attendant deploiement backend
    "https://i.postimg.cc/hG3HmsBy/IMG-0390.jpg",
    "https://i.postimg.cc/V63hqSQ3/Full-Size-Render.jpg",
    "https://i.postimg.cc/3wKLV3QQ/IMG-6320.jpg"
  ];
  const displayedPictures = eventPictures.length > 0 ? eventPictures : mockEventPictures;
  const totalImages = displayedPictures.length;

  async function event_loading() {
    // event.preventDefault();
    /* const token = localStorage.getItem("token");*/
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzcyNTJlOWQyZWFkNmVlZTU2Y2VlZiIsImlhdCI6MTc2OTQzNzkzMSwiZXhwIjoxNzY5NTI0MzMxfQ.hycc63cnxY0KeUzSb68wXOqXQQN9uOBoI4HT3D_5Kxc";
    try {
      const response_events = await axios.get(`http://localhost:3000/events`, { headers: { 'Authorization': `Bearer ${token}` } });
      events = response_events.data;
      const data = await axios.get(`http://localhost:3000/user`, { headers: { 'Authorization': `Bearer ${token}` } });
      let city_user = data.data.city;
      events.forEach((element: any) => {
        if (element.city == city_user) {
          events_city.push(element);
        }
      });
      // utilier events_city pour avoir tous les events de la ville du user
      setEventPictures(events_city[eventIndex].photos);
      setEventDate(events_city[eventIndex].date);
      setEventDescription(events_city[eventIndex].description);
      setEventTitle(events_city[eventIndex].title);
      setEventNbParticipants(events_city[eventIndex].nbParticipants);
      setEventNbMaxParticipants(events_city[eventIndex].nbMax);
      setEventAge(events_city[eventIndex].ageMin);

      // console.log(events_city);
      // console.log(eventPictures);
      // console.log(mockEventPictures[0]);

    } catch (err: any) {
      console.error(err);

    }
    return (eventPictures);
  }
  useEffect(() => {
    event_loading();
  }, []);

  const handleEventClick = () => {
    setCurrentImageIndex((prev) => prev === totalImages - 1 ? 0 : prev + 1);
  };

  return (
    <>
      <div>
        {!isEventExpanded && (
          <div className="header_container">
            <h1 className="title_home">cherry</h1>
            <div className="top_right_icons">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon_plus">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon_filter">
                <path d="M10 5H3" />
                <path d="M12 19H3" />
                <path d="M14 3v4" />
                <path d="M16 17v4" />
                <path d="M21 12h-9" />
                <path d="M21 19h-5" />
                <path d="M21 5h-7" />
                <path d="M8 10v4" />
                <path d="M8 12H3" />
              </svg>
            </div>
          </div>
        )}

        {isEventExpanded && (
          <div className="header_container">
            <h1 className="title_home">{eventTitle}</h1>
            <div className="top_right_icons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon_close"
                onClick={() => setIsEventExpanded(false)}
                style={{ cursor: 'pointer' }}
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </div>
          </div>
        )}

        <div className="images_event" onClick={handleEventClick}>
          <div className="indice_image">
            {displayedPictures.map((_, index) => (
              <div
                key={index}
                className={`indice_bar ${currentImageIndex === index ? 'active' : ''}`}
                style={{ width: `calc((90vw - ${(totalImages - 1) * 8}px) / ${totalImages})`, maxWidth: `${320 / totalImages}px` }}
              >
              </div>
            ))}
          </div>

          {!isEventExpanded && (
            <>
              <div>
                <h2 className="event_date">16 Janvier 2026</h2>
              </div>
              <div className="event_info">
                <h2 className="event_title">{eventTitle}</h2>
                <p className="event_description"> {eventDescription}</p>
                <div className="icon_details" onClick={(e) => {
                  e.stopPropagation(); if (!isEventExpanded) {
                    setIsEventExpanded(true);
                  }
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-up-icon lucide-move-up"><path d="M8 6L12 2L16 6" /><path d="M12 2V22" /></svg>
                </div>
              </div>
            </>
          )}

          <img
            className="event_img"
            src={displayedPictures[currentImageIndex]}
            alt="Event in your area"
          />
        </div>

        {isEventExpanded && (
          <div className="event_details_expanded">
            <div className="detail_item">
              <div className="detail_header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
                <h3>Date</h3>
              </div>
              <p>16 Janvier 2026</p>
            </div>
            <div className="detail_item">
              <div className="detail_header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="#FF9FC9" /></svg>
                <h3>Type</h3>
              </div>
              <p>Party</p>
            </div>
            <div className="detail_item">
              <div className="detail_header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></svg>
                <h3>Description</h3>
              </div>
              <p>{eventDescription}</p>
            </div>
            <div className="detail_item">
              <div className="detail_header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><circle cx="10" cy="7" r="4" /><path d="M10.3 15H7a4 4 0 0 0-4 4v2" /><path d="M15 15.5V14a2 2 0 0 1 4 0v1.5" /><rect width="8" height="5" x="13" y="16" rx=".899" /></svg>
                <h3>Age Min</h3>
              </div>
              <p>{eventAge}</p>
            </div>
            <div className="detail_item">
              <div className="detail_header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
                <h3>Participants</h3>
              </div>
              <p>{eventNbParticipants}/{eventNbMaxParticipants}</p> {/*// Ajouter les noms et ou images des participants et cliquer pour voir les profils et faire en sorte que ca deborde pas */}
            </div>
          </div>
        )}
      </div>
      <NavBar />
    </>
  );
}

export default Home_page;