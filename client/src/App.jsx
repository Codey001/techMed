import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Homepage from './components/Homepage';
import Login from "./components/authComponents/Login"
import Signup from "./components/authComponents/Signup"

import Appointments from './pages/patient/Dashboard';
import BookingConsultation from './pages/patient/Bookingconsultation';
import PatientProfile from './pages/patient/Patientprofile';

import DoctorApproval from './pages/doctor/Doctorapproval';
import DoctorProfile from './pages/doctor/Doctorprofile';


import Trans from "./components/webrtc/Trans"

import DoctorDashboard from './components/doctor/Doctordashboard';


function App() {

  const isLoggedIn = useSelector((state) => state.status);
  const type = useSelector((state) => state.userData?.type)


  console.log(["store in app component",isLoggedIn, type])

  const DashboardRoute = ({ isLoggedIn, type }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return type === "Patient" ? <Appointments /> : <DoctorDashboard />;
  };

  const ProfileRoute = ({ isLoggedIn, type }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return type === "Patient" ? <PatientProfile /> : <DoctorProfile />;
  };


  return (
    <div>


      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isLoggedIn ? <DashboardRoute isLoggedIn={isLoggedIn} type={type} /> : <Homepage />} />



          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<DashboardRoute isLoggedIn={isLoggedIn} type={type} />} />
          <Route path="/profile" element={<ProfileRoute isLoggedIn={isLoggedIn} type={type} />} />

          <Route path="/meeting" element={<Trans />} />
          <Route path="/booking" element={<BookingConsultation />} />





        </Route>
      </Routes>

    </div>

  );
}

export default App;
