import { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, Box } from '@mui/material';
import PropTypes from 'prop-types';

// Mock data for confirmed appointments
const mockConfirmedAppointments = [
    {
        _id: 'confirmed1',
        patient: { name: 'Charlie Brown' },
        timestamp: '2024-09-12T14:00:00Z',
        consultationType: 'Routine Checkup',
        diagnosis: 'Flu',
        prescription: 'Rest and hydration',
        meetingRoomUrl: 'https://example.com/meeting/789',
        status: 'confirmed',
        specialty: 'General Medicine'
    },
    {
        _id: 'confirmed2',
        patient: { name: 'Daisy Miller' },
        timestamp: '2024-09-13T09:00:00Z',
        consultationType: 'Initial Consultation',
        diagnosis: 'Migraine',
        prescription: 'Pain relief medication',
        meetingRoomUrl: 'https://example.com/meeting/101',
        status: 'confirmed',
        specialty: 'Neurology'
    }
];

const ConfirmedAppointments = ({ doctorId }) => {
    const [appointments, setAppointments] = useState(mockConfirmedAppointments);

    // Remove API calls for testing
    // useEffect(() => {
    //     // Fetch confirmed appointments for the doctor
    //     const fetchAppointments = async () => {
    //         try {
    //             const response = await axios.get(`/api/appointments?status=confirmed&doctorId=${doctorId}`);
    //             setAppointments(response.data);
    //         } catch (error) {
    //             console.error('Error fetching confirmed appointments:', error);
    //         }
    //     };

    //     fetchAppointments();
    // }, [doctorId]);

    const handleJoinMeeting = (meetingUrl) => {
        window.open(meetingUrl, '_blank');
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Confirmed Appointments
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {appointments.map((appointment) => (
                    <Card key={appointment._id} sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Patient: {appointment.patient.name}</Typography>
                            <Typography variant="body1">Date: {new Date(appointment.timestamp).toLocaleDateString()}</Typography>
                            <Typography variant="body1">Consultation Type: {appointment.consultationType}</Typography>
                            <Typography variant="body1">Diagnosis: {appointment.diagnosis}</Typography>
                            <Typography variant="body1">Prescription: {appointment.prescription}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleJoinMeeting(appointment.meetingRoomUrl)}
                            >
                                Join Meeting
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </div>
    );
};

ConfirmedAppointments.propTypes = {
    doctorId: PropTypes.string.isRequired
};

export default ConfirmedAppointments;
