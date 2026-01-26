import Login from "./pages/Auth/Login";
import NotFound from "./pages/Auth/NotFound";
import Register from './pages/Auth/Register';
import Main from './pages/Auth/Main';
import Chat from "./pages/Chat/Chat";   
import Home from './pages/Home/Home_page'; 
import Profile from "./pages/Profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

    

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/message" element={<Chat />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
