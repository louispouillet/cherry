import Login from "./pages/Auth/Login";
import NotFound from "./pages/Auth/NotFound";
import Register from './pages/Auth/Register';
import Main from './pages/Auth/Main';
import MessagePreview from "./pages/Chat/messagePreview";
import Home from './pages/Home/Home_page';
import Profile from "./pages/Profile/Profile_page";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import MessageView from "./pages/Chat/messageView";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./utils/axiosConfig";
import './App.css';

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    // Configure l'intercepteur Axios pour vérifier le token automatiquement
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/message" element={
        <ProtectedRoute>
          <MessagePreview />
        </ProtectedRoute>
      } />
      <Route path="/message/:groupId" element={
        <ProtectedRoute>
          <MessageView />
        </ProtectedRoute>
      } />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/create-event" element={
        <ProtectedRoute>
          <CreateEvent />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App;
