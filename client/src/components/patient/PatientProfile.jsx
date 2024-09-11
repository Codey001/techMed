// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function PatientDetails() {
//     const [patient, setPatient] = useState(null);
//     const [originalPatient, setOriginalPatient] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         gender: '',
//         healthInfo: {
//             pastMedicalConditions: '',
//             currentMedications: '',
//             allergies: '',
//             familyMedicalHistory: ''
//         }
//     });
//     const navigate = useNavigate();

//     let type = useSelector((state) => state.userData?.type);
//     let id = useSelector((state) => state.userData?._id);


//     useEffect(() => {
//         const fetchPatientDetails = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/api/profile/get', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ id, type }),
//                 });
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 console.log(data)
//                 setPatient(data);
//                 setOriginalPatient(data);
//                 setFormData({
//                     name: data.name || '',
//                     email: data.email || '',
//                     gender: data.gender || '',
//                     healthInfo: {
//                         pastMedicalConditions: data.healthInfo?.pastMedicalConditions || '',
//                         currentMedications: data.healthInfo?.currentMedications || '',
//                         allergies: data.healthInfo?.allergies || '',
//                         familyMedicalHistory: data.healthInfo?.familyMedicalHistory || ''
//                     }
//                 });
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPatientDetails();
//     }, [id, type]);

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleCancelClick = () => {
//         setIsEditing(false);
//         setFormData({
//             name: originalPatient?.name || '',
//             email: originalPatient?.email || '',
//             gender: originalPatient?.gender || '',
//             healthInfo: {
//                 pastMedicalConditions: originalPatient?.healthInfo?.pastMedicalConditions || '',
//                 currentMedications: originalPatient?.healthInfo?.currentMedications || '',
//                 allergies: originalPatient?.healthInfo?.allergies || '',
//                 familyMedicalHistory: originalPatient?.healthInfo?.familyMedicalHistory || ''
//             }
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.includes("healthInfo.")) {
//             const field = name.split(".")[1];
//             setFormData(prevState => ({
//                 ...prevState,
//                 healthInfo: {
//                     ...prevState.healthInfo,
//                     [field]: value
//                 }
//             }));
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }
//     };

//     const handleSaveClick = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/api/profile/update', {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     type: type,
//                     id: id,
//                     gender: formData.gender,
//                     healthInfo: { ...formData.healthInfo }
//                 }),
//             });

//             const data = await response.json();
//             setPatient(data);
//             setOriginalPatient(data);
//             setIsEditing(false);
//             navigate('/dashboard');

//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//     if (error) return <p className="text-center text-gray-600">error</p>;

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
//             <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Details</h1>
//             <div className="space-y-6">
//                 {isEditing ? (
//                     <>
//                         {/* Name Field */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
//                             <div className="text-lg sm:text-xl font-semibold text-gray-700">Name:</div>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="flex-1 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Enter name"
//                             />
//                         </div>

//                         {/* Email Field */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
//                             <div className="text-lg sm:text-xl font-semibold text-gray-700">Email:</div>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="flex-1 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Enter email"
//                             />
//                         </div>

//                         {/* Gender Field */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
//                             <div className="text-lg sm:text-xl font-semibold text-gray-700">Gender:</div>
//                             <select
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                                 className="flex-1 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                                 <option value="Other">Other</option>
//                             </select>
//                         </div>

//                         {/* Health Info Section */}
//                         <div className="mt-6">
//                             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Information</h2>
//                             <div className="space-y-4">
//                                 {['pastMedicalConditions', 'currentMedications', 'allergies', 'familyMedicalHistory'].map(field => (
//                                     <div key={field} className="flex flex-col">
//                                         <label htmlFor={field} className="text-lg font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//                                         <input
//                                             type="text"
//                                             name={`healthInfo.${field}`}
//                                             value={formData.healthInfo[field] || ''}
//                                             onChange={handleChange}
//                                             className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="flex justify-center space-x-4 mt-6">
//                             <button
//                                 onClick={handleSaveClick}
//                                 className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
//                             >
//                                 Save
//                             </button>
//                             <button
//                                 onClick={handleCancelClick}
//                                 className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         {/* Name Field */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
//                             <div className="text-lg sm:text-xl font-semibold text-gray-700">Name:</div>
//                             <div className="text-base sm:text-lg text-gray-800">{patient?.name || 'N/A'}</div>
//                         </div>

//                         {/* Email Field */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
//                             <div className="text-lg sm:text-xl font-semibold text-gray-700">Email:</div>
//                             <div className="text-base sm:text-lg text-gray-800">{patient?.email || 'N/A'}</div>
//                         </div>

