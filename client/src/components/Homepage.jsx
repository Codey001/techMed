import React from "react";
import { Video, Calendar, MessageCircle, Shield } from "lucide-react";
import image from "../assets/image.png";

import { useNavigate } from "react-router-dom";

const TelehealthLandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold text-blue-800 mb-6">
              Your Health, <br />
              <span className="text-blue-600">Our Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience world-class healthcare from the comfort of your home.
              Connect with top doctors instantly.
            </p>
            <button
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
              onClick={() => handleStart()}
            >
              Start Your Consultation
            </button>
          </div>
          <div className="lg:w-1/2">
            <img
              src={image}
              alt="Doctor consultation"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Video className="w-12 h-12 text-blue-600" />}
              title="Video Consultations"
              description="Face-to-face consultations with licensed doctors, anytime, anywhere."
            />
            <FeatureCard
              icon={<Calendar className="w-12 h-12 text-blue-600" />}
              title="Easy Scheduling"
              description="Book appointments at your convenience, 24/7."
            />

            <FeatureCard
              icon={<Shield className="w-12 h-12 text-blue-600" />}
              title="Data Privacy"
              description="Your health information is protected with state-of-the-art encryption."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <StepCard
              number="1"
              title="Sign Up"
              description="Create your account in minutes"
            />
            <StepCard
              number="2"
              title="Book Appointment"
              description="Choose your doctor and preferred time"
            />
            <StepCard
              number="3"
              title="Consult Online"
              description="Meet your doctor via video call"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Prioritize Your Health?
          </h2>
          <p className="text-xl mb-10">
            Join thousands of satisfied patients who trust our telehealth
            services.
          </p>
          <button
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 shadow-lg"
            onClick={() => navigate("/signup")}
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-xl transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center mb-10 md:mb-0">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default TelehealthLandingPage;
