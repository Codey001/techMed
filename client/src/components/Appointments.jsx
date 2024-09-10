import { useEffect, useState } from 'react';

function AppointmentsTable() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //mock data
        const mockAppointments = [
            { id: '1', dateTime: '2023-09-15T09:00:00Z', doctorName: 'Dr. Smith' },
            { id: '2', dateTime: '2024-09-16T11:00:00Z', doctorName: 'Dr. Johnson' },
            { id: '3', dateTime: '2024-09-17T14:00:00Z', doctorName: 'Dr. Williams' },
            { id: '4', dateTime: '2024-09-10T16:00:00Z', doctorName: 'Dr. Brown' },
            { id: '5', dateTime: '2024-09-12T10:00:00Z', doctorName: 'Dr. Taylor' },
        ];

        const fetchAppointments = async () => {
            try {
                // const response = await fetch('https://example.com/api/appointments'); // Replace with your API URL
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // // const data = await response.json();
                setAppointments(mockAppointments);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;

    const currentDate = new Date();

    // Separate appointments into upcoming and past based on the current date
    const upcomingAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.dateTime);
        return appointmentDate > currentDate;
    });

    const pastAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.dateTime);
        return appointmentDate <= currentDate;
    });

    // Sort upcoming appointments in ascending order (chronological)
    const sortedUpcomingAppointments = upcomingAppointments.slice().sort((a, b) => {
        const dateA = new Date(a.dateTime);
        const dateB = new Date(b.dateTime);
        return dateA - dateB;
    });

    // Sort past appointments in descending order (reverse chronological)
    const sortedPastAppointments = pastAppointments.slice().sort((a, b) => {
        const dateA = new Date(a.dateTime);
        const dateB = new Date(b.dateTime);
        return dateB - dateA;
    });

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Upcoming Appointments</h1>
            {sortedUpcomingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedUpcomingAppointments.map(appointment => (
                        <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold">{new Date(appointment.dateTime).toLocaleString()}</h2>
                            <p className="text-gray-600">Doctor: {appointment.doctorName}</p>
                            <p className="text-green-600">Status: Confirmed</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No upcoming appointments.</p>
            )}

            <h1 className="text-2xl font-bold mt-8 mb-4 text-center">Past Appointments</h1>
            {sortedPastAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedPastAppointments.map(appointment => (
                        <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold">{new Date(appointment.dateTime).toLocaleString()}</h2>
                            <p className="text-gray-600">Doctor: {appointment.doctorName}</p>
                            <p className="text-gray-600">Status: Completed</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No past appointments.</p>
            )}
        </div>
    );
}

export default AppointmentsTable;