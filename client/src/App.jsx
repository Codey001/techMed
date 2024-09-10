import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
// import Signup from './pages/signup/Signup';
import Homepage from './components/Homepage';
import Appointments from './pages/patient/Appointments';
import BookingConsultation from './pages/patient/Bookingconsultation';
import PatientProfile from './pages/patient/Patientprofile';
import DoctorProfile from './pages/doctor/Doctorprofile';
import DoctorApproval from './pages/doctor/Doctorapproval';
import { ToastContainer } from "react-toastify";
import Trans from "./Trans"

import Login from "./components/authComponents/Login"
import Signup from "./components/authComponents/Signup"


function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/meeting" element={<Trans/>}/>


          {/* <Route element={<Signup />} index /> */}
          <Route index element={<Homepage />} />
          <Route element={<Appointments />} path="/appointments" />
          <Route element={<BookingConsultation />} path="/book-consultation" />
          <Route element={<PatientProfile />} path="/patient-profile" />
          <Route element={<DoctorProfile />} path="/doctor-profile" />
          <Route element={<DoctorApproval />} path="/doctor-approval" />
        </Route>
      </Routes>

    </div>

  );
}

export default App;
