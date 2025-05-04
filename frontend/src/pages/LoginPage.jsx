import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, FilePlus, FileText } from "lucide-react";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
import { auth,DB } from "../../firebase";

async function createUser(authData){
  const userObject=authData.user;
  const {uid ,photoURL,displayName,email}=userObject;
  const date=new Date();
    const timeStamp=date.toLocaleString("en-US",{
      hour:"numeric",
      minute:"numeric",
      hours12:true,
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  await setDoc(doc(DB,"users",uid),{
    email,
    photoURL,
    name: displayName,
    lastseen: timeStamp
  }
)
}

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin=async()=>{
    const authData=await signInWithPopup(auth,new GoogleAuthProvider());
    await createUser(authData);
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute w-80 h-80 bg-pink-300 rounded-full opacity-30 top-12 left-8 blur-3xl"></div>
      <div className="absolute w-80 h-80 bg-purple-300 rounded-full opacity-30 bottom-12 right-8 blur-3xl"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-md bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center space-y-6"
      >
        {/* Logo */}
        <img
          src="/SWARNA.png"
          alt="Swarna Logo"
          className="h-28 w-28 rounded-full border-4 border-white shadow-lg"
        />

        {/* Tagline */}
        <h2 className="text-2xl font-semibold text-gray-800">Sign in to SWARNA</h2>
        <p className="text-gray-600 text-center">
          Securely access your dashboard to generate chargesheets & summaries.
        </p>

        {/* Google Sign-in */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-[#229ED9] to-[#0088CC] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
          onClick={handleLogin}
        >
          <img src="/Google.png" alt="Google logo" className="h-5 w-5 mr-3" />
          Sign in with Google
        </motion.button>

        {/* Feature Highlights */}
        <div className="flex justify-between w-full mt-6">
          <div className="flex flex-col items-center text-gray-700">
            <ShieldCheck className="w-6 h-6 text-[#229ED9] mb-1" />
            <span className="text-sm">Secure</span>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <FilePlus className="w-6 h-6 text-[#229ED9] mb-1" />
            <span className="text-sm">Chargesheet</span>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <FileText className="w-6 h-6 text-[#229ED9] mb-1" />
            <span className="text-sm">Summary</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
