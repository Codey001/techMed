// import { useState, useEffect } from 'react';
// import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";


// // Function to generate the next 7 days
// const getNext7Days = () => {
//     const days = [];
//     const today = new Date();
//     for (let i = 0; i < 7; i++) {
//         const nextDay = new Date(today);
//         nextDay.setDate(today.getDate() + i);
//         const day = nextDay.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
//         days.push({ date: nextDay, formattedDate: day });
//     }
//     return days;
// };

// // Fixed time slots
// const timeSlots = ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"];

// const Booking = () => {

//     const [symptoms, setSymptoms] = useState('');
//     const [specialties, setSpecialties] = useState([]);
//     const [selectedSpecialty, setSelectedSpecialty] = useState(null);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//     const [paymentStatus, setPaymentStatus] = useState('');
//     const type = useSelector((state) => state.userData?.type)
//     const id = useSelector((state) => state.userData?._id)

//     const navigate = useNavigate();



//     // Generate the next 7 days on component mount
//     const next7Days = getNext7Days();

//     useEffect(() => {
//         // Fetch specializations when the component mounts
//         const fetchSpecializations = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/specialization/read", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });

//                 const data = await response.json();

//                 if (data.records && Array.isArray(data.records)) {

//                     setSpecialties(data.records); // Assuming `data.records` contains an array of specializations
//                     if (data.records.length > 0) {
//                         setSelectedSpecialty(data.records[0]); // Set the first specialization as the default selected one
//                     }
//                 } else {
//                     console.error("No specializations found");
//                 }
//             } catch (error) {
//                 console.error("Error fetching specializations:", error);
//             }
//         };

//         fetchSpecializations();
//     }, []);

//     const handlePaymentFormSubmit = async (token, buyer) => {
//         try {
//             setPaymentStatus('Processing payment...');

//             // Combine selected day and time slot to create a full timestamp
//             if (!selectedDay || !selectedTimeSlot || !selectedSpecialty) {
//                 throw new Error('Please select day, time slot, and specialty.');
//             }

//             const selectedDateTime = new Date(selectedDay.date);
//             const [hours, minutes, period] = selectedTimeSlot.split(/[: ]/); // Split the time slot into hours, minutes, and AM/PM
//             let hours24 = parseInt(hours, 10);

//             if (period === "PM" && hours24 !== 12) {
//                 hours24 += 12; // Convert PM hours to 24-hour format
//             } else if (period === "AM" && hours24 === 12) {
//                 hours24 = 0; // Convert 12 AM to 00 hours
//             }

//             selectedDateTime.setHours(hours24, parseInt(minutes, 10), 0); // Set the hours and minutes from the time slot

//             const timestamp = selectedDateTime.toISOString(); // Convert the combined date and time to ISO format

//             // Send payment request with the timestamp
//             console.log(id);
//             const response = await axios.post('http://localhost:8080/api/payment', {
//                 sourceId: token.token,
//                 patientId: id,
//                 amount: selectedSpecialty.fees,
//                 specialty: selectedSpecialty.type,
//                 symptoms,
//                 timestamp,
//             });


//             if (response.status === 200) {
//                 setPaymentStatus('Payment successful! Booking confirmed.');
//                 setTimeout(() => {
//                     navigate('/dashboard');
//                 }, 2000);

//             } else {
//                 setPaymentStatus(`Payment failed: ${response.data.error}`);
//             }
//         } catch (error) {
//             console.error('Payment error:', error);
//             setPaymentStatus(`Payment failed: ${error.message}`);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
//             <h2 className="text-2xl font-bold mb-6 text-center">Book a Consultation</h2>
//             <form>
//                 <div className="mb-4">
//                     <label htmlFor="symptoms" className="block text-lg font-semibold mb-2">Symptoms:</label>
//                     <textarea
//                         id="symptoms"
//                         value={symptoms}
//                         onChange={(e) => setSymptoms(e.target.value)}
//                         className="border border-gray-300 p-2 rounded-md w-full"
//                         rows="4"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="specialty" className="block text-lg font-semibold mb-2">Medical Specialty:</label>
//                     <select
//                         id="specialty"
//                         value={selectedSpecialty?.type || ''}
//                         onChange={(e) => {
//                             const selected = specialties.find(specialty => specialty.type === e.target.value);
//                             setSelectedSpecialty(selected);
//                         }}
//                         className="border border-gray-300 p-2 rounded-md w-full"
//                         required
//                     >
//                         {/* Only map if specialties is an array and has content */}
//                         {specialties && specialties.length > 0 ? (
//                             specialties.map(specialty => (
//                                 <option key={specialty._id} value={specialty.type}>
//                                     {specialty.type}
//                                 </option>
//                             ))
//                         ) : (
//                             <option value="">Loading specializations...</option>
//                         )}
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-lg font-semibold mb-2">Fees:</label>
//                     <input
//                         type="text"
//                         value={selectedSpecialty ? `$${selectedSpecialty.fees}` : ''}
//                         readOnly
//                         className="border border-gray-300 p-2 rounded-md w-full bg-gray-100"
//                     />
//                 </div>

