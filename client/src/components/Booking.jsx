import { useState } from 'react';

const specialties = [
    { name: 'Cardiology', fee: 100 },
    { name: 'Dermatology', fee: 80 },
    { name: 'Neurology', fee: 120 },
    // Add more specialties as needed
];

const Booking = () => {
    const [patientName, setPatientName] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState(specialties[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({
            patientName,
            symptoms,
            medicalSpecialty: selectedSpecialty.name,
            fees: selectedSpecialty.fee
        });
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Book a Consultation</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="patientName" className="block text-lg font-semibold">Patient Name:</label>
                    <input
                        type="text"
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="symptoms" className="block text-lg font-semibold">Symptoms:</label>
                    <textarea
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        rows="4"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="specialty" className="block text-lg font-semibold">Medical Specialty:</label>
                    <select
                        id="specialty"
                        value={selectedSpecialty.name}
                        onChange={(e) => {
                            const selected = specialties.find(specialty => specialty.name === e.target.value);
                            setSelectedSpecialty(selected);
                        }}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    >
                        {specialties.map(specialty => (
                            <option key={specialty.name} value={specialty.name}>
                                {specialty.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-lg font-semibold">Fees:</label>
                    <input
                        type="text"
                        value={`$${selectedSpecialty.fee}`}
                        readOnly
                        className="border border-gray-300 p-2 rounded-md w-full bg-gray-100"
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};




export default Booking;