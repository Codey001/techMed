import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

// Mock data for completed appointments
const mockCompletedAppointments = [
  {
    _id: "completed1",
    patient: { name: "Eva Green" },
    timestamp: "2024-09-01T16:00:00Z",
    consultationType: "Follow-up",
    diagnosis: "Anemia",
    prescription: "Iron supplements",
    meetingRoomUrl: "https://example.com/meeting/102",
    status: "completed",
    specialty: "Hematology",
  },
  {
    _id: "completed2",
    patient: { name: "Frank White" },
    timestamp: "2024-09-02T15:00:00Z",
    consultationType: "Consultation",
    diagnosis: "Back pain",
    prescription: "Physical therapy",
    meetingRoomUrl: "https://example.com/meeting/103",
    status: "completed",
    specialty: "Orthopedics",
  },
];

const CompletedAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState(mockCompletedAppointments);
  const [editMode, setEditMode] = useState(null);

  // Remove API calls for testing
  // useEffect(() => {
  //     // Fetch completed appointments for the doctor
  //     const fetchAppointments = async () => {
  //         try {
  //             const response = await axios.get(`/api/appointments?status=completed&doctorId=${doctorId}`);
  //             setAppointments(response.data);
  //         } catch (error) {
  //             console.error('Error fetching completed appointments:', error);
  //         }
  //     };

  //     fetchAppointments();
  // }, [doctorId]);

  const handleEditClick = (appointmentId) => {
    setEditMode(appointmentId);
  };

  const handleSaveClick = async (appointmentId, diagnosis, prescription) => {
    // Implement save logic here
    setAppointments(
      appointments.map((app) =>
        app._id === appointmentId ? { ...app, diagnosis, prescription } : app
      )
    );
    setEditMode(null);
  };

  const handleChange = (e, appointmentId) => {
    const { name, value } = e.target;
    setAppointments(
      appointments.map((app) =>
        app._id === appointmentId ? { ...app, [name]: value } : app
      )
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Completed Appointments
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {appointments.map((appointment) => (
          <Card key={appointment._id} sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">
                Patient: {appointment.patient.name}
              </Typography>
              <Typography variant="body1">
                Date: {new Date(appointment.timestamp).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                Consultation Type: {appointment.consultationType}
              </Typography>

              <TextField
                label="Diagnosis"
                name="diagnosis"
                value={appointment.diagnosis}
                onChange={(e) => handleChange(e, appointment._id)}
                disabled={editMode !== appointment._id}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Prescription"
                name="prescription"
                value={appointment.prescription}
                onChange={(e) => handleChange(e, appointment._id)}
                disabled={editMode !== appointment._id}
                fullWidth
                margin="normal"
              />

              {editMode === appointment._id ? (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleSaveClick(
                        appointment._id,
                        appointment.diagnosis,
                        appointment.prescription
                      )
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setEditMode(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(appointment._id)}
                >
                  Edit
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

CompletedAppointments.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

export default CompletedAppointments;