//                 {/* Day Selection */}
//                 <div className="mb-4">
//                     <label htmlFor="day" className="block text-lg font-semibold mb-2">Choose a Day:</label>
//                     <select
//                         id="day"
//                         value={selectedDay?.formattedDate || ''}
//                         onChange={(e) => {
//                             const selected = next7Days.find(day => day.formattedDate === e.target.value);
//                             setSelectedDay(selected);
//                         }}
//                         className="border border-gray-300 p-2 rounded-md w-full"
//                         required
//                     >
//                         <option value="">Select a day</option>
//                         {next7Days.map(day => (
//                             <option key={day.formattedDate} value={day.formattedDate}>
//                                 {day.formattedDate}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Time Slot Selection */}
//                 <div className="mb-4">
//                     <label htmlFor="timeSlot" className="block text-lg font-semibold mb-2">Choose a Time Slot:</label>
//                     <select
//                         id="timeSlot"
//                         value={selectedTimeSlot}
//                         onChange={(e) => setSelectedTimeSlot(e.target.value)}
//                         className="border border-gray-300 p-2 rounded-md w-full"
//                         required
//                     >
//                         <option value="">Select a time slot</option>
//                         {timeSlots.map((slot, index) => (
//                             <option key={index} value={slot}>
//                                 {slot}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Only render the PaymentForm if the selectedSpecialty is not null */}
//                 {selectedSpecialty && selectedDay && selectedTimeSlot && (
//                     <div className="mb-4">
//                         <label className="block text-lg font-semibold mb-2">Payment:</label>
//                         <PaymentForm
//                             applicationId="sandbox-sq0idb-Nxa48IhcN7s_3IgTqUJquQ"
//                             locationId="LMHGQK3C3VDKZ"
//                             cardTokenizeResponseReceived={handlePaymentFormSubmit}
//                             createPaymentRequest={() => ({
//                                 countryCode: "US",
//                                 currencyCode: "USD",
//                                 total: {
//                                     amount: selectedSpecialty.fees.toString(),
//                                     label: "Total",
//                                 },
//                             })}
//                         >
//                             <CreditCard />
//                         </PaymentForm>
//                     </div>
//                 )}
//                 {paymentStatus && (
//                     <div className="mt-4 text-center font-semibold">
//                         {paymentStatus}
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default Booking;




import { useState, useEffect } from 'react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Function to generate the next 7 days
const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const day = nextDay.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
        days.push({ date: nextDay, formattedDate: day });
    }
    return days;
};

// Fixed time slots
const timeSlots = ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"];

