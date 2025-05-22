import React from "react";
import { useAuth } from "../context/Authprovider";
import { toast } from "react-hot-toast";

function Logout() {
  const [authUser, setauthUser] = useAuth();
  const handlelogout = () => {
    try {
      setauthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logged Out Successfully:)");
 
      setTimeout(() => {
       window.location.reload();
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        toast.error("Error logging out. error:" + err);
      }, 1000);
    }
  };
  return (
    <div>
      <button
        className="px-1 py-2 bg-red-500 text-white-bold rounded-md cursor-pointer"
        onClick={handlelogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default Logout;
