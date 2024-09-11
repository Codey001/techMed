// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     status: false,
//     userData: null
// }

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         login: (state,action) => {
//             state.status = true;
//             console.log("STORE LOGIN",action.payload)
//             state.userData = action.payload
//         },
//         logout: (state,action) => {
//             state.status = false;
//             state.userData = null;
//         }
//     }
// })

// export const {login, logout} = authSlice.actions;
// export default authSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

// Retrieve the initial state from localStorage if it exists
const storedAuthState = localStorage.getItem("authState");
const initialState = storedAuthState
  ? JSON.parse(storedAuthState)
  : {
      status: false,
      userData: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      // Save the updated state to localStorage
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      // Remove auth data from localStorage
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