const Booking = () => {

    const [symptoms, setSymptoms] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const type = useSelector((state) => state.userData?.type);
    const id = useSelector((state) => state.userData?._id);

    const navigate = useNavigate();

    // Generate the next 7 days on component mount
    const next7Days = getNext7Days();

    useEffect(() => {
        // Fetch specializations when the component mounts
        const fetchSpecializations = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                const response = await fetch(`${apiUrl}/api/specialization/read`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (data.records && Array.isArray(data.records)) {
                    setSpecialties(data.records); // Assuming `data.records` contains an array of specializations
                    if (data.records.length > 0) {
                        setSelectedSpecialty(data.records[0]); // Set the first specialization as the default selected one
                    }
                } else {
                    console.error("No specializations found");
                }
            } catch (error) {
                console.error("Error fetching specializations:", error);
            }
        };

        fetchSpecializations();
    }, []);

    const handlePaymentFormSubmit = async (token, buyer) => {
        try {
            setPaymentStatus('Processing payment...');

            // Combine selected day and time slot to create a full timestamp
            if (!selectedDay || !selectedTimeSlot || !selectedSpecialty) {
                throw new Error('Please select day, time slot, and specialty.');
            }

            const selectedDateTime = new Date(selectedDay.date);
            const [hours, minutes, period] = selectedTimeSlot.split(/[: ]/); // Split the time slot into hours, minutes, and AM/PM
            let hours24 = parseInt(hours, 10);

            if (period === "PM" && hours24 !== 12) {
                hours24 += 12; // Convert PM hours to 24-hour format
            } else if (period === "AM" && hours24 === 12) {
                hours24 = 0; // Convert 12 AM to 00 hours
            }

            selectedDateTime.setHours(hours24, parseInt(minutes, 10), 0); // Set the hours and minutes from the time slot

            const timestamp = selectedDateTime.toISOString(); // Convert the combined date and time to ISO format

            // Send payment request with the timestamp
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const response = await axios.post(`${apiUrl}/api/payment`, {
                sourceId: token.token,
                patientId: id,
                amount: selectedSpecialty.fees,
                specialty: selectedSpecialty.type,
                symptoms,
                timestamp,
            });

            if (response.status === 200) {
                setPaymentStatus('Payment successful! Booking confirmed.');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setPaymentStatus(`Payment failed: ${response.data.error}`);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setPaymentStatus(`Payment failed: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-[#E3F2FD] rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#0D47A1]">Book a Consultation</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="symptoms" className="block text-lg font-semibold mb-2 text-[#0D47A1]">Symptoms:</label>
                    <textarea
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full bg-white"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="specialty" className="block text-lg font-semibold mb-2 text-[#0D47A1]">Medical Specialty:</label>
                    <select
                        id="specialty"
                        value={selectedSpecialty?.type || ''}
                        onChange={(e) => {
                            const selected = specialties.find(specialty => specialty.type === e.target.value);
                            setSelectedSpecialty(selected);
                        }}
                        className="border border-gray-300 p-2 rounded-md w-full bg-white"
                        required
                    >
                        {/* Only map if specialties is an array and has content */}
                        {specialties && specialties.length > 0 ? (
                            specialties.map(specialty => (
                                <option key={specialty._id} value={specialty.type}>
                                    {specialty.type}
                                </option>
                            ))
                        ) : (
                            <option value="">Loading specializations...</option>
                        )}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2 text-[#0D47A1]">Fees:</label>
                    <input
                        type="text"
                        value={selectedSpecialty ? `$${selectedSpecialty.fees}` : ''}
                        readOnly
                        className="border border-gray-300 p-2 rounded-md w-full bg-gray-100"
                    />
                </div>

                {/* Day Selection */}
                <div className="mb-4">
                    <label htmlFor="day" className="block text-lg font-semibold mb-2 text-[#0D47A1]">Choose a Day:</label>
                    <select
                        id="day"
                        value={selectedDay?.formattedDate || ''}
                        onChange={(e) => {
                            const selected = next7Days.find(day => day.formattedDate === e.target.value);
                            setSelectedDay(selected);
                        }}
                        className="border border-gray-300 p-2 rounded-md w-full bg-white"
                        required
                    >
                        <option value="">Select a day</option>
                        {next7Days.map(day => (
                            <option key={day.formattedDate} value={day.formattedDate}>
                                {day.formattedDate}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Time Slot Selection */}
                <div className="mb-4">
                    <label htmlFor="timeSlot" className="block text-lg font-semibold mb-2 text-[#0D47A1]">Choose a Time Slot:</label>
                    <select
                        id="timeSlot"
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full bg-white"
                        required
                    >
                        <option value="">Select a time slot</option>
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Only render the PaymentForm if the selectedSpecialty is not null */}
                {selectedSpecialty && selectedDay && selectedTimeSlot && (
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2 text-[#0D47A1]">Payment:</label>
                        <PaymentForm
                            applicationId="sandbox-sq0idb-Nxa48IhcN7s_3IgTqUJquQ"
                            locationId="LMHGQK3C3VDKZ"
                            cardTokenizeResponseReceived={handlePaymentFormSubmit}
                            createPaymentRequest={() => ({
                                countryCode: "US",
                                currencyCode: "USD",
                                total: {
                                    amount: selectedSpecialty.fees.toString(),
                                    label: "Total",
                                },
                            })}
                        >
                            <CreditCard />
                        </PaymentForm>
                    </div>
                )}
                {paymentStatus && (
                    <div className="mt-4 text-center font-semibold text-[#0D47A1]">
                        {paymentStatus}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Booking;
