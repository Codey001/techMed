// AppointmentModal.js

import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Modal,
    Button,
    TextField,
    IconButton,
    Grid,
    Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';

// Styles for the modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Responsive width
    maxWidth: 800, // Maximum width for larger screens
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh', // To prevent overflow
    overflowY: 'auto', // Enable scrolling if content exceeds
};

// Mock consultation data
const mockConsultationData = {
    date: '2024-09-15',
    time: '14:30',
    doctor: {
        name: 'Dr. John Smith',
        specialty: 'Cardiology',
    },
    patient: {
        name: 'Jane Doe',
        age: 30,
        gender: 'Female',
        healthInfo: {
            pastMedicalConditions: 'Hypertension',
            currentMedications: 'Lisinopril',
            allergies: 'Penicillin',
            familyMedicalHistory: 'Heart disease in father',
        },
    },
    diagnosis: 'Hypertension',
    prescription: 'Lisinopril 10mg once daily',
};

// DoctorModal Component
function DoctorModal({ consultation, handleEdit }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} aria-label="Open Consultation Modal">
                <IconButton>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="doctor-modal-title"
                aria-describedby="doctor-modal-description"
            >
                <Box sx={style}>
                    <Typography id="doctor-modal-title" variant="h6" component="h2" gutterBottom>
                        Consultation Details
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Appointment Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                value={consultation.date}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Time"
                                type="time"
                                fullWidth
                                margin="normal"
                                value={consultation.time}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Doctor Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Doctor Name"
                                fullWidth
                                margin="normal"
                                value={consultation.doctor.name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Specialty"
                                fullWidth
                                margin="normal"
                                value={consultation.doctor.specialty}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Patient Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Patient Name"
                                fullWidth
                                margin="normal"
                                value={consultation.patient.name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={consultation.patient.age}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Gender"
                                fullWidth
                                margin="normal"
                                value={consultation.patient.gender}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Health Information */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Health Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Past Medical Conditions"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.pastMedicalConditions}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Current Medications"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.currentMedications}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Allergies"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.allergies}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Family Medical History"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.familyMedicalHistory}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Editable Fields */}
                        <Grid item xs={12}>
                            <TextField
                                label="Diagnosis"
                                fullWidth
                                margin="normal"
                                value={consultation.diagnosis}
                                onChange={(e) => handleEdit('diagnosis', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Prescription"
                                fullWidth
                                margin="normal"
                                value={consultation.prescription}
                                onChange={(e) => handleEdit('prescription', e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Save and Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

DoctorModal.propTypes = {
    consultation: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

// PatientModal Component
function PatientModal({ consultation }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} aria-label="Open Consultation Modal">
                <IconButton>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="patient-modal-title"
                aria-describedby="patient-modal-description"
            >
                <Box sx={style}>
                    <Typography id="patient-modal-title" variant="h6" component="h2" gutterBottom>
                        Consultation Details
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Appointment Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                value={consultation.date}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Time"
                                type="time"
                                fullWidth
                                margin="normal"
                                value={consultation.time}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Doctor Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Doctor Name"
                                fullWidth
                                margin="normal"
                                value={consultation.doctor.name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Specialty"
                                fullWidth
                                margin="normal"
                                value={consultation.doctor.specialty}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Patient Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Patient Name"
                                fullWidth
                                margin="normal"
                                value={consultation.patient.name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={consultation.patient.age}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Gender"
                                fullWidth
                                margin="normal"
                                value={consultation.patient.gender}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Health Information */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Health Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Past Medical Conditions"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.pastMedicalConditions}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Current Medications"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.currentMedications}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Allergies"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.allergies}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Family Medical History"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                                value={consultation.patient.healthInfo.familyMedicalHistory}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        {/* Read-only Fields */}
                        <Grid item xs={12}>
                            <TextField
                                label="Diagnosis"
                                fullWidth
                                margin="normal"
                                value={consultation.diagnosis}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Prescription"
                                fullWidth
                                margin="normal"
                                value={consultation.prescription}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>

                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

PatientModal.propTypes = {
    consultation: PropTypes.object.isRequired,
};

// Parent AppointmentModal Component
export default function AppointmentModal({ userRole }) {
    const [consultation, setConsultation] = useState(mockConsultationData);

    const handleEdit = (field, value) => {
        setConsultation((prev) => ({ ...prev, [field]: value }));
        // Here, you can also handle API calls to save the changes to the backend
    };

    return (
        <div>
            {userRole === 'doctor' ? (
                <DoctorModal consultation={consultation} handleEdit={handleEdit} />
            ) : (
                <PatientModal consultation={consultation} />
            )}
        </div>
    );
}

AppointmentModal.propTypes = {
    userRole: PropTypes.oneOf(['doctor', 'patient']).isRequired,
};
