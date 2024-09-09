import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';

// Sample data for specialties and doctors
const specialties = [
    { id: 1, name: 'General Medicine', price: 50 },
    { id: 2, name: 'Pediatrics', price: 60 },
    { id: 3, name: 'Dermatology', price: 70 },
    { id: 4, name: 'Orthopedics', price: 80 },
    { id: 5, name: 'Cardiology', price: 90 },
    { id: 6, name: 'Neurology', price: 100 },
    { id: 7, name: 'Psychiatry', price: 85 },
    { id: 8, name: 'Ophthalmology', price: 75 },
];

const doctors = [
    { id: 1, name: 'Dr. John Doe', specialty: 1 },
    { id: 2, name: 'Dr. Jane Smith', specialty: 1 },
    { id: 3, name: 'Dr. Mike Johnson', specialty: 2 },
    { id: 4, name: 'Dr. Sarah Brown', specialty: 3 },
    { id: 5, name: 'Dr. Chris Lee', specialty: 4 },
];

const SpecialtyGrid = ({ specialties, activeSpecialty, setActiveSpecialty }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {specialties.map((specialty) => (
                <Card
                    key={specialty.id}
                    className={`cursor-pointer transition-colors ${activeSpecialty === specialty.id ? 'bg-blue-100 border-blue-500' : ''
                        }`}
                    onClick={() => setActiveSpecialty(specialty.id)}
                >
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm sm:text-base">{specialty.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-lg sm:text-xl font-bold">${specialty.price}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
SpecialtyGrid.propTypes = {
    specialties: PropTypes.array.isRequired,
    activeSpecialty: PropTypes.number,
    setActiveSpecialty: PropTypes.func.isRequired,
};


const DoctorList = ({ doctors, activeSpecialty }) => {
    const filteredDoctors = doctors.filter((doctor) => doctor.specialty === activeSpecialty);

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
                <Card key={doctor.id}>
                    <CardHeader>
                        <CardTitle>{doctor.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full"  >Book Appointment</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
DoctorList.propTypes = {
    doctors: PropTypes.array.isRequired,
    activeSpecialty: PropTypes.number,
};


const BookingPage = () => {
    const [activeSpecialty, setActiveSpecialty] = useState(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Book an Appointment</h1>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Choose a Specialty</h2>
                <SpecialtyGrid
                    specialties={specialties}
                    activeSpecialty={activeSpecialty}
                    setActiveSpecialty={setActiveSpecialty}
                />
            </div>
            {activeSpecialty && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Available Doctors</h2>
                    <DoctorList doctors={doctors} activeSpecialty={activeSpecialty} />
                </div>
            )}
        </div>
    );
};

export default BookingPage;