//                         {/* Gender Field */}
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
//                             <div className="text-lg sm:text-xl font-semibold text-gray-700">Gender:</div>
//                             <div className="text-base sm:text-lg text-gray-800">{patient?.gender || 'N/A'}</div>
//                         </div>

//                         {/* Health Info Section */}
//                         <div className="mt-6">
//                             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Information</h2>
//                             <div className="space-y-4">
//                                 {['pastMedicalConditions', 'currentMedications', 'allergies', 'familyMedicalHistory'].map(field => (
//                                     <div key={field} className="flex flex-col">
//                                         <label htmlFor={field} className="text-lg font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//                                         <div className="text-base sm:text-lg text-gray-800">{patient?.healthInfo?.[field] || 'N/A'}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="flex justify-center mt-6">
//                             <button
//                                 onClick={handleEditClick}
//                                 className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
//                             >
//                                 Edit
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default PatientDetails;




import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PatientDetails() {
    const [patient, setPatient] = useState(null);
    const [originalPatient, setOriginalPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        healthInfo: {
            pastMedicalConditions: '',
            currentMedications: '',
            allergies: '',
            familyMedicalHistory: ''
        }
    });
    const navigate = useNavigate();

    let type = useSelector((state) => state.userData?.type);
    let id = useSelector((state) => state.userData?._id);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                const response = await fetch(`${apiUrl}/api/profile/get`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, type }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatient(data);
                setOriginalPatient(data);
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    gender: data.gender || '',
                    healthInfo: {
                        pastMedicalConditions: data.healthInfo?.pastMedicalConditions || '',
                        currentMedications: data.healthInfo?.currentMedications || '',
                        allergies: data.healthInfo?.allergies || '',
                        familyMedicalHistory: data.healthInfo?.familyMedicalHistory || ''
                    }
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [id, type]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            name: originalPatient?.name || '',
            email: originalPatient?.email || '',
            gender: originalPatient?.gender || '',
            healthInfo: {
                pastMedicalConditions: originalPatient?.healthInfo?.pastMedicalConditions || '',
                currentMedications: originalPatient?.healthInfo?.currentMedications || '',
                allergies: originalPatient?.healthInfo?.allergies || '',
                familyMedicalHistory: originalPatient?.healthInfo?.familyMedicalHistory || ''
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("healthInfo.")) {
            const field = name.split(".")[1];
            setFormData(prevState => ({
                ...prevState,
                healthInfo: {
                    ...prevState.healthInfo,
                    [field]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSaveClick = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const response = await fetch(`${apiUrl}/api/profile/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type,
                    id: id,
                    gender: formData.gender,
                    healthInfo: { ...formData.healthInfo }
                }),
            });

            const data = await response.json();
            setPatient(data);
            setOriginalPatient(data);
            setIsEditing(false);
            navigate('/dashboard');

        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-gray-600">Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-blue-50 shadow-lg rounded-lg mt-10 sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Patient Details</h1>
            <div className="space-y-6">
                {isEditing ? (
                    <>
                        {/* Name Field */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Name:</div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="flex-1 border border-blue-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Email:</div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="flex-1 border border-blue-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter email"
                            />
                        </div>

                        {/* Gender Field */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Gender:</div>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="flex-1 border border-blue-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Health Info Section */}
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Health Information</h2>
                            <div className="space-y-4">
                                {['pastMedicalConditions', 'currentMedications', 'allergies', 'familyMedicalHistory'].map(field => (
                                    <div key={field} className="flex flex-col">
                                        <label htmlFor={field} className="text-lg font-medium text-blue-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                        <input
                                            type="text"
                                            name={`healthInfo.${field}`}
                                            value={formData.healthInfo[field] || ''}
                                            onChange={handleChange}
                                            className="border border-blue-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4 mt-6">
                            <button
                                onClick={handleSaveClick}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Name Field */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Name:</div>
                            <div className="text-base sm:text-lg text-blue-800">{patient?.name || 'N/A'}</div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Email:</div>
                            <div className="text-base sm:text-lg text-blue-800">{patient?.email || 'N/A'}</div>
                        </div>

                        {/* Gender Field */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Gender:</div>
                            <div className="text-base sm:text-lg text-blue-800">{patient?.gender || 'N/A'}</div>
                        </div>

                        {/* Health Info Section */}
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Health Information</h2>
                            <div className="space-y-4">
                                {['pastMedicalConditions', 'currentMedications', 'allergies', 'familyMedicalHistory'].map(field => (
                                    <div key={field} className="flex flex-col">
                                        <label htmlFor={field} className="text-lg font-medium text-blue-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                        <div className="text-base sm:text-lg text-blue-800">{patient?.healthInfo?.[field] || 'N/A'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleEditClick}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
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

export default PatientDetails;
