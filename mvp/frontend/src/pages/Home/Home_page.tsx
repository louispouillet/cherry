import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home_page.css";
import NavBar from "../../components/NavBar/NavBar";


const Home_page = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const eventImages = [
    "https://i.postimg.cc/hG3HmsBy/IMG-0390.jpg",
    "https://i.postimg.cc/hG3HmsBy/IMG-0390.jpg",
    "https://i.postimg.cc/hG3HmsBy/IMG-0390.jpg"
  ];
  const totalImages = eventImages.length;
  let events = [];
  let events_city: any = [];

  async function event_loading(event: any) {
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
      console.log(events_city);

    } catch (err: any) {
      console.error(err);

    }
    return;
  }
  event_loading(event);

  return (
    <>
      <div>
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
        <div className="images_event">
          <div className="indice_image">
            {eventImages.map((_, index) => (
              <div
                key={index}
                className={`indice_bar ${currentImageIndex === index ? 'active' : ''}`}
                style={{ width: `calc((90vw - ${(totalImages - 1) * 8}px) / ${totalImages})`, maxWidth: `${320 / totalImages}px` }}
              >
              </div>
            ))}
          </div>
          <div>
            <h2 className="event_date">16 Janvier 2026</h2>
          </div>
          <div className="event_info">
            <h2 className="event_title">Titre de soirée</h2>
            <p className="event_description">Voici des informations sur la soirée </p>
          </div>
          <img
            className="event_img"
            src="https://i.postimg.cc/hG3HmsBy/IMG-0390.jpg"
            alt="Event in your area"
          />
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default Home_page;