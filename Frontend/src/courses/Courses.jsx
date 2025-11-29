import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Courses() {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState("All");
  const location = useLocation(); 

  // Get search term from URL
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const getBook = async () => {
      try {
        let url = `${import.meta.env.VITE_BACKEND_URL}/book?category=${category}`;
        
        // If a search term exists, override the category filter or combine logic as needed
        // Here we prioritize search if present
        if (searchTerm) {
            url = `${import.meta.env.VITE_BACKEND_URL}/book?search=${searchTerm}`;
        }
        
        const res = await axios.get(url);
        if (Array.isArray(res.data)) {
          setBook(res.data);
        } else {
          setBook([]);
        }
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
    getBook();
  }, [category, searchTerm]); 

  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl">
            We&apos;re delighted to have you <span className="text-pink-500">Here! :)</span>
          </h1>
          {searchTerm && <p className="mt-4">Results for: <span className="font-bold">{searchTerm}</span></p>}
          
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {["All", "Free", "Fiction", "Non-Fiction", "Sci-Fi"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-md ${category === cat ? "bg-pink-500 text-white" : "bg-gray-200 text-black dark:bg-slate-700 dark:text-white"} hover:bg-pink-400 duration-200`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">Back</button>
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.isArray(book) && book.length > 0 ? (
            book.map((item) => <Cards key={item._id} item={item} />)
          ) : (
            <p className="text-center col-span-4 mt-10">No books found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Courses;