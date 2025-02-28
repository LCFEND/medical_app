import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";  // ❌ Removed BrowserRouter
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelfCheckup from './Components/SelfCheckup/SelfCheckup';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import Home from './Components/Home/Home';
import Notification from './Components/Notification/Notification';
import BookConsultation from './Components/BookingConsultation/BookConsultation';
import Healthblog from './Components/Healthblog/Healthblog';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        <Route path="/self-checkup" element={<SelfCheckup />} />
        <Route path="/reviews" element={<ReviewForm />} />
        <Route path="/profile-card" element={<ProfileCard />} />
        <Route path="/reports-layout" element={<ReportsLayout />} />
        <Route path="/book-appointment" element={<BookConsultation />} />
        <Route path="/Healthblog" element={<Healthblog />} />
      </Routes>
      <Notification />
    </div>
  );
}

export default App;
