import { useNavigate } from "react-router-dom";
import PatientDashboard from "../../components/patient/Patientdashboard";

const Appointments = () => {
    const navigate = useNavigate();

    const handleBookConsultation = () => {
        navigate("/booking");
    };

    return (
        <div className="p-4 flex-col">
            <div className="relative p-4">
                {/* Center-right button with 2px margin */}
                <div className=" ">
                    <center>
                        <button
                            onClick={handleBookConsultation}
                            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-1/4 sm:w-1/5 text-xs"
                        >
                            Book a Consultation
                        </button>
                    </center >
                </div>
                <PatientDashboard />
            </div>
        </div>
    );
}

export default Appointments;
