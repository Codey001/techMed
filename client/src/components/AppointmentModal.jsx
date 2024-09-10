import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/appointmentModal.css';
import { Modal, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

function AppointmentModal({ open, onClose }) {
    const [appointments, setAppointments] = useState([
        { id: 1, patientName: 'John Doe', date: '2024-09-15' },
        { id: 2, patientName: 'Jane Smith', date: '2024-09-16' },
        // Add more mock appointments as needed
    ]);

    const handleApprove = (id) => {
        console.log(`Approved appointment with ID: ${id}`);
        // Add logic to handle approval
    };

    const handleReject = (id) => {
        console.log(`Rejected appointment with ID: ${id}`);
        // Add logic to handle rejection
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="appointment-modal-title"
            aria-describedby="appointment-modal-description"
        >
            <Box className="modal-container">
                <Typography id="appointment-modal-title" variant="h6" component="h2" className="modal-header">
                    Approve or Reject Requests
                </Typography>
                <List>
                    {appointments.map((appointment) => (
                        <ListItem key={appointment.id}>
                            <ListItemText
                                primary={`Patient: ${appointment.patientName}`}
                                secondary={`Date: ${appointment.date}`}
                            />
                            <Button onClick={() => handleApprove(appointment.id)} variant="contained" color="success">
                                Approve
                            </Button>
                            <Button onClick={() => handleReject(appointment.id)} variant="contained" color="error">
                                Reject
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <div className="modal-footer">
                    <Button onClick={onClose} variant="contained" color="primary">
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

AppointmentModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AppointmentModal;
