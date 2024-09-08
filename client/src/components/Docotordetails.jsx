import { useEffect, useState } from 'react';

function DoctorDetails({ doctorId }) {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`https://example.com/api/doctor/${doctorId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [doctorId]);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Doctor Details</h1>
            {doctor ? (
                <div className="space-y-4">
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
                        <div className="text-lg sm:text-xl font-semibold">Speciality:</div>
                        <div className="text-base sm:text-lg">{doctor.speciality}</div>
                    </div>
                    {/* Add more fields as needed */}
                </div>
            ) : (
                <p className="text-center text-gray-600">No doctor data available</p>
            )}
        </div>
    );
}

export default DoctorDetails;
