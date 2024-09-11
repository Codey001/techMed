// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function DoctorDetails() {
//     const [doctor, setDoctor] = useState(null);
//     const [originalDoctor, setOriginalDoctor] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         specialization: "",
//     });
//     const navigate = useNavigate();
//     const [specializationOptions, setSpecializationOptions] = useState([]);

//     let type = "Doctor";
//     let id = "66e0c7640b2b5e328e88407c";

//     useEffect(() => {
//         const fetchDoctorDetails = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/profile/get", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ id, type }),
//                 });
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 const data = await response.json();
//                 setDoctor(data);
//                 setOriginalDoctor(data);
//                 setFormData({
//                     name: data.name,
//                     email: data.email,
//                     specialization: data.specialization._id, // Set by specialization ID
//                 });
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) fetchDoctorDetails();
//     }, [id, type]);

//     const handleEditClick = async () => {
//         setIsEditing(true);
//         try {
//             const response = await fetch("http://localhost:8080/api/specialization/read", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             const data = await response.json();
//             const specializations = data.records;
//             setFormData({
//                 ...formData,
//                 specialization: "",
//             });
//             setSpecializationOptions(
//                 specializations.map((specialization) => ({
//                     value: specialization._id, // Use specialization _id for selection
//                     label: specialization.type,
//                 }))
//             );
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const handleCancelClick = () => {
//         setIsEditing(false);
//         setFormData({
//             name: originalDoctor.name,
//             email: originalDoctor.email,
//             specialization: originalDoctor.specialization._id, // Reset to original specialization ID
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSaveClick = async () => {
//         try {
//             const response = await fetch("http://localhost:8080/api/profile/update", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     type,
//                     id,
//                     name: formData.name,
//                     specialization: formData.specialization, // Send specialization ID
//                 }),
//             });
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             const data = await response.json();
//             setDoctor(data);
//             setOriginalDoctor(data);
//             setIsEditing(false);
//             navigate("/doctor-approval");
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>
//             <div className="space-y-4">
//                 {isEditing ? (
//                     <>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
//                             <div className="text-lg font-semibold">Name:</div>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 disabled
//                                 className="border p-2 rounded-md bg-gray-200"
//                             />
//                         </div>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
//                             <div className="text-lg font-semibold">Email:</div>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 disabled
//                                 className="border p-2 rounded-md bg-gray-200"
//                             />
//                         </div>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
//                             <div className="text-lg font-semibold">Specialization:</div>
//                             <select
//                                 name="specialization"
//                                 value={formData.specialization}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded-md"
//                             >
//                                 {specializationOptions.map((option) => (
//                                     <option key={option.value} value={option.value}>
//                                         {option.label}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex justify-center space-x-4 mt-4">
//                             <button
//                                 onClick={handleSaveClick}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                             >
//                                 Save
//                             </button>
//                             <button
//                                 onClick={handleCancelClick}
//                                 className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
//                             <div className="text-lg font-semibold">Name:</div>
//                             <div className="text-base">{doctor.name}</div>
//                         </div>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
//                             <div className="text-lg font-semibold">Email:</div>
//                             <div className="text-base">{doctor.email}</div>
//                         </div>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
//                             <div className="text-lg font-semibold">Specialization:</div>
//                             <div className="text-base">{doctor.specialization.type}</div>
//                         </div>
//                         <div className="flex justify-center mt-4">
//                             <button
//                                 onClick={handleEditClick}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
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

// export default DoctorDetails;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorDetails() {
    const [doctor, setDoctor] = useState(null);
    const [originalDoctor, setOriginalDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        specialization: "",
    });
    const navigate = useNavigate();
    const [specializationOptions, setSpecializationOptions] = useState([]);

    let type = "Doctor";
    let id = "66e0c7640b2b5e328e88407c";

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                const response = await fetch(`${apiUrl}/api/profile/get`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id, type }),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setDoctor(data);
                setOriginalDoctor(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                    specialization: data.specialization._id,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDoctorDetails();
    }, [id, type]);

    const handleEditClick = async () => {
        setIsEditing(true);
        try {
            const response = await fetch("http://localhost:8080/api/specialization/read", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const specializations = data.records;
            setFormData({
                ...formData,
                specialization: "",
            });
            setSpecializationOptions(
                specializations.map((specialization) => ({
                    value: specialization._id,
                    label: specialization.type,
                }))
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            name: originalDoctor.name,
            email: originalDoctor.email,
            specialization: originalDoctor.specialization._id,
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
            const response = await fetch("http://localhost:8080/api/profile/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type,
                    id,
                    name: formData.name,
                    specialization: formData.specialization,
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setDoctor(data);
            setOriginalDoctor(data);
            setIsEditing(false);
            navigate("/doctor-approval");
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-gray-600">Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-blue-50 shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Doctor Details</h1>
            <div className="space-y-6">
                {isEditing ? (
                    <>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Name:</div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                disabled
                                className="flex-1 border border-blue-300 p-3 rounded-lg bg-gray-200 shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Email:</div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="flex-1 border border-blue-300 p-3 rounded-lg bg-gray-200 shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Specialization:</div>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="flex-1 border border-blue-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {specializationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
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
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Name:</div>
                            <div className="text-base sm:text-lg text-blue-800">{doctor.name}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Email:</div>
                            <div className="text-base sm:text-lg text-blue-800">{doctor.email}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                            <div className="text-lg sm:text-xl font-semibold text-blue-700">Specialization:</div>
                            <div className="text-base sm:text-lg text-blue-800">{doctor.specialization.type}</div>
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

export default DoctorDetails;
