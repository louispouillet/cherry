import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Home_page.css";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const Home_page = () => {
  const navigate = useNavigate();
  const [eventIndex, setEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [eventPictures, setEventPictures] = useState<string[]>([]);
  const [isEventExpanded, setIsEventExpanded] = useState(false);
  const [eventDate, setEventDate] = useState(""); // A faire et ajouter type
  const [eventDescription, setEventDescription] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventNbParticipants, setEventNbParticipants] = useState(0);
  const [eventNbMaxParticipants, setEventNbMaxParticipants] = useState(0);
  const [eventAge, setEventAge] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalImages = eventPictures.length;
  const [events_city, setEvents_city] = useState<any[]>([]);
  const [swipeStart, setSwipeStart] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [gestureLocked, setGestureLocked] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const [nextEventPictures, setNextEventPictures] = useState<string[]>([]);
  const [nextEventDate, setNextEventDate] = useState("");
  const [nextEventDescription, setNextEventDescription] = useState("");
  const [nextEventTitle, setNextEventTitle] = useState("");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Mettre en useState
  let events = [];

  // Pour tel en attendant deploiement backend
  const mockEventPictures = [
    "https://i.postimg.cc/hG3HmsBy/IMG-0390.jpg",
    "https://i.postimg.cc/V63hqSQ3/Full-Size-Render.jpg",
    "https://i.postimg.cc/3wKLV3QQ/IMG-6320.jpg"
  ];

  async function event_loading() {
    // event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response_events = await axios.get(`http://localhost:3000/events`, { headers: { 'Authorization': `Bearer ${token}` } });
      events = response_events.data;
      const data = await axios.get(`http://localhost:3000/user`, { headers: { 'Authorization': `Bearer ${token}` } });
      let city_user = data.data.city;

      const verifEvent = (event: any, cityUser: string, userId: string) => {
        if (event.city !== cityUser) {
          return false;
        }

        if (event.participants.includes(userId)) {
          return false;
        }
        return true;
      };

      const userId = data.data._id;
      const filteredEvents = events.filter((event: any) => verifEvent(event, city_user, userId));

      setEvents_city(filteredEvents);

      if (filteredEvents.length > 0) {
        const firstEvent = filteredEvents[0];
        setEventPictures(firstEvent.photos || []);
        setEventDate(firstEvent.date);
        setEventDescription(firstEvent.description);
        setEventTitle(firstEvent.title);
        setEventNbParticipants(firstEvent.nbParticipants);
        setEventNbMaxParticipants(firstEvent.nbMax);
        setEventAge(firstEvent.ageMin);
      } else {
        setLoading(true);
      }


    } catch (err: any) {
      console.error(err);

    }
    return (eventPictures);
  }
  useEffect(() => {
    event_loading();
  }, []);

  useEffect(() => {
    if (events_city.length === 0) return;

    const currentEvent = events_city[eventIndex];

    setEventPictures(currentEvent.photos);
    setEventDate(currentEvent.date);
    setEventDescription(currentEvent.description);
    setEventTitle(currentEvent.title);
    setEventNbParticipants(currentEvent.nbParticipants);
    setEventNbMaxParticipants(currentEvent.nbMax);
    setEventAge(currentEvent.ageMin);
    setCurrentImageIndex(0);
    
    // Charger le prochain événement
    const nextIndex = eventIndex === events_city.length - 1 ? 0 : eventIndex + 1;
    const nextEvent = events_city[nextIndex];
    if (nextEvent) {
      setNextEventPictures(nextEvent.photos || []);
      setNextEventDate(nextEvent.date);
      setNextEventDescription(nextEvent.description);
      setNextEventTitle(nextEvent.title);
    }
  }, [events_city, eventIndex]);



  const handleEventClick = () => {
    setCurrentImageIndex((prev) => prev === totalImages - 1 ? 0 : prev + 1);
  };

  const ChangeEventClick = () => {
    setEventIndex((prev) => prev === events_city.length - 1 ? 0 : prev + 1);
  };

  const handleSwipeStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    // Désactiver les interactions pendant l'animation de swipe ou si geste verrouillé
    if (isEventExpanded || swipeDirection || gestureLocked) return;

    if ('touches' in e) {
      setSwipeStart(e.touches[0].clientX);
    } else {
      setSwipeStart(e.clientX);
    }
  };

  const handleSwipeMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (swipeStart === null) return;

    let currentX = 0;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }

    const diff = swipeStart - currentX;

    // Ne commence à drag que si le mouvement est significatif (> 5px)
    if (Math.abs(diff) > 5) {
      setIsDragging(true);
      setDragX(-diff);
    }
  };

  const handleSwipeEnd = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (isEventExpanded || swipeStart === null || swipeDirection || gestureLocked) return;

    let endX = 0;
    if ('changedTouches' in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }

    const diff = swipeStart - endX;
    const swipeThreshold = 150;

    // Réinitialiser IMMÉDIATEMENT tous les états pour oublier la position du touch/clic
    setSwipeStart(null);
    setIsDragging(false);
    setDragX(0);
    setGestureLocked(true); // Verrouiller pour éviter les faux swipes sur le prochain événement

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // On ajoute l'image swipe right dans les likes
        // On l'enleve des evenements qui reviennent dans la page d'acceuil
        setSwipeDirection('left');
        setTimeout(() => {
          ChangeEventClick();
          setSwipeDirection(null);
          setGestureLocked(false); // Déverrouiller après l'animation
        }, 400);
      } else {
        // On le laisse dans les evenements qui reviennent dans la page d'acceuil
        setSwipeDirection('right');
        setTimeout(() => {
          ChangeEventClick();
          setSwipeDirection(null);
          setGestureLocked(false); // Déverrouiller après l'animation
        }, 400);
      }
    } else {
      // Si pas de swipe valide, déverrouiller immédiatement
      setGestureLocked(false);
    }
  };

  return (
    <>
      {!loading && (
        <div>
          {!isEventExpanded && (
            <div className="header_container">
              <h1 className="title_home">cherry</h1>
              <div className="top_right_icons">
                <div onClick={() => navigate("/create-event")} style={{ cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon_plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>

                </div>
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

          {/* Prochain événement en arrière-plan */}
          {!isEventExpanded && (isDragging || swipeDirection) && nextEventPictures.length > 0 && (
            <div 
              className="next-event"
              style={{
                opacity: swipeDirection ? 1 : 0.5,
                transition: swipeDirection ? 'opacity 0.5s ease-out' : 'none'
              }}
            >
              <div className="indice_image">
                {nextEventPictures.map((_, index) => (
                  <div
                    key={index}
                    className={`indice_bar ${index === 0 ? 'active' : ''}`}
                    style={{ width: `calc((90vw - ${(nextEventPictures.length - 1) * 8}px) / ${nextEventPictures.length})`, maxWidth: `${320 / nextEventPictures.length}px` }}
                  >
                  </div>
                ))}
              </div>

              <div className="event_info_container">
                <div className="event_date">
                  <h2>{nextEventDate.substring(8, 10)} {monthNames[parseInt(nextEventDate.substring(5, 7)) - 1]} {nextEventDate.substring(0, 4)}</h2>
                </div>
                <div className="event_info">
                  <h2 className="event_title">{nextEventTitle}</h2>
                  <p className="event_description">{nextEventDescription}</p>
                </div>
              </div>

              <img
                className="event_img"
                src={nextEventPictures[0]}
                alt="Next event"
                style={{ cursor: 'grab', userSelect: 'none' }}
              />
            </div>
          )}

          <div
            className={`images_event ${swipeDirection === 'left' ? 'swipe-left' : swipeDirection === 'right' ? 'swipe-right' : ''}`}
            onClick={handleEventClick}
            onTouchStart={handleSwipeStart}
            onTouchEnd={handleSwipeEnd}
            onTouchMove={handleSwipeMove}
            onMouseDown={handleSwipeStart}
            onMouseUp={handleSwipeEnd}
            onMouseMove={handleSwipeMove}
            style={{
              transform: isDragging && !swipeDirection ? `translateX(${dragX}px) rotate(${dragX / 10}deg)` : 'none',
              transition: isDragging ? 'none' : 'transform 0.3s ease'
            }}
          >
            <div className={`indice_image ${isDragging ? 'hidden' : ''}`}>
              {eventPictures.map((_, index) => (
                <div
                  key={index}
                  className={`indice_bar ${currentImageIndex === index ? 'active' : ''}`}
                  style={{ width: `calc((90vw - ${(totalImages - 1) * 8}px) / ${totalImages})`, maxWidth: `${320 / totalImages}px` }}
                >
                </div>
              ))}
            </div>

            {!isEventExpanded && (
              <div className="event_info_container">
                <div className="event_date">
                  <h2>{eventDate.substring(8, 10)} {monthNames[parseInt(eventDate.substring(5, 7)) - 1]} {eventDate.substring(0, 4)}</h2>
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
              </div>
            )}

            <img
              ref={imageRef}
              className={`event_img ${swipeDirection === 'left' ? 'swipe-left' : swipeDirection === 'right' ? 'swipe-right' : ''}`}
              src={eventPictures[currentImageIndex]}
              alt="Event in your area"
              style={{ cursor: 'grab', userSelect: 'none' }}
            />
          </div>

          {/* Icônes de swipe en dehors de l'image */}
          {!isEventExpanded && isDragging && (
            <div className="swipe-icons-overlay">
              {dragX > 50 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swipe-icon">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              ) : dragX < -50 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="swipe-icon">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : null}
            </div>
          )}

          {isEventExpanded && (
            <div className="event_details_expanded">
              <div className="detail_item">
                <div className="detail_header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
                  <h3>Date</h3>
                </div>
                <p>{eventDate.substring(8, 10)} {monthNames[parseInt(eventDate.substring(5, 7)) - 1]} {eventDate.substring(0, 4)}</p>
              </div>
              <div className="detail_item">
                <div className="detail_header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF9FC9" stroke="#FF9FC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="detail_icon"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="#FF9FC9" /></svg>
                  <h3>Type</h3>
                </div>
                <p>Party</p> {/* A changer pour avoir le type d'event (mettre la colonne dans la BDD*/}
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
      )}
      {loading && (
        <div>
          <div className="header_container">
            <h1 className="title_home">cherry</h1>
            <div className="top_right_icons">
              <div onClick={() => navigate("/create-event")} style={{ cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon_plus" >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
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
          <div className="logo_home">
            <img src="https://raw.githubusercontent.com/LoucheVDC/Assets/main/cherry.png" alt="logo" />
            <h3> No event in your area ! Loading ...</h3>
          </div>
        </div>
      )}
      <NavBar />
    </>
  );
}

export default Home_page;