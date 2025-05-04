import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2Icon } from "lucide-react";
import ProfilePage from "../pages/ProfilePage";
import SummaryPage from "../pages/SummaryPage";

function ProtectedRouting({ children }) {
  const { userData, loading, json } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[#eff2f5]">
        <Loader2Icon className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Case: Trying to access ProfilePage without permission (if needed)
  // Note: You might want to refine this logic, as `userData` is already truthy here
  if (children.type === ProfilePage && !userData) {
    return <Navigate to="/" />;
  }

  // Case: User not logged in
  if (!userData) {
    return <Navigate to="/login" />;
  }

  // Case: Trying to access SummaryPage without json
  if (children.type === SummaryPage && !json) {
    return <Navigate to="/GenerateSummary" />;
  }


  

  // Default: userData exists and access is okay
  return children;
}

export default ProtectedRouting;
