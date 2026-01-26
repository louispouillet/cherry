import Login from "./pages/Auth/Login";
import NotFound from "./pages/Auth/NotFound";
import Register from './pages/Auth/Register';
import Main from './pages/Auth/Main';
import Home_page from './pages/Home_page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

const LoginContainer = () => (
  <Login />
);

const RegisterContainer = () => (
  <Register />
);

const Home_pageContainer = () => (
  <Home_page />
);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home-page" element={<Home_pageContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
