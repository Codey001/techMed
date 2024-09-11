import PropTypes from 'prop-types';
import { Modal, Typography, Box, List, ListItem, ListItemText, Button, Divider, Tooltip } from '@mui/material';
import { format } from 'date-fns';

const PatientConsultationModal = ({ open, onClose, consultation }) => {

    const getCurrentTimestamp = () => {
        return new Date().toISOString(); // Get the current date and time in ISO format
    };

    // Calculate if the current time is within 10 minutes of the consultation time
    const isJoinable = () => {
        const currentTimestamp = new Date(getCurrentTimestamp());
        const consultationTimestamp = new Date(consultation.timestamp);
        const tenMinutesBefore = new Date(consultationTimestamp.getTime() - 10 * 60 * 1000);

        return currentTimestamp >= tenMinutesBefore && currentTimestamp <= consultationTimestamp;
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="patient-consultation-modal-title"
            aria-describedby="patient-consultation-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                maxHeight: '80vh',
                overflow: 'auto',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography id="patient-consultation-modal-title" variant="h6" component="h2" gutterBottom>
                    Consultation Details
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Status" secondary={consultation.status} />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Date and Time"
                            secondary={format(new Date(consultation.timestamp), 'PPpp')}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Type" secondary={consultation.consultationType} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Specialty" secondary={consultation.specialty} />
                    </ListItem>
                    {consultation.doctor && (
                        <ListItem>
                            <ListItemText
                                primary="Doctor"
                                secondary={`Dr. ${consultation.doctor.name}`}
                            />
                        </ListItem>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <ListItem>
                        <ListItemText
                            primary="Symptoms"
                            secondary={consultation.symptoms || 'Not provided'}
                            secondaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }}
                        />
                    </ListItem>
                    {consultation.status === 'Completed' && (
                        <>
                            <ListItem>
                                <ListItemText
                                    primary="Diagnosis"
                                    secondary={consultation.diagnosis || 'Not provided'}
                                    secondaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Prescription"
                                    secondary={consultation.prescription || 'Not provided'}
                                    secondaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }}
                                />
                            </ListItem>
                        </>
                    )}

                    {consultation.meetingRoomUrl && consultation.status === 'Confirmed' && (
                        <ListItem>
                            <Tooltip
                                title={
                                    isJoinable()
                                        ? 'Click to join the meeting.'
                                        : 'The button will be active 10 minutes before the scheduled time.'
                                }
                            >
                                <span>
                                    <Button
                                        href={
                                            isJoinable()
                                                ? consultation.meetingRoomUrl
                                                : undefined
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={!isJoinable()}
                                    >
                                        Join Meeting
                                    </Button>
                                </span>
                            </Tooltip>
                        </ListItem>
                    )}
                </List>
                <Button onClick={onClose} variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

PatientConsultationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    consultation: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        patient: PropTypes.string.isRequired,
        doctor: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        timestamp: PropTypes.string.isRequired,
        symptoms: PropTypes.string.isRequired,
        diagnosis: PropTypes.string,
        prescription: PropTypes.string,
        consultationType: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['Pending', 'Confirmed', 'Completed']).isRequired,
        meetingRoomUrl: PropTypes.string,
        transactionId: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
    }).isRequired,
};

export default PatientConsultationModal;
