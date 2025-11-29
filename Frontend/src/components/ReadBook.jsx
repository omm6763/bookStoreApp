import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import BookReviews from "./BookReviews"; 

function ReadBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/${id}`);
        if(res.data) {
            setBook(res.data);
        } else {
            setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchBook();
  }, [id]);

  if (error) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-white transition-colors duration-300">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
                <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-4">Book Not Found</h2>
                <p className="mb-8 text-lg text-gray-500 max-w-md">
                    We couldn't find the content for this book. This usually happens if the book database was reset.
                </p>
                <Link to="/course">
                    <button className="btn bg-pink-500 hover:bg-pink-600 text-white border-none px-8">
                        Browse New Books
                    </button>
                </Link>
            </div>
        </div>
    );
  }

  if (!book) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl container mx-auto px-6 pt-28 pb-20">
        
        {/* Header */}
        <div className="text-center mb-12 border-b border-slate-300 dark:border-slate-700 pb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{book.name}</h1>
            <p className="text-xl italic text-gray-600 dark:text-gray-400">{book.title}</p>
            <div className="mt-4 badge badge-secondary">{book.category}</div>
        </div>

        {/* Book Content */}
        <div className="bg-white dark:bg-slate-800 p-8 md:p-16 shadow-2xl rounded-sm leading-loose text-lg font-serif border-l-4 border-pink-500">
            {book.content ? (
                <p className="whitespace-pre-line text-justify text-slate-700 dark:text-slate-300">
                    {book.content}
                </p>
            ) : (
                <p className="text-center italic text-gray-400">Content is currently unavailable for this title.</p>
            )}
            
            <div className="flex items-center justify-center my-12">
                <span className="text-gray-400 text-sm tracking-widest uppercase">End of Preview</span>
            </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <BookReviews bookId={id} />
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center flex gap-4 justify-center">
            <Link to="/orders">
                <button className="btn btn-outline hover:bg-pink-500 hover:text-white transition-colors">Back to Library</button>
            </Link>
            <Link to="/course">
                <button className="btn btn-primary text-white">Find More Books</button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default ReadBook;