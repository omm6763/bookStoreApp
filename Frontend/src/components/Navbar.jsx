import { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTerm) {
        navigate(`/course?search=${searchTerm}`);
    }
  };

  const navItems = (
    <>
      <li><a href="/" className="hover:text-pink-500 transition-colors font-medium">Home</a></li>
      <li><a href="/course" className="hover:text-pink-500 transition-colors font-medium">Books</a></li>
      {authUser && <li><Link to="/orders" className="text-pink-500 font-semibold hover:text-pink-600">My Library</Link></li>}
      {authUser && authUser.isAdmin && <li><Link to="/admin" className="text-purple-500 font-semibold hover:text-purple-600">Admin</Link></li>}
       <li><a href="#" className="hover:text-pink-500 transition-colors font-medium">About Us</a></li>
      <li><a href="#" className="hover:text-pink-500 transition-colors font-medium">Contact</a></li>
    </>
  );

  return (
    <>
      <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${sticky ? "backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-lg py-2" : "bg-transparent py-4"}`}>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-slate-800 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 text-slate-800 dark:text-white">
                {navItems}
              </ul>
            </div>
            <a href="/" className="text-3xl font-bold cursor-pointer tracking-tighter flex items-center gap-1 text-slate-800 dark:text-white">
               <span className="text-pink-500">book</span>Store
            </a>
          </div>
          <div className="navbar-end space-x-4">
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-slate-700 dark:text-slate-200">
                    {navItems}
                </ul>
            </div>
            
            <div className="hidden md:block">
              <form onSubmit={handleSearch}>
                <label className="input input-bordered input-sm flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border-none focus-within:ring-2 ring-pink-500 transition-all">
                  <input 
                    type="text" 
                    className="grow placeholder-slate-500 dark:placeholder-slate-400 text-slate-800 dark:text-white" 
                    placeholder="Search books..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-50 cursor-pointer hover:text-pink-500"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
              </form>
            </div>

            <label className="swap swap-rotate hover:scale-110 transition-transform text-slate-600 dark:text-yellow-400 cursor-pointer">
              <input type="checkbox" className="theme-controller" value="synthwave" />
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => setTheme(theme === "light" ? "dark" : "light")}><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>

            {authUser ? (
              <div className="flex items-center gap-3">
                <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors group">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-pink-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </Link>
                <Logout />
              </div>
            ) : (
              <div>
                <a className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full hover:shadow-lg hover:from-pink-600 hover:to-purple-700 duration-300 cursor-pointer text-sm font-medium transition-all" onClick={() => document.getElementById("my_modal_3").showModal()}>Login</a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;