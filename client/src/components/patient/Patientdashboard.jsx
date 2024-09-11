import { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { format } from 'date-fns';
import PatientConsultationModal from './Patientconsultationmodal';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PatientDashboard() {
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [consultations, setConsultations] = useState([]);
    const type = useSelector((state) => state.userData?.type);
    const id = useSelector((state) => state.userData?._id);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/consultation/patient/allConsultations', {
                    type,
                    id,
                });


                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setConsultations(data.consultations);
            } catch (error) {
                console.error('Error fetching consultations:', error);
            }
        };

        fetchConsultations();
    }, [type, id]);

    const ConsultationList = ({ consultations, onOpenModal }) => (
        <List>
            {consultations.map((consultation) => (
                <ListItem key={consultation._id} divider>
                    <ListItemText
                        primary={`${consultation.specialty}`}
                        secondary={format(new Date(consultation.timestamp), 'PPpp')}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => onOpenModal(consultation)}
                    >
                        View Details
                    </Button>
                </ListItem>
            ))}
        </List>
    );
    ConsultationList.propTypes = {
        consultations: PropTypes.array.isRequired,
        onOpenModal: PropTypes.func.isRequired
    };

    const handleOpenModal = (consultation) => {
        setSelectedConsultation(consultation);
    };

    const handleCloseModal = () => {
        setSelectedConsultation(null);
    };

    const pendingConsultations = consultations.filter(c => c.status === 'Pending');
    const confirmedConsultations = consultations.filter(c => c.status === 'Confirmed');
    const completedConsultations = consultations.filter(c => c.status === 'Completed');

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Consultations
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                Pending Consultations
            </Typography>
            {pendingConsultations.length > 0 ? (
                <ConsultationList consultations={pendingConsultations} onOpenModal={handleOpenModal} />
            ) : (
                <Typography>No pending consultations.</Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
                Confirmed Consultations
            </Typography>
            {confirmedConsultations.length > 0 ? (
                <ConsultationList consultations={confirmedConsultations} onOpenModal={handleOpenModal} />
            ) : (
                <Typography>No confirmed consultations.</Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
                Completed Consultations
            </Typography>
            {completedConsultations.length > 0 ? (
                <ConsultationList consultations={completedConsultations} onOpenModal={handleOpenModal} />
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
