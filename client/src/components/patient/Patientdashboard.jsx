// import { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Divider,
// } from "@mui/material";
// import { format } from "date-fns";
// import PatientConsultationModal from "./Patientconsultationmodal";
// import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// export default function PatientDashboard() {
//   const [selectedConsultation, setSelectedConsultation] = useState(null);
//   const [consultations, setConsultations] = useState([]);
//   const type = useSelector((state) => state.userData?.type);
//   const id = useSelector((state) => state.userData?._id);

//   const navigate = useNavigate();


//   useEffect(() => {
//     const fetchConsultations = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/api/consultation/patient/allConsultations",
//           {
//             type: type,
//             patientId: id,
//           }
//         );

//         console.log(response.data);

//         setConsultations(response.data);
//       } catch (error) {
//         console.error("Error fetching consultations:", error);
//       }
//     };

//     fetchConsultations();
//   }, []);


//   async function joinMeeting(consultationId){
//     //make request
//     try {

//       const response = await fetch('http://localhost:8080/api/consultation/joinMeeting', {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId:id, consultationId:consultationId }),
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     const data = await response.json();

//     console.log(data)

//     const meetingLink = data.roomInfo;
//     console.log(meetingLink)
//     //redirect with url

//     navigate('/meeting', { state: { meetingUrl: meetingLink } });


//     } catch (error) {
//         console.error('Error joining meeting:', error);
//     }
//   }








//   const ConsultationList = ({ consultations, onOpenModal, type }) => (
//     <List>
//       {consultations.map((consultation) => (
//         <ListItem key={consultation._id} divider>
//           <ListItemText
//             primary={`${consultation.specialty}`}
//             secondary={format(new Date(consultation.timestamp), "PPpp")}
//           />
//           <Button variant="outlined" onClick={() => onOpenModal(consultation)}>
//             View Details
//           </Button>
//           {type == "confirmed" ? (
//             <Button
//               variant="outlined"
//               onClick={() => joinMeeting(consultation._id)}
//             >
//               Join
//             </Button>
//           ) : null}
//         </ListItem>
//       ))}
//     </List>
//   );
//   ConsultationList.propTypes = {
//     consultations: PropTypes.array.isRequired,
//     onOpenModal: PropTypes.func.isRequired,
//   };

//   const handleOpenModal = (consultation) => {
//     setSelectedConsultation(consultation);
//   };

//   const handleCloseModal = () => {
//     setSelectedConsultation(null);
//   };

//   const pendingConsultations = consultations.filter(
//     (c) => c.status === "Pending"
//   );
//   const confirmedConsultations = consultations.filter(
//     (c) => c.status === "Confirmed"
//   );
//   const completedConsultations = consultations.filter(
//     (c) => c.status === "Completed"
//   );

//   return (
//     <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Your Consultations
//       </Typography>

//       <Typography variant="h5" gutterBottom>
//         Confirmed Consultations
//       </Typography>
//       {confirmedConsultations.length > 0 ? (
//         <ConsultationList
//           type="confirmed"
//           consultations={confirmedConsultations}
//           onOpenModal={handleOpenModal}
//         />
//       ) : (
//         <Typography>No confirmed consultations.</Typography>
//       )}
//       <Divider sx={{ my: 3 }} />

//       <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
//         Pending Consultations
//       </Typography>
//       {pendingConsultations.length > 0 ? (
//         <ConsultationList
//           type="pending"
//           consultations={pendingConsultations}
//           onOpenModal={handleOpenModal}
//         />
//       ) : (
//         <Typography>No pending consultations.</Typography>
//       )}

//       <Divider sx={{ my: 3 }} />

//       <Typography variant="h5" gutterBottom>
//         Completed Consultations
//       </Typography>
//       {completedConsultations.length > 0 ? (
//         <ConsultationList
//           type="completed"
//           consultations={completedConsultations}
//           onOpenModal={handleOpenModal}
//         />
//       ) : (
//         <Typography>No completed consultations.</Typography>
//       )}

//       {selectedConsultation && (
//         <PatientConsultationModal
//           open={Boolean(selectedConsultation)}
//           onClose={handleCloseModal}
//           consultation={selectedConsultation}
//         />
//       )}
//     </Box>
//   );
// }



import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Modal,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import PatientConsultationModal from "./Patientconsultationmodal"
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard() {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const type = useSelector((state) => state.userData?.type);
  const id = useSelector((state) => state.userData?._id);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        const response = await axios.post(`${apiUrl}/api/consultation/patient/allConsultations`,
          {
            type: type,
            patientId: id,
          }
        );

        console.log(response.data);

        setConsultations(response.data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchConsultations();
  }, [id, type]);

  async function joinMeeting(consultationId) {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/consultation/joinMeeting`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id, consultationId: consultationId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const meetingLink = data.roomInfo;

      console.log(meetingLink);

      navigate('/meeting', { state: { meetingUrl: meetingLink } });

    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  }

  const ConsultationList = ({ consultations, onOpenModal, type }) => (
    <List sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
      {consultations.map((consultation) => (
        <ListItem key={consultation._id} divider>
          <ListItemText
            primary={consultation.specialty}
            secondary={format(new Date(consultation.timestamp), "PPpp")}
            sx={{ color: 'text.primary' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => onOpenModal(consultation)}
            sx={{ ml: 2 }}
          >
            View Details
          </Button>
          {type === "confirmed" && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => joinMeeting(consultation._id)}
              sx={{ ml: 2 }}
            >
              Join
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
  ConsultationList.propTypes = {
    consultations: PropTypes.array.isRequired,
    onOpenModal: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  const handleOpenModal = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const handleCloseModal = () => {
    setSelectedConsultation(null);
  };

  const pendingConsultations = consultations.filter(
    (c) => c.status === "Pending"
  );
  const confirmedConsultations = consultations.filter(
    (c) => c.status === "Confirmed"
  );
  const completedConsultations = consultations.filter(
    (c) => c.status === "Completed"
  );

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Your Consultations
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3, color: 'primary.dark' }}>
        Confirmed Consultations
      </Typography>
      {confirmedConsultations.length > 0 ? (
        <ConsultationList
          type="confirmed"
          consultations={confirmedConsultations}
          onOpenModal={handleOpenModal}
        />
      ) : (
        <Typography>No confirmed consultations.</Typography>
      )}
      <Divider sx={{ my: 3, bgcolor: 'primary.light' }} />

      <Typography variant="h5" gutterBottom sx={{ mt: 3, color: 'primary.dark' }}>
        Pending Consultations
      </Typography>
      {pendingConsultations.length > 0 ? (
        <ConsultationList
          type="pending"
          consultations={pendingConsultations}
          onOpenModal={handleOpenModal}
        />
      ) : (
        <Typography>No pending consultations.</Typography>
      )}

      <Divider sx={{ my: 3, bgcolor: 'primary.light' }} />

      <Typography variant="h5" gutterBottom sx={{ color: 'primary.dark' }}>
        Completed Consultations
      </Typography>
      {completedConsultations.length > 0 ? (
        <ConsultationList
          type="completed"
          consultations={completedConsultations}
          onOpenModal={handleOpenModal}
        />
      ) : (
        <Typography>No completed consultations.</Typography>
      )}

      {selectedConsultation && (
        <PatientConsultationModal
          open={Boolean(selectedConsultation)}
          onClose={handleCloseModal}
          consultation={selectedConsultation}
        />
      )}
    </Box>
  );
}
