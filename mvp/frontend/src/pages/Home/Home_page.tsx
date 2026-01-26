import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home_page.css";
import NavBar from "../../components/NavBar/NavBar";


const Home_page = () => {
  // let events_city = {};

  // async function (event : any) {
  //   event.preventDefault();
  //   try {
  //     const response_events = await axios.get(`http://localhost:3000/events`);
  //   } catch {

  //   }
  // }









  return (
    <>
      <div>
        <div className="top_right_icons">
          <h1 className="title_home">cherry</h1>
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
        <div className="images_event">
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