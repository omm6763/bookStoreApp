import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartProvider";
import BookReviews from "./BookReviews"; // Import

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28 pb-10">
        {/* Book Info Section */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3">
            <img src={book.image} alt={book.name} className="rounded-lg shadow-lg w-full object-cover max-h-[500px]" />
          </div>
          <div className="md:w-2/3 space-y-4">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{book.name}</h1>
            <h2 className="text-xl text-pink-500 font-medium">{book.title}</h2>
            <div className="badge badge-secondary">{book.category}</div>
            
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                {/* Fallback description if content is too long or you want a summary */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi,
                inventore? Corporis, voluptatibus! This book takes you on a journey through 
                unexpected twists and turns.
            </p>
            
            <p className="text-3xl font-bold text-slate-800 dark:text-white">${book.price}</p>
            
            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => addToCart(book)}
                className="btn btn-primary text-white px-8"
              >
                Add to Cart
              </button>
              <Link to="/course">
                <button className="btn btn-outline px-8">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <BookReviews bookId={id} /> 
      </div>
      <Footer />
    </>
  );
}

export default BookDetails;