import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/Status/AuthContext';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Home from './pages/home/home';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
             <Route path="/" element={<Login />} />
             <Route path="/Register" element={<Register/>} />
             <Route path='/Profile' element={<Profile/>}/>
             <Route path='/home' element={<Home/>}/>
    </Routes>
  </BrowserRouter>
   </AuthProvider>
  );
}

export default App;
