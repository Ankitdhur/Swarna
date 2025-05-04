import React, { useRef } from "react";
import { motion} from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { FileText, FilePlus } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Homepage() {
  const {loading,userData,handleLogout}=useAuth();
  const navigate = useNavigate();
  const featureRef = useRef(null); // Ref for scrolling to Features
  const aboutRef=useRef(null)

  const handleGetStarted = () => {
    featureRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if(loading){
    return(<div className="h-screen w-screen flex justify-center items-center bg-[#eff2f5]">
      <Loader2Icon className="w-8 h-8 animate-spin "/>
    </div>)
    
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="w-full flex items-center justify-between px-6 py-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/SWARNA.png"
              alt="Swarna logo"
              className="h-12 w-12 object-cover rounded-full"
            />
            <h1 className="text-2xl font-extrabold text-[#374151]">SWARNA</h1>
          </div>

          {/* Profile Dropdown */}
          {
          (!userData ? 
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center w-30 py-3 px-6 bg-gradient-to-r from-[#229ED9] to-[#0088CC] rounded-lg text-white font-semibold hover:shadow-xl transition"
              onClick={() => navigate("/login")}
            >
              Sign in
            </motion.button>
            :
            <DropdownMenu>
            <DropdownMenuTrigger>
                <img src={userData?.photoURL} alt="Profile" className="cursor-pointer w-10 h-10 rounded-full object-cover hover:scale-105 transition" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side='bottom' align="end" >
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                if(aboutRef.current){
                aboutRef.current?.scrollIntoView({ behavior: "smooth" });
                }
              }}>
                About
              </DropdownMenuItem>
              <DropdownMenuItem  className="bg-red-500 hover:bg-red-600 text-white" onClick={()=>{
                handleLogout();
              }}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )
        }

        </div>
      </header>

      {/* HERO */}
      <section className=" flex items-center justify-center bg-white">
        <div className="max-w-4xl text-center px-6 py-24">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl md:text-5xl font-extrabold text-[#229ED9] mb-4"
          >
            Welcome to SWARNA
          </motion.h2>
          <p className="text-lg md:text-xl text-[#5A6473] mb-8">
            Effortlessly generate detailed chargesheets and concise case summaries — all in one intuitive dashboard.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className=" px-8 py-3 bg-[#229ED9] hover:bg-[#0088CC] text-white font-semibold rounded-full shadow-lg transition"
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* FEATURES CARDS */}
      <section ref={featureRef} className="py-16 bg-[#F0F4F8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
          {/* Chargesheet */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => userData ? navigate("/GenerateChargesheet") : navigate("/login")}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 flex flex-col items-center text-center cursor-pointer transition"
          >
            <FilePlus className="w-12 h-12 text-[#229ED9] mb-4" />
            <h3 className="text-2xl font-bold text-[#374151] mb-2">
              Generate Chargesheet
            </h3>
            <p className="text-[#5A6473] mb-6">
              Create a detailed, court-ready chargesheet in seconds.
            </p>
            <button className="mt-auto px-6 py-2 bg-gradient-to-r from-[#229ED9] to-[#0088CC] text-white font-medium rounded-full shadow">
              Start Now
            </button>
          </motion.div>

          {/* Summary */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => userData ? navigate("/GenerateSummary") : navigate("/login")}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 flex flex-col items-center text-center cursor-pointer transition"
          >
            <FileText className="w-12 h-12 text-[#229ED9] mb-4" />
            <h3 className="text-2xl font-bold text-[#374151] mb-2">
              Generate Summary
            </h3>
            <p className="text-[#5A6473] mb-6">
              Automatically craft concise case summaries from your documents.
            </p>
            <button className="mt-auto px-6 py-2 bg-gradient-to-r from-[#229ED9] to-[#0088CC] text-white font-medium rounded-full shadow">
              Start Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#374151] mb-6"
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#5A6473] text-lg leading-relaxed max-w-3xl mx-auto"
          >
            At SWARNA, we are committed to modernizing legal documentation processes. 
            Our platform empowers legal professionals by simplifying the creation of 
            chargesheets and case summaries through intelligent automation, ensuring speed, accuracy, and efficiency.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
