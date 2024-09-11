import { useEffect, useState } from 'react';

function PatientProfile({ patientId }) {
    const [patient, setPatient] = useState(null);
    const [originalPatient, setOriginalPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        healthInfo: {
            pastMedicalConditions: '',
            currentMedications: '',
            allergies: '',
            familyMedicalHistory: ''
        }
    });
    // Mock data to simulate fetching patient details
    const mockPatientData = {
        id: patientId,
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        healthInfo: {
            pastMedicalConditions: 'Hypertension',
            currentMedications: 'Aspirin',
            allergies: 'None',
            familyMedicalHistory: 'Heart Disease'
        }
    };

    useEffect(() => {
        const fetchPatientDetails = async () => {
            // try {
            //     const response = await fetch(`https://example.com/api/patient/${patientId}`);
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     const data = await response.json();
            //     setPatient(data);
            //     setOriginalPatient(data);
            //     setFormData({
            //         firstName: data.firstName,
            //         lastName: data.lastName,
            //         gender: data.gender,
            //         healthInfo: {
            //             pastMedicalConditions: data.healthInfo.pastMedicalConditions,
            //             currentMedications: data.healthInfo.currentMedications,
            //             allergies: data.healthInfo.allergies,
            //             familyMedicalHistory: data.healthInfo.familyMedicalHistory
            //         }
            //     });
            // }
            try {
                // Simulating an API call with a delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setPatient(mockPatientData);
                setOriginalPatient(mockPatientData);
                setFormData({
                    firstName: mockPatientData.firstName,
                    lastName: mockPatientData.lastName,
                    gender: mockPatientData.gender,
                    healthInfo: { ...mockPatientData.healthInfo }
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
            firstName: originalPatient.firstName,
            lastName: originalPatient.lastName,
            gender: originalPatient.gender,
            healthInfo: { ...originalPatient.healthInfo }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("healthInfo.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                healthInfo: {
                    ...formData.healthInfo,
                    [field]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
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
                            <div className="text-lg sm:text-xl font-semibold">First Name:</div>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Last Name:</div>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
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

                        {/* Health Info Section */}
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Health Information</h2>
                            <div className="space-y-2">
                                <div>
                                    <label htmlFor="pastMedicalConditions" className="font-medium">Past Medical Conditions:</label>
                                    <input
                                        type="text"
                                        name="healthInfo.pastMedicalConditions"
                                        value={formData.healthInfo.pastMedicalConditions}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`border border-gray-300 p-2 rounded-md ${isEditing ? "" : "bg-gray-100"
                                            }`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="currentMedications" className="font-medium">Current Medications:</label>
                                    <input
                                        type="text"
                                        name="healthInfo.currentMedications"
                                        value={formData.healthInfo.currentMedications}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`border border-gray-300 p-2 rounded-md ${isEditing ? "" : "bg-gray-100"
                                            }`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='allergies' className="font-medium">Allergies:</label>
                                    <input
                                        type="text"
                                        name="healthInfo.allergies"
                                        value={formData.healthInfo.allergies}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`border border-gray-300 p-2 rounded-md ${isEditing ? "" : "bg-gray-100"
                                            }`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='familyMedicalHistory' className="font-medium">Family Medical History:</label>
                                    <input
                                        type="text"
                                        name="healthInfo.familyMedicalHistory"
                                        value={formData.healthInfo.familyMedicalHistory}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`border border-gray-300 p-2 rounded-md ${isEditing ? "" : "bg-gray-100"
                                            }`}
                                    />
                                </div>
                            </div>
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
                            <div className="text-lg sm:text-xl font-semibold">First Name:</div>
                            <div className="text-base sm:text-lg">{patient.firstName}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Last Name:</div>
                            <div className="text-base sm:text-lg">{patient.lastName}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Gender:</div>
                            <div className="text-base sm:text-lg">{patient.gender}</div>
                        </div>

                        {/* Health Info Section */}
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Health Information</h2>
                            <div className="space-y-2">
                                <div>
                                    <label htmlFor='pastMedicalConditions' className="font-medium">Past Medical Conditions:</label>
                                    <div className="text-base sm:text-lg">{patient.healthInfo.pastMedicalConditions}</div>
                                </div>
                                <div>
                                    <label htmlFor='currentMedications' className="font-medium">Current Medications:</label>
                                    <div className="text-base sm:text-lg">{patient.healthInfo.currentMedications}</div>
                                </div>
                                <div>
                                    <label htmlFor='allergies' className="font-medium">Allergies:</label>
                                    <div className="text-base sm:text-lg">{patient.healthInfo.allergies}</div>
                                </div>
                                <div>
                                    <label htmlFor='familyMedicalHistory' className="font-medium">Family Medical History:</label>
                                    <div className="text-base sm:text-lg">{patient.healthInfo.familyMedicalHistory}</div>
                                </div>
                            </div>
                        </div>

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

export default PatientProfile;
