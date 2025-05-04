import { createContext, useContext,useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,DB } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [json,setjson]=useState(null);
    const [userData, setUserData] = useState(null);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const docRef = doc(DB, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            const timeStamp = new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              day: "numeric",
              month: "short",
              year: "numeric",
            });
    
            await updateDoc(docRef, { lastseen: timeStamp });
    
            const { photoURL, name, email, lastseen } = docSnap.data();
            setUserData({ id: currentUser.uid, photoURL, name, email, lastseen });
          } else {
            setUserData(null); // optional fallback
          }
        } else {
          // ✅ handle logout case
          setUserData(null);
        }
    
        // ✅ always mark loading complete
        setLoading(false);
      });
    
      return () => unsubscribe();
    }, []);

    const handleLogout = () => {
      signOut(auth);
    }
    
    return (
        <AuthContext.Provider value={{userData,setUserData,loading,handleLogout,setjson,json}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);
