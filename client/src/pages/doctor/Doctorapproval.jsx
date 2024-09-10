import React, { useState } from 'react';
import AppointmentModal from '../../components/AppointmentModal';

const DoctorApproval = () => {
    const [modalOpen, setModalOpen] = useState(true);

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <AppointmentModal open={modalOpen} onClose={handleClose} />
        </div>
    );
};

export default DoctorApproval;
