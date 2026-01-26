import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from './pages/Register';
import Main from './pages/Main';
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
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home-page" element={<Home_pageContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
