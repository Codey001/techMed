import { useNavigate } from "react-router-dom";
import AppointmentsTable from "@/components/Appointments";

const Appointments = () => {
    const navigate = useNavigate();

    const handleBookConsultation = () => {
        navigate("/book-consultation");
    };

    return (
        <div className="p-4">
            <AppointmentsTable />
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleBookConsultation}
                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Book a Consultation
                </button>
            </div>
        </div>
    );
};

export default Appointments;
