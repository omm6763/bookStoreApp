import React from "react";
import Home from "./Home/Home";
import Course from "./components/Course"; 
import { Route, Routes } from "react-router-dom";
import Courses from "./Courses/Courses";
import Signup from "./components/Signup";


export default function App() {
  return (
    <>
    
     <div className="dark:bg-slate-900 dark:text-white">

       <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Course" element={<Courses />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
     </div>
    </>
  );
}
