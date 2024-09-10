import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
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
        dispatch(authLogin(userData));
        toast.success("LOGIN SUCCESSFUL");
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
          Welcome Back!
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Don&rsquo;t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div className="space-y-5">
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
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;