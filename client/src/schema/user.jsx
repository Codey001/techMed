// schema


const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }

)


const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    // Add health information with encryption
    healthInfo: {
        pastMedicalConditions: {
            type: String,
            set: encrypt,
            get: decrypt
        },
        currentMedications: {
            type: String,
            set: encrypt,
            get: decrypt
        },
        allergies: {
            type: String,
            set: encrypt,
            get: decrypt
        },
        familyMedicalHistory: {
            type: String,
            set: encrypt,
            get: decrypt
        }
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});




// // # Routes

// baseUrl

// ## AUTH

// api / auth / signup


{
    type: "Patient" || "Doctor",
        email: "",
            password: "",
                confirmPassword: ""
}


// api / auth / login

// jsx
{
    type: "Patient" || "Doctor",
        email: "",
            password: "",
}


api / auth / logout

make a request only

## PROFILE

    / api / profile / update

jsx
//Patient
{
    type: "Patient";
    id: "_id";
    firstName: "";
    lastName: "";
    gender: "";
    healthInfo: {
        pastMedicalConditions: "";
        currentMedications: "";
        allergies: "";
        familyMedicalHistory: "";
    }
}

//Doctor
{
    type: "Doctor";
    id: "_id";
    firstName: "";
    lastName: "";
    specialization: "";

}



/api/profile / get

jsx
{
    id: "_id",
        type: "Doctor" || "Patient"
}