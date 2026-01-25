import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from './pages/Register';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

const LoginContainer = () => (
  <Login />
);

const RegisterContainer = () => (
  <Register />
);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
