import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function DoctorDetails({ doctorId }) {
    const [doctor, setDoctor] = useState(null);
    const [originalDoctor, setOriginalDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        specialization: '',
    });

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`https://example.com/api/doctor/${doctorId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDoctor(data);
                setOriginalDoctor(data); // Store the original doctor data
                setFormData({
                    name: data.name,
                    age: data.age,
                    gender: data.gender,
                    specialization: data.specialization,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [doctorId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            name: originalDoctor.name,
            age: originalDoctor.age,
            gender: originalDoctor.gender,
            specialization: originalDoctor.specialization,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`https://example.com/api/doctor/${doctorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ specialization: formData.specialization }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDoctor(data);
            setOriginalDoctor(data);
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Doctor Details</h1>
            <div className="space-y-4">
                {isEditing ? (
                    <>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Name:</div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                disabled
                                className="border border-gray-300 p-2 rounded-md bg-gray-200"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Age:</div>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                disabled
                                className="border border-gray-300 p-2 rounded-md bg-gray-200"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Gender:</div>
                            <select
                                name="gender"
                                value={formData.gender}
                                disabled
                                className="border border-gray-300 p-2 rounded-md bg-gray-200"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Specialization:</div>
                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md"
                            />
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
                            <div className="text-base sm:text-lg">{doctor.name}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Age:</div>
                            <div className="text-base sm:text-lg">{doctor.age}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Gender:</div>
                            <div className="text-base sm:text-lg">{doctor.gender}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                            <div className="text-lg sm:text-xl font-semibold">Specialization:</div>
                            <div className="text-base sm:text-lg">{doctor.specialization}</div>
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

DoctorDetails.propTypes = {
    doctorId: PropTypes.string.isRequired,
};

export default DoctorDetails;
