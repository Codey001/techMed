import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "./Button";
import Input from "./Input";
import { toast } from "react-toastify";

import authService from "../../apiData/auth";
import { login as authLogin } from "../../store/authSlice.js";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log("input data --> ", data);
    setError("");

    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        dispatch(authLogin(userData.data));
        toast.success("SIGNUP SUCCESSFUL");
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl transform transition duration-300 hover:shadow-3xl border border-blue-200">
        <h2 className="text-center text-4xl font-extrabold text-blue-800 mb-6">
          Register
        </h2>
        <p className="text-center text-blue-600 mb-8">
          Already have an account?&nbsp;
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="role" className="block text-blue-700">
                Role
              </label>
              <select
                {...register("type", { required: true })}
                id="role"
                className="block w-full p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-blue-700">Name</label>
              <Input
                placeholder="John Doe"
                type="text"
                {...register("name", { required: true })}
                className="block w-full p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-blue-50"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-blue-700">Email</label>
              <Input
                placeholder="Enter your email"
                type="text"
                {...register("email", { required: true })}
                className="block w-full p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-blue-50"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-blue-700">Password</label>
              <Input
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: true })}
                className="block w-full p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-blue-50"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-blue-700">Confirm Password</label>
              <Input
                placeholder="Confirm your password"
                type="password"
                {...register("confirmPassword", { required: true })}
                className="block w-full p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 px-6 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-400"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
