import React from "react";
import Home from "./Home/Home";
import Course from "./components/Course"; 
import { Route, Routes } from "react-router-dom";
import Courses from "./Courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/Authprovider";
import Navbar from "./components/navbar";
import { Navigate } from "react-router-dom";
export default function App() {
  const [authUser,setauthUser]=useAuth()
console.log(authUser)
  return (
    <>
    
     <div className="dark:bg-slate-900 dark:text-white">

       <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Course" element={authUser?<Courses />:<Navigate to="/signup"></Navigate>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      <Toaster/>
     </div>
    </>
  );
}
