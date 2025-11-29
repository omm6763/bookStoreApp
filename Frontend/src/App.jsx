import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Cart from "./components/Cart"; 
import BookDetails from "./components/BookDetails"; 
import OrderHistory from "./components/OrderHistory"; 
import AdminDashboard from "./components/AdminDashboard"; 
import ReadBook from "./components/ReadBook"; 
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
     
      <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen flex flex-col transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={authUser ? <Cart /> : <Navigate to="/signup" />} />
          
          <Route path="/book/:id" element={authUser ? <BookDetails /> : <Navigate to="/signup" />} />
          <Route path="/orders" element={authUser ? <OrderHistory /> : <Navigate to="/signup" />} />
          <Route path="/admin" element={authUser && authUser.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
          
          <Route path="/read/:id" element={authUser ? <ReadBook /> : <Navigate to="/signup" />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;