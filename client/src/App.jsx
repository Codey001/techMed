import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
// import Signup from './pages/signup/Signup';
import Appointments from './pages/patient/Appointments';
import BookingConsultation from './pages/patient/Bookingconsultation';
import PatientProfile from './pages/patient/Patientprofile';
import DoctorProfile from './pages/doctor/Doctorprofile';
import DoctorApproval from './pages/doctor/Doctorapproval';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route element={<Signup />} index /> */}
          <Route element={<Appointments />} path="/appointments" />
          <Route element={<BookingConsultation />} path="/book-consultation" />
          <Route element={<PatientProfile />} path="/patient-profile" />
          <Route element={<DoctorProfile />} path="/doctor-profile" />
          <Route element={<DoctorApproval />} path="/doctor-approval" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
