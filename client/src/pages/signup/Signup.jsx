import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Button from './Button'
import Input from './Input'
import { toast } from "react-toastify";

import authService from "../../apiData/auth";
import { login as authLogin } from '../../store/authSlice.js';

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
        dispatch(authLogin(userData));
        toast.success("SIGNUP SUCCESSFUL");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-10 rounded-3xl shadow-2xl transform transition duration-300 hover:shadow-3xl border border-gray-700">
        <h2 className="text-center text-4xl font-extrabold text-gray-200 mb-6">
          Register
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Already have an account?&nbsp;
          <Link to="/login" className="text-indigo-400 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="block text-gray-300">Full Name</label>
              <Input
                placeholder="Enter your full name"
                {...register("name", { required: true })}
                className="block w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700 focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300">Username</label>
              <Input
                placeholder="Enter your username"
                type="text"
                {...register("username", { required: true })}
                className="block w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700 focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300">Password</label>
              <Input
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: true })}
                className="block w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 px-6 font-semibold text-gray-100 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-500"
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
