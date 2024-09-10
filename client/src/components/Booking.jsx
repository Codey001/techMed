// BookingComponent.js
import { useState } from 'react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
// import axios from 'axios';

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
    const [paymentStatus, setPaymentStatus] = useState('');

    const handlePaymentFormSubmit = async (token, buyer) => {
        try {


            setPaymentStatus('Processing payment...');

            // Update this URL to match your server's address and port
            const response = await axios.post('http://localhost:8080/api/process-payment', {
                sourceId: token.token,
                amount: selectedSpecialty.fee,
                patientName,
                symptoms,
                specialty: selectedSpecialty.name
            });

            if (response.data.success) {
                setPaymentStatus('Payment successful! Booking confirmed.');
            } else {
                setPaymentStatus(`Payment failed: ${response.data.error}`);
            }
        }
        catch (error) {
            console.error('Payment error:', error);
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            setPaymentStatus(`Payment failed: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Book a Consultation</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="patientName" className="block text-lg font-semibold mb-2">Patient Name:</label>
                    <input
                        type="text"
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="symptoms" className="block text-lg font-semibold mb-2">Symptoms:</label>
                    <textarea
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="specialty" className="block text-lg font-semibold mb-2">Medical Specialty:</label>
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
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">Fees:</label>
                    <input
                        type="text"
                        value={`$${selectedSpecialty.fee}`}
                        readOnly
                        className="border border-gray-300 p-2 rounded-md w-full bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">Payment:</label>
                    <PaymentForm
                        applicationId="sandbox-sq0idb-Nxa48IhcN7s_3IgTqUJquQ"
                        locationId="LMHGQK3C3VDKZ"
                        cardTokenizeResponseReceived={handlePaymentFormSubmit}
                        createPaymentRequest={() => ({
                            countryCode: "US",
                            currencyCode: "USD",
                            total: {
                                amount: selectedSpecialty.fee.toString(),
                                label: "Total",
                            },
                        })}
                    >
                        <CreditCard />
                    </PaymentForm>
                </div>
                {paymentStatus && (
                    <div className="mt-4 text-center font-semibold">
                        {paymentStatus}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Booking;