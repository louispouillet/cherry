import Login from "./pages/Auth/Login";
import NotFound from "./pages/Auth/NotFound";
import Register from './pages/Auth/Register';
import Main from './pages/Auth/Main';
import MessagePreview from "./pages/Chat/messagePreview";   
import Home from './pages/Home/Home_page'; 
import Profile from "./pages/Profile/Profile_page";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import MessageView from "./pages/Chat/messageView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
    

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/message" element={<MessagePreview />} />
        <Route path="/message/:groupId" element={<MessageView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
