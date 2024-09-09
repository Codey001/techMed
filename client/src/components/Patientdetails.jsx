import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function PatientDetails({ patientId }) {
    const [patient, setPatient] = useState(null);
    const [originalPatient, setOriginalPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: 'aman', age: '20', gender: 'M' });

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`https://example.com/api/patient/${patientId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatient(data);
                setOriginalPatient(data); // Store the original patient data
                setFormData({
                    name: data.name,
                    age: data.age,
                    gender: data.gender
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [patientId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            name: originalPatient.name,
            age: originalPatient.age,
            gender: originalPatient.gender
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`https://example.com/api/patient/${patientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPatient(data);
            setOriginalPatient(data);
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Patient Details</h1>
            <div className="space-y-4">
                {isEditing ? (
                    <>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Name:</div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Age:</div>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Gender:</div>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={handleSaveClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Name:</div>
                            <div className="text-base sm:text-lg">{patient.name}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Age:</div>
                            <div className="text-base sm:text-lg">{patient.age}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Gender:</div>
                            <div className="text-base sm:text-lg">{patient.gender}</div>
                        </div>
                        {/* Add more fields as needed */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleEditClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Edit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

PatientDetails.propTypes = {
    patientId: PropTypes.string.isRequired,
}

export default PatientDetails;