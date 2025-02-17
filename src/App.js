import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingConsultation from './Components/BookingConsultation';
import SelfCheckup from './Components/SelfCheckup/SelfCheckup';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import Home from './Components/Home/Home';
import Notification from './Components/Notification/Notification';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        {/* Removing duplicate Notification component from here, it has a route */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/consultation" element={<BookingConsultation />} />
          <Route path="/self-checkup" element={<SelfCheckup />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/profile-card" element={<ProfileCard />} />
          <Route path="/reports-layout" element={<ReportsLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
