import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../../apiData/auth";
import { toast } from "react-toastify";
import { login as authLogin } from "../../store/authSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const userData = await authService.login(data);
      if (userData) {
        dispatch(authLogin(userData.data));
        toast.success("LOGIN SUCCESSFUL");
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-200">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl transform transition duration-300 hover:shadow-3xl border border-blue-300">
        <h2 className="text-center text-4xl font-extrabold text-blue-600 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-blue-500 mb-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="role" className="block text-blue-600">
                Role
              </label>
              <select
                {...register("type", { required: true })}
                id="role"
                className="block w-full p-3 bg-blue-50 text-blue-600 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-blue-600">Email</label>
              <Input
                placeholder="Enter your email"
                type="text"
                {...register("email", { required: true })}
                className="block w-full p-3 bg-blue-50 text-blue-600 border border-blue-300 rounded-lg shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white focus:border-transparent"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-blue-600">Password</label>
              <Input
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: true })}
                className="block w-full p-3 bg-blue-50 text-blue-600 border border-blue-300 rounded-lg shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white focus:border-transparent"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 px-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
