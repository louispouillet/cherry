import "./Chat.css";
import NavBar from "../../components/NavBar/NavBar";
import CreateEvent from "../../components/CreateEvent/CreateEvent";

const Chat = () => {
  return (
    <>
        <div className="header">
            <div className="firstLine">
                <div className="title">Message</div>
                <CreateEvent />
            </div>
            <div className="secondLine">
                <input type="text" className="searchBar" placeholder="Search"/>
            </div>
            
        </div>
        <NavBar />
    </>
  );
};

export default Chat;
