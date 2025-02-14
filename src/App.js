import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign_Up/Sign_Up";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import BookingConsultation from './Components/BookingConsultation';
import SelfCheckup from './Components/SelfCheckup/SelfCheckup';
import Notification from './Components/Notification/Notification';
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Notification />

        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path='/Home' element ={<Home/>}/>
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path='/BookingConsultation' element={<BookingConsultation/>}/>
          <Route path="/SelfCheckup" element={<SelfCheckup/>} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/reviews" element={<ReviewForm />} />  {/* 🔹 ADD THIS */}
          <Route path="/ProfileCard" element={<ProfileCard/>}/>
          <Route path="/ReportsLayout" element={<ReportsLayout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
