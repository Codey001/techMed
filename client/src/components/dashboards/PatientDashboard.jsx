import React, { useEffect } from 'react';

const PatientDashboard = () => {

  useEffect(() => {
    // Define your POST request function
    const makePostRequest = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/api/specialization/read`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          }
        });

        console.log("patient dashboard req", response)
      } catch (error) {
        console.error('Error occurred while making the POST request:', error);
      }
    };

    // Call the function inside useEffect
    makePostRequest();
  }, []); // Empty dependency array means the effect runs once on component mount

  return (
    <div>PatientDashboard</div>
  );
};

export default PatientDashboard;
