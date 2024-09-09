import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from './pages/signupPage';
import AppointmentsPage from './pages/patient/appointmentsPage';
import BookingConsultation from './pages/patient/bookingConsultation';
import PatientProfile from './pages/patient/patientProfile';
import DoctorProfile from './pages/doctor/doctorProfile';
import DoctorApproval from './pages/doctor/doctorApproval';
import PropTypes from 'prop-types';

const App = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const PrivateRoute = ({ children, allowedUserType, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn && userType === allowedUserType ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signup",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  };
  PrivateRoute.propTypes = {
    children: PropTypes.node,
    allowedUserType: PropTypes.string
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <SignupPage setUserType={setUserType} setIsLoggedIn={setIsLoggedIn} />
        </Route>

        {/* Patient Routes */}
        <PrivateRoute path="/patient/appointments" allowedUserType="patient">
          <AppointmentsPage />
        </PrivateRoute>
        <PrivateRoute path="/patient/book-consultation" allowedUserType="patient">
          <BookingConsultation />
        </PrivateRoute>
        <PrivateRoute path="/patient/profile" allowedUserType="patient">
          <PatientProfile />
        </PrivateRoute>

        {/* Doctor Routes */}
        <PrivateRoute path="/doctor/profile" allowedUserType="doctor">
          <DoctorProfile />
        </PrivateRoute>
        <PrivateRoute path="/doctor/approval" allowedUserType="doctor">
          <DoctorApproval />
        </PrivateRoute>

        {/* Redirect to appropriate profile if logged in, otherwise to signup */}
        <Route exact path="/">
          {isLoggedIn ? (
            <Redirect to={`/${userType}/profile`} />
          ) : (
            <Redirect to="/signup" />
          )}
        </Route>

        {/* Catch-all redirect to signup */}
        <Redirect to="/signup" />
      </Switch>
    </Router>
  );
};

export default App;