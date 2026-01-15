import { useState } from 'react';
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import './App.css'

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
      <Route path="/login" element={<LoginContainer />} />
       <Route path="/register" element={<RegisterContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
