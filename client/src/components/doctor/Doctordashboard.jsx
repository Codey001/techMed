import { Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import PendingAppointments from './appointments/Pendingappointments';
import ConfirmedAppointments from './appointments/Confirmedappointments';
import CompletedAppointments from './appointments/Completedappointments';

const DoctorDashboard = ({ doctorId, doctorSpecialty }) => {
    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Doctor Dashboard
            </Typography>

            {/* Pending Appointments Section */}
            <Box mb={4}>

                <PendingAppointments doctorId={doctorId} doctorSpecialty={doctorSpecialty} />
            </Box>

            <Divider />

            {/* Confirmed Appointments Section */}
            <Box mb={4}>

                <ConfirmedAppointments doctorId={doctorId} />
            </Box>

            <Divider />

            {/* Completed Appointments Section */}
            <Box mb={4}>
                n
                <CompletedAppointments doctorId={doctorId} />
            </Box>
        </div>
    );
};

DoctorDashboard.propTypes = {
    doctorId: PropTypes.string.isRequired,
    doctorSpecialty: PropTypes.string.isRequired
};

export default DoctorDashboard;
