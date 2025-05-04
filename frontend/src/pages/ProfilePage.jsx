import React, {  useState } from "react";
import { motion } from "framer-motion";
import { Home, LogOut,Clock, CircleUserRoundIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const {userData,handleLogout}=useAuth();
  const navigate=useNavigate();




  return (
    <div className="min-h-screen flex flex-col p-6 bg-[#F0F4F8]">
      {/* Header */}
      <div className="flex justify-start items-center mb-8">
        <button className="flex items-center space-x-2 text-[#229ED9] font-bold hover:underline" onClick={()=>navigate("/")}>
          <Home className="w-6 h-6" />
          <span>Home</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-10 mx-auto w-full max-w-sm flex flex-col items-center gap-4"
      >
        {/* Profile Picture */}
        <img
          src={userData.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />

        {/* User Name */}
        <div className="flex items-center gap-3 mt-2">
        <CircleUserRoundIcon className="w-7 h-7 text-[#374151] stroke-[2.5]" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#374151] ">
        {name}
        </h2>
        </div>


        {/* Email */}
        <p className="text-md text-[#5A6473]">{userData.email}</p>

        {/* Recent Activity */}
        <div className="mt-4 w-full flex items-start gap-2">
        <Clock className="w-5 h-5 text-[#5A6473] mt-1" />
        <div>
        <h3 className="text-lg font-semibold text-[#374151]">Last Active</h3>
        <p className="text-[#5A6473]">{userData.lastseen}</p>
       </div>
      </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-2 bg-[#E53E3E] hover:bg-[#C53030] text-white rounded-full flex items-center gap-2 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </motion.div>
    </div>
  );
}
