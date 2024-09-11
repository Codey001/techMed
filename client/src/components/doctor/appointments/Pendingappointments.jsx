import { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, Box } from '@mui/material';
import PropTypes from 'prop-types';

// Replace with actual mock data
const mockPendingAppointments = [
    {
        _id: 'pending1',
        patient: { name: 'Alice Smith' },
        timestamp: '2024-09-15T10:00:00Z',
        consultationType: 'General Checkup',
        diagnosis: 'N/A',
        prescription: 'N/A',
        meetingRoomUrl: 'https://example.com/meeting/123',
        status: 'pending',
        specialty: 'Cardiology'
    },
    // More mock data...
];

const PendingAppointments = ({ doctorId, doctorSpecialty }) => {
    const [appointments, setAppointments] = useState(mockPendingAppointments);

    // Remove API calls for testing
    // useEffect(() => {
    //     // Fetch pending appointments for the doctor
    //     const fetchAppointments = async () => {
    //         try {
    //             const response = await axios.get(`/api/appointments?status=pending&doctorId=${doctorId}&specialty=${doctorSpecialty}`);
    //             setAppointments(response.data);
    //         } catch (error) {
    //             console.error('Error fetching pending appointments:', error);
    //         }
    //     };
    //     fetchAppointments();
    // }, [doctorId, doctorSpecialty]);

    const handleApprove = async (appointmentId) => {
        // Implement approval logic here
    };

    const handleReject = async (appointmentId) => {
        // Implement rejection logic here
        setAppointments(appointments.filter(app => app._id !== appointmentId));
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Pending Appointments
            </Typography>
            {appointments.map((appointment) => (
                <Card key={appointment._id} sx={{ mb: 2, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Patient: {appointment.patient.name}</Typography>
                        <Typography variant="body1">Date: {new Date(appointment.timestamp).toLocaleDateString()}</Typography>
                        <Typography variant="body1">Consultation Type: {appointment.consultationType}</Typography>
                        <Typography variant="body1">Diagnosis: {appointment.diagnosis}</Typography>
                        <Typography variant="body1">Prescription: {appointment.prescription}</Typography>
                        <Button variant="contained" color="primary" onClick={() => handleApprove(appointment._id)} sx={{ mr: 1 }}>
                            Approve
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleReject(appointment._id)}>
                            Reject
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

PendingAppointments.propTypes = {
    doctorId: PropTypes.string.isRequired,
    doctorSpecialty: PropTypes.string.isRequired
};

export default PendingAppointments;
