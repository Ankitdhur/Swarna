import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Home, Plus, XCircle,Loader2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function GenerateSummaryPage() {
  const {setjson,userData}=useAuth();
  const [caseFile, setCaseFile] = useState(null);
  const navigate=useNavigate();
  const [error,setError]=useState("Please upload a case pdf file ");
  const [isLoading,setIsLoading]=useState(false);
  
  const handleFileSubmit= async ()=>{
    if(!caseFile){
    setError("Please upload a valid case pdf file");
    return
    }

    setjson(null);
    setIsLoading(true);
    const formData=new FormData();
    formData.append('file',caseFile);

    try{
      const response= await axios.post('http://192.168.166.181:5000/summary',formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        timeout:120000
      });
      setjson(response.data);
      console.log(response.data.extracted_instances);
      setIsLoading(false);
      navigate("/SummaryPage");
    }
    catch(err){
      console.log(err);
    }
  }

  const handleCaseFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCaseFile(file);
    }
  };

  const handleRemoveCaseFile = () => {
    setCaseFile(null);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#eff2f5] space-y-4">
        <Loader2Icon className="w-10 h-10 text-[#229ED9] animate-spin" />
        <p className="text-lg text-[#374151] font-semibold">
          Generating summary, please wait...
        </p>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button className="flex items-center space-x-2 text-[#229ED9] font-bold hover:underline" onClick={()=>navigate("/")}>
          <Home className="w-6 h-6 text-[#229ED9]" />
          <span>Home</span>
        </button>
        <button onClick={()=>{
          navigate("/profile");
        }}><img
          src={userData.photoURL}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover shadow-md"
        /></button>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl p-10 mx-auto w-full max-w-5xl flex flex-col gap-10"
      >
        <h1 className="text-4xl font-extrabold text-[#374151] text-center">
          Generate Case Summary
        </h1>
        <form >
        {/* Flex Row for Inputs */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Ontology Static File Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center justify-center border-2 border-[#22d934] bg-white/70 p-8 rounded-2xl text-center shadow-md w-72 h-72"
          >
            <UploadCloud className="w-14 h-14 text-[#22d934] mb-4" />
            <p className="text-lg font-bold text-[#22d934]">Ontology File</p>
            <p className="text-sm text-[#5A6473] mt-2">
              ontology.owl <br />(Preloaded ✅)
            </p>
          </motion.div>

          {/* Plus Icon */}
          <div className="flex items-center justify-center">
            <Plus className="w-10 h-10 text-[#5A6473]" />
          </div>

          {/* Case File Upload */}
          <motion.label
            whileHover={{ scale: 1.02 }}
            className={`relative cursor-pointer border-4 ${
              caseFile ? 'border-[#22d934]' : 'border-dashed border-[#5A6473]'} rounded-2xl p-8 flex flex-col items-center justify-center bg-white/60 hover:bg-white transition-all duration-300 w-72 h-72`}
              htmlFor="casefile-upload"
          >
            {!caseFile && (
              <>
                <UploadCloud className="w-16 h-16 text-[#229ED9] mb-4" />
                <p className="text-lg font-semibold text-[#374151] mb-1">
                  Click or Drag &amp; Drop
                </p>
                <p className="text-sm text-[#5A6473] text-center">
                  Upload Case File (.pdf)
                </p>
              </>
            )}
            {caseFile && (
              <div className="text-center">
                <UploadCloud className="w-14 h-14 text-[#22d934] mb-2 animate-bounce" />
                <p className="text-md font-semibold text-[#22d934] ">
                  {caseFile.name.substring(0,10)+".pdf"}
                </p>
                <p className="text-sm text-[#5A6473] mt-1">Uploaded ✅</p>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={handleRemoveCaseFile}
                  className="mt-4 flex items-center justify-center gap-1 text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  <XCircle className="w-5 h-5" />
                  Remove File
                </button>
              </div>
            )}
            <input
              id="casefile-upload"
              type="file"
              accept="application/pdf"
              onChange={handleCaseFileUpload}
              className="hidden"
            />
          </motion.label>
        </div>
        </form>
        {/* error */}
        {!caseFile && error && (
        <div className="text-red-600 text-center font-semibold">
        {error}
        </div>
        )}

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-[#229ED9] to-[#0088CC] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-2xl transition"
          onClick={handleFileSubmit}
        >
          Generate Summary
        </motion.button>
      </motion.div>
    </div>
  );
}
