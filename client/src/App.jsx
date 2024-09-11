import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
// import Signup from './pages/signup/Signup';
import Homepage from './components/Homepage';
// import Appointments from './pages/patient/Appointments';
// import BookingConsultation from './pages/patient/Bookingconsultation';
// import PatientProfile from './pages/patient/Patientprofile';
// import DoctorProfile from './pages/doctor/Doctorprofile';
// import DoctorApproval from './pages/doctor/Doctorapproval';
import Trans from "./Trans"

import Login from "./components/authComponents/Login"
import Signup from "./components/authComponents/Signup"
import { useSelector } from 'react-redux';
import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';




import DoctorDashboard from './components/dashboards/DoctorDashboard';
import PatientDashboard from './components/dashboards/PatientDashboard';

import PatientProfile from "./components/profile/PatientProfile"
import DoctorProfile from "./components/profile/DoctorProfile"
import Booking from './components/Booking';


function App() {

  const isLoggedIn = useSelector((state) => state.status);
  const type = useSelector((state) => state.userData?.type)


  


  console.log(["store in app component",isLoggedIn, type])

  const DashboardRoute = ({ isLoggedIn, type }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
    
    return type === "Patient" ? <PatientDashboard /> : <DoctorDashboard />;
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
          <Route index element={ isLoggedIn ? <DashboardRoute isLoggedIn={isLoggedIn} type={type} /> : <Homepage />} />



          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>

          <Route path="/dashboard" element={<DashboardRoute isLoggedIn={isLoggedIn} type={type} />}/>
          <Route path="/profile" element={<ProfileRoute isLoggedIn={isLoggedIn} type={type}/>}/>

          <Route path="/meeting" element={<Trans/>}/>
          <Route path="/booking" element={<Booking/>}/>


          {/* <Route element={<Signup />} index /> */}
          {/* <Route element={<Appointments />} path="/appointments" /> */}
          {/* <Route element={<BookingConsultation />} path="/book-consultation" /> */}
          {/* <Route element={<PatientProfile />} path="/patient-profile" /> */}
          {/* <Route element={<DoctorProfile />} path="/doctor-profile" /> */}
          {/* <Route element={<DoctorApproval />} path="/doctor-approval" /> */}




        </Route>
      </Routes>

    </div>

  );
}

export default App;
