import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '@/pages/SignupPage';
import PatientDashboard from '@/pages/patientDashboard';
import DoctorDashboard from '@/pages/DoctorDashboard';
import AppointmentsPage from '@/pages/AppointmentsPage';
import PatientRequestsPage from '@/pages/PatientRequestsPage';
import UserProfilePage from '@/pages/UserProfilePage';

const App = () => {
  const [userType, setUserType] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <SignupPage setUserType={setUserType} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <PrivateRoute path="/dashboard" isLoggedIn={isLoggedIn}>
          {userType === 'patient' ? <PatientDashboard /> : <DoctorDashboard />}
        </PrivateRoute>
        <PrivateRoute path="/appointments" isLoggedIn={isLoggedIn} userType={userType}>
          <AppointmentsPage />
        </PrivateRoute>
        <PrivateRoute path="/patient-requests" isLoggedIn={isLoggedIn} userType={userType}>
          <PatientRequestsPage />
        </PrivateRoute>
        <PrivateRoute path="/profile" isLoggedIn={isLoggedIn}>
          <UserProfilePage userType={userType} />
        </PrivateRoute>
        <Redirect to="/signup" />
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ children, isLoggedIn, userType, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
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

export default App;